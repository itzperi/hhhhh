import type { FaqItem } from '@/types';
import { OFFICE, PHONES } from './site';

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
export const INITIAL_VISIT_FROM = '$65';
export const INITIAL_VISIT_PRICE = `Initial doctor visits start at ${INITIAL_VISIT_FROM}.`;

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

/**
 * One office, stated plainly and led with access. Elk Grove patients are seen at the Sacramento office
 * (CLIENT: the practice's keyword list says patients travel to Sacramento). No drive time is stated:
 * it must be measured in Google Maps first (docs/seo/client-confirmations.md, item 20).
 */
export const ELK_GROVE_NOTE = `Apollo Physicians has one office, in South Sacramento at ${OFFICE.line}. Elk Grove patients are seen there.`;

/** Printed insurance list in reading order, e.g. "Aetna, Cigna, and Medicare". */
export function insuranceSentence(): string {
  const list = [...INSURANCE_ACCEPTED];
  const last = list.pop() ?? '';
  return `${list.join(', ')}, and ${last}`;
}

/**
 * Direct-answer copy (Step 4). Each answer opens with a complete sentence that names the practice and
 * can be quoted on its own, then adds detail. Only facts already in this file are used. Questions whose
 * facts are not confirmed (office hours and new-patient status) are deliberately not asked here:
 * see docs/seo/client-confirmations.md, items 6 and 8.
 */

/** First sentence under the home page H1. Quotable on its own. */
export const HOME_LEAD = `Apollo Physicians is a family medicine practice at ${OFFICE.line}.`;

/** First sentence under the physician page H1. */
export const PANESAR_LEAD = `${PROVIDER.name}, practices family medicine at Apollo Physicians, ${OFFICE.line}.`;

const CALL_TO_CONFIRM_PLAN = `Call ${PHONES.main.display} to confirm your plan before your visit.`;

export const HOME_FAQS: readonly FaqItem[] = [
  {
    question: 'Where is Apollo Physicians located?',
    answer: `${HOME_LEAD} Dr. Paramjit Panesar, MD, sees patients at this office.`,
  },
  {
    question: 'How do I book an appointment?',
    answer: `Call Apollo Physicians at ${PHONES.main.display} to book an appointment.`,
  },
  {
    question: 'What insurance does Apollo Physicians accept?',
    answer: `Apollo Physicians accepts ${insuranceSentence()}. ${CALL_TO_CONFIRM_PLAN}`,
  },
  {
    question: 'How much is an initial visit?',
    answer: `Initial doctor visits at Apollo Physicians start at ${INITIAL_VISIT_FROM}.`,
  },
  {
    question: 'Can I get a same-day or next-day appointment?',
    answer: `Apollo Physicians lists same-day and next-day appointments. Call ${PHONES.main.display} to ask about the next available slot.`,
  },
  {
    question: 'Does Apollo Physicians serve patients from Elk Grove?',
    answer: `Yes. Elk Grove patients are seen at the Apollo Physicians office at ${OFFICE.line}.`,
  },
  {
    question: 'Who is Dr. Paramjit Panesar?',
    answer: `${PROVIDER.name}, practices family medicine at Apollo Physicians in Sacramento.`,
  },
];

export const PANESAR_FAQS: readonly FaqItem[] = [
  {
    question: 'Who is Dr. Paramjit Panesar?',
    answer: `${PROVIDER.name}, is a family medicine physician at Apollo Physicians in Sacramento.`,
  },
  {
    question: 'Where does Dr. Panesar see patients?',
    answer: `Dr. Panesar sees patients at Apollo Physicians, ${OFFICE.line}.`,
  },
  {
    question: 'How do I book an appointment with Dr. Panesar?',
    answer: `Call Apollo Physicians at ${PHONES.main.display} to book an appointment.`,
  },
];

export const ELK_GROVE_FAQS: readonly FaqItem[] = [
  {
    question: 'Does Apollo Physicians serve patients from Elk Grove?',
    answer: 'Yes. Apollo Physicians serves Elk Grove families from its single office in South Sacramento.',
  },
  {
    question: 'Where should Elk Grove patients go for their visit?',
    answer: `Elk Grove patients visit the Apollo Physicians office in South Sacramento. Before you travel, call ${PHONES.main.display} to confirm your appointment.`,
  },
  {
    question: 'Which insurance plans are accepted for Elk Grove patients?',
    answer: `Elk Grove patients use the same plans as every Apollo Physicians patient: ${insuranceSentence()}. Confirm your plan with the office at ${PHONES.main.display} before you travel.`,
  },
  {
    question: 'How much does an initial visit cost?',
    answer: `An initial doctor visit at Apollo Physicians starts at ${INITIAL_VISIT_FROM}.`,
  },
  {
    question: 'Can Elk Grove patients get a same-day or next-day appointment?',
    answer: `Apollo Physicians lists same-day and next-day appointments, and Elk Grove patients book the same way as every other patient. To find the next available time, call ${PHONES.main.display}.`,
  },
];
