import { describe, expect, it } from 'vitest';
import robots, { buildRobotsRules } from '@/app/robots';
import sitemap from '@/app/sitemap';
import { AI_CRAWLER_POLICY, AI_SEARCH_AND_USER_AGENTS, AI_TRAINING_AGENTS } from '@/data/crawlers';
import { CLINICAL_REVIEW, livePages, PAGE_META } from '@/data/pages';
import { INITIAL_VISIT_PRICE, INSURANCE_ACCEPTED } from '@/data/practice';
import { NPI, OFFICE, PHONES, absoluteUrl } from '@/data/site';
import { buildLlmsTxt } from '@/lib/llms';
import { buildLlmsFullTxt } from '@/lib/llms-full';

type Group = { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };
const groups = (rules: unknown): Group[] => (Array.isArray(rules) ? (rules as Group[]) : [rules as Group]);
const agentsOf = (g: Group) => (Array.isArray(g.userAgent) ? g.userAgent : [g.userAgent ?? '']);

describe('robots.txt', () => {
  const live = robots();

  it('does not block /_next/ or anything else search engines need to render the pages', () => {
    expect(JSON.stringify(live.rules)).not.toContain('_next');
    for (const g of groups(live.rules)) expect([g.disallow ?? []].flat()).not.toContain('/');
  });

  it('points at the absolute sitemap URL', () => {
    expect(live.sitemap).toBe(absoluteUrl('/sitemap.xml'));
  });

  it('applies the owner decision (allow all) and names the AI crawlers with an explicit Allow', () => {
    expect(AI_CRAWLER_POLICY).toBe('allow-all');
    const g = groups(live.rules);
    expect(g[0]).toEqual({ userAgent: '*', allow: '/' });
    const named = g.slice(1).flatMap(agentsOf);
    for (const agent of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'Applebot-Extended', ...AI_SEARCH_AND_USER_AGENTS, ...AI_TRAINING_AGENTS]) {
      expect(named, agent).toContain(agent);
    }
    for (const group of g) expect([group.disallow ?? []].flat()).toEqual([]);
  });

  it('search-only allows search and user-fetch agents and disallows training agents', () => {
    const g = groups(buildRobotsRules('search-only'));
    const allowed = g.filter((x) => x.allow === '/').flatMap(agentsOf);
    const blocked = g.filter((x) => x.disallow === '/').flatMap(agentsOf);
    expect(allowed).toEqual(expect.arrayContaining(['*', ...AI_SEARCH_AND_USER_AGENTS]));
    expect(blocked.sort()).toEqual([...AI_TRAINING_AGENTS].sort());
  });

  it('block-all disallows both groups but never the normal search crawlers', () => {
    const g = groups(buildRobotsRules('block-all'));
    const blocked = g.filter((x) => x.disallow === '/').flatMap(agentsOf);
    expect(blocked.sort()).toEqual([...AI_SEARCH_AND_USER_AGENTS, ...AI_TRAINING_AGENTS].sort());
    expect(blocked).not.toContain('*');
    expect(blocked.map((a) => a.toLowerCase())).not.toEqual(expect.arrayContaining(['googlebot', 'bingbot']));
  });

  it('keeps the training agents and the search agents in separate lists', () => {
    const overlap = AI_TRAINING_AGENTS.filter((a) => (AI_SEARCH_AND_USER_AGENTS as readonly string[]).includes(a));
    expect(overlap).toEqual([]);
    expect(AI_SEARCH_AND_USER_AGENTS).toEqual(
      expect.arrayContaining(['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot', 'Claude-User']),
    );
    expect(AI_TRAINING_AGENTS).toEqual(expect.arrayContaining(['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot']));
  });
});

describe('sitemap.xml', () => {
  const entries = sitemap();

  it('lists exactly the live pages at their canonical URLs', () => {
    expect(entries.map((e) => e.url).sort()).toEqual(livePages().map((p) => absoluteUrl(p.path)).sort());
  });

  it('leaves out health pages that Dr. Panesar has not reviewed, and nothing else', () => {
    const urls = entries.map((e) => e.url);
    for (const page of Object.values(PAGE_META)) {
      const clinical = 'clinical' in page && page.clinical;
      expect(urls.includes(absoluteUrl(page.path)), page.path).toBe(!clinical || CLINICAL_REVIEW.reviewedOn !== null);
    }
  });

  it('gives every URL a real, non-future YYYY-MM-DD lastmod', () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const entry of entries) {
      expect(entry.lastModified, entry.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const parsed = new Date(`${entry.lastModified}T00:00:00Z`);
      expect(Number.isNaN(parsed.getTime()), entry.url).toBe(false);
      expect(String(entry.lastModified) <= today, entry.url).toBe(true);
    }
  });

  it('omits changefreq and priority, which Google ignores', () => {
    for (const entry of entries) {
      expect(entry).not.toHaveProperty('changeFrequency');
      expect(entry).not.toHaveProperty('priority');
    }
  });

  it('has no duplicate URLs', () => {
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
  });
});

describe('llms.txt', () => {
  const none = { insurance: false, price: false, appointmentAvailability: false, physicianNpi: false };
  const all = { insurance: true, price: true, appointmentAvailability: true, physicianNpi: true };

  it('carries the confirmed facts', () => {
    const text = buildLlmsTxt();
    expect(text).toContain(OFFICE.line);
    expect(text).toContain(PHONES.main.display);
    expect(text).toContain('Apollo Physicians Medical Group');
    expect(text).toContain('Dr. Paramjit Panesar, MD');
    expect(text).toContain('American Board of Family Medicine');
    expect(text).toContain(NPI.panesar);
    expect(text).toContain(INITIAL_VISIT_PRICE);
    for (const plan of INSURANCE_ACCEPTED) expect(text).toContain(plan);
  });

  it('states the confirmed hours and telemedicine, and never languages or 24/7 support', () => {
    const text = buildLlmsTxt();
    expect(text).toContain('## Hours');
    expect(text).toContain('Telemedicine visits for patients in California.');
    expect(text).toContain('Medi-Cal: most plans.');
    expect(text).toContain('not a community health center or free clinic');
    for (const flags of [none, all]) {
      expect(buildLlmsTxt(flags)).not.toMatch(/bilingual|speaks|spanish|punjabi|hindi|telehealth|24\/7|sliding|Vivant|River City/i);
    }
  });

  it('lets each owner-confirmed fact be switched off', () => {
    const text = buildLlmsTxt(none);
    expect(text).not.toContain(NPI.panesar);
    expect(text).not.toContain('## Insurance');
    expect(text).not.toContain('## Pricing');
    expect(text).not.toContain('Same-day and next-day appointments.');
  });

  it('lists only live pages, so it never points at a page that answers 404', () => {
    const text = buildLlmsTxt();
    for (const page of Object.values(PAGE_META)) {
      const clinical = 'clinical' in page && page.clinical;
      const listed = text.includes(`- ${absoluteUrl(page.path)}\n`) || text.includes(`- ${absoluteUrl(page.path)}`);
      expect(listed, page.path).toBe(!clinical || CLINICAL_REVIEW.reviewedOn !== null);
    }
  });

  it('links only to the site pages that exist', () => {
    const urls = buildLlmsTxt().match(/https:\/\/www\.apollophysicians\.com[^\s;]*/g) ?? [];
    const allowed = new Set([absoluteUrl('/'), absoluteUrl('/llms-full.txt'), ...Object.values(PAGE_META).map((p) => absoluteUrl(p.path))]);
    for (const url of urls) expect(allowed.has(url.replace(/\/$/, '')) || allowed.has(url), url).toBe(true);
  });
});

describe('llms-full.txt', () => {
  it('carries every live page, with its direct answer and questions', () => {
    const text = buildLlmsFullTxt();
    for (const page of livePages()) expect(text, page.path).toContain(`URL: ${absoluteUrl(page.path)}`);
    expect(text).toContain('Quick facts');
    expect(text).toContain(OFFICE.line);
    expect(text).toContain('Q: ');
  });

  it('leaves out held pages until Dr. Panesar has reviewed them', () => {
    const text = buildLlmsFullTxt();
    for (const page of Object.values(PAGE_META)) {
      if (!livePages().includes(page)) expect(text, page.path).not.toContain(`URL: ${absoluteUrl(page.path)}`);
    }
  });
});
