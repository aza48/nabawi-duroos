# MESH audit, 7 November 2026

Built from four role-play testers (a new Kulliyah student, a Ma'had student, a brother at a markaz planning to apply, a sister with two children), a technical crawl of all 229 pages at phone and laptop sizes, and four research sweeps (IU official sources, living in Madinah, marakiz and programmes, community sources in ten languages). The full reports are in `docs/audit/personas/`, `docs/audit/technical.md` and `docs/research/`.

Status: **done** (fixed and deployed), **next** (being worked on), **todo**.

## What is already good
- Fast: median load about 0.9 s, Lighthouse performance 100, best practices 100, accessibility 96, SEO 91 to 92.
- All 224 sitemap pages return 200, one h1 each, no hydration errors, no dashes in visible text, light theme by default.
- Testers succeeded quickly on: SIM and bank, monthly budget, exam dates into the phone calendar, giving birth, emergency numbers, sisters' study options, weekly duroos schedule with calendar subscribe.

## Critical (broken or blocks a core task)
| # | Problem | Where | Status |
|---|---|---|---|
| 1 | Day arc line stopped after Asr even at night (dash measured in screen pixels on a stretched SVG) | Home and Duroos hero | done |
| 2 | Topic chips make the page 815 px wide on a 390 px phone, cutting off the FAQ list | /ask | done |
| 3 | The calendar guide is broken: raw "At a glance" text, empty month cards with tick boxes, dates jammed together ("Until22Oct 2026Thu"), dead "Add to calendar" text. It is the only full page of dates | /guides/university-calendar-1448 | done |
| 4 | The al-Ruhayli Telegram channel was never read (wrong handle in code) | watcher | done |
| 5 | Library sends people to Google Drive folders, Arabic only, with no levels or subjects on the site | /library | done |
| 6 | No undergraduate admission guide (window, age 17 to 25, certificate under 5 years, documents, Manhati vs final acceptance, agents scam). Searches for "age limit", "admission requirements", "قبول" find nothing | content | written 8 Nov in guides-2026.ts (applying-to-the-islamic-university, with the paid agents warning). NOT live yet: the live write was blocked by the permission classifier. Owner: run `npm run content:sync -- --only=applying-to-the-islamic-university` (touches only that row) |
| 7 | /ar returns 404 | /ar | done |

## High
| # | Problem | Where | Status |
|---|---|---|---|
| 8 | Every guide and FAQ says "Last verified" today, because each content sync stamps the current date. Destroys trust and contradicts programme pages | sync.ts | done (only today's 10 new guides carry today's date; future syncs keep dates) |
| 9 | Search: noisy ranking (long guides match everything), misses synonyms and transliterations (fiqh, aqeedah, eid, ta jeel, tazkiyah, mukafaa spellings, optician, gym, paediatrician, childcare), never says "nothing found" for weak matches | src/lib/search | done |
| 10 | Floating WhatsApp button covers content and links on every page; white on WhatsApp green is 1.98:1 contrast | layout | done |
| 11 | Sticky "0 of N steps done" bar takes about 90 px on phones on every guide, including ones that are not procedures | GuideBody | done |
| 12 | Guides and shaykh pages have no Open Graph or Twitter tags; Article JSON-LD lacks image | guides/[slug] | done |
| 13 | Stale facts 6 to 19 months old: Mutun al-Ijaz, Ahlul Athar, IU page, library, childbirth costs | content | partly done (8 Nov: Ahlul Athar fee and location from the March 2026 posts; Mutun al-Ijaz price conflict (550 vs 400), IU page, library and childbirth costs still need a fresh source) |
| 14 | Wrong facts found by research: bus fare 3.45 SAR (not 3), Haramain fares from 162 SAR before VAT, Haram Institute registration ran 5 to 20 Safar (not Dhul Qa'dah), old visa lines (UK e-Waiver etc.), "studyinsaudi.moe.gov.sa" should be studyinsaudi.sa, the @MadinahUniversity YouTube channel is not the University's, "Al-Fusha Academy" is a school, arabic.ahlulathar.net is an India-based Zoom course | content | partly done (bus, train, Haram Institute, studyinsaudi.sa fixed; visa lines rewritten in the seed on 8 Nov but the live DB needs `npm run content:sync`; no ahlulathar.net link in the code; Al-Fusha needs the owner, see IDEAS-FOR-OWNER) |
| 15 | Official calendar differences: excuse and withdrawal deadline 6 Nov (site says 5), add/drop and deferral windows wider. Second-semester start needs checking against the official image | key-dates.ts | done 8 Nov: 6 Nov was already live; added the official semester 1 add/drop (10 to 30 Aug) and ta'jeel (2 Aug to 1 Sep) windows. 20 Dec second-semester start kept: no official source found to change it (owner question in IDEAS-FOR-OWNER) |
| 16 | Nothing for sisters at the Haram duroos (women's areas, how to listen live); the Live page embed can say "video unavailable" with no fallback | duroos | partly done (8 Nov: Live page has a sisters note and an unavailable-stream fallback; women's areas and gates need verified facts) |
| 17 | No Ma'had hub: level books, answer keys mapped to levels, what happens if you fail a level | library and guides | done 8 Nov: /mahad (books by level from the library tree, answer keys, attendance and failing rules, regulations), linked from Library, Guides and the sitemap |

## Medium
| # | Problem | Status |
|---|---|---|
| 18 | /programs promises "compared side by side" but has no filter, sort or comparison; prices in mixed units; only MAP has hours and intake | partly done (8 Nov: Study page filters by who it is for; sort, side-by-side compare and common price units still to do) |
| 19 | Duroos cannot be filtered by prayer, level or language | partly done (8 Nov: schedule filters by prayer; level and language need new lesson fields) |
| 20 | Tap targets under 40 px on most pages (nav pills 38 px, inline links 18 to 21 px) | done 8 Nov: globals.css base layer, pills and chips min 40px high, touch-screen text links get a 40px hit area (padding with matching negative margin, no layout shift). Prayer chips under 40 wide not changed |
| 21 | Stock Next.js 404 for unknown lesson slugs; custom 404 has no search or nav | done |
| 22 | 32 titles over 60 characters, duplicate titles and descriptions on two lessons, 31 descriptions over 160 | done 8 Nov: central metaTitle (45 plus " | MESH Madinah") and metaDescription (160) in src/lib/text.ts used by every generator; lesson titles and descriptions now name the prayer so same-book duroos differ |
| 23 | /duroos/updates says "No updates yet" and then lists earlier updates | done |
| 24 | Lesson pages say "Masjid Quba, Masjid Quba" | done |
| 25 | Guides and FAQ pages served no-store (no static params) | done (8 Nov, cached on first visit, edge HIT confirmed) |
| 26 | Long guides hide "On this page" on phones | done (8 Nov, collapsible list above the guide on phones) |
| 27 | Library sits under More while Study takes a nav slot; Ma'had and Kulliyah students need Library first | done (8 Nov) |
| 28 | Phone hero takes about 660 px before any duroos | done (8 Nov, hero 621 to about 310 px at 375 wide) |
| 29 | Jargon in labels and copy for second-language readers ("muqarrarat", "takhlees", dense ta'jeel text) | partly done (library and programmes) |

## Content to add (from research and the group chat)
- Undergraduate admission, step by step, with the agents warning (see 6).
- After acceptance: status checks, visa, Manhati notice, medical, fingerprints, deferring up to 2 years.
- University rules in plain words: 75% attendance, 20 days unexcused absence closes your file, ta'jeel and i'tithaar cap of 3 semesters, dismissal rules, grading.
- Healthcare and doctors, paediatricians; Nafath and Absher; Haramain train; visit visa extensions (host files on Absher, about 100 SAR, 180-day cap).
- Safety: current advisories and what to do (an official advisory exists as of late October 2026).
- Distance BA in Sharia (free, men and women), Bayinat Institute, Haram halaqat registration (qm.edu.sa), Taibah University route.

## Owner decisions needed
- The help number +1 234 567 9076 is real, but every tester thought it looked like a placeholder. A real-looking display (country, formatted) or a wa.me link would help trust.
- Hosting PDFs ourselves vs reading them inside the site from Drive (see the library notes in the final message).
