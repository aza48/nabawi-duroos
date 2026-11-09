# MESH v2 Plan 3a: Channel Watcher & Live Detection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Read the public Telegram channels every few minutes, let AI (Gemini) turn posts into lesson changes, auto-publish only the safe ones from trusted channels (after shadow mode), send everything else to the admin inbox, and show "Live now" when the Nabawi YouTube stream is live.

**Architecture:** Pure, tested units (HTML parser, AI response validator, decision rule, live-page detector) composed by one orchestrator `runWatcher(db, deps, now)` whose network calls are injected, so tests never touch the internet. A secret-protected cron route runs it.

**Tech Stack:** existing stack + node-html-parser; Gemini REST API (`gemini-2.5-flash`, JSON schema output) via `fetch`.

**Spec:** `docs/superpowers/specs/2026-11-07-mesh-revamp-design.md` §5.2, §5.1 (live), Global rules below.

## Global Constraints
- Sources are read only from `https://t.me/s/<handle>`; no Telegram login, ever.
- Channel text is untrusted: the model gets no tools, returns a fixed JSON schema, and output is validated against the database before anything happens.
- Auto-publish needs ALL: source `trusted` and `autoPublish` on; kind in `cancelled|postponed|resumed`; lesson slug exists; one concrete date, today or later and within 30 days; weekday/date consistent; confidence ≥ 0.85. Otherwise: suggestion (or ignore when not about a lesson).
- Shadow mode is the default (`autoPublish` off for every source): suggestions record what would have auto-published.
- "ليلة الأحد" means Sunday night; an explicit date beats a weekday.
- Heartbeat: `watcher_last_checked_at` setting after every successful run.
- Cron route requires `Authorization: Bearer $CRON_SECRET`.
- No em dashes in visible copy.

## Review Focus
1. Edited post (same id, new text) re-parses and its suggestion updates (Task 5 test).
2. Model returns garbage / non-JSON: post marked `error`, run continues (Task 3, 5 tests).
3. Date in the past or weekday mismatch never auto-publishes (Task 4 tests).
4. Same post seen twice is not processed twice (Task 5 test).
5. One channel failing to load doesn't stop the others; heartbeat still records (Task 5 test).

### Task 1: Tables
`sources` (handle pk, name, trusted bool, autoPublish bool default false, lastCheckedAt, lastError) and `channel_posts` (id serial, sourceHandle, postId unique "handle/123", url, text, imageUrl, postedAt, textHash, status `new|ignored|suggested|published|dismissed|error`, parse jsonb, wouldAuto bool, overrideId int null, decidedBy text null, createdAt, updatedAt). Seed the six legacy sources (drosalmadina, khizana_62 trusted aggregators; sohaymi, dr_maherkhujah, Sulalruhaily, twijri trusted official). Test: seed creates 6 sources, all `autoPublish=false`.

### Task 2: Telegram preview parser
`parseChannelHtml(html, handle): ChannelPost[]` with `{ postId, url, text, imageUrl|null, postedAt: Date }`. Test on `tests/fixtures/tg-drosalmadina.html`: 20 posts, ids `drosalmadina/<n>`, every post has a date, at least one has an image URL.

### Task 3: AI reader (Gemini)
`buildPrompt(post, lessons, today)`, `parseAiResponse(json): AiParse | null` (zod), `readPostWithGemini(post, lessons, today, { apiKey, fetch })`. AiParse = `{ about_lesson: boolean, lesson_slug: string|null, kind: OverrideKind|"lecture"|"other", dates: string[] (YYYY-MM-DD), note_en, note_ar, confidence: 0..1 }`. Tests: valid JSON accepted; missing fields / bad dates → null; fetch mocked: request has the key in a header (never the URL) and asks for JSON.

### Task 4: Decision rule
`decide(parse, ctx): { action: "auto"|"suggest"|"ignore"; wouldAuto: boolean; reason: string }`. Tests for each Global auto-publish condition, shadow mode, past date, >30 days, weekday mismatch (lesson days don't include the date's weekday), low confidence, untrusted source, not-about-lesson → ignore.

### Task 5: Orchestrator + cron route + heartbeat
`runWatcher(db, { fetchHtml, readPost }, now)` returns `{ sources, newPosts, suggested, published, errors }`. Auto-publish uses `addOverride` with actor "system" and origin `watcher_auto` (audited, undoable). Approve/dismiss service: `approveSuggestion(db, actor, postId, { lessonSlug?, kind?, startsOn? })`, `dismissSuggestion`. Route `GET /api/cron/watch`. Tests with fakes: dedupe, edits, a failing source, auto vs shadow, heartbeat set.

### Task 6: Live detection
`detectYouTubeLive(html): { live: boolean; url: string|null }`; `refreshStreams(db, fetchHtml)` updates `streams.isLive/liveUrl/checkedAt`; called by the cron run. Tests on two small fixtures (live / not live).

### Task 7: Admin UI
Inbox section "From the channels": suggestion cards (channel, time, original Arabic text, flyer link, AI reading, "would have auto-published" badge) with Approve / Dismiss; warning if the heartbeat is older than 30 min. Sources page (settings.write): trusted / auto-publish toggles. Verify in browser.

### Task 8: Verify, document scheduler, push
All tests, typecheck, build. `docs/OPERATIONS.md`: Cloudflare Worker cron snippet + env vars (`GEMINI_API_KEY`, `CRON_SECRET`). Push.
