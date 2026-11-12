# Keyword plan: every payment segment, Sacramento and Elk Grove

12 Nov 2026. This is the keyword-by-keyword plan for these segments: Medi-Cal, Medicare, Medicare with a medical group or Medicare Advantage, Vivant Health / River City, Nivano Physicians, low-income and uninsured, FQHC and community clinic. It covers Sacramento and Elk Grove for Google (SEO), answer boxes (AEO) and AI answers (GEO).

Part D at the end is the prompt to paste. It extends `master-prompt-payment-segments-2026-11-11.md`.

## 0. What "rank #1" can and cannot mean here

No one can promise a #1 position. Google, the AI assistants and the map pack decide, and they weigh reviews, directory listings, links, distance and time (expect 3 to 6 months). This plan sets a **realistic goal for each keyword**, using these codes:

| Code | Meaning | Where it is realistic |
|---|---|---|
| **#1 org** | #1 organic result among clinic websites | Long, specific searches with few clinic pages competing (plan + "accepting new patients" + South Sacramento, "how do I change my Medi-Cal doctor") |
| **Top 3 org** | Top 3 organic | Medium searches where directories (Zocdoc, Hill Physicians finder, Healthgrades) also rank |
| **Map 3** | Top 3 in the Google map pack | **Sacramento only**, near 95823. Not Elk Grove: the office is in Sacramento and the map pack favours distance |
| **AI** | Named correctly in AI answers (ChatGPT, Perplexity, Gemini, Google AI Mode, Claude) | Every segment, once the page is live and the directories match |
| **Listed** | Be listed where the result is a directory or government page | Broad searches dominated by Medicare.gov, plan finders, Zocdoc and health systems |
| **Honest** | Rank only for the "compare" intent, never as the thing searched | FQHC, community health center and free clinic searches: Apollo is a private practice |

Head terms such as "primary care Sacramento" go to Sutter, UC Davis, Kaiser and Zocdoc. They are **Listed** goals, not #1 goals.

## 1. Segment status (12 Nov 2026)

| Segment | Fact status | Page | Status |
|---|---|---|---|
| Medi-Cal | Confirmed (most plans; plan names not supplied) | `/medi-cal-doctor-sacramento` | Built, held for review |
| Original Medicare | Confirmed | `/medicare-doctor-sacramento` | Built, held |
| Medicare with a medical group or Advantage | Medicare and the Sutter and Hill groups confirmed; **Advantage plan names not** | `/medicare-advantage-doctor-sacramento` | Not built. Covered by a section on the Medicare page until plans are named |
| Vivant Health / River City | **Contract not confirmed** | `/vivant-health-doctor-sacramento` | Not built. A test blocks the words until confirmed |
| Nivano Physicians | Confirmed | `/nivano-physicians-doctor-sacramento` | Built, held |
| Low-income, no insurance | Confirmed ($65 initial self-pay; what it covers not supplied) | `/doctor-without-insurance-sacramento` | Built, held |
| FQHC / community clinic | **Item 40 open**: is the practice linked to a community health center? | `/community-clinic-alternative-sacramento` | Not built |
| Elk Grove (all segments) | Drive times measured 6 Nov | `/family-physician-elk-grove` plus an Elk Grove block on each segment page | To build (Part B) |

**What publishes the four built pages: Dr. Panesar's review** (setting `CLINICAL_REVIEW.reviewedOn`).

**Live check, 12 Nov 2026 (curl):** the live site is now built from this repo's 7-page core. `/insurance-accepted`, `/contact`, `/faq` and `/llms-full.txt` return 200, and they already show the confirmed hours, Medi-Cal, Nivano Physicians, telemedicine, Suite 200 and the $65 price. So the "deploy this repo" blocker in `scorecard-2026-11-11.md` is cleared. **Every segment page still returns 404** (Medicare, Medi-Cal, Nivano, no-insurance, same-day, annual physical, plus the three unbuilt ones), so none of them can rank yet. `/insurance-accepted` still has the old title "Doctor Accepting Medicare in Sacramento". The single biggest ranking lever today is Dr. Panesar's review, not more writing.

## 2. Keywords by segment and city

"Page" is where the keyword is targeted; "Goal" uses the codes in section 0. Each keyword has **one** page, so pages do not compete with each other.

### 2.1 Medi-Cal

| Keyword | City | Page | Goal | What wins it |
|---|---|---|---|---|
| doctors that accept Medi-Cal Sacramento | Sac | Medi-Cal | Top 3 org, Map 3, AI | Answer in the first sentence, Quick Facts, Business Profile service "Medi-Cal patients" |
| Medi-Cal doctor South Sacramento | Sac | Medi-Cal | **#1 org**, Map 3 | Exact H1 and title; 95823 and neighbourhood names in the text |
| Medi-Cal family doctor accepting new patients Sacramento | Sac | Medi-Cal | #1 org, AI | "Accepting new patients" fact + Medi-Cal on the same page |
| Medi-Cal primary care doctor 95823 / 95828 | Sac | Medi-Cal | #1 org | ZIPs in the text, schema `areaServed` |
| how to change my Medi-Cal doctor Sacramento | Sac | Medi-Cal (steps + FAQ) | **#1 org**, AI | The numbered steps; FAQ answer quoted by AI |
| Medi-Cal doctor near Methodist Hospital Sacramento | Sac | Medi-Cal | #1 org | "0.4 mile from Methodist Hospital of Sacramento" |
| Medi-Cal doctor Elk Grove | EG | Medi-Cal (Elk Grove block) | Top 3 org, AI | Elk Grove block: 12 minutes from 95758 and 95624, route, same plans |
| family doctor that takes Medi-Cal Elk Grove accepting new patients | EG | Medi-Cal | Top 3 org | Same, plus a link from the Elk Grove page |
| Medi-Cal doctor 95758 / 95624 / 95757 | EG | Elk Grove page section → Medi-Cal | Top 3 org | ZIPs in the Elk Grove section (no drive-time claim for 95757) |
| Medi-Cal doctor same-day appointment Sacramento | Both | Medi-Cal | #1 org | Same-day fact on the page; link to the same-day page |
| Anthem / Health Net / Molina Medi-Cal doctor Sacramento | Sac | Medi-Cal | Blocked | **Needs the Medi-Cal plan names** before any plan is named |

### 2.2 Original Medicare

| Keyword | City | Page | Goal | What wins it |
|---|---|---|---|---|
| doctor that accepts Medicare Sacramento | Sac | Medicare | Top 3 org, Map 3, AI | First-sentence answer; Medicare Care Compare listing matches |
| Medicare primary care doctor accepting new patients Sacramento | Sac | Medicare | Top 3 org (Zocdoc competes) | "New Medicare patients welcome" FAQ |
| Medicare family doctor South Sacramento | Sac | Medicare | **#1 org** | H1, title, neighbourhoods |
| board certified family doctor Medicare Sacramento | Sac | Medicare | #1 org, AI | ABFM, license A 114684 and a link to check it |
| Medicare doctor Saturday Sacramento | Sac | Medicare | #1 org | Confirmed Saturday 9-2 in Quick Facts and schema |
| Medicare doctor 95823 | Sac | Medicare | #1 org | ZIP in the text |
| Medicare doctor Elk Grove accepting new patients | EG | Medicare (Elk Grove block) | Top 3 org, AI | Elk Grove block |
| Medicare family doctor near Elk Grove | EG | Medicare | Top 3 org | Same |
| what does Medicare Part B cover for a doctor visit | Both | Medicare (FAQ) | AI only | Sourced to Medicare.gov; no benefit promises |

### 2.3 Medicare with a medical group or Medicare Advantage

| Keyword | City | Page | Goal | What wins it |
|---|---|---|---|---|
| Hill Physicians Medicare doctor Sacramento | Sac | Medicare (Advantage section) | Top 3 org, Listed | Hill Physicians directory profile shows Suite 200 and "accepting new patients" |
| Sutter Health Medicare family doctor Sacramento | Sac | Medicare (Advantage section) | Top 3 org, Listed | Sutter directory profile |
| how to change primary care doctor Medicare Advantage HMO | Both | Medicare + new-patients switching block | **#1 org**, AI | The switching steps |
| Medicare Advantage doctor South Sacramento | Sac | Future `/medicare-advantage-doctor-sacramento` | Top 3 org | **Blocked: plan names** |
| Medicare HMO doctor Elk Grove | EG | Same | Top 3 org | Blocked: plan names |
| UnitedHealthcare / Aetna / Anthem / SCAN Medicare Advantage doctor Sacramento | Sac | Same | Top 3 org | Blocked: plan names, one section per plan (no page per plan) |

### 2.4 Vivant Health / River City Medical Group (blocked until the contract is confirmed)

| Keyword | City | Page | Goal | What wins it |
|---|---|---|---|---|
| Vivant Health doctors Sacramento | Sac | Future `/vivant-health-doctor-sacramento` | **#1 org** (new brand, few clinic pages) | Name both: "Vivant Health (formerly River City Medical Group)" |
| River City Medical Group doctors | Both | Same | #1 org | People still search the old name |
| Vivant Health primary care accepting new patients | Sac | Same | #1 org, AI | Accepting-new-patients fact |
| Vivant Health Medi-Cal doctor Sacramento / Elk Grove | Both | Same + Medi-Cal | Top 3 org | Cross-links |
| is River City Medical Group now Vivant Health | Both | Same (FAQ) | AI | Public fact: rebrand in September 2024 |
| change primary care doctor Vivant Health | Both | Same | #1 org | Steps |

The Vivant Health provider directory also has to list Dr. Panesar at Suite 200. AI answers for this segment will lean on that directory.

### 2.5 Nivano Physicians

| Keyword | City | Page | Goal | What wins it |
|---|---|---|---|---|
| Nivano Physicians doctors Sacramento | Sac | Nivano | **#1 org** among clinics | H1, "independent physician association" explanation |
| Nivano Physicians primary care accepting new patients | Sac | Nivano | #1 org, AI | Accepting-new-patients fact |
| Nivano family doctor South Sacramento | Sac | Nivano | #1 org | Neighbourhoods |
| Nivano Physicians Elk Grove doctor | EG | Nivano (Elk Grove block) | Top 3 org | Elk Grove block |
| what is Nivano Physicians | Both | Nivano (FAQ) | AI | IPA definition |
| how to change primary care doctor Nivano | Both | Nivano (steps) | #1 org, AI | Steps |

The Nivano Physicians directory needs an entry for Dr. Panesar.

### 2.6 Low-income and no insurance

| Keyword | City | Page | Goal | What wins it |
|---|---|---|---|---|
| doctor without insurance Sacramento | Sac | No-insurance page | **Top 3 org**, AI | $65 in the first sentence; results today are national price guides |
| self-pay doctor visit Sacramento | Sac | Same | #1 org | Exact phrase in a heading |
| how much is a doctor visit without insurance in Sacramento | Sac | Same (FAQ) | #1 org, AI | Number-first answer; adding what $65 covers makes it stronger |
| cash price doctor visit South Sacramento | Sac | Same | #1 org | Same |
| $65 doctor visit Sacramento | Sac | Same | #1 org | Same |
| doctor without insurance Elk Grove | EG | Same (Elk Grove block) | Top 3 org | Elk Grove block |
| uninsured family doctor Elk Grove | EG | Same | Top 3 org | Same |
| see a doctor while waiting for Medi-Cal approval | Both | Medi-Cal (FAQ) | #1 org, AI | Existing FAQ |
| low cost doctor Sacramento | Sac | Same | Top 3 org | Use "self-pay from $65", never "cheap" or "lowest" |
| sliding scale doctor Sacramento | Sac | None | Blocked | Only if a sliding scale is confirmed; otherwise never targeted |

### 2.7 FQHC, community health center, community clinic, free clinic (blocked by item 40)

| Keyword | City | Page | Goal | What wins it |
|---|---|---|---|---|
| community clinic vs private doctor | Both | Future `/community-clinic-alternative-sacramento` | **#1 org**, AI (Honest) | Plain comparison table; HRSA as the source |
| what is an FQHC | Both | Same (FAQ) | AI (Honest) | Sourced definition |
| community health center South Sacramento | Sac | Same | Honest only | The page says Apollo is **not** one and links to HRSA's finder |
| free clinic Sacramento / Elk Grove | Both | Same | Honest only | Same |
| doctor accepting new patients if community clinic has a waitlist | Both | Same | #1 org | Same-day and next-day fact, plans, $65 |
| FQHC Elk Grove | EG | Same | Honest only | Same |

Apollo will not rank #1 for "FQHC Sacramento" as an FQHC, and must not try. The honest goal is to be the page that explains the difference and offers a real alternative.

### 2.8 Brand and entity keywords (all segments benefit)

| Keyword | Page | Goal |
|---|---|---|
| Apollo Physicians Sacramento / Apollo Physicians Medical Group | Home | #1 org (the staging copy is suspended; confirm in Search Console) |
| Dr. Paramjit Panesar | Physician page | #1 org, AI |
| Apollo Physicians hours / phone / Suite 200 | Contact | #1 org, AI (hours now confirmed) |

## 3. Elk Grove without doorway pages

1. **No page per segment per town.** Pages like "Medi-Cal doctor Elk Grove" that only swap the town name are doorway pages and risk the whole site.
2. **On `/family-physician-elk-grove`**, add one section, "Insurance and payment for Elk Grove patients", with one or two sentences per live segment and a link to its page.
3. **On each segment page**, add one short "For Elk Grove patients" block. It uses the measured facts only: about 12 minutes by car from 95758 (6.6 miles via Laguna Blvd and Franklin Blvd) and 95624 (6.8 miles via Bond Rd and CA-99 North), Google Maps, 6 Nov 2026. No drive-time claim for 95757.
4. **Elk Grove reach outside the site:** directory listings (Hill, Sutter, Nivano, Medicare Care Compare) are searched by ZIP; AI answers draw on them; reviews that mention Elk Grove.
5. **Map pack:** Elk Grove "near me" map results are out of reach by distance. The Elk Grove goals are organic and AI.

## 4. Answer-engine questions (AEO) and AI prompts (GEO)

Each question is answered on the page in 40 to 60 words, answer first, naming Apollo Physicians. The same wording goes in `llms.txt` and `llms-full.txt`.

| Segment | Questions to win (Google answer boxes and People Also Ask) | AI prompts to test monthly |
|---|---|---|
| Medi-Cal | Does Apollo Physicians accept Medi-Cal? · How do I change my Medi-Cal doctor? · Can I see a doctor while my Medi-Cal application is pending? | "Family doctor in South Sacramento that accepts Medi-Cal and is taking new patients" · "Medi-Cal doctor near Elk Grove" |
| Medicare | Does Apollo Physicians accept Original Medicare? · Is Apollo accepting new Medicare patients? · Is Dr. Panesar board certified? | "Doctor accepting new Medicare patients in Sacramento" · "Medicare family doctor near Elk Grove open Saturday" |
| Medicare + group / Advantage | How do I make Dr. Panesar my primary care doctor with Hill Physicians or Sutter Health? · What if I have a Medicare Advantage plan? | "Primary care Medicare Advantage South Sacramento" · "Hill Physicians doctor accepting new patients Sacramento" |
| Vivant / River City | Is River City Medical Group now Vivant Health? · Does Apollo accept Vivant Health? [blocked] | "Vivant Health doctors in Sacramento accepting new patients" |
| Nivano | Does Apollo Physicians accept Nivano Physicians? · What is an independent physician association? | "Nivano Physicians family doctor Sacramento" |
| No insurance | How much does a self-pay visit cost at Apollo Physicians? · Can I see a doctor without insurance in Sacramento? | "How much is a doctor visit without insurance in Sacramento?" · "Doctor without insurance near Elk Grove" |
| Community clinic | Is Apollo Physicians a community health center? · What is an FQHC? [blocked by item 40] | "Community clinic or private doctor in South Sacramento?" |

Pass mark (from the scorecard rubric): across 12 prompts and 4 AI assistants, Apollo is named with the right phone and address in at least 8 of 12.

## 5. Skills: what each one does in this plan

Checked 12 Nov 2026 on this machine.

| Skill | Use | Runs here? |
|---|---|---|
| `/anthropic-skills:seo-geo-aeo` | Baseline and after-launch audit of the live URL, by segment page | Yes |
| `/anthropic-skills:aeo` | Check each segment page's question headings, answer-first structure and answer-box fit; suggest missing questions | Yes |
| `/claude-seo:seo-geo` | AI citability per page; `llms.txt` / `llms-full.txt`; AI crawler access | Yes |
| `/claude-seo:seo-sxo` | Read the search results for each segment's main keyword (both cities) to confirm the page type Google rewards | Yes |
| `/claude-seo:seo-flow` | Evidence each keyword needs (Find, Leverage stages) | Yes |
| `/claude-seo:seo-maps` | Competitors within 3 miles of the office and of central Elk Grove; name, address and phone across platforms | Free tier only; geo-grid rank tracking needs DataForSEO, so do the manual 5-point check |
| `/claude-seo:seo-backlinks` | Link gaps vs nearby clinics; plan, group and community directory targets | Free tier (Common Crawl); better with free Moz or Bing keys |
| `/technical-seo-audit` | Technical issues | Needs a Screaming Frog, Sitebulb or Ahrefs export; otherwise `/claude-seo:seo-technical` plus `npm run crawl:check` |
| `/claude-seo:seo-schema`, `/claude-seo:seo-sitemap` | Validate the graph and sitemap as pages go live | Yes |
| `/claude-seo:seo-images` | Image audit (no real photos yet) | Yes |
| `/claude-seo:seo-image-gen` | AI images | **No (needs nanobanana).** Never AI-generate the clinic, staff or doctor |
| `/claude-seo:seo-competitor-pages` | Only the generic "community clinic or private doctor?" comparison | Yes; no page naming another clinic |
| `/claude-seo:seo-dataforseo` | Real search volumes and ranks per keyword | **No (needs the DataForSEO extension).** Without it, rank by judgement and use Search Console after launch |
| `/claude-seo:seo-profound` | AI citation rates over time | **No (needs `PROFOUND_API_KEY`).** Fallback: the monthly AI prompt log in section 4, saved to `docs/seo/ai-answers-<date>.md` |

---

# Part D: the prompt (paste after the B0 preamble in `master-prompt-payment-segments-2026-11-11.md`)

```
[Paste B0 from docs/seo/master-prompt-payment-segments-2026-11-11.md first.]

GOAL
Make Apollo Physicians rank as high as possible in Google, Google AI answers and the
other AI assistants for these segments in Sacramento and Elk Grove: Medi-Cal; Original
Medicare; Medicare with a medical group or Medicare Advantage; Vivant Health / River City
Medical Group; Nivano Physicians; low-income and uninsured; FQHC and community clinic
searches. Use docs/seo/keyword-plan-sacramento-elk-grove-2026-11-12.md as the keyword map.
Do not promise #1. For each keyword, report the realistic goal from section 0 of that file.

STEP 1: CHECK FACTS AND STATUS
- Read client-confirmations.md. Confirmed on 11 Nov: hours Mon-Fri 8:30-5:30 and
  Sat 9:00-2:00; Medi-Cal (most plans); Nivano Physicians; telemedicine in California.
- Still blocked: Medicare Advantage plan names; Vivant Health contract; Medi-Cal plan names;
  what $65 covers; payment methods; sliding scale; item 40. Do not build anything that
  needs them. List them under "Needs a human".
- Check whether apollophysicians.com is built from this repo (fetch /insurance-accepted).
  If it returns 404, say the live site is still the old codebase.

STEP 2: RESEARCH EACH SEGMENT IN BOTH CITIES (no code changes)
For each segment's top 3 keywords in section 2 of the keyword plan, once with
"Sacramento" and once with "Elk Grove":
- /claude-seo:seo-sxo <keyword>: what ranks (directory, clinic, health system,
  government), and whether our planned page fits.
- /claude-seo:seo-flow: what evidence our page needs to beat what ranks.
Then once:
- /claude-seo:seo-maps (free tier): competitors within 3 miles of 8191 Timberlake Way and
  of central Elk Grove; name, address and phone across platforms.
- /claude-seo:seo-backlinks https://www.apollophysicians.com: link gaps vs 2-3 nearby
  practices; only links a real practice can earn.
- /claude-seo:seo-dataforseo and /claude-seo:seo-profound: run only if their keys exist;
  otherwise say they were skipped.
Save docs/seo/segment-research-<date>.md and update the Goal column in the keyword plan
where the evidence says otherwise.

STEP 3: BUILD (branch from origin/main; never commit to main)
1. Add a short "For Elk Grove patients" block to each built segment page
   (Medicare, Medi-Cal, Nivano, no-insurance) using only the measured drive facts
   (about 12 minutes from 95758 via Laguna Blvd and Franklin Blvd, and from 95624 via
   Bond Rd and CA-99 North; Google Maps, 6 Nov 2026). No 95757 drive-time claim.
   Each block must say something different from the others (the segment's plan steps),
   so it is not a swapped-name block.
2. On /family-physician-elk-grove add "Insurance and payment for Elk Grove patients":
   one or two sentences per live segment page, each linking to that page.
3. Make sure every keyword in the plan appears where a person would naturally say it:
   H1, title, first sentence, one H2, Quick Facts. Never stuff.
4. Add any missing AEO question from section 4 of the plan to the matching page
   (40-60 words, answer first, names Apollo Physicians).
5. Build blocked pages (Medicare Advantage, Vivant Health, community clinic) ONLY if their
   fact is now Confirmed in client-confirmations.md, using the briefs in
   payment-segments-plan-2026-11-11.md section 3. Remove the matching word from the
   UNVERIFIED list in src/__tests__/apollo-content.test.ts in the same commit and name
   the confirmation in the commit message.
6. Run /anthropic-skills:aeo and /claude-seo:seo-geo against the local build in the
   reviewed state (temporarily set CLINICAL_REVIEW.reviewedOn, then revert) and fix what
   they find that is within the rules.
7. /claude-seo:seo-schema and node scripts/validate-schema.mjs; /claude-seo:seo-sitemap;
   /claude-seo:seo-images. Share images via npm run generate:og only.
8. Run every check in B0, regenerate the review packet, commit, push, and give me the PR
   compare link.

STEP 4: OFF-SITE CHECKLIST (you cannot log in)
Write docs/seo/offsite-<date>.md: Business Profile changes (website field, hours 8:30-5:30
and Sat 9-2, Suite 200, services per live segment, 8 posts in full); directory fixes
(WebMD, Vitals, Superpages, MapQuest, Tebra, Yelp, YellowPages, Birdeye, Healthgrades,
Zocdoc, NPPES); plan and group finders (Hill Physicians, Sutter, Nivano, Medicare Care
Compare, each confirmed Medi-Cal plan, Vivant only if contracted, USCIS civil surgeon
list); the review-request script with no incentives.

STEP 5: MEASURE (30, 60, 90 days after the pages are live)
- /anthropic-skills:seo-geo-aeo https://www.apollophysicians.com again; compare with the
  baseline.
- Run the AI prompts in section 4 of the keyword plan in ChatGPT, Perplexity, Gemini,
  Google AI Mode and Claude. Record named / not named, phone and address right or wrong,
  and the source each one cited. Save docs/seo/ai-answers-<date>.md. (Use
  /claude-seo:seo-profound instead if PROFOUND_API_KEY is set.)
- If I paste Search Console exports, report impressions, clicks and position for each
  keyword in the plan, split by Sacramento and Elk Grove wording.
- Recommend the next 30 days.

REPORT FORMAT
Scorecard (SEO, GEO, AEO, Local, each with evidence), keyword table with goal and current
status, work delivered, "Needs a human" with who can unblock each item, next three actions.
Plain words, short sentences, cite the page or tool behind every finding. Mark anything
not measured as "unmeasured", never "passed".
```
