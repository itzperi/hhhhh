import { ContentPage } from '@/components/page/ContentPage';
import { FAQ_DIRECT_ANSWER, FAQ_HUB } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.faq.title,
  description: PAGE_META.faq.description,
  path: PAGE_META.faq.path,
});

export default function FaqPage() {
  assertLive('faq');
  return <ContentPage pageKey="faq" content={FAQ_HUB} directAnswer={FAQ_DIRECT_ANSWER} />;
}
