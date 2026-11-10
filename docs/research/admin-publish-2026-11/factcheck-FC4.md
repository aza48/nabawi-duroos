# Fact-check FC4: residence papers guides and gomedine changes since `bed106c`

Checked 9 November 2026 against gomedine.com (full page text in `docs/research/gomedine-2026-11/raw/NNN-*.txt`, cited by page number; dates from `part-1..4.md` or the page itself), MESH text at `bed106c`, and the Telegram and chat findings where a guide used them. Scope: every guide in `guides-admin-papers-2026-11.ts` read in full, and the sentences added since `bed106c` in 18 other slugs (sentences that only moved were checked against `bed106c`). About 330 specific claims checked; 51 changed, of which 9 removed outright; 15 owner questions settled from raw pages (12 with new text, 3 confirming MESH as it stands). All 21 slugs are done. Nothing left.

`npx tsc --noEmit` and the four content test files pass.

# Changes by guide

## iqama-and-exit-reentry-fees
| Before | After | Source or reason |
|---|---|---|
| Lost iqama: "A replacement costs 1,000 SAR the first time and 2,000 SAR the second time. Your digital iqama in Absher and Tawakkalna stays valid proof of identity meanwhile." | Fee scoped to "a work iqama or a family member's iqama"; digital-iqama sentence removed | 002-guide (19 Apr 2026) gives the fee for a work iqama (employer applies); whether students pay it is open (B2 Q6). The digital-iqama claim is in no source for a lost card (002 says it only for renewals) |
| Expired exit and re-entry visa: "the sponsor can still extend it from Absher as long as the iqama is valid ... If the iqama has also run out, there is no way back" | Extend in Absher before it runs out; once expired, the sponsor extends it online through the Ministry of Foreign Affairs site; watch both dates | 067 (Jawazat answer): Absher extension needs the visa and the iqama unexpired; 110 (2025/26): an expired visa is extended online by the sponsor via the MOFA site. "No way back" is in no source |
| Extension section: "This works even after the visa has expired, while ... their iqama is valid" | "Extend before the visa expires: Absher's extension needs both the visa and the iqama still valid" | 067 |
| "Absher refuses a visa when the passport has less than 90 days left" | "The passport must stay valid for at least 3 months beyond the end of the visa" | 212 (28 Jun 2026, newest) "Passeport valide au moins 3 mois au-delà de la période du visa"; 200 (Jul 2025) and 110 say 90 days at request. Settles owner question E5 (passport part) |
| Fingerprints: "every family member aged 15 or over, so book ... a child who has just turned 15" | "applies to family members too, so check each traveller's fingerprints well before the trip" | 110 (2025/26) says men and women 15+, 212 (Jun 2026) says men 18+: equal sources conflict, age removed (owner question) |
| (new) | "Travel within 3 months, or cancel": use within 3 months of issue; cancel an unused family visa in Absher while valid, within 90 days of issue or before the return date, whichever first; after that a penalty is automatic | 212 (Jun 2026: travel within 3 months of issue); 190 (15 Jun 2025: cancellation window and automatic penalties). Settles owner question E6 except the fine amount (1,000 SAR only in 030, 2023, multiple visas) |

Checked and supported: renewal periods 163/325/488/650 (045), 1,300 SAR from abroad for companions and domestic workers (097), late renewal 500/1,000/deportation (002, 044), police report then Jawazat (002), lost passport list (115, 137), iqama + 90 days and 7-day rule (110, 177, 212), one open visa (110, 212), days or return date (200), SADAD payment (050, 141), extension steps and 180 days and Gregorian date (177), final exit for dependants and AC3052E (073), cancel free, cannot extend, 1,000 SAR fine, Jawazat papers, keep the printout (073, 074), visit visa extension 100 SAR, +500 after expiry, insurance first (029, 054, 055, 056). Renewal hold-ups, birth fine, airline check-in: `bed106c`.

## check-visa-and-iqama-online
| Before | After | Source or reason |
|---|---|---|
| Border number "written by hand in your passport beside the entry stamp" | "Jawazat writes it by hand in your passport" | 053: written by hand in the passport; "beside the entry stamp" not in source |
| "Absher shows the same [insurer, policy, cover, dates] for you and each family member" | "Absher shows whether the insurance is valid, and its expiry date, for you, your wife and your children" (CHI line also gets "whether it is active") | 027 (Dec 2025): Absher's Query Health Insurance shows validity and expiry date for holder, wife, children |
| "A court case, an unpaid amount or an official order can suspend your services" | "A pending legal case can suspend your services or stop you travelling" | 035: legal proceedings or travel bans; unpaid amounts and orders not in source |
| "Any restriction appears with the body that placed it" | "Any case or restriction appears on screen" | 035 says the report is shown and can be printed; nothing on the body |
| Checklist: passport "well over 90 days left after your return date" | "at least 3 months after the visa's return-before date" | 212 (Jun 2026) |
| Checklist: "Every family member's iqama runs past the return date" | "Every traveller's iqama runs at least 7 days past the return-before date" | 110, 177 |

Checked and supported: border number lookup (053, absher.sa/query-border-number, Non-GCC), its uses (053; Absher, SIM and Visitor ID in `bed106c`), host sees it under Extend Visit Visa (053), Muqeem public inquiry with no sign-in (025; 212 Jun 2026 "sans connexion"), exit and re-entry results (025), Absher Inquiries status active/used/expired/cancelled (110), CHI resident and visitor inquiries (027), insurer lookup by visa and passport number, border number and Absher expiry date (055), My Numbers inquiry with code (033), fines with More details map and Tawakkalna Unpaid (084), travel restriction steps (035), 11 Absher reports, steps, reference number, Inquire about a report (099), 28.75 SAR accidents report (101), passport details and visas under Family Members Services, Visa Services, More details (112).

## family-records-on-absher
| Before | After | Source or reason |
|---|---|---|
| Arabic name: "correct it early, because the same spelling goes onto the birth certificate, the bank, the school and every later record" | "a name that does not match the passport gets requests refused at banks and money transfer services, and on family visa applications" | 095 lists those three refusals; the birth certificate and school are not in any source |
| "Print the appointment or keep a screenshot. The last screen lists the papers to bring." | "For Civil Affairs, the last screen lists the papers to bring." | 062 (Civil Affairs) says so; 075 (Jawazat) does not |

Checked and supported: renewal from abroad, steps and conditions (174), late renewal fines (002, 044), card by post, address matching National Address, tracking, fines block it (175), 17.25 SAR by text link, second text with tracking, My Services, Postal Delivery Service, 90 days, iqama, licence or istimara (089), Arabic name correction in Absher, Start Service, free, Jawazat fallback with form (176), own iqama corrected by the sponsor in Muqeem then reprinted at Jawazat, English name at Jawazat against the passport (095), Travel Management through Tawasul (`bed106c`), forms free to download and sold outside offices (094), passport update rules (112, 187), exit and re-entry extension 180 days and 7 days (177), new baby (183, 140), appointment steps, services, green and red slots, modify and cancel with the plus sign (075, 062, 103).

## getting-married-in-saudi-arabia
| Before | After | Source or reason |
|---|---|---|
| "Only a licensed officer can register the contract. The Ministry of Justice lists the licensed officers" | "The officer files the contract with the Ministry of Justice, whose website lists the marriage officers for each city" | 069: the officer creates the contract on the Ministry's site, which lists officers by city; "only licensed" not stated |
| Marriage abroad "handed in at Jawazat so the marriage shows on the iqama records" | "handed in at Jawazat" | 070 gives no purpose |
| Father's consent "(the form is given at Jawazat)"; transfer form "also from Jawazat" | Consent signed before the officer; transfer form, with the note that Ministry of Interior forms are free to download | 070: the forms come from agents outside Jawazat; 094: the forms are free to download |
| "a letter from the husband's sponsor ... A student with a student iqama asks Travel Management for this letter" | "a release letter from the husband's employer agreeing to the transfer, stamped by the Chamber of Commerce"; new line: with a student iqama the University is the sponsor, so ask Travel Management through Tawasul what it needs | 070 is written for work iqamas; that Travel Management issues this letter is in no source (owner question G2 Q3, still open) |
| "the transfer fee, paid in your banking app before the appointment" | "the transfer fee" | 070 names the fee only |

Checked and supported: who can marry, including dependants, family visit and tourist visas, not Hajj or Umrah (069), five Saudi SIMs, iqama or passport copies, witnesses' iqamas, mahr (069), contract on the Ministry of Justice portal by region, a few days of checks, texts to all five numbers to confirm within 24 hours, nikah with groom, bride, guardian, two witnesses and the officer at a place you choose, consent asked of both, PDF contract (069), attestation abroad (069), marriage abroad attestation chain (070), transfer papers, Resident services appointment, new card printed at another window (070).

## visas-for-family-and-visitors (added lines only)
| Before | After | Source or reason |
|---|---|---|
| Host's iqama "at least 3 months left on the day of the application" | "at least 4 months left" | 028 (31 Jul 2025, the dated page) says 4 months; 068 (undated) says 3; MESH's older text said 90 days. Settles owner question E7 |
| Refusal for "a mistyped detail such as a passport or visa number" | "such as a wrong visa number" | 068 gives the visa number only |
| SADAD path "Payments, then Government payments, then Passports (some banks call it Alien Control or Jawazat)"; "insurance ... costs more for older visitors" | "SADAD or Payments, then Government payments, then Alien Control (Jawazat)"; "The insurance is paid for separately" | 056 names the beneficiary Alien Control; "Passports" and the age claim are not in any source (055 gives one quote only) |
| Absher step "open the service Extend Visit Visa (تمديد تأشيرة زيارة)" | "My Services, then Passports, then Visitor services" | 152 (updated 4 Mar 2026) gives this path; the Family Members Services path is from 054 (2023). Settles owner question E10 for the visit visa extension path |
| "If the online request fails for another reason, use the Absher communication service." | removed | Only 054 (2023) mentions a Tawasul route, contradicted by other pages (part-1 owner question 5) |
| Certificates attested "(an apostille from a country in the Apostille Convention replaces both)" | parenthesis removed | 098 says this for French documents only (part-1 owner question 12) |
| "The visa application form and the conversion undertaking, both given at Jawazat" | "The visa application form, available at Jawazat, and a signed undertaking for converting the visit visa to an iqama" | 098: the form is at Jawazat or offices nearby; the undertaking is a sample to fill in |
| "Students with a student iqama ask Travel Management for the sponsor's letter first." | "With a student iqama, the University is the father's sponsor, so ask Travel Management through Tawasul what it needs before you book the appointment." | 098 is for work iqamas; Travel Management giving this letter is in no source (owner question G2 Q3) |

Checked and supported: US, UK and Schengen holders and their spouse, children and parents, national airlines (202, updated 16 Jun 2026), extension from 7 days before, 100 SAR, insurance, 180 days (152, 054, 029, 056), relatives list and refusals, Hajj season 1 Ramadan to 1 Safar (068), Umrah visa on Nusuk with hotel and transport, 30 days to enter, last entry 23 Mar 2027 (189, 210, 213), Tasheer biometrics, under 6, any centre and the capital as "Coming place", collection by a representative, the papers (204), insurance lookup (055), fee table and insufficient funds message (056), Absher steps and checking the date (152), children to iqama: both parents with iqamas, under 18, city of the sponsor, Resident services appointment, papers, company and Chamber of Commerce stamps, one form in Madinah, dependant fees to the iqama's expiry, visit visa cancelled, 2 to 5 working days (098). Renting on a Visitor ID not touched (see owner questions).

## having-a-baby-in-madinah (added lines only)
| Before | After | Source or reason |
|---|---|---|
| "Start in the first week." | removed | Not in any source (the rule is the 30-day late fee, kept) |
| "The hospital ... registers the birth with Civil Affairs" | "The birth is declared at the hospital where your baby is born" | 183; 060 says the hospital sends the notice to the Ministry of Health |
| "A mistake here follows your child onto every later document." | removed | Not in any source |
| "The hospital's notice reaches the Ministry of Interior first, and a text message tells you when it has arrived" | "The hospital sends its birth notice to the Ministry of Health, and a text message from the Ministry of Interior tells you when the birth is recorded" | 060 |
| "The office gives you the birth registration form" | "Fill in the birth registration form (form 87), pay the 50 SAR late fee if the baby is more than 30 days old" | 060 lists form 87 and the late fee in the office papers; it does not say the office hands the form out |
| "Embassies ask for the birth notification translated by a translator they accept" | "Read your embassy's website for its list of papers before you go: it can ask for the birth notification translated by a translator it approves" | 185 is one consulate's rule, so not stated for every embassy |
| Mother on a visit visa: "has no entry record, so Jawazat has to clear the baby to leave" | "needs an exit stamp from Jawazat before leaving" | 060 gives the exit stamp, not the reason |

Checked and supported: original notification issued once, copies, embassy (185), Absher path to view the certificate (183), 50 SAR after 30 days paid online (060, 062), up to two weeks, New Born Registration under one year with a National Address, spelling, postal delivery or collection (060), Civil Affairs appointment at any office in the region (062), 20 minutes early and the office papers (060), MOFA attestation before the embassy (060), newborn iqama fees, one PDF under 1 MB and its order, born-abroad papers, Tawasul sector and services, two texts, Jawazat appointment and papers, one request per child (140), three months for a baby born abroad (`bed106c`), mother on a visit visa: 15 days, Expatriate Affairs section and papers (060).

## baby-vaccinations (FAQ, changes since bed106c)
No change. New text: polio certificate for a baby born abroad (140) and schools asking for the vaccination record (003): both supported.

## bringing-parents-to-visit (added lines only)
| Before | After | Source or reason |
|---|---|---|
| (new) | "Once they have entered, your parents may stay up to 90 days, within the season's dates above." | 213 (20 Jul 2026): stay up to 90 days from entry, per the Ministry's FAQ; 143 (Jun 2026) said "30 or 90, sources differ". Settles the stay-length part of owner question E11 |

Checked and supported: Umrah visa through Nusuk or a licensed agent with hotel and transport recorded first, 30 days to enter (189, 213), 1448 season dates (210, 213), no mahram needed (213), every valid visa allows Umrah with a Nusuk permit (213), permits stop 1 Dhul Qa'dah 1448 (`bed106c` hajj-as-a-student), Tasheer fingerprints for a family visit visa (204), CHI visa inquiry (027), extension rules (029, 054, 055, 056).

## umrah-rawdah-quba (added lines only)
No change. Supported: confirm or cancel reminder 24 hours before, barcode gates at the slot time, special needs path (133); book before arrival, Friday afternoon releases and 30-minute batches, men's and women's categories, times and Gates 37 and 25, babies not admitted and own permit from 5, arrive 30 minutes early, no photos, free permit and paid access a scam, Nusuk only (100, updated 2026/27); free wheelchairs at Masjid al-Haram round the clock, ask any worker, register and return after Umrah (147); every visa allows Umrah with a permit (213).

## phone-sims-and-absher (added lines only)
No change. Supported: SIM cancelled in a branch within 24 hours (093), Nafath mobile change with the four fingers of the left hand, focus and distance, about 10 minutes (092; menu names in `bed106c`), Absher registration with iqama or border number, mobile and email, three ways to activate, Nafath steps, kiosk with fingerprints and registered mobile, Jawazat by appointment (114, 136), SIM transfer in a branch with both iqamas and Absher numbers, or in an operator's app accepted within 24 hours with Nafath (131).

## living-on-a-visitor-id (added lines only)
| Before | After | Source or reason |
|---|---|---|
| Border number "written by hand in your passport beside the entry stamp" | "Jawazat writes it by hand in your passport" | 053 (same fix as check-visa-and-iqama-online) |

Checked and supported: border number lookup from visa number and issue date (053), Muqeem public inquiry with visa number and passport number (025, 212), stipend paid onto the University card (telegram c1 #77, c3 #49, c4 #44; money guides belong to other checkers). Renting on a Visitor ID not touched.

## kindergartens-and-schools (added lines only)
| Before | After | Source or reason |
|---|---|---|
| "International schools run English, Cambridge or national tracks alongside the Saudi curriculum." | "International schools follow British, American, IB or other national curricula." | 003 (19 Apr 2026) lists British, American, IB, French and Pakistani curricula; "Cambridge" and "alongside the Saudi curriculum" not in it |
| (new) | Government schools do not take children on a visit, tourist or Umrah visa; an iqama holder's child needs a Ministry of Education authorisation letter (quota for expatriates) and a letter from the parent's employer; some private schools take only children with an iqama | 201 (28 Aug 2025) and 162 (Jun 2024): no state school on those visas; 003: the two letters for public schools; 164 and 167 (Aug 2024): two private schools require the child's iqama. Settles owner question E4 (and part-3 Q8) except for Visitor ID children |
| Documents: "The parent's iqama or Visitor ID, and passport"; "The child's passport with a valid visa, or the child's iqama" | "The parent's iqama and passport"; "The child's passport, and the child's iqama if he or she has one" | 003 lists the parent's iqama and passport and the child's passport and iqama; Visitor ID not in any source |
| "Many schools give 10% off ... Many close registration ... in late August, so apply in the spring or early summer" | "Some schools give 10% off ...; Some private schools close registration in late August, and international schools open theirs from January or February, so apply early in the year" | 164 and 167 are two schools only; 003: international registration opens January to February |
| Dar al-Hadith "a placement exam in person" | "... in May or June" | 160 |
| Ma'had "One registration window a year" | adds "for 1448 it ran from 5 to 20 Safar (19 July to 3 August 2026)" | 188 (1448 announcement, 20 Jul 2026). Settles owner question E2 for 1448; `sisters-studying-in-madinah` (not my slug) still says Dhul Qa'dah |
| (new) halaqat bullet | "Men's circles are at Gate 22, first floor, and women's at Gate 24 or Gate 13, second floor." | 158 (updated 17 Jun 2026) states the gates plainly. Settles part-3 owner question 6 |
| Dar al-Hadith "pays its pupils a monthly allowance" | "of about 300 SAR in intermediate and 350 SAR in secondary" | 160 (12 May 2024), the only source; MESH had no figure. Settles owner question E12 (amounts, exam month; the child must hold an iqama, so a Visitor ID child cannot join) |

Checked and supported: stages, ages and lengths, school hours (003), parent and child documents, photos, vaccination record, reports, leaving certificate (003), Noor with Nafath (003), changing school and the term fee (003), private fees 9,000 to 25,000 and extras, bus 3,000 or more (003, 164, 167), Dar al-Hadith ages, iqama, Arabic, juz, certificate equated, subjects, IU priority, government secondary (160), halaqat from 5, any visa, Saudi number, reg.qm.edu.sa, times, online, rewards to a bank account (158, 135), Ma'had ages, iqama and sponsor consent (145, 188). Discount line: `bed106c`.

## drivers-license (added lines only, plus one settled owner question)
| Before | After | Source or reason |
|---|---|---|
| Taqdeer: "The estimate sets what the insurer pays." | "You need the estimate for the insurance claim." | 102 says only that the claim follows the Taqdeer report |
| Visitor row: "with an International Driving Permit if it is not in English or Arabic" (older line) | "with an International Driving Permit or an Arabic translation from an approved office if it is not in Arabic" | 169 (updated 17 Jun 2026): Muroor's 2026 point that foreign licences need an approved translation; carry an IDP or approved Arabic translation for any licence not in Arabic. Settles owner question E14 (first part) and part-4 conflict 3 |

Checked and supported: 993 and Najm steps, inspector, the two texts, rental car (102), claims, 15 days, uninsured other driver, Muroor final report, Najiz, Taradhi, execution court (102), repair permit within 90 days, one a year for unrecorded damage, 24-hour expiry (083), accidents report 28.75 SAR, two years (101), hit and run and the penalties (102), istimara renewal conditions, 180 days, fee bands 0 to 190 SAR by engine size or fuel economy, card kept or posted within 90 days or printed at the Muroor (080), inspection after three years then yearly, needed to sell, vi.vsafety.sa booking, More details (041, 077, 096), insurance in Vehicle Management and the 150 SAR fine (081), driver authorisation steps, conditions, inside and outside, one driver per car, fines to the driver, cancelling (078), impounded car (091), cards by post 17.25 SAR, three working days (080, 089). Family on visit visas driving: 169 (Jun 2026, Traffic Law art. 42) confirms MESH's one year for all visitors, so G2 owner question 1 is settled with no change (078's 6-month footnote is undated and tells readers to check).

## drive-on-visit-visa (FAQ)
| Before | After | Source or reason |
|---|---|---|
| "Carry the original licence, make sure its class matches" | adds "with an International Driving Permit or an Arabic translation from an approved office if it is not in Arabic" | 169 (Jun 2026), as above |

Supported: one year from entry or licence expiry, tourist, Umrah and family visit visas, class must match, Najm, Gulf licences and Gulf IDPs (169).

## traffic-fines (FAQ)
| Before | After | Source or reason |
|---|---|---|
| "the service for objecting to a traffic violation" | "Dispute traffic violation" | 043 gives the English button name. Settles the traffic-objection label in owner question E10 |
| "Rejected objections count against you, and repeated ones suspend the service." | "Rejected objections count against you: after 5 rejections in a year, you cannot object to any more fines that year." | 043 states the 5-a-year rule plainly (part-1 owner question 7) |

Supported: 30 days, computer for the photo, reason, no punctuation, list of disputed violations, about a week, 7 days then a Muroor appointment with إجراءات الهيئات المرورية (043).

## buying-a-used-car (FAQ)
| Before | After | Source or reason |
|---|---|---|
| "Residents may own private cars only, and at most two cars at a time." | "Residents may own at most two private cars at a time." | 171 (Muroor answer, Oct 2024): personal vehicles, no more than two; "private cars only" is not stated |
| "Accept soon after the seller creates it, because the request expires." | "Accept within one hour of the seller creating it, because the request expires after that." | 059 states one hour twice |
| "If Absher keeps refusing the transfer, the traffic department completes it in person with an appointment." | "a car transfer office completes it by hand" | 059 |

Supported: 150 SAR by SADAD with both iqama numbers and the sequence number, seller and buyer steps, IBAN refund, 72 hours in banking hours, 230 SAR added (380 in all), 500 to 200,000 SAR, the release code (059).

## renew-passport-in-saudi (FAQ)
No change. Supported: last 12 months, inside the Kingdom, no unpaid fines (112, 187), coming back on the new passport (112), Absher Tawasul request, PDF under 1 MB, file name, iqama and border number, one request each, about a day (112), Jawazat route with the free Naqal Maloomat form, Absher updated within a day or two with a text (094), checking under Visa Services, More Details (112), lost passport (115, 137). Menu path from `bed106c`.

## student-iqama-renewal, absher-nafath-activation, check-health-insurance, check-sims-on-iqama (FAQs)
No change. Supported: 3-day late renewal fine of 500 SAR (002, 044) and family renewals in Absher (174); Nafath, kiosk and Jawazat activation (114, 136); CHI and Absher insurance checks, visitor inquiry, insurers' lookup (027, 055); My Numbers inquiry with a code (033).


# Kept, resting on student reports only

None. Every claim kept in these guides rests on a gomedine page or on `bed106c` text. The one line resting on Telegram reports (stipend paid onto the University card, `living-on-a-visitor-id`) is agreed by c1 #77, c3 #49 and c4 #44, and belongs to the money guides' checkers.

# Owner questions

## Settled from gomedine raw pages (published or confirmed)

| Question | Answer published | Page and date | Guide |
|---|---|---|---|
| E5, part-3 Q3, part-4 Q3: iqama and passport validity for an exit and re-entry visa | Iqama: the visa's length plus 90 days (already published). Passport: at least 3 months beyond the end of the visa | 212 (28 Jun 2026, newest; 200 of Jul 2025 says 90 days at request), 110, 177 | `iqama-and-exit-reentry-fees`, `check-visa-and-iqama-online` |
| E6, part-1 Q4, part-4 Q4: unused exit and re-entry visa | Travel within 3 months of issue; cancel an unused family visa in Absher while valid, within 90 days of issue or before the return date, whichever first; after that a penalty is automatic. Muqeem's public page needs no sign-in | 212 (Jun 2026), 190 (15 Jun 2025) | `iqama-and-exit-reentry-fees` |
| E7, part-1 Q3: host's iqama validity for a family visit visa | At least 4 months | 028 (31 Jul 2025); 068 (undated) says 3 | `visas-for-family-and-visitors` |
| E10 (part): visit visa extension path and traffic objection label | My Services, Passports, Visitor services; Dispute traffic violation | 152 (4 Mar 2026), 043 | `visas-for-family-and-visitors`, `traffic-fines` |
| E11 (part): Umrah visa stay | Up to 90 days from entry, within the season | 213 (20 Jul 2026) | `bringing-parents-to-visit` |
| E12, part-3 Q9: Dar al-Hadith | About 300 SAR a month (intermediate), 350 (secondary); placement exam in May or June; the child must hold an iqama, so a Visitor ID child cannot join | 160 (May 2024, the only source) | `kindergartens-and-schools` |
| E2, part-3 Q1: Ma'had registration window | For 1448: 5 to 20 Safar (19 July to 3 August 2026) | 188 (20 Jul 2026, official 1448 dates) | `kindergartens-and-schools`. `sisters-studying-in-madinah` (not my slug) still says Dhul Qa'dah and should be synced |
| E4, part-3 Q8 (visit visas): government schools | Not open to children on a visit, tourist or Umrah visa; iqama holders' children need a Ministry of Education letter and the employer's letter; some private schools take only iqama holders | 201 (28 Aug 2025), 162, 003 (19 Apr 2026), 164, 167 | `kindergartens-and-schools` |
| E14, part-4 Q2: foreign licence language | Carry an IDP or an approved Arabic translation with any licence not in Arabic | 169 (17 Jun 2026) | `drivers-license`, `drive-on-visit-visa` |
| Part-1 Q7: rejected traffic objections | 5 rejections in a year end objections for that year | 043 | `traffic-fines` |
| Part-3 Q6: halaqat gates | Men Gate 22, first floor; women Gate 24 or 13, second floor | 158 (17 Jun 2026) | `kindergartens-and-schools` |
| G2 Q1: family on visit visas driving | One year from entry for all visitors, as MESH says; no change | 169 (Jun 2026, Traffic Law art. 42); 078's 6 months is an undated footnote | none |
| Part-1 Q5: multiple-entry family visit visa extended without leaving | Yes, in Absher, as MESH says; no change | 152 (4 Mar 2026) | none |
| Part-1 Q8: first periodic inspection after 3 years | Already published; confirmed | 041, 096 | none |
| Buyer's time to accept a car transfer (part-2 finding 52) | One hour | 059 | `buying-a-used-car` |

## Still open (no clear, recent raw page)

1. **Renting on a Visitor ID through Ejar (E1, part-4 Q1).** Left alone as instructed. 206 (19 Jan 2026) says Ejar needs a Saudi ID or an iqama, but MESH's "yes" rests on Ejar's own clarification of 31 Aug 2026 (`docs/research/factcheck-2026-11.md`, `community-2026-11-09.md`), which is newer. Not settled.
2. **Fingerprint age for exit and re-entry.** 110 (2025/26): men and women 15 and over; 212 (Jun 2026): men 18 and over. Age removed from `iqama-and-exit-reentry-fees`. Which is right?
3. **Expired exit and re-entry visa.** 067 (Jawazat answer, undated): Absher's extension needs the visa unexpired; 110 (2025/26): an expired visa is extended by the sponsor online through the Ministry of Foreign Affairs site. Published that way; please confirm the MOFA route still works and which page.
4. **Fine for not cancelling an unused exit and re-entry visa.** 1,000 SAR only in 030 (2023, multiple visas); 190 says "financial penalties". Amount not published.
5. **Students in family procedures (G2 Q3).** Does Travel Management give the sponsor's letter for moving a wife's iqama to her husband, or children from a visit visa to an iqama? Both guides now tell students to ask Travel Management through Tawasul what it needs, without promising the letter.
6. **Marriage guide (G2 Q4).** Five-SIM rule and text confirmations with Najiz and Nafath, premarital screening, telling the University.
7. **Dependant levy and students; 2,000 SAR per family or per child (E13, part-1 Q1, Q2).** 048 (2023) and 098 (2024) say one 2,000 SAR payment per family; 140 (2024) charges 2,000 SAR per baby born abroad. Not changed.
8. **Lost iqama fee for students (B2 Q6, FC2 Q2).** `iqama-and-exit-reentry-fees` now gives 1,000/2,000 SAR for work and family iqamas only.
9. **Can a student iqama host a family visit visa (E8)?** No raw page answers it (106 lists "university student" among professions for the permanent family visa only).
10. **Visit visa family with a new passport (E9, part-3 Q4).** Only 112 (Dec 2023) says Jawazat in person.
11. **Visitor ID and schools, the one-year visitor driving rule, Dar al-Hadith (E4, E14 second parts).** No page covers the educational visa.
12. **School year: three terms or two semesters (E15, part-1 Q10).** 003 (19 Apr 2026) gives a three-term 2025-2026 calendar "since 2021"; part-1 flagged it as likely out of date. Not published; please confirm the 1448 Ministry calendar.
13. **Umrah visa: meningitis vaccine, fee, multiple-entry visa (E11, part-3 Q13, part-4 Q9, Q10).** 213 (Jul 2026) says ACWY is required and the fee is about 300 SAR; 143 (Jun 2026) says the vaccine is not required and quotes 80 USD. Not published.
14. **Rawdah permit frequency (G2 Q2).** 100 says once in 365 days and quotes a 45-day app message.
15. **Hajj season window for family visit visa applications (G2 Q5).** Kept (068, undated, the only page).
16. **Passport update "over 18" and "once every five years" (part-4 Q5).** 187 (May 2025) says so, but 112 describes the head of family updating children's passports; not published.
17. **Car rental on a foreign licence while the iqama is processed (part-4 Q18).** 169 states it, then calls it a grey area. Not published.
18. **25% discount for paying a single fine early (part-4 Q6).** 169 cites a foreign legal blog, not Muroor. Not published.
19. **Visit visa emergency cover (E3, part-3 Q5), overstay fines, Hajj-season suspension for some nationalities (part-4 Q7, Q8), travel restriction English label (E10).** No clear page.

## For other guides (not my slugs)

- `sisters-studying-in-madinah`: Ma'had registration for 1448 was 5 to 20 Safar (188), not Dhul Qa'dah.
- `finding-an-apartment`: 004 (19 Apr 2026) gives the agent's commission as 2.5% of the annual rent (part-1 Q9); 066 gives the early termination rule (G2 Q6).
