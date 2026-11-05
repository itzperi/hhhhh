import { ASSETS, BRAND, NPI, OFFICE, PHONES, SAME_AS_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { INSURANCE_ACCEPTED, PROVIDER, SPECIALTY } from '@/data/practice';
import type { FaqItem } from '@/types';

/**
 * schema.org JSON-LD for the Apollo Physicians pages. Each page renders one @graph.
 * The clinic and physician nodes use stable @ids, so references resolve inside every document.
 * Only facts in src/data/practice.ts and site.ts are emitted.
 */

type Node = Record<string, unknown>;

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const PHYSICIAN_ID = `${SITE_URL}/#dr-paramjit-panesar`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

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
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': CLINIC_ID,
    name: BRAND.name,
    // Only when the practice has confirmed the legal name (BRAND.legalName is null until then).
    ...(BRAND.legalName ? { legalName: BRAND.legalName } : {}),
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: ASSETS.logo },
    image: ASSETS.shareCard,
    sameAs: SAME_AS_PROFILES,
    telephone: PHONES.main.tel,
    medicalSpecialty: ['FamilyPractice'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE.street,
      addressLocality: OFFICE.city,
      addressRegion: OFFICE.state,
      postalCode: OFFICE.postalCode,
      addressCountry: 'US',
    },
    identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.organization },
    paymentAccepted: INSURANCE_ACCEPTED.join(', '),
    employee: { '@id': PHYSICIAN_ID },
  };
}

export function physicianNode(): Node {
  return {
    '@type': 'Physician',
    '@id': PHYSICIAN_ID,
    // Name parts follow schema.org: the honorifics are separate from the name itself.
    name: PROVIDER.fullName,
    honorificPrefix: PROVIDER.honorificPrefix,
    honorificSuffix: PROVIDER.honorificSuffix,
    url: `${SITE_URL}/dr-paramjit-panesar`,
    sameAs: SAME_AS_PROFILES,
    telephone: PHONES.main.tel,
    medicalSpecialty: 'FamilyPractice',
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE.street,
      addressLocality: OFFICE.city,
      addressRegion: OFFICE.state,
      postalCode: OFFICE.postalCode,
      addressCountry: 'US',
    },
    worksFor: { '@id': CLINIC_ID },
    identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.panesar },
  };
}

/** FAQPage built from the same arrays the page renders. Pass only items that are also visible. */
export function faqNode(id: string, faqs: readonly FaqItem[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbNode(id: string, items: readonly { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
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
