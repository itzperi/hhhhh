# Search Console and Bing: exact steps for after the merge

12 Nov 2026. For whoever has the practice's Google and Microsoft logins. **Nothing here has been done.** Start only after the PR is merged, Vercel has deployed, and the check in step 0 passes. An assistant cannot sign in to these accounts or enter credentials, so a person must do every step.

## 0. Check the deploy first (2 minutes, no login)

Open each address in a browser. All should open a real page, not "Page not found":

- https://www.apollophysicians.com/medicare-doctor-sacramento
- https://www.apollophysicians.com/medi-cal-doctor-sacramento
- https://www.apollophysicians.com/sitemap.xml should list **15** addresses (it listed 7 before).

If a page is still "not found", the deploy has not finished or the review date was not merged. Wait a few minutes and reload; if it persists, tell your developer.

## 1. Google Search Console

Open https://search.google.com/search-console and sign in with the account that owns the site.

1. **Check the property.** In the property picker, use `https://www.apollophysicians.com/` (URL prefix) or the Domain property `apollophysicians.com`. A Domain property covers www, non-www and http, and needs a DNS record to verify. If no property exists, add one: choose Domain if you can edit DNS, otherwise URL prefix with the HTML-tag or file method. Verification is the one step you cannot skip.
2. **Submit the sitemap.** Left menu, Sitemaps. In "Add a new sitemap" type `sitemap.xml`, then Submit. The status should change to "Success" and show 15 discovered pages. If it already shows 7, resubmit it.
3. **Request indexing, one page at a time.** At the top, paste the full address into the search bar (URL Inspection), wait for the result, then click **Request indexing**. Google limits how many you can request each day, so if it refuses, continue tomorrow. Do them in this order, most valuable first:
   1. https://www.apollophysicians.com/medi-cal-doctor-sacramento
   2. https://www.apollophysicians.com/medicare-doctor-sacramento
   3. https://www.apollophysicians.com/nivano-physicians-doctor-sacramento
   4. https://www.apollophysicians.com/doctor-without-insurance-sacramento
   5. https://www.apollophysicians.com/insurance-accepted (retitled)
   6. https://www.apollophysicians.com/family-physician-elk-grove (new links)
   7. https://www.apollophysicians.com/same-day-appointments-sacramento
   8. https://www.apollophysicians.com/annual-physical-sacramento
   9. https://www.apollophysicians.com/immigration-medical-exam-sacramento
   10. https://www.apollophysicians.com/services
4. **Remove the old staging copy.** Search Google for `site:apollophysicians.riolabz.com`. If results appear, ask whoever controls that host to delete its DNS records first. Then, in a Domain property for `riolabz.com` (needs its DNS), go to Removals, New request, "Remove all URLs with this prefix", and enter `https://apollophysicians.riolabz.com/`. These pages show "Suite 400" and the phone 916-824-3278, which are wrong.
5. **Note the starting point.** Open Performance and write down today's total clicks and impressions (last 28 days), so day-30 and day-60 numbers have something to be compared with.

## 2. Bing Webmaster Tools

Open https://www.bing.com/webmasters and sign in with a Microsoft account.

1. **Import from Google.** Choose "Import your sites from GSC", sign in to Google, and approve. This copies the site and its verification in one step. (If you prefer, add the site by hand and verify with the same method.)
2. **Submit the sitemap.** Sitemaps, Submit sitemap, enter `https://www.apollophysicians.com/sitemap.xml`.
3. **Check URLs.** URL Submission, enter the same ten addresses. Bing also reads from the sitemap, so this speeds it up rather than being required.
4. **Business listings.** Claim **Bing Places for Business** and **Apple Business Connect** with the same details used everywhere: Apollo Physicians, 8191 Timberlake Way, Suite 200, Sacramento, CA 95823, 916-236-5800, https://www.apollophysicians.com, hours Monday to Friday 8:30 a.m. to 5:30 p.m. and Saturday 9:00 a.m. to 2:00 p.m. Full field-by-field text is in `offsite-2026-11-12.md`. Bing Places feeds Copilot and several AI assistants, so a correct listing helps AI answers.

## 3. What to expect, and when to worry

| When | Normal | If not |
|---|---|---|
| Same day | URL Inspection says "URL is not on Google" or "Crawled, currently not indexed" until indexing completes; "Request indexing" queues it | If it says "Blocked by robots.txt" or "noindex", stop and tell your developer. Neither should appear |
| 2 to 7 days | New pages start to appear under Pages, "Indexed" | "Discovered, currently not indexed" for more than two weeks: request again, then check that internal links point to the page |
| 2 to 6 weeks | First impressions for the new pages in Performance | No impressions after six weeks: check the Pages report for the page's status before changing the page |
| 3 to 6 months | Rankings settle. Directory sites will still lead many broad searches | Judge each keyword against its goal in `keyword-plan-sacramento-elk-grove-2026-11-12.md`, not against #1 |

## 4. IndexNow (optional)

IndexNow pings Bing and some other engines when pages change. The site has no IndexNow key file today, so skip it. If you want it later, ask the developer to add one; it is not needed to get indexed.

## 5. Record what you did

Write the date and what you did in `client-confirmations.md` or a note for the practice: who verified the property, the date the sitemap was submitted, which pages were requested, and the starting Performance numbers. The measurement plan (`measure-plan-2026-11-12.md`) starts counting from that date.
