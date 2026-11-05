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
| 14 | Organisation NPI 1124405584 | Not confirmed | Yes (schema, llms.txt) | Exists in NPPES. Authorized official listed there is a Dr. Dhaliwal, not Dr. Panesar. Confirm it is still the correct group NPI. | | |
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
| 30 | Legacy phone numbers: which exist, which are in use | Not confirmed | No (none on site) | Found so far: **916-266-7473** is the **fax** number in NPPES for the organisation, so it must not be published as a phone. **916-824-3278** is named in the brief and was not found in any source we checked. Directories show other numbers (916-655-9883 on Superpages; 916-281-5963 for an authorized official; 800-470-0071 and 916-781-1927 on Dr. Panesar's NPPES record). Client to say which are fax, tracking, or dead. | | |
| 31 | Staff and clinic photos, with written permission to publish | Not confirmed | No (site has no photos) | | | |
| 32 | Verified profile URLs for `sameAs`: Doximity, WebMD, Sharecare (currently in schema), Google Business Profile, Healthgrades, Zocdoc | Not confirmed | Yes (Doximity, WebMD, Sharecare in schema) | The three URLs are physician profiles, not the clinic's. Client to confirm each is correct and claimed. | | |
| 33 | Google Business Profile exists, is verified, and who owns it | Not confirmed | n/a | | | |
| 34 | Legacy domain drparamjitpanesar.com: does the practice own it, and should it redirect here? | Not confirmed | n/a | Currently a parked Hostinger page. See audit.md. | | |
| 35 | Old apollophysicians.com site (Tebra/WordPress-style, archived 2023): was it the practice's? Who has the old hosting/DNS and email (MX points to IONOS)? | Not confirmed | n/a | Affects the redirect map. | | |
| 36 | Privacy policy and notice of privacy practices, and terms | Not confirmed | No | Not linked on the site. Required before any form, chat or analytics goes live. | | |
| 37 | Clinical review: Dr. Panesar approves any health-information content before publishing | Not confirmed | n/a | Process confirmation. | | |
| 38 | Analytics: is any analytics, pixel or session tool currently installed on the live site or planned? | Not confirmed | No third-party scripts found on the live site | | | |

## Hard rules while items are unconfirmed

- No "accepting new patients", no hours, no credentials, no affiliations, no services beyond "family medicine", no drive time, no languages.
- No Elk Grove office wording of any kind.
- Fax number 916-266-7473 must not appear as a phone number on the site, schema or llms.txt.
