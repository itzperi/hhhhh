import { PAGE_META } from '@/data/pages';
import { BOOKING_URL } from '@/data/site';

/**
 * Click events with no health information (HIPAA guard).
 *
 * An event is exactly three fixed-vocabulary fields: what was clicked, where on the page, and which
 * page. Nothing else can be sent: no URL, query string, link text, referrer, form value, identifier or
 * free text. Every field is checked against an allow-list, and anything that is not on it is dropped.
 *
 * No analytics vendor is installed (docs/seo/analytics-decision.md). Events are published as a
 * `apollo:track` browser event, and to any sink registered with registerAnalyticsSink(). With no sink
 * and no listener, nothing is recorded or sent anywhere.
 */

export const EVENT_NAMES = ['call_click', 'directions_click', 'booking_click'] as const;
export type EventName = (typeof EVENT_NAMES)[number];

export const PLACEMENTS = ['header', 'hero', 'mobile_bar', 'footer', 'page'] as const;
export type Placement = (typeof PLACEMENTS)[number];

const KNOWN_PATHS: readonly string[] = Object.values(PAGE_META).map((p) => p.path);

export interface TrackedEvent {
  name: EventName;
  placement: Placement;
  /** A site path from the sitemap, or "other". Never a query string or hash. */
  path: string;
}

export type AnalyticsSink = (event: TrackedEvent) => void;

const sinks = new Set<AnalyticsSink>();

/** Attach a vendor. Returns a function that detaches it. Nothing is registered by default. */
export function registerAnalyticsSink(sink: AnalyticsSink): () => void {
  sinks.add(sink);
  return () => {
    sinks.delete(sink);
  };
}

/** Which event a link represents, from its href alone. Returns null for every other link. */
export function classifyLink(href: string | null | undefined): EventName | null {
  if (!href) return null;
  if (href.startsWith('tel:')) return 'call_click';
  if (BOOKING_URL && href === BOOKING_URL) return 'booking_click';
  if (/^https:\/\/www\.google\.com\/maps\/dir\//.test(href)) return 'directions_click';
  return null;
}

/** Builds an event from untrusted values. Returns null when the name is not allowed. */
export function buildEvent(name: unknown, placement: unknown, pathname: unknown): TrackedEvent | null {
  if (!EVENT_NAMES.includes(name as EventName)) return null;
  const place = PLACEMENTS.includes(placement as Placement) ? (placement as Placement) : 'page';
  const path = typeof pathname === 'string' && KNOWN_PATHS.includes(pathname) ? pathname : 'other';
  return { name: name as EventName, placement: place, path };
}

/** Whether the visitor asked not to be tracked (Do Not Track or Global Privacy Control). */
export function visitorOptedOut(nav: Pick<Navigator, 'doNotTrack'> & { globalPrivacyControl?: boolean }): boolean {
  return nav.doNotTrack === '1' || nav.globalPrivacyControl === true;
}

/** Sends an event to every registered sink and to window listeners. Safe to call when nothing listens. */
export function emitEvent(event: TrackedEvent, target?: Pick<Window, 'dispatchEvent'>): void {
  for (const sink of sinks) {
    try {
      sink(event);
    } catch {
      // A failing vendor must never break a phone call tap.
    }
  }
  target?.dispatchEvent(new CustomEvent('apollo:track', { detail: event }));
}
