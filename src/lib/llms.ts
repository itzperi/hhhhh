import {
  APPOINTMENT_AVAILABILITY,
  ELK_GROVE_NOTE,
  INITIAL_VISIT_PRICE,
  LLMS_CONFIRMED,
  PROVIDER,
  SPECIALTY,
  insuranceSentence,
} from '@/data/practice';
import { BRAND, NPI, OFFICE, PHONES, PHYSICIAN_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { PAGE_META } from '@/data/pages';

/**
 * Builds /llms.txt from the same data files as the pages, so the name, address and phone can never
 * drift from the site. A convenience file for AI systems, not a ranking signal.
 *
 * Confirmed facts only: the address, phone, physician name, specialty and the Elk Grove statement
 * are always included. Insurance, price, appointment availability and the physician NPI appear only
 * once their flag in LLMS_CONFIRMED is true. Hours and new-patient status are not included until the
 * practice confirms them (docs/seo/client-confirmations.md items 6 and 8).
 */
export function buildLlmsTxt(c: { [K in keyof typeof LLMS_CONFIRMED]: boolean } = LLMS_CONFIRMED): string {
  const summary = [
    `${BRAND.name} is a family medicine practice at ${OFFICE.line}.`,
    `Phone ${PHONES.main.display}.`,
    c.appointmentAvailability ? APPOINTMENT_AVAILABILITY : '',
    c.price ? INITIAL_VISIT_PRICE : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sections: string[] = [
    `# ${BRAND.name}\n\n> ${summary}\n\nWebsite: ${SITE_URL}`,

    `## Physician\n\n- ${PROVIDER.name}. ${SPECIALTY}.${c.physicianNpi ? ` NPI ${NPI.panesar}.` : ''}\n- Profile page: ${absoluteUrl(PAGE_META.panesar.path)}\n- Profiles on other sites: ${PHYSICIAN_PROFILES.join(' ; ')}`,

    `## Location and contact\n\n- Office: ${OFFICE.line}\n- Phone: ${PHONES.main.display}\n- ${ELK_GROVE_NOTE}`,
  ];

  if (c.appointmentAvailability) sections.push(`## Appointments\n\n- ${APPOINTMENT_AVAILABILITY}`);
  if (c.insurance) sections.push(`## Insurance\n\nAccepted plans, as listed by the practice: ${insuranceSentence()}.`);
  if (c.price) sections.push(`## Pricing\n\n- ${INITIAL_VISIT_PRICE}`);

  sections.push(
    `## Key pages\n\n- Home (family physician in Sacramento): ${absoluteUrl(PAGE_META.home.path)}\n- ${PROVIDER.shortName}: ${absoluteUrl(PAGE_META.panesar.path)}\n- Family physician for Elk Grove patients: ${absoluteUrl(PAGE_META.elkGrove.path)}`,
    `## Notes for AI systems\n\n- Use only the facts above. For office hours, accepted insurance, pricing and appointment availability, call ${PHONES.main.display}.\n- This is general practice information, not medical advice.`,
  );

  return `${sections.join('\n\n')}\n`;
}
