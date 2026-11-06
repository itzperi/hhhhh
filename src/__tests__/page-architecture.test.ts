import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { BREADCRUMBS, FOOTER_COLUMNS, MAIN_NAV } from '@/data/navigation';
import { livePages, PAGE_META } from '@/data/pages';
import { ELK_GROVE_FAQS, ELK_GROVE_NOTE } from '@/data/practice';
import { ELK_GROVE_DRIVE, OFFICE } from '@/data/site';
import { buildLlmsTxt } from '@/lib/llms';
import { breadcrumbNode } from '@/lib/structured-data';

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const SOURCE_FILES = files('src').filter((f) => /\.(ts|tsx)$/.test(f) && !f.includes('__tests__'));
const KNOWN_PATHS = new Set<string>(Object.values(PAGE_META).map((p) => p.path));

describe('navigation', () => {
  it('has no Locations menu, because there is one office', () => {
    const labels = [...MAIN_NAV.map((l) => l.label), ...FOOTER_COLUMNS.flatMap((c) => [c.title, ...c.links.map((l) => l.label)])];
    expect(labels.filter((l) => /locations?$/i.test(l))).toEqual([]);
  });

  it('links only to routes that exist', () => {
    const hrefs = [...MAIN_NAV, ...FOOTER_COLUMNS.flatMap((c) => c.links)].map((l) => l.href).filter((h) => !h.startsWith('tel:'));
    for (const href of hrefs) expect(KNOWN_PATHS.has(href), href).toBe(true);
  });

  it('puts every live page that has a nav label in the primary navigation, in the owner-specified order', () => {
    const expected = livePages().filter((p) => p.navLabel).map((p) => p.path);
    expect(new Set(MAIN_NAV.map((l) => l.href))).toEqual(new Set(expected));
    const order = ['/', '/new-patients', '/annual-physical-sacramento', '/family-physician-elk-grove', '/dr-paramjit-panesar-md', '/services', '/insurance-accepted', '/contact'];
    expect(MAIN_NAV.map((l) => l.href)).toEqual(order.filter((path) => expected.includes(path)));
  });

  it('never links to a page that answers 404 (health pages wait for Dr. Panesar)', () => {
    const live = new Set(livePages().map((p) => p.path));
    const hrefs = [...MAIN_NAV, ...FOOTER_COLUMNS.flatMap((c) => c.links)].map((l) => l.href).filter((h) => !h.startsWith('tel:'));
    for (const href of hrefs) expect(live.has(href), href).toBe(true);
  });
});

describe('breadcrumbs', () => {
  it('end on the page they belong to', () => {
    expect(BREADCRUMBS.elkGrove.at(-1)?.path).toBe(PAGE_META.elkGrove.path);
    expect(BREADCRUMBS.panesar.at(-1)?.path).toBe(PAGE_META.panesar.path);
  });

  it('produce a BreadcrumbList whose names and order match the visible trail', () => {
    for (const trail of [BREADCRUMBS.elkGrove, BREADCRUMBS.panesar]) {
      const node = breadcrumbNode('x', trail) as { itemListElement: { position: number; name: string }[] };
      expect(node.itemListElement.map((i) => i.name)).toEqual(trail.map((c) => c.name));
      expect(node.itemListElement.map((i) => i.position)).toEqual(trail.map((_, i) => i + 1));
    }
  });
});

describe('Elk Grove copy states one office and implies no Elk Grove office', () => {
  it('says there is one office, in Sacramento, and that Elk Grove patients are seen there', () => {
    expect(ELK_GROVE_NOTE).toContain('one office');
    expect(ELK_GROVE_NOTE).toContain(OFFICE.line);
    expect(ELK_GROVE_NOTE).toContain('Elk Grove patients are seen there');
  });

  it('has no "Elk Grove office/clinic/location" wording in the code or copy', () => {
    const hits: string[] = [];
    for (const file of SOURCE_FILES) {
      const text = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
      if (/Elk Grove (office|clinic|location|branch)/i.test(text)) hits.push(file);
    }
    expect(hits).toEqual([]);
  });

  it('does not frame the answer around absence', () => {
    const copy = [ELK_GROVE_NOTE, buildLlmsTxt(), ...ELK_GROVE_FAQS.flatMap((f) => [f.question, f.answer])].join('\n');
    expect(copy).not.toMatch(/does not (operate|have)|no Elk Grove|not (have )?an office/i);
  });

  it('states only the drive times read from Google Maps on 6 Nov 2026', () => {
    const copy = [ELK_GROVE_NOTE, ...ELK_GROVE_FAQS.map((f) => f.answer), buildLlmsTxt()].join('\n');
    const minutes = [...copy.matchAll(/(\d+) minutes?/g)].map((m) => Number(m[1]));
    expect(minutes.length).toBeGreaterThan(0);
    for (const value of minutes) expect([ELK_GROVE_DRIVE.minutes, 9]).toContain(value);
  });
});
