import { ContentPage } from '@/components/page/ContentPage';
import { NEW_PATIENTS, NEW_PATIENTS_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.newPatients.title,
  description: PAGE_META.newPatients.description,
  path: PAGE_META.newPatients.path,
});

export default function NewPatientsPage() {
  assertLive('newPatients');
  return <ContentPage pageKey="newPatients" content={NEW_PATIENTS} directAnswer={NEW_PATIENTS_DIRECT_ANSWER} />;
}
