import { Phone } from 'lucide-react';
import { PHONES } from '@/data/site';
import { telHref } from '@/lib/utils';

/** Fixed call button on small screens. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-warm-200 bg-white p-3 md:hidden">
      <a href={telHref(PHONES.main.tel)} className="btn btn-primary flex w-full items-center justify-center gap-2">
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call {PHONES.main.display}
      </a>
    </div>
  );
}
