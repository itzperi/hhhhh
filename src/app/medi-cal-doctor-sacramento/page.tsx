import { ContentPage } from '@/components/page/ContentPage';
import { MEDI_CAL, MEDI_CAL_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.mediCal.title,
  description: PAGE_META.mediCal.description,
  path: PAGE_META.mediCal.path,
});

export default function MediCalDoctorPage() {
  assertLive('mediCal');
  return <ContentPage pageKey="mediCal" content={MEDI_CAL} directAnswer={MEDI_CAL_DIRECT_ANSWER} />;
}
