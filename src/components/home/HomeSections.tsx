import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, Star, Stethoscope } from 'lucide-react';
import { FaqList } from '@/components/page/FaqList';
import { ButtonLink } from '@/components/ui/Button';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { Section } from '@/components/ui/Section';
import { livePages, PAGE_META, type PageKey } from '@/data/pages';
import { CREDENTIALS, HOME_FAQS, INITIAL_VISIT_PRICE, INSURANCE_ACCEPTED, PROVIDER, SPECIALTY } from '@/data/practice';
import { AREAS_SERVED, LOCATION, OFFICE, PHONES } from '@/data/site';
import { mapsDirectionsUrl, mapsPlaceUrl, telHref } from '@/lib/utils';

/** Cards that point visitors to the right next page. A card appears only when its page is live. */
const HELP_CARDS: readonly { key: PageKey; title: string; text: string }[] = [
  { key: 'newPatients', title: 'New patients', text: 'Apollo Physicians is accepting new patients. See how to book and what to bring.' },
  { key: 'sameDay', title: 'Same-day appointments', text: 'Same-day and next-day visits. See how to ask for one, and when to call 911 instead.' },
  { key: 'annualPhysical', title: 'Annual physical', text: 'A yearly preventive visit with a physical exam. See what to expect and bring.' },
  { key: 'services', title: 'Services', text: 'Family medicine services, from physicals and vaccinations to ongoing care.' },
  { key: 'immigration', title: 'Immigration medical exam', text: 'USCIS immigration medical exams with a designated civil surgeon (Form I-693).' },
  { key: 'insurance', title: 'Insurance accepted', text: 'Medicare and several major health plans, plus self-pay visits from $65.' },
  { key: 'elkGrove', title: 'Elk Grove patients', text: 'About 12 minutes from Elk Grove by car, with drive times and routes.' },
  { key: 'contact', title: 'Contact and directions', text: 'Address, phone, a map and directions to the South Sacramento office.' },
];

/** Everything below the hero and Quick Facts on the home page. Each block uses only facts from the data files. */
export function HomeSections() {
  const live = new Set(livePages().map((page) => page.path));
  const cards = HELP_CARDS.filter((card) => live.has(PAGE_META[card.key].path));
  const neighborhoods = AREAS_SERVED.neighborhoods;

  return (
    <>
      <Section id="how-we-help" headingId="home-help-heading" title="How we can help" eyebrow="Family medicine in Sacramento">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">
              Looking for a family doctor near you in South Sacramento? Family medicine is a primary care specialty, and {PROVIDER.name}, practices it here at
              a single office on {OFFICE.streetName}. Same-day and next-day appointments are offered, new patients are welcome, and {INITIAL_VISIT_PRICE.toLowerCase()}
            </p>
            <p className="text-lg leading-relaxed text-navy-800">
              A family physician cares for people of all ages and is often the first doctor you call. If you are searching for a primary care physician in
              Sacramento, start by checking that the office accepts your insurance, then call {PHONES.main.display} to book.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cards.map((card) => (
              <li key={card.key} className="card !p-4">
                <h3 className="text-lg font-bold text-navy-900">
                  <Link href={PAGE_META[card.key].path} className="inline-flex min-h-[44px] items-center hover:underline">
                    {card.title}
                  </Link>
                </h3>
                <p className="text-sm text-navy-800">{card.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section headingId="home-provider-heading" title="Our physician" tone="muted">
        <article className="card flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800" aria-hidden="true">
            <Stethoscope className="h-9 w-9" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-navy-900">
              <Link href={PAGE_META.panesar.path} className="inline-flex min-h-[44px] items-center hover:underline">
                {PROVIDER.name}
              </Link>
            </h3>
            <p className="text-navy-800">
              {SPECIALTY} at Apollo Physicians. Board certified by the {CREDENTIALS.boardBody}. Medical degree from {CREDENTIALS.medicalSchool}, {CREDENTIALS.medicalSchoolYear};
              residency at UAMS, {CREDENTIALS.residencyYears}. A USCIS-designated civil surgeon for immigration medical exams.
            </p>
            <p className="text-sm text-navy-700">California medical license {CREDENTIALS.licenseNumber}. You can check it on the Medical Board of California license search.</p>
          </div>
        </article>
      </Section>

      <Section
        id="insurance"
        headingId="home-insurance-heading"
        title="Insurance we accept"
        description={`Medicare and several major health plans. Call ${PHONES.main.display} to confirm your plan before your visit.`}
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INSURANCE_ACCEPTED.map((plan) => (
            <li key={plan} className="card flex items-center gap-2 font-semibold text-navy-900">
              <CheckCircle2 className="h-5 w-5 text-teal-700" aria-hidden="true" />
              {plan}
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href={PAGE_META.insurance.path} className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
            See insurance and pricing details
          </Link>
        </p>
      </Section>

      <Section id="areas" headingId="home-areas-heading" title="Areas we serve" tone="muted">
        <div className="card max-w-3xl space-y-3">
          <p className="text-navy-800">
            Apollo Physicians has one office, in South Sacramento. Patients come from {neighborhoods.slice(0, -1).join(', ')} and {neighborhoods[neighborhoods.length - 1]}, and from Elk Grove.
          </p>
          <p className="text-navy-800">
            Sacramento ZIP codes: {AREAS_SERVED.zipSacramento.join(' and ')}. Elk Grove ZIP codes: {AREAS_SERVED.zipElkGrove.join(', ')}. Elk Grove patients are seen at the South Sacramento
            office, about 12 minutes away by car.
          </p>
          <Link href={PAGE_META.elkGrove.path} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-teal-800 hover:underline">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Family Physician in Elk Grove
          </Link>
        </div>
      </Section>

      <Section id="location" headingId="home-location-heading" title="Find the office">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <address className="text-lg not-italic leading-relaxed text-navy-800">{OFFICE.line}</address>
            <p className="text-navy-800">
              The office is next to {LOCATION.highway} and about {LOCATION.hospitalDistance} from {LOCATION.nearHospital}. It is the only Apollo Physicians location.
            </p>
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

      <Section id="reviews" headingId="home-reviews-heading" title="Patient reviews" tone="muted">
        <div className="card flex max-w-3xl flex-col gap-3">
          <p className="flex items-center gap-2 font-semibold text-navy-900">
            <Star className="h-5 w-5 text-teal-700" aria-hidden="true" />
            Read what patients say on Google
          </p>
          <p className="text-navy-800">
            Patients share their experience on Google. Read the reviews there, and if you have been to the office you are welcome to leave one of your own. Reviews are
            written by patients, and the office does not choose or edit them.
          </p>
          <p>
            <a
              href={mapsPlaceUrl(`Apollo Physicians, ${OFFICE.line}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline"
            >
              Read and write reviews on Google
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </Section>

      <FaqList idPrefix="home" faqs={HOME_FAQS} />
    </>
  );
}
