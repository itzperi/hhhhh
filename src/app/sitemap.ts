import type { MetadataRoute } from 'next';
import { livePages } from '@/data/pages';
import { absoluteUrl } from '@/data/site';

/**
 * Live pages only, at their canonical URLs, each with its own last-edited date (YYYY-MM-DD, set in
 * src/data/pages.ts when that page's content last changed). Health-information pages appear here only after
 * Dr. Panesar's review (CLINICAL_REVIEW), because until then they answer 404. changefreq and priority are
 * omitted: Google ignores both, and a made-up "monthly" would be an unverified claim.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return livePages().map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
  }));
}
