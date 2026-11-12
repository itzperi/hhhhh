# Technical SEO check: https://www.apollophysicians.com
Date: 2026-11-12. Method: curl only (Git Bash), plus a throwaway Python HTML parser in the scratchpad. Read-only. Anything curl cannot show is marked "unmeasured".
Core Web Vitals (LCP/INP/CLS): unmeasured (PageSpeed API quota exhausted 11 Nov; no Lighthouse run).

Score: 8.5 / 10 (technical SEO, source-level). Core indexing hygiene is clean. Deductions are all Low/Medium housekeeping items.

## 1. Crawlability
robots.txt (200, 388 B): `User-Agent: * / Allow: /`, then explicit `Allow: /` for OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, GPTBot, ClaudeBot, Google-Extended, CCBot, anthropic-ai, Applebot-Extended. `Sitemap: https://www.apollophysicians.com/sitemap.xml`. No Disallow anywhere. PASS. Googlebot UA fetch of /faq returns 200.

sitemap.xml (200, application/xml, 813 B): PASS with one Low note.
- Parses as valid XML (minidom), 7 `<url>` entries, correct sitemap 0.9 namespace.
- All 7 URLs return 200 with 0 redirects: /, /new-patients, /family-physician-elk-grove, /dr-paramjit-panesar-md, /insurance-accepted, /contact, /faq.
- All 7 live pages are in it; no 404s listed; nothing listed that is not live.
- URL forms match canonicals exactly (home is listed and canonicalised without trailing slash).
- lastmod: 2026-11-06 x5 (/, elk-grove, panesar, contact, faq), 2026-11-11 x2 (/new-patients, /insurance-accepted). Only 2 distinct dates across 7 URLs. The two 11 Nov entries match the pages that were most recently edited, so they look plausible, but 5 identical dates suggests a batch/deploy date. Whether they are "real" per page is unmeasured (pages send no Last-Modified header and no dateModified in JSON-LD).
- Fallback paths: sitemap_index.xml 404, sitemap-0.xml 404 (expected, single sitemap). /sitemap.xml/ 308s to /sitemap.xml.

## 2. Indexability
| Page | Title (chars) | Meta desc (chars) | H1 count | Canonical | robots meta |
|---|---|---|---|---|---|
| / | 54 | 155 | 1 | https://www.apollophysicians.com | index, follow |
| /new-patients | 60 | 153 | 1 | self | index, follow |
| /family-physician-elk-grove | 59 | 157 | 1 | self | index, follow |
| /dr-paramjit-panesar-md | 55 | 156 | 1 | self | index, follow |
| /insurance-accepted | 59 | 160 | 1 | self | index, follow |
| /contact | 56 | 157 | 1 | self | index, follow |
| /faq | 55 | 150 | 1 | self | index, follow |

- All titles within 50-60 (new-patients is at the 60 ceiling). All descriptions within 150-160 (insurance-accepted is exactly 160, faq is exactly at the 150 floor). Pixel truncation: unmeasured.
- Canonicals are absolute, self-referencing, https + www, no trailing slash. `/faq?utm_source=x&ref=y` still returns canonical `/faq` (clean). `/?utm_source=x` returns 200.
- noindex: found only on the 404 template. None on the 7 live pages. No X-Robots-Tag header on any page. No hreflang (fine).
- Titles/descriptions are unique per page. og:title/og:description/twitter:* mirror them; og:image set per page (/og/*.png, all 200).
- Thin content (visible words approx, script/style stripped): home 1241, new-patients 1154, elk-grove 1034, insurance 1226, contact 767, faq 719, panesar 831. No thin pages.
- Structured data: one JSON-LD @graph per page: WebSite, MedicalClinic (with geo, hours, areaServed, isAcceptingNewPatients), Physician/Person, WebPage, FAQPage (+ BreadcrumbList on inner pages). Validity against Google's rich-results rules: unmeasured. Note: Google restricts FAQ rich results to authoritative gov/health sites, so FAQPage markup is unlikely to produce a SERP feature for this clinic (harmless).

## 3. Headings
Exactly one H1 per page. Order is H1 > H2 > H3 with no skipped levels on every page. H1s: "Family Physician in Sacramento, CA"; "Doctor Accepting New Patients in Sacramento"; "Family Physician for Elk Grove Patients"; "Dr. Paramjit Panesar, MD"; "Insurance Accepted at Apollo Physicians"; "Contact Apollo Physicians in Sacramento"; "Family Doctor Questions in Sacramento". Every page repeats an H2 "Quick facts" and a footer block H2 "Apollo Physicians contact details and pages" with H3s Contact details / Pages / Booking (sitewide boilerplate in the heading outline; Low).

## 4. Redirects (hop counts)
| Start | Hops | Path | Final |
|---|---|---|---|
| http://www.apollophysicians.com/ | 1 | 308 > https www | 200 |
| http://apollophysicians.com/ | 2 | 308 > https://apollophysicians.com/ > 308 > https://www | 200 |
| http://apollophysicians.com/faq | 2 | same two-step chain | 200 |
| https://apollophysicians.com/ | 1 | 308 > www | 200 |
| https://apollophysicians.com/new-patients | 1 | 308 > www, path preserved | 200 |
| https://www.apollophysicians.com/faq/ | 1 | 308 > /faq (strips trailing slash) | 200 |
| https://www.apollophysicians.com/new-patients/ | 1 | 308 > /new-patients | 200 |
| https://www.apollophysicians.com//faq | 1 | 308 > /faq | 200 |
| /FAQ (case) | 0 | 404 | 404 |
| /index.html | 0 | 404 | 404 |

All redirects are permanent 308s. Only chain is http://apex (2 hops), which is how Vercel does http>https then apex>www; acceptable, Low.

## 5. Security headers (same on all 7 pages)
Present: Strict-Transport-Security max-age=63072000 (2 yr), X-Content-Type-Options nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy geolocation=(self), camera=(), microphone=().
Missing: Content-Security-Policy, Cross-Origin-Opener-Policy, HSTS `includeSubDomains; preload`. HTTPS enforced. Low. Note `Access-Control-Allow-Origin: *` is sent on HTML (Vercel static default; harmless for public pages).

## 6. Caching / delivery
- HTML: `public, max-age=0, must-revalidate`, x-vercel-cache HIT, Age 40,500-42,500 s (about 11-12 h), ETag present. Correct for ISR/static HTML on Vercel.
- /_next/static/*: `public,max-age=31536000,immutable` (good). /icon.png: immutable 1 yr (good).
- Not cached long: /images/clinic-interior.jpg, /_next/image output, /og/*.png, /favicon.ico, /llms.txt, /brand/*: all `max-age=0, must-revalidate`. Low.
- Compression: brotli on CSS; home HTML 119,975 B raw, 15,634 B transferred with Accept-Encoding. TTFB about 0.18 s (single sample from my location, edge HIT). HTTP/2-3: unmeasured (local curl lacks h2).
- Other root files: /favicon.ico 200, /icon.png 200, /apple-icon.png 200, /llms.txt 200 (3.2 KB), /manifest.webmanifest 404 (none declared; Low/info).

## 7. Mobile signals
`<meta name="viewport" content="width=device-width, initial-scale=1">` on all 7; no maximum-scale / user-scalable lock. `<html lang="en">`. Single `<main>`, "Skip to main content" link. 9 `tel:+19162365800` links on home (click-to-call). No iframes (maps are outbound links, not embeds). Responsive hero uses `sizes="(min-width: 1024px) 560px, 100vw"`. Tap-target sizes, font sizes, CLS: unmeasured. Google mobile-friendly test: unmeasured.

## 8. JavaScript rendering
Next.js App Router, server-rendered. All H1/H2/H3, body text, links, canonical, meta and JSON-LD are present in the raw HTML (no JS needed). 17-18 script tags per page (framework chunks). INP/LCP/CLS: unmeasured.

## 9. Images (every `<img>` in raw HTML)
Only ONE `<img>` exists across the 7 pages.
| Page | src | alt | bytes | notes |
|---|---|---|---|---|
| / | /_next/image?url=/images/clinic-interior.jpg&w=3840&q=75 (srcset 640-3840 w) | "" (empty) | source JPG 67,611 B, 725x533 px; AVIF served 8,931 B @640w, 10,351 B @828w/1920w/3840w | fetchpriority=high, preloaded, no width/height attrs seen in the tag |
| /new-patients, /family-physician-elk-grove, /dr-paramjit-panesar-md, /insurance-accepted, /contact, /faq | none | n/a | n/a | 0 `<img>` |

- I viewed the file: it is a stock collage (lab bench with microscope and DNA screen, plus a blurred hospital corridor), not Apollo Physicians' clinic. It is named `clinic-interior.jpg`. Empty alt is technically right for a decorative image, but the filename/preload implies it represents the clinic; consider replacing it with a real photo or removing it. Confirmed: there are no real clinic or physician photos anywhere on the site.
- Source is only 725 px wide, so the 3840w srcset candidate is upscaled (all of 828/1920/3840 return the same 10,351 B AVIF). Harmless but pointless.
- Brand/social images: /brand/logo.png 6,003 B, /brand/share-card.png 46,268 B (JSON-LD image), og images PNG: home 310,851 B, new-patients 314,912 B, elk-grove 310,025 B, panesar 308,444 B, insurance 314,596 B, contact 308,721 B, faq 309,904 B. About 310 KB each; fine for crawlers, but could be recompressed (Low). Inline SVG icons: 12-33 per page.

## 10. Internal links (anchors in raw HTML)
| Page | total `<a href>` | internal | unique internal targets | external | tel/mailto/#|
|---|---|---|---|---|---|
| / | 46 | 31 | 7 | 4 (2 Google Maps URLs unique) | 11 |
| /new-patients | 43 | 32 | 7 | 2 | 9 |
| /family-physician-elk-grove | 43 | 28 | 7 | 3 | 12 |
| /dr-paramjit-panesar-md | 45 | 29 | 7 | 7 (incl. Doximity, WebMD profiles) | 9 |
| /insurance-accepted | 41 | 28 | 7 | 3 | 10 |
| /contact | 43 | 28 | 7 | 4 | 11 |
| /faq | 43 | 29 | 7 | 5 | 9 |
Every page links to all 7 pages (full mesh, 7 unique internal targets, no orphans). All internal hrefs return 200. No broken internal links. The 404 template links to the same 7 pages. Raw per-page output: scratchpad\an.out.

## 11. Custom 404
`/this-page-does-not-exist-xyz` and `/a/b/c`: HTTP 404 (real status, not soft 404), `<title>Page not found</title>`, H1 "Page not found", `noindex`, links back to all 7 pages, 28 KB. Defect: the template emits two robots meta tags (`noindex` and `noindex, follow`); harmless but redundant (Low).

## 12. Staging / old hosts
- apollophysicians.riolabz.com: still resolves. CNAME > servernew.riolabz.com > 148.66.154.104 (Apache, cPanel). HTTP and HTTPS both return 302 to `/cgi-sys/suspendedpage.cgi` (cPanel "suspended account" page). No site content is served, but the DNS record is dangling.
- www.apollophysicians.riolabz.com: resolves to Cloudflare IPs (104.21.88.14, 172.67.171.239); HTTPS handshake fails (SEC_E_ILLEGAL_MESSAGE), HTTP returns 302 to the same suspended page.
- staging./dev./test./preview.apollophysicians.com: NXDOMAIN (do not exist).
- Whether the riolabz host was ever indexed by Google: unmeasured (needs `site:` search / GSC).

## Prioritised issues
### Critical
None.
### High
None.
### Medium
1. riolabz.com subdomain (apollophysicians.riolabz.com and www.) still resolves to a suspended cPanel page. Fix: delete both DNS records at the riolabz.com DNS (or point them to a 301 to https://www.apollophysicians.com/ if the host had ever been indexed). Check GSC for any indexed URLs on that host.
2. The only image on the site is a stock lab/hospital-corridor collage filed as `clinic-interior.jpg`, with `alt=""`. Fix: replace with a real photo of the clinic when available (alt such as "Reception at Apollo Physicians, 8191 Timberlake Way") or remove it; do not caption it as the clinic. Real clinic/physician photos are absent site-wide.
### Low
3. Sitemap lastmod: only 2 distinct values; 5 URLs share 2026-11-06. Fix: derive from per-page content-change date (git commit date per route or a `lastUpdated` constant per page), update only when content changes.
4. http://apollophysicians.com is a 2-hop chain (http apex > https apex > https www). Inherent to Vercel; optional: no action needed, as HSTS covers repeat visits.
5. Static public assets (/images, /og, /brand, /favicon.ico) send `max-age=0, must-revalidate`. Fix: `headers()` in next.config with `Cache-Control: public, max-age=31536000, immutable` for /images, /og, /brand (rename files if content changes) or at least `max-age=86400`.
6. Security headers: add Content-Security-Policy (report-only first), COOP `same-origin`, HSTS `includeSubDomains; preload` after confirming all subdomains are HTTPS.
7. 404 template emits duplicate robots meta (`noindex` + `noindex, follow`). Fix: keep one.
8. OG PNGs about 310 KB each; recompress to approx 80-100 KB (or JPG) and add alt text via og:image:alt.
9. No web app manifest (404). Optional.
10. Generic repeated H2 "Quick facts" and footer H2 "Apollo Physicians contact details and pages" on every page; consider H3/aside or unique wording.
11. FAQPage JSON-LD on every page: no rich-result eligibility expected for a clinic site; harmless, optional to trim.

## Unmeasured
Core Web Vitals (LCP, INP, CLS) - PageSpeed quota exhausted 11 Nov; HTTP/2/3 negotiation; tap-target size and font legibility; title pixel width; real per-page lastmod accuracy; indexation status/coverage in Google/Bing; crawl depth/orphans beyond the 7 known URLs; backlinks; structured-data validation in Google's tool; whether riolabz host was indexed.
