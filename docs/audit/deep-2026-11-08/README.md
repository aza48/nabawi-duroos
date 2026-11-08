# Deep audit of MESH, 8 November 2026

Seven reviews run in parallel on commit 4c156d6 (typecheck clean, 279 tests passing, every live page 200 in under 1.2 s, strong security headers). Each review's full report is in this folder with file and line evidence and a fix for every item. This file is the ranked plan built from them. Status marks: **todo**, **doing**, **done <commit>**.

Reports: `security.md` (0 critical, 1 high, 8 medium, 10 low), `duroos.md` (0 critical, 4 high, 10 medium, 11 low, test gaps), `frontend.md` (1 critical, 7 high, 16 medium, 12 low). Still to land when their reviewers finish: `content.md`, `crawl.md` (live crawl of 662 pages with screenshots), `admin.md` (phone click-through of the admin), `personas.md` (seven role-played users on the live site).

## Tier 1: wrong information or broken behaviour a student can hit today
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 1 | A note, new-book or moved override inside a cancelled date range flips the dars back to ON (schedule.ts:61-66); the calendar feed then says CONFIRMED | duroos H1 | S | todo |
| 2 | Isha is 30 minutes early for all of Ramadan (prayer.ts:18 never applies the Umm al-Qura Ramadan rule); every "after Isha" time, countdown and feed would be wrong from 8 Feb 2027 | duroos H2 | S | todo |
| 3 | Home page "Coming up" renders client-only behind a 256 px placeholder: 0.54 layout shift on phones, missing from HTML, re-renders every second (KeyDates.tsx:31) | frontend C1 | S | todo |
| 4 | Lessons whose time is unknown show a precise adhan time, a calendar event and a live badge; timeLabel, prayerNote, sequence and note are never rendered | duroos M1 | M | todo |
| 5 | Paused, finished and expired lessons appear as running on lesson and shaykh pages | duroos M2 | S | todo |
| 6 | Day, date and live status are frozen into ISR HTML and can show yesterday after an idle night | frontend M1 | M | todo |
| 7 | Arabic 404s are English with lang="en"; Arabic dynamic routes fall to the English not-found page | frontend H3 | S | todo |
| 8 | Search on /ar sends readers to English pages and /ar/search is a 404 | frontend H6 | M | todo |

## Tier 2: security and trust
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 9 | A passkey-only admin can sign in with a password alone: the second factor is never asked for (auth/check.ts:12; tests/auth.test.ts:79 asserts the insecure behaviour) | security H1 | M | todo |
| 10 | "Live broadcast started" posts skip the trust and shadow-mode checks and the link check is unanchored, so a watched channel can point a public Live button anywhere (run.ts:95-105, live-notice.ts:59) | security M1 | S | todo |
| 11 | Auto-published notes are the AI's own text (600 chars) and go into push alerts: prompt injection risk; build the public note on the server from kind and date | security M2 | S | todo |
| 12 | The WhatsApp path hard-codes auto-publish on and ignores the admin's switch (inbox.ts:78,100) | security M3 | S | todo |
| 13 | Public API returns whole rows: sourceHandle, sourceUrl, origin and internal research wording leak (announcements and lessons routes) | security M4, duroos M3 | S | todo |
| 14 | Auto-publish trusts Gemini's date conversion and shaykh choice with no deterministic check; several shuyukh share family names (decide.ts) | duroos H3 | M | todo |
| 15 | Re-running the seed or go-live silently reverts admin edits in production (seed/run.ts upserts) | duroos H4 | S | todo |
| 16 | Push subscriptions: junk keys never cleaned up, unbounded fan-out, no rate limit (push.ts:18,53-63) | security M5 | M | todo |
| 17 | Track endpoint: no rate limit, DDL on cold start, purge inside visitor requests (track/route.ts, analytics/store.ts) | security M6 | M | todo |
| 18 | pg Pool has no error handler (a dropped idle connection can crash the instance) and TLS verification is off (db/client.ts:29-41) | security M7 | S | todo |
| 19 | Undo can run twice, restores the whole old row (lost update) and refreshes no public page; source toggle is not audited | security L3, duroos M8 | S | todo |
| 20 | URL fields accept javascript: and //evil.com (zod 4 z.url) | security L2 | S | todo |

## Tier 3: SEO, accessibility and performance
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 21 | hreflang missing on English pages, not reciprocal, home page has no canonical | frontend H1 | S | todo |
| 22 | Focus ring colour is 2.08:1 on brand green: almost invisible on every link in green bands | frontend H4 | S | todo |
| 23 | The 1,682 library reader pages render on every request with a database read each (no generateStaticParams, no cache) | frontend H7 | S | todo |
| 24 | Remote https photo and flyer URLs break next/image (no remotePatterns) | frontend H2 | S | todo |
| 25 | Search palette has no focus trap, focus return or combobox semantics | frontend H5 | M | todo |
| 26 | Day arc: keyboard Enter never opens a prayer's list | frontend M2 | S | todo |
| 27 | Small-text contrast failures (article links 3.84, gold on green 4.05, sisters label 3.06) and tap targets under 40 px (Arabic dars links 26 px) | frontend M3, M4 | S | todo |
| 28 | adhan and minisearch in the client bundle on every page; company guide is a 645-line client component | frontend M5, M6, M7 | M | todo |
| 29 | Manifest, icons and theme colours use old colours, not the brand | frontend M13 | S | todo |
| 30 | Structured data: duplicated FAQPage, Article without image, deprecated HowTo; sitemap sparse lastmod and 84% thin reader pages | frontend M15, M16 | M | todo |
| 31 | Live and search pages are narrow 768 px columns at 1440 (empty desktop space) | frontend M8, M9 | S | todo |
| 32 | English leaking into /ar pages; Arabic headings line height about 1.0 | frontend M11, M12 | S | todo |

## Tier 4: watcher accuracy and operations
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 33 | Heartbeat says "last checked" even when every channel fetch failed | duroos M5 | S | todo |
| 34 | Same post forwarded to two channels is read twice and can create two overrides and two pushes | duroos M6 | S | todo |
| 35 | Quota exhaustion retried forever with no back-off; a run can exceed 60 s | duroos M7, security L4 | S | todo |
| 36 | Keyword prefilter misses تعليق, منقول, يستكمل, عطلة, غياب and "البث المباشر الآن" | duroos M10 | S | todo |
| 37 | A cancellation announcement does not change the schedule, so Updates and the dars card can disagree | duroos M9 | M | todo |
| 38 | Public API is not ready for a native app: no list endpoints, no date parameter, inconsistent envelope | duroos M4 | L | todo |

## Lows
All Low items stay in the three reports; do them opportunistically when touching the same file.

## Order of work
Tier 1 items 1, 2, 3, 5, 7 first (each small, each a visible wrong). Then Tier 2 items 10 to 13 and 15 (small, close the trust gaps), then 9. Then Tier 3 items 21 to 24 and 27. Then the rest by tier. Each step: tests, typecheck, commit, push to mine main and origin revamp, confirm on medinahub.org, tick the row.
