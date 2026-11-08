# MESH frontend audit (medinahub.org), 8 Nov 2026

Worktree: `.claude/worktrees/mesh-website-audit-73b810` at 4c156d6 (same commit as the main checkout).
Paths below are relative to `src/` unless they start with `public/` or the repo root.

How this was checked: every file in `app/(site)`, `app/(ar)`, root app files, `components/**`, `features/**` (not admin), the listed `lib/**` files, `public/**` and `globals.css` was read in full. `npx tsc --noEmit` passed (exit 0) and `npx vitest run` passed (41 files, 279 tests). **`next build` was NOT run**: a dev server from the main checkout was already listening on :3000 (plus a `next start` from another worktree), so the brief said not to. There is no route table or bundle-size table in this report for that reason. Instead the running dev server (same commit) was used to fetch real HTML, the sitemap and the manifest, and the in-app browser measured overflow, tap targets and layout shift at 360, 390 and 1440 px. Dev-mode HTML is larger than production HTML, so sizes below are relative, not absolute.

Note: during the session the dev server started answering 500 ("Jest worker encountered 2 child process exceptions") for every dynamic `[slug]` route, English and Arabic alike. That is the static-paths worker of the running dev server failing, not a code fault. Those routes were judged from code only.

## What is good

The structure is clean. Arabic and English pages are thin route files over shared feature components (`features/duroos/routes.tsx` builds both locales from one factory), so there is very little duplicated UI. `<html lang dir>` is correct on both trees (`lang="ar" dir="rtl"` verified in served HTML), and there is a skip link, a `main` landmark, labelled `nav`s and exactly one `h1` on every page fetched. Light theme is the default with no `prefers-color-scheme` leak (`globals.css:7-73`, dark only under `[data-theme=dark]`), the theme script runs before paint, and reduced motion turns off animations, view transitions and the gate glint. Fonts are self-hosted through `next/font` with `display: swap` and subsets. There are no em or en dashes anywhere in code or copy. Of the 196 source files checked, every hard-coded internal link to a guide, FAQ, programme, library, shaykh or lesson slug resolves to a URL in the live sitemap. Old URLs are 301'd. `library-books.json` (249 KB, 1,682 files) is imported only by server components and never reaches the client. YouTube embeds in programme pages and guides are click-to-load on the nocookie domain. No page overflows horizontally at 360 or 390 px (measured on `/`, `/ar/duroos`, `/duroos/schedule`, `/guides/start-a-company-in-saudi`). The tap-target base rule in `globals.css:429-437` lifts most pills to 40 px.

Counts: **Critical 1, High 7, Medium 16, Low 12.**

---

## Critical

### C1. "Coming up" renders client-only, causing a 0.54 layout shift on phones and missing from the HTML
- **Where:** `features/home/KeyDates.tsx:24-31`, used on the home page at `features/home/HomePage.tsx:33`
- **What:** `KeyDates` is a client component. It returns a fixed `h-64` (256 px) empty placeholder until `useEffect` sets `now`. On a 390 px viewport the real section is **1,051 px** tall. Measured with a PerformanceObserver on the running site: **CLS = 0.541** at 390x844, more than five times Google's "poor" threshold of 0.25. All content below it (today's duroos, updates, guides) jumps about 800 px after hydration. The section is also absent from the server HTML, so crawlers and no-JS readers never see the key dates. It also re-renders all three cards every second (`setInterval(..., 1000)`, line 28), although only the seconds digits change.
- **Fix:** Render the section on the server. `keyDatesState(new Date())` at request or ISR time is accurate to the day. Move only the ticking `days/hours/min/sec` block into a small client child that hydrates with the server's value. As a stopgap, give the placeholder breakpoint heights that match the real layout (about 1050 px under `md`, about 470 px at `xl`).
- **Size:** M

---

## High

### H1. hreflang is missing on English pages, not reciprocal, and wrong on the home page
- **Where:** `app/(site)/layout.tsx:22`; English page metadata such as `app/(site)/guides/page.tsx:11`, `programs/page.tsx:7`, `library/page.tsx:10`, `ask/page.tsx:11`, `discounts/page.tsx:10`, `more/page.tsx:7`, `programs/[slug]/page.tsx:16`
- **What:** Next merges metadata shallowly (`node_modules/next/dist/docs/.../generate-metadata.md:1346`), so a page's `alternates: { canonical }` replaces the layout's `alternates.languages`. Verified in served HTML:
  - `/guides`, `/programs`, `/library`, `/ask`, `/discounts` and `/more` have no hreflang at all.
  - `/ar/guides`, `/ar/programs` and the other Arabic pages declare `hreflang="en"` pointing back at those English pages.
  - Search engines ignore hreflang that is not returned by the other page, so the Arabic pages get no language pairing.
  - The home page has **no canonical** and declares `hreflang="ar" → /ar/duroos`, but `/ar/duroos` declares its English pair as `/duroos`, not `/`.
  - Only the duroos pages (`features/duroos/routes.tsx:17-22`) and the sisters page are paired correctly.
- **Fix:** Add one helper, for example `pairAlternates(enPath, arPath, locale)`, that returns `{ canonical, languages: { en, ar, "x-default": en } }`. Use it in every English and Arabic page that has a counterpart. Give the home page `canonical: "/"`. Point its `ar` pair at the page `/ar` really serves, or drop the pair until an Arabic home exists. Add a test that fetches the metadata of each pair and checks they point at each other.
- **Size:** M

### H2. Remote image URLs break `next/image` (no `images.remotePatterns`)
- **Where:** `features/duroos/ShaykhBadge.tsx:21`, `features/duroos/DetailPages.tsx:273`, `next.config.ts` (no `images` key). The admin form invites https URLs: `features/admin/duroos/ShaykhForm.tsx:38` (placeholder `https://… or /shaykhs/…`), and `server/admin/duroos.ts:199` accepts any announcement `imageUrl`.
- **What:** Every seeded photo is local (`/images/*.png`, `/shaykhs/*.webp`). However, the admin UI accepts external URLs, and next/image only optimises remote hosts listed in `images.remotePatterns` (docs `01-getting-started/12-images.md:207`). In development a non-allowed host throws while rendering. In production the optimiser refuses it, so the shaykh photo (lesson and shaykh pages) or the announcement flyer shows as a broken image.
- **Fix:** Either restrict the admin fields to site-relative paths with a zod `.startsWith("/")` check, or add `images.remotePatterns` for the storage host you use. As a fallback, pass `unoptimized` when `src` starts with `http`. Also set `images.qualities`, which Next 16 requires when non-default qualities are used (`image.md:713`).
- **Size:** S

### H3. Arabic 404s are English, and Arabic dynamic routes fall back to the English not-found page
- **Where:** `app/global-not-found.tsx:6-10`; there is no `app/(ar)/ar/not-found.tsx`; `app/(site)/not-found.tsx` belongs to the English tree only
- **What:** Verified: `/ar/nonexistent` returns 404 with `<html lang="en">` and no `dir`, an English title and English links to `/duroos`. A missing Arabic guide, FAQ, lesson or programme calls `notFound()` inside the Arabic layout with no Arabic not-found file, so it gets the same English page. The global page also has no header, so there is no search or language switch.
- **Fix:** Add `app/(ar)/ar/not-found.tsx`, a copy of the English one with Arabic copy and `/ar/...` links. In `global-not-found.tsx`, read the path with `headers()` or use a tiny client check, and render Arabic plus `dir="rtl"` for `/ar/*`.
- **Size:** S

### H4. The focus ring is almost invisible on the green bands
- **Where:** `app/globals.css:169-173` (`outline: 2px solid var(--accent)`, `--accent: #a87a22`)
- **What:** Contrast of the focus outline against brand green `#145c3e` is **2.08:1**, below the 3:1 that WCAG 1.4.11 requires for non-text indicators. That green is behind every `PageBand`, the hero, the guide, lesson, shaykh and programme headers, the footer (`#0e4630`) and the KeyDates Islamic card. All the links and chips in those bands (breadcrumbs, the stage and section chips at `ContentPages.tsx:169`, `mahad/page.tsx:65` and `LibraryPage.tsx:288`, the day-arc buttons, footer links) are effectively unfocusable by sight. Against the light background it is 3.55:1, which passes.
- **Fix:** Use a two-colour ring that works on both: `outline: 2px solid var(--gold-bright); box-shadow: 0 0 0 4px var(--bg)`. Or set `.lattice :focus-visible, footer :focus-visible { outline-color: var(--gold-bright) }`; gold on green is 4.05:1 and on the footer 5.5:1.
- **Size:** S

### H5. The search palette is not an accessible dialog or combobox
- **Where:** `features/search/SearchUI.tsx:166-218`
- **What:**
  - It is `role="dialog" aria-modal="true"`, but Tab moves focus behind the overlay (there is no focus trap).
  - Focus is not returned to the trigger button on close.
  - Escape only works while focus is in the input (line 180).
  - Arrow keys move a visual `data-active` cursor (line 81), but the input has no `role="combobox"`, `aria-controls`, `aria-expanded` or `aria-activedescendant`, and results have no `role="option"`, so screen-reader users hear nothing as they arrow.
  - Result count and "Loading search..." are not in a live region.
  - The close button is `size-8` (32 px) at line 186, under the 40 px rule.
- **Fix:** Use a native `<dialog>` with `showModal()`, which gives a focus trap, Escape and inertness for free. Store `document.activeElement` on open and refocus it on close. Add combobox/listbox roles with ids per option and `aria-activedescendant={id of flat[cursor]}`. Wrap the status line in `aria-live="polite"`. Make the close button `size-10`.
- **Size:** M

### H6. Search in Arabic sends readers to English pages
- **Where:** `features/search/SearchUI.tsx:211` (`/search?q=`), `server/search/docs.ts:14-60` (all URLs English), no `app/(ar)/ar/search`
- **What:** The palette on `/ar/*` labels groups in Arabic, but every result URL is an English page: `/duroos/lesson/x`, `/guides/x`, `/programs/x`. Titles are `bookEn`, `nameEn` and so on. "See all results" goes to the English `/search` (and `/ar/search` is a 404, verified). An Arabic reader who searches leaves the Arabic site after one tap. The Arabic popular searches (`SearchUI.tsx:24`) find English titles only through the Arabic `text` field.
- **Fix:** Pass `locale` to `pick()` and rewrite internal URLs that have Arabic counterparts (`/duroos`, `/programs`, `/guides`, `/ask`, `/library`, `/discounts`, `/more`) to `/ar...`, reusing `otherLanguagePath` from `LanguageSwitch.tsx:16`. Show `subtitle` (the Arabic name) as the title for shaykh and dars hits in Arabic. Add `app/(ar)/ar/search/page.tsx` reusing `SearchPage` with `locale`.
- **Size:** M

### H7. The 1,682 library reader pages render on every request and hit the database each time
- **Where:** `app/(site)/library/read/[id]/page.tsx:8-22` (has `revalidate = 3600` but no `generateStaticParams`), `features/library/add-link.ts:5-8`
- **What:** Without cacheComponents, a dynamic segment is only ISR-cached when `generateStaticParams` exists, even if it returns `[]` (docs `generate-static-params.md:58,293`). So `/library/read/[id]` is fully dynamic: each of the 1,682 URLs in the sitemap renders per request, and each render runs `addBookHref`, which calls `getDb()` and reads the help contact. Crawlers walking the sitemap become 1,682 database reads.
- **Fix:** Add `export function generateStaticParams() { return []; }` (ISR on first visit), or return all ids from `fileIndex()` to prebuild them, since the data is static JSON. Cache `getHelpContact` with `unstable_cache` and a tag.
- **Size:** S

---

## Medium

### M1. Time-sensitive data is frozen into ISR HTML
- **Where:**
  - `app/(site)/page.tsx:7` and the `duroos` pages (`revalidate = 60`).
  - `features/home/TodayHero.tsx:49-61` (date, hijri, "N duroos today", "live now").
  - `features/home/HomePage.tsx:22-27` and `:41` ("Last checked X min ago" uses `Date.now()` on the server).
  - `features/duroos/DetailPages.tsx:107-108,162` (lesson page "Today: …" and the adhan time, `revalidate = 60`).
  - `features/home/DuroosByPrayer.tsx:32` (`allDone` / "Finished").
- **What:** ISR serves the stale page to the first visitor after the window and regenerates in the background. On a quiet site at 00:30 the first reader can get yesterday's date, yesterday's prayer times (which also drive the client `NextPrayer` and `DayArc`) and yesterday's live and done states. "Last checked 3 min ago" stays at 3 min for as long as the HTML is cached. The client components never re-derive the day.
- **Fix:** Render relative times on the client from an ISO timestamp, using the existing `useNow` pattern. In `NextPrayer` and `DayArc`, compare `today.date` with `riyadhDateIso(Date.now())` and call `router.refresh()` when they differ. Compute `phase` on the client from `adhanAt`, as `Countdown.tsx` already does.
- **Size:** M

### M2. On the day arc, keyboard Enter never opens a prayer's popover
- **Where:** `features/home/DayArc.tsx:83,147-153`
- **What:** `pointer` starts as `"mouse"` and is only updated in `onPointerDown`. A keyboard Enter or Space fires `click` without a pointer event, so with any lessons after that prayer the button scrolls to `#after-…` instead of opening the list. Keyboard users never see the popover. The popover is `role="dialog"`, but focus is not moved into it, so its links are reachable only by tabbing past later buttons.
- **Fix:** Check `e.detail === 0` (a keyboard click) and open the popover in that case. Drop `role="dialog"` in favour of a disclosure (`aria-controls` on the button, the list in DOM order right after it).
- **Size:** S

### M3. Colour contrast failures for small text
- **Where and measured ratios** (normal text needs 4.5:1):
  - Article links `--accent #a87a22` on white: **3.84** (`globals.css:185`, every guide and FAQ body link).
  - Gold `#e2b23a` text-sm on brand green: **4.05**. "Last verified …" at `features/content/ContentPages.tsx:261`; "Checked …" at `app/(site)/guides/start-a-company-in-saudi/page.tsx:55`; "Best fit" at `features/guides/company/CompanyGuide.tsx:283`.
  - Gold on the sisters pink `#a63d66`: **3.06** (`features/duroos/SistersPage.tsx:53`).
  - `text-white/60` counts on brand: **4.00** (`ContentPages.tsx:171`).
  - `text-white/50` copyright on brand-deep: **3.99** (`components/shell/SiteShell.tsx:139,142`).
  - LiveBadge `--live` on `--cancel-bg` at 10.5 px bold: **4.12** (`features/duroos/StatusTag.tsx:29`).
- **Fix:**
  - Use `--primary` or a darker gold (about `#7a5512`) for `.article a`.
  - Use `text-white/90` instead of gold for small "verified" lines, or bump them to 18 px bold.
  - Change white/50 and white/60 to white/70 (4.83 on brand, 6.2 on brand-deep).
  - Darken `--live` text in the badge to `#b4233f`.
- **Size:** S

### M4. Tap targets under 40 px
- **Measured:**
  - On `/ar/duroos` at 360 px, every dars **book link is 26 px tall**, because the English line is hidden in Arabic (`features/duroos/DarsCard.tsx:37-40`).
  - "Getting settled · Work and business" on the company guide is 20 px (`app/(site)/guides/start-a-company-in-saudi/page.tsx:46`).
- **From code:**
  - LiveBadge link `py-0.5 text-[10.5px]` (`StatusTag.tsx:29-31`).
  - Weather chip `py-0.5` (`features/home/WeatherChip.tsx:64`).
  - Search close `size-8` (`SearchUI.tsx:186`).
  - Company guide steppers `size-9` (`CompanyGuide.tsx:413,415`).
  - Reset buttons `text-xs` (`CompanyGuide.tsx:143,591`).
  - Desktop nav pills `py-2 text-sm`, about 36 px (`components/shell/BottomNav.tsx:68`).
- **Fix:** Add `min-h-10` (or `py-2` plus `inline-flex items-center`) to those controls. On DarsCard give the title link `min-h-10` or make the whole card the link target.
- **Size:** S

### M5. `adhan` is pulled into the client bundle through a constant import
- **Where:** `lib/time/prayer.ts:1,8` (top-level `new Coordinates(...)` side effect); imported for `PRAYERS` by client components `features/home/DayArc.tsx:8`, `features/home/NextPrayer.tsx:7`, `features/duroos/ScheduleBrowser.tsx:8`
- **What:** The client components need only the `PRAYERS` array and the `Prayer` type. The module creates an adhan object at import time and `adhan` declares no `sideEffects: false`, so the bundler cannot drop it, and the whole prayer-time library ships to the home, duroos and schedule pages. This is verified from the import chain; size not measured, since no build was run.
- **Fix:** Move `Prayer` and `PRAYERS` into `lib/time/prayers.ts` with no imports, and re-export them from `prayer.ts`. Make `MADINAH` lazy inside `prayerTimes`.
- **Size:** S

### M6. `minisearch` loads on every page through the header
- **Where:** `features/search/SearchUI.tsx:8` (static import of `createSearch`), mounted in `components/shell/SiteShell.tsx:35`
- **What:** The search engine library is in the shared client bundle of every route, although it is only needed after the palette opens.
- **Fix:** In `loadSearch()` use `const { createSearch } = await import("@/lib/search/engine")`, and keep only the types imported statically.
- **Size:** S

### M7. The company guide is one 645-line client component carrying 28 KB of copy
- **Where:** `features/guides/company/CompanyGuide.tsx:1` (`"use client"`), `features/guides/company/content.ts` (28 KB)
- **What:** The whole article, every section, table and glossary, is shipped as JS and hydrated, although only the checklist ticks, the situation tabs, the questionnaire and the cost calculator are interactive.
- **Fix:** Make `CompanyGuide` a server component and extract `<Checklist>`, `<SituationTabs>`, `<FitQuiz>` and `<CostCalculator>` as small client islands that receive only their slice of `content.ts`.
- **Size:** M

### M8. The live page loads YouTube eagerly and leaves most of the desktop empty
- **Where:** `features/duroos/DetailPages.tsx:300` (`shell max-w-3xl`) and `:308-315` (iframe)
- **What:** `loading="lazy"` has no effect on an iframe above the fold, so every visit to `/duroos/live` loads the YouTube player (about 1 MB of third-party JS), unlike the click-to-load `VideoEmbed` used elsewhere. At 1440 px the page is a 768 px column with large empty areas on both sides (screenshot taken).
- **Fix:** Use a poster plus click-to-play, as `components/VideoEmbed.tsx` does, with `live_stream?channel=` as the src. Lay the page out as `lg:grid-cols-[minmax(0,1fr)_360px]`, with the stream on the left and "For sisters" plus channels on the right, and drop `max-w-3xl`.
- **Size:** S

### M9. `/search` is an empty shell in HTML, narrow on desktop, and indexable
- **Where:** `app/(site)/search/page.tsx:5-20`, `features/search/SearchUI.tsx:224-252`, `app/sitemap.ts:43`
- **What:** Server HTML shows only "Loading search..." (verified at 1440: a 768 px column under a full-width band). The page has no `robots: noindex`, while `/search?q=...` variants canonicalise to `/search`, and `/search` is listed in the sitemap.
- **Fix:** Add `robots: { index: false, follow: true }` and remove it from the sitemap, as `/library/search/page.tsx:5` already does. Render popular searches and section links on the server so the page is useful before JS, and widen to `max-w-5xl` with a two-column result layout at `lg`.
- **Size:** S

### M10. The duroos language link skips the language cookie, and the Arabic bottom nav has two entries for one page
- **Where:** `features/duroos/DuroosNav.tsx:42-49`; `components/shell/BottomNav.tsx:12`; `app/(ar)/ar/page.tsx:5`
- **What:** The "Read in Arabic/English" pill is a plain `<a>` that does not call `rememberLanguage`, unlike the header switch (`components/shell/LanguageSwitch.tsx:38`). It also lacks `hrefLang` and duplicates the header switch that sits a few pixels above it. In Arabic, the "الرئيسية" (Home) item links to `/ar`, which 308-redirects to `/ar/duroos` (verified). Home and Duroos therefore open the same page, Home is never shown as active, and Arabic breadcrumbs "الرئيسية" also bounce through the redirect.
- **Fix:** Delete the DuroosNav language pill, or call `rememberLanguage` and add `hrefLang`. In Arabic, drop the Home item or point it at `/ar/duroos` and swap in Study or Ask for the fifth slot. Point Arabic breadcrumbs directly at `/ar/duroos`.
- **Size:** S

### M11. English leaking into /ar pages
- **Where:**
  - `app/(ar)/ar/programs/[slug]/page.tsx:17`: the Arabic meta description is the English `p.tagline`.
  - `features/library/CoursePages.tsx:21-52`: `CurriculumNote` and `LibrarySearchForm` on `/ar/library` have an English heading, body, placeholder and "Search" button, and post to the English `/library/search`.
  - `features/content/GuideBody.tsx:181-192`: progress text.
  - `features/content/ContentPages.tsx:175`: the Arabic "دليل المعهد" chip links to the English `/mahad` with no note.
  - `features/home/HomePage.tsx`: English only, but only used at `/`, so this one is fine.
- **What:** Some of this is covered by `EnglishNote`, but meta descriptions, form controls and buttons are not body copy.
- **Fix:** Add `taglineAr` to `content/programs.ts`, or at least Arabic meta descriptions. Pass `locale` to `LibrarySearchForm` and `CurriculumNote` with an `L` strings table like `LibraryPage.tsx:274`. Mark the `/mahad` chip with `hrefLang="en"` and "(بالإنجليزية)".
- **Size:** M

### M12. Arabic headings use Amiri with a line height of about 1.0
- **Where:** `app/globals.css:104-107` (Arabic `--font-heading` is Amiri); `components/ui/index.tsx:54` (`leading-[1.05]`); `features/home/TodayHero.tsx:77` (`leading-[1.02]`); `features/content/ContentPages.tsx:256`
- **What:** Amiri's ascenders, descenders and diacritics need about 1.4 to 1.6. With `leading-[1.05]`, two-line Arabic titles in PageBand and the hero overlap or clip harakat. This is verified in CSS; a two-line wrap was not screenshotted.
- **Fix:** Add `:root[lang="ar"] :is(h1,h2,.font-heading) { line-height: 1.45 }`, or `rtl:leading-snug` on those headings.
- **Size:** S

### M13. Manifest, icons and theme colours do not match the brand and are inconsistent
- **Where:**
  - `app/manifest.ts:10-11`: `theme_color #1e4d3b`, `background_color #f6f1e7`.
  - `app/icon.tsx:9` and `app/apple-icon.tsx:9`: `#1e4d3b` and `#d9b76c`, a serif "M".
  - Both layouts set `themeColor: "#f6f1e7"`: `app/(site)/layout.tsx:26`, `app/(ar)/ar/layout.tsx:19`.
  - `--bg` is `#f8f6f1` (`globals.css:10`).
- **What:**
  - The brand colours are `#145c3e` and `#e2b23a`, and the OG image uses them correctly.
  - The installed-app colours are an older green and gold, and the icon is not the heavy white MESH wordmark.
  - Three different "background" values are in use.
  - The manifest has no `id`, `scope`, `lang` or `dir`, no 192 px icon, no `maskable` icon, and no screenshots (verified served manifest).
  - The service worker has no fetch handler (`public/sw.js`), so there is no offline page. It is registered only when someone turns on alerts (`features/duroos/AlertsButton.tsx:42`).
- **Fix:**
  - Generate icons from the wordmark: white heavy "MESH" plus a gold bar on `#145c3e`. Provide 192, 512 and a maskable 512 with safe padding, and a monochrome badge for `sw.js:10`.
  - Set `theme_color: "#145c3e"` and `background_color: "#f8f6f1"`, and match `viewport.themeColor` to `--bg`.
  - Add `id: "/"`, `scope: "/"`, `lang: "en"`.
  - Optionally add a cached offline fallback page.
- **Size:** M

### M14. Hard-coded "checked" and "published" dates that will go stale
- **Where:**
  - `app/(site)/mahad/page.tsx:96`: "Last checked 8 November 2026".
  - `app/sitemap.ts:33`: `lastModified: new Date("2026-11-08")`.
  - `app/(site)/guides/start-a-company-in-saudi/page.tsx:33-34`: `datePublished` and `dateModified` "2026-11-08".
  - `features/content/UniversityCalendar.tsx:250`: SSR fallback `"2026-11-01"`.
- **What:** These dates live in code, separate from the content they describe, and they conflict with the "temporary info must expire" rule.
- **Fix:** Move them to one constant per page next to the content (as `CHECKED` in the company guide already is) and use it in all three places. For the calendar, SSR with `Date.now()` rounded to the day, since the page is ISR anyway.
- **Size:** S

### M15. Sitemap: thin pages, sparse lastmod, Arabic pairs only for duroos
- **Where:** `app/sitemap.ts:21-50`; verified output has 1,994 URLs
- **What:**
  - 1,682 of the 1,994 URLs (84%) are `/library/read/{id}`: a Google Drive iframe plus a file name, very thin pages that dilute crawl budget.
  - Only 101 entries carry `<lastmod>`.
  - Arabic `alternates` exist only for duroos; `/ar/programs`, `/ar/guides`, `/ar/library` and the rest are listed with no pairing (line 37).
  - Priorities print as `0.7000000000000001` (`priority - 0.1`, line 23).
- **Fix:**
  - Drop the reader pages from the sitemap and keep the 8 collection pages, or add `robots: noindex, follow` on the reader page.
  - Add `alternates.languages` for every page with an Arabic twin.
  - Round priorities (`Math.round((p - 0.1) * 10) / 10`).
  - Use guide and FAQ `updatedAt` and programme `checked` everywhere they exist.
- **Size:** S

### M16. Structured data: duplicated FAQPage, Article without image, deprecated HowTo
- **Where:** `features/content/ContentPages.tsx:71-77,111-116,223-241`; `app/(site)/guides/start-a-company-in-saudi/page.tsx:25-40`
- **What:**
  - The same question appears in a FAQPage on `/ask` (all questions), on `/ask/{slug}`, and again on `/ar/ask` and `/ar/ask/{slug}` (English text). Google wants a FAQ marked up on one page only.
  - `Article` has no `image`, which Article rich results require.
  - `HowTo` rich results were withdrawn by Google in 2023.
  - Breadcrumb JSON-LD starts at "Guides" and "Ask" without Home.
  - There is no `Event` markup for duroos; that is acceptable for recurring lessons, so not recommended.
- **Fix:**
  - Keep FAQPage only on `/ask/{slug}` and use `ItemList` on `/ask`. Skip JSON-LD on `/ar/ask*`, which canonicalise to English anyway.
  - Add `image: abs("/opengraph-image")` to Article.
  - Drop `HowTo` from the `@type` arrays.
  - Prepend `["Home", "/"]` to `breadcrumbs()`.
- **Size:** S

---

## Low

### L1. Dead code and unused assets
- **Where:**
  - `components/shell/WhatsApp.tsx:11-29` (`WhatsAppBanner`, 0 uses).
  - `components/ui/index.tsx:4-29,40-47` (`Section`, `PageTitle`, 0 uses).
  - `features/programs/AudienceFilter.tsx:204-206` injects a `<style>` that duplicates `globals.css:421-425`.
  - `app/(ar)/ar/opengraph-image.tsx` is byte-identical to `app/(site)/opengraph-image.tsx`.
  - `public/mesh-hero.mp4` (4.8 MB), `public/mesh-hero-poster.jpg`, `public/images/mesh/*.jpg` (5 files) and `public/images/abdussalam-ash-shuwayir.png` are referenced nowhere in `src`.
- **Fix:** Delete them. Make the Arabic OG file `export { default, size, contentType, alt } from "../../(site)/opengraph-image"`, as `guides/[slug]/opengraph-image.tsx` already does. Keep either the CSS rules or the injected style, not both.
- **Size:** S

### L2. Physical left/right in hero and popover CSS
- **Where:** `app/globals.css:331,333` (`.sky-masjid` with `left: 34%` and `right: 4%`), `:373-375` (`.arc-pop` `left`/`right`), `components/VideoEmbed.tsx:25` (`left-1/2`, centred, fine)
- **What:** The hero is also rendered on `/ar/duroos` (`features/duroos/DuroosToday.tsx:13`). The gate already uses `inset-inline-start`, but the masjid silhouette does not mirror. The popovers are correct, because `xPct` mirrors positions.
- **Fix:** Use `inset-inline-start: 34%` and `inset-inline-end: 4%`.
- **Size:** S

### L3. Tabs component misses the roving tabindex and RTL arrow mapping
- **Where:** `components/Tabs.tsx:23-37`
- **What:** All tabs stay in the Tab order, and ArrowRight always means "next" even on Arabic programme pages, where next is to the left.
- **Fix:** Set `tabIndex={active===t.id?0:-1}`, add Home and End keys, and swap the arrows when `document.dir === "rtl"`.
- **Size:** S

### L4. Reader breadcrumbs all point at the same anchor
- **Where:** `features/library/CoursePages.tsx:165`
- **What:** Every intermediate crumb links to `#f-${path[1].id}` (the level), even the subject crumb.
- **Fix:** Use `#f-${p.id}` per crumb, and add matching ids on `FolderCard` roots.
- **Size:** S

### L5. The home page h1 is a Hijri date
- **Where:** `features/home/TodayHero.tsx:77-79`
- **What:** The only h1 on `/` is, for example, "17 Jumada al-Ula 1448". Search engines and screen-reader users get no statement of what the site is.
- **Fix:** Keep the date visually large, but make it a `p`. Add an h1 such as "Today in Madinah: duroos, prayer times and student guides", visible or `sr-only`.
- **Size:** S

### L6. No privacy page while visitor tracking is on
- **Where:** `components/shell/Tracker.tsx:27-34,80-85` (stores `mesh_vid` and `mesh_sid` in localStorage and sends path, referrer, width and language); `lib/redirects.ts:31` (`/privacy` redirects to `/more`)
- **What:** The data is anonymous, but there is nowhere that says what is collected. The footer has no privacy link.
- **Fix:** Add a short `/privacy` section, for example `/more#privacy`, and a footer link.
- **Size:** S

### L7. Scroll reveal applies to every card in `main`
- **Where:** `app/globals.css:460-468`
- **What:** Every `.card` and `.lift` (FAQ rows, library rows, schedule cells) gets a view-timeline animation. On long pages such as `/library/sharia` that is hundreds of animated elements. It is cheap per element but adds up on low-end phones, and content is at opacity 0 until scrolled.
- **Fix:** Limit it to `.reveal` and top-level section cards, and exclude `.lift` inside lists.
- **Size:** S

### L8. 12 en dashes in library file titles are displayed raw
- **Where:** `content/library-books.json` (for example "الميسر في غريب القرآن - الجزء الأول"), rendered by `features/library/CoursePages.tsx:61,170,193`
- **What:** Code and copy have no dashes, but crawled file names do.
- **Fix:** Pass `f.t` through `cleanText(…, "ar")` from `lib/text.ts:39` at render time, or in the crawl script.
- **Size:** S

### L9. llms.txt omits sections and decodes only some entities
- **Where:** `lib/llms.ts:5-14,155-185`
- **What:** `/mahad`, `/programs` (index), `/duroos/sisters` and `/guides/start-a-company-in-saudi` (when it is not a DB row) are missing. `text()` decodes only `&amp;` and `&quot;`, so `&#39;` and `&nbsp;` leak into llms-full.txt.
- **Fix:** Add the missing links, and decode with `node-html-parser`'s `.text`, which is already a dependency.
- **Size:** S

### L10. Footer and inline links are under 40 px on phones
- **Where:** `components/shell/SiteShell.tsx:103` (footer `Link`s) and inline `text-sm` links
- **What:** The coarse-pointer padding hack (`globals.css:432`) skips any anchor whose class contains `p-`, `m-`, `bg-`, `flex` and so on. Most footer and breadcrumb links have `transition` or `rounded` classes that exclude them.
- **Fix:** Give footer links `inline-flex min-h-10 items-center`, and breadcrumbs `py-2`.
- **Size:** S

### L11. No component tests
- **Where:** `tests/` (41 files, all lib, server and route logic)
- **What:** There are no render tests for `SearchPalette`, `DayArc`, `Tabs`, `LanguageSwitch` or `KeyDates`. There are no tests for hreflang reciprocity, link integrity or not-found locale. Those are where H1, H3, H5 and M2 live.
- **Fix:** Add a `metadata pairs` test that imports each route's `metadata` or `generateMetadata` and checks the alternates both ways. Add a link test that scans source for `/guides|ask|programs/...` and checks the slugs against the seed. Add `@testing-library/react` tests for keyboard paths in `DayArc`, `Tabs` and `SearchPalette`.
- **Size:** M

### L12. The Arabic layout has no site JSON-LD and no Twitter defaults
- **Where:** `app/(ar)/ar/layout.tsx:11-16` vs `app/(site)/layout.tsx:12-23,43`
- **What:** Arabic pages lack the Organization and WebSite graph and `twitter.card`. Twitter falls back to og tags, which is fine, but the absent `applicationName` and `appleWebApp` mean adding the Arabic site to the home screen gets the default title.
- **Fix:** Share one `baseMetadata` object between both layouts.
- **Size:** S

---

## Checked and found fine
- **Fonts:** `app/fonts.ts`, self-hosted by next/font, `display: swap`, subset.
- **Raw `<img>`:** used only for YouTube thumbnails (`VideoEmbed.tsx:23`, `GuideBody.tsx:148`), which is reasonable.
- **next/image:** used for shaykh photos and flyers.
- **Deprecated APIs:** none found. `experimental.globalNotFound`, `proxy.ts`, `ViewTransition` from React and the `template.tsx` pattern match the bundled docs.
- **Robots:** sitemap and robots are correct, `/admin` and `/api/` are disallowed, 404 pages carry `noindex` (verified).
- **OG and Twitter:** og:image and twitter:image are present on every page fetched (file-convention OG image).
- **Overflow:** no horizontal overflow at 360 and 390 px on the pages measured.
- **Wide screens:** at 1440 px the home page fills the 1408 px shell. At 2000 px the shell widens to 1600 px (`globals.css:219`), so only the narrow pages in M8 and M9 leave big empty areas.
- **Contrast that passes:** gold on brand-deep (5.5), white on brand (7.98) and dark-theme muted text (7.4) all pass.
