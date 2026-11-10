# Shared brief: publishing admin's research into MESH guides

Repo: /home/user/medinahub (MESH, medinahub.org, a hub for English-speaking students at the Islamic University of Madinah). Branch `claude/resume-guide-validation-8uugen` is checked out. Dependencies are installed.

Several writers work in this same folder at the same time, each on its own guides. So:
- **Do not run any git command that changes state** (no add, commit, stash, checkout, reset). The coordinator commits.
- Edit **only** the slugs and files your task lists. If another guide needs a change, put it in your report instead.
- Several writers may edit the same seed file (different guides in it). If an Edit fails because the file changed, re-read that part and retry. Never rewrite a whole seed file with Write; use Edit on your guide's block only.
- Do not touch `sync.ts`, `src/lib/guide-topics.ts`, `docs/AI-LOG.md`, `docs/HANDOFF.md`. The coordinator wires new guides in.

## Where things are
- Guides and FAQs are seeded from `src/server/seed/content/*.ts` (type `SeedGuide = { slug, title, summary, stage, bodyHtml }` in `guides-2026.ts`; FAQs `{ slug, category, question, answerHtml, tags }`). A later list in `sync.ts` replaces an earlier guide with the same slug. Find a slug with grep before editing, and edit it where its live version is (check `GUIDE_REWRITES_2026_11` in `guides-research-2026-11.ts`, which overrides).
- Research (read the parts you need, not everything):
  - `docs/research/NEXT-STEPS-admin-research.md`: status and publishing plan.
  - `docs/research/iu-pdfs-2026-11/*.md`: official University PDFs, each with findings, then section 4 "ready to publish" text and section 5 owner questions. Extracted PDF text is in `docs/research/iu-pdfs-2026-11/text/` if you must check a fact.
  - `docs/research/telegram-iu-2026-11/c1..c4, c7`: what students reported in the IU Telegram forum by period (c1 is the latest, Aug to Nov 2026). Student reports: use them for practical detail; an official PDF wins over them.
  - `docs/research/gomedine-2026-11/part-1, part-3, part-4.md`: a Madinah government-services site, rewritten. Part 2 is missing (still on the owner's PC).
  - `docs/research/chats-2026-11/README.md`: WhatsApp chat research (conflicts and tasks by guide).
  - `docs/research/GUIDE-IDEAS-admin-2026-11.md`: new guide ideas.
- Today is 9 November 2026 (Hijri year 1448).

## House rules for public text (tests enforce some of them)
- No em dashes or en dashes anywhere (use commas, colons, "to"). No AI-sounding copy. Plain, warm, direct English for students whose English may be a second language.
- Speak with authority. Never mention sources (no "according to the PDF", "students on Telegram say", "gomedine", "a forum"), and never show doubt ("may", "might", "reportedly", "it seems", "we think"). If a fact is not solid enough to state firmly, leave it out and list it as an owner question.
- Impartial: never feature one markaz, institute, business or doctor. No adverts.
- Rewrite, never copy text from a source.
- Help line wording, where a guide ends with help: "Please message Admin on WhatsApp at +1 234 567 9076 or email <a href=\"mailto:mesh@albaseerah.org\">mesh@albaseerah.org</a>."
- HTML in `bodyHtml`: `<p>`, `<h2>`, `<h3>`, `<ul>/<ol>/<li>`, `<table>` with `<thead>/<tbody>`, `<strong>`, `<blockquote><p>Tip: ...</p></blockquote>`, internal links `<a href="/guides/<slug>">`. Look at a neighbouring guide and match its style. Start a guide with a short `<p>` that says what it covers.
- Make guides as detailed and useful as possible: exact steps, menu names in the University system (English and the Arabic label in brackets where it helps), fees, deadlines, tables, worked examples, what to do when it goes wrong. Keep facts specific and current.
- Where sources conflict and the official PDF does not settle it, do not publish either side: list it as an owner question.

## Checks before you report
- `npx tsc --noEmit`
- `npx vitest run tests/content-2026.test.ts tests/content-links.test.ts tests/guide-html.test.ts tests/admin-content.test.ts` (and any test that names your files; grep `tests/` for your file names). Links to slugs other writers are creating may fail the links test; note them, do not remove useful links. Coordinator runs the full suite.

## Report (keep it under 300 words)
Files and slugs changed or created; for each new guide its slug, stage and which topic it fits (topics: getting-started, papers, home, study, more-study, haram, family, explore); owner questions (conflicts you did not publish), with the finding file and number; anything left undone. Also append your owner questions to `/tmp/claude-0/-home-user-medinahub/09deb8f4-1786-549a-a32d-50ec8e1f0fd0/scratchpad/owner-questions-<your-task-letter>.md`.
