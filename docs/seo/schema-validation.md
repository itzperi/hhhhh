# Schema validation record (Step 5)

Date: 5 Nov 2026. Validated against the local production build, because the new markup is not deployed yet. **Rerun every row marked "after deploy" once the site is live.**

## Results

| Check | Tool | Result |
|-------|------|--------|
| All three pages: every node, property, enumeration value and `@id` | `node scripts/validate-schema.mjs` (checks the build output against the current schema.org vocabulary) | **Pass** |
| Physician page graph (WebSite, MedicalClinic, Physician+Person, ProfilePage, FAQPage, BreadcrumbList) | Schema Markup Validator, validator.schema.org, code snippet mode | **0 errors, 0 warnings.** It reported 2 top-level items (ProfilePage, WebSite); the clinic, physician, FAQ and breadcrumb nodes were checked through their `@id` references. |
| Home and Elk Grove page graphs | Schema Markup Validator | Not pasted separately. The two pages use the same node builders as the physician page, and the local validator covers all three. Repeat after deploy using the live URLs. |
| Elk Grove page (FAQPage and BreadcrumbList rich-result eligibility) | Google Rich Results Test, code mode | **Not run.** The tool answered "Something went wrong. Log in and try again" and requires a Google sign-in. Nobody signed in to an account on the practice's behalf. **Action: run it from a signed-in browser on the live URLs** (https://search.google.com/test/rich-results). |
| Live URLs | Both online tools, URL mode | **After deploy.** |
| Unit and build checks | `npm test` (60 tests), `scripts/verify-apollo-pivot.mjs` (74 checks) | Pass |

Note on FAQPage: Google limits FAQ rich results to well-known government and health sites since 2023, so this markup is for machine readability, not for a search-result feature. Do not expect a rich result.

## What changed in the markup

| Problem found in the audit | Fix |
|---|---|
| `medicalSpecialty: "FamilyPractice"` is not a schema.org value | `https://schema.org/PrimaryCare`, on the clinic and the physician. "Family medicine" stays in the visible text. |
| `Physician` is not a `Person` in schema.org, so `honorificPrefix`, `honorificSuffix` and `worksFor` were not valid on it. **Not in the original audit; found by the new validator.** | Node typed `["Physician", "Person"]`. |
| `paymentAccepted` held insurer names (the property is for payment methods) | Removed. schema.org has no clinic property for accepted plans. The plan list stays as visible content. |
| Organisation NPI in the schema but on no page | Removed. The physician NPI stays because the physician page shows it. |
| Clinic `sameAs` held physician profiles; Sharecare could not be opened | Profiles moved to the Physician node. Doximity and WebMD kept (opened and checked: same name, family medicine, same address and phone). Sharecare dropped (HTTP 403, unverifiable). Both kept profiles are now linked visibly on the physician page. |
| `["MedicalClinic","LocalBusiness"]` | `MedicalClinic` (already a LocalBusiness subtype). |
| Relative `@id` on FAQ and breadcrumb | All `@id` values absolute. |
| No `WebPage` nodes | One per page (`ProfilePage` for the physician page) linking site, entity, FAQ and breadcrumb. |
| Home page had a one-item BreadcrumbList that no page shows | Removed. |
| No `geo`, no map link | Added `geo` and `hasMap`. **Corrected in Step 7:** `geo` is now 38.46019, -121.41317, the pin on the practice's own Google Maps listing. The first version (38.45994, -121.41591, from the Census geocoder and OpenStreetMap) was about 240 m west of it. |

## Deliberately not in the markup (unconfirmed)

`openingHoursSpecification` (hours, item 6), `isAcceptingNewPatients` (item 8), `priceRange` (item 24), `hasCredential` (items 9 to 12), `knowsLanguage` (item 16), `hospitalAffiliation` (item 18), `legalName` (item 4), accepted insurance (no valid property; list unconfirmed), `AggregateRating` and `Review` (no real, current, on-page rating exists). Each is valid on the right type and can be added in one place (`src/lib/structured-data.ts`) once the practice confirms it.

## Reproduce

```bash
npm run build
npm run validate:schema
```

Without an argument the script downloads the current vocabulary from schema.org.
