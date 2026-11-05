import { OFFICE, PHONES } from './site';

/**
 * Search titles and descriptions for each indexable page. Lengths are enforced by
 * src/__tests__/apollo-content.test.ts and by scripts/verify-apollo-pivot.mjs.
 */
export const PAGE_META = {
  home: {
    path: '/',
    /** Date of the last content change (YYYY-MM-DD), used for the sitemap lastmod value. */
    lastModified: '2026-11-05',
    title: 'Family Physician in Sacramento, CA | Apollo Physicians',
    description:
      `Family physician in Sacramento at Apollo Physicians, ${OFFICE.street}. Same-day and next-day appointments. Call ${PHONES.main.display} to book.`,
  },
  elkGrove: {
    path: '/family-physician-elk-grove',
    lastModified: '2026-11-05',
    title: 'Family Physician for Elk Grove Patients | Apollo Physicians',
    description:
      `Family physician for Elk Grove patients at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. Same-day and next-day appointments. Call ${PHONES.main.display}.`,
  },
  panesar: {
    path: '/dr-paramjit-panesar',
    lastModified: '2026-11-05',
    title: 'Dr. Paramjit Panesar, Family Doctor | Apollo Physicians',
    description:
      `Dr. Paramjit Panesar, MD, practices family medicine at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. Call ${PHONES.main.display} to book an appointment.`,
  },
} as const;
