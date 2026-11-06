import { ContentPage } from '@/components/page/ContentPage';
import { SERVICES, SERVICES_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.services.title,
  description: PAGE_META.services.description,
  path: PAGE_META.services.path,
});

export default function ServicesPage() {
  assertLive('services');
  return <ContentPage pageKey="services" content={SERVICES} directAnswer={SERVICES_DIRECT_ANSWER} />;
}
