# Master prompt status: every task, what was done, what was changed, what needs someone else

6 Nov 2026. The master prompt asked for a 10 out of 10 SEO, AEO and GEO build. Rankings cannot be promised and depend on competition, reviews, links and time (typically 3 to 6 months). This page lists what the code now does, where it deliberately differs from the prompt, and what only the practice can do.

Legend: **Done** in code and tested. **Changed** deliberately, reason given. **Held** waiting for Dr. Panesar's review. **Open** needs the owner or someone with account access.

## Task 1: Technical SEO

| Item | Status |
|---|---|
| 1. robots.txt: allow all, name the AI crawlers, reference the sitemap | **Done.** Explicit Allow for GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Claude-User, anthropic-ai, Google-Extended, Applebot-Extended and CCBot. `/_next/` is no longer blocked. |
| 2. sitemap.xml with accurate lastmod; submit to Search Console and Bing | **Done** in code (live pages only, `YYYY-MM-DD`). **Open:** the submission needs the practice's accounts (`search-engine-submission.md`). |
| 3. 301 `/dr-paramjit-panesar` to `/dr-paramjit-panesar-md`; one-hop host redirects; one slash convention | **Done.** All old URLs, including the 2023 site's, map to the matching new page. Host and http redirects are handled by Vercel. |
| 4. Block or redirect the staging copy `apollophysicians.riolabz.com` | **Open.** It is on another server (expired certificate). Whoever controls it must take it down or redirect it. |
| 5. Fix the footer typo; same nav on every page | **Done.** The footer shows "Apollo Physicians Medical Group". One navigation on every page: Home, New patients, Elk Grove patients, Dr. Panesar, Insurance, Contact, plus Annual physical and Services once reviewed. The menu button replaces the full nav below 1280 px. |
| 6. Core Web Vitals: LCP under 2.0 s, INP under 200 ms, CLS under 0.05; 90+ in PageSpeed | **Done in lab** (see results below). Field data needs Search Console after launch. |
| 7. Unique og:image per page; lang; favicons; 404 with links | **Done.** Ten generated 1200 x 630 images. hreflang is not used (no Spanish pages). |
| 8. WCAG 2.2 AA | **Done.** axe-core: 0 violations on all pages at phone width and desktop, in both review states. |
| 9. Security headers | **Done.** nosniff, referrer policy, frame options and permissions policy set; HSTS comes from Vercel. |

## Task 2: Structured data

| Item | Status |
|---|---|
| One linked `@graph`; WebSite, clinic, physician, WebPage, BreadcrumbList, FAQPage | **Done**, valid in validator.schema.org and the local vocabulary check, all ten pages. |
| "Organization + MedicalOrganization" | **Changed.** `MedicalClinic` is already a subtype of both, so one node covers them. |
| medicalSpecialty "Family Practice" | **Changed.** That value does not exist in schema.org. `PrimaryCare` is used, and the text says "family medicine". |
| address, geo, phone, areaServed, isAcceptingNewPatients, priceRange, paymentAccepted | **Done.** `paymentAccepted` says "Health insurance, self-pay" (the property means payment methods); the plans are on the page. `priceRange` is "From $65". |
| openingHoursSpecification, knowsLanguage | **Open.** Not emitted until the owner confirms (hours conflict; languages "confirm first"). |
| sameAs | **Changed.** Only the two profiles we opened and checked (Doximity, WebMD), on the physician. Add Google Business Profile, Facebook, Yelp, Healthgrades after they are checked. |
| Physician: NPI, credentials, alumniOf, knowsAbout | **Done.** `["Physician", "Person"]` so the credential properties are valid. |
| Review stars | **Done as asked:** none in schema. |
| MedicalWebPage with lastReviewed and reviewedBy | **Held.** Emitted only after Dr. Panesar's review (tested both ways). |
| Service / MedicalProcedure | **Held.** `availableService` appears with the reviewed pages. |
| Speakable | **Done.** The direct-answer paragraph on every page. |

## Task 3: On-page content

| Item | Status |
|---|---|
| Homepage rebuild (600+ words) | **Done.** Hero with direct answer, Quick facts, help cards, physician with credentials, insurance, areas served, lazy map, reviews link, 8 FAQs. **Changed:** no hours table (hours conflict) and no review text or stars (the owner asked for live numbers; a link to the Google reviews is shown). Cards link only to live pages. |
| Direct answer 40 to 60 words under every H1, then Quick facts | **Done**, tested on all ten pages. |
| New pages | **Done and live:** `/new-patients`, `/insurance-accepted`, `/contact`, `/faq`. **Held for review:** `/annual-physical-sacramento`, `/immigration-medical-exam-sacramento`, `/services`. **Not built:** vaccinations, Medicare Annual Wellness and well-child pages (they need confirmed services and ages first). |
| Immigration page: what an I-693 is, who needs it, what to bring, vaccines, timing, cost, uscis.gov link | **Held.** Written without a cost or timing: USCIS sets the rules and the fee was not supplied, so the page points to uscis.gov. |
| Elk Grove page with drive times, routes, 8+ unique FAQs | **Done.** Times and routes read from Google Maps; the ZIP 95757 search failed, so no claim is made for it. |
| Spanish pages and forms | **Open.** Languages are unconfirmed. |
| E-E-A-T: reviewer and date, outside sources, About page, privacy, HIPAA notice, accessibility statement, patient rights | **Done:** named reviewer and date (after review), links to the Medical Board of California, ABMS, USCIS and Medicare.gov. **Open:** About/team page (no content supplied), privacy policy, HIPAA notice, accessibility statement and patient rights (need the practice and counsel). |
| Internal linking, breadcrumbs | **Done.** Every inner page links to new patients, insurance, contact and the physician; the crawler finds no orphan or dead link. |

## Task 4: AEO

| Item | Status |
|---|---|
| 8 to 12 FAQs on key pages, answers 40 to 60 words, answer first | **Done.** Home 8, Elk Grove 8, new patients 8, insurance 8, annual physical 8 (held), immigration 8 (held), FAQ hub 8 to 12, services 6 (held). |
| Required questions | **Done** where the answer is confirmed. "What are the office hours?" is not answered until hours are confirmed. |
| Definitions, steps, comparison table, checklists | **Done**, with the health ones held. Questions are real headings. |

## Task 5: GEO

| Item | Status |
|---|---|
| Self-contained quotable facts, repeated identically | **Done.** Every page carries the same Quick facts from one data source. |
| `llms.txt` | **Done.** Confirmed facts only, credentials included, live pages only. |
| Original data | **Not done on purpose.** No real data was supplied, and nothing was invented. |
| Review dates and a quarterly refresh | Review dates appear after Dr. Panesar's review. **Schedule:** re-check plans, hours and the drive times each quarter. |

## Task 6: Local SEO (all off-site)

| Item | Status |
|---|---|
| Google Business Profile edits, citations, reviews, local links, rank tracking | **Open.** Needs account access and the practice. The checklist (`local-gbp-checklist.md`) lists every correction found on 5 Nov, including the profile's wrong website field. |
| GBP service areas for Elk Grove and the ZIP codes | **Changed.** For a clinic with a storefront, Google's guidance is to leave service areas empty unless staff travel to patients. Elk Grove access is covered in the website copy, posts and schema `areaServed`. Confirm with a local-SEO specialist. |
| 10 new Google reviews a month | A target the front desk can try; it cannot be promised. No incentives, gating or scripts. |

## Task 7: Conversion

| Item | Status |
|---|---|
| Sticky mobile call button | **Done.** Fixed height, 44 px target, nothing hidden behind it. |
| Online appointment request form, downloadable forms, insurance checker | **Open.** A form that collects patient details needs a HIPAA-appropriate vendor with a business associate agreement, and the practice has not supplied forms. The insurance page and the phone number do the job for now. |
| GA4 events for calls, directions and form submits | **Changed.** The click events are built with no health information, but no analytics vendor is installed: Google does not offer a BAA for Analytics. See `analytics-decision.md`. |

## Task 8: Verify

| Item | Result |
|---|---|
| Unit and build checks, accessibility, internal-link crawl | **Done** (below). |
| Rich Results Test | **Open.** It needs a Google sign-in. |
| PageSpeed Insights and Lighthouse | Lighthouse **done** locally; PageSpeed Insights for the live URLs after deploy. |
| Screaming Frog crawl | **Replaced** by `npm run crawl:check`: no dead links, redirect chains, orphan pages, duplicate titles or descriptions. |
| Keyword and AI-answer check across Google, ChatGPT, Perplexity, Gemini | **Open.** Needs the site live first (`ranking-plan.md` has the method). |

## Open facts the prompt listed (see `client-confirmations.md`, "STILL OPEN")

Hours (conflicting), phone variants, other clinicians, telehealth and 24/7 support, languages, parking and walk-ins, Nivano, Medi-Cal, Brand New Day, Imperial and Western Health Advantage, and the real Google review numbers.
