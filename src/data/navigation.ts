import type { NavLink } from '@/types';
import { PAGE_META } from './pages';
import { PROVIDER } from './practice';
import { PHONES } from './site';

/**
 * Navigation for the Apollo Physicians site. Every href resolves to a route in src/app.
 * The header and footer use these lists; no other routes exist. There is one office, so there is
 * no "Locations" menu: Elk Grove patients have their own page, linked like any other.
 */

/** Primary navigation, shared by the header (desktop and mobile). */
export const MAIN_NAV: readonly NavLink[] = [
  { label: 'Home', href: PAGE_META.home.path },
  { label: 'Elk Grove patients', href: PAGE_META.elkGrove.path },
  { label: PROVIDER.shortName, href: PAGE_META.panesar.path },
];

/** Footer link columns. */
export const FOOTER_COLUMNS: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: 'Pages',
    links: [
      { label: 'Family Physician in Sacramento', href: PAGE_META.home.path },
      { label: 'Family Physician in Elk Grove', href: PAGE_META.elkGrove.path },
      { label: PROVIDER.name, href: PAGE_META.panesar.path },
    ],
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

/**
 * Breadcrumb trails. The visible breadcrumb component and the BreadcrumbList JSON-LD both read these,
 * so the markup always matches what the page shows. The home page has no trail.
 */
export const BREADCRUMBS = {
  elkGrove: [
    { name: 'Home', path: PAGE_META.home.path },
    { name: 'Family Physician in Elk Grove', path: PAGE_META.elkGrove.path },
  ],
  panesar: [
    { name: 'Home', path: PAGE_META.home.path },
    { name: PROVIDER.name, path: PAGE_META.panesar.path },
  ],
} as const satisfies Record<string, readonly Crumb[]>;
