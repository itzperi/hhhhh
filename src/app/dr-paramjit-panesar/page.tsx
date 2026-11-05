import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { PANESAR_FAQS, PANESAR_LEAD, PROVIDER, SPECIALTY } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { NPI, OFFICE, PHONES, PHYSICIAN_PROFILE_LIST } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, webPageNode, websiteNode } from '@/lib/structured-data';
import { telHref } from '@/lib/utils';

/** Official state license lookup. A neutral consumer resource: it asserts nothing about Dr. Panesar's license. */
const LICENSE_LOOKUP_URL = 'https://search.dca.ca.gov/';

export const metadata = buildMetadata({
  title: PAGE_META.panesar.title,
  description: PAGE_META.panesar.description,
  path: PAGE_META.panesar.path,
});

export default function PanesarPage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          webPageNode({
            path: PAGE_META.panesar.path,
            name: PAGE_META.panesar.title,
            description: PAGE_META.panesar.description,
            type: 'ProfilePage',
            about: 'physician',
            breadcrumb: true,
            faq: true,
          }),
          faqNode(PAGE_META.panesar.path, PANESAR_FAQS),
          breadcrumbNode(PAGE_META.panesar.path, BREADCRUMBS.panesar),
        )}
      />

      <Breadcrumbs items={BREADCRUMBS.panesar} />

      <PageHero title={PROVIDER.name} eyebrow="Apollo Physicians" subtitle={PANESAR_LEAD}>
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
      </PageHero>

      <Section headingId="panesar-facts-heading" title="Practice details">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Credentials</dt>
            <dd className="mt-2 text-navy-900">MD</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Specialty</dt>
            <dd className="mt-2 text-navy-900">{SPECIALTY}</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Office</dt>
            <dd className="mt-2 text-navy-900">{OFFICE.line}</dd>
          </div>
          <div className="card">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Phone</dt>
            <dd className="mt-2 text-navy-900">{PHONES.main.display}</dd>
          </div>
          <div className="card sm:col-span-2">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">NPI</dt>
            <dd className="mt-2 text-navy-900">{NPI.panesar}</dd>
          </div>
          <div className="card sm:col-span-2">
            <dt className="text-sm font-semibold uppercase tracking-wide text-teal-800">Profiles on other sites</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-x-6">
                {PHYSICIAN_PROFILE_LIST.map((profile) => (
                  <li key={profile.url}>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline"
                    >
                      {profile.label}
                      <span className="sr-only"> profile for {PROVIDER.shortName} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Section>

      <Section headingId="panesar-faq-heading" title="Questions about Dr. Panesar" tone="muted">
        <dl className="space-y-6">
          {PANESAR_FAQS.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold text-navy-900">{faq.question}</dt>
              <dd className="mt-2 text-navy-800">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section headingId="panesar-verify-heading" title="Check a physician's license">
        <p className="max-w-3xl text-navy-800">
          California physicians are licensed by the Medical Board of California. You can look up any California physician, including
          license status, with the{' '}
          <a href={LICENSE_LOOKUP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 hover:underline">
            California Department of Consumer Affairs license search<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </Section>

      <Section headingId="panesar-links-heading" title="Related" tone="muted">
        <p className="max-w-3xl text-navy-800">
          Read about{' '}
          <Link href="/" className="font-semibold text-teal-800 hover:underline">
            family physician services in Sacramento
          </Link>
          , or see our{' '}
          <Link href="/family-physician-elk-grove" className="font-semibold text-teal-800 hover:underline">
            Family Physician in Elk Grove
          </Link>{' '}
          page.
        </p>
      </Section>
    </>
  );
}
