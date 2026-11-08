# MESH handoff (read this first)

Last updated 7 November 2026 (second session) by Claude. This file is the source of truth for continuing the work.

## Audit-items session (8 November 2026, about 07:10 to 08:00 Riyadh, stopped at 86% weekly usage)
- Deployed and checked live on medinahub.org: 27 Library in the phone nav (Study moved to More), 28 phone hero 621 to about 310 px (compact next adhan card, day arc from sm up), 26 collapsible "On this page" on phones, 16 Live page sisters note and unavailable-stream fallback, 19 schedule filter by prayer, 25 guide and FAQ pages cached (edge HIT), 18 Study page filter by who it is for, 13 Ahlul Athar fee and location.
- 14 visa lines are rewritten in src/server/seed/content/guides-2026.ts (tourist eVisa, extensions, family visit visa) but NOT on the live DB yet. `npm run content:sync` upserts every seeded guide and FAQ, and reading the live DB to confirm it would not revert the overnight live-only edits was blocked by the permission classifier. Next session: confirm, then run it.
- Al-Fusha question added to docs/IDEAS-FOR-OWNER.md. No arabic.ahlulathar.net link exists in the code.
- Still open: 6 admission guide, 17 Ma'had hub, rest of 13 (Mutun al-Ijaz price conflict, IU page, library, childbirth costs need fresh sources), 16 women's areas and gates (need verified facts; the Al-Midad session is building /duroos/sisters), 18 sort, compare and price units, 19 level and language (needs lesson fields).
- Note: my pushes to `mine revamp:main` also carried the Al-Midad session's commit dcb2ae3 to production (tests passed with it).

## Morning session, 8 November 2026 (Al-Midad import and Sisters section, stopped at about 08:15 Riyadh, weekly usage 86%)
- **Al-Midad import: DONE and live.** 7 new duroos (2 for everyone, 5 women's), 6 new teachers, 3 new masjids, and al-Badr's Tafsir as-Sa'di now has its days (Sunday to Friday after Fajr) and exact spot. Diff and every open question: `docs/research/al-midad-import.md`. Code: `src/server/seed/content/al-midad.ts` (`syncAlMidad`, run by `npm run content:sync` and the seed; it only inserts and fills gaps, never overwrites admin edits).
- **Sisters section: DONE and deployed.** `lessons.audience` (all, men, women; migration 0006, already applied to live). `/duroos/sisters` and `/ar/duroos/sisters` in a petal-pink MESH variant (`[data-variant="sisters"]` in globals.css, light and dark), a pink "Sisters" tab in the duroos nav, and a pink Sisters tag on women's duroos in today's cards, the weekly schedule, shaykh pages and the lesson page (which also turns pink). In the sitemap.
- **Not done here:** step 3 audit items (27, 28, 26, 13, 14) were being worked by the parallel audit session, so they were left to it.
- **Questions for the owner:**
  1. Quba weekly duroos: Al-Midad and our seed disagree on days and prayers for Maher and Mu'adh Khujah, al-Ghamidi, Abu Battin and al-Shamani (Al-Midad looks shifted by about a day). Which is right? Nothing was changed.
  2. List online women's duroos (Iman al-Marzuq on Zoom, Kuwait time; her event's title and description also name different books)?
  3. Add one-off lectures from Al-Midad to the events list?
  4. Make Al-Midad a recurring source (a daily read that proposes changes in the admin inbox, like the Telegram watcher)? Not built.
- Shared-folder gotcha: two sessions share one git index here. Stage by explicit path; a `git commit` picks up whatever the other session staged.

## Overnight progress (8 November 2026, stopped at 83% of the 5-hour window)
- Done and deployed: authority sweep of all public text (code files and 86 live database edits, facts checked; the course-descriptions guide was set to draft because it was leftover scraped widget text); library pages in the sitemap; search synonyms from the multilingual research.
- Shaykh photos: DONE. 20 of 31 shuyukh are pictured (19 from the October verification in public/images, plus Anis ibn Ahmad Tahir in public/shaykhs). The 11 without a photo are listed in docs/research/shaykh-photos.md for the owner.
- Also done: research fact corrections (bus 3.45 SAR, Haramain from 162 SAR plus VAT, Haram Institute registration in Safar, studyinsaudi.sa), Open Graph and a share image for every guide, al-Ruhayli Telegram handle in his profile.
- Owner questions (sweep and research conflicts) are now in docs/IDEAS-FOR-OWNER.md. Add feature ideas there at the end of stage 4.
- Small-tasks pass also shipped: a MESH 404 page inside the site, short unique lesson titles (lessonTitle), 44px header buttons. AUDIT.md statuses are current (13 done).
- NEXT (in order): remaining AUDIT items (6 admission guide, 13 stale facts, 14 visa lines and Al-Fusha and Ahlul Athar link, 16 sisters at the Haram duroos, 17 Ma'had hub, 18 programmes comparison, 19 duroos filters, 25 caching, 26 phone table of contents, 27 Library in the main nav, 28 shorter phone hero), research content (Visitor ID and iqama paths, Study in Saudi changes, group chat facts, Rawdah hours), then stage 2 admin panel, stage 3 audit, stage 4 ideas.
- Remote Control is blocked by the organization's policy (claude.ai Team admin setting), not by this PC.
- Then continue the plan below from stage 1 (open audit items and research content), then stages 2 to 4.

## Overnight plan the owner approved (7 November 2026, run in this order, autonomously)
The owner is asleep and wants to wake up to finished work. Work in small, tested, deployed steps (tsc, vitest, push to `mine revamp:main` and `origin revamp`, check medinahub.org). Call `get_usage` between steps; if the 5-hour window passes about 85%, stop at a safe point, commit, update this file, and schedule a one-shot CronCreate a few minutes after the reset time to continue.
1. **Pick up where the last session stopped.** Read this file, `docs/audit/AUDIT.md` and `docs/research/*`. Then: shaykh photos for all 31 shuyukh (the workflow plan in "Shaykh photos" below); the authority wording sweep of guides, FAQs, programmes, events and announcements (no sources, no doubt, no casual tone); library sitemap entries; the open audit items (admission guide with the agents warning, search synonyms and ranking, Open Graph, stale facts and research corrections, sisters at the Haram duroos, Ma'had hub, tap targets, 404 pages, titles); content from the research (Visitor ID and iqama paths side by side, Study in Saudi changes, group chat facts, Rawdah hours). Use Workflows for the big fan-outs (ultracode is on).
2. **Build the very best admin panel.** Everything an admin needs without touching code: edit duroos, shaykhs (photo upload, channels), masjids and streams; programmes, library collections, discounts and key dates moved from code files into DB tables with full CRUD; guides and FAQs with a rich editor and "mark verified"; the watcher inbox (approve or dismiss suggestions, see why, per-channel settings and health); settings (help contact, WhatsApp link); admin-only research notes on every item; audit log with undo; roles; a dashboard with what needs attention (stale facts, failed sources, pending suggestions, broken links). Mobile friendly, fast, in the MESH brand. Read `src/features/admin` and `src/app/(admin)` first.
3. **Audit and test everything** (Workflow): every public page at 2000, 1440, 1024 and 390, the admin panel, search, feeds, the watcher, SEO, accessibility, dark mode, Arabic pages. Fix what fails.
4. **If all green, push the limits.** Brainstorm across information, looks and features (look at the best student, city and university guide sites for ideas, and at MESH's goal: keep English-speaking students and families in Madinah on MESH for everything). Implement only what the owner would obviously say yes to. Write everything else as a short, ranked list in `docs/IDEAS-FOR-OWNER.md` for the owner to choose from in the morning.

## What MESH is
medinahub.org: a hub run by students, for English-speaking students and families in Madinah. It covers live duroos schedules of the mashayikh (auto-updated from Telegram), study programmes, guides to university and everyday life, a library of IU course texts, student discounts and verified FAQs. It heavily promotes the MESH WhatsApp group: https://chat.whatsapp.com/KKNn4fLv51eIVq8OMLErL0

## Owner's rules (always follow)
- **Copy:** no em dashes or en dashes anywhere, and no AI-sounding copy. Plain, warm, specific English. There is a test that scans for dashes.
- **Rewriting:** never copy PDFs or sites word for word. Rewrite in MESH's own words, and make it interactive and beautiful.
- **Theme:** light is the default. Dark ("Madinah Night") appears only via the theme button.
- **Layout:** mobile first, but desktop must use the space intentionally, with no big empty areas. Check every change at 2000, 1440, 1024 and 390 pixels wide.
- **Brand:** match the MESH logo: deep green #145c3e, gold bar #e2b23a, heavy white wordmark, "MEDINA ENGLISH STUDENT HUB" with gold initials, and the diamond lattice pattern.
- **Help number:** +1 234 567 9076 is real (it belongs to the owner). Say "please message the owner on WhatsApp at …". Never mention his name.
- **Shaykh photos:** many mashayikh dislike being photographed. The default is a calligraphic Arabic name badge (`ShaykhBadge`). Add a photo only where admins upload one or the shaykh's own official channel publishes it.
- **Freshness:** every fact that can change (fees, dates) shows when it was last checked.
- **Notifications:** free only.
- **Native app:** planned later, so keep the site API-first (`/api/v1`).
- **Safety:** never push to `main` without tests passing. Previews never touch the live database.

## Accounts and where things live (the owner controls all of them)
- **Code:** GitHub `iumuhaymin/medinahub` (private). Branch `main` deploys to production on Vercel automatically. `revamp` is the working branch, also pushed to the friend's repo `aza48/nabawi-duroos` as a mirror. Push with `git push mine revamp:main` and `git push origin revamp`.
- **Hosting:** Vercel project `medinahub` (team "MESH", Hobby). Functions run in fra1 (Frankfurt). Domain medinahub.org via Namecheap DNS.
- **Database:** Supabase project `cbkxuwccuidwyvggghri` (Frankfurt, Postgres 17). The connection string is in the git-ignored `.env.production.local`, and the Vercel env holds DATABASE_URL.
- **Scheduler:** Supabase `pg_cron` calls `/api/cron/watch` every 3 minutes (the Telegram watcher) and `/api/cron/daily` at 01:30 UTC (the morning push brief), with a Bearer CRON_SECRET.
- **Backups:** the GitHub Action `.github/workflows/backup.yml` runs nightly and keeps 90 days of artifacts. The repo secret is BACKUP_DATABASE_URL.
- **AI:** the Gemini free key in env GEMINI_API_KEY. The free tier allows about 20 requests a day per model, so the code falls through five models.
- **Secrets:** they live only in `.env.local`, `.env.production.local`, `.env.launch` (all git-ignored) and Vercel env. Never commit them.

## Stack
- **Framework:** Next.js 16 (App Router, proxy.ts), React 19, TypeScript 5.9, Tailwind 4.
- **Data:** Drizzle ORM. The `pg` Pool talks to Supabase's transaction pooler. Don't use postgres-js: its pipelining hangs there. PGlite runs in-memory for dev, tests and previews.
- **Auth and admin:** Better Auth with required TOTP 2FA, passkeys, roles (owner, editor, duroos_editor, content_editor) and an audit log with undo.
- **Search:** MiniSearch with our own Arabic and transliteration normaliser and synonyms (`src/lib/search`).
- **Tests:** Vitest. 220 or more tests, all passing at handoff.

## Commands
- `npm run dev`: dev server on port 3100. Use `WATCHPACK_POLLING=true` because OneDrive breaks file watching.
- `npx vitest run`: all tests.
- `npx tsc --noEmit`: type check.
- `npm run content:sync`: applies DB migrations to live, then upserts the MESH guides, FAQs and book links. Run it **before** deploying code that needs a new column.
- `npx drizzle-kit generate --name <x>`: creates a new migration after a schema change.
- Screenshots: headless Edge via playwright-core (see the scratch scripts pattern). The in-app browser pane often times out.

## Map of the code
- `src/content/`: programs.ts (MAP first), library.ts, manuscripts.json (308), discounts.ts, key-dates.ts (IU 1448 calendar and Islamic dates).
- `src/server/seed/content/`: guides-2026.ts (10 guides, 18 FAQs), sync.ts, book-links.ts (dars to turath.io book ids).
- `src/features/`:
  - home: TodayHero, DayArc, NextPrayer, KeyDates, DuroosByPrayer
  - programs, library, discounts, search (SearchUI palette with Ctrl+K)
  - content (guides reader with tick-box steps, FAQ explorer)
  - duroos (DetailPages, ShaykhBadge, ScheduleBrowser weekly grid)
- `src/lib/guide-html.ts`: makes guides interactive. Numbered lists become steps, a paragraph holding only a YouTube link becomes a player, and "Tip:" blockquotes become callouts.
- SEO: `src/app/sitemap.ts`, `robots.ts` (AI bots allowed), `llms.txt` and `llms-full.txt` routes, `components/JsonLd.tsx` (Organization, WebSite, Article/HowTo, FAQPage, Course), and opengraph-image.

## New owner rules (7 November 2026, second session)
- **Impartial, never accountable.** MESH never recommends or features one markaz, institute or business over another. List everything we know of, alphabetically; a place that publishes more simply gets more detail. Say plainly that MESH is student-run, not connected to any institute, and that people should confirm with the source.
- **No filler features.** Every element must help someone do something (the owner rejected a "Get ready" checklist as useless). No empty areas on desktop.
- **Plain words over jargon.** "Course books" not "muqarrarat", "summary" not "takhlees" (keep the Arabic beside it where students search for it), "Library" not "Jamiah library". Be critical of every label.
- **Iqama and Visitor ID.** Most current students have an iqama; the newest intake arrives on a digital Visitor ID with no iqama. Banking, SIM, licence and visa guides must cover both paths side by side.
- **Library stays on site.** Course books open inside MESH (embedded reader), not on Google Drive. Tell students some books are out of date and classes may set different books, and invite them to send their class timetable and the assigned book.
- **Speak with authority, never reveal sources.** No public text may mention a source, channel, post, poster or any doubt ("not stated", "inferred", "reportedly", "the post itself"). No casual tone. Research notes belong in the admin area or go to the owner as a question. Lesson notes and sequences from the old research are admin-only (not rendered publicly); day labels in research language are filtered by BACKSTAGE in DetailPages.tsx. Still to sweep: guides, FAQs, programmes, events and announcements text for the same wording.
- **Watch usage.** Check `get_usage` regularly; ship in small deployed steps and update this file before the 5-hour window runs out.

## Done in the second session (7 November 2026, all deployed to medinahub.org)
- Home "Coming up": full-width live countdown tiles and an "Add University dates to my calendar" button (webcal feed `/api/v1/calendar/dates.ics`, all-day events).
- Day arc bug fixed (the gold line stopped after Asr because a dash on a stretched SVG is measured in screen pixels; it now draws the exact partial curve, `travelledPath`).
- Hero sky follows the time of day (stars at night, dawn peach, afternoon gold, dusk rose) and Madinah's live weather (Open-Meteo through `/api/v1/weather`, CDN-cached 10 minutes), with the temperature beside the date.
- Calendar guide rebuilt as `UniversityCalendar` (all 29 official 1448 dates, request windows with `minor: true` stay off the home card, filters, countdowns, two-column months, phone and Google subscribe).
- Fixes: /ask overflow on phones, no floating WhatsApp button (header button at every size, dark text on WhatsApp green for contrast), guide progress bar no longer sticky, /ar redirects to /ar/duroos, "Masjid Quba, Masjid Quba" (`placeText`), honest updates empty state, content sync keeps "Last verified" unless content changes.
- Watcher: the al-Ruhayli handle was wrong (`Sulalruhaily`, never read); now `Sualruhaily`. Added Miraathalanbeyaa, rehyli, almanashet, Dawah_Madina, Abo3omr_ALArjon, dr_elbukhary, Duroos_alhramain. Busy ("broad") channels pass a free keyword check (`prefilter.ts`) before any Gemini read; core channels go first. X accounts cannot be read for free (X returns 402), so only Telegram is watched.
- Programmes: impartial listing, no "first recommendation", `nextIntake` field for any programme.
- Audit and research: `docs/audit/AUDIT.md` is the ranked audit list (with status); persona reports in `docs/audit/personas/`, technical crawl in `docs/audit/technical.md`; research in `docs/research/` (IU official, living in Madinah, study programmes, multilingual community, group chat 2026, and study-in-saudi-telegram.md when its agent finished).

## Library (done in the second session, live)
- /library hub, /library/[slug] per college and the Ma'had (levels, subjects with English hints), /library/read/[id] reader with the Drive preview embedded (CSP frame-src allows drive.google.com), /library/search (server-side, Arabic and English). Data: src/content/library-books.json (1,682 files) and library-books.ts. To refresh, copy drive-crawl.cjs and build-library.cjs from the old scratchpad into scripts/.
- Still to do: add library pages to the sitemap; a client-side filter on long college pages if students ask.

## Open questions for the owner
## Shaykh photos (owner decision, 7 November 2026: "all shuyukh with their photos")
- This replaces the old "badge by default" rule. Every shaykh (31 in src/server/seed/legacy/lessons.ts) should get a photo, but only a verified one: a wrong face is worse than none.
- Plan (scheduled to run in this session at 01:07 on 8 November, after the usage reset; run it yourself if that session is gone): a workflow with one researcher per shaykh (sources: his official Telegram channel or website, IU or Presidency pages, official news, Wikimedia), then two independent verifiers that must match the face against a second independent source, then square webp files in public/shaykhs/<slug>.webp, shaykhs.photo set in the seed and on the live DB, sources recorded in docs/research/shaykh-photos.md. ShaykhBadge stays as the fallback. Tell the owner which shaykhs still lack a verified photo so they can supply one.
- Shaykh Mis'ad's page slug is still masad-ibn-musaid-al-husaini (name fixed, slug kept so links don't break). Add a redirect if the slug changes.

## Research to act on
- docs/research/study-in-saudi-telegram.md (745 posts of t.me/notjustmadinah). Key changes for the site: IU did not open in the Sep to Oct 2026 Study in Saudi window (next expected around April 2027); offers must be accepted within 5 days; IU now needs a second Minhati application, a Teams interview and an Arabic placement test; new students get an electronic study visa (no iqama, no exit and re-entry); deferral is effectively gone under that visa; housing is no longer promised to new intakes; residential IU is men only (women: online degree, or other universities); the Ma'had replaced the Madinah Books with new textbooks in October 2025; online IU courses closed 7 November 2026. Open conflicts it flags: deferral (IU page says 2 years), housing, and the istiqdam deposit (10,000 vs 30,000 SAR).

## To do next (in this order)
1. Library sitemap entries; owner decision on shaykh photos.
2. Work down `docs/audit/AUDIT.md`: undergraduate admission guide with the agents warning, search synonyms and ranking (see the terms in `docs/research/community-multilingual.md`), Open Graph for guides, stale facts and the research corrections (bus 3.45 SAR, Haramain from 162 SAR plus VAT, Haram Institute registration in Safar, old visa lines, Al-Fusha, Ahlul Athar link), sisters at the Haram duroos, a Ma'had hub, tap targets, 404 pages, titles.
3. Content from `docs/research/group-chat-2026.md`: Visitor ID guide (both iqama and Visitor ID paths), Ejar for students through an accredited agent, Absher and Nafath activation fix (call 920020405 for a support ticket), finals timetable location, stipend timing (around the 25th to 27th), Nabawi library rules, Blackboard phishing warning, duroos sequence changes (Ruhayli, Badr, Qasim, Suhaymi, Hujayli), new shaykh pages (az-Zahim, al-Ghamidi), price benchmarks. Rawdah hours from Nusuk (Grok pack, check them).
4. **Admin fields** (in `src/features/admin`):
   - lesson form: `bookUrl`
   - shaykh form: photo upload or URL (already has `photo`)
   - settings: `help_contact` (read by `getHelpContact`)
   - admin pages to edit programmes, library and discounts, which are currently code files in `src/content`; move them to DB tables with admin CRUD and audit
5. **Where each dars is live:** streams exist per masjid. Add per-shaykh channels (YouTube, Mixlr, Telegram) and show "usually live on" for each dars.
6. **Full Arabic version** (least urgent, per the owner): one switch that remembers the choice (cookie plus localStorage) and turns every page and UI string to Arabic, in RTL. Duroos already have /ar. Content needs Arabic fields or translations.
7. **More content:** more guides (Ma'had life, Nafath and Absher, healthcare, family visas detail), more FAQs, and a muqarrarat takhlees upload flow (WhatsApp now).
8. **Research sources the owner gave** (rewrite, never copy):
   - rewireabroad.com/country/saudi-arabia/city/medina, wise.com cost of living Medina, lovingmadinah.com, expatexchange.com, asmu.info
   - x.com/iu_edu_en and x.com/study_in_saudi (X blocks scraping, so use their sites or Telegram instead)
   - hijrahnow.com/madinah, the @MadinahUniversity YouTube channel (Study in Saudi, Madi Abu Yahya), map-arabic.com
9. **Verify:** check that Gemini watcher readings are accurate. See the admin inbox suggestions.

## Gotchas
- **Dev server:** OneDrive breaks the watcher. Restart the dev server (and `rm -rf .next/dev`) if pages look stale. Never run `next build` while dev is running (they share `.next`).
- **Shell quoting:** apostrophes in `node -e '...'` break Git Bash. Write scripts to files instead.
- **Path conversion:** Git Bash rewrites `/path` arguments, so use `MSYS_NO_PATHCONV=1`.
- **React state:** wrap a function in a setState updater: `setX(() => fn)`.
- **Migrations:** they must reach live before code that selects new columns. Run `npm run content:sync` first.
