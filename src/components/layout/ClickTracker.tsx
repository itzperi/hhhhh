'use client';

import { useEffect } from 'react';
import { buildEvent, classifyLink, emitEvent, visitorOptedOut } from '@/lib/analytics';

/**
 * Watches for taps on the call, directions and (when it exists) booking links, and publishes a
 * three-field event for each (see src/lib/analytics.ts). Renders nothing. It loads no third-party
 * code, reads no link text or URL into the event, and does nothing for visitors who send Do Not Track
 * or Global Privacy Control.
 */
export function ClickTracker() {
  useEffect(() => {
    if (visitorOptedOut(navigator as Navigator & { globalPrivacyControl?: boolean })) return;

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href]');
      if (!link) return;
      const name = classifyLink(link.getAttribute('href'));
      if (!name) return;
      const placement = link.closest('[data-placement]')?.getAttribute('data-placement');
      const tracked = buildEvent(name, placement, window.location.pathname);
      if (tracked) emitEvent(tracked, window);
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
