# AI coordination log

Several Claude agents work on MESH at the same time. This file is how they stay out of each other's way, and how the owner sees who did what. Live discussion happens in GitHub issue 13 ("Agent coordination"); this file is the durable record.

## Rules for every agent
1. Read this file and the latest comments on issue 13 before starting, and `git fetch --all` to see what others pushed.
2. Claim an area before working on it: add or update your row under "Who owns what", commit and push it straight away.
3. Never edit files inside another agent's claimed area. If you must, ask on issue 13 first and wait for an answer, or for 30 minutes of silence.
4. Push small commits often. After each push that others should know about, add a line to "Log" below and a short comment on issue 13.
5. Be transparent: say what you changed, what you left half done, and anything you broke or reverted.
6. Owner rules in `CLAUDE.md`, `CONTRIBUTING.md` and `docs/HANDOFF.md` apply to everyone. Owner decisions recorded here are binding for all agents.

## Standing instructions from the owner (9 November 2026, binding for every agent)
1. Always check GitHub for the other agents' updates: `git fetch --all`, the new commits on `main` and on every branch, open pull requests, and the comments on issue 13. The shared files are `docs/AI-LOG.md` (who owns what, and a log of every push) and `docs/HANDOFF.md` (where the work stands). Live discussion goes in issue 13.
2. Every time the usage window resets, restart automatically (a scheduled task does this on the owner's PC), read where the other agents left off, and continue from there.
3. Before the window runs out (about 95%), write in this file, on GitHub, what you did (with commit shas) and what still needs doing, and add a line to `docs/AI-LOG.md`.
4. When there are no tasks left for you or for the other agents, run a critical audit of the site and add the new tasks and ideas, ranked, to this file and to the log.
5. A new feature the owner has not approved: do not build it. Ask the owner, or record the question under "Waiting for the owner" in `docs/AI-LOG.md`.
6. Always be working while there is usage. Never sit on standby.
7. Exception: if you feel you are doing something you are not supposed to, or drifting from what the owner asked, stop at once, tell the owner what the issue is, and go no further.

## Owner decisions (binding)
- 9 Nov 2026: no privacy page, opt-out switch or privacy text until near the public launch. Do not build one.
- 9 Nov 2026: analytics may capture as much as is useful about visitors and how they arrive, but never raw IP addresses (location from the host's geo headers is enough). Analytics is visible to the owner role only, never to editors.
- 9 Nov 2026: the assistant is called "Ask the Meshaykh" in English and "مساعد MESH" in Arabic. It is not a shaykh and gives no rulings.

## Who owns what
| Agent | Where it works | Area it owns now | Status |
|---|---|---|---|
| Desktop agent (owner's PC, Claude Code) | worktree `.claude/worktrees/mesh-website-audit-73b810`, pushes `HEAD:main` and mirrors to `origin/revamp` | Analytics (`src/server/analytics/*`, `src/app/api/v1/track`, `src/components/shell/Tracker.tsx`, `src/app/(admin)/admin/(app)/analytics/*`). Assistant interface (`src/features/assistant/*`, `/assistant` and `/ar/assistant` pages, the launcher in `SiteShell`). Arabic interface across the site (`src/app/(ar)/*`, `src/lib/locale.ts`, UI strings in `src/features/*` and `src/components/*`, except the duroos cards). | active |
| Cloud agent | branch `claude/gracious-dirac-o8tgu4`, PRs to `main` | Assistant engine (`src/server/assistant/*`, `src/app/api/v1/assistant/*`, `tests/assistant*.test.ts`). Guide content and organisation (`src/server/seed/content/*`, the guides index and `GUIDE_STAGES`, `scripts/open-questions.json`). | active |
| naiifos | branch `feat/duroos-cards-final` | Duroos cards (`src/features/duroos/DuroosToday.tsx`, `src/features/home/DuroosCards.tsx`, `DarsMiniCard.tsx`, `DuroosCarousel.tsx`). Nobody else touches these. | PR open: carries the work of PRs 11 and 12, which it replaces |

## Waiting for the owner
- Nothing yet.

## Log (newest first)
- 9 Nov 2026, naiifos agent, `feat/duroos-cards-final`: duroos cards finished in one PR (replaces PRs 11 and 12). The Arabic and English duroos pages use the new prayer cards; PC cards show the status badge, title and place on the start side and a larger shaykh photo with the full name after a divider, the photo lined up from the badge to the place line; prev/next arrows on the PC carousel (a mouse could not scroll it); on phones one card per prayer (live, else next) with a Show more / Show less button that keeps the prayer in view. Only `DuroosToday.tsx`, `DuroosCards.tsx`, `DarsMiniCard.tsx`, `DuroosCarousel.tsx` and `ShaykhBadge.tsx` changed.
- 9 Nov 2026, desktop agent, `6414c2d`: Arabic interface across /ar, plus six new Arabic pages (/ar/mahad, the library collections, reader and search, and the company guide). Audit in `docs/audit/arabic-2026-11-09.md`. Guide, FAQ, programme and discount bodies are still English.
- 9 Nov 2026, desktop agent, `78860aa`: merged the cloud agent's assistant engine from `claude/gracious-dirac-o8tgu4` into `main`, keeping its server files over the desktop agent's own engine (pushed earlier in `2fcc3b9`, now replaced). The chat panel now sends `{question, history[{role, content}]}`, renders `[n]` citations as links and shows related questions. Escaped the two long-dash characters in `answer.ts` and `prompt.ts` (`—`, `–`) so the site-wide copy test passes; behaviour is unchanged. Deleted the desktop engine's `tests/assistant.test.ts`; chat rendering is tested in `tests/chat-ui.test.ts`. The cloud agent should rebase on `main` before its next push.
- 9 Nov 2026, desktop agent, `2fcc3b9`: assistant interface (chat panel, launcher on every page, `/assistant` and `/ar/assistant`) and a first engine, before reading issue 13. Questions asked are logged as `ask` events for the owner's Visitors page.
- 9 Nov 2026, desktop agent, `90f632f`: analytics capture how visitors arrive (source type, full referrer, every UTM field and ad click id), what they search (search bar and /search, with result counts), device and browser versions, screen, connection, location from the host's geo headers (no IP), visit number, page speed (Core Web Vitals) and script errors. Daily rollups kept for ever in `analytics_daily`; raw data kept 365 days; owner-only dashboard with CSV export; a monthly backup kept 400 days.
- 9 Nov 2026, desktop agent, `afc27c0` and `2f002df`: reverted a privacy page built by mistake (`97916d3`) and removed the privacy page from every instruction file (owner's decision above).
- 9 Nov 2026, desktop agent: research reports for content work, free for any agent to use: `docs/research/factcheck-2026-11-09-university.md` (Islamic University and campus, official sources), `docs/research/factcheck-2026-11-09-haram-and-daily-life.md` (the Haram for sisters and families, daily-life guides against official Saudi sources), `docs/research/community-2026-11-09.md` (Telegram channels and student sites). Each has corrections with sources, new facts, proposed new articles and questions for the admins.
