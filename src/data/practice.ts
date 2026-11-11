import type { FaqItem } from '@/types';
import { ELK_GROVE_DRIVE, LOCATION, OFFICE, PHONES } from './site';

/**
 * Every claim the pages make, with its source.
 *
 * Sources:
 * - OWNER: stated by the owner in the project brief of 6 Nov 2026 (docs/seo/client-confirmations.md).
 * - CHECKED: read by us on 6 Nov 2026 in Google Maps or a public registry.
 * - Anything not listed here is not shown. The facts the owner asked to confirm first (office hours, languages,
 *   other clinicians, extra services and extra plans) are deliberately absent. They are listed in
 *   docs/seo/client-confirmations.md under "open facts".
 */

/**
 * OWNER. The accepted insurance, in the owner's order. Sutter Health, Hill Physicians and Nivano Physicians are
 * medical groups. Medi-Cal and Nivano Physicians were confirmed on 11 Nov 2026 (Medi-Cal: "most plans"; the plan
 * names were not supplied, so the copy says "most Medi-Cal plans" and asks people to call).
 */
export const INSURANCE_ACCEPTED: readonly string[] = [
  'Aetna',
  'Anthem Blue Cross',
  'Blue Shield of California',
  'Cigna',
  'Health Net',
  'UnitedHealthcare',
  'Sutter Health',
  'Hill Physicians',
  'Nivano Physicians',
  'Medicare',
  'Medi-Cal',
];

/** The same list split by type, for the insurance page. */
export const INSURANCE_GROUPS = [
  {
    type: 'Health plan',
    names: ['Aetna', 'Anthem Blue Cross', 'Blue Shield of California', 'Cigna', 'Health Net', 'UnitedHealthcare'],
  },
  { type: 'Medicare', names: ['Medicare'] },
  { type: 'Medi-Cal', names: ['Medi-Cal (most plans)'] },
  { type: 'Medical group or network', names: ['Sutter Health', 'Hill Physicians', 'Nivano Physicians'] },
] as const;

/** Date the practice last supplied the plan list. Shown on the insurance page. */
export const INSURANCE_LIST_DATE = '11 November 2026';

/** CONFIRMED 11 Nov 2026 (item 27): telemedicine for patients in California. Visit types were not supplied. */
export const TELEMEDICINE = 'Telemedicine visits for patients in California.';

/** OWNER: initial self-pay visits start at $65. What the price includes has not been supplied. */
export const INITIAL_VISIT_FROM = '$65';
export const INITIAL_VISIT_PRICE = `Initial self-pay visits start at ${INITIAL_VISIT_FROM}.`;

/** OWNER: same-day and next-day appointments; new patients accepted. */
export const APPOINTMENT_AVAILABILITY = 'Same-day and next-day appointments.';

/** OWNER and NPPES: family medicine. */
export const SPECIALTY = 'Family Medicine';

/** Names used on the pages. */
export const PROVIDER = {
  name: 'Dr. Paramjit Panesar, MD',
  shortName: 'Dr. Paramjit Panesar',
  fullName: 'Paramjit Panesar',
  honorificPrefix: 'Dr.',
  honorificSuffix: 'MD',
} as const;

/**
 * OWNER: the physician's credentials. Each can be checked by the public: license on the Medical Board of
 * California search, certification on the ABMS site, civil surgeon designation on the USCIS tool.
 * Languages spoken are NOT confirmed (the owner asked to confirm first), so none is published.
 */
export const CREDENTIALS = {
  boardBody: 'American Board of Family Medicine',
  boardShort: 'ABFM',
  licenseNumber: 'A 114684',
  licenseBody: 'Medical Board of California',
  licenseSince: '2010',
  medicalSchool: 'Dayanand Medical College',
  medicalSchoolYear: '2004',
  residency: 'University of Arkansas for Medical Sciences (UAMS)',
  residencyYears: '2007 to 2010',
  civilSurgeon: 'USCIS-designated civil surgeon (Form I-693 immigration medical exams)',
} as const;

/** Public places to check the credentials above. */
export const VERIFY_LINKS = {
  license: { label: 'Medical Board of California license search', href: 'https://search.dca.ca.gov/' },
  certification: { label: 'ABMS Verify Certification', href: 'https://www.abms.org/verify-certification/' },
  civilSurgeon: { label: 'USCIS Find a Civil Surgeon', href: 'https://www.uscis.gov/tools/find-a-civil-surgeon' },
  i693: { label: 'USCIS Form I-693', href: 'https://www.uscis.gov/i-693' },
  medicare: { label: 'Medicare.gov', href: 'https://www.medicare.gov/' },
} as const;

/** One office, stated plainly and led with access. Elk Grove patients are seen at the Sacramento office. */
export const ELK_GROVE_NOTE = `Apollo Physicians has one office, in South Sacramento at ${OFFICE.line}. Elk Grove patients are seen there.`;

/**
 * Which published facts /llms.txt may carry. The owner confirmed each of these on 6 Nov 2026, so all are on.
 * Flip one to false to remove it from llms.txt if it ever needs to come down.
 */
export const LLMS_CONFIRMED = {
  insurance: true,
  price: true,
  appointmentAvailability: true,
  physicianNpi: true,
} as const;

/** Printed insurance list in reading order, e.g. "Aetna, Cigna, and Medicare". */
export function insuranceSentence(): string {
  const list = [...INSURANCE_ACCEPTED];
  const last = list.pop() ?? '';
  return `${list.join(', ')}, and ${last}`;
}

const CALL = PHONES.main.display;
const ELK_DRIVE = `about ${ELK_GROVE_DRIVE.minutes} minutes`;

/**
 * Direct-answer copy. Each answer opens with the answer, names the practice so it can be quoted alone,
 * and is 40 to 60 words (tests enforce this). Dr. Panesar's pronouns were not supplied, so none is used.
 */

/** 40 to 60 words, directly under the home page H1. Quotable on its own. */
export const HOME_DIRECT_ANSWER = `Apollo Physicians is a family medicine practice at ${OFFICE.line}, led by ${PROVIDER.name}, who is board certified in family medicine. The office offers same-day and next-day appointments, welcomes new patients, and accepts Medicare and several major health plans. Initial self-pay visits start at ${INITIAL_VISIT_FROM}. Call ${CALL}.`;

/** 40 to 60 words, directly under the Elk Grove page H1. */
export const ELK_GROVE_DIRECT_ANSWER = `Apollo Physicians is in South Sacramento at ${OFFICE.street}, and serves Elk Grove families with same-day and next-day appointments. Google Maps shows about ${ELK_GROVE_DRIVE.minutes} minutes by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic. New patients are welcome, and the office accepts Medicare and several major health plans. Call ${CALL}.`;

/** One quotable sentence, used inside answers. */
export const HOME_LEAD = `Apollo Physicians is a family medicine practice at ${OFFICE.line}.`;

/** 40 to 60 words, directly under the physician page H1. */
export const PANESAR_DIRECT_ANSWER = `${PROVIDER.name}, is a family physician at Apollo Physicians, ${OFFICE.line}. Dr. Panesar is board certified in family medicine by the ${CREDENTIALS.boardBody}, holds California medical license ${CREDENTIALS.licenseNumber}, and is a USCIS-designated civil surgeon. Call ${CALL} to book a visit.`;

/** Kept for the quotable sentence in answers. */
export const PANESAR_LEAD = `${PROVIDER.name}, practices family medicine at Apollo Physicians, ${OFFICE.line}.`;

export const HOME_FAQS: readonly FaqItem[] = [
  {
    question: 'Where is Apollo Physicians located?',
    answer: `${HOME_LEAD} The office is in South Sacramento, about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital} and next to ${LOCATION.highway}. ${PROVIDER.shortName} sees patients at this one office. Call ${CALL} for directions.`,
  },
  {
    question: 'How do I book an appointment?',
    answer: `Call Apollo Physicians at ${CALL} to book an appointment with ${PROVIDER.name}. Same-day and next-day appointments are offered, so ask for the next available time. New patients are welcome. Tell the office whether you have insurance or will pay yourself, and bring a photo ID to your visit.`,
  },
  {
    question: 'What insurance does Apollo Physicians accept?',
    answer: `Apollo Physicians accepts ${insuranceSentence()}. Plans and networks can change, so call ${CALL} to confirm your specific plan before your visit. The full list, with the date the practice provided it, is on the insurance page.`,
  },
  {
    question: 'How much is an initial visit?',
    answer: `An initial self-pay visit at Apollo Physicians starts at ${INITIAL_VISIT_FROM}. Self-pay means you pay the office directly instead of billing insurance. The final cost can depend on what your visit includes, so call ${CALL} to ask what is covered before you book. Patients with insurance should confirm their plan instead.`,
  },
  {
    question: 'Can I get a same-day or next-day appointment?',
    answer: `Yes. Apollo Physicians offers same-day and next-day appointments. Availability on a given day depends on the schedule, so call ${CALL} as early as you can and ask for the next opening. If you have an emergency, call 911 instead of the office.`,
  },
  {
    question: 'Does Apollo Physicians serve patients from Elk Grove?',
    answer: `Yes. Apollo Physicians serves Elk Grove families from its single office in South Sacramento. Google Maps shows ${ELK_DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 with usual traffic. Elk Grove patients book the same way as everyone else. Call ${CALL}.`,
  },
  {
    question: 'Who is Dr. Paramjit Panesar?',
    answer: `${PROVIDER.name}, is a family physician at Apollo Physicians in Sacramento. Dr. Panesar is board certified in family medicine by the ${CREDENTIALS.boardBody}, completed residency at UAMS, and is a USCIS-designated civil surgeon for immigration medical exams. Dr. Panesar sees patients at ${OFFICE.street}.`,
  },
  {
    question: 'Is Apollo Physicians accepting new patients?',
    answer: `Yes. Apollo Physicians is accepting new patients at ${OFFICE.street}, ${OFFICE.city}. To become a patient, call ${CALL}, tell the office your insurance plan or that you will pay yourself, and ask for the next available appointment. Bring a photo ID and your insurance card to the first visit.`,
  },
];

export const PANESAR_FAQS: readonly FaqItem[] = [
  {
    question: 'Who is Dr. Paramjit Panesar?',
    answer: `${PROVIDER.name}, is a family physician at Apollo Physicians in Sacramento. Dr. Panesar is board certified in family medicine, earned a medical degree from ${CREDENTIALS.medicalSchool} in ${CREDENTIALS.medicalSchoolYear}, and completed residency at UAMS from 2007 to 2010. Dr. Panesar holds an active California medical license issued in ${CREDENTIALS.licenseSince}.`,
  },
  {
    question: 'Is Dr. Panesar board certified?',
    answer: `Yes. ${PROVIDER.name}, is board certified in family medicine by the ${CREDENTIALS.boardBody}. You can check any physician's certification on the American Board of Medical Specialties website, and look up California license ${CREDENTIALS.licenseNumber} on the ${CREDENTIALS.licenseBody} license search, before you book an appointment.`,
  },
  {
    question: 'Where did Dr. Panesar train?',
    answer: `${PROVIDER.name}, earned a medical degree from ${CREDENTIALS.medicalSchool} in ${CREDENTIALS.medicalSchoolYear}. Dr. Panesar completed residency training at the ${CREDENTIALS.residency} from ${CREDENTIALS.residencyYears}. The California medical license, number ${CREDENTIALS.licenseNumber}, has been active since ${CREDENTIALS.licenseSince}, and can be checked on the Medical Board of California website.`,
  },
  {
    question: 'What is a USCIS civil surgeon?',
    answer: `A civil surgeon is a doctor designated by U.S. Citizenship and Immigration Services (USCIS) to perform the immigration medical exam and complete Form I-693. ${PROVIDER.name}, is a USCIS-designated civil surgeon at Apollo Physicians. You can confirm any designation with the USCIS Find a Civil Surgeon tool on uscis.gov.`,
  },
  {
    question: 'Where does Dr. Panesar see patients?',
    answer: `${PROVIDER.name}, sees patients at Apollo Physicians, ${OFFICE.line}, in South Sacramento near ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}. Patients also come from Elk Grove. Call ${CALL} to book a visit. Same-day and next-day appointments are offered.`,
  },
  {
    question: 'How do I book an appointment with Dr. Panesar?',
    answer: `Call Apollo Physicians at ${CALL} to book an appointment with ${PROVIDER.name}. Same-day and next-day appointments are offered, and new patients are welcome. Tell the office your insurance plan, or that you will pay yourself, and bring a photo ID and your insurance card to the visit.`,
  },
];

export const ELK_GROVE_FAQS: readonly FaqItem[] = [
  {
    question: 'Does Apollo Physicians serve patients from Elk Grove?',
    answer: `Yes. Elk Grove patients are seen at the one Apollo Physicians office, ${OFFICE.street}, in South Sacramento. Same-day and next-day appointments are offered, new patients are welcome, and the office accepts Medicare and several major health plans. Call ${CALL} to book your first visit.`,
  },
  {
    question: 'How long is the drive from Elk Grove?',
    answer: `Google Maps estimates ${ELK_DRIVE} by car from Elk Grove ZIP codes 95758 and 95624 to the Apollo Physicians office, with usual traffic. From 95758 the trip is about ${ELK_GROVE_DRIVE.milesFrom95758} miles via ${ELK_GROVE_DRIVE.routeFrom95758}. Your time depends on where you start and when you leave, so check Google Maps first.`,
  },
  {
    question: 'What route do Elk Grove patients take?',
    answer: `To reach the Apollo Physicians office from the 95758 area, Google Maps suggests ${ELK_GROVE_DRIVE.routeFrom95758}, or ${ELK_GROVE_DRIVE.altRouteFrom95758}. From the 95624 area it suggests ${ELK_GROVE_DRIVE.routeFrom95624}. The office is next to ${LOCATION.highway} on ${OFFICE.streetName}. Use Directions from Elk Grove for your own address.`,
  },
  {
    question: 'Which Elk Grove ZIP codes does Apollo Physicians serve?',
    answer: `Apollo Physicians serves patients from Elk Grove ZIP codes 95624, 95757 and 95758, from Sacramento ZIP codes 95823 and 95828, and from neighborhoods including Valley Hi, Laguna, Florin, Meadowview and Parkway. Patients from other areas can call ${CALL} to ask about booking at the South Sacramento office.`,
  },
  {
    question: 'Which insurance plans are accepted for Elk Grove patients?',
    answer: `Elk Grove patients use the same plans as every Apollo Physicians patient: ${insuranceSentence()}. Confirm your plan with the office at ${CALL} before you travel, because plans and networks can change.`,
  },
  {
    question: 'How much does an initial visit cost?',
    answer: `An initial self-pay visit at Apollo Physicians starts at ${INITIAL_VISIT_FROM}. Self-pay means you pay the office directly instead of billing insurance. Ask what is included in the visit when you call ${CALL}. Patients with insurance should confirm their plan and any copay with their insurer before booking.`,
  },
  {
    question: 'Can Elk Grove patients get a same-day or next-day appointment?',
    answer: `Yes. Apollo Physicians offers same-day and next-day appointments, and Elk Grove patients book the same way as every other patient. Call ${CALL} early in the day and ask for the next opening. Because the drive takes ${ELK_DRIVE}, confirm your time with the office before you leave home.`,
  },
  {
    question: 'Is the office near a hospital?',
    answer: `Yes. The Apollo Physicians office is about ${LOCATION.hospitalDistance}, roughly a 9-minute walk, from ${LOCATION.nearHospital} at 7500 Hospital Dr, and next to ${LOCATION.highway}. Being nearby does not mean the practice is part of the hospital. Call ${CALL} for directions or to book an appointment.`,
  },
];
