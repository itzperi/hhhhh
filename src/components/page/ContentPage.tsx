import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { QuickFacts } from '@/components/page/QuickFacts';
import { FaqList } from '@/components/page/FaqList';
import { NOT_MEDICAL_ADVICE, type PageContent } from '@/data/content';
import { BREADCRUMBS } from '@/data/navigation';
import { CLINICAL_REVIEW, livePages, PAGE_META, reviewedOnLabel, type PageKey } from '@/data/pages';
import { PROVIDER } from '@/data/practice';
import { OFFICE, PHONES } from '@/data/site';
import { visibleBlocks, visibleFaqs } from '@/lib/content-utils';
import { pageGraph } from '@/lib/structured-data';
import { mapsDirectionsUrl, telHref } from '@/lib/utils';

interface ContentPageProps {
  pageKey: Exclude<PageKey, 'home'>;
  content: PageContent;
  /** 40 to 60 words, shown directly under the H1 and marked for voice assistants. */
  directAnswer: string;
  /** Extra content between Quick Facts and the main sections (for example a table or a map). */
  before?: ReactNode;
  /** Extra content after the main sections and before the FAQ. */
  after?: ReactNode;
}

/** Pages that every inner page links to, in this order, when they are live. */
const NEXT_STEPS: readonly { key: PageKey; label: string }[] = [
  { key: 'newPatients', label: 'New patients' },
  { key: 'insurance', label: 'Insurance accepted' },
  { key: 'contact', label: 'Contact and directions' },
  { key: 'panesar', label: PROVIDER.name },
];

/**
 * Template for the inner pages. Order: breadcrumb, H1, direct answer, Quick Facts, content sections,
 * FAQ, sources and medical review note (health pages), next steps. Health content is filtered until
 * Dr. Panesar's review; the caller is responsible for returning 404 before reaching here (assertLive).
 */
export function ContentPage({ pageKey, content, directAnswer, before, after }: ContentPageProps) {
  const meta = PAGE_META[pageKey];
  const clinical = 'clinical' in meta && meta.clinical;
  const faqs = visibleFaqs(content.faqs);
  const reviewed = reviewedOnLabel(meta);
  const livePaths = new Set(livePages().map((page) => page.path));

  return (
    <>
      <JsonLd data={pageGraph({ key: pageKey, faqs, breadcrumb: BREADCRUMBS[pageKey] })} />
      <Breadcrumbs items={BREADCRUMBS[pageKey]} />

      <PageHero title={content.h1} eyebrow={content.eyebrow} subtitle={directAnswer}>
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
      {before}

      {visibleBlocks(content.blocks).map((block, index) => (
        <Section key={block.id} id={block.id} headingId={`${block.id}-heading`} title={block.heading} tone={index % 2 === 0 ? 'default' : 'muted'}>
          <div className="max-w-3xl space-y-4 text-navy-800">
            {block.paragraphs?.map((text) => (
              <p key={text} className="text-lg leading-relaxed">
                {text}
              </p>
            ))}
            {block.steps ? (
              <ol className="list-decimal space-y-2 pl-6 text-lg leading-relaxed marker:font-semibold marker:text-teal-800">
                {block.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            ) : null}
            {block.bullets ? (
              <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed marker:text-teal-700">
                {block.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {block.table ? (
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`${block.table.caption}, scrollable`}>
                <table className="w-full min-w-[32rem] border-collapse text-left">
                  <caption className="mb-2 text-left text-sm font-semibold text-navy-700">{block.table.caption}</caption>
                  <thead>
                    <tr>
                      {block.table.head.map((cell) => (
                        <th key={cell} scope="col" className="border-b-2 border-navy-700 px-3 py-2 text-sm font-bold text-navy-900">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell, i) =>
                          i === 0 ? (
                            <th key={cell} scope="row" className="border-b border-warm-300 px-3 py-2 font-semibold text-navy-900">
                              {cell}
                            </th>
                          ) : (
                            <td key={cell} className="border-b border-warm-300 px-3 py-2">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {block.links ? (
              <ul className="flex flex-wrap gap-x-6">
                {block.links
                  .filter((link) => link.external || livePaths.has(link.href))
                  .map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link href={link.href} className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            ) : null}
          </div>
        </Section>
      ))}

      {after}

      <FaqList idPrefix={pageKey} faqs={content.faqs} tone={visibleBlocks(content.blocks).length % 2 === 0 ? 'default' : 'muted'} />

      {content.sources?.length ? (
        <Section headingId={`${pageKey}-sources-heading`} title="Sources and references" className="!py-10 md:!py-12">
          <ul className="flex flex-wrap gap-x-6">
            {content.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                  {source.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {clinical ? (
        <Section headingId={`${pageKey}-review-heading`} title="Medical review" tone="muted" className="!py-10 md:!py-12">
          <p className="max-w-3xl text-navy-800">
            Medical review: {CLINICAL_REVIEW.reviewer}. Last reviewed: {reviewed ?? 'not yet reviewed'}.
          </p>
          <p className="mt-3 max-w-3xl text-sm text-navy-700">{NOT_MEDICAL_ADVICE}</p>
        </Section>
      ) : null}

      <Section headingId={`${pageKey}-next-heading`} title="Next steps" tone={clinical ? 'default' : 'muted'} className="!py-10 md:!py-12">
        <ul className="flex flex-wrap gap-x-6">
          {NEXT_STEPS.filter((step) => step.key !== pageKey && livePaths.has(PAGE_META[step.key].path)).map((step) => (
            <li key={step.key}>
              <Link href={PAGE_META[step.key].path} className="inline-flex min-h-[44px] items-center font-semibold text-teal-800 hover:underline">
                {step.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
