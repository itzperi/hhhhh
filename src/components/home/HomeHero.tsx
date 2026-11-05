import { CheckCircle2, MapPin, Phone, Stethoscope } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { InsurancePills } from '@/components/ui/InsurancePills';
import { APPOINTMENT_AVAILABILITY, HOME_LEAD, INITIAL_VISIT_PRICE, PROVIDER } from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

/**
 * Home hero. The H1 is the target phrase for the home page. The primary action calls the
 * office, and the secondary action gets directions. The panel on the right lists facts the
 * practice has confirmed; no photo is shown, because none has been supplied.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-teal-800 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="hero-rise">
          <p className="eyebrow text-teal-200">Apollo Physicians</p>
          <h1 id="hero-heading" className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Family Physician in Sacramento, CA
          </h1>
          <h2 className="mt-3 text-2xl font-semibold text-teal-100 md:text-3xl">{APPOINTMENT_AVAILABILITY}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
            {HOME_LEAD} Call {PHONES.main.display} to book your visit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={telHref(PHONES.main.tel)} variant="primary" className="!bg-teal-400 !text-navy-900 hover:!bg-teal-300">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {PHONES.main.display}
            </ButtonLink>
            <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external className="border-white bg-transparent text-white hover:bg-white/10">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Get directions
            </ButtonLink>
          </div>

          <InsurancePills href="#insurance" tone="dark" className="mt-8" />

          <ul className="mt-6 grid gap-2 text-sm text-navy-100 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <span>{APPOINTMENT_AVAILABILITY}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" aria-hidden="true" />
              <span>{INITIAL_VISIT_PRICE}</span>
            </li>
          </ul>
        </div>

        <aside aria-label="Office details" className="hero-rise rounded-2xl bg-white/5 p-8 shadow-2xl ring-1 ring-white/10 [animation-delay:150ms]">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-6 w-6 text-teal-300" aria-hidden="true" />
            <p className="text-lg font-semibold">{PROVIDER.name}</p>
          </div>
          <p className="mt-2 text-navy-100">Family Medicine</p>
          <dl className="mt-6 space-y-4 text-navy-100">
            <div>
              <dt className="text-sm font-semibold text-teal-300">Office</dt>
              <dd className="mt-1">{OFFICE.line}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-teal-300">Phone</dt>
              <dd className="mt-1">{PHONES.main.display}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
