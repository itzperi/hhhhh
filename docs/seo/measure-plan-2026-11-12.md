# Measurement plan (Phase 6): 30, 60 and 90 days after the segment pages go live

12 Nov 2026. This cannot run until Dr. Panesar's review publishes the pages and Google has had at least four weeks. Nothing in it has been measured yet. **Baseline numbers: none exist for rankings** (no Search Console access, no keyword tool). The only baseline is `baseline-2026-11-12.md`.

## What to collect, and who collects it

| Measure | Source | Who | When |
|---|---|---|---|
| Impressions, clicks, average position per page and per keyword in `keyword-plan-sacramento-elk-grove-2026-11-12.md`, split by "Sacramento" and "Elk Grove" wording | Search Console, Performance, last 28 days, export queries and pages | Anyone with Search Console access (not yet granted) | Day 30, 60, 90 |
| Indexed pages and the riolabz host | Search Console, Pages; search `site:apollophysicians.riolabz.com` | Same | Day 7, 30 |
| Calls, direction requests, website clicks | Business Profile, Performance | Practice | Monthly |
| New patients by payment type (Medi-Cal, Medicare, Medicare Advantage, Nivano, self-pay) and "how did you hear about us" | Front-desk log (one tally sheet per month) | Front desk | Monthly. **This is the measure that counts** |
| AI answers | The prompt log below | Anyone | Day 30, 60, 90 |
| Field Core Web Vitals | Search Console, Core Web Vitals, or PageSpeed Insights when quota allows | Anyone | Day 30 |
| Map-pack position | The manual 5-point check in the local research (office; Valley Hi; Laguna; Elk Grove Blvd at Hwy 99; Bruceville Rd), run on a phone | Anyone | Day 30, 60, 90 |

## AI prompt log (copy to `docs/seo/ai-answers-<date>.md`)

Run each prompt in ChatGPT, Perplexity, Gemini, Google AI Mode and Claude, signed out where possible. For each, record: **named / not named**, **phone right or wrong**, **address and Suite 200 right or wrong**, **the source it cited**, and any wrong fact. Pass mark: Apollo named with the right phone and address in at least 8 of 12 prompts.

1. Family doctor in South Sacramento that accepts Medi-Cal and is taking new patients
2. Medi-Cal doctor near Elk Grove
3. Doctor accepting new Medicare patients in Sacramento
4. Medicare family doctor near Elk Grove open Saturday
5. Primary care Medicare Advantage South Sacramento
6. Hill Physicians doctor accepting new patients Sacramento
7. Nivano Physicians family doctor Sacramento
8. How much is a doctor visit without insurance in Sacramento?
9. Doctor without insurance near Elk Grove
10. Community clinic or private doctor in South Sacramento?
11. Is Apollo Physicians in Sacramento open on Saturday?
12. Who is Dr. Paramjit Panesar in Sacramento? (checks the name collision with the Suite 400 doctor)

If `PROFOUND_API_KEY` is ever set, `/seo-profound` replaces this manual log. It is not set today.

## Reading the result

- **Position goals** come from section 0 of the keyword plan (#1 among clinic sites, top 3, listed, honest-only). Do not judge head terms like "primary care Sacramento" against #1.
- If a page has impressions but no clicks, change its title and first sentence. If it has no impressions after six weeks, check indexing first.
- Wrong AI facts: find the source it cited (usually a directory) and correct that directory before changing the website.
- After 90 days, rerun `/seo-geo-aeo` and compare with the baseline, then pick the next 30 days: which segment page to strengthen, which directory to fix, which fact to confirm.
