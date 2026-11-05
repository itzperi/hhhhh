# Final report: Apollo Physicians SEO, AEO and GEO work

5 Nov 2026. Steps 0 to 9 are complete in code and documents. **Nothing has been deployed or pushed.** The git repository in `param/` has no remote, and I do not know which repository the Vercel project builds from.

## 1. What was done

| Commit | Step | Result |
|---|---|---|
| `406acf6` | 0 and 1 | Confirmations checklist and full audit (baseline commit) |
| `fbef98b` | 2 | One source of truth for phone, address and name; unconfirmed legal name removed; entity tests |
| `faab023` | 3 | Plain navigation (no "Locations" menu), breadcrumbs, plan pills above the fold, click-to-load maps, access-led Elk Grove copy, button CSS bug fixed |
| `ba3b146` | 4 | Direct-answer lead sentences and FAQs (home 7, Elk Grove 5, physician 3); schema equals visible text |
| `ee0042e` | 5 | Valid linked structured data; invalid specialty and `Physician` typing fixed; validator script |
| `72530b7` | 6 | robots.txt no longer blocks `/_next/`; clean sitemap; confirmed-only `llms.txt`; approved legacy redirects and 410s |
| `b46a7ee` | 6 | Owner decision recorded: allow all AI crawlers |
| `25c3372` | 7 | Local SEO checklist; schema map pin corrected |
| `5d83115` | 8 | Mobile call bar fixed; privacy-safe click events (no vendor attached) |
| `fd79cf3` | 9 | Accessibility landmark fix, font-shift fix, claims audit and guard test, README, this report |

## 2. Results

| Area | Result (local production build, 5 Nov 2026) |
|---|---|
| Tests | 139 unit tests pass; typecheck and lint clean; 74 build checks pass; schema validator passes |
| Schema | validator.schema.org: 0 errors, 0 warnings (physician page). Rich Results Test not run (needs a Google sign-in). |
| Accessibility | axe-core (WCAG 2.2 AA and best practices): 0 violations on all three pages and the 404 page, at 375 px and desktop, with the mobile menu and the map open. Lighthouse accessibility 100. Contrast checked by calculation on the gradient heroes: lowest ratio 5.4:1. Focus order, headings, landmarks, link text and new-tab warnings checked: clean. |
| Lighthouse (mobile, simulated slow 4G) | Performance 96 to 97, Best practices 100, SEO 100. LCP 2.3 to 2.4 s, TBT 100 to 140 ms, CLS 0 to 0.017. |
| Mobile | 375 px: no horizontal scroll, nothing hidden behind the call bar, every standalone link at least 44 px |
| Spelling | 0 issues across the three pages and `llms.txt` |
| Images | None on the pages. The two brand files are 6 KB and 46 KB. |
| Privacy | No third-party request on any page; no cookies; no forms; click events have three allow-listed fields |

Lab numbers are not field data. Real Core Web Vitals need Search Console after a few weeks of traffic.

Two bugs found that were not in the original audit and are now fixed: three button styles (`btn-light`, `btn-outline`, `btn-secondary`) were missing from the live CSS, and `Physician` schema used properties that only apply to a person.

## 3. Claims left out because they are unconfirmed

Full list in `claims-audit.md`, section C. In short: office hours, new-patient status, credentials, training, license number, languages, years in practice, hospital affiliations, other providers, drive time and directions, parking, services beyond family medicine, telehealth, online booking, patient portal, photos, the legal business name, the organisation NPI, any accepted-insurance schema, ratings and reviews, and the pages `/insurance-and-pricing` and `/same-day-appointments`.

**Still published although unconfirmed** (carried over from the previous site): the nine accepted plans, the $65 starting price, and same-day and next-day appointments. These appear in page copy, FAQs and meta descriptions. They are kept out of `llms.txt` and the schema. If the practice cannot confirm them, remove them (the files are in `claims-audit.md`, section B).

## 4. What the practice must do

In order of impact:

**Owner and practice manager**
1. **Say who operates the office** (confirmations item 40). A recent Google review says the practice "transferred over to community health clinic", and the earlier CHCA Health project listed this same address and phone as its clinic. This can split or suspend listings.
2. **Fix the Google Business Profile website field.** It points to `drparamjitpanesar.com`, a parked page. Change it to `https://www.apollophysicians.com`. Check the map pin and repost the 4 Jul 2026 post (it has typos).
3. **Confirm or correct the three carried-over claims:** accepted plans (with date and restrictions; Sutter and Hill Physicians are networks), what the $65 covers, and the same-day and next-day policy.
4. **Supply the missing facts** so more content can go live: hours, new-patient status, credentials and training, languages, hospital affiliations, services, whether there is online booking or a portal, and the legal business name from the Secretary of State record.
5. **Approve health content.** Dr. Panesar must review any health information before it is published (none is published today).
6. **Write a privacy policy** before any form, chat or analytics vendor is added.

**Decisions waiting for the owner**
7. **Analytics:** choose A (none for now, recommended) or B (Vercel Web Analytics, after asking Vercel about a business associate agreement). See `analytics-decision.md`.

**Accounts and DNS (someone with access)**
8. Deploy, then submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools (`search-engine-submission.md`). The domain's DNS is at IONOS; add only a TXT record and leave the mail records alone.
9. Run the Rich Results Test on the three live URLs from a signed-in browser.
10. Point `drparamjitpanesar.com` at the Vercel project (if the practice owns it) so its redirect works.
11. Take down or redirect `apollophysicians.riolabz.com`, a copy of the old site that still resolves with an expired certificate. I could not inspect it.
12. Send the Search Console list of old 404 URLs about a week after deploy so the redirects can be tightened.

**Front desk and listings** (`local-gbp-checklist.md`)
13. Claim and correct WebMD, Birdeye, Tebra, Vitals and Yelp; correct the Superpages phone (916-655-9883); ask Medifind to fix its spelling; check Healthgrades, Zocdoc, Apple Maps and Bing Places.
14. Ask Dr. Panesar to update his NPPES record (it still shows Roseville and was last updated in 2014).
15. Check the insurer and IPA directories (Hill Physicians, Sutter and each carrier).
16. Use the neutral review process in section 3 of the checklist: ask everyone, no incentives, no scripts, never confirm someone is a patient in a reply. Review phone coverage, since several reviews mention unanswered calls.

## 5. What I could not verify

- Rich Results Test (sign-in required), Search Console, Bing Webmaster Tools, field Core Web Vitals, and which old URLs Google still indexes.
- Vitals, Superpages, Hill Physicians, MapQuest, Yelp, Healthgrades, Zocdoc, Apple Maps and Bing Places were checked only through search summaries, or not at all (blocked or sign-in required).
- HHS's own tracking-technology page refused automated access; the legal summary in `analytics-decision.md` comes from law-firm write-ups and needs counsel's confirmation.
- The `riolabz.com` copy of the old site (the only way to read it was to switch off certificate checks, which was not done).

## 6. Deploying

The new code changes the live site's titles, copy, schema, navigation, robots, sitemap, redirects and call bar. After deploying, recheck these:

```bash
curl -I https://www.apollophysicians.com/about        # 301 to /
curl -I https://www.apollophysicians.com/blog         # 410
curl https://www.apollophysicians.com/robots.txt      # no /_next/ line
curl https://www.apollophysicians.com/sitemap.xml     # 3 URLs, YYYY-MM-DD lastmod
curl https://www.apollophysicians.com/llms.txt        # no insurance, price or NPI
```
