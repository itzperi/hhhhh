#!/usr/bin/env node
/**
 * Validates the JSON-LD in the compiled pages against the current schema.org vocabulary.
 * Checks, for every node (including nested typed objects):
 *   - each @type is a real schema.org class
 *   - each property exists and is allowed on that type (or one of its parent classes)
 *   - values for enumeration-typed properties (such as medicalSpecialty) are real enumeration members
 *   - every @id reference resolves inside its document, and @ids are absolute
 *   - FAQPage questions carry name and acceptedAnswer.text; BreadcrumbList items carry position, name and item
 * It is a complement to, not a replacement for, Google's Rich Results Test and validator.schema.org.
 *
 * usage: node scripts/validate-schema.mjs [path-to-schemaorg-current-https.jsonld]
 * Without an argument the vocabulary is downloaded from schema.org. Run `npm run build` first.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP = join(ROOT, '.next', 'server', 'app');
const PAGES = [
  ['/', 'index.html'],
  ['/family-physician-elk-grove', 'family-physician-elk-grove.html'],
  ['/dr-paramjit-panesar', 'dr-paramjit-panesar.html'],
];

async function loadVocabulary() {
  const arg = process.argv[2];
  if (arg && existsSync(arg)) return JSON.parse(readFileSync(arg, 'utf8'));
  const response = await fetch('https://schema.org/version/latest/schemaorg-current-https.jsonld');
  if (!response.ok) throw new Error(`Could not download the schema.org vocabulary: HTTP ${response.status}`);
  return response.json();
}

const asArray = (value) => (value === undefined || value === null ? [] : Array.isArray(value) ? value : [value]);
const ids = (value) => asArray(value).map((v) => v['@id']).filter(Boolean);
const strip = (id) => id.replace(/^schema:/, '');

const vocab = await loadVocabulary();
const terms = new Map(vocab['@graph'].map((n) => [strip(n['@id']), n]));

function ancestors(typeName, seen = new Set()) {
  if (seen.has(typeName)) return seen;
  seen.add(typeName);
  for (const parent of ids(terms.get(typeName)?.['rdfs:subClassOf'])) ancestors(strip(parent), seen);
  return seen;
}

function isA(typeName, className) {
  return ancestors(typeName).has(className);
}

const problems = [];
const notes = [];
const fail = (page, message) => problems.push(`${page}: ${message}`);

function html(file) {
  const path = join(APP, file);
  if (!existsSync(path)) throw new Error(`Missing ${path}. Run "npm run build" first.`);
  return readFileSync(path, 'utf8');
}

function jsonLd(source) {
  return [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1].replace(/&quot;/g, '"')));
}

/** Validates one typed object and recurses into nested typed objects. */
function checkObject(page, object, path) {
  const types = asArray(object['@type']);
  if (types.length === 0) return;
  for (const type of types) {
    const term = terms.get(type);
    if (!term || !asArray(term['@type']).includes('rdfs:Class')) fail(page, `${path}: "${type}" is not a schema.org class`);
  }
  for (const [key, value] of Object.entries(object)) {
    if (key.startsWith('@')) continue;
    const prop = terms.get(key);
    if (!prop || prop['@type'] !== 'rdf:Property') {
      fail(page, `${path}.${key}: not a schema.org property`);
      continue;
    }
    const domains = ids(prop['schema:domainIncludes']).map(strip);
    const allowed = types.some((type) => domains.some((domain) => isA(type, domain)));
    if (!allowed) fail(page, `${path}.${key}: not allowed on ${types.join('/')} (expected on ${domains.join(', ')})`);

    const ranges = ids(prop['schema:rangeIncludes']).map(strip);
    // A property is enumeration-only when none of its ranges is a plain data type (Text, URL, Number...).
    const takesPlainData = ranges.some((range) => asArray(terms.get(range)?.['@type']).includes('schema:DataType'));
    const enumRanges = ranges.filter((range) => isA(range, 'Enumeration') && range !== 'Enumeration');
    for (const item of asArray(value)) {
      if (item && typeof item === 'object' && !('@id' in item && Object.keys(item).length === 1)) {
        checkObject(page, item, `${path}.${key}`);
      }
      if (enumRanges.length && !takesPlainData && typeof item === 'string') {
        // Enumeration members are instances: their @type is the enumeration class.
        const member = terms.get(item.replace(/^https?:\/\/schema\.org\//, ''));
        const memberTypes = asArray(member?.['@type']).map(strip);
        const ok = enumRanges.some((range) => memberTypes.some((type) => isA(type, range)));
        if (!ok) fail(page, `${path}.${key}: "${item}" is not a ${enumRanges.join(' / ')} value`);
      }
    }
  }
}

for (const [route, file] of PAGES) {
  const docs = jsonLd(html(file));
  if (docs.length !== 1) fail(route, `expected exactly one JSON-LD block, found ${docs.length}`);
  for (const doc of docs) {
    if (doc['@context'] !== 'https://schema.org') fail(route, `unexpected @context ${doc['@context']}`);
    const nodes = doc['@graph'] ?? [];
    const nodeIds = new Set(nodes.map((n) => n['@id']).filter(Boolean));
    notes.push(`${route}: ${nodes.map((n) => asArray(n['@type']).join('+')).join(', ')}`);

    nodes.forEach((node, index) => {
      checkObject(route, node, `@graph[${index}](${asArray(node['@type']).join('/')})`);
      if (node['@id'] && !String(node['@id']).startsWith('https://')) fail(route, `${node['@type']} @id is not absolute: ${node['@id']}`);
    });

    // References.
    const walk = (value, where) => {
      if (Array.isArray(value)) return value.forEach((v) => walk(v, where));
      if (!value || typeof value !== 'object') return;
      if (Object.keys(value).length === 1 && '@id' in value && !nodeIds.has(value['@id'])) fail(route, `${where}: unresolved @id ${value['@id']}`);
      for (const [k, v] of Object.entries(value)) if (k !== '@id') walk(v, `${where}.${k}`);
    };
    walk(nodes, 'graph');

    // Google-facing requirements for the rich result types in use.
    for (const node of nodes) {
      const types = asArray(node['@type']);
      if (types.includes('FAQPage')) {
        const questions = asArray(node.mainEntity);
        if (questions.length === 0) fail(route, 'FAQPage has no questions');
        for (const q of questions) {
          if (!q.name || !q.acceptedAnswer?.text) fail(route, `FAQPage question missing name or answer text: ${q.name}`);
        }
      }
      if (types.includes('BreadcrumbList')) {
        const items = asArray(node.itemListElement);
        if (items.length < 2) fail(route, 'BreadcrumbList needs at least two items');
        items.forEach((item, i) => {
          if (item.position !== i + 1 || !item.name || !item.item) fail(route, `BreadcrumbList item ${i + 1} needs position, name and item`);
        });
      }
    }
  }
}

console.log('Schema validation against schema.org (compiled .next output)\n');
for (const note of notes) console.log(`  ${note}`);
if (problems.length === 0) {
  console.log('\nPASS  every node, property and enumeration value is valid, and every @id resolves.');
  process.exit(0);
}
console.log('');
for (const problem of problems) console.log(`FAIL  ${problem}`);
console.log(`\n${problems.length} problem(s)`);
process.exit(1);
