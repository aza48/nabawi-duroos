# Guide to the study system at the Islamic University (distance): what it says about studying online

**What the source is.** "دليل نظام الدراسة في الجامعة الإسلامية (عن بعد)", prepared by the course interactivity supervisors of the electronic university courses (مشرفي تفاعلية المقررات الجامعية الإلكترونية). PDF title field "دليل الطالب", made in Canva on 7 November 2026, 60 pages (cover, intro, two index pages, then printed pages 1 to 56; printed page n is PDF page n + 4). Extracted text: `text/distance-study-system-handbook.txt`; the PDF (72 MB) is not in the repo.

**Two things the owner should know first.**
1. **This is the same document that `student-system-guide.md` already read** (that reader had a copy posted on 8 November as `دليل الطالب (1).pdf`; same title, same 60 pages, same screens). That file covers the Student Information System screen by screen and fed the published guide `university-student-system`. This file reads the same PDF for one purpose only: **studying online**, for a new guide `studying-online-at-the-islamic-university`. Findings already in `student-system-guide.md` are marked CONFIRMS (other file) and not repeated in detail.
2. **The document calls itself unofficial.** PDF page 2 says it is "a purely student effort" that "does not represent an official body and is not part of the University in any way". The brief and `README.md` call it official. The screenshots are real University screens (first semester 1448, Tawasul footer 2026), so screen labels and system messages are solid. Programme rules (fees, loads, the 60/40 split, the 24-hour recording rule) are the supervisors' statements, not a University circular. See question 1.

**How I read it.** The extracted text in full (normalised from Arabic presentation forms), then as images the pages whose text was missing or unclear: PDF 7 (the "Tips and information" infographic, which has no text layer, rendered at 200 dpi and read card by card), 9 (dashboard), 12 (Tawasul), 18 (payment screen), 42 (Blackboard login), 47 (lectures and recordings), 60 (contacts). The FAQ pages (PDF 55 to 59) were read from the text, which carries all their wording.

**Compared with:** the seed guides `university-student-system`, `registering-your-courses`, `gpa-warnings-and-dismissal` (`guides-admin-2026-11.ts`), `exams-results-and-attendance` and the FAQs `online-arabic-year-to-madinah`, `summer-semester`, `blackboard-login` (`guides-gaps-2026-11.ts`), `sisters-study` (`guides-2026.ts`), and a grep of `src/server/seed/content/` for distance, online, remote, عن بعد and 230. **MESH has no page on the University's distance programmes.** Its only online-study item is the FAQ `online-arabic-year-to-madinah`, which is about the Ma'had's online Arabic year, a different thing.

## 1. Summary

The University runs three distance systems: the electronic university courses (flexible, any of seven specialisations, 230 riyals an hour), the distance Sharia bachelor's (fixed plan, free on donor grants) and the associate diploma in the seven qira'at. Lectures run live in Blackboard Collaborate and can be watched as recordings within 24 hours without an absence; coursework is 60 marks and the final 40; exams are online with the camera on. Registration, payment, results and requests use the same Academic System, Blackboard and Tawasul screens as on-campus students, with a few differences: e-course students have no GPA on the dashboard, no ta'jeel or i'tithaar, and withdraw from a course through Tawasul because the Course withdrawal screen does not work for them.

**The most valuable findings for MESH readers:** 1, 4, 5, 9, 12, 16, 18, 19, 22, 27.

## 2. Findings

### A. The programmes

1. **Distance study has three systems** (PDF 5): electronic university courses (نظام المقررات الجامعية الإلكترونية عن بعد: flexible, every Sharia specialisation, a certificate for each course and a micro-certificate for two or more related courses, leading to associate diploma, intermediate diploma or bachelor's, 230 riyals an hour); the distance Sharia bachelor's (offered when donor bodies fund grants, Sharia only, without the e-courses' flexibility, free for grant holders); the associate diploma in the seven qira'at (two semesters, whole Qur'an memorised, personal interview, 230 riyals an hour). Status: NEW (CONFIRMS student-system-guide.md, K)
2. **E-course specialisations** (PDF 6, 58): Qur'an (qira'at, tajweed, tafsir), Hadith (chains, texts, jarh wa ta'deel), Aqeedah and Da'wah (tawheed and aqeedah), Sharia (fiqh and usul), Arabic language (nahw, sarf, balaghah), Regulations (law, above all Saudi), Economics (economics, Islamic economics, mathematics). They share some common courses. Status: NEW (the subject focus is new; the list CONFIRMS student-system-guide.md)
3. **How you specialise** (PDF 6): every course of every specialisation is open at registration; you choose the courses of your target specialisation from the student guide's course table, where "yes" under a specialisation marks a course it requires; once you hold all its courses and requirements you request the qualification (اطلب المؤهل). On-campus plans can be used to order your choices, "the difference is very small". Status: NEW
4. **E-courses compared with the Sharia bachelor's** (PDF 55): e-courses: flexible plan by budget and time; accredited bachelor's for those who meet its conditions and sit an in-person exam at the end; no need to finish the bachelor's, some stop after about two years with a diploma (with its conditions); fees by hours; **no minimum load, a student can pass semesters without registering anything, with no request, and stays regular**; maximum 25 hours a semester; no time limit. Sharia bachelor's: free grant, the administration picks from applicants ("lower chance of acceptance"); Sharia only; fixed plan the student must follow; in-person exam at the end; 12 to 25 hours a semester; 8 to 12 semesters. Status: NEW (CONFIRMS student-system-guide.md, K)
5. **Sharia bachelor's structure** (PDF 59): core subjects fiqh in its chapters, usul al-fiqh, qawa'id fiqhiyyah, judicial studies; eight levels of about nine courses each; two semesters a year; a student can spread a level over semesters and finish in about 12 semesters. Stopping without a request closes the file (يطوى قيده); there are **three chances in total** for ta'jeel or i'tithaar; requests go through the Academic System. Status: NEW
6. **Completed hours are kept and there is no time limit** in the e-courses (PDF 58). Status: NEW
7. **Admission** (PDF 57): no interview (for the e-courses; the qira'at diploma has one); apply on the University's official website and follow admission by email; requirements are only uploading documents such as a passport copy and certificates and completing registration on the site. Status: NEW
8. **Qur'an memorisation at the start** (PDF 57): no level is required; memorisation starts gradually from Surat al-Baqarah in the first levels. Study combines understanding and memorisation and suits beginners, starting at introductory levels (PDF 56). Status: NEW

### B. Fees and payment

9. **E-course fees** (PDF 58): a registration fee of 230 riyals at the start of each semester, then the student adds courses and pays 230 riyals per credit hour. Status: NEW (CONFIRMS student-system-guide.md, D)
10. **Payment screen** (PDF 18, read as image): Personal, E-payment (الدفع الإلكتروني), Cards (بطاقات); amount due shown, type the same amount in "Amount to pay" and press Pay (دفع). Screen text: accepts mada, Visa or Mastercard; on success the Financial Administration is notified automatically and the amount due is adjusted automatically; no need to contact Finance after paying; keep the receipt; if a payment fails and money was taken, contact the issuing bank. The screen addresses "dear student (male / female)" (عزيزي الطالب / الطالبة). Status: NEW (the automatic notification and adjustment are new; the rest CONFIRMS student-system-guide.md, D)
11. **Card tips** (PDF 17): card allowed for purchases abroad, not blocked, balance above the amount because of conversion fees, ask the bank; if your card cannot pay from abroad, ask an acquaintance living outside your country; asking any classmate to pay, in private or in public, is forbidden. Status: CONFIRMS student-system-guide.md, D (adds the acquaintance route)

### C. Platforms and sign-in

12. **Dashboard for e-course students** (PDF 9, read as image): current semester, semester GPA and cumulative GPA are not calculated for e-course students "because of the micro-certificate system" (they show a dash); total absence there is the one that counts, not Blackboard's; "Today's lectures" shows only if the teacher entered times in the Academic System. Status: CONFLICTS (scope) gpa-warnings-and-dismissal, which says the dashboard shows semester and cumulative GPA (true for degree students)
13. **Platforms** (PDF 11): Academic System (registration, timetable, record, GPA); Blackboard (lectures, assignments, tests, contact with staff); Tawasul (requests, official transactions, academic problems); Saudi Digital Library ("usually opens only in Saudi Arabia; the teacher sends books and notes to the student"). Status: CONFIRMS university-student-system
14. **Acceptance email and first sign-in** (PDF 8): on acceptance an email gives your data; sign in with University number, temporary password, and copy the verification code. Status: CONFIRMS university-student-system
15. **Blackboard on a phone** (PDF 42, read as image): the app asks for "Islamic University of Madinah", then Continue with Web-Login. The authors' caption says "username: University number, password: registration number (رقم التسجيل)"; the Web Login screen itself says "the default password is your National ID / Iqama number". Status: CONFLICTS blackboard-login, which says "sign in with your University number and password" (see question 6)

### D. Registration and Tawasul

16. **Tawasul for distance students** (PDF 12, read as image): New request (طلب جديد) shows two choices under "list of departments": **Contact the E-Learning Center (Blackboard)** (التواصل مع مركز التعليم الإلكتروني (بلاك بورد)) and **Technical contact** (تواصل تقني). Status: NEW (university-student-system says "choose the office from the list", which holds; the two distance options are new)
17. **A failed drop after Confirm** (PDF 14): send a Tawasul request to the E-learning window and ask for the course to be dropped. Status: CONFLICTS (scope) registering-your-courses and university-student-system, which send registration problems to the Deanship of Admission and Registration (right for degree students)
18. **Course withdrawal for e-course students goes through Tawasul only**; the Course withdrawal screen in the Academic System does not work for them (PDF 36, 58); e-course students have no ta'jeel or i'tithaar (PDF 33, 58). Status: CONFLICTS (scope) registering-your-courses and university-student-system, which give Academic, then Course withdrawal (right for degree students). CONFIRMS student-system-guide.md, H

### E. Teaching, attendance and marks

19. **Weekly hours** (PDF 7 infographic): each course has set weekly hours, varying by course, split into a synchronous lecture (live with the teacher, about an hour) and asynchronous study (recorded lectures or set learning activities covering part of the course). Example: Fiqh al-Ibadat 1 in Sharia, 4 weekly hours = 1 synchronous + 3 asynchronous. Each course's credit hours weigh in the semester and cumulative GPA. Status: NEW
20. **Live lectures and recordings** (PDF 47, read as image): open the course; the envelope beside the teacher sends a Blackboard message; Details and actions, Class Collaborate, Join session (الانضمام إلى الجلسة), then the lesson; the three dots beside Class Collaborate give View all recordings (عرض جميع التسجيلات), then Watch now (المشاهدة الآن); the teacher's shared file can be downloaded with the icon in the session. Status: CONFIRMS student-system-guide.md, I (adds exact labels)
21. **Recordings** (PDF 56): lectures are live; the recording watched within 24 hours counts, with no absence recorded; recordings stay available until after the final exams. Status: NEW (the "until after the finals" part is new)
22. **Live attendance** (PDF 56): some lectures must be attended live, such as Qur'an; some within 24 hours; some recorded lectures can be followed at any time; some teachers require live attendance. No camera in lectures. Time differences are no obstacle; teachers take them into account. Status: NEW
23. **Attendance recording** (PDF 7): recorded electronically when a student attends or not; Blackboard attendance is for follow-up only; the absence and warnings that count are in the Academic System; some teachers record by hand, so learn each teacher's method, above all in the Qur'an courses. Status: CONFIRMS exams-results-and-attendance (the Academic System record counts) and student-system-guide.md, F
24. **Coursework 60 marks, final 40** (PDF 7): 100 per course. Each teacher divides the 60 as he wishes: one or two semester tests; questions in Blackboard; research on a set topic; summarising a set book; a Blackboard discussion; marks for participation in lectures; in Qur'an courses, recordings of the memorised portion uploaded to a Blackboard assignment; other tasks. Semester tests are closed book unless the teacher allows it, and can be proctored; every task has a start and end date and missing it loses the marks. Status: CONFLICTS (scope) exams-results-and-attendance, which says "In most courses about 40 marks come from coursework ... and 60 from the final exam" (degree students). Publish the distance split only in the distance guide; see question 4
25. **Blackboard course pages** (PDF 45, 46, 49, 50 to 52): course guide and description; enrichment lessons (الدروس الإثرائية), self-study and ungraded but expected; assignments and tests; Calendar with + to add events and Due dates (تواريخ الاستحقاق); Grades with Show all work; notifications under your name on a computer, under More, then Settings on a phone. Status: CONFIRMS student-system-guide.md, I
26. **Books** (PDF 56): teachers mostly use summaries and notes, plus enrichment material in Blackboard. All teachers in the distance system are men; there are no women staff (PDF 57). Status: NEW

### F. Exams and results

27. **Exams** (PDF 56, 57): taken remotely on a computer with the camera on; mostly true or false and multiple choice; lectures, semester and final tests work the same in both systems, but each teacher has his own way. Status: NEW
28. **No summer semester for distance students** (PDF 56: "it does not open for them, but we hope"). Status: CONFLICTS (scope) summer-semester, which describes the summer semester without saying it is for on-campus students only
29. **Course evaluation before results** (PDF 22): opens just before the exams and briefly at their start, then closes. Status: CONFIRMS exams-results-and-attendance and university-student-system
30. **Official documents in a distance account** (PDF 29): Student statement (كشف الطالب) and Electronic university course completion certificate (شهادة إتمام مقرر جامعي إلكتروني). Status: CONFIRMS student-system-guide.md, G
31. **Recognition** (PDF 56): whether the certificate is accepted in a student's country depends on that country's rules; it is useful in Islamic centres and da'wah. Status: NEW
32. **Contacts** (PDF 60, read as image): Blackboard bb@iu.edu.sa; E-Learning Center elc@iu.edu.sa; technical support it.support@iu.edu.sa and a mobile +966 55 796 5152; Deanship of IT and E-Learning +966 14 847 1856 and it.care@iu.edu.sa (password requests); Deanship of Admission and Registration admission.reg@iu.edu.sa and admiss.deanship@iu.edu.sa; Tawasul at helpdesk.iu.edu.sa for anyone who cannot sign in or has no account. A named official's personal email is also listed; not used. Status: CONFIRMS student-system-guide.md, J and blackboard-login

## 3. Conflicts with MESH

None of MESH's statements is wrong for the readers it was written for (degree students in Madinah). The conflicts are of scope: a distance student reading these pages would be misled. The new guide handles each one for distance students. Optional one-line notes for the existing pages are in section 4.

1. **exams-results-and-attendance** (`guides-gaps-2026-11.ts`): "about 40 marks come from coursework ... and 60 from the final exam". Distance courses are 60 coursework, 40 final (finding 24).
2. **registering-your-courses** and **university-student-system** (`guides-admin-2026-11.ts`): Course withdrawal through Academic, then Course withdrawal, and registration problems to the Deanship of Admission and Registration. For e-course students, withdrawal and failed drops go through Tawasul to the E-Learning Center (findings 17, 18).
3. **gpa-warnings-and-dismissal** (`guides-admin-2026-11.ts`): the dashboard "shows your semester and cumulative GPA". For e-course students those boxes are empty (finding 12).
4. **summer-semester** FAQ (`guides-gaps-2026-11.ts`): no summer semester for distance students (finding 28).
5. **blackboard-login** FAQ (`guides-gaps-2026-11.ts`): "sign in with your University number and password" in the app. The source gives the password as the "registration number" (caption) or the National ID / Iqama number by default (screen) (finding 15). Not changed; question 6.
6. **README.md** in this folder lists the document as "Official". It says of itself that it is not (see the note at the top).

## 4. Ready-to-publish text

### 4.1 New guide `studying-online-at-the-islamic-university` (stage `study`)

Written in `src/server/seed/content/guides-admin-online-2026-11.ts` (`GUIDES_ADMIN_ONLINE_2026_11`), not repeated here. It is not yet registered in `sync.ts` or `guide-topics.ts`. Suggested topic: **more-study** ("Other ways to study"), next to postgraduate study and the Masjid an-Nabawi Institute. It links to `university-student-system`, `applying-to-the-islamic-university`, `what-you-study-by-level`, `/ask/blackboard-login` and `/ask/blackboard-phishing`.

Left out of the guide until the owner answers: the absence limit for distance students, refunds, the application dates and portal page, the in-person bachelor's exam arrangements, whether sisters are admitted, the technical support mobile number and the Blackboard default password.

### 4.2 `exams-results-and-attendance`: add after the sentence on the 40 and 60 split

```html
<p>The University's distance programmes use a different split, 60 for coursework and 40 for the final: see <a href="/guides/studying-online-at-the-islamic-university">Studying online at the Islamic University</a>.</p>
```

### 4.3 `registering-your-courses`: add at the end of "Withdrawing from a course"

```html
<p>Studying online in the electronic courses? You withdraw through Tawasul to the E-Learning Center instead: see <a href="/guides/studying-online-at-the-islamic-university">Studying online at the Islamic University</a>.</p>
```

### 4.4 `summer-semester` FAQ: add at the end of the first paragraph

```html
There is no summer semester for the distance programmes.
```

## 5. Questions for the owner

1. **Is this document official enough to publish its programme rules?** It says on page 2 that it is a student effort and not an official University document; the brief calls it the official handbook. The screens are real. The fees (230 riyals an hour plus 230 each semester), the 60/40 mark split, the 24-hour recording rule and the loads come from its authors, who supervise the courses. The new guide states them. If you want only University-issued facts, those sections need an official source first.
2. **Fees in 1448.** Are 230 riyals per credit hour and the 230 riyal registration fee current? Is anything refunded when a course is dropped or withdrawn, and what happens to a registered course left unpaid? Is the registration fee charged in a semester with no courses?
3. **Applying.** On which page of iu.edu.sa do distance applicants apply, and when does each programme open? Is the Sharia bachelor's grant open for 1448? The guide says only "apply on iu.edu.sa".
4. **Absence limit.** Does the 25% bar (and the DN grade) apply to distance courses? The source names warnings but no figure, so the guide gives none.
5. **Sisters.** The payment screen addresses male and female students and the teachers are all men. Are the distance programmes open to sisters? If yes, the guide (and `sisters-study`, `sisters-studying-in-madinah`) should say so.
6. **Blackboard password on a phone.** University password, "registration number", or National ID / Iqama number by default? This affects `blackboard-login` too (and student-system-guide.md question 4).
7. **The in-person exam at the end of the bachelor's.** Where is it held (Madinah only, or centres abroad), and is a visa provided for it?
8. **Requesting the qualification.** Through which screen or Tawasul option does an e-course student request a diploma or bachelor's once the requirements are met, and how many hours does each diploma need?
9. **Technical support mobile +966 55 796 5152.** Left out until confirmed as an official line (same as student-system-guide.md question 8).
10. **Moving to Madinah.** Do hours passed in the distance programmes count if the student later joins a college in Madinah on a scholarship? Readers abroad will ask; the source does not say.
