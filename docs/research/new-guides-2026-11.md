# New guides, November 2026: facts and sources

Written 8 November 2026. Internal note, so sources are named here; the public guides never mention them. The guides live in `src/server/seed/content/guides-research-2026-11.ts` and are registered in `src/server/seed/content/sync.ts` (`SEED_GUIDES`). Nothing has been synced to the live database.

WebFetch could not reach studyinsaudi.sa, ksavisa.sa or raqmi.dga.gov.sa from this session (host not allowed), so official pages were read through search results, plus the research notes in this folder. Anything that rested on one report, or where sources disagreed, was left out of the public text and added to `scripts/open-questions.json` (13 new questions).

## 1. living-on-a-visitor-id (getting-started)
Living on a Visitor ID: what works and what does not.

Key facts
- New educational-visa students get a digital Visitor ID tied to the border number, not an iqama (group-chat-2026.md 1.1, 5+ people, plus the University's October 2025 procedural PDF in iu-official.md).
- Jawazat accepts the digital Visitor ID as official proof of identity; the passport stays the travel document.
- SAMA rulebook 200.1.3: banks may open accounts for Visitor ID holders with a copy of the ID, the Saudi address, the home-country address and the purpose of the visit; no service past ID expiry or end of visit.
- Absher registration with the border number, fingerprint at a government service point, the airport or an approved centre (University procedural PDF, Oct 2025). Absher care 920020405 fix (already a published FAQ).
- SIM registered to passport and border number with a fingerprint (living-in-madinah.md, operator pages).
- Ejar via an accredited agent (official Ejar clarification of 31 Aug 2026, already a published FAQ); agent enters the contract, both parties approve by SMS link (ejar.sa service pages).
- Saudi licence and car ownership need an iqama (existing guides; group chat).
- Domestic Hajj is for citizens and residents with valid residency permits (Ministry of Hajj announcement for 1447).
- Tawasul route to the Educational Visa Unit (official notice forwarded in the group, 7 Oct 2026).

Sources
- https://rulebook.sama.gov.sa/en/20013-expatriates-saudi-arabia
- https://www.spa.gov.sa/en/N2409786
- https://ksaexpats.com/digital-visitor-id-official-proof/
- https://www.absher.sa/wps/vanityurl/en/individuals/querybordernumber
- https://www.ejar.sa/en/service/355294
- https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Opens-Registration-for-Domestic-Pilgrims-for-the-1447-H-Season
- https://www.spa.gov.sa/en/N2521773
- https://iu.edu.sa/Students/Guidelines (procedural guide PDF for educational-visa students)
- docs/research/group-chat-2026.md sections 1.1, 1.6, 1.7, 1.8

Left out (open questions): exit and re-entry rules and per-entry stay limit, part-time work, driving test or insurance, SIM suspension every 6 to 7 months.

## 2. applying-to-the-islamic-university (getting-started), rewrite
The existing guide in guides-2026.ts covered most of the requested journey, so this is written as an improved replacement of that guide (same slug, exported as `GUIDE_REWRITES_2026_11`). `SEED_GUIDES` in sync.ts lets it replace the older entry. Another session edited the same guide in guides-2026.ts on 8 November; its new points (fingerprints in Saudi Visa Bio, outside-Saudi rule, a "Common mistakes" list, the deferral wording) are folded into the rewrite.

Added over the old version: a table of past windows, a "prepare now" checklist, Minhati second application, interview and placement test, 5 days to accept and that accepting cancels the rest, Ministry final approval, visa form, fee, Saudi Visa Bio fingerprints, the outside-Saudi rule, statuses table, common mistakes, what to do if rejected.

Key facts and sources
- 1448 window 19 Apr to 21 May 2026; age 17 to 25; certificate under five years; full-scholarship applicants live outside Saudi: https://iu.edu.sa/المؤهلات-المطلوبة-للطلاب-الدوليين-0 , https://www.spa.gov.sa/en/N2567547
- 1447 window 1 May to 14 Jun 2025: https://www.spa.gov.sa/N2310819
- 2023 and 2024 windows: study-in-saudi-telegram.md 2.1 (#126, #133, #152; #204, #265, #284, #318).
- Final acceptance only on Study in Saudi, Minhati preliminary acceptance is conditional, ticket requested on Minhati with exact passport name: https://minhatee2.iu.edu.sa/
- Initial acceptance is not final; Ministry final approval needed before the visa on KSAVISA: https://ksavisa.sa/explore-visa-options (via search), study-in-saudi-telegram.md #1006
- Accept within 5 days, accepting cancels other applications (#676, #842, #864); 24-hour Minhati deadline (#565, #988); placement test only places you (#35, #41, #919).
- Fingerprints: the MOFA app is "Saudi Visa Bio": https://play.google.com/store/apps/details?id=sa.gov.mofa.saudivisabio ; iu-official.md (Minhati page: embassy, office or the foreign ministry app).
- Outside Saudi when submitting the visa application (#994, #996, #1003).
- No agents, applying free: https://iu.edu.sa/ارشادات-التقديم-للطلاب-الدوليين-0
- Men only for residential study: study-in-saudi-telegram.md (#11, #12, #196, #302), community-multilingual.md (Kompas 2024).

Left out (open questions): the visa fee amount, whether the medical is required, the LPA prefix, whether IU took part in the autumn 2026 window.

## 3. women-at-masjid-an-nabawi (family)
Women at Masjid an-Nabawi: sections, the Rawdah and halaqat.

Key facts
- Women's sections on the eastern and western sides with their own gates, marked by signs (official map as described in several guides). Gate numbers conflict between sources, so none are given.
- Rawdah: free Nusuk permit only, women's category, separate women's times after Fajr and after Isha, shorter on Friday; entry for permit holders through the southern courtyards opposite Bab Makkah (gate 37); instant track for people near the masjid with GPS on; waiting list; one scheduled permit in 365 days (matches the existing guide).
- Halaqat for women, including correcting recitation, register on qm.edu.sa and reg.qm.edu.sa.

Sources
- https://www.spa.gov.sa/N2459246 (Haramain authority Rawdah times, reported by Okaz, Al Riyadh and others)
- https://www.alweeam.com.sa/1299376/2026/rawdah-nusuk-permit-booking-visiting-hours-2026
- https://alharamain.gov.sa/public/?page=rawdah-ar (shows different women's hours: conflict raised as a question)
- https://www.nusuk.sa/rawdah ; https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women
- https://qm.edu.sa/ ; https://qm.edu.sa/tasheeh/telawah-women ; https://reg.qm.edu.sa/ ; https://www.spa.gov.sa/N2041341
- https://www.visitalmadinah.com/women-prayer-areas-at-masjid-nabawi/ (gate lists, conflicting)
- src/content/programs.ts (nabawi-women, nabawi-halaqat)

Left out (open questions): exact women's hours, current women's gate numbers and best places to hear the duroos, halaqat eligibility on a visit visa or Visitor ID.

## 4. first-30-days-in-madinah (getting-started)
Your first 30 days in Madinah: a checklist. Built mostly from facts already published on MESH, linked by slug: sim-internet-bank, new-student-steps, living-on-a-visitor-id, campus-life-islamic-university, etimad-account, university-calendar-1448, finding-an-apartment, haramain-train-and-city-buses, getting-around, cost-of-living, everyday-apps-and-services, doctors-hospitals-and-pharmacies, umrah-rawdah-quba, visas-for-family-and-visitors, kindergartens-and-schools; FAQs short-address, absher-nafath-activation, find-my-timetable.

New facts
- 911 is the unified emergency number in Madinah, 997 ambulance: https://www.spa.gov.sa/en/N2412577 , https://my.gov.sa/en/emergency-contact
- Mat'am meals reserved monthly: group-chat-2026.md 1.5 (HIGH, 6 people).
- Supermarket names listed alphabetically, as on cost-of-living.

## 5. masjid-an-nabawi-institute-and-college (study)
The Masjid an-Nabawi Institute and College.

Key facts
- Registration 5 to 20 Safar 1448 (20 Jul to 4 Aug 2026), written exam 11 Rabi' al-Awwal, interview 13 Rabi' al-Awwal, in person; intermediate, secondary and bachelor's levels.
- Ages 12 (intermediate) and 15 (secondary) with "good" grades; bachelor's needs 85% in secondary; non-Saudis need a valid iqama and have a separate quota; full time with employer or sponsor approval; foreign certificates equated and attested first.

Sources
- https://spa.gov.sa/N2637583
- https://www.economy-today.com/ (article "مواعيد وشروط القبول بمعهد الحرم المكي والمسجد النبوي 1448هـ") and https://tawzefak.com/ (reproduce the announcement's conditions)
- https://gph.edu.sa/public/?page=page_306311 (College admissions page)
- study-in-saudi-telegram.md row 19 and #995, #295

## 6. haramain-train-and-city-buses (getting-settled)
The Haramain train and Madinah buses. Chosen as one of the two extra topics because travel to Makkah is asked about often (about 10 asks in the group) and the official facts are firm.

Key facts
- Booking on sar.hhr.sa, the HHR app or Nusuk; same ID as booked; 15% VAT on base fares; fares move with demand; children and infants pay less; counter tickets cannot be changed or refunded; one 25 kg bag (65 x 55 x 35 cm) plus a hand item; excess bags sent by Saudi Post counters; customer care 920004433; about 2 h 20 min to Makkah; station about 9 km from the Haram.
- Madinah Bus: 3.45 SAR, route 400 11.50 SAR, no cash, passes 10, 60 and 240 SAR, wallet refunds only above 50 SAR less 20%, customer care 920000877.

Sources
- https://sar.hhr.sa/travel/fares ; https://sar.hhr.sa/
- https://saudilifeguide.com/haramain-train/
- https://madinahbus.mda.gov.sa/faq.html
- https://saptco.com.sa/en/qr-madinah-bus
- docs/research/living-in-madinah.md rows 1 to 4 and 2.4

Left out (open question): the number and fare of the direct bus between the station and the Haram.

## Health care (item 5 of the brief): not written as a new guide
`doctors-hospitals-and-pharmacies` already has the emergency numbers (997, 911, 999, 998, 937), where to go, hospitals, pharmacies, apps and insurance. A separate guide would mostly repeat it. Suggested additions to that guide are in the session report; the University clinic hours went to open questions.

## The second extra topic considered and dropped
- Studying with the University online: the fee-based online courses are for international students not living in Saudi Arabia (SPA and ajel.sa, Oct 2026), so they matter less to readers already in Madinah. Facts if wanted later: https://www.spa.gov.sa/N2641628 (free distance BA in Sharia with the King Abdullah endowment, men and women, deadline 8 Aug 2026, in-person comprehensive exam), https://www.sra7h.com (online courses, seven fields, until 31 Oct 2026), https://distancelearning.iu.edu.sa/
- Stipend timing and family sponsorship were dropped because the key facts are unconfirmed (existing open questions cover them).
