# Plan status, 12 Nov 2026: what is done, what is held, what only a person can do

This answers "make the entire plan done" for `master-prompt-payment-segments-2026-11-11.md` and `keyword-plan-sacramento-elk-grove-2026-11-12.md`. Rankings cannot be promised; this file says what was actually delivered.

| Phase | Status | Output |
|---|---|---|
| 0 Starting point | **Done** | `baseline-2026-11-12.md`: the live site is this repo; PRs #1 and #2 are in `main`; every segment page is 404 until review |
| 1 Baseline audits | **Done** | `baseline-2026-11-12.md`, `audits-2026-11-12/` (GEO 7.5, schema 8.5, technical 8.5, AEO 8, Local 2). Core Web Vitals and real AI answers unmeasured |
| 2 Segment research | **Done, with limits** | `segment-intent-2026-11-12.md` (7 segments, both cities, from search results only; no volumes, no map pack or AI Overview view), `local-research-2026-11-12.md` (competitors, listing audit, link gaps, 5-point rank check). DataForSEO, Moz, Bing and Profound were not available |
| 3 Build | **Done for what the facts allow** | A segment-specific "For Elk Grove patients" block on the Medicare, Medi-Cal, Nivano and no-insurance pages; a live-gated segment-link list on the Elk Grove page; `dateModified` in page schema; real `lastmod` dates; a test for the Elk Grove blocks. 313 tests, `tsc`, lint, build, schema validator and crawl pass in the shipped state |
| 3 Build, **not built on purpose** | Held | Medicare Advantage, Vivant Health and community-clinic pages: their facts are not confirmed (plan names, contract, item 40). The tests block those words |
| 4 Publish | **Done on branch `publish-reviewed-pages-2026-11-12`, not yet merged** (the site owner reported Dr. Panesar's approval of everything on 12 Nov 2026; `reviewedOn` set to 2026-11-12, so the date shown on the pages is the date the owner relayed the approval; change it if the doctor approved on another day). Original note: | Set `CLINICAL_REVIEW.reviewedOn` after the review. This was not set and was not tested by temporarily setting it (the project rule says only the doctor's approval sets it). The reviewed state is covered by `clinical-gate.test.ts`. When publishing: retitle `/insurance-accepted` (title "Doctor Accepting Medicare" vs H1 "Insurance Accepted"), run `npm run generate:og`, resubmit the sitemap |
| 5 Off-site | **Checklist written, not done** | `offsite-2026-11-12.md`: exact Business Profile text, 8 posts, directory fixes, plan-finder list, review script, the riolabz takedown. Needs the practice's accounts |
| 6 Measure | **Plan written, cannot run yet** | `measure-plan-2026-11-12.md`: needs live pages plus four weeks, Search Console access, and the front-desk log |

## Checks run (12 Nov 2026, `D:\apollo-build`, shipped state)

`npx vitest run` 313 passed; `npx tsc --noEmit` clean; `npx next lint` clean; `npx next build` compiled; `node scripts/validate-schema.mjs` PASS; `node scripts/crawl-check.mjs` PASS (7 pages, 7 sitemap URLs).
**Not run:** a build with the review date temporarily set, and a 375 px check of the new blocks, because the review date was not touched. Do both right after the doctor approves.

## Still needs a human

1. Dr. Panesar's review of `docs/clinical-review/review-packet.md` (publishes eight pages).
2. The riolabz DNS owner: remove the staging copy that is still in Google with a wrong phone, "Suite 400" and unconfirmed claims.
3. Business Profile and directory access (hours, website field, Suite 200, stale providers, "24/7" claim on Tebra).
4. Owner answers: Medicare Advantage plan names, Vivant contract, Medi-Cal plan names, what $65 covers, payment methods, sliding scale, item 40, languages.
5. Real photos with permission; replace the stock home image (it shows a microscope and a hospital hallway, with empty alt text).
6. Check the reported 1 January 2027 Medi-Cal change on dhcs.ca.gov before writing anything about it.
7. Search Console access, to measure anything.

## Update, 12 Nov 2026 (publish branch)

The site owner reported that Dr. Panesar approved everything, with no edits. On branch `publish-reviewed-pages-2026-11-12`: `CLINICAL_REVIEW.reviewedOn` = 2026-11-12; hub retitled "Insurance & Payment Options, Sacramento | Apollo Physicians" with the H1 "Insurance and Payment Options" and a new share image; the Elk Grove page's drive-time table no longer forces sideways scrolling at 375 px (a bug that was already live). Checked on a production build: 313 tests, `tsc`, lint, schema validator PASS; crawl PASS on 15 pages and 15 sitemap URLs; all eight held pages return 200 and show "Medical review: Dr. Paramjit Panesar, MD. Last reviewed: November 12, 2026"; schema carries `lastReviewed`; the four segment pages have no sideways scroll at 375 px and keep the Call button; `llms-full.txt` lists the new pages. **Not done:** merge, deploy, Search Console and Bing steps, Business Profile and directory fixes (runbook steps 8 to 11).
