# AR5 takeover of #101: status (mstudy, 10 Nov 2026, about 06:40 UTC; usage ran out)

Branch `claude/wonderful-curie-6l5xpy` holds #101's commits plus `main` merged in (commit `276da3b`).

## Done
- Merged `main` into #101's work:
  - assistant files (`answer.ts`, `retrieve.ts`, `knowledge.ts`, `tests/assistant-eval.test.ts`) are `main`'s, which carry #114
  - `kids-activities.ar.html` is `main`'s newer translation
  - search docs keep both: Arabic titles, plus the Arabic body's headings and opening only
  - the home page puts the locale into D3's `HomeGuides` (Arabic titles, `/ar` links, Arabic minutes), and the "Who are you?" chooser is hidden on `/ar` until it has Arabic labels
- `arabic.ts` rebuilt: 71 guides and 74 answers. `npx tsc --noEmit` is clean.

## Left (next agent, sign "<name> for mstudy")
1. **3 structure failures** in `tests/arabic-complete.test.ts`: `finding-an-apartment`, `living-on-a-visitor-id`, `getting-your-stipend-off-the-university-card`. Bring each draft's sections, steps and links in line with the English.
2. **12 pages whose English changed after their Arabic was written** (`drift-report.json`, from `find-drift.py`):
   - guides: `campus-life-islamic-university`, `finding-an-apartment`, `getting-your-stipend-off-the-university-card`, `living-on-a-visitor-id`, `new-student-steps`, `scholarship-stipend-and-allowances`, `sending-and-receiving-money`, `sim-internet-bank`, `unit-13-and-paid-university-housing`, `your-first-semester-week-by-week`
   - answers: `is-housing-included`, `stipend-amount`
   - Update the Arabic to today's English.
3. **Recheck pages last touched by #101's "work in progress (translators still running)" commits** (`d3bd831`, `b516701`), in case they were left half done:
   - `visas-for-family-and-visitors`, `having-a-baby-in-madinah`, `check-visa-and-iqama-online`
   - `sports-and-activities`, `phone-sims-and-absher`, `sisters-studying-in-madinah`
   - Best of all: check every page's facts (numbers, dates, names, steps) against today's English.
4. **AR5.2 drift check:** stamp a hash of the English into each draft header (`en_sha:`) and each answer entry, and make `arabic-complete` fail when it no longer matches.
5. Then `npx tsc --noEmit`, `npx vitest run`, `MESH_LOCAL_DB=1 npx next build`, screenshots of `/ar/guides/<slug>` and `/ar/ask/<slug>` at 390 and 1440 px, then the PR with `Ready to merge`.
6. **The owner publishes:** apply migration 0008 in production *before* merging (code that reads the Arabic columns must not deploy first), merge, then `npm run content:sync`. Close #49 and #101 as superseded.

## Tools
- `dump-english.ts`: copy to a checkout's root and run `npx tsx --tsconfig tsconfig.json dump-english.ts > now.json`. It prints the English of every seeded guide and answer.
- `find-drift.py <dir>`: `<dir>` must hold `now.json` and `dump-english.ts`. For each draft it finds the commit that last wrote it, dumps the English at that commit in a temporary worktree, and lists the pages whose English has changed since.
