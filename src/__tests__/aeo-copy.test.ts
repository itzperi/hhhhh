import { describe, expect, it } from 'vitest';
import {
  ELK_GROVE_FAQS,
  HOME_FAQS,
  HOME_LEAD,
  INITIAL_VISIT_PRICE,
  PANESAR_FAQS,
  PANESAR_LEAD,
} from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { faqNode } from '@/lib/structured-data';

/**
 * Step 4: direct-answer copy. Answers lead with a complete sentence, use only facts in the data files,
 * and the FAQPage schema carries exactly the text the page shows.
 */

const ALL_SETS = [
  ['home', HOME_FAQS],
  ['elk-grove', ELK_GROVE_FAQS],
  ['panesar', PANESAR_FAQS],
] as const;

const firstSentence = (text: string) => text.split(/(?<=[.!?])\s/)[0] ?? '';

describe('lead sentences', () => {
  it('state the practice, its specialty and the address in one quotable sentence', () => {
    expect(HOME_LEAD).toBe(`Apollo Physicians is a family medicine practice at ${OFFICE.line}.`);
    expect(PANESAR_LEAD).toContain('Apollo Physicians');
    expect(PANESAR_LEAD).toContain(OFFICE.line);
    expect(PANESAR_LEAD.startsWith('Dr. Paramjit Panesar, MD, practices family medicine')).toBe(true);
  });
});

describe.each(ALL_SETS)('%s FAQ', (_name, faqs) => {
  it('has question-form headings and complete answers', () => {
    for (const faq of faqs) {
      expect(faq.question.endsWith('?'), faq.question).toBe(true);
      expect(faq.answer.endsWith('.'), faq.question).toBe(true);
      expect(faq.answer.length).toBeGreaterThan(30);
    }
  });

  it('opens each answer with the answer itself, not an instruction to call', () => {
    for (const faq of faqs) {
      const bookingQuestion = /book/i.test(faq.question);
      if (!bookingQuestion) expect(firstSentence(faq.answer), faq.question).not.toMatch(/^Call /);
    }
  });

  it('names the practice, so an answer quoted alone still identifies it', () => {
    for (const faq of faqs) expect(/Apollo Physicians|Dr\. (Paramjit )?Panesar|Elk Grove patients/.test(faq.answer), faq.question).toBe(true);
  });

  it('has the FAQPage schema carry exactly the visible questions and answers', () => {
    const node = faqNode('x', faqs) as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(node.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(faqs.map((f) => [f.question, f.answer]));
  });

  it('has no duplicate questions', () => {
    expect(new Set(faqs.map((f) => f.question)).size).toBe(faqs.length);
  });
});

describe('only confirmed or already-published facts are answered', () => {
  const text = ALL_SETS.flatMap(([, faqs]) => faqs.flatMap((f) => [f.question, f.answer])).join('\n');

  it('makes no claim about hours, new-patient status, credentials, languages or affiliations', () => {
    expect(text).not.toMatch(/\bhours\b|\bopen\b|new patients?|accepting|board[- ]certified|speaks|languages?|affiliat|hospital|years of experience/i);
  });

  it('covers the required questions that have confirmed answers', () => {
    const questions = HOME_FAQS.map((f) => f.question).join('\n');
    for (const pattern of [/located/i, /book/i, /insurance/i, /initial visit/i, /same-day or next-day/i, /Elk Grove/i, /Who is Dr\./i]) {
      expect(questions).toMatch(pattern);
    }
  });

  it('keeps the price and phone identical to the shared data', () => {
    expect(INITIAL_VISIT_PRICE).toBe('Initial doctor visits start at $65.');
    expect(text).toContain(PHONES.main.display);
    // One price answer on the home page and one on the Elk Grove page; the physician page gives none.
    expect(text.match(/\$\d+/g)).toEqual(['$65', '$65']);
  });
});
