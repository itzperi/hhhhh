/**
 * AI crawler groups for robots.txt. Roles were checked against each vendor's own documentation on
 * 5 Nov 2026 (OpenAI, Anthropic, Perplexity and Google); see docs/seo/ai-crawler-policy.md.
 *
 * Search and user-fetch agents retrieve a page so an assistant can show or cite it. Training agents
 * collect content that may be used to train models. They are separate decisions.
 */

/** Retrieval for search results or for a user's own request. Blocking these removes the site from those answers. */
export const AI_SEARCH_AND_USER_AGENTS = [
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // user-initiated fetches in ChatGPT (OpenAI says robots.txt rules may not apply)
  'PerplexityBot', // Perplexity search index
  'Perplexity-User', // user-initiated fetches in Perplexity (generally ignores robots.txt)
  'Claude-SearchBot', // Claude search index
  'Claude-User', // user-initiated fetches in Claude
] as const;

/** Collection of content that may be used to train models. */
export const AI_TRAINING_AGENTS = [
  'GPTBot', // OpenAI training
  'ClaudeBot', // Anthropic training
  'Google-Extended', // Gemini training and grounding; does not affect Google Search inclusion
  'CCBot', // Common Crawl, a public dataset many models train on
] as const;

/**
 * Other AI agents the owner asked to name explicitly (6 Nov 2026). Their roles were not checked against vendor
 * documentation: anthropic-ai is an older Anthropic name, and Applebot-Extended is Apple's token for AI training use.
 */
export const OTHER_AI_AGENTS = ['anthropic-ai', 'Applebot-Extended'] as const;

/**
 * The owner's decision, applied in src/app/robots.ts. Normal search crawlers (Googlebot, Bingbot and
 * the rest) are always allowed.
 * - "allow-all":   every crawler may fetch every page. The AI agents above are also named with an explicit
 *                  Allow, so the intent is visible in robots.txt. (The owner's decision.)
 * - "search-only": AI search and user-fetch agents are allowed; AI training agents are disallowed.
 * - "block-all":   both groups are disallowed.
 */
export type AiCrawlerPolicy = 'allow-all' | 'search-only' | 'block-all';

/** DECIDED 5 Nov 2026 by the owner: allow all. See docs/seo/ai-crawler-policy.md to revisit. */
export const AI_CRAWLER_POLICY: AiCrawlerPolicy = 'allow-all';
