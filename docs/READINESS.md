# MESH readiness review (8 November 2026)

**Verdict: the site is ready and healthy for students today, but the plan is not fully finished.** Stage 3 is done and Stages 1 and 2 are mostly done. Stage 4 is where the gaps are: the ideas list was never written, and two big admin items were skipped. Nothing found would stop students using the site.

## The four stages

| Stage | State | Evidence |
|---|---|---|
| 1. Finish open tasks | Mostly done | Authority sweep done (f9db2f0, 86 edits). Library pages are in the sitemap (about 1,690 library URLs). Shaykh photos: 20 of 31 verified, 11 still without (`docs/research/shaykh-photos.md`). Audit items 13, 16, 18, 19 still partly open. Research content added (admission guide, 5 FAQs, Ma'had hub); the guides and FAQs the handoff calls "not live" are in fact live (200 on their pages). |
| 2. Best admin panel | Partly done | Done: "Needs you" block (d2dd19b), search on Content, Shuyukh, Activity (92a7dd5), plain watcher cards, activity grouped by day, Face ID sign-in, reset links. Not done: the in-page confirm sheet with Undo toast (ADMIN-AUDIT 5; delete screens still use the browser `confirm`), and editing programmes, discounts, key dates and library in the admin (ADMIN-AUDIT 3). |
| 3. Audit and test everything | Done, with one gap | `docs/audit/AUDIT.md` (29 items from 4 personas and a 229-page crawl), `docs/audit/technical.md`, `ADMIN-AUDIT.md`, five-width and dark-mode pass. The admin audit was read from code, not clicked through on a live phone. |
| 4. Improvements plus an ideas list | Partly done | Many audit fixes shipped (items 1 to 29, mostly done). `docs/IDEAS-FOR-OWNER.md` holds owner questions only. The ranked feature ideas the handoff mentions are not in the file. |

## Missed or skipped (most important first)

1. **Ideas list missing.** The ideas section was promised but not written. Smallest step: add a ranked "Ideas" section (about 10 lines) to `docs/IDEAS-FOR-OWNER.md`, drawing on HANDOFF "Next steps" 6 to 9.
2. **Owner cannot edit programmes, discounts, key dates or the library.** Fees and dates will go stale unless a developer edits code. Smallest step: start with discounts (one table, one migration, one admin list), as the handoff proposes.
3. **Delete has no in-app confirm or Undo.** An owner on an iPhone can tap through a plain system dialog (FaqForm, GuideForm, SettingsForms). Undo exists but only in Activity. Smallest step: one shared confirm sheet component plus an Undo toast on those three screens.
4. **Eleven shuyukh have no photo.** The fallback badge works, so this is cosmetic. Smallest step: owner sends or approves photos from `docs/research/shaykh-photos.md`.
5. **Arabic has no home page.** `/ar` redirects to `/ar/duroos`. The library college and reader pages, `/mahad` and search are still English only. Smallest step: a short Arabic home page.
6. **Stale or conflicting facts still open (AUDIT 13, 16):** Mutun al-Ijaz price (550 vs 400), the IU page, library and childbirth costs, women's areas and gates at the Haram. Smallest step: owner answers the 5 "could not settle" questions at the top of `IDEAS-FOR-OWNER.md`.
7. **Study page cannot sort or compare, and duroos cannot filter by level or language (AUDIT 18, 19).** Smallest step: add a sort by name or price unit; add `level` and `language` fields later.
8. **`docs/HANDOFF.md` is out of date.** It says the admission guide, five FAQs and visa guide wording are "not live"; they are live. Its next-steps list still lists the done admin items 2 to 5. Smallest step: refresh those two sections (the other session owns the file, so left alone here).
9. **WhatsApp number on hold** by the owner's choice (needs the Meta partner and an Anthropic key). The webhook is built but inactive.
10. **Unverified:** the admin panel was never checked on a real phone, and the Gemini daily limit (about 20 requests a day per model) can slow the watcher.

## Checks run (8 November 2026)

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Passed, no errors |
| `npx vitest run` | 37 files, 258 tests, all passed (the handoff says 250) |
| Live pages (`/`, `/duroos`, `/duroos/schedule`, `/guides`, `/programs`, `/library`, `/library/sharia`, `/ask`, `/discounts`, `/more`, `/mahad`, `/ar/duroos`, `/sitemap.xml`, `/robots.txt`, `/admin/login`) | All 200. Slowest: `/` at 3.0 s and `/duroos/schedule` at 2.5 s on first request, the rest under 2.3 s. |
| Newly added pages (`/guides/applying-to-the-islamic-university`, three FAQs) | All 200, so they are live |
| Banned wording in source: "reportedly", "not stated" | No matches |
| Banned wording: "source:", "according to" | Only code fields (`source` in library data and redirects), none shown to readers |
| Dashes (em or en) in source | 98 in six `src/server/seed/legacy` files (lessons, announcements, events, profiles, streams, types), mostly Arabic and English place names and dates. Not on the three live duroos pages checked (0 found). A copy test exists (`tests/copy.test.ts`). Worth a look: the legacy seed text with dashes, in case it reaches a page not checked here. |
| `/sitemap.xml` | 1,967 URLs, including about 1,690 library URLs |
| Code, content, git | Nothing changed except this file. `tsconfig.tsbuildinfo` shows as modified (expected, not committed). |
