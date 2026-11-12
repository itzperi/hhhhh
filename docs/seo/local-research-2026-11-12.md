# Apollo Physicians: local competitors, listing audit, link gaps, rank check

Research date: 2026-11-12. Method: WebSearch (standard) plus curl of public listing pages. No Google Maps rank data, no paid APIs. Distances are approximate and unverified (not computed from coordinates). Anything not directly read from a page is marked "unverified". Directory data is third-party and often stale; the competitor payment segments below are what the directories show, not what the clinic confirmed.

Apollo facts used as the reference (from the project's confirmed list): 8191 Timberlake Way, Suite 200, Sacramento CA 95823; phone (916) 236-5800; fax 916-266-7473 (never a phone); Dr. Paramjit Panesar. Dr. Takhar's practice is Suite 400 of the same building.

---

## A1. Listing audit: how Apollo appears on indexed directories

| Source | Exists? | Address / suite | Phone | Other findings | Verdict |
|---|---|---|---|---|---|
| Tebra practice page (tebra.com/care/practice/apollo-physicians-707457) | Yes (fetched) | 8191 Timberlake Way Suite 200 | (916) 236-5800 | Provider: Panesar only. Services list includes Body Sculpting, Hydrafacial, Injectables, Laser Hair Removal, Laser Resurfacing, Medical Weight Loss, Mental Health, Immigration Exams. Insurances list includes Hill Physicians Medical Group, Sutter Medical Group, Brand New Day, Imperial, HealthNet, Aetna, Cigna, Medicare. Claims "24/7 phone support" and "same-day/next-day". No hours shown. | NAP correct. Content wrong or unverified: cosmetic services, Hill and Sutter as "insurances", 24/7 phone line. Needs owner edit. |
| WebMD practice page ("Apollo Physicians Medical Group") | Yes (fetched) | Ste 200 | (916) 236-5800 | Hours Mon-Fri 8:30-5:00, Sat/Sun closed (conflicts with confirmed Mon-Fri 8:30-5:30 + Sat 9-2). Lists 5 "physicians": Dhaliwal (family), Cara Grant NP, Rajan Hundal (cardiology), Panesar, Jaspreet Tiwana (internal medicine). Medicare and Medicaid "Yes", accepting new patients "Yes". Long plan list (Molina, Health Net, Humana, Kaiser, Wellcare, Western Health Advantage etc.). 6 reviews for Panesar. | NAP correct. WRONG: hours, extra providers (unverified whether they ever worked there; a cardiologist is implausible), plan list over-claims. |
| Vitals (same Wible/WebMD data) | Yes (fetched) | Ste 200 | (916) 236-5800 | Same hours (Sat closed), same 5 providers, Panesar 3.2 stars / 6 ratings, Dhaliwal 3.9. | Same errors as WebMD. |
| MapQuest (phoenix.aws.mapquest.com/.../apollo-physicians-369772286) | Yes (fetched) | "#200" | +1 916 236 5800 (schema) | Hours Mon-Fri 8:30-5:00. Shows Yelp reviews; one cited rating 3.0 from 29 reviews (via search snippet; unverified directly). A second MapQuest record exists: apollo-physicians-380626633 (not fetched, possible duplicate). | NAP correct. Hours wrong (Sat missing, close 5:00). Possible duplicate record. |
| Birdeye (reviews.birdeye.com/apollo-physicians-155731761051030) | Yes (fetched) | "#200, Ste 200" (duplicated suite text) | Not extracted | Title says 117 reviews. Page was Birdeye-hosted, so the practice or a vendor has a Birdeye account. | Exists with a real review count. Confirm the owner controls it. |
| Superpages (cars.superpages.com/sacramento-ca/bpp/apollo-physicians-531080435) | Exists (indexed) but fetch returned 403 | unverified | Search snippet shows 916-655-9883 | That phone is NOT the office number. A separate Superpages entry lists Hayatullah Niazi PA at Suite 400. | Wrong phone (per snippet, unverified). Needs claim and fix. |
| apollophysicians.riolabz.com (agency staging site, many ?p= pages indexed) | Yes, in Google index | Suite 400 | (916) 824-3278 | Both suite and phone are wrong. Describes Panesar bio and "5.0 on Yelp" claim (conflicts with 3.0). TLS certificate is now EXPIRED (curl: SEC_E_CERT_EXPIRED), host 148.66.154.104. | HIGH PRIORITY: duplicate site with the wrong suite and phone, still indexed. Needs takedown or 301 to the real site by whoever controls riolabz.com. |
| Hill Physicians finder (hillphysicians.com) | Panesar/Apollo NOT found in search results (unverified, finder returns 503 to curl) | Dr. Takhar is at 8191 Timberlake Way **Ste 400**, practice name "SNAR", 916-688-8888 | n/a | Risk: Hill/Takhar "8191 Timberlake" results could be confused with Apollo. | Apollo not shown. Confirm manually in the finder. |
| Vivant Health finder (rl.vivanthealth.com/ReportLibV2/#/providersearch) | Unverified (JS app, not queryable via curl) | unverified | unverified | | Search manually. |
| Nivano finder (nivanophysicians.com/find-a-provider/) | Unverified (page loads, no Panesar/Apollo text in static HTML; directory is probably JS) | unverified | unverified | | Search manually. |
| Zocdoc | No Apollo/Panesar profile found in search (unverified) | | | | Probably not listed. |
| Healthgrades | No profile found in search (unverified; Healthgrades often auto-creates profiles) | | | | Check manually. |
| Yelp | Exists (reviews are syndicated on MapQuest/Tebra); direct fetch 403 | unverified | unverified | Rating conflict: ~3.0 / 29 reviews (third party) versus "5.0" shown on the staging site. | Claim the page, verify NAP. Do not publish the 5.0 figure. |
| Everyday Health, Medifind, Doximity, Locabee, Medicared For All | Panesar present on several (search results) | Ste 200 on those seen | 236-5800 on Everyday Health | Hospital affiliations conflict (Methodist vs Sutter Sacramento/Roseville). | Minor; fix when claiming. |
| Medicare Care Compare | Not found in search (unverified). Care Compare is populated from PECOS. | | | | Search Care Compare by name + 95823; if wrong, correct in PECOS. |

Key take-aways for the audit:
1. Phone (916) 236-5800 and Suite 200 are consistent on Tebra, WebMD, Vitals, MapQuest. Good.
2. Wrong or risky: Superpages phone 916-655-9883 (snippet), riolabz staging (Suite 400 / 916-824-3278), WebMD/Vitals/MapQuest hours (no Saturday, 5:00 close), WebMD/Vitals extra providers, Tebra service list and "Hill/Sutter" insurance claims.
3. Suite 400 contamination comes from the staging site and the Superpages Niazi entry, and Dr. Takhar's Hill/BlueHive listings.

---

## A2. Competitors near 8191 Timberlake Way (South Sacramento, 95823 / 95828), approx. within 3 miles

Segments shown are what directories list. "Unverified" = not stated in results.

| # | Name | Address | Phone | Segments advertised (per directories) | Type |
|---|---|---|---|---|---|
| 1 | Dr. Takhar's Family Medicine & Urgent Care (Hill Physicians profile "SNAR") | 8191 Timberlake Way **Ste 400** | 916-688-8888 | Hill Physicians; Medi-Cal (Health Net, Molina); Medicare Advantage (Aetna, Anthem, Central Health, Health Net, SCAN, UHC); commercial; immigration/DOT physicals; Punjabi, Hindi, Urdu, Farsi, Pashto. Same building as Apollo: the closest direct competitor. | Private, independent |
| 2 | Associated Family Physicians Inc | 8110 Timberlake Way (also 8120 Timberlake Way Ste 202 per one listing) | (916) 689-4111 | Medicare and Medicaid "yes", accepting new patients (WebMD). Hill Physicians profile exists. Medi-Cal / MA plan names unverified. | Private |
| 3 | Mercy Medical Group Timberlake (Dignity/CommonSpirit, "South Sacramento primary & specialty care") | 8120 Timberlake Way, Ste 101/102/107 | (916) 681-6000 (a Yelp reviewer in Oct 2025 said it did not connect) | Medicare, Medicaid; accepting new patients varies by doctor. Dignity/Mercy medical group. | Health-system group |
| 4 | Timberlake Family Practice | 8120 Timberlake Way Ste 101 (NPI); second office 9381 E Stockton Blvd Ste 216 (Elk Grove 95624) | 916-691-5855 | Hill Physicians: Dr. Manuel Sabin lists Medi-Cal, SCAN, Western Health Advantage; Zocdoc shows Medicare in-network at 8120 Timberlake (conflicting Medi-Cal label). | Private |
| 5 | Kaiser Permanente South Sacramento Medical Center (Latino Health Center, family medicine) | 6600 Bruceville Rd | 916-688-2000 (main) | Members only (not a peer for Medi-Cal/Medicare open networks, except KP Medi-Cal/MA members). | Integrated system |
| 6 | Nhan Tam Med Clinic (Dr. Kevin Vu) | 6830 Stockton Blvd Ste 155 (also 6966 65th St per Hill) | 916-476-3008 (NPI registry; unverified) | Hill Physicians; MA (SCAN, UHC, Western Health Advantage); accepting new patients. Medi-Cal not shown. Registry lists internal medicine. | Private, Vietnamese-community |
| 7 | Dr. Enayatullah Niazi (Hill Physicians profile) | 7275 East Southgate Dr Ste 102 | unverified | Medi-Cal, accepting new patients, Mon-Fri 8-5. Medicare not stated. | Private |
| 8 | Mercy Family Health Center (Dr. Richard Gray etc.) | 7601 Hospital Dr, Ste 103 | unverified | Medicare accepted per WebMD; Gray listed as not accepting new patients. | Health-system group |
| 9 | Sacramento Family Medical Center / Clinic | 4241 Florin Rd Ste 40 | (916) 391-2229 (better supported); one directory 916-427-1227 | Medicare accepted (WebMD). Medi-Cal unverified. Roughly 4 to 5 miles, outside the 3-mile ring. | Private |
| 10 | WellSpace Health South Valley Community Health Center (**FQHC**) | 8233 E Stockton Blvd Ste D (95828) | unverified | Medi-Cal, sliding scale, uninsured welcome (typical FQHC). Not an Apollo peer. | FQHC |
| 11 | WellSpace Health Florin Community Health Center (**FQHC**) | 4241 Florin Rd Ste 30 | 916-931-2229 | Primary care, sliding scale, uninsured welcome. Not a peer. | FQHC |
| 12 | Sacramento Native American Health Center, Florin Rd site (**FQHC**) | 3800 Florin Rd | unverified | Medical, dental, behavioral; on-site Medi-Cal enrolment; welcomes everyone. Not a peer. | FQHC |
| 13 | Elica Health Centers (**FQHC**) | 6339 Mack Rd (per one listing; unverified) | unverified | Community health centre. Not a peer. | FQHC |
| 14 | Sacramento County Health Center (**FQHC**) | Broadway, Sacramento (not near) | unverified | Low-income county primary care. Not near; context only. | FQHC / county |

Peer set (private practices pursuing Medi-Cal and Medicare): #1, #2, #4, #6, #7, #9, and Mercy #3/#8. FQHCs (#10 to #14) compete for Medi-Cal-only and uninsured patients but are not like-for-like.

## A3. Competitors near central Elk Grove (95758 / 95624)

| # | Name | Address | Phone | Segments advertised | Type |
|---|---|---|---|---|---|
| 1 | UC Davis Health Elk Grove Clinic (family medicine) | 8110 Laguna Blvd | 916-683-3955 | Accepting new patients (third party); Medi-Cal/Medicare not confirmed. | Academic system |
| 2 | Sutter Medical Plaza Elk Grove / Dr. Vijaya Reddy | 8170 Laguna Blvd; 9261 Laguna Springs Dr Ste 100 | 916-688-1212 (Reddy) | Sutter Independent Physicians; Medicare accepted at Plaza (WebMD); Hindi spoken. | Health-system / IPA |
| 3 | Dignity Health Mercy Medical Group Big Horn | 9394 Big Horn Blvd | (916) 691-8500 | Medicare and Medicaid yes (WebMD). | Health-system group |
| 4 | Dignity Health Express Primary Care | 8259 Laguna Blvd Ste 100 | unverified | Same-day walk-in style, later weekday hours. Zocdoc labelled out-of-network. | Health-system |
| 5 | Kaiser Permanente Elk Grove Promenade / Big Horn | 10305 Promenade Pkwy | unverified | Members only. | Integrated system |
| 6 | Timberlake Family Practice (Elk Grove office) | 9381 E Stockton Blvd Ste 216 (95624) | 916-691-5855 | Medi-Cal, SCAN, WHA (Hill profile). | Private |
| 7 | Chirag Patel MD | 9045 Bruceville Rd Ste 100 (95758) | (916) 479-9110 | English and Spanish; Medi-Cal not shown. | Private |
| 8 | All Inclusive Medical Services Urgent Care (Dr. Sunil Dhir, internal medicine) | 7811 Laguna Blvd Ste 161 | unverified | Medi-Cal; Hindi and Punjabi. | Private urgent care |
| 9 | Sacramento Family Medical Clinic (Elk Grove) | 9717 Elk Grove-Florin Rd | (916) 714-7400 | Unverified. | Private |
| 10 | Dr. Bhaskara Reddy | 8170 Laguna Blvd Ste 101 | unverified | Medicaid plan affiliations listed. | Private |

No FQHC was identified within central Elk Grove in the results (unverified: WellSpace South Valley on E Stockton Blvd is the closest FQHC seen). Elk Grove is crowded with system-owned groups (UC Davis, Sutter, Dignity, Kaiser); independents with Punjabi/Hindi/Urdu capability (Dhir, Takhar) are rare. Apollo has no Elk Grove office, so Elk Grove content must say "patients from Elk Grove come to our South Sacramento office".

---

## B. Link and citation opportunities (legitimate only)

All of these are listings, directories, claims or community participation. No paid links, no swaps, no networks. "Owner" means someone at the practice with the credentials.

### B1. Plan and medical-group provider directories (highest value, also fix NAP)

| Opportunity | Where | What it needs | Who at the practice |
|---|---|---|---|
| Medicare Care Compare / PECOS | Search at medicare.gov/care-compare. Corrections via PECOS (pecos.cms.hhs.gov) or CMS-855I/855B. FCSO guide: medicare.fcso.com/enrollment/how-update-missing-information-physician-directory-medicaregov | NPI, I&A/PECOS login, correct practice location and group affiliation. Changes take about 2 to 4 months to appear. | Dr. Panesar (or the credentialing person with his PECOS access) |
| Anthem Blue Cross CA directory | Availity Essentials, Provider Data Management (providernews.anthem.com/california/articles/review-your-online-provider-directory-information-20846); form: anthem.com/ca/provider/provider-maintenance-form/ | Availity login, TIN, NPI; 90-day attestation | Office manager or credentialing contact |
| Health Net, Molina, Blue Shield, Aetna, UHC directories | Provider portals (Health Net and Molina participate in the Blue Shield "Symphony" attestation hub, unverified); otherwise contact Provider Relations | Contract status, portal login; the practice must actually be contracted | Credentialing contact |
| Hill Physicians | Find a Doctor: hillphysicians.com/doctors ; Providers: hillphysicians.com/providers | Only if Apollo is contracted with Hill (Tebra lists Hill, which is unverified). If contracted, confirm the profile address is Ste 200, not 400. Dr. Takhar's profile is Ste 400. | Dr. Panesar / credentialing; confirm Hill contract first |
| Sutter (Find a Doctor / Sutter Independent Physicians) | sutterhealth.org/find-doctor | Only if affiliated; affiliation process not found in results (unverified). Tebra lists Sutter Medical Group as an insurance (suspicious). | Dr. Panesar; verify before touching |
| Vivant Health (formerly River City Medical Group) | Provider search: rl.vivanthealth.com/ReportLibV2/#/providersearch ; Join: vivanthealth.com/for-providers/#networkform ; (916) 228-4300, 7311 Greenhaven Dr | The form is a contracting inquiry, only relevant if Apollo wants Vivant Medi-Cal/Medicare membership; Vivant has a provider portal for existing members. | Dr. Panesar / practice manager (Vivant relationship status unverified) |
| Nivano Physicians | Finder: nivanophysicians.com/find-a-provider/ ; For Providers: nivanophysicians.com/provider-information-and-resources/ ; credentialing@nivanophysicians.com ; (916) 407-2000 | Practice confirmed Nivano participation per project notes; request that the directory entry shows Suite 200, phone, hours, languages. | Office manager |
| USCIS Civil Surgeon locator | uscis.gov/tools/designated-civil-surgeons (locator); designation via Form I-910 | Only if Dr. Panesar is designated. Immigration is a HELD page, so only claim after confirmation. Requires CA licence and CDC Technical Instructions compliance. | Dr. Panesar |

### B2. Directory claims and corrections (NAP clean-up; each is a citation)

| Opportunity | Where | What it needs | Who |
|---|---|---|---|
| Google Business Profile | business.google.com | Ownership verification; website field currently points to parked drparamjitpanesar.com per project notes | Owner, with verification code |
| Tebra practice page | tebra.com/care/practice/apollo-physicians-707457 | Claim via "Report inaccurate information" or Tebra provider support; remove cosmetic services, Hill/Sutter insurance claims, 24/7 claim; add hours | Owner |
| WebMD / Vitals | "Claim Your Practice" at doctor.webmd.com / vitals.com (same Wible/WebMD data) | Fix Saturday 9-2, 5:30 close, remove providers who do not work there | Owner |
| Yelp for Business | biz.yelp.com | Verify; respond to reviews; fix hours | Owner |
| Birdeye | reviews.birdeye.com/apollo-physicians-155731761051030 | Confirm who owns the account | Owner |
| Superpages / Thryv | Claim listing (Superpages is Thryv) | Replace phone 916-655-9883 with 916-236-5800 (from snippet; verify) | Owner |
| MapQuest | Update via listing owner tools; check the duplicate record 380626633 | Fix hours, remove duplicate | Owner |
| Zocdoc | zocdoc.com/practice (apply as provider) | Credentialing; enables insurance filter pages (Medi-Cal/Medicare in-network) | Dr. Panesar |
| Healthgrades | healthgrades.com "claim your profile" | NPI verification; correct address and Suite 200 | Dr. Panesar |
| Apple Business Connect, Bing Places | businessconnect.apple.com ; bingplaces.com | Verification | Owner |
| Doximity, Everyday Health, Medifind | doximity.com (profile claim) | Correct hospital affiliations | Dr. Panesar |
| riolabz.com staging | Contact whoever controls riolabz.com | Take down or 301 redirect apollophysicians.riolabz.com to the real domain; request Google URL removal after takedown | Owner contacts the developer |

### B3. Local organisations (earned, relevance links; each needs a human relationship)

| Opportunity | Where found | What it needs | Who |
|---|---|---|---|
| Sacramento Asian Pacific Chamber, "Health and Wellness" directory | sacasiancc.org/membership/sacc-directory/health-and-wellness/ | Paid membership (price not found, unverified). Directory category exists. | Practice manager |
| Capital Black Chamber member directory, health-care category | members.sacblackchamber.org/directory | Membership (cost unverified) | Practice manager |
| Elk Grove Chamber | chamberorganizer.com/ElkGroveChamber | Membership. Not helpful if it implies an Elk Grove office, so use "serving Elk Grove patients" wording only if they allow it. Unverified fit. | Practice manager |
| Greater Sacramento Hispanic Chamber, Sacramento Metro Chamber | listed at uschamber.com/co/chambers/california/sacramento | Membership; no healthcare tier information found (unverified) | Practice manager |
| Senior Center of Elk Grove: Senior Health and Resource Fair (listed 2026-09-17 10:00 to 2:00; next one is annual) | via Senior Center of Elk Grove | Exhibitor registration; the fair draws in-person leads and resource-page links | Office manager and Dr. Panesar |
| Sacramento County Public Health provider resources / maternal-child resource guide | dhs.saccounty.gov/us/en/public-health/provider-resources.html | No open listing form found (unverified); contact county to ask about the resource guide's adult primary-care section | Office manager |
| Sacramento 211 (senior resource guide, community clinics) | 211 Sacramento (211sacramento.org, unverified URL) | Request inclusion as a Medi-Cal/Medicare-accepting practice; 211 prefers non-profits, so fit is unverified | Office manager |
| Gurdwaras, temples, mosques, Punjabi, Hindi, Filipino, Hmong, Latino community organisations | No Sacramento-area gurdwara health-partner page found in results (unverified). Jakara Movement (Fresno) and 5 Rivers Heart Association (Roseville) run Sikh community health outreach. | Relationship-based: offer a free health talk (diabetes, hypertension) in the language the physician speaks. The result may be a link from the host's events or resources page. Language claims must come from confirmations (unverified for Apollo). | Dr. Panesar |
| Local newspapers (Elk Grove Citizen, Sacramento Observer, Sacramento Bee, Punjabi-language weeklies) | No evidence in search results of accepting physician listings (unverified) | Pitch a local-health story or expert quote; no paid placements | Dr. Panesar / office manager |
| Community-clinic referral lists (WellSpace, SNAHC, Sacramento Community Clinics) | clinic websites | Patients who need a private doctor may be referred, but FQHCs seldom link to private practices; low-probability, so ask by relationship only | Office manager |

Priority order (effort versus value): GBP and Care Compare/PECOS, then Tebra/WebMD/Vitals/Superpages/MapQuest/Yelp fixes, then riolabz takedown, then plan directories (Anthem, Health Net, Molina, Hill, Nivano, Vivant), then Zocdoc/Healthgrades, then chamber and community events.

---

## C. Five-point manual rank check (Google Maps)

Use a phone, location services ON, in a private browsing/incognito session, standing at (or setting the pin to) each point. Record on a day with normal traffic; repeat monthly on the same day and time. Use the Google Maps app, searching exactly as typed (including quotation marks excluded).

Points:
1. Office: 8191 Timberlake Way, Sacramento, CA 95823
2. Valley Hi: Valley Hi Dr / Valley Hi Shopping Center area (type "Valley Hi Dr, Sacramento, CA 95823")
3. Laguna: Laguna Blvd near Bruceville Rd, Elk Grove, CA 95758
4. Elk Grove Blvd at Hwy 99: Elk Grove Blvd and CA-99, Elk Grove, CA 95758
5. Bruceville Rd: Bruceville Rd and Elk Grove Blvd, Elk Grove, CA 95758 (use the Bruceville/Elk Grove Blvd intersection; adjust if you prefer Bruceville near Cosumnes River College, but keep it fixed)

At each point, search these in order (type each; do not tap suggestions):
1. `family doctor near me`
2. `primary care doctor`
3. `doctor accepting Medi-Cal`
4. `doctor accepting Medicare`
5. `Apollo Physicians`

Optional extras once per point: `doctor accepting new patients`, `doctor that takes Nivano` (record only if results appear).

Record for each search at each point (put in a sheet with date, time, device, point):
- Apollo's rank position in the first 20 Maps results (blank if absent). Note the position in the 3-pack (1 to 3) if it appears.
- Whether Apollo appears in the "Map Pack" or only in the scrolled list.
- The name, rank and review count of the top 3 results (so you can see who beats Apollo).
- Apollo's shown rating, review count, hours text, phone text and address (check Suite 200 and phone 916-236-5800; a mismatch is itself a finding).
- Whether the listing shows the "Website" button and which URL.
- The distance Maps shows between the point and Apollo.
- For `Apollo Physicians` brand search: whether the Knowledge panel shows the right address, hours, phone and whether Dr. Takhar's practice shows in related results.

Expected pattern (hypothesis, unverified): Apollo should rank best at point 1 (distance), weak at points 3 to 5 (Elk Grove system-owned groups and Kaiser dominate; Apollo has no Elk Grove office), so Elk Grove ranking should be treated as a stretch.

---

## Gaps I could not verify
- Whether Apollo is listed in Hill Physicians, Vivant, Nivano, Zocdoc, Healthgrades finders (JS apps or search silence).
- Superpages phone 916-655-9883 (only from a search snippet; page returned 403).
- Yelp rating and review count (only third-party snippet: 3.0 from 29).
- Medi-Cal or MA plan names for most competitors (directory data).
- Distances (approximate), chamber membership prices, any open county listing form.
- Whether Google still serves the riolabz staging pages (search results still returned ?p=15, ?p=31, ?p=110, ?p=135, ?p=136, ?p=127 as of today, although the certificate is expired).
