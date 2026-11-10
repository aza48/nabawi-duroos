# MESH handoff (read this first)

Cleaned up on 9 November 2026, about 17:00 Riyadh, by akheeai. This file is the current state and nothing else. The older session notes are in `docs/archive/HANDOFF-2026-11-07-to-09.md`.

Read order is in `CLAUDE.md` (AI-LOG and issue 13 first). This file holds only where things stand and what is next.

## 10 November 2026, about 02:45 Riyadh: aiakhee (Lane B, the assistant, AR1)
**Merged to `main`:** B4 dars locations (#60), B1 First 100 days `/start` (#54), B2 glossary `/glossary` (#56), B6 Quran and hadith links (#57), B5 FAQ short answers (#58), FAQ fixes and 13 new FAQs (#85), the assistant (#106: ruling guard, citations, search fixes, authoritative wording, a 228-question test bank in `tests/assistant-eval.test.ts`).

**Waiting for the owner:**
- AR1: #49 and #101 carry the same migration (`drizzle/0008_arabic-content.sql`). #101 goes ahead and #49 is to be closed; see item 1 of "Waiting for the owner" in `docs/AI-LOG.md`.
- Done 10 Nov, 06:45: the full `npm run content:sync` published the FAQ short answers, fixes and new FAQs.

**Next for aiakhee (or anyone free):**
1. AR4 (the FAQs in Arabic) is already done in #101 (all 74 answers). Do not start it.
2. The deferred admission and University FAQs: drafts and evidence in `docs/research/faq-deferred-2026-11.md`; recheck against admin's corrected guides first.
3. Assistant weak answers listed in `docs/research/assistant-eval-2026-11.md` (Haram opening hours, Jawazat location, visa expiry), mostly content gaps for the guide owners.
4. New guide topics offered to admin on issue 13 (Qur'an circles at the Haram, government offices, utilities in a rented flat, working on an iqama); write them only if admin passes them on.

aiakhee's hourly wake-up is paused (owner, to save tokens); the usage reset wake-up is booked for 03:52 UTC.

## 10 November 2026, about 06:30 Riyadh: Desktop agent
**Live:** the 28 guides and 35 FAQs from the research are published (`--only`, all 63 checked on medinahub.org).

**Everything merged is live (06:45):** the owner asked, and the Desktop agent ran the full `npm run content:sync` from `main`: 68 guides and 74 FAQs, all 142 pages return 200, and `npm run content:diff` shows nothing waiting. A backup of the live rows was taken first.

**Stopping duplicate work (new, read before you start anything):**
- `npm run overlap`: every open PR, who claimed it, and any guide slug, migration number or file two open PRs share. `npm run overlap -- --find <topic>` before you start a topic. Every PR also gets this as an automatic comment when it overlaps another (`.github/workflows/pr-overlap.yml`, comment only).
- `tests/seed-no-duplicates.test.ts` fails when two seed lists define the same guide or FAQ slug, when two guides share a title, or when a seed list is not wired into `sync.ts`.
- New claim rules at the top of `docs/AI-LOG.md`: a draft PR plus a `Working on:` or `Reviewing:` comment; leave work someone claimed in the last 6 hours; one reviewer per PR.
- **Duplicates found today:** #49 and #101 carry the same migration and AR1 code, so #49 should be closed (the owner or web; this session cannot close PRs). **AR4 (the FAQs in Arabic) is already done in #101** (all 74 answers), so aiakhee should not start it. web and the Desktop agent both reviewed #109 at the same time; web merged it.

**#101 (Arabic):** its own session is active and bringing the Arabic in line with `main`; nobody else touches it. When it is ready: the owner applies migration 0008 and runs `npm run content:sync` from that branch, then it merges.

## 1. Standing instructions from the owner (binding for every agent)
1. **Stay in touch through GitHub.** On every wake-up run `git fetch --all`, then read the new commits on `main` and every branch, the open pull requests and the latest comments on issue 13. `docs/AI-LOG.md` is the shared file: who owns what, owner decisions, questions waiting for the owner, and a log line for every push. Claim a task before starting it as rules 2 to 4 at the top of `docs/AI-LOG.md` say (`npm run overlap -- --find <topic>`, then a draft PR with a `Working on:` comment and a note on issue 13), so no two agents do the same work.
2. **Always on, fully hands off.** Every agent keeps itself working without anyone opening a session:
   - a scheduled task that wakes your own session every hour (cloud agents: `create_trigger` bound to their own session, never `create_new_session_on_fire`, because a fresh session gets no repo, no GitHub login and no tools)
   - a one-shot wake-up at your next usage reset, about 5 hours after your window began plus 2 minutes, booked again on each run

   A wake-up that arrives while you are working waits until you finish, so runs never overlap. Never schedule work for another agent's session.
   The Desktop agent is the exception: it has no wake-up and works only when the owner opens it (owner decision of 9 Nov in `docs/AI-LOG.md`).
3. **Push as soon as work is done** (owner, 9 Nov). Push it and open its PR at once, so the others see it and updates reach the site fast. Post a short note on issue 13 at the same time.
4. **Always be working while there is usage.** When your lane is done, take spare tasks, review other agents' PRs, or audit the site and add ranked tasks here and in the log.
5. **No unapproved features.** A new feature the owner has not approved is not built. Ask the owner, or add it under "Waiting for the owner" in AI-LOG.
6. **Stop if drifting.** If you are doing something you should not, or drifting from what the owner asked, stop at once, tell the owner, and go no further.
7. **Model:** Claude Opus 5.5 at high effort, or Claude Fable 5.1 when a task needs it. Never a smaller model.
8. **Cloud sessions are invisible.** Only the repo `iumuhaymin/medinahub` is shared. Push everything others need: code, half-done work on your own branch, notes and reports. Cloud containers are deleted when a session ends.
9. **Hand off before your usage runs out.** At about 85% of the window, start nothing new.
   - Commit half-done work to your own branch with a message starting "WIP:" and push it.
   - Add an entry under "Takeovers" in AI-LOG: the task, the branch, what is done, the exact next step, the files, and the teammate who takes over (your buddy, or anyone free).
   - Update section 2 of this file, add a log line, and comment on issue 13.

   The teammate checks "Takeovers" first on every wake-up, works on that branch and in those files only, signs commits "<name> for <owner>", and hands back when the owner of the task returns.
10. **Vercel builds `main` only** (owner, 9 Nov; `vercel.json`). Agent branches build no previews. Check your work locally before pushing: tsc, vitest, `MESH_LOCAL_DB=1 npx next build`, and screenshots at 390 and 1440 px.
11. **Merging.** Who reviews and merges is set by the owner under "Owner decisions" in `docs/AI-LOG.md`; the review claim rules are at the top of that file. A PR with a migration waits until the owner has applied the migration in production. Nobody changes the production database for someone else.

## 2. Where things stand (9 November, evening)
**Live on medinahub.org, or live with the next deploy of `main`:**
- **Duroos:**
  - Now and next on `/duroos`
  - My duroos (stars and a filter)
  - "Did this dars not happen today?" to Admin
  - calendar reminders 20 minutes before each dars
  - `/lite`, today's duroos in about 4 KB
  - Event and Person markup for Google
- **Shell:**
  - help always points to Admin on WhatsApp
  - Arabic numbers read right
  - text size control (A, A+, A++)
  - the "Up next" rail on the wide home page
  - Ramadan mode, which switches on by itself on 1 Ramadan 1448
  - loading and error states
  - the MESH gate as the app icon
  - share images for lessons, shaykhs and answers, and print styles
- **Arabic pages** show Arabic articles as soon as AR1 lands and its migration is applied. The page code (AR2) is already on `main`.
- **Data waiting for a sync:**
  - the mashayikh's current positions for 26 shaykhs, with research in `docs/research/mashayikh-positions-2026-11.md`

**Open PRs:** run `npm run overlap` (every open PR, who claimed it, and overlaps).

**Only the owner can do these:** the list is "Waiting for the owner" in `docs/AI-LOG.md`. One item not yet there: add the 13 official Masjid an-Nabawi lessons in Admin > Duroos and rename the Fada'il al-Qur'an teacher to Prof. Dr. Badr ibn Nasir al-Badr (tables in `docs/research/duroos-official-schedule-2026-11.md`), then `npm run shaykh:sync -- --apply`.

## 3. Open work by agent
Who owns what, what each agent is doing now, and handed-over work: "Who owns what" and "Takeovers" in `docs/AI-LOG.md`, plus the latest comments on issue 13. Task specs for the lanes: `docs/WORKPLAN-2026-11-09.md`. All 314 researched ideas: `docs/IDEAS-2026-11-09.md`.
- **admin** (10 Nov): every Telegram period and every gomedine.com page is read, and the guides and corrections from them are published. What is left needs the owner's answers: the last section of `docs/research/admin-publish-2026-11/OWNER-QUESTIONS.md`. Other agents may read `docs/research/telegram-iu-2026-11/` and `docs/research/gomedine-2026-11/` as research.

## 4. What MESH is
medinahub.org is run by students, for English-speaking students and families in Madinah. It covers:
- live duroos schedules of the mashayikh, kept current by a Telegram watcher
- study programmes
- guides to University and everyday life
- a library of IU course books
- student discounts, key dates and verified answers

It is in English, with Arabic under `/ar`, and it promotes the MESH WhatsApp group (the link is editable in Admin > Settings).

## 5. Owner's rules (always follow)
- **Copy:** no em or en dashes anywhere (tests scan for them) and no AI-sounding copy. Plain, warm, specific English.
- **Help text:** "message Admin on WhatsApp at +1 234 567 9076 or email mesh@albaseerah.org". The number and email are fixed in code (`HELP_CONTACT_DEFAULT` and `HELP_EMAIL_DEFAULT` in `src/server/settings.ts`, `ADMIN_WHATSAPP` and `ADMIN_EMAIL` in `src/components/shell/admin-help.ts`) and is not editable in the admin. Help never goes to the group.
- **Authority:** public text never mentions a source, channel, post or doubt ("reportedly", "not stated"). Research notes stay in `docs/research/` or go to the owner as questions.
- **Impartial:** never recommend or feature one markaz, institute, business or doctor. List alphabetically, and say MESH is student-run and independent. The one exception is the owner's: the light purple gleam on the Madinah Arabic Program card.
- **No adverts or short-term promotions.** Only long-term, real, in-person services and neutral facts. Never repeat another site's names, groups or price lists as promotion.
- **Rewrite, never copy** PDFs or sites word for word.
- **Unsure means ask, never guess.**
  - Put the question in `scripts/open-questions.json` and run `npm run questions:add -- scripts/open-questions.json`. It shows in Admin > More > Questions for you.
  - Answers are never published straight away. Run `npm run questions:pull` (it writes `docs/ADMIN-ANSWERS.md`), then write the content in MESH's own words.
- **Temporary information expires.** Log every offer, trip, registration window or one-off event in `docs/EXPIRING.md` with its expiry date, and sweep that table at the start of every session.
- **Look:** light theme by default ("Madinah Night" only from the theme button). MESH green `#145c3e`, gold `#e2b23a`, heavy white wordmark, diamond lattice. Mobile first, with no empty areas on wide screens; check at 390, 1024, 1440 and 2000 px. English and Arabic both work.
- **Shaykh photos:** verified ones only (a wrong face is worse than none). `ShaykhBadge` is the fallback.
- **Iqama and Visitor ID** paths are covered side by side in banking, SIM, licence and visa guides.
- **Freshness:** facts that change show when they were last checked.
- **Free notifications only.** The site stays API-first (`/api/v1`, documented in `docs/API.md`) for a later native app.
- **Safety:**
  - Never push code that fails `npx tsc --noEmit` or `npx vitest run`, and never print or commit secrets.
  - Stage files by explicit path; no `git add -A`, no force push, no history rewrite.
  - Previews never touch the live database.

## 6. Accounts and where secrets live (the owner controls all of them)
- **Code:** GitHub `iumuhaymin/medinahub`. A merge to `main` deploys production on Vercel.
- **Hosting:** Vercel project `medinahub` (team "MESH", Hobby plan, 100 deployments in any 24 hours), functions in fra1. The domain medinahub.org is on Namecheap DNS.
- **Database:** Supabase Postgres (Frankfurt), through its transaction pooler with node-postgres (`src/server/db/client.ts`; postgres-js hangs there). The connection string is only in the git-ignored `.env.production.local` and in Vercel `DATABASE_URL`.
- **Scheduler:** Supabase `pg_cron` calls `/api/cron/watch` every 3 minutes (the Telegram watcher) and `/api/cron/daily` at 01:30 UTC (the morning brief), with a Bearer `CRON_SECRET`. `docs/OPERATIONS.md` has the environment variables and a Cloudflare Worker as a fallback.
- **Backups:** `.github/workflows/backup.yml` runs nightly and keeps 90 days of artifacts, using the repo secret `BACKUP_DATABASE_URL`.
- **AI:** the watcher uses `GEMINI_API_KEY` (free tier). The assistant uses free providers first (`src/server/assistant/llm.ts`).
- **Secrets:** only in `.env.local`, `.env.production.local`, `.env.launch` (all git-ignored) and Vercel env.
- **Admin accounts:** invite only.
  - First owner: `npm run admin:invite -- <email> owner`, with the live `DATABASE_URL`.
  - Others: Admin > More > Admins > Invite.

## 7. Stack and commands
- **Stack:**
  - Next.js 16 (App Router, `src/proxy.ts`; read `node_modules/next/dist/docs/` before writing Next code), React 19, TypeScript, Tailwind 4
  - Drizzle ORM; PGlite in memory for dev, tests and local builds
  - Better Auth: invites, roles, passkey or TOTP second factor, audit log with undo
  - MiniSearch with an Arabic and transliteration normaliser
  - Vitest (over 1,200 tests) and Playwright for screenshots
- **Commands:**
  - `npm run dev -- -p 3100`: dev server
  - `npx tsc --noEmit` and `npx vitest run`: run both before every push
  - `MESH_LOCAL_DB=1 npx next build`: a production build with no database. Don't build while a dev server or an older `next start` runs from the same folder; a stale server rewrites cached pages into the new build.
  - `npm run content:sync`: applies migrations to live, then upserts the seeded guides, FAQs and book links. `--only=slug1,slug2` touches only those rows. Run migrations **before** deploying code that reads new columns.
  - `npm run shaykh:sync`: previews the mashayikh positions; `-- --apply` writes them, with an audit entry each.
  - `npx drizzle-kit generate --name <x>`: a new migration after a schema change.
  - `node scripts/whatsapp-new.cjs "<export.zip>"`: only the WhatsApp messages since the last processed export. Add `--commit` to mark them read (cursors are in `data/whatsapp-cursors.json`).

## 8. Map of the code
- **`src/app`:**
  - `(site)`: English pages
  - `(ar)/ar`: Arabic pages
  - `(admin)/admin`: the admin
  - `api`: `/api/v1` and the cron routes
  - `(site)/lite` and `(ar)/ar/lite`: the light page
- **`src/features`:**
  - `duroos`: the today page, cards, Now and next, schedule, lesson and shaykh pages, stars, structured data, `/lite`
  - `home`: hero, day arc, the Up next rail, Ramadan mode
  - `content`: guide reader, FAQ explorer
  - and `programs`, `library`, `discounts`, `search`, `assistant`, `admin`
- **`src/server`:**
  - `db`, `auth`, `admin`, `duroos`, `content`
  - `watcher`: the Telegram reader
  - `assistant`: "Ask the Meshaykh"
  - `calendar.ts`: the `.ics` feeds
  - `seed`: `legacy/` is the original schedule and profiles; `content/` holds the guides, FAQs, positions and `sync.ts`
- **`src/content`:** programmes, library, discounts and key dates. These are still code files, not admin-editable.
- **`src/lib`:** `guide-html.ts` (interactive guides), `arabic-count.ts`, `arabic-content.ts`, `text.ts`, `search/`.
- **Docs:**
  - `docs/audit/` (audits and release checks)
  - `docs/research/` (sourced research behind every fact)
  - `docs/EXPIRING.md`
  - `docs/OPERATIONS.md`
  - `docs/API.md`
  - `docs/archive/` (history)

## 9. Gotchas
- Several agents work at once. Stage by explicit path, and keep each PR to one change. A conflict in `docs/AI-LOG.md` is always "keep both sides".
- `tsconfig.tsbuildinfo` changes whenever tsc runs; never commit it.
- A function exported from a `"use client"` file cannot be called from a server component; shared helpers live in plain modules.
- Migrations must reach live before the code that selects new columns.
- Shaykh slugs come from the English name with titles stripped (`shaykhSlug`, any order since 9 Nov). Changing the name itself in `lessons.ts` changes the slug, so rename shaykhs in the admin instead.
- Full-page screenshots need `reducedMotion: "reduce"`, or cards below the fold stay hidden by the scroll reveal.
- Cloud sessions cannot reach `t.me`, `vercel.com` or `medinahub.org` directly; web search still works.
- **Desktop agent (Windows):**
  - set `WATCHPACK_POLLING=true` for the dev server, because OneDrive breaks file watching
  - write `node -e` scripts to files, because Git Bash breaks the quotes
  - remotes `mine` (medinahub) and `origin` (mirror)
- The Arabic font preload through `next/font` is dropped: this Next version gives both declarations the family name "Alexandria", so Arabic pages download it twice and English pages preload it too.

## 10. Open questions for the owner
The answers let MESH state these with authority. Earlier rounds and their decisions are in `docs/archive/IDEAS-FOR-OWNER-2026-11-08.md`.
- **Mashayikh:** the 11 open questions at the end of `docs/research/mashayikh-positions-2026-11.md`, including:
  - who "Badr ibn Muqbil al-Badr" and Maher al-Qahtani are
  - whether Ali Abu Battin is Prof. Dr.
  - Abdulmuhsin al-Qasim's court
- **Shaykh photos:** 11 shuyukh have no verified photo (`docs/research/shaykh-photos.md`).
- **Channels:** may shaykh facts and the library page name Telegram, YouTube and "Study in Saudi" channels as places to follow?
- **Programmes:** Fusha's exact name and contact; Mutun al-Ijaz's price (550 or 400 SAR a month), and whether it gives a recommendation for University admission.
- **Campus life:** free bus stops and times to the Haram; the mat'am's hours; students per room in the Jamiah and Rabwa halls; family housing after probation; sports club facilities; class hours.
- **Health:** do visitors get free emergency care at government hospitals?
- **Community groups:** do you want a neutral page with only groups you have checked?
