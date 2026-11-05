# Ranking and enquiry plan for Apollo Physicians

Prepared 5 Nov 2026. Built with the SEO/GEO/AEO, local SEO and technical SEO methods, using the findings from Steps 0 to 9. This is a plan, not a measurement: every number in section 2 is an **estimate** and is marked as one.

## 1. Bottom line

**1,000 enquiries a day is not a realistic target, and chasing it would hurt the practice.** Three reasons:

1. **Demand.** Use "enquiry" to mean a phone call, a directions request or a click on the call button. At 1,000 a day that is 30,000 a month. My model (section 2) puts the whole Sacramento metro's primary-care searches at roughly 25,000 to 60,000 a month in total. Even ranking first for everything, a single office would capture a small share of them.
2. **Capacity.** A full-time family physician typically sees on the order of 20 patients a day (confirm with the practice). Even 100 real enquiries a day would be more than one office can answer. Reviews already say calls go unanswered.
3. **Rules.** The only ways to chase volume past what a single office can serve (hundreds of city pages, keyword-stuffed pages, bought reviews) are the ones the brief forbids for a medical site, and they get listings suspended.

**A realistic target, to be checked against real data in the first two weeks:**

| Scenario | Enquiries per day (calls + directions + call-button clicks) | When |
|---|---|---|
| Today (unknown, measure it) | Read it from Google Business Profile Performance, last 90 days | Week 1 |
| Conservative | 5 to 8 | Month 6 |
| Base | 12 to 25 | Month 9 to 12 |
| Stretch | 30 to 40 | Month 12 to 18, only with strong reviews, answered phones and more than one provider |

The goal that matters is **new patients booked per month**, not raw enquiries. The plan is built to maximize that within what the office can handle.

## 2. Demand model (estimates to verify, not data)

I have no keyword-volume tool in this session. Replace the estimates with real numbers from Google Keyword Planner (free with a Google Ads account), Search Console after launch, and the Google Business Profile Performance report.

| Step | Assumption (estimate) | Basis |
|---|---|---|
| A. Monthly searches for primary-care intent in the area (all variants: "family doctor", "primary care", "near me", insurance, specific services) | 25,000 to 60,000 | Sacramento metro is about 2.4 million people; this is a judgement, not a measurement |
| B. Share the practice can reach (it competes mainly within a few miles of 95823, plus Elk Grove on access) | 15% at maturity | Map results show three businesses first; large systems (Sutter, UC Davis, Kaiser, Dignity) hold the top spots for many terms |
| C. Impressions per month | A x B = 3,750 to 9,000 | |
| D. Share of impressions that become a call, directions request or call-button click | 8% to 12% | Typical for local medical results; verify with Performance data |
| E. Enquiries per month | C x D = 300 to 1,080 | |
| **Enquiries per day** | **10 to 36** | The base and stretch rows above |

To reach 1,000 a day, step A alone would have to be about 1.2 million searches a month at the same rates. That is more than the metro's whole primary-care demand.

## 3. Constraints that shape the plan

- **Confirmed facts only.** Hours, new-patient status, credentials, services, languages and the legal name are unconfirmed (`client-confirmations.md`). Most pages that would rank for service and trust keywords need them. **The practice's answers are the biggest bottleneck, not the SEO work.**
- **Who operates the office** (item 40) must be resolved first.
- **One office, one physician page.** No city or neighborhood pages (the doorway rule). Neighborhood and ZIP terms go inside existing pages as natural copy.
- **YMYL.** Dr. Panesar approves any health content. No claims of outcomes, no comparisons with other practices.
- **HIPAA.** No tracker or form that can capture health information.
- **Phone coverage.** Rankings that bring calls nobody answers lose reviews and rankings.

## 4. Keyword map

"All possible keywords" is handled by intent group, each mapped to one page or one listing. A keyword that cannot be answered truthfully with a unique page stays unmapped.

| # | Intent group | Example searches | Where it is answered | Status and blocker |
|---|---|---|---|---|
| 1 | Core local | family doctor Sacramento; family physician Sacramento; primary care physician Sacramento; primary care doctor near me; doctor near me; family doctor 95823; South Sacramento family doctor | Home page, Google Business Profile | **Built** (deploy). Hours and new-patient status unconfirmed. |
| 2 | Elk Grove access | family doctor Elk Grove; primary care Elk Grove; doctor near Elk Grove | `/family-physician-elk-grove` | **Built**. Needs the real drive time (item 20) and parking (22). Elk Grove stays out of the Google service area. |
| 3 | Accepting new patients | doctors accepting new patients Sacramento; new patient doctor near me | Home, GBP attribute, Q&A, directories | **Blocked** by item 8. High value: directories already say "yes". |
| 4 | Insurance | doctors that accept Aetna / Anthem Blue Cross / Blue Shield / Cigna / Health Net / United Healthcare / Medicare / Hill Physicians / Sutter in Sacramento | New `/insurance-and-pricing` (one page, one table, not one page per insurer) | **Blocked** by item 23, 23a. |
| 5 | Price | cheap doctor visit Sacramento; doctor visit without insurance; self-pay doctor | `/insurance-and-pricing` | **Blocked** by item 24. |
| 6 | Same-day | same day doctor appointment Sacramento; next day doctor | `/same-day-appointments` only if the policy is confirmed, otherwise part of home | **Blocked** by item 7. |
| 7 | Services | annual physical; sports or school physical; vaccines; chronic disease care (diabetes, blood pressure); women's health; DMV or employment physicals | One short page per service the practice **confirms** and Dr. Panesar reviews; each must have unique content | **Blocked** by item 26 and clinical review. Highest volume after the core terms. |
| 8 | Language | Punjabi / Hindi / Spanish speaking doctor Sacramento | Physician page and GBP | **Blocked** by item 16. Potentially strong because competition is thin. |
| 9 | Telehealth | telehealth doctor Sacramento | Only if offered | **Blocked** by item 27. |
| 10 | Provider and brand | Dr. Paramjit Panesar; Apollo Physicians Sacramento; Apollo Physicians reviews | Physician page, GBP, directories | **Built**; needs credentials, photo and bio to rank and be trusted (items 9 to 12, 31). |
| 11 | Questions (AEO) | how do I find a family doctor in Sacramento; what to bring to a first visit; family doctor vs internist | FAQ blocks and short guides reviewed by Dr. Panesar | **Not started**; 10 to 15 questions in section 6, phase 3. |
| 12 | AI assistant queries | "family doctor in South Sacramento that takes Cigna" | Same facts on the site, in directories and in Google Business Profile | Depends on 3 to 5 being confirmed and the directories being corrected. |

**Pages to add, in order of value:** `/insurance-and-pricing`, a physician bio expansion, one page per confirmed service (start with annual physicals and chronic disease care), `/same-day-appointments` if confirmed, then a handful of reviewed question pages. That is 6 to 12 pages in a year, not hundreds.

## 5. The six levers

| Lever | Why it matters most or least | Effort |
|---|---|---|
| **Google Business Profile and reviews** | Drives most local calls and directions; the map pack is the main prize | Ongoing, small |
| **Phone answering and booking** | Converts enquiries, protects reviews | Practice operations |
| **Directories and citations** | Feed Google, Bing and AI assistants; wrong data costs answers | One-time cleanup, then quarterly check |
| **On-site pages and answers** | Ranks for services, insurance, price, language; feeds AI answers | Needs confirmed facts |
| **Authority and local links** | Raises the site's standing; small for a one-office practice | Slow, legitimate only |
| **Paid search (optional)** | The only way to buy volume fast | Budget; healthcare ad rules apply |

## 6. Phased plan

Owners: **Dev** (site work I can do), **Owner** (practice owner), **Desk** (front desk), **Anyone** (anyone with the account).

### Phase 0: first 10 days (unblock everything)

| Task | Owner | Done when |
|---|---|---|
| Deploy the patch; run the post-deploy checks in `final-report.md` | Anyone | Live and checks pass |
| Fix the Google profile website field; check the map pin; repost the 4 Jul post | Owner | Profile links to the new site |
| Export Google Business Profile Performance for the last 90 days (calls, directions, website clicks, searches) | Owner | The real baseline number is known |
| Answer: who operates the office (item 40) | Owner | Written answer |
| Answer items 6, 7, 8, 23, 24, 26 (hours, same-day, new patients, plans, $65, services) | Owner | Items marked Confirmed |
| Submit sitemap to Search Console and Bing; verify the domain | Anyone | "Success" status |
| Measure how many calls are answered; set a goal of at least 90% answered in business hours | Desk | Number recorded |
| Pull the Keyword Planner volumes for the section 4 groups | Anyone | Replaces the model in section 2 |

### Phase 1: days 11 to 30 (listings and trust)

| Task | Owner |
|---|---|
| Claim and correct WebMD, Birdeye, Tebra, Vitals, Yelp, Healthgrades, Zocdoc, Apple, Bing Places; fix Superpages and Medifind (`local-gbp-checklist.md`) | Desk or agency |
| Update NPPES for Dr. Panesar; check CAQH | Dr. Panesar |
| Rewrite the Google description, services, categories and Q&A; add confirmed attributes ("accepting new patients" only when true) | Owner |
| Add at least 10 real photos with written permission (exterior, entrance, waiting room, the team) | Owner |
| Start the neutral review routine; reply to every review; address the phone-coverage complaints | Desk |
| Take down or redirect `apollophysicians.riolabz.com`; point `drparamjitpanesar.com` at the site | Owner |
| Publish `/insurance-and-pricing` and the physician bio once confirmed (Dr. Panesar approves) | Dev |
| Choose the analytics option (`analytics-decision.md`) | Owner |
| Privacy policy page | Owner and counsel |

### Phase 2: days 31 to 90 (service pages and AI answers)

| Task | Owner |
|---|---|
| Publish one reviewed page per confirmed service, each with unique content, not templates (annual physical first) | Dev, Dr. Panesar |
| Add 10 to 15 question pages or FAQ blocks: finding a family doctor, what to bring to a first visit, family doctor vs internist, what to expect from an annual physical, how insurance copays work in general terms | Dev, Dr. Panesar |
| Check hospital and medical-group affiliations; publish only the confirmed ones | Owner |
| Build 3 to 5 legitimate local links: hospital or medical-group directory page if affiliated, Sacramento-area medical society, chamber of commerce, local community organizations, local news if there is something genuinely newsworthy | Owner |
| Check insurer and IPA directories (Hill, Sutter, each carrier) | Desk |
| First AI-visibility baseline: ask ChatGPT, Perplexity and Gemini 10 fixed queries; record what they say and cite | Anyone |
| Review Search Console: queries, pages, 404 list from old URLs; tighten redirects | Dev |

### Phase 3: days 91 to 180 (grow what works)

| Task | Owner |
|---|---|
| Review which queries and pages bring enquiries; double down on those; improve pages that rank 5 to 15 | Dev |
| Add a booking tool only if a HIPAA-appropriate vendor signs a BAA, then turn on the "Book online" button and booking events | Owner |
| Monthly GBP posts with confirmed content; seasonal topics (back-to-school physicals) reviewed by Dr. Panesar | Desk |
| Review velocity: aim for a steady monthly count the front desk can keep up, and measure reply rate | Desk |
| Second AI-visibility check; compare with baseline | Anyone |
| Technical: monthly Search Console review; Core Web Vitals field data; broken-link check | Dev |

### Phase 4: days 181 to 365 (scale carefully)

| Task | Owner |
|---|---|
| If enquiries exceed capacity: add capacity (providers, phone staff) before adding marketing | Owner |
| Consider a Spanish or Punjabi page set if the languages are confirmed and demand shows in Search Console | Dev |
| Evaluate a small paid search test for "family doctor Sacramento" to fill schedule gaps (see section 8) | Owner |
| Annual full audit: citations, schema, content freshness, redirects | Dev |

## 7. Technical roadmap (what a crawl-based audit would check)

There is no crawl export yet, because the new site is not live. After deploy, run a free crawl (Screaming Frog is free up to 500 URLs) and check:

| Check | Why | Expected today |
|---|---|---|
| Redirect chains and loops | Wasted crawling and lost link value | None in the patch; verify the old-URL redirects are one hop each |
| Duplicate titles and descriptions | Pages competing against each other | None (three unique pages) |
| Indexing blocks and canonicals | Pages Google cannot index | None; verify `robots.txt` and canonicals live |
| Broken internal links | Dead ends | None found in a local run |
| Orphan pages | Pages nothing links to | None; every page is in the nav |
| New-page hygiene | As the site grows | Every new page needs a unique title, description, canonical, sitemap entry, `lastModified` date, nav or in-text link and a test |

**What this cannot check:** the visual layer (mobile layout, images, overlays) and real-user speed. Look at the top pages on a real phone, and use Search Console's Core Web Vitals report once there is traffic.

## 8. Paid search as an accelerator (optional)

Search ads on "family doctor Sacramento", "primary care near me" and insurance terms can bring calls within days, while organic ranking takes months. Healthcare advertising has policy restrictions, so check Google's current rules first. Keep ad landing pages free of trackers that could capture health information. Start small and measure cost per booked new patient, not cost per click. Do not run ads until phones are answered, or the budget is wasted.

## 9. How to measure (no health information in any of it)

| Metric | Source | Cadence |
|---|---|---|
| Calls, directions requests, website clicks | Google Business Profile Performance | Weekly |
| Queries, clicks, impressions, average position | Search Console | Weekly |
| Answered-call rate and new patients booked | Practice phone log and schedule | Weekly |
| Review count, rating, reply rate | Google Business Profile | Monthly |
| AI answers: does the practice appear, with correct facts | 10 fixed queries across ChatGPT, Perplexity, Gemini | Every 6 weeks |
| Site health | Search Console, Lighthouse | Monthly |

**Decision gates:** at day 30, is the profile corrected and the answered-call rate at least 90%? At day 90, are impressions and enquiries rising against the baseline? At day 180, compare the real enquiries per day with section 1 and reset the target from real data.

## 10. What not to do

- No pages for every neighborhood, ZIP or insurer; no keyword stuffing.
- No bought, incentivized, gated or staff-written reviews; no fake profiles.
- No bought links or link networks.
- No claims of being "best" or "top", no outcome claims, no comparisons with other practices.
- No second phone number for tracking. The number on the site, the profile and every directory must be the same.
- No tracking tools, chat or forms until the privacy and HIPAA review is done.
- No publishing a fact before it is confirmed.

## 11. What I could not verify

- Search volumes, competitor rankings and the practice's current Google Business Profile numbers (no data tool in this session; section 2 is a model).
- The practice's capacity, schedule, phone coverage and staffing.
- Whether Dr. Panesar is the only provider, and the CHCA Health question (item 40).
- Real user speed and Search Console behavior (the site is not deployed).
