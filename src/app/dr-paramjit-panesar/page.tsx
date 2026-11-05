import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { PROVIDER, SPECIALTY } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { NPI, OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, graph, physicianNode, websiteNode } from '@/lib/structured-data';
import { telHref } from '@/lib/utils';

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
          breadcrumbNode('/dr-paramjit-panesar#breadcrumb', [
            { name: 'Home', path: '/' },
            { name: PROVIDER.name, path: PAGE_META.panesar.path },
          ]),
        )}
      />

      <PageHero title={PROVIDER.name} eyebrow="Apollo Physicians" subtitle={`${SPECIALTY} at Apollo Physicians, ${OFFICE.line}.`}>
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
        </dl>
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
