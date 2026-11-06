import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ELK_GROVE_FAQS, HOME_FAQS, INSURANCE_ACCEPTED, INSURANCE_GROUPS, INITIAL_VISIT_PRICE } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { BRAND, GEO, NPI, OFFICE, OFFICE_HOURS, PHONES, PHYSICIAN_PROFILES, SITE_URL } from '@/data/site';
import { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX, TITLE_MIN } from '@/lib/seo-fit';
import { CLINIC_ID, PHYSICIAN_ID, WEBSITE_ID, clinicNode, faqNode, graph, physicianNode, webPageNode, websiteNode } from '@/lib/structured-data';

const PAGES = Object.values(PAGE_META);

describe('page titles and descriptions', () => {
  it.each(PAGES.map((p) => [p.path, p] as const))('%s is inside the length rules', (_path, page) => {
    expect(page.title.length).toBeGreaterThanOrEqual(TITLE_MIN);
    expect(page.title.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(page.description.length).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
    expect(page.description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
  });

  it('only the home page targets "Family Physician in Sacramento" in its title', () => {
    const targeting = PAGES.filter((p) => p.title.includes('Family Physician in Sacramento'));
    expect(targeting.map((p) => p.path)).toEqual(['/']);
  });

  it('every page title carries the brand suffix', () => {
    for (const page of PAGES) expect(page.title.endsWith(`| ${BRAND.name}`)).toBe(true);
  });
});

describe('verified facts', () => {
  it('lists exactly the insurance the owner supplied on 6 Nov 2026', () => {
    expect([...INSURANCE_ACCEPTED]).toEqual([
      'Aetna',
      'Anthem Blue Cross',
      'Blue Shield of California',
      'Cigna',
      'Health Net',
      'UnitedHealthcare',
      'Sutter Health',
      'Hill Physicians',
      'Medicare',
    ]);
  });

  it('does not list plans the owner still has to confirm', () => {
    const all = JSON.stringify([INSURANCE_ACCEPTED, INSURANCE_GROUPS]);
    for (const plan of ['Nivano', 'Medi-Cal', 'Medicaid', 'Brand New Day', 'Imperial', 'Western Health Advantage']) {
      expect(all).not.toContain(plan);
    }
  });

  it('uses the confirmed phone, address and legal name', () => {
    expect(BRAND.name).toBe('Apollo Physicians');
    expect(BRAND.legalName).toBe('Apollo Physicians Medical Group');
    expect(OFFICE.line).toBe('8191 Timberlake Way, Suite 200, Sacramento, CA 95823');
    expect(PHONES.main.display).toBe('916-236-5800');
    expect(NPI.organization).toBe('1124405584');
  });

  it('states the initial self-pay price as supplied', () => {
    expect(INITIAL_VISIT_PRICE).toBe('Initial self-pay visits start at $65.');
  });

  it('keeps the unconfirmed facts out: no hours until the owner chooses a set', () => {
    expect(OFFICE_HOURS).toBeNull();
  });
});

describe('structured data graph', () => {
  const doc = graph(
    websiteNode(),
    clinicNode(),
    physicianNode(),
    webPageNode({ path: '/', name: 'x', description: 'y', faq: true }),
    faqNode('/', HOME_FAQS),
  );
  const nodes = doc['@graph'] as Record<string, unknown>[];
  const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));

  it('uses the stable clinic and physician ids', () => {
    expect(ids.has(CLINIC_ID)).toBe(true);
    expect(ids.has(PHYSICIAN_ID)).toBe(true);
    expect(CLINIC_ID).toBe(`${SITE_URL}/#clinic`);
    expect(PHYSICIAN_ID).toBe(`${SITE_URL}/#dr-paramjit-panesar`);
  });

  it('gives every node an absolute @id', () => {
    for (const id of ids) expect(String(id).startsWith(`${SITE_URL}/`), String(id)).toBe(true);
  });

  it('resolves every @id reference inside the document', () => {
    const refs: string[] = [];
    const walk = (value: unknown) => {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === 'object') {
        for (const [key, child] of Object.entries(value)) {
          if (key === '@id' && typeof child === 'string') continue;
          if (key === '@id' || (typeof child === 'object' && child && '@id' in child)) {
            const id = (child as { '@id'?: string })['@id'];
            if (id) refs.push(id);
          }
          walk(child);
        }
      }
    };
    walk(nodes);
    expect(refs.length).toBeGreaterThan(0);
    for (const ref of refs) expect(ids.has(ref), `unresolved ${ref}`).toBe(true);
  });

  it('gives the clinic the confirmed fields and no unconfirmed ones', () => {
    const clinic = clinicNode();
    expect(clinic['@type']).toBe('MedicalClinic');
    expect(clinic.name).toBe('Apollo Physicians');
    expect(clinic.legalName).toBe('Apollo Physicians Medical Group');
    expect(clinic.telephone).toBe('+19162365800');
    expect(clinic.medicalSpecialty).toBe('https://schema.org/PrimaryCare');
    expect(clinic.geo).toEqual({ '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude });
    expect(clinic.isAcceptingNewPatients).toBe(true);
    expect(clinic.priceRange).toBe('From $65');
    expect(clinic.paymentAccepted).toBe('Health insurance, self-pay');
    expect(JSON.stringify(clinic.areaServed)).toContain('Elk Grove');
    for (const field of [
      'identifier',
      'sameAs',
      'openingHoursSpecification',
      'openingHours',
      'knowsLanguage',
      'hospitalAffiliation',
      'aggregateRating',
      'review',
    ]) {
      expect(clinic).not.toHaveProperty(field);
    }
  });

  it('never uses the invalid FamilyPractice specialty value', () => {
    expect(JSON.stringify(nodes)).not.toContain('FamilyPractice');
  });

  it('keeps the physician profiles on the physician', () => {
    const physician = physicianNode();
    expect(physician.sameAs).toEqual([...PHYSICIAN_PROFILES]);
    expect(PHYSICIAN_PROFILES.length).toBeGreaterThan(0);
    expect(physician.identifier).toEqual({ '@type': 'PropertyValue', propertyID: 'NPI', value: NPI.panesar });
    expect(physician.worksFor).toEqual({ '@id': CLINIC_ID });
  });

  it('puts the office inside plausible Sacramento coordinates', () => {
    expect(GEO.latitude).toBeGreaterThan(38.3);
    expect(GEO.latitude).toBeLessThan(38.7);
    expect(GEO.longitude).toBeGreaterThan(-121.7);
    expect(GEO.longitude).toBeLessThan(-121.2);
  });

  it('mirrors each FAQ page one for one', () => {
    const faq = faqNode('/', HOME_FAQS) as { mainEntity: unknown[] };
    expect(faq.mainEntity).toHaveLength(HOME_FAQS.length);
    const elk = faqNode('/family-physician-elk-grove', ELK_GROVE_FAQS) as { mainEntity: unknown[] };
    expect(elk.mainEntity).toHaveLength(ELK_GROVE_FAQS.length);
  });

  it('builds WebPage nodes that link the site, the entity, the FAQ and the breadcrumb', () => {
    const page = webPageNode({ path: '/family-physician-elk-grove', name: 'n', description: 'd', breadcrumb: true, faq: true }) as Record<string, unknown>;
    expect(page['@id']).toBe(`${SITE_URL}/family-physician-elk-grove#webpage`);
    expect(page.isPartOf).toEqual({ '@id': WEBSITE_ID });
    expect(page.about).toEqual({ '@id': CLINIC_ID });
    expect(page.breadcrumb).toEqual({ '@id': `${SITE_URL}/family-physician-elk-grove#breadcrumb` });
    expect(page.hasPart).toEqual({ '@id': `${SITE_URL}/family-physician-elk-grove#faq` });
    const profile = webPageNode({ path: '/dr-paramjit-panesar', name: 'n', description: 'd', type: 'ProfilePage', about: 'physician' }) as Record<string, unknown>;
    expect(profile['@type']).toBe('ProfilePage');
    expect(profile.mainEntity).toEqual({ '@id': PHYSICIAN_ID });
  });
});

describe('source tree is free of the previous organisation', () => {
  const FORBIDDEN = [
    'CHCA',
    'chcahealth',
    'Community Health Centers',
    '559-220-9380',
    'Fresno',
    'Merced',
    'Mariposa',
    'Gustine',
    'Turlock',
    'Livingston',
    'Chowchilla',
    'Salida',
    'Amandeep',
    'drparamjitpanesar',
  ];

  function files(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? files(path) : [path];
    });
  }

  it('contains none of the previous clinic names or domains', () => {
    const hits: string[] = [];
    for (const file of files('src').filter((f) => /\.(ts|tsx|css|mjs)$/.test(f) && !f.includes('__tests__'))) {
      const text = readFileSync(file, 'utf8');
      for (const word of FORBIDDEN) if (text.includes(word)) hits.push(`${file}: ${word}`);
    }
    expect(hits).toEqual([]);
  });

  it('makes no unverified claims in the copy', () => {
    const UNVERIFIED = ['Medi-Cal', 'Medicaid', 'Nivano', 'Rivercity', 'River City', 'female', 'Wikidata', 'Brand New Day', 'Western Health Advantage', 'telehealth', 'walk-in', '24/7', 'bilingual', 'Spanish', 'Punjabi', 'Hindi'];
    const hits: string[] = [];
    for (const file of files('src/data').concat(files('src/app'), files('src/components'))) {
      const text = readFileSync(file, 'utf8');
      for (const word of UNVERIFIED) if (text.toLowerCase().includes(word.toLowerCase())) hits.push(`${file}: ${word}`);
    }
    expect(hits).toEqual([]);
  });
});
