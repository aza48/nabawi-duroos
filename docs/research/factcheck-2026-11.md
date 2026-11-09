# Guide fact-check, November 2026

Checked 8 November 2026 against official Saudi pages and established news, read through web search results (WebFetch could not resolve madinahbus.mda.gov.sa, sar.hhr.sa, tibahairports.com, hajjreporters.com or saudilifeguide.com from this session, so those pages were read only through search summaries). Research notes in this folder (living-in-madinah.md, group-chat-2026.md, iu-official.md, study-in-saudi-telegram.md) were used as leads, not as proof.

Files changed: `src/server/seed/content/guides-2026.ts`, `src/server/seed/content/guides-student-life.ts`, `scripts/open-questions.json` (15 new questions appended). Nothing was synced to the database.

Verdicts: **confirmed** (kept), **corrected** (changed in the guide), **added** (new detail in the guide), **removed** (taken out because it could not be confirmed or broke a house rule), **open question** (left out of the guide and added to `scripts/open-questions.json`).

Totals: 184 facts checked across 23 guides (6 more rows are listed as not checked). 73 confirmed, 32 corrected, 57 added, 7 removed, 15 marked open question (some point to questions already in the file); 15 new questions appended to the file.

## Biggest corrections

1. The Saudi Electronic University was renamed Prince Musaid bin Abdulrahman University on 18 September 2026 (royal directive, SPA). The other universities guide now uses the new name.
2. The tourist eVisa list is 72 countries after the 5 November 2026 additions, not "about 68".
3. Ejar contracts are created by an accredited agent or a qualifying landlord and approved by the tenant through an SMS link; tenants do not "register the contract yourself". Official fee 125 SAR a year; landlords must register leases since 25 September 2025.
4. Re-entry visa months added while abroad cost double (200 SAR a month single, 400 multiple). This answers part of an older open question.
5. The airport bus fare (11.50 SAR) was removed because a September 2026 report says it fell to 3.45 SAR and the official FAQ could not be opened; the guide now says the airport route fare is shown in the app.
6. Badr is about 150 km (not 130), Khaybar about 170 km (not 160), Masjid al-Qiblatayn about 4 km (not 5 to 6) and was listed under "Quba and the south" although it is north-west.
7. Intercity coach to Makkah is about 85 to 100 SAR and 6 to 7 hours, not 50 to 80 SAR and 5 to 6 hours.
8. Uhud Hospital is a government (Ministry of Health) hospital; the baby guide called it private.
9. "Roha" in the apps guide is Raha (SMASCO's hourly domestic help app); "Nahhas" pharmacies replaced by Al Dawaa so both health guides agree.
10. Bank guide now has separate iqama and Visitor ID paths, with SAMA's real requirements (Saudi address, home address, purpose of visit) and the rule that the account stops when the Visitor ID expires.

House rule fixes made on the way: removed two named rental groups (featured businesses), removed "Bolt lets you choose a male or female driver" (unconfirmed), rewrote the `defer-my-place` and `istiqdam-deposit` FAQs (they used "there have been reports" and "latest amount quoted"), and changed help lines that sent readers to the MESH group to "message Admin on WhatsApp at +1 234 567 9076".

---

## cost-of-living

| Fact | Verdict | Source |
|---|---|---|
| City bus 3.45 SAR | confirmed | https://www.visitalmadinah.com/madinah-transport-guide/ ; https://ksaexpats.com/madinah-buses-routes-schedules-ticket-prices/ |
| Petrol 2.18 (91) and 2.33 (95) SAR a litre | confirmed, dated November 2026 | https://www.globalpetrolprices.com/Saudi-Arabia/gasoline_prices/ ; https://www.ceicdata.com/en/saudi-arabia/fuel-prices/fuel-prices-retail-gasoline-91 ; https://www.aramco.com/en/what-we-do/energy-products/retail-fuels |
| Rent ranges for studios and flats | confirmed (broadly within Numbeo October 2026 and agent data) | https://www.numbeo.com/cost-of-living/in/Medina |
| Shared room 300 to 1,000 SAR | added | docs/research/group-chat-2026.md section 1.6 (many ads agree) |
| Bread one pack 5 SAR | corrected to 3 to 5 | https://www.numbeo.com/cost-of-living/in/Medina |
| Milk, chicken, eggs, rice prices | confirmed | https://www.numbeo.com/cost-of-living/in/Medina |
| Visit visa insurance covers emergencies only | added | https://www.chi.gov.sa/en/Rules/Pages/VisitorsInsurance.aspx ; https://saudigazette.com.sa/article/621650 |
| Family budget excludes school fees | added (2026 sources put families at 8,000 to 16,000 with schools) | https://saudicostguide.com/cost-of-living-in-madinah/ |
| National Day 23 September, Founding Day 22 February | confirmed | general calendar |
| Barakah app 50 to 70% off | confirmed | https://www.barakah.app/ |

## sim-internet-bank

| Fact | Verdict | Source |
|---|---|---|
| SIM needs passport with visa or iqama | confirmed | https://www.stc.com.sa/content/stc/sa/en/personal/mobile/packages/sawa-ziyara.html |
| Fingerprint and border number at the counter | added | https://houseofsaud.com/travel/saudi-arabia-sim-card/ ; living-in-madinah.md row 10 |
| Data-only eSIM gives no Saudi number for SMS codes | added | https://houseofsaud.com/travel/saudi-arabia-sim-card/ |
| Visitor ID accounts allowed since September 2025 | confirmed | https://www.sama.gov.sa/en-US/News/Pages/news-1111.aspx ; https://www.spa.gov.sa/en/N2409786 |
| Visitor ID account needs Saudi address, home address and purpose of visit | added | https://rulebook.sama.gov.sa/en/20013-expatriates-saudi-arabia |
| Services stop when the Visitor ID expires | added | https://rulebook.sama.gov.sa/en/20013-expatriates-saudi-arabia ; https://maaal.com/en/news/details/sama-5-requirements-for/ |
| Each bank sets its own extra conditions | added | https://thepaypers.com/fintech/news/sama-allows-visitors-to-open-bank-accounts-with-a-visitor-id |
| Separate iqama path (app with Nafath or branch) | added | https://ksaexpats.com/open-alrajhi-bank-account-online/ (Al Rajhi digital opening is for iqama holders) |
| Nafath or Absher required for Visitor ID accounts | open question (already in file) | https://indianinsaudiarabia.com/posts/digital-visitor-identity-absher/ |
| Home internet needs an iqama, router workaround | confirmed | https://saudilifeguide.com/internet-packages-in-saudi-arabia/ |

## getting-around

| Fact | Verdict | Source |
|---|---|---|
| Airport route 400 at 11.50 SAR | removed; guide says the app shows the airport fare (open question already in file) | https://theislamicinformation.com/news/madinah-bus-introduces-new-routes-and-lower-airport-fare/ ; https://www.visitalmadinah.com/madinah-transport-guide/ |
| No cash on board; cards, phone or app | corrected (cards and phones accepted, not only the app) | living-in-madinah.md row 2 (official FAQ madinahbus.mda.gov.sa/faq.html) |
| Passes 10, 60, 240 SAR | confirmed | same |
| One ticket per bus | added | same |
| Customer service 920000877 | added | same |
| Express route 300 from the Haramain station since 1 October 2026 | added (route only, fare is an open question already in file) | https://www.bernama.com/en/world/news.php?id=2614550 ; https://cairoscene.com/News/Madinah-Bus-Network-Expands-to-16-Routes-476-Stops |
| Station in Al Hadra, about 9 km from the Haram | added | https://saudilifeguide.com/haramain-train/ |
| Bolt lets you choose a male or female driver | removed (not confirmed) | search found no Bolt Saudi feature |
| Ride apps surge after prayers | added | https://umrah.guide/using-taxis-uber-and-careem/ |
| Haramain about 2 h 20 min | confirmed | https://saudiscoop.com/business/haramain-train-online-ticket-prices-timetable-refund-cancellation/ |
| Haramain 162 SAR economy plus VAT | corrected wording to "base fare", fares change with demand | living-in-madinah.md row 3 (sar.hhr.sa/travel/fares) |
| Luggage one bag 25 kg, 65 x 55 x 35 cm | added | https://sar.hhr.sa/travel/guidelines/baggage ; https://global.almosafer.com/en/travel/explore/local-transport-information/haramain-train-baggage-allowance |
| Same ID as booking must be carried | added | https://sar.hhr.sa/documents/20143/156971/HHR_PASSENGER_CHARTER.pdf/ |
| Haramain tickets in the Nusuk app | added | living-in-madinah.md 2.4 |
| Child discounts, counter-ticket refunds | open question | sources disagree |
| Shared taxi 50 per seat | corrected to 40 to 50 | group-chat-2026.md 1.11 |
| Bus 5 to 6 h, 50 to 80 SAR | corrected to coach 6 to 7 h, about 85 to 100 | https://umrahmyway.com/saptco-bus-guide/ ; https://www.visitalmadinah.com/madinah-transport-guide/ |
| Coach operator (SAPTCO or Darb Alwatan) | open question | same |
| IDP expected by rental firms, originals only | added | https://houseofsaud.com/travel/saudi-driving-guide/ |
| How long visitors may drive on a home licence | open question | https://www.expatfocus.com/saudi-arabia/guide/saudi-arabia-driving-licenses |
| Traffic fines shown in Absher | added | https://www.absher.sa |
| Quba shuttles about 10 SAR | confirmed | https://www.visitalmadinah.com/madinah-transport-guide/ |

## etimad-account

| Fact | Verdict | Source |
|---|---|---|
| Log in, Individuals, Nafath | confirmed | https://portal.etimad.sa/getattachment/a3456e56-38de-411a-a126-fd4ecfd7b93b/ercab-orders-government-employee-s-copyERCAB-Orders-Government-Employee-s-Copy.pdf?disposition=attachment |
| Travel orders (أوامر الإركاب) | confirmed | same |
| First sign-in through Nafath inside Saudi Arabia, later works from abroad | added | https://portal.etimad.sa/en-us/servicecategories/servicecategoriesdetails?pageAlias=etimad-individuals |
| Visitor ID students and Etimad | open question | none found |

## kindergartens-and-schools

| Fact | Verdict | Source |
|---|---|---|
| Fees about 4,000 SAR, times, documents | not checked (no reliable public source; left as written) | n/a |
| Al Aqeeq International and AlKhandaq run English, Cambridge or national tracks | confirmed | https://hijrahnow.com/madinah |
| Government school quota and Noor timing | open question (already in file) | n/a |

## umrah-rawdah-quba

| Fact | Verdict | Source |
|---|---|---|
| Quba two rak'ahs equal an Umrah, Saturdays | confirmed | Sunan Ibn Majah, Sahih al-Bukhari |
| Quba 3 to 4 km from the Haram | confirmed | https://www.visitalmadinah.com/madinah-transport-guide/ |
| Rawdah booked in Nusuk, free | confirmed | https://umrahtransit.com/blog/how-to-book-rawdah-permit-nusuk-app-2026 |
| One Rawdah permit in any 365 days | added (Ministry statement, October 2026) | https://theislamicinformation.com/news/visit-to-riyad-al-jannah-allowed-only-once-every-year/ |
| Men and women separate times | added | https://hisartour.com/rawdah-permits-%C2%B7-nusuk-app-step-by-step/ |
| Umrah permit in Nusuk, free, one active permit, Nafath for residents | added | https://haj.gov.sa/en/E-Services/Umrah-Permit-Application ; https://my.gov.sa/en/services/24401 |
| Miqat Dhul Hulayfah about 14 km | added | https://www.spa.gov.sa/en/N2534725 ; https://saudipedia.com/en/miqat-dhu-al-hulayfah |
| Makkah about 420 km | confirmed | https://saudipedia.com/en/miqat-dhu-al-hulayfah (433 km to the Grand Mosque from the miqat) |
| Umrah in Ramadan equals Hajj in reward | confirmed | Sahih al-Bukhari |

## everyday-apps-and-services

| Fact | Verdict | Source |
|---|---|---|
| HungerStation in Madinah | confirmed | https://hungerstation.com/sa-en/regions/al-madinah-al-munawwarah?module=restaurants |
| Keeta in Madinah | confirmed (app operates in Saudi; city coverage varies) | https://www.keeta-global.com/SA/en |
| Barakah, discounts and shop cancellations | confirmed and added | https://www.barakah.app/ ; https://apps.apple.com/sa/app/barakah-fresh-food-saved/id1616085824 |
| Dari: repairs and cleaning | confirmed and added cleaning | https://www.dariapp.com/ |
| Maharah: hourly and live-in | confirmed | https://maharah.com/en/servicesectors/ |
| "Roha" | corrected to Raha (SMASCO), hourly four-hour visits and monthly contracts | https://rahahome.com/en/ |
| Al Nahdi and Nahhas pharmacies | corrected to Al Dawaa and Al Nahdi | https://www.visitalmadinah.com/emergency-healthcare-in-madinah/ |
| Gym prices, thobe and laundry prices | not checked (no reliable source) | n/a |
| 50% off at the University sports club | confirmed (owner confirmed; group members agree) | group-chat-2026.md 1.5 |

## visas-for-family-and-visitors

| Fact | Verdict | Source |
|---|---|---|
| "About 68 countries" | corrected to 72 | https://saudigazette.com.sa/article/666018/saudi-arabia/saudi-arabia-expands-tourist-visa-eligibility-to-four-new-countries ; https://gulfnews.com/world/gulf/saudi/saudi-arabia-expands-tourist-visa-to-4-more-countries-1.500737942 |
| Four countries added 5 November 2026 | confirmed | same |
| SAR 535 online, SAR 480 on arrival, card only at kiosks | confirmed, kiosk detail added | https://houseofsaud.com/travel/saudi-tourist-visa-cost/ |
| One year, multiple entry, up to 90 days | confirmed | https://visa.visitsaudi.com/ |
| Yearly cap (90 or 180 days) | open question | https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/SaudiArabia.html |
| Covers Umrah with a Nusuk permit, not Hajj | added | https://saudilifeguide.com/saudi-evisa-mexico-serbia-north-macedonia-bosnia/ |
| Extension by host on Absher, 7 days before to 3 days after, 100 SAR, 180 day cap | confirmed | https://saudigazette.com.sa/article/636986 ; https://saudilifeguide.com/extend-your-saudi-arabia-visit-visa/ |
| Late filing fined, insurance must cover the extension | added | same; https://saudigazette.com.sa/article/621650 |
| Family visit visa: professional iqama, salary, students cannot sponsor | removed (sources disagree); open question | https://www.wathim.com/blog/saudi-family-visit-visa-parents-iqama ; https://ksaexpats.com/apply-for-family-visit-visa-online/ |
| Family visit visa fee 300 single, 500 multiple | added | https://saudilifeguide.com/how-to-apply-family-visit-visa-in-saudi-arabia/ ; https://www.saudiutilityhub.com/family-visit-visa-guide.html |
| Ejar needs an iqama | corrected (educational visa students can register through an agent) | group-chat-2026.md 1.6 (Ejar clarification, 31 August 2026) |
| Premium Residency 100,000 a year or 800,000 once | confirmed; five category products added | https://www.wathim.com/blog/saudi-premium-residency-guide ; https://www.ketencilaw.com/saudi-premium-residency.html |
| 30-day grace period after expiry | open question | https://www.spa.gov.sa/en/N2368339 (2025) |
| Student family route differs for iqama and Visitor ID | added; istiqdam status is an open question | study-in-saudi-telegram.md section 4 |

## finding-an-apartment

| Fact | Verdict | Source |
|---|---|---|
| Named rental groups (two) | removed (house rule: no featured businesses) | n/a |
| Aqar, Bayut, Haraj | added (alphabetical) | https://www.bayut.sa/en/to-rent/2-bedroom-apartments/madina/ |
| Check the agent's FAL licence | added | https://rega.gov.sa/en/rega-services/platforms/ejar/ |
| Tenant registers the contract with an iqama | corrected (agent or qualifying landlord creates it; tenant approves by SMS link) | https://www.ejar.sa/en/service/355294 ; https://raghdan.sa/en/news/complete-ejar-platform-guide-2026-from-contract-creation-to-final-handover/ |
| Ejar fee 125 SAR a year | added | https://www.ejar.sa/en/service/355294 |
| Landlords must register since September 2025; tenants may request | added | https://rega.gov.sa/en/rega-services/platforms/ejar/ |
| Ejar helpline 199011 | confirmed | https://rega.gov.sa/en/rega-services/platforms/ejar/ |
| Ejar for educational visa students through an agent | confirmed | group-chat-2026.md 1.6 |
| 6 or 12 months up front | confirmed | group-chat-2026.md 1.6 |
| Owner or sublessor check, lift check | added | https://www.medinacampsconsulting.com/blog/living-in-medina-foreign-professional-expat-guide |
| Contract takeovers | added | group-chat-2026.md 1.6 |

## drivers-license

| Fact | Verdict | Source |
|---|---|---|
| "Around 47 countries" swap without a test | corrected (no official count; named the main groups) | https://gulftimesnow.com/saudi-driving-licence-expats-2026-convert-foreign-licence/ ; https://www.saudidrivingexam.com/en/blog/saudi-driving-license-conversion-countries-list |
| Absher appointment, model driving school | confirmed | https://www.absher.sa/wps/vanityurl/en/guide/Journey-for-Driving-license-issuance ; group-chat-2026.md 1.7 |
| Fee 40 SAR a year, 200 for 5 years, 400 for 10 | confirmed, yearly rate added | https://www.arabwheels.sa/blog/en/saudi-driving-license-cost-2026-fees-explained/ ; https://ksaplate.com/blog/saudi-driving-license-guide |
| Medical paid separately | added | https://www.saudidrivers.com/how-to-renew-driving-license-in-saudi-arabia/ |
| Switch within three months of the iqama | added | https://www.expatfocus.com/saudi-arabia/guide/saudi-arabia-driving-licenses |
| Online translation offices | added | group-chat-2026.md 1.7 |
| Slot agents ask for Absher OTP: never share | added | group-chat-2026.md section 4 |
| Visitor ID path | added (needs an iqama; drive on home licence with IDP); eligibility for a test is an open question already in file | same |
| Medical at the Regional Laboratory only | open question | https://saudicomputertest.com/how-to-get-saudi-driving-license/ |

## applying-to-the-islamic-university

| Fact | Verdict | Source |
|---|---|---|
| Free, no agents abroad | confirmed | iu-official.md 2 (iu.edu.sa application guidelines) |
| 1448 window 19 April to 21 May 2026 | confirmed | iu-official.md 2 |
| Up to 25 programmes | confirmed for 2026 (third party, specific) | study-in-saudi-telegram.md row 4 ; https://truescho.com/en/blog/study-in-saudi-arabia-2026-complete-guide-scholarships-universities |
| Age 17 to 25, certificate under five years, outside Saudi | confirmed | iu-official.md 2 |
| Documents | confirmed | same |
| Visa: "no embassy visit" | corrected (medical and fingerprints if asked; Visa Bio app or approved centre) | iu-official.md 2 (minhatee2.iu.edu.sa) |
| Outside Saudi when applying, or rejected | confirmed | study-in-saudi-telegram.md row 12 |
| Deferral up to two years | corrected (rule exists; educational visa expects arrival in the offered semester) | iu-official.md 2 ; study-in-saudi-telegram.md row 8 |
| Common mistakes section | added | study-in-saudi-telegram.md 2.2 |
| Help line to the MESH group | corrected to Admin WhatsApp | house rule |
| IU absent from the autumn 2026 window | open question (already in file) | study-in-saudi-telegram.md section 0 |
| Housing by default for new intakes | open question | study-in-saudi-telegram.md row 6 |

## having-a-baby-in-madinah

| Fact | Verdict | Source |
|---|---|---|
| Uhud is a private hospital | corrected to government (Ministry of Health) | https://www.spa.gov.sa/en/N2354127 ; https://en.wikipedia.org/wiki/Ohud_Hospital |
| Delivery fees (April 2025) | not re-checked (dated in the guide; open question already in file) | n/a |
| Visitor insurance maternity cap 5,000 SAR | added | https://saudigazette.com.sa/article/636571 ; https://hajjreporters.com/medical-emergency-on-a-saudi-visit-visa-what-you-need-to-know/ |

## sports-and-activities

| Fact | Verdict | Source |
|---|---|---|
| Class times, prices, phone | not checked (owner-supplied poster, dated 8 November 2026) | n/a |

## phone-sims-and-absher

| Fact | Verdict | Source |
|---|---|---|
| STC *150# own number, *166# balance | confirmed | https://saudiscoop.com/tech/how-to-check-your-stc-sim-number/ ; https://saudiscoop.com/tech/how-to-check-stc-balance-saudi-arabia/ |
| Mobily *222#, *1411#; Zain *144#, *142# | confirmed | https://ksaexpats.com/saudi-mobile-codes/ |
| Care numbers 900, 1100, 959 | confirmed | same |
| Mutasil My Numbers, Nafath or OTP, free | confirmed, "free" added | https://www.cst.gov.sa/en/services/inquire-about-my-numbers |
| Escalate to CST after five working days | confirmed | https://saudilifeguide.com/check-sim-cards-on-iqama/ |
| Absher number change: app, Nafath, kiosk | confirmed | https://ksaexpats.com/change-absher-mobile-number/ |
| New number must be registered to your own ID (or a close relative's) | added | https://english.ajel.sa/saudi-arabia/4ossmtyje |
| Update the bank separately | added | https://saudilifeguide.com/change-mobile-number-in-absher/ |
| Mutasil for Visitor ID holders | open question | none found |

## iqama-and-exit-reentry-fees

| Fact | Verdict | Source |
|---|---|---|
| Single re-entry 200 SAR for 2 months, 100 a month extra | confirmed | https://gulfnews.com/world/gulf/saudi/saudi-arabia-no-refunds-for-canceled-exit-and-re-entry-visas-1.500163506 ; https://cubbbix.com/blog/exit-reentry-visa-fee-guide |
| Multiple 500 SAR for 3 months, 200 a month extra | confirmed | same |
| Extending from abroad costs double (200 and 400 a month) | added | https://saudigazette.com.sa/article/628476/SAUDI-ARABIA/Re-entry-visa-and-residency-renewal-fees-doubled-for-expats-outside-Saudi-Arabia |
| No refunds on cancelled re-entry visas | added | https://gulfnews.com/world/gulf/saudi/saudi-arabia-no-refunds-for-canceled-exit-and-re-entry-visas-1.500163506 |
| Domestic worker 600, company worker 650 | confirmed | https://saudilifeguide.com/iqama-renewal-fees-for-1-year/ |
| Dependant 18 and over 500 SAR | confirmed (secondary sources agree) | https://alkhaber-services.com/ (Arabic, رسوم تجديد الإقامة للتابعين 2026) |
| Newborn abroad 2,000 SAR | corrected wording (entry visa fee as a dependant) and three-month window added | https://x.com/myeleservices/status/1306931622520946689 ; https://www.moi.gov.sa (procedure PDF for adding newborns) |
| Dependant levy 400 SAR a month | added (for work iqamas; students open question already in file) | https://www.wathim.com/blog/dependent-fee-saudi-arabia-guide |
| Final exit free; visit visa extension 100 SAR | confirmed | https://saudigazette.com.sa/article/636986 |
| Payment through Sadad | added | https://www.saudiutilityhub.com/exit-reentry-visa-guide.html |

## masjid-an-nabawi-first-visit

| Fact | Verdict | Source |
|---|---|---|
| Library entered from the King Saud gate, closes around prayers | corrected (west side, men's library by the escalator at Gate 10; hours removed) | https://visitmadinahsa.com/sa-en/destinations/The-Prophet's-Mosque-Library ; https://madainproject.com/masjid_al_nabawi_library |
| Library hours | open question (24 hours or 8 am to 10 pm) | https://www.spa.gov.sa/en/N2289813 ; https://haj.gov.sa/en/Al-Madinah-Al-Munawwarah/Information-About-the-Prophets-Mosque |
| Museum "across from the masjid" | corrected: just south of the masjid, ticketed 40 SAR, under 7 free | https://med.ethaf.com/en/faqs ; https://www.visitsaudi.com/en/madinah/attractions/the-international-fairs-and-museums-of-the-prophet-biography-and-islamic-civilization |
| Rawdah one permit in 365 days | confirmed | https://theislamicinformation.com/news/visit-to-riyad-al-jannah-allowed-only-once-every-year/ |
| Instant slots near the masjid, waiting list | added | https://umrahtransit.com/blog/how-to-book-rawdah-permit-nusuk-app-2026 |
| Al-Baqi' men only, after Fajr and Asr | confirmed | https://www.roamsaudi.com/blog/a-spiritual-guide-to-visiting-al-baqi-cemetery-in-madinah/ |
| ID check at Al-Baqi' | removed (not confirmed) | n/a |
| No photos, free entry, women view from outside | added | https://almaqamtransport.com/jannat-ul-baqi/ |

## historic-sites-and-masjids

| Fact | Verdict | Source |
|---|---|---|
| Quba about 4 km | corrected to about 3.5 km | https://www.visitalmadinah.com/madinah-transport-guide/ |
| Qiblatayn 5 to 6 km, listed under the south | corrected to about 4 km north-west, moved to the Khandaq section | https://www.visitsaudi.com/en/madinah/attractions/masjid-al-qiblatain-in-madinah ; https://saudipedia.com/en/list-of-islamic-historical-sites-in-al-madinah-al-munawarah |
| Seven Masjids, "six remain", named Salman and Umar masjids | corrected (several rebuilt or merged; Masjid al-Fath and Masjid al-Khandaq named) | https://en.wikipedia.org/wiki/The_Seven_Mosques ; https://madainproject.com/seven_mosques |
| Bir Rumah still gives water | confirmed; distance and fence note added | https://wadanago.com/blog/bir-rumah-well-of-uthman ; https://madainproject.com/well_of_rumah |
| Uhud 3 AH, seventy martyrs, Hamzah | confirmed | https://saudipedia.com/en/list-of-islamic-historical-sites-in-al-madinah-al-munawarah |
| Khandaq 5 AH | confirmed | same |

## day-trips-from-madinah

| Fact | Verdict | Source |
|---|---|---|
| Badr about 130 km | corrected to about 150 km | https://ae.trip.com/moments/detail/badr-1712726-137957549?locale=en-AE ; https://distancecalculator.himmera.com/distance-medina-badr-149912.html |
| Khaybar about 160 km | corrected to about 170 km | https://www.rome2rio.com/s/Medina/Khaybar |
| Hegra on guided tours | confirmed; Experience AlUla booking, from about 95 SAR, no private cars inside added | https://www.experiencealula.com/en/things-to-do/experiences/hegra-day-tour ; https://blog.wego.com/hegra-alula-tour-guide/ |
| Jeddah about 420 km, train about 2 h | confirmed | https://saudiscoop.com/business/haramain-train-online-ticket-prices-timetable-refund-cancellation/ |
| Yanbu, AlUla, Tabuk distances | not re-checked | n/a |

## seasons-and-camping

| Fact | Verdict | Source |
|---|---|---|
| January 12 to 24°C | confirmed | https://www.weather-atlas.com/en/saudi-arabia/medina-climate |
| November in the same band | corrected (warmer in November) | https://weatherspark.com/y/101175/Average-Weather-in-Medina-Saudi-Arabia-Year-Round |
| Summer 32 to 45°C | corrected to 28 to 44°C, August hottest | https://weather-and-climate.com/average-monthly-min-max-Temperature,Medina,Saudi-Arabia |
| Autumn 25 to 38°C | corrected to 23 to 41°C, September still very hot | https://weatherspark.com/m/101175/9/Average-Weather-in-September-in-Medina-Saudi-Arabia ; https://en.climate-data.org/asia/saudi-arabia/al-madinah-region/medina-3534/t/october-10/ |
| Spring 18 to 35°C | corrected to 15 to 40°C | https://weatherspark.com/y/101175/Average-Weather-in-Medina-Saudi-Arabia-Year-Round |
| Rain mostly November to January in bursts | added | https://www.weather-atlas.com/en/saudi-arabia/medina-climate |
| Camping licence from NCVC on Nabati | added | https://www.spa.gov.sa/en/N2248056 |
| Unlicensed camping fine up to 3,000 SAR | corrected ("several thousand") | https://gulfnews.com/world/gulf/saudi/saudi-arabia-3000-riyal-fine-for-unauthorised-camping-in-forests-or-national-parks-1.103580842 |
| Local firewood and charcoal banned, fined per cubic metre | added | https://sabq.org/en/article/e3a94xn ; https://www.arabnews.com/node/2433336/saudi-arabia |

## dates-of-madinah

| Fact | Verdict | Source |
|---|---|---|
| Ajwa and the seven dates hadith | confirmed | Sahih al-Bukhari |
| Khalas from Al-Hasa; other descriptions | not re-checked (general knowledge, no change) | n/a |

## doctors-hospitals-and-pharmacies

| Fact | Verdict | Source |
|---|---|---|
| 997, 998, 999, 937 | confirmed | https://my.gov.sa/en/emergency-contact |
| 911 works in Madinah | confirmed | https://www.spa.gov.sa/en/N2412577 ; https://saudigazette.com.sa/article/666022/saudi-arabia/national-center-for-security-operations-receives-over-3-million-calls-in-october |
| Visitors pay for care | corrected (compulsory insurance covers emergencies up to 100,000 SAR; routine care paid) | https://www.chi.gov.sa/en/Rules/Pages/VisitorsInsurance.aspx ; https://saudigazette.com.sa/article/621650 |
| Insurance must cover an extension | added | https://saudigazette.com.sa/article/621650 |
| King Fahd Hospital government | confirmed | https://www.moh.gov.sa/en/ministry/mediacenter/news/pages/news-2014-09-17-001.aspx |
| Uhud Hospital (no type) | corrected to government | https://www.spa.gov.sa/en/N2354127 |
| Madinah Maternity and Children's Hospital | added | https://www.moh.gov.sa/en/ministry/mediacenter/news/pages/news-2021-01-31-004.aspx |
| Doctors usually speak English, front staff less often | added | https://www.visitalmadinah.com/emergency-healthcare-in-madinah/ |
| Al Dawaa and Al Nahdi | confirmed | same |
| Foreign prescriptions not accepted | confirmed (unchanged) | https://www.visitalmadinah.com/emergency-healthcare-in-madinah/ |
| Sehhaty for visitors | open question | https://www.moh.gov.sa/en/eservices/sehhaty/pages/default.aspx |

## other-universities-in-madinah

| Fact | Verdict | Source |
|---|---|---|
| Saudi Electronic University | corrected: renamed Prince Musaid bin Abdulrahman University, 18 September 2026 | https://www.spa.gov.sa/en/N2679971 ; https://saudigazette.com.sa/article/664677/saudi-arabia/saudi-electronic-university-renamed-prince-musaed-bin-abdulrahman-university |
| Madinah branch, blended learning | confirmed | https://seu.edu.sa/madinah/en/home/ |
| Prince Mugrin colleges (four fields incl. architecture) | corrected to its three colleges | https://upm.edu.sa/en/about-upm ; https://saudipedia.com/en/prince-muqrin-bin-abdulaziz-university |
| Prince Mugrin non-profit, tuition, own scholarships | added | https://upm.edu.sa/en/international-students |
| Teaching mainly in English | removed; open question | https://www.standyou.com/study-abroad/university-of-prince-mugrin-saudi-arabia/ |
| "Look at private universities such as Prince Mugrin" | removed (featured one institution) | house rule |
| IU founded 1961, Taibah 2003 | confirmed | https://studyinsaudi.sa/en/Institutions/Details/3a371b0e-2c17-4b10-b5ab-05a5487771b9 |

## campus-life-islamic-university (guides-student-life.ts)

| Fact | Verdict | Source |
|---|---|---|
| Student care 920022042, care@iu.edu.sa | confirmed | https://iu.edu.sa/en-us ; https://my.gov.sa/en/agencies/17321 |
| Free buses to the Haram | confirmed (owner); help line changed to Admin WhatsApp | house rule |
| Mat'am prices 1, 2 and 2 SAR | confirmed (owner); monthly booking is an open question | group-chat-2026.md 1.5 |
| Stipend 840 SAR | confirmed (owner; widely reported to November 2026) | study-in-saudi-telegram.md row 5 |
| Housed by default | open question for new intakes | study-in-saudi-telegram.md row 6 |
| Ejar FAQ: how a contract is made, 125 SAR fee | added | https://www.ejar.sa/en/service/355294 |

## FAQs rewritten in guides-2026.ts

| FAQ | Change | Why |
|---|---|---|
| defer-my-place | rewritten without "there have been reports" | house rule (no doubt or sources); educational visa practice |
| istiqdam-deposit | conflicting deposit figures removed; iqama and Visitor ID routes split | house rule; open question added |
| rawdah-booking | free, one permit in 365 days, link | confirmed above |
| bank-account-without-iqama | SAMA documents and expiry rule | confirmed above |

## Open questions added to scripts/open-questions.json (15)

Housing for new intakes; istiqdam status and deposit; family visit visa sponsor rules; eVisa yearly cap; visit visa grace period; mat'am monthly booking; licence medical centre and University translation; visitor driving period; Haramain child discounts and counter refunds; Makkah coach operator and fare; Etimad for Visitor ID students; Sehhaty for visitors; Prophet's Mosque Library hours and women's gate; Prince Mugrin language of teaching; Mutasil for Visitor ID holders.

Note for the team: older open questions on the airport bus fare and on re-entry fees from abroad can now be partly closed (route 300 exists since 1 October 2026; extension from abroad is double the in-Kingdom rate). They were left in the file for the owner to close.
