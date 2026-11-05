import { ASSETS, BRAND, GEO, NPI, OFFICE, PHONES, PHYSICIAN_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { PROVIDER } from '@/data/practice';
import type { Crumb } from '@/data/navigation';
import type { FaqItem } from '@/types';
import { mapsPlaceUrl } from '@/lib/utils';

/**
 * schema.org JSON-LD for the Apollo Physicians pages. Each page renders one linked @graph with stable,
 * absolute @ids, so every reference resolves inside every document.
 *
 * Rules this file follows:
 * - Only facts that are visible on the page and present in src/data are emitted.
 * - Not emitted, because they are unconfirmed (docs/seo/client-confirmations.md): openingHours,
 *   priceRange, isAcceptingNewPatients, hasCredential, knowsLanguage, hospitalAffiliation, legalName
 *   (until BRAND.legalName is set), the organisation NPI, and accepted insurance. schema.org has no
 *   property for "accepts plan X" on a clinic, and paymentAccepted means payment methods, so the plan
 *   list stays as visible page content only.
 * - No AggregateRating or Review: there is no real, current, on-page rating.
 * - FAQPage is for machine readability; it mirrors the visible FAQ text exactly.
 */

type Node = Record<string, unknown>;

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const PHYSICIAN_ID = `${SITE_URL}/#dr-paramjit-panesar`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Prefix for page-level ids: the home page keeps its trailing slash so fragments read cleanly. */
function pageBase(path: string): string {
  return path === '/' ? `${SITE_URL}/` : absoluteUrl(path);
}

export const webPageId = (path: string) => `${pageBase(path)}#webpage`;
export const faqId = (path: string) => `${pageBase(path)}#faq`;
export const breadcrumbId = (path: string) => `${pageBase(path)}#breadcrumb`;

/** schema.org enumeration value for the specialty. "FamilyPractice" is not a schema.org value; PrimaryCare is. */
const SPECIALTY_ENUM = 'https://schema.org/PrimaryCare';

const postalAddress = (): Node => ({
  '@type': 'PostalAddress',
  streetAddress: OFFICE.street,
  addressLocality: OFFICE.city,
  addressRegion: OFFICE.state,
  postalCode: OFFICE.postalCode,
  addressCountry: 'US',
});

/** WebSite node. Published by the clinic, so it links to the clinic entity by @id. */
export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    inLanguage: 'en-US',
    publisher: { '@id': CLINIC_ID },
  };
}

export function clinicNode(): Node {
  return {
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    name: BRAND.name,
    // Only when the practice has confirmed the legal name (BRAND.legalName is null until then).
    ...(BRAND.legalName ? { legalName: BRAND.legalName } : {}),
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: ASSETS.logo },
    image: ASSETS.shareCard,
    telephone: PHONES.main.tel,
    medicalSpecialty: SPECIALTY_ENUM,
    address: postalAddress(),
    // Cross-checked: US Census geocoder and OpenStreetMap agree to within a few metres.
    geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    hasMap: mapsPlaceUrl(OFFICE.line),
    employee: { '@id': PHYSICIAN_ID },
  };
}

export function physicianNode(): Node {
  return {
    // schema.org defines Physician as a medical organization, not a person, so honorificPrefix,
    // honorificSuffix and worksFor are only valid because the node is also typed Person.
    '@type': ['Physician', 'Person'],
    '@id': PHYSICIAN_ID,
    // Name parts follow schema.org: the honorifics are separate from the name itself.
    name: PROVIDER.fullName,
    honorificPrefix: PROVIDER.honorificPrefix,
    honorificSuffix: PROVIDER.honorificSuffix,
    url: absoluteUrl('/dr-paramjit-panesar'),
    // Physician profiles on other sites, each checked to show this physician at this office.
    sameAs: PHYSICIAN_PROFILES,
    telephone: PHONES.main.tel,
    medicalSpecialty: SPECIALTY_ENUM,
    address: postalAddress(),
    worksFor: { '@id': CLINIC_ID },
    identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.panesar },
  };
}

interface WebPageInput {
  path: string;
  /** The page title, identical to the <title> tag. */
  name: string;
  description: string;
  /** "ProfilePage" for the physician page, "WebPage" otherwise. */
  type?: 'WebPage' | 'ProfilePage';
  /** True when the page shows a breadcrumb trail (the home page does not). */
  breadcrumb?: boolean;
  /** True when the page shows an FAQ. */
  faq?: boolean;
  /** The entity the page is about. Defaults to the clinic. */
  about?: 'clinic' | 'physician';
}

/** One WebPage (or ProfilePage) node per page, tying the site, entity, breadcrumb and FAQ together. */
export function webPageNode({ path, name, description, type = 'WebPage', breadcrumb = false, faq = false, about = 'clinic' }: WebPageInput): Node {
  const subject = { '@id': about === 'physician' ? PHYSICIAN_ID : CLINIC_ID };
  return {
    '@type': type,
    '@id': webPageId(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    ...(type === 'ProfilePage' ? { mainEntity: subject } : { about: subject }),
    ...(breadcrumb ? { breadcrumb: { '@id': breadcrumbId(path) } } : {}),
    ...(faq ? { hasPart: { '@id': faqId(path) } } : {}),
  };
}

/** FAQPage built from the same arrays the page renders. Pass only items that are also visible. */
export function faqNode(path: string, faqs: readonly FaqItem[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': faqId(path),
    isPartOf: { '@id': webPageId(path) },
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** BreadcrumbList built from the same trail the page shows. */
export function breadcrumbNode(path: string, items: readonly Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Wraps nodes in a single @graph document for one page. */
export function graph(...nodes: Node[]): Node {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
