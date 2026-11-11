# Apollo Physicians: Website

Website for Apollo Physicians (legal name Apollo Physicians Medical Group), a family medicine practice at 8191 Timberlake Way, Suite 200, Sacramento, CA 95823. Built with Next.js.

**Domain:** https://www.apollophysicians.com. The site URL is pinned in `src/data/site.ts`.

**Stack:** Next.js 14.2 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3 · lucide-react · Vitest

This is a medical (YMYL) site. **Publish only confirmed facts.** The list of what is confirmed, and of what is still open, is `docs/seo/client-confirmations.md`; read it before adding any claim.

## Pages and files served

| Route | Purpose | Status |
|---|---|---|
| `/` | Family Physician in Sacramento (canonical page for that phrase) | Live |
| `/new-patients` | Becoming a patient: how to book, what to bring | Live |
| `/insurance-accepted` | Accepted plans, self-pay price, how to confirm coverage | Live |
| `/family-physician-elk-grove` | Elk Grove patients: drive times, routes, FAQs | Live |
| `/dr-paramjit-panesar-md` | Physician: credentials, verification links | Live (`/dr-paramjit-panesar` redirects here) |
| `/contact` | Address, phone, map, directions, areas served | Live |
| `/faq` | Common questions (health questions held for review) | Live |
| `/annual-physical-sacramento`, `/same-day-appointments-sacramento`, `/immigration-medical-exam-sacramento`, `/services`, `/medicare-doctor-sacramento`, `/doctor-without-insurance-sacramento` | General health information | **Held until Dr. Panesar reviews** (answer 404) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Generated from the data files | Live |

**Clinical review gate.** Pages and answers that contain health information are published only after Dr. Paramjit Panesar, MD, has reviewed them. Until then they answer 404 and are absent from the sitemap, navigation and `llms.txt`, and no page claims a medical review. To publish them, give him `docs/clinical-review/review-packet.md` (regenerate it with `npm run export:review`), then set `CLINICAL_REVIEW.reviewedOn` in `src/data/pages.ts` to the approval date. Everything appears together, with the reviewer name and date.

Old URLs from the previous site: some redirect, some return 410, the rest return 404 (see `next.config.mjs` and `docs/seo/audit.md`, section 6).

## Where the facts live

| What | File |
|---|---|
| Phone, address, brand and legal name, map pin, areas served, drive times, hours (empty until confirmed), booking URL | `src/data/site.ts` (the only place the phone and address may appear as literals; a test enforces this) |
| Credentials, insurance, price, FAQs for the home, Elk Grove and physician pages, the `LLMS_CONFIRMED` switches | `src/data/practice.ts` |
| Copy for the new pages (new patients, insurance, contact, annual physical, immigration, services, FAQ hub) | `src/data/content.ts` |
| Titles, descriptions, sitemap dates, the review gate | `src/data/pages.ts` |
| Navigation and breadcrumbs | `src/data/navigation.ts` |
| AI crawler policy (decided: allow all) | `src/data/crawlers.ts` |
| Schema.org JSON-LD | `src/lib/structured-data.ts` |
| Share images (`public/og/<page>.png`) | `scripts/generate-og.mjs` |

`docs/seo/claims-audit.md` lists every published claim, its source, and the file to edit.

## SEO documents (`docs/seo/`) and review documents

| File | What it is |
|---|---|
| `client-confirmations.md` | Facts confirmed, facts verified, and the open list for the practice. Source of truth for what may be published. |
| `claims-audit.md` | Every published claim, what was left out, and what is held for clinical review |
| `clinical-review/review-packet.md` (in `docs/`) | Everything Dr. Panesar must read and approve |
| `audit.md` | The Step 1 audit, redirect map and notes from each later step |
| `schema-validation.md` | Structured-data fixes and validation results |
| `ai-crawler-policy.md` | AI crawler options and the owner's decision |
| `analytics-decision.md` | Click events and the analytics choice (no vendor installed) |
| `local-gbp-checklist.md` | Google Business Profile, directory corrections, review process, insurer listings |
| `search-engine-submission.md` | Submitting the sitemap to Google and Bing |
| `ranking-plan.md` | Keyword map and 12-month plan, with the demand model |
| `final-report.md` | Summary of the first nine steps, and what the practice must do next |

## Setup

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev
npm test
npm run build
node scripts/verify-apollo-pivot.mjs   # checks the compiled output in .next (run after build)
npm run validate:schema                # checks the JSON-LD against schema.org (run after build)
```

On a machine with little free memory, build in one worker: `NEXT_BUILD_CPUS=1 npm run build`.

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit tests (Vitest) |
| `npm run validate:schema` | JSON-LD against the schema.org vocabulary |
| `npm run generate:og` | Regenerate the share images with headless Chrome (after a title, address or phone change) |
| `npm run export:review` | Regenerate the clinical review packet |

## Before each release

1. `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, then the two scripts above.
2. Update `lastModified` in `src/data/pages.ts` for any page whose content changed, and run `npm run generate:og` after a title change.
3. After deploy: Rich Results Test and validator.schema.org on the live URLs, and Search Console sitemap status (see `docs/seo/schema-validation.md` and `search-engine-submission.md`).

## Open items

All open questions are in `docs/seo/client-confirmations.md` ("STILL OPEN") and `docs/seo/final-report.md`. The ones that block the most content: office hours, languages, services confirmation and Dr. Panesar's clinical review, and who operates the office.
