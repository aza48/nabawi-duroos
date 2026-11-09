# Hajj, renting on your own, and the online Arabic year: research notes, 9 November 2026

Written for three content changes:

1. New guide `hajj-as-a-student` ("Hajj from Madinah as a student or resident"), stage `getting-settled`, in `src/server/seed/content/guides-gaps-2026-11.ts`. It has no topic yet, so `tests/guide-topics.test.ts` fails until the lead places it.
2. New h2 "Renting on your own" in `finding-an-apartment` (`src/server/seed/content/guides-2026.ts`), with h3 parts on payments, up-front costs, taking over, subletting, repairs, bills and red flags. The sentence on 6 or 12 months up front moved from "The contract" into the new section, and the summary now mentions the section.
3. New FAQ `online-arabic-year-to-madinah` (category `university`) in the same gaps file.

WebFetch could not reach haj.gov.sa or spa.gov.sa from this session (host not allowed), so official pages were read through web search results only. Nothing was synced to a database.

## Hajj

| Fact used | Source | Confidence |
|---|---|---|
| Domestic registration for 1447 opened 6 Ramadan (23 Feb 2026) in Nusuk; package booking from 15 Ramadan (4 Mar 2026); age 15 or over (Gregorian); health requirements; residents need a valid residency; priority to residencies issued more than a year ago; contracts only with licensed companies listed in Nusuk | https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Opens-Registration-for-Domestic-Pilgrims-for-the-1447-H-Season ; https://www.spa.gov.sa/en/N2521773 ; https://www.pep.gov.sa/en/news/874 | High |
| First-time pilgrims had priority until the end of Shawwal; repeat pilgrims could register from 1 Dhul Qa'dah (18 Apr 2026) if places remained | same; https://saudigazette.com.sa/article/660481 ; https://destinationksa.com/en/hajj-for-repeat-domestic-pilgrims-2026/ | High |
| Package booking by SADAD invoice; 72 hours to pay until 27 Dhul Qa'dah, then 6 hours; no deduction for cancelling before the permit is issued (to 30 Shawwal); no refund from 1 Dhul Hijjah | https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Announces-Start-of-Hajj-1447H-Package-Booking ; https://www.spa.gov.sa/en/N2528268 ; https://blog.wego.com/local-hajj/ | High (payment), Medium (refund stages) |
| Residency must stay valid to the end of Dhul Hijjah | https://www.spa.gov.sa/N2528256 (Arabic, through search summary) ; https://www.saudi-365.com (summary) | Medium to High |
| Vaccines: meningitis and seasonal flu; only vaccinated applicants can book | https://www.nusuk.sa/hajj-journey ; https://saudigazette.com.sa/article/650560 | High |
| Package prices published in Nusuk with VAT; travel to Makkah not included (2024 list: four packages, 4,099.75 to 13,265.25 SAR) | https://www.saudigazette.com.sa/article/640342 ; https://pep.gov.sa/ar/news/636 | High for 2024; no 1447 or 1448 list found, so no figures in the guide |
| Companions added in the same booking with the same company and package; relationship checked against Absher; "mahram exception" request in Nusuk for a mahram who has performed Hajj before | https://www.raya.ps/news/1213071.html ; https://shofnews.com/137814 ; https://x.com/ask_almadina/status/2029343819968245959 | Medium (several news sites agree) |
| Visit visas of every type do not allow Hajj | https://www.spa.gov.sa/N2119460 (2024) ; https://gulfnews.com/world/gulf/saudi/saudi-arabia-all-visit-visas-barred-from-hajj-access-1.500511572 | High |
| Penalties: up to 20,000 SAR for Hajj without a permit; residents deported and banned for 10 years; visit visa holders in Makkah or the holy sites from 1 Dhul Qa'dah to 14 Dhul Hijjah fined; up to 100,000 SAR per person for those who help; report on 911 (Makkah, Madinah, Riyadh, Eastern Province) or 999 | https://www.spa.gov.sa/en/N2559888 (14 Apr 2026) ; https://www.spa.gov.sa/en/N2316587 (2025) | High |
| Makkah entry needed a permit from 13 Apr 2026 (25 Shawwal) for non-residents of Makkah; Umrah permits stopped 18 Apr (1 Dhul Qa'dah) until after Hajj | https://www.thenationalnews.com/news/gulf/2026/04/13/makkah-access-restricted-to-pilgrims-and-special-permit-holders-ahead-of-hajj/ ; https://www.khaleejtimes.com/world/gulf/saudi-arabia-hajj-2026-season-rules-makkah-entry-umrah-permits-suspended | High |
| 1448 dates in the guide (Ramadan 8 Feb 2027, 1 Dhul Qa'dah 8 Apr, finals 25 Apr to 10 May, 1 Dhul Hijjah 7 May, Hajj 14 to 19 May, Arafah 15 May, Eid holiday 11 to 22 May, end of Dhul Hijjah 5 June) | `src/content/key-dates.ts` | High |
| No 1448 domestic registration date has been announced yet | searches on 9 Nov 2026 | n/a |

Left out on purpose: the five-year rule (sources disagree; the 1447 rule ran as "first Hajj first, others later if places remain", already open as question 21), Visitor ID eligibility (no official source; the guide says to check in Nusuk and ask the University, already open as question 72), funded Hajj for final-year students (one channel post, #507), women without a mahram (sources disagree), package prices (no 1447 or 1448 list found).

## Renting on your own

| Fact used | Source | Confidence |
|---|---|---|
| Rent on new residential Ejar contracts is paid only through Ejar's digital channels (mada, SADAD); other payment is not proof of payment | https://rega.gov.sa/en/media-center/news-announcements/restricting-rent-payment-for-residential-contracts-through-digital-channels-starting-15-january/ | High |
| Ejar instalments can be monthly, quarterly, half-yearly or yearly | https://thesauditimes.net/en/ejar-platform-guide-to-registering-a-lease-fees-and-paying-rent/ | Medium |
| Contracts across the Kingdom renew automatically unless either side gives notice at least 60 days before the end (since 25 Sep 2025; only contracts over three months) | https://rega.gov.sa/en/media-center/news-announcements/in-line-with-hrh-crown-prince-s-directive-to-take-several-measures-to-achieve-balance-in-the-real-estate-sector-in-riyadh-approval-has-been-issued-for-regulatory-provisions-aimed-at-regulating-the-relationship-between-landlords-and-tenants/ ; https://www.ejar.sa/en/faq/434422 ; https://www.kslaw.com/news-and-insights/saudi-arabia-introduces-rent-controls-and-automatic-lease-renewal | High |
| A tenant may not sublet or assign without the owner's permission (Civil Transactions Law, art. 437); unpermitted subletting is a ground to end the contract | https://etqanlawfirm-sa.com/ ; https://ylawyer.sa/ (law firm summaries) | Medium |
| Repairs: owner pays for safety and defects that stop use; tenant pays everyday upkeep and damage from use | https://www.ejar.sa/sites/default/files/English_Ejar_Tenancy%20Contract_v1.pdf (draft template) ; https://dlight.ai/en/guides/ejar-contract-explained-saudi | Medium |
| Electricity and water move to the tenant through Ejar's financial liability transfer and move back at the end | https://www.ejar.sa/en/page/265204 ; https://www.argaam.com/en/article/articledetail/id/1776583 | High |
| Empty flats 6 or 12 months, paid 6 or 12 months up front; a yearly payment can be cheaper; furnished sublets month by month with no contract; taking over from leavers | https://t.me/notjustmadinah/1013 ; docs/research/group-chat-2026.md section 1.6 ; existing MESH guides | Medium |
| Autumn 2026 range 15,000 to 21,000 SAR a year for empty one to three bedroom flats in Al Iskan, Rabwa and Taibah | docs/research/group-chat-2026.md section 1.6 (several members); 18,000 SAR a year in https://t.me/madinahstudentlife/2394 | Medium; asked to confirm |

Left out: deposit cap and Ejar fee percentage (already open as question 24), commission rates, the 24,000 against 27,000 SAR example (one post).

## Online Arabic year

| Fact used | Source | Confidence |
|---|---|---|
| Offered to initially accepted applicants not placed in Madinah; free; one academic year at most; priority after attending and passing | https://t.me/notjustmadinah/1020 ; https://t.me/notjustmadinah/1014 | Medium |
| A new Study in Saudi application is still needed, otherwise no visa | https://t.me/notjustmadinah/1022 ; https://t.me/notjustmadinah/1038 | Medium |
| Status "initial acceptance on the Study in Saudi portal" means no online stage; wait for the Ministry | https://t.me/notjustmadinah/1037 ; https://t.me/notjustmadinah/1028 | Medium |
| No stipend while online | https://t.me/notjustmadinah/1014 ; docs/research/study-in-saudi-telegram.md row 5 | Medium |

Consistency: no published guide or FAQ said anything about a stipend during online study, so there is nothing to contradict. The "year of online Arabic" sentence in the applying guides matches the FAQ.

## Questions added to scripts/open-questions.json

1. Hajj: domestic registration for women without a mahram.
2. Hajj: University-funded Hajj places for final-year students.
3. Hajj: 1447 package categories and prices, and whether to publish a 1448 range.
4. Renting: taking over a flat and a new Ejar contract.
5. Renting: financial liability transfer for bills on a Visitor ID.
6. Renting: confirm the 15,000 to 21,000 SAR yearly range.
7. University: what priority after the online year means.
8. University: who is offered the online year, and whether it continues for 1449.

Not repeated because already open: Hajj frequency and the five-year rule (21), Visitor ID and Hajj in Nusuk (72), Ejar fee and deposit cap (24).
