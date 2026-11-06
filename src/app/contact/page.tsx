import { MapPin, Phone } from 'lucide-react';
import { ContentPage } from '@/components/page/ContentPage';
import { ButtonLink } from '@/components/ui/Button';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { Section } from '@/components/ui/Section';
import { CONTACT, CONTACT_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { OFFICE, PHONES } from '@/data/site';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';
import { mapsDirectionsFromUrl, mapsDirectionsUrl, telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.contact.title,
  description: PAGE_META.contact.description,
  path: PAGE_META.contact.path,
});

/** Address, call and directions buttons, and the click-to-load map. Office hours are added here once confirmed. */
function ContactDetails() {
  return (
    <Section id="office" headingId="contact-office-heading" title="Our office">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <address className="text-xl not-italic leading-relaxed text-navy-900">
            Apollo Physicians
            <br />
            {OFFICE.street}
            <br />
            {OFFICE.city}, {OFFICE.state} {OFFICE.postalCode}
          </address>
          <p className="text-lg text-navy-800">
            Phone:{' '}
            <a href={telHref(PHONES.main.tel)} className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
              {PHONES.main.display}
            </a>
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {PHONES.main.display}
            </ButtonLink>
            <ButtonLink href={mapsDirectionsUrl(OFFICE.line)} variant="outline" external>
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Get directions
            </ButtonLink>
            <ButtonLink href={mapsDirectionsFromUrl('Elk Grove, CA', OFFICE.line)} variant="outline" external>
              <MapPin className="h-5 w-5" aria-hidden="true" />
              Directions from Elk Grove
            </ButtonLink>
          </div>
        </div>
        <MapEmbed query={OFFICE.line} title={`Map of the Apollo Physicians office at ${OFFICE.line}`} />
      </div>
    </Section>
  );
}

export default function ContactPage() {
  assertLive('contact');
  return <ContentPage pageKey="contact" content={CONTACT} directAnswer={CONTACT_DIRECT_ANSWER} before={<ContactDetails />} />;
}
