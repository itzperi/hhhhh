# Apollo Physicians scorecard (SEO, GEO, AEO, Local)

11 Nov 2026. Two sites are scored:

- **Live today:** https://www.apollophysicians.com as served on 11 Nov.
- **Repo build:** this repository (`D:\apollo-build`, branch `same-day-appointments-page`) as it would serve once deployed and once Dr. Panesar sets the review date. Measured on a local production build.

**The live site is not built from this repo.** The live site has 5 pages, publishes `/llms-full.txt`, and returns 404 for `/insurance-accepted`, `/contact` and `/faq`. Its source code is not on this machine. Nothing here changes the live site until someone deploys this repo to the Vercel project behind apollophysicians.com.

How things were measured: PowerShell `Invoke-WebRequest` and a Node script that parses every JSON-LD block (11 Nov 2026); the repo's tests, schema validator and crawl check (11 Nov 2026). PageSpeed Insights returned HTTP 429 (quota), so **no field Core Web Vitals were measured.** No AI-answer test was run.

## 1. Scorecard

| Area | Live today | Repo build (after deploy and review) | Evidence |
|---|---|---|---|
| SEO | **5** | **8** | Live: sitemap dates all 2026-11-05, "Site footer" H2 on every page, homepage image has `alt=""`, physician description 148 characters. Repo: all fixed except real images (none exist); Core Web Vitals unmeasured |
| GEO | **3** | **6** | Live: no segment pages, clinic schema has no `sameAs`, no reviewed-by line on the annual physical page. Repo: segment pages, `llms.txt` and `llms-full.txt` built; `sameAs`, matching listings and the AI-prompt test are not done |
| AEO | **5** | **9** | Live: text right under each H1 is 18 to 26 words; no segment pages. Repo: every direct answer and all 119 FAQ answers are 40 to 60 words (test-enforced); schema valid; segment pages ready |
| Local | **2** | **2** | Same off-site state for both. Business Profile website field points to a parked domain (found 5 Nov); hours on Google, WebMD and Vitals differ from the confirmed hours; no account access |
| **Overall (lowest area)** | **2** | **2** | Local work needs the practice's accounts. Website changes alone cannot raise it |

No hard-rule violation was found on either site, so the cap at 5 does not apply.

## 2. Criteria

### SEO

| Criterion | Live today | Repo build | Evidence |
|---|---|---|---|
| Unique title 50-60 characters | Met | Met | Live: 50, 60, 54, 59, 59. Repo: 15 pages, 53-60 (test-enforced) |
| Description 150-160 characters | **Not met** | Met | Live: `/dr-paramjit-panesar-md` is 148. Repo: all 15 pages 150-160; test minimum raised from 140 to 150 |
| One H1 | Met | Met | Live: 1 per page. Repo: `crawl:check` passes on 15 pages |
| Self-canonical | Met | Met | Live: each page's canonical is its own URL. Repo: `crawl:check` |
| In sitemap with a real lastmod | **Not met** | Met | Live: all 5 URLs show 2026-11-05. Repo: per-page dates (2026-11-06 or 2026-11-11); held pages left out until review |
| A real image with descriptive alt on every page | **Not met** | **Not met** | Live: only `/` has an image (`/images/clinic-interior.jpg`) and its alt is empty. Repo: no photos. **Blocked:** real photos with permission (item 31) |
| At least 3 contextual internal links | **Not met** | Met | Live: every page links only to the same 5 navigation URLs. Repo: section links and "Next steps" on every inner page; 43-44 internal links on the new pages |
| No indexable duplicate or staging domain | Unmeasured | Unmeasured | `apollophysicians.riolabz.com` now redirects to its host's "suspended" page (302 to `/cgi-sys/suspendedpage.cgi`). Whether Google still lists it needs Search Console |
| http, www and trailing slash go to one URL | Met (with a 2-hop chain) | Same (set by Vercel) | `http://apollophysicians.com/` → 308 `https://apollophysicians.com/` → 308 `https://www.apollophysicians.com/`. `/new-patients/` → 308 `/new-patients` |
| HSTS | Met | Same | `Strict-Transport-Security: max-age=63072000` on `/`. **The brief's "no HSTS" is out of date** |
| Static assets cached long | Met | Same | `/_next/static/...css`: `public,max-age=31536000,immutable`. HTML is `max-age=0` with Vercel edge cache HIT, which is normal. **The brief's "max-age=0 on static files" is out of date** |
| No meaningless headings | **Not met** | Met | Live: "Site footer" H2 on all 5 pages. Repo: renamed to "Apollo Physicians contact details and pages" |
| Field Core Web Vitals pass | Unmeasured | Unmeasured | PageSpeed Insights API: HTTP 429. Needs Search Console or a CrUX API key |

### GEO

| Criterion | Live today | Repo build | Evidence |
|---|---|---|---|
| AI crawlers allowed | Met | Met | Live `robots.txt`: `*` plus 12 named AI agents allowed. Repo: same policy, test-enforced |
| llms.txt and llms-full.txt match the site and list every segment page | **Not met** | Met | Live: no segment pages exist. Repo: `llms.txt` now carries hours, telemedicine, Medi-Cal, Nivano and the "not a community health center" line; new `llms-full.txt` holds the full text of every live page (7 now, 15 after review). Tests check both |
| Quick Facts on every page | **Not met** | Met | Live: no Quick Facts heading on `/dr-paramjit-panesar-md`. Repo: one Quick Facts source on every page; now includes hours and telemedicine |
| Credentials, NPI, license, linked to a license check | Met | Met | Both: physician page links to the Medical Board of California search |
| Clinic `sameAs` to claimed profiles | **Not met** | **Not met** | Both: clinic node has no `sameAs` (the physician node has Doximity and WebMD). **Blocked:** the clinic's own profile URLs |
| Name, address, phone and hours identical on 8+ listings | **Not met** | **Not met** | Google, WebMD and Vitals show Mon-Fri 8:30-5:00 with Saturday closed; Superpages shows 916-655-9883 (local GBP checklist, 5 Nov). **Blocked:** account access |
| Reviewed-by line and date on medical pages | **Not met** | Met after review | Live: no reviewed-by line on `/annual-physical-sacramento`. Repo: shown on every health page once `CLINICAL_REVIEW.reviewedOn` is set (verified in a temporary reviewed build) |
| 12-prompt AI test: named correctly in 8 of 12 | Unmeasured | Unmeasured | Not run. Needs the new pages live first |

### AEO

| Criterion | Live today | Repo build | Evidence |
|---|---|---|---|
| 40-60 word direct answer under every H1 | **Not met** | Met | Live: the first paragraph after each H1 is 18-26 words. Repo: all direct answers 40-60 (test-enforced) |
| Question headings with 40-60 word answers | Met | Met | Live: 26 FAQ answers, 41-55 words. Repo: 119 answers, all 40-60; the test now enforces exactly 40-60 (was 38-62) |
| FAQPage, WebPage, BreadcrumbList parse and match visible text | Met | Met | Live: every JSON-LD block parses; every FAQ answer is found in the visible text. Repo: `validate-schema` PASS on 15 pages; FAQ markup built from the same arrays |
| Segment pages live for every confirmed segment | **Not met** | Met after review | Repo: Medicare, Medi-Cal, Nivano Physicians and no-insurance pages built, held for review. Medicare Advantage, Vivant Health and the community-clinic page are not built because their facts are not confirmed |
| Elk Grove page has unique local content | Met | Met | Both: drive times, routes and ZIP codes specific to Elk Grove |

### Local

| Criterion | Live today | Repo build | Evidence |
|---|---|---|---|
| Business Profile verified, correct categories, hours, services, 8 posts queued | **Not met** | Same | Website field points to parked drparamjitpanesar.com; hours differ (5 Nov check). Posts are drafted in `payment-segments-plan-2026-11-11.md` 6.1, not queued |
| Listings and plan finders match the site | **Not met** | Same | WebMD and Vitals hours and providers; Superpages phone; NPPES shows Roseville for Dr. Panesar. Anthem, Health Net, Nivano and Medicare clinician directory entries were not checked |
| Compliant review routine; replies to reviews | Unmeasured | Same | Script written (plan 6.4). Nobody with access has started it |

## 3. Work delivered (repo, uncommitted on `same-day-appointments-page`)

| Change | Files |
|---|---|
| Confirmations recorded: hours, Medi-Cal (most plans), Nivano Physicians, telemedicine, dated 11 Nov 2026 | `docs/seo/client-confirmations.md` |
| Hours turned on everywhere from one value: Quick Facts, contact page, schema `openingHoursSpecification`, `llms.txt`, FAQs | `src/data/site.ts` |
| Insurance list now includes Nivano Physicians and Medi-Cal; insurance page answers for both; insurance direct answer updated | `src/data/practice.ts`, `src/data/content.ts` |
| New page `/medi-cal-doctor-sacramento` (held): 7 sections, 8 FAQs, BenefitsCal link | `src/data/content.ts`, `src/app/medi-cal-doctor-sacramento/page.tsx` |
| New page `/nivano-physicians-doctor-sacramento` (held): what an IPA is, how to choose Dr. Panesar, 7 FAQs | `src/data/content.ts`, `src/app/nivano-physicians-doctor-sacramento/page.tsx` |
| Every insurance page (insurance, Medicare, Medi-Cal, Nivano) ends its sections with "Call 916-236-5800 to verify your exact plan, because networks change." (test-enforced) | `VERIFY_PLAN_LINE`, `VERIFY_BLOCK` in `content.ts` |
| Telemedicine row in Quick Facts; hours and telemedicine FAQs on the FAQ page | `src/lib/content-utils.ts`, `content.ts` |
| New `/llms-full.txt`, generated from the page data; `llms.txt` links to it | `src/lib/llms-full.ts`, `src/app/llms-full.txt/route.ts` |
| Footer heading "Site footer" replaced with a meaningful one | `src/components/layout/Footer.tsx` |
| Description minimum raised to 150; two held descriptions lengthened | `src/lib/seo-fit.ts`, `src/data/pages.ts` |
| Share images for the new pages; review packet updated | `public/og/mediCal.png`, `public/og/nivano.png`, `docs/clinical-review/review-packet.md` |
| Tests: new guards against Vivant, River City, sliding scale and "is a community health center"; exact hours; `llms-full.txt` coverage | `src/__tests__/*` |

Checks run on 11 Nov 2026 in `D:\apollo-build`: 307 tests pass, `tsc` clean, lint clean, build compiles, `validate-schema` PASS. Shipped state: the new pages return 404 and the crawl passes on 7 pages. Temporary reviewed state: crawl passes on 15 pages, `llms-full.txt` lists 15 pages, both new pages emit valid MedicalWebPage, FAQPage and BreadcrumbList markup. The review date was put back to null afterwards.

## 4. Needs a human

| Blocker | Who can resolve it | What changes once resolved |
|---|---|---|
| The live site is a different codebase from this repo | Whoever owns the Vercel project for apollophysicians.com | Deploying this repo raises SEO from 5 to 8 and AEO from 5 to 9 straight away (see scorecard) |
| Dr. Panesar's review of `docs/clinical-review/review-packet.md` | Dr. Panesar | Eight held pages go live, including Medicare, Medi-Cal, Nivano and no-insurance; reviewed-by lines appear |
| Real photos with written permission (exterior, suite sign, waiting room, doctor) | The practice (item 31) | Meets the image criterion; supplies the Business Profile photos |
| Clinic profile URLs for `sameAs` (Business Profile, Yelp, Facebook, Healthgrades, Zocdoc) | The practice | Clinic schema gets `sameAs`; each URL is checked before it is added |
| Business Profile access: website field, hours (now 8:30-5:30 plus Saturday), services, posts | The practice | Local score rises; Google stops showing the old hours |
| Directory corrections: WebMD, Vitals, Superpages, MapQuest, Tebra, Yelp, YellowPages, Birdeye, NPPES | The practice or someone with their logins | Name, address, phone and hours match on 8+ listings |
| Plan and medical-group finders: Anthem, Health Net, Nivano, Medicare clinician directory, USCIS civil surgeon list | The practice's billing or credentialing staff | Plan-finder criterion; AI answers that rely on these directories |
| Medicare Advantage plan names; Vivant Health contract; which Medi-Cal plans; what $65 covers; payment methods; sliding scale; item 40 (community health center link) | The owner | Medicare Advantage, Vivant Health and community-clinic pages can be built |
| Field Core Web Vitals | Anyone with Search Console access, or a CrUX API key | The last unmeasured SEO criterion can be scored |
| Staging copy in Google's index | Search Console owner | Request removal; the host has already suspended the site |
| 12-prompt AI test | Anyone, once the new pages are live for 4+ weeks | The last unmeasured GEO criterion |

## 5. Next three actions (by impact, then effort)

1. **Deploy this repo to apollophysicians.com.** Merge the branch through a PR, then connect or point the Vercel project at `itzperi/hhhhh`. High impact, low effort, needs whoever owns Vercel.
2. **Get Dr. Panesar's review and set `CLINICAL_REVIEW.reviewedOn`.** That publishes the Medicare, Medi-Cal, Nivano, no-insurance, same-day, annual physical, immigration and services pages together. Then retitle `/insurance-accepted` and run `npm run generate:og`. High impact, low effort for the doctor.
3. **Fix the Business Profile and the top directories** (website field, hours, Suite 200, WebMD and Vitals hours and providers, the Superpages phone). This is the only route out of a Local score of 2. High impact, medium effort, needs account access.
