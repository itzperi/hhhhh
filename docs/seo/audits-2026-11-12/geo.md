# GEO / AI-search readiness audit: apollophysicians.com
Date: 2026-11-12. Method: curl of all 7 pages, robots.txt, sitemap.xml, llms.txt, llms-full.txt; parsed raw HTML (no JS render needed, see Technical). Read-only; no project files changed. Raw fetches are in scratchpad\geo_raw\ (scratch only).

## GEO score: 7.5 / 10 (about 76/100)
Strong machine-readable foundation (open robots, accurate llms.txt/llms-full.txt, full SSR HTML, rich JSON-LD, 55 answer blocks all 42-57 words). Held back by thin off-site/entity signals, no visible freshness dates, and almost no multi-modal content.

| Dimension (weight) | Score | Notes |
|---|---|---|
| Citability (25) | 22 | 55/55 Q&A answers are 42-57 words, self-contained, name the practice + suite + phone. 0 answers in the 134-167 word band (not needed for FAQ-style). 5 of 55 questions are exact duplicates across pages. |
| Structural readability (20) | 17 | One H1 per page, clean H2s, "Quick facts" block on every page, tables on insurance/Elk Grove, numbered steps. H2s are mostly statements, not questions (questions live in the Q&A blocks). |
| Multi-modal (15) | 4 | Only 1 image site-wide (home, clinic interior, empty alt). No physician photo, no video, no diagram. |
| Authority and brand (20) | 14 | Strong verifiable credentials; Physician sameAs present. Clinic entity has no sameAs; no dateModified; no visible "last reviewed"; off-site presence unmeasured. |
| Technical accessibility (20) | 19 | SSR/static HTML (Next.js on Vercel), canonical on every page, sitemap with lastmod, llms.txt + llms-full.txt, 404s return 404, www redirect 308. No RSL file (optional). |

## AI crawler access (robots.txt, 388 bytes, HTTP 200)
Single block: `User-Agent: *  Allow: /` plus one grouped Allow: / for OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, GPTBot, ClaudeBot, Google-Extended, CCBot, anthropic-ai, Applebot-Extended. No Disallow anywhere. Sitemap declared.
- Allowed: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended.
- Also allowed (training-only, optional block): CCBot, anthropic-ai. This is a policy choice, not a defect.
- Spoofed-UA fetches (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended) all returned 200 with identical 75,805-byte body. Real bot IPs behind Vercel firewall/bot protection: unmeasured.
- No X-Robots-Tag header; every page has meta robots "index, follow".

## llms.txt / llms-full.txt
- /llms.txt: present, 200, text/plain; charset=utf-8, 3,192 bytes. Well formed (H1, blockquote summary, H2 sections, key pages list, notes for AI).
- /llms-full.txt: present, 200, 27,715 bytes. Contains Quick facts + per-page intro + all Q&A for all 7 pages.
- Content match: I checked every Q and every A in llms-full.txt against the visible text of its live page. 55/55 questions and 55/55 answers match verbatim; 0 mismatches. NAP, hours (Mon-Fri 8:30-5:30, Sat 9-2), insurance list (incl. Medi-Cal "most plans", Nivano), telemedicine (California), "private practice, not a community health center", $65 self-pay all agree with the HTML and JSON-LD.
- Gaps (minor): llms-full omits the home "Patient reviews" section and the insurance page's "Provided by the practice on 11 November 2026" date line; llms.txt has no last-updated date. The /contact FAQ answer says the phone number "is used ... on Google and on the practice's directory listings"; that cannot be verified from the site (unmeasured).
- RSL 1.0: /license.xml 404; /ai.txt 404. Optional.

## Citability detail
- 55 answer blocks across 7 pages (home 8, new-patients 8, Elk Grove 8, physician 6, insurance 12, contact 6, faq 7). Word counts: min 42, median ~49, max 57; all inside the 40-60 target. Each repeats entity + address + phone, so each is extractable alone.
- Weakness: 5 questions appear on multiple pages with near-identical answers (Where is Apollo located; What insurance; Elk Grove; Who is Dr. Panesar; Accepting new patients). Can split citation credit between URLs; also boilerplate "Call 916-236-5800" opens or closes most answers.
- Every page has speakable (cssSelector [data-speakable]) and an FAQPage block.

## Entity / brand signals
- Name: "Apollo Physicians" is used in title, H1, og:site_name, WebSite/MedicalClinic name, llms files, every page body. The only variant is "Apollo Physicians Medical Group" (footer copyright and JSON-LD legalName, llms.txt blockquote). Consistent enough; it is the legal name and is declared as legalName. Whether the legal name is correct: unmeasured (needs practice confirmation).
- Address "8191 Timberlake Way, Suite 200, Sacramento, CA 95823": identical on all 7 pages (no variant suite strings), in JSON-LD PostalAddress, and llms.txt. llms.txt also warns that other suites in the building are different practices (good disambiguation).
- Phone 916-236-5800 / +19162365800 consistent everywhere. Hours in JSON-LD match visible text.
- sameAs: present ONLY on the Physician node (Doximity, WebMD). MedicalClinic and WebSite have no sameAs. No Google Business Profile, Yelp, LinkedIn, Facebook, Healthgrades, Medical Board lookup etc. The home "Read and write reviews on Google" link is a generic Maps search URL, not a Business Profile/place URL.
- JSON-LD gaps: no aggregateRating (correct to omit if reviews are not on-site), no dateModified/datePublished on WebPage/ProfilePage, telemedicine/Medi-Cal not expressed in schema (visible text and llms only), no availableService.
- Off-site brand mentions (Wikipedia, Reddit, YouTube, LinkedIn, Google Business Profile, directory NAP consistency): UNMEASURED (no fetch of third-party properties attempted; DataForSEO tools not available in this run).

## E-E-A-T on physician page (/dr-paramjit-panesar-md, 831 words)
Good: ABFM board certification, CA license A 114684 (active since 2010) with link to Medical Board of California lookup, ABMS verify link, medical school (Dayanand Medical College 2004), residency (UAMS 2007-2010), USCIS civil surgeon with USCIS lookup link, NPI 1982892659, Doximity + WebMD links, hasCredential/alumniOf/identifier in Physician JSON-LD, ProfilePage type, BreadcrumbList.
Gaps: no photo of the physician, no personal bio/philosophy, no years-in-practice or languages statement, no "last reviewed" date, no content author attribution. Credential accuracy against DCA/ABMS/USCIS databases: unmeasured (not queried). Do not add bio details, languages, or years until the practice confirms them.

## Technical
- Raw HTML contains full content (pages 75-120 KB, all H1/H2, Q&A and JSON-LD in initial response). No SPA shell issue; no Playwright needed.
- Titles/meta descriptions unique per page; canonical set; OG title/site_name present (og:image/og:description not checked). Sitemap lists 7 URLs with lastmod (home/elk-grove/physician/contact/faq 2026-11-06; new-patients and insurance 2026-11-11), which matches the 11 Nov confirmation.
- Insurance page carries "Provided by the practice on 11 November 2026" (the only visible date on the site).
- logo.png and share-card.png return 200.

## Platform-specific estimates (heuristic, not measured against live AI results)
| Platform | Est. score | Why |
|---|---|---|
| Google AI Overviews | 70 | Strong schema, SSR, concise answers; weak off-site/review corroboration, no visible dates, few images |
| ChatGPT search | 72 | OAI-SearchBot/GPTBot allowed, llms files, crisp NAP; no sameAs on clinic, no third-party mentions measured |
| Perplexity | 78 | PerplexityBot allowed, direct 40-60 word answers, public credential-verification links |
| Bing Copilot | 72 | Sitemap + lastmod good; Bing Places/Webmaster status unmeasured |
Live visibility/mention checks (ChatGPT scraper, LLM mentions): unmeasured.

## Findings table
| # | Finding | Evidence | Severity | Fix |
|---|---|---|---|---|
| 1 | Clinic entity lacks sameAs | JSON-LD MedicalClinic keys have no sameAs; only Physician has 2 | High | Add sameAs to MedicalClinic with confirmed profile URLs (Google Business Profile, Doximity/WebMD org pages, others the practice confirms). Use a real GBP place URL for the reviews link |
| 2 | Off-site brand/entity footprint unmeasured | No Wikipedia/Reddit/YouTube/LinkedIn/GBP data collected | High | Check GBP + directory NAP matches 8191 Timberlake Way, Suite 200 and 916-236-5800; claim Bing Places, Apple Business Connect |
| 3 | Almost no multi-modal content | 1 image site-wide (home, alt=""), 0 video, no physician photo | High | Add a real physician headshot and clinic/entrance photos with descriptive alt text, only with practice-supplied images |
| 4 | No dateModified / visible "last reviewed" | No dateModified in any JSON-LD; only insurance page shows a date | Med | Add dateModified to WebPage/ProfilePage (and "Hours/details confirmed 11 Nov 2026" lines); add lastmod to llms.txt |
| 5 | Duplicate Q&A across pages | 5 of 55 questions repeat near-verbatim on 2-4 pages | Med | Keep canonical answer on one page, tailor or trim copies on the others |
| 6 | Telemedicine and Medi-Cal not in structured data | "elemedicine" absent from all JSON-LD; paymentAccepted only "Health insurance, self-pay" | Med | Add confirmed telemedicine (California) service and Medi-Cal/Medicare to schema (availableService / paymentAccepted wording) |
| 7 | Physician page thin on experience signals | 831 words; no photo, bio, or review date | Med | Add photo and any bio facts the practice confirms; keep license/ABMS/USCIS links |
| 8 | Real-bot access unverified | Only spoofed UA tested (all 200) behind Vercel | Low | Confirm Vercel firewall/bot protection is not challenging OAI-SearchBot, ClaudeBot, PerplexityBot; check server logs |
| 9 | Legal name variant | "Apollo Physicians Medical Group" in footer/legalName/llms.txt vs "Apollo Physicians" everywhere else | Low | Confirm legal name with the practice; keep as is if correct (already declared as legalName) |
| 10 | H2s are statements, few question headings | Most H2s e.g. "Insurance we accept"; questions only inside Q&A blocks | Low | Optionally render Q&A questions as H3 and phrase 1-2 H2s as questions |
| 11 | No RSL 1.0 / ai.txt | /license.xml and /ai.txt return 404 | Low | Optional; publish only if the practice wants explicit AI-use licensing terms |
| 12 | llms files lack date and omit reviews/date line | No updated date; "Provided 11 Nov 2026" and Patient reviews section not in llms-full | Low | Add "Last updated" line to both llms files |

## Strengths worth keeping
robots.txt explicitly allowing all major AI bots; llms.txt and llms-full.txt that match the pages verbatim; consistent NAP with Suite 200; practice type stated plainly ("private, not a community health center"); credential verification links; 55 uniform 40-60 word answers; SSR; sitemap lastmod.

## Not measured
Off-site mentions (Wikipedia, Reddit, YouTube, LinkedIn, GBP, Doximity/WebMD page content and NAP); live AI answer visibility; actual crawler IP behaviour; credential validity at DCA/ABMS/USCIS; og:image presence and Core Web Vitals; Bing Webmaster/Places status.
