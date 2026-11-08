# Temporary information register

Rule from the owner (8 November 2026): anything on the site that is temporary (discounts, offers, trips, sales, registration windows, one-off events) must be removed or updated as soon as its period ends. Everything on the site must be up to date.

How to keep it so:
- Every time temporary content is added, add a row here with its expiry date and exactly where it lives.
- At the start of every session, and before every deploy, compare today's date with this table. Remove anything expired from the code or seed, run `npm run content:sync -- --only=<slug>` for guides and FAQs, then push. Move the row to "Removed" below.
- Recurring seasonal items (for example the four yearly sales) are not temporary in this sense. Do not name a year on them unless it has dates.

## Active

| Item | Where | Expires | Action when expired |
| --- | --- | --- | --- |
| Muslim Scouts camping trip, 20 and 21 November 2026 | guide `sports-and-activities`, section "Coming up" | 21 November 2026 | Delete the section and the sentence in the summary, then sync the guide |
| Dar at-Tawheed registration hours and "places are limited" | `src/content/programs.ts`, slug `dar-tawheed-sunnah` | Ask the centre in December 2026 | Reword to the current intake |
| Childbirth fees and visiting rules (checked April 2025) | guide `having-a-baby-in-madinah` | Recheck now, then every 6 months | Update figures and the checked date |
| Jawazat fees (checked November 2026) | guide `iqama-and-exit-reentry-fees` | May 2027 | Recheck and update the date |
| Gym class prices and schedule (checked 8 November 2026) | guide `sports-and-activities` | February 2027 | Recheck |
| "Final exam schedules are out" update with the steps to find them | announcement `final-exam-schedules-released-1448` (Latest updates on the home page and /duroos/updates) | 14 December 2026 (last exam day) | Archive the update in Admin |

## Removed

Nothing yet.
