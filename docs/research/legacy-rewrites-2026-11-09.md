# Legacy guide rewrites, 9 November 2026

Five guides that lived only in the database (imported once from `src/server/seed/legacy/old-mesh.md`) now have full replacement entries in `GUIDE_REWRITES_2026_11` (`src/server/seed/content/guides-research-2026-11.ts`). Same slug and stage, so the next `content:sync` replaces the live rows. Sources: `docs/research/factcheck-2026-11-09-university.md` (A13, A22, A23, A24), `docs/research/iu-official.md`, `docs/research/study-programmes.md`, `docs/research/factcheck-2026-11-09-haram-and-daily-life.md`, the content audit of 9 November, and web searches on 9 November 2026. Facts that could not be stated with authority were left out and raised in `scripts/open-questions.json` (10 new questions, listed at the end).

`tests/queries.test.ts` now counts these five slugs as rewritten legacy guides.

## graduate-procedures (stage: leaving)

Changed:
- Rebuilt as ten ordered steps: certificate data check, download and print documents, room handover, return the card and clear your file, collect the degree, University stamp, Ministry of Foreign Affairs legalisation, embassy legalisation, graduation allowance and bisht, ticket home. Added "After you leave".
- Linked the new FAQs `graduation-certificate-name-check` and `degree-collection-and-verification`.
- Offices are named by what they do: the housing office of the Deanship of Student Affairs (Student Affairs handling housing is official), the student card office, the Deanship of Admission and Registration for certificates (its official authorisation form), Travel Management for exit and tickets.
- Visitor ID and iqama paths side by side for leaving the Kingdom.
- Graduation allowance stated as the official three months' stipend for full scholarship students, paid after clearance.
- Ticket: issued against an Etimad travel order after clearance, upgrade at own cost (September 2026 rules), link to the Etimad ticket rules.
- Ministry of Foreign Affairs steps moved to the ratification platform (ratification.mofa.gov.sa, Nafath sign-in, pay online, book a branch appointment).
- Added the 1448 declaration: scholarship graduates go home and cannot stay on the scholarship.

Removed, and why:
- "Ask for Shaykh Badr (this may change)": names an individual and hedges (audit 1A.4).
- "Graduate allowance (150 riyals)" and the Al-Otair Centre: conflicts with the official three-month allowance (audit 1A.10, A22). Question already open.
- "You need the final exit visa to receive your degree": iqama-era, unconfirmed for Visitor ID graduates (A22). Question already open.
- "Business class upgrade 527 riyals": dated figure, no official price (A22). New question.
- Wihda 22, Wihda 11, floor numbers, Wihdat al-Ikhtibarat, Idarat as-Safar windows: no official confirmation of these names (university D7). New question.
- 500 riyal furniture fine: unconfirmed figure. Kept that missing or swapped items are charged.
- Ministry branch address (Sultanah near Al Rajhi) and the 30 riyal fee: conflicting addresses, fee not on an official page. New question.
- The Indonesian consulate example and "the guide this comes from": source mention.
- The paid certificate collection service with a private phone number: advert, unchecked service. Replaced by the official authorisation form.
- "Ask in the MESH WhatsApp group" and the source credit: replaced by the Admin WhatsApp line.

## sisters-studying-in-madinah (stage: family)

Changed:
- Places listed alphabetically: Academiyah al-Ma'rifah, Dar at-Tawheed wa as-Sunnah (added, from `programs.ts`, checked 8 November 2026), Markaz Mishkat, Markaz Taibah, Masjid an-Nabawi Ma'had and Kulliyah. The at-a-glance table now shows what each teaches, length and nursery only, with no "good for" column.
- Haram Ma'had and Kulliyah: registration is once a year in Safar; for 1448, 5 to 20 Safar (20 July to 4 August 2026), written exam 11 Rabi' al-Awwal (24 August), interview 13 Rabi' al-Awwal (26 August), applied on the Authority's portal. Matches `masjid-an-nabawi-institute-and-college` and `programs.ts`. Non-Saudis need a valid iqama; a Visitor ID or visit visa is not enough.
- Location given as "the women's sections of the masjid", with no gate numbers.
- Ma'rifah: location updated to Al-Iskan, opposite Abdul Latif Al Sheikh Mosque, with its phone, from the society's own page (study-programmes item 12). Run by the Ma'rifah charitable society.
- Mishkat district given as Al-Aridh (matches `programs.ts` and its directory listing).
- "Checked 9 November 2026" in the opening line.

Removed, and why:
- The S.S.I.M credit, the "original sheet" PDF, and "send corrections to their admins": source mention and a second help channel (audit 1A.5).
- "Check first: information from December 2023": doubt in tone (audit 1A.6).
- Every rating and comparison: "excellent for speaking", "if speaking is your goal, students recommend Mishkat", "the nursery is very small and children mostly watch television", "very positive", "recommended if you don't know Arabic yet", "many students focus on marks", "a blessed place with some very good teachers", the Kulliyah student impressions (audit 1B.12).
- Registration "usually in Dhul Qa'dah": wrong; the 1448 call ran in Safar (audit 2.3).
- Gate numbers, including the contradictory "office at gate 13 on the eastern women's side" (audit 2.4). New question.
- Kulliyah "15 ajza (10 or 11 may be accepted)": sources give 3, 10 or 15. New question.
- The $50 book fee and "free" claims on fees: unrechecked 2023 figures (audit 4.9). New question.
- The uniform rule, the entry exam mark split (60 and 40), the Alfiyyah line ("unconfirmed in 2023") and the secondary-stage mutun list: unrechecked 2023 details.
- gph.edu.sa and twitter.com links: dead or outdated (audit 5.2, 5.6). Replaced by links to the institute guide and the programme page.

## kids-activities (stage: family)

Changed:
- Places listed alphabetically in each section (soft play: Kinetic, Peekboo, Poky; crèches: Al Noor Mall, Al Rashid Mall).
- Each entry keeps only ages, place and what is there, with the existing map links.
- Links to the schools guide and the Haram children's centres. Admin WhatsApp help line.

Removed, and why:
- "Really nice and fairly priced", "Cheaper, with fewer activities and not as clean", "Really nice and very clean, but expensive", "the top floor works very well": subjective ratings of businesses (audit 1B.18).
- All prices (35, 20, about 60, 50, about 40 SAR): a parent's figures, not rechecked; web searches found no current price. New question.
- Peekboo ages (1 to about 14): a listing says 2 to 12. Left out, in the same question.
- Snowy Forest: a heading and a map link only (audit 4.8). New question.
- "Tried and tested by a mother and her two soft-play experts", "Prices are what she paid and may change", "Share it and it'll be added": source mention and doubt.
- "There's a TV area, but it isn't always on": a judgement on the crèche.

## graduating-from-mahad (stage: study)

Changed:
- Opening line: the Ma'had lasts at most two years depending on placement (1445 student guide).
- College choice: rank first, second and third choices on alisc.iu.edu.sa near the end of the final Ma'had semester (A23), and scholarship students cannot move college once placed (A13, audit 3A.14).
- Visitor ID or iqama number in both places where the old text said iqama only.
- Added checks for the stipend and IBAN under Rewards, the timetable path and a link to the ta'jeel guide.

Removed, and why:
- "The Ma'had group chats announce the deadline": source mention. Now "The Ma'had announces the deadline".
- "New university number is the old one with the last digit changed to 3": unchecked (A23). New question.
- "Deanship of Student Affairs, 3rd floor": unconfirmed office location. Now "the student card office", as in the other rewrites.
- The source credit (The Western Student's Guide, May 2025).

## postgraduate-admission-1448 (stage: study)

Changed:
- Retitled "Postgraduate admission at the Islamic University: master's, PhD and diplomas" (slug kept). The opening states that the 1448 window is closed and 1449 has not opened (no announcement found on 9 November 2026).
- Dates table: master's and PhD 16 November to 11 December 2025 (extended from 6 December), higher diplomas 5 to 11 April 2026 (A24).
- Inside and outside Saudi Arabia side by side, with the two portals (postgraduate.iu.edu.sa and postgraduateminhatee.iu.edu.sa) and the written exam exemption for applicants from abroad.
- "Minahi" corrected to Minhati (audit 2.11).
- Fees table titled "Fees for the 1448 intake", sorted alphabetically, Fiqh PhD shown as 66,000. Added tuition instalments through the payment partner (August 2026).
- Added the note that the diploma in teaching Arabic trains teachers (iu-official), and a link to the bachelor's guide.

Removed, and why:
- "This summarises the university's official admission guide" and "the full guide (PDF, Arabic)": source mention and a link lost on import (audit 4.7).
- The footnote "Printed as 660,000 in the guide, which looks like a typo ... Check with the Deanship": doubt and source mention.
- "Check yours in the PDF": now "each department publishes its own conditions on the portal".

## Open questions added to scripts/open-questions.json

1. Family: current prices at the soft play centres and mall crèches, and Peekboo's ages.
2. Family: what is at Snowy Forest.
3. Sisters: whether Ma'rifah, Mishkat and Taibah are taking sisters for 1448, and their book, nursery and bus fees.
4. Haram: where the women's Ma'had and Kulliyah meet and where their office is.
5. Haram: how many juz a sister needs for the Kulliyah (3, 10 or 15).
6. University: where graduates return the card, collect the certificate, get the stamp, and collect the bisht.
7. University: the Ministry of Foreign Affairs branch in Madinah and its fee per document.
8. University: the price of a business class upgrade on the final ticket.
9. University: the "last digit 3" rule for the Kulliyah number and which office prints the new card.
10. University: whether the 1448 postgraduate fees hold for 1449.

Already open and not repeated: the graduation allowance against the 150 SAR, final exit for Visitor ID graduates, what a person collecting a certificate must bring, the 1449 postgraduate window, the Maktab 22 and Wihda 22 question, and whether the women's Ma'had and Kulliyah take students for 1449.
