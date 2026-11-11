import { OFFICE, PHONES } from './site';

/**
 * Registry of every page: search title, description, sitemap date and whether it contains health
 * information. Titles are 50 to 60 characters and descriptions 140 to 160 (tests enforce both).
 *
 * Health-information pages (`clinical: true`) are held back until Dr. Paramjit Panesar has reviewed them:
 * the route answers 404, and the page is left out of the sitemap, the navigation and the llms.txt file.
 * To publish them, set CLINICAL_REVIEW.reviewedOn to the review date (YYYY-MM-DD). Everything that shows
 * "Medical review" and the schema `lastReviewed` value reads that one date, so it cannot be claimed early.
 */

export const CLINICAL_REVIEW = {
  reviewer: 'Dr. Paramjit Panesar, MD',
  /** PENDING. Set to the date Dr. Panesar approved the health content (see docs/clinical-review/). */
  reviewedOn: null as string | null,
};

export interface PageMeta {
  path: string;
  /** Date of the last content change (YYYY-MM-DD): the sitemap lastmod value. */
  lastModified: string;
  title: string;
  description: string;
  /** Contains health information, so it is published only once CLINICAL_REVIEW.reviewedOn is set. */
  clinical?: boolean;
  /** Label in the navigation. Omit to leave the page out of the main navigation. */
  navLabel?: string;
}

const TODAY = '2026-11-06';

export const PAGE_META = {
  home: {
    path: '/',
    lastModified: TODAY,
    title: 'Family Physician in Sacramento, CA | Apollo Physicians',
    description: `Family physician in Sacramento at Apollo Physicians, ${OFFICE.street}. Same-day and next-day visits, new patients welcome. Call ${PHONES.main.display}.`,
    navLabel: 'Home',
  },
  newPatients: {
    path: '/new-patients',
    lastModified: TODAY,
    title: 'Doctor Accepting New Patients Sacramento | Apollo Physicians',
    description: `Family doctor accepting new patients in Sacramento? Apollo Physicians welcomes new patients at ${OFFICE.street}. Call ${PHONES.main.display} to book.`,
    navLabel: 'New patients',
  },
  annualPhysical: {
    path: '/annual-physical-sacramento',
    lastModified: TODAY,
    title: 'Annual Physical in Sacramento, CA | Apollo Physicians',
    description: `Book an annual physical in Sacramento with Dr. Paramjit Panesar at Apollo Physicians, ${OFFICE.street}. See what to expect. Call ${PHONES.main.display}.`,
    clinical: true,
    navLabel: 'Annual physical',
  },
  sameDay: {
    path: '/same-day-appointments-sacramento',
    lastModified: '2026-11-11',
    title: 'Same-Day Doctor Appointments Sacramento | Apollo Physicians',
    description: `Same-day and next-day doctor appointments in Sacramento with Dr. Paramjit Panesar, MD, at ${OFFICE.street}. Call ${PHONES.main.display} early to book.`,
    clinical: true,
  },
  elkGrove: {
    path: '/family-physician-elk-grove',
    lastModified: TODAY,
    title: 'Family Physician for Elk Grove Patients | Apollo Physicians',
    description: `Family physician for Elk Grove patients at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. About 12 minutes from Elk Grove. Call ${PHONES.main.display}.`,
    navLabel: 'Elk Grove patients',
  },
  panesar: {
    path: '/dr-paramjit-panesar-md',
    lastModified: TODAY,
    title: 'Dr. Paramjit Panesar, Family Doctor | Apollo Physicians',
    description: `Dr. Paramjit Panesar, MD, is a board-certified family physician at Apollo Physicians, ${OFFICE.street}, ${OFFICE.city}. Call ${PHONES.main.display} to book.`,
    navLabel: 'Dr. Panesar',
  },
  services: {
    path: '/services',
    lastModified: TODAY,
    title: 'Family Medicine Services in Sacramento | Apollo Physicians',
    description: `Family medicine services in Sacramento at Apollo Physicians: physicals, vaccinations, chronic condition care and immigration exams. Call ${PHONES.main.display} to book.`,
    clinical: true,
    navLabel: 'Services',
  },
  immigration: {
    path: '/immigration-medical-exam-sacramento',
    lastModified: TODAY,
    title: 'Immigration Medical Exam in Sacramento | Apollo Physicians',
    description: `USCIS immigration medical exam (Form I-693) in Sacramento with civil surgeon Dr. Paramjit Panesar, MD. What to bring and how to book: ${PHONES.main.display}.`,
    clinical: true,
  },
  insurance: {
    path: '/insurance-accepted',
    lastModified: TODAY,
    title: 'Doctor Accepting Medicare in Sacramento | Apollo Physicians',
    description: `Medicare, Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, UnitedHealthcare accepted in Sacramento. Self-pay from $65. Call ${PHONES.main.display}.`,
    navLabel: 'Insurance',
  },
  contact: {
    path: '/contact',
    lastModified: TODAY,
    title: 'Contact and Directions in Sacramento | Apollo Physicians',
    description: `Contact Apollo Physicians at ${OFFICE.line}. Call ${PHONES.main.display} to book or get directions. Serves Sacramento, Elk Grove.`,
    navLabel: 'Contact',
  },
  faq: {
    path: '/faq',
    lastModified: TODAY,
    title: 'Family Doctor Questions, Sacramento | Apollo Physicians',
    description: `Common questions about Apollo Physicians in Sacramento: new patients, insurance, pricing, appointments, Dr. Panesar and the office. Call ${PHONES.main.display}.`,
  },
} as const satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof PAGE_META;

/** True when a page may be shown: it has no health information, or Dr. Panesar has reviewed it. */
export function isLive(page: { path: string; clinical?: boolean }): boolean {
  return !page.clinical || CLINICAL_REVIEW.reviewedOn !== null;
}

/** Pages visitors and search engines can see now. */
export function livePages(): readonly PageMeta[] {
  return Object.values(PAGE_META).filter(isLive);
}

/** Display form of the review date, for example "6 November 2026". */
export function reviewedOnLabel(): string | null {
  const date = CLINICAL_REVIEW.reviewedOn;
  if (!date) return null;
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
