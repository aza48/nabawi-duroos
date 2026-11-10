# Fact-check brief

Read `docs/research/admin-publish-2026-11/WRITER-BRIEF.md` first: its house rules and its "no git, edit only your own guides" rules apply. Ignore its list of writers.

The guides you check were written yesterday by writers from research summaries. Your job: make sure **every specific claim** (a number, fee, date, deadline, time, place, menu name, rule, condition, step, phone number, email, URL) is supported by the research, and fix what is not.

## Sources, strongest first
1. Official University PDFs: extracted text in `docs/research/iu-pdfs-2026-11/text/*.txt`, findings in `docs/research/iu-pdfs-2026-11/*.md`. (`student-system-guide.txt` and `distance-study-system-handbook.txt` are a student-made guide to the system, close to official.)
2. gomedine.com: the owner says it is accurate and researched. Full page text in `docs/research/gomedine-2026-11/raw/NNN-*.txt` (check the page date), findings in `part-1..4.md`.
3. Telegram forum findings `docs/research/telegram-iu-2026-11/c1..c7` (c1 newest) and WhatsApp chat findings `docs/research/chats-2026-11/*.md`: what students reported, with message numbers. Good for practice, weaker for rules and amounts.
4. Text MESH already had before 9 Nov 2026 (`git show bed106c:<file>`), which the owner had approved.

## What to do with each claim
- Supported: leave it.
- Supported but stated more precisely or firmly than the source (a range turned into one number, "usually" turned into "always", a detail added): bring it back to what the source says.
- Not supported anywhere: remove it, or rewrite the sentence to what the sources do support. Never invent a replacement.
- Rests only on student reports (source 3) and matters (money, deadlines, rules that can cost a student): keep it only if two or more reports or periods agree, or one is very recent and specific; otherwise remove it. List every kept one in your report file.
- Sources conflict: the stronger source wins; if equal, remove and add an owner question.

Do not shorten guides for style. Keep everything that is supported; the goal is accurate, detailed guides.

## Output
1. Edit the guides in place (Edit tool, your slugs only).
2. Write `docs/research/admin-publish-2026-11/factcheck-<your letter>.md`: per guide, a table of what you changed (claim before, after, source or reason), then the list "Kept, resting on student reports only" (claim, finding numbers), then owner questions.
3. `npx tsc --noEmit` and `npx vitest run tests/content-2026.test.ts tests/content-links.test.ts tests/guide-html.test.ts tests/admin-content.test.ts` must pass.
4. Report in under 200 words: claims checked, changed, removed, kept on student reports only.

If you near your limit, stop at a guide boundary, write the report file with what you finished and what is left, and report.
