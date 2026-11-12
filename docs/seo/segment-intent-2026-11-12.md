# Apollo Physicians - segment intent research (SERP read, 2026-11-12)

Method and limits
- Source: WebSearch (standard mode) for about 40 of the planned 42 queries, run once with "Sacramento" and once with "Elk Grove". WebSearch returns a summarized result list, not a raw SERP. It does NOT show the map pack, People Also Ask, ads, or whether an AI Overview appears. Every AI Overview call below is an inference from query type.
- Volumes: unknown for every query (no keyword tool).
- Rate-limit failures: "Nivano Physicians doctors Sacramento" (substituted with "Nivano Physicians Sacramento IPA provider directory"), "Nivano ... accepting new patients Elk Grove" (skipped, near-duplicate of the Elk Grove Nivano query), "self-pay doctor visit Elk Grove" (substituted by "doctor without insurance Elk Grove", which returned cash-pay results). Plain "FQHC" and "free clinic" were run only with city modifiers.
- Page-type taxonomy file (skills/seo-sxo/references/page-type-taxonomy.md) was not consulted; labels below are the ones in the brief (directory, clinic site, health system, government, guide/article) plus "IPA/plan site" and "broker".
- Hard rules applied: Apollo is NOT an FQHC. Do not claim FQHC status or sliding-scale-as-FQHC. Only publish plan, IPA, and price claims the owner has confirmed.

## Cross-segment patterns
1. Transactional "doctor that accepts X + city" queries are owned by directories: Zocdoc insurance-filter category pages (e.g. zocdoc.com/primary-care-doctors/sacramento/medi-cal, /medicare, and the Elk Grove equivalents, paginated), Hill Physicians individual doctor pages (hillphysicians.com/doctor/...), Medifind, Everyday Health (everydayhealth.care), WebMD, Vitals, Healthgrades, FindClarity. No independent clinic site appeared in any of the Medi-Cal or Medicare "accepts" result sets. A single clinic page will not outrank these for the head term. The lever is being listed correctly on the directories plus long-tail pages.
2. How-to and cost queries are owned by government, plan, and national guide sites. These are the most likely AI Overview triggers. A clinic page should be a short, specific supporting section, not the main bet.
3. IPA/medical-group brand queries (Vivant, River City, Nivano) are dominated by the group's own site, press releases, and NPI/people-search junk. There is almost no clinic-page competition. This is the largest relative opening, but only if Apollo is truly contracted with the group.
4. Entity-collision risk: Hill Physicians lists a Dr. Paramjit Singh Takhar at 8191 Timberlake Way, Suite 400 (same building as Apollo, Suite 200). The first name matches Dr. Paramjit Panesar. Apollo pages and directory profiles need unambiguous Name, Address, Phone: full name "Paramjit Panesar", Suite 200, and Person schema with sameAs links. Also "Timberlake Family Practice" is a different practice at 9381 E Stockton Blvd, Elk Grove; avoid brand overlap.
5. Time-sensitive: SERPs show a Medi-Cal change effective January 1, 2027 (some members move to fee-for-service and can choose any doctor taking Medi-Cal fee-for-service, per dhcs.ca.gov pages). That is about 7 weeks out. Exact eligibility was not confirmed, so verify on dhcs.ca.gov before publishing any statement about it.

---

## Segment 1 - Medi-Cal

Queries run
| Query | Page types in top results | Named competitors (domains) | AI Overview likely? |
|---|---|---|---|
| doctors that accept Medi-Cal Sacramento | Directories almost entirely | zocdoc.com (Medi-Cal filter pages 3-6), hillphysicians.com (doctor profiles for Wellspace, Peach Tree, Elica clinicians) | Low to medium; local pack plus directories |
| doctors that accept Medi-Cal Elk Grove | Directories, one county PDF, health system | zocdoc.com, hillphysicians.com, medifind.com, healthy.kaiserpermanente.org, dhs.saccounty.net (CHDP Medi-Cal provider PDF, April 2024) | Low to medium |
| Medi-Cal doctor South Sacramento | Directories, plan PDFs | hillphysicians.com (many profiles; Niazi Family Medicine on E Southgate Dr 95823 is a direct local competitor), zocdoc.com, kaiserpermanente.org Medi-Cal directory PDFs | Low to medium |
| Medi-Cal doctor Elk Grove | Directories, health system | zocdoc.com, hillphysicians.com, medifind.com, kaiserpermanente.org | Low to medium |
| how to change my Medi-Cal doctor Sacramento | Government, plan sites, one broker/blog | dhcs.ca.gov (Health Care Options form, MCP transition FAQs, fee-for-service FAQ), kaiserpermanente.org, sfhp.org, cencalhealth.org, shunins.com | High (how-to) |
| how to change my Medi-Cal doctor Elk Grove | Same as above plus Kaiser Elk Grove office pages | dhcs.ca.gov, kaiserpermanente.org (Elk Grove Promenade member services), calchoice.com, sfhp.org | High |

Does a single Apollo page fit? /medi-cal-doctor-sacramento fits the intent only as a "clinic that takes your plan, accepting new patients, here is how to switch to us" page. It will not displace Zocdoc or Hill for the head term. It can win long-tail terms (plan name plus 95823 plus Timberlake Way) and it is the landing page for the directory traffic. The "how to change" query wants an official step list; do not try to beat dhcs.ca.gov, answer it in a short section.

Page type to build: clinic service/location page with a plan-by-plan acceptance table, plus a "how to switch your doctor to Apollo" steps block (3 to 5 steps).

Above the fold: "Accepting new Medi-Cal patients at 8191 Timberlake Way, Suite 200, Sacramento 95823" (only if confirmed), list of Medi-Cal plans and medical groups Apollo is contracted with (owner-confirmed only), phone, hours, languages, request-appointment button, "Call your plan to choose Dr. Panesar as your primary care doctor" with the member-services path.

Evidence needed to beat what ranks: exact Medi-Cal managed-care plan names and the IPA/medical group each is under; accepting-new-patients status and date checked; step list (find plan name on card, call plan member services number on the card, give provider name and NPI, ask for effective date, usually the first of next month per plan guidance, ask about continuity of care for up to 12 months); Health Care Options help line 1-800-430-4263 and Medi-Cal Help Line 1-800-541-5555 as cited in results; Dr. Panesar credentials and board certification; languages spoken; visit-ready details (what to bring).

AI question to win: "How do I change my Medi-Cal doctor in Sacramento?" Answer in 3 to 5 numbered steps with the plan-card instruction first.

Elk Grove notes: Elk Grove results lean on Zocdoc/Hill plus Kaiser Elk Grove pages. Few Elk Grove clinics are Medi-Cal and primary care (Hill shows one Elk Grove family-medicine listing plus an OB-GYN). Add an "Elk Grove patients, X minutes from Apollo" section on the same page rather than a separate doorway page.

Off-site targets: Zocdoc (Medi-Cal filter pages), Hill Physicians doctor finder (if Dr. Panesar is a Hill provider, confirm), each Medi-Cal plan's provider directory, Vivant/Nivano directories (if contracted), Healthgrades, WebMD, Medifind, Everyday Health, Vitals, FindClarity, Google Business Profile with insurance attributes, official Medi-Cal provider directory.

---

## Segment 2 - Original Medicare

Queries run
| Query | Page types | Named competitors | AI Overview likely? |
|---|---|---|---|
| doctor that accepts Medicare Sacramento | Directories | zocdoc.com, doctor.webmd.com (Mercy Medical Group), everydayhealth.care | Low to medium |
| doctor that accepts Medicare Elk Grove | Directories | zocdoc.com (Elk Grove /medicare pages), everydayhealth.care (many profiles) | Low to medium |
| Medicare primary care doctor accepting new patients Sacramento | Directories | zocdoc.com (/sacramento/medicare pages 2-5), hillphysicians.com, findclarity.com | Medium |
| Medicare primary care doctor accepting new patients Elk Grove | Directories, health system | zocdoc.com, medifind.com, doctor.webmd.com, hillphysicians.com, findclarity.com, vitals.com | Medium |
| Medicare family doctor South Sacramento | Directories | medifind.com, doctor.webmd.com (Sacramento Family Medical Center, 4241 Florin Rd), vitals.com, healthline care, everydayhealth.care, zocdoc.com, hillphysicians.com | Low to medium |
| Medicare family doctor Elk Grove | Directories, health system | zocdoc.com, dignityhealth.org (Thomas Valdez profile), healthgrades.com, medifind.com, everydayhealth.care | Low to medium |

Does a single Apollo page fit? /medicare-doctor-sacramento fits only as a clinic page that says clearly which Medicare types Apollo takes. Results repeatedly confuse Original Medicare with Medicare Advantage, and one Zocdoc listing explicitly says it takes Medicare Part B fee-for-service without a secondary like Medi-Cal or Medigap. That shows searchers need a precise coverage statement. Directories win the head term; the page wins by being the accurate source that directories link to.

Page type to build: clinic page with a "Which Medicare do we take" block (Original Medicare Part B, Medigap/supplement, Medicare Advantage by named plan and IPA, Medi-Cal as secondary). Must be owner-confirmed.

Above the fold: "Primary care for Medicare patients in South Sacramento, accepting new patients" (if confirmed), coverage chips, Annual Wellness Visit mention (only if offered), Dr. Panesar credential line, phone, address, directions.

Evidence needed: exact coverage types; whether Apollo is a Medicare-participating provider (the official Medicare Care Compare listing is what the AI answers point to); new-patient status; services (annual wellness visit, chronic care, same-week appointments); languages; what to bring (Medicare card, supplement card, ID).

AI question to win: "Does [practice] accept Medicare and am I able to become a new patient?" Short factual block with date verified.

Elk Grove notes: Elk Grove Medicare SERPs show strong health-system presence (Dignity/Mercy Big Horn Blvd, UC Davis Elk Grove, Kaiser, Sutter Medical Plaza). Position Apollo as the independent South Sacramento option with an "Elk Grove patients welcome" line.

Off-site targets: Medicare Care Compare (Physician Compare data, check PECOS enrollment and address), Zocdoc /medicare filter, Healthgrades, Vitals, WebMD, Everyday Health, Medifind, FindClarity, Hill Physicians finder, Google Business Profile.

---

## Segment 3 - Medicare Advantage / medical group (Hill Physicians)

Queries run
| Query | Page types | Named competitors | AI Overview likely? |
|---|---|---|---|
| Hill Physicians Medicare doctor Sacramento | IPA site, plan PDFs, news | hillphysicians.com (Medicare plans page, becoming-a-member pages, open enrollment page), dignityhealth.org (HPMG brochure), blueshieldca.com (2027 Medicare directory with Hill Care Solutions section), biospace.com (Knox-Keene license news) | Medium |
| Hill Physicians Medicare doctor Elk Grove | IPA doctor profiles, third-party | hillphysicians.com (Policicchio, Sabin, Le, Zhu, Dhir profiles, ancillary partner PDFs), everydayhealth.care, zocdoc.com | Low to medium |
| Medicare Advantage doctor Sacramento | Brokers, health systems, plan pages | allseniors.org, medicareplans.com, medicareadvantage.com, expertinsurancereviews.com, sutterhealth.org, dignityhealth.org, health.ucdavis.edu, zocdoc.com | High |
| Medicare Advantage doctor Elk Grove | Directories, health systems | medifind.com (MAPD and Western Health Advantage tags), doctor.webmd.com (UC Davis Medical Group Elk Grove, Mercy), zocdoc.com, allseniors.org | Medium to high |
| how to change primary care doctor Medicare Advantage HMO Sacramento | National payer guides, plan sites | humana.com, blueshieldca.com, helpadvisor.com, ncoa.org, caring.com, tuftsmedicarepreferred.org, calchoice.com, canohealth.com | High |
| how to change primary care doctor Medicare Advantage HMO Elk Grove | Same | Same | High |

Notes from the SERP: Hill Physicians has a restricted Knox-Keene license for Sacramento County (2020) and lists partner Medicare plans (Anthem Blue Cross, Blue Shield of California, Central Health Plan, CCHP, Health Net/Wellcare, Humana, UnitedHealthcare, per its page and 2025 brochure; may have changed). Network status can differ between a practice and an individual physician, and guides advise confirming with the plan using the doctor's name and NPI.

Does a single Apollo page fit? No separate page for Medicare Advantage. A section on /medicare-doctor-sacramento fits best, because the "how to change PCP" answer is generic national content and the plan/IPA directories own the doctor-list queries. Hill brand queries return Hill's own site, so Apollo cannot rank for those unless it is a Hill provider and a profile exists.

Page type to build: section on the Medicare page: "Medicare Advantage: confirm we are in your plan's network" with a named-plan table (only confirmed), the IPA each plan assigns, and a 4-step PCP change walkthrough.

Above the fold for the section: "Have a Medicare Advantage HMO? Check whether Dr. Panesar is in your network," member-ID instruction, plan names, phone.

Evidence needed: confirmed plan and IPA contracts for plan year 2027 (Annual Enrollment Period is Oct 15 to Dec 7, and the Medicare Advantage Open Enrollment Period is Jan 1 to Mar 31, per Humana's guidance in results); plan-change steps (log into member portal, "Change PCP", or call the number on the card; HMO members generally must use in-network providers); effective date of change.

AI question to win: "How do I change my primary care doctor in a Medicare Advantage HMO?" Steps: confirm doctor in network, call plan or use portal, request effective date, new card.

Elk Grove notes: the Elk Grove MA SERP is health-system and directory driven (Dignity/Mercy, UC Davis, Sutter, Kaiser). Same single section; add "Elk Grove members" line.

Off-site targets: Hill Physicians doctor finder, Blue Shield, Anthem, Health Net/Wellcare, Humana, UnitedHealthcare, Western Health Advantage provider directories, Medicare Plan Finder, Zocdoc, Medifind (shows MAPD tags), WebMD.

---

## Segment 4 - Vivant Health / River City Medical Group

Queries run
| Query | Page types | Named competitors | AI Overview likely? |
|---|---|---|---|
| Vivant Health doctors Sacramento | Group's own site, news, directories | vivanthealth.com (home, our-company, Medi-Cal page, announcements), sutterhealth.org, commonspirit.org, mapquest/startpage listings, bbb.org | Low (brand; knowledge panel likely) |
| Vivant Health doctors Elk Grove | Group site plus unrelated Elk Grove directories | vivanthealth.com, zocdoc.com, medifind.com, commonspirit.org | Low |
| River City Medical Group doctors Sacramento | NPI aggregators, map listings, group site | npifinder.com, npino.org, mapquest listings, vivanthealth.com, superpages | Low |
| River City Medical Group doctors Elk Grove | Same, no Elk Grove match | nursinghomedatabase.com, commonspirit.org, vivanthealth.com, kaiserpermanente.org | Low |
| is River City Medical Group now Vivant Health (Sacramento and Elk Grove) | Press release, group site | vivanthealth.com (announcements, rebrand page, provider FAQs), prnewswire.com (Oct 22, 2024 rebrand release), bbb.org | Medium to high (simple factual question) |

Facts surfaced: Vivant Health is the new brand of River City Medical Group, Inc. (rebrand announced fall 2024; legal entity still River City Medical Group, Inc. dba Vivant Health). It is an IPA serving Medi-Cal and Medicare, headquartered at 7311 Greenhaven Dr, Sacramento 95831, 916-228-4300, claims over 270,000 patients. No Elk Grove office was found. These details come from search results and should be verified.

Does a single Apollo page fit? Only if Apollo is actually contracted with Vivant/RCMG. The intent is "does my doctor belong to this group, how do I get assigned to a doctor in it," which no clinic page currently answers. Competition is thin: the group's own site and junk directories. Do not build speculatively; owner must confirm contract status.

Page type to build: a short informational clinic sub-page or section, "Vivant Health (formerly River City Medical Group) patients: how to see Dr. Panesar," with the rebrand explained in one line and the steps to select Apollo through the health plan.

Above the fold: "Vivant Health, formerly River City Medical Group" label (only if confirmed), who this is for, how to switch, phone.

Evidence needed: contract confirmation; which plans route members through Vivant; steps to change PCP (call plan, give provider name/NPI); address and hours; patient-assignment rules.

AI question to win: "Is River City Medical Group now Vivant Health?" Answer in one sentence plus date, then link to Vivant.

Elk Grove notes: nothing ties Vivant to Elk Grove. Do not claim an Elk Grove connection; at most say "serving patients from South Sacramento and Elk Grove".

Off-site targets: Vivant Health provider directory and the plan directories that list "Vivant" or "River City Medical Group" as medical group; NPI registry accuracy; Google Business Profile.

---

## Segment 5 - Nivano Physicians

Queries run
| Query | Page types | Named competitors | AI Overview likely? |
|---|---|---|---|
| Nivano Physicians doctors Sacramento | Search failed (rate limit); substituted IPA directory query: company profiles, press, NPI sites, plan PDFs | linkedin.com, npifinder.com, globenewswire.com (2019 Anthem Medicare contract), santelog.com (Molina Medi-Cal agreement), dmhc.ca.gov (RBO list), blueshieldca.com and healthnet.com PDFs, reportcard.opa.ca.gov | Low |
| Nivano Physicians doctors Elk Grove | Noise: Kaiser, Dignity, Mercy, Sutter, Medifind; plus LinkedIn | linkedin.com, kaiserpermanente.org, commonspirit.org, hillphysicians.com | Low |
| Nivano Physicians primary care accepting new patients Sacramento | No Nivano-specific result; generic Zocdoc/Medifind/Hill; one NPI profile | npifinder.com, zocdoc.com, medifind.com, findclarity.com, hillphysicians.com | Low |
| what is Nivano Physicians | Company profile and press | linkedin.com (IPA, founded 1998, Sacramento, ACO REACH), globenewswire.com, einpresswire.com (Qualmetrix) | Medium |

Facts surfaced: Nivano Physicians is an IPA in Sacramento and surrounding counties, with Medicare, Medi-Cal, and commercial contracts (Anthem Medicare 2019; Molina Medi-Cal agreement date not captured), over 900 providers in 2019, and an ACO REACH program. Addresses conflict across sources (1420 River Park Dr Ste 200 on NPI registry; 2554 Millcreek Dr Ste 120 on LinkedIn; older Grass Valley address on DMHC list). Search did not surface nivanophysicians.com directly. Stale data suggests searchers may not find a good answer.

Does a single Apollo page fit? Yes, this is the best fit of all segments because there is no local clinic content and the intent is half navigational, half "who are they and how do I get a doctor in this group." /nivano-physicians-doctor-sacramento should work only if Apollo is confirmed as a Nivano-contracted practice.

Page type to build: clinic landing page plus short explainer: "Nivano Physicians primary care in South Sacramento: how to choose Dr. Panesar."

Above the fold: one-sentence definition of Nivano (an IPA that your health plan assigns you to, not an insurance company), "Dr. Panesar is a Nivano Physicians primary care provider" (confirmed only), steps to select or switch through the plan, phone and address.

Evidence needed: contract confirmation and which health plans route to Nivano (Medicare Advantage, Medi-Cal, commercial); verified Nivano contact; patient steps; new-patient status.

AI question to win: "What is Nivano Physicians?" Define in two sentences, then give how-to-switch steps.

Elk Grove notes: no Nivano doctors found in Elk Grove results. Say "Elk Grove patients welcome" only if true; do not claim Nivano presence there.

Off-site targets: Nivano's provider directory, health plan directories listing Nivano, Healthgrades/Zocdoc affiliation fields, Google Business Profile affiliation, LinkedIn.

---

## Segment 6 - Low income / uninsured

Queries run
| Query | Page types | Named competitors | AI Overview likely? |
|---|---|---|---|
| doctor without insurance Sacramento | Directories, cash-pay marketplaces, government | zocdoc.com, sesamecare.com, snahc.org, dhs.saccounty.gov (programs for uninsured residents: CMISP, Healthy Partners), saccounty.gov, dpcfrontier.com (direct primary care) | Medium |
| doctor without insurance Elk Grove | Directories, telehealth, urgent care | zocdoc.com, plushcare.com, sesamecare.com, solvhealth.com, blackhealth.org, medifind.com | Medium |
| self-pay doctor visit Sacramento | Urgent care booking pages, telehealth | solvhealth.com (Carbon Health, Capitol Urgent Care, Sutter pages), zocdoc.com, sesamecare.com, freemarkethealthcareblog.com | Medium |
| self-pay doctor visit Elk Grove | Not run (rate limit); covered by previous query | (see above) | - |
| how much is a doctor visit without insurance | Guides/articles | galileo.io, khealth.com, solvhealth.com, singlecare.com, zocdoc.com blog, adventhealth.com, healthtap.com, bettercare.com, debt.org, talktomira.com, doctronic.ai | High |
| how much is a doctor visit without insurance Sacramento | Guides plus local listings and price databases | solvhealth.com, zocdoc.com, plushcare.com, medicalpricecheck.com (Mercy General CPT 99213 cash price $251 vs California average $176), singlecare.com, bettercare.com | High |

Price benchmarks from results: national primary care visit about $100 to $300 (Zocdoc average $171, Solv about $160); Sacramento urgent care self-pay about $100 to $250 (Carbon Health Natomas $215); telehealth $45 to $129; one blog cites roughly $75 for a 15 to 29 minute new-patient visit if a doctor accepts Medicare rates as cash price (low-confidence). Federal Good Faith Estimate right is mentioned by several.

Does a single Apollo page fit? Partly. For the cost query the winning format is a guide/article with a price table. A clinic page /doctor-without-insurance-sacramento fits the "doctor without insurance + city" query only if it publishes Apollo's actual self-pay prices, which is what the guides cannot do. It also needs honest "if you may qualify for Medi-Cal or county programs, check first" content.

Page type to build: clinic service page with a visible self-pay price list plus a "cost without insurance" explainer section and an eligibility-screening block.

Above the fold: Apollo self-pay price for a new-patient and an established visit (owner must supply actual numbers; none are in the research), what is included, payment methods, how to book, "You may qualify for Medi-Cal or county help, here is where to check."

Evidence needed: published Apollo cash prices; labs and in-office tests pricing or pointer; Good Faith Estimate offer; comparison against local benchmarks above; county programs (CMISP, Healthy Partners as cited on dhs.saccounty.gov), Covered California/Medi-Cal screening. Time-sensitive note (from general knowledge, not the search; verify): California's Medi-Cal enrollment rules for some adult populations changed in 2026, so avoid stating eligibility rules without checking DHCS.

AI question to win: "How much is a doctor visit without insurance in Sacramento?" Give a local range and Apollo's price.

Elk Grove notes: Elk Grove results are more telehealth and urgent-care (PlushCare, Sesame, MDSTAT Urgent Care on Laguna Blvd, Elk Grove Walk-in Care). No free clinic found. Position Apollo as in-person continuity at a published cash price.

Off-site targets: Solv, Sesame, Zocdoc self-pay listing (if Apollo offers cash visits), Healthgrades, Google Business Profile payment attribute, Sacramento County DHS referral resources, local community resource lists (211).

---

## Segment 7 - FQHC / community clinic

Queries run
| Query | Page types | Named competitors | AI Overview likely? |
|---|---|---|---|
| community clinic vs private doctor Sacramento | Directory/promo pages, many junk domains | freeclinics.us, webmd.com, snahc.org, dignityhealth.org, health.ucdavis.edu, 1degree.org, plus scraped or spammy domains (presentationbuilder.internationaltrucks.com, ava.ead.domalberto.edu.br) | Medium |
| community clinic vs private doctor (national) | Research and foreign articles | med.stanford.edu (2012 study: health centers as good as private practice on 13 of 18 quality measures), pmc.ncbi.nlm.nih.gov, directrelief.org, expatica.com, imf.org | Medium to high |
| FQHC Sacramento | Government, directories | dhs.saccounty.gov, carelistings.com, blackhealth.org, feedam.org, matsui.house.gov, nhchc.org, kaiserpermanente.org (Peach Tree FQHC page) | Medium |
| FQHC Elk Grove | Government and definitions; no confirmed Elk Grove FQHC | dhcs.ca.gov (FQHC/RHC page), ruralhealthinfo.org, findahealthcenter.hrsa.gov, hcai.ca.gov (Shifa Health Center, 9390 Big Horn Blvd, licensed community clinic; FQHC status unconfirmed) | Medium to high (definition) |
| free clinic Sacramento | Directories, student-run clinic news | freeclinics.us, health.ucdavis.edu (Clinica Tepati), idealist.org, feedam.org, causeiq.com, donotpay.com | Medium |
| free clinic Elk Grove | Urgent care, health systems; no free clinic confirmed | blackhealth.org, solvhealth.com, dignityhealth.org, health.ucdavis.edu | Medium |

Local FQHC and community-clinic names surfaced: WellSpace Health, Elica Health Centers, One Community Health (formerly Cares Community Health), Sacramento County Health Center (4600 Broadway), Peach Tree Healthcare, Sacramento Native American Health Center (SNAHC), Sacramento Community Clinics/HALO.

Does a single Apollo page fit? A community-clinic explainer fits only as a fair, non-promotional "FQHC vs private practice" comparison. Searchers for "FQHC" and "free clinic" want a definition or a free or sliding-fee place; Apollo is not an FQHC and should not appear to be. Conversion potential is low on those head terms. The comparison query has no dominant intent (SERP is muddled and includes spam domains), so a clear, honest page could rank, but its value is trust and linking more than direct patients.

Page type to build: explainer/guide, "Community health center (FQHC) vs private primary care: how to choose," with a neutral comparison table, a list of local FQHCs with links, and when a private practice fits (continuity, scheduling, plan acceptance). It must say plainly that Apollo is a private practice.

Above the fold: a two-sentence answer, a compare table (cost model, who is eligible, insurance accepted, wait times, services), and links to the HRSA locator.

Evidence needed: accurate definition (HRSA/DHCS), sliding-fee scale facts from clinics' own pages, the Stanford quality comparison (cite correctly), what Apollo offers (insurance accepted, self-pay prices), neutrality.

AI question to win: "What is the difference between a community clinic and a private doctor?"

Elk Grove notes: no confirmed Elk Grove FQHC found; Shifa Health Center at 9390 Big Horn Blvd is the only community clinic surfaced and its FQHC status is not verified (check HRSA). Say "check HRSA's locator for current options" rather than naming it as an FQHC.

Off-site targets: link outreach or mention opportunities from local resource lists (Sacramento County DHS, 211, freeclinics.us, blackhealth.org, feedam.org) only if Apollo is accurately described as a private practice; do not seek FQHC listings.

---

## Priority order (recommendation)
1. Nivano page (thin competition) and Vivant page: only after contract confirmation.
2. Medi-Cal page with plan-by-plan table plus switching steps.
3. Medicare page with Medicare Advantage section.
4. Self-pay page with real prices.
5. Community-clinic explainer last (low conversion, trust value).
6. In parallel: directory profile cleanup on Zocdoc, Hill, Healthgrades, WebMD, Medifind, Everyday Health, Vitals, with name/address/suite disambiguation from the Takhar listing.
