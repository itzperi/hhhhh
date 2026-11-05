import Link from 'next/link';
import { Calendar, CheckCircle2, MapPin, Phone, Stethoscope, Wallet } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { Section } from '@/components/ui/Section';
import { APPOINTMENT_AVAILABILITY, HOME_FAQS, INITIAL_VISIT_PRICE, INSURANCE_ACCEPTED, PROVIDER, SPECIALTY } from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

/** Everything below the hero on the home page. Each block uses only facts from src/data/practice.ts. */
export function HomeSections() {
  return (
    <>
      <Section headingId="home-about-heading" title="About Apollo Physicians" eyebrow="Family medicine in Sacramento">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">
              The Apollo Physicians office is in South Sacramento. {APPOINTMENT_AVAILABILITY} {INITIAL_VISIT_PRICE}
            </p>
            <p className="text-lg leading-relaxed text-navy-800">
              Looking for a family doctor or a primary care doctor in Sacramento? Family medicine is a primary care specialty, and
              Dr. Paramjit Panesar, MD, practices it here.
            </p>
          </div>
          <div className="card space-y-4">
            <p className="flex items-center gap-2 font-semibold text-navy-900">
              <Calendar className="h-5 w-5 text-teal-700" aria-hidden="true" />
              {APPOINTMENT_AVAILABILITY}
            </p>
            <p className="flex items-center gap-2 font-semibold text-navy-900">
              <Wallet className="h-5 w-5 text-teal-700" aria-hidden="true" />
              {INITIAL_VISIT_PRICE}
            </p>
            <p className="flex items-center gap-2 font-semibold text-navy-900">
              <Phone className="h-5 w-5 text-teal-700" aria-hidden="true" />
              <a href={telHref(PHONES.main.tel)} className="hover:underline">
                {PHONES.main.display}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="insurance"
        headingId="home-insurance-heading"
        title="Insurance we accept"
        tone="muted"
        description={`Accepted plans, as listed by the practice. Call ${PHONES.main.display} to confirm your plan before your visit.`}
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INSURANCE_ACCEPTED.map((plan) => (
            <li key={plan} className="card flex items-center gap-2 font-semibold text-navy-900">
              <CheckCircle2 className="h-5 w-5 text-teal-700" aria-hidden="true" />
              {plan}
            </li>
          ))}
        </ul>
      </Section>

      <Section headingId="home-provider-heading" title="Our provider">
        <article className="card flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800" aria-hidden="true">
            <Stethoscope className="h-9 w-9" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-navy-900">
              <Link href="/dr-paramjit-panesar" className="hover:underline">
                {PROVIDER.name}
              </Link>
            </h3>
            <p className="text-navy-800">{SPECIALTY} at Apollo Physicians</p>
          </div>
        </article>
      </Section>

      <Section id="location" headingId="home-location-heading" title="Find the office" tone="muted">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <address className="text-lg not-italic leading-relaxed text-navy-800">{OFFICE.line}</address>
            <p className="text-navy-800">The office is the only Apollo Physicians location.</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external>
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Get directions
              </ButtonLink>
              <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {PHONES.main.display}
              </ButtonLink>
            </div>
          </div>
          <MapEmbed query={OFFICE.line} title={`Map of the Apollo Physicians office at ${OFFICE.line}`} />
        </div>
      </Section>

      <Section headingId="home-communities-heading" title="Communities we serve">
        <div className="card max-w-3xl space-y-3">
          <p className="text-navy-800">
            Apollo Physicians has one office, in South Sacramento. Elk Grove patients are seen there, and our Elk Grove page explains
            how to get here and what to expect.
          </p>
          <Link href="/family-physician-elk-grove" className="inline-flex items-center gap-2 font-semibold text-teal-800 hover:underline">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Family Physician in Elk Grove
          </Link>
        </div>
      </Section>

      <Section headingId="home-faq-heading" title="Frequently asked questions" tone="muted">
        <dl className="space-y-6">
          {HOME_FAQS.map((faq) => (
            <div key={faq.question} className="card">
              <dt className="text-lg font-semibold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {PHONES.main.display}
          </ButtonLink>
          <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external>
            Get directions
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
