import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as content from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { ELK_GROVE_DIRECT_ANSWER, ELK_GROVE_FAQS, ELK_GROVE_NOTE, HOME_DIRECT_ANSWER, HOME_FAQS, HOME_LEAD, PANESAR_DIRECT_ANSWER, PANESAR_FAQS, PANESAR_LEAD } from '@/data/practice';
import { buildLlmsTxt } from '@/lib/llms';

/**
 * Medical (YMYL) site rule: no unsupported superlatives, comparisons, outcome promises or wait-time claims, and
 * nothing that talks about competitors. Scans every string the site can publish.
 */

const BANNED = [
  /\bbest\b/i,
  /\btop[- ](rated|doctor|physician|practice)\b/i,
  /\b(leading|premier|finest|foremost|unmatched|unrivaled|unrivalled)\b(?!-)/i,
  /#\s?1\b/,
  /\bnumber one\b/i,
  /\b(fastest|quickest|cheapest|lowest[- ]price)\b/i,
  /\b(award|awarded|award-winning|ranked)\b/i,
  /\bguarantee[sd]?\b/i,
  /\bcure[sd]?\b/i,
  /\b(better|faster|cheaper|shorter) than\b/i,
  /\bunlike (other|most|many)\b/i,
  /\b\d+\s*(to|-)\s*\d+\s*weeks?\b/i,
  /\bno (wait|waiting)\b/i,
  /\b(competitor|competitors)\b/i,
  /\b100%\b/,
  /\b(reverse[sd]?|heal[sd]?|eliminat\w+) (your|the)\b/i,
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

/** Literal text between JSX tags, which is what visitors read. Class names and code are not included. */
function jsxText(file: string): string[] {
  const source = readFileSync(file, 'utf8');
  return [...source.matchAll(/>([^<>{}]*[A-Za-z][^<>{}]*)</g)].map((m) => (m[1] ?? '').trim()).filter(Boolean);
}

/** Every string in a PageContent-shaped export (blocks, FAQs, headings). */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const contentStrings = Object.values(content).flatMap(strings);

const dataStrings = [
  ...Object.values(PAGE_META).flatMap((p) => [p.title, p.description]),
  HOME_LEAD,
  HOME_DIRECT_ANSWER,
  PANESAR_LEAD,
  PANESAR_DIRECT_ANSWER,
  ELK_GROVE_DIRECT_ANSWER,
  ELK_GROVE_NOTE,
  ...[...HOME_FAQS, ...ELK_GROVE_FAQS, ...PANESAR_FAQS].flatMap((f) => [f.question, f.answer]),
  ...contentStrings,
  buildLlmsTxt(),
];

const jsxStrings = files('src')
  .filter((f) => /\.tsx$/.test(f) && !f.includes('__tests__'))
  .flatMap((f) => jsxText(f).map((text) => `${f}: ${text}`));

describe('no unsupported claims in anything the site publishes', () => {
  it('scans a meaningful amount of copy', () => {
    expect(dataStrings.length).toBeGreaterThan(150);
    expect(jsxStrings.length).toBeGreaterThan(20);
  });

  it.each(BANNED.map((re) => [String(re), re] as const))('data, FAQs, meta and llms.txt avoid %s', (_name, re) => {
    expect(dataStrings.filter((s) => re.test(s))).toEqual([]);
  });

  it.each(BANNED.map((re) => [String(re), re] as const))('page and component text avoids %s', (_name, re) => {
    expect(jsxStrings.filter((s) => re.test(s))).toEqual([]);
  });

  it('promises no medical outcome and gives no personal medical advice', () => {
    const all = [...dataStrings, ...jsxStrings].join('\n');
    expect(all).not.toMatch(/\b(you will (be )?(cured|healed|recover)|we will (cure|heal)|you should (take|stop|start) \w+ (mg|medication))\b/i);
  });

  it('carries the "not medical advice" line on health pages', () => {
    expect(content.NOT_MEDICAL_ADVICE).toMatch(/not medical advice/i);
    expect(content.NOT_MEDICAL_ADVICE).toContain('911');
  });
});
