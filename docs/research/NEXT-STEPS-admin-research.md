# Admin research: where it stands and what to do next (Desktop agent, 9 November 2026, about 20:10 Riyadh)

The owner asked the Desktop agent to finish the admin agent's research and publish it in guides in MESH's own words. The owner said to skip the remaining Telegram periods (c5 2024, c6 2019 to 2023, and the Telegram SYNTHESIS) and to focus on gomedine.com and the official PDFs.

## Done and on this branch (`claude/wonderful-davinci-um61gf`)
| File | Findings | Key points |
|---|---|---|
| `iu-pdfs-2026-11/bachelor-admission-guide.md` | 63 (32 NEW, 27 CONFIRMS, 4 CONFLICTS) | Partial (internal) scholarship covers tuition only: no stipend, housing or ticket. Two tazkiyah letters are required. The end-of-year ticket is only given if no other party gives one. Programme lengths and languages per college. |
| `iu-pdfs-2026-11/postgraduate-admission-1448.md` | 63 (40 NEW, 22 CONFIRMS, 1 CONFLICTS) | The live postgraduate guide matches the 1448 guide. New: department conditions (memorisation, pass marks), ranking weights, English and GPA thresholds for science and computing, the 1448 documents list; the 1446 age limit is gone. |
| `iu-pdfs-2026-11/student-system-guide.md` | 55 (42 NEW, 10 CONFIRMS, 3 CONFLICTS) | A full draft guide "Using the University's student system, step by step" (slug `university-student-system`). Results stay hidden until the course evaluation is done; add and drop only registers after Confirm; the ta'jeel and i'tithaar travel rules for international students. |

## Still running when this was written (the outputs land in the Desktop agent's scratch folder first; copy them in when done)
- `iu-pdfs-2026-11/study-plans-1448.md` (study plans per college, library mapping)
- `iu-pdfs-2026-11/discounts-and-sports-club.md` (discount deck vs `src/content/discounts.ts`; sports club leaflet)
- `gomedine-2026-11/part-1.md` to `part-4.md` (214 pages of the French site, 4 readers)
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
