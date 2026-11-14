import {
  AREAS_SERVED,
  ASSETS,
  BRAND,
  GEO,
  NPI,
  OFFICE,
  OFFICE_HOURS,
  PHONES,
  PHYSICIAN_PROFILES,
  SITE_URL,
  absoluteUrl,
} from '@/data/site';
import { CREDENTIALS, INITIAL_VISIT_FROM, PHYSICIAN_LANGUAGES, PROVIDER } from '@/data/practice';
import { CLINICAL_REVIEW, PAGE_META, isLive, reviewDateFor, type PageKey } from '@/data/pages';
import type { Crumb } from '@/data/navigation';
import type { FaqItem } from '@/types';
import { mapsPlaceUrl } from '@/lib/utils';

/**
 * schema.org JSON-LD for the Apollo Physicians pages. Each page renders one linked @graph with stable,
 * absolute @ids, so every reference resolves inside every document.
 *
 * Rules this file follows:
 * - Only facts that are visible on the page and present in src/data are emitted.
 * - Not emitted, because they are not confirmed (docs/seo/client-confirmations.md): openingHours (until
 *   OFFICE_HOURS is set), knowsLanguage, hospitalAffiliation, other providers, and any plan beyond the owner's list.
 * - lastReviewed and reviewedBy appear only after Dr. Panesar has reviewed the health content
 *   (CLINICAL_REVIEW.reviewedOn is set), so a review can never be claimed before it happened.
 * - No AggregateRating or Review: Google ignores self-serving review markup, and the real counts are unconfirmed.
 * - FAQPage mirrors the visible FAQ text exactly.
 * - medicalSpecialty is PrimaryCare: schema.org has no "Family Practice" value, so "FamilyPractice" is invalid.
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

function areaServed(): Node[] {
  const place = (name: string): Node => ({ '@type': 'Place', name });
  const zip = (postalCode: string): Node => ({
    '@type': 'Place',
    name: `ZIP code ${postalCode}`,
    address: { '@type': 'PostalAddress', postalCode, addressCountry: 'US' },
  });
  return [
    ...AREAS_SERVED.cities.map((name) => ({ '@type': 'City', name })),
    ...AREAS_SERVED.neighborhoods.map(place),
    ...[...AREAS_SERVED.zipSacramento, ...AREAS_SERVED.zipElkGrove].map(zip),
  ];
}

/** Services appear in the schema only when their page is live (and so reviewed by Dr. Panesar). */
function availableServices(): Node[] {
  const services: Node[] = [];
  if (isLive(PAGE_META.annualPhysical)) services.push({ '@type': 'MedicalProcedure', name: 'Annual physical exam' });
  if (isLive(PAGE_META.immigration)) services.push({ '@type': 'MedicalProcedure', name: 'USCIS immigration medical examination (Form I-693)' });
  return services;
}

function openingHours(): Node[] | null {
  if (!OFFICE_HOURS) return null;
  return OFFICE_HOURS.map((row) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [...row.days],
    opens: row.opens,
    closes: row.closes,
  }));
}

export function clinicNode(): Node {
  const hours = openingHours();
  const services = availableServices();
  return {
    // MedicalClinic is a subtype of MedicalOrganization, MedicalBusiness, LocalBusiness and Organization.
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    name: BRAND.name,
    ...(BRAND.legalName ? { legalName: BRAND.legalName } : {}),
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: ASSETS.logo },
    image: ASSETS.shareCard,
    telephone: PHONES.main.tel,
    medicalSpecialty: SPECIALTY_ENUM,
    address: postalAddress(),
    // The pin on the practice's own Google listing (see GEO in src/data/site.ts).
    geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    hasMap: mapsPlaceUrl(OFFICE.line),
    areaServed: areaServed(),
    isAcceptingNewPatients: true,
    // The plans are listed on the insurance page. paymentAccepted means payment methods, so it says only that.
    paymentAccepted: 'Health insurance, self-pay',
    priceRange: `From ${INITIAL_VISIT_FROM}`,
    ...(hours ? { openingHoursSpecification: hours } : {}),
    ...(services.length ? { availableService: services } : {}),
    employee: { '@id': PHYSICIAN_ID },
  };
}

export function physicianNode(): Node {
  return {
    // schema.org defines Physician as a medical organization, not a person, so honorificPrefix,
    // honorificSuffix, worksFor and the credential properties are only valid because the node is also typed Person.
    '@type': ['Physician', 'Person'],
    '@id': PHYSICIAN_ID,
    // Name parts follow schema.org: the honorifics are separate from the name itself.
    name: PROVIDER.fullName,
    honorificPrefix: PROVIDER.honorificPrefix,
    honorificSuffix: PROVIDER.honorificSuffix,
    url: absoluteUrl(PAGE_META.panesar.path),
    // Physician profiles on other sites, each checked to show this physician at this office.
    sameAs: PHYSICIAN_PROFILES,
    telephone: PHONES.main.tel,
    medicalSpecialty: SPECIALTY_ENUM,
    address: postalAddress(),
    worksFor: { '@id': CLINIC_ID },
    identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.panesar },
    knowsLanguage: PHYSICIAN_LANGUAGES.map((lang) => ({ '@type': 'Language', name: lang.name, alternateName: lang.code })),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Board certification',
        name: 'Board certified in family medicine',
        recognizedBy: { '@type': 'Organization', name: CREDENTIALS.boardBody },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'License',
        name: `California medical license ${CREDENTIALS.licenseNumber}`,
        recognizedBy: { '@type': 'GovernmentOrganization', name: CREDENTIALS.licenseBody },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Designation',
        name: 'USCIS-designated civil surgeon',
        recognizedBy: { '@type': 'GovernmentOrganization', name: 'U.S. Citizenship and Immigration Services' },
      },
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: CREDENTIALS.medicalSchool,
        address: { '@type': 'PostalAddress', addressLocality: 'Ludhiana', addressRegion: 'Punjab', addressCountry: 'IN' },
      },
      { '@type': 'CollegeOrUniversity', name: 'University of Arkansas for Medical Sciences' },
    ],
    knowsAbout: ['Family medicine', 'Immigration medical exams', 'Preventive care'],
  };
}

interface WebPageInput {
  path: string;
  /** The page title, identical to the <title> tag. */
  name: string;
  description: string;
  /** "ProfilePage" for the physician page, "MedicalWebPage" for health information, "WebPage" otherwise. */
  type?: 'WebPage' | 'ProfilePage' | 'MedicalWebPage';
  /** True when the page shows a breadcrumb trail (the home page does not). */
  breadcrumb?: boolean;
  /** True when the page shows an FAQ. */
  faq?: boolean;
  /** The entity the page is about. Defaults to the clinic. */
  about?: 'clinic' | 'physician';
  /** Date of the last content change (YYYY-MM-DD), from PAGE_META.lastModified. */
  dateModified?: string;
  /** Review date for this page when it differs from CLINICAL_REVIEW (second review batch). */
  lastReviewed?: string | null;
}

/** One WebPage (or ProfilePage, or MedicalWebPage) node per page, tying the site, entity, breadcrumb and FAQ together. */
export function webPageNode({ path, name, description, type = 'WebPage', breadcrumb = false, faq = false, about = 'clinic', dateModified, lastReviewed = CLINICAL_REVIEW.reviewedOn }: WebPageInput): Node {
  const subject = { '@id': about === 'physician' ? PHYSICIAN_ID : CLINIC_ID };
  const reviewed = type === 'MedicalWebPage' && lastReviewed;
  return {
    '@type': type,
    '@id': webPageId(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: 'en-US',
    ...(dateModified ? { dateModified } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    ...(type === 'ProfilePage' ? { mainEntity: subject } : { about: subject }),
    ...(breadcrumb ? { breadcrumb: { '@id': breadcrumbId(path) } } : {}),
    ...(faq ? { hasPart: { '@id': faqId(path) } } : {}),
    // Read aloud by voice assistants: the direct-answer paragraph (and nothing else) carries data-speakable.
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['[data-speakable]'] },
    ...(reviewed ? { lastReviewed, reviewedBy: { '@id': PHYSICIAN_ID } } : {}),
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

interface PageGraphInput {
  key: PageKey;
  faqs?: readonly FaqItem[];
  breadcrumb?: readonly Crumb[];
  about?: 'clinic' | 'physician';
}

/**
 * The full JSON-LD document for one page: site, clinic, physician, the page itself, and its FAQ and
 * breadcrumb when it shows them. Clinical pages are typed MedicalWebPage; the physician page is a ProfilePage.
 */
export function pageGraph({ key, faqs, breadcrumb, about }: PageGraphInput): Node {
  const meta: { path: string; title: string; description: string; clinical?: boolean; secondReview?: boolean; lastModified: string } = {
    ...PAGE_META[key],
  };
  const type: WebPageInput['type'] = key === 'panesar' ? 'ProfilePage' : meta.clinical ? 'MedicalWebPage' : 'WebPage';
  return graph(
    websiteNode(),
    clinicNode(),
    physicianNode(),
    webPageNode({
      path: meta.path,
      name: meta.title,
      description: meta.description,
      type,
      dateModified: meta.lastModified,
      lastReviewed: reviewDateFor(meta),
      about: about ?? (key === 'panesar' ? 'physician' : 'clinic'),
      breadcrumb: Boolean(breadcrumb),
      faq: Boolean(faqs?.length),
    }),
    ...(faqs?.length ? [faqNode(meta.path, faqs)] : []),
    ...(breadcrumb ? [breadcrumbNode(meta.path, breadcrumb)] : []),
  );
}
