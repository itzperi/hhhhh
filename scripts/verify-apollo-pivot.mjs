#!/usr/bin/env node
/**
 * Deterministic checks against the compiled production output (`npm run build`).
 * Reads .next/server/app/*.html and sitemap.xml.body directly, so no server is needed.
 *
 * usage: node scripts/verify-apollo-pivot.mjs
 *
 * Exits 1 when any assertion fails, and prints a report either way.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP = join(ROOT, '.next', 'server', 'app');

const PAGES = [
  { path: '/', file: 'index.html', titleIncludes: 'Family Physician in Sacramento' },
  { path: '/family-physician-elk-grove', file: 'family-physician-elk-grove.html' },
  { path: '/dr-paramjit-panesar', file: 'dr-paramjit-panesar.html' },
];

const TITLE = [50, 60];
const DESCRIPTION = [140, 160];

const LEGACY_TOKENS = [
  'chcahealth.org',
  'drparamjitpanesar.com',
  'CHCA Health',
  '559-220-9380',
  'gustine',
  'mariposa',
  'fresno',
  'merced',
  'turlock',
];

const failures = [];
const passes = [];
function check(name, ok, detail = '') {
  if (ok) passes.push(name);
  else failures.push(detail ? `${name}: ${detail}` : name);
}

function read(file) {
  const path = join(APP, file);
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf8');
}

function decode(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;|&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function meta(html, pattern) {
  const m = html.match(pattern);
  return m ? decode(m[1]).trim() : null;
}

function visibleText(fragment) {
  return decode(
    fragment
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function shingles(text, n = 5) {
  const words = text.toLowerCase().match(/[a-z0-9$]+/g) ?? [];
  const set = new Set();
  for (let i = 0; i + n <= words.length; i += 1) set.add(words.slice(i, i + n).join(' '));
  return set;
}

function jaccard(a, b) {
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
}

// ---- Sitemap ----
const sitemap = read('sitemap.xml.body');
check('sitemap.xml exists in the build output', sitemap !== null);
if (sitemap) {
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const expected = PAGES.map((p) => `https://www.apollophysicians.com${p.path === '/' ? '' : p.path}` /* home has no trailing slash, matching its canonical */);
  check('sitemap lists exactly the three indexable pages', JSON.stringify(locs.sort()) === JSON.stringify(expected.sort()), locs.join(', '));
  const legacy = LEGACY_TOKENS.filter((t) => sitemap.toLowerCase().includes(t.toLowerCase()));
  check('sitemap has no legacy tokens', legacy.length === 0, legacy.join(', '));
}

const report = [];
const pageText = {};

for (const page of PAGES) {
  const html = read(page.file);
  check(`${page.path} is compiled`, html !== null, page.file);
  if (!html) continue;

  // ---- 1. Legacy contamination ----
  const lower = html.toLowerCase();
  const hits = LEGACY_TOKENS.filter((t) => lower.includes(t.toLowerCase()));
  check(`${page.path} has no legacy tokens`, hits.length === 0, hits.join(', '));

  // ---- 2. Metadata ----
  const title = meta(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  const description = meta(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => visibleText(m[1]));
  const canonical = meta(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/);
  const ogUrl = meta(html, /<meta[^>]+property="og:url"[^>]+content="([^"]*)"/);
  report.push({ path: page.path, title, titleLength: title?.length, description, descriptionLength: description?.length, h1: h1s, canonical, ogUrl });

  check(`${page.path} title is 50-60 characters`, title !== null && title.length >= TITLE[0] && title.length <= TITLE[1], `${title?.length}`);
  check(`${page.path} description is 140-160 characters`, description !== null && description.length >= DESCRIPTION[0] && description.length <= DESCRIPTION[1], `${description?.length}`);
  check(`${page.path} has exactly one H1`, h1s.length === 1, `${h1s.length}`);
  // The home page canonical has no trailing slash in Next's output, so compare against that exact form.
  const expectedCanonical = `https://www.apollophysicians.com${page.path === '/' ? '' : page.path}`;
  check(`${page.path} canonical is self-referencing`, canonical === expectedCanonical, `${canonical}`);
  check(`${page.path} og:url matches canonical`, ogUrl === expectedCanonical, `${ogUrl}`);

  // ---- 5. JSON-LD graph integrity ----
  const blocks = jsonLdBlocks(html);
  check(`${page.path} has a JSON-LD block`, blocks.length >= 1);
  const docs = blocks.map((block) => {
    try {
      return JSON.parse(block);
    } catch (error) {
      failures.push(`${page.path} JSON-LD does not parse: ${error.message}`);
      return null;
    }
  });
  const nodes = docs.filter(Boolean).flatMap((doc) => doc['@graph'] ?? [doc]);
  const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));
  const serialised = JSON.stringify(nodes);
  check(`${page.path} JSON-LD names Apollo Physicians`, serialised.includes('"name":"Apollo Physicians"'));
  check(`${page.path} JSON-LD omits the unconfirmed legal name`, !serialised.includes('legalName'));
  check(`${page.path} JSON-LD carries the office address`, serialised.includes('8191 Timberlake Way, Suite 200'));
  check(`${page.path} JSON-LD carries the phone`, serialised.includes('+1-916-236-5800') || serialised.includes('+19162365800'));
  check(`${page.path} JSON-LD carries the physician NPI shown on the page`, serialised.includes('"value":"1982892659"'));
  check(`${page.path} JSON-LD omits the organisation NPI, which no page shows`, !serialised.includes('1124405584'));
  check(`${page.path} JSON-LD omits paymentAccepted (insurers are not payment methods)`, !serialised.includes('paymentAccepted'));
  check(`${page.path} JSON-LD uses no invalid FamilyPractice specialty`, !serialised.includes('FamilyPractice') && serialised.includes('https://schema.org/PrimaryCare'));
  check(`${page.path} JSON-LD @ids are all absolute`, [...ids].every((id) => String(id).startsWith('https://www.apollophysicians.com/')), [...ids].join(', '));
  check(`${page.path} JSON-LD has a WebPage-type node for this page`, nodes.some((n) => ['WebPage', 'ProfilePage'].includes(n['@type']) && n.url === expectedCanonical));

  // Deliberate deviations from the brief: these were not verified, so they must be absent.
  check(`${page.path} omits unverified isAcceptingNewPatients`, !serialised.includes('isAcceptingNewPatients'));
  check(`${page.path} omits unverified Wikidata areaServed`, !serialised.includes('wikidata.org'));
  check(`${page.path} carries the geo coordinates`, serialised.includes('"latitude":38.45994') && serialised.includes('"longitude":-121.41591'));

  // Every @id reference must resolve inside the document.
  const refs = [];
  const walk = (value) => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === 'object') {
      if (typeof value['@id'] === 'string' && Object.keys(value).length === 1) refs.push(value['@id']);
      for (const [key, child] of Object.entries(value)) if (key !== '@id') walk(child);
    }
  };
  walk(nodes);
  const unresolved = refs.filter((r) => !ids.has(r));
  check(`${page.path} @id references resolve`, unresolved.length === 0, unresolved.join(', '));

  // Visible text for the shingle check: main content only, so shared header and footer text is excluded.
  const main = html.match(/<main[\s\S]*?<\/main>/);
  pageText[page.path] = main ? visibleText(main[0]) : '';
  check(`${page.path} has main content`, pageText[page.path].length > 200);
}

// ---- 3. Cannibalization: only the home page targets the Sacramento family physician phrase ----
const targeting = PAGES.filter((page) => {
  const row = report.find((r) => r.path === page.path);
  if (!row) return false;
  const phrase = 'family physician in sacramento';
  return (row.title ?? '').toLowerCase().includes(phrase) || row.h1.some((h) => h.toLowerCase().includes(phrase));
});
check('only the home page targets "Family Physician in Sacramento" in title or H1', targeting.length === 1 && targeting[0].path === '/', targeting.map((t) => t.path).join(', '));

// ---- 4. Anti-doorway shingle check ----
const home = pageText['/'] ?? '';
const elk = pageText['/family-physician-elk-grove'] ?? '';
const similarity = jaccard(shingles(home), shingles(elk));
check('5-word shingle overlap between / and /family-physician-elk-grove is under 15%', similarity < 0.15, `${(similarity * 100).toFixed(1)}%`);

// ---- Report ----
console.log('\nApollo Physicians pivot verification (compiled .next output)\n');
for (const row of report) {
  console.log(`${row.path}`);
  console.log(`  <title> (${row.titleLength}): ${row.title}`);
  console.log(`  <meta description> (${row.descriptionLength}): ${row.description}`);
  console.log(`  <h1>: ${row.h1.join(' | ')}`);
  console.log(`  canonical: ${row.canonical}`);
  console.log(`  og:url: ${row.ogUrl}\n`);
}
console.log(`Shingle overlap (5-word, Jaccard) / vs /family-physician-elk-grove: ${(similarity * 100).toFixed(1)}%\n`);
for (const name of passes) console.log(`PASS  ${name}`);
for (const failure of failures) console.log(`FAIL  ${failure}`);
console.log(`\n${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length === 0 ? 0 : 1);
