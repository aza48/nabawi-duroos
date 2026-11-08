# Admin panel audit (8 November 2026)

Read as a non-technical owner on a phone first, then desktop. Ranked by how much each item hurts the owner day to day. Based on the code in `src/features/admin` and `src/app/(admin)`; not every screen was clicked through live (usage was nearly spent), so items marked "check live" need a quick look on a real phone.

## Done in this pass

- Help number removed from Admin > Settings. It is now fixed at +1 234 567 9076 (`getHelpContact` ignores any old `help_contact` row). Commit 8791cc0.

## Ranked findings

1. **The home page says "Inbox" but does not show everything that needs attention.** It shows watcher suggestions and failures, drafts, today's duroos and recent activity. It does not show stale facts (programmes, discounts, key dates past their "last verified" date), broken links, or a count per problem. Fix: a short "Needs you" block at the top with one row per problem and a count, each row linking to the place to fix it. Empty state: "Nothing needs you right now."
2. **Failed watcher posts are mixed in with suggestions.** `pendingPosts` loads `suggested` and `error` together, capped at 20, with no count. If a source keeps failing the owner only sees cards, not "Source X has failed 6 times". Fix: show failures as a separate count with the source name, linking to Sources.
3. **Content that still lives in code cannot be edited.** Programmes, library, discounts and key dates (`src/content/*.ts`) need a developer. This is the biggest gap in owning the site. Blocked on the live DB migration and `npm run content:sync`; do not start until that runs cleanly.
4. **Only the dars list has search.** `LessonList` has a search box; FAQ and guide lists on Content, Activity, Announcements and Shaykhs do not. On a phone a long list means a lot of scrolling. Fix: the same search input on Content (answers and guides), Shaykhs and Activity, plus a "Mine / everyone" or type filter on Activity.
5. **Destructive actions use the browser `confirm()` box.** Delete answer, delete guide and remove admin use `window.confirm`. On iPhone this is a plain system dialog that is easy to tap through, and after deleting there is no "Undo" right there; the owner has to go to Activity. Fix: an in-page confirm sheet, then a toast with an Undo button for a few seconds. Removing an admin should name what happens ("signed out everywhere").
6. **Five bottom tabs, but Settings, Admins and Sources hide under "More".** Fine for daily use, but the watcher sources (the thing most likely to break) are two taps deep. Fix: link failed sources from the home "Needs you" block (item 1) rather than adding a tab.
7. **Sign-in: Face ID is the main button, password is below it.** Good. Check live that the error text after a cancelled Face ID prompt does not push the button off screen on a 360px phone, and that "Forgot password" is visible without scrolling.
8. **Labels and help text are uneven.** Most fields use `Field` with a hint, but some technical words reach the owner: watcher "reading" lines show raw kinds and slugs (`lesson_slug`, "would auto"), and confidence as a percentage. Fix: plain words ("Looks like: lesson cancelled on Tuesday") and hide slugs.
9. **Activity list has no grouping by day.** Fine with 8 items on the home page; on `/admin/activity` a long flat list is hard to scan. Fix: group by "Today", "Yesterday", date.
10. **Styling is mostly consistent.** Buttons and cards use the shared `ui.tsx` tokens with the MESH green. Gold is not used for "needs attention" anywhere; it would be a natural accent for the counts in item 1. Check live in light theme.
11. **Speed.** The home page runs four queries in parallel, which is right. The suggestion list loads full post text and images for up to 20 posts; fine now, but cap images to a thumbnail size if the inbox grows.

## Suggested order for the next session

1. "Needs you" block on the home page (items 1, 2, 6), with a test for the counts.
2. Search on Content, Shaykhs and Activity (item 4).
3. In-page confirm plus Undo toast (item 5).
4. Plain-language watcher cards (item 8), then activity grouping (item 9).
5. Code-file content editing only after `npm run content:sync` runs against the live DB (item 3).
