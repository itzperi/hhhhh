import { ContentPage } from '@/components/page/ContentPage';
import { SPORTS_PHYSICAL, SPORTS_PHYSICAL_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.sportsPhysical.title,
  description: PAGE_META.sportsPhysical.description,
  path: PAGE_META.sportsPhysical.path,
});

export default function SportsPhysicalPage() {
  assertLive('sportsPhysical');
  return <ContentPage pageKey="sportsPhysical" content={SPORTS_PHYSICAL} directAnswer={SPORTS_PHYSICAL_DIRECT_ANSWER} />;
}
