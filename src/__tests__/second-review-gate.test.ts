import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Pages written after the 12 Nov 2026 review (sports physical, well-child exam) wait for their own review
 * (SECOND_CLINICAL_REVIEW in src/data/pages.ts), so the first review date is never shown on content the
 * doctor has not seen. The checklist page carries no health information and is live now.
 */

const SECOND_BATCH = ['/sports-physical-sacramento', '/well-child-exam-sacramento'];

async function load(secondReviewedOn: string | null) {
  vi.resetModules();
  const pages = await import('@/data/pages');
  pages.SECOND_CLINICAL_REVIEW.reviewedOn = secondReviewedOn;
  const [sitemap, llms, llmsFull, schema] = await Promise.all([
    import('@/app/sitemap'),
    import('@/lib/llms'),
    import('@/lib/llms-full'),
    import('@/lib/structured-data'),
  ]);
  return { pages, sitemap: sitemap.default, llms, llmsFull, schema };
}

afterEach(() => {
  vi.resetModules();
});

describe('second review batch, before the review (the state we ship in)', () => {
  it('ships with no second review date', async () => {
    const { pages } = await load(null);
    vi.resetModules();
    const fresh = await import('@/data/pages');
    expect(fresh.SECOND_CLINICAL_REVIEW.reviewedOn).toBeNull();
    expect(pages.PAGE_META.sportsPhysical.secondReview).toBe(true);
  });

  it('holds the new health pages out of the sitemap, llms.txt and llms-full.txt', async () => {
    const { sitemap, llms, llmsFull } = await load(null);
    const urls = sitemap().map((entry) => entry.url);
    const txt = llms.buildLlmsTxt();
    const full = llmsFull.buildLlmsFullTxt();
    for (const path of SECOND_BATCH) {
      expect(urls.some((url) => url.endsWith(path)), path).toBe(false);
      expect(txt.includes(path), path).toBe(false);
      expect(full.includes(path), path).toBe(false);
    }
  });

  it('keeps the first batch and the checklist page live', async () => {
    const { pages } = await load(null);
    expect(pages.isLive(pages.PAGE_META.sameDay)).toBe(true);
    expect(pages.isLive(pages.PAGE_META.chooseDoctor)).toBe(true);
    expect(pages.isLive(pages.PAGE_META.sportsPhysical)).toBe(false);
    expect(pages.isLive(pages.PAGE_META.wellChild)).toBe(false);
  });
});

describe('second review batch, after the review', () => {
  it('publishes the pages with their own review date, not the first one', async () => {
    const { pages, sitemap, schema } = await load('2026-12-01');
    const urls = sitemap().map((entry) => entry.url);
    for (const path of SECOND_BATCH) expect(urls.some((url) => url.endsWith(path)), path).toBe(true);
    expect(pages.reviewedOnLabel(pages.PAGE_META.sportsPhysical)).toBe('December 1, 2026');
    expect(pages.reviewedOnLabel(pages.PAGE_META.sameDay)).toBe('November 12, 2026');
    const graph = schema.pageGraph({ key: 'wellChild' }) as { '@graph': { '@type': string; lastReviewed?: string }[] };
    const page = graph['@graph'].find((node) => node['@type'] === 'MedicalWebPage');
    expect(page?.lastReviewed).toBe('2026-12-01');
  });
});
