import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centres content at the design-system max width, with a 16px side gutter on phones. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

interface SectionProps {
  /** Id for the heading. Used by aria-labelledby. */
  headingId: string;
  /** Optional id for the section element, used as an in-page anchor such as /about#our-team. */
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Tints the section background for visual rhythm. */
  tone?: 'default' | 'muted' | 'navy';
}

const TONE: Record<NonNullable<SectionProps['tone']>, string> = {
  default: 'bg-warm-50',
  muted: 'bg-warm-100',
  navy: 'bg-navy-800 text-white',
};

/** A labelled page section with an optional eyebrow and description. */
export function Section({ headingId, id, eyebrow, title, description, children, className, tone = 'default' }: SectionProps) {
  const isDark = tone === 'navy';
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-32 py-12 md:py-16', TONE[tone], className)}>
      <Container>
        <header className="mb-8 max-w-3xl">
          {eyebrow ? <p className={cn('eyebrow', isDark && 'text-teal-200')}>{eyebrow}</p> : null}
          <h2 id={headingId} className={cn('mt-2 text-3xl font-bold tracking-tight md:text-4xl', isDark ? 'text-white' : 'text-navy-900')}>
            {title}
          </h2>
          {description ? (
            <p className={cn('mt-3 text-lg leading-relaxed', isDark ? 'text-navy-100' : 'text-navy-700')}>{description}</p>
          ) : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
