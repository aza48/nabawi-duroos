# Guides research, November 2026 (Lane E, akhiai)

Internal notes for the guide seed files in `src/server/seed/content/guides-*.ts`. Sources are named here and never on the public pages. Every fact on a guide that is not already on the site has a line in the guide's note below, with its source and a confidence. Anything that rested on one report, or where sources disagreed, is left off the page and added to `scripts/open-questions.json`.

How this was researched: official Saudi and University pages first (my.gov.sa, absher.sa, iu.edu.sa, ejar.sa, se.com.sa, nwc.com.sa, splonline.com.sa, rega.gov.sa), then the owner's raw material in `docs/research/raw/2026-11-09/`, then the earlier research notes in `docs/research/`, then secondary guides only where several agree. From this cloud session most official portals refuse automated reading (403 or empty), so where a fact comes from an official page read through search results, the note says so.

The owner's instruction (9 November 2026): make every guide complete, practical and creative, in the order of this folder, one PR per three to five guides. Nothing goes live until the owner runs `npm run content:sync`.

## Status

| PR | Guides | Note | State |
|---|---|---|---|
| 1 | `graduate-procedures` (now the full leaving guide), `drivers-license`, `iqama-and-exit-reentry-fees`, `etimad-account` | `leaving-madinah.md`, `driving.md`, `fees-and-tickets.md` | written |
| 2 | new: property for non-Saudis (REGA), sending money home, parcels and shipping, parents on a visit visa | to come | needs slug lines in `src/lib/guide-topics.ts` (asked on issue 13) |
| 3 | Ramadan, summer, then the thinnest guides | to come | |

## Order for the rest of the guides (thinnest and most asked first)

1. `kindergartens-and-schools` (197 words)
2. `sports-and-activities` (241)
3. `everyday-apps-and-services` (282)
4. `other-universities-in-madinah` (302)
5. `dates-of-madinah` (305)
6. `kids-activities` (306)
7. `graduating-from-mahad` (330)
8. `day-trips-from-madinah` (368)
9. `umrah-rawdah-quba` (373)
10. `masjid-an-nabawi-institute-and-college` (393)
11. `having-a-baby-in-madinah` (399)
12. `doctors-hospitals-and-pharmacies` (415)
13. `getting-around` (462)
14. `phone-sims-and-absher` (476)
15. `visas-for-family-and-visitors` (518)
16. `sim-internet-bank` (522)
17. `seasons-and-camping` (553): Ramadan and summer can live here if new slugs are refused
