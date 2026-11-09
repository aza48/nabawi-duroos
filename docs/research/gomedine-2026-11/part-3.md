# French-language Madinah community site, part 3 of 4 (pages 111 to 167)

**README.** This is a third-party, French-language community website about living in Madinah, written for French-speaking expatriates, families and students. It was crawled on 9 November 2026 and stripped to text, one file per page. This part covers group 3: 57 pages, files `111-post.txt` to `167-post.txt` in `scratchpad/gm/clean/`. Every file was read in full. Most pages are short blog posts dated December 2023 to August 2024; four were updated in 2026 (`143` on 20 June 2026, `145` on 26 June 2026, `152` on 4 March 2026, `158` on 17 June 2026). Each finding below gives the page's file name, its URL path and its date. Many posts are dated news (amnesties, discounts, registration windows): those are tagged HISTORY or EXPIRED and are never offered as current facts. Pages that only promote the site's own centre, services, channels or a business were skipped for content (listed at the end of section 2). The site's name, URL and authors appear nowhere in section 4. Findings were checked against the live MESH guides (fetched from medinahub.org on 9 November 2026) and against the seed files in the `mesh-website-audit-73b810` worktree; where a matching MESH text exists only in a seed file and not in the live index, the status line says "(seed)".

## 1. Summary

The pages cover residence procedures on Absher and Jawazat (passport updates for dependants, newborn iqamas, exit and re-entry conditions, lost passports, iqama penalties, Absher registration and activation), visit visas and their extension, Premium Residency products, the educational visa and the Study in Saudi platform, banking with one bank's app, bills and SIM transfers, driving (medical check, car rental, International Driving Permit), religious study at Masjid an-Nabawi (halaqat, the Ma'had and Kulliyah), children's schools in Madinah (free Qur'an and hadith schools, two private schools with fees), Arabic institutes for women, Umrah and the Rawdah via Nusuk, and help for less mobile pilgrims in Makkah.

**The 10 most valuable findings for MESH readers**

1. **Newborn iqama, step by step (iqama holders):** fees, the one-PDF-per-child Absher Tawasul request ("NewBorn registration" for babies born in the Kingdom, "Separate Dependent" for babies born abroad), the extra papers for babies born abroad, then a Jawazat appointment to collect the card. MESH has the fees but not the steps. (`140`)
2. **Exit and re-entry conditions:** passport valid at least 90 days, iqama valid, no unpaid traffic fines, applicant inside the Kingdom, fingerprints on file or an active Absher; for dependants the visa can be issued up to 7 days before the iqama expires. (`141`)
3. **Visit visa extension on Absher (updated March 2026):** first buy 3 months of health insurance and pay the 100 SAR fee (about 150 SAR a person in all), then extend under Visitor services from 7 days before expiry, preferably on a computer. (`152`)
4. **Masjid an-Nabawi Ma'had registration timing conflicts with MESH:** past windows opened mid Dhul Hijjah and closed in Muharram (1447: 16 Dhul Hijjah 1446 to 22 Muharram 1447, exam 16 Safar 1447). The live sisters guide says Dhul Qa'dah, and the newer seed guide says 5 to 20 Safar. (`145`)
5. **Lost passport:** police report first, report the loss within 24 hours (Absher now has a lost or stolen passport service), then the embassy with a set list of papers. (`115`, `137`, `138`)
6. **Updating a dependant's passport in Absher:** only in the last 12 months of the old passport, only while the dependant is inside the Kingdom; if Absher refuses, an Absher Tawasul request with a PDF under 1 MB, one dependant per request, is processed in about a day. (`112`)
7. **Masjid an-Nabawi halaqat are open to children from age 5 and to holders of any visa or an iqama;** bring a passport with visa or iqama and a Saudi mobile number; registration on reg.qm.edu.sa runs all year; online classes exist. (`158`, updated June 2026)
8. **Dar al-Hadith in Madinah:** free six-year school (3 intermediate, 3 secondary) from age 11, child must hold an iqama, needs attested and Arabic-translated school certificates equated by the Ministry of Education, 2 to 3 juz for intermediate and 4 to 5 for secondary, with a monthly allowance (300 SAR intermediate, 350 SAR secondary, as of May 2024). (`160`)
9. **International Driving Permit from inside the Kingdom:** apply to SATA with a Saudi licence and iqama, 150 SAR, valid one year, printed and digital copy. (`150`)
10. **Tourist and visit visa health insurance covers emergency care** (tests, emergency treatment, admission, road accidents, repatriation) up to a plan limit of as much as 100,000 SAR; non-urgent care is not covered. MESH's health guide tells visitors they pay for care themselves. (`155`)

## 2. Findings by MESH topic

### 2.1 Iqama, exit and re-entry, lost passport (`iqama-and-exit-reentry-fees`, `renew-passport-in-saudi` (seed), new FAQ `lost-passport`)

- **To be issued an exit and re-entry visa, the passport must have at least 90 days left and the iqama must be valid.**
  `141-post.txt`, `/fr_fr/exigences-de-validite-du-passeport-et-de-liqama-pour-lemission-dun-visa-de-sortie-reentree/` (20 Feb 2024). Status: NEW
- **Other conditions: no unpaid traffic fines, the fee paid against the applicant's iqama number, the applicant physically inside the Kingdom, and fingerprints registered with Jawazat or an active Absher account.**
  `141-post.txt`, same path (20 Feb 2024). Status: NEW for the live guide; CONFIRMS `traffic-fines` (seed): MESH says "Unpaid fines stop Absher issuing an exit and re-entry visa"
- **For dependants, the head of family can issue an exit and re-entry visa up to 7 days before the dependant's iqama expires.** (The page also says an employee applying alone needs three months of iqama validity beyond the visa, and an employer-issued visa needs the iqama to run past the return date; the wording is unclear, see section 5.)
  `141-post.txt`, same path (20 Feb 2024). Status: NEW; CONFIRMS `iqama-and-exit-reentry-fees` in spirit: MESH says "Extra months must fall within the validity of your iqama"
- **A dependant's new passport (Naqal Maloomat, نقل معلومات) is updated by the head of family in Absher under Family Members Services, then Update Resident Passport Information, entering the passport number, issue date and expiry date. It can only be done in the last 12 months of the old passport.**
  `112-post.txt`, `/fr_fr/mise-a-jour-du-passeport-sur-absher-en-arabie-saoudite/` (29 Dec 2023). Status: CONFIRMS `renew-passport-in-saudi` (seed): MESH says "Absher accepts it once the old passport has 12 months or less left" (MESH gives a different menu path: Passports, then Resident Identity services)
- **If Absher refuses the update, the head of family sends an Absher Tawasul request (Absher: My Services, Passports, Tawasul, New Request; sector تحديث وتمديد جواز السفر; service: problems updating a resident's passport information). Attach one PDF under 1 MB per dependant with: screenshot of the error, old passport, any Saudi visa in it, new passport, dependant's iqama; file name one word without spaces; write the iqama and border number in the description. One request per dependant; it is usually done in a day.**
  `112-post.txt`, same path (29 Dec 2023). Status: NEW. Note: this is the Ministry of Interior's Tawasul inside Absher, not the University's Tawasul.
- **A dependant who is outside the Kingdom cannot have the passport updated. They travel back on the new passport carrying the old one, get the entry stamp in the new passport, and the update is done once they are inside.**
  `112-post.txt`, same path. Status: NEW
- **A family member on a visit visa whose passport is renewed goes to Jawazat in person with the Jawazat passport update form, copies of the old and new passports, the visa, and the sponsor's iqama.**
  `112-post.txt`, same path (Dec 2023). Status: CONFLICTS `renew-passport-in-saudi` (seed): MESH says "Family on a multiple-entry visit visa: update the passport number on the visa in Absher"
- **Checking the update: for yourself, Absher, My Services, Inquiries, Passport, Passport Information; for a dependant, Family Members Services, Visa Services, More Details. The new expiry date shows when it has gone through.**
  `112-post.txt`, same path. Status: NEW
- **Lost passport: go to the nearest police station for a report, then to your embassy with the police report, a loss declaration, a Jawazat printout of your iqama details, a copy of the lost passport if you have one, your national ID card, an iqama copy and the passport fee.**
  `115-post.txt`, `/fr_fr/que-faire-si-vous-perdez-votre-passeport-en-arabie-saoudite/` (29 Dec 2023). Status: NEW
- **Absher has a service to report a lost or stolen passport; Muqeem has services to report a lost iqama and to correct a badly translated name.**
  `137-post.txt`, `/fr_fr/la-direction-generale-des-passeports-jawazat-en-arabie-saoudite-devoile-huit-nouveaux-services-electroniques/` (8 Feb 2024). Status: NEW
- **The loss of a passport or iqama must be reported within 24 hours; fines rise with each repeat.**
  `138-post.txt`, `/fr_fr/infractions-et-sanctions-du-systeme-diqama-en-arabie-saoudite/` (10 Feb 2024). Status: NEW
- **A resident who cannot show an iqama when asked is fined 1,000 to 3,000 SAR, rising with repeats; the same scale applies to late cancellation or renewal of exit and re-entry or final exit visas. Dependants who work without permission are fined, and a repeat can lead to deportation.**
  `138-post.txt`, same path (10 Feb 2024). Status: NEW. The page summarises the penalty schedule loosely; see section 5.
- **Iqama for a newborn: born in the Kingdom, only the dependant fees; born abroad, dependant fees plus 2,000 SAR.**
  `140-post.txt`, `/fr_fr/comment-obtenir-liqama-pour-un-nouveau-ne-en-arabie-saoudite/` (18 Feb 2024). Status: CONFIRMS `iqama-and-exit-reentry-fees`: MESH says "born outside Saudi Arabia: 2,000 SAR" (procedure in 2.3)
- **Iqama types: Premium Residency costs 100,000 SAR a year or 800,000 SAR once, and holders pay no dependant fees.**
  `116-post.txt`, `/fr_fr/7-types-diqama-en-arabie-saoudite/` (3 Jan 2024); `126-post.txt`, `/fr_fr/tout-savoir-sur-la-residence-premium-a-duree-limitee-et-illimitee-en-arabie-saoudite/` (25 Jul 2024). Status: CONFIRMS `visas-for-family-and-visitors`: MESH says "about 100,000 SAR a year, or 800,000 SAR for life"
- **Limited Premium Residency runs one to five years, renewable, at 100,000 SAR a year with a 2% yearly discount when paying for several years; applicants must be 21 or over with a passport valid 180 days, proof of means, a clean record and a medical report; holders may own property anywhere except Makkah and Madinah, where they get a right of use only.**
  `126-post.txt`, same path (25 Jul 2024). Status: CONFIRMS `owning-property-as-a-non-saudi` (seed): MESH says "In the two holy cities, a right of use (usufruct) only"

### 2.2 Absher, Nafath and SIM cards (`phone-sims-and-absher`, `absher-nafath-activation`, `sim-internet-bank`)

- **Iqama holders, their dependants and visit visa holders can open an Absher account: iqama number for residents, border number for visitors, a Saudi mobile number, an English user name, password and email.**
  `114-post.txt`, `/fr_fr/comment-ouvrir-et-activer-un-compte-absher/` (27 Dec 2023). Status: NEW
- **Three ways to activate Absher after registering: in the Nafath app; at any Jawazat office with an appointment; or at a self-service Absher kiosk (more than 420 across the Kingdom, in malls and government offices) with your iqama number, fingerprints and the registered mobile.**
  `114-post.txt`, same path. Status: CONFIRMS `phone-sims-and-absher` (kiosks at "Jawazat offices, malls, airports and government service centres"); NEW for `absher-nafath-activation`
- **Activation in the Nafath app: Settings, Absher self service, activate your national digital identity, sign in with the Absher login, enter the iqama expiry date, then capture the fingerprints of the left hand with the phone camera. Sometimes the account is activated without the fingerprint step, so check Absher afterwards.**
  `136-post.txt`, `/fr_fr/comment-activer-absher-et-prendre-vos-empreintes-digitales-depuis-lapplication-nafath-en-ligne/` (1 Feb 2024). Status: NEW for `absher-nafath-activation`
- **Customers of some banks can activate Absher through the bank: the app (Services, Government services, Absher), online banking, an ATM, or phone banking. The page describes one bank only (its phone banking number 920003344).**
  `128-post.txt`, `/fr_fr/comment-activer-le-compte-absher-via-lapplication-banque-al-rajhi/` (19 Jan 2024). Status: NEW. Single-bank content: not for section 4 (impartiality).
- **Transferring ownership of a SIM online (one operator's app): the current owner starts the transfer in the app with the recipient's iqama and mobile number; the new owner must accept within 24 hours, entering the iqama number and National Address and approving with Nafath. In a branch both people go together with their iqamas and Absher-registered numbers.**
  `131-post.txt`, `/fr_fr/comment-transferer-la-propriete-dune-carte-sim-stc-en-ligne/` (25 Jan 2024). Status: NEW for `phone-sims-and-absher`

### 2.3 Having a baby (`having-a-baby-in-madinah`)

- **Newborn iqama procedure (iqama holders): put these into one PDF per child, under 1 MB, in this order: birth certificate, baby's passport, medical insurance, fee payment receipt, baby's photo, both parents' passports and iqamas. For a baby born abroad add the baby's Saudi visa with the entry stamp and border number, the 2,000 SAR payment, and a polio vaccination certificate from the hospital.**
  `140-post.txt`, `/fr_fr/comment-obtenir-liqama-pour-un-nouveau-ne-en-arabie-saoudite/` (18 Feb 2024). Status: NEW
- **Submit it in Absher: My Services, Passports, Tawasul, New request, sector "Resident services inside the kingdom", then "NewBorn registration" for a baby born in the Kingdom or "Separate Dependent" for a baby born abroad (write the baby's border number in the description). One request per child, twins included. Pay the 2,000 SAR before submitting for a baby born abroad.**
  `140-post.txt`, same path. Status: NEW
- **An SMS confirms receipt, a second SMS confirms approval; print the approval from Tawasul, then book a Jawazat appointment and bring the appointment letter, the approval letters, the printed PDF, the children's original passports and photos. Check every detail on the card.**
  `140-post.txt`, same path. Status: NEW

### 2.4 Visas for family and visitors (`visas-for-family-and-visitors`, `bringing-parents-to-visit` (seed))

- **Extending a multiple-entry family visit visa on Absher, without leaving: possible only from 7 days before the end date. First buy 3 months of health insurance for the visitor and pay the 100 SAR extension fee (about 150 SAR a person in all), then: Absher, My Services, Passports, Visitor services, choose the person, Start service, Next, accept and confirm. Use a computer. To check, repeat the steps and open the person: the new date shows.**
  `152-post.txt`, `/fr_fr/mis-a-jour-2024-renouvellement-desormais-possible-pour-les-visas-de-visite-familiale-a-entrees-sorties-multiples-sur-absher-sans-sortir-du-territoire/` (updated 4 Mar 2026). Status: CONFIRMS `visas-for-family-and-visitors` ("from 7 days before expiry", "about SAR 100 each time"); NEW: insurance must be bought before the extension. MESH's "to 3 days after" is not mentioned in the source.
- **Tourist eVisa: one year, multiple entry, up to 90 days in the country; covers tourism, family visits and Umrah, not Hajj, and not study. Passport valid 6 months from entry. If refused, the fee is refunded within 60 days. A child's application adds the passport number of the parent travelling with them.**
  `130-post.txt`, `/fr_fr/comment-demander-un-visa-touristique-en-ligne-pour-larabie-saoudite-via-la-plateforme-ksa-visa/` (19 Jan 2024). Status: CONFIRMS `visas-for-family-and-visitors` ("valid for one year with multiple entries, up to 90 days")
- **A new tourist visa can only be issued once the one-year validity of the previous one ends; it cannot be extended.**
  `162-post.txt`, `/fr_fr/tout-savoir-sur-les-differents-visas-pour-larabie-saoudite/` (24 Jun 2024). Status: CONFIRMS `visas-for-family-and-visitors` ("It cannot be extended") and seed `guides-2026.ts` ("a new one can be issued only after the old one expires")
- **On a tourist, family visit or Umrah visa you cannot rent a flat in your own name, buy a car, work, or put your children in a government school.**
  `162-post.txt`, same path. Status: CONFIRMS `visas-for-family-and-visitors` ("What an iqama adds"); NEW detail on government schools
- **Family visit visa (ziyara): 90 days per entry, extendable by 3 months without leaving.**
  `162-post.txt`, same path. Status: CONFIRMS `visas-for-family-and-visitors` (180-day cap)
- **Visa on arrival: holders of a valid US, UK or Schengen visa, or permanent residents of the US, UK or EU, can get a visa at a kiosk or the passport desk on arrival; under-18s need a guardian; passport valid 6 months.**
  `130-post.txt`, same path (Jan 2024); `144-post.txt`, `/fr_fr/larabie-saoudite-supprime-lexigence-de-la-demande-au-prealable-du-visa-en-ligne-pour-faire-la-umrah-pour-certains-pays/` (22 Feb 2024). Status: NEW. Older pages, see section 5.
- **Family visit visas from outside the Kingdom are stamped through Tasheer visa centres (about 40 countries): book online at vc.tasheer.com, choose the visa category and family or individual, enter the invitation or pre-approval number and the sponsor's ID; bring the documents and fees. Tasheer handles biometrics, fees and insurance for the Ministry of Foreign Affairs and is not the embassy.**
  `124-post.txt`, `/fr_fr/guide-complet-pour-obtenir-un-visa-familial-pour-larabie-saoudite-sans-passer-par-la-france/` (11 Jan 2024). Status: NEW
- **Who can bring family: domestic workers and manual-labour iqamas may sponsor family visit visas but not permanent family (dependant) iqamas; professional iqamas may do both.**
  `116-post.txt`, `/fr_fr/7-types-diqama-en-arabie-saoudite/` (3 Jan 2024). Status: NEW, low confidence (informal classification), not for section 4.
- **Business and personal (Saudi-invited) visit visas: not available online; business visas only through approved agencies; personal invitations harder to get approved.**
  `162-post.txt`, same path (24 Jun 2024, later edits). Status: HISTORY, not for publication.

### 2.5 Children's schools and Qur'an study (`kindergartens-and-schools`)

- **Masjid an-Nabawi Qur'an, mutun and beginner Arabic halaqat are free, open to men, women and children from age 5, with an iqama or any visa (tourist, Umrah, visit). Bring a passport with visa or iqama, and a Saudi mobile number. Circles meet after Fajr or Duha, between Asr and Maghrib, and between Maghrib and Isha. Registration is online at reg.qm.edu.sa all year; online classes also run. Passing memorisation exams earns a small reward.**
  `158-post.txt`, `/fr_fr/comment-sinscrire-aux-cercles-dapprentissage-du-coran-du-hadith-et-de-la-langue-arabe-au-masjid-nabawi-a-medine/` (updated 17 Jun 2026). Status: CONFIRMS `learn-tajweed-in-madinah` and `women-at-masjid-an-nabawi` (seed, qm.edu.sa and reg.qm.edu.sa); NEW: age 5, any visa, Saudi number, times. `qm.edu.sa` checked live on 9 Nov 2026 (title: Qur'an and mutun halaqat at Masjid an-Nabawi).
- **Halaqat locations: Gate 22, first floor, for men; Gate 24 or Gate 13, second floor, for women.**
  `158-post.txt`, same path. Status: NEW, see section 5 before publishing.
- **Beginner Arabic in the halaqat runs in two levels: the alphabet and letter forms, then reading and writing words and sentences.**
  `158-post.txt`, same path. Status: NEW
- **Banks issue an IBAN letter that the halaqat ask for to pay children's rewards.**
  `135-post.txt`, `/fr_fr/comment-telecharger-la-lettre-iban-certifiee-de-la-banque-al-rajhi/` (30 Jan 2024). Status: NEW (the page shows one bank's free in-app IBAN letter)
- **Dar al-Hadith (Madinah): free, 6 years (3 intermediate, 3 secondary); Qur'an, Islamic sciences, Arabic, history and maths; the child must hold an iqama; entry to the first intermediate year from age 11; online registration and an in-person placement exam around May or June.**
  `160-post.txt`, `/fr_fr/tout-savoir-sur-lecole-dar-al-hadith-de-medine/` (12 May 2024). Status: NEW
- **Dar al-Hadith entry: the last school certificate attested (apostilled for France) and translated into Arabic, then equated at the Ministry of Education office; the child reads and writes Arabic; 2 to 3 juz memorised for intermediate, 4 to 5 for secondary (some flexibility).**
  `160-post.txt`, same path. Status: NEW
- **Dar al-Hadith pays a monthly allowance: about 300 SAR in intermediate, 350 SAR in secondary. Graduates have priority for the Islamic University; to aim for other universities, a student moves to a government secondary school after intermediate.**
  `160-post.txt`, same path (May 2024). Status: NEW
- **Dar al-Qur'an schools: the boys' school is free, needs an iqama (a visit visa sometimes accepted), runs a bus, Sunday to Thursday 7:30 to 11:30 or 16:00 to 19:00, with rewards for regular pupils; the girls' and women's school costs 100 SAR a term, takes boys up to age 6, accepts an iqama or any visa with a passport copy, Sunday to Thursday 7:00 to 10:30. Both: placement exam on site.**
  `159-post.txt`, `/fr_fr/ecoles-pour-apprendre-le-coran-a-medine/` (10 May 2024). Status: NEW
- **Two private schools with a Saudi track (intensive Qur'an, single-sex) and an English-medium international track (mixed until Grade 2) charge, per year: one 9,000 SAR (kindergarten), 11,000 (primary), 12,000 (intermediate), 17,000 (secondary), bus 4,600 SAR; the other 15,000 to 22,000 SAR for girls and 20,000 to 25,000 SAR for boys, more for the international track. Both give 10% off for siblings, take payment in three instalments, require the child to hold an iqama, and close registration in late August (late arrivals by exception, with a deposit to hold a place).**
  `164-post.txt`, `/fr_fr/tout-savoir-sur-lecole-privee-zayed-bin-thabit-de-medine/` (1 Aug 2024); `167-post.txt`, `/fr_fr/interview-exclusive-de-medinatouna-avec-lecole-privee-al-khandaq-a-medine/` (14 Aug 2024). Status: CONFLICTS `kindergartens-and-schools` (partial): MESH says "many accept children whose parents are on a visit visa, not only iqama holders"; both schools here require an iqama. Also differs from MESH's "Boys and girls usually study together until about age 9" (these schools separate from Grade 2 on the international track, and fully on the Saudi track).
- **Masjid an-Nabawi Ma'had: free; inside the masjid with separate men's and women's sections; in person (intidham) or distance (intisab); 3 years intermediate plus 3 years secondary; minimum age 12 for intermediate and 15 for secondary, no maximum; non-Saudis need a valid iqama and the written consent of their sponsor (the page adds this was not required in some years).**
  `145-post.txt`, `/fr_fr/guide-complet-inscription-et-informations-sur-lecole-mahad-de-la-mosquee-du-prophete-a-medine/` (updated 26 Jun 2026). Status: CONFIRMS `masjid-an-nabawi-institute-and-college` (seed: "At least 12 ... At least 15", "written approval from your employer or sponsor"); NEW: distance mode

### 2.6 Sisters and the Masjid an-Nabawi Ma'had and Kulliyah (`sisters-studying-in-madinah`, `masjid-an-nabawi-institute-and-college` (seed))

- **Ma'had registration opens once a year for about a month. Past windows: 1445 opened 23 Dhul Hijjah 1444 (12 July 2023) and closed 2 Muharram 1445; 1446 opened mid Dhul Hijjah 1445 (June 2024) and closed 17 Muharram 1446 (23 July 2024); 1447 opened 16 Dhul Hijjah 1446 (12 June 2025), closed 22 Muharram 1447 (about 17 July 2025), written exam 16 Safar 1447 (about 10 August 2025). The 1448 dates were not yet announced at the end of June 2026.**
  `145-post.txt`, same path (updated 26 Jun 2026). Status: CONFLICTS `sisters-studying-in-madinah`: MESH says "registration opens once a year, usually in Dhul Qa'dah"; also differs from `masjid-an-nabawi-institute-and-college` (seed): "from 5 to 20 Safar. For 1448 that was 19 July to 3 August 2026"
- **Ma'had registration is online through the Haramain Authority portal with a Nafath login (choose male or female applicants, level and mode, enter iqama and mobile number, upload documents), then an electronic written exam, then an in-person interview focused on the Qur'an, then originals and copies of all documents.**
  `145-post.txt`, same path. Status: CONFIRMS `masjid-an-nabawi-institute-and-college` (seed); CONFIRMS `sisters-studying-in-madinah` (written test then interview)
- **Ma'had memorisation at entry: about Juz 'Amma for intermediate and about 6 juz from the end of the Qur'an for secondary (varies by year). An older section of the same page says 5 ajza from Surah an-Nas.**
  `145-post.txt`, same path. Status: CONFLICTS `sisters-studying-in-madinah` (minor): MESH says "Thanawiyyah entry: 7 ajza (Surah az-Zumar to an-Nas)". The source itself is inconsistent; see section 5.
- **Ma'had students receive allowances (mukafa'ah) paid each term or semester; the amount varies by level and year and is not officially published.**
  `145-post.txt`, same path. Status: NEW. Amount not for publication.
- **Kulliyah of Masjid an-Nabawi: five departments (Qur'an and its sciences, Sunnah and its sciences, Shariah, Aqeedah, Arabic); only Shariah is open to women. Requirements: general secondary certificate with at least 85%, Arabic reading and writing, admission exam and in-person interview, never dismissed from this or another university. 1447 registration opened 8 Muharram 1447 (3 July 2025), electronic exam 16 Safar 1447.**
  `145-post.txt`, same path. Status: CONFIRMS `masjid-an-nabawi-institute-and-college` (seed: "at least 85%"); CONFIRMS `sisters-studying-in-madinah` ("4-year bachelor's degree in Shariah")
- **Ma'had women's section: gates 13 to 17.**
  `145-post.txt`, same path. Status: CONFIRMS `sisters-studying-in-madinah` ("western women's side, gates 13 to 17")
- **Markaz Mishkat (Hayy Rabwa): free, one-time 200 SAR for books, 2 years, al-Arabiyyah Bayna Yadayk, iqama and/or visa plus passport, placement exam, free nursery. Markaz Taibah (Hayy Taibah): free, small book fee, 2 years, passport and husband's iqama, nursery and optional bus. Markaz Academiyah al-Ma'rifah (Hayy Qaswa): Arabic 2 years, Shariah 1 year, Qur'an programme needing strong Arabic and 7 ajza.**
  `146-post.txt`, `/fr_fr/instituts-de-langue-arabe-pour-les-femmes-a-madinah-un-guide-complet/` (25 Feb 2024). Status: CONFIRMS `sisters-studying-in-madinah` on everything except the book fee: MESH says "one-time $50 for books" (CONFLICTS in currency only; 200 SAR is about 53 USD)

### 2.7 Educational visa and other universities (`living-on-a-visitor-id` (seed), `other-universities-in-madinah`, `applying-to-the-islamic-university`)

- **The educational visa is issued through the Study in Saudi platform (studyinsaudi.moe.gov.sa) after acceptance by a university; a spouse and children can be attached to it without a separate sponsor.**
  `151-post.txt`, `/fr_fr/larabie-saoudite-lance-un-nouveau-visa-educatif-pour-les-etudiants-etrangers/` (2 Mar 2024). Status: NEW; touches `visas-for-family-and-visitors` ("Students' spouse and family visas go through the University")
- **Long-term educational visa conditions: age 16 or over, passport valid 6 months beyond entry, acceptance by an accredited institution, proof of funds or a guarantee, guardian consent under 18, medical report free of infectious disease, health insurance for the student and companions, proficiency in the language of study (not required for Arabic).**
  `151-post.txt`, same path. Status: NEW
- **A long-term educational visa runs one year or more and can be extended by six months; holders may work part time and bring their families (announced March 2024).**
  `153-post.txt`, `/fr_fr/larabie-saoudite-permet-maintenant-aux-titulaires-de-visas-etudiant-de-longue-duree-de-travailler-a-temps-partiel-et-de-faire-venir-leur-famille-dans-le-pays/` (7 Mar 2024). Status: NEW, from a TV interview; not for section 4 (see section 5).
- **Study in Saudi scholarship applications: choose up to five universities and three colleges in each; internal scholarships are for applicants living in the Kingdom, external for those abroad. Documents: birth certificate, secondary diploma and transcript (each with an Arabic translation), criminal record and medical report under 6 months old (translated), passport, 6x4 photo, parents' IDs. Common refusals: unclear scans, wrong details, missing or untranslated documents. Taibah University (Madinah) is among the universities open to women.**
  `157-post.txt`, `/fr_fr/guide-complet-des-universites-ou-les-femmes-peuvent-postuler-en-arabie-saoudite/` (8 May 2024). Status: NEW. The deadline on the page (28 July 2024) is EXPIRED.
- **Certificates for Saudi use are now verified through mosadaqa.sa (Certificate Verification Service); the Saudi Cultural Bureau in Paris no longer legalises diplomas.**
  `163-post.txt`, `/fr_fr/nouvelle-procedure-de-legalisation-dun-diplome-aupres-du-bureau-culturel-saoudien-a-paris/` (24 Jul 2024, with later note). Status: NEW. mosadaqa.sa checked live on 9 Nov 2026 (title: Certificate Verification Service). Who must use it is unclear: section 5.
- **A northern university's scholarship window for non-Saudis (10 to 13 August 2024; age 17 to 25; legal residence).**
  `166-post.txt`, `/fr_fr/la-northern-border-universite-ouverture-des-inscriptions-aux-bourses-detudes-pour-les-non-saoudiens/` (9 Aug 2024). Status: EXPIRED

### 2.8 Work for dependants (`visas-for-family-and-visitors`)

- **Dependants on an iqama can be hired in health, education and some other sectors through the Ajeer service for dependants (open a Qiwa account, then Ajeer, individual account, complete a profile and CV, browse vacancies). Conditions: valid iqama, age 18 or over, certified qualifications or experience, proof of the family link. The service is free.**
  `165-post.txt`, `/fr_fr/larabie-saoudite-autorise-lemploi-des-personnes-a-charge-des-expatries-dans-les-secteurs-de-la-sante-de-leducation-et-autres/` (3 Aug 2024). Status: NEW. Applies to dependants of work iqamas; whether it applies to students' dependants is unknown (section 5).

### 2.9 Driving and cars (`drivers-license`, `getting-around`, `drive-on-visit-visa`)

- **International Driving Permit from inside the Kingdom: apply online to the Saudi Automobile and Touring Association (SATA) with your Saudi licence, iqama, passport copy and a passport photo; 150 SAR including a printed and a digital copy; delivered to your address or collected in Riyadh, Jeddah or Tabuk; valid one year from issue.**
  `150-post.txt`, `/fr_fr/comment-obtenir-un-permis-de-conduire-international-en-arabie-saoudite/` (29 Feb 2024). Status: NEW for `drivers-license`; consistent with seed `what-to-bring-to-madinah` (visitors must get the permit at home). sata.org.sa checked live on 9 Nov 2026.
- **Medical check for a licence or iqama renewal: at a clinic approved through Efada; an eye test, a short examination and a few questions; results online within an hour with an SMS; about 130 to 150 SAR.**
  `111-post.txt`, `/fr_fr/liste-des-hopitaux-approuves-par-efada-pour-les-tests-medicaux-permis-de-conduire-iqama-a-medine/` (24 Dec 2023). Status: CONFIRMS seed `guides-2026.ts` driving section ("60 to 200 SAR depending on the clinic"); the live `drivers-license` guide names only the Regional Laboratory. Clinic names not carried over (impartiality).
- **Renting a car: residents need the iqama, a valid Saudi licence, a card, and an Absher account with a registered mobile; tourists need a passport and an International Driving Permit with their licence. At pickup the TAMM system sends an SMS linking the car to your name; on return wait for the TAMM SMS confirming it has been unlinked before you leave. Deposits of 1,500 to 3,000 SAR and limits of about 350 km a day are common.**
  `149-post.txt`, `/fr_fr/comment-louer-une-voiture-en-tant-que-detenteur-dune-iqama-ou-titulaire-dun-visa-touristique-en-arabie-saoudite/` (29 Feb 2024). Status: NEW (TAMM SMS); CONFIRMS seed `guides-2026.ts` rental conditions (licence, card)
- **Scrapping an unwanted or wrecked car through Absher's vehicle drop-off service: take it to an approved scrapyard, give them the code sent to your phone, and the car leaves your Absher record at once (cannot be undone). The registration must be valid; lost plates must be reported first.**
  `132-post.txt`, `/fr_fr/liberez-vous-de-votre-vehicule-accidente-ou-indesirable-grace-a-absher-periode-damnistie-en-cours/` (25 Jan 2024). Status: NEW (procedure); the amnesty period is EXPIRED.
- **50% discount on traffic fines incurred before 18 April 2024, payable until 18 October 2024.**
  `154-post.txt`, `/fr_fr/larabie-saoudite-annonce-une-reduction-de-50-sur-les-amendes-de-circulation/` (5 Apr 2024). Status: EXPIRED
- **Delivery work with your own car through the Absher "Kafo" service.**
  `134-post.txt`, `/fr_fr/comment-un-expatrie-peut-il-legalement-travailler-en-tant-que-livreur-avec-son-propre-vehicule-en-arabie-saoudite/` (17 Jan 2025). Status: not relevant (students may not work; page promotes named companies). Skipped.

### 2.10 Banking and bills (`sim-internet-bank`, `finding-an-apartment`, `cost-of-living`)

- **Online account opening at one bank required a valid iqama, an active Absher, a National Address, a mobile number and passport number, with Absher verification at the end.**
  `113-post.txt`, `/fr_fr/comment-ouvrir-compte-bancaire-en-ligne-al-rajhi/` (27 Dec 2023). Status: HISTORY; superseded by `sim-internet-bank` ("Since September 2025 the Saudi Central Bank lets visitors with a Visitor ID open an account")
- **Bank cards can be renewed and printed at the bank's self-service kiosks (35 SAR at the bank described), then activated with a new PIN at an ATM using an SMS code.**
  `129-post.txt`, `/fr_fr/comment-renouveler-et-imprimer-sa-carte-visa-al-rajhi-aux-guichet-automatique/` (19 Jan 2024). Status: NEW, single bank; not for section 4.
- **Water bills are checked and paid through SADAD in any banking app (Government agencies, 015 Water Services) or at an ATM (Bill payments, Utilities, National Water Company) with the building's NWC account number, which the landlord has. A sewage charge of 50% of the water charge is added where the area has drainage.**
  `117-post.txt`, `/fr_fr/comment-verifier-votre-facture-deau-en-arabie-saoudite/` (3 Jan 2024). Status: NEW. The tier prices on the page (0.10, 1 and 3 SAR per cubic metre) look outdated: section 5.

### 2.11 Healthcare (`doctors-hospitals-and-pharmacies`)

- **Tourist and visit visas include compulsory health insurance, activated with the visa and sent by email. It covers urgent needs: tests, emergency treatment, admission, road accidents and repatriation, up to a limit that can reach 100,000 SAR depending on the plan. Non-urgent or specialist care is not covered. King Salman bin Abdulaziz Medical City in Madinah is named as an approved hospital.**
  `155-post.txt`, `/fr_fr/les-soins-de-sante-durgence-sont-gratuit-et-entierement-couverts-pour-les-detenteurs-de-visas-touristiques-et-de-visite-en-arabie-saoudite/` (24 Apr 2024). Status: CONFLICTS `doctors-hospitals-and-pharmacies`: MESH says "on a visit visa you pay for care yourself, so keep health insurance and some money aside"

### 2.12 Umrah, the Rawdah and Hajj (`umrah-rawdah-quba`, `hajj-as-a-student` (seed), `bringing-parents-to-visit` (seed))

- **Rawdah visits: book in Nusuk; you get a confirmation, then a reminder 24 hours before asking you to confirm or cancel. The barcode opens the automated gates only at your slot time; staff guide you to the visitors' entrances and a separate path exists for people with special needs.**
  `133-post.txt`, `/fr_fr/nouvelle-procedure-pour-entrer-a-rawdah-sharif-a-medine-via-des-portes-automatisees/` (26 Jan 2024). Status: CONFIRMS `umrah-rawdah-quba` ("Arrive at the time on your booking"); NEW: confirm or cancel 24 hours before
- **Umrah visa from abroad (1448 season): applied for only on Nusuk; a hotel booked and paid through Nusuk (giving a booking reference, BRN) is required before the visa; fees 80 USD visa, 10.50 USD visa e-service, 10.50 USD insurance e-service, plus the insurance premium; usually 48 to 72 hours; entry within 30 days of issue; refundable bookings carry a 3% refund fee.**
  `143-post.txt`, `/fr_fr/visa-omra-le-guide-complet-pour-lobtenir-soi-meme-sur-nusuk/` (20 Jun 2026). Status: NEW. Section 5 for confirmation.
- **1448 Umrah season dates: visas and arrivals resumed 31 May 2026; last visa issue 9 March 2027; last entry 23 March 2027; last departure 7 April 2027.**
  `143-post.txt`, same path. Status: NEW, time-bound to the 1448 season; CONFIRMS seed `hajj-as-a-student` ("from 1 Dhul Qa'dah (8 April 2027) Umrah permits stop")
- **Holders of any visa (family, transit, work, tourist) may perform Umrah with a Nusuk permit; the Umrah visa stay was lengthened from 30 to 90 days.**
  `156-post.txt`, `/fr_fr/larabie-saoudite-ouvre-la-omra-aux-detenteurs-de-tous-types-de-visa/` (26 Apr 2024); `161-post.txt`, `/fr_fr/le-ministere-du-hajj-et-de-la-omra-a-annonce-le-debut-de-la-delivrance-des-visas-omra/` (21 Jun 2024). Status: CONFIRMS `umrah-rawdah-quba` (Nusuk permit) and seed `guides-2026.ts` ("It covers Umrah with a Nusuk permit"); the 90-day figure is contradicted by `143` (30 or 90 days, "sources diverge"): section 5.
- **Free wheelchairs at Masjid al-Haram in Makkah: collected at the Plaza point near Al-Shubaika bridge (any Haram worker will direct you), register your name, return it straight after Umrah; open 24 hours, every day.**
  `147-post.txt`, `/fr_fr/comment-obtenir-un-fauteuil-roulant-gratuit-a-la-mecque-pour-la-omra/` (29 Feb 2024). Status: NEW
- **Electric carts at Masjid al-Haram: pickup at Plaza point (Al-Shubaika bridge), Ajyad bridge and Al-Qashashiya, or the third floor at the start of Sa'i; single seat 57.50 SAR for tawaf or sa'i, 115 SAR for a full Umrah; two seats double that; bookable in the Tanaqol app up to 7 days ahead, paid by card; no licence needed.**
  `148-post.txt`, `/fr_fr/comment-obtenir-un-scooter-electrique-au-haram-a-la-mecque/` (29 Feb 2024). Status: NEW. Prices as of February 2024: section 5.
- **Residents' Hajj packages could be cancelled free with a full refund until 14 Shawwal; if the Ministry of Interior refused the permit, 67.85 SAR was kept as an e-service fee (1445 packages cost 4,099 to 13,265 SAR).**
  `139-post.txt`, `/fr_fr/voici-comment-les-pelerins-residents-peuvent-annuler-leur-forfaits-hajj-apres-inscription-et-recuperer-leur-argent/` (15 Feb 2024). Status: HISTORY (1445 rules); useful context for `hajj-as-a-student` (seed), section 5.

### 2.13 Travel from the Kingdom (`day-trips-from-madinah`)

- **Oman e-visa for Saudi residents: no visa on arrival for GCC residents; apply at evisa.rop.gov.om ("unsponsored visa", GCC resident); passport and iqama each valid 6 months; only listed professions qualify (type 29A; 29B for accompanying dependants); 5 OMR; 28 days; 4 to 5 days to process.**
  `127-post.txt`, `/fr_fr/comment-obtenir-un-e-visa-pour-oman-pour-les-residents-darabie-saoudite/` (18 Jan 2024). Status: NEW, likely outdated (Oman's visa rules have changed since); "student" is not on the profession list. Not for section 4.

### 2.14 Premium Residency products and worker transfers (no MESH guide needed)

- **Investor, real-estate owner, entrepreneur, special talent and gifted (sport, culture) residencies: 4,000 SAR one-off fee each, with thresholds such as 7 million SAR invested, 4 million SAR of unmortgaged residential property, 400,000 SAR raised by a startup, or salaries from 14,000 SAR a month.**
  `118` to `123-post.txt`, `/fr_fr/larabie-saoudite-lance-5-nouveaux-visas-de-residence-premium-pour-seduire-les-talents-du-monde-entier/` and the five product pages (10 Jan 2024). Status: NEW, out of MESH's scope; not for publication.
- **Transferring a work iqama without the employer's consent (red Nitaqat employer, no iqama after 3 months, unpaid wages, court rulings) through Qiwa.**
  `125-post.txt`, `/fr_fr/transfert-de-votre-iqama-sans-permission-du-kafeel-en-arabie-saoudite/` (13 Jan 2024). Status: out of scope (workers only). Skipped.

### 2.15 Pages skipped for content

- `142-post.txt`, `/fr_fr/medinatouna-des-reponses-gratuites-pour-faciliter-votre-venue-a-medine-et-mecqua/` (20 Feb 2024): promotes the site's own question service. Skipped.
- `158-post.txt`, final section: promotes the site's own paid Arabic course. Skipped (the halaqat facts above come from the rest of the page).
- `162-post.txt` and `163-post.txt`: links to the site's paid visa services. Links skipped.
- `134-post.txt`: names two private delivery companies and contact people. Skipped.
- `132-post.txt`: list of named scrapyard businesses. Not carried over.
- `144-post.txt` (22 Feb 2024): visa on arrival for Umrah, with the site's own correction notice. HISTORY.

## 3. Conflicts with MESH

1. **`sisters-studying-in-madinah`: Ma'had registration month.** MESH says "registration opens once a year, usually in Dhul Qa'dah". The source shows three consecutive years opening in mid Dhul Hijjah and closing in Muharram (1447: 16 Dhul Hijjah 1446 to 22 Muharram 1447, exam 16 Safar). The newer seed guide `masjid-an-nabawi-institute-and-college` gives a third answer: 5 to 20 Safar, with 1448 dates of 19 July to 3 August 2026. **Change:** remove "usually in Dhul Qa'dah"; once the owner confirms which window is right for 1448, make both guides say the same thing and link the sisters guide to the institute guide. Until then, the sisters guide can say "once a year, in the summer; watch their X account".
2. **`sisters-studying-in-madinah`: Thanawiyyah memorisation.** MESH says 7 ajza; the source says about 6 juz in its 2026 section and 5 ajza in an older section. **Change:** none yet; confirm with the Ma'had's current announcement (section 5).
3. **`sisters-studying-in-madinah`: Markaz Mishkat book fee.** MESH says "one-time $50 for books"; the source says 200 SAR. **Change:** write "a one-time fee of about 200 SAR for books (as of February 2024)" so readers see riyals.
4. **`doctors-hospitals-and-pharmacies`: visitors and health care.** MESH says "on a visit visa you pay for care yourself". The source says tourist and visit visas carry compulsory insurance that covers emergency care, admission, road accidents and repatriation up to the plan's limit, while non-urgent care is paid by the visitor. **Change:** "Visitors: your visa's health insurance covers emergency care. Keep the policy email on your phone. Routine visits and non-urgent treatment are paid by you."
5. **`renew-passport-in-saudi` (seed): family on a visit visa with a new passport.** MESH says to update the passport number on the visa in Absher; the source (December 2023) says to go to Jawazat in person with the passport update form, both passports, the visa and the sponsor's iqama. **Change:** owner to confirm whether Absher now handles this; if not, replace with the Jawazat steps. The source is older, so MESH may already be right.
6. **`kindergartens-and-schools`: visit visa children and mixed classes (partial).** MESH says many schools accept children of visit visa families, and that boys and girls usually study together until about age 9. Both private schools described in the source (August 2024) require the child to hold an iqama, separate boys and girls from Grade 2 on the international track, and government schools take no visit visa children. **Change:** add "Some private schools and all government schools take only children with an iqama, so ask each school before you plan", and soften the age to "until the early primary years, depending on the school".

## 4. Ready-to-publish sections

### 4.1 Target: `having-a-baby-in-madinah` (new section "Your baby's iqama")

```html
<h2>Your baby's iqama</h2>
<p>If you hold an iqama, add your baby to it as a dependant. This is for iqama holders only. Do one request for each child, twins included.</p>
<table>
<thead><tr><th>Where the baby was born</th><th>Fee</th></tr></thead>
<tbody>
<tr><td>In Saudi Arabia</td><td>The dependant fees only</td></tr>
<tr><td>Outside Saudi Arabia</td><td>The dependant fees plus 2,000 SAR (as of November 2026)</td></tr>
</tbody>
</table>
<ol>
<li><strong>Make one PDF for the child, under 1 MB</strong>, with these pages in this order: birth certificate, the baby's passport, health insurance, the fee receipt, a photo of the baby, and the passports and iqamas of both parents.</li>
<li><strong>Born outside Saudi Arabia?</strong> Add the baby's Saudi visa with the entry stamp and border number, and a polio vaccination certificate from the hospital. Pay the 2,000 SAR before you submit.</li>
<li><strong>Send the request in Absher:</strong> My Services, then Passports, then Tawasul, then New request. Choose the sector Resident services inside the kingdom, then <strong>NewBorn registration</strong> for a baby born here, or <strong>Separate Dependent</strong> for a baby born abroad. For a baby born abroad, write the border number in the description.</li>
<li><strong>Wait for two text messages:</strong> the first with your reference number, the second when the request is approved. Sign in to Tawasul again and print the approval.</li>
<li><strong>Book a Jawazat appointment in Absher</strong> and bring the appointment letter, the approval, the printed PDF, the baby's original passport and passport photos.</li>
<li><strong>Check every detail on the iqama</strong> before you leave the counter.</li>
</ol>
<p>This Tawasul is the Ministry of Interior's service inside Absher, not the University's Tawasul.</p>
```

### 4.2 Target: `iqama-and-exit-reentry-fees` (new sections "Before you issue an exit and re-entry visa" and "A new passport for a family member")

```html
<h2>Before you issue an exit and re-entry visa</h2>
<p>Absher issues the visa only when all of these are true:</p>
<ul>
<li>Your passport has at least 90 days left.</li>
<li>Your iqama is valid.</li>
<li>You have no unpaid traffic fines.</li>
<li>You are inside Saudi Arabia when you apply.</li>
<li>Your fingerprints are registered with Jawazat, or your Absher account is active.</li>
<li>The fee is paid against the iqama number of the person travelling.</li>
</ul>
<p>For a dependant, the head of the family can issue the visa up to 7 days before the dependant's iqama expires.</p>
<h2>A new passport for a family member</h2>
<ul>
<li>In Absher, open Family Members Services, then Update Resident Passport Information, choose the person and enter the new passport number, issue date and expiry date.</li>
<li>Absher accepts this only in the last 12 months of the old passport, and only while the family member is inside Saudi Arabia. A family member abroad travels back on the new passport, carries the old one, and you update it once they have entered.</li>
<li>If Absher refuses, send a Tawasul request in Absher (My Services, then Passports, then Tawasul). Attach one PDF under 1 MB with a screenshot of the error, the old passport, any Saudi visa in it, the new passport and the family member's iqama. Name the file with one word and no spaces, write the iqama number in the description, and send one request per person.</li>
<li>To check, open the person under Family Members Services, then Visa Services, then More Details. The new expiry date shows once it is done.</li>
</ul>
```

### 4.3 Target: new FAQ `lost-passport` ("I lost my passport in Saudi Arabia. What do I do?")

```html
<p>Act on the same day. The loss of a passport or an iqama must be reported within 24 hours, and the fine grows each time it happens.</p>
<ol>
<li><strong>Get a police report</strong> at the nearest police station. Take an Arabic speaker with you if you can.</li>
<li><strong>Report the loss in Absher</strong>, which has a service for a lost or stolen passport.</li>
<li><strong>Go to your embassy or consulate</strong> for a new passport. Most ask for the police report, a written statement of loss, a Jawazat printout of your iqama details, a copy of the lost passport if you have one, your national ID card, a copy of your iqama and the passport fee. Each country sets its own list, so check its website first.</li>
<li><strong>Move your Saudi records to the new passport.</strong> See <a href="/ask/renew-passport-in-saudi">My passport is expiring. How do I renew it?</a></li>
</ol>
<p>Keep a photo of your passport and iqama on your phone, and a paper copy at home.</p>
```

### 4.4 Target: `visas-for-family-and-visitors` (replace the "Extending a visit visa" line with a short section)

```html
<h2>Extending a family visit visa in Absher</h2>
<p>The host (a Saudi or an iqama holder) extends a multiple-entry family visit visa in Absher, without the visitor leaving the country.</p>
<ol>
<li><strong>Buy 3 months of health insurance</strong> for the visitor first. Absher will not extend the visa without it.</li>
<li><strong>Pay the 100 SAR extension fee</strong> in your banking app. With the insurance, expect about 150 SAR a person in all (as of March 2026).</li>
<li><strong>From 7 days before the visa ends</strong>, sign in to absher.sa on a computer and open My Services, then Passports, then Visitor services.</li>
<li><strong>Choose the visitor</strong>, press Start service, check the details, press Next, then accept the terms and confirm.</li>
<li><strong>To check</strong>, repeat the steps and open the visitor: the new end date shows.</li>
</ol>
<p>The total stay is capped at 180 days. A tourist eVisa cannot be extended at all, and a new one is issued only after the old one's year has ended.</p>
```

### 4.5 Target: `drivers-license` (new sections "Driving abroad with your Saudi licence" and "Renting a car")

```html
<h2>Driving abroad with your Saudi licence</h2>
<p>For trips abroad, get an International Driving Permit from the Saudi Automobile and Touring Association (SATA) at <a href="https://sata.org.sa">sata.org.sa</a>.</p>
<ul>
<li><strong>You need:</strong> your Saudi driving licence, your iqama, a copy of your passport and a passport photo.</li>
<li><strong>Apply online:</strong> enter your details exactly as in your passport, then your licence number, class, place of issue and expiry date, and upload the documents.</li>
<li><strong>Cost:</strong> 150 SAR, for a printed and a digital copy (as of February 2024).</li>
<li><strong>Delivery:</strong> to your home, or collect it in Riyadh, Jeddah or Tabuk.</li>
<li><strong>Valid:</strong> one year from the date of issue. Carry it with your Saudi licence.</li>
</ul>
<h2>Renting a car</h2>
<ul>
<li><strong>Iqama holders:</strong> your iqama, your Saudi licence, a bank card, and an Absher account with your current mobile number.</li>
<li><strong>Visitors:</strong> your passport, your home licence and an International Driving Permit from your home country.</li>
<li><strong>At pickup</strong> you receive a text message from TAMM that registers the car to you. Photograph the car all round before you drive off.</li>
<li><strong>At return</strong> wait at the counter until TAMM sends the message that the car is no longer in your name.</li>
</ul>
```

### 4.6 Target: `kindergartens-and-schools` (new sections "Free Qur'an and Islamic schools for children" and "Private school fees")

```html
<h2>Free Qur'an and Islamic schools for children</h2>
<p>Listed alphabetically.</p>
<table>
<thead><tr><th>School</th><th>Ages and length</th><th>Who can join</th><th>What it asks</th></tr></thead>
<tbody>
<tr><td>Dar al-Hadith</td><td>From 11, for 6 years: 3 intermediate and 3 secondary</td><td>Children with an iqama</td><td>Reading and writing in Arabic; 2 to 3 juz memorised for intermediate, 4 to 5 for secondary; the last school certificate attested, translated into Arabic and equated at the Ministry of Education office; a placement exam in May or June</td></tr>
<tr><td>Masjid an-Nabawi halaqat</td><td>From 5, no end date</td><td>Children and adults with an iqama or any visa</td><td>A passport with visa or an iqama, and a Saudi mobile number. Register at <a href="https://reg.qm.edu.sa/">reg.qm.edu.sa</a> any time of year</td></tr>
<tr><td>Masjid an-Nabawi Ma'had</td><td>From 12 for intermediate, from 15 for secondary, 3 years each</td><td>Iqama holders, with written consent from the sponsor</td><td>Good Arabic, Qur'an memorisation, a written exam and an interview. One registration window a year: see <a href="/guides/masjid-an-nabawi-institute-and-college">The Masjid an-Nabawi Institute and College</a></td></tr>
</tbody>
</table>
<ul>
<li>Dar al-Hadith pays pupils a monthly allowance: about 300 SAR in intermediate and 350 SAR in secondary (as of May 2024). Its graduates have priority for the Islamic University. A pupil aiming for medicine, engineering or another field moves to a government secondary school after intermediate.</li>
<li>The halaqat give small rewards for passed memorisation exams, paid into a bank account, so keep an IBAN letter from your bank ready.</li>
</ul>
<h2>Private school fees</h2>
<p>Private schools with an English-medium international track charge roughly 9,000 to 25,000 SAR a year, depending on the stage (as of August 2024). Many give 10% off for brothers and sisters and let you pay in three instalments; the school bus is extra. Some private schools and all government schools take only children with an iqama, so ask each school before you plan.</p>
```

## 5. Questions for the owner

1. **Ma'had and Kulliyah window for 1448.** Three versions exist: Dhul Qa'dah (live sisters guide), mid Dhul Hijjah to Muharram (this source, past three years), 5 to 20 Safar with 19 July to 3 August 2026 (seed institute guide). Which is right for 1448 and 1449?
2. **Ma'had secondary memorisation:** 5, 6 or 7 ajza? The source contradicts itself.
3. **Exit and re-entry iqama validity for an iqama holder applying alone:** the source says the iqama must run three months beyond the visa; this reads oddly and was left out of 4.2. Confirm before adding anything.
4. **Family member on a visit visa with a new passport:** Absher (seed) or a Jawazat visit (source, December 2023)?
5. **Visit visa insurance:** is the emergency cover limit really up to 100,000 SAR, and does the Visitor ID (educational visa) carry the same emergency cover? Section 3 item 4 does not state the limit.
6. **Halaqat gates:** men at Gate 22 first floor, women at Gate 24 or Gate 13 second floor. Confirm before publishing; left out of section 4.
7. **Masjid an-Nabawi Ma'had sponsor consent:** the source says the written consent of the sponsor was not required in some years. For a student's child, is the sponsor letter from the University or the father?
8. **Government schools need an iqama:** stated in 4.6. Confirm this holds for children of Visitor ID students too.
9. **Dar al-Hadith:** confirm the 2026 allowance amounts, the exam month, and whether a Visitor ID child can join. Its official registration link was not in the page text.
10. **Educational visa holders working part time and bringing family** (announced March 2024 on television): is this in force for Islamic University students? Not published.
11. **Ajeer for dependants:** does it apply to dependants of student iqamas, or only of work iqamas?
12. **mosadaqa.sa:** which certificates must go through it (for Dar al-Hadith, the Ma'had, the Islamic University), and does it replace embassy attestation for all countries or only France?
13. **Umrah visa for visiting family (1448):** confirm the Nusuk hotel booking (BRN) rule, the 80 USD fee, the 30-day entry rule and the season dates (last issue 9 March 2027, last entry 23 March 2027, last departure 7 April 2027) against the Ministry's announcement before adding them to `bringing-parents-to-visit`.
14. **Electric carts at Masjid al-Haram:** are the Tanaqol prices (57.50 SAR single seat for tawaf or sa'i, 115 SAR for a full Umrah, as of February 2024) still current? Free wheelchairs could go into `umrah-rawdah-quba` now.
15. **Water tariff:** the source's tiers (0.10, 1 and 3 SAR per cubic metre plus 50% sewage) look outdated. Is a current NWC tariff worth adding to `cost-of-living`?
16. **Oman e-visa:** worth a line in `day-trips-from-madinah`? The source's rules (profession list, 5 OMR, 28 days) date from January 2024 and students do not appear on the profession list.
17. **Hajj package cancellation:** do the 1445 rules (free cancellation until 14 Shawwal, 67.85 SAR kept if the permit is refused) still apply in 1448? If yes, add to `hajj-as-a-student`.
18. **Link target in 4.3:** `/ask/renew-passport-in-saudi` exists only in the seed file, not yet in the live index. Publish it before or with the new `lost-passport` FAQ.
