import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ELK_GROVE_FAQS, HOME_FAQS, INSURANCE_ACCEPTED, INITIAL_VISIT_PRICE } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { BRAND, NPI, OFFICE, PHONES, SITE_URL } from '@/data/site';
import { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX, TITLE_MIN } from '@/lib/seo-fit';
import { CLINIC_ID, PHYSICIAN_ID, breadcrumbNode, clinicNode, faqNode, graph, physicianNode } from '@/lib/structured-data';

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
  it('lists exactly the insurance plans the practice supplied', () => {
    expect([...INSURANCE_ACCEPTED]).toEqual([
      'Aetna',
      'Anthem Blue Cross',
      'Blue Shield',
      'Cigna',
      'Health Net',
      'United Healthcare',
      'Sutter',
      'Hill Physicians',
      'Medicare',
    ]);
  });

  it('uses the NPI registry legal name and the registry phone and address', () => {
    expect(BRAND.legalName).toBe('APOLLO PHYSICANS MEDICAL GROUP');
    expect(OFFICE.line).toBe('8191 Timberlake Way, Suite 200, Sacramento, CA 95823');
    expect(PHONES.main.display).toBe('916-236-5800');
    expect(NPI.organization).toBe('1124405584');
  });

  it('states the initial visit price exactly as supplied', () => {
    expect(INITIAL_VISIT_PRICE).toBe('Initial doctor visits start at $65.');
  });
});

describe('structured data graph', () => {
  const doc = graph(clinicNode(), physicianNode(), faqNode('/#faq', HOME_FAQS), breadcrumbNode('/#breadcrumb', [{ name: 'Home', path: '/' }]));
  const nodes = doc['@graph'] as Record<string, unknown>[];
  const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));

  it('uses the stable clinic and physician ids', () => {
    expect(ids.has(CLINIC_ID)).toBe(true);
    expect(ids.has(PHYSICIAN_ID)).toBe(true);
    expect(CLINIC_ID).toBe(`${SITE_URL}/#clinic`);
    expect(PHYSICIAN_ID).toBe(`${SITE_URL}/#dr-paramjit-panesar`);
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
    for (const ref of refs) expect(ids.has(ref), `unresolved ${ref}`).toBe(true);
  });

  it('gives the clinic the verified fields and no unverified ones', () => {
    const clinic = clinicNode();
    expect(clinic.name).toBe('Apollo Physicians');
    expect(clinic.legalName).toBe('APOLLO PHYSICANS MEDICAL GROUP');
    expect(clinic.telephone).toBe('+19162365800');
    expect(clinic.medicalSpecialty).toEqual(['FamilyPractice']);
    expect(clinic.identifier).toEqual({ '@type': 'PropertyValue', propertyID: 'NPI', value: '1124405584' });
    expect(clinic.paymentAccepted).toBe(INSURANCE_ACCEPTED.join(', '));
    for (const field of ['geo', 'isAcceptingNewPatients', 'areaServed', 'openingHoursSpecification']) {
      expect(clinic).not.toHaveProperty(field);
    }
  });

  it('mirrors each FAQ page one for one', () => {
    const faq = faqNode('/#faq', HOME_FAQS) as { mainEntity: unknown[] };
    expect(faq.mainEntity).toHaveLength(HOME_FAQS.length);
    const elk = faqNode('/family-physician-elk-grove#faq', ELK_GROVE_FAQS) as { mainEntity: unknown[] };
    expect(elk.mainEntity).toHaveLength(ELK_GROVE_FAQS.length);
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
    const UNVERIFIED = ['Medi-Cal', 'Nivano', 'Rivercity', 'River City', 'female', 'Wikidata', 'minutes', 'Board-certified', 'accepting new patients'];
    const hits: string[] = [];
    for (const file of files('src/data').concat(files('src/app'), files('src/components'))) {
      const text = readFileSync(file, 'utf8');
      for (const word of UNVERIFIED) if (text.toLowerCase().includes(word.toLowerCase())) hits.push(`${file}: ${word}`);
    }
    expect(hits).toEqual([]);
  });
});
