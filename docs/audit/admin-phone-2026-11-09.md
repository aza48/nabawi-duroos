# Admin on a phone, 9 November 2026

## How this was tested

- Local `next dev` (Next 16.4.5) on port 3100 with no `DATABASE_URL`, so the in-memory PGlite copy with demo data. `BETTER_AUTH_URL=http://localhost:3100` was set on the command line. Without it every sign-in fails with "Invalid origin" (403), because auth defaults to port 3000 while the invite link is printed for 3100.
- Playwright Chromium as a phone: 390x844, touch, `isMobile`, device scale 1. Reduced motion was on for the screenshots so the scroll-reveal fade does not hide cards. Sign-in was also run at 360x640, with spot checks at 1440x900.
- Signed up through the owner invite, signed in with email and password, and set up an authenticator code (TOTP computed with node crypto). Then signed out and back in with a code.
- Every page under `src/app/(admin)` was loaded, cold and then warm. On each page I checked sideways overflow, controls under 40 px, inputs without a label, clipped text and console errors.
- Flows tried:
  - cancel today's dars from the Inbox sheet, then withdraw it
  - edit a lesson (bad link, then a good save)
  - create, edit and take down a cancellation update tied to a dars and date
  - edit an answer (bold, link), delete it and undo from the toast
  - create a draft answer
  - edit a guide body and publish
  - undo from Activity
  - invite an admin, accept the invite in a second browser, change the new admin's role
  - save a bad and then the real WhatsApp link
  - toggle-check Channels, Questions and Visitors
- To imitate the on-screen keyboard, the viewport was shrunk to 420 px and the last input on each long form was focused.
- What I could not test live:
  - Watcher suggestions: there are none in the demo data, and the watch cron needs `CRON_SECRET`, so Publish and Dismiss were reviewed from code only.
  - Face ID and passkeys, because headless Chromium has no authenticator.
- Speed: dev mode, warm loads. Every page took 0.76 to 1.06 s except Visitors at 2.2 s. There were no console errors on any page.

Screenshots: `docs/screenshots/admin-phone/` (390x844 unless the name says desktop).

## Problems, ranked

| # | Problem | Page and file:line | Fix | Severity |
|---|---|---|---|---|
| 1 | **The rich editor deletes tables.** TipTap runs only StarterKit, so any `<table>` is flattened into one run-on paragraph ("HomeWho it suitsMonthly (SAR)Studio..."). Typing one word in the body of "What it costs to live in Madinah" and tapping Publish took the public page from 3 tables to 0. The seeded guides hold 19 tables. Undo from Activity brought them back. Screenshot 15. | Guide and answer editors, `src/features/admin/content/RichText.tsx:11` | Add `@tiptap/extension-table` (table, row, header, cell). Until then, refuse a save that drops tables or other unknown tags, and warn when a body holds markup the editor cannot show. | high |
| 2 | **Editor pages scroll sideways (405 px on a 390 px phone).** The 10 toolbar buttons (36 px each, `shrink-0`) set the grid column's minimum width. Every field, Publish, Delete and the "More" tab hang 15 px off screen, and the page zooms out a little. | `/admin/content/faq/*`, `/admin/content/guide/*`; wrapper `src/features/admin/content/FaqForm.tsx:52`, `GuideForm.tsx:50`, toolbar `RichText.tsx:59` | Add `min-w-0` to the wrapper div around `RichText`, or give the form `grid-cols-[minmax(0,1fr)]`. | high |
| 3 | **Save messages land behind the bottom tab bar.** "Saved. The public schedule is updated.", "Published...", "Saved." and "Draft saved." appear under the button at about y 772 to 812. The tab bar starts at y 780, so the message is cut off or hidden after a tap. Screenshots 11, 14. | Lesson `src/features/admin/duroos/LessonForm.tsx:118`, update `AnnouncementForm.tsx:110`, answer `content/FaqForm.tsx:79`, guide `GuideForm.tsx:76`, shaykh `ShaykhForm.tsx:63`, WhatsApp `more/SettingsForms.tsx:25`; bar `AdminShell.tsx:46` | Use the existing `notify()` toast from `Feedback.tsx`, which already sits above the tab bar, for every save. Add `scroll-padding-bottom` of the bar height to the admin page. | high |
| 4 | **Schedule changes give no feedback and no quick Undo.** After "Publish change" the sheet just closes. A cancel is visible only as a small tag. "Withdraw" on a lesson's upcoming change has no confirm, no message, no Undo, and ignores the server result. Screenshot 08. | Inbox and lesson page, `src/features/admin/ChangeDarsSheet.tsx:65`, `duroos/OverrideList.tsx:22` | Return the audit id from `addOverrideAction` and `revokeOverrideAction`, then show a toast with Undo, for example "Cancelled for Mon 9 Nov". Ask before Withdraw. Show the error if it fails. | high |
| 5 | **Changing an admin's role is one tap with no confirm and no message.** Picking "Owner" in the select saves at once. A slip on the phone picker makes someone an Owner. The selects also have no label. | `/admin/admins`, `src/features/admin/more/SettingsForms.tsx:102-103` | Confirm sheet ("Make Helper an Owner? Owners can remove admins and change settings"), then a toast. Give each select an `aria-label` with the person's name. | high |
| 6 | **The editor toolbar is not sticky.** `sticky top-14` sits inside an `overflow-hidden` box, so it scrolls away (measured y -870 after scrolling a guide). On a long guide the editor has to scroll back to the top for every bold or heading. | `src/features/admin/content/RichText.tsx:58-59` | Remove `overflow-hidden` from the wrapper (round the toolbar and content corners instead) so `sticky` works against the page. | medium |
| 7 | **The first save of a new update, answer or guide shows no confirmation.** The form calls `router.replace` to the edit URL, which remounts the form, so "Published" or "Draft saved" is lost. The editor only sees the heading change to "Edit...". | `src/features/admin/duroos/AnnouncementForm.tsx:56`, `content/FaqForm.tsx:39`, `content/GuideForm.tsx:34` | Send the message through `notify()`. Its provider lives in the layout and survives the navigation. | medium |
| 8 | **Activity lines use slugs and vague words.** Examples: "cancelled abadr-tafsir on 2026-11-10", "deleted the answer "free-bus-to-haram"", "withdrew a lesson change" (which one?), "undid a change to a answer". A take-down reads as "edited the update". Screenshot 16. | `/admin/activity` and Inbox, `src/server/admin/describe.ts:30`, `:33`, `:36`, `:37` | Store the book and shaykh name in the audit row for overrides. Fall back to `before.question`, `before.title` and `before.bookEn` on delete. Use "an" for "answer". Say "took down" when status goes to archived, and name the item in undo lines. | medium |
| 9 | **The Dars picker in the update form cannot be read on a phone.** Every option starts with the shaykh's full name, so after choosing the shaykh the field shows "Prof. Dr. Abdurrazzaq ibn Abdulmuhsin al-" and nothing about the book. The empty choice reads "His only dars that day, if there is one". Screenshot 14. | `/admin/duroos/announcements/*`, `src/features/admin/duroos/lesson-options.ts:13`, `AnnouncementForm.tsx:95-96` | Once a shaykh is chosen, label options "Tafsir as-Sa'di, after Fajr, Nabawi". Rename the empty choice "Not chosen (match by date)". | medium |
| 10 | **Error messages show code field names.** Examples: "bookUrl: Use an https:// link or a /path on MESH" and "url: Paste a WhatsApp group invite link". The field itself is not marked. | All forms, `src/app/(admin)/admin/actions.ts:36-37` | Drop the path prefix or map it to the visible label. Set `aria-invalid` on the field and scroll to it. | medium |
| 11 | **Inbox "Today's duroos": the status tag squeezes the name to "Prof. Dr. A..."**, and two rows for the same shaykh look alike. Rows are not links, so a cancel made there cannot be withdrawn from there. | `/admin`, `src/app/(admin)/admin/(app)/page.tsx:86-96` | Put the tag on the book line under the name. Make the row open the lesson page and keep "Change" as the button. | medium |
| 12 | **"I checked this is correct today" is ticked by default.** Fixing a typo stamps the answer or guide as verified, which defeats the "not verified in 6 months" count on the Inbox. | `src/features/admin/content/FaqForm.tsx:24`, `GuideForm.tsx:22` | Default to unticked. | medium |
| 13 | **Take it down (archive) has no confirm, and the destructive links are 20 px tall.** "Take it down (archive)", "Delete answer" and "Delete guide" are underlined text 20 px high, right under Publish. Take it down acts on one tap. | `src/features/admin/duroos/AnnouncementForm.tsx:107-108`, `content/FaqForm.tsx:65-77`, `content/GuideForm.tsx` delete button | Make them 44 px outlined danger buttons with space above. Confirm Take it down and offer Undo in a toast, the way Delete answer already does. | medium |
| 14 | **No warning on leaving a form with unsaved edits.** I edited a lesson note, tapped "Lessons" and lost the edit without a prompt. It matters on long forms (lesson, update, answer, guide, shaykh), where one stray tap on the tab bar is easy. | All edit forms | Track a dirty flag. Warn on `beforeunload` and on tab and back links while dirty. | medium |
| 15 | **Searching Activity hides the day heading.** The "Today" label lives inside the first item of the day, so when that item does not match, the rest of the day shows with no heading (search "guide"). Screenshot 20. | `src/features/admin/ActivityList.tsx:34`, `Filterable.tsx:22` | Render day headings as their own rows and show each one when any item under it is visible. | medium |
| 16 | **Change a dars sheet details.** It is not announced as a dialog (no `role="dialog"`, focus stays on the page, Escape does nothing). The close button is 36 px. "Postponed" and "Moved" have no field for the new date, time or place, only a free note. "Today" does not show which date it means (it was 02:40 in Madinah). The label reads "Pick Dates" because of `capitalize`. | `src/features/admin/ChangeDarsSheet.tsx:71-83`, `:100` | Add dialog role, focus and Escape, as in `Feedback.tsx`. Make close 40 px. Add "New date or time" for Postponed and "New place" for Moved. Label the buttons "Today, Mon 9 Nov" and "Tomorrow, Tue 10 Nov". | medium |
| 17 | **Two-step setup is hard on a phone.** It says "Scan this code", which cannot be done on the same phone. The fallback key is 52 characters in one block with no Copy button. "Copy codes" gives no "Copied" feedback. | `/admin/setup-2fa`, `src/features/admin/TwoFactorSetup.tsx:77-89` | Add "Open in my authenticator app" (the `otpauth://` link). Show the key in groups of 4 with a Copy button. Show "Copied". | medium |
| 18 | **Watcher cards still use technical words (code review).** The reason line can read `"new_book" always needs a person; confidence 62%`, "Shadow mode: would have published automatically" or "channel not trusted". The label says "AI reading:". Publish and Dismiss act on one tap with no Undo toast. | Inbox, `src/server/watcher/decide.ts:39-54`, `src/features/admin/watcher/Suggestions.tsx:40`, `:48`, `:53` | Plain reasons ("New book: always checked by a person", "Not sure enough"). Rename the label "Looks like". Toast with Undo after Publish. | medium |
| 19 | **Needs you misses things.** Open "Questions for you" are not counted, so they hide under More. "Guides and answers not verified in 6 months" (10) opens the Content list, which does not show which 10 they are. | `src/server/admin/attention.ts:28-38`, `src/app/(admin)/admin/(app)/content/page.tsx:34`, `:49` | Add a questions row. Link the stale row to `/admin/content?stale=1`, and mark or sort stale items with a gold "Check" badge. | medium |
| 20 | **Lesson search needs the exact phrase.** "badr tafsir" finds the dars, but "tafsir badr" or "quba wasiyyah" find nothing. Content, Shuyukh and Activity match words in any order. The search box has no label. | `/admin/duroos`, `src/features/admin/duroos/LessonList.tsx:16`, `:22` | Match every word in any order, as `Filterable` does. Add `aria-label`. | medium |
| 21 | **Wide screens leave large empty areas.** At 1440 every page except Visitors is one 672 px column with about 384 px empty on each side. The house rule says no empty areas on wide screens. Screenshot 26. | `src/app/(admin)/admin/(app)/page.tsx:52` and every page's `max-w-2xl` | At `lg`, use two columns on the Inbox (Needs you and channels on one side, today and recent changes on the other) and put list and form side by side on Duroos and Content. | medium |
| 22 | **Accepting an invite ignores a failed sign-in.** If the automatic sign-in fails, the person sees a blank two-step page and then the sign-in form with no explanation. This happened here before `BETTER_AUTH_URL` was set. | `src/features/admin/InviteForm.tsx:26-27` | Check the result. On failure go to `/admin/login` with "Your account is ready. Sign in to continue." | medium |
| 23 | **Copying the invite link gives no sign it worked, and there is no Share button.** On a phone the link is usually sent by WhatsApp. The roles have no one-line explanation, and the panel no longer says whose link it is once the email field clears. Screenshot 22. | `src/features/admin/more/SettingsForms.tsx:51-54`, `:81-87` | Show "Copied". Add a Share button (`navigator.share`). Add one line per role ("Duroos editor: lessons, shuyukh and updates only"). Keep the email in the panel. | low |
| 24 | **List titles are cut to one line.** On Updates, many rows read "Lesson cancelled: Prof. Dr. Abdurrazzaq ibn Abdulm..." with only a date, and Content questions are cut the same way. Updates has no search and no empty state. Screenshots 12, 17. | `src/app/(admin)/admin/(app)/duroos/announcements/page.tsx:24-36`, `content/page.tsx:34`, `:49` | Use `line-clamp-2`. Add `Filterable` and a "No updates yet" line. | low |
| 25 | **Pill text sits high.** The global 40 px minimum height applies to inline links, so text is not centred in the desktop header tabs and the Visitors range chips (24 h, 7 days...). | `src/app/globals.css:445`, `src/features/admin/AdminShell.tsx:35`, analytics range links | Give those links `inline-flex items-center`. | low |
| 26 | **With the keyboard open, the header and tab bar take about 120 of 420 px.** Screenshot 27. | `src/features/admin/AdminShell.tsx:46` | Hide the bottom bar while an input or the editor has focus, using `visualViewport` or a `:focus-within` class on the body. | low |
| 27 | **Channels page.** It shows "checked never" ("Not checked yet" reads better). The toggles save with no message and ignore errors. "Trusted channel" is not explained on the row. Screenshot 24. | `src/app/(admin)/admin/(app)/sources/page.tsx:24`, `src/features/admin/watcher/SourceToggles.tsx:12`, `:25`, `:29` | Fix the wording. Add a short hint under "Trusted channel". Toast "Saved" and show errors. | low |
| 28 | **Lesson form layout.** "Book (Arabic)" comes before English, while other forms put English first. "Link to the book" is squeezed into half width with a two-line hint. Date fields follow the phone's locale (mm/dd/yyyy here), which is easy to misread. | `src/features/admin/duroos/LessonForm.tsx:68-73`, `:112-113` | English first. Give the link field full width. Show the chosen date in words under each date field ("Sat 12 Sep 2026"). | low |
| 29 | **New lesson silently picks the first shaykh in the list.** | `/admin/duroos/lesson/new`, `src/features/admin/duroos/LessonForm.tsx:28` | Start empty with "Choose a shaykh" and make it required. | low |
| 30 | **The Activity search placeholder is cut off** ("Search changes, for example a shaykh, g"). | `src/app/(admin)/admin/(app)/activity/page.tsx:20` | "Search changes". | low |
| 31 | **Admin cards fade in as you scroll.** The public scroll-reveal also matches `main .card` in the admin, so long lists look half faded while scrolling. | `src/app/globals.css:477` | Scope the reveal to the public layout. | low |
| 32 | **Dev setup issues.** `next dev` logs server action arguments, including the new admin's password in plain text. Auth falls back to port 3000 while the docs and invite use 3100. | `next.config.ts` (`logging.serverFunctions`), `src/server/auth/auth.ts:39-42` | Set `logging: { serverFunctions: false }`. In dev, default `BETTER_AUTH_URL` to the port in use, or print a hint next to the invite link. | low |
| 33 | **Answers and guides have no Arabic fields**, so `/ar/guides/*` shows English bodies. This is already listed in `docs/audit/arabic-2026-11-09.md` line 56. | `src/server/db/schema.ts` faqs and guides | Product decision for the owner; out of scope here. | low |

## Open items from ADMIN-AUDIT.md

| Item | Status now |
|---|---|
| 1 "Needs you" block | Done (`NeedsYou.tsx`, gold counts, links). Gaps in row 19: questions are not counted, and the stale list cannot be told apart. |
| 2 Failures apart from suggestions | Done: separate rows for failed channels (with names) and unreadable posts. |
| 3 Code-file content not editable | **Still open.** The "Programmes not checked" row links to the public `/programs` page, where nothing can be edited. |
| 4 Search on lists | Mostly done: Content, Shuyukh and Activity have search. **Still open:** no search on Updates, no "Mine / everyone" or type filter on Activity, and Lessons search is phrase-only (row 20). |
| 5 `confirm()` and no Undo | Done for delete answer, delete guide and remove admin (in-page sheet, Undo toast; tested). **Still open** for Withdraw, Take it down, role change, and watcher Publish and Dismiss (rows 4, 5, 13, 18). |
| 6 Sources two taps deep | Done: failed channels and a stopped watcher link from Needs you. |
| 7 Sign-in on a 360 px phone | Checked live: "Forgot your password?" is visible at 360x640 without scrolling, and the wrong-password and wrong-code messages fit. The Face ID cancel path could not be tested headless. Closed, except the summary link is 20 px high. |
| 8 Technical words in watcher cards | Half done: the "Looks like" reading is plain now. **Still open:** the reason line and the "AI reading" label (row 18). |
| 9 Activity grouped by day | Done, with a bug under search (row 15). |
| 10 Gold for attention | Done (Needs you counts). |
| 11 Suggestion images | Done: cards show a "Flyer" link, not the image. |

## What works well

- Sign-in:
  - password, then a code with the numeric keypad and autofocus
  - clear messages for a wrong password, a wrong code and too many attempts
  - Face ID offered first
  - sign-out returns to sign-in, and admin pages then redirect
- Bottom tab bar: six 64 px tabs with `aria-current`. The header's theme and sign-out buttons are 40 px.
- Needs you shows counts in gold, each linking to the fix.
- The Inbox shortcuts are four large cards.
- The Change a dars sheet:
  - big choice buttons
  - Today and Tomorrow use Madinah time
  - the Arabic note is right to left
  - it covers the tab bar and scrolls inside itself when the keyboard is up
- A cancellation update tied to a dars and date also changes the schedule, and taking the update down removes that change.
- Delete answer opens an in-page confirm sheet. The toast sits above the tab bar, and its Undo restored the answer.
- Undo on Activity restored the guide exactly, tables included.
- Search on Content, Shuyukh and Activity matches English and Arabic, with a "Nothing matches" message.
- Empty states have clear text: Questions, channel posts, upcoming changes, today's duroos.
- Inputs, labels and validation:
  - every input has a label except the lesson search and the role selects
  - Arabic inputs are right to left
  - required fields and email use native validation
  - 16 px text in inputs, so iPhone does not zoom on focus
- Visitors fits 390 px, with a sideways section strip and range chips.
- No console errors on any admin page.
- No page went sideways except the editor pages.

## Top 10 to fix first

1. Stop the editor deleting tables (row 1). Until it is fixed, avoid editing guide bodies that contain tables.
2. Add `min-w-0` around the rich editor so answer and guide pages stop scrolling sideways (row 2).
3. Move every "Saved" or "Published" message into the toast above the tab bar (rows 3 and 7).
4. Toast with Undo after Change a dars and Withdraw, and confirm before Withdraw (row 4).
5. Confirm role changes on Admins (row 5).
6. Make the editor toolbar stick while scrolling (row 6).
7. Name the lesson, answer and guide in Activity lines instead of slugs (row 8).
8. Short dars labels in the update form once a shaykh is chosen (row 9).
9. Plain error messages without code field names (row 10).
10. Leave "I checked this is correct today" unticked by default, and give Take it down and the delete links real buttons with a confirm (rows 12 and 13).

## Screenshots

`docs/screenshots/admin-phone/`:
- Sign-in and setup:
  - `01-invite.png`
  - `02-login.png`
  - `03-setup-2fa.png`
- Inbox and Change a dars:
  - `04-inbox-top.png`
  - `06-change-dars-sheet.png`
  - `07-change-sheet-keyboard.png`
  - `08-after-cancel-no-feedback.png`
- Lessons:
  - `09-lessons-search.png`
  - `10-lesson-upcoming-changes.png`
  - `11-lesson-saved.png` (message behind the tab bar)
- Updates:
  - `12-updates-list.png`
  - `13-new-cancellation-form.png`
  - `14-update-published-msg.png` (message hidden, Dars field unreadable)
- Content editor:
  - `15-guide-editor-table-flattened.png` (tables flattened, no toolbar, page shifted sideways)
  - `17-content-list.png`
  - `18-delete-confirm-sheet.png`
  - `19-deleted-toast-undo.png`
- Activity:
  - `16-activity.png`
  - `20-activity-filter-loses-day.png`
- Admins:
  - `22-admins-invite-link.png`
  - `23-admins-team.png`
- Other pages:
  - `24-channels.png`
  - `25-visitors.png`
  - `26-desktop-inbox.png` (1440x900)
  - `27-keyboard-bars-take-space.png`

## Status (cloud agent 2, 9 Nov, branch `claude/stoic-curie-w1ar9c`)
- **Done and checked on a local dev build:**
  - rows 1 to 20
  - row 22
  - row 23
  - row 24
  - row 25 (the header tabs only)
  - row 27
  - row 28 (except the date in words under date fields)
  - row 29
  - row 30
  - row 31
  - row 32
- **Left for the owner:** row 21 (two-column admin on wide screens; question under "Waiting for the owner" in `docs/AI-LOG.md`) and row 33 (Arabic fields for answers and guides; cloud agent 1's migration proposal on issue 13).
- **Left for the desktop agent:** row 25 (the Visitors range chips in its analytics area).
- **Also done:** row 26 (the tab bar steps aside while a field has focus on a phone).
