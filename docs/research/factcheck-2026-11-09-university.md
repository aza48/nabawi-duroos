# Fact-check: the Islamic University of Madinah (IU) and campus life

Researched 9 November 2026. Written in our own words, no dashes used as punctuation, British English.
Scope: guides `applying-to-the-islamic-university`, `etimad-account`, `other-universities-in-madinah`, `campus-life-islamic-university`, the old-site guides in `old-mesh.md`, every FAQ with category "university", plus campus practicals and the educational visa / Visitor ID.

Confidence key: High = read on an official iu.edu.sa page, an official PDF or poster, or a Saudi regulator page. Medium = official item seen second hand, or two independent non-official sources agree. Low = single non-official source, an old source, or inference.

## How this was researched (read first)

- I read the official documents themselves, not only web pages: the 1445 Undergraduate Student Guide (PDF, 3rd edition, Chapter 5 on money and services); the 1448 admission guide for scholarship students (English PDF, 12 pages, announced on X 10 May 2026); the "Procedural guide for international students on educational visas" (PDF, October 2025, 6 pages); the Travel Management posters on the Visitor ID (infographic) and on the new government ticket rules (infographic); the 1448 academic calendar poster (JPEG) that earlier research could not read; the sports club price poster; the Central Library hours poster and the Ramadan 1447 lecture-times poster (both from the IU news Telegram channel t.me/IU_1961, which describes itself as unofficial but reposts official items).
- x.com blocks fetching, so official X posts were read through the public mirror api.fxtwitter.com, which works for single posts.
- The old Study in Saudi address studyinsaudi.moe.gov.sa did not resolve at all from my machine on 9 November 2026 (DNS error), while studyinsaudi.sa loads. The IU 1448 guide, printed May 2026, still prints the old address twice, so students may see both.
- Not found on any official page, despite repeated searches in Arabic and English: bus stops and timetable, mat'am location and serving hours, e-scooter registration, gate hours, Wi-Fi details, laundry and kitchen rules in the halls, what "Maktab 22" or "Wihda 22" is, and any page naming an "Educational Visa Unit". These are in section D.
- Earlier files already cover much of the background. I have not repeated them: `iu-official.md`, `group-chat-2026.md`, `study-in-saudi-telegram.md`, `community-multilingual.md`. Where I overturn something in them I say so in section A.

## Findings that overturn earlier research notes

1. The 1448 calendar poster is readable and MESH's calendar matches it. `iu-official.md` item 6 said MESH matched an unofficial aggregator and not the official source. It matches the official poster (details in A, `university-calendar-1448`). The eduportal table and the poster differ slightly for semester 1 (both official), so report both.
2. The monthly stipend is not a single 840 SAR figure in the University's own documents. The 1445 student guide gives 850 SAR for theoretical colleges and 1,000 SAR for scientific colleges. Students still report 840. Report both.
3. The arrival allowance (two months of stipend) and graduation allowance (three months) are official benefits, named in both the 1445 and 1448 guides. This answers the first open question in `scripts/open-questions.json` in principle: two and three stipends. The cash amounts depend on which stipend applies, so 1,680 and 2,520 are right only if the stipend is 840.
4. Free University buses between campus and Masjid an-Nabawi, free medical services and subsidised meals are all printed in the University's own 1448 guide, not just in student posts. Housing is also listed for full scholarships, but see the conflict in A.
5. There is an official YouTube channel (iu.edu.sa footer lists YouTube; search shows youtube.com/@iu_edu). `iu-official.md` item 8 said none was confirmed. Medium, I saw it only as a search result and the footer link.

---

## A. Corrections

Format: slug | current sentence | corrected sentence | source URL | source date | confidence.

### A1. `campus-life-islamic-university` and FAQ `stipend-amount`: the stipend

- Current: "The monthly stipend is 840 SAR, paid during your studies" and "Fully funded scholarship students receive a monthly stipend (mukafa'ah) of 840 SAR, as well as housing and flights."
- Corrected: "Your monthly stipend (mukafa'ah) depends on your college. The University's student guide lists 850 SAR for theoretical colleges such as Sharia, Qur'an, Hadith, Da'wah and Arabic, and 1,000 SAR for scientific colleges such as engineering, science and computing. Current students report receiving 840 SAR, so check the amount shown under Personal, Rewards in the Academic System. You also receive a two month arrival allowance, a one month books allowance each year, a three month graduation allowance for shipping books, and a discounted economy ticket home at the end of each academic year. Students with an Excellent grade receive a 1,000 SAR award each academic year."
- Sources: 1445 Undergraduate Student Guide, Chapter 5, pages 25 to 26: https://iu.edu.sa/Students/Guidelines (PDF "دليل الطالب الجامعي، الإصدار الثالث 1445"), third edition 1445 AH (2023 to 2024). 1448 admission guide for scholarship students, page 4 (lists "monthly stipend", two month arrival allowance, three month graduation allowance, discounted economy ticket, but no amounts): https://iu.edu.sa/Students/Guide, announced 10 May 2026 (https://x.com/iu_edu/status/2053475142651748434). Rewards screen: https://eservices.iu.edu.sa/ServiceDetail/st-rewards (no amounts shown on the guide page).
- Conflict to report: 840 SAR appears on student sites and in the Study in Saudi Telegram research (through November 2026). The official 1445 guide says 850 for theoretical colleges. No official page states 840. Do not delete 840 until an admin confirms what is actually paid.
- Confidence: High that the guide says 850 and 1,000 and lists the allowances. Medium on what is paid today.
- Also: the book allowance (one month a year, only within the normal study period) and the Excellent award come from the 1445 guide only. The 1448 guide omits both.

### A2. `campus-life-islamic-university`: "Students on a study visa pay nothing for their iqama."

- Corrected: "New international students on the educational visa are not given an iqama. After arrival you get a digital Visitor ID from the Passports Directorate through Absher, so there is no iqama fee to pay."
- Sources: Procedural guide for international students on educational visas, October 2025 (PDF linked from https://iu.edu.sa/Students/Guidelines), step 4 "issue Visitor ID", responsible body: General Directorate of Passports. Travel Management Visitor ID infographic: https://iu.edu.sa/طريقة-اصدار-هوية-الزائر-للطلاب-المستجدين (page lists 06/01/2026 in the department news list and 06/09/2026 on the page itself; the two listings disagree, so say "2026").
- Confidence: High for the Visitor ID process. Whether older cohorts who already hold iqamas pay anything is unconfirmed (Medium that the University pays; I found no page saying so).

### A3. `campus-life-islamic-university`: "Free housing is for unmarried students. Married students do not get free housing and rent a flat in the city."

- Official text pulls the other way for sponsored students: the 1445 guide says housing is also provided for married external scholarship students who are on the University's sponsorship, subject to available units. The 1448 guide lists "University housing" for full scholarships and says nothing about marital status.
- Corrected: "Single scholarship students are housed by the University. Family units exist only when available, and most married students rent a flat in the city. Families of students on the educational visa should not expect University family housing."
- Sources: https://iu.edu.sa/Students/Guidelines (1445 guide p.26); 1448 guide p.4; `study-in-saudi-telegram.md` (istiqdam closed, family on visitor visas, October 2025 to November 2026).
- Confidence: Medium. The "not for the new visa cohort" part is inference from the end of sponsorship, so tell the admins (D).

### A4. FAQ `is-housing-included` and `applying-to-the-islamic-university` "Housing" paragraph

- Current: "Scholarship students are housed by default ... The University's housing office allocates your room."
- Corrected: "Full (external) scholarship students are entitled to University housing. Partial (internal) scholarship students, who live in Saudi Arabia, are not: their scholarship covers tuition only, with no stipend, housing, tickets or meals. In some intakes housing has been tight, so a few new Ma'had students were offered a first year of online Arabic instead."
- Sources: 1448 admission guide pp.4 to 5, https://iu.edu.sa/Students/Guide (May 2026); `study-in-saudi-telegram.md` (2025 intake told benefits exclude housing; online Arabic year, autumn 2026).
- Confidence: High on the entitlement wording. Medium on current practice. Students arriving in August 2026 are living in halls (group chat).

### A5. `campus-life-islamic-university`, `mataam-prices`: meal prices of 1, 2 and 2 SAR

- Official sources only say three subsidised meals a day at reduced prices for external scholarship students (1445 guide p.26; 1448 guide p.4). No official page gives the prices or the serving times.
- Unofficial: a student-run Australian site (ASMU, copyright 2023) says about 90 SAR a month for the mess hall in the first months; MadinahPath (undated) says roughly 1 to 2 SAR per main meal. The group chat reports monthly booking (hajz) on the restaurant system, resale of spare meals, and a ban on taking two meals on two cards (August to October 2026).
- Corrected: "The mat'am serves three subsidised meals a day to external scholarship students. Students report 1 SAR for breakfast and 2 SAR for lunch and dinner. You book meals a month ahead on the University restaurant system (restaurant.iu.edu.sa, University login). Set a reminder before the month ends."
- Source: https://restaurant.iu.edu.sa/ (login page only), https://iu.edu.sa/Students/Guidelines, https://asmu.info/Pages/FAQ.html, https://www.kaunia.com/madinahpath/showitem/1567_Dorms-Food-Daily-Routine.html.
- Confidence: Medium for the prices (group chat plus MadinahPath). The "eating there every day costs about 5 SAR" line is arithmetic from those prices (about 150 SAR a month), which does not match ASMU's 90 SAR a month, so drop the 5 SAR line or add "students report".
- Note: whether partial scholarship students and Saudis may eat there is not stated.

### A6. `campus-life-islamic-university` and FAQ `student-discounts`: "Students get 50% off at the University sports club."

- Official price poster, National Day 92 offer, 24 September 2022 (page https://iu.edu.sa/عروض-باقات-الاشتراكات-في-النادي-الرياضي-بالجامعة-الاسلامية; prices sit in an image at https://iu.edu.sa/media/University/clup%20over.jpeg). VAT included.

| Package | Student | University staff | Outside the University |
|---|---|---|---|
| 1 day | 30 | 30 | 30 |
| 1 month | 125 | 175 | 250 |
| 3 months | 345 | 450 | 600 |
| 6 months | 600 | 800 | 1,000 |
| 12 months | 1,000 | 1,200 | 1,700 |

- Freezing is allowed: 3 month pack once for up to 15 days, 6 month pack once for up to 30 days, 12 month pack twice for up to 60 days in total.
- So students pay half only on the monthly pack. On the yearly pack the saving is about 41 percent.
- Corrected: "Students pay reduced club rates, roughly 40 to 50 percent below the public price. In 2022 a month cost 125 SAR for students and a year cost 1,000 SAR. Prices change with offers, so check at the club."
- Other dates: students quoted a National Day offer of 700 to 800 SAR a year on 7 September 2026 (`group-chat-2026.md`). A 2024 social post gave an outside pool price of 35 SAR a day or 300 SAR a month and a 3 month student price of 250 SAR (TikTok, July 2024, Low).
- Confidence: High for the 2022 sheet. Low for today's prices.

### A7. `applying-to-the-islamic-university`: the recommendation

- Current: "A recommendation (tazkiyah) from an organisation, institution or scholar in your country. The portal marks it optional, but the University's own form asks who gave it, so get one."
- Corrected: "The University's 1448 admission guide requires recommendations: two, from recognised bodies, institutions or scholars in your country, or from people the University approves."
- Source: https://iu.edu.sa/Students/Guide (English PDF "Undergraduate Admission Guide, 1448", page 7 conditions, page 11 document list), 10 May 2026.
- Confidence: High. The same guide says "a letter of recommendation" on p.7 and "two academic recommendations" on p.11, so say "recommendation letters, two of them".

### A8. `applying-to-the-islamic-university`: "The visa comes by email, with no embassy visit."

- Corrected: "After final acceptance, pay the educational visa fee through the link in your email and complete the required medical tests. Then give your fingerprints at an embassy, at an approved office or through the Ministry of Foreign Affairs app. The visa then appears in your Study in Saudi account."
- Source: https://minhatee2.iu.edu.sa/ (Arabic notice), checked 9 November 2026.
- Student reports (Medium): most 2025 and 2026 students were not asked for a real medical exam, fingerprints were done in the Saudi Bio app, and the fee reported for 2026 was USD 230 (`study-in-saudi-telegram.md`). So "no embassy visit" is true only if you use the app or an approved office. Fingerprints are not skipped.
- Confidence: High for the steps. Medium for the fee.

### A9. `applying-to-the-islamic-university`: "Final acceptance comes from the Ministry of Education, not the University."

- Corrected: "Minhati shows only a preliminary acceptance, which is conditional. Final acceptance appears only on Study in Saudi, and that is the official record."
- Source: https://minhatee2.iu.edu.sa/ . Study in Saudi's own page says the institution issues the admission decision and then the institution and the Ministry of Education complete the final steps (https://studyinsaudi.sa/en/Faq).
- Confidence: High for the Minhati wording. The "Ministry" line can stay if softened.

### A10. `applying-to-the-islamic-university`: the document list and conditions are incomplete

Add to the list (1448 guide pp.7 to 11, High):
- Copy of passport, a birth certificate or other age proof, a recent photo, and your certificate and transcript.
- A medical report confirming good health and no infectious disease or disability. The guide also says applicants must be "medically fit and free from disabilities".
- For scientific colleges (engineering, science, computing): proof of English such as IELTS or TOEFL unless your earlier study was in English or you come from a country where English is an official or main language. Teaching in scientific colleges is in English, in theoretical colleges in Arabic.
- Applicants who finished school inside Saudi Arabia are treated as internal applicants even if they apply for an external scholarship, and must submit the General Aptitude Test and, for scientific colleges, the Achievement Test (Qiyas).
- The Arabic placement test is not required of every applicant. It only places you in the Arabic institute or direct into a college.
- The president may exempt the five year certificate limit.

### A11. `applying-to-the-islamic-university`: "Applications open once a year on the Study in Saudi portal, usually in spring."

- The University's FAQ says there is no fixed annual date. Dates are announced each season (https://iu.edu.sa/D072-1, undated, answering for Saudi and internal applicants). For international scholarship applicants the windows were 19 April to 21 May 2026 (https://iu.edu.sa/Students/Guide) and 1 May to 14 June 2025, with short surprise reopenings in August 2025 (`study-in-saudi-telegram.md`). Second semester admission is "not available" per the same FAQ.
- Study in Saudi's own home page shows a "second semester 2026" window of 16 September to 6 October 2026 for international and resident students, but I could not tell whether IU takes part. A commercial blog repeats it. Treat as Low for IU.
- Corrected: "Applications open once a year. The University announces the dates each season. In 2025 and 2026 the main window was in spring, with brief reopenings for some applicants. The 1448 window was 19 April to 21 May 2026."
- Confidence: Medium.

### A12. `applying-to-the-islamic-university` and FAQ `defer-my-place`: deferral

- Current text says the University allows deferral for up to two years. The only official wording is on the older application guidance page (https://iu.edu.sa/ارشادات-التقديم-للطلاب-الدوليين-0, undated, via `iu-official.md`). The 1448 guide (May 2026) says nothing about deferral. Students report that under the educational visa, applications that ask for a later arrival are returned (`study-in-saudi-telegram.md`, #713, 30 December 2025).
- Suggested: keep the hedge. "The University's guidance has allowed deferral for up to two years after final acceptance, but students on the new visa report being told to arrive in the semester they were accepted for."
- Confidence: Medium.

### A13. 1448 declaration: missing and important for several guides

The 1448 guide (p.10) says students must follow Saudi and University rules, which include not staying in the Kingdom after graduation, withdrawal or dismissal, not moving sponsorship to anyone other than the University, and returning home on completion. It also says scholarship students may not move from one faculty to another after admission, and that placement is final (p.8). This contradicts any MESH wording that suggests a college change is possible for scholarship students. The 1445 guide allows one internal transfer within the same track by early year two, but that rule applies to students who are not on external scholarships. Confidence: High for the 1448 text.

### A14. `etimad-account` and FAQ `etimad-what-for`: the new ticket rules

- Current: "Your yearly ticket home and your final ticket as a graduate go through Etimad ... A spelling mismatch between Etimad and your passport is the most common reason a ticket gets stuck."
- Still right. But Travel Management posted new rules for government student tickets (page dated 06/09/2026, the poster says "this year"). Add:
  1. Travel this year is to capital cities only.
  2. You may fly only to your own country, or to the country that issued your arrival visa.
  3. Tickets are issued only against an official boarding order (امر اركاب) on Etimad. Open tickets are not issued.
  4. The ticket is valid for 3 months from the first travel date. No changes after that.
  5. The passenger name cannot be changed.
  6. You cannot change the departure or arrival airport on the outbound flight. Date and time may change, but you pay the fare difference and fees.
  7. No downgrading of class. Upgrades are allowed at your own cost.
  8. Cancelling a ticket returns it to the University. No cash refund.
  9. A no-show loses the whole ticket.
  10. After any change, no refund voucher goes to the student and it cannot be added to a wallet.
  11. Allowance: one cabin bag and two checked bags, within the airline's rules.
- Source: https://iu.edu.sa/التعليمات-الجديدة-لتذاكر-السفر-للطلاب-خلال-الاجازة-الصيفية (image https://iu.edu.sa/media/إدارة%20السفر/5436.jpeg). Official page and older manual: https://iu.edu.sa/Departments/TravelManagement/ProceduralManuals ("How to update data on the Etimad and ticket booking platform", 26 February 2025, hosted on SharePoint and Google Drive, so not read).
- Confidence: High. Whether these rules apply every year or only in 2026 is unknown.
- Also: students arriving use "boarding orders created in the Mantaqi program after the student uploads visa and passport photos, backed by a Deanship of Admission and Registration letter", per the Reception Unit page (https://iu.edu.sa/Departments/TravelManagement/ReceptionUnit, undated). That page still describes iqama steps and is partly out of date.

### A15. Legacy guide `new-student-steps` ("First steps for new students")

- The old steps (paperwork, medical tests at the University Hospital, border number from Idarat as-Safar after 2 to 3 days, Absher and Nafath, "Zaair ID", student card at Maktab 22, bank card via the University Bank Card Office in 2 to 3 weeks) were written for 1447 (2025) and do not match the official October 2025 procedural guide or the Travel Management infographic.
- Official order for new students on the educational visa:
  1. Buy a Saudi SIM from an operator (STC, Zain, Mobily, Lebara, Salam Mobile, Red Bull Mobile or Al-Bu'd al-Awwal) using your passport, visa or border number, and verify it with a fingerprint on the operator's device.
  2. Register on Absher (new user) using your border number, email and mobile number.
  3. Activate Absher at a self-service kiosk (Passports offices, universities, airports, approved malls): enter the border number, register and update your fingerprint. The infographic gives a QR code for kiosk locations in Madinah.
  4. Activate Nafath in the Nafath app (settings, activate the national digital ID, complete data and biometrics).
  5. In Absher, choose "Issue visitor ID" and complete the data. The Visitor ID is digital only and cannot currently be printed on paper.
  6. Open a bank account (see the bank row in B).
- Sources: Procedural guide, October 2025 (PDF, 6 pages, linked from https://iu.edu.sa/Students/Guidelines); infographic from Travel Management at https://iu.edu.sa/media/إدارة%20السفر/1425.jpeg (page "How to issue a visitor ID for new students", Idarat as-Safar).
- The old guide's medical test and Idarat as-Safar border-number steps are not in the official sequence. Student reports say most 2025 to 2026 students were not asked for a medical test (Medium). The student card step still happens: new students collected cards at the orientation exhibition in August 2026 (https://www.alyaum.com/articles/6678449, 17 August 2026), so latecomers still need the office.
- The University bank card office (card in 2 to 3 weeks, names on a sheet) is not mentioned in the official guide. The official guide has students open their own bank account, and the University's rewards service takes an IBAN update request (https://eservices.iu.edu.sa/ServiceDetail/st-rewards).
- Confidence: High for the official order. Medium that the legacy steps are now obsolete. Mark the old guide "2025 cohort" or retire it.

### A16. Legacy guide `tajeel-and-itithaar` (student's guide, version 4, August 2023)

All checked against the 1445 Undergraduate Student Guide, pp.12 to 13. High.

| Old guide says | Official 1445 guide says |
|---|---|
| Ta'jeel is at most 2 semesters per course, and you can take it again later | Ta'jeel and i'tithaar added together cannot exceed 3 semesters over the whole programme (two semesters a year system) |
| Ta'jeel does not need approval of your reason | Both need the approval of your college |
| I'tithaar semester counts as "studied but not passed", you repeat it | You are treated as withdrawn from all courses and get grade W, not a fail. The semester still counts toward your maximum study time |
| Not mentioned | First year: no ta'jeel or i'tithaar except compelling circumstances, no withdrawal from courses, no transfer between colleges |
| 4 year deadline "does not move" with i'tithaar | Matches: ta'jeel time is not counted in the maximum study time, i'tithaar time is |

- Also outdated for the Visitor ID cohort: "1 semester gets you an exit re-entry visa, 2 semesters a final exit visa" and "go to Idarat as-Safar to request your visa". Returning students (deferred, on leave, file closed, withdrawn or interrupted, or students admitted earlier who start later) request a visa renewal at https://minhatee2.iu.edu.sa/Home/VisaLanding, signing in with the University number, or with the Minhati login if there is no number yet. No dates are on that page.
- Calendar windows for semester 2 (official poster): deferral and internal transfer 13 to 19 December 2026; excuse from semester or course withdrawal 20 December 2026 to 13 March 2027.
- Sources: https://iu.edu.sa/Students/Guidelines (1445 guide); https://minhatee2.iu.edu.sa/Home/VisaLanding.

### A17. FAQ `tajeel-vs-itithaar`

Mostly right. Add: "Together they cannot exceed three semesters, they need your college's approval, and in your first year they are allowed only for compelling reasons." High.

### A18. `university-calendar-1448` (old calendar page and `key-dates`)

Official poster read on 9 November 2026 (https://iu.edu.sa/Students/AcademicCalendar, JPEG https://iu.edu.sa/media/عمادة القبول والتسجيل/التقويم الأكاديمي 1448.jpeg). All rows on MESH's calendar match the poster. Confirmed rows:

| Item | Hijri | Gregorian |
|---|---|---|
| Sem 1 start | 3/3/1448 | 16 Aug 2026 |
| Deferral, internal and external transfer | 19/2 to 2/3/1448 | 2 to 15 Aug 2026 |
| Withdraw from University | 26/2 to 18/6/1448 | 9 Aug to 28 Nov 2026 |
| Extra chances for dismissed students | 15/10/1447 to 18/2/1448 | 1 Jun to 1 Aug 2026 |
| Add, drop, change section | 28/2 to 2/3/1448 | 11 to 15 Aug 2026 |
| Excuse from semester, course withdrawal | 3/3 to 25/5/1448 | 16 Aug to 5 Nov 2026 |
| National Day holiday | 12 to 15/4/1448 | 23 to 26 Sep 2026 |
| Re-enrolment | 24/3 to 11/5/1448 | 6 Sep to 22 Oct 2026 |
| Sem 1 finals start | 19/6/1448 | 29 Nov 2026 |
| End of semester holiday | 6 to 10/7/1448 | 15 to 19 Dec 2026 |
| Sem 2 start | 11/7/1448 | 20 Dec 2026 |
| Extra chances (sem 2) | 2 to 5/7/1448 | 11 to 14 Dec 2026 |
| Deferral, internal transfer (sem 2) | 4 to 10/7/1448 | 13 to 19 Dec 2026 |
| Add, drop (sem 2) | 8 to 12/7/1448 | 17 to 21 Dec 2026 |
| Withdraw from University (sem 2) | 8/7 to 17/11/1448 | 17 Dec 2026 to 24 Apr 2027 |
| Excuse, course withdrawal (sem 2) | 11/7 to 5/10/1448 | 20 Dec 2026 to 13 Mar 2027 |
| Winter holiday | 30/7 to 8/8/1448 | 8 to 16 Jan 2027 |
| Re-enrolment for next semester | 16/8 to 4/11/1448 | 24 Jan to 11 Apr 2027 |
| Founding Day holiday | 12 to 15/9/1448 | 19 to 22 Feb 2027 |
| Eid al-Fitr holiday | 19/9 to 5/10/1448 | 26 Feb to 13 Mar 2027 |
| Sem 2 finals start | 18/11/1448 | 25 Apr 2027 |
| Eid al-Adha holiday | 5 to 16/12/1448 | 11 to 22 May 2027 |
| Year end holiday | from end of work 28/12/1448 | 3 Jun 2027 |
| Summer start, finals, new year | 1/1, 23/2, 20/3/1449 | 6 Jun, 27 Jul, 22 Aug 2027 |

- Conflict inside the University's own sources (both official): the live eduportal calendar table (https://eduportal.iu.edu.sa/iu/init?service=academicCalendar, read 9 November 2026) shows semester 1 as 10 Aug to 14 Dec 2026, add/drop 10 to 30 Aug, deferral 2 Aug to 1 Sep, excuse and course withdrawal 16 Aug to 6 Nov (one day later than the poster's 5 Nov), change of major 2 Aug to 2 Sep and external transfer 2 to 14 Aug. The poster is the public timetable, the portal is the live system and may extend windows. The group chat confirmed fall classes began 16 Aug, matching the poster.
- Advice: show the poster dates, add "the Academic System is the live authority", and recheck the eduportal in December for semester 2.
- Confidence: High.
- Official note, 8 November 2026 (IU news channel): the semester 1 final exam timetable is now on the Academic System under Academic, then Final Exams. Add to FAQ `find-my-timetable`. High.

### A19. FAQ `library-bags-laptops` and campus library hours

- The Central Library hours poster (https://t.me/s/IU_1961, post 630, 3 September 2025, signed Libraries_iu, "Knowledge Resources Centre"): 06:00 to 24:00, Sunday to Thursday, men and women, academic year 1447 to 1448. The 1445 student guide says 08:00 to 23:00. Use the newer. No Friday or Saturday opening is stated. Ramadan hours: not found.
- Confidence: Medium (poster seen through a Telegram repost).

### A20. FAQ `free-bus-to-haram` and `campus-life-islamic-university`

- The sentence is correct. Both the 1445 and 1448 official guides state free transport between the campus and Masjid an-Nabawi. The 1445 guide adds buses between housing sites outside the campus and the campus. No official source gives stops, times or the Friday arrangement. Keep "ask in the MESH group".
- Confidence: High for the existence and cost. Nothing official on times.

### A21. `other-universities-in-madinah`

- Taibah University: accurate as far as it goes. Add that it runs its own international scholarship programme for bachelor's and master's study, applied for through Study in Saudi. For 1447 (2025 to 2026) the window was 1 May to 14 June 2025. Undergraduate external scholarship age is 17 to 24 (IU is 17 to 25), applicants must live outside Saudi Arabia, and the certificate must be under five years old. Paid external health programmes need at least 90 percent, SAT 1350 and IELTS 6 (or equivalent), with a 250 SAR admin fee. Taibah has six branch towns outside Madinah. Sources: https://www.taibahu.edu.sa/en/admission-and-study/admission/international-student-admissions (undated); X post by Taibah admissions, 1 May 2025 (via search snippet). Confidence: High for eligibility, Medium for the 2025 dates.
- Prince Mugrin University: the official site now lists three colleges (Engineering; Computer and Cyber Sciences; Business and Tourism) with 12 programmes, a men's campus at Al Aqool and a women's campus at Mudhainib. The MESH row says "Business and hospitality, engineering and technology, computing, and architecture and design". Soften to the three official colleges. Founded 2017 per Wikipedia and Saudi Gazette (Medium). Source: https://upm.edu.sa/en (read 9 November 2026). The "mainly in English" claim rests on UPM's own "English-based learning programmes" line, so keep it soft. Confidence: Medium.
- Add a line in "Choosing": the IU 1448 guide says scientific colleges teach in English and need IELTS or TOEFL, so IU is also an option for English-medium science and engineering degrees.
- I did not check the Saudi Electronic University Madinah branch.

### A22. Legacy guide `graduate-procedures`

- "Graduate allowance (150 riyals) ... Al-Otair Centre": the official guides name a three month graduation allowance for shipping books for external scholarship students (1445 p.25, 1448 p.4). The legacy page mentions only 150 riyals. One of them is wrong or they are two different payments. Verify with a recent graduate. Confidence: Low on the 150 figure.
- "Business class upgrade 527 riyals": the September 2026 ticket rules confirm upgrades are possible at the student's expense, but give no price. Dated figure, Low.
- "You need the final exit visa to receive your degree": written before the Visitor ID. The Reception Unit page still lists "final exit and settlement with Passports" for new students, but that page predates the Visitor ID. Unconfirmed for the new cohort.
- "Housing office in Wihda 22": not confirmed (D).
- The 1448 guide's declaration (A13) adds that scholarship graduates must go home and not stay in the Kingdom.

### A23. Legacy guide `graduating-from-mahad` (Ma'had to Kulliyah)

- Consistent with official wording: the University places you in the Arabic institute by level and the Arabic stage is a preparation, capped at two years under the 1445 rules.
- Update: for 1448 the guide says scholarship students cannot change faculty after admission, and you rank your choices (first, second and third) on alisc.iu.edu.sa near the end of the Ma'had. Not checked: "new university number is the old number with the last digit changed to 3". Low.
- In 2025 the University replaced the Madinah course with new Arabic textbooks (`study-in-saudi-telegram.md`, #634, 21 October 2025), so mark `mahad-books` content "pre 2025 curriculum".

### A24. Legacy guide `postgraduate-admission-1448`

- Facts match official: 300 SAR application fee for all applicants "without exception" (official post 20 November 2025), portals for inside and outside the Kingdom, 1448 window 16 November to 6 December 2025. New: the window was extended to 11 December 2025 (official post 4 December 2025) and the higher diploma window was 5 to 11 April 2026. Tuition instalments through a payment partner were announced in August 2026. No 1449 postgraduate window had been announced on the Graduate Studies channel by 8 November 2026. Last year's window opened 16 November, so one may appear soon (inference, Low). Sources: https://t.me/s/highstudies_iu (official Deanship channel; posts 648, 670, 687, 701 to 703); https://iu.edu.sa/news-1447525.
- Retitle or date-stamp the guide as "1448 cycle (closed)".

### A25. Legacy guide `course-descriptions-aqeedah-dawah`

- No fact conflict found. Official place for current study plans is https://eduportal.iu.edu.sa/iu/init?service=facultiesMajors. The University made an AI course a requirement in every plan for students admitted from 1447 (official X post, 20 August 2025, via IU news channel). Add a "check against the live study plan" note. Medium.

### A26. `iu-official.md` items worth correcting for whoever merges notes

- Item 9, X handles: handles @iu_edu and @AdmissDeanship are official. @iu_edu_en and @iu_ed remain unconfirmed. Dean of Student Affairs is @dsa_iu_edu (found in search). Library: @Libraries_iu appears on the library poster.
- The University's official Telegram is not confirmed. t.me/s/IU_1961 reposts official items but calls itself unofficial. The Graduate Studies channel t.me/highstudies_iu is official.

---

## B. New facts worth adding

### B1. Guide `campus-life-islamic-university`

| Fact | Source | Date | Conf. |
|---|---|---|---|
| University Medical Center (المركز الطبي الجامعي) on campus: clinics for internal medicine, paediatrics, women's and obstetrics, general surgery, dermatology, ENT and dentistry, plus a pharmacy, radiology and ultrasound, a laboratory and an immunisation unit | https://iu.edu.sa/e0011-1 and https://iu.edu.sa/e0010-1 | undated, site shows 2026 | High |
| Hours: Sunday to Thursday 08:00 to 15:15 for clinics; an emergency shift 15:15 to 23:00 on Sunday to Thursday, and 13:00 to 21:00 on Friday and Saturday. Nothing on a 24 hour service. | https://iu.edu.sa/Departments/MCIU/MciuWorkTime-1 | undated, read 9 Nov 2026 | High |
| Online booking: clinics can be booked at https://vcappointments.iu.edu.sa/ (University login) | https://iu.edu.sa/تعزيزا-لجودة-الخدمات-الصحية-تفعيل-خدمة-حجز-المواعيد-الكترونيا-بعيادات-المركز-الطبي-الجامعي | 12 Feb 2026 | High |
| Free medical services for scholarship students, and per the 1445 guide for the student's family too ("treatment and preventive services for him and his family") for Saudi and external scholarship students | 1445 guide p.26; 1448 guide p.4 lists "free medical services" | 2023 to 2026 | High for students. Medium for family on a Visitor ID. |
| Blood donation drives take place at the Medical Center (for example 12 Oct 2026, 09:00 to 12:00). Shows it is a walk in site. | IU news channel | 11 Oct 2026 | High |
| First week: no official page covers it. In 2018 new scholarship students opened a medical file and had blood tests at the Medical Center during arrival day, and received a 300 SAR advance with their ID. Old. | https://www.alwatan.com.sa/article/385763 | 15 Sep 2018 | Low |
| Central Library: 06:00 to 24:00, Sunday to Thursday | IU news channel poster | 3 Sep 2025 | Medium |
| Free Microsoft 365 apps and 1 TB cloud storage on the University email; Blackboard (named "Zidni") is the official learning platform; the University app shows your student ID letter, academic record, timetable and status | 1445 guide p.27; IU welcome post 18 Aug 2025 | 2023, 2025 | High |
| University login (sso.iu.edu.sa) works either through Nafath or with your University number, password and a verification code. So Nafath is optional there. | https://sso.iu.edu.sa/ | read 9 Nov 2026 | High |
| Student ID letter (stamped and signed, free, instant): Academic System, Personal, Official Documents | https://eservices.iu.edu.sa/ServiceDetail/student-identification | undated | High |
| Rewards screen: Academic System, Personal, Rewards. IBAN update through a request in the rewards service. | https://eservices.iu.edu.sa/ServiceDetail/st-rewards | undated | High |
| September 2026 stipend was paid early, on Sunday 20 September 2026, for National Day. The group's rule: nobody knows the date, so do not ask the University. | IU news channel posts 19 and 20 Sep 2026 | Sep 2026 | High for the 20 Sep payment |
| Absence rule restated to new students: more than 25 percent absence of the hours bars you from the final. This matches the 75 percent attendance rule in the 1445 guide. | IU welcome post | 18 Aug 2025 | High |
| Registration load, 1447 semester 1: theoretical colleges 18 to 25 credit hours, scientific colleges 10 to 20. Dropping a course without adding another turns you "temporarily dismissed". | IU news channel, Admissions Deanship post | 20 Aug 2025 | High |
| Free buses between campus and Masjid an-Nabawi, plus buses between off-campus housing and campus, in the official guides | 1445 guide p.28; 1448 guide p.4 | 2023, 2026 | High |
| Campus transport scale: more than 35,000 trips and more than 200 vehicles in the previous year, including shuttle, ambulance, disability and airport reception runs | https://iu.edu.sa/news-1446-02-03 | 28 Jul 2025 | High |
| In Ramadan 1443 (2022) the University ran more than 10 free buses taking over 1,200 students a day to the Haram | SPA headline and search summary of https://www.spa.gov.sa/2345887 | 2022 | Medium |
| In Ramadan 2023 the city's "Madinah Buses" shuttle listed the Islamic University as a start point to the Haram, running from 15:00 to one hour after tarawih. 2026 shuttle routes were published but I could not confirm the University as a stop. | https://www.akhbaar24.com/article/detail/640929 (10 Mar 2023); search summary | 2023 | Low for now |
| A Deanship of Student Affairs consultation on "sustainable shuttle transport inside the campus" was run online in January 2026 | IU news channel | 19 Jan 2026 | High that it was held. Outcome unknown |
| Free shuttle to the Cultures and Peoples Festival from the northern Haram area and Haramain station, 30 Mar to 6 Apr 2026, 09:00 to 12:00 and 16:00 to 23:00 | SPA https://www.spa.gov.sa/N2549939 (search summary) | Mar 2026 | Medium |
| Orientation week for 1448 ran for a week in Al-Salam Hall with ID card printing on day one, a services exhibition, club stalls and library tours. In 1447 it was a 3 day exhibition, buses waited in front of the colleges at 08:50 | https://iu.edu.sa/news144834; https://www.alyaum.com/articles/6678449; IU news channel 24 Aug 2025 | 17 Aug 2026, 24 Aug 2025 | High |
| Campus amenities listed in the official guides: travel, tourism and shipping office, post office, shops, restaurants and fast food, commercial bookstores, student service centres, sports clubs and facilities | 1445 guide p.28; 1448 guide p.4 | 2023, 2026 | High |
| Skills Record programme launched for students to log courses, workshops and volunteering | IU news channel | 31 Oct 2026 | High |

### B2. Guide `applying-to-the-islamic-university`

| Fact | Source | Date | Conf. |
|---|---|---|---|
| Internal (partial) scholarships: full tuition exemption only. No stipend, graduation allowance, housing, tickets or meal services. You must keep legal residency throughout. Employer approval needed if employed. | 1448 guide pp.5 and 7 | May 2026 | High |
| Full scholarship benefits list: stipend, two month arrival allowance, three month graduation allowance for shipping books, discounted economy ticket each year, housing, subsidised meals, free transport to the Haram, central library, free medical care, counselling, activities, sports facilities | 1448 guide p.4 | May 2026 | High |
| Programme list and duration: Sharia, Creed and Da'wah, Qur'an, Hadith, Arabic and Human Studies (Arabic, Media), Law, Business (Economics); Engineering (electrical, mechanical, civil, industrial, chemical); Computing (computer science, data science, IT); Science (physics, chemistry, mathematics, financial and actuarial mathematics, environmental sciences). Four or five years. | 1448 guide p.6 | May 2026 | High |
| Qur'an college: the whole Qur'an, confirmed by an oral exam | 1448 guide p.8 | May 2026 | High |
| Registered email is the official channel. Failing to read it can end your application. | 1448 guide p.9 | May 2026 | High |
| Students from 140 countries enrolled now. Over 170 countries since 1961. | 1448 guide p.3 | May 2026 | High |
| Helpdesk steps for the arrival ticket request: describe the problem, send, press "track request", save the link. Name must match the passport exactly. | https://minhatee2.iu.edu.sa/ | 2026 | High |
| Distance learning window for non-resident international students: online university courses for semester 2 of 1448, fee based, applications to 31 Oct 2026 | IU news channel 22 Oct 2026 | Oct 2026 | High |
| A survey for gifted international applicants was posted. It is not an application. | IU news channel 16 Oct 2026 | Oct 2026 | High |
| Visa renewal page for deferred, on-leave and returning students is open on Minhati | https://minhatee2.iu.edu.sa/Home/VisaLanding | 2026 | High |

### B3. Guide `etimad-account`

See A14: the 11 new government ticket rules. Plus: a boarding order must exist before a ticket; Travel Management cancels unused student tickets and returns the value to the University account; tickets for graduates, ended or dismissed students need clearance confirmed in the University's E-REGISTER (Reception Unit page, undated, High).

### B4. FAQ `find-my-timetable`

Add the Final Exams path (Academic System, Academic, Final Exams), live since 8 November 2026 (High). Timetable edits use the Drop and Add screen under the Electronic Registration icon, and only during the calendar window (IU post 20 Aug 2025, High).

### B5. Ramadan and exam period (for a Campus practicals guide)

| Fact | Source | Date | Conf. |
|---|---|---|---|
| In Ramadan 1447 lectures started at 10:00. Fifty minute lectures were shortened to 35 minute slots (10:00 to 10:35, 10:40 to 11:15, 11:20 to 11:55, 12:00 to 12:35), with breaks for Dhuhr and Asr, and sixty minute lectures ran as 55 minute slots starting 10:00. The 1448 version (Ramadan starts about 8 February 2027) is not out yet. | IU news channel poster, post 664 | 16 Feb 2026 | Medium (low resolution image) |
| Ramadan 1448 on the calendar: Founding Day holiday 19 to 22 Feb 2027, Eid holiday from 26 Feb 2027 (19 Ramadan) to 13 Mar 2027 | official poster | Jun 2026 | High |
| Semester 1 finals start 29 Nov 2026, the end of semester holiday is 15 to 19 Dec, semester 2 starts 20 Dec | official poster; group chat confirms first exam 29 Nov, last 14 Dec | Nov 2026 | High |
| Missing a final with an accepted excuse: substitute exam by the end of week two of the next semester. The University runs an excuse call each semester (contact care@iu.edu.sa, 920022042). | 1445 guide via `iu-official.md`; https://iu.edu.sa/announ14471216 | 2 Jun 2026 | High |

### B6. New guide: "Living on the Visitor ID" (facts for the article, see C2)

| Fact | Source | Date | Conf. |
|---|---|---|---|
| The educational visa was approved by the Cabinet in September 2022 (long and short term). It needs no sponsor, covers students, researchers and trainees, and allows bringing a spouse and children. | https://www.argaam.com/en/article/articledetail/id/1591136 (Ministry of Education statement) | 29 Sep 2022 | High |
| Long term educational visa: for programmes over a year, valid 1 year and renewable each year. Needs a medical report and, if not studying in Arabic, proof of language ability, plus medical insurance documents for you and dependants. Short term: up to 6 months, extendable by 6. | https://studyinsaudi.sa/en/VisaOptions | undated | High |
| Visa applications are placed by the institution through the Ministry of Foreign Affairs e-visa platform (ksavisa.sa). Service time about 3 working days. | https://www.mofa.gov.sa/ar/eservices/Pages/svc90.aspx | undated | High |
| Students on this visa get a Visitor ID, not an iqama. It is digital, issued by the Passports Directorate through Absher, and cannot be printed on paper. | October 2025 procedural guide, step 4; Travel Management infographic | Oct 2025, 2026 | High |
| The University's own guide says no sponsorship transfer: the 1448 declaration forbids moving sponsorship to anyone but the University | 1448 guide p.10 | May 2026 | High |
| You can view a Visitor ID digital card on Absher using the border number and year of birth, and Passports published steps again in August 2026. The digital ID is valid only inside the Kingdom, and the passport is still the border document (secondary source). | https://ajel.sa/thehour/zhi1bvkrnn; https://rahhal.wego.com/blog/ (Wego, Nov 2025) | Apr 2025, Aug 2026, Nov 2025 | Medium |
| Bank account. SAMA amended its account opening rules on 25 September 2025 (3 Rabi al-Thani 1447) so banks may open accounts for holders of a Ministry of Interior Visitor ID. The bank records name, nationality, ID number and expiry, Saudi address, home country address and the purpose of the visit, may open remotely, and may offer nothing after the ID expires or the visit ends. Accounts are frozen when the ID expires. | https://rulebook.sama.gov.sa/en/update-account-opening-rules-adding-visitor-id | 25 Sep 2025 | High |
| What the University tells its students for a bank account: have an active Visitor ID in Absher, a National Address and a mobile number linked to Absher. Two routes: go to a branch and show your Visitor ID through the Absher app, or open online, where identity is verified through Nafath. Account number arrives by text, and a card can be requested by post. So Absher is required, and Nafath is the verification step for online opening. SAMA's page does not mention Nafath or Absher. | October 2025 procedural guide, step 5 | Oct 2025 | High for the University's guidance. Medium for each bank's practice (students report refusals and conflicting lists of banks). |
| SIM: the University guide says a SIM is the first step because you need a Saudi number for Absher. The provider verifies you by fingerprint. | October 2025 procedural guide, step 1 | Oct 2025 | High |
| Driving: the Traffic Directorate said on 22 August 2024 that a Visitor ID alone is not enough for a Saudi licence: non-Saudis need a resident ID or valid residence document. Visitors may drive with a valid foreign or international licence for up to a year from entry, with a licence translation that matches the vehicle class. Nothing official for students on the educational visa. | https://ajel.sa/thehour/rifbcadn5e (22 Aug 2024); https://ajel.sa/thehour/mwkt0xu2s9 | 2024 | Medium |
| Hajj: the Ministry of Tourism said in 2024 that visit visas of every type do not entitle the holder to perform Hajj. Hajj needs a permit through Nusuk. The educational visa is not a visit visa, but I found no ruling for students and no Hajj rule for the Visitor ID. | https://www.spa.gov.sa/N2119460 | 2024 | Medium for visit visas. Unconfirmed for students. |
| Umrah: from 6 October 2025 the Ministry of Hajj and Umrah said holders of all visa types may perform Umrah with a Nusuk permit. Student visas are not named. | https://www.arabnews.com/node/2617968/saudi-arabia ; https://gulfnews.com/world/gulf/saudi/all-visa-types-now-eligible-for-umrah-says-saudi-hajj-ministry-1.500295739 | 6 Oct 2025 | Medium |
| Renting: Ejar says a tenant needs a valid ID and an Absher registered mobile. It does not say whether a Visitor ID qualifies. Students say an accredited agent can register the lease (group chat 31 Aug 2026). | https://rega.gov.sa/en/rega-services/eservices/register-the-residential-lease-contract/ | undated | Low for Visitor ID |
| Work: no official page found stating the student work hours (the "20 hours a week in term, 40 in the summer" figure comes from a January 2024 explainer PDF shared on Telegram). The 1448 declaration requires regular attendance and good grades. | `study-in-saudi-telegram.md` (#216) | Jan 2024 | Low |
| Who to ask. The University has not published an "Educational Visa Unit" page. Routes that are official: Tawasul (https://helpdesk.iu.edu.sa, guest form at https://helpdesk.iu.edu.sa/newticket_guest), the Minhati helpdesk steps, care@iu.edu.sa and 920022042. Absher customer care 920020405 for activation faults (group chat). | pages above | 2026 | High for the routes. Unconfirmed for any "unit" |
| Travel Management (إدارة السفر) is the right office for tickets, passports and the Visitor ID guide. Its three units are Reception, Follow-Up and Electronic Services. | https://iu.edu.sa/Departments/TravelManagement | undated | High |
| 2025 to 2026 change summary: new intakes from August 2025 arrive on the educational visa with a Visitor ID (iqama phased out); SAMA allowed Visitor ID bank accounts (25 Sep 2025); University published its Oct 2025 step guide; Travel Management posted the Visitor ID infographic (2026); the Umrah rule widened (6 Oct 2025); new student ticket rules (Sep 2026). | sources above | 2025 to 2026 | High |

### B7. Campus practicals that students asked about: what is and is not official

| Topic | Official position | Student reports (not official) | Conf. |
|---|---|---|---|
| Free buses to the Haram | Free, campus to Masjid an-Nabawi, in both official guides | Friday departure at 09:30 in June, no Friday bus in term time, returns after Isha from set mosques, first September bus at 15:00. City routes 150 and 231 reach the University. | Official: High. Times: Low |
| Mat'am | Subsidised, three meals, external scholarship students | Monthly booking, 1 and 2 and 2 SAR, restaurant system login, second card ban | Medium |
| Hospital or clinic | Medical Center, hours as above, free for students | Closing time asked and now answered by the official hours | High |
| Halls | University housing for full scholarships; Student Supervision Unit (وحدة الإشراف الطلابي) exists in the Deanship of Student Affairs to support life in the halls | Rooms hold 2 on MadinahPath, 1 to 3 other students on ASMU (so 2 to 4), 3 in a 2006 Okaz report. Each room has bed, desk, wardrobe. Items that must stay at checkout: mattress, bed frame, wardrobe, desk, chair, with a 500 SAR fine in the old MESH guide. | Conflict, Low |
| Laundry, kitchens, rules | Nothing found | Shared kitchens or pantry areas, students buy appliances (MadinahPath) | Low |
| Central Library | 06:00 to 24:00, Sunday to Thursday | Bags not allowed, laptops allowed, private rooms for graduate students | Medium |
| Sports club | More than 10 halls and facilities (X, 2023); prices sheet 2022 | Indoor hall, outdoor Olympic style pool, covered pool, football pitches, gym (MadinahPath); women: nothing found | Medium |
| Student card | Printed on day one of orientation (Aug 2026). Office route for others. | Maktab 22 or Wihda 22 (D) | Medium |
| Wi-Fi and email | Free Office 365 and 1 TB storage with University email. Nothing on campus Wi-Fi login. | Email is student ID at stu.iu.edu.sa, Wi-Fi uses student ID and password | Email: Medium. Wi-Fi: Low |
| Gates | Nothing found | Gate 6 about 06:00 or 07:00 to 22:00 on school days, 24 hours when Gate 1 is shut | Low |
| E-scooters | Nothing found | QR registration or gate staff stop you, air pumps near the New Masjid and open sports area | Low |
| Offices | Travel Management (tickets, passports, Visitor ID). Admissions and Registration (Tawasul, visas for returning students). Student Affairs (housing, activities, Student Fund). | "Maktab 22" and "Wihda 22" | See D |

---

## C. New articles worth writing

### C1. Campus practicals (expected)

- Title: "Campus practicals at the Islamic University: buses, meals, the clinic, the library, the club and the offices."
- Purpose: one page that answers the daily questions the group repeats, with dated official facts first and clearly labelled student reports second.
- Outline:
  1. Your first week (orientation week, student card, University email and Blackboard, how to log in to the University system with Nafath or your number).
  2. Getting around (free buses to the Haram, off-campus housing shuttle, city routes 150 and 231, scooters and the registration unknown). Say "times change, check the notice on the day".
  3. Eating (mat'am, three meals, monthly booking, prices students report).
  4. Your health (Medical Center hours, shifts, clinics, online booking, free for students).
  5. Study spaces (Central Library hours, bags and laptops, graduate rooms).
  6. Sport (club price sheet 2022, student and outside prices, freezing rules).
  7. Offices (Travel Management, Admissions and Registration, Student Affairs, Tawasul, care@iu.edu.sa, 920022042).
  8. Ramadan and exam weeks (lecture times start 10:00 in Ramadan 1447, Eid holiday dates, finals timetable on the Academic System).
  9. Money (stipend by college, arrival allowance, books allowance, graduation allowance, September stipend arrival on 20 September 2026).
- Facts and sources: all of B1, B4, B5, B7 and A1, A5, A6, A19, A20. Mark every student report with "students report" and a date.
- Do not include: gate hours, scooter rules, hall rules, until confirmed (D).

### C2. Living on the Visitor ID (expected)

- Title: "Living on the Visitor ID: what it is, what it covers and what to ask first."
- Purpose: one clear page for new students on the educational visa, so they stop discovering limits one at a time.
- Outline:
  1. What it is (a digital Visitor ID tied to your border number, issued by the Passports Directorate through Absher; no iqama; the educational visa is 1 year and renewable; digital only).
  2. Getting it in order (SIM, Absher, kiosk, Nafath, Issue Visitor ID).
  3. What works: bank account and mada card (official guidance and SAMA rule), SIM, Absher services, University login, Umrah (check the Nusuk permit).
  4. What is not available or not confirmed: Saudi driving licence (Traffic: a Visitor ID is not enough; foreign licence for up to a year), Hajj (no confirmed route), renting through Ejar (agent route reported), home internet (iqama normally needed), sponsoring family (University sponsorship closed per students).
  5. Renewal and expiry: SIMs and bank products end when the ID ends; keep dates; the University's visa renewal page for returning students.
  6. Where to raise problems (Tawasul, Minhati helpdesk, care@iu.edu.sa, Absher 920020405).
  7. A "last verified" date, and "what changed in 2025 and 2026" box (see B6 last row).
- Facts: B6 and A2, A8, A15, A16. Link to `bank-account-without-iqama`, `sim-internet-bank`, `drivers-license`, `visas-for-family-and-visitors`.

### C3. "Your ticket home: the 2026 rules for student tickets" (genuinely useful)

- Purpose: ticket rules changed in September 2026 and surprised students are likely.
- Outline: boarding order on Etimad; capitals only; your country or the country of your arrival visa; 3 month validity; no name change, no airport change, date change at your cost; no refund; no show loses the ticket; baggage; link to `etimad-account`.
- Facts: A14 (one official poster, High). Add the "arrival ticket" request on Minhati (A8).

### C4. "Your University money: stipend, arrival, books and graduation allowances" (genuinely useful)

- Purpose: replace the single 840 SAR line with the full official benefits and the open conflict.
- Outline: what the guide lists, 850 and 1,000 by college, 840 as students report, how to view it (Personal, Rewards), how to update your IBAN, arrival allowance of two months, graduation allowance of three months, books allowance of one month, Excellence award of 1,000 SAR, ticket, early payment on 20 September 2026, what stops it (ta'jeel and i'tithaar, per the old student guide).
- Facts: A1, B1. Needs admin confirmation of what is actually paid (D).

I do not recommend further new articles. Other proposals in `iu-official.md` (grading, dismissal, transfers) stand and are already in that file.

---

## D. Still unconfirmed: questions for the admins

Answer in a line each. Please say if the answer is from your own card or office, and the date you checked.

1. What stipend amount do you receive each month, and in which college (theoretical or scientific)? Is it 840, 850 or 1,000 SAR? Did the amount change in 1447 or 1448?
2. Did you receive an arrival allowance of two stipends, and when? Did a graduate receive three stipends as a graduation allowance, or only the 150 SAR at Al-Otair?
3. Where do the free University buses to the Haram leave from and return to, at what times, and do they run on Fridays in term time? What changes in Ramadan and exam weeks? (No official timetable exists.)
4. Where is the mat'am (which building and gate), what hours are breakfast, lunch and dinner served, and what do the three meals cost today? Does a Visitor ID student book on restaurant.iu.edu.sa the same way? Do married or non-scholarship students eat there?
5. Does the Medical Center treat Visitor ID students free from the first day, and does it cover wives and children on visitor visas? Is the emergency shift real on Fridays and Saturdays?
6. How many students share a room in the Jamiah halls and in Rabwa, do all blocks have air conditioning, is there laundry, what are the kitchen rules and the visitor rules? Is the Rabwa shuttle part of the official off-campus housing bus?
7. Is "Maktab 22" the same as "Wihda 22" (Unit 22, the Student Affairs and housing building)? Which counter handles the student card, which the bank card, which housing handover, and which Student Relations?
8. Is there an "Educational Visa Unit" and where is it? Is the route Tawasul, then Deanship of Admission and Registration, subject "Educational visa"? Who replies, and in how many days?
9. How long is the Visitor ID valid, who renews it, and what happens when it expires (SIM, bank account, Absher)? Students quote 6 months for SIMs and ID, while the visa is for a year.
10. Can a Visitor ID student register for Hajj, take a driving test, rent through Ejar without an agent, or get home fixed internet? What did the offices tell you?
11. Do the University and Travel Management still ask Visitor ID students to do final exit at graduation? What do graduates do now for the clearance, certificate and ticket?
12. E-scooters: what is the registration QR link, who runs it, and what does the gate check? Where are the gates and their opening hours, especially Gate 6?
13. Sports club: what do students pay now for a month and a year, and are the adult classes open to women?
14. Is the Central Library open on Fridays and Saturdays, and what are its Ramadan hours? Do the library and the sports club have a separate section or times for sisters?
15. Is the "one year Visitor ID with a 180 day stay" rule real, and are fines charged after 180 days? (Group chat 14 June 2026 asked; no answer.)
16. Do scholarship students on the educational visa get a medical exam on arrival, or only at the visa stage? What does the arrival medical file involve?
17. First week cash: did you receive any advance (the 2018 report said 300 SAR) and how long until the first stipend and the first bank card?
18. For students who arrived on the old sponsorship: do you still pay nothing for an iqama and the dependants' levy?
19. Postgraduate: is the 1449 window opening in November 2026 as in 2025, and where will it be announced?
20. Study in Saudi: can the second semester 2026 window (16 September to 6 October 2026) apply to IU, or only to other universities?
