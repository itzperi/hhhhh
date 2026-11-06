# Skills audit: seo-geo, seo-page, seo-sitemap, seo-maps, seo-keyword-research, seo-flow, seo-plan

6 Nov 2026. Third pass over the master prompt. This is an audit of commit `cd09d4d` against those skills, not a rebuild. Nothing in the site changed.

## Headline

The build is complete and verified locally. **The live site does not have it yet.** Production still serves an earlier deploy:

| URL | Live today | Local build |
|---|---|---|
| `/insurance-accepted` | 404 | 200 |
| `/contact` | 404 | 200 |
| `/faq` | 404 | 200 |
| `/robots.txt` | lists 10 AI crawlers | lists 12 (adds `anthropic-ai`, `Applebot-Extended`) |
| `/`, `/new-patients`, `/family-physician-elk-grove`, `/dr-paramjit-panesar-md`, `/llms.txt`, `/sitemap.xml` | 200 | 200 |

Every ranking, AI-citation and local gain depends on deploying `cd09d4d` first. `apollophysicians.com` redirects to `www` in one hop (308), as the prompt asked.

## Verification run today (from the D: mirror)

| Check | Result |
|---|---|
| `tsc --noEmit` | pass |
| `next lint` | no warnings or errors |
| `vitest` | 250 / 250 pass |
| `next build` | pass, 20 static pages, first-load JS about 97 kB |
| `validate:schema` | PASS: every node, property and enumeration valid, every `@id` resolves |

## seo-page: per-page scorecard (local production server)

| Page | Title | Description | H1 | H2 | Words | Canonical | OG image | Missing alt |
|---|---|---|---|---|---|---|---|---|
| `/` | 54 | 155 | 1 | 9 | 1,080 | yes | yes | 0 |
| `/new-patients` | 60 | 153 | 1 | 9 | 882 | yes | yes | 0 |
| `/family-physician-elk-grove` | 59 | 157 | 1 | 7 | 889 | yes | yes | 0 |
| `/dr-paramjit-panesar-md` | 55 | 156 | 1 | 6 | 679 | yes | yes | 0 |
| `/insurance-accepted` | 59 | 160 | 1 | 9 | 801 | yes | yes | 0 |
| `/contact` | 56 | 157 | 1 | 7 | 615 | yes | yes | 0 |
| `/faq` | 55 | 150 | 1 | 5 | 463 | yes | yes | 0 |

- All titles are in the 50 to 60 character range and all descriptions in the 140 to 160 range. No duplicate titles or descriptions among live pages.
- `lang="en"`, Twitter card, and `index, follow` are present. Canonicals carry no trailing slash, matching the sitemap.
- `/faq` is the thinnest page at 463 words. It is a question hub, so that is acceptable; it can grow when more confirmed answers exist.
- The three held pages (`/annual-physical-sacramento`, `/immigration-medical-exam-sacramento`, `/services`) return 404 and `noindex` by design until Dr. Panesar reviews the health content. They are correctly absent from the sitemap.

## seo-sitemap

Seven URLs, valid XML, `YYYY-MM-DD` `lastmod`, no `priority` or `changefreq`, HTTPS only, declared in `robots.txt`. All seven are indexable and return 200. No held, redirected or noindex URL is listed. Pass.

## seo-geo

| Area | Finding |
|---|---|
| Rendering | Static pages; content is in the HTML, so crawlers that do not run JavaScript see it. |
| Crawlers | `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot` (search) and `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, `Applebot-Extended` (training) are all allowed, per owner policy A. |
| Citability | Every page opens with a 40 to 60 word direct answer, then Quick facts, then question headings. |
| Entity | One `MedicalClinic` node and one `Physician+Person` node, linked by `@id`; NPI, license, and credentials; `sameAs` limited to Doximity and WebMD, which were opened and checked. |
| `llms.txt` | Present and accurate. Per Google's own guidance it does not help or hurt Google Search; it is optional for other AI tools. |
| `FAQPage` | Present. Google retired FAQ rich results for all sites in May 2026, so this is an Info item: it still gives machines a clean question and answer structure. Do not claim a rich-result gain. |
| Brand signals | Weakest area. The skills rate brand mentions (Reddit, YouTube, LinkedIn) above backlinks for AI citation. None of that is in the repo; it needs the practice. |

## seo-maps (Tier 0: DataForSEO not connected)

- Schema fields present: `address`, `geo` (5 decimals), `hasMap`, `telephone`, `logo`, `image`, `areaServed`, `isAcceptingNewPatients`, `priceRange`, `medicalSpecialty`.
- Deliberately absent until confirmed: `openingHoursSpecification` (hours conflict across sources), `knowsLanguage`.
- OpenStreetMap places the address about 245 m west of the schema pin. This is already known and resolved: the pin is the practice's own Google Maps listing pin (`client-confirmations.md` item 39). Keep it, and ask the practice to confirm the pin in Google Business Profile.
- Competitor radius map: the public Overpass server was at capacity (502) and returned nothing. Not done. A geo-grid (share of local voice) scan needs the DataForSEO extension and a cost approval, so it was not run.

## seo-keyword-research

Not run. It needs a SerpAPI key (`SERPAPI_KEY`, not set here) for Google Trends data. The target keywords are already fixed by the master prompt's mapping table, so this would only add trend validation. If you add a key, the useful queries are "family doctor sacramento", "doctor accepting new patients sacramento" and "annual physical sacramento".

## seo-flow / seo-plan

The 90-day plan the prompt asks for is `docs/seo/ranking-plan.md`. Nothing in it conflicts with this audit. The FLOW prompt library was not run: its prompts target keyword and gap research, and the keywords are already fixed by the master prompt.

## What moves rankings now, in order

1. **Deploy `cd09d4d`.** Live is missing three pages and two crawler rules. You deploy; nothing here pushes or deploys.
2. **Submit the sitemap** in Search Console and Bing Webmaster Tools (`search-engine-submission.md`). Needs the practice's accounts.
3. **Dr. Panesar reviews the held pages.** That unlocks `/annual-physical-sacramento`, `/immigration-medical-exam-sacramento` and `/services`, the reviewer and date markup, and the "annual physical" and "I-693" keywords.
4. **Fix the Google Business Profile.** Its website field points at the parked `drparamjitpanesar.com`; it has an owner post with typos. This is the single biggest local-pack lever (`local-gbp-checklist.md`).
5. **Confirm the open facts:** hours (conflicting), phone variants, languages, other clinicians, telehealth, the nine plans, the $65 price, same-day wording. Hours and languages unlock two more schema properties.
6. **Take down `apollophysicians.riolabz.com`** (expired certificate, other server).
7. **Reviews, citations and local links** are off-site work with no code involved.

Rankings depend on competition, reviews, links and time (typically 3 to 6 months). No position is promised.
