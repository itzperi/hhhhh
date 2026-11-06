import { Section } from '@/components/ui/Section';
import { visibleFaqs } from '@/lib/content-utils';
import type { FaqItem } from '@/types';

interface FaqListProps {
  /** Id prefix, unique per page. */
  idPrefix: string;
  title?: string;
  faqs: readonly FaqItem[];
  tone?: 'default' | 'muted';
}

/**
 * Visible FAQ. Each question is a real heading and each answer follows it directly, which is the shape
 * answer engines and screen readers read best. The FAQPage schema is built from the same filtered list
 * (visibleFaqs), so the schema and the page can never differ.
 */
export function FaqList({ idPrefix, title = 'Frequently asked questions', faqs, tone = 'default' }: FaqListProps) {
  const items = visibleFaqs(faqs);
  if (items.length === 0) return null;
  return (
    <Section id="faq" headingId={`${idPrefix}-faq-heading`} title={title} tone={tone}>
      <div className="space-y-6">
        {items.map((faq) => (
          <div key={faq.question} className="card">
            <h3 className="text-lg font-semibold text-navy-900">{faq.question}</h3>
            <p className="mt-2 text-navy-800">{faq.answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
