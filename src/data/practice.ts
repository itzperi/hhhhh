import type { FaqItem } from '@/types';
import { OFFICE } from './site';

/**
 * Every claim the pages make, with its source.
 *
 * Rules for this file:
 * - A fact is included only when it is in the NPPES record or was supplied by the practice.
 * - Facts the practice supplied are marked CLIENT. They come from the practice's own website
 *   (apollophysicians.com) as reported to us. The build environment could not open that site,
 *   so re-check each CLIENT item against the live page before launch.
 * - Anything not listed here is not shown: no bios, hours, travel times, coordinates, or
 *   payer names beyond the list below.
 */

/** CLIENT: apollophysicians.com/content/insurance. */
export const INSURANCE_ACCEPTED: readonly string[] = [
  'Aetna',
  'Anthem Blue Cross',
  'Blue Shield',
  'Cigna',
  'Health Net',
  'United Healthcare',
  'Sutter',
  'Hill Physicians',
  'Medicare',
];

/** CLIENT: apollophysicians.com/content/insurance. */
export const INITIAL_VISIT_PRICE = 'Initial doctor visits start at $65.';

/** CLIENT: apollophysicians.com homepage, wording used exactly. */
export const APPOINTMENT_AVAILABILITY = 'Same-day and next-day appointments.';

/** NPPES: taxonomy 207Q00000X (Family Medicine) on NPI 1124405584 and NPI 1982892659. */
export const SPECIALTY = 'Family Medicine';

/** Names used on the pages. CLIENT: the practice's provider page lists Dr. Panesar. */
export const PROVIDER = {
  name: 'Dr. Paramjit Panesar, MD',
  shortName: 'Dr. Paramjit Panesar',
  fullName: 'Paramjit Panesar',
  honorificPrefix: 'Dr.',
  honorificSuffix: 'MD',
} as const;

/** Elk Grove has no office. CLIENT: the practice's keyword list says patients travel to Sacramento. */
export const ELK_GROVE_NOTE =
  'Apollo Physicians does not operate an Elk Grove office. Elk Grove patients see providers at the Sacramento office.';

/** Printed insurance list in reading order, e.g. "Aetna, Cigna, and Medicare". */
export function insuranceSentence(): string {
  const list = [...INSURANCE_ACCEPTED];
  const last = list.pop() ?? '';
  return `${list.join(', ')}, and ${last}`;
}

export const HOME_FAQS: readonly FaqItem[] = [
  {
    question: 'Where is Apollo Physicians?',
    answer: `Apollo Physicians is at ${OFFICE.line}.`,
  },
  {
    question: 'How do I make an appointment?',
    answer: `Call 916-236-5800. ${APPOINTMENT_AVAILABILITY}`,
  },
  {
    question: 'What insurance does Apollo Physicians accept?',
    answer: `Apollo Physicians accepts ${insuranceSentence()}.`,
  },
  {
    question: 'How much is an initial visit?',
    answer: INITIAL_VISIT_PRICE,
  },
];

export const ELK_GROVE_FAQS: readonly FaqItem[] = [
  {
    question: 'Do you have an office in Elk Grove?',
    answer: ELK_GROVE_NOTE,
  },
  {
    question: 'Where should Elk Grove patients go for their visit?',
    answer: `Visit the Sacramento office at ${OFFICE.line}. Call 916-236-5800 before you travel to confirm your appointment.`,
  },
  {
    question: 'Which insurance plans are accepted for Elk Grove patients?',
    answer: `The same plans as every patient: ${insuranceSentence()}.`,
  },
  {
    question: 'How much does an initial visit cost?',
    answer: INITIAL_VISIT_PRICE,
  },
  {
    question: 'How soon can I be seen?',
    answer: `${APPOINTMENT_AVAILABILITY} Call 916-236-5800 to ask about the next available slot.`,
  },
];
