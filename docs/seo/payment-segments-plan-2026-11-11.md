# Apollo Physicians: insurance and payment segments (Medi-Cal, Medicare, medical groups, self-pay, community clinic searches)

11 Nov 2026. This is a plan and drafts only: **no site code was changed.** Every page below ships behind the same gate as the other health pages, and nothing marked [CONFIRM] is published until the practice answers.

## Build status (11 Nov 2026)

- **Built and held:** `/medicare-doctor-sacramento` (key `medicare`, `MEDICARE` in `content.ts`) and `/doctor-without-insurance-sacramento` (key `selfPay`, `SELF_PAY`). Both answer 404 until `CLINICAL_REVIEW.reviewedOn` is set. Then they appear in the sitemap, footer and `llms.txt`, and links appear on `/insurance-accepted` and `/new-patients`.
- **How they differ from the briefs below:** the briefs' [CONFIRM] questions are left out (hours, telehealth, Medicare assignment, what $65 includes, payment methods). Medi-Cal is not mentioned at all, because the site's tests block the word until it is confirmed. The coverage-help answer says "free or low-cost health coverage from the State of California" and links to BenefitsCal and Covered California. The breadcrumb is two levels (Home > page), as on every other page.
- **When publishing:** retitle `/insurance-accepted` from "Doctor Accepting Medicare in Sacramento" to the hub title in section 2.1, so it does not compete with the Medicare page. Then run `npm run generate:og`, because the share image shows the title.
- **Shared code added:** `VERIFY_PLAN_LINE` (the owner-required sentence, enforced by a test) and `BECOME_A_PATIENT_STEPS`.

## Strategy summary

People in South Sacramento and Elk Grove often search by how they pay: "doctor that takes Medi-Cal", "Medicare doctor accepting new patients", "doctor without insurance". On 11 Nov those searches returned directories (Zocdoc, the Hill Physicians doctor finder, easyIME) and national price guides, not clinic sites. A clinic page that states, in plain words, which plans it takes, how to get assigned to the doctor, and what a self-pay visit costs can win both the Google result and the AI answer.

The plan has five parts:
1. Keep `/insurance-accepted` as the hub and retitle it "Insurance and payment options".
2. Add one page per payment segment that has real, confirmable facts.
3. Write an honest "community clinic alternative" page that never calls Apollo a community clinic.
4. Repeat the same facts in `llms.txt`, the structured data and every directory.
5. Measure by segment in Search Console and the front-desk log.

**Three blockers decide how much of this can go live.** Medi-Cal, Nivano Physicians and Vivant Health are not confirmed as accepted (see section 0). Hours and telemedicine conflict with other sources. The open question about a "community health clinic" (confirmations item 40) must be answered before the community-clinic page is built.

---

## 0. Facts in the brief compared with the project record

The brief says these facts are "verified on the live site". The live site is the **old** site. On 6 Nov the owner confirmed some of them and listed others as still to confirm. The project rule (`client-confirmations.md`) is to publish only confirmed facts, so this plan treats the second group as [CONFIRM].

| Fact in the brief | Project status | How this plan uses it |
|---|---|---|
| Name, legal name, address, phone, NPI, ABFM certification, license A 114684, civil surgeon | Confirmed | Used as written |
| Same-day and next-day appointments; accepting new patients; initial self-pay visits from $65 | Confirmed (what $65 covers is still open) | Used. "What the $65 covers" is marked [CONFIRM] |
| Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, UnitedHealthcare, Sutter Health, Hill Physicians, Medicare | Confirmed 6 Nov | Used |
| **Nivano Physicians, Medi-Cal ("most plans")** | **Not confirmed.** The owner listed them both as "on the site now" and as "to confirm" (item 23) | Pages drafted, **held** until confirmed |
| **Hours Mon-Fri 8:30-5:30, Sat 9:00-2:00** | **Conflict** (item 6): Google Business Profile, WebMD and Vitals show Mon-Fri 8:30-5:00, weekends closed | Written with [CONFIRM]; the schema `openingHoursSpecification` stays off until confirmed |
| **Telemedicine across California** | Not confirmed (item 27) | Written with [CONFIRM] |
| "Beside Methodist Hospital" | Measured in Google Maps on 6 Nov: about 0.4 mile away | Written as "about 0.4 mile from Methodist Hospital of Sacramento" |
| Existing pages: five | The rebuild has 10 pages plus the held same-day page. `/insurance-accepted`, `/contact` and `/faq` already exist | The hub reuses `/insurance-accepted`, so there is no second insurance hub to compete with it |
| JSON-LD with Service nodes; `llms-full.txt` | Service nodes are emitted only after clinical review. There is **no `llms-full.txt`** in the repo | Section 5 drafts `llms.txt` sections and proposes `llms-full.txt` as an addition |
| Vivant Health and River City | **Research, 11 Nov:** River City Medical Group, a Sacramento IPA founded in 1992 for Medi-Cal patients, began doing business as **Vivant Health** in September 2024. It serves Medi-Cal and Medicare patients (vivanthealth.com, "Our New Brand"; CMA news). They are one organisation, not two | One page, "Vivant Health (formerly River City Medical Group)". Whether Apollo has a signed contract is [CONFIRM] |
| Other doctors at 8191 Timberlake Way | **Research, 11 Nov:** Dr. Takhar's Family Medicine & Urgent Care lists Suite 400 and Quest Diagnostics lists Suite 300 (BlueHive, Quest). Hill Physicians lists Dr. Takhar at the same street address | A separate practice in the same building. Every page and listing must always say **Suite 200**, so patients and AI systems do not mix them up |

---

## 1. Intent map

How to read it: **Intent** codes are B = ready to book, T = comparing cost or coverage, I = information, L = local. **Winnable** is a judgement from the 11 Nov search results (no keyword tool, no volumes). Each row names the page it belongs to and the AI question it should win.

### 1.1 Medi-Cal (held until Medi-Cal is confirmed)

| Search phrase | Intent | Winnable |
|---|---|---|
| doctors that accept Medi-Cal Sacramento | B, T | Medium |
| Medi-Cal doctor South Sacramento | B, L | High |
| family doctor that takes Medi-Cal Elk Grove | B, L | Medium |
| primary care doctor accepting new Medi-Cal patients Sacramento | B | Medium |
| Medi-Cal managed care primary care doctor 95823 | B, L | High |
| how to change Medi-Cal primary care doctor Sacramento | I, B | High |
| Anthem Blue Cross Medi-Cal doctor Sacramento | B, T | Medium [CONFIRM plan] |
| Health Net Medi-Cal doctor Sacramento | B, T | Medium [CONFIRM plan] |
| Medi-Cal doctor same-day appointment Sacramento | B | High |
| Medi-Cal family doctor near Methodist Hospital Sacramento | B, L | High |

Page: `/medi-cal-doctor-sacramento`. AI question to win: "Which family doctors in South Sacramento accept Medi-Cal and are taking new patients?"

### 1.2 Original Medicare

| Search phrase | Intent | Winnable |
|---|---|---|
| doctor that accepts Medicare Sacramento | B, T | Medium |
| Medicare primary care doctor accepting new patients Sacramento | B | Medium (Zocdoc leads) |
| Medicare family doctor South Sacramento | B, L | High |
| Medicare doctor Elk Grove accepting new patients | B, L | Medium |
| does my doctor take Original Medicare | I | Medium |
| Medicare Part B doctor visit Sacramento | I, T | Medium |
| board certified family doctor Medicare Sacramento | B | High |
| Medicare doctor near 95823 | B, L | High |
| Medicare doctor same-day appointment Sacramento | B | High |

Page: `/medicare-doctor-sacramento`. AI question to win: "Is there a family doctor in South Sacramento who accepts Original Medicare and is taking new patients?"

### 1.3 Medicare Advantage and medical groups

| Search phrase | Intent | Winnable |
|---|---|---|
| Medicare Advantage doctor South Sacramento | B, L | Medium |
| primary care Medicare Advantage Sacramento accepting new patients | B | Medium |
| Hill Physicians Medicare doctor Sacramento | B | Medium (Hill finder leads) |
| Sutter Health Medicare Advantage family doctor Sacramento | B | Medium |
| how to change primary care doctor Medicare Advantage HMO | I, B | High |
| Medicare HMO doctor Elk Grove | B, L | Medium |
| UnitedHealthcare Medicare Advantage doctor Sacramento | B, T | Medium [CONFIRM plan] |
| Aetna Medicare Advantage doctor Sacramento | B, T | Medium [CONFIRM plan] |
| SCAN / Anthem Medicare Advantage doctor Sacramento | B, T | [CONFIRM plan] |

Page: `/medicare-advantage-doctor-sacramento`. AI question to win: "How do I choose Dr. Paramjit Panesar as my primary care doctor on a Medicare Advantage HMO in Sacramento?"

### 1.4 Vivant Health (formerly River City Medical Group); held until the contract is confirmed

| Search phrase | Intent | Winnable |
|---|---|---|
| Vivant Health doctors Sacramento | B, N | High (new brand, few clinic pages) |
| Vivant Health primary care doctor accepting new patients | B | High |
| River City Medical Group doctors | B, N | High (people still search the old name) |
| River City Medical Group primary care South Sacramento | B, L | High |
| Vivant Health Medi-Cal doctor Sacramento | B, T | High |
| Vivant Health Medicare doctor Sacramento | B, T | Medium |
| is River City Medical Group now Vivant Health | I | High |
| change primary care doctor Vivant Health | I, B | High |

Page: `/vivant-health-doctor-sacramento`. AI question to win: "Which South Sacramento family doctors are in the Vivant Health (River City Medical Group) network?"

### 1.5 Nivano Physicians; held until confirmed

| Search phrase | Intent | Winnable |
|---|---|---|
| Nivano Physicians doctors Sacramento | B, N | Medium |
| Nivano Physicians primary care accepting new patients | B | Medium |
| Nivano family doctor South Sacramento | B, L | High |
| Nivano Physicians Elk Grove doctor | B, L | Medium |
| what is Nivano Physicians | I | Medium |
| change primary care doctor Nivano | I, B | High |
| Nivano Medicare Advantage doctor Sacramento | B, T | [CONFIRM] |
| Nivano Physicians doctor same-day appointment | B | High |

Page: `/nivano-physicians-doctor-sacramento`. AI question to win: "Is Apollo Physicians in the Nivano Physicians network?"

### 1.6 Low-income and uninsured patients

| Search phrase | Intent | Winnable |
|---|---|---|
| doctor without insurance Sacramento | B, T | High |
| self-pay doctor visit Sacramento | B, T | High |
| how much is a doctor visit without insurance Sacramento | T, I | High |
| cash price doctor visit South Sacramento | T | High |
| affordable family doctor Sacramento no insurance | B, T | Medium |
| doctor visit $65 Sacramento | B, T | High |
| uninsured doctor Elk Grove | B, L | Medium |
| how to apply for Medi-Cal Sacramento | I | Low (government sites lead); answer briefly and link to them |
| see a doctor while waiting for Medi-Cal approval | I, B | High |

Page: `/doctor-without-insurance-sacramento`. AI question to win: "How much does it cost to see a family doctor in Sacramento without insurance?"

### 1.7 People searching for an FQHC, community health center, community clinic or free clinic

These people are looking for a different kind of clinic. The honest way to rank is to explain the difference, point them to the official finder, and say plainly what Apollo is.

| Search phrase | Intent | Winnable |
|---|---|---|
| community health center South Sacramento | L | Low for Apollo (and it should not pretend to be one) |
| community clinic near me 95823 | L | Low |
| FQHC Sacramento | I, L | Low |
| free clinic Sacramento | L | Low |
| sliding scale doctor Sacramento | T, L | Only if a sliding scale exists [CONFIRM] |
| low cost clinic vs private doctor | I | High |
| community health center or private doctor, which is better for me | I | High |
| what is an FQHC | I | Medium |
| doctor accepting new patients if the community clinic has a waitlist | B | High |

Page: `/community-clinic-alternative-sacramento`. AI question to win: "What is the difference between a community health center and a private family doctor in South Sacramento?"

**Do not build this page until item 40 is answered.** A Google review said the practice "transferred over to community health clinic", and a previous project listed this address and phone under a community health organisation. If Apollo is now operated by, or contracted with, a community health center, this page's premise changes.

---

## 2. Site architecture

### 2.1 Pages

Titles are 50 to 60 characters and meta descriptions 150 to 160; both were counted (section 8). Slugs follow the site's style: no trailing slash, city at the end.

| Page | Slug | H1 | Status |
|---|---|---|---|
| Hub (rework of an existing page) | `/insurance-accepted` (kept; no redirect) | Insurance and Payment Options | Live page; retitle now |
| Original Medicare | `/medicare-doctor-sacramento` | Medicare Doctor in Sacramento | **Built 11 Nov, held** for Dr. Panesar's review. Confirmed facts only: no hours, telehealth, Medicare assignment or Medicare Advantage plan names |
| Medicare Advantage | `/medicare-advantage-doctor-sacramento` | Medicare Advantage Doctor in Sacramento | Build now in general terms; plan names [CONFIRM] |
| Medi-Cal | `/medi-cal-doctor-sacramento` | Medi-Cal Doctor in South Sacramento | **Held** (Medi-Cal) |
| Vivant Health | `/vivant-health-doctor-sacramento` | Vivant Health (River City Medical Group) Doctor in Sacramento | **Held** (contract) |
| Nivano | `/nivano-physicians-doctor-sacramento` | Nivano Physicians Doctor in Sacramento | **Held** (Nivano) |
| Uninsured | `/doctor-without-insurance-sacramento` | Doctor Without Insurance in Sacramento | **Built 11 Nov, held** for review. No statement about what $65 covers, payment methods or discounts |
| Community clinic | `/community-clinic-alternative-sacramento` | Community Clinic or Private Family Doctor? | **Held** (item 40) |

Titles and meta descriptions:

| Page | Title | Meta description |
|---|---|---|
| Hub | `Insurance & Payment Options, Sacramento \| Apollo Physicians` | `Insurance and payment options at Apollo Physicians in South Sacramento: Medicare, Aetna, Anthem, Blue Shield, Cigna and more, plus self-pay visits from $65.` |
| Medicare | `Medicare Family Doctor in Sacramento \| Apollo Physicians` | `Family doctor in Sacramento who accepts Original Medicare. Dr. Paramjit Panesar, MD, is board certified and taking new patients. Call 916-236-5800 to book.` |
| Medicare Advantage | `Medicare Advantage Doctor, Sacramento \| Apollo Physicians` | `Medicare Advantage family doctor, South Sacramento. How to choose Dr. Paramjit Panesar, MD, as your primary care doctor. Call 916-236-5800 to verify your plan.` |
| Medi-Cal | `Medi-Cal Doctor in South Sacramento \| Apollo Physicians` | `South Sacramento family doctor for Medi-Cal members. How to choose Dr. Paramjit Panesar, MD, as your primary care doctor. Call 916-236-5800 to verify your plan.` |
| Vivant Health | `Vivant Health Doctor in Sacramento \| Apollo Physicians` | `Vivant Health, formerly River City Medical Group, family doctor in South Sacramento. How to choose Dr. Paramjit Panesar, MD. Call 916-236-5800 to verify.` |
| Nivano | `Nivano Physicians Doctor, Sacramento \| Apollo Physicians` | `Nivano Physicians family doctor in South Sacramento. How to choose Dr. Paramjit Panesar, MD, as your primary care doctor. Call 916-236-5800 to verify your plan.` |
| Uninsured | `Doctor Without Insurance in Sacramento \| Apollo Physicians` | `See a family doctor in South Sacramento without insurance. Initial self-pay visits start at $65 with Dr. Paramjit Panesar, MD. Call 916-236-5800 to book.` |
| Community clinic | `Community Clinic Alternative, Sacramento \| Apollo Physicians` | `Apollo Physicians is a private family practice in South Sacramento, not a community clinic. Compare your options and see how to book. Call 916-236-5800.` |

In the code, `|` in a title is a normal character; the `\|` above is only for this Markdown table.

### 2.2 Internal links

| From | To | Anchor text |
|---|---|---|
| Hub | Every segment page | "Medicare", "Medicare Advantage", "Medi-Cal", "Vivant Health", "Nivano Physicians", "Paying without insurance", "Community clinic or private doctor?" |
| Every segment page | Hub | "All insurance and payment options" |
| Every segment page | `/new-patients` | "How to become a new patient" |
| Every segment page | `/dr-paramjit-panesar-md` | "About Dr. Panesar" |
| Every segment page | `/contact` | "Directions and contact" |
| Medicare, Medicare Advantage | `/annual-physical-sacramento` (once live) | "Annual physical" |
| Medi-Cal, Vivant, Nivano, Medicare Advantage | Each other where the plan overlaps (Vivant ↔ Medi-Cal and Medicare Advantage) | Plan name |
| Uninsured | Medi-Cal page (once live), community clinic page | "Applying for Medi-Cal", "Community clinic or private doctor?" |
| Community clinic | Uninsured page, Medi-Cal page, hub | Same |
| Home | Hub (existing card) | "Insurance and payment options" |
| `/family-physician-elk-grove` | Hub, Medicare, Medi-Cal | "Plans accepted for Elk Grove patients" |
| `/new-patients` | Hub (existing) and the uninsured page | "Paying without insurance" |
| Footer | Hub only | Keeps the footer short; segment pages are reached through the hub |

The existing template already drops any link to a page that is not live, so held pages never produce a dead link.

---

## 3. Page briefs

### 3.0 Shared blocks (written once, used on every segment page)

The site already builds Quick Facts from one data source (`quickFacts()` in `src/lib/content-utils.ts`). The shared blocks below work the same way: each is defined once in `content.ts` and reused, so a fact cannot drift between pages. Each brief lists which shared blocks it uses. Shared blocks count toward each page's 700 to 1,000 words.

**Quick Facts** (same format and order as the live pages):

| Label | Value |
|---|---|
| Practice | Apollo Physicians, a family medicine practice |
| Address | 8191 Timberlake Way, Suite 200, Sacramento, CA 95823 |
| Phone | 916-236-5800 |
| Hours | Mon-Fri 8:30 a.m.-5:30 p.m.; Sat 9:00 a.m.-2:00 p.m. [CONFIRM; the row is hidden until confirmed] |
| Provider | Dr. Paramjit Panesar, MD (NPI 1982892659) |
| Insurance | Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, UnitedHealthcare, Sutter Health, Hill Physicians, and Medicare (+ Medi-Cal, Nivano Physicians, Vivant Health once confirmed) |
| Price | Initial self-pay visits start at $65. |
| Appointments | Same-day and next-day appointments |
| New patients | Accepted |

**Required verify line** (on every insurance page, word for word): "Call 916-236-5800 to verify your exact plan and network, because plans change."

**S1. Documents to bring** (checklist)
- A photo ID
- Every insurance card you have: Medicare card, Medicare Advantage card, Medi-Cal Benefits Identification Card (BIC), or your health plan card
- A list of your medicines and supplements, with the dose
- Recent test results, records and vaccination records, if you have them
- Your previous doctor's name and phone number
- Any form you need filled out
- A way to pay your copay or self-pay fee [CONFIRM accepted payment methods]

**S2. How to become a patient** (numbered)
1. Call 916-236-5800 and say you are a new patient.
2. Give your plan name and member ID, or say you will pay for yourself.
3. If your plan assigns you a primary care doctor, ask your plan to assign Dr. Paramjit Panesar, MD, at Apollo Physicians.
4. Choose a same-day, next-day or later appointment.
5. Bring the documents on the checklist to your first visit.

**S3 to S7. Shared questions** (40 to 60 words each; counted in section 8)

**S3. Q: What are Apollo Physicians' office hours?** [CONFIRM]
**A:** Apollo Physicians is open Monday to Friday from 8:30 a.m. to 5:30 p.m. and Saturday from 9:00 a.m. to 2:00 p.m. Pacific time. The office is closed on Sunday. Same-day and next-day appointments are offered, so call 916-236-5800 early in the day to ask for the next opening.

**S4. Q: Where is Apollo Physicians?**
**A:** Apollo Physicians is at 8191 Timberlake Way, Suite 200, Sacramento, CA 95823, in South Sacramento. The office is next to Highway 99 and about 0.4 mile from Methodist Hospital of Sacramento. Google Maps shows about 12 minutes by car from Elk Grove ZIP codes 95758 and 95624.

**S5. Q: Does Apollo Physicians offer telehealth visits?** [CONFIRM]
**A:** Apollo Physicians offers telemedicine visits for patients who are in California. Call 916-236-5800 to ask whether your visit can be done by video and whether your plan covers it. Some visits, such as a physical exam or an immigration medical exam, must happen in the office.

**S6. Q: How do I check that my plan covers a visit?**
**A:** Look at your insurance card for the plan name, member ID and the medical group, if one is listed. Call Apollo Physicians at 916-236-5800 with those details before your visit. Call 916-236-5800 to verify your exact plan and network, because plans change. You can also call the member services number on your card.

**S7. Q: How much does a visit cost if I pay for myself?**
**A:** Initial self-pay visits at Apollo Physicians start at $65. Self-pay means you pay the office directly instead of using insurance. Ask what the visit includes and whether any tests, vaccines or forms cost extra [CONFIRM what $65 covers], so you know the total before your appointment. Call 916-236-5800.

**Review line** (shown after the review only): "Administratively reviewed by Dr. Paramjit Panesar, MD. Last reviewed: [date]." Set the date with `CLINICAL_REVIEW.reviewedOn`. Never show a date before the review happens.

**Spanish version:** worth building only if the front desk can take calls in Spanish [CONFIRM languages staff speak]. A Spanish page that leads to an English-only phone line loses the patient and draws bad reviews. If staff do speak Spanish, translate the Medi-Cal, uninsured and hub pages first, because those segments are the most likely to search in Spanish [ESTIMATE]. Use human translation, `hreflang` pairs, and the same facts.

---

### 3.1 Hub: Insurance and Payment Options (`/insurance-accepted`)

**H1:** Insurance and Payment Options

**Direct answer:** Apollo Physicians in South Sacramento accepts Medicare and these health plans: Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net and UnitedHealthcare, plus the Sutter Health and Hill Physicians medical groups. Patients without insurance can pay for themselves, and initial self-pay visits start at $65. Call 916-236-5800 to verify your plan.

Then Quick Facts, then:

**Plans accepted** (table: plan, type, how to check)

| Plan or group | What it is | Notes |
|---|---|---|
| Medicare | Federal health insurance | Original Medicare; link to the Medicare page |
| Medicare Advantage | Medicare plans run by private companies | Which plans [CONFIRM]; link |
| Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, UnitedHealthcare | Health insurance companies | Ask about your specific plan and network |
| Sutter Health, Hill Physicians | Medical groups | Your plan may assign you a doctor through one of these |
| Medi-Cal | California's Medicaid program | **Held until confirmed** |
| Vivant Health (formerly River City Medical Group), Nivano Physicians | Medical groups | **Held until confirmed** |
| No insurance | Self-pay | Initial visits from $65 |

Below the table, one line: "Call 916-236-5800 to verify your exact plan and network, because plans change. List last checked with the practice: [date]."

**H2 questions** (keep the 10 FAQs already on the page and add these):
1. **Q: What is the difference between a health plan and a medical group?** **A:** A health plan, such as Blue Shield of California or Health Net, pays for your care. A medical group, such as Sutter Health or Hill Physicians, is a network of doctors that some plans use, mainly HMOs. Apollo Physicians accepts both kinds listed on this page. Call 916-236-5800 to check yours.
2. S6 (check coverage), S7 (self-pay), S3 (hours), S4 (location), S5 (telehealth).

Then S2 (how to become a patient), S1 (documents), and links to each segment page. **About 750 words** with the existing FAQs. Retitle only; the URL stays.

---

### 3.2 Original Medicare (`/medicare-doctor-sacramento`)

**H1:** Medicare Doctor in Sacramento

**Direct answer:** Apollo Physicians in Sacramento accepts Original Medicare for family medicine visits with Dr. Paramjit Panesar, MD, a board-certified family physician. New patients are welcome, and same-day and next-day appointments are offered. Bring your red, white and blue Medicare card to your visit. Call 916-236-5800 to verify your coverage first.

Quick Facts, then an intro of about 90 words: Original Medicare is the federal program run by the government. Part B covers doctor visits. Medicare.gov explains what Part B covers and what you may pay. Apollo Physicians bills Medicare for visits [CONFIRM: accepts Medicare assignment]. Then the required verify line.

**H2 questions:**
1. **Q: Does Apollo Physicians accept Original Medicare?** **A:** Yes. Apollo Physicians accepts Original Medicare for visits with Dr. Paramjit Panesar, MD, at 8191 Timberlake Way, Suite 200, in South Sacramento. New Medicare patients are welcome. Bring your Medicare card and a photo ID, and call 916-236-5800 to verify your coverage before your first visit.
2. **Q: Does Apollo Physicians accept Medicare assignment?** [CONFIRM] **A:** Apollo Physicians accepts Medicare assignment, which means the office agrees to take the Medicare-approved amount for covered services. You may still owe your Part B deductible and coinsurance. Medicare.gov explains what you may pay. Call 916-236-5800 with questions about your visit.
3. **Q: I also have a Medicare supplement or Medi-Cal. What should I bring?** **A:** Bring every card you have: your Medicare card, any Medicare supplement (Medigap) card and, if you have one, your Medi-Cal card. Apollo Physicians uses them to bill your coverage in the right order. Call 916-236-5800 to verify your exact plan and network, because plans change.
4. **Q: Is Dr. Panesar board certified?** **A:** Yes. Dr. Paramjit Panesar, MD, is board certified in family medicine by the American Board of Family Medicine and holds California medical license A 114684. You can check both on the Medical Board of California and ABFM websites. Apollo Physicians is at 8191 Timberlake Way, Suite 200, Sacramento.
5. S6, S3, S4, S5.

Then S2, S1, the review line, and sources: Medicare.gov ("Your Medicare coverage"), Medical Board of California license search. **About 800 words.**

Do not compare Medicare plans or suggest switching plans, and do not promise any benefit.

---

### 3.3 Medicare Advantage and medical groups (`/medicare-advantage-doctor-sacramento`)

**H1:** Medicare Advantage Doctor in Sacramento

**Direct answer:** Apollo Physicians in Sacramento sees patients with some Medicare Advantage plans, often through the Sutter Health and Hill Physicians medical groups [CONFIRM exact plans]. If your plan assigns a primary care doctor, choose Dr. Paramjit Panesar, MD, with your plan first. Call 916-236-5800 to verify your exact plan and network, because plans change.

Quick Facts, then an intro of about 100 words: Medicare Advantage plans are Medicare plans offered by private companies. Many are HMOs. In an HMO you choose a primary care doctor in the plan's network, often through a medical group. Apollo Physicians works with the Sutter Health and Hill Physicians medical groups. Then a table of accepted Medicare Advantage plans [CONFIRM each plan and product].

**H2 questions:**
1. **Q: Which Medicare Advantage plans does Apollo Physicians accept?** [CONFIRM] **A:** Apollo Physicians accepts these Medicare Advantage plans: [CONFIRM list]. Many are offered through the Sutter Health and Hill Physicians medical groups. Each plan has several products and networks, so call 916-236-5800 to verify your exact plan and network, because plans change.
2. **Q: How do I make Dr. Panesar my primary care doctor on a Medicare Advantage HMO?** **A:** Call the member services number on your Medicare Advantage card, or use your plan's website, and ask to change your primary care doctor to Dr. Paramjit Panesar, MD, at Apollo Physicians. Ask when the change takes effect. Then call Apollo Physicians at 916-236-5800 to book your first visit.
3. **Q: What is a medical group, and why does it matter?** **A:** A medical group is a network of doctors that a Medicare Advantage HMO uses to provide care. Your card may name one, such as Sutter Health or Hill Physicians. Apollo Physicians accepts patients from both. Call 916-236-5800 to verify your exact plan and network, because plans change.
4. **Q: Do I need a referral to see Dr. Panesar?** [CONFIRM] **A:** If Dr. Paramjit Panesar, MD, is your assigned primary care doctor, you usually do not need a referral for a visit at Apollo Physicians [CONFIRM]. Referral rules differ by plan, so call Apollo Physicians at 916-236-5800 and the member services number on your card before your visit.
5. S6, S3, S4, S5.

Then S2, S1, the review line, and a Medicare.gov source. **About 850 words.** No enrollment wording ("switch now", "best plan", "extra benefits") and no plan comparisons.

---

### 3.4 Medi-Cal (`/medi-cal-doctor-sacramento`); held

**H1:** Medi-Cal Doctor in South Sacramento

**Direct answer:** Apollo Physicians in South Sacramento accepts Medi-Cal through [CONFIRM: the Medi-Cal managed care plans and medical groups the practice contracts with]. Medi-Cal members choose a primary care doctor through their plan, so ask your plan to assign Dr. Paramjit Panesar, MD. Call 916-236-5800 to verify your plan.

Quick Facts, then an intro of about 100 words: Medi-Cal is California's Medicaid program. In Sacramento County most members are in a Medi-Cal managed care plan and get care from the primary care doctor the plan assigns. Then a table of the Medi-Cal plans and medical groups accepted [CONFIRM: each plan, e.g. Anthem Blue Cross, Health Net, Molina, and the medical group used: Vivant Health or another]. Then the required verify line.

**H2 questions:**
1. **Q: Does Apollo Physicians accept Medi-Cal?** [CONFIRM] **A:** Yes. Apollo Physicians accepts Medi-Cal through these plans: [CONFIRM]. Dr. Paramjit Panesar, MD, sees adults and [CONFIRM ages] at 8191 Timberlake Way, Suite 200, in South Sacramento. Call 916-236-5800 to verify your exact plan and network, because plans change.
2. **Q: How do I change my Medi-Cal doctor to Dr. Panesar?** **A:** Call the member services number on your Medi-Cal plan card, or use your plan's website, and ask to change your primary care doctor to Dr. Paramjit Panesar, MD, at Apollo Physicians. Ask the date the change starts. Then call Apollo Physicians at 916-236-5800 to book your first visit.
3. **Q: What if I have Medi-Cal but no plan card yet?** **A:** New Medi-Cal members may get a Benefits Identification Card before they choose or are given a plan. Bring it to Apollo Physicians, along with any letters from Medi-Cal. Call 916-236-5800 first, so the office can check what your coverage allows before your visit. [CONFIRM: whether the practice sees fee-for-service Medi-Cal]
4. **Q: Can I see a doctor while my Medi-Cal application is pending?** **A:** Yes, as a self-pay patient. Initial self-pay visits at Apollo Physicians start at $65. Ask the office whether your Medi-Cal could later cover the visit [CONFIRM the practice's policy]. You can apply for Medi-Cal at BenefitsCal.com or through Sacramento County. Call 916-236-5800 to book.
5. S6, S3, S4, S5.

Then S2, S1, the review line, and sources: DHCS Medi-Cal managed care, BenefitsCal. **About 850 words.** Publish only after Medi-Cal is confirmed.

---

### 3.5 Vivant Health, formerly River City Medical Group (`/vivant-health-doctor-sacramento`); held

**H1:** Vivant Health (River City Medical Group) Doctor in Sacramento

**Direct answer:** Apollo Physicians in Sacramento [CONFIRM: is contracted with] Vivant Health, the Sacramento medical group formerly called River City Medical Group. Vivant Health members with Medi-Cal or Medicare can ask their plan to assign Dr. Paramjit Panesar, MD, as their primary care doctor. Call 916-236-5800 to verify your exact plan.

Quick Facts, then an intro of about 80 words: River City Medical Group began doing business as Vivant Health in September 2024. It is an independent physician association (IPA) that serves Medi-Cal and Medicare members in the Sacramento area. An IPA is a network of independent doctors that health plans use. Cite Vivant Health's "Our New Brand" page. Then the required verify line.

**H2 questions:**
1. **Q: Is River City Medical Group the same as Vivant Health?** **A:** Yes. River City Medical Group, a Sacramento medical group founded in 1992, began doing business as Vivant Health in September 2024. If your card still says River City Medical Group, it refers to the same network. Call Apollo Physicians at 916-236-5800 to verify your exact plan and network.
2. **Q: Does Apollo Physicians accept Vivant Health?** [CONFIRM] **A:** Yes. Apollo Physicians accepts Vivant Health members for [CONFIRM: Medi-Cal, Medicare or both] through these plans: [CONFIRM]. Dr. Paramjit Panesar, MD, sees patients at 8191 Timberlake Way, Suite 200, in South Sacramento. Call 916-236-5800 to verify your exact plan and network, because plans change.
3. **Q: How do I choose Dr. Panesar through Vivant Health?** **A:** Call the member services number on your health plan card and ask to change your primary care doctor to Dr. Paramjit Panesar, MD, at Apollo Physicians, in the Vivant Health network. Ask the date the change starts. Then call Apollo Physicians at 916-236-5800 to book your first visit.
4. S6, S7, S3, S4, S5.

Then S2, S1, the review line. **About 700 words.** If the contract is not confirmed, **do not build the page** and do not name Vivant Health anywhere.

---

### 3.6 Nivano Physicians (`/nivano-physicians-doctor-sacramento`); held

**H1:** Nivano Physicians Doctor in Sacramento

**Direct answer:** Apollo Physicians in Sacramento accepts patients from Nivano Physicians [CONFIRM what Nivano is, and the contract]. If your health plan assigns your doctor through Nivano Physicians, ask the plan to choose Dr. Paramjit Panesar, MD, at Apollo Physicians. Call 916-236-5800 to verify your exact plan and network before you book.

**H2 questions:**
1. **Q: Does Apollo Physicians accept Nivano Physicians?** [CONFIRM] **A:** Yes. Apollo Physicians accepts patients assigned through Nivano Physicians with these plans: [CONFIRM]. Dr. Paramjit Panesar, MD, sees patients at 8191 Timberlake Way, Suite 200, in South Sacramento. Call 916-236-5800 to verify your exact plan and network, because plans change.
2. **Q: How do I choose Dr. Panesar through Nivano Physicians?** **A:** Call the member services number on your health plan card and ask to change your primary care doctor to Dr. Paramjit Panesar, MD, at Apollo Physicians, in the Nivano Physicians network. Ask the date the change starts. Then call Apollo Physicians at 916-236-5800 to book your first visit.
3. S6, S7, S3, S4, S5.

Then S2, S1, the review line. **About 700 words.**

**Recommendation:** if the only unique content is "yes, we accept Nivano", the page fails the swap test: swap the group's name and nothing else changes. Then a section on the hub is better than a thin page. Build the page only if the practice can add real Nivano-specific facts (which plans route through Nivano, any process differences).

---

### 3.7 Without insurance (`/doctor-without-insurance-sacramento`)

**H1:** Doctor Without Insurance in Sacramento

**Direct answer:** Apollo Physicians in South Sacramento sees patients without insurance. Initial self-pay visits start at $65 with Dr. Paramjit Panesar, MD, a board-certified family physician. Ask what the visit includes and whether tests or forms cost extra. Same-day and next-day appointments are offered. Call 916-236-5800 to book a self-pay visit.

Quick Facts, then an intro of about 80 words: what self-pay means; ask for the total before the visit; tests, vaccines and forms may cost more [CONFIRM list]. Mention a discount or sliding scale **only** if confirmed [CONFIRM]; until then say nothing about one.

**H2 questions:**
1. **Q: Can I see a doctor without insurance in Sacramento?** **A:** Yes. Apollo Physicians in South Sacramento sees patients who pay for their own visit. Initial self-pay visits start at $65 with Dr. Paramjit Panesar, MD. Say you will pay for yourself when you call 916-236-5800, and ask what the visit includes.
2. S7 (cost).
3. **Q: What is included in the $65 visit?** [CONFIRM] **A:** The initial self-pay visit at Apollo Physicians includes [CONFIRM: for example, a visit and exam with Dr. Paramjit Panesar, MD]. Lab tests, vaccines and forms [CONFIRM: are or are not included]. Ask for the total before your appointment when you call 916-236-5800.
4. **Q: How do I pay?** [CONFIRM] **A:** Apollo Physicians accepts [CONFIRM: cash, debit and credit cards] for self-pay visits. Payment is due [CONFIRM: at the visit]. Ask about the total cost before your appointment, including any tests, so there are no surprises. Call 916-236-5800 with questions about paying for your visit.
5. **Q: Can I get help with insurance?** **A:** You may qualify for Medi-Cal, California's free or low-cost health coverage, or for a Covered California plan. You can apply for Medi-Cal at BenefitsCal.com and compare plans at CoveredCA.com. Apollo Physicians can see you as a self-pay patient while you apply. Call 916-236-5800 to book.
6. S3, S4, S5.

Then S2, S1 (with "a way to pay"), the review line, and sources: BenefitsCal, Covered California. **About 800 words.** Avoid "cheap", "lowest", "free" and comparisons with named clinics.

---

### 3.8 Community clinic or private doctor? (`/community-clinic-alternative-sacramento`); held for item 40

**H1:** Community Clinic or Private Family Doctor?

**Direct answer:** Apollo Physicians is a private family medicine practice in South Sacramento, not a community health center or free clinic. It accepts Medicare and several major health plans, and initial self-pay visits start at $65. If you need a sliding-scale fee, a community health center may fit better. Call 916-236-5800 to ask about your options.

Quick Facts, then:

**What is the difference?** (table)

| | Community health center (FQHC) | Apollo Physicians |
|---|---|---|
| Who runs it | A nonprofit or public organisation that gets federal funding (HRSA) | A private family medicine practice |
| Fees for people without insurance | Must offer a sliding fee based on income (HRSA rules) | Initial self-pay visits from $65; sliding scale [CONFIRM; omit the claim if none] |
| Insurance | Usually Medi-Cal, Medicare and others | Medicare and the plans listed on the hub |
| Doctor | A team; you may see different clinicians | Dr. Paramjit Panesar, MD, board certified in family medicine |
| Appointments | Varies by clinic | Same-day and next-day appointments |

Source: HRSA "What is a health center?" and the HRSA "Find a Health Center" tool (findahealthcenter.hrsa.gov).

**H2 questions:**
1. **Q: Is Apollo Physicians a community health center?** **A:** No. Apollo Physicians is a private family medicine practice at 8191 Timberlake Way, Suite 200, in South Sacramento. It is not a federally qualified health center or a free clinic. It accepts Medicare and several health plans, and initial self-pay visits start at $65. Call 916-236-5800.
2. **Q: What is an FQHC?** **A:** A federally qualified health center, or FQHC, is a community clinic that gets federal funding to serve everyone, including people without insurance. FQHCs must offer fees based on income. You can find one with the HRSA Find a Health Center tool. Apollo Physicians is a private practice, not an FQHC.
3. **Q: When might a private family doctor be a better fit?** **A:** A private practice such as Apollo Physicians may suit you if you want one named doctor, same-day or next-day appointments, and a plan it accepts. If you need an income-based fee, a community health center may suit you better. Call 916-236-5800 to ask what Apollo Physicians offers.
4. **Q: Does Apollo Physicians offer a sliding scale?** [CONFIRM. **Remove this question entirely if there is none**] **A:** [CONFIRM]
5. S7, S6, S3, S4.

Then S2, S1, and the review line. **About 750 words.** Never put "free clinic", "FQHC" or "community health center" in the title, H1 or schema as a description of Apollo. Those words appear only to explain the difference.

---

## 4. Structured data

Rules:
- Reuse the live `@id` nodes: `https://www.apollophysicians.com/#clinic`, `#dr-paramjit-panesar` and `#website`. The page template already emits these with every page (`pageGraph` in `src/lib/structured-data.ts`). The new pages add only their own nodes.
- Plans go in the visible text, not in invented properties. schema.org has no `acceptsInsurance` property for a clinic. The health extension has `HealthInsurancePlan`, but no search engine uses it on clinic pages, so it is left out.
- No `aggregateRating` and no review markup.
- `lastReviewed` and `reviewedBy` are valid on `WebPage`, but appear only after the review date is set, as on the live health pages.
- `openingHoursSpecification` stays off until the hours are confirmed.

### 4.1 Full example: Medi-Cal page (once confirmed)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@id": "https://www.apollophysicians.com/#website" },
    { "@id": "https://www.apollophysicians.com/#clinic" },
    { "@id": "https://www.apollophysicians.com/#dr-paramjit-panesar" },
    {
      "@type": "WebPage",
      "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#webpage",
      "url": "https://www.apollophysicians.com/medi-cal-doctor-sacramento",
      "name": "Medi-Cal Doctor in South Sacramento | Apollo Physicians",
      "description": "South Sacramento family doctor for Medi-Cal members. How to choose Dr. Paramjit Panesar, MD, as your primary care doctor. Call 916-236-5800 to verify your plan.",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "https://www.apollophysicians.com/#website" },
      "about": { "@id": "https://www.apollophysicians.com/#clinic" },
      "mainEntity": { "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#service" },
      "breadcrumb": { "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#breadcrumb" },
      "hasPart": { "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#faq" },
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["[data-speakable]"] },
      "lastReviewed": "<YYYY-MM-DD, only after review>",
      "reviewedBy": { "@id": "https://www.apollophysicians.com/#dr-paramjit-panesar" }
    },
    {
      "@type": "Service",
      "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#service",
      "name": "Family medicine for Medi-Cal members",
      "serviceType": "Primary care",
      "provider": { "@id": "https://www.apollophysicians.com/#clinic" },
      "areaServed": [
        { "@type": "City", "name": "Sacramento" },
        { "@type": "City", "name": "Elk Grove" }
      ],
      "url": "https://www.apollophysicians.com/medi-cal-doctor-sacramento"
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#faq",
      "isPartOf": { "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I change my Medi-Cal doctor to Dr. Panesar?",
          "acceptedAnswer": { "@type": "Answer", "text": "<exactly the visible answer>" }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.apollophysicians.com/medi-cal-doctor-sacramento#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.apollophysicians.com/" },
        { "@type": "ListItem", "position": 2, "name": "Insurance and payment options", "item": "https://www.apollophysicians.com/insurance-accepted" },
        { "@type": "ListItem", "position": 3, "name": "Medi-Cal", "item": "https://www.apollophysicians.com/medi-cal-doctor-sacramento" }
      ]
    }
  ]
}
```

In the code, the first three entries are the full nodes the template already outputs, not bare references. The `@id` format of the WebPage, FAQ and breadcrumb nodes should match whatever `webPageId()`, `faqId()` and `breadcrumbId()` return today. Read them from `src/lib/structured-data.ts` instead of typing them by hand.

### 4.2 The other pages

| Page | WebPage `@id` slug | Service `name` | Breadcrumb level 3 |
|---|---|---|---|
| Hub | `/insurance-accepted` | none (hub) | none (two levels) |
| Medicare | `/medicare-doctor-sacramento` | Family medicine for Original Medicare patients | Medicare |
| Medicare Advantage | `/medicare-advantage-doctor-sacramento` | Family medicine for Medicare Advantage members | Medicare Advantage |
| Vivant Health | `/vivant-health-doctor-sacramento` | Family medicine for Vivant Health members | Vivant Health |
| Nivano | `/nivano-physicians-doctor-sacramento` | Family medicine for Nivano Physicians members | Nivano Physicians |
| Uninsured | `/doctor-without-insurance-sacramento` | Self-pay family medicine visits | Paying without insurance |
| Community clinic | `/community-clinic-alternative-sacramento` | none (explainer page) | Community clinic or private doctor? |

**Clinic `sameAs`:** add it to `#clinic` once you send the profile URLs. Only add a URL after opening it and checking that it shows this name, Suite 200 and 916-236-5800. Candidates: Google Business Profile, Yelp, Facebook, Healthgrades, the Hill Physicians and Vivant Health directory entries. The physician already has Doximity and WebMD.

Validate each page with validator.schema.org and `npm run validate:schema` before release.

---

## 5. GEO assets

### 5.1 `llms.txt` sections (same style as the live file; each appears only once confirmed)

```
## Insurance and payment

- Accepted: Aetna, Anthem Blue Cross, Blue Shield of California, Cigna, Health Net, UnitedHealthcare, Sutter Health, Hill Physicians, and Medicare. Sutter Health and Hill Physicians are medical groups.
- Call 916-236-5800 to verify your exact plan and network, because plans change.
- Insurance and payment options: https://www.apollophysicians.com/insurance-accepted

## Medicare

- Original Medicare is accepted. New Medicare patients are welcome.
- Medicare Advantage: [CONFIRM plan list]. HMO members choose Dr. Paramjit Panesar, MD, as their primary care doctor through their plan.
- Pages: https://www.apollophysicians.com/medicare-doctor-sacramento ; https://www.apollophysicians.com/medicare-advantage-doctor-sacramento

## Medi-Cal  [only after confirmation]

- Medi-Cal accepted through: [CONFIRM plans and medical groups].
- Members ask their Medi-Cal plan to assign Dr. Paramjit Panesar, MD, as their primary care doctor.
- Page: https://www.apollophysicians.com/medi-cal-doctor-sacramento

## Medical groups  [only after confirmation]

- Vivant Health (formerly River City Medical Group): [CONFIRM].
- Nivano Physicians: [CONFIRM].

## Without insurance

- Initial self-pay visits start at $65. [CONFIRM what is included.]
- Apollo Physicians is a private family medicine practice, not a community health center, FQHC or free clinic.
- Page: https://www.apollophysicians.com/doctor-without-insurance-sacramento
```

The generator (`src/lib/llms.ts`) already adds sections behind flags in `LLMS_CONFIRMED`. Add one flag per segment so a section cannot appear before its fact is confirmed.

### 5.2 `llms-full.txt` (new)

The repo has no `llms-full.txt`. Generate one from the same data files as `llms.txt`, with the full text of every live page: direct answer, Quick Facts, every FAQ, and the insurance table. Generating it means it never drifts from the pages. Note that Google ignores both files; they help other AI systems only.

### 5.3 AI answer pack (12 quotable answers)

Short, self-contained, facts only. Use the same wording on the pages, the FAQ hub and `llms.txt`.

| # | Question | Answer | Status |
|---|---|---|---|
| 1 | Does Apollo Physicians accept Medicare? | Yes. Apollo Physicians, a family medicine practice at 8191 Timberlake Way, Suite 200, Sacramento, accepts Original Medicare and welcomes new patients. Call 916-236-5800. | Now |
| 2 | Does Apollo Physicians accept Medicare Advantage? | Apollo Physicians accepts some Medicare Advantage plans, including through the Sutter Health and Hill Physicians medical groups. Call 916-236-5800 to verify your exact plan. | Plan list [CONFIRM] |
| 3 | Does Apollo Physicians take Medi-Cal? | Yes. Apollo Physicians in South Sacramento accepts Medi-Cal through [CONFIRM plans]. Ask your plan to assign Dr. Paramjit Panesar, MD. | **Held** |
| 4 | Is River City Medical Group now Vivant Health? | Yes. River City Medical Group began doing business as Vivant Health in September 2024. | Now (public fact); Apollo's contract [CONFIRM] |
| 5 | Is Apollo Physicians in the Vivant Health network? | [CONFIRM] | **Held** |
| 6 | Is Apollo Physicians in the Nivano Physicians network? | [CONFIRM] | **Held** |
| 7 | How much is a doctor visit without insurance at Apollo Physicians? | Initial self-pay visits at Apollo Physicians in South Sacramento start at $65. Ask what the visit includes. Call 916-236-5800. | Now |
| 8 | Is Apollo Physicians a community health center or free clinic? | No. Apollo Physicians is a private family medicine practice in South Sacramento. It accepts Medicare and several health plans; initial self-pay visits start at $65. | Now (after item 40) |
| 9 | How do I make Dr. Panesar my primary care doctor? | Call the member services number on your insurance card and ask to change your primary care doctor to Dr. Paramjit Panesar, MD, at Apollo Physicians, then call 916-236-5800 to book. | Now |
| 10 | Is Dr. Paramjit Panesar board certified? | Yes. Dr. Paramjit Panesar, MD, is board certified in family medicine by the American Board of Family Medicine; California license A 114684; NPI 1982892659. | Now |
| 11 | Is Apollo Physicians open on Saturday? | [CONFIRM: Yes, 9:00 a.m. to 2:00 p.m.] | Hours [CONFIRM] |
| 12 | Where is Apollo Physicians? | 8191 Timberlake Way, Suite 200, Sacramento, CA 95823, next to Highway 99, about 0.4 mile from Methodist Hospital of Sacramento and about 12 minutes from Elk Grove by car. | Now |

---

## 6. Local and off-site plan

### 6.1 Google Business Profile

| Field | Recommendation |
|---|---|
| Primary category | Family practice physician [check that exact name in Google's category picker] |
| Additional categories | Medical clinic; Doctor [check the picker]. Do **not** add "Community health centre" or any category describing a type of organisation Apollo is not |
| Services | Family medicine; Annual physical exam [after review]; Same-day and next-day appointments; Immigration medical exam (Form I-693); Medicare patients; Medi-Cal patients [after confirmation]; Self-pay visits; Telemedicine [CONFIRM] |
| Website field | `https://www.apollophysicians.com/` (it currently points to the parked drparamjitpanesar.com) |
| Appointment link | `https://www.apollophysicians.com/new-patients?utm_source=google&utm_medium=business-profile` |
| Hours | Set only after item 6 is confirmed, then copy them to every listing in 6.2 |
| Q&A | Google has phased out public Q&A on Business Profiles. Put these answers on the website FAQ instead: Do you take Medicare? Do you take Medi-Cal? [after confirmation] How much is a visit without insurance? Are you a community clinic? Which suite are you in? Do you see Elk Grove patients? |
| Description | Start from the strategy document's version; remove Medi-Cal, Saturday and telemedicine until confirmed; add "Suite 200" |

**8 post ideas** (60 to 120 words each, one button, no health advice):
1. "Accepting new Medicare patients", with a link to the Medicare page
2. "How to choose Dr. Panesar on a Medicare Advantage HMO" (not during the enrollment period as a sales pitch; keep it informational)
3. "No insurance? Initial self-pay visits start at $65"
4. "Medi-Cal members: how to choose your primary care doctor" [after confirmation]
5. "River City Medical Group is now Vivant Health: what that means for your card" [after confirmation]
6. "Same-day and next-day appointments"
7. "We're in Suite 200 at 8191 Timberlake Way" (with a photo of the suite sign)
8. "Holiday office closures" (Thanksgiving is Thursday 26 Nov 2026; Christmas; New Year) [CONFIRM dates closed]

### 6.2 NAP and hours to enforce everywhere

Enforce exactly:

```
Apollo Physicians
8191 Timberlake Way, Suite 200
Sacramento, CA 95823
916-236-5800
https://www.apollophysicians.com/
Hours: [CONFIRM: Mon-Fri 8:30 AM-5:30 PM; Sat 9:00 AM-2:00 PM; Sun closed]
```

| Listing | Known problem (11 Nov) | Action |
|---|---|---|
| Superpages | Shows 916-655-9883 | Change the phone to 916-236-5800 |
| YellowPages | Not checked | Claim; match the block above |
| WebMD | 5 providers; hours 8:30-5:00, Saturday closed | Correct the providers [item 17] and the hours [item 6] |
| Vitals | Same record as WebMD | Same |
| MapQuest | Several "Apollo Physicians" entries | Keep one; ask for the others to be removed |
| Yelp | Not checked | Claim; match |
| Birdeye | Not checked | Claim; match. Do not use Birdeye's review-gating features (asking only happy patients) |
| Tebra | Lists aesthetics and weight loss; hours missing | Remove services that are not offered [item 26]; add hours once confirmed |
| Hill Physicians, Sutter, Vivant Health, Nivano directories | Hill lists another doctor at 8191 Timberlake Way (Suite 400 practice) | Make sure Dr. Panesar's entry says **Suite 200** |

Also fix NPPES. Dr. Panesar's record still shows a Roseville location; the organisation record has the right address.

### 6.3 Five trustworthy local citation and referral targets

| Target | Why | Condition |
|---|---|---|
| Hill Physicians "Find a Doctor" profile for Dr. Panesar | It appears for Medicare and Hill Physicians searches | Make sure it says accepting new patients and Suite 200 |
| Vivant Health provider directory | It serves Medi-Cal and Medicare searches under both names | Only if the contract is confirmed |
| Medicare Care Compare (medicare.gov) | The official Medicare doctor finder; AI systems trust it | Check the address and phone through PECOS or NPPES |
| USCIS civil surgeon locator | The official source for I-693 searches | Check the address and phone |
| Elk Grove Chamber of Commerce or Sacramento Covered (a nonprofit that helps with enrollment) | A real local organisation page for the Elk Grove audience, or a resource listing for uninsured patients | Membership or a resource listing; never a paid link scheme |

Methodist Hospital of Sacramento lists affiliated physicians. Pursue that only if Dr. Panesar has privileges there (item 18).

### 6.4 Review-request script (no incentives)

Front desk, at checkout, said the same way to every patient:

> "Thanks for coming in today. If you have a minute, we'd appreciate an honest review on Google. It helps other families in Sacramento find us. Here's a card with the link. Whatever you choose to write is up to you."

Text message version (only to patients who agreed to texts):

> "Apollo Physicians: thank you for your visit. If you'd like to share an honest review, here's our Google link: [link]. Reply STOP to opt out."

Rules: ask everyone, not only happy patients. Offer no discount, gift or raffle. Never suggest wording. Never mention the visit's reason. Replies never confirm someone is a patient or mention care.

---

## 7. 90-day sequence (12 Nov 2026 to 9 Feb 2027)

Effort: L = under half a day, M = 1 to 3 days, H = more than 3 days (`[ESTIMATE]`). Owners: P = practice, W = whoever edits the site, S = SEO lead.

| Week | Work | Effort | Owner | Proof it worked |
|---|---|---|---|---|
| 1 (12-18 Nov) | Answer the blockers: hours, Medi-Cal plans, Nivano, Vivant contract, telemedicine, what $65 covers, sliding scale, item 40 | L | P | Answers recorded in `client-confirmations.md` |
| 1 | Search Console and Bing verified; record a baseline of queries per segment; run the AI spot check (section 5.3 questions in ChatGPT, Perplexity, Gemini, Google AI Mode) | L | S | Baseline saved |
| 2 (19-25 Nov) | Retitle the hub; build the Medicare and uninsured pages; add the shared blocks to `content.ts` | M | W, S | Pages indexed; zero schema errors |
| 2 | Google Business Profile: website field, appointment link, Suite 200, services | L | P | GBP calls and website clicks (Insights) start to be counted |
| 3 (26 Nov-2 Dec) | Holiday hours on the profile and listings; fix Superpages, WebMD, Vitals, MapQuest, Tebra | M | P | Conflict list shows zero for phone and suite |
| 3 | Build the Medicare Advantage page with confirmed plans | M | W, S | Indexed |
| 4 (3-9 Dec) | Dr. Panesar's review; set the review date; Medicare and uninsured pages show the review line | L | P | Review line live |
| 4 | Build the Medi-Cal page (if confirmed) | M | W, S | Indexed |
| 5-6 (10-23 Dec) | Vivant Health and Nivano pages, or hub sections only (per 3.6); Hill Physicians and Vivant directory entries | M | W, P | Directory profiles show Suite 200 |
| 5-6 | `llms.txt` segment sections; generate `llms-full.txt` | L | W | Both files list only confirmed facts |
| 7 (24-30 Dec) | Holiday closures posted. First check of impressions per segment page | L | P, S | Search Console impressions by page |
| 8 (31 Dec-6 Jan) | Community clinic page (only if item 40 allows) | M | W, S | Indexed |
| 9-10 (7-20 Jan) | Review routine running; two citation targets from 6.3 | M | P | Reviews per week; new referring domains |
| 11 (21-27 Jan) | Second AI spot check with the same prompts | L | S | Times Apollo is named, and whether the facts are right |
| 12 (28 Jan-3 Feb) | Spanish pages, only if staff speak Spanish | H | W, translator | Spanish-query impressions |
| 13 (4-9 Feb) | Report: queries, impressions and clicks per segment; GBP calls; front-desk "how did you hear" log split by segment; next 90 days | L | S, P | New patients by payment type |

Metrics by segment: track Search Console impressions and clicks for each page's phrases (section 1), GBP calls and website clicks each month, and the front-desk log of new patients by payment type: Medicare, Medicare Advantage, Medi-Cal, medical group, self-pay. That log is the one that shows more patients.

---

## 8. Length checks

All titles, meta descriptions, direct answers and Q&A answers in this document were counted with a script on 11 Nov 2026:

- Titles: 54 to 60 characters (limit 50-60).
- Meta descriptions: 152 to 160 characters (limit 150-160).
- Direct answers and answers without placeholders: 40 to 54 words (limit 40-60).

Five items fall short **only because they still hold a [CONFIRM] placeholder**: the Medi-Cal direct answer, the Medi-Cal and Vivant "do you accept" answers, "What is included in the $65 visit?" and "How do I pay?". Count them again once the real words replace the placeholders. The site's tests (`aeo-copy.test.ts`) enforce the same limits when the copy is coded.

---

## Questions for the practice

| # | Question | Blocks |
|---|---|---|
| 1 | Office hours: are they Mon-Fri 8:30-5:30 and Sat 9:00-2:00, or Mon-Fri 8:30-5:00 with weekends closed (as Google, WebMD and Vitals show)? Holiday closures? | Hours on every page, schema, GBP, all listings |
| 2 | Medi-Cal: is it accepted? Which Medi-Cal managed care plans (Anthem Blue Cross, Health Net, Molina, others) and through which medical group? Fee-for-service Medi-Cal as well? Is there a policy for visits while an application is pending? | Medi-Cal page, hub |
| 3 | Vivant Health (formerly River City Medical Group): is there a signed contract? For Medi-Cal, Medicare, or both? Which health plans? | Vivant page |
| 4 | Nivano Physicians: what is it exactly (IPA or medical group), is there a contract, and for which plans? | Nivano page |
| 5 | Medicare: does the practice accept Medicare assignment? Which Medicare Advantage plans and products are accepted, and through which medical groups? | Medicare and Medicare Advantage pages |
| 6 | Telemedicine: offered? For which visit types? On which platform? Covered by which plans? | Telehealth answer |
| 7 | What does the $65 initial self-pay visit include? What costs extra (labs, vaccines, forms)? Price for established patients? | Uninsured page |
| 8 | Is there a sliding scale or other discount for low-income patients? (If not, the site will not mention one.) | Uninsured and community clinic pages |
| 9 | Accepted payment methods, and when payment is due | Uninsured page, documents checklist |
| 10 | Is the practice operated by, contracted with or connected to a community health center or "community health clinic" (confirmations item 40)? | Community clinic page; entire segment 7 |
| 11 | Referral rules for HMO patients assigned to Dr. Panesar | Medicare Advantage answer |
| 12 | Which ages does Dr. Panesar see? | Medi-Cal answer, well-child terms |
| 13 | Languages spoken by Dr. Panesar and the front desk | Spanish version; "languages" searches |
| 14 | Hospital affiliation (Methodist Hospital of Sacramento or other) | Citation target |
| 15 | Profile URLs for the clinic's `sameAs`: Google Business Profile, Yelp, Facebook, Healthgrades, directories | Schema |
| 16 | The other four providers WebMD lists: do any practise at Suite 200 today? | WebMD and Vitals corrections |

## Sources checked on 11 Nov 2026

- Vivant Health, "Our New Brand": https://vivanthealth.com/our-rebrand
- CMA, River City Medical Group expansion: https://cmadocs.org/newsroom/news/view/ArticleId/22026/River-City-Medical-Group-expands-into-new-Northern-California-counties
- Vivant Health, Medi-Cal: https://vivanthealth.com/for-patients/medi-cal
- Health Net, Dignity Health and Vivant Health partnership (2025): https://www.healthnet.com/content/healthnet/en_us/news-center/news-releases/2025-04-24-hn-dignity-vivant-partnership-improve-patient-care-sacramento-hospitals.html
- BlueHive, Dr. Takhar's Family Medicine & Urgent Care (Suite 400): https://www.bluehive.com/provider/dr-takhars-family-medicine-and-urgent-care-clinic
- Quest Diagnostics, 8191 Timberlake Way (Suite 300): https://www.questdiagnostics.com/locations/detail.html/VGK/95823/75/4
- HRSA Find a Health Center: https://findahealthcenter.hrsa.gov/
