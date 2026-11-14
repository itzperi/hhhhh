import { ContentPage } from '@/components/page/ContentPage';
import { WELL_CHILD, WELL_CHILD_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.wellChild.title,
  description: PAGE_META.wellChild.description,
  path: PAGE_META.wellChild.path,
});

export default function WellChildExamPage() {
  assertLive('wellChild');
  return <ContentPage pageKey="wellChild" content={WELL_CHILD} directAnswer={WELL_CHILD_DIRECT_ANSWER} />;
}
