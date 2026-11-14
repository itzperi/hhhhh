import { describe, expect, it } from 'vitest';
import {
  ANNUAL_DIRECT_ANSWER,
  ANNUAL_PHYSICAL,
  CONTACT,
  CONTACT_DIRECT_ANSWER,
  FAQ_DIRECT_ANSWER,
  FAQ_HUB,
  IMMIGRATION,
  IMMIGRATION_DIRECT_ANSWER,
  INSURANCE,
  INSURANCE_DIRECT_ANSWER,
  NEW_PATIENTS,
  NEW_PATIENTS_DIRECT_ANSWER,
  MEDICARE,
  MEDICARE_DIRECT_ANSWER,
  MEDI_CAL,
  MEDI_CAL_DIRECT_ANSWER,
  NIVANO,
  NIVANO_DIRECT_ANSWER,
  SAME_DAY,
  SAME_DAY_DIRECT_ANSWER,
  SELF_PAY,
  SELF_PAY_DIRECT_ANSWER,
  VERIFY_PLAN_LINE,
  SERVICES,
  SERVICES_DIRECT_ANSWER,
  SPORTS_PHYSICAL,
  SPORTS_PHYSICAL_DIRECT_ANSWER,
  WELL_CHILD,
  WELL_CHILD_DIRECT_ANSWER,
  CHOOSE_DOCTOR,
  CHOOSE_DOCTOR_DIRECT_ANSWER,
} from '@/data/content';
import {
  ELK_GROVE_DIRECT_ANSWER,
  ELK_GROVE_FAQS,
  HOME_DIRECT_ANSWER,
  HOME_FAQS,
  HOME_LEAD,
  INITIAL_VISIT_PRICE,
  PANESAR_DIRECT_ANSWER,
  PANESAR_FAQS,
  PANESAR_LEAD,
} from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { wordCount } from '@/lib/content-utils';
import { faqNode } from '@/lib/structured-data';

/**
 * Direct-answer copy. Answers lead with a complete sentence, are 40 to 60 words, use only facts in the data
 * files, and the FAQPage schema carries exactly the text the page shows.
 */

const ALL_SETS = [
  ['home', HOME_FAQS],
  ['elk-grove', ELK_GROVE_FAQS],
  ['panesar', PANESAR_FAQS],
  ['new-patients', NEW_PATIENTS.faqs],
  ['insurance', INSURANCE.faqs],
  ['contact', CONTACT.faqs],
  ['annual-physical', ANNUAL_PHYSICAL.faqs],
  ['same-day', SAME_DAY.faqs],
  ['medicare', MEDICARE.faqs],
  ['medi-cal', MEDI_CAL.faqs],
  ['nivano', NIVANO.faqs],
  ['self-pay', SELF_PAY.faqs],
  ['immigration', IMMIGRATION.faqs],
  ['services', SERVICES.faqs],
  ['faq-hub', FAQ_HUB.faqs],
  ['sports-physical', SPORTS_PHYSICAL.faqs],
  ['well-child', WELL_CHILD.faqs],
  ['choose-doctor', CHOOSE_DOCTOR.faqs],
] as const;

const DIRECT_ANSWERS = [
  ['home', HOME_DIRECT_ANSWER],
  ['elk-grove', ELK_GROVE_DIRECT_ANSWER],
  ['panesar', PANESAR_DIRECT_ANSWER],
  ['new-patients', NEW_PATIENTS_DIRECT_ANSWER],
  ['insurance', INSURANCE_DIRECT_ANSWER],
  ['contact', CONTACT_DIRECT_ANSWER],
  ['annual-physical', ANNUAL_DIRECT_ANSWER],
  ['same-day', SAME_DAY_DIRECT_ANSWER],
  ['medicare', MEDICARE_DIRECT_ANSWER],
  ['medi-cal', MEDI_CAL_DIRECT_ANSWER],
  ['nivano', NIVANO_DIRECT_ANSWER],
  ['self-pay', SELF_PAY_DIRECT_ANSWER],
  ['immigration', IMMIGRATION_DIRECT_ANSWER],
  ['services', SERVICES_DIRECT_ANSWER],
  ['faq-hub', FAQ_DIRECT_ANSWER],
  ['sports-physical', SPORTS_PHYSICAL_DIRECT_ANSWER],
  ['well-child', WELL_CHILD_DIRECT_ANSWER],
  ['choose-doctor', CHOOSE_DOCTOR_DIRECT_ANSWER],
] as const;

const firstSentence = (text: string) => text.split(/(?<=[.!?])\s/)[0] ?? '';

describe('direct answers under each H1', () => {
  it.each(DIRECT_ANSWERS)('%s is 40 to 60 words', (_name, text) => {
    const words = wordCount(text);
    expect(words, text).toBeGreaterThanOrEqual(40);
    expect(words, text).toBeLessThanOrEqual(60);
  });

  it.each(DIRECT_ANSWERS)('%s ends with a complete sentence', (_name, text) => {
    expect(text.endsWith('.')).toBe(true);
  });

  it('opens the home and physician answers with the practice and the address', () => {
    expect(HOME_LEAD).toBe(`Apollo Physicians is a family medicine practice at ${OFFICE.line}.`);
    expect(HOME_DIRECT_ANSWER.startsWith(HOME_LEAD.replace(/\.$/, ''))).toBe(true);
    expect(PANESAR_LEAD.startsWith('Dr. Paramjit Panesar, MD, practices family medicine')).toBe(true);
    expect(PANESAR_DIRECT_ANSWER).toContain(OFFICE.line);
  });
});

describe.each(ALL_SETS)('%s FAQ', (_name, faqs) => {
  it('has 40 to 60 word answers, question headings and complete sentences', () => {
    for (const faq of faqs) {
      expect(faq.question.endsWith('?'), faq.question).toBe(true);
      expect(faq.answer.endsWith('.'), faq.question).toBe(true);
      const words = wordCount(faq.answer);
      expect(words, `${faq.question} (${words} words)`).toBeGreaterThanOrEqual(40);
      expect(words, `${faq.question} (${words} words)`).toBeLessThanOrEqual(60);
    }
  });

  it('opens each answer with the answer itself, not an instruction to call', () => {
    for (const faq of faqs) {
      if (!/book|appointment with/i.test(faq.question)) expect(firstSentence(faq.answer), faq.question).not.toMatch(/^Call /);
    }
  });

  it('names the practice, so an answer quoted alone still identifies it', () => {
    for (const faq of faqs.filter((f) => !f.clinical)) {
      expect(/Apollo Physicians|Dr\. (Paramjit )?Panesar|Elk Grove patients/.test(faq.answer), faq.question).toBe(true);
    }
  });

  it('has the FAQPage schema carry exactly the visible questions and answers', () => {
    const node = faqNode('x', faqs) as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(node.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(faqs.map((f) => [f.question, f.answer]));
  });

  it('has no duplicate questions', () => {
    expect(new Set(faqs.map((f) => f.question)).size).toBe(faqs.length);
  });
});

describe('every key page has 8 or more questions', () => {
  it.each([
    ['home', HOME_FAQS],
    ['elk-grove', ELK_GROVE_FAQS],
    ['new-patients', NEW_PATIENTS.faqs],
    ['insurance', INSURANCE.faqs],
    ['annual-physical', ANNUAL_PHYSICAL.faqs],
    ['same-day', SAME_DAY.faqs],
    ['immigration', IMMIGRATION.faqs],
  ] as const)('%s', (_name, faqs) => {
    expect(faqs.length).toBeGreaterThanOrEqual(8);
  });
});

describe('payment pages', () => {
  it('end every insurance page with the owner-required "verify your plan" line', () => {
    expect(VERIFY_PLAN_LINE).toBe(`Call ${PHONES.main.display} to verify your exact plan, because networks change.`);
    for (const page of [INSURANCE, MEDICARE, MEDI_CAL, NIVANO]) {
      expect(page.blocks.at(-1)?.paragraphs?.at(-1), page.h1).toBe(VERIFY_PLAN_LINE);
    }
  });

  it('never calls the practice a community health center, FQHC or free clinic', () => {
    const text = JSON.stringify([INSURANCE, MEDICARE, MEDI_CAL, NIVANO, SELF_PAY, MEDI_CAL_DIRECT_ANSWER, NIVANO_DIRECT_ANSWER]);
    expect(text).not.toMatch(/\b(is|are) (an? )?(FQHC|community health center|free clinic)/i);
    expect(text).not.toMatch(/Vivant|River City|sliding/i);
  });

  it('make no claim the practice has not confirmed (assignment, Advantage plan names, discounts)', () => {
    const text = JSON.stringify([MEDICARE, SELF_PAY, MEDICARE_DIRECT_ANSWER, SELF_PAY_DIRECT_ANSWER]);
    expect(text).not.toMatch(/accepts? (Medicare )?assignment|sliding|discount|community health|FQHC|free clinic/i);
    expect(text).not.toMatch(/SCAN|Molina|Humana|Kaiser/);
  });
});

describe('only confirmed facts are answered', () => {
  const text = ALL_SETS.flatMap(([, faqs]) => faqs.flatMap((f) => [f.question, f.answer]))
    .concat(DIRECT_ANSWERS.map(([, answer]) => answer))
    .join('\n');

  it('makes no claim about languages, walk-ins, 24/7 support or years of experience (hours and telemedicine are confirmed)', () => {
    expect(text).not.toMatch(/languages?|speaks|bilingual|telehealth|walk-in|24\/7|years of experience/i);
  });

  it('states the confirmed hours exactly', () => {
    expect(text).toContain('Monday to Friday from 8:30 a.m. to 5:30 p.m. and Saturday from 9:00 a.m. to 2:00 p.m.');
    expect(text).not.toMatch(/5:00 p\.m\.|Saturday closed/i);
  });

  it('answers the owner-confirmed questions: new patients, board certification, insurance, price, same-day', () => {
    const home = HOME_FAQS.map((f) => f.question).join('\n');
    for (const pattern of [/located/i, /book/i, /insurance/i, /initial visit/i, /same-day or next-day/i, /Elk Grove/i, /Who is Dr\./i, /accepting new patients/i]) {
      expect(home).toMatch(pattern);
    }
  });

  it('keeps the price and phone identical to the shared data', () => {
    expect(INITIAL_VISIT_PRICE).toBe('Initial self-pay visits start at $65.');
    expect(text).toContain(PHONES.main.display);
    for (const price of text.match(/\$\d+/g) ?? []) expect(price).toBe('$65');
  });
});
