# Analytics and click tracking: owner decision needed

Prepared 5 Nov 2026 (Step 8). **Status: no analytics vendor is installed, and none will be until the owner decides.** The site loads no third-party script, sets no cookie, and a check in a real browser on 5 Nov 2026 found every request going to the site's own host.

## What is built

The site publishes a small event when a visitor taps the call link, a directions link, or (if one ever exists) a booking link. Each event has exactly three fields, all from fixed lists:

| Field | Possible values |
|---|---|
| `name` | `call_click`, `directions_click`, `booking_click` |
| `placement` | `header`, `hero`, `mobile_bar`, `footer`, `page` |
| `path` | one of the three site pages, or `other` |

What an event can never contain: the link address, link text, anything after `?` or `#` in the URL, the referrer, cookies, form values, an identifier, or free text. This was tested with a page address carrying a name and a symptom; neither appeared. The tracker also stays silent for visitors who send Do Not Track or Global Privacy Control. Code: `src/lib/analytics.ts` and `src/components/layout/ClickTracker.tsx`; tests in `src/__tests__/analytics.test.ts`.

**Today these events go nowhere.** They are published inside the page as a browser event and to any registered sink, and nothing is registered. So no clicks are counted yet. Picking a destination is the decision below.

## Why a decision is needed

What I found, with the limits of each source:

- **HHS and tracking tools.** HHS's 2022 bulletin said tracking tools on public pages could expose protected health information. A federal court in Texas vacated that part on 20 June 2024 (American Hospital Association v. Becerra), and HHS withdrew its appeal on 29 August 2024. I found nothing newer, so confirm with counsel. State privacy laws still apply on their own. (HHS's own page refused my request; this comes from law-firm summaries.)
- **Google Analytics.** Google's policy page bars sending personally identifiable information to Analytics and warns an account can be terminated. Several sources report Google signs no business associate agreement for it, but those sources mostly sell competing products, so check Google's current terms. It is the option most likely to create trouble on a medical site.
- **Vercel Web Analytics** (the site is already hosted on Vercel). Vercel's documentation says it sets no third-party cookie, identifies a visitor by a hash that is discarded after 24 hours, and ties data to no individual, customer or IP address. It records page, referrer, country, state, city, device and browser. Its page says nothing about HIPAA or a business associate agreement. Custom events are documented there; check which plan includes them.

The click events above contain no personal data. The page-view and visitor data a vendor adds on top is what needs the decision.

## Options

| | A. No analytics (recommended for now) | B. Vercel Web Analytics | C. Another cookieless tool | D. Google Analytics 4 |
|---|---|---|---|---|
| New data processor | None | Vercel (already the host) | Yes | Google |
| Cookies | None | None (per Vercel) | Varies | Yes |
| Counts calls from the site | No | Yes, with this event code | Yes | Yes |
| Risk on a medical site | None | Low, but Vercel's HIPAA position is unstated | Needs checking | Highest |
| Cost and effort | None | Small; ask Vercel about the plan | Small to moderate; not evaluated here | Free, but not advised |

**A is recommended for now** because three measures already exist without any new vendor: the Google Business Profile's own counts of calls and direction requests, Google Search Console clicks and impressions (see `search-engine-submission.md`), and the practice's phone log. Do **not** add a separate tracking phone number: the site, Google profile and every directory must show the same number (916-236-5800).

If the owner wants site-level counts, choose B, after asking Vercel in writing whether a business associate agreement is available and getting counsel's agreement.

## How to switch a vendor on (when decided)

Nothing else in the site needs to change. For Vercel, install `@vercel/analytics` and add one small client component to the layout:

```tsx
'use client';
import { Analytics, track } from '@vercel/analytics/react';
import { useEffect } from 'react';
import { registerAnalyticsSink } from '@/lib/analytics';

export function VercelAnalytics() {
  useEffect(() => registerAnalyticsSink((e) => track(e.name, { placement: e.placement, path: e.path })), []);
  return <Analytics />;
}
```

(Check Vercel's current documentation for the exact import and for its page-address redaction setting, `beforeSend`, before use.) Then:

1. Update the privacy policy first. The site has none yet (confirmations item 36), and it must exist before any vendor goes live.
2. Edit the test `loads no third-party analytics code` in `src/__tests__/analytics.test.ts` on purpose, naming the one approved vendor.
3. Never add a field to an event. Every new field needs a new allow-list and a new test.

## Booking events

`BOOKING_URL` in `src/data/site.ts` is `null` because the practice has no online booking (confirmations item 28). Setting it adds a "Book online" button to the mobile bar and starts producing `booking_click` events. Use a booking vendor that signs a business associate agreement, and treat the booking page itself as a place where health information is entered.
