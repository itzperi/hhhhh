import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" subtitle="The page you are looking for is not on this site.">
        <ButtonLink href={telHref(PHONES.main.tel)} variant="light">
          Call {PHONES.main.display}
        </ButtonLink>
        <Link href="/" className="inline-flex items-center rounded-md border border-white px-4 py-2 font-semibold text-white hover:bg-white/10">
          Back to home
        </Link>
      </PageHero>
    </>
  );
}
