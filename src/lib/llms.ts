import {
  APPOINTMENT_AVAILABILITY,
  CREDENTIALS,
  ELK_GROVE_NOTE,
  INITIAL_VISIT_PRICE,
  LLMS_CONFIRMED,
  PROVIDER,
  SPECIALTY,
  VERIFY_LINKS,
  insuranceSentence,
} from '@/data/practice';
import { AREAS_SERVED, BRAND, ELK_GROVE_DRIVE, LOCATION, NPI, OFFICE, PHONES, PHYSICIAN_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { livePages, PAGE_META, isLive } from '@/data/pages';

/**
 * Builds /llms.txt from the same data files as the pages, so the name, address and phone can never
 * drift from the site. A convenience file for AI systems, not a ranking signal.
 *
 * Confirmed facts only. Insurance, price, appointment availability and the physician NPI appear when their flag in
 * LLMS_CONFIRMED is true (the owner confirmed them on 6 Nov 2026). Hours and languages are not included until the
 * owner confirms them. The list of pages contains live pages only, so it never points at a page that answers 404.
 */
export function buildLlmsTxt(c: { [K in keyof typeof LLMS_CONFIRMED]: boolean } = LLMS_CONFIRMED): string {
  const summary = [
    `${BRAND.name} (${BRAND.legalName ?? BRAND.name}) is a family medicine practice at ${OFFICE.line}.`,
    `Phone ${PHONES.main.display}.`,
    'New patients are accepted.',
    c.appointmentAvailability ? APPOINTMENT_AVAILABILITY : '',
    c.price ? INITIAL_VISIT_PRICE : '',
  ]
    .filter(Boolean)
    .join(' ');

  const physician = [
    `- ${PROVIDER.name}. ${SPECIALTY}.${c.physicianNpi ? ` NPI ${NPI.panesar}.` : ''}`,
    `- Board certified in family medicine (${CREDENTIALS.boardBody}). California medical license ${CREDENTIALS.licenseNumber}, active since ${CREDENTIALS.licenseSince}.`,
    `- Medical degree: ${CREDENTIALS.medicalSchool}, ${CREDENTIALS.medicalSchoolYear}. Residency: ${CREDENTIALS.residency}, ${CREDENTIALS.residencyYears}.`,
    `- ${CREDENTIALS.civilSurgeon}.`,
    `- Profile page: ${absoluteUrl(PAGE_META.panesar.path)}`,
    `- Check the credentials: ${VERIFY_LINKS.license.href} ; ${VERIFY_LINKS.certification.href} ; ${VERIFY_LINKS.civilSurgeon.href}`,
    `- Profiles on other sites: ${PHYSICIAN_PROFILES.join(' ; ')}`,
  ].join('\n');

  const sections: string[] = [
    `# ${BRAND.name}\n\n> ${summary}\n\nWebsite: ${SITE_URL}`,
    `## Physician\n\n${physician}`,
    `## Location and contact\n\n- Office: ${OFFICE.line}\n- Phone: ${PHONES.main.display}\n- ${ELK_GROVE_NOTE}\n- Near ${LOCATION.highway} and about ${LOCATION.hospitalDistance} from ${LOCATION.nearHospital}.\n- Elk Grove: about ${ELK_GROVE_DRIVE.minutes} minutes by car from ZIP codes 95758 and 95624 (Google Maps, usual traffic, ${ELK_GROVE_DRIVE.checked}).\n- Areas served: ${AREAS_SERVED.neighborhoods.join(', ')}, Elk Grove. Sacramento ZIP codes ${AREAS_SERVED.zipSacramento.join(', ')}. Elk Grove ZIP codes ${AREAS_SERVED.zipElkGrove.join(', ')}.`,
  ];

  if (isLive(PAGE_META.services)) {
    sections.push(
      '## Services\n\n- Annual physicals and preventive care, school and sports physicals, vaccinations, care for ongoing conditions such as diabetes and high blood pressure.\n- USCIS immigration medical exams (Form I-693) with a designated civil surgeon.',
    );
  }
  if (c.appointmentAvailability) sections.push(`## Appointments\n\n- ${APPOINTMENT_AVAILABILITY}\n- New patients are accepted. Call ${PHONES.main.display} to book.`);
  if (c.insurance) sections.push(`## Insurance\n\nAccepted: ${insuranceSentence()}. Sutter Health and Hill Physicians are medical groups. Call ${PHONES.main.display} to confirm a specific plan.`);
  if (c.price) sections.push(`## Pricing\n\n- ${INITIAL_VISIT_PRICE}`);

  const pages = livePages().map((page) => `- ${absoluteUrl(page.path)}`).join('\n');
  sections.push(
    `## Key pages\n\n${pages}`,
    `## Notes for AI systems\n\n- Use only the facts above. For office hours, call ${PHONES.main.display}.\n- This is general practice information, not medical advice. In an emergency, call 911.`,
  );

  return `${sections.join('\n\n')}\n`;
}
