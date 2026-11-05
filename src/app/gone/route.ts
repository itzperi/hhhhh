import { NextResponse } from 'next/server';

/**
 * Target of the rewrites in next.config.mjs for retired legacy URLs (cosmetic services, testimonials,
 * blog). Answers 410 Gone, which tells search engines the page was removed on purpose. It is not a
 * real page, so it is not in the sitemap or the navigation, and it asks not to be indexed.
 */
export const dynamic = 'force-static';

export function GET(): NextResponse {
  return new NextResponse('This page has been removed.', {
    status: 410,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}
