import { ContentPage } from '@/components/page/ContentPage';
import { ANNUAL_DIRECT_ANSWER, ANNUAL_PHYSICAL } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.annualPhysical.title,
  description: PAGE_META.annualPhysical.description,
  path: PAGE_META.annualPhysical.path,
});

export default function AnnualPhysicalPage() {
  assertLive('annualPhysical');
  return <ContentPage pageKey="annualPhysical" content={ANNUAL_PHYSICAL} directAnswer={ANNUAL_DIRECT_ANSWER} />;
}
