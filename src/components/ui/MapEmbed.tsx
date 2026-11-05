'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { mapsEmbedUrl } from '@/lib/utils';

/**
 * Click-to-load map. Nothing from Google is requested until the visitor presses the button, so the
 * page sends no visitor data to a third party on load. The box has a fixed aspect ratio, so loading
 * the map causes no layout shift.
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-warm-200 bg-warm-100 md:aspect-[16/9]">
      {loaded ? (
        <iframe
          title={title}
          src={mapsEmbedUrl(query)}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
          <MapPin className="h-8 w-8 text-teal-700" aria-hidden="true" />
          <button type="button" onClick={() => setLoaded(true)} className="btn btn-primary">
            Show map
          </button>
          <p className="max-w-sm text-sm text-navy-700">Showing the map loads it from Google Maps.</p>
        </div>
      )}
    </div>
  );
}
