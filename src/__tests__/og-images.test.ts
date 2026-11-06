import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PAGE_META, type PageKey } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';

/**
 * Share images are static PNG files in public/og, one per page, made by scripts/generate-og.mjs.
 * These tests keep the files, the page titles and the generator's headline list in agreement.
 */

const KEYS = Object.keys(PAGE_META) as PageKey[];
const generator = readFileSync('scripts/generate-og.mjs', 'utf8');

/** The [key, headline] pairs written in the generator. */
const listed = new Map([...generator.matchAll(/\['(\w+)', '([^']+)'\]/g)].map((m) => [m[1] as string, m[2] as string]));

describe('share images', () => {
  it('has one image for every page', () => {
    for (const key of KEYS) expect(existsSync(`public/og/${key}.png`), key).toBe(true);
  });

  it.each(KEYS)('%s.png is a real 1200x630 PNG', (key) => {
    const bytes = readFileSync(`public/og/${key}.png`);
    expect([...bytes.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
    expect(bytes.length).toBeLessThan(500_000);
  });

  it('draws each page title (without the brand) on its image, so a title change forces a regenerate', () => {
    expect([...listed.keys()].sort()).toEqual([...KEYS].sort());
    for (const key of KEYS) expect(listed.get(key), key).toBe(PAGE_META[key].title.replace(/ \| Apollo Physicians$/, ''));
  });

  it('draws the shared address and phone', () => {
    expect(generator).toContain('8191 Timberlake Way, Suite 200, Sacramento, CA 95823');
    expect(generator).toContain('916-236-5800');
  });

  it('points each page at its own image, and every image URL is different', () => {
    const urls = KEYS.map((key) => {
      const meta = PAGE_META[key];
      const og = buildMetadata({ title: meta.title, description: meta.description, path: meta.path }).openGraph;
      const images = og && 'images' in og ? (og.images as { url: string }[]) : [];
      return images[0]?.url ?? '';
    });
    KEYS.forEach((key, i) => expect(urls[i], key).toBe(`https://www.apollophysicians.com/og/${key}.png`));
    expect(new Set(urls).size).toBe(KEYS.length);
  });
});
