/**
 * Search titles and descriptions for each indexable page. Lengths are enforced by
 * src/__tests__/apollo-content.test.ts and by scripts/verify-apollo-pivot.mjs.
 */
export const PAGE_META = {
  home: {
    path: '/',
    /** Date of the last content change (YYYY-MM-DD), used for the sitemap lastmod value. */
    lastModified: '2026-11-04',
    title: 'Family Physician in Sacramento, CA | Apollo Physicians',
    description:
      'Family physician in Sacramento at Apollo Physicians, 8191 Timberlake Way, Suite 200. Same-day and next-day appointments. Call 916-236-5800 to book.',
  },
  elkGrove: {
    path: '/family-physician-elk-grove',
    lastModified: '2026-11-04',
    title: 'Family Physician for Elk Grove Patients | Apollo Physicians',
    description:
      'Family physician for Elk Grove patients at Apollo Physicians, 8191 Timberlake Way, Suite 200, Sacramento. Same-day and next-day appointments. Call 916-236-5800.',
  },
  panesar: {
    path: '/dr-paramjit-panesar',
    lastModified: '2026-11-04',
    title: 'Dr. Paramjit Panesar, Family Doctor | Apollo Physicians',
    description:
      'Dr. Paramjit Panesar, MD, practices family medicine at Apollo Physicians, 8191 Timberlake Way, Suite 200, Sacramento. Call 916-236-5800 to book an appointment.',
  },
} as const;
