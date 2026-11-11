# The 11 Nov 2026 strategy compared with this repo

11 Nov 2026. The strategy document ("SEO, AEO and GEO Strategy for Sacramento and Elk Grove") audited the **old live site** (five pages). This repo is the rebuild, which has **not been deployed**. Most of the strategy's site recommendations are already done here. Some of its suggested wording uses facts the practice has not confirmed. This page lists what to adopt, what is already done, and what must **not** be copied from the strategy.

Rule unchanged: copy, schema and llms.txt use only facts marked Confirmed in `client-confirmations.md`.

## 1. Already done in this repo (no action)

| Strategy item | Where it is in the repo |
|---|---|
| A3 / T9, T10: clinic and physician structured data | `src/lib/structured-data.ts`: one `@graph` with `MedicalClinic`, `["Physician","Person"]` with NPI, licence, ABFM, `alumniOf` |
| A4: split insurers from medical groups | Insurance page shows Sutter Health and Hill Physicians as medical groups |
| A6: consistent same-day wording | Every page says "Same-day and next-day appointments are offered", and the FAQs say availability depends on the schedule |
| A7: one fixed Elk Grove travel sentence | Google Maps measurement: about 12 minutes from 95758 and 95624; no claim for 95757 |
| A8: embedded map | `MapEmbed` (lazy) on home and contact |
| A9 / 10.6: internal links, no orphans | `npm run crawl:check` |
| A12 / T12: reviewer line, `MedicalWebPage` | Built; shown only after Dr. Panesar's review (`CLINICAL_REVIEW.reviewedOn`) |
| T2: robots.txt and sitemap | `src/app/robots.ts`, `src/app/sitemap.ts` (AI crawler policy A: allow all) |
| P1 pages: `/new-patients`, `/insurance-accepted`, `/faq`, contact, physician entity page | Live in the build. Contact is `/contact` (keep it; do not rename to `/contact-and-directions`) |
| P1 page: immigration (I-693) | Built and **held** for clinical review. Civil surgeon status is confirmed (owner, 6 Nov), so the strategy's Q9 gate is already passed |
| `llms.txt`, Speakable, direct answers, quick facts | Done (`master-prompt-status.md`) |
| 10.5 privacy: no pixels, no health data in forms | No analytics or forms installed (`analytics-decision.md`) |

## 2. Do not copy from the strategy (conflicts with confirmed facts or schema rules)

| Strategy says | Why not | Use instead |
|---|---|---|
| "next to Methodist Hospital of Sacramento" (home outline, 8.3 description, contact) | Measured 0.4 mile away. Item 19 confirms "near", not "next to" | "about 0.4 mile from Methodist Hospital of Sacramento, next to Highway 99" |
| Hours Mon to Fri 8:30 to 5:30, Sat 9 to 2 in the meta, the profile, Appendix B.1 `openingHoursSpecification` and the same-day page | Hours are still **conflicting** (item 6). Google Business Profile shows 8:30 to 5:00, weekends closed | No hours anywhere until the owner answers. `OFFICE_HOURS` in `site.ts` turns them on everywhere at once |
| `"medicalSpecialty": "FamilyPractice"` (B.1, B.2) | Not a schema.org value; the validator rejects it | `https://schema.org/PrimaryCare`, with "family medicine" in the text |
| "Medi-Cal" in the profile description, 8.3, and cluster 4 | Not confirmed (item 23, still open) | Leave out until confirmed |
| "Saturday" as a differentiator (cluster 1, 4.4, 8.6 posts) | Depends on the hours conflict | Hold every Saturday claim |
| Services list 8.4: well-child (newborn to 21), vaccines, labs, telemedicine, women's/men's/mental health, smoking cessation | From the 2023 old site and Tebra; not confirmed (items 25, 26, 27) | Only after the owner confirms each service |
| "Dr. Panesar … he" in templates | Not stated by the practice | Use the name, as the repo does |
| `sameAs` to Healthgrades, Zocdoc, Hill Physicians, Facebook, Google Business Profile | Not opened or checked | Add each only after it is opened and checked (Doximity and WebMD are in) |

## 3. New in the strategy, not yet in the repo

| Item | Status | What unblocks it |
|---|---|---|
| `/same-day-appointments-sacramento` | **Built 11 Nov, held.** How to book, what to expect, when to call 911 (MedlinePlus source) and 988, who can ask, insurance, location, 9 FAQs. Names no conditions, call-by time, slot count or hours. Answers 404 and stays out of the sitemap, navigation and llms.txt until `CLINICAL_REVIEW.reviewedOn` is set; then it appears with a home card, a footer link and a link from the new-patients page | Dr. Panesar: clinical review (it is in `review-packet.md`). Owner: the capacity rule (slots, call-by time) to strengthen the page |
| `/school-sports-physicals-sacramento` | Not built | Owner confirms the service and ages. Clinical review. Should go live before summer 2027 sports season |
| `/well-child-exams-sacramento`, chronic care hub, diabetes, blood pressure, vaccinations | Not built | Item 26: services and ages confirmed |
| Weight management, aesthetics | Do not build | Owner says whether they are offered (Tebra lists them). If not, Tebra must be corrected |
| Guides (first visit, annual physical, sports physical, I-693) | Not built | Clinical review; sources named |
| 5-point map check and 22-prompt AI panel | Not run | Needs the site live. Run in launch week as the baseline |

## 4. New facts in the strategy for the confirmations file

| Fact | Source | Action |
|---|---|---|
| The staging copy `apollophysicians.riolabz.com` (Lorem Ipsum text) appears in Google for the practice name and for "family physician South Sacramento" | Search, 11 Nov | Already open (task 1.4). Now urgent: it shows in results. Whoever controls riolabz must add `noindex` or a password, or redirect it. Then request removal in Search Console |
| WebMD lists five providers, including **Dr. Rajan Hundal (cardiology)** and **Cara Michelle Grant (NP)**, who are not in item 17 | WebMD listing, 11 Nov | Add the names to item 17's question to the owner |
| WebMD shows zero practice reviews and 38 plans | WebMD listing | Directory correction after item 23 is answered |
| Several MapQuest and directory entries for "Apollo Physicians" | Search | Add to `local-gbp-checklist.md` duplicates list |

## 5. Owner questions that block the most

Answer these first. They unlock the hours, the Saturday claims and most of the new pages:

1. Office hours, including Saturday (item 6)
2. Same-day rule: number of slots, the call-by time, and which visit types qualify
3. Each service offered and the ages seen (item 26)
4. Whether Medi-Cal and the other held plans are accepted (item 23)
5. Who controls `riolabz.com`, and who owns the Search Console and Business Profile accounts
6. Dr. Panesar's clinical review of the packet (`docs/clinical-review/review-packet.md`)

## 6. Off-site work (needs the practice's accounts; unchanged)

Search Console and Bing verification, sitemap submission, IndexNow, Business Profile edits (including the website field that points to drparamjitpanesar.com), directory corrections (Tebra, WebMD/Vitals, Healthgrades, Zocdoc, MapQuest), the review routine, and deploying this build. The strategy's 30-day roadmap (Section 12) is fine for these, but its Week 1 "rewrite titles for the 5 live pages" item is done here. Deploying this build replaces the old live site.
