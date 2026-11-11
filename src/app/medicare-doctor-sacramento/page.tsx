import { ContentPage } from '@/components/page/ContentPage';
import { MEDICARE, MEDICARE_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.medicare.title,
  description: PAGE_META.medicare.description,
  path: PAGE_META.medicare.path,
});

export default function MedicareDoctorPage() {
  assertLive('medicare');
  return <ContentPage pageKey="medicare" content={MEDICARE} directAnswer={MEDICARE_DIRECT_ANSWER} />;
}
