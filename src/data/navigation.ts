import type { NavLink } from '@/types';
import { PAGE_META, isLive, type PageKey } from './pages';
import { PROVIDER } from './practice';
import { PHONES } from './site';

/**
 * Navigation for the Apollo Physicians site. Every href resolves to a route in src/app. The header and
 * footer use these lists. Pages that are not live yet (health-information pages awaiting Dr. Panesar's
 * review, see CLINICAL_REVIEW in pages.ts) are left out automatically, so no link ever points at a 404.
 * There is one office, so there is no "Locations" menu.
 */

/** Order of the primary navigation. */
const NAV_ORDER: readonly PageKey[] = ['home', 'newPatients', 'annualPhysical', 'elkGrove', 'panesar', 'services', 'insurance', 'contact'];

/** Primary navigation, shared by the header (desktop and mobile). */
export const MAIN_NAV: readonly NavLink[] = NAV_ORDER.filter((key) => isLive(PAGE_META[key])).map((key) => ({
  label: (PAGE_META[key] as { navLabel: string }).navLabel,
  href: PAGE_META[key].path,
}));

/** Footer labels: longer than the navigation labels, and they include pages that are not in the navigation. */
const FOOTER_LABELS: Record<PageKey, string> = {
  home: 'Family Physician in Sacramento',
  newPatients: 'New patients',
  annualPhysical: 'Annual physical',
  sameDay: 'Same-day appointments',
  elkGrove: 'Family Physician in Elk Grove',
  panesar: PROVIDER.name,
  services: 'Services',
  immigration: 'Immigration medical exam',
  insurance: 'Insurance and payment options',
  medicare: 'Medicare patients',
  mediCal: 'Medi-Cal patients',
  nivano: 'Nivano Physicians patients',
  selfPay: 'Doctor without insurance',
  contact: 'Contact and directions',
  faq: 'Questions and answers',
};

/** Footer link columns. */
export const FOOTER_COLUMNS: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: 'Pages',
    links: (Object.keys(FOOTER_LABELS) as PageKey[])
      .filter((key) => isLive(PAGE_META[key]))
      .map((key) => ({ label: FOOTER_LABELS[key], href: PAGE_META[key].path })),
  },
  {
    title: 'Booking',
    links: [{ label: `Call ${PHONES.main.display}`, href: `tel:${PHONES.main.tel}` }],
  },
];

export interface Crumb {
  name: string;
  path: string;
}

const HOME_CRUMB: Crumb = { name: 'Home', path: PAGE_META.home.path };

/** Name shown in the breadcrumb for each inner page. */
const CRUMB_NAMES: Record<Exclude<PageKey, 'home'>, string> = {
  newPatients: 'New patients',
  annualPhysical: 'Annual physical',
  sameDay: 'Same-day appointments',
  elkGrove: 'Family Physician in Elk Grove',
  panesar: PROVIDER.name,
  services: 'Services',
  immigration: 'Immigration medical exam',
  insurance: 'Insurance and payment options',
  medicare: 'Medicare',
  mediCal: 'Medi-Cal',
  nivano: 'Nivano Physicians',
  selfPay: 'Paying without insurance',
  contact: 'Contact',
  faq: 'Questions and answers',
};

/**
 * Breadcrumb trails. The visible breadcrumb component and the BreadcrumbList JSON-LD both read these,
 * so the markup always matches what the page shows. The home page has no trail.
 */
export const BREADCRUMBS = Object.fromEntries(
  (Object.keys(CRUMB_NAMES) as Exclude<PageKey, 'home'>[]).map((key) => [
    key,
    [HOME_CRUMB, { name: CRUMB_NAMES[key], path: PAGE_META[key].path }] as const,
  ]),
) as { readonly [K in Exclude<PageKey, 'home'>]: readonly [Crumb, Crumb] };
