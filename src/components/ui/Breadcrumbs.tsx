import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Crumb } from '@/data/navigation';
import { Container } from './Section';

/** Visible breadcrumb trail. Reads the same list as the BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-warm-200 bg-warm-100">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-1 text-sm text-navy-800">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="inline-flex min-h-[44px] items-center font-semibold text-navy-900">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="inline-flex min-h-[44px] min-w-[44px] items-center rounded font-medium text-teal-800 hover:underline">
                      {item.name}
                    </Link>
                    <ChevronRight className="h-4 w-4 text-navy-500" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
