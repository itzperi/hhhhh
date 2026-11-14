import {
  ANNUAL_DIRECT_ANSWER,
  ANNUAL_PHYSICAL,
  CHOOSE_DOCTOR,
  CHOOSE_DOCTOR_DIRECT_ANSWER,
  CONTACT,
  CONTACT_DIRECT_ANSWER,
  FAQ_DIRECT_ANSWER,
  FAQ_HUB,
  IMMIGRATION,
  IMMIGRATION_DIRECT_ANSWER,
  INSURANCE,
  INSURANCE_DIRECT_ANSWER,
  LANGUAGES_DIRECT_ANSWER,
  LANGUAGES_PAGE,
  MEDICARE,
  MEDICARE_DIRECT_ANSWER,
  MEDI_CAL,
  MEDI_CAL_DIRECT_ANSWER,
  NEW_PATIENTS,
  NEW_PATIENTS_DIRECT_ANSWER,
  NIVANO,
  NIVANO_DIRECT_ANSWER,
  SAME_DAY,
  SAME_DAY_DIRECT_ANSWER,
  SELF_PAY,
  SELF_PAY_DIRECT_ANSWER,
  SERVICES,
  SERVICES_DIRECT_ANSWER,
  SPORTS_PHYSICAL,
  SPORTS_PHYSICAL_DIRECT_ANSWER,
  WELL_CHILD,
  WELL_CHILD_DIRECT_ANSWER,
  type ContentBlock,
} from '@/data/content';
import { CLINICAL_REVIEW, PAGE_META, isLive, reviewedOnLabel, type PageKey } from '@/data/pages';
import { ELK_GROVE_DIRECT_ANSWER, ELK_GROVE_FAQS, HOME_DIRECT_ANSWER, HOME_FAQS, PANESAR_DIRECT_ANSWER, PANESAR_FAQS } from '@/data/practice';
import { BRAND, absoluteUrl } from '@/data/site';
import { quickFacts, visibleBlocks, visibleFaqs } from '@/lib/content-utils';
import type { FaqItem } from '@/types';

/**
 * Builds /llms-full.txt: the full text of every live page (direct answer, sections and FAQs), from the same
 * data the pages render, so it can never say something the site does not. Held pages are left out until
 * Dr. Panesar's review, exactly as in the sitemap and llms.txt.
 */

interface PageText {
  directAnswer: string;
  blocks?: readonly ContentBlock[];
  faqs: readonly FaqItem[];
}

const PAGE_TEXT: Record<PageKey, PageText> = {
  home: { directAnswer: HOME_DIRECT_ANSWER, faqs: HOME_FAQS },
  newPatients: { directAnswer: NEW_PATIENTS_DIRECT_ANSWER, blocks: NEW_PATIENTS.blocks, faqs: NEW_PATIENTS.faqs },
  annualPhysical: { directAnswer: ANNUAL_DIRECT_ANSWER, blocks: ANNUAL_PHYSICAL.blocks, faqs: ANNUAL_PHYSICAL.faqs },
  sameDay: { directAnswer: SAME_DAY_DIRECT_ANSWER, blocks: SAME_DAY.blocks, faqs: SAME_DAY.faqs },
  elkGrove: { directAnswer: ELK_GROVE_DIRECT_ANSWER, faqs: ELK_GROVE_FAQS },
  panesar: { directAnswer: PANESAR_DIRECT_ANSWER, faqs: PANESAR_FAQS },
  services: { directAnswer: SERVICES_DIRECT_ANSWER, blocks: SERVICES.blocks, faqs: SERVICES.faqs },
  immigration: { directAnswer: IMMIGRATION_DIRECT_ANSWER, blocks: IMMIGRATION.blocks, faqs: IMMIGRATION.faqs },
  insurance: { directAnswer: INSURANCE_DIRECT_ANSWER, blocks: INSURANCE.blocks, faqs: INSURANCE.faqs },
  medicare: { directAnswer: MEDICARE_DIRECT_ANSWER, blocks: MEDICARE.blocks, faqs: MEDICARE.faqs },
  mediCal: { directAnswer: MEDI_CAL_DIRECT_ANSWER, blocks: MEDI_CAL.blocks, faqs: MEDI_CAL.faqs },
  nivano: { directAnswer: NIVANO_DIRECT_ANSWER, blocks: NIVANO.blocks, faqs: NIVANO.faqs },
  selfPay: { directAnswer: SELF_PAY_DIRECT_ANSWER, blocks: SELF_PAY.blocks, faqs: SELF_PAY.faqs },
  languages: { directAnswer: LANGUAGES_DIRECT_ANSWER, blocks: LANGUAGES_PAGE.blocks, faqs: LANGUAGES_PAGE.faqs },
  sportsPhysical: { directAnswer: SPORTS_PHYSICAL_DIRECT_ANSWER, blocks: SPORTS_PHYSICAL.blocks, faqs: SPORTS_PHYSICAL.faqs },
  wellChild: { directAnswer: WELL_CHILD_DIRECT_ANSWER, blocks: WELL_CHILD.blocks, faqs: WELL_CHILD.faqs },
  chooseDoctor: { directAnswer: CHOOSE_DOCTOR_DIRECT_ANSWER, blocks: CHOOSE_DOCTOR.blocks, faqs: CHOOSE_DOCTOR.faqs },
  contact: { directAnswer: CONTACT_DIRECT_ANSWER, blocks: CONTACT.blocks, faqs: CONTACT.faqs },
  faq: { directAnswer: FAQ_DIRECT_ANSWER, blocks: FAQ_HUB.blocks, faqs: FAQ_HUB.faqs },
};

function blockText(block: ContentBlock): string {
  const lines = [`### ${block.heading}`, ''];
  for (const p of block.paragraphs ?? []) lines.push(p, '');
  block.steps?.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
  block.bullets?.forEach((b) => lines.push(`- ${b}`));
  if (block.table) {
    lines.push(`${block.table.caption}:`);
    for (const row of block.table.rows) lines.push(`- ${row.join(' | ')}`);
  }
  return lines.join('\n').trim();
}

export function buildLlmsFullTxt(): string {
  const facts = quickFacts()
    .map((f) => `- ${f.label}: ${f.value}`)
    .join('\n');
  const sections = [`# ${BRAND.name}: full text of every live page\n\n## Quick facts\n\n${facts}`];

  for (const key of Object.keys(PAGE_META) as PageKey[]) {
    const meta = PAGE_META[key];
    if (!isLive(meta)) continue;
    const page = PAGE_TEXT[key];
    const parts = [`## ${meta.title}\n\nURL: ${absoluteUrl(meta.path)}`, page.directAnswer];
    for (const block of visibleBlocks(page.blocks ?? [])) parts.push(blockText(block));
    const faqs = visibleFaqs(page.faqs);
    if (faqs.length) parts.push(['### Questions and answers', ...faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`)].join('\n\n'));
    const reviewed = reviewedOnLabel(meta);
    if ('clinical' in meta && meta.clinical && reviewed) parts.push(`Medical review: ${CLINICAL_REVIEW.reviewer}. Last reviewed: ${reviewed}.`);
    sections.push(parts.join('\n\n'));
  }

  sections.push('## Note\n\nGeneral practice information, not medical advice. In an emergency, call 911.');
  return `${sections.join('\n\n')}\n`;
}
