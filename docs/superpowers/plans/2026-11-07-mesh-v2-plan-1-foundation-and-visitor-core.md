# MESH v2 — Plan 1: Foundation & Visitor Core — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old app with the new MESH v2 foundation — database, verified data import, time/prayer/schedule engine, versioned API, design system, and the visitor pages (Home, Duroos EN+AR, Ask, Guides, More) — running locally with no external services.

**Architecture:** Next.js 16 App Router with server components; all data reads go through a server layer (`src/server/**`) that both pages and the `/api/v1` JSON routes call, so a future native app uses the same logic. Drizzle ORM over Postgres: Neon in production, embedded PGlite in development and tests (no external DB needed to build or test). Pages are pre-rendered and refreshed on demand.

**Tech Stack:** Next.js 16.4, React 19, TypeScript (strict), Tailwind CSS 4, Drizzle ORM 0.45 + drizzle-kit 0.31, @neondatabase/serverless 1.2, @electric-sql/pglite 0.5, adhan 4.4, zod 4, lucide-react, Vitest 5.

**Spec:** `docs/superpowers/specs/2026-11-07-mesh-revamp-design.md`

**This is plan 1 of 4.** Later plans (written when this one is done):
2 — Admin app & security (Better Auth, passkeys/TOTP, roles, editors, inbox UI, activity log/undo, rate limits, headers, Turnstile).
3 — Channel watcher, live detection & notifications (Telegram preview reader, Claude parsing, hybrid auto-publish + shadow mode, heartbeat, live-now checker, web push, email, daily brief, .ics feeds).
4 — Content sections, migration & cut-over (prod data migration, places/deals, events, calendar, checklist, getting around, numbers, share cards, offline, search-gap log, freshness, monitoring, backups, launch).

## Global Constraints

- Reference timezone **Asia/Riyadh** for "today", countdowns and overrides; never hard-code a weekday.
- Prayer times: Madinah (24.4672, 39.6111), **Umm al-Qura** method. **Countdown is always to the adhan**; lessons show the note "starts right after the iqamah" / "يبدأ بعد الإقامة مباشرة".
- Schedule data is evidence-based: import only what the legacy files state; never invent a weekday, time, book or link. Unknown weekdays display as "Days not stated" / "الأيام غير محددة في المصدر".
- Displayed event dates are absolute (Hijri, bracketed in announcements), never "today/tonight". يعتذر → "excused himself".
- Language: Duroos fully bilingual (`/duroos/*` English LTR, `/ar/duroos/*` Arabic RTL); everything else English only.
- Themes: light **Warm Paper** (default) — bg `#f6f1e7`, ink `#22302a`, primary `#1e4d3b`, accent `#c2522f`, card `#fffdf8`, border `#e6dccb`; dark **Madinah Night** — bg `#0c1714`, ink `#ece6d6`, primary/accent gold `#d9b76c`, card `#13221d`, border `#1f342c`. Follow system setting; manual toggle persists; no flash of wrong theme.
- Fonts: Warm Paper headings Newsreader, body DM Sans; Madinah Night headings Fraunces, body Inter; Arabic Alexandria (UI) and Amiri (titles).
- Status colours: ON green, CANCELLED terracotta/red, POSTPONED/MOVED amber, GUEST gold. WhatsApp green `#25d366` only for WhatsApp actions.
- WhatsApp group invite link (stored as setting `whatsapp_invite_url`): `https://chat.whatsapp.com/KKNn4fLv51eIVq8OMLErL0`. CTA copy: "Have a question? Post it in the MESH WhatsApp chat".
- Mobile-first: bottom tab bar **Home · Duroos · Guides · Ask · More** + floating WhatsApp button on every visitor page; tap targets ≥ 44px; AA contrast both themes.
- No secrets in code; production without `DATABASE_URL` must fail loudly.
- Public URL canonical origin `https://medinahub.org`.

## Review Focus

1. **Riyadh midnight boundary** — at 2026-11-07T21:30Z it is already Sunday 8 Nov in Riyadh; "today" must be Sunday's lessons (Task 2, Task 5 tests).
2. **Lessons whose days are not stated** (`days: []`, e.g. al-Badr's Tafsir as-Sa'di) — must not appear on "today" for every day, and must not vanish from the weekly schedule (Task 5 test).
3. **Overlapping overrides** — a cancellation then a later "resumed" for the same date: the most recently created, non-revoked override wins (Task 5 test).
4. **Validity periods** — Quba lessons valid 1/4–30/6/1448 must disappear after the period ends (Task 5 test).
5. **Arabic page correctness** — `/ar/duroos` renders `dir="rtl"` `lang="ar"`, Arabic labels, and still links back to English (Task 9 test).

---

## File Structure

```
src/
  app/
    layout.tsx                    root html, fonts, theme init script
    globals.css                   Tailwind 4 + design tokens
    manifest.ts                   PWA manifest
    robots.ts, sitemap.ts
    (site)/layout.tsx             visitor shell (EN)
    (site)/page.tsx               Home
    (site)/duroos/page.tsx        → DuroosToday (en)
    (site)/duroos/schedule/page.tsx
    (site)/duroos/shaykh/[slug]/page.tsx
    (site)/duroos/lesson/[slug]/page.tsx
    (site)/duroos/updates/page.tsx
    (site)/duroos/live/page.tsx
    (site)/ask/page.tsx, (site)/ask/[slug]/page.tsx
    (site)/guides/page.tsx, (site)/guides/[slug]/page.tsx
    (site)/more/page.tsx
    ar/layout.tsx                 visitor shell (AR, rtl)
    ar/duroos/**                  same pages, locale "ar"
    api/v1/duroos/today/route.ts
    api/v1/duroos/schedule/route.ts
    api/v1/duroos/lessons/[slug]/route.ts
    api/v1/duroos/shaykhs/[slug]/route.ts
    api/v1/duroos/announcements/route.ts
    api/v1/settings/route.ts
  features/
    duroos/                       page components shared by EN/AR routes
      DuroosToday.tsx, DuroosSchedule.tsx, ShaykhPage.tsx, LessonPage.tsx,
      UpdatesPage.tsx, LivePage.tsx, DarsCard.tsx, StatusTag.tsx, Countdown.tsx
      strings.ts                  AR/EN UI strings
    home/HomePage.tsx
    content/FaqList.tsx, GuideList.tsx, ArticleBody.tsx
  components/
    shell/SiteShell.tsx, BottomNav.tsx, TopBar.tsx, WhatsAppFab.tsx,
    WhatsAppBanner.tsx, ThemeToggle.tsx
    ui/Card.tsx, Pill.tsx, Section.tsx, EmptyState.tsx
  lib/
    time/riyadh.ts                riyadhNow, riyadhDateIso, weekday
    time/hijri.ts                 hijri parts/format (ported)
    time/prayer.ts                prayer times + next-prayer
    locale.ts                     Locale type, dir(), t()
  server/
    db/schema.ts                  Drizzle tables
    db/client.ts                  getDb()
    db/migrate.ts                 apply migrations (PGlite + Neon)
    seed/legacy/                  lessons.ts, profiles.ts, streams.ts, events.ts,
                                  announcements.ts, types.ts (moved, unchanged)
    seed/import-legacy.ts         legacy → DB
    duroos/schedule.ts            pure schedule engine
    duroos/queries.ts             DB reads for duroos
    content/queries.ts            FAQ/guides reads
    settings.ts                   getSetting/setSetting
drizzle/                          generated SQL migrations
tests/                            vitest unit + integration
```

Old `src/**` (except data moved to `src/server/seed/legacy/`), `scripts/poll-telegram.mjs`, `data/`, `vercel.json` cron for old reminders are removed. `public/images/**`, Search Console verification files, `llms.txt` are kept.

---

### Task 1: Scaffold the new app

**Files:**
- Create: `package.json` (replace), `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `vitest.config.ts`, `src/app/layout.tsx`, `src/app/(site)/page.tsx` (placeholder "MESH"), `src/app/globals.css`, `tests/smoke.test.ts`
- Move: `src/data/{lessons,profiles,streams,events,announcements}.ts` and `src/lib/types.ts` → `src/server/seed/legacy/` (imports fixed to `./types`)
- Delete: all other old `src/**`, `next.config.mjs`, `postcss.config.mjs` (old), `tailwind.config.*`, `scripts/`, `data/`, `vercel.json`, `next-env.d.ts`, `package-lock.json`

**Interfaces:** Produces scripts `dev`, `build`, `start`, `test` (`vitest run`), `typecheck` (`tsc --noEmit`), `db:generate` (`drizzle-kit generate`), `seed` (`tsx src/server/seed/run.ts`).

- [ ] Step 1: Write `tests/smoke.test.ts` asserting `import("@/server/seed/legacy/lessons")` exposes `LESSONS` with length 45.
- [ ] Step 2: Install deps at the versions in Tech Stack (+ `tsx`, `@types/node`, `@types/react`, `@tailwindcss/postcss`); path alias `@/*` → `src/*`.
- [ ] Step 3: Run `npm test` → PASS; `npm run typecheck` → 0 errors; `npm run build` → success.
- [ ] Step 4: Commit `chore: scaffold MESH v2 on Next 16, move verified legacy data`.

### Task 2: Time utilities (Riyadh, Hijri, prayer)

**Files:** Create `src/lib/time/riyadh.ts`, `src/lib/time/hijri.ts`, `src/lib/time/prayer.ts`; Test `tests/time.test.ts`

**Interfaces — Produces:**
- `riyadhDateIso(now?: Date): string` ("YYYY-MM-DD" in Asia/Riyadh)
- `weekdayOf(iso: string): Weekday` (0=Sun…6=Sat)
- `addDays(iso: string, n: number): string`
- `hijriOf(iso: string): { day: number; month: number; year: number }`
- `formatHijri(iso: string, locale: Locale, opts?: { bracket?: boolean; weekday?: boolean }): string` — en `"Saturday 27/5/1448 AH"`, ar `"السبت ٢٧/٥/١٤٤٨هـ"`, bracket wraps in `[ ]`
- `formatGregorian(iso: string, locale: Locale): string` ("7 November 2026")
- `HIJRI_MONTHS_EN: string[]` (Muharram … Dhu al-Hijjah)
- `hijriIsoBounds(year: number, month: number, day: number): string` (Hijri → Gregorian ISO, via search over Intl umalqura; used for validity periods)
- `type Prayer = "fajr"|"dhuhr"|"asr"|"maghrib"|"isha"`
- `prayerTimes(iso: string): Record<Prayer, Date>` (adhan, Madinah coords, `CalculationMethod.UmmAlQura()`)
- `nextPrayer(now: Date): { prayer: Prayer; at: Date }`

- [ ] Step 1: Tests: `riyadhDateIso(new Date("2026-11-07T21:30:00Z")) === "2026-11-08"`; `riyadhDateIso(new Date("2026-11-07T20:59:00Z")) === "2026-11-07"`; `weekdayOf("2026-11-07") === 6`; `formatHijri("2026-11-07","en",{weekday:true})` equals the value Intl umalqura gives (assert `/^Saturday \d{1,2}\/5\/1448 AH$/`); `hijriIsoBounds(1448,6,30)` round-trips through `hijriOf` to `{day:30|29…}` month 6 year 1448 (assert month/year, and next day is month 7); prayer order fajr<dhuhr<asr<maghrib<isha on 2026-11-07 and Riyadh-local Fajr hour in 4–6, Maghrib hour in 17–18; `nextPrayer(new Date("2026-11-07T09:00:00Z")).prayer === "asr"` (12:00 Riyadh → after Dhuhr).
- [ ] Step 2: Run `npx vitest run tests/time.test.ts` → FAIL.
- [ ] Step 3: Implement (port `src/lib/dates.ts` logic; Arabic digits helper `toArabicDigits`).
- [ ] Step 4: Run → PASS. Commit `feat: Riyadh/Hijri/prayer time utilities`.

### Task 3: Database schema, client, migrations

**Files:** Create `src/server/db/schema.ts`, `src/server/db/client.ts`, `src/server/db/migrate.ts`, `drizzle.config.ts`, `drizzle/*`; Test `tests/db.test.ts`

**Tables (Plan 1 scope; Drizzle `pgTable`, snake_case columns):**
- `masjids` — `id text pk`, `name_en`, `name_ar`, `short_en`, `short_ar`, `map_url text null`, `sort int`
- `shaykhs` — `id serial pk`, `slug text unique`, `name_en`, `name_ar`, `photo text null`, `role_en/role_ar null`, `facts jsonb` (`{en,ar}[]`), `created_at`
- `lessons` — `id serial`, `slug unique`, `shaykh_id → shaykhs`, `masjid_id → masjids`, `book_en`, `book_ar`, `book_author_en/ar null`, `topic text`, `prayer text` (enum Prayer), `days int[]` (0–6), `days_label_en/ar null`, `frequency_en/ar null`, `time_label_en/ar null`, `prayer_note_en/ar null`, `location_en/ar`, `note_en/ar null`, `sequence_en/ar null`, `status text` (`active|paused|finished`), `valid_from date null`, `valid_to date null`, `sort int`
- `lesson_overrides` — `id serial`, `lesson_id → lessons`, `kind text` (`cancelled|postponed|moved|resumed|guest|new_book|book_finished|note`), `starts_on date`, `ends_on date`, `note_en/ar null`, `source_url null`, `origin text` (`admin|watcher_auto|watcher_approved|legacy`), `created_at timestamptz default now()`, `revoked_at null`
- `announcements` — `id serial`, `slug unique`, `shaykh_id null`, `guest_name_en/ar null`, `lesson_id null`, `masjid_id null`, `type text`, `title_en/ar`, `body_en/ar`, `event_date date null`, `image_url null`, `source_handle null`, `source_url null`, `posted_at timestamptz`, `status text` (`draft|published|archived`), `published_at null`
- `events` — `id serial`, `slug unique`, `masjid_id`, `kind`, `title_en/ar`, `shaykh_en/ar null`, `hijri_label_en/ar`, `prayer_label_en/ar null`, `starts_on date`, `ends_on date`, `source_url`
- `streams` — `id serial`, `slug unique`, `label_en/ar`, `kind text` (`youtube|mixlr|telegram|web`), `url`, `check_url null`, `shaykh_id null`, `masjid_id null`, `is_live bool default false`, `live_url null`, `checked_at null`
- `faqs` — `id serial`, `slug unique`, `question`, `answer_html`, `category`, `tags text[]`, `status` (`draft|published`), `last_verified_at null`, `created_at`, `updated_at`
- `guides` — `id serial`, `slug unique`, `title`, `summary`, `body_html`, `stage` (`getting-started|getting-settled|family|leaving`), `cover_url null`, `reading_minutes int`, `status`, `last_verified_at null`, `created_at`, `updated_at`
- `settings` — `key text pk`, `value jsonb`

**Interfaces — Produces:** `type OverrideKind`, `type LessonStatus`, `type AnnouncementStatus` (string unions exported from `schema.ts`); `type Db` (drizzle instance); `getDb(): Promise<Db>` — Neon (`drizzle-orm/neon-http`) when `DATABASE_URL` set; PGlite file DB at `.data/pglite` in development; in-memory PGlite when `NODE_ENV=test`; throws `Error("DATABASE_URL is required in production")` when `NODE_ENV=production` and unset. `migrate(db): Promise<void>`. `resetTestDb(): Promise<Db>` (fresh in-memory, migrated).

- [ ] Step 1: Tests: `resetTestDb()` then insert a masjid + shaykh + lesson and read it back with `days` array intact; `getDb()` with `NODE_ENV=production` and no URL rejects with the message above.
- [ ] Step 2: Run → FAIL. Step 3: Implement; `npm run db:generate` creates the initial migration. Step 4: Run → PASS. Commit `feat: drizzle schema, db client, migrations`.

### Task 4: Import verified legacy data

**Files:** Create `src/server/seed/import-legacy.ts`, `src/server/seed/run.ts`, `src/server/settings.ts`; Test `tests/import.test.ts`

**Interfaces — Produces:** `importLegacy(db: Db): Promise<{ masjids: number; shaykhs: number; lessons: number; announcements: number; events: number; streams: number }>` (idempotent: upsert by slug/id). `getSetting<T>(db, key): Promise<T|null>`, `setSetting(db, key, value)`.

Rules: masjids from legacy `MASJIDS` (7). Shaykhs deduplicated by Arabic name; slug from English name (lowercase, strip honorifics "Prof. Dr.", "Shaykh", "Dr.", dashes). Profiles joined by Arabic name. Lesson slug = legacy `id`. Legacy `status` `cancelled|paused|guest` → lesson `active` + no override unless the legacy note states dates (keep `note_*`). Quba lessons get `valid_from/valid_to` from `QUBA_PERIOD` (1/4/1448–30/6/1448 via `hijriIsoBounds`). Announcements → `status: "archived"` if `expired` else `"published"`, `origin` n/a. Streams from `NABAWI_YOUTUBE` (kind youtube, `check_url` = live URL), `DAR_HIJRAH_STREAM` (telegram) and the Telegram channel list in `streams.ts`. Setting `whatsapp_invite_url` seeded with the Global Constraints value.

- [ ] Step 1: Tests on `resetTestDb()`: counts `{ masjids: 7, lessons: 45 }`, shaykhs ≥ 20 and every lesson has a shaykh; running twice yields the same counts; `ruh-dalil` has `days [4,5,6]`, prayer `asr`, masjid `nabawi`; one Quba lesson has `valid_to` equal to `hijriIsoBounds(1448,6,30)`; setting `whatsapp_invite_url` equals the constant; shaykh "al-Ruhayli" has a photo path.
- [ ] Step 2: FAIL → Step 3 implement (`run.ts` = getDb + migrate + importLegacy, logs counts) → Step 4 PASS. Commit `feat: import verified legacy schedule data`.

### Task 5: Schedule engine (pure)

**Files:** Create `src/server/duroos/schedule.ts`; Test `tests/schedule.test.ts`

**Interfaces — Produces:**
```ts
type LessonLike = { id: number; slug: string; days: number[]; prayer: Prayer; status: "active"|"paused"|"finished"; validFrom: string|null; validTo: string|null };
type OverrideLike = { lessonId: number; kind: OverrideKind; startsOn: string; endsOn: string; createdAt: Date; revokedAt: Date|null; noteEn: string|null; noteAr: string|null };
type DayStatus = "on" | "cancelled" | "postponed" | "moved" | "guest" | "resumed";
type ScheduledLesson<L> = { lesson: L; status: DayStatus; override: OverrideLike | null };
lessonsForDate<L extends LessonLike>(iso: string, lessons: L[], overrides: OverrideLike[]): ScheduledLesson<L>[]  // sorted by prayer order then sort
weekSchedule<L extends LessonLike>(lessons: L[]): { byDay: Record<Weekday, L[]>; daysNotStated: L[] }
lessonPhase(now: Date, iso: string, prayer: Prayer): "done" | "live" | "upcoming"  // live = from adhan to adhan+90min
```
Rules: include a lesson on `iso` iff status `active`, `weekdayOf(iso)` ∈ `days`, and `iso` within `[validFrom, validTo]` (nulls open). Applicable override = non-revoked with `startsOn ≤ iso ≤ endsOn`; if several, latest `createdAt` wins; kinds `new_book|book_finished|note` don't change status (`on`). `days: []` lessons never appear in `lessonsForDate`, always in `daysNotStated`.

- [ ] Step 1: Tests — Saturday 2026-11-07 includes `ruh-dalil` with status `on`; a `days: []` lesson absent from every day of a week and present in `daysNotStated`; cancelled override created 10:00 then resumed override created 11:00 same date → `resumed`; revoked cancellation → `on`; a lesson with `validTo "2026-12-20"` absent on `"2026-12-21"`; ordering fajr before asr before maghrib; `lessonPhase` returns `live` 30 min after the adhan and `done` 2 h after.
- [ ] Step 2 FAIL → Step 3 implement → Step 4 PASS. Commit `feat: schedule engine with overrides and validity periods`.

### Task 6: Server queries + `/api/v1`

**Files:** Create `src/server/duroos/queries.ts`, `src/server/content/queries.ts`, `src/app/api/v1/**/route.ts` (listed in File Structure); Test `tests/queries.test.ts`

**Interfaces — Produces (all `async`, take `db: Db` first):**
- `getToday(db, now?: Date): Promise<{ date: string; hijri: {en,ar}; gregorian: {en,ar}; prayers: Record<Prayer,string /*ISO*/>; lessons: TodayLesson[]; lastCheckedAt: string|null }>` where `TodayLesson = { slug, shaykh:{slug,nameEn,nameAr,photo}, bookEn, bookAr, masjid:{id,nameEn,nameAr}, prayer, adhanAt: string, phase, status: DayStatus, locationEn, locationAr, overrideNoteEn|null, overrideNoteAr|null, stream: {url, isLive, liveUrl}|null }`
- `getWeek(db): Promise<{ byDay: Record<Weekday, ScheduleRow[]>; daysNotStated: ScheduleRow[] }>`
- `getLesson(db, slug)`, `getShaykh(db, slug)` (with lessons), `listShaykhs(db)`, `listAnnouncements(db, { limit, includeArchived })`, `listStreams(db)`
- `listFaqs(db, { category? })`, `getFaq(db, slug)`, `listGuides(db, { stage? })`, `getGuide(db, slug)` — published only
- API routes return `{ data, generatedAt }` JSON, `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`; 404 `{ error: "not_found" }`.

- [ ] Step 1: Tests on imported test DB: `getToday(db, new Date("2026-11-07T09:30:00Z")).lessons` contains `ruh-dalil` with `phase "upcoming"` and `adhanAt` equal to `prayerTimes("2026-11-07").asr`; `getShaykh(db, <ruhayli slug>).lessons.length === 3`; `getLesson(db,"nope") === null`; `listFaqs` returns `[]` on empty DB.
- [ ] Step 2 FAIL → Step 3 implement → Step 4 PASS; `curl localhost:3000/api/v1/duroos/today` returns JSON with `data.lessons`. Commit `feat: duroos/content queries and v1 JSON API`.

### Task 7: Design system & shell

**Files:** Create `src/app/globals.css`, `src/app/layout.tsx` (replace), `src/components/shell/*`, `src/components/ui/*`, `src/lib/locale.ts`, `src/features/duroos/strings.ts`; Test `tests/locale.test.ts`

**Interfaces — Produces:** `type Locale = "en"|"ar"`; `dir(l): "ltr"|"rtl"`; `t(l, key)` over `strings.ts`; `<SiteShell locale whatsappUrl>{children}</SiteShell>` rendering `TopBar`, `BottomNav` (Home `/`, Duroos `/duroos` or `/ar/duroos`, Guides `/guides`, Ask `/ask`, More `/more`; active by pathname), `WhatsAppFab`, `ThemeToggle`. Theme: `data-theme="light|dark"` on `<html>`, set before paint by inline script reading `localStorage["mesh-theme"]` else `prefers-color-scheme`. CSS variables `--bg --ink --muted --primary --accent --card --border --on --cancel --amber --gold` per theme; heading font variable switches by theme.

- [ ] Step 1: Tests: `dir("ar")==="rtl"`, `t("ar","today")==="اليوم"`, `t("en","today")==="Today"`, every key in `strings.en` exists in `strings.ar`.
- [ ] Step 2 FAIL → Step 3 implement → Step 4 PASS; build succeeds. Commit `feat: Warm Paper / Madinah Night design system and app shell`.

### Task 8: Home page

**Files:** Create `src/features/home/HomePage.tsx`, `src/app/(site)/page.tsx`, `src/features/duroos/DarsCard.tsx`, `StatusTag.tsx`, `Countdown.tsx` (client; ticks every 30 s)

Order (spec §4): date line (weekday · Hijri · Gregorian) → greeting "As-salamu alaykum" → WhatsApp banner ("Join the MESH group" / "Announcements, events & daily help" / Join) → **Today's duroos** (next 3 upcoming/live + "Full schedule →", LIVE badge, status tags, "starts right after the iqamah" note, freshness line "Updated … from @…" when `lastCheckedAt` exists) → prayer-times strip → Start here (guides, empty state if none) → Latest updates (3 announcements) → Ask CTA.

- [ ] Step 1: Implement; page is a server component calling `getToday`/`listGuides`/`listAnnouncements`; `export const revalidate = 60`.
- [ ] Step 2: Verify in browser at 390×844 and desktop, both themes: no horizontal scroll, all sections render, countdown updates. Commit `feat: home page`.

### Task 9: Duroos pages (EN + AR)

**Files:** Create `src/features/duroos/{DuroosToday,DuroosSchedule,ShaykhPage,LessonPage,UpdatesPage,LivePage}.tsx`; thin route files under `src/app/(site)/duroos/**` and `src/app/ar/duroos/**` passing `locale`; `src/app/ar/layout.tsx` sets `lang="ar" dir="rtl"`; Test `tests/duroos-routes.test.ts`

Each page has `generateMetadata` (title, description, canonical, `alternates.languages` en/ar). Schedule: tabs by masjid, day chips (today pre-selected), lessons grouped by prayer, "Days not stated" group. Shaykh page: photo, role, facts, lessons, link to stream. Lesson page: book, author, place, days, prayer + adhan time today, status, override history (latest 10). Updates: published announcements, archived under "Earlier". Live: YouTube live embed for Nabawi + link-outs.

- [ ] Step 1: Test renders `ArLayout` metadata/props → `dir="rtl"`, `lang="ar"`; route modules for `/ar/duroos/*` exist for each EN page (fs check over the 6 routes).
- [ ] Step 2 FAIL → implement → PASS; browser-verify `/duroos`, `/ar/duroos`, a shaykh, a lesson at 390px both themes. Commit `feat: bilingual duroos section`.

### Task 10: Ask, Guides, More

**Files:** Create `src/features/content/*`, `src/app/(site)/{ask,guides,more}/**`

Ask: categories (Getting started · Getting settled · Family life · Leaving · University · Duroos), list of published FAQs with "last verified", empty state, always ends with the WhatsApp CTA. Guides: grouped by stage, cards with reading time. Detail pages render sanitized `body_html`/`answer_html` (sanitize on render with an allow-list) + "Something outdated? Tell us in the WhatsApp group" + CTA. More: links to sections that exist (Duroos live, updates, About MESH, Group rules — copy the group's rules verbatim from the spec intent: relevance, verified info only, no debates, no spam, respect), theme toggle, Arabic Duroos link.

- [ ] Step 1: Implement; Step 2 browser-verify empty states and a seeded test FAQ/guide in dev. Commit `feat: ask, guides and more sections`.

### Task 11: Redirects, SEO, PWA manifest

**Files:** Modify `next.config.ts` (redirects); Create `src/app/{robots,sitemap,manifest}.ts`; Test `tests/redirects.test.ts`

Redirects (301): `/mesh` → `/`; `/mesh/:path*` → `/:path*`; `/browse` → `/ask`; `/category/:slug` → `/ask`; `/question/:id` → `/ask`; `/resources` → `/guides`; `/resources/:id` → `/guides`; `/resources/write` → `/admin`; `/signup`, `/login`, `/forgot`, `/notifications`, `/profile/:id` → `/`; `/guidelines` → `/more`; `/about` → `/more`; `/manage` → `/more` (until Plan 3 rebuilds alerts). Sitemap: home, sections, every shaykh/lesson (en + ar), published FAQs/guides. Manifest: name "MESH — Medina English Student Hub", short_name "MESH", theme `#1e4d3b`, background `#f6f1e7`, display standalone, icons from `public/`.

- [ ] Step 1: Test asserts the redirects array contains each source above with `permanent: true`.
- [ ] Step 2 FAIL → implement → PASS. Commit `feat: legacy redirects, sitemap, manifest`.

### Task 12: Verify & push

- [ ] Step 1: `npm test` all PASS; `npm run typecheck` 0 errors; `npm run build` success.
- [ ] Step 2: Seed dev DB (`npm run seed`), run dev server, browser-check every page at 390×844 light + dark and desktop; fix anything broken.
- [ ] Step 3: Push `revamp` branch (never `main`).
