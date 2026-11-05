# Submitting the site to Google and Bing

Step 6 asks for the sitemap to be submitted to Google Search Console and Bing Webmaster Tools. That needs the practice's own accounts, so it cannot be done from this repo. Do it right after the next deploy. About 15 minutes in total.

## Before you start

- Deploy first, so `robots.txt`, `sitemap.xml` and the legacy redirects are live. Check https://www.apollophysicians.com/sitemap.xml lists three URLs.
- Use a Google account the practice owns (not a vendor's), and add a second owner as a backup.

## Google Search Console

1. Add a **Domain** property for `apollophysicians.com`. Verification is a DNS TXT record. The domain's DNS is at IONOS (nameservers `ns1055.ui-dns.de` and others). Add only the TXT record and **leave the MX and SPF records alone**, because they run the practice's email.
2. Sitemaps, then enter `sitemap.xml`, then Submit. Status should read "Success" with 3 pages discovered.
3. URL Inspection: paste each of the three URLs and choose Request Indexing.
4. Settings, then Crawl stats, or Indexing, then robots.txt: confirm Google fetched the new `robots.txt` (no `/_next/` block).
5. Pages report after about a week: check "Not found (404)" and "Page with redirect". This tells you which legacy URLs Google actually knew, so the redirect map can be tightened. Send me that list.
6. Experience, then Core Web Vitals, once there is enough traffic. This is the field data the audit could not get.

## Bing Webmaster Tools

1. Sign in at bing.com/webmasters and use Import from Google Search Console. It copies the property and the sitemap.
2. Confirm the sitemap shows as processed.
3. Why Bing matters: it feeds Microsoft Copilot. Other assistants use their own or other providers' indexes, which is why nothing here targets a single AI product.

## Other quick checks after the deploy

- https://www.apollophysicians.com/llms.txt loads, and contains no insurance, price or NPI.
- `curl -I https://www.apollophysicians.com/blog` returns `410`; `/about` returns `301` to `/`.
- Rich Results Test and validator.schema.org on the three live URLs (see `docs/seo/schema-validation.md`).
- `drparamjitpanesar.com` still shows a Hostinger parked page until its DNS points at the Vercel project (confirmations item 34).
