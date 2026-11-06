import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { FaqList } from '@/components/page/FaqList';
import { QuickFacts } from '@/components/page/QuickFacts';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { PAGE_META } from '@/data/pages';
import { CREDENTIALS, PANESAR_DIRECT_ANSWER, PANESAR_FAQS, PROVIDER, SPECIALTY, VERIFY_LINKS } from '@/data/practice';
import { NPI, OFFICE, PHONES, PHYSICIAN_PROFILE_LIST } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structured-data';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.panesar.title,
  description: PAGE_META.panesar.description,
  path: PAGE_META.panesar.path,
});

const CARD_LABEL = 'text-sm font-semibold uppercase tracking-wide text-teal-800';

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function PanesarPage() {
  return (
    <>
      <JsonLd data={pageGraph({ key: 'panesar', faqs: PANESAR_FAQS, breadcrumb: BREADCRUMBS.panesar })} />
      <Breadcrumbs items={BREADCRUMBS.panesar} />

      <PageHero title={PROVIDER.name} eyebrow="Family physician at Apollo Physicians" subtitle={PANESAR_DIRECT_ANSWER}>
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
        <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external className="border-white bg-transparent text-white hover:bg-white/10">
          <MapPin className="h-5 w-5" aria-hidden="true" />
          Get directions
        </ButtonLink>
      </PageHero>

      <QuickFacts />

      <Section id="credentials" headingId="panesar-credentials-heading" title="Credentials and training" description="Each item below can be checked in the public tools linked in the next section.">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div className="card">
            <dt className={CARD_LABEL}>Specialty</dt>
            <dd className="mt-2 text-navy-900">{SPECIALTY}</dd>
          </div>
          <div className="card">
            <dt className={CARD_LABEL}>Board certification</dt>
            <dd className="mt-2 text-navy-900">Board certified in family medicine, {CREDENTIALS.boardBody}</dd>
          </div>
          <div className="card">
            <dt className={CARD_LABEL}>California medical license</dt>
            <dd className="mt-2 text-navy-900">
              {CREDENTIALS.licenseNumber}, active since {CREDENTIALS.licenseSince}
            </dd>
          </div>
          <div className="card">
            <dt className={CARD_LABEL}>Medical school</dt>
            <dd className="mt-2 text-navy-900">
              {CREDENTIALS.medicalSchool}, {CREDENTIALS.medicalSchoolYear}
            </dd>
          </div>
          <div className="card">
            <dt className={CARD_LABEL}>Residency</dt>
            <dd className="mt-2 text-navy-900">
              {CREDENTIALS.residency}, {CREDENTIALS.residencyYears}
            </dd>
          </div>
          <div className="card">
            <dt className={CARD_LABEL}>Immigration medical exams</dt>
            <dd className="mt-2 text-navy-900">{CREDENTIALS.civilSurgeon}</dd>
          </div>
          <div className="card">
            <dt className={CARD_LABEL}>Areas of focus</dt>
            <dd className="mt-2 text-navy-900">Family medicine, immigration medical exams, preventive care</dd>
          </div>
          <div className="card">
            <dt className={CARD_LABEL}>NPI</dt>
            <dd className="mt-2 text-navy-900">{NPI.panesar}</dd>
          </div>
        </dl>
      </Section>

      <Section id="verify" headingId="panesar-verify-heading" title="Check the credentials yourself" tone="muted">
        <ul className="max-w-3xl space-y-1 text-navy-800">
          <li>
            <ExternalLink href={VERIFY_LINKS.license.href}>{VERIFY_LINKS.license.label}</ExternalLink> (search for license {CREDENTIALS.licenseNumber})
          </li>
          <li>
            <ExternalLink href={VERIFY_LINKS.certification.href}>{VERIFY_LINKS.certification.label}</ExternalLink> (board certification, including the {CREDENTIALS.boardBody})
          </li>
          <li>
            <ExternalLink href={VERIFY_LINKS.civilSurgeon.href}>{VERIFY_LINKS.civilSurgeon.label}</ExternalLink> (designated civil surgeons by location)
          </li>
        </ul>
        <h3 className="mt-6 text-lg font-semibold text-navy-900">Profiles on other sites</h3>
        <ul className="flex flex-wrap gap-x-6">
          {PHYSICIAN_PROFILE_LIST.map((profile) => (
            <li key={profile.url}>
              <a href={profile.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                {profile.label}
                <span className="sr-only"> profile for {PROVIDER.shortName} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <FaqList idPrefix="panesar" title={`Questions about ${PROVIDER.shortName}`} faqs={PANESAR_FAQS} />

      <Section headingId="panesar-links-heading" title="Related" tone="muted">
        <p className="max-w-3xl text-navy-800">
          Read about{' '}
          <Link href="/" className="font-semibold text-teal-800 hover:underline">
            family physician services in Sacramento
          </Link>
          , see how to{' '}
          <Link href="/new-patients" className="font-semibold text-teal-800 hover:underline">
            become a new patient
          </Link>
          , check{' '}
          <Link href="/insurance-accepted" className="font-semibold text-teal-800 hover:underline">
            insurance accepted
          </Link>
          , or visit the{' '}
          <Link href="/family-physician-elk-grove" className="font-semibold text-teal-800 hover:underline">
            Family Physician in Elk Grove
          </Link>{' '}
          page.
        </p>
      </Section>
    </>
  );
}
