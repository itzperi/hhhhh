import { HomeHero } from '@/components/home/HomeHero';
import { HomeSections } from '@/components/home/HomeSections';
import { JsonLd } from '@/components/ui/JsonLd';
import { HOME_FAQS } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { clinicNode, faqNode, graph, physicianNode, webPageNode, websiteNode } from '@/lib/structured-data';

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
          webPageNode({ path: PAGE_META.home.path, name: PAGE_META.home.title, description: PAGE_META.home.description, faq: true }),
          faqNode(PAGE_META.home.path, HOME_FAQS),
        )}
      />
      <HomeHero />
      <HomeSections />
    </>
  );
}
