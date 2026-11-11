import { ContentPage } from '@/components/page/ContentPage';
import { SELF_PAY, SELF_PAY_DIRECT_ANSWER } from '@/data/content';
import { PAGE_META } from '@/data/pages';
import { assertLive } from '@/lib/page-guard';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PAGE_META.selfPay.title,
  description: PAGE_META.selfPay.description,
  path: PAGE_META.selfPay.path,
});

export default function DoctorWithoutInsurancePage() {
  assertLive('selfPay');
  return <ContentPage pageKey="selfPay" content={SELF_PAY} directAnswer={SELF_PAY_DIRECT_ANSWER} />;
}
