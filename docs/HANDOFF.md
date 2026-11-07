# MESH handoff (read this first)

Last updated 7 November 2026 by the previous Claude session. This file is the source of truth for continuing the work.

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

## Done in the last session (verify the last commit deployed)
- **Book links:** 35 duroos link to their book on turath.io (reader plus PDF). The column `lessons.book_url` is migrated live.
- **Pages:** new dars and shaykh pages (header band, Read the book card, Where it's broadcast card, ShaykhBadge).
- **Home:** "Coming up" redesigned. The next University date leads, a timeline follows, and Islamic dates are small counters (the owner asked that Ramadan not be huge).
- **Layout:** the container is wider on big screens (88rem, or 100rem at 1700 pixels and up).
- **Help text:** the help line now says "message the owner on WhatsApp".

## To do next (in this order)
1. **Polish:** the "Coming up" lead card has empty space between the countdown and "Then:" at wide sizes. Make it intentional, for example a mini progress line towards the date or a "what to prepare" checklist link. Re-check all pages at 2000, 1440, 1024 and 390 for empty space and alignment.
2. **Admin fields** (in `src/features/admin`):
   - lesson form: `bookUrl`
   - shaykh form: photo upload or URL (already has `photo`)
   - settings: `help_contact` (read by `getHelpContact`)
   - admin pages to edit programmes, library and discounts, which are currently code files in `src/content`; move them to DB tables with admin CRUD and audit
3. **Where each dars is live:** streams exist per masjid. Add per-shaykh channels (YouTube, Mixlr, Telegram) and show "usually live on" for each dars.
4. **Full Arabic version** (least urgent, per the owner): one switch that remembers the choice (cookie plus localStorage) and turns every page and UI string to Arabic, in RTL. Duroos already have /ar. Content needs Arabic fields or translations.
5. **More content:** more guides (Ma'had life, Nafath and Absher, healthcare, family visas detail), more FAQs, and a muqarrarat takhlees upload flow (WhatsApp now).
6. **Research sources the owner gave** (rewrite, never copy):
   - rewireabroad.com/country/saudi-arabia/city/medina, wise.com cost of living Medina, lovingmadinah.com, expatexchange.com, asmu.info
   - x.com/iu_edu_en and x.com/study_in_saudi (X blocks scraping, so use their sites or Telegram instead)
   - hijrahnow.com/madinah, the @MadinahUniversity YouTube channel (Study in Saudi, Madi Abu Yahya), map-arabic.com
7. **Verify:** check that Gemini watcher readings are accurate. See the admin inbox suggestions.

## Gotchas
- **Dev server:** OneDrive breaks the watcher. Restart the dev server (and `rm -rf .next/dev`) if pages look stale. Never run `next build` while dev is running (they share `.next`).
- **Shell quoting:** apostrophes in `node -e '...'` break Git Bash. Write scripts to files instead.
- **Path conversion:** Git Bash rewrites `/path` arguments, so use `MSYS_NO_PATHCONV=1`.
- **React state:** wrap a function in a setState updater: `setX(() => fn)`.
- **Migrations:** they must reach live before code that selects new columns. Run `npm run content:sync` first.
