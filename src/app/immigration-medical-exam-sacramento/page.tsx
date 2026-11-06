import { ContentPage } from '@/components/page/ContentPage';
import { IMMIGRATION, IMMIGRATION_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.immigration.title,
  description: PAGE_META.immigration.description,
  path: PAGE_META.immigration.path,
});

export default function ImmigrationPage() {
  assertLive('immigration');
  return <ContentPage pageKey="immigration" content={IMMIGRATION} directAnswer={IMMIGRATION_DIRECT_ANSWER} />;
}
