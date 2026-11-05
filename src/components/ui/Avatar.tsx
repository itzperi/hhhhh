import Image from 'next/image';
import { cn, initialsOf } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src: string | null;
  /** Rendered size in pixels. Square. */
  size?: number;
  className?: string;
}

/**
 * Headshot with an initials fallback. Used when a provider or leader photo is
 * missing. The photo's alt text names the person. The initials are hidden from
 * screen readers because the name appears next to the avatar.
 */
export function Avatar({ name, src, size = 96, className }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`Portrait of ${name}`}
        width={size}
        height={size}
        sizes={`${size}px`}
        className={cn('shrink-0 rounded-full bg-warm-200 object-cover ring-2 ring-white', className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-900 ring-2 ring-white',
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initialsOf(name)}
    </span>
  );
}
