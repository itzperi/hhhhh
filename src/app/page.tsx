import { HomeHero } from '@/components/home/HomeHero';
import { HomeSections } from '@/components/home/HomeSections';
import { QuickFacts } from '@/components/page/QuickFacts';
import { JsonLd } from '@/components/ui/JsonLd';
import { HOME_FAQS } from '@/data/practice';
import { PAGE_META } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { pageGraph } from '@/lib/structured-data';

export const metadata = buildMetadata({
  title: PAGE_META.home.title,
  description: PAGE_META.home.description,
  path: PAGE_META.home.path,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={pageGraph({ key: 'home', faqs: HOME_FAQS })} />
      <HomeHero />
      <QuickFacts />
      <HomeSections />
    </>
  );
}
