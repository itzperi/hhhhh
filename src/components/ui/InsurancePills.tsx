import Link from 'next/link';
import { INSURANCE_ACCEPTED } from '@/data/practice';
import { cn } from '@/lib/utils';

interface InsurancePillsProps {
  /** In-page or site link to the full insurance section. */
  href: string;
  /** "dark" for use on the navy hero, "light" on a pale background. */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Plan badges for above the fold. The list is the same INSURANCE_ACCEPTED array as the full section,
 * so the two cannot disagree. Static markup with fixed text size: no layout shift.
 */
export function InsurancePills({ href, tone = 'dark', className }: InsurancePillsProps) {
  const dark = tone === 'dark';
  return (
    <div className={className}>
      <p className={cn('text-sm font-semibold', dark ? 'text-teal-200' : 'text-teal-800')}>Plans listed by the practice</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {INSURANCE_ACCEPTED.map((plan) => (
          <li
            key={plan}
            className={cn(
              'rounded-full px-3 py-1 text-sm font-semibold',
              dark ? 'bg-white/10 text-white ring-1 ring-white/30' : 'bg-teal-50 text-teal-900 ring-1 ring-teal-200',
            )}
          >
            {plan}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={cn(
          'mt-1 inline-flex min-h-[44px] items-center text-sm font-semibold underline underline-offset-2',
          dark ? 'text-white hover:text-teal-100' : 'text-teal-800 hover:text-teal-900',
        )}
      >
        See insurance details
      </Link>
    </div>
  );
}
