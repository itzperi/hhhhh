import type { MetadataRoute } from 'next';
import { PAGE_META } from '@/data/pages';
import { absoluteUrl } from '@/data/site';

/** Indexable routes only. The sitemap lists exactly the pages in PAGE_META, each with its own last-edited date. */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGE_META).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(`${page.lastModified}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: page.path === '/' ? 1 : 0.8,
  }));
}
