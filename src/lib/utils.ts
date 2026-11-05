import type { PostalAddress } from '@/types';

/** Joins truthy class names. Keeps component markup readable without a runtime dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Formats a postal address on one line: street, city, state and ZIP. */
export function formatAddress(address: PostalAddress): string {
  return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`;
}

/** Google Maps embed URL for an address query. No API key is needed for the public embed. */
export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/** Google Maps directions link for an address query. */
export function mapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** Builds a tel: href from an E.164 value (see PHONES in src/data/site.ts). */
export function telHref(tel: string): string {
  return `tel:${tel}`;
}

/** Returns the first n characters of a string, ending at a word boundary where possible. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Returns up to two initials for an avatar fallback, e.g. "Paramjit Panesar" -> "PP". */
export function initialsOf(name: string): string {
  const parts = name.replace(/[^\p{L}\s]/gu, '').trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return `${first}${last}`.toUpperCase();
}
