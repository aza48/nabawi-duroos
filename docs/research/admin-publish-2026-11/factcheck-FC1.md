# Fact-check FC1 (9 November 2026)

Guides checked in full: `university-student-system`, `registering-your-courses`, `gpa-warnings-and-dismissal`, `university-email-and-microsoft-365`, `what-you-study-by-level` (`src/server/seed/content/guides-admin-2026-11.ts`) and `studying-online-at-the-islamic-university` (`src/server/seed/content/guides-admin-online-2026-11.ts`).

Sources used: `iu-pdfs-2026-11/student-system-guide.md`, `distance-study-handbook.md`, `study-plans-1448.md` and the normalised text of `text/student-system-guide.txt` and `text/distance-study-system-handbook.txt`; `docs/research/iu-official.md` (1445 official student guide and eduportal); `factcheck-2026-11-09-university.md`; Telegram c1 to c4, c7; approved MESH text at `bed106c` (`exams-results-and-attendance`, `find-my-timetable`, `blackboard-login`, `campus-life-islamic-university`, `tajeel-vs-itithaar`, `src/content/key-dates.ts`).

`what-you-study-by-level` was checked by script: every Arabic course name appears in `study-plans-1448.md`, no course named in a college's section sits at a different level than the source gives, and the per-level course counts match the source table (section 2.9) for all seven colleges.

## university-student-system

| Claim before | After | Source or reason |
|---|---|---|
| Saudi Digital Library: "Books, journals and references. It opens from inside Saudi Arabia" | "Books and references. It generally opens only from inside Saudi Arabia" | Handbook PDF p.7: "usually opens only in Saudi Arabia"; "journals" not in source |
| If Nafath fails, email it.care "from your personal email with your full name and University number" | Email it.care, "the address for password requests" | Contact page (PDF p.60) lists it.care for password requests; the added how-to detail is not in any source |
| University app "shows your timetable, absences, GPA and student card, and it opens the Academic System" | "shows your timetable, absences, GPA, academic record and student card" | c3 #70, c2 #68, c1 #54, IU welcome post (factcheck file line 283); "opens the Academic System" not in any source |

## registering-your-courses

| Claim before | After | Source or reason |
|---|---|---|
| Timetable built "in a short window before classes begin" | "in a short window around the start of classes" | key-dates: semester 2 add/drop 17 to 21 Dec, classes from 20 Dec (overlap) |
| "Classes start straight after" the window | "Classes start as the window ends, or in its last days" | Same |
| Withdrawal decision "usually takes from one day to a week" | "usually comes within a day to two weeks" | c1 #64 (one day to a week), c4 #10 (a day to two weeks) |

## gpa-warnings-and-dismissal

| Claim before | After | Source or reason |
|---|---|---|
| Worked example names Fiqh 3 hours, Nahw 2, Tafsir 2 | Course 1, Course 2, Course 3 (same hours and sums) | No source gives credit hours (study-plans-1448.md finding 1); the names implied real hours |

## university-email-and-microsoft-365

| Claim before | After | Source or reason |
|---|---|---|
| Locked out: email it.care "from your personal email with your full name and University number" | Email it.care, "the University's address for password requests" | As above |
| Official notices by email: "exam calls, substitute exams, answers to your requests and changes to your status" | "such as the call for final exam excuses and substitute exams, and answers such as the reply to a grade appeal" | Approved `exams-results-and-attendance` (bed106c); "changes to your status" and general request answers by email not in any source |

## what-you-study-by-level

| Claim before | After | Source or reason |
|---|---|---|
| "Every bachelor's degree at the Islamic University runs over eight levels" | "Every bachelor's degree in the seven colleges below runs over eight levels" | Plans cover the seven theoretical colleges only; scientific colleges are not in the sources |
| Law at a glance: "Saudi law, fiqh and usul from Level 1" | "Saudi law and fiqh from Level 1, usul al-fiqh from Level 2" | study-plans-1448.md 2.8: Usul al-Fiqh 1 is in Level 2 |
| Law intro: "Saudi law, fiqh and usul run together from Level 1" | "Saudi law and fiqh run together from Level 1, and usul al-fiqh joins them from Level 2" | Same |

## studying-online-at-the-islamic-university

| Claim before | After | Source or reason |
|---|---|---|
| Qira'at diploma load: "The programme's fixed courses" | "Set by the programme" | Source gives only two semesters, Qur'an memorised and an interview; "fixed courses" added |
| Sharia bachelor's: "a set plan and the same rules every semester" | "a set plan that you must follow" | Handbook PDF p.55: fixed plan the student must follow; "same rules" added |
| Saudi Digital Library "opens from inside Saudi Arabia" (platforms table and problems table) | "generally opens only from inside Saudi Arabia" | Handbook PDF p.7 "usually" |
| "A course's credit hours set its weight in your GPA" | "in the semester and cumulative GPA" | Infographic wording (finding 19); e-course students have no GPA on their dashboard, so "your GPA" misled them |
| Official document "student statement (كشف الطالب)" | "student account statement (كشف حساب الطالب)" | Screen label read from the screenshot (student-system-guide.md G); "كشف الطالب" is the authors' caption |

Removed outright: nothing. Every other specific claim (menus and Arabic labels, steps, fees, 230 riyal sums, loads, 60/40 split, 24-hour rule, contacts, phone numbers, calendar dates, grade table, honours, withdrawal limits, extra chance window and 14-hour rule, course lists) matched a source.

## Kept, resting on student reports only

| Claim | Guide | Findings |
|---|---|---|
| Up to 28 credit hours for a graduating student, raised by the college | registering-your-courses | c1 #20, c2 #5 and #10, c3 #19, c7 #6 (several periods) |
| Add and drop opens in batches, closest to graduation first; your time shown on the page and by SMS | registering-your-courses | c1 #3, c2 #1, c3 #11, c4 #1 |
| First-semester timetable fixed by the college, often all morning or all afternoon | registering-your-courses, university-student-system | c1 #17, c2 #7 and #10, c3 #10 (the no-drop rule itself is official, 1445 guide) |
| After the window: section changes through the college wakeel with an open section number; DAR on the 3rd floor | registering-your-courses | c1 #18, c2 #3, c3 #17, c4 #3 and #68 |
| Keep attending a course until the withdrawal is approved | registering-your-courses | c3 #43, c4 #10 |
| Withdrawal: the teacher does not need to agree; decision in a day to two weeks | registering-your-courses | c1 #64, c4 #10 |
| DN is worse for the GPA than an F | gpa-warnings-and-dismissal | c2 #3 and #13, c4 #19 |
| A retaken course: the F or DN still counts in the GPA after the pass | gpa-warnings-and-dismissal | c1 #10 and #51 (member quoting Article 39), consistent with approved MESH text "stays on your record and lowers your GPA" |
| A W does not cost honours | gpa-warnings-and-dismissal | c4 #35, follows from the official "no failed course" rule |
| Ask the wakeel for academic affairs to support an extra-chance request | gpa-warnings-and-dismissal | c4 #36 |
| Lecture-absence excuses uploaded under Academic, then Excuses for missed lectures; Tawasul to the college once the course has left the list | university-student-system | c1 #44 (several members, Oct to Nov 2026) |
| Final exam timetable marks barred or withdrawn courses | university-student-system | c2 #9, c4 #19 |
| Timetable day numbers 1 (Sunday) to 5 (Thursday); room field names the building | university-student-system | c1 #13, #34 |
| Blackboard app logs out: use the browser | university-student-system | c3 #68, c1 #93 |
| Sign-in hangs: use Nafath | university-student-system | c1 #24, c3 #65 |
| University email is the University number @stu.iu.edu.sa; sign in at sso.iu.edu.sa first if it will not open | university-email-and-microsoft-365 | c2 #69, c3 #66, group-chat-2026.md |
| University account and files are lost after graduation | university-email-and-microsoft-365 | c2 #69 (four messages, Jan to Apr 2026) |

## Owner questions

No new conflicts. Questions already on file that touch these guides (OWNER-QUESTIONS.md, Writer A 1 to 11 and Writer H 1 to 10) still stand, in particular:

1. The distance handbook calls itself a student effort, not an official University document; `university-student-system` and `studying-online-at-the-islamic-university` both rest on it (Writer H 1).
2. Credit-hour loads 18 to 25 and 10 to 20 are from a 1447 Admissions post; confirm for 1448 (Writer A 11).
3. Blackboard phone password: the handbook caption says "registration number", the login screen says National ID or iqama number; `university-student-system` keeps "University number and password" as in the approved `blackboard-login` (student-system-guide.md Q4, Writer H 6).
4. Course evaluation timing for on-campus students (Writer A 8).
5. Iu-official.md notes the distance BA in Sharia was open to women (July 2026) and distance applications run through distancelearning.iu.edu.sa; the online guide says only "iu.edu.sa" and is silent on sisters (Writer H 3 and 5).
