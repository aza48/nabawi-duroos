# MESH duroos and time audit (correctness and data integrity)

Scope: schema, duroos queries/schedule, ICS, time libs, prayer times, home sky/arc, duroos UI and routes (en/ar), /api/v1 duroos and calendar, watcher, admin duroos and undo, legacy and Al-Midad seed, migrations, related tests. Read-only. Evidence comes from reading the code and from three throwaway scripts in this scratchpad: `seedcheck.ts` (seed consistency), `e2e.ts` (seeded in-memory PGlite with getToday, overrides, ICS, decide and prefilter) and `tz.cjs`/`ram.ts` (adhan). The duroos tests pass: 8 files, 84 tests.

## What is good

The time handling is sound. "Today" is always `riyadhDateIso` (Intl with Asia/Riyadh), plain dates go through noon-UTC helpers, and the adhan output does not depend on the server time zone. I checked the same instants under UTC, Los Angeles, Kiritimati and Riyadh. Computed Madinah times are plausible: 8 Nov 2026 gives Fajr 5:12, Dhuhr 12:05, Maghrib 5:38. The Hijri conversion uses ICU Umm al-Qura. Client clocks (Countdown, NextPrayer, DayArc, HeroSky, ScheduleBrowser) start as `null` and fill in after mount, so there is no hydration mismatch from `Date.now`. ICS output uses CRLF, folds by octet (max 74), escapes text, uses UTC `Z` times and gives each occurrence a stable UID (522 of 522 unique over 56 days). It marks cancelled and postponed occurrences `STATUS:CANCELLED`. Cancellations propagate to pages, API and ICS on the next fetch. The seed has no unknown masjid, prayer, weekday or audience values, no duplicate slugs and no lesson pointing at a missing shaykh. The watcher's hybrid rule (shadow mode by default, one date, a 30-day horizon, the date must fall on the lesson's weekday, confidence of at least 0.85) is a careful design.

---

## Critical

None verified.

## High

### H1. A later "note", "new book" or "moved" override cancels out an earlier cancellation, so a cancelled dars shows as ON
- **Location:** `src/server/duroos/schedule.ts:61-66` (`applicable[0]`, newest override of any kind wins; `STATUS_KINDS` has no entry for note, new_book or book_finished, so the status becomes "on").
- **Evidence (e2e.ts):** cancel `ruh-dalil` for 12 to 14 Nov, then add a `note` for 12 Nov and a `moved` for 13 Nov. `getToday` for Thu 12 Nov returns `"on"`. The ICS shows 12 and 13 Nov as `STATUS:CONFIRMED` and only 14 Nov as CANCELLED. Any admin or approved watcher note ("new book started", "guest", "moved") inside a cancelled range reopens the dars on the site, the API, the ICS and the daily push brief.
- **Fix:** split overrides into status kinds and informational kinds. Take the status from the newest *status* override only (cancelled, postponed, moved, guest, resumed) and show the newest note alongside it. Make `resumed` the only kind that explicitly clears a cancellation. Add tests for a range plus a note, a range plus a move, and a range plus a resume.
- **Size:** S

### H2. Isha is 30 minutes early for all of Ramadan
- **Location:** `src/lib/time/prayer.ts:18` (`CalculationMethod.UmmAlQura()` with no Ramadan adjustment).
- **Evidence:** the method dump shows `ishaInterval: 90`. Ramadan 1448 runs from 2027-02-08 to 2027-03-08 (`hijriIsoBounds`), and for 2027-02-17 the code gives Maghrib 6:17 and Isha 7:47. The Umm al-Qura calendar uses Maghrib plus 120 minutes in Ramadan, and adhan-js leaves that adjustment to the caller. Every "after Isha" time is wrong for a month: cards, lesson pages, the ICS start times, NextPrayer, the DayArc, the sky and the live window.
- **Fix:** in `prayerTimes`, when `hijriOf(iso).month === 9`, set `params.ishaInterval = 120` and key the cache by date. Add a test for a Ramadan date.
- **Size:** S

### H3. Auto-publish trusts the AI's Hijri-to-Gregorian conversion and its choice of shaykh, with no deterministic check
- **Location:** `src/server/watcher/decide.ts:19-37`, `src/server/watcher/ai.ts:48-49`, `src/server/watcher/run.ts:137-145`.
- **What is wrong (verified by reading):** `decide()` never sees the post text. The design spec says "A post whose weekday and date contradict each other goes to the inbox", and `docs/superpowers/specs/2026-11-07-mesh-revamp-design.md:192` claims "a dedicated test suite" for it. Neither the check nor the tests exist: the only night-rule test asserts that the prompt contains "Sunday night" (`tests/watcher-units.test.ts:82`). The only guard against a wrong date is "falls on one of the lesson's weekdays". That does not catch an off-by-one Hijri conversion for multi-day lessons such as `ruh-dalil` (Thu, Fri, Sat), `abadr-tawhid` (Sun to Thu) or `qasim-sequence` (Sun to Thu). In e2e.ts, `decide` returns `auto` for `ruh-dalil` on 2026-11-13. Shaykh matching is also left to the model, and the seed has several shuyukh with the same family name: three al-Ruhayli, three al-Suhaymi, and two each of al-Tuwaijri, al-Badr, Khujah, al-Saidi, al-Qahtani and al-Husaini (seedcheck). Image-only flyers can also auto-publish. An auto-publish also sends a push to every "all" subscriber (`admin/duroos.ts:69-75`). This is latent while every source is in shadow mode (`sources.ts:245`), and becomes live as soon as an admin turns on auto-publish.
- **Fix:** in `decide`, also pass the post text:
  - pull out explicit Hijri dates (Arabic or Latin digits, d/m/yyyy), convert them with `hijriIsoBounds`, and require the AI's date to be one of them;
  - pull out weekday names and require them to match `weekdayOf(date)`, or the day after it for "ليلة" if the owner's rule ever changes;
  - require at least one distinctive token of the matched shaykh's name (first name plus family name) in the text.
  
  Otherwise send the post to the admin inbox, and never auto-publish an image-only post. Add the promised night-wording and contradiction tests.
- **Size:** M

### H4. Re-running the seed (`npm run seed`, `go-live`) silently reverts admin edits in production
- **Location:** `src/server/seed/import-legacy.ts:117-126` (`onConflictDoUpdate` with `status: "active"`, days, location and validity), the announcements block (lines 131-154: archived rows reset to published, status taken from `expired`), shaykhs (lines 69-82), streams (lines 214-216). The docstring at `src/server/seed/run.ts:3` says "Safe to re-run: every row is upserted"; `go-live.ts:45` calls `importLegacy` too.
- **What is wrong:** after admins pause a lesson, move it or change its days, any re-seed overwrites those changes, with no audit row and no revalidation. `syncAlMidad` already does this correctly (`onConflictDoNothing`), so the two importers behave inconsistently.
- **Fix:** switch the legacy upserts to `onConflictDoNothing` for lessons, shaykhs, announcements and streams. Alternatively, update only rows that no audit entry has touched. Make `run.ts` refuse to run against a non-local URL without `--force`, and correct the docstring.
- **Size:** S

## Medium

### M1. Lessons whose time is not actually known are shown with a precise adhan time; timeLabel, prayerNote, sequence and note are never rendered
- **Location:** `src/server/seed/legacy/lessons.ts:525-528` and `581-584` (comments say "timeLabel carries the honest text"); `src/features/duroos/DetailPages.tsx:143`; `src/server/calendar.ts:84-93`.
- **Evidence:** `grep timeLabel|prayerNote|sequenceEn|noteEn` over `src/features` and `src/app` finds no public use. `balawi-saidi-tahrir` and `hijrah-tariq-fath` ("no prayer time is stated") are shown as "After Maghrib, Adhan 5:38 pm, starts right after the iqamah". They also get a fixed ICS event and are marked "live" at 18:00 (e2e output). Rotating-book lessons (`qasim-sequence`, `badrbadr-sequence`, `uni-maher-sequence`) show one book for every day. `shuwayir-rawd`'s "continuing after Isha" is lost.
- **Fix:** add a `timeKnown` flag (or derive it from timeLabel). When the time is unknown, show "Evening, time not confirmed" with no countdown, no live badge and no ICS event (or an all-day event). Render the public form of prayerNote, sequence and note on the lesson page. Rewrite the research-worded timeLabels so they pass `publicLabel`.
- **Size:** M

### M2. Paused, finished and expired lessons appear as normal lessons on lesson and shaykh pages
- **Location:** `src/server/duroos/queries.ts:133-147` (`getLesson`) and `153-158` (`getShaykh`) use the unfiltered `scheduleRows`; `DetailPages.tsx:62-74` and `105-211` never read `status` or `validTo`.
- **What is wrong:** a finished dars still shows "Days: Wednesday, After Asr, Adhan…" and offers a calendar subscription (the ICS then returns 404, see L6). After 2026-12-09, when the Quba period ends (seedcheck), all Quba legacy lessons still list on shaykh pages as current.
- **Fix:** on the shaykh page, show active and in-period lessons, with others under "Earlier duroos". On the lesson page, show a "Paused", "Finished" or "Ended on …" banner and hide the time, countdown and calendar button.
- **Size:** S

### M3. The public API returns raw database rows, including the internal research wording the site deliberately hides
- **Location:** `src/app/api/v1/duroos/lessons/[slug]/route.ts:9`, `shaykhs/[slug]/route.ts:9` and `schedule/route.ts:8` pass `getLesson`/`getShaykh`/`getWeek` straight through. The site filters this text with `publicLabel` (`src/features/duroos/strings.ts:125-128`).
- **Evidence:** `LessonRow` includes `timeLabelEn` ("…no prayer time is stated in the channel posts"), `daysLabelEn` ("Lesson weekdays not stated by any source"), `noteEn` ("…inferred from channel posts"), `sort`, `shaykhId`, `topic`. `history` includes revoked overrides with `origin` ("watcher_auto") and `sourceUrl` (Telegram post links).
- **Fix:** add explicit DTO mappers (`toPublicLesson`, `toPublicOverride`) shared by the pages and the API. Apply `publicLabel`, drop internal fields, and exclude revoked overrides or flag them. Document the shapes (zod schemas, or an OpenAPI file under `/api/v1`).
- **Size:** M

### M4. The API is not ready for a native app: no list endpoints, no date parameter, inconsistent envelope, phase cached up to 6 minutes
- **Location:** `src/app/api/v1/duroos/*`, `src/server/api.ts:3-11`.
- **What is wrong:** there is no `/lessons`, `/shaykhs`, `/masjids` or `/streams` list. `/today` cannot take `?date=` (tomorrow, or a chosen day). Errors use `{error}` while successes use `{data, generatedAt}`, and the calendar returns a plain-text 404. `phase` and `live` are computed per request but cached with `s-maxage=60, stale-while-revalidate=300`. There are no ETags and no schema version field. Hijri dates are only formatted strings (`hijri.en`), with no day, month and year numbers.
- **Fix:** add list endpoints and `?date=`. Return `adhanAt` with an explicit `timeKnown`, plus `hijri: {day, month, year}`. Use one envelope (`{data, error, generatedAt, version}`) and let the client compute phase from `adhanAt`. Document the shapes.
- **Size:** M

### M5. Watcher heartbeat says "Last checked N min ago" even when every channel fetch failed
- **Location:** `src/server/watcher/run.ts:154` (always set), shown publicly at `src/features/home/HomePage.tsx:39-41`.
- **What is wrong:** source errors only go to `sources.lastError` (line 78). If Telegram blocks fra1, the home page still claims a fresh check.
- **Fix:** set `watcher_last_checked_at` only when at least one source was fetched successfully. Store `watcher_last_error` and raise it in admin attention.
- **Size:** S

### M6. No de-duplication of the same post across channels
- **Location:** `src/server/watcher/run.ts:83-86` (dedup only by `postId`, which is `handle/id`).
- **What is wrong:** a notice forwarded by `drosalmadina` and `Duroos_alhramain` (both core channels) is read twice by the AI, using up the small quota. With auto-publish on, it creates two identical overrides and sends two pushes. The history shows duplicate rows.
- **Fix:** before calling the AI, look up a recent `channel_posts` row with the same `textHash` (last 3 days) and copy its decision. In `addOverride`, skip creating a row when an unrevoked override with the same lesson, kind and date range exists.
- **Size:** S

### M7. Quota exhaustion and errors are retried forever with no back-off; one post can take up to 60 s and runs can exceed `maxDuration`
- **Location:** `src/server/watcher/run.ts:86`, `115-129`; `src/server/watcher/ai.ts:101-110`; `src/app/api/cron/watch/route.ts:9,19-23`.
- **What is wrong:**
  - Posts in "error" status are re-read on every run until they are 3 days old.
  - When every model returns 429, each post still makes 5 requests, so up to 40 failing calls per run every few minutes.
  - The time budget (35 s) is checked only before each AI call, not before channel fetches. With 13 sources at up to 10 s each, plus up to 5 models at 12 s for one post, plus `refreshStreams` with no fetch timeout, a run can exceed the 60 s limit. The run is then killed and the heartbeat is never written.
  - Posts in "error" status never reach the admin inbox: `listSuggestions` reads only "suggested", although `approveSuggestion` accepts "error".
- **Fix:**
  - On a 429 from every model, set a `gemini_paused_until` setting (until the next Pacific midnight, when the free quota resets) and skip the AI until then.
  - Add an attempt counter on `channel_posts`; after 3 attempts, move the post to "suggested" with the error as the reason.
  - Check the budget before each source fetch, and add `AbortSignal.timeout` to the `refreshStreams` fetch.
- **Size:** M

### M8. Undo restores the whole old row (lost update) and refreshes no public page
- **Location:** `src/server/admin/audit.ts:77-79` (`set(revive(entry.before))`), and `src/app/(admin)/admin/actions.ts:45`, which only refreshes `/admin`.
- **What is wrong:** if admin A changes a lesson's days and admin B later changes its location, undoing A's edit also reverts B's. After undoing a cancellation, the public pages stay cancelled until ISR expires (60 to 300 s), the ICS for up to 15 min plus SWR, and subscribers are never told it is back on.
- **Fix:** undo only the fields that changed in that entry (the diff between before and after), and refuse if `current` differs from `entry.after` on those fields. Call `refreshPublic` with the same path set as the original mutation. When undoing an override, send a "back on" push.
- **Size:** S

### M9. Announcements and the schedule can contradict each other
- **Location:** `src/server/db/schema.ts:104` (`announcements.lessonId` is never written; grep finds no writer); `src/server/admin/duroos.ts:203-235`.
- **What is wrong:** an admin can publish a "cancellation" announcement, and it appears in Updates and on the home page, while the dars card, API and ICS still say ON, because only `lesson_overrides` drive status. The legacy seed shows this pattern: `abadr-tawhid-cancelled-18-5-1448` is an announcement with no override.
- **Fix:** in the announcement form, for the cancellation, postponement and resumption types, require a lesson and date and create the matching override in the same transaction (or link to an existing one). Alternatively, warn when no override exists.
- **Size:** M

### M10. Gaps in the keyword prefilter for busy channels
- **Location:** `src/server/watcher/prefilter.ts:7-8`; `src/server/watcher/live-notice.ts:20`.
- **Evidence (e2e.ts):** these are not let through: تعليق (suspended), عودة الدرس (lesson returns), تغيير مكان (place changed), يُستكمل (continues), منقول (moved; only ينقل is listed), عن بعد (remote), انقطاع / سفر (break, travel), عطلة (holiday), غياب (absence), and "البث المباشر الآن" (live now). `isLiveNotice` only knows "بدأ البث المباشر".
- **Fix:** add تعليق|معلق|عوده|يعود|يستكمل|استكمال|منقول|مكان الدرس|عن بعد|انقطاع|سفر|عطله|غياب|يغيب|بث مباشر|مباشر الان to the prefilter. Broaden `isLiveNotice` to `/(بدا|يبث|بث) .*مباشر|مباشر الان/`. Add tests for each word.
- **Size:** S

## Low

### L1. Lesson history labels guest, note, new-book and book-finished entries as "ON", and the Arabic page drops English-only notes
- **Location:** `src/features/duroos/DetailPages.tsx:153` and `156`.
- **Evidence:** e2e history kinds were `moved, note, cancelled`; `note` renders as `t("on")`, which is "ON" / "قائم". A guest override is also shown as "ON". At line 156, when `noteAr` is null the Arabic page shows nothing, while `DarsCard` falls back to the English note. The two languages disagree.
- **Fix:** add labels for guest, new_book, book_finished and note. Use the same fallback as `DarsCard.tsx:42`. Show the end date for ranges.
- **Size:** S

### L2. Monthly lessons are listed under "Announced each week"
- **Location:** `src/features/duroos/ScheduleBrowser.tsx:124`, `strings.ts:27`.
- **Evidence:** `daysNotStated` holds `quba-shamani-ayat` (first Sunday of each month), `quba-maher-sirah`, `quba-ghamidi-aqidah2` and `hijrah-qahtani-tawhid` (monthly). They never appear on Today, in the arc or in the ICS, even on their day.
- **Fix:** label the section "Monthly or announced"; show each row's `daysText`; optionally model "nth weekday of month" so these get real occurrences.
- **Size:** S (label) / M (model)

### L3. Revalidation misses some pages that show lessons
- **Location:** `src/server/admin/refresh.ts:15`, `admin/duroos.ts:67,85,131,157`.
- **What is wrong:** none of the mutations refresh `/duroos/sisters`, `/ar/duroos/sisters` or the shaykh pages (except `updateShaykh`). `revokeOverride` does not refresh the lesson page. `createLesson` does not refresh the shaykh page. ISR bounds the staleness to 300 s (sisters and shaykh pages) or 60 s, and the ICS has its own 15-min cache.
- **Fix:** have a helper `lessonPaths(slug, shaykhSlug)` return the lesson, shaykh and sisters pages in both languages and use it in every mutation, undo included.
- **Size:** S

### L4. "LIVE NOW" and the 90-minute window start at the adhan, not at the dars
- **Location:** `src/server/duroos/schedule.ts:32,83-89`, `src/features/duroos/Countdown.tsx:100`.
- **What is wrong:** during the 10 to 25 minutes before the iqamah, and during the prayer itself, cards say live or "now". A 90-minute window also runs past Isha for long after-Maghrib duroos. The phase is baked into ISR HTML (`DarsCard.tsx:38-40`) while Countdown ticks on the client, so the badge and the countdown can disagree for up to a revalidation period.
- **Fix:** add a per-prayer iqamah offset (Fajr 25, Dhuhr 20, Asr 20, Maghrib 10, Isha 20; the Ramadan Isha offset differs) and a window that ends at the next adhan. Compute the badge on the client from `adhanAt`.
- **Size:** S

### L5. NextPrayer and DayArc go stale if the tab stays open past midnight
- **Location:** `src/features/home/NextPrayer.tsx:22-25`, `DayArc.tsx:156`.
- **What is wrong:** `prayers` is fixed at render time. After the next day's Fajr, every time is in the past, so `target = tomorrowFajr` (already past) and the countdown shows "0:00:00 Fajr (tomorrow)", with the arc pinned at the end.
- **Fix:** recompute the times on the client with `prayerTimes(riyadhDateIso(now))`, which is pure and time-zone safe, or reload when the Riyadh date changes.
- **Size:** S

### L6. ICS edge cases
- **Location:** `src/server/calendar.ts:42-47,83-98`; `src/app/api/v1/calendar/[feed]/route.ts:24-25`.
- **What is wrong:**
  - A "moved" occurrence stays CONFIRMED at the old time and place; the note is only in the description.
  - Without `SEQUENCE` or `LAST-MODIFIED`, some clients (Outlook) keep a cached CONFIRMED copy when the event flips to CANCELLED.
  - An unknown `shaykh-<slug>` or `masjid-<id>` returns 200 with title "MESH: all duroos" and no events (verified).
  - A paused lesson's feed returns 404, which makes some clients drop the subscription.
  - The description says "after the maghrib iqamah" (lowercase key, English only).
- **Fix:**
  - Add `SEQUENCE` (for example, a count of overrides touching that date) and `LAST-MODIFIED` (newest override `createdAt`).
  - Add a `[Moved]` prefix to the summary for moved occurrences.
  - Return 404 for unknown shaykh or masjid slugs, and an empty valid calendar for paused lessons.
  - Use `t("en", prayer)` in the description.
- **Size:** S

### L7. Small slips in the Arabic summary
- **Location:** `src/features/home/TodayHero.tsx:57-61`.
- **What is wrong:** with no lessons the Arabic reads "٠ دروس اليوم في ٠ مساجد", while the English says "No duroos scheduled today". Counts of 1 and 2 are not given singular or dual forms.
- **Fix:** mirror the English zero case, and use the singular form for one and the dual for two.
- **Size:** S

### L8. Watcher robustness details
- **Location:** `src/server/watcher/ai.ts:8`, `run.ts:82-151`.
- **What is wrong:** `isoDate` is regex-only, so "2026-02-30" passes and would make the date insert fail in the auto path. There is no try/catch per post or per source around the database work, so one failure aborts the whole run and skips the heartbeat. `approveSuggestion` uses only the first of several dates (`run.ts:175`), so a multi-day cancellation becomes one day unless the admin sets an end date.
- **Fix:** validate real dates with `z.iso.date()`; wrap each post in try/catch and mark it "error"; prefill `endsOn` from the last parsed date.
- **Size:** S

### L9. Seed oddities (from seedcheck.ts)
- `quba-ghamidi-aqidah` (weekly, Sunday) and `quba-ghamidi-aqidah2` (monthly) have the same shaykh and book ("Lessons in Aqeedah"). Confirm both are real.
- The 4 Al-Midad women's duroos at Quba have no validFrom or validTo. Legacy Quba lessons end on 2026-12-09, so after that date Quba shows only the sisters' duroos. Unverified whether that is intended.
- 4 legacy announcements carry a bracketed Hijri date in the text but no `eventDate` (`ruh-asr-cancelled-9-5-1448`, `abadr-tawhid-postponed`, `suhaymi-cancelled`, `maher-fadl-started`), so they use the 14-day rule instead of their date. 8 announcements dated in the past are imported as published rather than archived. Harmless now that the dates have passed, but a re-seed republishes anything an admin archived (H4).
- The `events` table (15 rows) is seeded but never read by the site. It is dead data.
- Em dashes in the source data are normalized to commas by `cleanRow` at import, so titles and locations in the database contain no dashes. The source files still contain about 40 of them.
- Three Al-Midad shaykh slugs differ from `shaykhSlug()` output (the `shaykhah-` prefix is dropped). This is consistent internally and only matters if someone later re-derives slugs.
- **Size:** S

### L10. Night rule ("ليلة الأحد" means Sunday evening)
- **Location:** `src/server/watcher/ai.ts:48`.
- **Note:** this is the owner's documented choice, and the seed supports it: `suhaymi-cancelled`, "ليلة [الأحد ٧/٥]", is a Sunday lesson. Classical usage is the opposite (the eve before the named day), and some channels follow it. That ambiguity is why H3's deterministic date check matters. Not a bug in itself.

### L11. Prayer-time precision against the official Umm al-Qura tables (unverified)
- **Location:** `src/lib/time/prayer.ts:7,18`.
- **Note:** this uses the Masjid an-Nabawi coordinates with Shafi'i Asr and nearest-minute rounding, which is the right method. I could not compare against the published Umm al-Qura Madinah table offline. Any differences are usually ±1 to 2 minutes from rounding or ihtiyat. A one-off comparison against a month of the official table would settle it.

---

## Test gaps
- No test for overlapping overrides of different kinds. The existing tests cover two status overrides, or a single note (`tests/schedule.test.ts:39-55`). This is how H1 went unnoticed.
- No Ramadan prayer-time test (H2); the time tests check only order and plausible hours (`tests/time.test.ts:46`).
- No tests for the night-wording or date-contradiction rules the spec promises; the only one checks the prompt text (H3).
- `tests/calendar.test.ts:24,40` checks `line.length` (UTF-16 units) instead of octets, so it would miss a folding bug in Arabic text. There is no test for moved occurrences, SEQUENCE, unknown slugs or a 404 on a paused lesson.
- No test that re-running `importLegacy` keeps admin edits (H4).
- No tests for the heartbeat on total failure, cross-channel dedup, quota exhaustion across all models, the error retry cap or the run budget before fetches (M5 to M7). `watcher-run.test.ts:85` covers only a single transient failure.
- No undo tests for lesson updates with concurrent edits, or for revalidation after undo (M8).
- No API shape or contract tests at all (M3, M4).
- No UI tests for history labels, the paused-lesson banner or the Arabic and English summaries (L1, M2, L7).
- `tests/duroos-routes.test.ts` checks only that the Arabic root is right-to-left.
