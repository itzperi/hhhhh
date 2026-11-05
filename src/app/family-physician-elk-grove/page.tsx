import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { InsurancePills } from '@/components/ui/InsurancePills';
import { JsonLd } from '@/components/ui/JsonLd';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import {
  APPOINTMENT_AVAILABILITY,
  ELK_GROVE_FAQS,
  ELK_GROVE_NOTE,
  INITIAL_VISIT_PRICE,
  INSURANCE_ACCEPTED,
} from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, websiteNode } from '@/lib/structured-data';
import { mapsDirectionsFromUrl, mapsDirectionsUrl, telHref } from '@/lib/utils';

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
          breadcrumbNode('/family-physician-elk-grove#breadcrumb', BREADCRUMBS.elkGrove),
        )}
      />

      <Breadcrumbs items={BREADCRUMBS.elkGrove} />

      <PageHero
        title="Family Physician for Elk Grove Patients"
        eyebrow="Elk Grove patients"
        subtitle={`Apollo Physicians is a family medicine practice in South Sacramento at ${OFFICE.line}, and it serves Elk Grove families. ${APPOINTMENT_AVAILABILITY}`}
      >
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
        <ButtonLink
          href={mapsDirectionsFromUrl('Elk Grove, CA', OFFICE.line)}
          variant="outline"
          external
          className="border-white bg-transparent text-white hover:bg-white/10"
        >
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Directions from Elk Grove
        </ButtonLink>
        <InsurancePills href="#insurance" tone="dark" className="w-full" />
      </PageHero>

      <Section headingId="elk-office-heading" title="Where Elk Grove patients are seen">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">{ELK_GROVE_NOTE}</p>
            <p className="text-navy-800">
              For a route and travel time from Elk Grove, use Directions from Elk Grove above.{' '}
              <a href={mapsDirectionsUrl(OFFICE.line)} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 hover:underline">
                Get directions<span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <MapEmbed query={OFFICE.line} title={`Map of the Apollo Physicians office at ${OFFICE.line}`} />
        </div>
      </Section>

      <Section headingId="elk-booking-heading" title="Booking from Elk Grove" tone="muted">
        <p className="max-w-3xl text-navy-800">
          Call{' '}
          <a href={telHref(PHONES.main.tel)} className="font-semibold text-teal-800 hover:underline">
            {PHONES.main.display}
          </a>{' '}
          before you travel to confirm your appointment. {APPOINTMENT_AVAILABILITY} See the{' '}
          <Link href="/" className="font-semibold text-teal-800 hover:underline">
            family physician page
          </Link>{' '}
          for more about the practice.
        </p>
      </Section>

      <Section id="insurance" headingId="elk-insurance-heading" title="Insurance for Elk Grove patients">
        <p className="max-w-3xl text-navy-800">The same plans apply to every patient: {INSURANCE_ACCEPTED.join(', ')}.</p>
        <p className="mt-4 text-navy-800">{INITIAL_VISIT_PRICE}</p>
        <p className="mt-4 text-navy-800">Call {PHONES.main.display} to confirm your plan before your visit.</p>
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
