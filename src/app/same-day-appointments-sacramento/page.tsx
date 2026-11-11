import { ContentPage } from '@/components/page/ContentPage';
import { SAME_DAY, SAME_DAY_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.sameDay.title,
  description: PAGE_META.sameDay.description,
  path: PAGE_META.sameDay.path,
});

export default function SameDayAppointmentsPage() {
  assertLive('sameDay');
  return <ContentPage pageKey="sameDay" content={SAME_DAY} directAnswer={SAME_DAY_DIRECT_ANSWER} />;
}
