import { CalendarCheck, Phone } from 'lucide-react';
import { BOOKING_URL, PHONES } from '@/data/site';
import { cn, telHref } from '@/lib/utils';

/**
 * Sticky bottom bar on phones. Two actions when an online booking URL exists (Call and Book online),
 * one (Call) otherwise.
 *
 * Layout rules, tested in src/__tests__/mobile-bar.test.ts:
 * - Fixed height of 4.5rem. The page body reserves exactly that much padding below the footer, so no
 *   content sits behind the bar, and the bar never changes size, so it adds no layout shift.
 * - Buttons are 44px tall (the .btn class), the minimum tap target.
 */
export const MOBILE_BAR_HEIGHT_REM = 4.5;

export function MobileCallBar() {
  return (
    <nav
      aria-label="Quick contact"
      data-placement="mobile_bar"
      className="fixed inset-x-0 bottom-0 z-40 flex h-[4.5rem] items-center border-t border-warm-200 bg-white px-3 md:hidden"
    >
      <div className={cn('grid w-full gap-3', BOOKING_URL ? 'grid-cols-2' : 'grid-cols-1')}>
        <a href={telHref(PHONES.main.tel)} className="btn btn-primary flex items-center justify-center gap-2">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call {PHONES.main.display}
        </a>
        {BOOKING_URL ? (
          <a href={BOOKING_URL} className="btn btn-outline flex items-center justify-center gap-2">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Book online
          </a>
        ) : null}
      </div>
    </nav>
  );
}
