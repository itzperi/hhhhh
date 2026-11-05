# Claims audit: every fact the site publishes, checked against client-confirmations.md

Prepared 5 Nov 2026 (Step 9). Sources: the three built pages, `sitemap.xml`, `llms.txt` and the JSON-LD. "Confirmed" means stated in the project brief or confirmed by the practice. A claim that is **not confirmed but still published** was carried over from the previous site (or the NPI registry) and was left in place on instruction. Each can be removed by editing the file in the last column.

## A. Published and confirmed

| Claim | Where it appears | Item |
|---|---|---|
| Brand name "Apollo Physicians" | everywhere | 3 |
| Address 8191 Timberlake Way, Suite 200, Sacramento, CA 95823 | everywhere, schema | 1 |
| Phone 916-236-5800 | everywhere, schema | 2 |
| Dr. Paramjit Panesar, MD practices family medicine at this office | home, physician page, FAQs, schema | 5 |
| One office; Elk Grove patients are seen there; Apollo "serves Elk Grove families" | Elk Grove page, home, FAQs, `llms.txt` | the brief's own wording |
| "South Sacramento" as the office's area | home, Elk Grove page | the brief's own wording |

## B. Published but NOT confirmed (the practice must answer, or the claim should come down)

| Claim | Where it appears | Item | Edit here to remove or change |
|---|---|---|---|
| **Same-day and next-day appointments** | home H2, hero list and About; meta descriptions and Open Graph text on all three pages; home and Elk Grove FAQs; Elk Grove hero | 7 | `APPOINTMENT_AVAILABILITY`, `HOME_FAQS`, `ELK_GROVE_FAQS`, `src/data/pages.ts`, Elk Grove hero text |
| **Initial doctor visits start at $65** | home hero, About, FAQ; Elk Grove FAQ | 24 | `INITIAL_VISIT_PRICE`, `INITIAL_VISIT_FROM`, both FAQ arrays |
| **Nine accepted plans** (Aetna, Anthem Blue Cross, Blue Shield, Cigna, Health Net, United Healthcare, Sutter, Hill Physicians, Medicare) | home pills, section and FAQ; Elk Grove pills and FAQ | 23, 23a | `INSURANCE_ACCEPTED` and the two FAQ arrays. Sutter and Hill Physicians are networks, not insurers. |
| Dr. Panesar's NPI 1982892659 | physician page, schema | 13 | `NPI.panesar` and the NPI card in the physician page |
| Profile links to Doximity and WebMD | physician page, schema `sameAs` | 32 | `PHYSICIAN_PROFILE_LIST`. Verified by us on 5 Nov 2026; the practice has not confirmed them. |
| Map pin 38.46019, -121.41317 | schema `geo` only | 39 | `GEO` in `src/data/site.ts`. Taken from the practice's own Google listing. |

**Kept out of `llms.txt`:** items 7, 13, 23 and 24 are gated by `LLMS_CONFIRMED` and appear in `llms.txt` only after sign-off.

## C. Left out on purpose (unconfirmed, so not published anywhere)

| Not published | Item |
|---|---|
| Office hours (Google shows Mon to Fri 8:30 to 5:00, WebMD agrees; not confirmed by the practice) | 6 |
| "Accepting new patients" (WebMD and Vitals say yes; not confirmed) | 8 |
| Board certification, medical school, residency, license number, years in practice, languages | 9 to 12, 15, 16 |
| Other providers at the practice | 17 |
| Hospital affiliations; "Methodist Hospital Medical Plaza" | 18, 19 |
| Drive time from Elk Grove, Hwy 99 or Bruceville Rd directions, parking | 20 to 22 |
| On-site lab, services list beyond family medicine, telehealth | 25 to 27 |
| Online booking, patient portal | 28, 29 |
| Staff and clinic photos | 31 |
| Legal business name (the NPI registry spelling "PHYSICANS" may be a typo) | 4 |
| Organisation NPI | 14 |
| Accepted insurance in the schema (no valid property), `openingHours`, `priceRange`, `isAcceptingNewPatients`, credentials, languages, `AggregateRating`, `Review` | various |
| Neighborhood names (Valley Hi, Meadowview, Land Park) and ZIPs 95828 and 95831 | not requested as facts |
| Pages `/insurance-and-pricing` and `/same-day-appointments` | 7, 23, 24 |
| Google rating and reviews (4.4 stars, 101 reviews) | not used anywhere |

## D. Checks run on 5 Nov 2026

| Check | Result |
|---|---|
| Spell-check of the visible text of all three pages and `llms.txt` (cspell, US English, with the names Paramjit, Panesar, Timberlake and the insurers added) | 0 issues |
| One phone number, one address, one brand name across pages, meta tags, schema and `llms.txt` | Pass (`entity-consistency.test.ts`) |
| No fax or legacy number anywhere | Pass |
| No "Elk Grove office, clinic or location" wording; no absence framing | Pass (`page-architecture.test.ts`) |
| No unsupported superlative or comparison ("best", "top", "leading", "#1", "only", "fastest", wait-time claims) in the copy | Pass (see test) |
| FAQ schema equals visible text | Pass (`aeo-copy.test.ts`) |
