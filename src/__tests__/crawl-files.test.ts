import { describe, expect, it } from 'vitest';
import robots, { buildRobotsRules } from '@/app/robots';
import sitemap from '@/app/sitemap';
import { AI_CRAWLER_POLICY, AI_SEARCH_AND_USER_AGENTS, AI_TRAINING_AGENTS } from '@/data/crawlers';
import { PAGE_META } from '@/data/pages';
import { INITIAL_VISIT_PRICE, INSURANCE_ACCEPTED } from '@/data/practice';
import { NPI, OFFICE, PHONES, absoluteUrl } from '@/data/site';
import { buildLlmsTxt } from '@/lib/llms';

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

  it('keeps the owner-decision default of no AI-specific rules until a decision is made', () => {
    expect(AI_CRAWLER_POLICY).toBe('allow-all');
    expect(groups(live.rules)).toEqual([{ userAgent: '*', allow: '/' }]);
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

  it('lists exactly the indexable pages at their canonical URLs', () => {
    expect(entries.map((e) => e.url).sort()).toEqual(Object.values(PAGE_META).map((p) => absoluteUrl(p.path)).sort());
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

  it('contains only confirmed facts by default', () => {
    const text = buildLlmsTxt();
    expect(text).toContain(OFFICE.line);
    expect(text).toContain(PHONES.main.display);
    expect(text).toContain('Dr. Paramjit Panesar, MD');
    expect(text).not.toContain('$');
    expect(text).not.toContain(NPI.panesar);
    expect(text).not.toMatch(/same-day|next-day/i);
    for (const plan of INSURANCE_ACCEPTED) expect(text).not.toContain(plan);
  });

  it('never states hours or new-patient status', () => {
    for (const flags of [none, all]) expect(buildLlmsTxt(flags)).not.toMatch(/\bhours? (are|is|:)|accepting|new patients/i);
  });

  it('adds each section only when the practice has confirmed it', () => {
    const text = buildLlmsTxt(all);
    expect(text).toContain(INITIAL_VISIT_PRICE);
    expect(text).toContain(NPI.panesar);
    expect(text).toContain('## Insurance');
    expect(text).toContain('Same-day and next-day appointments.');
    expect(buildLlmsTxt(none)).not.toContain('## Insurance');
  });

  it('links only to pages in the sitemap', () => {
    const urls = buildLlmsTxt().match(/https:\/\/www\.apollophysicians\.com[^\s;]*/g) ?? [];
    const allowed = new Set([absoluteUrl('/'), ...Object.values(PAGE_META).map((p) => absoluteUrl(p.path))]);
    for (const url of urls) expect(allowed.has(url.replace(/\/$/, '')) || allowed.has(url), url).toBe(true);
  });
});
