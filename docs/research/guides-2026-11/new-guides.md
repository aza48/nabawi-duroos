# New guides, PR 2 (written 9 November 2026, akhiai)

Four new guides in `src/server/seed/content/guides-lane-e-2026-11.ts` (`GUIDES_LANE_E_2026_11`). Two of them apply the research pass's drafts from commit `da21814` (`sending-and-receiving-money.md`, `shipping-and-receiving-parcels.md`, whose source tables are not repeated here), extended with akhiai's own research. The other two are new. Registration needs one import line in `sync.ts` and four slug lines in `src/lib/guide-topics.ts` (asked of akheeai on issue 13).

| Slug | Stage | Topic on the guides index | Draft used |
|---|---|---|---|
| `owning-property-as-a-non-saudi` | getting-settled | papers | none (the owner's REGA guide) |
| `sending-and-receiving-money` | getting-settled | papers | `sending-and-receiving-money.md` |
| `shipping-and-receiving-parcels` | getting-settled | home | `shipping-and-receiving-parcels.md` |
| `bringing-parents-to-visit` | family | family | none |

## `owning-property-as-a-non-saudi`

Source: the official REGA guide "دليل تملك غير السعوديين للعقار" updated 23 June 2026, `docs/research/raw/2026-11-09/rega-non-saudi-property-ownership-ar-2026-06-23.pdf`, read with the owner's French translation as a reading aid. Every rule on the page is in that guide: the categories (residents, Premium Residency, non-residents with a digital identity, Gulf citizens, foreign companies and non-profits), the Makkah and Madinah rules (zones only, Muslims only, no foreign companies, Premium Residency usufruct only outside the zones), the residents' one home outside the zones except in the two holy cities, the spouse and children rule (article 2(3): neither owns a home alone except on divorce or at 25), the three basics (identity, Saudi bank account, Saudi mobile linked to the digital identity), the five steps (basics, choose the property, register on Saudi Properties, eligibility check and certificate, purchase with electronic payment, ifragh and electronic deed), electronic payment under SAMA rules, the registry, notices by portal or SMS, the 10 to 180 day compliance period, the support line 920017183 (00966920017183 abroad) and saudiproperties@rega.gov.sa.

| Other facts | Source | Confidence |
|---|---|---|
| Royal decree M/14 of 19 Muharram 1447 (14 July 2025); law in force 22 January 2026; regulation and zones approved 23 June 2026 | REGA guide p.3; https://rega.gov.sa/en/media-center/news-announcements/rega-non-saudi-property-ownership-system-enters-into-force-as-of-today/ ; https://www.whitecase.com/insight-alert/saudi-arabia-approves-landmark-real-estate-ownership-law-non-saudis | High |
| Fines up to 10 million SAR and a forced sale for serious breaches | The law's penalty article as reported by White & Case, Pinsent Masons (https://www.pinsentmasons.com/out-law/news/saudi-arabia-outlines-new-non-saudi-real-estate-ownership-rules) and Raghdan | High |
| Ownership gives no residency | REGA guide ("confers no rights under Premium Residency"); https://theharamaynguide.com/blogs/featured-articles/foreign-ownership-makkah-madinah | High |
| Residents apply with the iqama number; non-residents get a digital identity through a Saudi mission | REGA guide pp.12 to 14; REGA news | High |
| Real estate transaction tax 5% of the price | ZATCA RETT (in force since October 2020) | High |

Left off: the list of Madinah zones (aggregators name Knowledge Economic City, Rua Al Madinah and others, with counts of 9 or 10 zones that do not agree). The page sends readers to the portal's map. Open question added.

## `sending-and-receiving-money`

Applies the research pass's draft and adds: the "three things to know" framing, the ways table (bank app, remittance centre, wallet, cash pick-up), the SAMA rule that after three months or an iqama all transfers go through an account in the sender's name and that remittance centre membership is on the iqama (SAMA rulebook 3-2 and the remittance centres guide, read through search), the fee ranges as of November 2026 (banks up to 40 SAR plus VAT, remittance centres 20 to 50, wallets 0 to 50, from https://howtosaudiarabia.com/guides/send-money-abroad , https://saudilifeguide.com/best-money-transfer-services/ , https://expatsaudiarabia.com/en/articles/sending-money-home-from-saudi-arabia-bank-versus-exchange-house , which agree), the Saudi weekend timing, the mistakes list (informal transfer, cash limits, last-week transfers). The cash declaration threshold is left as "the limit customs publishes" because ZATCA's pages give 60,000 and 40,000 SAR (open question in the draft).

## `shipping-and-receiving-parcels`

Applies the research pass's draft and adds: the January 2026 National Address rule as reported by the Transport General Authority (https://research.hktdc.com/en/article/MjIxMzgwNzA5OQ ; https://gogamegeek.com/blogs/news/important-update-saudi-arabia-national-address-short-address-requirement), domestic carriers in alphabetical order (Aramex, J&T Express, Naqel Express, SMSA Express, SPL) with the 15 to 35 SAR small-parcel range and SPL Express Plus 141 SAR up to 30 kg as of 2026 (https://inventoryflow.co/mena-courier-rates-uae-saudi-arabia/ ; https://www.tkamol.sa/blog/shipping-carriers-smsa-aramex-comparison ; https://splonline.com.sa/en/express-plus/), cash on delivery paid out weekly (same sources), the SFDA permit for medicines by post (existing FAQ), prohibited imports (ZATCA prohibited goods page, already used by `what-to-bring-to-madinah`), and the SPL international ranges as of 2025 (see `leaving-madinah.md`).

## `bringing-parents-to-visit`

| Fact on the page | Source | Confidence |
|---|---|---|
| Tourist eVisa: 72 eligible countries, about 535 SAR with insurance, one year multiple entry, 90 days a visit, covers Umrah with a Nusuk permit; holders of a used US, UK or Schengen visa can apply | https://visa.visitsaudi.com/ (official, read through search); existing guide `visas-for-family-and-visitors` | High |
| Umrah visa for other nationalities through the Nusuk Umrah platform or a licensed agent, with a service package; Madinah included | https://umrahindex.com/umrah-visa-2026/ ; https://www.visawisetravel.com/blog/umrah-visa-2026-how-to-apply-costs-requirements-best-time ; SPA 20 July 2026 as reported | Medium |
| Family visit visa: resident with an iqama applies on the MOFA visa platform; 300 single, 500 multiple, plus insurance; case by case; the host answers for the visitor; extension on Absher about 100 SAR, 180-day cap, insurance for the new dates | https://www.mofa.gov.sa/en/eservices/Pages/svc13.aspx ; https://my.gov.sa/en/services/18563 ; https://my.gov.sa/en/services/269236 (listings); existing guide; https://english.ajel.sa/news/s5e9n6q0g | High for the fees and the cap, Medium for the rest |
| Student iqama cannot host a family visit visa (the MOFA page asks for employer or chamber attestation) | https://www.mofa.gov.sa/en/eservices/Pages/svc13.aspx as summarised by https://www.wathim.com/blog/saudi-family-visit-visa-parents-iqama | Medium. The page says "ask the Deanship of Student Affairs through Tawasul about the University's own family visitor procedure" (community notes describe one) |
| Airport distance, bus 400, ride apps 40 to 80 SAR | existing FAQ `airport-to-haram-and-university` | High |
| Wheelchairs at Gate 7, lifts at Gates 9 and 33, health centres 355 and 305, left-luggage 4 hours, women's sections, Rawdah permit and instant track, children's centres | existing guides `masjid-an-nabawi-first-visit` and `women-at-masjid-an-nabawi` (official Authority sources) | High |
| Haramain train about two and a half hours to Makkah, miqat Dhul Hulayfah | existing guides `haramain-train-and-city-buses` and `umrah-rawdah-quba` | High |
| SIM for visitors on passport and border number | existing guide `sim-internet-bank` | High |
| Passport six months, SFDA permit for controlled medicines, emergency numbers | existing guides and FAQs | High |
| Overstay: fine and ban on the visitor, penalties on the host | https://saudiscoop.com/jawazat-and-moi/saudi-family-visit-visa/ ; https://noblecoreksa.com/family-visit-visa-extension-saudi/ (figures not used) | Medium, stated without figures |

Left off: the exact family visit visa duration per entry (sources give 30 and 90 days; the embassy decides), the salary condition for hosting (sources disagree), the University's family visitor permit details (already an open question), hotel prices.
