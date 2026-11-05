import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ELK_GROVE_FAQS, ELK_GROVE_NOTE, INSURANCE_ACCEPTED, INITIAL_VISIT_PRICE } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, websiteNode } from '@/lib/structured-data';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.elkGrove.title,
  description: PAGE_META.elkGrove.description,
  path: PAGE_META.elkGrove.path,
});

export default function ElkGrovePage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          faqNode('/family-physician-elk-grove#faq', ELK_GROVE_FAQS),
          breadcrumbNode('/family-physician-elk-grove#breadcrumb', [
            { name: 'Home', path: '/' },
            { name: 'Family Physician in Elk Grove', path: PAGE_META.elkGrove.path },
          ]),
        )}
      />

      <PageHero
        title="Family Physician for Elk Grove Patients"
        eyebrow="Elk Grove patients"
        subtitle="Apollo Physicians is in Sacramento. Here is how Elk Grove patients book and what to expect."
      >
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
      </PageHero>

      <Section headingId="elk-office-heading" title="Where Elk Grove patients are seen">
        <p className="max-w-3xl text-lg leading-relaxed text-navy-800">{ELK_GROVE_NOTE}</p>
        <p className="mt-4 max-w-3xl text-navy-800">
          The office is at {OFFICE.line}.{' '}
          <a href={mapsDirectionsUrl(OFFICE.line)} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 hover:underline">
            Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </Section>

      <Section headingId="elk-booking-heading" title="Booking from Elk Grove" tone="muted">
        <p className="max-w-3xl text-navy-800">
          Call{' '}
          <a href={telHref(PHONES.main.tel)} className="font-semibold text-teal-800 hover:underline">
            {PHONES.main.display}
          </a>{' '}
          before you travel to confirm your appointment. Same-day and next-day appointments are listed on our{' '}
          <Link href="/" className="font-semibold text-teal-800 hover:underline">
            family physician page
          </Link>
          .
        </p>
      </Section>

      <Section headingId="elk-insurance-heading" title="Insurance for Elk Grove patients">
        <p className="max-w-3xl text-navy-800">The same plans apply to every patient: {INSURANCE_ACCEPTED.join(', ')}.</p>
        <p className="mt-4 text-navy-800">{INITIAL_VISIT_PRICE}</p>
      </Section>

      <Section headingId="elk-faq-heading" title="Elk Grove questions" tone="muted">
        <dl className="space-y-6">
          {ELK_GROVE_FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
