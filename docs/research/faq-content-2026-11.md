# FAQ content, November 2026 (aiakhee)

Branch `aiakhee/faq-fixes-and-new`, built on `aiakhee/B5-faq-short-answers` (PR 58). Written 9 November 2026.

All FAQ changes are in aiakhee's own files. The FAQs in `src/server/seed/content/guides-*.ts` belong to akhiai and are not edited:

- `src/server/seed/content/faqs-aiakhee-2026-11.ts`: `FAQS_AIAKHEE_2026_11`, spread last into `SEED_FAQS` in `sync.ts`. An entry with an existing slug replaces that FAQ (the `Map` keeps the last entry per slug, and the FAQ keeps its place in the list). An entry with a new slug adds an FAQ.
- `src/server/seed/content/faq-leads.ts`: leads.
- `tests/faq-content.test.ts` (new) and `tests/faq-leads.test.ts`.

Nothing was written to any database, and `content:sync` was not run. The owner syncs after merge.

## Counts

| | Count |
|---|---|
| Existing FAQs replaced (same slug) | **16**: 10 yes-or-no fixes, 7 audit fixes (A1, A4, A5, A6, A7, A9, A10), with A5 and a yes-or-no fix on the same FAQ |
| New FAQs | **14**: 11 from plan section B, 3 from the chat research |
| Plan items deferred to the owner's agent "admin" | **17**: A2, A3, A8 and B4 to B16, B25 |
| Planned or suggested FAQs dropped | **2** (work while studying, ticket rules); see "Dropped" |
| Sentences or facts dropped or changed from the plan | Listed per FAQ below |

Published FAQs go from 61 to 75.

## Scope agreed on issue 13

The owner's agent "admin" is rewriting some FAQs right now. These were not touched, and no new FAQ was written on their topics: `is-housing-included`, `stipend-amount`, `student-ticket-rules`, `married-students-housing`, `library-bags-laptops`, `muqarrarat`, `mahad-books`, `summer-semester`, and every exam FAQ (attendance, missed exams, results, failing a course, timetable, Blackboard). Plan items deferred until admin's PR lands:

- A2 `mahad-books` and A3 `muqarrarat` (both still link to `/library#mahad` and `/library#muqarrarat`, which do not exist; the new anchor test skips these two slugs through `ADMIN_REWRITING` and needs the set emptied once admin's fix lands).
- A8 `how-to-apply-iu`.
- B4 `who-can-apply-iu`, B5 `iu-application-documents`, B6 `initial-and-final-acceptance`, B7 `educational-visa-fingerprints`, B8 `study-in-english-at-iu`, B9 `change-college`, B10 `stay-after-graduating`, B11 `postgraduate-applications`, B12 `university-holidays-1448`, B13 `drop-or-withdraw-a-course`, B14 `student-letter-and-transcript`, B15 `stipend-payday-and-iban`, B16 `student-card`, B25 `extend-family-visit-visa`. Their text and evidence stay in the plan (scratchpad `faq-plan.md`) for when admin is done.

## 1. Yes or no said once

Ten FAQs said "Yes." or "No." twice: once in the lead and again at the start of the answer. Each now has a replacement entry with the same slug, question and category. The answer keeps every fact and starts with the next fact instead, so the page reads lead first. `YES_NO_TWICE` in `tests/faq-leads.test.ts` now holds only `summer-semester`, which admin owns (comment added).

| Slug | Old opening of the answer | New opening |
|---|---|---|
| `bank-account-without-iqama` | "Yes. Since September 2025 ..." | "Since September 2025 holders of a Visitor ID can open an account ..."; the three conditions become a check before you apply. Adds a link to the new `us-citizen-bank-account`. |
| `student-discounts` | "Yes. The University's partner programme ..." | "The University's partner programme ..." |
| `joint-bank-account-spouse` | "Yes. The Saudi Central Bank's rules ..." | "The Saudi Central Bank's rules ..." |
| `foreign-prescriptions` | "No. Prescriptions from other countries are not accepted, and only doctors ..." | "Only doctors licensed in Saudi Arabia can prescribe here ..." (the "not accepted" fact is in the lead) |
| `free-bus-to-haram` | "Yes. The University runs free buses ..." | "Pick-up points and times change during the year ..." (the routes are in the lead); adds a link to the campus life guide |
| `rent-on-student-visa` | "Yes. Find a flat ..." | The four Ejar steps from `living-on-a-visitor-id` (`guides-research-2026-11.ts:69` to `:73`), plus links to `finding-an-apartment` and `/ask/what-is-ejar` |
| `drive-on-visit-visa` | "Yes, with your own licence ..." | "Saudi Arabia must recognise your country's licence ..." with the plan's A5 fix (below); lead rewritten |
| `bringing-medicine-into-saudi` | "Yes. Bring enough ..." | "Bring enough ..." |
| `buying-a-used-car` | "**With an iqama,** yes. Used cars ..." | "**With an iqama:** used cars ..." ("Residents may own" becomes "A resident can own", to keep "may" out of public copy) |
| `degree-collection-and-verification` | "**Collecting:** yes. The Deanship ..." | "**Collecting:** the Deanship ..." |

New lead for `drive-on-visit-visa`: "Yes, on your recognised home licence for up to a year from entry; a Saudi licence or owning a car needs an iqama." The other nine leads are unchanged.

## 2. Audit fixes (plan section A)

Each fix was checked again against the cited lines on this branch. Where the plan was wrong or went past its evidence, the text was changed, as noted.

**A1 `learn-arabic-before-iu`.** Names no institute and gives no price (audit `docs/audit/content-2026-11-09.md:38`, row 1B.15; price rated Low in `docs/research/community-2026-11-09.md:72`). Placement test: `docs/research/factcheck-2026-11-09-university.md:113`; `guides-research-2026-11.ts:511`. Changed from the plan: "the Haram offers free study too" became "free classes for sisters" (the free Arabic options on `/programs` are the women's marakiz, `src/content/programs.ts:244`, `:259`, `:274`); "levels, timings, fees and intake dates side by side" became "fees and how to join" (not every listing gives timings or intakes); the test is described as for applicants the University invites (the fact-check says it is not required of everyone). "(Ma'had)" and the tag `ma'had` were left out because they pushed `/mahad#fail` out of the assistant's top 3 (`tests/assistant.test.ts`). Lead removed, since the answer now opens with a short paragraph.

**A4 `monthly-budget`.** As planned. `guides-2026.ts:52` (shared room or small flat), `:61` (family budget without school fees), `:62` (halls and stipend). Lead removed.

**A5 `drive-on-visit-visa`.** Fact-check A7.3 asks for the International Driving Permit (`docs/research/factcheck-2026-11-09-haram-and-daily-life.md:83`; audit row 3B.21, `docs/audit/content-2026-11-09.md:137`). Changed from the plan: the permit is required only if the licence is not in English or Arabic, and driving on a home licence is limited to one year from entry or the licence's expiry if sooner (`guides-2026.ts:400`). Car hire firms usually ask for the permit (`guides-2026.ts:117`). It is issued only at home (`guides-gaps-2026-11.ts:33`). A Saudi licence and owning a car need an iqama (`guides-research-2026-11.ts:78`).

**A6 `home-internet-no-iqama`.** Operators in alphabetical order, with the Visitor ID case and two links. `guides-research-2026-11.ts:64`; `guides-2026.ts:78`.

**A7 `istiqdam-deposit`.** The question becomes "Is family residency (istiqdam) open?" (slug kept). The plan's text, which told students to ask whether requests were open, was replaced by the newer chat research:
- Closed, and the representative said not to count on it reopening (18 May 2026, the students' representative and several members, high): `docs/research/chats-2026-11/american-students-2026-03-to-06.md:162` (on `main`).
- Closed until further notice, asked of the head of the office in late 2025 (single member, medium): `docs/research/chats-2026-11/american-students-2025-11-to-2026-03.md:249`.
- Listed as a conflict to fix: `docs/research/chats-2026-11/README.md:78`.
- Family on a visit visa are not treated at the University Medical Center (representative and two members, high): `american-students-2026-03-to-06.md:169`. Visit visa insurance covers emergencies only: `guides-2026.ts:49`.
- Families come on their own visas, most often the tourist eVisa; Visitor ID students ask through Tawasul: `guides-research-2026-11.ts:89`.
- Dropped: "closed since 2025". The research supports "closed" but not when it started (one member had waited almost three years), so the answer says "As of November 2026 ... closed to new requests, with no date set to reopen it". Also dropped: "the University does not help with visit visas" (representative, May 2026), because it conflicts with `guides-research-2026-11.ts:89` and `guides-2026.ts:304`. Question for admins below. Lead removed.

**A9 `do-i-register-for-duroos`.** As planned. `docs/research/factcheck-2026-11-09-haram-and-daily-life.md:134`; `guides-research-2026-11.ts:173`; `guides-gaps-2026-11.ts:380`.

**A10 `join-mesh-group`.** As planned; `/more` is a static page. Lead removed.

## 3. New FAQs

### From plan section B

| Slug | Category | Evidence (this branch) | Changed from the plan |
|---|---|---|---|
| `what-is-a-visitor-id` | getting-started | `guides-research-2026-11.ts:19` to `:21` (Jawazat, border number, digital, one year), `:43` to `:47` (order of steps); `factcheck-2026-11-09-university.md:155` to `:161`, `:337`, `:339` | "the digital ID new students on the educational visa hold" became "the digital ID that comes with the educational visa" (it is not only for new students). Step 1 links to `buy-a-sim-card`. Tags trimmed to `absher`, `border number`, `jawazat`, `nafath`: with the plan's Visitor ID tags this FAQ pushed `living-on-a-visitor-id` out of the assistant's top 3 for "can my wife join me on a student visa" |
| `visitor-id-expiry` | getting-started | `guides-research-2026-11.ts:91` to `:97` (freeze, reminders, Tawasul, cash, bank, operator), `:103` to `:105` (Deanship of Admission and Registration, subject Educational visa); `factcheck-2026-11-09-university.md:342`; `factcheck-2026-11-09-haram-and-daily-life.md:54` | None |
| `buy-a-sim-card` | getting-started | `guides-2026.ts:77`, `:78`; `guides-gaps-2026-11.ts:26`; `factcheck-2026-11-09-university.md:156` | Operator tags dropped (impartiality) |
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
- Left out: names, and when nominations open each year (seen in August and September 2026 only).

**`skills-record`** (university), "What is the University Skills Record?"
- Address and purpose: `ata-volunteer-club.md:42`, `:43` (S1, S2, forwarded official notice of 4 Nov 2026, high).
- Rules: register as a current student or graduate within the period and seats, 10 minute attendance window, 75% of hours with organiser approval, hours added to the record: `ata-volunteer-club.md:44` (S3, high).
- Launched 31 October 2026 for courses, workshops and volunteering: `docs/research/factcheck-2026-11-09-university.md:298` (High).
- nvg.gov.sa, one page per opportunity, hours only for those who turn up and work: `ata-volunteer-club.md:26`, `:27` (V3, V4, high).
- Left out: whether the two records are linked (S4, medium) and whether Visitor ID holders can use nvg.gov.sa (open question).

**`us-citizen-bank-account`** (getting-settled), "Can I open a Saudi bank account as a US citizen?"
- Banks flag US citizens and ask for the SSN; once entered, the account works; some banks ask for more papers (iqama, National Address, a University letter) and a manager's approval: `american-students-2026-06-to-11.md:99`, item 53 (several members, medium). FATCA is the US law that makes foreign banks report US account holders.
- "If one bank says no, try another": the same advice as `guides-research-2026-11.ts:61`.
- Left out: every bank's name and which ones are easier (impartiality), the large-transfer rule at one bank, and the locked account after a new iqama number (`:100`, single member).

**`istiqdam-deposit`**: see A7.

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
  - every internal link in aiakhee's FAQs opens a seeded guide, FAQ, programme, library collection or static page
  - every `#anchor` in any FAQ exists on its page (guide `h2` ids as `enhanceGuideHtml` makes them, and the library section ids), apart from the two FAQs admin is rewriting
  - no doubt words and no dashes, help points to the Admin WhatsApp line, and time-limited FAQs carry a date or Hijri year
- `tests/faq-leads.test.ts`: reads the overlay as each FAQ's original text, and `YES_NO_TWICE` is down to `summer-semester`. The 25-word first paragraph rule passes for all 75 FAQs.
- `npx tsc --noEmit` and `npx vitest run` pass (66 files, 510 tests). The assistant eval still has the same misses as before this change.

## Needs admins

From the chat research:
1. Is University family residency (istiqdam) formally closed, since when, and is there a public statement? Does the University help families with visit visas, or not (the representative said not, in May 2026; `visas-for-family-and-visitors` and `living-on-a-visitor-id` say family visas go through the University)?
2. Do all Saudi banks ask US citizens for the SSN, and at what point?
3. Can Visitor ID holders register on nvg.gov.sa, and is the Skills Record linked to it?
4. When do nationality representative nominations open each year?

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
| Family residency (istiqdam) closed "as of November 2026" | FAQ `istiqdam-deposit` (`faqs-aiakhee-2026-11.ts`) | Recheck February 2027, or as soon as the University announces a change | Update the status and the "as of" month |
| Madinah Bus fare 3.45 SAR and app passes (as of November 2026) | FAQ `madinah-bus-fares` | May 2027 | Recheck madinahbus.mda.gov.sa and update the "as of" month |
| Haramain train base fares, child discounts, luggage (as of November 2026) | FAQ `haramain-train-to-makkah` | May 2027 | Recheck sar.hhr.sa and update the "as of" month |
| Umrah permits stop from 1 Dhul Qa'dah 1448 (8 April 2027) | FAQ `umrah-from-madinah` | 8 April 2027 | Replace with the 1449 date after Hajj 1448 |
| Hajj 1448: watch Nusuk from 8 February 2027, iqama valid to 5 June 2027 | FAQ `hajj-while-studying` | 5 June 2027 | Replace with the 1449 dates |
| Skills Record opened October 2026 | FAQ `skills-record` | None (a start date); recheck the rules in September 2027 | Update the rules if the University changes them |

## Flags for other owners

- **akhiai**, `visas-for-family-and-visitors` ("University students' families", `guides-2026.ts:304`) and `living-on-a-visitor-id` ("Family", `guides-research-2026-11.ts:89`): neither says that istiqdam is closed. The FAQ now does.
- **akhiai**, `guides-2026.ts:518`: the link text "Can I sponsor my family, and what is the deposit?" should become "Is family residency (istiqdam) open?". The link itself still works, because the slug is unchanged.
- **akhiai**, `getting-around` (`guides-2026.ts:111`): still says "day, week and month passes (10, 60 and 240 SAR)". They are bundles of 10, 35 and 175 rides (`guides-research-2026-11.ts:316`).
- **akhiai**: `university-calendar-1448` exists only in the database; a seed copy would keep its links working on a fresh database.
- **admin**: `mahad-books` and `muqarrarat` link to `/library#mahad` and `/library#muqarrarat`, which do not exist (the sections are `course-books`, `mahad-extra`, `official`, `channels`). When those FAQs are fixed, empty `ADMIN_REWRITING` in `tests/faq-content.test.ts`.
- **web / AR4**: the 14 new questions need Arabic.
