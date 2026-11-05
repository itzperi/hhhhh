import { HomeHero } from '@/components/home/HomeHero';
import { HomeSections } from '@/components/home/HomeSections';
import { JsonLd } from '@/components/ui/JsonLd';
import { HOME_FAQS } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbNode, clinicNode, faqNode, graph, physicianNode, websiteNode } from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: PAGE_META.home.title,
  description: PAGE_META.home.description,
  path: PAGE_META.home.path,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          websiteNode(),
          clinicNode(),
          physicianNode(),
          faqNode('/#faq', HOME_FAQS),
          breadcrumbNode('/#breadcrumb', [{ name: 'Home', path: PAGE_META.home.path }]),
        )}
      />
      <HomeHero />
      <HomeSections />
    </>
  );
}
