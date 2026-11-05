'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import { ChevronDown, MapPin, Menu, Phone, X } from 'lucide-react';
import { LOCATION_MENU, MAIN_NAV } from '@/data/navigation';
import { BRAND, OFFICE, PHONES } from '@/data/site';
import { cn, telHref } from '@/lib/utils';

/** True when the current path matches a link, ignoring any #hash. */
function isCurrent(pathname: string, href: string): boolean {
  const path = href.split('#')[0] ?? '';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

/**
 * Site header: a utility bar with the click-to-call number and address, the primary
 * navigation, a keyboard-accessible Locations dropdown, and a mobile menu.
 */
export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLocations, setMobileLocations] = useState(false);
  const locationsTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  // Close all menus on navigation.
  useEffect(() => {
    setLocationsOpen(false);
    setMobileOpen(false);
    setMobileLocations(false);
  }, [pathname]);

  // Outside click and Escape close the Locations dropdown.
  useEffect(() => {
    if (!locationsOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setLocationsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setLocationsOpen(false);
      locationsTriggerRef.current?.focus();
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [locationsOpen]);

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  // Leaving the dropdown with the keyboard closes it.
  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setLocationsOpen(false);
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-warm-200 bg-white shadow-sm">
      {/* Utility bar */}
      <div className="bg-navy-800 text-white">
        <div className="mx-auto flex h-10 max-w-6xl items-center justify-between gap-4 px-4 text-sm sm:px-6 lg:px-8">
          <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[32px] items-center gap-2 rounded font-semibold hover:underline">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>
              <span className="sr-only">Call us at </span>
              {PHONES.main.display}
            </span>
          </a>
          <span className="hidden items-center gap-2 md:inline-flex">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {OFFICE.line}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <nav aria-label="Primary" className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center rounded text-xl font-bold text-navy-900" aria-label={`${BRAND.name}, home`}>
          {BRAND.name}
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          <li>
            <NavAnchor href="/" pathname={pathname}>
              Home
            </NavAnchor>
          </li>

          <li onBlur={handleBlur} className="relative">
            <button
              ref={locationsTriggerRef}
              type="button"
              aria-expanded={locationsOpen}
              aria-controls="locations-menu"
              onClick={() => setLocationsOpen((open) => !open)}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-1 rounded-md px-3 text-base font-semibold text-navy-800 hover:bg-navy-50',
                isCurrent(pathname, '/family-physician-elk-grove') && 'text-teal-800',
              )}
            >
              Locations
              <ChevronDown className={cn('h-4 w-4 transition-transform', locationsOpen && 'rotate-180')} aria-hidden="true" />
            </button>
            <div
              id="locations-menu"
              hidden={!locationsOpen}
              className="absolute left-1/2 top-full z-50 mt-2 w-[min(40rem,90vw)] -translate-x-1/2 rounded-xl border border-warm-200 bg-white p-6 shadow-card"
            >
              <div className="grid grid-cols-2 gap-6">
                {LOCATION_MENU.map((group) => (
                  <div key={group.label}>
                    <Link href={group.href} className="font-bold text-teal-800 hover:underline">
                      {group.label}
                    </Link>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="block rounded-md px-2 py-1.5 text-sm text-navy-800 hover:bg-navy-50">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>

          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <NavAnchor href={item.href} pathname={pathname}>
                {item.label}
              </NavAnchor>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={telHref(PHONES.main.tel)} className="btn btn-primary hidden md:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {PHONES.main.display}
          </a>

          <button
            ref={mobileToggleRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-900 hover:bg-navy-50 lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!mobileOpen} className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-warm-200 bg-white lg:hidden">
        <div className="space-y-1 px-4 py-4">
          <MobileNavLink href="/" pathname={pathname}>
            Home
          </MobileNavLink>

          <div>
            <button
              type="button"
              aria-expanded={mobileLocations}
              aria-controls="mobile-locations"
              onClick={() => setMobileLocations((open) => !open)}
              className="flex min-h-[44px] w-full items-center justify-between rounded-md px-3 text-left text-base font-medium text-navy-900 hover:bg-navy-50"
            >
              Locations
              <ChevronDown className={cn('h-5 w-5 transition-transform', mobileLocations && 'rotate-180')} aria-hidden="true" />
            </button>
            <div id="mobile-locations" hidden={!mobileLocations} className="pb-2">
              {LOCATION_MENU.map((group) =>
                group.items.map((item) => (
                  <MobileNavLink key={item.href} href={item.href} pathname={pathname} nested>
                    {item.label}
                  </MobileNavLink>
                )),
              )}
            </div>
          </div>

          {MAIN_NAV.map((item) => (
            <MobileNavLink key={item.href} href={item.href} pathname={pathname}>
              {item.label}
            </MobileNavLink>
          ))}

          <a href={telHref(PHONES.main.tel)} className="btn btn-primary mt-3 w-full">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {PHONES.main.display}
          </a>
        </div>
      </div>
    </header>
  );
}

function NavAnchor({ href, pathname, children }: { href: string; pathname: string; children: ReactNode }) {
  const current = isCurrent(pathname, href);
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'inline-flex min-h-[44px] items-center rounded-md px-3 text-base font-semibold text-navy-800 hover:bg-navy-50',
        current && 'bg-teal-50 text-teal-900',
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, pathname, nested = false, children }: { href: string; pathname: string; nested?: boolean; children: ReactNode }) {
  const current = isCurrent(pathname, href);
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'flex min-h-[44px] items-center rounded-md px-3 text-base font-medium text-navy-900 hover:bg-navy-50',
        nested && 'pl-6 text-[0.95rem]',
        current && 'bg-teal-50 font-semibold text-teal-900',
      )}
    >
      {children}
    </Link>
  );
}
