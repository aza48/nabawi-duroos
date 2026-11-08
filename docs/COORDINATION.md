# MESH agent coordination (every AI reads this first, every session)

Several AI agents work on MESH at the same time: the owner's desktop session, cloud sessions, and contributors' own agents. This file is how they avoid doing the same work twice. It lives on `main`, so every agent sees the same version. The live channel for quick messages is GitHub issue [#13](https://github.com/iumuhaymin/medinahub/issues/13).

## The owner's standing instructions (Muhaymin, 8 November 2026)

1. **Always be working while you have usage. Never sit on standby.** When your usage window resets, restart straight away: read this file, `docs/HANDOFF.md`, issue #13, `git fetch --all` and the open pull requests, see where the other agents left off, and continue from there.
2. **Set this up as an automation.** Each agent schedules its own wake-up (for example an hourly scheduled task or a reminder at the next reset) so it restarts without the owner having to ask.
3. **Check GitHub for the other agents' work constantly:** before you start a task, before you push, and every hour or so. Pull their changes and build on them. Never build a second version of something another agent already has.
4. **Talk through GitHub.** Claim work in the table below before starting it, post a short comment on issue #13 when you push something others should know about, and reply there when another agent asks you something.
5. **At the end of each usage window** (stop near 95 percent), write what you did and what is left in `docs/HANDOFF.md` (top section) and in the log below, commit and push.
6. **When there are no tasks left**, for you or for anyone else, run an audit (content accuracy, broken links, accessibility, speed, the Arabic version, the admin, security) and add the findings as new tasks below. Keep improving.
7. **New features need the owner's permission.** If an idea is a new function the owner has not approved, do not build it: add it to "Ideas waiting for the owner" below (and ask on issue #13). Work on approved things meanwhile.
8. **If you feel you are doing something you should not, or drifting from what the owner wants, stop at once,** write the issue on #13 and in this file, and do not go further until the owner answers.
9. Work around blockers yourself where you safely can (use your judgement); otherwise note the blocker here and move to the next task. Never stop entirely.
10. The house rules in `CLAUDE.md` and `CONTRIBUTING.md` always apply: tests and typecheck before every push, no dashes, speak with authority, impartial, no secrets, no production database writes without the owner.

## Who is working on what (claim before you start, clear when done)

| Area | Agent | Branch | Status |
|---|---|---|---|
| Ask MESH assistant: UI (panel, launcher, /assistant pages), question logging in analytics | Desktop agent | `main` | Live (2fcc3b9) |
| Ask MESH assistant: answering engine (`src/server/assistant/*`, `/api/v1/assistant`, `tests/assistant.test.ts`) | Cloud agent | `claude/gracious-dirac-o8tgu4` | Merged engine ready, PR to `main` |
| Guides reorganised by topic (`/guides` index, `GUIDE_STAGES`) | Cloud agent | `claude/gracious-dirac-o8tgu4` | Next |
| Fact-check of the seeded guides, new researched guides (`src/server/seed/content/*`, `scripts/open-questions.json`) | Cloud agent (research helpers) | `claude/gracious-dirac-o8tgu4` | In progress |
| Duroos cards on home and duroos pages | naiifos | `feat/single-card-layout`, PR #11 | In progress |
| Analytics dashboard | Desktop agent | `main` | Live (90f632f) |

## Ideas waiting for the owner (do not build until approved)

- (add ideas here with a one-line why)

## Blockers and things only the owner can do

- Free AI keys for the assistant, in Vercel, production: `GROQ_API_KEY` (console.groq.com), `CEREBRAS_API_KEY` (cloud.cerebras.ai), `ASSISTANT_GEMINI_API_KEY` (aistudio.google.com, a new project so it has its own quota), optionally `MISTRAL_API_KEY` and `OPENROUTER_API_KEY`. Without them the assistant uses the watcher's Gemini key on its lite models only, then the site's own sentences.
- Cloud sessions cannot reach `t.me` or `medinahub.org` (environment network policy). Add them to Allowed domains for direct Telegram research and live checks.
- Production database steps (`npm run content:sync`, live row edits) stay with the owner or the desktop agent.

## Log (newest first; one line per push or decision)

- 2026-11-08 22:40 UTC, cloud agent: merged engine for Ask MESH pushed to `claude/gracious-dirac-o8tgu4` (31715ae). It keeps the desktop agent's panel and API shape. Created this file and the protocol above at the owner's request.
- 2026-11-08 22:07 UTC, desktop agent: Ask MESH (2fcc3b9) live on `main`.
- 2026-11-08 22:00 UTC, desktop agent: analytics (90f632f) live on `main`.
