# Master plan and prompt: payment segments for Sacramento and Elk Grove

11 Nov 2026. This file has two parts:

- **Part A** is the plan: what gets built, in what order, which skill does what, and which owner answers unlock each part.
- **Part B** is the prompt to paste into Claude Code, run from the repo. It is split into phases so each run stays focused and checkable.

The segments: **Medi-Cal, Original Medicare, Medicare with a medical group or Medicare Advantage plan, Vivant Health (formerly River City Medical Group), Nivano Physicians, low-income and uninsured patients, and people searching for an FQHC or community clinic.**

The areas: **Sacramento (South Sacramento, 95823, 95828, Valley Hi, Laguna, Florin, Meadowview, Parkway) and Elk Grove (95624, 95757, 95758).**

Rankings cannot be promised. In local healthcare they depend on reviews, directory listings, links and time; expect 3 to 6 months. This plan maximises the odds without making claims the practice cannot back.

---

# Part A: the plan

## A1. What already exists (do not rebuild)

| Item | State |
|---|---|
| Repo | `D:\apollo-build`, Git dir `D:\apollo-git\param.git`, remote `github.com/itzperi/hhhhh`. A copy is in `C:\Users\itzme\OneDrive\Desktop\apollo\apollo`. Work in D: (C: is nearly full) |
| Fact rule | `docs/seo/client-confirmations.md`: publish only items marked Confirmed |
| Live pages | `/`, `/new-patients`, `/family-physician-elk-grove`, `/dr-paramjit-panesar-md`, `/insurance-accepted`, `/contact`, `/faq` |
| Held pages (404 until `CLINICAL_REVIEW.reviewedOn` is set) | `/annual-physical-sacramento`, `/same-day-appointments-sacramento`, `/immigration-medical-exam-sacramento`, `/services`, `/medicare-doctor-sacramento`, `/doctor-without-insurance-sacramento` |
| Plans written | `payment-segments-plan-2026-11-11.md` (page briefs, schema, llms.txt, local plan, 90 days), `growth-keywords-aeo-geo-2026-11-11.md`, `strategy-2026-11-11-reconciliation.md` |
| Git | PR #1 merged into `main`. Commit `58641d5` (Medicare and self-pay pages) is on `same-day-appointments-page`; its PR is not created yet |
| Tests | 283 passing. They block unconfirmed words (Medi-Cal, Nivano, River City, telehealth, walk-in, Spanish and others), superlatives, and competitor talk |

## A2. Segment map: page, status and what unlocks it

| Segment | Page | Can go live when | Who unlocks it |
|---|---|---|---|
| Original Medicare | `/medicare-doctor-sacramento` (built) | Dr. Panesar's review | Dr. Panesar |
| Medicare with a medical group or Medicare Advantage | `/medicare-advantage-doctor-sacramento` | The list of Advantage plans and medical groups is confirmed, plus review | Owner |
| Medi-Cal | `/medi-cal-doctor-sacramento` | Medi-Cal is confirmed, with the plans and medical group | Owner |
| Vivant Health / River City | `/vivant-health-doctor-sacramento` | A signed contract is confirmed (they are one organisation since Sept 2024) | Owner |
| Nivano Physicians | `/nivano-physicians-doctor-sacramento`, or a section on the hub | Contract confirmed, plus Nivano-specific facts (otherwise use a hub section) | Owner |
| Low-income and uninsured | `/doctor-without-insurance-sacramento` (built) | Review. What the $65 covers makes the page stronger | Dr. Panesar, owner |
| FQHC / community clinic searches | `/community-clinic-alternative-sacramento` | Item 40 is answered: is the practice linked to a community health center? | Owner |
| Hub | `/insurance-accepted`, retitled "Insurance and payment options" | When the Medicare page goes live | Code |
| Elk Grove | `/family-physician-elk-grove`: one "plans accepted for Elk Grove patients" section linking to each live segment page | As segment pages go live | Code |

**No separate Elk Grove page for each segment.** Pages like "Medi-Cal doctor Elk Grove" with only the town swapped are doorway pages. Elk Grove searches are won by:
1. the existing Elk Grove page, with a section for each segment
2. a natural Elk Grove line on each segment page (the drive time, about 12 minutes from 95758 and 95624)
3. directory listings that show the practice to Elk Grove searchers

The office is in Sacramento, so the Elk Grove map pack is not realistic.

## A3. The owner answers that unlock everything

Send this list before Phase 3. Every answer goes into `client-confirmations.md` with the date and the person who confirmed it.

1. Office hours, including Saturday (Mon-Fri 8:30-5:30 and Sat 9-2, or Mon-Fri 8:30-5:00 with weekends closed?)
2. Medi-Cal: accepted? Which managed-care plans (Anthem Blue Cross, Health Net, Molina, others) and through which medical group?
3. Vivant Health (River City Medical Group): is there a signed contract? For Medi-Cal, Medicare, or both?
4. Nivano Physicians: what is it, is there a contract, and for which plans?
5. Medicare: does the practice accept assignment? Which Medicare Advantage plans and medical groups?
6. What does the $65 visit include? What costs extra? Which payment methods are accepted?
7. Is there a sliding scale or discount? (If not, the site never mentions one.)
8. Item 40: is the practice operated by, contracted with or connected to a community health center?
9. Telemedicine: offered? For which visits?
10. Languages spoken by the doctor and the front desk
11. Account access: Google Business Profile, Search Console, Bing, Vercel, and the domain and hosting behind the riolabz staging copy
12. Dr. Panesar's clinical review of `docs/clinical-review/review-packet.md`

## A4. What each skill is for, and what it needs

Checked on 11 Nov in this environment: **no DataForSEO, no nanobanana, no Moz, Bing or Google API keys.**

| Skill | What it does in this plan | Runs here today? |
|---|---|---|
| `/seo-geo-aeo` | Baseline SEO, AI-search (GEO) and answer-engine (AEO) audit of the live URL. Run again after launch | Yes |
| `/claude-seo:seo-geo` | AI-citation readiness per page; AI crawler access; `llms.txt` check | Yes |
| `/claude-seo:seo-sxo` | Reads the search results for each segment's main query backwards: what kind of page Google rewards (directory, clinic page, guide) and whether our page type fits | Yes (web search) |
| `/claude-seo:seo-flow` | FLOW prompts (Find, Leverage, Optimize, Win) to structure the evidence for each segment | Yes |
| `/claude-seo:seo-maps` | Competitors within a radius of 8191 Timberlake Way and central Elk Grove; checks name, address and phone across platforms; LocalBusiness schema check | **Free tier only** (OpenStreetMap). Geo-grid rank tracking needs DataForSEO: do a manual 5-point check instead |
| `/claude-seo:seo-backlinks` | Link profile, plus link gaps against nearby clinics (Sac City MD, other South Sacramento practices) | **Free tier** (Common Crawl, link verification). Better with free Moz or Bing keys |
| `technical-seo-audit` | Technical issues from a crawl export | **Needs a Screaming Frog, Sitebulb or Ahrefs export.** Without one, use `npm run crawl:check` and `/claude-seo:seo-technical` |
| `/claude-seo:seo-schema` | Validate the live graph; write a `Service` and `WebPage` node for each segment page | Yes (plus `npm run validate:schema`) |
| `/claude-seo:seo-sitemap` | Check the sitemap lists only live pages with real `lastmod` dates; plan entries for the segment pages | Yes |
| `/claude-seo:seo-images` | Image audit: there are no clinic photos, the share images have no alt text concerns, file sizes | Yes |
| `/claude-seo:seo-image-gen` | AI share images | **No (needs nanobanana).** Use `npm run generate:og`. **Never AI-generate photos of the clinic, staff or doctor.** On a medical site that misleads patients |
| `/claude-seo:seo-competitor-pages` | Builds "X vs Y" and "alternatives to X" pages | **Use only for the generic "community clinic or private doctor?" explainer.** No page that names another clinic: the claims tests block competitor comparisons, and in healthcare they invite complaints |
| `/claude-seo:seo-dataforseo` | Keyword volumes, live search results, AI-visibility tracking | **No (needs the DataForSEO extension).** If installed later, run it for real volumes per segment, then re-rank the pages |

## A5. Order of work

| Phase | What | Output | Gate |
|---|---|---|---|
| 0 | Confirm which site is live (old or rebuild); merge the open branch with a PR | Known starting point | None |
| 1 | Baseline audits: `/seo-geo-aeo`, `seo-geo`, `seo-schema`, `seo-sitemap`, `seo-images`, `crawl:check` | `docs/seo/baseline-<date>.md` | None |
| 2 | Search intent per segment: `seo-sxo`, `seo-flow`, `seo-maps` (free), `seo-backlinks` (free) | `docs/seo/segment-intent-<date>.md`: page type, competitors, link gaps | None |
| 3 | Build the segment pages (held), Elk Grove sections, hub retitle, `llms.txt` flags, schema, tests | Code on a branch, with a PR | Owner answers (A3) decide which pages are coded with facts and which stay drafts |
| 4 | Publish: set the review date; generate share images; sitemap; Search Console and Bing submission | Live pages | Dr. Panesar's review |
| 5 | Off-site: Business Profile, directories, plan and medical-group finders, USCIS, citations, reviews | Checklist completed | Account access |
| 6 | Measure at 30, 60 and 90 days: Search Console per segment, profile calls, AI spot checks, front-desk log | Monthly report | Live for 4+ weeks |

---

# Part B: the prompt (paste one phase at a time)

## B0. Shared preamble (paste at the top of every phase)

```
You are working on the Apollo Physicians website (family medicine, Sacramento).
Repo: D:\apollo-build (Next.js 14 on Vercel; remote github.com/itzperi/hhhhh).
C: is nearly full: run builds and tests in D:\apollo-build. Never use robocopy /MIR
into D:\apollo-build (it holds a .git pointer file).

READ FIRST, in this order:
1. docs/seo/client-confirmations.md  (the only source of publishable facts)
2. docs/seo/payment-segments-plan-2026-11-11.md  (page briefs, schema, llms.txt, local plan)
3. docs/seo/master-prompt-payment-segments-2026-11-11.md  (this plan)
4. docs/seo/growth-keywords-aeo-geo-2026-11-11.md
5. README.md  (page list, clinical-review gate)

PRACTICE FACTS YOU MAY USE (confirmed):
- Apollo Physicians (legal name Apollo Physicians Medical Group), family medicine
- 8191 Timberlake Way, Suite 200, Sacramento, CA 95823. ALWAYS write "Suite 200":
  Suite 400 in the same building is a different practice (Dr. Takhar's).
- 916-236-5800. Never publish 916-266-7473 (that is the fax).
- Dr. Paramjit Panesar, MD; NPI 1982892659; ABFM board certified; CA license A 114684;
  USCIS-designated civil surgeon. No pronouns for Dr. Panesar.
- Same-day and next-day appointments; new patients accepted; initial self-pay visits from $65
- Accepted: Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net,
  UnitedHealthcare, Medicare; medical groups Sutter Health and Hill Physicians
- About 0.4 mile from Methodist Hospital of Sacramento, next to Highway 99 (never "beside")
- About 12 minutes by car from Elk Grove ZIP codes 95758 and 95624 (Google Maps, 6 Nov 2026)
- River City Medical Group began doing business as Vivant Health in September 2024 (public fact)

NOT CONFIRMED: do not publish until client-confirmations.md marks them Confirmed:
office hours, Saturday, Medi-Cal, Nivano Physicians, Vivant Health contract,
Medicare assignment, Medicare Advantage plan names, what $65 includes, payment methods,
sliding scale or discounts, telemedicine, languages, parking, other clinicians,
any link to a community health center (item 40).

HARD RULES:
- Apollo is a private practice. Never call it an FQHC, community health center or free clinic.
- Every insurance or payment page carries VERIFY_PLAN_LINE from src/data/content.ts:
  "Call 916-236-5800 to verify your exact plan and network, because plans change."
- No Elk Grove office wording. No per-town, per-ZIP or per-neighbourhood doorway pages.
- No superlatives, outcome promises, competitor names or comparisons, review stars,
  aggregateRating, patient names, or enrollment pressure ("switch now", "best plan").
- Medicare: describe only what the practice accepts; no benefit promises; link Medicare.gov.
- No AI-generated photos of the clinic, staff or doctor.
- Health and payment pages are `clinical: true` in src/data/pages.ts, so they stay 404
  until CLINICAL_REVIEW.reviewedOn is set. Never set that date yourself.
- Direct answers and FAQ answers: 40 to 60 words, answer first, name "Apollo Physicians".
  Titles 50-60 characters, meta descriptions 140-160. The tests enforce these.
- Where a fact is missing, write [CONFIRM] in docs only, never in site copy, and list it
  under "Questions for the practice".
- Report outcomes honestly: if a skill cannot run (missing DataForSEO, nanobanana,
  API keys or a crawl export), say so, use the fallback named in this plan, and continue.

VERIFY BEFORE YOU FINISH ANY PHASE THAT CHANGES CODE (run in D:\apollo-build):
npx vitest run ; npx tsc --noEmit ; npx next lint ; npx next build ;
node scripts/validate-schema.mjs ; npx next start -p 3100 then node scripts/crawl-check.mjs.
Also build once with CLINICAL_REVIEW.reviewedOn temporarily set, crawl that, check
the new pages at 375 px width, then revert the date and rebuild.
Commit on a branch (never main) and open a PR. End commits with:
Co-Authored-By: Claude <noreply@anthropic.com>
```

## B1. Phase 0 and 1: starting point and baseline

```
[Paste B0 first.]

PHASE 0: STARTING POINT
1. Find out which site is live at https://www.apollophysicians.com: fetch /llms.txt and
   /insurance-accepted. If /insurance-accepted returns 404, the old site is still live
   and every live-site finding is about the old site. Say which one it is.
2. In D:\apollo-build: git fetch; report the state of branch same-day-appointments-page
   against origin/main. If commit 58641d5 is not in main, give me the compare link
   https://github.com/itzperi/hhhhh/compare/main...same-day-appointments-page
   (gh is not installed). Do not merge anything yourself.

PHASE 1: BASELINE (no code changes)
Run these and save one report, docs/seo/baseline-<YYYY-MM-DD>.md, with a short table per skill
(finding, evidence, severity, fix, which segment it affects):
- /seo-geo-aeo https://www.apollophysicians.com
- /claude-seo:seo-geo https://www.apollophysicians.com   (AI crawlers, llms.txt, citability)
- /claude-seo:seo-schema https://www.apollophysicians.com  plus  node scripts/validate-schema.mjs
- /claude-seo:seo-sitemap https://www.apollophysicians.com/sitemap.xml
- /claude-seo:seo-images https://www.apollophysicians.com
- Technical: technical-seo-audit needs a Screaming Frog, Sitebulb or Ahrefs export. If I have
  not given you one, run /claude-seo:seo-technical https://www.apollophysicians.com and
  npm run crawl:check against the local build instead, and say so.
Also check whether apollophysicians.riolabz.com is still in Google (search the practice
name) and note it.
End with the 10 most important fixes, ranked by effect on booked patients.
```

## B2. Phase 2: search intent, competitors and links for each segment

```
[Paste B0 first.]

PHASE 2: SEGMENT INTENT (no code changes)
Segments: Medi-Cal; Original Medicare; Medicare with a medical group or Medicare
Advantage; Vivant Health / River City Medical Group; Nivano Physicians; low-income and
uninsured; FQHC / community clinic searches.
Areas: Sacramento (South Sacramento, 95823, 95828) and Elk Grove (95624, 95757, 95758).

For each segment, take its 3 main queries from section 1 of
docs/seo/payment-segments-plan-2026-11-11.md, once with "Sacramento" and once with
"Elk Grove", and:
1. /claude-seo:seo-sxo <query>: record which page types rank (directory, clinic page,
   health system, government, guide), the intent, and whether our planned page type
   fits. If not, say what format would.
2. /claude-seo:seo-flow: use the Find and Leverage stages to list the evidence our page
   needs to beat what ranks (plan names, steps, a price, a verifiable credential).
3. Note which directories rank (Zocdoc, Hill Physicians finder, Vivant directory,
   Medicare Care Compare, Healthgrades). These are off-site targets.

Then, once for the practice:
4. /claude-seo:seo-maps: free tier. List primary care clinics within 3 miles of
   8191 Timberlake Way and within 3 miles of central Elk Grove (ZIP codes 95758 and
   95624). Check Apollo's name, address and phone across the platforms the skill
   can reach. Geo-grid rank tracking needs DataForSEO: if it is missing, write the manual
   5-point check (office; Valley Hi; Laguna; Elk Grove Blvd at Hwy 99; Bruceville Rd)
   for me to run on a phone.
5. /claude-seo:seo-backlinks https://www.apollophysicians.com: free sources. Compare
   against 2 or 3 nearby practices found in step 4. List link gaps that a real practice
   can earn (medical-group and plan directories, USCIS civil surgeon list, chamber,
   community organisations). No paid links, link networks or swaps.
6. /claude-seo:seo-dataforseo: only if the DataForSEO tools exist. Otherwise say it was
   skipped and that no search volumes are known.

Save docs/seo/segment-intent-<YYYY-MM-DD>.md with, for each segment: the main query,
what ranks, the page type to build, what to put above the fold, which AI question
to win, Elk Grove notes, and off-site targets.
Finally, update the page order in Part A5 if the evidence says a different order
would bring more patients.
```

## B3. Phase 3: build the segment pages (held) and the Elk Grove sections

```
[Paste B0 first.]

PHASE 3: BUILD
Work on a new branch from origin/main: payment-segments-<YYYY-MM-DD>.
Read docs/seo/segment-intent-<date>.md (Phase 2) and
docs/seo/payment-segments-plan-2026-11-11.md section 3 (page briefs).

1. For each segment, check client-confirmations.md.
   - If its core fact is Confirmed: build the page as specified in the brief, using
     the existing pattern (PAGE_META entry with clinical: true; PageContent in
     src/data/content.ts; route in src/app/<slug>/page.tsx with assertLive; footer and
     breadcrumb labels in src/data/navigation.ts; scripts/generate-og.mjs entry;
     scripts/export-review-packet.mjs entry; tests in aeo-copy and clinical-gate).
   - If not Confirmed: do NOT add the page or its words to src/ (the tests block
     Medi-Cal, Nivano and River City). Leave its brief in the docs and list what is missing.
   Pages and slugs:
   /medicare-advantage-doctor-sacramento, /medi-cal-doctor-sacramento,
   /vivant-health-doctor-sacramento, /nivano-physicians-doctor-sacramento (or a hub
   section if it fails the swap test), /community-clinic-alternative-sacramento
   (only if item 40 is answered and the practice is not a community health center).
   /medicare-doctor-sacramento and /doctor-without-insurance-sacramento already exist:
   only add confirmed facts to them (hours, assignment, $65 contents, payment methods).
2. When a newly confirmed word is blocked by src/__tests__/apollo-content.test.ts
   (UNVERIFIED list), remove that word from the list in the same commit, and say in the
   commit message which confirmation (item number and date) allowed it.
3. Hub: change /insurance-accepted's title and H1 to the hub title in the plan
   (section 2.1), add the plans table (live plans only) and links to each live segment
   page. Run node scripts/generate-og.mjs, because the title changes.
4. Elk Grove: on /family-physician-elk-grove add one section, "Insurance and payment for
   Elk Grove patients", with one or two sentences per live segment and a link to that page.
   No Elk Grove office wording; keep the drive-time facts as they are.
5. llms.txt: add one LLMS_CONFIRMED flag per segment in src/data/practice.ts and the
   sections from plan section 5.1 in src/lib/llms.ts, each shown only when its flag is
   true and its page is live. Add a test for each flag.
6. Schema: give each segment page a Service node (provider #clinic, areaServed Sacramento
   and Elk Grove) through src/lib/structured-data.ts, only when the page is live.
   Check it with /claude-seo:seo-schema and node scripts/validate-schema.mjs.
   No acceptsInsurance or invented properties, no aggregateRating.
7. Sitemap: confirm with /claude-seo:seo-sitemap that held pages stay out and live
   pages have real lastmod dates.
8. Images: run /claude-seo:seo-images on the build. Share images come from
   npm run generate:og (seo-image-gen needs nanobanana, which is not installed). No
   AI-generated people or clinic photos.
9. /claude-seo:seo-competitor-pages: use it ONLY to check the structure of the generic
   community-clinic explainer (comparison table, honest framing). Do not create any page
   that names another clinic.
10. Run /claude-seo:seo-geo and /seo-geo-aeo against the local build (http://localhost:3100)
    in the reviewed state to check citability, then revert.
11. Regenerate docs/clinical-review/review-packet.md (node scripts/export-review-packet.mjs),
    add the new pages to the "Confirm before approving" list, run all checks in B0,
    commit, push the branch and give me the PR compare link.
Report: pages built, pages left as drafts and why, tests count, and every [CONFIRM] left.
```

## B4. Phase 4: publish (after Dr. Panesar's review)

```
[Paste B0 first.]

PHASE 4: PUBLISH
Only run this when I give you Dr. Panesar's approval date and any edits.
1. Apply the edits to src/data/content.ts. Set CLINICAL_REVIEW.reviewedOn to the approval date.
2. Run every check in B0 in the published state (crawl must show every live page).
3. Run node scripts/generate-og.mjs and check every page title is drawn correctly.
4. Commit on a branch, push, give me the PR link. After I merge and Vercel deploys,
   fetch https://www.apollophysicians.com/sitemap.xml and /llms.txt and confirm the new
   pages appear.
5. Give me the exact Search Console and Bing steps (sitemap resubmit, URL inspection for
   each new page) and an IndexNow ping command if the key file exists. I will run them.
```

## B5. Phase 5: off-site (needs the practice's accounts)

```
[Paste B0 first.]

PHASE 5: OFF-SITE CHECKLIST (you cannot log in: produce the checklist and copy only)
Using docs/seo/payment-segments-plan-2026-11-11.md section 6 and
docs/seo/local-gbp-checklist.md, write docs/seo/offsite-<date>.md with:
1. Google Business Profile: website field (currently a parked domain), appointment link
   with UTM, Suite 200, categories (check the picker), services per confirmed segment,
   hours only if confirmed, 8 posts written out in full (60-120 words, one button,
   no health advice, no enrollment pressure).
2. Directory corrections: Superpages (wrong phone), WebMD and Vitals (providers, hours),
   MapQuest (duplicates), Tebra (unconfirmed services), Yelp, YellowPages, Birdeye,
   Healthgrades, Zocdoc. For each: what to change, exact text to enter.
3. Plan and medical-group finders: Hill Physicians, Sutter, Vivant Health (if contracted),
   Nivano (if contracted), each Medi-Cal and Medicare Advantage plan confirmed, Medicare
   Care Compare (via PECOS), the USCIS civil surgeon locator, NPPES (Dr. Panesar's record
   still shows Roseville).
4. Five local citation or referral targets with the contact route for each.
5. The review-request script (no incentives, ask everyone) and four reply templates
   that never confirm someone is a patient.
6. The riolabz staging copy: who must remove it and the Search Console removal steps.
```

## B6. Phase 6: measure (30, 60 and 90 days after launch)

```
[Paste B0 first.]

PHASE 6: MEASURE
1. Run /seo-geo-aeo and /claude-seo:seo-geo on the live site again; compare with the
   baseline report and list what improved and what did not.
2. If I paste Search Console exports (queries and pages, last 28 days), build a table per
   segment: impressions, clicks, average position for each page and its main queries,
   split by Sacramento and Elk Grove wording.
3. Run the AI spot check: ask ChatGPT, Perplexity, Gemini and Google AI Mode the AI questions
   from the plan (section 1 and the 12-answer pack). Record whether Apollo is named and
   whether the facts are right. Flag wrong facts and the source each AI cited.
4. If I give you the front-desk "how did you hear about us" counts and Business Profile
   calls, add them by segment. New patients by payment type is the measure that counts.
5. Recommend the next 30 days: which segment pages to strengthen, which directory to fix,
   which facts to confirm.
Save docs/seo/report-<YYYY-MM-DD>.md.
```

---

## Part C: the one-paragraph version (if you want a single prompt)

```
[Paste B0 first.]
Run Phases 0 to 3 of docs/seo/master-prompt-payment-segments-2026-11-11.md in order,
stopping after each phase to show me the report and wait for my "continue". Use only
confirmed facts from docs/seo/client-confirmations.md. For any skill that cannot run here
(DataForSEO, nanobanana image generation, technical-seo-audit without a crawl export),
say so and use the fallback in Part A4. Build segment pages only when their core fact is
confirmed, keep every health or payment page held behind CLINICAL_REVIEW, never call the
practice a community health center, and finish each code phase with all checks in B0,
a branch commit and a PR link.
```
