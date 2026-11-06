import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GET } from '@/app/llms.txt/route';
import { buildLlmsTxt } from '@/lib/llms';
import { PAGE_META } from '@/data/pages';
import { FOOTER_COLUMNS } from '@/data/navigation';
import { BRAND, OFFICE, PHONES } from '@/data/site';
import { clinicNode, physicianNode } from '@/lib/structured-data';

/**
 * Entity consistency (Step 2): one phone, one address and one business name across the site, meta tags,
 * schema and llms.txt. src/data/site.ts is the only file allowed to contain them as literals.
 */

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const SITE_DATA = join('src', 'data', 'site.ts');
const SOURCE_FILES = files('src').filter((f) => /\.(ts|tsx|css|mjs)$/.test(f) && !f.includes('__tests__'));
const PUBLISHED_FILES = SOURCE_FILES.concat(files('public').filter((f) => /\.(txt|xml|html|json|webmanifest)$/.test(f)));

const PHONE_PATTERN = /(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}|\+1\d{10}/g;

/** Numbers found in directories or the NPI registry that must never be published as a phone line. */
const NON_PUBLIC_NUMBERS = [
  '916-266-7473', // NPPES fax number for the organisation
  '916-824-3278', // legacy number named by the client, role unconfirmed
  '916-655-9883',
  '916-281-5963',
  '800-470-0071',
  '916-781-1927',
];

describe('one source of truth for phone and address', () => {
  it('has no phone-number literal in src/ or public/ outside src/data/site.ts', () => {
    const hits: string[] = [];
    for (const file of PUBLISHED_FILES.filter((f) => f !== SITE_DATA)) {
      const matches = readFileSync(file, 'utf8').match(PHONE_PATTERN);
      if (matches) hits.push(`${file}: ${matches.join(', ')}`);
    }
    expect(hits).toEqual([]);
  });

  it('has no street-address literal in src/ or public/ outside src/data/site.ts', () => {
    const hits: string[] = [];
    for (const file of PUBLISHED_FILES.filter((f) => f !== SITE_DATA)) {
      // Doc comments may quote the address as an example; only code and copy matter.
      const text = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
      if (/Timberlake|8191/.test(text)) hits.push(file);
    }
    expect(hits).toEqual([]);
  });

  it('never publishes a fax, tracking or unconfirmed legacy number', () => {
    const hits: string[] = [];
    for (const file of PUBLISHED_FILES) {
      const text = readFileSync(file, 'utf8');
      for (const number of NON_PUBLIC_NUMBERS) if (text.includes(number)) hits.push(`${file}: ${number}`);
    }
    expect(hits).toEqual([]);
  });

  it('builds the office line from its parts', () => {
    expect(OFFICE.line).toBe(`${OFFICE.street}, ${OFFICE.city}, ${OFFICE.state} ${OFFICE.postalCode}`);
  });
});

describe('page meta reads the shared data', () => {
  it.each(Object.values(PAGE_META).map((p) => [p.path, p] as const))('%s description carries the phone', (_path, page) => {
    expect(page.description).toContain(PHONES.main.display);
  });

  it('puts the office street in the descriptions of the pages about the office and its physician', () => {
    for (const key of ['home', 'newPatients', 'annualPhysical', 'elkGrove', 'panesar'] as const) {
      expect(PAGE_META[key].description, key).toContain(OFFICE.street);
    }
  });

  it('footer call link is built from the shared phone', () => {
    const booking = FOOTER_COLUMNS.find((c) => c.title === 'Booking');
    expect(booking?.links).toEqual([{ label: `Call ${PHONES.main.display}`, href: `tel:${PHONES.main.tel}` }]);
  });
});

describe('business name', () => {
  it('uses the confirmed legal name and never the registry typo', () => {
    expect(BRAND.legalName).toBe('Apollo Physicians Medical Group');
    const hits: string[] = [];
    for (const file of PUBLISHED_FILES.filter((f) => f !== SITE_DATA)) {
      const text = readFileSync(file, 'utf8');
      if (/PHYSICANS/i.test(text)) hits.push(relative('.', file).split(sep).join('/'));
    }
    expect(hits).toEqual([]);
  });

  it('shows the legal name in the footer and the schema only', () => {
    expect(clinicNode().legalName).toBe(BRAND.legalName);
    expect(readFileSync('src/components/layout/Footer.tsx', 'utf8')).toContain('BRAND.legalName');
  });

  it('keeps the brand name identical in schema and llms.txt', () => {
    expect(clinicNode().name).toBe(BRAND.name);
    expect(buildLlmsTxt().startsWith(`# ${BRAND.name}\n`)).toBe(true);
  });
});

describe('llms.txt', () => {
  const text = buildLlmsTxt();

  it('carries the shared address and phone and no other phone number', () => {
    expect(text).toContain(OFFICE.line);
    expect(text).toContain(PHONES.main.display);
    const phones = new Set((text.match(PHONE_PATTERN) ?? []).map((p) => p.trim()));
    expect([...phones]).toEqual([PHONES.main.display]);
  });

  it('is served as plain text', async () => {
    const response = GET();
    expect(response.headers.get('content-type')).toContain('text/plain');
    expect(await response.text()).toBe(text);
  });
});

describe('schema nodes use the shared phone', () => {
  it('clinic and physician telephone match PHONES', () => {
    expect(clinicNode().telephone).toBe(PHONES.main.tel);
    expect(physicianNode().telephone).toBe(PHONES.main.tel);
  });
});
