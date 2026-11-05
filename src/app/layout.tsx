import type { Metadata, Viewport } from 'next';
import { Figtree, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import { ClickTracker } from '@/components/layout/ClickTracker';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { BRAND, OFFICE, SITE_URL } from '@/data/site';
import './globals.css';

/** Body and UI text. A clean, open sans with good numerals for phone numbers and prices. */
const sans = Figtree({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

/**
 * Headings. A warm, readable serif that suits a family practice.
 *
 * display: 'optional' means the font is used only if it is ready at first paint (it is preloaded, so it
 * usually is) and never swaps in afterwards. A late swap re-flowed the H1 and caused layout shift, and
 * next/font has no fallback metrics for Newsreader to hide it (adjustFontFallback must stay off).
 */
const display = Newsreader({ subsets: ['latin'], variable: '--font-display', display: 'optional', adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | Sacramento`,
    template: '%s',
  },
  description: `${BRAND.name}, family medicine at ${OFFICE.line}.`,
  applicationName: BRAND.name,
  formatDetection: { telephone: true },
  openGraph: {
    siteName: BRAND.name,
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1f33',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[4.5rem] font-sans md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-navy-900 focus:shadow-card"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <ClickTracker />
      </body>
    </html>
  );
}
