import Link from 'next/link';
import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'light';

/**
 * Literal class names, so Tailwind's scanner sees every variant. Building the name with a template
 * string (`btn-${variant}`) made it drop btn-light, btn-outline and btn-secondary from the CSS.
 */
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  light: 'btn-light',
};

export function buttonClasses(variant: ButtonVariant = 'primary', className?: string): string {
  return cn('btn', VARIANT_CLASS[variant], className);
}

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  /** Opens the target in a new tab with rel="noopener noreferrer" and an announced hint. */
  external?: boolean;
  /** Optional accessible label that replaces the visible text. Use sparingly. */
  ariaLabel?: string;
}

/**
 * Link styled as a button. Handles internal routes (next/link), external
 * sites (new tab and rel), and tel: links (plain anchors).
 */
export function ButtonLink({ href, variant = 'primary', className, children, external = false, ariaLabel }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  if (href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
