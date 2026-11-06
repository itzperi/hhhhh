import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { quickFacts } from '@/lib/content-utils';

/**
 * Quick Facts table under the direct answer on every page. One data source (quickFacts) feeds every page,
 * so the facts are word for word the same everywhere.
 */
export function QuickFacts() {
  return (
    <Section headingId="quick-facts-heading" title="Quick facts" tone="muted" className="!py-10 md:!py-12">
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {quickFacts().map((fact) => (
          <div key={fact.label} className="border-b border-warm-300 pb-3">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">{fact.label}</dt>
            <dd className="mt-1 text-navy-900">
              {fact.href ? (
                fact.href.startsWith('tel:') ? (
                  <a href={fact.href} className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                    {fact.value}
                  </a>
                ) : (
                  <Link href={fact.href} className="font-semibold text-teal-800 hover:underline">
                    {fact.value}
                  </Link>
                )
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
