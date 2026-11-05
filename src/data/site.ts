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

/** A physician profile on another site, shown on the physician page and used as schema.org sameAs. */
export interface ExternalProfile {
  label: string;
  url: string;
}

/**
 * Profiles for the physician. Each was opened on 5 Nov 2026 and shows Dr. Panesar, family medicine,
 * at this office address and phone. Sharecare was dropped because it could not be opened (HTTP 403),
 * so it could not be verified. Add Google Business Profile, Healthgrades or Zocdoc only after checking.
 */
export const PHYSICIAN_PROFILE_LIST: readonly ExternalProfile[] = [
  { label: 'Doximity', url: 'https://www.doximity.com/pub/paramjit-panesar-md' },
  { label: 'WebMD', url: 'https://doctor.webmd.com/doctor/paramjit-panesar-c3eb9c8a-cf8b-4162-99f1-8af864e0efac-overview' },
];

export const PHYSICIAN_PROFILES: readonly string[] = PHYSICIAN_PROFILE_LIST.map((p) => p.url);

/**
 * Office coordinates: the pin on the practice's own Google Maps listing ("Apollo Physicians", family
 * practice physician), read on 5 Nov 2026 as 38.4601913, -121.4131662 and rounded to five decimals.
 * It sits on Timberlake Way next to Highway 99. The US Census geocoder and OpenStreetMap placed the
 * address about 240 m west (38.45994, -121.41591); street-range geocoders interpolate along the road
 * and can miss a building set back from it, so the business's own pin is used. The practice should
 * confirm the pin in its Google Business Profile (docs/seo/client-confirmations.md, item 39).
 */
export const GEO = { latitude: 38.46019, longitude: -121.41317 } as const;

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
/**
 * Online booking URL. The practice has none (docs/seo/client-confirmations.md, item 28), so this is null
 * and the mobile bar shows a single Call button. Set it to the booking page URL to add "Book online"
 * to the mobile bar and to start counting booking clicks. Use an https URL on a HIPAA-appropriate vendor.
 */
export const BOOKING_URL: string | null = null;

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
