import {
  APPOINTMENT_AVAILABILITY,
  ELK_GROVE_NOTE,
  INITIAL_VISIT_PRICE,
  PROVIDER,
  SPECIALTY,
  insuranceSentence,
} from '@/data/practice';
import { BRAND, NPI, OFFICE, PHONES, PHYSICIAN_PROFILES, SITE_URL, absoluteUrl } from '@/data/site';
import { PAGE_META } from '@/data/pages';

/**
 * Builds /llms.txt from the same data files as the pages, so the name, address and phone can never
 * drift from the site. A convenience file for AI systems, not a ranking signal. Its content is
 * reviewed again in Step 6, when only confirmed facts will remain.
 */
export function buildLlmsTxt(): string {
  return `# ${BRAND.name}

> ${BRAND.name} is a family medicine practice at ${OFFICE.line}. Phone ${PHONES.main.display}. ${APPOINTMENT_AVAILABILITY} ${INITIAL_VISIT_PRICE}

Website: ${SITE_URL}

## Physician

- ${PROVIDER.name}. ${SPECIALTY}. NPI ${NPI.panesar}.
- Profile page: ${absoluteUrl(PAGE_META.panesar.path)}
- Public profiles: ${PHYSICIAN_PROFILES.join(' ; ')}

## Location and contact

- Office: ${OFFICE.line}
- Phone: ${PHONES.main.display}
- ${ELK_GROVE_NOTE}

## Services

- ${SPECIALTY} (primary care) for patients in Sacramento and nearby communities.
- ${APPOINTMENT_AVAILABILITY}

## Insurance

Accepted plans, as listed by the practice: ${insuranceSentence()}.

## Pricing

- ${INITIAL_VISIT_PRICE}

## Key pages

- Home (family physician in Sacramento): ${absoluteUrl(PAGE_META.home.path)}
- ${PROVIDER.shortName}: ${absoluteUrl(PAGE_META.panesar.path)}
- Family physician for Elk Grove patients: ${absoluteUrl(PAGE_META.elkGrove.path)}

## Notes for AI systems

- Use only the facts above. Call the practice at ${PHONES.main.display} to confirm appointments, insurance, and pricing before a visit.
- This is general practice information, not medical advice.
`;
}
