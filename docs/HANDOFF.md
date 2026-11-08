# MESH handoff (read this first)

Last rewritten 8 November 2026, about 09:15 Riyadh, at the end of the 7 and 8 November sessions. This file is the single source of truth for continuing the work. If you are a fresh Claude Code session, also read `docs/START-HERE.md`.

## Restart plan (8 November, owner's standing permission)
- After each usage reset the main session wakes (scheduled), tells the side sessions to continue (mesh-articles: article intake; mesh-design: beauty and interactivity, starting with the hero sky; mesh-readiness: review, done), then continues its own gaps from docs/READINESS.md. If the main session is gone, a fresh session should do the same: read this file and docs/READINESS.md and continue.
- 8 November live content applied by the main session: 4 guides, 5 FAQs, a one-off fix script, now removed (calendar, childbirth, business, sisters, graduation; sports list unpublished; exam schedules announcement).

## What MESH is
medinahub.org: a hub run by students, for English-speaking students and families in Madinah. Live duroos schedules of the mashayikh (kept current by a Telegram watcher), study programmes, guides to university and everyday life, a library of IU course books, student discounts, key dates and verified FAQs, in English with a growing Arabic version under `/ar`. It promotes the MESH WhatsApp group (link editable in Admin > Settings).

## Owner's rules (always follow)
- **Copy:** no em dashes or en dashes anywhere (a test scans for them) and no AI-sounding copy. Plain, warm, specific English.
- **Help text:** say "please message Admin on WhatsApp at +1 234 567 9076 (the number is a clickable WhatsApp link in the footer)". That number is real and fixed in code (`HELP_CONTACT_DEFAULT` in `src/server/settings.ts`); it is deliberately not editable in the admin.
- **Speak with authority, never reveal sources.** Public text never mentions a source, channel, post or doubt ("reportedly", "not stated"). Research notes stay admin-only or go to the owner as questions.
- **Impartial.** Never recommend or feature one markaz, institute or business. List alphabetically; say MESH is student-run and independent.
- **Plain words over jargon** ("Course books" not "muqarrarat"; keep the Arabic beside it where students search for it). No filler features.
- **Rewrite, never copy** PDFs or sites word for word.
- **Theme:** light by default; dark ("Madinah Night") only via the theme button.
- **Layout:** mobile first; desktop uses the space with no big empty areas. Check at 2000, 1440, 1024, 390 and 360 px.
- **Brand:** deep green #145c3e, gold #e2b23a, heavy white wordmark, diamond lattice pattern.
- **Shaykh photos:** only verified ones (a wrong face is worse than none). `ShaykhBadge` (calligraphic name) is the fallback.
- **Iqama and Visitor ID:** banking, SIM, licence and visa guides cover both paths side by side.
- **Freshness:** facts that change (fees, dates) show when they were last checked.
- **Temporary information expires.** Discounts, offers, sales, trips, registration windows and one-off events must be removed or updated as soon as their period ends; everything on the site must be up to date. Log every temporary item in `docs/EXPIRING.md` with its expiry date and location, and sweep that table at the start of every session and before every deploy.
- **Unsure means ask, never guess.** If a fact cannot be stated with authority, leave it out and add it as a question for the admins: put it in `scripts/open-questions.json` and run `npm run questions:add -- scripts/open-questions.json` (it appears in Admin > More > Questions for you). **An admin's answer is never published straight away.** It is only saved. Run `npm run questions:pull` to write new answers to `docs/ADMIN-ANSWERS.md`, then read each one, interpret it, write the content in MESH's own words, design and publish it properly, and move the entry under "Processed".
- **No adverts or short-term promotions.** Only long-term, real, in-person services (regular classes, programmes, institutes) and neutral facts. No one-off trips, tours, sales or events that read like an advertisement, even when the owner pastes the poster.
- **Never advertise anyone.** Facts from other sites are used for their usefulness only. Never repeat their names, businesses, groups, prices lists as promotion, links, or advertisements.
- **Free notifications only.** Keep the site API-first (`/api/v1`) for a later native app.
- **Safety:** never push to `main` without `tsc` and `vitest` passing. Previews never touch the live database. Never print or commit secrets.
- **Usage:** call `get_usage` between steps; stop at a safe point, commit, push and update this file before the window runs out.

## Accounts and where secrets live (the owner controls all of them)
- **Code:** GitHub `iumuhaymin/medinahub` (private). `main` deploys to production on Vercel automatically. `revamp` is the working branch, mirrored to `aza48/nabawi-duroos`. Remotes: `mine` (medinahub) and `origin` (mirror). Deploy with `git push mine revamp:main` then `git push origin revamp`.
- **Hosting:** Vercel project `medinahub` (team "MESH", Hobby), functions in fra1. Domain medinahub.org on Namecheap DNS.
- **Database:** Supabase project `cbkxuwccuidwyvggghri` (Frankfurt, Postgres 17). Connection string only in git-ignored `.env.production.local` and Vercel env `DATABASE_URL`.
- **Scheduler:** Supabase `pg_cron` calls `/api/cron/watch` every 3 minutes (Telegram watcher) and `/api/cron/daily` at 01:30 UTC (morning brief), with a Bearer `CRON_SECRET`.
- **Backups:** `.github/workflows/backup.yml` nightly, 90 days of artifacts, repo secret `BACKUP_DATABASE_URL`.
- **AI:** Gemini free key in `GEMINI_API_KEY` (about 20 requests a day per model; the code falls through five models).
- **Secrets:** only in `.env.local`, `.env.production.local`, `.env.launch` (all git-ignored) and Vercel env.
- **Admin accounts:** invite only, no shared password. First owner account: `npm run admin:invite -- <email> owner` with `DATABASE_URL` from `.env.production.local`. Others: Admin > More > Admins > Invite.
- Remote Control is blocked by the organisation's claude.ai policy, not by this PC.

## Stack
- Next.js 16 (App Router, `proxy.ts`), React 19, TypeScript 5.9, Tailwind 4.
- Drizzle ORM over a `pg` Pool to Supabase's transaction pooler (do not use postgres-js; it hangs there). PGlite in memory for dev, tests and previews.
- Better Auth: invites only, roles (owner, editor, duroos_editor, content_editor), second factor is a Face ID or fingerprint passkey (TOTP as fallback), 8-character minimum passwords, reset links, audit log with undo.
- MiniSearch with an Arabic and transliteration normaliser and synonyms (`src/lib/search`).
- Vitest: 250 tests, all passing at this handoff.

## Commands
- `npm run dev`: dev server on port 3100. Set `WATCHPACK_POLLING=true` (OneDrive breaks file watching).
- `npx tsc --noEmit` and `npx vitest run`: run both before every push.
- `npm run content:sync`: applies migrations to live, then upserts the seeded guides, FAQs, book links and the Al-Midad import. `--only=slug1,slug2` touches only those rows. Run migrations **before** deploying code that reads new columns.
- `npx drizzle-kit generate --name <x>`: new migration after a schema change.
- Screenshots: headless Edge via playwright-core (`channel: "msedge"`, `waitUntil: "load"`; networkidle hangs on duroos pages). The in-app browser pane often times out.

## Map of the code
- `src/app/(site)`: English public pages. `src/app/(ar)/ar`: Arabic pages (duroos, sisters, programs, guides, ask, library, discounts, more). `src/app/(admin)/admin`: admin (login, invite, reset, setup-2fa, and `(app)` for the signed-in area). `src/app/api`: `/api/v1` and cron routes.
- `src/content/`: programs.ts, library.ts and library-books.json (1,682 files), discounts.ts, key-dates.ts. These are still code files, not admin-editable.
- `src/server/`: `db` (schema, client), `auth`, `admin` (content, audit, describe), `duroos`, `content`, `watcher` (Telegram reader, Gemini parse, `prefilter.ts`), `settings.ts`, `seed/content` (guides-2026.ts, sync.ts, book-links.ts, al-midad.ts).
- `src/features/`: home (TodayHero, DayArc, NextPrayer, KeyDates), duroos (DetailPages, ShaykhBadge, ScheduleBrowser, sisters variant), programs, library, discounts, search (Ctrl+K palette), content (guide reader, FAQ explorer), admin (AdminShell, forms, watcher Suggestions, ActivityList, SettingsForms).
- `src/lib/guide-html.ts` makes guides interactive; `src/lib/text.ts` has `metaTitle` and `metaDescription`.
- SEO: `src/app/sitemap.ts`, `robots.ts`, `llms.txt` routes, `components/JsonLd.tsx`, Open Graph images.
- Docs: `docs/audit/AUDIT.md` (public site audit with statuses), `docs/audit/ADMIN-AUDIT.md` (admin audit), `docs/audit/personas/`, `docs/research/` (IU official, living in Madinah, programmes, community terms, group chat 2026, Study in Saudi Telegram, Al-Midad import, shaykh photos), `docs/IDEAS-FOR-OWNER.md` (open questions and feature ideas for the owner).

## Done on 7 and 8 November (all deployed to medinahub.org)
- **Brand and home:** redesign in the MESH brand, live day arc hero with sky that follows time of day and live weather, Coming up countdowns, subscribable University dates feed (`/api/v1/calendar/dates.ics`), shorter phone hero.
- **Duroos:** book links for 35 duroos, dars and shaykh pages, "Usually live on" plus each shaykh's channels, filter by prayer, Live page fallback, Al-Midad import (7 duroos, 6 teachers, 3 masjids), Sisters section (`lessons.audience`, `/duroos/sisters` in a pink variant), 20 of 31 shuyukh with verified photos (the 11 without are in `docs/research/shaykh-photos.md`).
- **Content:** study programmes (impartial, filter by who they are for), rebuilt 1448 calendar (29 official dates), library on site with embedded reader and search, discounts, Ma'had hub `/mahad`, 10+ guides and 18+ FAQs, authority sweep of all public text (86 live edits), fact corrections from research, Open Graph for every guide, short unique titles and descriptions, MESH 404 page.
- **Arabic:** language switch in the header that remembers the choice (`mesh-lang` cookie and localStorage), Arabic Study, Guides, Library, Discounts, Ask and More pages.
- **Accessibility and speed:** 40 to 44 px tap targets, header fits at 1024 px and on phones, guide and FAQ pages cached and refreshed every 5 minutes. Full test pass at five widths, dark mode and /ar found no other bugs.
- **Admin:** Face ID passkey as the main sign-in second factor, password reset links, book link on the dars form, photo link on the shaykh form, help number made fixed and removed from Settings, admin audit written.
- **Watcher:** correct al-Ruhayli handle and several new channels; busy channels pass a free keyword check before any AI read. Only Telegram is watched (X needs a paid API).

## WhatsApp exports (the owner's chosen workflow)
- The owner exports chats from WhatsApp (Export chat, without media) and puts the zip in Downloads. Run `node scripts/whatsapp-new.cjs "<zip>"` to get only the messages since the last processed export (written to a temp whatsapp-new.txt), process them (FAQs, guides, duroos changes, research notes, following every owner rule), then run it again with `--commit` to mark them read. Cursors live in data/whatsapp-cursors.json (chat names and times only). The MESH group is read up to 7 November 2026, 21:31.
- Never read a whole export again when the tool can give the new part; conserve tokens.

## MESH WhatsApp number (built 8 November; ON HOLD by owner decision)
- The owner wants coexistence on the owner's spare number (no deleting chats) and Claude, not Gemini, as the reader. That needs a Meta partner with coexistence (for example 360dialog, monthly fee; the number then loses group chats and calls) plus an Anthropic API key with billing. The owner chose manual exports instead for now.
- Webhook live at https://medinahub.org/api/v1/whatsapp/webhook (src/server/whatsapp/inbox.ts). Only messages from WHATSAPP_OWNERS are processed; others get no reply. Forwarded text or images go through the watcher reader and decide(): clear schedule changes auto-publish (undo in Activity), everything else goes to the admin inbox; the sender gets a plain WhatsApp reply.
- Business number: the owner's spare number (kept private); owner number +1 234 567 9076 (WHATSAPP_OWNERS=12345679076).
- Vercel env still to add by the owner: WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_APP_SECRET, WHATSAPP_VERIFY_TOKEN, WHATSAPP_OWNERS. Then redeploy, then set the webhook in Meta and subscribe to messages.
- Next: route general information (discounts, guide facts, events) into drafts of the right type instead of the generic inbox; consider an Anthropic key for a higher daily reading limit than the free Gemini tier.

## Waiting on a live database step (not done; needs the owner's OK to run against live)
- DONE (checked live 8 Nov): the admission guide (/guides/applying-to-the-islamic-university) and the five group-chat FAQs (absher-nafath-activation, find-my-timetable, rent-on-student-visa, library-bags-laptops, blackboard-phishing) are on medinahub.org.
- Visa guide lines (tourist eVisa, extensions, family visit visa) are rewritten in `src/server/seed/content/guides-2026.ts` but not live. A full `content:sync` upserts every seeded guide; first check it will not revert live-only edits from the authority sweep, or sync that guide alone with `--only`.
- Moving programmes, library, discounts and key dates into DB tables with admin editing was not started: it needs a migration on live first, and live DB access was blocked by the permission classifier in these sessions.

## Open questions for the owner
All in `docs/IDEAS-FOR-OWNER.md`, including: Quba weekly duroos days (Al-Midad and our seed disagree), online women's duroos, Al-Midad one-off lectures and a recurring Al-Midad source, Al-Fusha, research conflicts (deferral, housing, istiqdam deposit), and ranked feature ideas.

## Next steps (single ranked list)
1. **Live DB sync** for the waiting guides and FAQs above, with the owner's OK.
2. **Done, do not redo:** admin "Needs you" home block and plain-language watcher cards (d2dd19b), admin search on Content, Shuyukh and Activity plus activity grouped by day (92a7dd5), in-page confirm sheet and Undo toast (87a5a97). Still open from ADMIN-AUDIT: check that Gemini readings are accurate, and a gold accent for attention counts if it is not there yet.
3. **Programmes, discounts, key dates and library into DB tables with admin editing**, in that order starting with discounts, only once a migration can be applied to live.
4. **Arabic, remaining:** an Arabic home page (`/ar` still redirects to `/ar/duroos`), library college and reader pages, `/mahad`, `/search`, English bits on `/ar/library`, search results linking to Arabic pages.
5. **Open audit items** in `docs/audit/AUDIT.md`: 13 remaining stale facts, 16 women's areas and gates, 18 programme sort and compare, 19 dars level and language.
6. **More content:** Visitor ID and iqama guide, Ejar through an accredited agent, stipend timing, Nabawi library rules, Rawdah hours, Ma'had life, healthcare.
7. **Small polish:** strip of normal background between the pink sisters area and the footer on tall screens.

## Gotchas
- **Shared folder:** several sessions may share this checkout and one git index. Stage files by explicit path, never `git add -A`; a `git commit` picks up whatever another session staged. Never stash, reset or switch branches.
- `tsconfig.tsbuildinfo` changes whenever `tsc` runs; do not commit it.
- **Dev server:** restart it (and `rm -rf .next/dev`) if pages look stale. Never run `next build` while dev is running.
- **Git Bash:** apostrophes in `node -e '...'` break; write scripts to files. Use `MSYS_NO_PATHCONV=1` or `/path` becomes a Windows path.
- **React:** store a function in state with `setX(() => fn)`.
- **Migrations** must reach live before code that selects new columns.
- Shaykh Mis'ad's slug stays `masad-ibn-musaid-al-husaini` so links don't break; add a redirect if it changes.

## Design session progress (8 November, afternoon)
- **Hero sky (done, live):** `src/features/home/sky.ts` blends sky colours between keyframes anchored to the prayer times (night, Fajr, sunrise, morning, midday, Asr, golden hour, Maghrib, dusk); `HeroSky.tsx` draws stars, the real moon phase, clouds by WMO code, rain, lightning, haze, Uhud, the minarets and Green Dome, and the gold-edged gate of two arches (the MESH M). CSS is under "The hero sky" in `globals.css`. Phones get a small sun or moon in the top corner.
- **Day arc:** hover or tap a prayer to list its duroos (links to dars and shaykh pages); a mouse click jumps to `#after-<prayer>`. The sun or moon shows the time and weather details; the weather chip opens the same. Popovers open upwards and cap their height to the room above (`fitAbove`), checked at 2000, 1440, 1024 and 700 px on /, /duroos and /ar/duroos.
- **Home:** Latest updates now sit above the MESH group card and link to `/duroos/updates#<slug>`; web addresses in update bodies are clickable (`Linkified` in `DetailPages.tsx`).
- **Done 8 November:** the steps for finding the final exam schedule are in the live update. It is in `docs/EXPIRING.md` for 14 December.
- **Evening, done and live:** breadcrumbs (`Breadcrumbs` in `src/components/ui`) and related guides and answers (`src/lib/related.ts`, tested) on every guide and FAQ page in English and Arabic, with a related-answers side panel at 1280 px and wider; `/ask?c=<topic>` opens the FAQ list on that topic; the `.lift` hover and press style on guide, library, programme and shaykh cards.
- **Evening, second pass (live):** masjid names open Google Maps (`src/lib/maps.ts`) on dars cards, lesson pages and the day arc; lesson pages link to "All duroos after <prayer>" and `/duroos/schedule?prayer=<p>&masjid=<id>` opens the schedule filtered; breadcrumbs on dars, shaykh, library and programme pages; page transitions (`PageTransition.tsx` via route `template.tsx`, React ViewTransition) and CSS scroll reveals on `.lift` and `.card` (off for reduced motion and print); `SectionHeader` in `src/components/ui` on the home page and guide stages; questions in two columns and updates as a three-column board on wide screens; fixed "Shaykhah" names being cut to "ah" in the weekly grid.
- **Screenshot tip:** full-page screenshots need `reducedMotion: "reduce"`, or cards below the fold are still hidden by the scroll reveal.
- **Next for design:** books on dars pages to the library where the same book is there; an Arabic home page; the empty space beside short programme pages; the same section header on the library and study pages.
