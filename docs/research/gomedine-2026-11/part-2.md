# French-language Madinah community site, part 2 of 4 (pages 056 to 110)

**README.** This is a third-party, French-language community website about living in Madinah, written for French-speaking expatriates, families and students. It was crawled on 9 November 2026 and stripped to text, one file per page. This part covers group 2: 55 pages, files `056-post.txt` to `110-post.txt` in `scratchpad/gm/clean2/`. Every file was read in full. The crawl left the PUBLISHED and MODIFIED fields empty for all 55 pages, so each date below is taken from the page itself (a year in the title or text, a dated rule it reports, or a "mis à jour" note); "undated" means the page gives no clue. Most pages are translations of English expatriate guides from 2023 and 2024; four were updated in 2025 or 2026 (`100` Rawdah, "2026/27"; `104` and `105` Qiwa, "2026"; `110` visa status, "2025/26"). A fee or rule from 2023 that MESH states differently today is treated as the site being out of date, and said so. Pages that only promote a business, a paid office or the site's own channels were skipped for content (listed at the end of section 2). Pages about work contracts, Qiwa, sponsorship transfer and Huroob concern workers only and are out of MESH's scope, since students may not work (2.11). The site's name, URL and authors appear nowhere in section 4. Findings were checked against the seed files on branch `claude/resume-guide-validation-8uugen`, which now carry the merged text of tasks A to E; each status line names the MESH guide or FAQ slug.

## 1. Summary

The pages cover exit and re-entry visas (conditions, extending for family abroad, the doubled fees abroad, checking status), final exit (dependants, cancelling, the 60-day limit), visit visa extensions and family visit visa refusals, a newborn's birth certificate and the case of a mother on a visit visa, marriage between foreigners in the Kingdom and moving a wife's iqama to her husband, Absher appointments at Jawazat, Civil Affairs and the traffic department, Absher reports and postal delivery of cards, name corrections, Jawazat forms, SIM cancellation, changing the Absher mobile in Nafath, Tawakkalna registration, the National Address, a long run of car pages (ownership transfer, istimara renewal, periodic inspection, insurance, driver authorisation, repair permits, accidents and Najm, impounded cars, accident reports), Ejar and Najiz, electricity bills, the Rawdah (updated for 2026/27), and workers' pages (Qiwa, transfers, Huroob, profession lists).

**The 10 most valuable findings for MESH readers**

1. **Absher appointments, one method for three offices:** Appointments, then Passports, Civil Affairs or Traffic, then Book new appointment; "Resident services" at Jawazat covers almost everything; fingerprint appointments are booked separately for the resident and for his family. MESH had no section on booking. (`075`, `062`, `103`)
2. **A newborn's birth certificate when it does not show in Absher:** the Ministry of Interior's text can take up to two weeks; then Absher Services, Civil Affairs, New Born Registration (baby under one year, National Address registered); fallback is a Civil Affairs appointment with a set list of papers. (`060`, `062`)
3. **A baby born to a mother on a visit visa needs Jawazat's exit clearance** at the Expatriate Affairs section, at least 15 days before travel, with a set list of papers. (`060`)
4. **Final exit for dependants:** passport valid at least 60 days, inside the Kingdom, no car, no fines; free to cancel while valid; cannot be extended; 1,000 SAR fine for not leaving within 60 days; keep the printout for later visa applications. (`073`, `074`)
5. **Online car ownership transfer:** 150 SAR fee first, seller starts the sale, buyer accepts, pays into Absher's account within 72 hours, and releases the money with a code only after receiving the car. (`059`)
6. **Owning a car in Absher:** istimara renewal conditions (less than 180 days left, insurance, inspection, fines paid), the yearly fee by engine size or fuel economy, compulsory online booking for the periodic inspection, driver authorisation rules, and the impounded-car inquiry. (`077`, `078`, `080`, `081`, `091`, `096`)
7. **After an accident:** traffic police on 993 for injury, fire or no insurance, Najm for the rest; Taqdeer estimate; claim from the at-fault insurer; the Najiz and Taradhi route when the other side has no insurance; a repair permit in Absher before any garage work. (`083`, `101`, `102`)
8. **Paying a visit visa extension:** SADAD, Government payments, Passports (Alien Control), Extend visitor visa, with the visitor's border number; Absher's "insufficient funds" message means the fee has not arrived. (`056`)
9. **Family visit visa refusals:** the host's iqama needs 3 months left, the relative must be on the Ministry's list, and details must be typed exactly. (`068`)
10. **Absher reports** (travel record, family members, vehicles, accidents, Muqeem report) and how to check one someone gives you; postal delivery of an iqama, licence or istimara for 17.25 SAR within 90 days. (`089`, `099`, `101`)

## 2. Findings by MESH topic

### 2.1 Exit and re-entry visas (`iqama-and-exit-reentry-fees`, `check-visa-and-iqama-online`)

1. **Exit and re-entry status is checked in Absher (Inquiries, exit and re-entry visa status, with the iqama number and the passport or visa number; result: active, used, expired or cancelled) or on Muqeem's public inquiry at vv.muqeem.sa.**
   `110-post.txt`, `/fr_fr/comment-connaitre-le-statut-de-visa-des-detenteurs-diqama/` (2025/26). Status: CONFIRMS `check-visa-and-iqama-online` (Muqeem); NEW: the Absher inquiry and its four statuses
2. **Conditions for issuing the visa: sponsor and sponsored person in good standing (not reported dead, absent from work, or in breach of Istiqdam rules); all traffic fines paid; no unpaid visa-cancellation penalty; no other valid visa; the traveller inside the Kingdom; passport valid at least 90 days; return at least 7 days before the iqama expires; the Gregorian date wins over the Hijri; fingerprints on file for every sponsored man and woman aged 15 and over; the fee paid.**
   `110-post.txt`, same path (2025/26). Status: CONFIRMS `iqama-and-exit-reentry-fees` ("Absher refuses a visa when the passport has less than 90 days left", "One open visa at a time", "the Gregorian date counts"); NEW: the age of 15 for fingerprints
3. **For a visa set by number of days, the iqama must be valid for the visa's length plus 90 days.**
   `110-post.txt`, same path (2025/26); `087-post.txt`, `/fr_fr/est-il-possible-de-prolonger-un-visa-exit-re-entry-apres-son-expiration-en-arabie-saoudite/` (undated, about 2023). Status: NEW. Same rule as part 3 owner question 3, now in two more pages. Not published: section 5.
4. **An expired exit and re-entry visa "can be extended online by the sponsor through the Ministry of Foreign Affairs site"; `087`'s title also promises an extension after expiry, but its steps describe an extension before expiry, with the person outside the Kingdom.**
   `110-post.txt`, same path; `087-post.txt`, same path. Status: CONFLICTS `iqama-and-exit-reentry-fees`: MESH says "An exit and re-entry visa that runs out while you are abroad leaves you outside with no way back on that iqama". Section 3 and 5.
5. **Jawazat confirmed that a family member's exit and re-entry visa can be extended while they are outside the Kingdom, from Absher (Family Members, Visa Services, choose the length, confirm), once the fee is paid; the iqama and the visa must both still be valid.**
   `067-post.txt`, `/fr_fr/comment-prolonger-le-visa-de-sortie-entree-24-heures-avant-son-expiration-pour-les-membres-de-votre-famille-a-lexterieur-de-larabie/` (undated). Status: CONFIRMS `iqama-and-exit-reentry-fees` ("Extending a family member's visa while they are abroad")
6. **Extension fees: 100 SAR for a single visa, 200 SAR for a multiple visa.**
   `087-post.txt`, same path (about 2023). Status: CONFLICTS in part with `iqama-and-exit-reentry-fees` (200 and 400 SAR a month from abroad). `097` shows the doubling came later, so this page is out of date; MESH is current.
7. **The Cabinet doubled the fees for extending an exit and re-entry visa from abroad: 200 SAR a month (single) and 400 SAR a month (multiple). Issuing is unchanged: about 100 SAR a month for a single visa, 500 SAR for the first 3 months of a multiple visa and 200 SAR for each further month.**
   `097-post.txt`, `/fr_fr/larabie-saoudite-double-les-frais-de-entree-sortie-et-diqama-pour-les-expatries-hors-du-pays/` (2023). Status: CONFIRMS `iqama-and-exit-reentry-fees` (all four figures)
8. **The iqama renewal fee for "companions" (مرافقين) and domestic workers renewed while they are outside the Kingdom doubles to 1,300 SAR. The page says companions are not dependants but people under "sponsorship" in Absher: father, mother, brother, sister, or a spouse who first came with the resident.**
   `097-post.txt`, same path (2023). Status: NEW. Whether this touches a student's wife and children renewed from abroad (`family-records-on-absher`: "You can renew a dependant's iqama in Absher even while that person is outside Saudi Arabia") is unclear: section 5.

### 2.2 Final exit (`iqama-and-exit-reentry-fees`, `graduate-procedures`)

9. **A worker can request his own final exit in Absher if no car is in his name, all dependants' final exits are issued, all visiting family have left, and the iqama has more than 32 days left; the employer has 10 days to answer; that visa is valid 15 days.**
   `073-post.txt`, `/fr_fr/comment-obtenir-un-visa-de-sortie-definitive-en-arabie-saoudite/` (undated, about 2022). Status: workers only. The 32 days differs slightly from MESH's "at least 30 days left" (`iqama-and-exit-reentry-fees`, `graduate-procedures`), but applies to this worker route only. No change.
10. **A dependant's final exit is issued by the head of family in Absher: Family Members, Visa Services, Next, More details, Issue final exit visa. Conditions: no car in the dependant's name, the dependant inside the Kingdom, valid iqama, passport valid at least 60 days, no unpaid violations, and (on a work iqama) dependant fees paid for 60 days from the visa date. Error "AC3052E: Insufficient funds" means a fee is unpaid.**
    `073-post.txt`, same path. Status: CONFIRMS `graduate-procedures` (fines, car, valid iqama); NEW: passport 60 days, menu, error code. Published in `iqama-and-exit-reentry-fees` (the 60-day levy rule left out: it is for work iqamas)
11. **A final exit is valid 60 days from issue; not leaving in time costs a 1,000 SAR fine; cancelling within the 60 days is free (dependants: same Absher page; workers: the employer); after expiry it is cancelled only at Jawazat (Resident services) with a form, a letter, copies, two white-background photos and any iqama fees due; it cannot be extended, only cancelled and issued again.**
    `073-post.txt`, same path; `074-post.txt`, `/fr_fr/comment-annuler-le-visa-de-sortie-definitive-en-arabie-saoudite/` (undated). Status: CONFIRMS "valid for 60 days" (`iqama-and-exit-reentry-fees`); NEW: the rest. Published.
12. **Print the final exit: Absher says it is not needed, but Saudi embassies ask for the final exit paper when the same person later applies for a Saudi visa.**
    `073-post.txt`, same path. Status: NEW. Published.
13. **Banks close the accounts of expatriates who take final exit.**
    `073-post.txt`, same path. Status: CONFIRMS `graduate-procedures` ("Banks close the accounts of expatriates on final exit")
14. **Iqama cards need not be handed in at Jawazat after final exit.**
    `073-post.txt`, same path. Status: NEW, minor. Not published.

### 2.3 Absher appointments, reports, cards and names (`family-records-on-absher`, `check-visa-and-iqama-online`, `renew-passport-in-saudi`)

15. **Jawazat appointment: Absher, Appointments, Passports, Proceed to service, New appointment. Services: biometrics for residents (men), biometrics for residents' companions, Resident services (everything else, including a newborn's iqama and a passport update), and an inquiry on incoming transactions when an entry or exit is missing from the system. Choose region, number of transactions and office; green slots free, red taken; confirm, print or screenshot. Modify or cancel with the plus sign.**
    `075-post.txt`, `/fr_fr/comment-prendre-rendez-vous-aupres-de-jawazat-via-absher/` (undated). Status: NEW. Published in `family-records-on-absher`.
16. **Civil Affairs appointment for a birth: Absher, Appointments, Civil Affairs, Proceed to service, Book new appointment, service تسجيل واقعة ميلاد, region and branch; any office in the region where the baby was born; the last screen lists the documents.**
    `062-post.txt`, `/fr_fr/comment-obtenir-un-rendez-vous-a-ahwal-madani/` (undated). Status: NEW. Published in `family-records-on-absher` and `having-a-baby-in-madinah`.
17. **Traffic (Muroor) appointment: Absher, Appointments, Traffic, Proceed to service, Book new appointment; 24 purposes, among them استبدال رخصة قيادة, طباعة رخصة سير مركبة, طباعة إذن إصلاح مركبة, إصدار رخصة قيادة بدل تالف / فاقد, إجراءات الهيئات المرورية and إستبدال رخص القيادة الأجنبية (نساء).**
    `103-post.txt`, `/fr_fr/comment-prendre-un-rendez-vous-au-muroor-avec-absher/` (undated). Status: CONFIRMS `drivers-license` ("Appointments (مواعيد), then Traffic, then Replacement of driving licence") and `traffic-fines` (إجراءات الهيئات المرورية); NEW: the other purposes. Published in `family-records-on-absher`.
18. **Ministry of Interior forms (iqama form for issue, renewal, lost or damaged card, newborns; exit and re-entry; transfer; adding a dependant; passport update or Naqal Maloomat; Istiqdam) are free to download; people outside the offices charge for them and for filling them in. Forms are in Arabic and filled in Arabic.**
    `094-post.txt`, `/fr_fr/telecharger-le-formulaire-istiqdam-formulaire-de-mise-a-jour-du-passeport-formulaire-iqama/` (undated). Status: NEW. Published in `family-records-on-absher` (forms are free).
19. **The same page says Absher "most of the time" fails to update passport details, so people go to Jawazat with the passport update form; Jawazat updates at once and Absher shows it in a day or two, with a text message.**
    `094-post.txt`, same path (undated, older). Status: CONFLICTS in emphasis with `renew-passport-in-saudi` (Absher first, then Absher's Tawasul). MESH is newer and right to put Absher first; the Jawazat visit was added as a further fallback.
20. **Name corrections: an error in the English name is corrected at Jawazat against the passport; an error in the translated Arabic name is corrected by the sponsor in Muqeem (تعديل الاسم المترجم), then the card is reprinted at Jawazat.**
    `095-post.txt`, `/fr_fr/comment-changer-de-nom-sur-liqama-en-arabie-saoudite/` (undated). Status: CONFIRMS `family-records-on-absher` (Arabic name for dependants); NEW: own iqama through the sponsor (for a student, Travel Management) and the English name at Jawazat. Published.
21. **Postal delivery of an iqama, driving licence or istimara: within 90 days of issue or renewal, Absher, My Services, Postal Delivery Service, Request; choose the document, the National Address and a mobile number; Saudi Post texts a link to pay 17.25 SAR, then a tracking number; about three working days.**
    `089-post.txt`, `/fr_fr/comment-demander-la-livraison-postale-a-votre-domicile-depuis-absher/` (undated); `059`, `080` (same fee). Status: CONFIRMS `family-records-on-absher` ("Getting the iqama card posted home"); NEW: 90 days, 17.25 SAR, the menu. Published.
22. **Absher's "update user information" tab changes the password, email, mobile number and address.**
    `064-post.txt`, `/fr_fr/tout-ce-que-vous-pouvez-modifier-directement-sur-lapplication-absher/` (undated). Status: CONFIRMS `phone-sims-and-absher` in substance. No change.
23. **Absher Reports (Services, General Services, Absher Reports) offers 11 reports: family members, vehicles, traffic violations, traffic accidents, travel record, domestic workers, accident and violation settlements, Muqeem report, criminal record, visitor. A report someone gives you is checked with "Inquire about a report", its reference number and the requester's iqama number.**
    `099-post.txt`, `/fr_fr/comment-verifier-controler-les-rapports-sur-absher/` (undated). Status: NEW. Published in `check-visa-and-iqama-online` (the criminal record report left out: whether residents get one through Absher is not clear).
24. **National Address: Absher, My Services, General Services, National Address Service (register, add for a dependant with the plus button, modify, print proof), or the Saudi Post site; you need the building number, district, postal code and city; banks and insurers ask for the printed proof.**
    `061-post.txt`, `/fr_fr/comment-faire-lenregistrement-de-votre-adresse-nationale-en-arabie-saoudite/` (2023/24). Status: CONFIRMS `short-address` and `shipping-and-receiving-parcels`. No change.

### 2.4 Visas for family and visitors (`visas-for-family-and-visitors`)

25. **Visit visa extension fee: 100 SAR each time; applying in the 3 days after expiry adds a 500 SAR fine.**
    `056-post.txt`, `/fr_fr/comment-payer-les-frais-de-prolongation-du-visa-de-visite-en-arabie-saoudite-en-ligne/` (undated). Status: CONFIRMS `visas-for-family-and-visitors` and `iqama-and-exit-reentry-fees`
26. **Paying it: banking app, SADAD, Government payments, beneficiary Alien Control (Jawazat), service Extend visitor visa, "not registered", the visitor's border number. Absher does not show the payment; if the fee is missing, Absher answers that the visa cannot be extended because of insufficient funds.**
    `056-post.txt`, same path. Status: NEW. Published.
27. **Absher could not extend a multiple-entry family visit visa; some offices did it for about 500 SAR a person.**
    `079-post.txt`, `/fr_fr/extension-du-visa-visite-famille-pour-3-mois-sans-sortir-du-territoire-en-arabie-saoudite-2023-24/` (2023/24). Status: EXPIRED. Part 3 (`152`, March 2026) and MESH show Absher does it now. The page also promotes a paid office: skipped.
28. **Common refusals of a family visit visa: the host's iqama has less than 3 months left on the day of the application; a mistyped field (for example a wrong visa number); a request for a relative outside the Ministry's list (spouse, children, parents, parents-in-law, a brother or sister with their families, the spouse's brother or sister, grandparents); for workers, the wrong Chamber of Commerce.**
    `068-post.txt`, `/fr_fr/les-raisons-pour-lesquelles-la-demande-de-visa-de-visite-familiale-pour-larabie-saoudite-est-rejetee/` (undated). Status: NEW for `visas-for-family-and-visitors` (MESH says only "close relatives such as a spouse, children or parents"). Published (the Chamber of Commerce point left out: workers only).
29. **Applications made in "the Hajj season", given as 1 Ramadan to 1 Safar, are refused.**
    `068-post.txt`, same path (undated). Status: NEW, dated and too broad to state today. Section 5.
30. **UK citizens could use an electronic visa waiver for a single entry of up to 6 months, requested 48 hours to 90 days ahead.**
    `063-post.txt`, `/fr_fr/exemption-de-visa-electronique-pour-les-citoyens-du-royaume-uni-et-dirlande-du-nord-pour-entrer-en-arabie-saoudite/` (2022/23). Status: HISTORY. MESH lists the UK under the tourist eVisa (`visas-for-family-and-visitors`).
31. **A unified "KSA Visa" platform was launched for all visa types, linked to more than 30 agencies.**
    `109-post.txt`, `/fr_fr/larabie-saoudite-lance-ksa-visa-la-nouvelle-plateforme-de-visa-unifiee/` (about January 2024). Status: NEW, news only. MESH links visa.mofa.gov.sa; no change.
32. **Investor "business visit" eVisa: multiple entry, up to 4 years for some nationalities, 90 days a stay.**
    `088-post.txt`, `/fr_fr/comment-demander-un-visa-business-en-arabie-saoudite/` (late 2023). Status: out of scope. Skipped.
33. **A child on a family visit visa can be moved onto an iqama when both parents hold iqamas and the child is under 18: attested birth and marriage certificates (an apostille is accepted for France), the child's passport and photo, the parents' iqama and passport copies, an employer letter stamped by the Chamber of Commerce, the visa form and an undertaking; a Jawazat appointment for Resident services in the city where the employer is registered; dependant fees of 400 SAR a child a month to the iqama's expiry plus 2,000 SAR; the iqamas appear in Absher 2 to 5 working days later.**
    `098-post.txt`, `/fr_fr/comment-obtenir-une-iqama-pour-ses-enfants-en-arabie-saoudite-lorsque-les-deux-parents-en-possedent-deja-une/` (updated 2024). Status: NEW, written for work iqamas. Whether it applies to a student's family (University as sponsor, wife as dependant) is unknown: section 5.
34. **The list of professions that may sponsor a permanent family visa includes "university student" (no. 194), "religious person", teacher and professor; Jawazat can ask for a four-year degree.**
    `106-post.txt`, `/fr_fr/liste-des-professions-eligibles-pour-avoir-une-iqama-familial-en-arabie-saoudite/` (undated). Status: NEW, workers' list. MESH sends students' family visas to the University (`visas-for-family-and-visitors`); no change.

### 2.5 Having a baby (`having-a-baby-in-madinah`)

35. **The hospital sends the birth notice to the Ministry of Health; the Ministry of Interior's text message confirming it can take up to two weeks.**
    `060-post.txt`, `/fr_fr/comment-declarer-et-obtenir-une-iqama-pour-un-nouveau-ne-en-arabie-saoudite/` (undated). Status: NEW. Published.
36. **The birth certificate can be requested online in Absher (Services, Civil Affairs, New Born Registration) if the baby is under one year, the National Address is registered and the birth text has arrived. Check the spelling of the names and the date; the hospital corrects errors. Then choose postal delivery or collect it at Civil Affairs with the father or mother.**
    `060-post.txt`, same path. Status: CONFIRMS `having-a-baby-in-madinah` ("View birth certificate"); NEW: the request step and its conditions. Published.
37. **A late fee of 50 SAR applies after 30 days from the birth.**
    `060-post.txt`, same path; `062-post.txt`, same path as finding 16. Status: CONFIRMS `having-a-baby-in-madinah` ("a late birth certificate carries a fine"); the amount is NEW and undated: section 5.
38. **If the online request fails, Civil Affairs needs: the birth text message, copies of the father's iqama, the mother's iqama if any, both passports, the marriage certificate with an Arabic translation if the wife is not on the husband's iqama or is on a visit visa, form 87, a copy of the mother's Saudi visa if she has no iqama, and an Absher screenshot of the wife's details if she is on a visit visa. Arrive 20 minutes early; the certificate is printed at the counter.**
    `060-post.txt`, same path. Status: NEW. Published (form 87 described as "the birth registration form, which the office gives you"; the screenshot left out).
39. **Order of papers: birth certificate, attestation by the Ministry of Foreign Affairs, the baby's passport from the embassy, then the iqama.**
    `060-post.txt`, same path. Status: CONFIRMS the order in `having-a-baby-in-madinah`; NEW: the Ministry of Foreign Affairs attestation. Published as "If your embassy wants the Saudi birth certificate attested, the Ministry of Foreign Affairs attests it first."
40. **Mother on a family visit visa: same steps up to the passport; then, 15 days before leaving, go to Jawazat's Expatriate Affairs section (إدارة شؤون الوافدين) with the baby's passport, the father's iqama and passport, the mother's passport, a copy of her Saudi visa, the marriage certificate with an Arabic translation and the birth text, originals and copies, to have the exit stamp put in the baby's passport.**
    `060-post.txt`, same path. Status: NEW. Published.
41. **If the father holds no Saudi iqama, Civil Affairs also needs the marriage certificate attested in the home country, the Saudi embassy and the Saudi Ministry of Foreign Affairs, and a power of attorney from a court at home, attested the same way, for the relative who applies.**
    `060-post.txt`, same path. Status: NEW, rare for MESH readers. Not published.

### 2.6 Marriage (no MESH guide)

42. **Foreigners in the Kingdom on an iqama, as a dependant, on a family visit visa or on a tourist visa can marry here; holders of Hajj and Umrah visas cannot.**
    `069-post.txt`, `/fr_fr/comment-les-etrangers-peuvent-ils-se-marier-en-arabie-saoudite/` (undated). Status: NEW. Section 5.
43. **The contract is made by a marriage officer (ma'dhun) chosen from the Ministry of Justice's list for the city. He needs Saudi SIMs in the names of the groom, the bride, the guardian and two witnesses, iqama or passport copies, and the mahr; he files the contract on the Ministry's portal; after a few days of checks each of the five numbers must confirm by text within 24 hours; the contract is issued as a PDF. The nikah itself needs the groom, the bride, her guardian, two witnesses and the officer. The author paid the officer 2,000 SAR.**
    `069-post.txt`, same path. Status: NEW, a personal account, undated. Section 5. The fee is not for publication.
44. **To use the contract abroad: attestation by the Ministry of Justice, then the Ministry of Foreign Affairs, then a translation attested by your embassy.**
    `069-post.txt`, same path. Status: NEW. Section 5.
45. **Iqama holders who marry abroad have the certificate attested by their own foreign ministry, the Saudi embassy and the Saudi Ministry of Foreign Affairs, then submit it to Jawazat.**
    `070-post.txt`, `/fr_fr/comment-transferer-liqama-de-la-fille-du-pere-a-son-mari/` (undated). Status: NEW. Section 5.
46. **When two residents marry here, the wife's iqama moves from her father to her husband at Jawazat (appointment for Resident services): the husband's employer's release letter stamped by the Chamber of Commerce, the father's consent signed before the Jawazat officer, the transfer form, the marriage certificate, the wife's passport and iqama, copies of the three iqamas, and the transfer fee.**
    `070-post.txt`, same path. Status: NEW, written for work iqamas. Section 5.
47. **Chamber of Commerce stamps on employer letters: 25 SAR a document, 35 SAR to submit a family visit request, card only, valid 12 months; a government letter needs no stamp.**
    `071-post.txt`, `/fr_fr/comment-obtenir-un-cachet-une-attestation-de-la-chambre-de-commerce-en-arabie-saoudite/` (undated). Status: workers only. Not published.

### 2.7 SIMs, Absher, Nafath and Tawakkalna (`phone-sims-and-absher`, `change-absher-mobile`, `check-sims-on-iqama`)

48. **Changing the Absher mobile in Nafath: settings, Absher self-service devices, update your digital identity number; enter the iqama number, the new number, the code sent to it; then scan the four fingers of the left hand (not the thumb) with the camera, adjusting focus and distance if it fails; the change takes about 10 minutes.**
    `092-post.txt`, `/fr_fr/comment-changer-le-numero-de-mobile-absher-en-utilisant-lapplication-nafath/` (undated). Status: CONFIRMS `phone-sims-and-absher` and `change-absher-mobile`; NEW: four fingers, 10 minutes. Published.
49. **Cancelling a SIM on your iqama: in any operator's branch with the iqama and the number (cancelled within 24 hours, or reissued if you prefer); by the helpline (STC 900, Zain 959, Mobily 1100, Lebara 1755, Virgin 1789; Mobily's menu cancels within 5 working days); or a complaint in the telecom regulator's app signed in with Absher.**
    `093-post.txt`, `/fr_fr/comment-annuler-une-carte-sim-enregistree-sur-votre-iqama/` (undated, before the regulator became CST). Status: CONFIRMS `phone-sims-and-absher` ("within five working days, escalate to CST"); NEW: 24 hours in a branch. Published.
50. **Tawakkalna Services: register with Absher (code to the Absher mobile); without Absher, a relative with Absher registers your mobile for Tawakkalna under General Services; visitors register with passport number, mobile, date of birth and nationality. Support 8001289999.**
    `086-post.txt`, `/fr_fr/comment-sinscrire-sur-lapplication-tawakkalna-en-arabie-saoudite/` (2023/24). Status: NEW. Not published (touches `living-on-a-visitor-id`, outside this task's guides; and the visitor flow has changed since).

### 2.8 Driving and cars (`drivers-license`, `buying-a-used-car`, `traffic-fines`, `drive-on-visit-visa`)

51. **Online ownership transfer in Absher: the buyer pays a 150 SAR fee by SADAD (Government payments, Motor vehicles, Transfer of ownership, with both iqama numbers and the sequence number); the seller opens Vehicles, Vehicle Ownership Transfer, Seller (car, price, buyer's iqama and date of birth, seller's IBAN, region); the buyer accepts under Buyer with his own IBAN (refund if cancelled); the buyer pays the price into Absher's account within 72 hours, in banking hours, with 230 SAR of fees already added (380 SAR in all); on delivery the buyer gives the seller the code from Absher, and only then is the seller paid. Prices from 500 to 200,000 SAR; at most 2 cars per expatriate; on an error, a transfer office does it by hand.**
    `059-post.txt`, `/fr_fr/comment-transferer-la-propriete-dune-voiture-en-ligne-en-arabie-saoudite/` (undated). Status: CONFIRMS `buying-a-used-car` and `graduate-procedures`; NEW: the escrow steps. Published (the 230 SAR, price range and two-car limit left out: undated, section 5).
52. **The page says the buyer has only one hour to accept the seller's request.**
    `059-post.txt`, same path. Status: NEW, unclear. Published as "accept soon after the seller creates it, because the request expires", without the hour.
53. **Istimara renewal in Absher (Vehicles, Services, Vehicle Management, choose the car, Renew vehicle registration): needs valid insurance, a valid periodic inspection, fees and late fees paid, fines paid, and less than 180 days left. The yearly fee, revised on 22 October 2023, goes by engine size for cars made in 2015 or before and by fuel economy from 2016, from 0 to 190 SAR. A card with no printed expiry date is kept; otherwise order the new card by post within 90 days (17.25 SAR, 3 working days) or collect it at the Muroor.**
    `080-post.txt`, `/fr_fr/comment-renouveler-listimara-en-ligne-en-arabie-saoudite/` (late 2023). Status: CONFIRMS `drivers-license` (expired istimara fine); NEW: the rest. Published.
54. **Periodic inspection (Fahas) needs an online appointment at vi.vsafety.sa: your details (or a person you authorise), registered vehicle, plate, private vehicle, periodic inspection service, region, centre, date and slot, SMS code.**
    `077-post.txt`, `/fr_fr/la-prise-de-rendez-vous-en-ligne-est-desormais-obligatoire-pour-linspection-periodique-des-vehicules/` (2024). Status: NEW. Published.
55. **A new private car is first inspected three years after its first licence, then every year; a valid inspection is needed to transfer ownership; validity shows in Absher (Vehicle Management, the car, More details) and on the sticker.**
    `096-post.txt`, `/fr_fr/moroor-precise-la-periode-de-renouvellement-de-linspection-technique-fahas-des-vehicules/` (undated). Status: CONFIRMS `buying-a-used-car` ("a valid periodic technical inspection"); NEW: the intervals. Published.
56. **Absher's Vehicle Management shows the car's insurer, policy start, status and expiry; driving uninsured is fined 150 SAR.**
    `081-post.txt`, `/fr_fr/comment-verifier-letat-de-lassurance-automobile-en-arabie-saoudite/` (undated). Status: NEW. Published without the amount (undated).
57. **One named comparison site quotes third-party and comprehensive cover from the iqama and sequence numbers.**
    `082-post.txt`, `/fr_fr/comment-trouver-une-assurance-auto-moins-chere-en-arabie-saoudite/` (undated). Status: CONFIRMS `drivers-license` ("Several Saudi comparison sites"). Single business: not named.
58. **Driver authorisation (Absher, Vehicles, Vehicle Management, the car, Issue driver authorisation): the driver's iqama number and date of birth, inside or outside the Kingdom, the length, and the code sent to the driver's Absher mobile. Needs a valid istimara and insurance, and a driver with a valid iqama and licence, no unpaid fines and an Absher account. Inside the Kingdom any iqama holder, any length; outside only family members, for the length of the exit and re-entry visa. Fines go to the authorised driver; one authorised driver per car. The owner cancels under View or cancel driver authorisation, the driver under Received authorisations with the owner's code.**
    `078-post.txt`, `/fr_fr/comment-autoriser-un-conducteur-a-conduire-votre-vehicule-en-arabie-saoudite/` (undated). Status: NEW. Published (the one-driver limit left out: the wording is ambiguous).
59. **Close family on visit visas (wife and children) may drive the iqama holder's car on an International Driving Permit for 6 months.**
    `078-post.txt`, same path (footnote). Status: CONFLICTS `drivers-license` and `drive-on-visit-visa`: MESH says "for one year from the day you entered or until the licence expires". Section 3 and 5.
60. **Repair permit (Absher, Vehicle Management, the car, Issue vehicle repair permit): for a recorded accident, within 90 days, several allowed; for an unrecorded one, one a car per calendar year, more only through the Muroor; the garage processes it, and a request not processed within 24 hours expires. An app lists approved garages; helpline 920029200.**
    `083-post.txt`, `/fr_fr/comment-obtenir-un-permis-de-reparation-de-vehicule-en-ligne-en-arabie-saoudite/` (undated). Status: NEW. Published (app and helpline left out).
61. **Traffic violations show in Absher (with a map link under More details) and in Tawakkalna (Dashboard, Traffic violations, Unpaid).**
    `084-post.txt`, `/fr_fr/comment-verifier-vos-infractions-de-circulation-en-arabie-saoudite/` (undated). Status: CONFIRMS `traffic-fines`; NEW: Tawakkalna and the map. Published in `check-visa-and-iqama-online`.
62. **Impounded car: Absher, Vehicles, Inquiries, Impounded vehicles inquiry; shows date and place, or "not impounded".**
    `091-post.txt`, `/fr_fr/comment-suivre-une-voiture-mise-en-fourriere-sur-absher/` (undated). Status: NEW. Published.
63. **Traffic accidents report: Absher, General Services, Absher Reports, Request report, Traffic accidents, English; 28.75 SAR; lists accident number, date and plate for the last two years.**
    `101-post.txt`, `/fr_fr/comment-obtenir-un-rapport-daccidents-de-la-circulation-depuis-absher/` (undated). Status: NEW. Published in `drivers-license` and `check-visa-and-iqama-online`.
64. **After an accident: traffic police on 993 for fire, injury, death, or when neither party is insured; otherwise Najm on 920000560 or its app (account with iqama and Nafath, Report an accident, the other car's details, photos, an expert assigned); texts from Najm, then from the traffic police; in a rental car, call the company; damage estimate by Taqdeer; claim from the at-fault insurer online, paid within 15 days; if the other side is uninsured, a Muroor visit for the final report, then your comprehensive insurer, or with third-party cover Najiz, then Taradhi reconciliation by video, then the execution court.**
    `102-post.txt`, `/fr_fr/comment-faire-un-constat-pour-un-accident-de-voiture-en-arabie-saoudite/` (undated). Status: CONFIRMS `drivers-license` (Najm 920000560); NEW: the rest. Published.
65. **Penalties: hit and run 10,000 SAR and 3 months in prison; a fatal accident 4 years and 200,000 SAR; injuries over 15 days 2 years and 100,000 SAR.**
    `102-post.txt`, same path. Status: NEW, unsourced maxima. Not published.

### 2.9 Housing, courts and bills (`finding-an-apartment`, not edited in this task)

66. **Ejar: rent is paid only through Ejar (mada, or SADAD biller 153) from 15 January 2024; the landlord creates the contract and pays 250 SAR; the tenant registers from the SMS link; a contract not rejected within 7 days counts as accepted; cash payments need a receipt requested in Ejar; landlords not on Ejar are fined.**
    `065-post.txt`, `/fr_fr/paiement-et-enregistrement-dun-contrat-de-location-avec-ejar-en-arabie-saoudite/` (early 2024). Status: CONFIRMS `finding-an-apartment` ("pay the rent only through Ejar, by mada or SADAD"); CONFLICTS on the fee (MESH: "The Ejar fee of 125 SAR a year"). The page is older; MESH is current. Renting on a Visitor ID is an open question and was not touched.
67. **Ending an Ejar contract early (Contracts, View contract, Terminate contract, reason, date, financial settlement): the tenant owes the rent to the end unless the landlord waives it; no automatic renewal; helpline 9200 05226.**
    `066-post.txt`, `/fr_fr/comment-annuler-un-contrat-de-location-ejar-en-ligne-en-arabie-saoudite/` (2024). Status: NEW for `finding-an-apartment`; the helpline differs from MESH ("Ejar's helpline is 199011"). Not published: outside this task's guides. Reported to the coordinator.
68. **Najiz: an objection to a labour court ruling within 30 days; a claim against a landlord (eviction); a private claim after a traffic accident; and the execution court when a ruling is not paid.**
    `090-post.txt`, `/fr_fr/comment-deposer-une-plainte-en-ligne-sur-najiz/` (undated). Status: NEW. The accident route is published in `drivers-license`; the rest not.
69. **Electricity bill: by WhatsApp to the electricity company, by SMS codes, by email alerts, or a registered account with three years of history.**
    `085-post.txt`, `/fr_fr/comment-verifier-sa-facture-delectricite-en-ligne-en-arabie-saoudite/` (2023). Status: NEW, the codes look outdated. Not published.

### 2.10 The Rawdah (`umrah-rawdah-quba`, `masjid-an-nabawi-first-visit`, `rawdah-booking`)

70. **The permit is compulsory and free, only through Nusuk; staff scan the QR code at the gate.**
    `100-post.txt`, `/fr_fr/comment-obtenir-un-permis-ou-un-rendez-vous-pour-rawdhat-ul-jannah/` (updated 2026/27). Status: CONFIRMS `umrah-rawdah-quba`, `masjid-an-nabawi-first-visit`, `rawdah-booking`
71. **Book before you arrive: a visitor creates the Nusuk account with passport and visa numbers on the day the visa is issued; slots go in seconds in busy periods.**
    `100-post.txt`, same path. Status: CONFIRMS ("Slots open in advance and go quickly"); NEW: book from home. Published.
72. **A permit booked under the wrong category (men or women) does not work at the gate.**
    `100-post.txt`, same path. Status: NEW. Published.
73. **New slots are usually released on Friday afternoon (Saudi time) for the coming week, with small batches every 30 minutes through the day.**
    `100-post.txt`, same path. Status: NEW, a pattern, not an announced rule. Not published: section 5.
74. **Men usually enter late at night to early morning, often by Gate 37 (Bab as-Salam); women have two windows, early morning and late evening, often by Gate 25 (Bab Uthman ibn Affan).**
    `100-post.txt`, same path. Status: CONFIRMS `women-at-masjid-an-nabawi` ("Women's slots are in the morning and late at night"); the gates are NEW: section 5.
75. **Babies and very young children are not admitted; from age 5 a child needs his own permit.**
    `100-post.txt`, same path. Status: NEW. Section 5.
76. **"As a rule, one permit every 365 days"; the same page quotes an app error that a new permit must be 45 days after the last.**
    `100-post.txt`, same path. Status: CONFLICTS within the page; MESH says only "the app shows how many permits you can book". No change; section 5.
77. **Anyone offering paid or "guaranteed" access is a scam; only the app published by the Ministry of Hajj and Umrah is genuine; confirmation emails from "Eatmarna" carry the platform's old name.**
    `100-post.txt`, same path. Status: NEW. Published (scam and official app; the old name left out).
78. **June 2026: live tracking of prayer areas, interactive maps and simultaneous translation of sermons at Masjid an-Nabawi; new pedestrian paths in the central area and to Masjid Quba.**
    `100-post.txt`, same path. Status: CONFIRMS `umrah-rawdah-quba` ("the Quba walkway"). No change.

### 2.11 Work, Qiwa, sponsorship and Huroob (out of scope)

79. **Iqama transfer to a new employer through Qiwa (conditions, 10 days for the worker to accept, notice periods, 14 days for the current employer, 24 days for the new employer to finish in Absher); transfer fees 2,000, 4,000, then 6,000 SAR, owed by the new employer.**
    `057-post.txt`, `/fr_fr/comment-transferer-une-iqama-vers-un-autre-employeur-en-arabie-saoudite/`; `058-post.txt`, `/fr_fr/comment-payer-les-frais-de-transfert-diqama-vers-un-autre-employeur-en-arabie-saoudite/`; `072-post.txt`, `/fr_fr/les-expatries-peuvent-changer-demploi-avant-la-fin-du-contrat-de-1-an/` (undated). Status: out of scope.
80. **Work permit levy (Maktab Amal): 800 SAR a month in 2023/24, paid by the employer; exemptions listed.**
    `076-post.txt`, `/fr_fr/comment-verifier-et-payer-les-frais-du-maktab-amal-iqama/` (2023/24). Status: out of scope.
81. **Qiwa in 2026: login through Nafath only; a contract not documented on Qiwa has no legal force; 10 days to answer an offer; since 30 June 2026 a worker whose work permit has been expired for more than 3 months can be removed from his employer's register even with a valid iqama; job changes without the old employer's consent once the contract or notice ends (since the 2025 reform); Premium Residency holders need a 100 SAR work permit.**
    `104-post.txt`, `/fr_fr/comment-verifier-votre-contrat-de-travail-sur-qiwa-en-arabie-saoudite/`; `105-post.txt`, `/fr_fr/comment-sinscrire-sur-la-plateforme-qiwa-en-arabie-saoudite/` (updated 2026). Status: out of scope (students may not work).
82. **Professions reserved for Saudis (about 100); professions eligible for a family iqama (200).**
    `106-post.txt` (see finding 34); `107-post.txt`, `/fr_fr/liste-des-professions-reservees-aux-saoudiens/` (undated). Status: out of scope.
83. **Huroob (absconding report): transfer or final exit within 60 days; otherwise deportation and a 5-year ban.**
    `108-post.txt`, `/fr_fr/5-nouvelles-regles-pour-supprimer-le-huroob/` (undated). Status: out of scope.

### 2.12 Pages skipped for content

- `079-post.txt` (2023/24): promotes a paid office and its WhatsApp number for visit visa extensions. EXPIRED and commercial.
- `082-post.txt`: promotes one insurance comparison company. Not named.
- `088-post.txt`: investor business visa. Out of scope.
- `098-post.txt`, final lines: links to the site's own WhatsApp group. Skipped (the procedure above comes from the rest of the page).
- `100-post.txt`, final lines: the site's own channels. Skipped.
- `104-post.txt`, `105-post.txt`: the site's own channels and slogan. Skipped.
- Every page carries a link to the site's Telegram group. Skipped.

## 3. Conflicts with MESH

1. **`iqama-and-exit-reentry-fees`: an exit and re-entry visa that expires abroad.** MESH says it "leaves you outside with no way back on that iqama". The source (2025/26) says an expired visa can be extended online by the sponsor, and another page's title promises an extension after expiry. **Change:** none until the owner confirms (section 5). If an extension after expiry is possible, replace the MESH line with the conditions and the fee.
2. **`drivers-license` and `drive-on-visit-visa`: family on visit visas driving.** MESH says a visitor drives on a recognised home licence "for one year from the day you entered". The source says close family on visit visas may drive the iqama holder's car on an International Driving Permit for 6 months. **Change:** none until confirmed. The two may describe different things (driving in general against driving the host's car).
3. **`umrah-rawdah-quba` and `rawdah-booking`: how often a permit can be booked.** MESH says "the app shows how many permits you can book". The source gives one permit every 365 days and, on the same page, an app message requiring 45 days between permits. **Change:** none; MESH's wording is safe.
4. **`finding-an-apartment`: the Ejar fee and helpline.** The source (early 2024) says the landlord pays 250 SAR and gives 9200 05226; MESH says 125 SAR a year and 199011. The source is older; MESH is current. **Change:** none.
5. **`renew-passport-in-saudi`: Absher or Jawazat for a passport update.** The source (older) says Absher usually fails and Jawazat does it at once. MESH puts Absher first, then Absher's Tawasul. **Change made:** a Jawazat appointment added as a further fallback; Absher stays first.
6. **`iqama-and-exit-reentry-fees`: exit and re-entry extension fees.** One older page gives 100 and 200 SAR; a later page gives the doubled 200 and 400 SAR a month from abroad, as MESH does. **Change:** none; the source is out of date.
7. **`iqama-and-exit-reentry-fees`: iqama days left for final exit.** MESH says at least 30 days; the source says more than 32 days, for a worker's self-requested final exit only. **Change:** none.

## 4. Ready-to-publish sections

All of these were published in this task; the HTML is in the seed files named.

### 4.1 Target: `iqama-and-exit-reentry-fees` (`guides-2026.ts`): new subsections under "Final exit", and the fingerprint rule

```html
<h3>Final exit for your wife or children</h3>
<ol>
<li>Sign in to Absher and open <strong>Family Members Services</strong>, then <strong>Visa Services</strong>, and press Next.</li>
<li>Choose the family member, press <strong>More details</strong>, then <strong>Issue final exit visa</strong>. Accept the terms and confirm.</li>
<li>Print the visa, or save it as a PDF, from the same screen.</li>
</ol>
<p>Absher issues it only when the family member is inside Saudi Arabia, holds a valid iqama with a passport valid for at least 60 days, has no unpaid fines and has no car in their name. The error "AC3052E: Insufficient funds" means a fee on that person's file is still unpaid: pay it, then try again.</p>
<h3>Cancelling, or running out of time</h3>
<ul>
<li><strong>Cancel it free while it is valid,</strong> on the same page: Family Members Services, then Visa Services, then More details. Travel Management cancels a student's own final exit.</li>
<li><strong>It cannot be extended.</strong> If your plans move, cancel it and issue a new one nearer the date.</li>
<li><strong>Not leaving within the 60 days costs a 1,000 SAR fine.</strong> An expired final exit is cancelled only at Jawazat, with an appointment for Resident services, a cancellation form, copies of the visa, the iqama and the passport, two photos on a white background, and the iqama renewal fees if the iqama has run out meanwhile.</li>
<li><strong>Keep the printout after you leave.</strong> A Saudi embassy can ask for it when you apply for a new Saudi visa later.</li>
</ul>
```

The fingerprint bullet in "The rules that catch people" now adds: "This applies to every family member aged 15 or over, so book a fingerprint appointment for a child who has just turned 15 before the trip."

### 4.2 Target: `family-records-on-absher` (`guides-admin-papers-2026-11.ts`): new section "Booking a Jawazat, Civil Affairs or traffic appointment"

```html
<h2>Booking a Jawazat, Civil Affairs or traffic appointment</h2>
<p>Jawazat (the passports office), Civil Affairs and the traffic department (Muroor) see you only with an appointment booked in Absher. All three are booked the same way.</p>
<ol>
<li>Sign in to absher.sa, scroll down and open <strong>Appointments</strong> (المواعيد).</li>
<li>Choose <strong>Passports</strong> for Jawazat, <strong>Civil Affairs</strong> for a birth, or <strong>Traffic</strong> for the traffic department, then press <strong>Proceed to service</strong> and <strong>Book new appointment</strong>.</li>
<li>Choose the service, the region, the number of transactions you have and the office.</li>
<li>Pick a date and time: green slots are free, red ones are taken. Check them, then press <strong>Confirm appointment details</strong>.</li>
<li>Print the appointment or keep a screenshot. The last screen lists the papers to bring.</li>
</ol>
<!-- then a table of services: Resident services (خدمات المقيمين); biometrics for residents and for their companions; inquiry on incoming transactions; Civil Affairs birth registration (تسجيل واقعة ميلاد); traffic purposes -->
```

Also in this guide: the postal delivery fee (17.25 SAR by text link), the 90-day window and the Postal Delivery Service menu; name corrections for your own student iqama (Travel Management, Muqeem) and for the English name (Jawazat); Jawazat forms are free.

### 4.3 Target: `having-a-baby-in-madinah` (`guides-2026.ts`): the birth certificate when it does not show, and a mother on a visit visa

```html
<p>The hospital's notice reaches the Ministry of Interior first, and a text message tells you when it has arrived. This takes up to two weeks. If no certificate shows after that message:</p>
<ol>
<li>In Absher, open <strong>Services</strong>, then <strong>Civil Affairs</strong>, then <strong>New Born Registration</strong>. It works while the baby is under one year old and once your National Address is registered.</li>
<li>Check the spelling of every name and the date of birth. If anything is wrong, stop and ask the hospital to correct its notice.</li>
<li>Accept the terms, then choose postal delivery of the certificate to your National Address, or collect it at a Civil Affairs office.</li>
</ol>
<p><strong>Mother on a visit visa?</strong> A baby born here to a mother on a family visit visa has no entry record, so Jawazat has to clear the baby to leave. Follow the steps above up to the passport. Then, at least 15 days before you travel, book a Jawazat appointment for Resident services and go to the Expatriate Affairs section (إدارة شؤون الوافدين) with the baby's passport, the father's iqama and passport, the mother's passport with her Saudi visa, the marriage certificate translated into Arabic and the birth text message from the Ministry of Interior, each with a copy. Jawazat stamps the baby's exit in the passport.</p>
```

Also: the Civil Affairs appointment fallback with its papers, and the Ministry of Foreign Affairs attestation before the embassy.

### 4.4 Target: `drivers-license` (`guides-2026.ts`): "After an accident, step by step" and "Keeping your car legal: Absher's vehicle services"

Published as two blocks: a seven-step accident list (Najm app, rental car, Taqdeer estimate, claim and the 15-day payment, the uninsured other driver through the Muroor, Najiz and Taradhi, the repair permit rules, the 28.75 SAR accidents report), with 993 added beside 911; and a new section on istimara renewal (180 days, conditions, the yearly fee by engine size or fuel economy up to 190 SAR, the card by post or at the Muroor), the periodic inspection (first after three years, then yearly, booking at vi.vsafety.sa), insurance in Vehicle Management, driver authorisation (steps, conditions, inside and outside the Kingdom, fines to the authorised driver, cancelling), the impounded-car inquiry, and cards by post for 17.25 SAR.

### 4.5 Target: `buying-a-used-car` (FAQ, `guides-gaps-2026-11.ts`): the Absher transfer, step by step

```html
<li><strong>Transfer it in Absher.</strong> Both of you need active Absher accounts, and the transfer is refused while there are unpaid fines on you or the car. Absher holds your money until you have the car:<ol>
<li>You pay the 150 SAR transfer fee first, in your banking app under Government payments, then Motor vehicles, then Transfer of ownership, with the seller's iqama number, the car's sequence number (on the istimara) and your iqama number.</li>
<li>The seller opens Vehicles, then Services, then Vehicle Ownership Transfer, chooses Seller, and enters the car, the price, your iqama number, your date of birth and his IBAN.</li>
<li>You open the same service, choose Buyer, accept the request and enter your own IBAN, which is refunded if the sale is cancelled. Accept soon after the seller creates it, because the request expires.</li>
<li>Absher shows an account number. Pay the price into it within 72 hours, in banking hours. A further service fee is already added to the price shown.</li>
<li>When the seller hands you the car, Absher sends you a code. Give it to the seller only once the car and its keys are in your hands: he enters it, and Absher releases the money to him.</li>
</ol></li>
```

### 4.6 Other targets (published)

- `visas-for-family-and-visitors`: the list of relatives the family visit visa platform accepts, the host's 3 months of iqama, the common refusals; the SADAD path for the extension fee with the visitor's border number; Absher's "insufficient funds" answer.
- `check-visa-and-iqama-online`: the Absher exit and re-entry status inquiry; Tawakkalna and the map link for traffic fines; a new "Absher reports" subsection with how to check a report someone gives you.
- `phone-sims-and-absher`: the Nafath fingerprint step (four fingers of the left hand) and the 10 minutes; a SIM cancelled in a branch within 24 hours.
- `umrah-rawdah-quba`: book from home, book under the right category, use only the official Nusuk app; paid access is a scam.
- `renew-passport-in-saudi` (FAQ): a Jawazat appointment with the free passport update form as a further fallback.

## 5. Questions for the owner

1. **Exit and re-entry visa that expires abroad (finding 4):** can a head of family, or Travel Management, still extend a family member's or a student's exit and re-entry visa after it has expired while they are abroad? If yes, through Absher or the Ministry of Foreign Affairs, and at what fee? MESH now says there is no way back on that iqama.
2. **Iqama validity for a visa set in days (finding 3):** must the iqama run the visa's length plus 90 days? Three pages across parts 2 and 3 say so. If confirmed, add it to "The rules that catch people" in `iqama-and-exit-reentry-fees`.
3. **Iqama renewal from abroad (finding 8):** is the renewal fee doubled when a student's wife or child is renewed while outside the Kingdom, or does the doubling touch only domestic workers and "companions"?
4. **Children on a visit visa moved onto an iqama (finding 33):** can a student with a student iqama move his children from a family visit visa to dependant iqamas at Jawazat, and does the University give the sponsor letter? Workers need both parents on iqamas.
5. **Late birth registration fine (finding 37):** is it 50 SAR after 30 days? MESH states a fine without an amount.
6. **Visit visa family driving (finding 59):** may a wife or child on a family visit visa drive the host's car on an International Driving Permit, and for 6 months or one year from entry?
7. **Family visit visa applications in the Hajj season (finding 29):** which dates does the Ministry pause new family visit visas for in 1448? The source's "1 Ramadan to 1 Safar" is old and too broad.
8. **A guide on marrying in Madinah (findings 42 to 46):** worth adding to the family topic? The source gives who may marry (not on Hajj or Umrah visas), the Ministry of Justice marriage officer, the five Saudi SIMs, text confirmations, attestation for use abroad, and moving a wife's iqama from her father to her husband at Jawazat. It is an undated personal account written for workers; it needs checking against the Ministry of Justice's current Najiz service, the premarital medical screening rule for non-Saudis, and any University rule for students, before publishing.
9. **Car transfer details (finding 51):** are the 230 SAR service fee on top of the 150 SAR, the 500 to 200,000 SAR price range and the limit of two cars per expatriate still current? MESH now says only "a further service fee is already added to the price shown".
10. **Rawdah (findings 73 to 76):** confirm before publishing: babies not admitted and a separate permit from age 5; the usual gates (men Gate 37, women Gate 25); new slots released on Friday afternoons; and whether a permit can be booked once every 365 days or every 45 days.
11. **Ejar (findings 66 and 67), for the coordinator:** `finding-an-apartment` could take the early termination rule (the rent is owed to the end unless the landlord waives it) and the 7-day automatic acceptance of a contract not rejected. Both are from early 2024 pages; confirm first. Renting on a Visitor ID was not touched.
12. **Tawakkalna for visitors (finding 50):** does a new student on a Visitor ID still register in Tawakkalna with the passport number, or with the border number through Absher? Could go into `living-on-a-visitor-id`.
