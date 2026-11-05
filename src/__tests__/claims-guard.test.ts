import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PAGE_META } from '@/data/pages';
import { ELK_GROVE_FAQS, ELK_GROVE_NOTE, HOME_FAQS, HOME_LEAD, PANESAR_FAQS, PANESAR_LEAD } from '@/data/practice';
import { buildLlmsTxt } from '@/lib/llms';

/**
 * Medical (YMYL) site rule: no unsupported superlatives, comparisons, outcomes or wait-time claims, and
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

const dataStrings = [
  ...Object.values(PAGE_META).flatMap((p) => [p.title, p.description]),
  HOME_LEAD,
  PANESAR_LEAD,
  ELK_GROVE_NOTE,
  ...[...HOME_FAQS, ...ELK_GROVE_FAQS, ...PANESAR_FAQS].flatMap((f) => [f.question, f.answer]),
  buildLlmsTxt(),
];

const jsxStrings = files('src')
  .filter((f) => /\.tsx$/.test(f) && !f.includes('__tests__'))
  .flatMap((f) => jsxText(f).map((text) => `${f}: ${text}`));

describe('no unsupported claims in anything the site publishes', () => {
  it('scans a meaningful amount of copy', () => {
    expect(dataStrings.length).toBeGreaterThan(20);
    expect(jsxStrings.length).toBeGreaterThan(20);
  });

  it.each(BANNED.map((re) => [String(re), re] as const))('data, FAQs, meta and llms.txt avoid %s', (_name, re) => {
    expect(dataStrings.filter((s) => re.test(s))).toEqual([]);
  });

  it.each(BANNED.map((re) => [String(re), re] as const))('page and component text avoids %s', (_name, re) => {
    expect(jsxStrings.filter((s) => re.test(s))).toEqual([]);
  });

  it('makes no health, outcome or advice claims', () => {
    const all = [...dataStrings, ...jsxStrings].join('\n');
    expect(all).not.toMatch(/\b(treat|treats|treating|treatment|diagnos\w+|prescri\w+|symptoms?|conditions?|chronic|diabetes|hypertension|cancer)\b/i);
  });
});
