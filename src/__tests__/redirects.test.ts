import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { GET as gone } from '@/app/gone/route';
import { PAGE_META } from '@/data/pages';

type Redirect = { source: string; destination: string; permanent?: boolean; statusCode?: number; has?: unknown[] };
type Rewrite = { source: string; destination: string };

const config = (await import(/* @vite-ignore */ pathToFileURL(join(process.cwd(), 'next.config.mjs')).href)).default as {
  redirects: () => Promise<Redirect[]>;
  rewrites: () => Promise<Rewrite[]>;
};
const redirects = await config.redirects();
const rewrites = await config.rewrites();
const pathRedirects = redirects.filter((r) => !r.has);
const livePaths = new Set<string>(Object.values(PAGE_META).map((p) => p.path));

/** Legacy URLs the practice has not yet confirmed (docs/seo/client-confirmations.md); they must stay un-redirected. */
const ON_HOLD = [
  '/provider/jaspreet-tiwana-md',
  '/provider/ramandeep-dhaliwal-md',
  '/provider/ethelyne-j-acebedo-fnp-bc',
  '/pay-now',
  '/service/telemedicine',
  '/service/chronic-disease-management',
  '/service/immunizations',
  '/service/pediatrics',
  '/service/mental-health',
  '/service/immigration-exams',
  "/service/women's-health",
];

describe('legacy redirects', () => {
  it('are all permanent 301s', () => {
    for (const r of redirects) expect(r.statusCode ?? 301, r.source).toBe(301);
  });

  it('send every path to a live page', () => {
    for (const r of pathRedirects) expect(livePaths.has(r.destination), `${r.source} -> ${r.destination}`).toBe(true);
  });

  it('have no duplicate sources, no self-redirects and no chains', () => {
    const sources = pathRedirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
    for (const r of pathRedirects) {
      expect(r.source).not.toBe(r.destination);
      expect(sources.includes(r.destination), `chain through ${r.destination}`).toBe(false);
    }
  });

  it('never redirect a live page away', () => {
    for (const r of pathRedirects) expect(livePaths.has(r.source), r.source).toBe(false);
  });

  it('send the old physician profile to the physician page, and old insurance and pricing URLs to the home page', () => {
    const map = new Map(pathRedirects.map((r) => [r.source, r.destination]));
    expect(map.get('/provider/paramjit-panesar-md')).toBe('/dr-paramjit-panesar');
    expect(map.get('/content/insurance')).toBe('/');
    expect(map.get('/content/cash-prices')).toBe('/');
  });

  it('leave unconfirmed providers, the portal and unconfirmed services alone', () => {
    const touched = new Set([...pathRedirects.map((r) => r.source), ...rewrites.map((r) => r.source)]);
    for (const path of ON_HOLD) expect(touched.has(path), path).toBe(false);
  });

  it('keep the host redirects to the single canonical host', () => {
    const hostRules = redirects.filter((r) => r.has);
    expect(hostRules.length).toBeGreaterThan(0);
    for (const r of hostRules) expect(r.destination.startsWith('https://www.apollophysicians.com/')).toBe(true);
  });
});

describe('410 Gone for retired content', () => {
  it('rewrites cosmetic services, testimonials and the blog to the gone route', () => {
    const sources = rewrites.map((r) => r.source);
    for (const path of ['/aesthetics', '/service/morpheus-8', '/testimonials', '/blog']) expect(sources).toContain(path);
    for (const r of rewrites) expect(r.destination).toBe('/gone');
  });

  it('does not rewrite anything that is also redirected or live', () => {
    const redirected = new Set(pathRedirects.map((r) => r.source));
    for (const r of rewrites) {
      expect(redirected.has(r.source), r.source).toBe(false);
      expect(livePaths.has(r.source), r.source).toBe(false);
    }
  });

  it('answers 410 and asks not to be indexed', async () => {
    const response = gone();
    expect(response.status).toBe(410);
    expect(response.headers.get('x-robots-tag')).toBe('noindex');
  });
});
