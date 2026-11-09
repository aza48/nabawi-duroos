# Temporary information register

Rule from the owner (8 November 2026): anything on the site that is temporary (discounts, offers, trips, sales, registration windows, one-off events) must be removed or updated as soon as its period ends. Everything on the site must be up to date.

How to keep it so:
- Every time temporary content is added, add a row here with its expiry date and exactly where it lives.
- At the start of every session, and before every deploy, compare today's date with this table. Remove anything expired from the code or seed, run `npm run content:sync -- --only=<slug>` for guides and FAQs, then push. Move the row to "Removed" below.
- Recurring seasonal items (for example the four yearly sales) are not temporary in this sense. Do not name a year on them unless it has dates.

## Active

| Item | Where | Expires | Action when expired |
| --- | --- | --- | --- |
| Masjid Quba lesson schedule for the period 1/4 to 30/6/1448 (Jumada al-Akhirah has 29 days) | the Quba lessons (`validTo` in `src/server/seed/import-legacy.ts` and on the live rows) | 9 December 2026 | Enter the next period's Quba schedule in Admin > Duroos before then; otherwise every Quba dars drops off the site the next day |
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
| Remittance fee ranges (banks up to 40 SAR, centres 20 to 50, wallets 0 to 50; checked November 2026) | guide `sending-and-receiving-money`, "What it costs" | May 2027 | Recheck in the apps and update the "as of" month |
| Domestic parcel 15 to 35 SAR and SPL Express Plus 141 SAR (2026); Haramain station SPL counter 75 to 150 SAR (2026); customs processing fees | guide `shipping-and-receiving-parcels` | May 2027 | Recheck with the carriers and ZATCA |
| Tourist eVisa 72 countries and about 535 SAR; family visit visa 300 and 500 SAR; extension about 100 SAR (checked November 2026) | guides `bringing-parents-to-visit` and `visas-for-family-and-visitors` | February 2027 | Recheck on visa.visitsaudi.com and the MOFA platform |
| REGA support line and the 5% transaction tax (checked November 2026) | guide `owning-property-as-a-non-saudi` | May 2027 | Recheck on saudiproperties.rega.gov.sa |

## Removed

Camping trip section (guide `sports-and-activities`): removed 8 November 2026 on the owner's instruction. Rule: no short-term promotions or event adverts; only long-term, real, in-person classes and facts.
