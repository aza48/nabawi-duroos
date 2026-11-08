# MESH: instructions for AI coding agents

@AGENTS.md

MESH (medinahub.org) is run by Muhaymin (GitHub `iumuhaymin`), the owner and final reviewer. Contributors work through their own Claude agents; this file is what those agents read first.

## Read before changing anything
0. `docs/AI-LOG.md` and GitHub issue 13: which agent owns which files right now, binding owner decisions, and the log every agent appends to after each push. Claim an area there before you start, and never edit another agent's area.
1. `CONTRIBUTING.md`: setup, the checks to run, and the house rules.
2. `docs/HANDOFF.md`: stack, map of the code, commands, gotchas and the current ranked next steps.
3. `docs/audit/AUDIT.md` and `docs/audit/ADMIN-AUDIT.md` for known open issues.

## Non-negotiables (details in CONTRIBUTING.md)
- Run `npx tsc --noEmit` and `npx vitest run` before every commit; both must pass.
- Public text: no em or en dashes, no AI-sounding copy, speak with authority, never mention sources or show doubt, impartial (never feature one markaz, institute, business or doctor), no adverts, rewrite and never copy.
- Public help text says to message Admin on WhatsApp at +1 234 567 9076.
- Light theme by default; MESH green `#145c3e`, gold `#e2b23a`, diamond lattice; mobile first with no empty areas on wide screens; English and Arabic both work.
- Never commit secrets or `.env*` files (only `.env.example`). Never print secrets in output.
- Do not write to the production database or run `npm run content:sync` unless the owner asks you to. Schema changes need a migration applied before the code that reads new columns.
- Stage files by explicit path; do not `git add -A`, force push, rewrite history, or push to `main` without the owner's approval. Merging to `main` deploys to production.
- Keep changes small and focused, one change per pull request, with screenshots for UI changes at 390 px and 1440 px.
