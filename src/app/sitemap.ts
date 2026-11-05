import type { MetadataRoute } from 'next';
import { PAGE_META } from '@/data/pages';
import { absoluteUrl } from '@/data/site';

/**
 * Indexable routes only: exactly the pages in PAGE_META, each with its own last-edited date
 * (YYYY-MM-DD, set in src/data/pages.ts when that page's content last changed). The URLs equal the
 * canonical URLs. changefreq and priority are omitted: Google ignores both, and a made-up "monthly"
 * would be an unverified claim.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGE_META).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
  }));
}
