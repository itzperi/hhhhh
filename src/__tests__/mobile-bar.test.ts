import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PHONES } from '@/data/site';

const anchors = (html: string) => [...html.matchAll(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], text: (m[2] ?? '').replace(/<[^>]+>/g, '').trim() }));

async function renderBar() {
  vi.resetModules();
  const { MobileCallBar } = await import('@/components/layout/MobileCallBar');
  return renderToStaticMarkup(createElement(MobileCallBar));
}

afterEach(() => {
  vi.doUnmock('@/data/site');
  vi.resetModules();
});

describe('mobile call bar', () => {
  it('is a single Call button while there is no booking URL', async () => {
    const html = await renderBar();
    expect(anchors(html)).toEqual([{ href: `tel:${PHONES.main.tel}`, text: `Call ${PHONES.main.display}` }]);
    expect(html).not.toMatch(/Book online/i);
  });

  it('adds Book online only when an online booking URL exists', async () => {
    vi.resetModules();
    vi.doMock('@/data/site', async (original) => ({ ...(await original<typeof import('@/data/site')>()), BOOKING_URL: 'https://booking.example.test/apollo' }));
    const { MobileCallBar } = await import('@/components/layout/MobileCallBar');
    const html = renderToStaticMarkup(createElement(MobileCallBar));
    expect(anchors(html).map((a) => a.text)).toEqual([`Call ${PHONES.main.display}`, 'Book online']);
    expect(anchors(html)[1]?.href).toBe('https://booking.example.test/apollo');
  });

  it('is shown only on phones and tagged for click events', async () => {
    const html = await renderBar();
    expect(html).toContain('md:hidden');
    expect(html).toContain('data-placement="mobile_bar"');
  });

  it('uses 44px buttons', async () => {
    const html = await renderBar();
    expect(html).toContain('class="btn btn-primary');
    expect(readFileSync('src/app/globals.css', 'utf8')).toMatch(/\.btn\s*\{[^}]*min-h-\[44px\]/);
  });
});

describe('no layout shift and nothing hidden behind the bar', () => {
  it('reserves exactly the bar height under the page content, on phones only', async () => {
    const { MOBILE_BAR_HEIGHT_REM } = await import('@/components/layout/MobileCallBar');
    const bar = readFileSync('src/components/layout/MobileCallBar.tsx', 'utf8');
    const layout = readFileSync('src/app/layout.tsx', 'utf8');
    expect(bar).toContain(`h-[${MOBILE_BAR_HEIGHT_REM}rem]`);
    expect(layout).toContain(`pb-[${MOBILE_BAR_HEIGHT_REM}rem]`);
    expect(layout).toMatch(/md:pb-0/);
  });

  it('keeps keyboard focus and in-page jumps clear of the bar', () => {
    expect(readFileSync('src/app/globals.css', 'utf8')).toMatch(/max-width:\s*767px[\s\S]*scroll-padding-bottom:\s*5\.5rem/);
  });

  it('gives the bar a fixed height (no content-driven resize)', () => {
    const bar = readFileSync('src/components/layout/MobileCallBar.tsx', 'utf8');
    expect(bar).toMatch(/fixed inset-x-0 bottom-0/);
    expect(bar).toMatch(/h-\[4\.5rem\]/);
  });
});

describe('tap targets', () => {
  it('has no footer or header link below 44px', () => {
    for (const file of ['src/components/layout/Footer.tsx', 'src/components/layout/Header.tsx']) {
      const code = readFileSync(file, 'utf8');
      expect(code, file).not.toMatch(/min-h-\[(24|32)px\]/);
    }
  });
});
