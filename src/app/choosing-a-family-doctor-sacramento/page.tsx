import { ContentPage } from '@/components/page/ContentPage';
import { CHOOSE_DOCTOR, CHOOSE_DOCTOR_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.chooseDoctor.title,
  description: PAGE_META.chooseDoctor.description,
  path: PAGE_META.chooseDoctor.path,
});

export default function ChoosingAFamilyDoctorPage() {
  assertLive('chooseDoctor');
  return <ContentPage pageKey="chooseDoctor" content={CHOOSE_DOCTOR} directAnswer={CHOOSE_DOCTOR_DIRECT_ANSWER} />;
}
