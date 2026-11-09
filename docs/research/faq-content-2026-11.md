# FAQ content, November 2026 (aiakhee)

Branch `aiakhee/faq-fixes-and-new`, built on `aiakhee/B5-faq-short-answers` (PR 58). Written 9 November 2026, and updated the same day after the fact-check and review and after merging admin's research release (PR 76).

All FAQ changes are in aiakhee's own files. The FAQs in `src/server/seed/content/guides-*.ts` belong to akhiai and are not edited:

- `src/server/seed/content/faqs-aiakhee-2026-11.ts`: `FAQS_AIAKHEE_2026_11`, spread last into `SEED_FAQS` in `sync.ts`. An entry with an existing slug replaces that FAQ (the `Map` keeps the last entry per slug, and the FAQ keeps its place in the list). An entry with a new slug adds an FAQ.
- `src/server/seed/content/faq-leads.ts`: leads.
- `tests/faq-content.test.ts` (new) and `tests/faq-leads.test.ts`.

Nothing was written to any database, and `content:sync` was not run. The owner syncs after merge.

## Counts

| | Count |
|---|---|
| Existing FAQs replaced (same slug) | **14**: 9 yes-or-no fixes and 5 audit fixes (A1, A4, A6, A9, A10) |
| New FAQs | **13**: 11 from plan section B, 2 from the chat research |
| Dropped after review | **4**: `us-citizen-bank-account` (unconfirmed), and the replacements of `istiqdam-deposit` (A7), `degree-collection-and-verification` and the A5 text of `drive-on-visit-visa`, which admin rewrote in PR 76 |
| Plan items deferred | **14** (A8, B4 to B16, B25), kept in `docs/research/faq-deferred-2026-11.md` |
| Planned or suggested FAQs dropped | **2** (work while studying, ticket rules); see "Dropped" |

Published FAQs go from 61 to 74.

## After admin's research release (PR 76)

Admin rewrote five FAQs that this overlay also replaced. The overlay is spread last, so keeping the old replacements would have hidden admin's corrections:

- `istiqdam-deposit` and `degree-collection-and-verification`: replacements removed; admin's text stands. Admin's `istiqdam-deposit` lead and answer now say family residency is closed since January 2025, and admin's degree answer no longer opens with a yes.
- `student-discounts`, `free-bus-to-haram` and `drive-on-visit-visa`: rebased on admin's new text word for word, apart from the opening "Yes." that the lead already says. `free-bus-to-haram` now also says where the buses run, so the answer does not rely on the lead for it. If admin changes these three again, change the overlay too (a comment in the file says so).
- `mahad-books` and `muqarrarat` no longer link to missing library anchors, so the anchor test now checks every FAQ.
- `YES_NO_TWICE` is empty: admin fixed `summer-semester` and `degree-collection-and-verification`, and the overlay fixes the other nine.

## Scope agreed on issue 13

The owner's agent "admin" was rewriting some FAQs during this work. These were not touched, and no new FAQ was written on their topics: `is-housing-included`, `stipend-amount`, `student-ticket-rules`, `married-students-housing`, `library-bags-laptops`, `muqarrarat`, `mahad-books`, `summer-semester`, and every exam FAQ (attendance, missed exams, results, failing a course, timetable, Blackboard). A2 (`mahad-books`) and A3 (`muqarrarat`) are now done by admin. A8 (`how-to-apply-iu`) and the new FAQs B4 to B16 and B25 are deferred; their drafts and evidence are in `docs/research/faq-deferred-2026-11.md`, with a warning to recheck them against admin's release first.

## 1. Yes or no said once

Nine FAQs said "Yes." or "No." twice: once in the lead and again at the start of the answer. Each now has a replacement entry with the same slug, question and category. The answer keeps every fact and starts with the next fact instead, so the page reads lead first.

| Slug | Old opening of the answer | New opening |
|---|---|---|
| `bank-account-without-iqama` | "Yes. Since September 2025 ..." | "Visitor ID holders have been able to do this since September 2025. Before you apply, check in Absher that all three are in place." The three conditions are said once, in the lead |
| `student-discounts` | "Yes. The University's partner programme ..." (admin's PR 76 text) | "The University's partner programme ..." |
| `joint-bank-account-spouse` | "Yes. The Saudi Central Bank's rules ..." | "The Saudi Central Bank's rules ..." |
| `foreign-prescriptions` | "No. Prescriptions from other countries are not accepted, and only doctors ..." | "Only doctors licensed in Saudi Arabia can prescribe here ..." (the "not accepted" fact is in the lead) |
| `free-bus-to-haram` | "Yes. The University runs free buses ..." (admin's PR 76 text) | "The buses run between the campus, the halls outside it and Masjid an-Nabawi." Adds a link to the campus life guide |
| `rent-on-student-visa` | "Yes. Find a flat ..." | The four Ejar steps from `living-on-a-visitor-id`, plus links to `finding-an-apartment` and `/ask/what-is-ejar` |
| `drive-on-visit-visa` | "Yes, with your own valid licence ..." (admin's PR 76 text) | "Your own valid licence works if Saudi Arabia recognises it ..." Visit visas only, as admin wrote it; no Visitor ID tag |
| `bringing-medicine-into-saudi` | "Yes. Bring enough ..." | "Bring enough ..." |
| `buying-a-used-car` | "**With an iqama,** yes. Used cars ..." | "**With an iqama:** used cars ..." ("Residents may own" becomes "A resident can own", to keep "may" out of public copy) |

Leads changed: `drive-on-visit-visa` ("Yes, on your recognised home licence for up to a year from entry; a Saudi licence or registering a car needs an iqama.") and `free-bus-to-haram` ("Yes. University buses take students to the Haram at no charge.", so the lead no longer repeats the answer's first sentence).

## 2. Audit fixes (plan section A)

Each fix was checked again against the cited lines on this branch. Where the plan was wrong or went past its evidence, the text was changed, as noted.

**A1 `learn-arabic-before-iu`.** Names no institute and gives no price (audit `docs/audit/content-2026-11-09.md:38`, row 1B.15; price rated Low in `docs/research/community-2026-11-09.md:72`). Placement test: `docs/research/factcheck-2026-11-09-university.md:113`; the applying guide as admin rewrote it, `guides-research-2026-11.ts:580` ("it decides whether you start in the Ma'had and at which level, or go straight to your college"). Before PR 76 the guide said the test only places you in a level, which the fact-check flagged as a conflict; the guide and the FAQ now agree, and the FAQ adds "and at which level". Changed from the plan: "the Haram offers free study too" became "free classes for sisters" (the free Arabic options on `/programs` are the women's marakiz, `src/content/programs.ts:244`, `:259`, `:274`); "levels, timings, fees and intake dates side by side" became "Each listing gives its cost, or how to ask about it, and how to join" (not every listing gives a fee: `as-safwah` and `dar-tawheed-sunnah` ask you to confirm with the institute). "Every option is listed" became "The main options are on Study in Madinah". "Free classes for sisters" became "free Arabic classes for sisters", since the free Haram halaqat for men teach Qur'an and mutun, not Arabic; the test is described as for applicants the University invites (the fact-check says it is not required of everyone). "(Ma'had)" and the tag `ma'had` were left out because they pushed `/mahad#fail` out of the assistant's top 3 (`tests/assistant.test.ts`). Lead removed, since the answer now opens with a short paragraph.

**A4 `monthly-budget`.** As planned, and now opens "As of November 2026" (EXPIRING row below). `guides-2026.ts:52` (shared room or small flat), `:61` (family budget without school fees), `:62` (halls and stipend). Lead removed.

**A5 `drive-on-visit-visa`.** Dropped. Admin rewrote this FAQ in PR 76 (visit visas only, one year from entry, the permit as something car hire firms ask for). The overlay keeps admin's text and only removes the opening "Yes," (section 1). The plan's line that the permit is required when a licence is not in English or Arabic applies to visit visas in `guides-2026.ts:488`, while Visitor ID holders need the permit whatever the language (`:489`); admin's answer does not cover Visitor ID holders, so neither does the overlay.

**A6 `home-internet-no-iqama`.** Names no operator ("Every mobile operator sells data SIMs"): the October 2025 procedural guide lists seven operators (`factcheck-2026-11-09-university.md:155`), so naming three was incomplete. Visitor ID case and two links. `guides-research-2026-11.ts:64`; `guides-2026.ts:78`.

**A7 `istiqdam-deposit`.** Dropped. Admin rewrote this FAQ in PR 76: "Not at present", closed since January 2025, no reopening announced as of November 2026, families come on visit visas at their own cost. The overlay no longer replaces it, and the question stays "Can I sponsor my family, and what is the deposit?", which matches the link text in `guides-2026.ts`. The chat evidence gathered for A7 (`american-students-2026-03-to-06.md:162`, `:169`; `american-students-2025-11-to-2026-03.md:249`) supports admin's answer.

**A9 `do-i-register-for-duroos`.** As planned. `docs/research/factcheck-2026-11-09-haram-and-daily-life.md:134`; `guides-research-2026-11.ts:173`; `guides-gaps-2026-11.ts:380`.

**A10 `join-mesh-group`.** As planned; `/more` is a static page. Lead removed.

## 3. New FAQs

### From plan section B

| Slug | Category | Evidence (this branch) | Changed from the plan |
|---|---|---|---|
| `what-is-a-visitor-id` | getting-started | `guides-research-2026-11.ts:19` to `:21` (Jawazat, border number, digital, one year), `:43` to `:47` (order of steps); `factcheck-2026-11-09-university.md:155` to `:161`, `:337`, `:339` | "the digital ID new students on the educational visa hold" became "the digital ID that comes with the educational visa" (it is not only for new students). "You issue it in Absher" became "You get it in Absher". Step 1 links to `buy-a-sim-card`. Tags trimmed to `absher`, `border number`, `jawazat`, `nafath`: with the plan's Visitor ID tags this FAQ pushed `living-on-a-visitor-id` out of the assistant's top 3 for "can my wife join me on a student visa" |
| `visitor-id-expiry` | getting-started | `guides-research-2026-11.ts:91` to `:97` (freeze, reminders, Tawasul, cash, bank, operator), `:103` to `:105` (Deanship of Admission and Registration, subject Educational visa); `factcheck-2026-11-09-university.md:342`; `factcheck-2026-11-09-haram-and-daily-life.md:54` | None |
| `buy-a-sim-card` | getting-started | `guides-2026.ts:77`, `:78`; `guides-gaps-2026-11.ts:26`; `factcheck-2026-11-09-university.md:156` | Operator tags dropped (impartiality). "Coverage and bundles change from area to area" became "Coverage changes from area to area and bundles change often" |
| `madinah-bus-fares` | getting-settled | `guides-research-2026-11.ts:314` to `:319`; `factcheck-2026-11-09-haram-and-daily-life.md:62` (official FAQ, 9 Nov 2026, High) | Opens "As of November 2026". No airport fare: the official FAQ (11.50) and a September news item (3.45) disagree |
| `haramain-train-to-makkah` | getting-settled | `guides-research-2026-11.ts:288` to `:306`; `guides-2026.ts:112` (Al Hadra, 9 km, route 300), `:131` (30 minutes early); `factcheck-2026-11-09-haram-and-daily-life.md:63` | Opens "As of November 2026" |
| `umrah-from-madinah` | getting-settled | `guides-2026.ts:243` to `:245`; `guides-research-2026-11.ts:311` (ihram at the masjid, then taxi), `:35` (Visitor ID books in Nusuk); `guides-gaps-2026-11.ts:231` (permits stop 1 Dhul Qa'dah, 8 April 2027); `factcheck-2026-11-09-university.md:347` | "Residents sign in with Nafath" became the guide's "Iqama holders sign in with Nafath", plus "Students on a Visitor ID book in Nusuk too". Links to the train FAQ |
| `hajj-while-studying` | getting-settled | `guides-gaps-2026-11.ts:193` to `:240` (Nusuk only `:210`, first Hajj and older residencies `:197`, `:198`, Visitor ID `:202`, iqama to 5 June 2027 `:218`, vaccines, Ramadan 8 February 2027 `:230`, fines `:239`, `:240`) | None. Whether Visitor ID holders can register stays open, so the answer only says to ask |
| `visiting-al-baqi` | getting-settled | `guides-2026.ts:725`, `:735`; `factcheck-2026-11-09-haram-and-daily-life.md:25`, `:35` | Category `duroos` became `getting-settled`, next to Umrah and Hajj. No hours and no "booking required": both open (question 88) |
| `sisters-gates-masjid-an-nabawi` | family | `guides-research-2026-11.ts:120` to `:124`, `:161`; `factcheck-2026-11-09-haram-and-daily-life.md:119`, `:120`, `:21` | None |
| `children-at-masjid-an-nabawi` | family | `guides-research-2026-11.ts:140` to `:143`, `:123`, `:157`; `factcheck-2026-11-09-haram-and-daily-life.md:126` | None. Lower age, fees and hours left out (sources disagree) |
| `wheelchair-at-masjid-an-nabawi` | family | `guides-research-2026-11.ts:147` to `:151`, `:157`; `factcheck-2026-11-09-haram-and-daily-life.md:127` to `:131` | "call 997" became "call 997 for an ambulance", as the guide says |

### From the chat research (`docs/research/chats-2026-11/`, on `main`)

**`nationality-representative`** (university), "Who is my nationality representative and what does he do?"
- Role, unpaid, self-nomination at the representatives' office in the Deanship of Student Affairs, and the emergency contact form: `us-students-announcements.md:179`, item 41 (representative, high).
- The office is at the Deanship of Student Affairs: `us-students-announcements.md:143`, item 31 (official forward, high).
- Visa renewal forms come through representatives: `us-students-announcements.md:79`, item 15 (high).
- Register for events through one channel only: `us-students-announcements.md:174`, item 40, and `ata-volunteer-club.md:57`, C5.
- Nominations: "In 1448, nominations opened to any student in August 2026" (item 41: "From Aug 2026 any student may nominate himself"). Dated, because nominations were seen only in August and September 2026; an EXPIRING row is below.
- Left out: names, and when nominations open in other years.

**`skills-record`** (university), "What is the University Skills Record?"
- Address and purpose: `ata-volunteer-club.md:42`, `:43` (S1, S2, forwarded official notice of 4 Nov 2026, high).
- Rules: register as a current student or graduate within the period and seats, 10 minute attendance window, 75% of hours with organiser approval, hours added to the record: `ata-volunteer-club.md:44` (S3, high).
- Launched 31 October 2026 for courses, workshops and volunteering: `docs/research/factcheck-2026-11-09-university.md:298` (High).
- nvg.gov.sa, one page per opportunity, hours only for those who turn up and work: `ata-volunteer-club.md:26`, `:27` (V3, V4, high).
- Left out: whether the two records are linked (S4, medium) and whether Visitor ID holders can use nvg.gov.sa (open question).

**`us-citizen-bank-account`**: dropped after review. It rested on one chat item rated medium (`american-students-2026-06-to-11.md:99`, item 53), much of it about one bank, and whether all banks ask US citizens for the SSN is still an open question for admins (2 below). The link to it from `bank-account-without-iqama` is removed too. Write it once an admin confirms.

## Dropped

- **"Can I work while studying?"** No official answer (`docs/research/chats-2026-11/business-jobs.md`, section 3). Skipped as instructed.
- **`student-ticket-rules` update** (chat README task): admin owns that FAQ now.
- **Not written, outside this task's scope** (suggested in the chat README): "Do I have to hand back my room for ta'jeel?", "How do I get my University password after the Ma'had?", "How is the stipend paid, and what if my card stops working?" (stipend is admin's area, and the card against IBAN conflict is unconfirmed), "Can I travel during the semester?" (attendance is admin's area).
- **Sentences dropped or changed from the plan**: listed above under A1, A5, A7, `what-is-a-visitor-id`, `buy-a-sim-card`, `madinah-bus-fares`, `umrah-from-madinah`, `visiting-al-baqi` and `wheelchair-at-masjid-an-nabawi`.

## Tests

- `tests/faq-content.test.ts` (new):
  - one entry per slug in every FAQ list and in `SEED_FAQS`, and the published count is the guide files plus the new slugs
  - replacements keep their slug, category and place, and win over the guide files
  - every category is in `FAQ_CATEGORIES`
  - every `#anchor` in any FAQ exists on its page (guide `h2` ids as `enhanceGuideHtml` makes them, and the library section ids). Whether each internal link leads to a page is already checked for every FAQ by `tests/content-links.test.ts`, so this file does not repeat it
  - no doubt words and no dashes, help points to the Admin WhatsApp line, and time-limited FAQs carry a date or Hijri year (`monthly-budget`, `madinah-bus-fares`, `haramain-train-to-makkah`, `umrah-from-madinah`, `hajj-while-studying`, `nationality-representative`, `skills-record`)
- `tests/faq-leads.test.ts`: reads the overlay as each FAQ's original text, and `YES_NO_TWICE` is empty. The 25-word first paragraph rule passes for all 74 FAQs.

## Needs admins

From the chat research:
1. Is there a public statement that University family residency (istiqdam) is closed (admin's FAQ now says since January 2025)? Does the University help families with visit visas, or not? Admin's `istiqdam-deposit` says it does not arrange visit visas, while `visas-for-family-and-visitors` and `living-on-a-visitor-id` (`guides-research-2026-11.ts:89`) say family visas for students go through the University.
2. Do all Saudi banks ask US citizens for the SSN, and at what point? (Needed before `us-citizen-bank-account` is published.)
3. Can Visitor ID holders register on nvg.gov.sa, and is the Skills Record linked to it?
4. When do nationality representative nominations open each year? (The FAQ gives August 2026 for 1448 only.)

Carried over from the plan (facts not confirmed, so no FAQ yet; numbers are `scripts/open-questions.json`):
5. The day the stipend lands each month (17, 54).
6. Free University bus stops, times and Fridays (2).
7. Where the mat'am is, when it serves and who may eat there (3, 44, 66).
8. Rooms in the halls: how many share, Wi-Fi, laundry, kitchens (4, 136).
9. Registering an e-scooter on campus; gate hours.
10. Parking at Masjid an-Nabawi and the monthly subscription price.
11. Lost property at the Haram (83).
12. Women's Rawdah hours, children in the Rawdah, strollers (36, 81, 82).
13. Does Nafath work abroad (131).
14. Can students on the educational visa work part time (29).
15. Exit and re-entry or travel abroad on a Visitor ID, and the 180 day question (27, 71).
16. How long a Visitor ID lasts, and SIM cut-offs (31, 70).
17. The next window for online study with the University.
18. Children's Qur'an classes and summer courses.
19. Passport photo size for the student card, graduation allowance, retake grades, lateness, course load (56, 94, 98, 101, 105).

## EXPIRING rows for akhiai (`docs/EXPIRING.md`)

| Item | Where | Expires | Action when expired |
| --- | --- | --- | --- |
| Monthly living costs, 2,900 to 6,700 SAR single and 6,300 to 12,800 SAR family (as of November 2026) | FAQ `monthly-budget` (`faqs-aiakhee-2026-11.ts`) | May 2027 | Recheck against the `cost-of-living` guide and update the figures and the "as of" month |
| Madinah Bus fare 3.45 SAR and app passes (as of November 2026) | FAQ `madinah-bus-fares` | May 2027 | Recheck madinahbus.mda.gov.sa and update the "as of" month |
| Haramain train base fares, child discounts, luggage (as of November 2026) | FAQ `haramain-train-to-makkah` | May 2027 | Recheck sar.hhr.sa and update the "as of" month |
| Umrah permits stop from 1 Dhul Qa'dah 1448 (8 April 2027) | FAQ `umrah-from-madinah` | 8 April 2027 | Replace with the 1449 date after Hajj 1448 |
| Hajj 1448: watch Nusuk from 8 February 2027, iqama valid to 5 June 2027 | FAQ `hajj-while-studying` | 5 June 2027 | Replace with the 1449 dates |
| Nationality representative nominations opened in August 2026 (1448) | FAQ `nationality-representative` | August 2027 | Replace with the 1449 nomination month once seen |
| Skills Record opened October 2026 | FAQ `skills-record` | None (a start date); recheck the rules in September 2027 | Update the rules if the University changes them |

## Flags for other owners

- **akhiai and admin**, family visas: admin's `istiqdam-deposit` says the University does not arrange visit visas, while `visas-for-family-and-visitors` (`guides-2026.ts`, "University students' families") and `living-on-a-visitor-id` ("Family", `guides-research-2026-11.ts:89`) say family visas for students go through the University. One of them should change so a reader who follows the guide to the FAQ reads the same thing.
- **akhiai**, driving on a Visitor ID: `drivers-license` says a Visitor ID holder drives on a home licence with an International Driving Permit for one year from entry (`guides-2026.ts:489`), while `living-on-a-visitor-id` says only that car hire firms often ask for the permit (`guides-research-2026-11.ts:79`). The overlay's `buying-a-used-car` follows `drivers-license`.
- **akhiai**, `getting-around` (`guides-2026.ts:111`): still says "day, week and month passes (10, 60 and 240 SAR)". They are bundles of 10, 35 and 175 rides (`guides-research-2026-11.ts:316`).
- **akhiai**: `university-calendar-1448` exists only in the database; a seed copy would keep its links working on a fresh database.
- **web / AR4**: the 13 new questions need Arabic.
