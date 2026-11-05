import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { FOOTER_COLUMNS } from '@/data/navigation';
import { BRAND, OFFICE, PHONES } from '@/data/site';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

/**
 * Site footer: contact details and the page links. There is one office, so there is no location
 * list. The copyright year is computed at build time.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl font-bold text-white">{BRAND.name}</p>
          <p className="mt-4 text-sm leading-relaxed">Family medicine in Sacramento, California.</p>

          <h3 className="mt-6 text-sm font-bold text-white">Contact details</h3>
          <address className="mt-3 space-y-3 not-italic">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <span>
                {OFFICE.street}, {OFFICE.city}, {OFFICE.state} {OFFICE.postalCode}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[24px] items-center rounded font-semibold text-white hover:underline">
                {PHONES.main.display}
              </a>
            </p>
          </address>
          <a href={mapsDirectionsUrl(OFFICE.line)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-[24px] items-center text-sm font-semibold text-teal-200 hover:underline">
            Get directions to the office<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="text-sm font-bold text-white">{column.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  {link.href.startsWith('tel:') ? (
                    <a href={link.href} className="inline-flex min-h-[24px] items-center rounded hover:text-white hover:underline">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="inline-flex min-h-[24px] items-center rounded hover:text-white hover:underline">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

      </div>

      <div className="border-t border-navy-700">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            &copy; {year} {BRAND.legalName ?? BRAND.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
