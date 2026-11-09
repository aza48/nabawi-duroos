# Lighthouse (phone), 9 November 2026 (cloud agent 2)

Lighthouse 12.6 with the mobile profile, on a local production build (`MESH_LOCAL_DB=1`), on 12 pages. Timings on this shared machine swing by a second or more between runs, so only the layout shift and the failing audits are reliable. Use the live site's Speed Insights for real timings.

| Page | Perf | A11y | Best | SEO | Notes |
|---|---|---|---|---|---|
| / | 86 | 96 | 96 | 92 | console error is the offline weather call |
| /duroos | 88 | 96 | 96 | 92 | |
| /duroos/schedule | 68 | 96 | 100 | 92 | layout shift 0.366, fixed (now 0) |
| /guides | 94 | 96 | 100 | 92 | |
| /guides/cost-of-living | 95 | 100 | 100 | 92 | |
| /ask | 95 | 96 | 100 | 92 | |
| /library | 87 | 100 | 100 | 92 | |
| /programs | 89 | 100 | 100 | 92 | |
| /ar | 73 | 100 | 96 | 100 | slowest: Arabic heading waits for its font |
| /ar/duroos | 75 | 100 | 96 | 100 | same |
| /assistant | 96 | 100 | 100 | 92 | |
| /search?q=bank | 78 | 96 | 100 | 58 | SEO 58 is the intended noindex; layout shift 0.352, fixed (now 0) |

## Findings
| # | Problem | Fix | Owner | Status |
|---|---|---|---|---|
| 1 | The weekly schedule renders Saturday on the server and switches to today in the browser: the list jumps (0.366) | The server passes today's weekday (`initialDay`) to `ScheduleBrowser` | unclaimed | done |
| 2 | Search results load in the browser and push the footer down (0.352) | Reserve 70vh for the results on `/search` | unclaimed | done |
| 3 | SEO 92 on every English page: "Links do not have descriptive text". It is the bottom bar's "More" link to /more, the only one found | Give it an `aria-label` such as "More: library, programmes, discounts and help" (`src/components/shell/BottomNav.tsx`) | desktop agent (shell UI strings) | todo |
| 4 | Arabic pages: the heading is drawn in Amiri, which is not preloaded since code audit finding 5. A split per layout does not work here, because the build puts both font modules into one shared chunk | In the Arabic layout, add `<link rel="preload" as="font">` for the Amiri 700 and Alexandria Arabic files | desktop agent (`src/app/(ar)/*`) | todo |
| 5 | "Ask in the WhatsApp group" in the search empty state, where the house rule says to message Admin on WhatsApp at +1 234 567 9076 | Change the string in `SearchUI.tsx` (English and Arabic) | desktop agent (UI strings) | todo |
| 6 | Small tap targets on the home page (`target-size`) and colour contrast on /duroos, /ask, /guides | See `a11y-2026-11-09.md`; the contrast items are the brand colour question | owner / desktop agent | todo |

## Visual pass (390 and 1440 px, local build of this branch)
Pages checked: `/`, `/duroos`, `/guides`, `/guides/cost-of-living`, `/ask`, `/more`, `/ar`, `/library` and `/programs`. The layouts hold at both sizes, guides use three columns on wide screens, and nothing scrolls sideways.

| # | What | Where | Owner |
|---|---|---|---|
| 1 | Arabic counts use the wrong number form: "١ دروس" should read "درس واحد", and "١١ دروس" should read "١١ درسًا" (11 and above take the singular) | `/ar` hero line and the "after Fajr" count on the duroos cards | desktop agent (hero), naiifos (cards, PR 16 is already fixing the 11+ form) |
| 2 | Help lines still send people to the group: "Something outdated? Tell us in the WhatsApp group." and "Have a question? Post it in the MESH WhatsApp chat". The house rule is the Admin line (+1 234 567 9076) | every guide and answer page | desktop agent (UI strings) |
| 3 | On the home page at 1440 px the right column is empty beside the lower half of Today's duroos (about 400 px), against the "no empty areas on wide screens" rule | `/` | owner and desktop agent (layout) |
| 4 | Shaykh names are cut off in the duroos cards ("Prof. Dr. Abdurrazzaq ibn Abdulmuhsin al...") at 1440 px | `/` and `/duroos` | naiifos (PR 16 replaces these cards) |
