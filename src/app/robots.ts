import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

/** Allows crawling of the public site. Blocks the API route and Next.js internals. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  };
}
