# Apollo Physicians: Website

Website for Apollo Physicians, a family medicine practice at 8191 Timberlake Way, Suite 200, Sacramento, CA 95823. Built with Next.js.

**Domain:** https://www.apollophysicians.com. The site URL is pinned in `src/data/site.ts`.

**Stack:** Next.js 14.2 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3 · lucide-react · Vitest

This is a medical (YMYL) site. **Publish only confirmed facts.** The list of what is confirmed is `docs/seo/client-confirmations.md`; read it before adding any claim.

## Pages and files served

| Route | Purpose |
|---|---|
| `/` | Family Physician in Sacramento (canonical page for that phrase) |
| `/family-physician-elk-grove` | Elk Grove patients: how to get to the one Sacramento office, booking, FAQs |
| `/dr-paramjit-panesar` | Provider page for Dr. Paramjit Panesar, MD |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Generated from the data files |

Old URLs from the previous site: some redirect, some return 410, the rest return 404 (see `next.config.mjs` and `docs/seo/audit.md`, section 6).

## Where the facts live

| What | File |
|---|---|
| Phone, address, brand, map pin, profile links, booking URL | `src/data/site.ts` (the only place they may appear as literals; a test enforces this) |
| Copy, FAQs, plans, price, the `LLMS_CONFIRMED` switches | `src/data/practice.ts` |
| Titles, descriptions, sitemap dates | `src/data/pages.ts` |
| Navigation and breadcrumbs | `src/data/navigation.ts` |
| AI crawler policy (decided: allow all) | `src/data/crawlers.ts` |
| Schema.org JSON-LD | `src/lib/structured-data.ts` |

Not yet confirmed by the practice but still published (from the previous site): the nine accepted plans, the $65 starting price, and "same-day and next-day appointments". `docs/seo/claims-audit.md` lists every published claim, its status, and the file to edit.

## SEO documents (`docs/seo/`)

| File | What it is |
|---|---|
| `client-confirmations.md` | Checklist of facts for the practice to confirm. Source of truth for what may be published. |
| `claims-audit.md` | Every published claim, confirmed or not; what was left out |
| `audit.md` | The Step 1 audit, redirect map and notes from each later step |
| `schema-validation.md` | Structured-data fixes and validation results |
| `ai-crawler-policy.md` | AI crawler options and the owner's decision |
| `analytics-decision.md` | Click events and the analytics choice (no vendor installed) |
| `local-gbp-checklist.md` | Google Business Profile, directory corrections, review process, insurer listings |
| `search-engine-submission.md` | Submitting the sitemap to Google and Bing |
| `final-report.md` | Summary of the work, and what the practice must do next |

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

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit tests (Vitest) |
| `npm run validate:schema` | JSON-LD against the schema.org vocabulary |

## Before each release

1. `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, then the two scripts above.
2. Update `lastModified` in `src/data/pages.ts` for any page whose content changed.
3. After deploy: Rich Results Test and validator.schema.org on the live URLs, and Search Console sitemap status (see `docs/seo/schema-validation.md` and `search-engine-submission.md`).

## Open items

All open questions are in `docs/seo/client-confirmations.md` and `docs/seo/final-report.md`. The ones that block the most content: hours, new-patient status, credentials, the legal business name, and who operates the office.
