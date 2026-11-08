# Deep audit of MESH, 8 November 2026

Seven reviews run in parallel on commit 4c156d6 (typecheck clean, 279 tests passing, every live page 200 in under 1.2 s, strong security headers). Each review's full report is in this folder with file and line evidence and a fix for every item. This file is the ranked plan built from them. Status marks: **todo**, **doing**, **done <commit>**.

Reports: `security.md` (0 critical, 1 high, 8 medium, 10 low), `duroos.md` (0 critical, 4 high, 10 medium, 11 low, test gaps), `frontend.md` (1 critical, 7 high, 16 medium, 12 low). Still to land when their reviewers finish: `content.md`, `crawl.md` (live crawl of 662 pages with screenshots), `admin.md` (phone click-through of the admin), `personas.md` (seven role-played users on the live site).

## Tier 1: wrong information or broken behaviour a student can hit today
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 1 | A note, new-book or moved override inside a cancelled date range flips the dars back to ON (schedule.ts:61-66); the calendar feed then says CONFIRMED | duroos H1 | S | done 3ed1a66 |
| 2 | Isha is 30 minutes early for all of Ramadan (prayer.ts:18 never applies the Umm al-Qura Ramadan rule); every "after Isha" time, countdown and feed would be wrong from 8 Feb 2027 | duroos H2 | S | done 3ed1a66 |
| 3 | Home page "Coming up" renders client-only behind a 256 px placeholder: 0.54 layout shift on phones, missing from HTML, re-renders every second (KeyDates.tsx:31) | frontend C1 | S | done 8ae8386 |
| 4 | Lessons whose time is unknown show a precise adhan time, a calendar event and a live badge; timeLabel, prayerNote, sequence and note are never rendered | duroos M1 | M | done 097a282, 61a09db (timeKnown derived from the time label; live rows need no migration) |
| 5 | Paused, finished and expired lessons appear as running on lesson and shaykh pages | duroos M2 | S | done 3ed1a66 |
| 6 | Day, date and live status are frozen into ISR HTML and can show yesterday after an idle night | frontend M1 | M | done 92d4f11 |
| 7 | Arabic 404s are English with lang="en"; Arabic dynamic routes fall to the English not-found page | frontend H3 | S | done 8ae8386 |
| 8 | Search on /ar sends readers to English pages and /ar/search is a 404 | frontend H6 | M | done 92d4f11 |

## Tier 2: security and trust
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 9 | A passkey-only admin can sign in with a password alone: the second factor is never asked for (auth/check.ts:12; tests/auth.test.ts:79 asserts the insecure behaviour) | security H1 | M | done 71c0679 |
| 10 | "Live broadcast started" posts skip the trust and shadow-mode checks and the link check is unanchored, so a watched channel can point a public Live button anywhere (run.ts:95-105, live-notice.ts:59) | security M1 | S | done 5d37881 |
| 11 | Auto-published notes are the AI's own text (600 chars) and go into push alerts: prompt injection risk; build the public note on the server from kind and date | security M2 | S | done 5d37881 |
| 12 | The WhatsApp path hard-codes auto-publish on and ignores the admin's switch (inbox.ts:78,100) | security M3 | S | done 5d37881 |
| 13 | Public API returns whole rows: sourceHandle, sourceUrl, origin and internal research wording leak (announcements and lessons routes) | security M4, duroos M3 | S | done 5d37881 |
| 14 | Auto-publish trusts Gemini's date conversion and shaykh choice with no deterministic check; several shuyukh share family names (decide.ts) | duroos H3 | M | done 08bff14 |
| 15 | Re-running the seed or go-live silently reverts admin edits in production (seed/run.ts upserts) | duroos H4 | S | done 5d37881 |
| 16 | Push subscriptions: junk keys never cleaned up, unbounded fan-out, no rate limit (push.ts:18,53-63) | security M5 | M | done 5f7ccf4, 18dea30 (per-address limit in memory per instance; a firewall rule is the stronger step for the owner) |
| 17 | Track endpoint: no rate limit, DDL on cold start, purge inside visitor requests (track/route.ts, analytics/store.ts) | security M6 | M | done 18dea30 |
| 18 | pg Pool has no error handler (a dropped idle connection can crash the instance) and TLS verification is off (db/client.ts:29-41) | security M7 | S | partly 7c7fe13 (error handler; TLS verification still off: needs DATABASE_CA from the owner) |
| 19 | Undo can run twice, restores the whole old row (lost update) and refreshes no public page; source toggle is not audited | security L3, duroos M8 | S | done e532dfb |
| 20 | URL fields accept javascript: and //evil.com (zod 4 z.url) | security L2 | S | done e532dfb |

## Tier 3: SEO, accessibility and performance
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 21 | hreflang missing on English pages, not reciprocal, home page has no canonical | frontend H1 | S | done 21fc671 |
| 22 | Focus ring colour is 2.08:1 on brand green: almost invisible on every link in green bands | frontend H4 | S | done 21fc671 |
| 23 | The 1,682 library reader pages render on every request with a database read each (no generateStaticParams, no cache) | frontend H7 | S | done 21fc671 |
| 24 | Remote https photo and flyer URLs break next/image (no remotePatterns) | frontend H2 | S | done 21fc671 |
| 25 | Search palette has no focus trap, focus return or combobox semantics | frontend H5 | M | done ba8db8a |
| 26 | Day arc: keyboard Enter never opens a prayer's list | frontend M2 | S | done 0bd9f73 |
| 27 | Small-text contrast failures (article links 3.84, gold on green 4.05, sisters label 3.06) and tap targets under 40 px (Arabic dars links 26 px) | frontend M3, M4 | S | done 21fc671 |
| 28 | adhan and minisearch in the client bundle on every page; company guide is a 645-line client component | frontend M5, M6, M7 | M | done 9cada45, 752056a |
| 29 | Manifest, icons and theme colours use old colours, not the brand | frontend M13 | S | done 21fc671 |
| 30 | Structured data: duplicated FAQPage, Article without image, deprecated HowTo; sitemap sparse lastmod and 84% thin reader pages | frontend M15, M16 | M | done 9cada45 |
| 31 | Live and search pages are narrow 768 px columns at 1440 (empty desktop space) | frontend M8, M9 | S | done 0bd9f73, ba8db8a |
| 32 | English leaking into /ar pages; Arabic headings line height about 1.0 | frontend M11, M12 | S | done 0bd9f73, ba8db8a (programme meta descriptions were done earlier) |

## Tier 4: watcher accuracy and operations
| # | Item | Report | Size | Status |
|---|---|---|---|---|
| 33 | Heartbeat says "last checked" even when every channel fetch failed | duroos M5 | S | done 7c7fe13 |
| 34 | Same post forwarded to two channels is read twice and can create two overrides and two pushes | duroos M6 | S | done 7c7fe13 |
| 35 | Quota exhaustion retried forever with no back-off; a run can exceed 60 s | duroos M7, security L4 | S | done 9f1673e, 18dea30 |
| 36 | Keyword prefilter misses تعليق, منقول, يستكمل, عطلة, غياب and "البث المباشر الآن" | duroos M10 | S | done 7c7fe13 |
| 37 | A cancellation announcement does not change the schedule, so Updates and the dars card can disagree | duroos M9 | M | done 49cfc12 |
| 38 | Public API is not ready for a native app: no list endpoints, no date parameter, inconsistent envelope | duroos M4 | L | done 2577b8c (see docs/API.md) |

## Lows
All Low items stay in the three reports; do them opportunistically when touching the same file.

## Progress (8 November, late evening and night)
Implementation started the same evening and continued in a second session the same night (rows 4, 14, 16, 17, 25, 28 in part, 30, 31, 32, 35, 37, 38). Every row marked done is deployed to medinahub.org (each commit built on Vercel and was checked live). Rows marked partly say what is left and why. Still open: 18 (needs DATABASE_CA), 0c to 0e and 0g in part, 0h and 0i (content).

## Order of work
Tier 1 items 1, 2, 3, 5, 7 first (each small, each a visible wrong). Then Tier 2 items 10 to 13 and 15 (small, close the trust gaps), then 9. Then Tier 3 items 21 to 24 and 27. Then the rest by tier. Each step: tests, typecheck, commit, push to mine main and origin revamp, confirm on medinahub.org, tick the row.

## Tier 0 (added from the live role-play, personas.md): what real users hit on 8 November
| # | Item | Size | Status |
|---|---|---|---|
| 0a | Wrong "LIVE NOW": at 20:20, 70 minutes after Isha, two after-Maghrib lessons still showed LIVE and the home page said "4 live now" (the live window starts at the adhan and runs 90 min, duroos L4; fix the window to start at the dars and end sooner) | S | done 3ed1a66 |
| 0b | /guides/postgraduate-admission-1448 scrolls sideways on a 390 px phone (409 px wide) | S | done 8ae8386 |
| 0c | Al-Qasim's book change: English says 22 Nov, Arabic says today, English shows a raw "ON," label, the calendar feed still says the old book; not in Updates | S | partly 3ed1a66 (label fixed; the override's dates and the ICS title need an admin edit of the live row) |
| 0d | Contradictions: Ejar (iqama needed vs through an agent), two childbirth guides, al-Badr days ("daily except Fri and Sat" vs "Sunday to Friday"), "Wihda 22" vs "Maktab 22"; footer says the group is "Only for English-speaking Western students" | S each | partly e532dfb (Ejar sentence in the seed, needs `content:sync --only=finding-an-apartment`; al-Badr days, Wihda/Maktab 22 and the Western-students line are owner questions) |
| 0e | Ma'had book titles are raw file names ("Emailing ...", "merged"); updates feed shows "[a day in early 5/1448 AH]" and Hijri only | S | partly 92d4f11 (titles, Gregorian dates; the placeholder updates are live rows for the owner to edit) |
| 0f | "Alert me" fails silently without notification permission; calendar links are webcal:// only (dead on most Android phones) | S | done e532dfb |
| 0g | Search ranking: "kitab at-tawhid" and "tawheed" return guides first; /mahad is not indexed; "zaer", "hawiya" find nothing | M | partly 92d4f11 (Ma'had indexed, zaer/hawiya synonyms; ranking of kitab at-tawhid vs guides still open) |
| 0h | Missing information, ranked: living on a Visitor ID instead of an iqama (several pages still assume an iqama; "Zaair ID" vs "Visitor ID" naming); campus practicals (bus stops and times, mat'am hours, University clinic); women's gates and sections at the Haram, children and strollers; what "Verified" means and a real-looking contact; a parents' page; privacy text (/privacy redirects to /more while tracking is on) | M to L | todo |
| 0i | Arabic stops at the duroos: all 34 guides and 39 FAQs are English with Arabic menus, /ar/mahad is a 404, /ar has no home page | L | todo |
