import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { FaqList } from '@/components/page/FaqList';
import { QuickFacts } from '@/components/page/QuickFacts';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { InsurancePills } from '@/components/ui/InsurancePills';
import { JsonLd } from '@/components/ui/JsonLd';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BREADCRUMBS } from '@/data/navigation';
import { PAGE_META } from '@/data/pages';
import { ELK_GROVE_DIRECT_ANSWER, ELK_GROVE_FAQS, ELK_GROVE_NOTE, INITIAL_VISIT_PRICE } from '@/data/practice';
import { AREAS_SERVED, ELK_GROVE_DRIVE, LOCATION, OFFICE, PHONES } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structured-data';
import { mapsDirectionsFromUrl, mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.elkGrove.title,
  description: PAGE_META.elkGrove.description,
  path: PAGE_META.elkGrove.path,
});

const ROUTES = [
  { start: 'Elk Grove, ZIP 95758', time: `About ${ELK_GROVE_DRIVE.minutes} minutes`, distance: `${ELK_GROVE_DRIVE.milesFrom95758} miles`, route: ELK_GROVE_DRIVE.routeFrom95758 },
  { start: 'Elk Grove, ZIP 95758 (alternate)', time: `About ${ELK_GROVE_DRIVE.minutes} minutes`, distance: '6.2 miles', route: ELK_GROVE_DRIVE.altRouteFrom95758 },
  { start: 'Elk Grove, ZIP 95624', time: `About ${ELK_GROVE_DRIVE.minutes} minutes`, distance: '6.8 miles', route: ELK_GROVE_DRIVE.routeFrom95624 },
] as const;

export default function ElkGrovePage() {
  return (
    <>
      <JsonLd data={pageGraph({ key: 'elkGrove', faqs: ELK_GROVE_FAQS, breadcrumb: BREADCRUMBS.elkGrove })} />

      <Breadcrumbs items={BREADCRUMBS.elkGrove} />

      <PageHero title="Family Physician for Elk Grove Patients" eyebrow="Elk Grove patients" subtitle={ELK_GROVE_DIRECT_ANSWER}>
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

      <QuickFacts />

      <Section id="getting-here" headingId="elk-office-heading" title="Getting here from Elk Grove">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-navy-800">{ELK_GROVE_NOTE}</p>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Drive times from Elk Grove table, scrollable">
              <table className="w-full min-w-[26rem] border-collapse text-left">
                <caption className="mb-2 text-left text-sm font-semibold text-navy-700">
                  Drive times from Google Maps, usual traffic, checked {ELK_GROVE_DRIVE.checked}
                </caption>
                <thead>
                  <tr>
                    {['Start', 'Time', 'Distance', 'Route'].map((heading) => (
                      <th key={heading} scope="col" className="border-b-2 border-navy-700 px-2 py-2 text-sm font-bold text-navy-900">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROUTES.map((row) => (
                    <tr key={row.start}>
                      <th scope="row" className="border-b border-warm-300 px-2 py-2 font-semibold text-navy-900">
                        {row.start}
                      </th>
                      <td className="border-b border-warm-300 px-2 py-2">{row.time}</td>
                      <td className="border-b border-warm-300 px-2 py-2">{row.distance}</td>
                      <td className="border-b border-warm-300 px-2 py-2">via {row.route}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-navy-800">
              Your time depends on where you start and when you leave. The office is next to {LOCATION.highway} on {OFFICE.streetName}, about{' '}
              {LOCATION.hospitalDistance} from {LOCATION.nearHospital}.{' '}
              <a href={mapsDirectionsUrl(OFFICE.line)} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-800 hover:underline">
                Get directions<span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <MapEmbed query={OFFICE.line} title={`Map of the Apollo Physicians office at ${OFFICE.line}`} />
        </div>
      </Section>

      <Section id="areas" headingId="elk-areas-heading" title="Elk Grove ZIP codes and nearby areas" tone="muted">
        <p className="max-w-3xl text-lg leading-relaxed text-navy-800">
          Patients come from Elk Grove ZIP codes {AREAS_SERVED.zipElkGrove.join(', ')}, and from Sacramento ZIP codes {AREAS_SERVED.zipSacramento.join(' and ')},
          including {AREAS_SERVED.neighborhoods.slice(0, -1).join(', ')} and {AREAS_SERVED.neighborhoods[AREAS_SERVED.neighborhoods.length - 1]}.
        </p>
      </Section>

      <Section id="booking" headingId="elk-booking-heading" title="Booking from Elk Grove">
        <p className="max-w-3xl text-navy-800">
          Call{' '}
          <a href={telHref(PHONES.main.tel)} className="font-semibold text-teal-800 hover:underline">
            {PHONES.main.display}
          </a>{' '}
          before you travel to confirm your appointment. New patients are welcome; see how to{' '}
          <Link href="/new-patients" className="font-semibold text-teal-800 hover:underline">
            become a new patient
          </Link>{' '}
          or read about{' '}
          <Link href="/dr-paramjit-panesar-md" className="font-semibold text-teal-800 hover:underline">
            Dr. Paramjit Panesar
          </Link>
          .
        </p>
        <div className="mt-6">
          <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {PHONES.main.display}
          </ButtonLink>
        </div>
      </Section>

      <Section id="insurance" headingId="elk-insurance-heading" title="Insurance for Elk Grove patients" tone="muted">
        <p className="max-w-3xl text-navy-800">
          Elk Grove patients use the same plans as every patient, shown above. {INITIAL_VISIT_PRICE} Call {PHONES.main.display} to confirm your plan before you travel, or see the{' '}
          <Link href="/insurance-accepted" className="font-semibold text-teal-800 hover:underline">
            insurance page
          </Link>
          .
        </p>
      </Section>

      <FaqList idPrefix="elk" title="Elk Grove questions" faqs={ELK_GROVE_FAQS} />
    </>
  );
}
