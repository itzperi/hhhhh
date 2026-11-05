import type { NavGroup, NavLink } from '@/types';
import { PHONES } from './site';

/**
 * Navigation for the Apollo Physicians site. Every href resolves to a route in src/app.
 * The header and footer use these lists; no other routes exist.
 */

/** Top-level links after the Locations dropdown. */
export const MAIN_NAV: readonly NavLink[] = [
  { label: 'Dr. Paramjit Panesar', href: '/dr-paramjit-panesar' },
];

/** Locations dropdown: the single Sacramento office, and the Elk Grove page for Elk Grove patients. */
export const LOCATION_MENU: readonly NavGroup[] = [
  {
    label: 'Sacramento',
    href: '/',
    items: [{ label: 'Family Physician in Sacramento', href: '/' }],
  },
  {
    label: 'Elk Grove',
    href: '/family-physician-elk-grove',
    items: [{ label: 'Family Physician in Elk Grove', href: '/family-physician-elk-grove' }],
  },
];

/** Footer link columns. */
export const FOOTER_COLUMNS: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: 'Pages',
    links: [
      { label: 'Family Physician in Sacramento', href: '/' },
      { label: 'Family Physician in Elk Grove', href: '/family-physician-elk-grove' },
      { label: 'Dr. Paramjit Panesar, MD', href: '/dr-paramjit-panesar' },
    ],
  },
  {
    title: 'Booking',
    links: [{ label: `Call ${PHONES.main.display}`, href: `tel:${PHONES.main.tel}` }],
  },
];
