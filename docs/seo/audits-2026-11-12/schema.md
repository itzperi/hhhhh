# Schema audit: apollophysicians.com (fetched 2026-11-12, curl, raw HTML; all 7 pages HTTP 200)

Scripts and raw artefacts (read-only audit, no project files touched): scratchpad\audit.js, scratchpad\check.js, scratchpad\html\*.html, scratchpad\html\*.jsonld.json

## Detection
- One `<script type="application/ld+json">` per page, 7 blocks, all parse. Each is a single `@context: https://schema.org` + `@graph`. No Microdata/RDFa (0 `itemtype`). JSON-LD is server-rendered (present in raw HTML).
- Graph per page:
  - / : WebSite, MedicalClinic, Physician+Person, WebPage, FAQPage (8 Q). No BreadcrumbList (acceptable on home).
  - /new-patients : WebSite, MedicalClinic, Physician+Person, WebPage, FAQPage (8), BreadcrumbList
  - /family-physician-elk-grove : same shape, FAQPage (8), BreadcrumbList
  - /dr-paramjit-panesar-md : WebSite, MedicalClinic, Physician+Person, ProfilePage (mainEntity = Physician), FAQPage (6), BreadcrumbList
  - /insurance-accepted : same shape as new-patients, FAQPage (12), BreadcrumbList
  - /contact : FAQPage (6), BreadcrumbList
  - /faq : FAQPage (7), BreadcrumbList
- 50 FAQ items in total.
- Note: pages use WebPage (and ProfilePage), not MedicalWebPage. Not an error.

## Validation results
| Check | Result |
|---|---|
| Every block parses as JSON | PASS (7/7) |
| @context is https://schema.org | PASS |
| @id references resolve within each graph | PASS (0 unresolved refs on all pages; WebPage.hasPart -> #faq, FAQPage.isPartOf, breadcrumb, employee/worksFor all resolve) |
| FAQ question and answer text word-for-word in visible HTML (scripts stripped, entities decoded, whitespace normalised) | PASS, 50/50 questions and 50/50 answers match. No `<details>`/collapsed markup; CSS-hidden state not rendered, so "visible to a human" is unmeasured (only DOM text presence is measured) |
| openingHoursSpecification | PASS. Mon-Fri 08:30-17:30; Sat 09:00-14:00; Sunday omitted (= closed). Visible footer text on every page: "Mon to Fri 8:30 am to 5:30 pm; Sat 9:00 am to 2:00 pm" |
| NAP in markup | PASS. Clinic and Physician nodes identical on all 7 pages (byte-identical JSON). 8191 Timberlake Way, Suite 200 / Sacramento / CA / 95823 / +19162365800 |
| NAP in visible text | PASS on all 7 pages: street, Suite 200, 95823, 916-236-5800 present; only one phone number found in text; tel: links all +19162365800 |
| aggregateRating / Review markup | PASS: none anywhere. Home has a "Patient reviews" section but it is only a link to Google reviews, no rating or review text |
| Deprecated types (HowTo, SpecialAnnouncement, CourseInfo etc.) | PASS: none |
| Invented/invalid properties | PASS: all properties used exist on schema.org and are on valid types (legalName, isAcceptingNewPatients, medicalSpecialty=PrimaryCare, hasMap, priceRange, paymentAccepted, areaServed, identifier/PropertyValue NPI, hasCredential/EducationalOccupationalCredential, recognizedBy, alumniOf, knowsAbout) |
| Absolute URLs / ISO times | PASS. logo.png, share-card.png, Doximity and WebMD sameAs URLs all return 200 |
| Canonical matches WebPage.url and breadcrumb final item | PASS on all 7 |
| sameAs | PARTIAL: Physician has 2 (Doximity, WebMD). MedicalClinic has none |
| Markup claims vs visible text | PASS: legalName "Apollo Physicians Medical Group", NPI 1982892659, license A 114684, "From $65" (visible as "initial self-pay visits start at $65"), civil surgeon, new-patient acceptance all appear on pages |

## Findings (by severity)
1. MedicalClinic has no sameAs (Medium). No Google Business Profile / Maps URL, no Yelp/Healthgrades/Facebook etc. Add only profiles that actually exist and are owned/claimed (e.g. the GBP place URL, which is the most valuable). Not verified here which exist: unmeasured.
2. FAQPage on all 7 pages (Info). Google retired FAQ rich results for all sites on 7 May 2026, so there is no Google SERP benefit; any AI/GEO benefit is unconfirmed. The markup is valid and matches visible text exactly, so it is harmless. Keep or drop at will; do not spend effort extending it. The /faq content is first-party clinic FAQ (not user-submitted Q&A), so QAPage is not appropriate.
3. Five FAQ questions are duplicated verbatim between home and an inner page (Info/Low). "Where is Apollo Physicians located?" (home, contact), "What insurance does Apollo Physicians accept?" (home, insurance-accepted), "Does Apollo Physicians serve patients from Elk Grove?" (home, elk-grove), "Who is Dr. Paramjit Panesar?" (home, dr page), "Is Apollo Physicians accepting new patients?" (home, new-patients). Same answers on two URLs. No SERP impact now; just redundant.
4. speakable on every WebPage (Low). `cssSelector: [data-speakable]` resolves (5 elements per page) but Google's speakable support is limited to news publishers in the US. No harm, no benefit. Optional removal.
5. Physician typed as ["Physician","Person"] (Low). Physician is a MedicalBusiness/Organization subtype; Person-only properties (honorificPrefix/Suffix, alumniOf, hasCredential) are used on it. Dual typing is permitted and parsers accept it. Optional: type as Person with jobTitle "Family physician" plus Physician only if wanted. Not an error.
6. ProfilePage lacks dateModified/dateCreated (Low). Recommended by Google for ProfilePage; optional. Add only if dates are real and maintained (unmeasured whether the CMS tracks them).
7. WebPage nodes carry no dateModified (Low/Info). Optional; no medical-review (`lastReviewed`/`reviewedBy`) markup either. If clinical content is physician-reviewed, MedicalWebPage + reviewedBy Dr. Panesar is a legitimate, honest addition. Only add if true.
8. areaServed Place names "ZIP code 95823" etc. (Info). Valid, but nonstandard naming; "Place" with a postalCode address is an unusual way to express a ZIP. Optional: use AdministrativeArea / PostalCodeRange-style or drop ZIP entries and keep City/neighbourhood entries. No functional issue.
9. priceRange "From $65" (Info). Valid free text and matches visible self-pay claim. Google examples use "$$"-style or ranges ("$65-$150"); not required. Keep if the $65 claim remains accurate.
10. Home URL has no trailing slash (https://www.apollophysicians.com) in url/@id and canonical (Info). Consistent everywhere and resolves; no action.
11. Missing opportunities (all optional): no hasOfferCatalog/MedicalProcedure/Service markup for services (immigration civil-surgeon exam, physicals); no `availableService`; no `contactPoint`. Only add where the page visibly describes them. No rich-result benefit expected for any.
12. Not measured: Google Rich Results Test / Schema Markup Validator output, Search Console enhancement reports, JS-rendered DOM vs raw (raw already contains full graph), and rendering of FAQ text against CSS visibility.

## Verdict
Clean, consistent, valid graph with correct hours and NAP, no review/rating markup, no deprecated types, all @id links resolve. Main gaps are a missing clinic-level sameAs and the (now benefit-less) FAQPage layer.

Score: 8.5 / 10
