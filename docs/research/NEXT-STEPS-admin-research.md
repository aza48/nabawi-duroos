# Admin research: where it stands and what to do next

## Latest: resumed by a cloud session for the owner (branch `claude/resume-guide-validation-8uugen`)
This branch is `main` plus the research branch `claude/wonderful-davinci-um61gf` merged in. Claimed on issue 13. Six writers publish the research into guides in parallel; each one's scope:
- **A** new file `src/server/seed/content/guides-admin-2026-11.ts`: `university-student-system`, `what-you-study-by-level`, and academic guides from GUIDE-IDEAS A (registration, GPA and warnings, changing major, Tawasul, University email).
- **B1** corrections in `applying-to-the-islamic-university`, `scholarship-stipend-and-allowances`, `etimad-account`, `campus-life-islamic-university`, `new-student-steps`, `postgraduate-admission-1448` and their FAQs (partial scholarship, tazkiyah, ticket, stipend card, ticket cities).
- **B2** new file `guides-admin-life-2026-11.ts`: first semester, stipend card, University to Haram, Unit 13, lost documents, and other GUIDE-IDEAS A items.
- **C** corrections in `exams-results-and-attendance`, `tajeel-and-itithaar`, `blackboard-login`, `university-offices-and-contacts`, `summer-semester`, library and exam FAQs.
- **D** `src/content/discounts.ts` and `discounts-ar.ts` (118 offers), `sports-and-activities`.
- **E** gomedine.com parts 1, 3, 4 into the papers guides, new file `guides-admin-papers-2026-11.ts` if needed.
Then: wire the new files in `sync.ts` and `src/lib/guide-topics.ts`, full tsc, vitest and build, commit, PR. Progress is in the checklist below; anything not ticked is not done.

### Done (merged to `main` through the PR for this branch)
- A, B1, B2, C, D, E all finished; wired in `sync.ts` and `src/lib/guide-topics.ts` (new topic "Your studies, step by step", id `studies`, icon in `ContentPages.tsx`). tsc, 513 tests and the build pass. Screenshots: `docs/research/admin-publish-2026-11/screenshots/`.
- New guides (13): `university-student-system`, `registering-your-courses`, `gpa-warnings-and-dismissal`, `what-you-study-by-level`, `university-email-and-microsoft-365` (A); `your-first-semester-week-by-week`, `getting-your-stipend-off-the-university-card`, `unit-13-and-paid-university-housing`, `university-housing-and-student-services`, `university-to-the-haram`, `lost-your-iqama-passport-or-card` (B2); `check-visa-and-iqama-online`, `family-records-on-absher` (E).
- Owner questions from every writer: `docs/research/admin-publish-2026-11/OWNER-QUESTIONS.md`.

### Still to do (next agent: start here)
State on 10 Nov 2026, after the third merge (fact-check and gomedine.com part 2). Merged to `main`: #76 (research in guides), #79 (calendar, online study guide), and the fact-check PR from this branch. Everything in this file's earlier plan is done:
- gomedine.com: all 583 pages in `docs/research/gomedine-2026-11/raw/`; parts 1 to 4 read and published. The owner trusts the site.
- Fact-check of every new and changed guide: `docs/research/admin-publish-2026-11/factcheck-FC1.md` to `FC4.md` (about 1,200 claims checked, about 110 corrected or removed). Each file lists the claims kept that rest on student reports only.
- New guide `getting-married-in-saudi-arabia` (Family).

What is left:
1. **Owner questions:** `docs/research/admin-publish-2026-11/OWNER-QUESTIONS.md`. When the owner answers one, fix the guide it names. Big ones: renting on a Visitor ID through Ejar (MESH's newer source says yes; a Jan 2026 page says no), the stipend card or own IBAN, the GPA warning threshold, room sharing in the halls, the absence bar, sports club hours, and whether the student-made system guide is fine to publish from.
2. **For akhiai (not edited here):** `sisters-studying-in-madinah` gives Dhul Qa'dah for the Ma'had registration; the 1448 window is Safar (FC4, gomedine raw pages). `finding-an-apartment`: the agent's commission is 2.5% (raw 004).
3. **Arabic** versions of the 15 new guides, after AR1 (akhiai's AR3 process).
4. **Skipped for lack of firm facts:** changing college or major, ijazah sessions, "if a student passes away", room inspection rules.
5. **Publish:** `npm run content:sync` against production (owner, or an agent the owner allows). Until then the guide text is not live; the discounts and calendar are.

### Missing inputs (only the owner has them)
- Telegram periods c5 (2024) and c6 (2019 to 2023): skipped on the owner's instruction. The export is on the owner's PC.
- (Done: gomedine.com part 2 was fetched again from the site; the 70 MB handbook is the owner's Drive file `1l_wPDaN_HJTBgReRIQngREdaX-I4Mt9c`, text in `iu-pdfs-2026-11/text/`.)

### After merge (owner, or an agent the owner allows)
`npm run content:sync` against production publishes the guides. Nothing has been written to the production database.

---

## Earlier status (Desktop agent, 9 November 2026)

The owner asked the Desktop agent to finish the admin agent's research and publish it in guides in MESH's own words. The owner said to skip the remaining Telegram periods (c5 2024, c6 2019 to 2023, and the Telegram SYNTHESIS) and to focus on gomedine.com and the official PDFs.

## Done and on this branch (`claude/wonderful-davinci-um61gf`)
| File | Findings | Key points |
|---|---|---|
| `iu-pdfs-2026-11/bachelor-admission-guide.md` | 63 (32 NEW, 27 CONFIRMS, 4 CONFLICTS) | Partial (internal) scholarship covers tuition only: no stipend, housing or ticket. Two tazkiyah letters are required. The end-of-year ticket is only given if no other party gives one. Programme lengths and languages per college. |
| `iu-pdfs-2026-11/postgraduate-admission-1448.md` | 63 (40 NEW, 22 CONFIRMS, 1 CONFLICTS) | The live postgraduate guide matches the 1448 guide. New: department conditions (memorisation, pass marks), ranking weights, English and GPA thresholds for science and computing, the 1448 documents list; the 1446 age limit is gone. |
| `iu-pdfs-2026-11/student-system-guide.md` | 55 (42 NEW, 10 CONFIRMS, 3 CONFLICTS) | A full draft guide "Using the University's student system, step by step" (slug `university-student-system`). Results stay hidden until the course evaluation is done; add and drop only registers after Confirm; the ta'jeel and i'tithaar travel rules for international students. |

| `iu-pdfs-2026-11/discounts-and-sports-club.md` | 134 (68 NEW, 62 CONFIRMS, 4 CONFLICTS) | The discount deck is official (issued 25 Oct 2026, 118 offers, no end dates); all 61 offers in `discounts.ts` are still in it, 54 are new; section 4 has a full replacement `discounts.ts`. Sports club prices, hours and facilities, and the "50% off" line is only true for one month. |

| `gomedine-2026-11/part-1.md`, `part-3.md`, `part-4.md` | 75, 76, 71 | Iqama and visa fines and renewal fees; newborn iqama steps; exit and re-entry conditions; family visit visa extension and biometrics; family records on Absher; Umrah season 1448. Conflicts to settle: renting on a student visa (MESH contradicts itself: agent vs iqama needed), the Ma'had registration window (Dhul Qa'dah, Dhul Hijjah to Muharram, or Safar), visitors' emergency health cover, schools for visit-visa children. |

## Still running when this was written (the outputs land in the Desktop agent's scratch folder first; copy them in when done)
- (done) `iu-pdfs-2026-11/study-plans-1448.md`: 31 findings; full course tables for 7 colleges; the Qur'an, Hadith and Sharia library folders follow older plans (Qur'an 19 and Sharia 31 courses have no folder); draft guide `what-you-study-by-level`
- `gomedine-2026-11/part-2.md` (pages 056 to 110; group list `gm\group2.txt`)
On the owner's PC the outputs are in `%TEMP%\claude\e8a567db7955d8a8\8a2f9b30-c840-4fc6-81dd-635eb4325b9b\scratchpad\` under `out\`, `research-out\`, `pdfs\out\` or similar (each reader reports its path). If a file is missing there, rerun only that reader: the shared brief is `scratchpad\pdfs\BRIEF.md`, the PDF text is in `iu-pdfs-2026-11/text/`, and the site pages are in `scratchpad\gm\clean\` split by `gm\group1.txt` to `group4.txt` (rebuild with `gm\fetch.py` if gone).

## Publishing plan (in this order)
1. **New guide `university-student-system`**: take section 4 of `student-system-guide.md`, check the house rules, put it in a new seed file `src/server/seed/content/guides-admin-2026-11.ts` (admin's own lane), add one line to `sync.ts`, test, merge to `main`, then `npm run content:sync -- --only=university-student-system` (production database: the owner, or an agent the owner allows).
2. **Corrections to existing guides** (other lanes own them, so announce on issue 13 and wait 30 minutes, or hand the text to the lane owner):
   - Partial scholarship: no housing, stipend or ticket (`is-housing-included` FAQ, `applying-to-the-islamic-university`, `campus-life-islamic-university`).
   - Tazkiyah: two letters, a condition of admission (`applying-to-the-islamic-university`).
   - Ticket: only when no other party gives one (`scholarship-stipend-and-allowances`).
   - Ta'jeel and i'tithaar travel and housing rules (`tajeel-and-itithaar`).
   - Results need the course evaluation first; Confirm after add and drop (`exams-results-and-attendance`).
   - Sign-in code is shown on screen, or Nafath (`blackboard-login`, `university-offices-and-contacts`).
   Each file's section 4 has ready-to-publish HTML for these.
3. Postgraduate: add the department conditions and ranking weights to `postgraduate-admission-1448` (section 4 of its file).
4. Discounts, sports club, study plans and gomedine.com: publish from their section 4 once those files are in.
5. Owner questions: each file's section 5. Add them with `npm run questions:add` after putting them in `scripts/open-questions.json`.
