# MESH ideas: design, PWA, performance, accessibility, SEO and trust

Researcher: design and tech agent, 9 November 2026. Read only; nothing in the repo was changed.

What I checked in the repo: `src/app/globals.css` (tokens, lattice, hero sky, guide steps, motion), `src/app/fonts.ts`, `src/app/manifest.ts`, `public/sw.js`, `src/app/icon.tsx`, the three `opengraph-image.tsx` files, `src/components/ui/index.tsx`, `src/components/shell/*`, JSON-LD usage, `public/` media, and the audits in `docs/audit/` (lighthouse, a11y, arabic, deep-2026-11-08/frontend.md) plus `docs/HANDOFF.md`. I also checked current Google and WebKit facts on the web (sources at the end).

## Where MESH stands today (short baseline)

- Strong already: token-based light "Warm Paper" and dark "Madinah Night" themes; sisters petal variant; the diamond lattice as a CSS mask; a live hero sky tied to prayer times, real moon phase and weather, with Uhud, the Green Dome and the gold gate; view transitions between pages; CSS scroll reveals; reduced motion honoured globally; a gold focus ring on green bands; guide steps with real tick buttons; self-hosted fonts (Bricolage Grotesque, Instrument Sans, Alexandria, Amiri); first-party analytics with page speed and scroll depth; Ctrl K search palette; push alerts; .ics feeds.
- Thin or missing: the service worker only handles push (no offline at all); the manifest has two shortcuts and no maskable, monochrome or screenshot entries; the app icon is a serif letter "M", not the gate mark; one generic share card (guides reuse it); JSON-LD covers WebSite, Organization, Article, FAQPage, BreadcrumbList, VideoObject and a programme, but no Event or Person; no `loading.tsx` or `error.tsx` anywhere and no skeletons; `EmptyState` is a plain dashed card; no print styles; no Web Share, install prompt, app badge or text size control; no `text-wrap` rules; no "was this helpful"; a 4.8 MB `public/mesh-hero.mp4` and five photos in `public/images/mesh/` are not referenced by any code.

Tag format: `type | effort | impact | inspired by`. "Has today" says whether a partial version exists.

---

## A. Visual identity and illustration

1. **One mark everywhere: draw the gate M as the real logo and app icon.** Why: the hero's two-arch gate is the most distinctive thing MESH owns, but the favicon, apple icon and push badge are a generic serif "M" from `icon.tsx`. How for MESH: one SVG mark (two arches whose roofline is the M, gold edge) used for favicon (SVG with a dark variant via `prefers-color-scheme` inside the SVG), maskable 512 icon with the 80% safe zone, a monochrome icon for Android themed icons and the notification badge, and the OG card. Has today: partial (gate exists only in `HeroSky`). `aesthetic | S | high | Apple HIG app icons, Material 3 themed icons, Monzo`

2. **A lattice system with three densities and a "progress" state.** Why: the lattice is only a background on bands today; Linear and Stripe make one motif carry meaning. How for MESH: tokens `--lattice-dense`, `--lattice-soft`, `--lattice-hairline` for bands, card corners and section dividers; a gold diamond that fills as a guide's steps are ticked, and a small diamond row as the progress meter on guide cards. Has today: partial (`.lattice`, `.lattice-soft`). `aesthetic | S | medium | Stripe, Linear`

3. **A custom MESH icon set on a diamond grid for Madinah concepts.** Why: lucide covers generic UI but not a masjid, minbar, kitab, iqama card, Haramain train, Absher, date palm or Uhud; mixed generic icons read as a template. How for MESH: 20 to 30 icons, 24 px grid, 1.75 px stroke matching lucide weight so they sit side by side; used on guide stages, FAQ categories, the day arc and the bottom bar. Has today: no (lucide only). `aesthetic | M | medium | GOV.UK, Airbnb icon system`

4. **Line illustrations of real Madinah places for bands and empty states.** Why: the hero silhouettes (Uhud, minarets, Green Dome) already prove the style; reusing it makes every section feel like Madinah instead of a generic green band. How for MESH: a small library of flat silhouettes in brand green and gold (Quba, Uhud, the IU gate, the Haramain station, palms of Awali), drawn once as SVG components, placed at the bottom edge of `PageBand` per section and in empty states. Has today: partial (hero only). `aesthetic | M | high | Headspace, Calm, Airbnb`

5. **A photography treatment, or remove the unused media.** Why: `mesh-hero.mp4` (4.8 MB) and the `public/images/mesh/*.jpg` photos ship in the repo but nothing uses them. How for MESH: either delete them, or adopt one rule: places only (no faces, nothing inside the Haram prayer areas), green duotone or soft warm grade, served through `next/image` as AVIF, used on guide headers (visa, departure, city). Has today: partial (unused assets). `aesthetic, performance | S | medium | Airbnb, Apple`

6. **Hijri aware seasons: Ramadan mode.** Why: in Ramadan the duroos, prayer times and the night shift completely; Tarteel and Quran.com change tone for the month. How for MESH: driven by the Umm al-Qura date already in `src/lib/time/hijri.ts`; the hero swaps "next adhan" for an iftar and suhoor countdown, the sky leans to the night palette after Maghrib, a quiet crescent in gold on the band, Taraweeh and Qiyam times shown where known, a "Ramadan in Madinah" guide pinned. Purely presentational, no rulings. Has today: no (hero sky is per prayer, not per month). `aesthetic, content | M | high | Tarteel, Quran.com, Google Doodles`

7. **Hijri aware seasons: Dhul Hijjah, Eid, Jumu'ah and exam season.** Why: the same idea for other moments students care about. How for MESH: first ten days of Dhul Hijjah promote the Hajj guide and an Arafah day countdown; Eid day shows Eid prayer timing where known and a calm gold band; Fridays label the hero "Jumu'ah"; exam weeks from the university calendar show an exam period strip linking to the exams guide. Has today: partial (university calendar countdowns exist). `aesthetic, UX | M | medium | Google, Monzo seasonal touches`

8. **Brand page for contributors and the future native app.** Why: several agents and people edit MESH; GOV.UK and Monzo keep the system in one place so it does not drift. How for MESH: an admin only page (or `docs/`) that renders the tokens, type scale, lattice, icons, spacing, motion and do and do not examples straight from the CSS variables, so it never goes stale. Has today: no (tokens live in `globals.css` comments). `operations | S | medium | GOV.UK Design System, Monzo`

9. **Sisters variant everywhere it belongs.** Why: the petal palette is lovely but scoped; sisters land on sisters' marakiz, sisters' guides and women's gates and see the green theme there. How for MESH: apply `data-variant="sisters"` on the sisters study filter result, the "sisters studying in Madinah" guide and future women's gates page, with a small "Sisters" chip so the switch is clear. Has today: partial (`/duroos/sisters`). `aesthetic | S | medium | Airbnb categories`

## B. Typography (English and Arabic)

10. **Arabic body face built for screens, Amiri kept for titles and quotes.** Why: Amiri is a beautiful book Naskh but heavy for headings in UI and the slowest asset on `/ar` (Lighthouse 73). Quran.com and Tarteel keep calligraphic faces for scripture and use a clean screen face for UI. How for MESH: test IBM Plex Sans Arabic or Noto Naskh Arabic against Alexandria at 14 to 16 px on a phone; keep Amiri for book titles in the library, Arabic hadith or ayat quotations and the big Arabic H1; preload only that one weight on `/ar` (audit row 4). Has today: partial (Alexandria body, Amiri headings). `aesthetic, performance | M | high | Quran.com, Tarteel`

11. **Arabic sizing and leading as their own scale.** Why: Arabic at the same px as Latin reads smaller and harakat clip at tight leading. How for MESH: `:root[lang="ar"]` raises body to about 1.06 rem and line height to 1.75; `.ar-text` inside English pages gets the same bump; headings already have 1.4. Has today: partial (heading line height only). `accessibility | S | medium | Quran.com, Apple HIG Arabic`

12. **Fluid type scale and `text-wrap`.** Why: headings break with one orphan word on phones; Vercel and Linear use `text-wrap: balance` on headings and `pretty` on paragraphs. How for MESH: `h1, h2, h3 { text-wrap: balance }`, `.article p { text-wrap: pretty }`, sizes via `clamp()` with one ratio, max reading width 68ch English and 60ch Arabic. Has today: no. `aesthetic | S | medium | Vercel, Linear`

13. **Font metric fallbacks to remove swap jumps.** Why: `display: swap` with no adjusted fallback shifts text when the web font lands, worst for Arabic. How for MESH: `next/font` `adjustFontFallback` for the Latin faces, and a hand tuned `@font-face` fallback (`size-adjust`, `ascent-override`) for Alexandria and Amiri. Has today: partial (Latin default only). `performance | S | medium | web.dev font best practices`

14. **One numeral and plural rule for Arabic.** Why: the audit found "١ دروس"; Arabic has six plural forms. How for MESH: a single `arCount(n, forms)` helper on `Intl.PluralRules("ar")`, and one decision on Arabic Indic or Western digits for times and prices, applied through `Intl.NumberFormat("ar-SA", { numberingSystem })`; unit tested. Has today: partial (PR 16 fixes some cards). `content, accessibility | S | high | Quran.com, Apple localization`

15. **Honorific glyphs that render everywhere.** Why: ﷺ (U+FDFA) and the other honorific ligatures fall back to tofu or a mismatched font on some phones. How for MESH: confirm Amiri carries them, force `.font-arabic` on a small `<Honorific>` component, and use the same form across guides and shaykh pages. Has today: no. `aesthetic | S | low | Quran.com`

## C. Motion and micro-interactions

16. **Motion tokens.** Why: durations and easings are set ad hoc (0.18s, 0.2s, 260ms, 320ms, several curves). How for MESH: `--dur-quick 120ms`, `--dur-base 200ms`, `--dur-slow 320ms`, `--ease-out` and `--ease-spring` on `:root`, reused by `.lift`, popovers, page transitions and reveals. Has today: partial. `aesthetic | S | low | Material 3 motion, Apple HIG`

17. **Finished guide moment.** Why: ticking the last step of the visa or iqama guide is a real milestone; Headspace and Duolingo mark it softly. How for MESH: the final tick fills the gold diamond, the step list collapses to "All 9 steps done" with a reset link, and the guide card on `/guides` shows a full progress ring. Short, no confetti, off with reduced motion. Has today: partial (steps tick and save). `UX, aesthetic | S | medium | Headspace, Things`

18. **Shared element transitions from card to page.** Why: React ViewTransition is already wired; naming elements makes the shaykh photo or guide title morph into the next page, which feels like a native app. How for MESH: `view-transition-name` on the shaykh photo in dar cards and the lesson header, and on guide card titles and the guide H1. Has today: partial (fade and rise only). `aesthetic | S | medium | Arc, Apple`

19. **Rolling digits on countdowns that change once a minute, not every second.** Why: second by second re-renders cost battery and are noisy; Raycast and Apple clocks roll digits. How for MESH: show minutes for anything over an hour, seconds only in the last minute; animate the changed digit with a 200 ms roll; `tabular` already exists. Has today: partial. `aesthetic, performance | S | low | Raycast, Apple Clock`

20. **A richer command palette.** Why: Ctrl K exists; Raycast and Linear make the palette the fastest way to do anything. How for MESH: recent searches on the device, actions (switch language, switch theme, subscribe to calendar, turn on alerts, "message Admin"), and jumps like "after Maghrib today"; built on the native `<dialog>` the audit asks for (H5). Has today: partial. `UX | M | medium | Raycast, Linear, Arc`

21. **Light haptics on Android.** Why: a tiny buzz on tick and on alert subscribe makes the installed app feel physical. How for MESH: `navigator.vibrate?.(8)` behind a feature check, skipped with reduced motion. Has today: no. `UX | S | low | Apple HIG haptics`

22. **Live change animation.** Why: when the watcher cancels a dar, an open page should show it without a reload. How for MESH: poll `/api/v1/duroos/today` every few minutes while visible, then strike through the card with a short fade to the cancelled colour and an `aria-live` notice. Has today: partial (status tags, no live update). `UX | M | high | Linear realtime, Monzo`

## D. Dark mode quality

23. **Three way theme choice: Light, Dark, Match phone.** Why: light stays the default; some readers want the phone to decide at night. How for MESH: the toggle becomes a small menu; "Match phone" sets `data-theme` from `prefers-color-scheme` only when chosen; first visit is still light. Has today: partial (two state toggle). `UX | S | medium | Apple, GitHub`

24. **Dark mode polish pass.** Why: portraits on white PNG backgrounds and flyer JPGs glare on Madinah Night; gold primary on dark needs checked pairs. How for MESH: a soft rounded frame and slight dim (`filter: brightness(.92)`) for raster images in dark, shaykh portraits cut to transparent or AVIF on a card colour, a contrast test across dark tokens (see 61). Has today: partial. `aesthetic | S | medium | Apple HIG dark mode, Material 3`

25. **Library reader themes: paper, sepia, night.** Why: students read long PDFs at night; Kindle, Quran.com and Apple Books let the reader pick a page tone separately from the app. How for MESH: a reader toolbar with three page tones and a font zoom, saved per device, separate from the site theme. Has today: no. `UX, accessibility | M | medium | Quran.com, Apple Books`

## E. Empty, loading and error states

26. **Route skeletons with `loading.tsx`.** Why: there is no `loading.tsx` in the app; on slow mobile data the old page sits until the new one is ready. Next 16 also uses `loading.tsx` as the offline holding state. How for MESH: skeletons that match the real layout for duroos today, the weekly grid, guide pages, the library reader and Ask, using the card shapes and a slow shimmer that stops with reduced motion. Has today: no. `UX, performance | S | high | Linear, Airbnb, Next.js docs`

27. **Empty states that always offer a next step.** Why: `EmptyState` is a dashed card with a line of text. How for MESH: an illustration (from idea 4), one plain sentence, and one action: "No duroos after Fajr today. Tomorrow after Fajr: 3 duroos"; search with no results suggests close spellings and says to message Admin on WhatsApp at +1 234 567 9076. Has today: partial. `UX | S | high | GOV.UK, Airbnb`

28. **`error.tsx` per section with a retry.** Why: there is no error boundary, so a failed fetch shows a blank or the framework default. How for MESH: a calm error card in both languages with "Try again" (`reset()`), a link home and the Admin WhatsApp line; errors are already reported by the Tracker. Has today: no. `UX | S | medium | GOV.UK, Vercel`

## F. Wide screens with no empty areas

29. **Fill the home page right column with a "Next up" rail.** Why: the audit measured about 400 px of empty column beside Today's duroos at 1440. How for MESH: a sticky rail with next prayer, the next dar, the next key date and the latest update, collapsing into the normal flow below 1280. Has today: partial (audit visual row 3 open). `aesthetic, UX | S | high | Linear, Apple Today view`

30. **Bento home on large screens with container queries.** Why: one component that adapts to its box instead of the viewport fills grids without gaps. How for MESH: `@container` on dar cards, update cards and key date cards; at 1280 and up the home becomes a bento grid sized by importance (today large, updates medium, guides small). Has today: partial (some multi column sections). `aesthetic | M | medium | Apple, Vercel dashboards`

31. **Side facts card on programme and short pages.** Why: HANDOFF lists "empty space beside short programme pages". How for MESH: a sticky card with who it is for, fees, duration, place and the application window, plus "Compare" (adds to a tray, see 32). Has today: partial. `UX | S | medium | Airbnb listing sidebar`

32. **Compare tray for institutes and marakiz.** Why: impartial comparison is more useful than any recommendation. How for MESH: tick up to three programmes, open a side by side table of facts only (fees, hours, audience, certificate). Has today: no (audit row 18 asks for sort and compare). `feature | M | high | Apple compare, GOV.UK comparisons`

33. **Split view for duroos on wide screens.** Why: at 1700 px the weekly grid and a lesson page could sit together. How for MESH: on `xl` the schedule opens lesson details in a right pane (URL still changes, parallel or intercepting route), phones keep full pages. Has today: no. `UX | M | medium | Linear, Mail apps`

## G. Micro copy and tone

34. **A written voice guide plus a phrase lint test.** Why: house rules are strict (no dashes, no doubt, no source talk); a dash test exists, the rest relies on memory. How for MESH: one page of voice rules with before and after examples, and a vitest that scans public strings for banned phrases ("we think", "may be", "according to", "please note", "it seems"). Has today: partial (dash test). `content, operations | S | high | GOV.UK style guide, Mailchimp, Monzo tone`

35. **Islamic day aware time words.** Why: the Hijri date changes at Maghrib; students say "tonight after Isha". How for MESH: after Maghrib the hero shows the next Hijri date and labels the evening "Tonight"; times read "after Maghrib, about 17:42" the same way everywhere. Has today: partial. `content, UX | S | medium | Tarteel, Muslim Pro`

36. **Arabic copy pass by a native writer.** Why: translated UI strings read stiff even when correct. How for MESH: one pass over shell strings and section intros with the plural helper (14); a glossary so the same term (Jawazat, iqama, ta'jeel) is always the same word. Has today: partial (arabic audit fixed leaks). `content | M | medium | Quran.com localization`

## H. Installable PWA and offline

37. **An offline first service worker.** Why: `public/sw.js` only shows push; with no signal in the Haram basement or at the Jawazat office the site shows the browser's offline page. How for MESH: precache the shell, fonts and icons; network first with cache fallback for `/`, `/duroos`, `/duroos/schedule` and `/api/v1/duroos/today`; stale while revalidate for guides and FAQs; a branded offline page in both languages; turn on Next 16 `experimental.useOffline` with a small "You are offline, showing the schedule saved at 14:05" banner from `useOffline`. Has today: no. `performance, UX | M | high | web.dev offline cookbook, Next.js offline guide`

38. **Save a guide or a book for offline.** Why: visa and iqama steps are needed exactly where signal is bad; library PDFs are read on the bus. How for MESH: "Save offline" on each guide and book, stored in Cache Storage, with the size shown and a "Saved" list on `/more`; ticked steps already live on the device. Has today: no. `feature | M | high | Spotify downloads, Pocket, Quran.com offline`

39. **A gentle install card, with iOS steps.** Why: installing is required for push on iPhone and makes MESH feel like an app; there is no install prompt code. How for MESH: after a second visit or right after turning on alerts, a dismissible card; Chromium uses `beforeinstallprompt`, iOS gets a three image sheet (Share, Add to Home Screen, Add); never shown again once dismissed. Has today: no. `UX | S | high | web.dev install patterns, Starbucks PWA`

40. **A complete manifest.** Why: the manifest has two icons, two shortcuts and no `id`. How for MESH: add `id`, `scope`, `lang`, `dir`, `categories: ["education"]`, maskable and monochrome icons (1), `screenshots` (narrow and wide, for the richer Android and desktop install sheet), shortcuts for Ask, Guides, Library and Search with icons, `launch_handler: { client_mode: "navigate-existing" }`, and an Arabic manifest for `/ar` installs. Has today: partial. `PWA | S | high | web.dev manifest, Material 3`

41. **Share target for admins.** Why: editors receive flyers and notices on WhatsApp and Telegram; Web Share Target lets an installed MESH appear in the phone's share sheet. How for MESH: `share_target` in the manifest pointing to an admin route that opens the announcement form with the image and text prefilled (signed in only); public visitors who share text get MESH search for it. Has today: no. `operations, PWA | M | high | web.dev share target, Twitter Lite`

42. **App badge for changes since last visit.** Why: a number on the icon for today's cancellations or changes is the most useful nudge for a schedule app. How for MESH: `navigator.setAppBadge(n)` from the service worker on push, cleared on open; on iPhone, Declarative Web Push carries `app_badge` at the top level of the payload (iOS 18.4 and later). Has today: no. `PWA | S | medium | WebKit, Badging API`

43. **Declarative Web Push for iPhone.** Why: it shows notifications without waking the service worker, which is more reliable on iOS; other browsers still need the worker. How for MESH: send the declarative JSON shape (with `mutable` where the worker should still process it) to Apple endpoints, keep the current payload for others. Has today: partial (classic push). `PWA | S | medium | WebKit WWDC25`

44. **Notification actions and per shaykh mute.** Why: a push that says "Cancelled tonight" should let the reader act without opening the site. How for MESH: actions "Add to calendar" and "Watch live" where relevant; a per shaykh or per masjid alert setting so people only hear what they attend. Has today: partial (tagged push). `PWA, UX | M | medium | Android notification design, Monzo`

45. **Morning refresh in the background.** Why: the schedule should be ready offline before Fajr. How for MESH: Periodic Background Sync (installed Chromium only) refreshes `/api/v1/duroos/today` once a day; iPhone falls back to refresh on open. Has today: no. `PWA | S | low | web.dev periodic sync`

46. **A "Today" widget design ready for the native app, and a compact page now.** Why: true home screen widgets need a native app (PWA widgets work only on Windows); the public JSON API was built for that app. How for MESH: design the small and medium widget (next prayer, next dar, cancellations) now; ship `/today` as a compact, fast page that works as a home screen shortcut and can be pinned. Has today: partial (API exists). `feature | L | medium | Apple WidgetKit, Muslim Pro widgets`

47. **Native share button on every shareable page.** Why: most MESH links travel through WhatsApp groups. How for MESH: `navigator.share` with title and URL on lesson, shaykh, guide, FAQ, update and discount pages, falling back to copy link and a `wa.me/?text=` link. Has today: no. `UX | S | high | Airbnb share, web.dev Web Share`

## I. Share cards (Open Graph)

48. **A share card per page type.** Why: today every page shares the same green MESH card, so a forwarded cancellation looks like the home page. How for MESH: `opengraph-image.tsx` for lesson (book, shaykh, masjid, "after Maghrib, Tuesday"), shaykh (name in English and Arabic), guide (title, step count, verified date), FAQ (the question), programme (name, who it is for), library book (Arabic title), and updates (a red "Cancelled today" card). Has today: partial (one card). `SEO, community | M | high | Vercel OG, GitHub social cards, Linear`

49. **Arabic share cards that shape correctly.** Why: the OG renderer needs the Arabic font passed in and has limited complex shaping, so Arabic text can break apart. How for MESH: load Alexandria or Amiri data into `ImageResponse`, test joining and RTL order, and if shaping fails, render the Arabic title as pre-shaped SVG paths at build time. Has today: partial (`/ar` card is English text). `SEO, aesthetic | M | medium | Quran.com share cards`

50. **Cards tuned for WhatsApp.** Why: WhatsApp shows a small square thumbnail and ignores heavy images. How for MESH: keep each card under about 300 KB, put the key words in the centre square so the crop works, and set `og:image:width`, `og:image:height` and `og:image:alt`. Has today: partial. `SEO | S | medium | WhatsApp link preview behaviour`

51. **A weekly schedule poster to share or print.** Why: students forward images of timetables; a clean official poster beats screenshots. How for MESH: `/duroos/schedule/poster?masjid=` renders the whole week (all shaykhs, so impartial) as a PNG and an A4 PDF in English or Arabic with the lattice frame and a QR code (the `qrcode` package is already installed). Has today: no. `community, aesthetic | M | high | GOV.UK print, masjid notice boards`

## J. Structured data per page type

52. **Event markup on every lesson page.** Why: Event rich results are still supported in Google Search (FAQ and HowTo are gone); weekly duroos are exactly recurring events. How for MESH: `Event` (or `EducationEvent`) with `eventSchedule` (`repeatFrequency: P1W`, `byDay`), `location` as a `Place` with geo for Masjid an-Nabawi or Quba, `performer` as the shaykh `Person`, `isAccessibleForFree: true`, `inLanguage: ar`, `eventAttendanceMode` mixed when there is a livestream, and `eventStatus: EventCancelled` or `EventRescheduled` driven by the watcher. Has today: no. `SEO | M | high | Google Search Central Event`

53. **Person markup on shaykh pages.** Why: helps search engines join the English and Arabic names. How for MESH: `Person` with `name`, `alternateName` (Arabic), `image`, `knowsLanguage`, `jobTitle` only where it is a fact. Has today: no. `SEO | S | medium | Google Search Central`

54. **Fix hreflang pairs and canonical across both languages.** Why: the frontend audit (H1) found most English pages have no hreflang and the Arabic pairs are not reciprocal, so search engines ignore them. How for MESH: one `pairAlternates(enPath, arPath)` helper used by every page, `x-default` to English, plus a test that each pair points at the other. Has today: partial (duroos pages only). `SEO | M | high | Google Search Central hreflang`

55. **Breadcrumbs, dates and sitemap lastmod from real data.** Why: Google still uses BreadcrumbList and `dateModified`; `lastmod` makes recrawls of verified guides faster. How for MESH: BreadcrumbList on every page that shows breadcrumbs (some do), `dateModified` from `lastVerifiedAt`, and the same date as sitemap `lastmod` (plan item 30). Has today: partial. `SEO | S | medium | Google Search Central`

56. **Do not invest further in FAQ or HowTo markup.** Why: HowTo rich results ended in 2023 and Google stopped showing FAQ rich results on 7 May 2026; the markup is harmless but brings no listing. How for MESH: keep the existing FAQPage block as is, spend the time on Event, Person and share cards instead. Has today: FAQPage exists. `SEO | S | low | Google Search Central changelog`

57. **Book markup in the library and an ItemList per Ma'had level.** Why: makes the library's Arabic titles and levels machine readable. How for MESH: `Book` with `inLanguage: ar`, `educationalLevel` (Ma'had level or Kulliyah subject), inside an `ItemList` on each level page. Has today: no. `SEO | S | low | schema.org`

## K. Performance budgets

58. **A performance budget that fails the PR.** Why: the Lighthouse audit is manual and the shared machine is noisy; Vercel and web.dev recommend budgets in CI. How for MESH: Lighthouse CI on five key pages (home, duroos, a guide, library, `/ar/duroos`) with budgets: CLS 0.05, LCP 2.5 s mobile, JS under 170 KB compressed per route, total fonts under 150 KB on English pages. Has today: partial (manual runs, Speed Insights). `performance | M | high | web.dev budgets, Vercel`

59. **Pause the hero sky when nobody is looking.** Why: stars, clouds, rain, lightning, glow and the 90 second ray spin all run forever, also off screen and in background tabs, which costs battery on older phones. How for MESH: set `animation-play-state: paused` when the hero leaves the viewport (IntersectionObserver) or the tab is hidden, and draw a still sky when `navigator.connection.saveData` is on or the device is low end. Has today: partial (reduced motion only). `performance | S | medium | web.dev animations, Apple low power mode`

60. **Media diet.** Why: `public/images` is 11 MB; shaykh portraits are PNG; the unused hero video is 4.8 MB. How for MESH: convert portraits to AVIF or WebP at two sizes through `next/image`, delete unused media, `content-visibility: auto` on long guide sections and the weekly grid, and lazy load the search index on first palette open (plan item 28). Has today: partial. `performance | S | medium | web.dev, Lighthouse`

Also open and already tracked: KeyDates server render (audit C1, CLS 0.54), Arabic font preload (lighthouse row 4), library reader static params (H7), client relative "last checked" (M1).

## L. Accessibility (WCAG 2.2)

61. **An automated contrast test for every token pair.** Why: gold on green, gold on petal, `text-white/50` and article links all failed in the audit (M3); fixes drift back. How for MESH: a vitest that reads the token values for light, dark and sisters and checks the pairs used for text (4.5:1) and for focus and icons (3:1). Has today: no (manual axe runs). `accessibility | S | high | GOV.UK, Material 3 colour roles`

62. **A text size control.** Why: parents, older visitors and Arabic learners zoom; Quran.com and Headspace let readers pick a size. How for MESH: "Text size: smaller, normal, larger, largest" on `/more` and in the reader, setting the root font size and saved per device; layouts already use rem. Has today: no. `accessibility | S | high | Quran.com, Apple Dynamic Type`

63. **WCAG 2.2 Focus Not Obscured.** Why: the sticky header and the bottom bar can cover the focused link when tabbing (2.4.11). How for MESH: `scroll-padding-top` and `scroll-padding-bottom` on `html` equal to the header and bottom bar heights. Has today: no. `accessibility | S | medium | WCAG 2.2`

64. **WCAG 2.2 Consistent Help, which the house rule already wants.** Why: 3.2.6 asks that help appears in the same place on every page; MESH wants "message Admin on WhatsApp" everywhere. How for MESH: one help line component in the same footer spot on every page, both languages, plus a "Report a problem with this page" link (see 72). Has today: partial (help text varies, audit visual row 2). `accessibility, trust | S | high | WCAG 2.2, GOV.UK`

65. **Finish the open a11y rows as one sweep.** Why: they are small and listed. How for MESH: search palette as native `<dialog>` with combobox roles (H5), keyboard Enter on the day arc (M2), keyboard reachable scrolling tables (a11y row 4), the faded updates (row 3), the second nav label (row 6), the "More" link label (lighthouse row 3). Has today: partial. `accessibility | M | high | WAI-ARIA APG`

66. **Countdowns that do not chatter.** Why: a live region on a ticking clock reads every second to screen reader users. How for MESH: no `aria-live` on the digits; a separate polite region that speaks only state changes ("Starts in 5 minutes", "Live now", "Cancelled"). Has today: partial (5 files use `aria-live`). `accessibility | S | medium | GOV.UK, APG`

67. **Mark Arabic phrases on English pages with `lang="ar"`.** Why: `.ar-text` sets direction but not language, so screen readers read Arabic with an English voice. How for MESH: the `.ar-text` component adds `lang="ar"` and `dir="rtl"`; English names inside Arabic pages get `lang="en"`. Has today: partial (one file). `accessibility | S | medium | WCAG 3.1.2`

68. **An in site "less motion" switch.** Why: many people never set the phone's reduced motion setting but find the moving sky and reveals distracting. How for MESH: a toggle beside the theme that sets `data-motion="reduce"`, mirrored in the same CSS as the media query. Has today: partial (OS setting only). `accessibility | S | low | Apple, Headspace`

## M. Print

69. **Print styles for guides as checklists.** Why: students take printed checklists to the Jawazat, the bank and the university office. How for MESH: `@media print` hides header, bottom bar, hero and WhatsApp blocks; shows ticked state, link URLs after links, the verified date, and a QR code back to the page; tables never split across pages. Has today: no (only reveals are off in print). `UX | S | high | GOV.UK print, Stripe docs`

70. **Print the weekly schedule on one page.** Why: families pin it to the fridge. How for MESH: an A4 landscape print layout per masjid or for sisters, same data as the poster (51). Has today: no. `UX | S | medium | masjid timetables`

## N. Analytics driven improvements

71. **"Was this page useful?" on guides and answers.** Why: the Tracker measures reading but not success; GOV.UK runs every page on this one question. How for MESH: Yes and No buttons, an optional one line "what was missing" (no names, no IPs), shown in the owner's Analytics by page. Has today: no. `trust, operations | S | high | GOV.UK feedback`

72. **Report a problem with this page.** Why: stale facts are the biggest risk; the fix path should be one tap. How for MESH: a link that opens WhatsApp to Admin at +1 234 567 9076 with the page title and URL prefilled. Has today: partial (general help line). `trust | S | high | GOV.UK, Wikipedia`

73. **Search gap report.** Why: searches with no results are the content backlog in the readers' own words. How for MESH: an admin card listing top zero result queries for 30 days with a "map as synonym" or "draft a FAQ" action. Has today: partial (search and analytics exist). `operations | S | high | Algolia analytics, GOV.UK`

74. **Step drop off per guide.** Why: if most readers stop ticking at step 4 of the visa guide, step 4 is unclear. How for MESH: send an anonymous tick event (guide, step) through the Tracker and show a small funnel per guide in admin. Has today: partial (ticks are local only, scroll depth tracked). `operations | S | medium | Amplitude funnels`

75. **Core Web Vitals by page and phone in admin.** Why: the Tracker already sends page speed; turning it into p75 numbers per page shows where to work. How for MESH: p75 LCP, INP and CLS per route and per device class, with a red mark when over the budget in 58. Has today: partial. `performance | S | medium | Vercel Speed Insights, CrUX`

76. **Dead and rage click detection.** Why: clicks on things that are not links (a masjid name, a date) show what readers expect to be tappable. How for MESH: count repeated clicks on non interactive elements by selector and show the top ten. Has today: partial (clicks tracked). `UX | M | low | Microsoft Clarity`

## O. Trust and credibility

77. **A verified date on everything that can go stale.** Why: guides and FAQs show "Verified"; fees, discounts and duroos do not. How for MESH: the same green check and date on programme fees, discount terms and each dar ("Confirmed this week"), from data already stored or from the watcher. Has today: partial. `trust | S | high | GOV.UK "last updated", Wikipedia`

78. **Page history: "What changed".** Why: GOV.UK lists every change to a guide, which builds trust when rules move (visa, ta'jeel). How for MESH: a collapsed list at the end of each guide fed by the admin activity log, one line per meaningful change. Has today: partial (activity exists in admin only). `trust | M | medium | GOV.UK`

79. **An "About MESH" page with editorial standards.** Why: new arrivals ask who runs a site before trusting visa steps. How for MESH: who runs it (students in Madinah), how the schedule stays current, how facts are checked, that MESH carries no ads and features no business or institute, and how to report a mistake (Admin on WhatsApp); written with authority, no source talk. Has today: partial (`/more`). `trust | S | high | GOV.UK about, Wikipedia policies`

80. **`security.txt` and visible security basics.** Why: a small, standard signal; the site already has strong headers and CSP. How for MESH: `/.well-known/security.txt` with the Admin contact and an expiry date. Has today: no. `trust | S | low | securitytxt.org`

---

## Top ideas (10 line summary)

1. Offline first service worker plus Next 16 `useOffline` and "Save offline" for guides and books: today `sw.js` only does push, and signal is weakest where MESH is needed (37, 38).
2. Per page share cards (lesson, shaykh, guide, FAQ, cancellation) tuned for WhatsApp, plus a native share button: MESH spreads through groups and every link looks the same today (47, 48, 50).
3. Event markup on lesson pages with live `eventStatus` from the watcher, Person on shaykh pages, and fixed hreflang pairs; FAQ and HowTo rich results are gone, Event still works (52, 53, 54, 56).
4. One real mark: the gate M as favicon, maskable and monochrome icon, plus a complete manifest with screenshots and more shortcuts, and a gentle install card with iOS steps (1, 39, 40).
5. Hijri aware seasons, starting with a Ramadan mode (iftar and suhoor countdown, night palette, Taraweeh) driven by the existing Umm al-Qura code (6, 7).
6. `loading.tsx` skeletons, `error.tsx` boundaries and empty states that always give a next step; none exist today (26, 27, 28).
7. Print styles that turn guides into checklists with a QR code, and a weekly schedule poster as PNG and A4 (51, 69, 70).
8. Accessibility: a text size control, an automated contrast test for all token pairs, WCAG 2.2 focus not obscured and consistent help, and `lang="ar"` on Arabic phrases (61 to 64, 67).
9. Trust and feedback loop: "Was this useful?", one tap "Report a problem" to Admin on WhatsApp, verified dates on fees, discounts and duroos, and a zero result search report (71, 72, 73, 77).
10. Wide screens and identity: a "Next up" rail to fill the empty home column, landmark line illustrations for bands and empty states, and an Arabic screen face with Amiri kept for titles (4, 10, 29).

## Sources consulted

- Google Search Central, "Simplifying the search results page" (June 2025): https://developers.google.com/search/blog/2025/06/simplifying-search-results
- Google Search Central, Event structured data: https://developers.google.com/search/docs/appearance/structured-data/event
- Search Engine Journal, "Google Drops FAQ Rich Results From Search" (2026): https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/
- Apple WWDC25, "Learn more about Declarative Web Push": https://developer.apple.com/videos/play/wwdc2025/235/
- progressivewebapps.com, Web Push on iOS and Safari (app_badge at top level): https://progressivewebapps.com/background/ios-web-push/
- Next.js 16 local docs: `node_modules/next/dist/docs/01-app/02-guides/offline-support.md` and `progressive-web-apps.md`
- Repo audits: `docs/audit/lighthouse-2026-11-09.md`, `docs/audit/a11y-2026-11-09.md`, `docs/audit/arabic-2026-11-09.md`, `docs/audit/deep-2026-11-08/frontend.md`
