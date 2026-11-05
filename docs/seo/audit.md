# Apollo Physicians: SEO / AEO / GEO audit (Step 1)

Audit date: 5 Nov 2026. Scope: this repository (`param/`), the live site https://www.apollophysicians.com, legacy domains, directory snapshots. **No code has been changed.** Nothing has been redirected.

## 0. Headline findings

The live site is this repo, deployed on Vercel, and it is already in better shape than the brief assumes (shared data file, one phone, one address, one `@id` graph, canonicals, sitemap, 301s). What matters now:

| # | Severity | Finding |
|---|----------|---------|
| 1 | High | `medicalSpecialty: "FamilyPractice"` is **not a valid schema.org value** (checked against the current schema.org vocabulary). It is on both the clinic and Physician nodes. The 4 Nov audit said it was valid; it is not. The closest valid value is `PrimaryCare`. |
| 2 | High | `robots.txt` disallows `/_next/`, which is where Next.js serves its CSS and JS. Googlebot is blocked from the files it needs to render the pages. |
| 3 | High | The header and footer have a **"Locations" menu with an "Elk Grove" group**. That reads as two offices and conflicts with rule 3. |
| 4 | High | Legacy site: every old URL returns 404 today (18 of 18 tested). The old apollophysicians.com site (archived 2023) had about 45 pages: providers, services, `/content/insurance`, `/content/cash-prices`, `/content/new-patients`. Link equity from them is being lost. See redirect map (section 6). |
| 5 | High | `drparamjitpanesar.com` is **not redirecting**: it is a parked Hostinger page returning 200. The redirect rules in `next.config.mjs` for that host never run, because the domain is not attached to the Vercel project. |
| 6 | Medium | Org NPI 1124405584 and Dr. Panesar's NPI appear in schema and llms.txt. The **organisation NPI is not visible on any page**, so the schema carries a claim the page does not show. |
| 7 | Medium | Dr. Panesar's own NPPES record (last updated 2014) lists a Roseville location and a different Sacramento mailing address. The registry does not support "Dr. Panesar practices at Timberlake Way" by itself. The client should update it (affects directories). |
| 8 | Medium | Legal name "APOLLO PHYSICANS MEDICAL GROUP" is copied from NPPES. It may be a registry typo, or the true filed name. Needs the Secretary of State record. |
| 9 | Medium | Org NPPES record lists **916-266-7473 as the fax**. Do not use it as a phone. Directories show at least three other numbers. See section 3. |
| 10 | Medium | `paymentAccepted` is used for insurers. In schema.org it is for payment methods (cash, card). There is no property for accepted insurance on `MedicalClinic`. |
| 11 | Medium | `sameAs` on the clinic node holds three **physician** profile URLs (Doximity, WebMD, Sharecare). Those are the person's profiles, not the clinic's, and none is linked visibly on any page. |
| 12 | Low | FAQ and breadcrumb nodes use relative `@id` values (`/#faq`). No `WebPage` node ties each page to the graph. |
| 13 | Low | Existing copy says "The practice has no Elk Grove office" (Elk Grove FAQ, `ELK_GROVE_NOTE`, llms.txt). Honest, but the brief asks for access-led wording. See section 4. |
| 14 | Info | No images anywhere on the site, no physician photo. No third-party scripts, forms, chat or analytics, so there is no PHI exposure today. |

## 1. Inventory

### Live pages (3 indexable, all 200, all in the sitemap)

| URL | Title (chars) | Meta description (chars) | H1 | Schema nodes |
|-----|---------------|--------------------------|----|--------------|
| `/` | Family Physician in Sacramento, CA \| Apollo Physicians (54) | 147 | Family Physician in Sacramento, CA | WebSite, MedicalClinic+LocalBusiness, Physician, FAQPage, BreadcrumbList |
| `/family-physician-elk-grove` | Family Physician for Elk Grove Patients \| Apollo Physicians (59) | 160 | Family Physician for Elk Grove Patients | same set, FAQPage with 5 Q&As |
| `/dr-paramjit-panesar` | Dr. Paramjit Panesar, Family Doctor \| Apollo Physicians (55) | 159 | Dr. Paramjit Panesar, MD | WebSite, MedicalClinic, Physician, BreadcrumbList (no FAQ) |

Templates: `src/app/layout.tsx` (root), `not-found.tsx` (404, `noindex`), `PageHero`, `Section`, `HomeHero`, `HomeSections`, `Header`, `Footer`, `MobileCallBar`.

### Assets and other files

- `public/llms.txt` (live copy is byte-identical to the repo copy), `public/brand/logo.png`, `public/brand/share-card.png` (used for og:image, twitter:image and schema; not shown on any page).
- No images in page markup, so there is no alt text to audit.

### Redirects (from `next.config.mjs`, verified live where possible)

| From | To | Status | Live check |
|------|----|--------|------------|
| `/family-physician-sacramento` | `/` | 301 | OK |
| `/locations`, `/locations/:slug*` | `/` | 301 | `/locations` OK |
| `/providers/paramjit-panesar` | `/dr-paramjit-panesar` | 301 | OK |
| host `apollophysicians.com` | `https://www.apollophysicians.com` | 301 (rule) | Served as 308 by the platform, see below |
| host `drparamjitpanesar.com`, `www.drparamjitpanesar.com` | `https://www.apollophysicians.com` | 301 (rule) | **Never runs.** Domain is parked elsewhere. |

### Sitemap and robots (live)

- `sitemap.xml`: 3 URLs, `lastmod` 2026-11-04 on each (hand-set date in `src/data/pages.ts`). The home `<loc>` has no trailing slash and equals the canonical, which is consistent. `changefreq` and `priority` are ignored by Google and harmless.
- `robots.txt`: `User-agent: * / Allow: / / Disallow: /api/ / Disallow: /_next/` plus the sitemap line. There is no `/api/` route. The `/_next/` rule is the problem in finding 2. No rules for AI crawlers.

## 2. Canonical, host and protocol checks (live)

| Test | Result |
|------|--------|
| `http://apollophysicians.com` | 308 to `https://apollophysicians.com/`, then 308 to `https://www.apollophysicians.com/`. Two hops. Acceptable; cannot easily be one hop on Vercel. |
| `http://www.apollophysicians.com` | 308 to https. |
| `https://apollophysicians.com` | 308 to www. |
| Trailing slash `/family-physician-elk-grove/` | 308 to the no-slash URL. Good. |
| Canonical on each page | Present, absolute, self-referencing, matches the sitemap. Good. |
| Unknown URL | Real 404 with `noindex`. Good. |
| `/?p=10` (old WordPress query URLs) | 200 serving the home page, canonical is `/`. Harmless. |
| Security headers | HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` present. No CSP. |
| DNS | Apex resolves to a Vercel address. MX and SPF point to IONOS mail, so email is hosted separately. Do not change MX. |

## 3. Entity consistency: names, phones, addresses

**Phone.** Only `916-236-5800` / `+19162365800` appears in the repo, the live HTML and llms.txt. All `tel:` links use `tel:+19162365800`. Consistent.

**Address.** Source of truth is `OFFICE` in `src/data/site.ts`, read by every page and schema block. Every live occurrence is the same string. Consistent. (Nav and footer render `street, city, state zip` separately from the same constants, same output.)

**Business name.** Public brand "Apollo Physicians" everywhere. The only variant is the footer and schema `legalName`: "APOLLO PHYSICANS MEDICAL GROUP" (typo copied from NPPES; an unit test pins it, and the README repeats it). Directories use other forms (found via search snippets, not verified by visiting): Vitals, WebMD and Hill Physicians show "Apollo Physicians Medical Group"; Medifind shows "Apollo Physicans Medical Group". Needs the confirmed legal name (confirmations item 4).

**Phones found outside the site (not on the site; for directory cleanup in Step 7):**

| Number | Where seen | Probable role |
|--------|-----------|---------------|
| 916-236-5800 | NPPES org location, Vitals, Hill Physicians directory | Main. Matches the site. |
| 916-266-7473 | NPPES org location **fax** field; the 2023 archive of the old site also listed it | Fax. Do not publish as a phone. |
| 916-824-3278 | Named in the brief | Not found in any source we checked. Client to say what it is. |
| 916-655-9883 | Superpages snippet | Unknown, likely stale. |
| 916-281-5963 | NPI viewer snippet, authorized official | Unknown. |
| 800-470-0071, 916-781-1927 | Dr. Panesar's own NPPES record (Old Placerville Rd, Roseville) | Stale prior practice. |

Nothing will be removed until the client confirms which are fax, tracking or dead (Step 2 rule).

**Other directories seen:** a Tebra listing (`tebra.com/care/practice/apollo-physicians-707457`) says "24/7 phone support" and telemedicine. These are not confirmed by the practice and are not used on our site. Vitals, WebMD, Medifind, MapQuest, Superpages and Birdeye pages exist. All are unverified snapshots from a web search.

## 4. Content and heading review

- **Heading structure.** One H1 per page. Home: H1, then an **H2 used as a tagline** ("Same-day and next-day appointments."), then H2 sections. Footer has a screen-reader-only H2 ("Site footer") and H3s. No skipped levels in the main content. The FAQ uses `dl/dt/dd`, so questions are not headings.
- **Elk Grove wording.** Today: hero says "Apollo Physicians is in Sacramento"; section text "Apollo Physicians does not operate an Elk Grove office"; FAQ first question "Do you have an office in Elk Grove?"; home "Patients from Elk Grove see providers at our Sacramento office"; llms.txt "The practice has no Elk Grove office". The facts are honest. The brief asks for access-first wording (and to remove text that states absence). Proposed replacement: "Apollo Physicians has one office, at 8191 Timberlake Way, Suite 200, Sacramento", plus a drive time only once measured.
- **Elk Grove "Locations" nav.** The header dropdown and footer list "Sacramento" and "Elk Grove" as peers under "Locations". It should become a normal nav link ("Elk Grove patients") with no "Locations" grouping (finding 3).
- **Thin content.** Home has about 440 words, no services, hours, visit-prep, map, or insurance above the fold. Provider page has about 200 words, no bio, no photo, no credentials, because none are confirmed. Most of the Step 3 content is blocked on the confirmations file.
- **Unit tests** forbid the words "minutes", "Board-certified" and "accepting new patients" anywhere in `src/`. These guards will need a deliberate update when the corresponding facts are confirmed (drive time, certification, new-patient status).

## 5. Structured data (live JSON-LD on all three pages, parsed)

What is good: one `@graph` per page, stable absolute `@id` for WebSite, clinic and physician, `worksFor`/`employee`/`publisher` links resolve, FAQ text matches the visible text exactly (both come from the same arrays), no `AggregateRating`, no invented hours or coordinates.

What to fix:

| Issue | Detail | Visible on page? |
|-------|--------|------------------|
| Invalid `medicalSpecialty` | `FamilyPractice` is not in schema.org's MedicalSpecialty list. Use `PrimaryCare` (valid), and keep "Family Medicine" in visible text. Applies to clinic and Physician. | n/a |
| `paymentAccepted` misused | Holds insurer names. Property is for payment methods. Schema.org has no clinic property for "accepts plan X". Recommend keeping insurance as visible content and removing it from schema. | Insurance list is visible, so no claim problem, only the wrong property |
| Org NPI in schema and llms.txt | Not shown on any page. | **No** |
| Physician NPI | Shown on the provider page. | Yes |
| `legalName` | Shown in the footer. Pending the legal-name confirmation. | Yes |
| `sameAs` on clinic | Three physician profile URLs. Not linked visibly. Should move to the Physician node (and only verified ones). | **No** |
| Relative `@id` | `/#faq`, `/#breadcrumb`, etc. Make absolute. | n/a |
| No `WebPage` nodes | Add one per page with `isPartOf`, `about`, `breadcrumb`, `mainEntity` for FAQ pages. | n/a |
| Type array | `["MedicalClinic","LocalBusiness"]`: MedicalClinic already extends LocalBusiness through MedicalBusiness. Redundant, not wrong. | n/a |
| Physician `address` and `telephone` | Mirror the clinic. The visible page shows the same office and phone. NPPES does not corroborate (finding 7). | Yes |
| Not present (correctly) | `geo`, `openingHoursSpecification`, `priceRange`, `isAcceptingNewPatients`, `hasCredential`, `knowsLanguage`, `hospitalAffiliation`. All depend on confirmations. `isAcceptingNewPatients` is valid on MedicalClinic and `hospitalAffiliation` is valid on Physician, so they can be added when confirmed. | n/a |

The Rich Results Test and Schema Markup Validator have not been run (they need a browser session and the deployed URL). They are scheduled for Step 5 and will be recorded in `docs/seo/schema-validation.md`.

## 6. Legacy URLs and proposed redirect map (for review, not implemented)

### What exists

The Wayback Machine holds about 45 pages of the previous apollophysicians.com site (a Tebra-style multi-provider site, mid-2023), plus a 2016 to 2019 WordPress version using `?p=N` URLs and `/doctor/...`, `/department/...` paths. All 18 old paths we tested return a **404** on the live site now. We do not have Search Console access, so we cannot say which are still indexed. Verify in GSC (Pages report, "Not found (404)") before shipping.

No legacy subdomain was found. The domain `drparamjitpanesar.com` is parked at Hostinger (HTTP 200, "Parked Domain name on Hostinger DNS system", `Cache-Control: no-store`, no robots or sitemap). A Tebra directory page and Wayback captures of tebra/carecloud-hosted pages could not be checked for indexing without a search console.

### Proposed map

Rules: redirect only where the destination answers the same intent. Do not send provider pages of other doctors to Dr. Panesar. Do not send cosmetic or unconfirmed services to a page that does not offer them.

| Old URL | Proposed destination | Status | Condition |
|---------|----------------------|--------|-----------|
| `/about`, `/contact-us`, `/visit`, `/location/sacramento-ca`, `/index`, `/contents` | `/` | 301 | None |
| `/provider/paramjit-panesar-md` | `/dr-paramjit-panesar` | 301 | None |
| `/providers` | `/` | 301 | Until a team page exists |
| `/provider/jaspreet-tiwana-md`, `/provider/ramandeep-dhaliwal-md`, `/provider/ethelyne-j-acebedo-fnp-bc` | `/` | 301 | **Hold** until the client says whether these providers are still at the practice (confirmations item 17). Alternative: 410. |
| `/content/insurance`, `/content/cash-prices` | `/` now, `/insurance-and-pricing` once that page exists | 301 | Update destination in Step 3 |
| `/content/new-patients`, `/schedule`, `/registration`, `/service/same-day-visits`, `/service/primary-care`, `/service/chronic-disease-management`, `/service/immunizations`, `/services` | `/` | 301 | Only for services the client confirms. Others below. |
| `/pay-now` | `/` | 301 | **Hold**: client to confirm whether a patient portal exists |
| `/service/telemedicine`, `/service/pediatrics`, `/service/mental-health`, `/service/immigration-exams`, `/service/women's-health` | `/` or 410 | 301 / 410 | Client to confirm each is offered |
| `/aesthetics`, `/service/body-sculpting`, `/service/hydrafacial`, `/service/injectables`, `/service/laser-hair-removal`, `/service/laser-resurfacing`, `/service/medical-weight-loss`, `/service/microneedling`, `/service/morpheus-8` | 410 Gone (recommended) | 410 | These are cosmetic services; not confirmed. Redirecting them to a family-medicine home page would imply they exist. |
| `/testimonials`, `/blog`, `/blog-archive`, `/post` | 410 | 410 | No content to carry over. Reviews must not be republished without source and permission. |
| `/accessibility-statement`, `/your-privacy`, `/our-terms` | `/` for now | 301 | Re-point when privacy and terms pages exist (confirmations item 36) |
| `/doctor/*`, `/department/*`, `/cardiology/*`, `/?p=N` (2016 to 2019 WordPress) | no action | n/a | Almost certainly dropped from the index years ago; `/?p=N` already serves `/` with a canonical |
| `drparamjitpanesar.com` and `www.` | Repoint the DNS to the Vercel project so the existing host rule works, or set a registrar-level 301 | 301 | Confirm the practice owns the domain (confirmations item 34) |

Already live and unchanged: `/family-physician-sacramento`, `/locations`, `/locations/*`, `/providers/paramjit-panesar`.

## 7. Performance, mobile and accessibility

**Core Web Vitals: not measured.** The Google PageSpeed Insights API returned "quota exceeded" for the shared key. This must be rerun with an API key or in Search Console, or field data from CrUX if the domain has enough traffic. Structure suggests low risk: static pages, no images, no third-party JavaScript, 40 to 76 KB of HTML.

Risks found by code reading (not measured):
- `Newsreader` is loaded with `adjustFontFallback: false`, which can cause a font-swap layout shift on headings (CLS).
- Both Google fonts load from the build via `next/font` (self-hosted by Next, so no extra origin). Fine.
- The home HTML is 76 KB, mostly the React Server Components payload.

Mobile and accessibility (code review only, no axe run yet):
- Good: skip link, `lang="en"`, one H1, visible focus ring on buttons, 44 px minimum on primary buttons and the mobile menu items, mobile bar in layout flow via `pb-16` on the body (no content hidden, no layout shift), `aria-expanded` and Escape handling on menus.
- To fix: footer links and footer phone have `min-h-[24px]` only (below the 44 px target). The header utility-bar phone link is 32 px.
- No images means no alt text issues, but also no trust imagery.
- `axe-core` is a dev dependency but nothing runs it in the test script.

## 8. HIPAA and tracking

Live pages load no third-party scripts. The only third-party URLs are outbound links (Google Maps directions, and in schema the physician profile URLs). There are **no forms, chat widgets, pixels or analytics**, so no PHI can leak today. Step 8 asks for click events on call and booking buttons. That requires choosing an analytics tool, and none is installed. Decision needed (see summary).

## 9. Not verified in this audit

- Core Web Vitals (quota), Search Console, Bing Webmaster Tools, Google Business Profile, Rich Results Test, Schema Markup Validator.
- `npm test`, `npm run build` and `verify-apollo-pivot.mjs` were not run (`node_modules` is not installed in the repo).
- Directory pages (Vitals, WebMD, Tebra, Superpages and the rest) were read only as search snippets, not opened.
- Which legacy URLs are indexed.

## 10. Repository notes

- `docs/seo-audit-2026-11-02.docx` is an audit of a **different organisation's site (chcahealth.org)**. It does not belong in this repo. `docs/apollo-seo-full-audit-2026-11-04.docx` is out of date: it says apollophysicians.com does not resolve, which is no longer true, and it states `FamilyPractice` is valid, which is wrong.
- The git repository root is `C:\Users\itzme` (the home folder), the branch has **no commits**, and this project folder is untracked inside it. "One commit group per step" needs a repository for this project. Decision needed (see summary).

## 11. Step 3 notes (5 Nov 2026)

Added after the audit, found while building Step 3:
- **Unstyled buttons on the live site.** `btn-light`, `btn-outline` and `btn-secondary` had no CSS in the production build, because Tailwind cannot see class names assembled as `` `btn-${variant}` ``. The hero Call button on the Elk Grove and Dr. Panesar pages and the 404 page, and the outline "Get directions" buttons, were rendering unstyled. Fixed in `Button.tsx` with literal class names.

Built from confirmed facts only: plain primary navigation (no Locations menu), visible breadcrumbs that feed the BreadcrumbList schema, plan pills above the fold on `/` and `/family-physician-elk-grove`, a click-to-load map (nothing is requested from Google until the visitor presses the button), "Directions from Elk Grove" (a Google Maps link, so no drive time is stated by us), access-led Elk Grove copy that states one office and never an absence, and a neutral link to the state license lookup on the physician page.

Not built, blocked on `client-confirmations.md`: services list, hours, first-visit content, physician bio, photo, credentials, drive time, parking, `/insurance-and-pricing` (needs verified-date, plan restrictions and what the $65 covers) and `/same-day-appointments` (needs the policy and cut-off times).

## 12. Step 4 notes (5 Nov 2026): direct-answer copy

- Each core page opens with a complete, quotable sentence (`HOME_LEAD`, `PANESAR_LEAD`, and the Elk Grove opening from the brief's sample sentence without a drive time). FAQ answers lead with the answer, name the practice, and use only facts already in `src/data/`.
- FAQs: home 7 questions (location, booking, insurance, initial-visit price, same-day or next-day, Elk Grove, Dr. Panesar), Elk Grove 5, physician page 3 (new). The FAQPage schema is built from the same arrays, and a test checks it equals the visible text exactly.
- **Deliberately not answered, because the facts are unconfirmed:** "Is Apollo Physicians accepting new patients?" (item 8) and "What are the office hours?" (item 6). A hedge such as "call to ask" would soften an unknown, so the questions are left out until the practice answers.
- **Still published from the previous site, unconfirmed:** the plan list (item 23), the $65 starting price (item 24) and the same-day and next-day wording (item 7). Answers state them as the practice listed them ("lists same-day and next-day appointments") and add "confirm your plan". If the practice says any is wrong, change `src/data/practice.ts` and the answers update everywhere.
- The home and Elk Grove pages share the plan pills and the map control, so the build's duplicate-content check (5-word shingles) reads 11.6%, under the 15% limit. Elk Grove FAQ wording was varied from the home page's on purpose.

## 13. Step 5 notes (5 Nov 2026): structured data

Details and results are in `docs/seo/schema-validation.md`. One finding was missing from section 5: schema.org defines `Physician` as a medical organization, not a person, so `honorificPrefix`, `honorificSuffix` and `worksFor` were invalid on the physician node. It is now typed `["Physician", "Person"]`. The new `scripts/validate-schema.mjs` found it, and it would also have caught the `FamilyPractice` error.

## 14. Step 6 notes (5 Nov 2026): crawling, sitemap, AI access, legacy redirects

- `robots.txt`: the `/_next/` block (finding 2) and the unused `/api/` rule are removed. AI crawler rules are driven by one constant; the owner chose **allow all** on 5 Nov 2026 (`docs/seo/ai-crawler-policy.md`), so there are no AI-specific rules.
- `sitemap.xml`: three canonical URLs, `YYYY-MM-DD` lastmod, no changefreq or priority.
- `llms.txt`: confirmed facts only; unconfirmed facts are gated behind `LLMS_CONFIRMED`.
- Legacy redirects (finding 4) implemented from the approved map: 301s for the unconditional rows, 410 Gone for cosmetic services, testimonials and the blog, and 404 kept for the on-hold rows. Checked against a local production server. The map was approved on 5 Nov 2026 but was not implemented until this step.
- Still open for the owner: the `drparamjitpanesar.com` DNS (finding 5), and submission of the sitemap to Google and Bing (`docs/seo/search-engine-submission.md`).

## 15. Step 7 notes (5 Nov 2026): local and off-site

Full detail in `docs/seo/local-gbp-checklist.md`. New findings from reading the live listings:
- The Google Business Profile exists, is active and shows the right name, category, address and phone, but its **website field points to `drparamjitpanesar.com`**, the parked Hostinger page.
- Google's pin is about 240 m east of the Census and OpenStreetMap geocodes used in Step 5. `geo` now uses Google's pin (`src/data/site.ts`).
- A review and the earlier CHCA Health project suggest this office may be linked to another organisation. Unresolved; confirmations item 40.
- Directory problems: WebMD, Birdeye and (probably) Vitals and Yelp are unclaimed; Superpages shows a wrong phone (916-655-9883); Medifind misspells the name; Dr. Panesar's NPPES record is from 2014.
- `apollophysicians.riolabz.com` still resolves to a server with an expired TLS certificate and has appeared in search results (a copy of the previous site, found via search). It could not be inspected because the check needed certificate validation turned off, which was not done. The practice or its former web agency should take it down or redirect it.

## 16. Step 8 notes (5 Nov 2026): mobile conversion

Measured in a real browser at 375 x 812 on a local production build (lab data, not field data), after the fixes below:

| Page | Layout shift (CLS) | Horizontal scroll | Last footer line clear of the call bar | Standalone links under 44 px |
|---|---|---|---|---|
| `/` | 0 | none | yes (716 px, bar top 740 px) | none |
| `/family-physician-elk-grove` | 0 | none | yes | none |
| `/dr-paramjit-panesar` | 0 | none | yes | none |

Fixed during the check:
- The body reserved 64 px under the page but the bar is 72 px, so 8 px of footer sat behind it. Both are now 4.5 rem, locked together by a test.
- Footer links (24 px), the header phone and logo (32 and 28 px), the breadcrumb "Home" link (38 px wide), and three standalone links on the home page were under 44 px. All raised to 44 px.
- Inline links inside a sentence stay as they are (the WCAG 2.2 target-size exception), but the Elk Grove "Booking" sentence now also has a full-size Call button, because the phone number is the main action.
- `scroll-padding-bottom` keeps keyboard focus and in-page jumps clear of the bar on phones.

The mobile bar is a single Call button because there is no booking URL; it adds "Book online" the moment `BOOKING_URL` is set. Insurance pills were already above the fold on `/` and `/family-physician-elk-grove` (Step 3). Click events are built but have no destination: see `docs/seo/analytics-decision.md`.
