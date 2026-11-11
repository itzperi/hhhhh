import { ContentPage } from '@/components/page/ContentPage';
import { NIVANO, NIVANO_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.nivano.title,
  description: PAGE_META.nivano.description,
  path: PAGE_META.nivano.path,
});

export default function NivanoPhysiciansDoctorPage() {
  assertLive('nivano');
  return <ContentPage pageKey="nivano" content={NIVANO} directAnswer={NIVANO_DIRECT_ANSWER} />;
}
