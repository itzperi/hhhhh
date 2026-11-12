# Publish-day runbook, doctor approval request, and questions for the owner

12 Nov 2026. Three things in one file so nothing waits on a missing step. **Nothing here has been run.** The review date is set only after Dr. Panesar approves, never before and never by anyone else.

## A. Message to Dr. Panesar (copy and send)

> Dr. Panesar, the new pages for the practice's website are ready for your review. They cover annual physicals, same-day appointments, immigration exams, services, Medicare, Medi-Cal, Nivano Physicians, and visits without insurance. They stay hidden until you approve them.
>
> Please read `docs/clinical-review/review-packet.md` (it is exactly the text the website will show). Mark anything that is wrong, out of date, or not offered at your office, and confirm each line under "Confirm before approving". When you are happy, reply with the words "approved", the date, and any edits.
>
> Nothing goes live until you reply.

## B. Questions only the owner can answer (each answer unlocks something)

Record every answer in `docs/seo/client-confirmations.md` with the date and the person.

| # | Question | Unlocks |
|---|---|---|
| 1 | Which Medicare Advantage plans does the practice accept? Does it accept Medicare assignment? | A Medicare Advantage section with plan names; the assignment FAQ |
| 2 | Which Medi-Cal managed-care plans (Anthem Blue Cross, Health Net, Molina, others), and through which medical group? | Plan-name keywords on the Medi-Cal page |
| 3 | Is there a signed contract with Vivant Health (formerly River City Medical Group)? For Medi-Cal, Medicare, or both? | A Vivant Health page (otherwise the word stays blocked) |
| 4 | What is Nivano Physicians to the practice, and which plans route through it? | A stronger Nivano page (today's page defines an IPA and says how to choose Dr. Panesar) |
| 5 | What does the $65 initial visit include? What costs extra? Which payment methods? | The best answer to "how much is a doctor visit without insurance" |
| 6 | Is there a sliding scale or any discount? (If not, the site never mentions one.) | A line on the no-insurance page |
| 7 | Item 40: is the practice operated by, contracted with, or connected to a community health center? | The community-clinic explainer page, and whether any listing may be changed |
| 8 | Languages spoken by the doctor and the front desk | Spanish and Punjabi content, `knowsLanguage` in the schema |
| 9 | Real photos (exterior, the Suite 200 sign, waiting room, the doctor) with written permission | Replaces the stock home image; Business Profile photos |
| 10 | Who has Google Business Profile, Search Console, Bing and Vercel access, and who owns the riolabz domain? | All of Phase 5 and 6 |

## C. Publish day: do these in order, only after Dr. Panesar replies "approved"

Work in `D:\apollo-build` (C: is nearly full). Never use `robocopy /MIR` into it.

1. **Apply the doctor's edits** to `src/data/content.ts` (and `src/data/practice.ts` if a fact changed).
2. **Set the one date:** in `src/data/pages.ts`, change `reviewedOn: null` to the date the doctor approved, in `YYYY-MM-DD`. This publishes eight pages together.
3. **Retitle the hub** (`insurance` in `PAGE_META`): title `Insurance & Payment Options, Sacramento | Apollo Physicians` (59 characters); description `Insurance and payment options in South Sacramento: Medicare, Medi-Cal, Aetna, Anthem, Cigna and more, plus self-pay visits from $65. Call 916-236-5800 now.` (155 characters, counted). Also set the H1 to "Insurance and Payment Options" if it is not already. The `@id`, URL and breadcrumb stay.
4. **Regenerate share images** (the hub title is drawn on its image): `npm run generate:og`.
5. **Run the checks:** `npx vitest run`; `npx tsc --noEmit`; `npx next lint`; `npx next build`; `node scripts/validate-schema.mjs`; `npx next start -p 3100`, then `node scripts/crawl-check.mjs`. Expect the crawl to show **15** pages, not 7, and `llms-full.txt` to list them.
6. **Check the new pages at 375 px** in the browser pane (resize to mobile): the Medicare, Medi-Cal, Nivano and no-insurance pages, in particular the new "For Elk Grove patients" block and the Quick Facts table. Confirm nothing scrolls sideways, the Call button is reachable, and the Elk Grove page shows four segment links.
7. **Confirm the review line:** each health page has a "Medical review" section reading "Medical review: Dr. Paramjit Panesar, MD. Last reviewed: <the approved date>.", and the schema has `lastReviewed`.
8. **Commit on a branch and open a PR** (never to `main`). After the merge and the Vercel deploy, fetch `/sitemap.xml` and `/llms.txt` on the live site and confirm all the new pages appear, then check that `/medicare-doctor-sacramento` returns 200.
9. **Search Console** (someone with access): resubmit the sitemap; URL Inspection, Request indexing for each new page, starting with Medi-Cal, Medicare, Nivano, no-insurance, then the hub. **Bing Webmaster Tools:** import from Search Console and submit the sitemap.
10. **Same day:** correct the Business Profile and the top directories using `offsite-2026-11-12.md`, so Google and the AI assistants see the same hours, Suite 200 and website.
11. **Day 30, 60, 90:** follow `measure-plan-2026-11-12.md`.

## D. After owner answers arrive (build the held pages)

Each answer in section B is a separate small change:

- Answer 1: add the plan names to the Medicare page's Medicare Advantage section; build `/medicare-advantage-doctor-sacramento` only if there are enough plan-specific facts to pass the swap test.
- Answer 3: remove "Vivant" and "River City" from the blocked list in `src/__tests__/apollo-content.test.ts` in the same commit, name the confirmation (item number and date) in the commit message, then build `/vivant-health-doctor-sacramento` from the brief in `payment-segments-plan-2026-11-11.md` section 3.5.
- Answer 7: if the practice is **not** a community health center, build `/community-clinic-alternative-sacramento` from section 3.8 of that plan. If it **is** connected to one, stop and rewrite the premise first.
- Answer 5: add what the $65 includes to the no-insurance page, the FAQ and `llms.txt`.
