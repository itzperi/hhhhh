import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Health-information pages and answers wait for Dr. Panesar's review (CLINICAL_REVIEW in src/data/pages.ts).
 * These tests load the site's modules fresh in each state, so they prove both the held-back state (today)
 * and the published state (after the owner sets one date).
 */

const CLINICAL_PATHS = [
  '/annual-physical-sacramento',
  '/same-day-appointments-sacramento',
  '/immigration-medical-exam-sacramento',
  '/services',
  '/medicare-doctor-sacramento',
  '/doctor-without-insurance-sacramento',
  '/medi-cal-doctor-sacramento',
  '/nivano-physicians-doctor-sacramento',
];

async function load(reviewedOn: string | null) {
  vi.resetModules();
  const pages = await import('@/data/pages');
  pages.CLINICAL_REVIEW.reviewedOn = reviewedOn;
  const [sitemap, navigation, llms, schema, utils, content] = await Promise.all([
    import('@/app/sitemap'),
    import('@/data/navigation'),
    import('@/lib/llms'),
    import('@/lib/structured-data'),
    import('@/lib/content-utils'),
    import('@/data/content'),
  ]);
  return { pages, sitemap: sitemap.default, navigation, llms, schema, utils, content };
}

afterEach(() => {
  vi.resetModules();
});

describe('before Dr. Panesar has reviewed the health content (the state we ship in)', () => {
  it('has no review date, so nothing claims a review', async () => {
    const { pages } = await load(null);
    expect(pages.CLINICAL_REVIEW.reviewedOn).toBeNull();
    expect(pages.reviewedOnLabel()).toBeNull();
  });

  it('keeps the health pages out of the sitemap, the navigation, the footer and llms.txt', async () => {
    const { sitemap, navigation, llms } = await load(null);
    const urls = sitemap().map((e) => e.url);
    const nav = [...navigation.MAIN_NAV, ...navigation.FOOTER_COLUMNS.flatMap((c) => c.links)].map((l) => l.href);
    const text = llms.buildLlmsTxt();
    for (const path of CLINICAL_PATHS) {
      expect(urls.some((u) => u.endsWith(path)), `sitemap ${path}`).toBe(false);
      expect(nav, `nav ${path}`).not.toContain(path);
      expect(text.includes(path), `llms ${path}`).toBe(false);
    }
  });

  it('still publishes the pages that carry no health information', async () => {
    const { sitemap } = await load(null);
    const urls = sitemap().map((e) => e.url);
    for (const path of ['/new-patients', '/insurance-accepted', '/contact', '/faq', '/family-physician-elk-grove', '/dr-paramjit-panesar-md']) {
      expect(urls.some((u) => u.endsWith(path)), path).toBe(true);
    }
  });

  it('hides health questions and blocks, and keeps the rest', async () => {
    const { utils, content } = await load(null);
    const faqs = utils.visibleFaqs(content.FAQ_HUB.faqs);
    expect(faqs.some((f) => f.clinical)).toBe(false);
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(utils.visibleBlocks(content.FAQ_HUB.blocks)).toEqual([]);
    expect(utils.visibleBlocks(content.NEW_PATIENTS.blocks).length).toBe(content.NEW_PATIENTS.blocks.length);
  });

  it('puts no reviewed-by or last-reviewed date in the schema, and no services', async () => {
    const { schema } = await load(null);
    const page = schema.webPageNode({ path: '/annual-physical-sacramento', name: 'n', description: 'd', type: 'MedicalWebPage' });
    expect(page).not.toHaveProperty('lastReviewed');
    expect(page).not.toHaveProperty('reviewedBy');
    expect(schema.clinicNode()).not.toHaveProperty('availableService');
  });

  it('answers 404 for a health page', async () => {
    const { pages } = await load(null);
    expect(pages.isLive(pages.PAGE_META.annualPhysical)).toBe(false);
    expect(pages.isLive(pages.PAGE_META.immigration)).toBe(false);
    expect(pages.isLive(pages.PAGE_META.services)).toBe(false);
    expect(pages.isLive(pages.PAGE_META.sameDay)).toBe(false);
    expect(pages.isLive(pages.PAGE_META.medicare)).toBe(false);
    expect(pages.isLive(pages.PAGE_META.selfPay)).toBe(false);
    expect(pages.isLive(pages.PAGE_META.contact)).toBe(true);
  });
});

describe('after the owner sets the review date', () => {
  const DATE = '2026-12-01';

  it('publishes the health pages in the sitemap, navigation and llms.txt together', async () => {
    const { sitemap, navigation, llms, pages } = await load(DATE);
    const urls = sitemap().map((e) => e.url);
    const nav = navigation.MAIN_NAV.map((l) => l.href);
    const text = llms.buildLlmsTxt();
    for (const path of CLINICAL_PATHS) expect(urls.some((u) => u.endsWith(path)), `sitemap ${path}`).toBe(true);
    expect(nav).toContain('/annual-physical-sacramento');
    expect(nav).toContain('/services');
    expect(text).toContain('/immigration-medical-exam-sacramento');
    expect(text).toContain('## Services');
    expect(pages.reviewedOnLabel()).toBe('December 1, 2026');
  });

  it('shows the health questions and blocks', async () => {
    const { utils, content } = await load(DATE);
    expect(utils.visibleFaqs(content.FAQ_HUB.faqs).length).toBe(content.FAQ_HUB.faqs.length);
    expect(utils.visibleBlocks(content.FAQ_HUB.blocks).length).toBe(content.FAQ_HUB.blocks.length);
  });

  it('adds the reviewer and date to health pages in the schema, and lists the services', async () => {
    const { schema } = await load(DATE);
    const page = schema.webPageNode({ path: '/annual-physical-sacramento', name: 'n', description: 'd', type: 'MedicalWebPage' }) as Record<string, unknown>;
    expect(page['@type']).toBe('MedicalWebPage');
    expect(page.lastReviewed).toBe(DATE);
    expect(page.reviewedBy).toEqual({ '@id': schema.PHYSICIAN_ID });
    const services = JSON.stringify((schema.clinicNode() as Record<string, unknown>).availableService);
    expect(services).toContain('Annual physical exam');
    expect(services).toContain('Form I-693');
  });

  it('does not add a review date to pages that are not health pages', async () => {
    const { schema } = await load(DATE);
    const page = schema.webPageNode({ path: '/contact', name: 'n', description: 'd' });
    expect(page).not.toHaveProperty('lastReviewed');
  });
});

describe('every health page names its reviewer', () => {
  it('shows the "not medical advice" line, the reviewer and the date placeholder logic in the template', async () => {
    const { readFileSync } = await import('node:fs');
    const template = readFileSync('src/components/page/ContentPage.tsx', 'utf8');
    expect(template).toContain('NOT_MEDICAL_ADVICE');
    expect(template).toContain('CLINICAL_REVIEW.reviewer');
    expect(template).toContain('Last reviewed');
    for (const route of CLINICAL_PATHS.map((path) => path.slice(1))) {
      expect(readFileSync(`src/app/${route}/page.tsx`, 'utf8'), route).toContain('assertLive(');
    }
  });
});
