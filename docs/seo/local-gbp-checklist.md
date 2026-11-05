# Local SEO checklist: Google Business Profile, directories, reviews, insurer listings

Prepared 5 Nov 2026 (Step 7). This is a to-do list for the practice owner and front desk. No site code depends on it, except one correction already made (the map pin, section 1).

**The one reference set.** Every listing must use exactly this, copied from `src/data/site.ts`:

| Field | Value |
|---|---|
| Name | Apollo Physicians |
| Address | 8191 Timberlake Way, Suite 200, Sacramento, CA 95823 |
| Phone | 916-236-5800 |
| Website | https://www.apollophysicians.com |

Not on the list because they are unconfirmed: hours, services beyond family medicine, accepted plans, new-patient status, legal name. Do not copy them from one listing to another. See `client-confirmations.md`.

## 0. Read this first: two questions only the owner can answer

1. **Who operates the office?** A Google review posted about three weeks before 5 Nov 2026 says the practice "transferred over to community health clinic". The earlier CHCA Health website project in this workspace listed this same address and phone as one of its clinics. We cannot tell whether either is accurate. If another organisation publishes this name, address and phone, the listings compete and Google may merge or suspend them. Answer confirmations item 40 before changing any listing.
2. **Who controls the Google Business Profile?** The listing is claimed and active (an owner post dated 4 Jul 2026 and an owner reply to a review 3 days before 5 Nov). Make sure the practice owns it and at least two people are owners.

## 1. Google Business Profile

What the public listing showed on 5 Nov 2026 (read in a browser, signed out):

| Field | Listing shows | Status |
|---|---|---|
| Name | Apollo Physicians | Matches |
| Category | Family practice physician | Matches the target category |
| Address | 8191 Timberlake Way #200, Sacramento, CA 95823 | Same place; Google's own format. Enter the address as line 1 `8191 Timberlake Way`, line 2 `Suite 200` if the form allows. |
| Phone | +1 916-236-5800 | Matches |
| **Website** | **drparamjitpanesar.com** | **Wrong. Change to https://www.apollophysicians.com.** That domain is a parked Hostinger page. |
| Hours | Mon to Fri 8:30 am to 5 pm, Sat and Sun closed | Not confirmed by the practice, so not published on the website. The practice should confirm them (item 6), then keep website and profile identical. |
| Rating | 4.4 stars, 101 reviews | Do not copy onto the website. |
| Photos | 16 | Review them (see below). |
| Owner post (4 Jul 2026) | "Tare care today for a Healthier tomorrow l. For Primary Care feel free to contact us" | Contains typos. Delete and repost. |
| Map pin | Timberlake Way beside Highway 99 | The website schema now uses this pin (38.46019, -121.41317). Open the profile, check the pin sits on the building entrance, drag it if not, then tell us so the schema can match. |

### Checklist

- [ ] **Website** field set to https://www.apollophysicians.com (highest priority; nothing else on this list is as urgent).
- [ ] **Primary category** stays Family practice physician. Add secondary categories only if they are true and the practice offers the service.
- [ ] **Appointment link**: leave empty. There is no online booking URL (confirmations item 28). Do not link to the home page as a booking page. If online booking is added later, put that URL here and in the mobile bar.
- [ ] **Hours**: confirm Mon to Fri 8:30 to 5:00 and closed weekends with the practice. Set special hours for holidays. The Veterans Day line on the listing says "Hours might differ".
- [ ] **Services**: list only what the practice confirms (item 26). "Family medicine" is the only confirmed service.
- [ ] **Description** (750 characters maximum). Suggested text, using only confirmed facts: "Apollo Physicians is a family medicine practice at 8191 Timberlake Way, Suite 200, Sacramento, CA 95823. Dr. Paramjit Panesar, MD, sees patients at this office. Elk Grove patients are seen here too. Call 916-236-5800." Add hours, insurance or new-patient wording only after confirmation.
- [ ] **Service area**: do not add Elk Grove. This is a fixed-office clinic, and Google's guidance is that service areas are for businesses that travel to customers. Describe Elk Grove access in posts and on the website instead (sample post below).
- [ ] **Photos**: add the exterior, entrance and waiting room only with written permission for anyone shown (confirmations item 31). No patient photos. Remove anything outdated.
- [ ] **Duplicates**: search Google Maps for "Apollo Physicians", "Apollo Physicians Medical Group" and "Dr Paramjit Panesar" at this address. Report duplicates through "Suggest an edit" so one listing remains. Check for a second listing under the former or another clinic's name.
- [ ] **Q&A**: seed with the questions on the website that have confirmed answers (location, Elk Grove). Do not post hours or insurance answers until confirmed.
- [ ] **Posts**: one post a month is enough. Use only confirmed facts and no health advice. Sample (Elk Grove access): "Apollo Physicians serves Elk Grove families from our office in South Sacramento at 8191 Timberlake Way, Suite 200. Call 916-236-5800." Proofread before posting.
- [ ] **Messaging and chat**: leave off unless a HIPAA-compliant process exists. Never ask for health details in a profile message.
- [ ] **Owners and managers**: at least two owners, one with a practice-controlled email address.

## 2. Directory consistency

How to read this: "Opened" means the page was loaded and read on 5 Nov 2026. "Snippet only" means the site blocked automated access (HTTP 403) or loads with scripts, so the details come from a search result summary and must be checked by a person. Nothing below has been changed by us.

| Directory | What it shows | Corrections needed |
|---|---|---|
| **Google Maps** (opened) | See section 1 | Website field, post typos, pin check |
| **WebMD Care**, practice page (opened) | "Apollo Physicians Medical Group", correct address and 916-236-5800, "Claim your practice" shown (unclaimed), 5 physicians (including Drs. Dhaliwal, Hundal and a nurse practitioner), 6 specialties, "Accepting New Patients: Yes", Medicaid and Medicare accepted, a long list of plans, hours 8:30 to 5:00 | Claim the practice. Remove physicians who no longer work here (confirmations item 17). Correct the plan list, new-patient and Medicaid fields to the practice's confirmed answers. Fix the name once the legal name is confirmed. |
| **WebMD Care**, Dr. Panesar (opened earlier) | Family medicine, same address and phone, "Methodist Hospital Of Sacramento" listed | Confirm or remove the hospital line (item 18). |
| **Doximity** (opened earlier) | Family medicine, correct address, phone 916-236-5800, fax 916-266-7473, a second line reading "Hospital Medicine/Hospitalist" | Check the hospitalist line is correct, else remove it. The fax is shown as a fax, which is right. |
| **Tebra** practice and provider pages (opened) | "Apollo Physicians", correct address and 916-236-5800, one provider (Dr. Panesar). Provider page lists services including Mental Health and Immigration Exams. A search summary also credited it with telemedicine and 24/7 phone support, which we could not read on the page. | Claim and edit. Remove services the practice does not confirm (item 26) and any telemedicine or 24/7 claim (item 27). |
| **Birdeye** (opened) | "Apollo Physicians", 117 reviews, profile "not claimed by the business", address written `8191 Timberlake Way #200, Ste 200` (suite twice) | Claim it. Correct the address to `8191 Timberlake Way, Suite 200`. |
| **Vitals** (snippet only) | "Apollo Physicians Medical Group", address and 916-236-5800, hours around 8:30 to 5, "accepting new patients", languages listed, privileges at Methodist Hospital of Sacramento | Open it, claim it, and correct anything the practice has not confirmed (languages, new patients, hospital). |
| **Superpages** (snippet only) | Address correct, **phone 916-655-9883** | Wrong phone. Correct it or ask for removal. |
| **MapQuest / Yelp** (snippet only) | MapQuest shows two entries (ids 369772286 and 380626633) and a Yelp rating of about 3.0 from 29 reviews | Check for a duplicate. Claim the Yelp page and correct it. |
| **Medifind** (snippet only) | "Apollo **Physicans** Medical Group" (typo) | Ask for correction. |
| **Everyday Health** (snippet only) | Lists Dr. Panesar with additional offices (Old Placerville Rd and Roseville) | These match the old addresses on Dr. Panesar's own NPI registry record, last updated 2014, so the registry is the likely source. Fix it at the source (NPPES, below). |
| **Healthgrades**, **Zocdoc**, **Sharecare** | No listing found, or the page could not be opened (Sharecare returned 403) | Search each for the practice and for Dr. Panesar. Claim and correct anything found. Do not create a new listing if one exists. |
| **Apple Maps** | Not checked (needs Apple Business Connect) | Search at businessconnect.apple.com, claim, enter the reference set above. |
| **Bing Places** | Not checked | Search at bingplaces.com. Importing from Google Business Profile is the quickest way once Google is correct. |
| **NPPES (the national provider registry)** | Organisation NPI 1124405584: correct address and phone, fax 916-266-7473, authorized official listed as a Dr. Dhaliwal, last updated 2015. Dr. Panesar NPI 1982892659: a Roseville practice location and an Old Placerville Rd mailing address, last updated 2014. | Dr. Panesar should update his record to the current office. The practice should confirm the authorized official. Many directories copy from here. Updates are made at nppes.cms.hhs.gov and need an Identity and Access login. |

### Wrong or risky numbers to correct anywhere they appear

| Number | Where | Action |
|---|---|---|
| 916-266-7473 | The fax number in NPPES, and on Doximity | Keep it labelled as fax only. Never as a phone. |
| 916-655-9883 | Superpages | Correct to 916-236-5800. |
| 916-281-5963 | An NPI viewer page (authorized official) | Find out what this is (item 30). |
| 916-824-3278 | Named in the brief; not found in any listing we read | Find out what this is (item 30). |
| 800-470-0071, 916-781-1927 | Dr. Panesar's own NPPES record | Stale prior practice. Update NPPES. |

## 3. Reviews: a simple process for the front desk

The Google review count is 101 and the rating is 4.4. The aim is a steady trickle of honest reviews, never a push.

**Do**
- Ask every patient the same neutral way, at the end of a visit: "If you'd like to share your experience, you can find us on Google Maps." A printed card with the practice's review link (Google Business Profile has a "Ask for reviews" link) is fine.
- Ask everyone, not only people who seem happy.
- Reply to every review, short and polite, within a few days. Thank positive reviewers. For a negative one, apologise for the experience and invite a call to 916-236-5800.
- Report reviews that break Google's policies (fake, conflict of interest, off-topic) through Google, and keep the report.

**Do not**
- Offer money, discounts, gifts or anything else for a review.
- Ask only happy patients, ask patients to remove a negative review, or hold a review back until a visit ends well (review gating).
- Tell a patient what to write, hand over a script, or write a review for them.
- Review the practice from staff or family accounts.
- Set up a review tablet or kiosk in the office. Reviews arriving in bulk from one device or place can be filtered by Google, and a kiosk can look like review gating.

**HIPAA: how to reply**
- Never confirm that a person is a patient, and never mention a visit, a treatment, a medication, a test or a date. Even "thank you for coming in" confirms a visit.
- Write the reply as if you don't know who it is. Template for any negative review:
  "Thank you for the feedback. We take every concern about our service seriously. We can't discuss any individual's care in a public reply. Please call our office at 916-236-5800 so we can look into this."
- Template for a positive review: "Thank you for the kind words. We appreciate it."
- Move the conversation to the phone. Do not discuss details in the reply thread, even if the reviewer does.
- Do not message patients (text or email) to ask for reviews from the patient list without checking consent rules with counsel first.

**Watch list on the current listing.** The most recent review, posted about three weeks before 5 Nov, is critical of phone service and says the practice "transferred over to community health clinic". The owner reply was written correctly (it declines to discuss care and asks for a call). The owner should decide how to answer the "transferred" statement, and should look at phone coverage, since several reviews mention unanswered calls and hard-to-book appointments.

## 4. Insurer and IPA directories

The website lists Aetna, Anthem Blue Cross, Blue Shield, Cigna, Health Net, United Healthcare, Sutter, Hill Physicians and Medicare. That list is **not confirmed** (item 23). Sutter and Hill Physicians are provider networks, not insurers, so they need their own check. Do this check and send us the confirmed list with the date.

| Directory | Check |
|---|---|
| **Hill Physicians** (find-a-doctor) | A search summary shows Dr. Panesar under "Apollo Physicians Medical Group" at the correct address and phone. We could not open the page (access blocked). Confirm the entry, whether it says accepting new patients, and which Hill products apply. |
| **Sutter** (network directory) | Not checked. Confirm whether the practice is listed and which Sutter products apply. |
| **Each carrier** (Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, United Healthcare, Medicare) | Search the carrier's provider directory for Dr. Panesar and for the practice. Record: listed or not, name spelling, address with suite number, phone, and accepting-new-patients flag. Check each of the carrier's products the practice thinks it accepts (for example HMO, PPO, Medicare Advantage), because "accepts" often means only some. |
| **Medicare Care Compare** | Search the physician by name. Confirm address and phone. |

For every mismatch, correct it with the carrier or network (usually through the practice's credentialing contact or the carrier's provider-data portal). If the practice uses CAQH ProView, update it there too, because many carriers read from it.

Send us, for the website: each plan that is **confirmed**, the date checked, and any restriction (for example "Hill Physicians HMO only"). With that we can build the `/insurance-and-pricing` page and update the list.

## 5. Order of work

1. Answer the two questions in section 0.
2. Fix the Google website field and the typos in the owner post (about ten minutes).
3. Confirm hours, services and the plan list with the practice, then update every listing together.
4. Claim and correct WebMD, Birdeye, Tebra, Vitals and Yelp.
5. Update NPPES for Dr. Panesar, and correct the Superpages phone.
6. Check insurer and IPA directories.
7. Add the review process to the front desk routine.
8. Recheck all listings in 60 days, or after any change of phone, address or hours.
