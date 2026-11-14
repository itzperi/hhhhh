import { ContentPage } from '@/components/page/ContentPage';
import { LANGUAGES_DIRECT_ANSWER, LANGUAGES_PAGE } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.languages.title,
  description: PAGE_META.languages.description,
  path: PAGE_META.languages.path,
});

export default function PunjabiHindiSpeakingDoctorPage() {
  assertLive('languages');
  return <ContentPage pageKey="languages" content={LANGUAGES_PAGE} directAnswer={LANGUAGES_DIRECT_ANSWER} />;
}
