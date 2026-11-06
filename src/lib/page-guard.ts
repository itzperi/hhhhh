import { notFound } from 'next/navigation';
import { PAGE_META, isLive, type PageKey } from '@/data/pages';

/**
 * Answers 404 for a health-information page until Dr. Panesar has reviewed it (CLINICAL_REVIEW in
 * src/data/pages.ts). Call it first in the page component.
 */
export function assertLive(key: PageKey): void {
  if (!isLive(PAGE_META[key])) notFound();
}
