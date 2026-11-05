# AI crawler policy: owner decision needed

Prepared 5 Nov 2026 (Step 6). **Status: pending the owner's decision.** Until then `robots.txt` has no AI-specific rules, which is exactly how the site behaved before. Normal search crawlers (Googlebot, Bingbot and the rest) are allowed in every option below.

## The two groups

Vendor documentation read on 5 Nov 2026 says these crawlers do different jobs, so they can be decided separately.

| Group | Agent | What it does (per the vendor) | Honors robots.txt? |
|---|---|---|---|
| **Search and user-fetch** (cited in answers) | `OAI-SearchBot` | Surfaces sites in ChatGPT search. Blocking means the site "will not be shown in ChatGPT search answers", though links can still appear. | Yes |
| | `ChatGPT-User` | Fetches a page when a ChatGPT user asks for it. | OpenAI says rules "may not apply" because the visit is user-initiated |
| | `PerplexityBot` | Perplexity's search index. Not used to train foundation models. | Yes. Perplexity recommends allowing it. |
| | `Perplexity-User` | Fetches a page when a user's question needs it. Not used for training. | Generally ignores robots.txt (user-initiated) |
| | `Claude-SearchBot` | Indexes pages to improve Claude's search results. Blocking may reduce visibility there. | Yes |
| | `Claude-User` | Fetches pages for a Claude user's question. Blocking stops that retrieval. | Yes |
| **Training** (not cited, used to build models) | `GPTBot` | Crawls content that may train OpenAI models. | Yes |
| | `ClaudeBot` | Collects content that may train Anthropic models. | Yes |
| | `Google-Extended` | A token, not a crawler. Controls use of Google-crawled content for Gemini training and grounding. Google says it "does not impact a site's inclusion in Google Search nor is it used as a ranking signal". | Yes (it is only a preference signal) |
| | `CCBot` | Common Crawl, an open dataset many models train on. | Yes |

Sources: OpenAI bots page (developers.openai.com/api/docs/bots), Anthropic's crawler article (support.claude.com, article 8896518), Perplexity bots guide (docs.perplexity.ai/guides/bots), Google common crawlers page (developers.google.com/search/docs/crawling-indexing/google-common-crawlers).

Not covered by the lists: other AI-related agents (for example Apple's, Meta's or ByteDance's). They were not checked against vendor documentation, so none are named. Anything not named falls under the normal rules for all crawlers.

## Options

| | A. Allow all (current) | B. Search only (recommended) | C. Block all AI |
|---|---|---|---|
| Search and user-fetch agents | Allowed | Allowed | Blocked |
| Training agents | Allowed | Blocked | Blocked |
| Can appear in ChatGPT, Perplexity and Claude answers | Yes | Yes | No (for the crawlers that honor robots.txt) |
| Content used to train models | Allowed | Opted out | Opted out |
| robots.txt change | none | one constant | one constant |

## Recommendation: B, search only

Why: the goal is new-patient calls from AI answers, and those come from the search and user-fetch agents, which stay allowed. The training agents bring no citation or call back to the practice. Insurance, pricing and availability on a medical practice's site change, and a model trained on an old copy can repeat stale facts with no link to the page that has the current ones.

Trade-offs to weigh:
- Opting out of training cannot undo collection that already happened, and it is a request that only crawlers that honor robots.txt will follow.
- Models that answer without browsing may know the practice less well, or not at all. There is no evidence either way for a small local practice, so this is a judgment call, not a measured result.
- `ChatGPT-User` and `Perplexity-User` may ignore robots.txt because a person asked for the page. Option C does not reliably stop them.
- Blocking `Google-Extended` is documented not to affect Google Search. Google's page does not mention AI Overviews, so blocking it is not documented to affect them either. Google Search rules govern AI Overviews.
- There is no patient information on the site, so privacy law does not push the decision either way. This is about content reuse.

## How to apply the decision

Change one line in `src/data/crawlers.ts` and redeploy:

```ts
export const AI_CRAWLER_POLICY: AiCrawlerPolicy = 'search-only'; // or 'allow-all' | 'block-all'
```

Both non-default outputs were rendered by a production build and checked. Search-only produces one group allowing the six search and user-fetch agents and one group disallowing the four training agents. Crawlers re-read robots.txt at their own pace; OpenAI says changes can take about 24 hours.

## Other Step 6 changes (no decision needed)

- `robots.txt` no longer blocks `/_next/`. That folder serves the CSS and JavaScript Googlebot needs to render the pages. The unused `/api/` rule is also gone.
- `sitemap.xml` lists the three canonical URLs with a `YYYY-MM-DD` `lastmod`. `changefreq` and `priority` were removed (Google ignores both). Update `lastModified` in `src/data/pages.ts` whenever a page's content changes.
- `llms.txt` now carries confirmed facts only: name, address, phone, physician, family medicine, the one-office statement, the profile links and the page list. Insurance, price, appointment availability and the physician NPI return when the matching flag in `LLMS_CONFIRMED` (`src/data/practice.ts`) is set to `true` after the practice signs off. It is a convenience file for AI systems, not a ranking signal.
- Legacy URL redirects from the approved map are live (see `next.config.mjs`). Unconfirmed items are left as 404 on purpose.
