import { Phone } from 'lucide-react';
import { ContentPage } from '@/components/page/ContentPage';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { INSURANCE, INSURANCE_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { INITIAL_VISIT_PRICE, INSURANCE_GROUPS, INSURANCE_LIST_DATE } from '@/data/practice';
import { PHONES } from '@/data/site';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';

export const metadata = buildMetadata({
  title: PAGE_META.insurance.title,
  description: PAGE_META.insurance.description,
  path: PAGE_META.insurance.path,
});

/** The accepted plans as a real table: Type, then the names. Last-provided date and a confirm note sit under it. */
function PlansTable() {
  return (
    <Section id="plans" headingId="insurance-plans-heading" title="Plans accepted" description={`Provided by the practice on ${INSURANCE_LIST_DATE}.`}>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Accepted insurance plans table, scrollable">
        <table className="w-full min-w-[28rem] border-collapse text-left">
          <caption className="sr-only">Insurance plans, Medicare and medical groups accepted by Apollo Physicians</caption>
          <thead>
            <tr>
              <th scope="col" className="border-b-2 border-navy-700 px-3 py-2 text-sm font-bold text-navy-900">
                Type
              </th>
              <th scope="col" className="border-b-2 border-navy-700 px-3 py-2 text-sm font-bold text-navy-900">
                Accepted
              </th>
            </tr>
          </thead>
          <tbody>
            {INSURANCE_GROUPS.map((group) => (
              <tr key={group.type}>
                <th scope="row" className="border-b border-warm-300 px-3 py-3 align-top font-semibold text-navy-900">
                  {group.type}
                </th>
                <td className="border-b border-warm-300 px-3 py-3">
                  <ul className="flex flex-wrap gap-2">
                    {group.names.map((name) => (
                      <li key={name} className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-900 ring-1 ring-teal-200">
                        {name}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-3 py-3 align-top font-semibold text-navy-900">
                Self-pay
              </th>
              <td className="px-3 py-3">{INITIAL_VISIT_PRICE}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-3xl text-navy-800">
        Plans and networks change, so confirm yours before your visit. Call {PHONES.main.display} with your plan name.
      </p>
      <div className="mt-6">
        <ButtonLink href={telHref(PHONES.main.tel)} variant="primary">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </ButtonLink>
      </div>
    </Section>
  );
}

export default function InsurancePage() {
  assertLive('insurance');
  return <ContentPage pageKey="insurance" content={INSURANCE} directAnswer={INSURANCE_DIRECT_ANSWER} before={<PlansTable />} />;
}
