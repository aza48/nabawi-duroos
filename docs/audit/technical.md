# MESH technical audit (live site)

Audited: https://medinahub.org on 7 November 2026. Tooling: headless Edge via Playwright (mobile 390x844 isMobile, desktop 1440x1000), Lighthouse (default mobile emulation) on 3 pages, curl and fetch for files, headers and links. Scope: all 224 sitemap URLs plus /ar, /search?q=test, three made-up 404 URLs, robots.txt, llms.txt, llms-full.txt, manifest, calendar feeds. 458 page loads in total (229 URLs x 2 viewports). No repo file was edited.

## Headline picture

The site is in good technical shape. Median load 925 ms desktop and 879 ms mobile, median TTFB about 185 ms, median LCP about 0.85 s, no horizontal overflow on any page at either viewport, exactly one h1 on every page, no heading-order skips, zero images without alt, zero unnamed buttons or links, zero unlabelled inputs, zero hydration errors, zero console errors on real pages, and zero em or en dashes in visible text, titles, descriptions, JSON-LD, llms files, ICS or sitemap. Lighthouse: Performance 100, Best Practices 100, Accessibility 96, SEO 91 to 92 on /, /duroos and /guides/drivers-license. Light is the default even when the OS is in dark mode, the toggle works and persists (localStorage key mesh-theme). All 226 internal links return 200 and every internal link target is in the sitemap.

The problems are mostly trust and metadata, not speed: guides claim to be verified "today" because of the seed script, /ar is a 404, guides have no social tags and no Article image, 404 handling is inconsistent, and there are some contrast and tap-target issues.

## Prioritised issues

### CRITICAL

None that break the site. Issue H1 is the closest: a factual-trust problem on 43 content pages.

### HIGH

**H1. Every guide and FAQ says "Last verified 7 November 2026" (today), and schema dates are today too.**
- URLs: all 25 /guides/* and all 18 /ask/* pages (28 "Last verified 7 November 2026" badges seen on crawled pages, plus the "Verified" tick on the /guides and /ask index cards).
- Evidence: JSON-LD on all 25 guides has datePublished and dateModified of 2026-11-07 (18:03Z and 19:33Z). Sitemap lastmod for guides and FAQs is also 2026-11-07T19:33Z. Yet /guides/childbirth-options says "last updated in April 2025" and /guides/cost-of-living reflects "late 2025 and 2026".
- Cause: `src/server/seed/content/sync.ts` lines 20, 27, 31 and 37 set `lastVerifiedAt: now` (including in the on-conflict update branch), so the human-verified date is overwritten by deploy or sync time. Rendered in `src/features/content/ContentPages.tsx` (lines 62, 115, 163; JSON-LD at 142 to 143).
- Fix: never write lastVerifiedAt from the sync script. Keep a `verifiedAt` field in each content source file and sync that value only; leave it null when unknown and hide the badge. Use the content file's own date for datePublished and bump dateModified only when the body changes. This also makes sitemap lastmod meaningful.

**H2. /ar returns 404 although the site advertises an Arabic section.**
- URL: https://medinahub.org/ar (404, noindex, English "This page doesn't exist" page with lang=en, no hreflang). The home page's hreflang says ar = /ar/duroos, so the Arabic "home" is the duroos page.
- Cause: `src/app/(ar)/ar/` contains only `duroos/`, `layout.tsx` and `opengraph-image.tsx`, no page.tsx for the root.
- Fix: add `src/app/(ar)/ar/page.tsx` that calls `permanentRedirect("/ar/duroos")`, or add `{ source: "/ar", destination: "/ar/duroos", permanent: true }` to the redirects in `next.config.ts`. Also give /ar/* 404s `lang="ar" dir="rtl"` and Arabic text (global-not-found cannot see the path, so use a segment-level `not-found.tsx` under `(ar)/ar`).

**H3. Guide pages (25) and two shaykh pages have no Open Graph or Twitter tags; guides have no Article image.**
- URLs: every /guides/<slug>, /duroos/shaykh/abdullah-ibn-abdurrahman-al-ruhayli, /duroos/shaykh/masad-ibn-musaid-al-husaini and 12 Arabic shaykh pages (no twitter:card). 52 desktop pages lack og:title and og:image in total (the rest are /ar and the 404s).
- Evidence: og:title, og:image, twitter:card all null in the head. Article JSON-LD is missing `image` on 25 of 25 (Google requires it for Article rich results).
- Cause: `src/app/(site)/guides/[slug]/page.tsx` generateMetadata returns `openGraph: g.coverUrl ? { images: [...] } : undefined`, so with no cover there is no openGraph at all. The Article JSON-LD in ContentPages.tsx has no image field.
- Fix: always return `openGraph: { title, description, type: "article", images: ... }` and `twitter: { card: "summary_large_image" }`, add a file-based `opengraph-image.tsx` under `guides/[slug]/` so every guide gets a card, and add `image` to the Article JSON-LD pointing at the same file. Same check for shaykh pages with a missing photo.

**H4. Stale "last checked" facts (older than 6 months; today is 7 Nov 2026).**
- /programs/mutun-alijaz: "Last checked by MESH: October 2025" (13 months).
- /programs/ahlul-athar: March 2026 (8 months). /programs/iu-madinah: April 2026 (7 months).
- /library: "List checked 1 January 2026" (10 months).
- /guides/childbirth-options: costs "April 2025" and "last updated in April 2025" (19 months; prices are the thing that goes stale).
- /guides/visas-for-family-and-visitors: "checked in late 2025 and 2026", with a visa-rules disclaimer; borderline.
- Cause: values come from `PROGRAMS[].checked` in `src/content/programs.ts` and `src/content/library.ts`. Sitemap lastmod for programs repeats these dates (5 programs show 2026-07-01).
- Fix: recheck these entries, and show a "may be out of date" note automatically when `checked` is older than 6 months (a small helper in `src/features/programs/ProgramPages.tsx`). Add a test that fails when a program is older than 180 days.

**H5. Dead or doubtful external links.**
- https://studyinsaudi.moe.gov.sa/ (on /programs/iu-madinah, /library) and https://gph.edu.sa/public/?page=ins, ...page_897272, ...page_986449 (on /programs/nabawi-women, /guides/sisters-studying-in-madinah): NXDOMAIN from both the local resolver and Cloudflare DNS over HTTPS. Saudi government domains are sometimes unreachable from abroad, so mark as "needs manual check from inside KSA", but NXDOMAIN on a public resolver usually means the hostname is gone.
- https://twitter.com/info_fopm_w returns 404 and redirects to x.com/info_fopm_w (also 404): account is gone (on /guides/sisters-studying-in-madinah).
- https://map-arabic.com/ returns 403 to a bot UA: needs manual check (on /programs/map).
- The other 142 external links returned 200.
- Fix: replace or remove the dead hosts in `src/content/programs.ts`, `src/content/library.ts` and `src/server/seed/content/guides-2026.ts`; drop the dead account; add a weekly link-check job to the existing GitHub Actions.

### MEDIUM

**M1. Light-theme contrast failures (WCAG AA).**
- WhatsApp buttons: white on #25D366 = 1.98:1 on essentially every page ("Join the group" in the header on desktop, "Join on WhatsApp" and the Arabic equivalents in cards; about 680 hits across the crawl). Same in dark mode.
- Gold links (#a87a22 on paper #f8f6f1) = 3.55:1: "Location on Google Maps" (15 pages), "Jamiah library", "Study in Madinah", "Duroos" and others.
- "Last verified ..." gold (#e2b23a) on the green hero (#145c3e) = 4.05:1 (20 pages).
- Dimmed "finished" lessons on / and /duroos: text #9ba29c on #fcfbf9 = 2.52:1 (Lighthouse color-contrast fail); muted #6f7771 at 15px = 4.45:1.
- Fix: use dark text on the WhatsApp green, or the darker brand green #128C7E with white text; darken gold link text to about #8a6215; reduce the dimming on finished lessons; darken the muted token. Tokens live in `src/app/globals.css`.

**M2. Mobile tap targets under 40px on almost every page (224 of 225 mobile pages).**
- Top nav pills (Today 74x38, Updates 89x38, Schedule 96x38, Live 61x38, English/Arabic toggle 105x38 and 78x38): 38px high. In-page text links "Full calendar 84x20", "Weekly schedule 112x20", "Today 39x18" and lesson title links (21px high) on the home page. Prayer chips Fajr 39x44 and Asr 37x44 are under 40 wide.
- The 1x1 "Skip to content" link is a standard visually hidden skip link, not a defect.
- Fix: add `min-h-11` (44px) to the nav pills and padding (`py-2.5 inline-block`) to inline "see all" links; add `min-w-11` to the prayer chips. Code: `src/components/shell` and `src/features/home`.

**M3. 404 handling is inconsistent and thin.**
- Unknown top-level URL (/this-page-does-not-exist-xyz, /ar/this-does-not-exist, /ar): custom page from `src/app/global-not-found.tsx`. Friendly, noindex, status 404, but only two buttons (Home, Today's duroos), no search box, no guides link, no site header or footer, English only (lang=en) even under /ar/*.
- Unknown dynamic slug (/duroos/lesson/does-not-exist): renders the stock Next.js 404 inside the site layout ("404 / This page could not be found.", page text) rather than the friendly page. Status 404, noindex.
- Fix: add `src/app/(site)/not-found.tsx` (and an Arabic one under `(ar)/ar`) with the friendly wording, a search form to /search, and links to Guides, Programs, Ask and Duroos; call `notFound()` in lesson and shaykh pages so that file is used.

**M4. Title and description hygiene.**
- Titles longer than 60 characters: 32 pages (home is 68; lesson pages with long book names reach 89 to 91, e.g. /duroos/lesson/ruh-tawhid and /duroos/lesson/quba-battin-bulugh). They will truncate in results.
- Duplicate titles and descriptions: "Tafsir as-Sa'di | MESH Madinah" (/duroos/lesson/shamani-tafsir and /duroos/lesson/abadr-tafsir) and "Lessons in Aqeedah | MESH Madinah" (/duroos/lesson/quba-ghamidi-aqidah and ...aqidah2), with the same pairs in Arabic. Each pair also shares an identical description.
- Descriptions over 160 characters: 31 (home 167, /duroos/lesson/abadr-tawhid 191, /duroos/lesson/ruh-tawhid 189). 23 pages share the home page description verbatim.
- Short descriptions under 70: /programs/taibah-markaz (41), /programs/marifah (55), /guides/restaurants (55), plus about 55 Arabic shaykh and lesson pages (44 to 69; Arabic is compact, so lower risk).
- Fix: in the lesson `generateMetadata`, build "<Book> with <Shaykh> | MESH" and truncate the book name to about 45 characters; give each index page its own description; cap descriptions at about 155 characters.

**M5. JSON-LD gaps.**
- Parses cleanly on all 145 pages that have it: Organization and WebSite on every page, BreadcrumbList on 56, FAQPage on 19, Article or Article+HowTo on 25, Course on 11, EducationalOccupationalProgram on 2. Required `image` is missing on all Article blocks (see H3).
- Lesson and shaykh pages carry only Organization and WebSite: no Event or Course for lessons, no Person for shaykhs, no BreadcrumbList. All 83 Arabic pages have no JSON-LD at all.
- Fix: add a `Person` block on shaykh pages and an `Event` series or `Course` on lesson pages; reuse the Organization block in the Arabic layout; set the guides' Article `image`.

**M6. Hreflang and canonical completeness.**
- Only the 80 duroos-section URLs carry hreflang (en and ar pairs, reciprocal). No x-default anywhere. Home points ar at /ar/duroos, which is a different page, not a translation of /.
- Home (/) has no canonical link tag.
- Sitemap hreflang is one-directional (the en entry lists ar, the ar entry lists nothing).
- Fix: add `alternates: { canonical: "/", languages: { en: "/", ar: "/ar/duroos", "x-default": "/" } }` to the home metadata (`src/app/(site)/page.tsx`); in `src/app/sitemap.ts` the `both()` helper only puts alternates on the English URL, so add them to the Arabic one too.

**M7. Guides and FAQ pages are served uncached (43 pages plus /search).**
- Headers on /guides/*, /ask/*, /search show `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate` and x-vercel-cache MISS. Other pages are `public, max-age=0, must-revalidate` (PRERENDER or HIT). TTFB is still about 188 ms, so users do not notice, but the CDN cannot absorb a spike and each request does a DB query.
- Cause (probable): `guides/[slug]/page.tsx` and `ask/[slug]/page.tsx` set `revalidate = 300` but export no `generateStaticParams` (lesson pages do), so they render on demand.
- Fix: add `generateStaticParams` listing published slugs for guides and ask; keep revalidate 300.

**M8. CLS on search results.**
- /search?q=test: CLS 0.22 (source: the footer, pushed down when results render). Lighthouse CLS on /, /duroos and a guide is 0, and all other pages measured under 0.02.
- Fix: reserve vertical space (for example `min-h-[60vh]`) for the results container in `src/app/(site)/search`, or render results on the server.

**M9. Sitemap quality.**
- Valid, 224 URLs, covers every public page found by crawling (all 226 internal links are in it). It includes /search, which is thin and not noindex.
- lastmod on only 56 of 224 URLs (programs, guides, ask); none on lessons, shaykhs, duroos, library, discounts. Guide and FAQ lastmod values are wrong (see H1). changefreq and priority are present but ignored by Google.
- Fix: add lastModified from lesson and shaykh `updatedAt`; drop /search from the sitemap.

**M10. ICS calendar feed caching (live).**
- /api/v1/calendar/all.ics: 200, text/calendar, 259 KB, 421 events, 7 Nov 2026 to 1 Jan 2027, X-Robots-Tag noindex. Live `Cache-Control` is just `public` with x-vercel-cache MISS on every request; /api/v1/duroos/today is the same. The working copy of `src/app/api/v1/calendar/[feed]/route.ts` (uncommitted) has `s-maxage=900, stale-while-revalidate=3600`, so deploying it fixes this; verify afterwards with `curl -I`.
- Calendar subscribers poll every few hours, so an uncached 259 KB DB-backed response per poll adds up. Unknown feed names return 404 correctly; /api/v1 itself returns the HTML 404.

### LOW

**L1. PWA manifest.** /manifest.webmanifest is valid (200, application/manifest+json); icons /icon 512x512 and /apple-icon 180x180 both resolve as PNG. Missing: a 192x192 icon, a `purpose: "maskable"` icon, `id`, `lang`, `dir`, screenshots. theme_color is static #1e4d3b and `<meta name="theme-color">` is static #f6f1e7 in both themes (it does not follow dark mode). Fix in `src/app/manifest.ts` and the root metadata.

**L2. /favicon.ico returns 404.** The `<link rel="icon" href="/icon?...">` works, but crawlers and some browsers still request /favicon.ico. Add `src/app/favicon.ico` or a redirect to /icon.

**L3. Static assets.** `/_next/static/**` is `public,max-age=31536000,immutable` (good). OG and icon images are `max-age=0, must-revalidate` (revalidated each time; fine). HTML is `public, max-age=0, must-revalidate` with ETag, correct for ISR. The home page preloads 8 woff2 files, which is heavy; limit preloads to the fonts used above the fold.

**L4. Page weight.** /duroos/schedule is about 1 MB over 87 requests (HTML 150 KB); /duroos/updates and its Arabic twin about 0.9 MB. Median page is 716 KB and 52 requests. Still under 2 s. Lighthouse flags unused JS (27 KiB), legacy JS (14 KiB) and render-blocking CSS (100 to 140 ms). Fix: set a modern browserslist, split client JS for the schedule grid.

**L5. YouTube thumbnails lack width and height.** 8 programme pages (/programs/map, taba, ahlul-athar, mutun-alijaz, fusha-academy and others) use `https://i.ytimg.com/vi/<id>/hqdefault.jpg` without width and height attributes. No CLS was measured from them, but add width=480 height=360 or an aspect-ratio. Of 118 images, none are oversize and none lack alt.

**L6. Accessibility details from Lighthouse (score 96).**
- label-content-name-mismatch: the header logo link has `aria-label="MESH home"` while the visible text is "MESH ..." (the text is not included in the accessible name). Start the label with the visible text or drop it.
- link-text: three links just called "More" (to /more) are not descriptive; rename or add an aria-label.
- list (guide pages): `<ol class="steps">` has direct children with role=checkbox. Wrap in li or use a div with role=list.
- Focus visibility: the first 6 tab stops on all 225 pages showed an outline or ring; no failures detected.

**L7. Console noise.** Only 8 console errors in the whole crawl, all the expected 404 resource errors on the 404 URLs; 4 Windows-only WebGPU `powerPreference` warnings (a headless Edge artefact, not the site). No failed network requests on real pages.

**L8. robots.txt and llms files.** Sane: `Allow: /`, `Disallow: /admin` and `/api/`, sitemap declared, 11 explicit AI crawler groups repeating the same rules. Minor contradiction: /llms.txt advertises the JSON API (/api/v1/duroos/today and /schedule) while robots.txt disallows /api/. Either allow `/api/v1/duroos/` for those bots or drop the line. The `Host:` directive is Yandex-only and ignored elsewhere. llms.txt is 12 KB and llms-full.txt 89 KB, both prerendered.

**L9. Dark mode.** Light default confirmed (OS dark preference does not switch it, by design in `globals.css`). Toggle button ("Switch light / dark") sets `data-theme="dark"` (background rgb(10,21,18)) and persists across reload. Dark-mode contrast scan of 10 key pages found only the WhatsApp button (1.98:1).

**L10. Security headers (for information, all good).** CSP, HSTS preload, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy and COOP are present on every response.

## Checks that passed

- HTTP 200 on all 224 sitemap URLs, /ar/duroos and Arabic pages, /search?q=test, robots.txt, llms.txt, llms-full.txt, manifest and calendar feeds (all.ics, dates.ics, shaykh-*.ics, lesson-*.ics, masjid-*.ics). No redirects on any sitemap URL.
- lang and dir: English pages en/ltr, Arabic pages ar/rtl (80 of 80). Only the 404 pages are `en` with no dir.
- Exactly one h1 on every page; no heading level skips.
- Dash ban: zero U+2014 or U+2013 in visible text, titles, descriptions, llms files, sitemap and ICS.
- No past dates shown as upcoming: the home "Coming up" block shows first-semester finals (29 Nov to 14 Dec) with a live countdown and later dates only; /guides/university-calendar-1448 lists past August to October 2026 deadlines as dated history.
- Core Web Vitals hints: the LCP element is the h1 or first text paragraph on almost every page (no hero image); LCP under 2.5 s everywhere (median about 0.85 s); CLS 0 except /search?q=test.

## Not verifiable from here

- Saudi government and education sites (moe.gov.sa subdomains, gph.edu.sa) from outside KSA: marked "needs manual check".
- Real-user CWV (CrUX, INP) were not measured.
- Contrast and tap-target figures come from computed styles; text over images or gradients was skipped, so true counts may be slightly higher.

## Every page

Columns: path, status desktop/mobile, load ms desktop/mobile, console errors and warnings desktop/mobile, overflow desktop/mobile, title length, meta description length (desktop). A dash in the description column means no description tag. The 404 rows are expected to show 404 and one console error.

| Path | Status d/m | Load ms d/m | Console d/m | Overflow d/m | Title len | Desc len |
|---|---|---|---|---|---|---|
| / | 200/200 | 486/522 | 0/0 | n/n | 68 | 167 |
| /duroos | 200/200 | 769/654 | 0/0 | n/n | 29 | 116 |
| /ar/duroos | 200/200 | 846/743 | 0/0 | n/n | 17 | 71 |
| /duroos/schedule | 200/200 | 584/468 | 0/0 | n/n | 30 | 93 |
| /ar/duroos/schedule | 200/200 | 543/460 | 0/0 | n/n | 22 | 66 |
| /duroos/updates | 200/200 | 725/816 | 0/0 | n/n | 22 | 167 |
| /ar/duroos/updates | 200/200 | 671/689 | 0/0 | n/n | 16 | 80 |
| /duroos/live | 200/200 | 1617/1673 | 1/1 | n/n | 26 | 167 |
| /ar/duroos/live | 200/200 | 1668/1560 | 1/1 | n/n | 19 | 80 |
| /guides | 200/200 | 471/556 | 0/0 | n/n | 21 | 109 |
| /programs | 200/200 | 563/501 | 0/0 | n/n | 31 | 120 |
| /programs/map | 200/200 | 799/1029 | 0/0 | n/n | 43 | 108 |
| /programs/taba | 200/200 | 677/881 | 0/0 | n/n | 29 | 91 |
| /programs/ahlul-athar | 200/200 | 713/918 | 0/0 | n/n | 36 | 86 |
| /programs/mutun-alijaz | 200/200 | 721/844 | 0/0 | n/n | 38 | 76 |
| /programs/fusha-academy | 200/200 | 837/901 | 0/0 | n/n | 31 | 75 |
| /programs/as-safwah | 200/200 | 743/927 | 0/0 | n/n | 34 | 80 |
| /programs/iu-madinah | 200/200 | 732/982 | 0/0 | n/n | 44 | 88 |
| /programs/manarat-college | 200/200 | 758/863 | 0/0 | n/n | 65 | 105 |
| /programs/mishkat | 200/200 | 720/857 | 0/0 | n/n | 37 | 77 |
| /programs/taibah-markaz | 200/200 | 723/867 | 0/0 | n/n | 36 | 41 |
| /programs/marifah | 200/200 | 778/816 | 0/0 | n/n | 45 | 55 |
| /programs/nabawi-women | 200/200 | 838/866 | 0/0 | n/n | 52 | 87 |
| /programs/nabawi-halaqat | 200/200 | 699/959 | 0/0 | n/n | 52 | 88 |
| /library | 200/200 | 567/531 | 0/0 | n/n | 33 | 122 |
| /discounts | 200/200 | 484/543 | 0/0 | n/n | 32 | 137 |
| /search | 200/200 | 778/658 | 0/0 | n/n | 21 | 115 |
| /ask | 200/200 | 492/593 | 0/0 | n/n | 36 | 80 |
| /more | 200/200 | 534/504 | 0/0 | n/n | 19 | 167 |
| /duroos/shaykh/abdullah-ibn-abdurrahman-al-ruhayli | 200/200 | 1349/916 | 0/0 | n/n | 54 | 85 |
| /ar/duroos/shaykh/abdullah-ibn-abdurrahman-al-ruhayli | 200/200 | 1444/1117 | 0/0 | n/n | 40 | 58 |
| /duroos/shaykh/abdullatif-ibn-shalwah-al-shamani | 200/200 | 1347/841 | 0/0 | n/n | 52 | 83 |
| /ar/duroos/shaykh/abdullatif-ibn-shalwah-al-shamani | 200/200 | 923/879 | 0/0 | n/n | 37 | 55 |
| /duroos/shaykh/ahmad-ibn-sabir-al-ghamidi | 200/200 | 1061/1098 | 0/0 | n/n | 45 | 76 |
| /ar/duroos/shaykh/ahmad-ibn-sabir-al-ghamidi | 200/200 | 1294/981 | 0/0 | n/n | 30 | 48 |
| /duroos/shaykh/ghalib-ibn-ghazi-al-saidi | 200/200 | 546/645 | 0/0 | n/n | 45 | 76 |
| /ar/duroos/shaykh/ghalib-ibn-ghazi-al-saidi | 200/200 | 1154/1116 | 0/0 | n/n | 30 | 48 |
| /duroos/shaykh/haytham-ibn-muhammad-jamil-sarhan | 200/200 | 1334/1283 | 0/0 | n/n | 52 | 83 |
| /ar/duroos/shaykh/haytham-ibn-muhammad-jamil-sarhan | 200/200 | 1753/1293 | 0/0 | n/n | 33 | 51 |
| /duroos/shaykh/masad-ibn-musaid-al-husaini | 200/200 | 590/682 | 0/0 | n/n | 48 | 79 |
| /ar/duroos/shaykh/masad-ibn-musaid-al-husaini | 200/200 | 1339/671 | 0/0 | n/n | 31 | 49 |
| /duroos/shaykh/muadh-ibn-abdurrahim-khujah | 200/200 | 1606/987 | 0/0 | n/n | 47 | 78 |
| /ar/duroos/shaykh/muadh-ibn-abdurrahim-khujah | 200/200 | 897/893 | 0/0 | n/n | 33 | 51 |
| /duroos/shaykh/salih-ibn-sad-al-suhaymi | 200/200 | 770/1184 | 0/0 | n/n | 44 | 75 |
| /ar/duroos/shaykh/salih-ibn-sad-al-suhaymi | 200/200 | 1072/1229 | 0/0 | n/n | 29 | 47 |
| /duroos/shaykh/yusuf-ibn-muhsin-al-saidi | 200/200 | 1288/1172 | 0/0 | n/n | 45 | 76 |
| /ar/duroos/shaykh/yusuf-ibn-muhsin-al-saidi | 200/200 | 1308/1160 | 0/0 | n/n | 30 | 48 |
| /duroos/shaykh/abdullah-ibn-ibrahim-al-luhaydan | 200/200 | 1177/1023 | 0/0 | n/n | 57 | 88 |
| /ar/duroos/shaykh/abdullah-ibn-ibrahim-al-luhaydan | 200/200 | 1181/1106 | 0/0 | n/n | 41 | 59 |
| /duroos/shaykh/abdulqadir-ibn-ata-sufi | 200/200 | 1125/974 | 0/0 | n/n | 48 | 79 |
| /ar/duroos/shaykh/abdulqadir-ibn-ata-sufi | 200/200 | 1131/1019 | 0/0 | n/n | 35 | 53 |
| /duroos/shaykh/abdurrazzaq-ibn-abdulmuhsin-al-badr | 200/200 | 1159/1056 | 0/0 | n/n | 60 | 91 |
| /ar/duroos/shaykh/abdurrazzaq-ibn-abdulmuhsin-al-badr | 200/200 | 1175/923 | 0/0 | n/n | 43 | 61 |
| /duroos/shaykh/abdussalam-ibn-salim-al-suhaymi | 200/200 | 472/513 | 0/0 | n/n | 56 | 87 |
| /ar/duroos/shaykh/abdussalam-ibn-salim-al-suhaymi | 200/200 | 974/971 | 0/0 | n/n | 39 | 57 |
| /duroos/shaykh/ali-ibn-fahd-abu-battin | 200/200 | 613/621 | 0/0 | n/n | 48 | 79 |
| /ar/duroos/shaykh/ali-ibn-fahd-abu-battin | 200/200 | 1032/854 | 0/0 | n/n | 32 | 50 |
| /duroos/shaykh/ali-ibn-ghazi-al-tuwaijri | 200/200 | 1046/1013 | 0/0 | n/n | 50 | 81 |
| /ar/duroos/shaykh/ali-ibn-ghazi-al-tuwaijri | 200/200 | 1290/1057 | 0/0 | n/n | 33 | 51 |
| /duroos/shaykh/arif-ibn-mazid-al-suhaymi | 200/200 | 1253/1051 | 0/0 | n/n | 50 | 81 |
| /ar/duroos/shaykh/arif-ibn-mazid-al-suhaymi | 200/200 | 908/826 | 0/0 | n/n | 33 | 51 |
| /duroos/shaykh/husayn-ibn-ghazi-al-tuwaijri | 200/200 | 973/927 | 0/0 | n/n | 53 | 84 |
| /ar/duroos/shaykh/husayn-ibn-ghazi-al-tuwaijri | 200/200 | 1043/951 | 0/0 | n/n | 34 | 52 |
| /duroos/shaykh/ibrahim-ibn-amir-al-ruhayli | 200/200 | 483/523 | 0/0 | n/n | 52 | 83 |
| /ar/duroos/shaykh/ibrahim-ibn-amir-al-ruhayli | 200/200 | 515/664 | 0/0 | n/n | 36 | 54 |
| /duroos/shaykh/mahir-ibn-abdurrahim-khujah | 200/200 | 1137/847 | 0/0 | n/n | 52 | 83 |
| /ar/duroos/shaykh/mahir-ibn-abdurrahim-khujah | 200/200 | 1296/868 | 0/0 | n/n | 36 | 54 |
| /duroos/shaykh/muhammad-ibn-bukhayt-al-hujayli | 200/200 | 1435/1057 | 0/0 | n/n | 56 | 87 |
| /ar/duroos/shaykh/muhammad-ibn-bukhayt-al-hujayli | 200/200 | 1178/1017 | 0/0 | n/n | 33 | 51 |
| /duroos/shaykh/muhammad-ibn-nasir-al-humaid | 200/200 | 1191/967 | 0/0 | n/n | 53 | 84 |
| /ar/duroos/shaykh/muhammad-ibn-nasir-al-humaid | 200/200 | 1094/1014 | 0/0 | n/n | 32 | 50 |
| /duroos/shaykh/sulayman-ibn-saleemullah-al-ruhayli | 200/200 | 531/644 | 0/0 | n/n | 60 | 91 |
| /ar/duroos/shaykh/sulayman-ibn-saleemullah-al-ruhayli | 200/200 | 466/533 | 0/0 | n/n | 40 | 58 |
| /duroos/shaykh/tariq-al-qahtani | 200/200 | 1337/945 | 0/0 | n/n | 41 | 72 |
| /ar/duroos/shaykh/tariq-al-qahtani | 200/200 | 1323/1072 | 0/0 | n/n | 26 | 44 |
| /duroos/shaykh/umar-ibn-muslih-al-husaini | 200/200 | 1131/917 | 0/0 | n/n | 51 | 82 |
| /ar/duroos/shaykh/umar-ibn-muslih-al-husaini | 200/200 | 884/994 | 0/0 | n/n | 32 | 50 |
| /duroos/shaykh/abdullah-ibn-muhammad-al-saadi | 200/200 | 1802/1160 | 0/0 | n/n | 53 | 84 |
| /ar/duroos/shaykh/abdullah-ibn-muhammad-al-saadi | 200/200 | 962/903 | 0/0 | n/n | 36 | 54 |
| /duroos/shaykh/abdulmuhsin-ibn-muhammad-al-qasim | 200/200 | 1200/916 | 0/0 | n/n | 55 | 86 |
| /ar/duroos/shaykh/abdulmuhsin-ibn-muhammad-al-qasim | 200/200 | 822/947 | 0/0 | n/n | 38 | 56 |
| /duroos/shaykh/ali-ibn-abdurrahman-al-hudhayfi | 200/200 | 1429/1051 | 0/0 | n/n | 53 | 84 |
| /ar/duroos/shaykh/ali-ibn-abdurrahman-al-hudhayfi | 200/200 | 585/872 | 0/0 | n/n | 38 | 56 |
| /duroos/shaykh/anis-ibn-ahmad-tahir | 200/200 | 991/989 | 0/0 | n/n | 42 | 73 |
| /ar/duroos/shaykh/anis-ibn-ahmad-tahir | 200/200 | 894/858 | 0/0 | n/n | 30 | 48 |
| /duroos/shaykh/badr-ibn-muqbil-al-badr | 200/200 | 447/507 | 0/0 | n/n | 45 | 76 |
| /ar/duroos/shaykh/badr-ibn-muqbil-al-badr | 200/200 | 1124/863 | 0/0 | n/n | 30 | 48 |
| /duroos/shaykh/maher-al-qahtani | 200/200 | 1121/841 | 0/0 | n/n | 38 | 69 |
| /ar/duroos/shaykh/maher-al-qahtani | 200/200 | 1427/1037 | 0/0 | n/n | 26 | 44 |
| /duroos/shaykh/saud-ibn-abdulaziz-al-khallaf | 200/200 | 1083/995 | 0/0 | n/n | 51 | 82 |
| /ar/duroos/shaykh/saud-ibn-abdulaziz-al-khallaf | 200/200 | 1163/955 | 0/0 | n/n | 37 | 55 |
| /duroos/lesson/suhaymi-mutaqad | 200/200 | 463/711 | 0/0 | n/n | 50 | 132 |
| /ar/duroos/lesson/suhaymi-mutaqad | 200/200 | 478/464 | 0/0 | n/n | 25 | 58 |
| /duroos/lesson/badrbadr-sequence | 200/200 | 569/617 | 0/0 | n/n | 38 | 121 |
| /ar/duroos/lesson/badrbadr-sequence | 200/200 | 557/699 | 0/0 | n/n | 24 | 58 |
| /duroos/lesson/shamani-tafsir | 200/200 | 503/688 | 0/0 | n/n | 30 | 120 |
| /ar/duroos/lesson/shamani-tafsir | 200/200 | 505/550 | 0/0 | n/n | 19 | 60 |
| /duroos/lesson/ruh-tawhid | 200/200 | 882/672 | 0/0 | n/n | 91 | 189 |
| /ar/duroos/lesson/ruh-tawhid | 200/200 | 866/897 | 0/0 | n/n | 55 | 99 |
| /duroos/lesson/battin-fath | 200/200 | 1691/1614 | 0/0 | n/n | 27 | 113 |
| /ar/duroos/lesson/battin-fath | 200/200 | 1699/1416 | 0/0 | n/n | 22 | 58 |
| /duroos/lesson/battin-muslim | 200/200 | 1011/748 | 0/0 | n/n | 27 | 113 |
| /ar/duroos/lesson/battin-muslim | 200/200 | 1251/889 | 0/0 | n/n | 16 | 52 |
| /duroos/lesson/battin-tirmidhi | 200/200 | 1159/1087 | 0/0 | n/n | 40 | 126 |
| /ar/duroos/lesson/battin-tirmidhi | 200/200 | 1305/1017 | 0/0 | n/n | 26 | 62 |
| /duroos/lesson/hudhayfi-nayl | 200/200 | 1208/965 | 0/0 | n/n | 50 | 141 |
| /ar/duroos/lesson/hudhayfi-nayl | 200/200 | 1645/1370 | 0/0 | n/n | 40 | 82 |
| /duroos/lesson/khalaf-tadmuriyyah | 200/200 | 942/1045 | 0/0 | n/n | 29 | 118 |
| /ar/duroos/lesson/khalaf-tadmuriyyah | 200/200 | 1132/1054 | 0/0 | n/n | 20 | 61 |
| /duroos/lesson/qasim-sequence | 200/200 | 1154/1001 | 0/0 | n/n | 31 | 124 |
| /ar/duroos/lesson/qasim-sequence | 200/200 | 1425/1011 | 0/0 | n/n | 19 | 61 |
| /duroos/lesson/tuwaijri-bulugh | 200/200 | 1035/965 | 0/0 | n/n | 30 | 118 |
| /ar/duroos/lesson/tuwaijri-bulugh | 200/200 | 1591/1296 | 0/0 | n/n | 23 | 60 |
| /duroos/lesson/ruh-dalil | 200/200 | 1795/1706 | 0/0 | n/n | 63 | 161 |
| /ar/duroos/lesson/ruh-dalil | 200/200 | 1047/978 | 0/0 | n/n | 35 | 79 |
| /duroos/lesson/ruh-targhib | 200/200 | 1003/966 | 0/0 | n/n | 57 | 155 |
| /ar/duroos/lesson/ruh-targhib | 200/200 | 1087/1021 | 0/0 | n/n | 32 | 76 |
| /duroos/lesson/shuwayir-rawd | 200/200 | 1345/1110 | 0/0 | n/n | 65 | 159 |
| /ar/duroos/lesson/shuwayir-rawd | 200/200 | 1214/996 | 0/0 | n/n | 41 | 84 |
| /duroos/lesson/shuwayir-wasitiyyah | 200/200 | 1200/1057 | 0/0 | n/n | 38 | 132 |
| /ar/duroos/lesson/shuwayir-wasitiyyah | 200/200 | 1058/1017 | 0/0 | n/n | 28 | 71 |
| /duroos/lesson/tahir-adab | 200/200 | 1039/768 | 0/0 | n/n | 32 | 112 |
| /ar/duroos/lesson/tahir-adab | 200/200 | 1033/993 | 0/0 | n/n | 24 | 58 |
| /duroos/lesson/tahir-fadail | 200/200 | 996/1006 | 0/0 | n/n | 47 | 127 |
| /ar/duroos/lesson/tahir-fadail | 200/200 | 666/805 | 0/0 | n/n | 35 | 69 |
| /duroos/lesson/tuwaijri-kathir | 200/200 | 973/859 | 0/0 | n/n | 32 | 120 |
| /ar/duroos/lesson/tuwaijri-kathir | 200/200 | 1034/966 | 0/0 | n/n | 21 | 58 |
| /duroos/lesson/quba-ghamidi-aqidah | 200/200 | 1012/1087 | 0/0 | n/n | 33 | 108 |
| /ar/duroos/lesson/quba-ghamidi-aqidah | 200/200 | 1009/812 | 0/0 | n/n | 22 | 52 |
| /duroos/lesson/quba-humaid-baqarah | 200/200 | 1076/1028 | 0/0 | n/n | 41 | 124 |
| /ar/duroos/lesson/quba-humaid-baqarah | 200/200 | 1145/918 | 0/0 | n/n | 24 | 56 |
| /duroos/lesson/quba-ruh-wasiyyah | 200/200 | 1048/961 | 0/0 | n/n | 68 | 152 |
| /ar/duroos/lesson/quba-ruh-wasiyyah | 200/200 | 927/930 | 0/0 | n/n | 35 | 75 |
| /duroos/lesson/quba-maher-sirah | 200/200 | 1223/1160 | 0/0 | n/n | 48 | 130 |
| /ar/duroos/lesson/quba-maher-sirah | 200/200 | 1147/968 | 0/0 | n/n | 29 | 65 |
| /duroos/lesson/quba-ghamidi-aqidah2 | 200/200 | 1189/998 | 0/0 | n/n | 33 | 108 |
| /ar/duroos/lesson/quba-ghamidi-aqidah2 | 200/200 | 1076/941 | 0/0 | n/n | 22 | 52 |
| /duroos/lesson/quba-sarhan-ashrat | 200/200 | 925/960 | 0/0 | n/n | 57 | 139 |
| /ar/duroos/lesson/quba-sarhan-ashrat | 200/200 | 867/864 | 0/0 | n/n | 36 | 69 |
| /duroos/lesson/quba-suhaymi-arjuzah | 200/200 | 863/1359 | 0/0 | n/n | 51 | 131 |
| /ar/duroos/lesson/quba-suhaymi-arjuzah | 200/200 | 1166/1636 | 0/0 | n/n | 57 | 90 |
| /duroos/lesson/quba-shamani-ayat | 200/200 | 1189/959 | 0/0 | n/n | 66 | 148 |
| /ar/duroos/lesson/quba-shamani-ayat | 200/200 | 1466/960 | 0/0 | n/n | 52 | 89 |
| /duroos/lesson/quba-battin-bulugh | 200/200 | 549/501 | 0/0 | n/n | 89 | 167 |
| /ar/duroos/lesson/quba-battin-bulugh | 200/200 | 903/997 | 0/0 | n/n | 68 | 100 |
| /duroos/lesson/quba-hujayli-lulu | 200/200 | 516/524 | 0/0 | n/n | 71 | 157 |
| /ar/duroos/lesson/quba-hujayli-lulu | 200/200 | 1414/1020 | 0/0 | n/n | 45 | 78 |
| /duroos/lesson/quba-hujayli-sullam | 200/200 | 492/474 | 0/0 | n/n | 43 | 129 |
| /ar/duroos/lesson/quba-hujayli-sullam | 200/200 | 970/927 | 0/0 | n/n | 82 | 115 |
| /duroos/lesson/quba-khuja-arbaun | 200/200 | 478/528 | 0/0 | n/n | 39 | 116 |
| /ar/duroos/lesson/quba-khuja-arbaun | 200/200 | 1358/1019 | 0/0 | n/n | 23 | 56 |
| /duroos/lesson/quba-luhaydan-zad | 200/200 | 476/564 | 0/0 | n/n | 58 | 145 |
| /ar/duroos/lesson/quba-luhaydan-zad | 200/200 | 1375/971 | 0/0 | n/n | 45 | 86 |
| /duroos/lesson/quba-omar-adab | 200/200 | 1148/947 | 0/0 | n/n | 90 | 171 |
| /ar/duroos/lesson/quba-omar-adab | 200/200 | 1116/881 | 0/0 | n/n | 64 | 96 |
| /duroos/lesson/uni-maher-sequence | 200/200 | 1080/956 | 0/0 | n/n | 43 | 161 |
| /ar/duroos/lesson/uni-maher-sequence | 200/200 | 1136/937 | 0/0 | n/n | 22 | 88 |
| /duroos/lesson/quba-ruh-jawami | 200/200 | 465/432 | 0/0 | n/n | 59 | 141 |
| /ar/duroos/lesson/quba-ruh-jawami | 200/200 | 1094/901 | 0/0 | n/n | 36 | 72 |
| /duroos/lesson/quba-ruh-kabair | 200/200 | 594/493 | 0/0 | n/n | 40 | 130 |
| /ar/duroos/lesson/quba-ruh-kabair | 200/200 | 1478/1071 | 0/0 | n/n | 21 | 61 |
| /duroos/lesson/quba-sufi-hamawiyyah | 200/200 | 1014/956 | 0/0 | n/n | 52 | 130 |
| /ar/duroos/lesson/quba-sufi-hamawiyyah | 200/200 | 1261/998 | 0/0 | n/n | 25 | 60 |
| /duroos/lesson/quba-tuwaijri-ilm | 200/200 | 936/986 | 0/0 | n/n | 64 | 147 |
| /ar/duroos/lesson/quba-tuwaijri-ilm | 200/200 | 1249/971 | 0/0 | n/n | 45 | 79 |
| /duroos/lesson/uni-saadi-kafi | 200/200 | 546/546 | 0/0 | n/n | 28 | 147 |
| /ar/duroos/lesson/uni-saadi-kafi | 200/200 | 1308/1084 | 0/0 | n/n | 18 | 84 |
| /duroos/lesson/hijrah-tariq-fath | 200/200 | 645/623 | 0/0 | n/n | 81 | 176 |
| /ar/duroos/lesson/hijrah-tariq-fath | 200/200 | 1446/831 | 0/0 | n/n | 48 | 90 |
| /duroos/lesson/abadr-tafsir | 200/200 | 1024/1020 | 0/0 | n/n | 30 | 128 |
| /ar/duroos/lesson/abadr-tafsir | 200/200 | 1324/979 | 0/0 | n/n | 19 | 66 |
| /duroos/lesson/quba-husaini-tafsir | 200/200 | 472/464 | 0/0 | n/n | 78 | 156 |
| /ar/duroos/lesson/quba-husaini-tafsir | 200/200 | 1071/1015 | 0/0 | n/n | 54 | 85 |
| /duroos/lesson/abadr-tawhid | 200/200 | 572/510 | 0/0 | n/n | 93 | 191 |
| /ar/duroos/lesson/abadr-tawhid | 200/200 | 1238/946 | 0/0 | n/n | 56 | 103 |
| /duroos/lesson/hijrah-qahtani-tawhid | 200/200 | 1003/854 | 0/0 | n/n | 45 | 137 |
| /ar/duroos/lesson/hijrah-qahtani-tawhid | 200/200 | 1246/1021 | 0/0 | n/n | 23 | 65 |
| /duroos/lesson/balawi-ghalib-ubudiyyah | 200/200 | 479/459 | 0/0 | n/n | 43 | 153 |
| /ar/duroos/lesson/balawi-ghalib-ubudiyyah | 200/200 | 999/804 | 0/0 | n/n | 19 | 69 |
| /duroos/lesson/balawi-saidi-tahrir | 200/200 | 715/528 | 0/0 | n/n | 49 | 159 |
| /ar/duroos/lesson/balawi-saidi-tahrir | 200/200 | 1343/1004 | 0/0 | n/n | 24 | 74 |
| /ask/student-discounts | 200/200 | 664/705 | 0/0 | n/n | 59 | 167 |
| /ask/duroos-english | 200/200 | 642/620 | 0/0 | n/n | 56 | 167 |
| /ask/drive-on-visit-visa | 200/200 | 624/673 | 0/0 | n/n | 43 | 167 |
| /ask/bank-account-without-iqama | 200/200 | 656/725 | 0/0 | n/n | 64 | 167 |
| /ask/do-i-register-for-duroos | 200/200 | 806/648 | 0/0 | n/n | 58 | 167 |
| /ask/how-to-apply-iu | 200/200 | 711/730 | 0/0 | n/n | 67 | 167 |
| /ask/home-internet-no-iqama | 200/200 | 675/768 | 0/0 | n/n | 59 | 167 |
| /ask/join-mesh-group | 200/200 | 628/662 | 0/0 | n/n | 53 | 167 |
| /ask/rawdah-booking | 200/200 | 657/879 | 0/0 | n/n | 41 | 167 |
| /ask/stipend-amount | 200/200 | 724/698 | 0/0 | n/n | 50 | 167 |
| /ask/monthly-budget | 200/200 | 695/646 | 0/0 | n/n | 61 | 167 |
| /ask/leaving-steps | 200/200 | 697/660 | 0/0 | n/n | 52 | 167 |
| /ask/etimad-what-for | 200/200 | 733/724 | 0/0 | n/n | 51 | 167 |
| /ask/tajeel-vs-itithaar | 200/200 | 619/729 | 0/0 | n/n | 67 | 167 |
| /ask/muqarrarat | 200/200 | 692/677 | 0/0 | n/n | 55 | 167 |
| /ask/mahad-books | 200/200 | 790/717 | 0/0 | n/n | 65 | 167 |
| /ask/learn-arabic-before-iu | 200/200 | 683/661 | 0/0 | n/n | 86 | 167 |
| /ask/sisters-study | 200/200 | 670/622 | 0/0 | n/n | 67 | 167 |
| /guides/drivers-license | 200/200 | 693/705 | 0/0 | n/n | 68 | 102 |
| /guides/finding-an-apartment | 200/200 | 577/635 | 0/0 | n/n | 41 | 96 |
| /guides/visas-for-family-and-visitors | 200/200 | 714/629 | 0/0 | n/n | 52 | 136 |
| /guides/everyday-apps-and-services | 200/200 | 672/645 | 0/0 | n/n | 41 | 111 |
| /guides/umrah-rawdah-quba | 200/200 | 628/696 | 0/0 | n/n | 54 | 79 |
| /guides/kindergartens-and-schools | 200/200 | 669/640 | 0/0 | n/n | 58 | 87 |
| /guides/etimad-account | 200/200 | 683/685 | 0/0 | n/n | 64 | 128 |
| /guides/getting-around | 200/200 | 635/750 | 0/0 | n/n | 52 | 81 |
| /guides/sim-internet-bank | 200/200 | 663/654 | 0/0 | n/n | 55 | 106 |
| /guides/restaurants | 200/200 | 631/734 | 0/0 | n/n | 26 | 55 |
| /guides/cost-of-living | 200/200 | 715/839 | 0/0 | n/n | 47 | 99 |
| /guides/arabic-learning-resources | 200/200 | 669/678 | 0/0 | n/n | 40 | 98 |
| /guides/course-descriptions-aqeedah-dawah | 200/200 | 836/722 | 0/0 | n/n | 54 | 100 |
| /guides/postgraduate-admission-1448 | 200/200 | 859/696 | 0/0 | n/n | 70 | 152 |
| /guides/graduating-from-mahad | 200/200 | 836/708 | 0/0 | n/n | 53 | 121 |
| /guides/graduate-procedures | 200/200 | 687/705 | 0/0 | n/n | 89 | 158 |
| /guides/sisters-studying-in-madinah | 200/200 | 753/762 | 0/0 | n/n | 77 | 144 |
| /guides/kids-activities | 200/200 | 662/662 | 0/0 | n/n | 64 | 113 |
| /guides/childbirth-options | 200/200 | 935/727 | 0/0 | n/n | 68 | 134 |
| /guides/starting-a-business | 200/200 | 788/762 | 0/0 | n/n | 50 | 150 |
| /guides/sports-and-martial-arts | 200/200 | 683/764 | 0/0 | n/n | 49 | 105 |
| /guides/emergency-numbers | 200/200 | 709/703 | 0/0 | n/n | 48 | 81 |
| /guides/tajeel-and-itithaar | 200/200 | 670/720 | 0/0 | n/n | 59 | 168 |
| /guides/university-calendar-1448 | 200/200 | 796/710 | 0/0 | n/n | 34 | 96 |
| /guides/new-student-steps | 200/200 | 757/702 | 0/0 | n/n | 81 | 152 |
| /ar | 404/404 | 464/641 | 1/1 | n/n | 21 | - |
| /search?q=test | 200/200 | 778/693 | 0/0 | n/n | 21 | 115 |
| /this-page-does-not-exist-xyz | 404/404 | 486/472 | 1/1 | n/n | 21 | - |
| /ar/this-does-not-exist | 404/404 | 485/510 | 1/1 | n/n | 21 | - |
| /duroos/lesson/does-not-exist | 404/404 | 1177/940 | 1/1 | n/n | 34 | 167 |
