# MESH handoff (read this first)

Last updated 7 November 2026 (second session) by Claude. This file is the source of truth for continuing the work.

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

## In progress when this session stopped
- **Library rebuild.** `src/content/library-books.json` holds 1,682 files crawled from the public Drive folders (8 collections; the Higher Diploma, school and other-universities folders are empty). `src/content/library-books.ts` has the types, `COLLECTIONS`, `levelLabel`, `subjectHint`, `fileIndex`, `searchFiles` and `driveLinks`. Still to build:
  1. `/library` hub: college cards with file counts, the Ma'had, a GET search form to `/library/search?q=` (server-side `searchFiles`, no client bundle), then the existing official links, channels and manuscripts. Rename "Muqarrarat" to "Course books". Fix OFFICIAL links: the University's own X is @iu_edu (not @iu_edu_en or @iu_ed), and Study in Saudi is studyinsaudi.sa.
  2. `/library/[slug]`: levels (`levelLabel`) as sections, subjects as cards with the Arabic name plus `subjectHint`, files listed with type and date, a filter box.
  3. `/library/read/[id]`: an embedded Drive preview iframe (`driveLinks(id).preview`), title and breadcrumb, Download and Open buttons, the other files in that subject, previous and next.
  4. On college pages and the reader: the curriculum note (some books are out of date, classes may set different books, send us your class timetable and the assigned book via `whatsappLink(help, ...)`) and "have a summary that helped you? send it".
  5. Update `src/server/search/docs.ts` (it imports MUQARRARAT and MAHAD) to index collections and subjects, and add library pages to the sitemap.
  The crawler is `drive-crawl.cjs` and the builder `build-library.cjs` in the old scratchpad; copy them into `scripts/` if you need to refresh the data. Hosting the PDFs ourselves was not done: embedding keeps people on MESH without re-hosting University books (copyright) or paying for gigabytes of storage.

## To do next (in this order)
1. Finish the library (above).
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
