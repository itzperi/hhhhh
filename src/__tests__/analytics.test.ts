import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import {
  EVENT_NAMES,
  PLACEMENTS,
  buildEvent,
  classifyLink,
  emitEvent,
  registerAnalyticsSink,
  visitorOptedOut,
  type TrackedEvent,
} from '@/lib/analytics';
import { PAGE_META } from '@/data/pages';
import { PHONES } from '@/data/site';
import { mapsDirectionsFromUrl, mapsDirectionsUrl, telHref } from '@/lib/utils';

describe('which links become events', () => {
  it('counts tel: links as call clicks', () => {
    expect(classifyLink(telHref(PHONES.main.tel))).toBe('call_click');
  });

  it('counts Google Maps directions links as directions clicks', () => {
    expect(classifyLink(mapsDirectionsUrl('anywhere'))).toBe('directions_click');
    expect(classifyLink(mapsDirectionsFromUrl('Elk Grove, CA', 'anywhere'))).toBe('directions_click');
  });

  it('ignores every other link, and counts no booking click while there is no booking URL', () => {
    for (const href of ['/', '/dr-paramjit-panesar', 'https://www.doximity.com/pub/x', 'mailto:a@b.c', '#insurance', '', null, undefined]) {
      expect(classifyLink(href as string | null | undefined), String(href)).toBeNull();
    }
  });
});

describe('events carry no health information', () => {
  it('has exactly three fields: name, placement and path', () => {
    const event = buildEvent('call_click', 'hero', '/');
    expect(event).toEqual({ name: 'call_click', placement: 'hero', path: '/' });
    expect(Object.keys(event as object).sort()).toEqual(['name', 'path', 'placement']);
  });

  it('drops any event name that is not on the allow-list', () => {
    for (const name of ['form_submit', 'search', 'Call', 'call_click ', '', undefined, null, 42, { a: 1 }]) {
      expect(buildEvent(name, 'hero', '/'), String(name)).toBeNull();
    }
  });

  it('replaces an unknown placement with "page"', () => {
    expect(buildEvent('call_click', 'John Smith diabetes', '/')?.placement).toBe('page');
    expect(buildEvent('call_click', undefined, '/')?.placement).toBe('page');
  });

  it('reports only known site paths and never a query string, hash or other text', () => {
    const attempts = ['/?name=Jane+Doe&dob=1980-01-01', '/dr-paramjit-panesar#diabetes', '/anything-else', '/family-physician-elk-grove?symptom=chest+pain', 42, undefined];
    for (const path of attempts) expect(buildEvent('call_click', 'page', path)?.path, String(path)).toBe('other');
    for (const page of Object.values(PAGE_META)) expect(buildEvent('call_click', 'page', page.path)?.path).toBe(page.path);
  });

  it('uses fixed vocabularies', () => {
    expect(EVENT_NAMES).toEqual(['call_click', 'directions_click', 'booking_click']);
    expect(PLACEMENTS).toEqual(['header', 'hero', 'mobile_bar', 'footer', 'page']);
  });

  it('never reads link text, the URL query or hash, referrer, cookies or storage', () => {
    for (const file of ['src/lib/analytics.ts', 'src/components/layout/ClickTracker.tsx']) {
      const code = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
      for (const forbidden of ['textContent', 'innerText', 'innerHTML', 'location.search', 'location.hash', 'location.href', 'referrer', 'cookie', 'localStorage', 'sessionStorage', 'FormData', 'fetch(', 'sendBeacon', 'XMLHttpRequest', 'document.title']) {
        expect(code.includes(forbidden), `${file} uses ${forbidden}`).toBe(false);
      }
    }
  });

  it('loads no third-party analytics code', () => {
    const layout = readFileSync('src/app/layout.tsx', 'utf8');
    expect(layout).not.toMatch(/googletagmanager|google-analytics|gtag|fbq|facebook|hotjar|clarity|segment|mixpanel|plausible|vercel\/analytics|<Script/i);
    const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { dependencies: Record<string, string> };
    expect(Object.keys(pkg.dependencies).filter((d) => /analytics|gtag|pixel|hotjar|segment|mixpanel|posthog|amplitude/i.test(d))).toEqual([]);
  });
});

describe('sinks', () => {
  const event: TrackedEvent = { name: 'call_click', placement: 'mobile_bar', path: '/' };

  it('does nothing when no sink or listener is attached', () => {
    expect(() => emitEvent(event)).not.toThrow();
  });

  it('delivers to a registered sink until it is detached', () => {
    const sink = vi.fn();
    const detach = registerAnalyticsSink(sink);
    emitEvent(event);
    detach();
    emitEvent(event);
    expect(sink).toHaveBeenCalledTimes(1);
    expect(sink).toHaveBeenCalledWith(event);
  });

  it('never lets a failing vendor break the tap', () => {
    const detach = registerAnalyticsSink(() => {
      throw new Error('vendor down');
    });
    expect(() => emitEvent(event)).not.toThrow();
    detach();
  });

  it('publishes a browser event with the same three fields', () => {
    const target = { dispatchEvent: vi.fn() };
    emitEvent(event, target as unknown as Window);
    const sent = target.dispatchEvent.mock.calls[0]?.[0] as CustomEvent;
    expect(sent.type).toBe('apollo:track');
    expect(sent.detail).toEqual(event);
  });
});

describe('visitor preference', () => {
  it('opts out on Do Not Track or Global Privacy Control', () => {
    expect(visitorOptedOut({ doNotTrack: '1' })).toBe(true);
    expect(visitorOptedOut({ doNotTrack: null, globalPrivacyControl: true })).toBe(true);
    expect(visitorOptedOut({ doNotTrack: null })).toBe(false);
    expect(visitorOptedOut({ doNotTrack: '0', globalPrivacyControl: false })).toBe(false);
  });
});
