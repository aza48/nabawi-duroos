# Temporary information register

Rule from the owner (8 November 2026): anything on the site that is temporary (discounts, offers, trips, sales, registration windows, one-off events) must be removed or updated as soon as its period ends. Everything on the site must be up to date.

How to keep it so:
- Every time temporary content is added, add a row here with its expiry date and exactly where it lives.
- At the start of every session, and before every deploy, compare today's date with this table. Remove anything expired from the code or seed, run `npm run content:sync -- --only=<slug>` for guides and FAQs, then push. Move the row to "Removed" below.
- Recurring seasonal items (for example the four yearly sales) are not temporary in this sense. Do not name a year on them unless it has dates.

## Active

| Item | Where | Expires | Action when expired |
| --- | --- | --- | --- |
| Dar at-Tawheed registration hours and "places are limited" | `src/content/programs.ts`, slug `dar-tawheed-sunnah` | Ask the centre in December 2026 | Reword to the current intake |
| Childbirth fees and visiting rules (checked April 2025) | guide `having-a-baby-in-madinah` | Recheck now, then every 6 months | Update figures and the checked date |
| Jawazat fees (checked November 2026) | guide `iqama-and-exit-reentry-fees` | May 2027 | Recheck and update the date |
| Gym class prices and schedule (checked 8 November 2026) | guide `sports-and-activities` | February 2027 | Recheck |
| "Final exam schedules are out" update with the steps to find them | announcement `final-exam-schedules-released-1448` (Latest updates on the home page and /duroos/updates) | 14 December 2026 (last exam day) | Archive the update in Admin |
| Traffic fine amounts (checked November 2026) | guide `drivers-license`, "Fines, cameras and points" | May 2027 | Recheck against Absher and update the "as of" month |
| Efada medical fee 60 to 200 SAR and driving school fees up to about 2,500 SAR (checked November 2026) | guide `drivers-license` | May 2027 | Recheck and update the "as of" month |
| Car transfer fees 150 SAR government and 230 SAR Absher (checked November 2026) | guide `graduate-procedures`, "Your car" | May 2027 | Recheck on Absher |
| SPL international parcel ranges (2025 figures) | guide `graduate-procedures`, "Ship your books" | Recheck now in SPL's price calculator, then every 6 months | Update the ranges and the "as of" year |
| Second-hand furniture price points "as of late 2026" | guide `graduate-procedures`, "Sell or give away" | May 2027 | Recheck against current listings |

## Removed

Camping trip section (guide `sports-and-activities`): removed 8 November 2026 on the owner's instruction. Rule: no short-term promotions or event adverts; only long-term, real, in-person classes and facts.
