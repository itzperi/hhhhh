#!/usr/bin/env node
/**
 * Crawls a running copy of the site and reports the problems a crawler such as Screaming Frog would:
 * dead internal links, redirect chains, orphan pages, duplicate titles and descriptions, missing H1,
 * missing canonical, images without alt text, and sitemap URLs that do not return 200.
 *
 * usage: node scripts/crawl-check.mjs [base-url]      (default http://localhost:3100)
 * Start the site first (`npm run build && npm start`). Exits 1 when it finds a problem.
 */

const BASE = (process.argv[2] ?? 'http://localhost:3100').replace(/\/$/, '');
const problems = [];
const notes = [];
const pages = new Map(); // path -> { title, description, h1, canonical, links, imgsNoAlt }

const strip = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

async function get(path) {
  // Follow redirects by hand so chains are counted.
  const hops = [];
  let url = `${BASE}${path}`;
  for (let i = 0; i < 6; i += 1) {
    const response = await fetch(url, { redirect: 'manual' });
    if (response.status >= 300 && response.status < 400) {
      const next = new URL(response.headers.get('location') ?? '', url);
      hops.push(`${response.status} ${new URL(url).pathname} -> ${next.pathname}`);
      if (next.origin !== new URL(BASE).origin) return { status: response.status, hops, external: next.href };
      url = next.href;
      continue;
    }
    return { status: response.status, hops, body: await response.text(), finalPath: new URL(url).pathname };
  }
  return { status: 0, hops, loop: true };
}

function internalLinks(html) {
  const out = new Set();
  for (const m of html.matchAll(/<a\s[^>]*href="([^"#]+)(#[^"]*)?"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:)/.test(href) && !href.startsWith(BASE)) continue;
    const path = href.startsWith(BASE) ? href.slice(BASE.length) || '/' : href;
    if (path.startsWith('/') && !path.startsWith('/_next') && !/\.(png|ico|txt|xml|jpg|webp|svg)$/.test(path)) out.add(path);
  }
  return out;
}

const queue = ['/'];
const seen = new Set();
const brokenLinks = new Map(); // target -> [sources]
const redirectedLinks = new Map();

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const result = await get(path);
  if (result.hops.length > 1) problems.push(`redirect chain (${result.hops.length} hops) from ${path}: ${result.hops.join(' | ')}`);
  if (result.status !== 200) continue;
  const html = result.body ?? '';
  const clean = strip(html);
  const links = internalLinks(clean);
  const title = (clean.match(/<title[^>]*>([\s\S]*?)<\/title>/) ?? [])[1];
  const description = (clean.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/) ?? [])[1];
  const canonical = (clean.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/) ?? [])[1];
  const h1s = [...clean.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  const imgsNoAlt = [...clean.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\balt=/.test(m[0])).length;
  pages.set(result.finalPath ?? path, { title, description, h1s, canonical, links, imgsNoAlt });
  for (const link of links) {
    if (!seen.has(link)) queue.push(link);
  }
}

// Check every distinct internal link target, remembering where it was found.
const sources = new Map();
for (const [from, page] of pages) for (const link of page.links) sources.set(link, [...(sources.get(link) ?? []), from]);
for (const [target, from] of sources) {
  const result = await get(target);
  if (result.status === 404 || result.status === 0) brokenLinks.set(target, from);
  else if (result.hops.length) redirectedLinks.set(target, { from, to: result.hops.at(-1) });
  else if (result.status >= 400) problems.push(`${target} returns ${result.status} (linked from ${from.join(', ')})`);
}

for (const [target, from] of brokenLinks) problems.push(`broken internal link ${target} (linked from ${from.join(', ')})`);
for (const [target, info] of redirectedLinks) problems.push(`internal link to a redirect: ${target} (${info.to}) on ${info.from.join(', ')}`);

// Page-level checks.
const titles = new Map();
const descriptions = new Map();
for (const [path, page] of pages) {
  if (!page.title) problems.push(`${path}: missing <title>`);
  if (!page.description) problems.push(`${path}: missing meta description`);
  if (page.h1s.length !== 1) problems.push(`${path}: expected one H1, found ${page.h1s.length}`);
  if (!page.canonical) problems.push(`${path}: missing canonical`);
  else if (new URL(page.canonical).pathname.replace(/\/$/, '') !== path.replace(/\/$/, '')) problems.push(`${path}: canonical points at ${page.canonical}`);
  if (page.imgsNoAlt) problems.push(`${path}: ${page.imgsNoAlt} image(s) without alt text`);
  titles.set(page.title, [...(titles.get(page.title) ?? []), path]);
  descriptions.set(page.description, [...(descriptions.get(page.description) ?? []), path]);
}
for (const [title, paths] of titles) if (paths.length > 1) problems.push(`duplicate title "${title}": ${paths.join(', ')}`);
for (const [description, paths] of descriptions) if (paths.length > 1) problems.push(`duplicate description on ${paths.join(', ')}`);

// Sitemap: every URL returns 200 and is reachable by links (not an orphan).
const sitemap = await get('/sitemap.xml');
const urls = [...(sitemap.body ?? '').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname || '/');
const linkedTo = new Set([...pages.values()].flatMap((page) => [...page.links]));
for (const path of urls) {
  const result = await get(path);
  if (result.status !== 200 || result.hops.length) problems.push(`sitemap URL ${path} does not return a clean 200 (${result.status}${result.hops.length ? `, ${result.hops.join(' | ')}` : ''})`);
  if (path !== '/' && !linkedTo.has(path)) problems.push(`orphan page: ${path} is in the sitemap but no page links to it`);
}
for (const path of pages.keys()) if (!urls.includes(path) && path !== '/') notes.push(`crawled but not in the sitemap: ${path}`);

// robots.txt must not block rendering files.
const robots = await get('/robots.txt');
if (/Disallow:\s*\/_next/i.test(robots.body ?? '')) problems.push('robots.txt blocks /_next/');

console.log(`Crawled ${pages.size} pages, ${sources.size} distinct internal link targets, ${urls.length} sitemap URLs.`);
for (const note of notes) console.log(`note: ${note}`);
if (problems.length === 0) {
  console.log('PASS  no dead links, redirect chains, orphan pages, duplicate titles or descriptions, or missing H1/canonical/alt text.');
  process.exit(0);
}
for (const problem of problems) console.log(`FAIL  ${problem}`);
console.log(`\n${problems.length} problem(s)`);
process.exit(1);
