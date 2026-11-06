# Claims audit: every fact the site publishes, checked against client-confirmations.md

Updated 6 Nov 2026 after the owner's brief. Sources: the built pages, `sitemap.xml`, `llms.txt` and the JSON-LD. "Confirmed" means stated by the owner on 6 Nov 2026 (or earlier in the project brief) or checked by us in a public tool. Each claim lists the file to edit if it ever has to change.

## A. Published and confirmed

| Claim | Where it appears | Source | Edit here |
|---|---|---|---|
| Brand "Apollo Physicians"; legal name "Apollo Physicians Medical Group" | Footer, schema, `llms.txt` | Owner | `BRAND` in `src/data/site.ts` |
| Address 8191 Timberlake Way, Suite 200, Sacramento, CA 95823; phone 916-236-5800 | Everywhere | Owner | `OFFICE`, `PHONES` in `site.ts` |
| Family medicine practice; Dr. Paramjit Panesar, MD, sees patients at this one office | Everywhere | Owner | `PROVIDER` in `practice.ts` |
| Board certified in family medicine (American Board of Family Medicine) | Home, physician page, FAQs, schema | Owner | `CREDENTIALS` in `practice.ts` |
| California medical license A 114684, active since 2010 | Physician page, FAQs, schema | Owner; matches the NPI registry | `CREDENTIALS` |
| Medical degree Dayanand Medical College 2004; residency UAMS 2007 to 2010 | Physician page, FAQs, schema | Owner (UAMS is written out in full, please confirm) | `CREDENTIALS` |
| USCIS-designated civil surgeon (Form I-693) | Physician page, FAQs, schema; the immigration page waits for review | Owner | `CREDENTIALS` |
| NPI 1982892659 | Physician page, Quick facts, schema, `llms.txt` | Owner; NPI registry | `NPI` in `site.ts` |
| Same-day and next-day appointments | Pages, FAQs, meta | Owner | `APPOINTMENT_AVAILABILITY` in `practice.ts` |
| New patients accepted | Home, new-patients page, FAQs, schema | Owner | `practice.ts`, `content.ts` |
| Accepts Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, UnitedHealthcare, Sutter Health, Hill Physicians, Medicare (the last two groups shown as medical groups) | Insurance page, home, FAQs | Owner | `INSURANCE_ACCEPTED`, `INSURANCE_GROUPS` |
| Initial self-pay visits start at $65 | Home, insurance page, FAQs, schema `priceRange` | Owner | `INITIAL_VISIT_FROM` |
| One office; Elk Grove patients are seen there; areas served and ZIP codes | Home, contact, Elk Grove, schema `areaServed` | Owner | `AREAS_SERVED` in `site.ts` |
| 0.4 mile (about a 9-minute walk) from Methodist Hospital of Sacramento, next to Highway 99 | Home, contact, Elk Grove, FAQs | **Checked in Google Maps, 6 Nov 2026**; described as "near", never as affiliated | `LOCATION` in `site.ts` |
| About 12 minutes by car from Elk Grove ZIP codes 95758 and 95624; routes | Elk Grove, contact, FAQs, `llms.txt` | **Checked in Google Maps, 6 Nov 2026** ("usual traffic"); 95757 not claimed | `ELK_GROVE_DRIVE` in `site.ts` |
| Map pin 38.46019, -121.41317 | Schema `geo` | Google's own listing pin | `GEO` in `site.ts` |
| Links to Doximity and WebMD profiles | Physician page, schema `sameAs` | Opened and read by us | `PHYSICIAN_PROFILE_LIST` |

## B. Left out on purpose (the open facts: not confirmed, so not published anywhere)

| Not published | Why | Where it will go |
|---|---|---|
| **Office hours** | Two conflicting sets from the owner; Google and WebMD agree on Mon to Fri 8:30 to 5:00 but the practice has not chosen | `OFFICE_HOURS` in `site.ts` (contact page, Quick facts, schema appear together) |
| Languages spoken (English and Spanish proposed) | The owner asked to confirm first | Physician page, schema `knowsLanguage` |
| Telehealth, 24/7 phone support, walk-in policy, parking | Not stated | Contact page, services |
| Other clinicians (Dr. Tiwana, Dr. Dhaliwal and others) | Not stated | A team page |
| Online booking and patient portal | None known | `BOOKING_URL` in `site.ts` |
| Nivano Physicians, Medi-Cal, Brand New Day, Imperial, Western Health Advantage | Listed as both "on the site now" and "to confirm" | `INSURANCE_ACCEPTED` |
| What the $65 includes | Not stated | Insurance page |
| Google rating and review count | The owner asked for live numbers; counts change | Not shown. A link to the Google reviews is shown instead. Never marked up in schema. |
| Years in practice, hospital affiliations, awards, the organisation NPI | Not stated | n/a |
| Optional pages: vaccinations, Medicare Annual Wellness, well-child exam | Need confirmed services and ages | After Dr. Panesar's review |

## C. Held for Dr. Paramjit Panesar's clinical review

These contain general health information. Until `CLINICAL_REVIEW.reviewedOn` is set in `src/data/pages.ts`, they answer 404, are not in the sitemap, navigation or `llms.txt`, and no page claims a medical review. Everything to review is in `docs/clinical-review/review-packet.md`.

| Held | Contains |
|---|---|
| `/annual-physical-sacramento` | What an annual physical includes, what to bring, school and sports physicals, how often |
| `/immigration-medical-exam-sacramento` | Form I-693, who needs the exam, vaccines, what to bring (defers to USCIS for rules and fees) |
| `/services` | The list of services offered, including diabetes and high blood pressure care |
| Health FAQs on `/faq` | Family physician vs primary care physician, choosing a physician, family vs internal medicine vs pediatrics, and the comparison table |

## D. Checks

| Check | Result (local production build, 6 Nov 2026) |
|---|---|
| One phone number, one address, one brand name and the correct legal name everywhere; no fax or legacy number | Pass (`entity-consistency.test.ts`) |
| No "Elk Grove office" wording; no absence framing; every drive time matches the Google Maps reading | Pass (`page-architecture.test.ts`) |
| No unsupported superlative, comparison, outcome promise, competitor mention or personal medical advice | Pass (`claims-guard.test.ts`) |
| Direct answer under each H1 is 40 to 60 words; FAQ answers are 40 to 60 words; FAQ schema equals the visible text | Pass (`aeo-copy.test.ts`, build checks) |
| Health pages, answers and the review claim appear only after the review date is set (tested in both states) | Pass (`clinical-gate.test.ts`) |
| No hours, languages, telehealth or unconfirmed plans anywhere, in copy or schema | Pass |
| Share images: one per page, 1200 x 630, matching the page title | Pass (`og-images.test.ts`) |
