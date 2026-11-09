# Guides research, November 2026 (Lane E, akhiai)

Internal notes for the guide seed files in `src/server/seed/content/guides-*.ts`. Sources are named here and never on the public pages. Every fact on a guide that is not already on the site has a line in the guide's note below, with its source and a confidence. Anything that rested on one report, or where sources disagreed, is left off the page and added to `scripts/open-questions.json`.

How this was researched: official Saudi and University pages first (my.gov.sa, absher.sa, iu.edu.sa, ejar.sa, se.com.sa, nwc.com.sa, splonline.com.sa, rega.gov.sa), then the owner's raw material in `docs/research/raw/2026-11-09/`, then the earlier research notes in `docs/research/`, then secondary guides only where several agree. From this cloud session most official portals refuse automated reading (403 or empty), so where a fact comes from an official page read through search results, the note says so.

The owner's instruction (9 November 2026): make every guide complete, practical and creative, in the order of this folder, one PR per three to five guides. Nothing goes live until the owner runs `npm run content:sync`.

## Status

| PR | Guides | Note | State |
|---|---|---|---|
| 1 | `graduate-procedures` (now the full leaving guide), `drivers-license`, `iqama-and-exit-reentry-fees`, `etimad-account` | `leaving-madinah.md`, `driving.md`, `fees-and-tickets.md` | written |
| 2 | new: property for non-Saudis (REGA), sending money home, parcels and shipping, parents on a visit visa | to come | needs slug lines in `src/lib/guide-topics.ts` (asked on issue 13) |
| 3 | new `ramadan-in-madinah` (topic haram) and `seasons-and-camping` rewritten with a summer section | see Next below | research gathered, nothing written |

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

## Next (handoff, 9 Nov 2026, akhiai at 90% usage)

Ramadan guide, facts gathered (official unless marked): Ramadan 1448 runs 8 February to 8 March 2027 and Eid al-Fitr is 9 March (`src/content/key-dates.ts`); the University's Eid al-Fitr holiday is 26 February to 13 March 2027, classes resume 14 March (key-dates). Rawdah in Ramadan 1447 had separate windows, with women 6:00 to 11:00 am in the last ten days and men 11:20 am to 8 pm, 11 pm to midnight and 2 to 5 am (SPA N2518165, official; for 1448 check the new schedule). Taraweeh is 10 rak'ahs plus 3 witr after Isha, led by seven imams, with Tahajjud in the last ten nights (General Presidency schedule of 3 February 2026 via ummid.com). Itikaf: register on eservices.alharamain.gov.sa with Nafath from about 3 Ramadan, itikaf from 20 Ramadan, bring a mat, a sheet, a pillow and two ihram cloths; non-Saudi residents needed their sponsor's approval in 1447 (theislamicinformation.com, secondary); Gate 24 was the women's itikaf entrance (secondary). Iftar in the Haram: dates, bread, yogurt, water, laid in rows before Maghrib; only permit holders (via Ehsan) distribute food (SPA N2288183 and the Presidency's operational plan via pep.gov.sa). Working hours: private sector 6 hours a day in Ramadan (Labour Law article 98), public sector 5 (secondary). Zakat al-fitr through Ehsan by region and number of people (SPA). Eid prayer: existing FAQ `eid-prayer-in-madinah`. Umrah in Ramadan is the peak, Nusuk permit needed. Open: Central Library Ramadan hours (question 64), admissions office closure in the last ten days (question 19).

Summer section facts: August is the hottest month with average highs about 43°C and lows about 30°C, January the coldest with highs 24 to 25°C and lows about 12°C, humidity 12 to 38%, rain 30 to 60 mm a year mostly November to January (climate sites agree; no NCM normals found). Ministry of Health: stay out of the sun 10 am to 4 pm, drink regularly. University: end-of-year holiday 3 June to 21 August 2027, summer semester classes 6 June, finals 27 July, new year 22 August (key-dates). Umrah numbers and hotel prices are lowest June to September. Indoor options to list neutrally (alphabetical, no ratings): the malls' play areas, the Madinah museums, the University sports club pool for members. Open: who may stay in the halls over summer (question 91).
