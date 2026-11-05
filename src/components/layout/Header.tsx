'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import { MAIN_NAV } from '@/data/navigation';
import { BRAND, OFFICE, PHONES } from '@/data/site';
import { cn, telHref } from '@/lib/utils';

/** True when the current path matches a link. */
function isCurrent(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Site header: a utility bar with the click-to-call number and address, the primary navigation, and
 * a mobile menu. Every page is one plain link; there is no Locations menu because there is one office.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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

  return (
    <header data-placement="header" className="sticky top-0 z-40 border-b border-warm-200 bg-white shadow-sm">
      {/* Utility bar */}
      <div className="bg-navy-800 text-white">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-4 px-4 text-sm sm:px-6 lg:px-8">
          <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[44px] items-center gap-2 rounded font-semibold hover:underline">
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
        <Link href="/" className="flex min-h-[44px] shrink-0 items-center rounded text-xl font-bold text-navy-900" aria-label={`${BRAND.name}, home`}>
          {BRAND.name}
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 lg:flex">
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

function MobileNavLink({ href, pathname, children }: { href: string; pathname: string; children: ReactNode }) {
  const current = isCurrent(pathname, href);
  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        'flex min-h-[44px] items-center rounded-md px-3 text-base font-medium text-navy-900 hover:bg-navy-50',
        current && 'bg-teal-50 font-semibold text-teal-900',
      )}
    >
      {children}
    </Link>
  );
}
