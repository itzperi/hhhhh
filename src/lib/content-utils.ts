import type { ContentBlock } from '@/data/content';
import { CLINICAL_REVIEW } from '@/data/pages';
import { INITIAL_VISIT_PRICE, PROVIDER, TELEMEDICINE, insuranceSentence } from '@/data/practice';
import { BRAND, NPI, OFFICE, OFFICE_HOURS, PHONES, type OfficeHoursRow } from '@/data/site';
import type { FaqItem } from '@/types';

/** True once Dr. Panesar has reviewed the health content, so clinical items may be shown. */
export function clinicalPublished(): boolean {
  return CLINICAL_REVIEW.reviewedOn !== null;
}

/** FAQ items to show and to put in the FAQ schema. Health items wait for the review. */
export function visibleFaqs(faqs: readonly FaqItem[]): readonly FaqItem[] {
  return faqs.filter((faq) => !faq.clinical || clinicalPublished());
}

/** Content blocks to show. Health blocks wait for the review. */
export function visibleBlocks(blocks: readonly ContentBlock[]): readonly ContentBlock[] {
  return blocks.filter((block) => !block.clinical || clinicalPublished());
}

export interface QuickFact {
  label: string;
  value: string;
  href?: string;
}

/** "Mon to Fri 8:30 am to 5:00 pm" style text for one row of office hours. */
export function formatHoursRow(row: OfficeHoursRow): string {
  const short = (day: string) => day.slice(0, 3);
  const days = row.days.length > 1 ? `${short(row.days[0] ?? '')} to ${short(row.days[row.days.length - 1] ?? '')}` : short(row.days[0] ?? '');
  const time = (value: string) => {
    const [h = '0', m = '00'] = value.split(':');
    const hour = Number(h);
    return `${hour % 12 === 0 ? 12 : hour % 12}:${m} ${hour < 12 ? 'am' : 'pm'}`;
  };
  return `${days} ${time(row.opens)} to ${time(row.closes)}`;
}

/**
 * The Quick Facts table shown under the direct answer on every page. Every value comes from the data files;
 * the Hours row appears only once the owner has confirmed hours (OFFICE_HOURS).
 */
export function quickFacts(): QuickFact[] {
  const facts: QuickFact[] = [
    { label: 'Practice', value: `${BRAND.name}, a family medicine practice` },
    { label: 'Address', value: OFFICE.line, href: '/contact' },
    { label: 'Phone', value: PHONES.main.display, href: `tel:${PHONES.main.tel}` },
  ];
  if (OFFICE_HOURS) facts.push({ label: 'Hours', value: OFFICE_HOURS.map(formatHoursRow).join('; ') });
  facts.push(
    { label: 'Provider', value: `${PROVIDER.name} (NPI ${NPI.panesar})`, href: '/dr-paramjit-panesar-md' },
    { label: 'Insurance', value: insuranceSentence(), href: '/insurance-accepted' },
    { label: 'Price', value: INITIAL_VISIT_PRICE },
    { label: 'Appointments', value: 'Same-day and next-day appointments' },
    { label: 'Telemedicine', value: TELEMEDICINE },
    { label: 'New patients', value: 'Accepted', href: '/new-patients' },
  );
  return facts;
}

/** Word count of a string, for the 40 to 60 word direct-answer rule. */
export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
