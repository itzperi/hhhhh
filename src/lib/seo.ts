import type { Metadata } from 'next';
import { PAGE_META } from '@/data/pages';
import { ASSETS, BRAND, absoluteUrl } from '@/data/site';

interface PageMetaInput {
  /** Full page title including the brand suffix, e.g. "Family Physician in Sacramento, CA | Apollo Physicians". */
  title: string;
  description: string;
  /** Path beginning with "/". Used for the canonical URL and OpenGraph URL. */
  path: string;
  /** Absolute or site-relative image URL. Defaults to the page's own generated image (/og/<page>.png). */
  image?: string;
  /** Set to true for pages that must not be indexed. */
  noIndex?: boolean;
}

/**
 * Builds the Metadata object for a route. The root layout sets metadataBase, so the
 * relative canonical and OpenGraph URLs resolve against SITE_URL.
 */
export function buildMetadata({ title, description, path, image, noIndex = false }: PageMetaInput): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const key = Object.entries(PAGE_META).find(([, page]) => page.path === path)?.[0];
  image = image ?? (key ? absoluteUrl(`/og/${key}.png`) : ASSETS.shareCard);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: BRAND.name,
      title,
      description,
      url: canonicalUrl,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
