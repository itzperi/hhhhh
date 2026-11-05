import type { PhoneNumber } from '@/types';

/**
 * Site-wide constants for Apollo Physicians. Every value here is either from the
 * NPPES registry (NPI 1124405584) or was supplied by the practice. See practice.ts
 * for the source of each claim shown on the pages.
 */

/**
 * Public origin for canonical URLs, sitemap, robots, OpenGraph, and schema IDs. Pinned in code so
 * no environment variable, preview deployment, or localhost value can change it.
 */
export const SITE_URL = 'https://www.apollophysicians.com' as const;

/**
 * Absolute URL for a route path. The home page has no trailing slash, so canonicals, the sitemap,
 * and schema all use the same string.
 */
export function absoluteUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

/** Stable absolute URLs for brand assets used in metadata and schema. */
export const ASSETS = {
  logo: `${SITE_URL}/brand/logo.png`,
  shareCard: `${SITE_URL}/brand/share-card.png`,
} as const;

/**
 * Verified profiles for the physician, used as schema.org sameAs. Append Facebook, LinkedIn,
 * or Google Business Profile URLs here; every schema node reads from this array.
 */
export const SAME_AS_PROFILES: readonly string[] = [
  'https://www.doximity.com/pub/paramjit-panesar-md',
  'https://doctor.webmd.com/doctor/paramjit-panesar-c3eb9c8a-cf8b-4162-99f1-8af864e0efac-overview',
  'https://www.sharecare.com/doctor/dr-paramjit-s-panesar',
];

export const BRAND: { readonly name: string; readonly legalName: string | null } = {
  /** Public-facing brand. Confirmed by the practice. */
  name: 'Apollo Physicians',
  /**
   * Legal business name. NOT CONFIRMED (docs/seo/client-confirmations.md, item 4): the NPI registry
   * spells it "APOLLO PHYSICANS MEDICAL GROUP", which may be a registry typo. Leave null until the
   * practice supplies the filed name. While null, the footer shows the brand name and the schema
   * omits legalName, so nothing unconfirmed is published.
   */
  legalName: null,
};

/** The only public phone number. Confirmed by the practice. Single source of truth, like OFFICE. */
export const PHONES = {
  main: { label: 'Main', display: '916-236-5800', tel: '+19162365800' } satisfies PhoneNumber,
} as const;

const OFFICE_PARTS = {
  street: '8191 Timberlake Way, Suite 200',
  city: 'Sacramento',
  state: 'CA',
  postalCode: '95823',
} as const;

/**
 * The only office. Confirmed by the practice; matches the NPPES location record (NPI 1124405584).
 * This is the single source of truth: every page, meta description, schema block and llms.txt reads
 * the address from here (a unit test fails if a literal copy appears elsewhere in src/).
 */
export const OFFICE = {
  ...OFFICE_PARTS,
  /** Full single-line form used in visible copy and map links. */
  line: `${OFFICE_PARTS.street}, ${OFFICE_PARTS.city}, ${OFFICE_PARTS.state} ${OFFICE_PARTS.postalCode}`,
} as const;

/** NPI identifiers from the NPPES registry. */
export const NPI = {
  organization: '1124405584',
  panesar: '1982892659',
} as const;
