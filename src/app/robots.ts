import type { MetadataRoute } from 'next';
import { AI_CRAWLER_POLICY, AI_SEARCH_AND_USER_AGENTS, AI_TRAINING_AGENTS, type AiCrawlerPolicy } from '@/data/crawlers';
import { absoluteUrl } from '@/data/site';

type Rule = MetadataRoute.Robots['rules'];

/**
 * Builds the robots.txt rules for an AI crawler policy. Pure, so it can be tested for every policy.
 *
 * Search engines are never restricted. In particular /_next/ is not blocked: it serves the CSS and
 * JavaScript that search engines need to render the pages, and blocking it hid them from Googlebot.
 * There are no private routes, so nothing else is disallowed.
 */
export function buildRobotsRules(policy: AiCrawlerPolicy): Rule {
  const everyone = { userAgent: '*', allow: '/' };

  if (policy === 'allow-all') return [everyone];

  const training = { userAgent: [...AI_TRAINING_AGENTS], disallow: '/' };
  if (policy === 'block-all') {
    return [everyone, { userAgent: [...AI_SEARCH_AND_USER_AGENTS], disallow: '/' }, training];
  }
  // search-only: explicit allow for the search and user-fetch agents so the intent is visible in the file.
  return [everyone, { userAgent: [...AI_SEARCH_AND_USER_AGENTS], allow: '/' }, training];
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: buildRobotsRules(AI_CRAWLER_POLICY),
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
