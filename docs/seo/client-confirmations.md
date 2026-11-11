# Apollo Physicians: client confirmations

Created 5 Nov 2026 (Step 0). **Rule: copy, schema and llms.txt may use only items marked Confirmed.** Anything marked Not confirmed is omitted from the site until the client answers.

How to use: the practice owner or Dr. Panesar fills in the "Client answer" column and the "Confirmed by / date" column. Then change Status to Confirmed. Nothing is marked Confirmed on the basis of a directory listing or a third-party site.

Status key:
- **Confirmed**: stated by the owner in the project brief (5 Nov 2026) or otherwise directly confirmed by the practice.
- **Not confirmed**: no confirmation yet. The "Published today?" column says whether the live site already shows this claim (these need an urgent decision, see audit.md).

| # | Item | Status | Published today? | Source / what we found | Client answer | Confirmed by / date |
|---|------|--------|------------------|------------------------|---------------|---------------------|
| 1 | Office address: 8191 Timberlake Way, Suite 200, Sacramento, CA 95823 | **Confirmed** | Yes | Stated in the project brief. Also matches the NPPES location record for the organisation (NPI 1124405584). | | |
| 2 | Main phone: 916-236-5800 | **Confirmed** | Yes | Stated in the project brief. NPPES lists it as the organisation's location phone. | | |
| 3 | Public brand name: "Apollo Physicians" | **Confirmed** | Yes | Stated in the project brief. | | |
| 4 | **Legal business name and exact spelling** | Not confirmed | **Removed in Step 2** (was in footer and schema `legalName` as "APOLLO PHYSICANS MEDICAL GROUP"; `llms.txt` spelled it "PHYSICIANS", so the site was also inconsistent with itself). Footer now shows the brand name only. | The NPPES record spells it "PHYSICANS" (no I). Vitals and WebMD list "Apollo Physicians Medical Group". Needs the entity name on the California Secretary of State filing or the tax/IRS record. We cannot tell whether the typo is a registry error or the true legal name. | | |
| 5 | Dr. Paramjit Panesar, MD practices at this office | **Confirmed** | Yes | Stated in the project brief. Note: Dr. Panesar's own NPPES record (NPI 1982892659, last updated 2014) lists a Roseville practice location and a Sacramento mailing address on Old Placerville Rd, not Timberlake Way. It does not support the claim by itself. | | |
| 6 | Hours by day | Not confirmed | No | Not on the site. Not supplied. | | |
| 7 | Same-day and next-day appointments: always available, or subject to capacity? Cut-off time? | Not confirmed | Yes (title, meta, H2, FAQ, llms.txt) | Copied from the previous site. Needs a policy statement we can quote. | | |
| 8 | Currently accepting new patients (Y/N, any limits) | Not confirmed | No (deliberately omitted) | | | |
| 9 | Board certification and certifying body (e.g. ABFM) | Not confirmed | No | Check at ABFM "Verify a Physician" and the Medical Board of California. | | |
| 10 | Medical school and graduation year | Not confirmed | No | | | |
| 11 | Residency | Not confirmed | No | | | |
| 12 | California license number | Not confirmed | No | NPPES shows the same license value (A114684) on both the organisation and the physician record. That looks like a copy, so do not publish until checked on the Medical Board of California license lookup. | | |
| 13 | Dr. Panesar NPI 1982892659 | Not confirmed | Yes (provider page, schema, llms.txt) | Exists in NPPES as a Family Medicine physician. Record is stale (see item 5). Client should confirm it is the NPI they want shown and update NPPES. | | |
| 14 | Organisation NPI 1124405584 | Not confirmed | **Removed from schema in Step 5** (no page shows it) | Exists in NPPES. Authorized official listed there is a Dr. Dhaliwal, not Dr. Panesar. Confirm it is still the correct group NPI. | | |
| 15 | Years in practice | Not confirmed | No | | | |
| 16 | Languages spoken (physician and staff) | Not confirmed | No | | | |
| 17 | Other providers at the practice (a 2023 archive of the old site listed Drs. Jaspreet Tiwana and Ramandeep Dhaliwal and a nurse practitioner) | Not confirmed | No | Are any still at this office? If yes they need entries; if no, directories listing them must be corrected. | | |
| 18 | Hospital affiliations, each by name (e.g. Methodist, Mercy) | Not confirmed | No | Nothing supplied. | | |
| 19 | Office is in the Methodist Hospital Medical Plaza | Not confirmed | No | Not stated anywhere in the brief or the repo. Do not say it until confirmed. | | |
| 20 | Real drive time from Elk Grove (verified in Google Maps, with the route and time of day) | Not confirmed | No | Must be measured. Must not be estimated. | | |
| 21 | Directions via Hwy 99 / Bruceville Rd | Not confirmed | No | Only publish after checking in Google Maps. | | |
| 22 | Parking information | Not confirmed | No | | | |
| 23 | Accepted plans: Aetna, Anthem Blue Cross, Blue Shield, Cigna, Health Net, United Healthcare, Sutter, Hill Physicians, Medicare | Not confirmed | Yes | Copied from the previous site. Need: date last verified, which products (HMO/PPO, Medicare Advantage vs Original Medicare), which Sutter and Hill Physicians products, and any exclusions. Medi-Cal is not listed; confirm it is not accepted. | | |
| 23a | Is "Sutter" and "Hill Physicians" an insurer or an IPA/medical group? | Not confirmed | Yes (shown as plans) | They are provider networks, not carriers. Label correctly once the client explains the contract. | | |
| 24 | Self-pay: what the $65 initial visit covers, what it excludes, new vs established patients, labs/procedures | Not confirmed | Yes ("Initial doctor visits start at $65.") | Copied from the previous site. "Start at" needs a definition. | | |
| 25 | On-site lab (Y/N) and which tests | Not confirmed | No | | | |
| 26 | Services offered (annual physicals, chronic disease care, vaccines, etc.) | Not confirmed | No (only "family medicine") | The 2023 archive of the old site listed many services including aesthetics, laser, weight loss, immigration exams, mental health, pediatrics, telemedicine and women's health. None are confirmed for the current practice. | | |
| 27 | Telehealth available | Not confirmed | No | A Tebra directory page claims telemedicine and 24/7 phone support. Not confirmed by the practice, so not used. | | |
| 28 | Online booking URL | Not confirmed | No | If none exists, the mobile bar stays a single Call button. | | |
| 29 | Patient portal URL | Not confirmed | No | | | |
| 30 | Legacy phone numbers: which exist, which are in use | Not confirmed | No (none on site) | Found so far: **916-266-7473** is the **fax** number in NPPES for the organisation, and Doximity's page for Dr. Panesar also lists it as Fax, so it must not be published as a phone. **916-824-3278** is named in the brief and was not found in any source we checked. Directories show other numbers (916-655-9883 on Superpages; 916-281-5963 for an authorized official; 800-470-0071 and 916-781-1927 on Dr. Panesar's NPPES record). Client to say which are fax, tracking, or dead. | | |
| 31 | Staff and clinic photos, with written permission to publish | Not confirmed | No (site has no photos) | | | |
| 32 | Verified profile URLs for `sameAs`: Doximity, WebMD, Sharecare (currently in schema), Google Business Profile, Healthgrades, Zocdoc | Not confirmed | Yes (Doximity and WebMD, on the physician page and in its schema) | Step 5: opened Doximity and WebMD on 5 Nov 2026; both show Dr. Panesar, family medicine, at the Timberlake Way address and 916-236-5800. Sharecare could not be opened (HTTP 403) and was **removed**. These are physician profiles, not the clinic's. Client to confirm they are claimed and correct. | | |
| 33 | Google Business Profile exists, is verified, and who owns it | Not confirmed | n/a | | | |
| 34 | Legacy domain drparamjitpanesar.com: does the practice own it, and should it redirect here? | Not confirmed | n/a | Currently a parked Hostinger page. See audit.md. | | |
| 35 | Old apollophysicians.com site (Tebra/WordPress-style, archived 2023): was it the practice's? Who has the old hosting/DNS and email (MX points to IONOS)? | Not confirmed | n/a | Affects the redirect map. | | |
| 36 | Privacy policy and notice of privacy practices, and terms | Not confirmed | No | Not linked on the site. Required before any form, chat or analytics goes live. | | |
| 37 | Clinical review: Dr. Panesar approves any health-information content before publishing | Not confirmed | n/a | Process confirmation. | | |
| 38 | Analytics: is any analytics, pixel or session tool currently installed on the live site or planned? | Not confirmed | No third-party scripts found on the live site | | | |
| 39 | Office map coordinates (38.46019, -121.41317) | Not confirmed | Yes, in schema `geo` only | Step 7 correction: taken from the pin on the practice's own Google Maps listing (38.4601913, -121.4131662), on Timberlake Way beside Highway 99. The Census geocoder and OpenStreetMap placed the address about 240 m west (38.45994, -121.41591), so they were not used. Client to confirm the pin in Google Business Profile. | | |
| 40 | **Relationship to CHCA Health or another "community health clinic"** | Not confirmed | No | A Google review posted about 3 weeks before 5 Nov 2026 says the practice "transferred over to community health clinic". The previous project in this workspace (a chcahealth.org rebuild, audited 2 Nov 2026) listed 8191 Timberlake Way, Suite 200, with phone 916-236-5800, as one of that organisation's clinics. We cannot tell whether either is accurate or current. If another organisation also publishes this address and phone, the two sites compete for the same listing. Client to say who operates the office, and whether any other website or listing should show this name, address and phone. | | |
| 41 | Google Business Profile: website field, hours, owner access | Not confirmed | n/a | The live listing shows the website as `drparamjitpanesar.com` (a parked page), hours that open at 8:30 am (days and closing time not read), and an owner post dated 4 Jul 2026. See `docs/seo/local-gbp-checklist.md`. | | |

## Hard rules while items are unconfirmed

- No "accepting new patients", no hours, no credentials, no affiliations, no services beyond "family medicine", no drive time, no languages.
- No Elk Grove office wording of any kind.
- Fax number 916-266-7473 must not appear as a phone number on the site, schema or llms.txt.

## Update 6 Nov 2026: the owner's brief

The owner supplied a block of "business facts" and a separate list of "open facts to confirm". This section records what changed. Where an item above says "Not confirmed", this section overrides it.

### Now confirmed (owner, 6 Nov 2026) and published

| Item | Fact | Published as |
|---|---|---|
| 4 | Legal name: Apollo Physicians Medical Group (the NPI registry spelling "PHYSICANS" is a registry typo) | Footer, schema `legalName`, `llms.txt` |
| 7 | Same-day and next-day appointments | Pages, FAQs, meta, schema-free |
| 8 | New patients accepted | Home, new-patients page, schema `isAcceptingNewPatients: true` |
| 9 | Board certified in family medicine, American Board of Family Medicine | Physician page, home, FAQs, schema `hasCredential` |
| 10, 11 | Medical school: Dayanand Medical College, 2004. Residency: UAMS, 2007 to 2010 (written out as University of Arkansas for Medical Sciences, please confirm the expansion) | Physician page, schema `alumniOf` |
| 12 | California license A 114684, active since 2010 (matches the NPI registry) | Physician page, with a link to the Medical Board of California search |
| 13 | Physician NPI 1982892659 | Physician page, schema, `llms.txt` |
| 23 | Accepted: Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, UnitedHealthcare, Sutter Health, Hill Physicians, Medicare | Insurance page, home, FAQs. Sutter Health and Hill Physicians are shown as medical groups. |
| 24 | Initial self-pay visits start at $65 | Home, insurance page, FAQs, schema `priceRange` |
| 26 (part) | USCIS-designated civil surgeon (Form I-693) | Physician page, schema, immigration page (held for review) |
| area | Areas served: South Sacramento, Valley Hi, Laguna, Florin, Meadowview, Parkway and Elk Grove; ZIP codes 95823, 95828, 95624, 95757, 95758 | Home, contact, Elk Grove, schema `areaServed` |

### Verified by us in Google Maps, 6 Nov 2026

| Item | Result |
|---|---|
| 19 | The office is 0.4 mile (about a 9-minute walk, 2 minutes by car) from Methodist Hospital of Sacramento, 7500 Hospital Dr, and next to Highway 99. Described as "near", never as part of the hospital. Cosumnes River Blvd, named by the owner, is further south and is not described as adjacent. |
| 20 | About 12 minutes by car from Elk Grove ZIP codes 95758 (6.6 miles via Laguna Blvd and Franklin Blvd) and 95624 (6.8 miles via Bond Rd and CA-99 North), usual traffic. 95757 did not return a result, so no claim is made for it. |
| 39 | Google's pin for Suite 200 is 38.460217, -121.4131326, matching the coordinates in the schema. |

### Update 11 Nov 2026: confirmed by the practice (relayed by the site owner in the Claude Code session)

The site owner stated that the practice confirmed these facts. They replace the "STILL OPEN" entries below for the same items.

| Item | Fact | Published as |
|---|---|---|
| 6 | Office hours: Monday to Friday 8:30 a.m. to 5:30 p.m., Saturday 9:00 a.m. to 2:00 p.m. Pacific, Sunday closed | `OFFICE_HOURS` in `src/data/site.ts`: Quick Facts, contact page, schema `openingHoursSpecification`, `llms.txt` |
| 23 (part) | Medi-Cal accepted ("most plans"; the plan names were not supplied) | Insurance list, Medi-Cal page (held for review). Copy says "most Medi-Cal plans" and tells people to call to verify |
| 23 (part) | Nivano Physicians accepted (shown as a medical group) | Insurance list, Nivano page (held for review) |
| 27 | Telemedicine for patients in California (visit types and platform not supplied) | Quick Facts, FAQ hub, `llms.txt` |

Google Business Profile, WebMD and Vitals still show Mon-Fri 8:30-5:00 with Saturday closed. Those listings must be corrected to match (Local plan).

**Still open after this update:** Vivant Health (River City Medical Group) contract; the names of the Medi-Cal plans; what Nivano is and which plans route through it; Medicare assignment and Medicare Advantage plan names; what the $65 covers; payment methods; sliding scale; languages; real photos with permission (item 31); item 40 (community health center link); account access.

### STILL OPEN: not published until the owner answers (the TODO list)

| # | Open fact | What the owner said or what we found | Where it goes when confirmed |
|---|---|---|---|
| 6 | **Office hours** | The owner lists two conflicting sets: Mon to Fri 8:30 to 5:30 and Sat 9 to 2 on one site, Mon to Fri 8:30 to 5:00 with Saturday closed on WebMD and Vitals. Google Business Profile shows Mon to Fri 8:30 to 5:00, weekends closed. | `OFFICE_HOURS` in `src/data/site.ts`: the contact page, Quick Facts and schema `openingHoursSpecification` all appear from that one value |
| 30 | **Phone variants** | Superpages shows 916-655-9883. 916-266-7473 is the fax. 916-824-3278 was not found anywhere. | Directory corrections only; the site uses 916-236-5800 |
| 17 | **Other clinicians** (Dr. Tiwana, Dr. Dhaliwal and others) | Not stated | A team page and `Physician` nodes |
| 27 | **Telehealth, 24/7 phone support** | Not stated (a Tebra page claims both) | Services and FAQ |
| 28 | **Online booking** | None known | `BOOKING_URL` in `src/data/site.ts` adds "Book online" to the mobile bar |
| 16 | **Languages spoken** (English and Spanish proposed) | The owner asked to confirm first | Physician page, schema `knowsLanguage`, a Spanish page if staff confirm |
| 22 | **Parking and walk-in policy** | Not stated | Contact page |
| 23 (part) | **Nivano Physicians, Medi-Cal, Brand New Day, Imperial, Western Health Advantage** | Listed as "on the site now" and also as "to confirm", so held out | `INSURANCE_ACCEPTED` and the insurance page |
| 24 (part) | What the $65 covers and excludes | Not stated | Insurance page, FAQs |
| 33 | Real Google review count and rating | 4.4 stars from 101 reviews was read on 5 Nov; the owner asked for the live numbers | Not displayed anywhere, and never marked up in schema |
| 26 (rest) | Each service the practice offers: annual physicals, school and sports physicals, vaccinations, diabetes and high blood pressure care. Ages seen. | Needs Dr. Panesar's review | The health pages, held until `CLINICAL_REVIEW.reviewedOn` is set |
| 37 | Dr. Panesar's clinical review of the health content | Not done | Set `CLINICAL_REVIEW.reviewedOn` in `src/data/pages.ts`, using `docs/clinical-review/review-packet.md` |
| 40 | Relationship to CHCA Health or another "community health clinic" | Unanswered | Resolve before changing any directory listing |
| 41 | Google Business Profile website field still shows drparamjitpanesar.com | Needs the owner | Profile edit |
