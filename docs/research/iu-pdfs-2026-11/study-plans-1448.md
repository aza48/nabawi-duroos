# Bachelor's study plans for 1448: the courses in each college, level by level

This file draws on four sources. **(1)** The official 1448 study plan of the College of the Noble Qur'an and Islamic Studies (خطة كلية القرآن الكريم ١٤٤٨هـ): 1 page, one table of courses by level. **(2)** The official 1448 study plan of the College of Noble Hadith and Islamic Studies (خطة كلية الحديث الشريف ١٤٤٨هـ): 1 page, same layout. **(3)** The College of Hadith's interactive guide to its bachelor's programme and course descriptions (الدليل التفاعلي لتوصيفات برنامج ومقررات البكالوريوس في كلية الحديث الشريف): 13 pages, prepared by the college's Vice-Deanship for Development and Quality. It lists the courses of the approved plan of 1445 (no. 106) and the approved plan of 1446 (no. 108) level by level, and each course name links to its description in a University OneDrive folder. **(4)** A student compilation of the 1448 plans for the seven theoretical colleges (14 pages, not an official document), with a course code for every course except in the Law college. I used it only for the five colleges the official plans do not cover, plus course codes. Every finding from it is marked "student compilation". I read all pages of all four, as page images and not only as extracted text, because the tables did not survive text extraction. **None of the four sources gives credit hours, so this file has no hours and no hour totals.** Course counts stand in for totals. Library folder names were read from `src/content/library-books.json` and `library-books.ts` in the audit worktree on 9 November 2026.

Abbreviations: Q = Qur'an plan (source 1, page 1); H = Hadith plan (source 2, page 1); G = Hadith interactive guide (source 3); SC = student compilation (source 4). Library levels are written "lib L3".

## 1. Summary

The sources set out what a bachelor's student studies in each of the eight levels (semesters) of the University's theoretical colleges for the 1448 year. Both official plans list courses by level and say nothing else: no hours, no codes, no prerequisites. The Hadith guide adds the two earlier Hadith plans (1445 and 1446), so we can see exactly what changed. The student compilation repeats the two official tables almost exactly and adds the plans for Aqidah and Da'wah, Sharia, Arabic Language and Humanities, Business (Economics) and Law and Judicial Studies, with codes.

**The 10 most valuable findings**

1. **No source gives credit hours.** The official 1448 plans list course names only. Hours and course descriptions are held in University OneDrive folders linked from the Hadith guide, which I did not open (see section 5).
2. **Qur'an college, 1448: 65 courses over 8 levels.** Specialist work starts in Level 1: the Seven Qira'at run from Level 1 to 6, the Three Qira'at in Levels 7 and 8, and Analytical Tafsir 1 to 5 in Levels 3 to 7. The college has no Qur'an memorisation courses, because students enter with the whole Qur'an memorised.
3. **Hadith college, 1448: 73 courses over 8 levels**, with a Qur'an course in every level, Analytical Hadith 1 to 6 in Levels 2 to 7, Mustalah al-Hadith 1 to 5 in Levels 3 to 7 and Books of the Sunnah 1 to 5 in Levels 4 to 8.
4. **What changed in Hadith for 1448:** one course added, Applications of Artificial Intelligence (تطبيقات الذكاء الاصطناعي) in Level 4. Everything else matches the 1446 plan (no. 108).
5. **What changed in Hadith between 1445 and 1446:** University Skills, Study of Saudi Law and Innovation were dropped. History of the Sunnah moved from Level 3 to Level 1, the Analytical Hadith series moved one level earlier, and Co-op Training (التدريب التعاوني) was added in Level 8.
6. **The MESH Hadith library still follows the 1445 plan (no. 106).** A 1448 student in Level 2 studies Analytical Hadith 1, but the library files it under Level 3. History of the Sunnah sits under Level 3 instead of Level 1. Three folders hold courses that 1448 Hadith students no longer take.
7. **The MESH Qur'an library follows an older plan and has no Level 1 folder.** Seven Qira'at 1 is filed under lib L3 but is a Level 1 course in 1448. 19 of the 65 courses in the 1448 plan have no folder at all.
8. **The MESH Sharia library follows an older plan.** The 1448 Sharia plan (student compilation) adds many Saudi law courses (constitutional, administrative, commercial, criminal, labour and more). 31 of its 87 courses have no folder.
9. **The MESH Da'wah library matches the 1448 plan exactly.** All 78 courses sit at the right level (student compilation). The plan, however, names the college "College of Aqidah and Da'wah" (كلية العقيدة والدعوة), while the library card says "Da'wah and Usul ad-Din" (كلية الدعوة وأصول الدين).
10. **Courses share codes across colleges** (student compilation). Tajwid is قرأ 3013 in every college that teaches it, and Tawhid 1 is عقد 3001. MESH can link one course's books into every college that teaches it. Aqidah and Da'wah, Arabic and Business share the same 18 courses in Levels 1 and 2.

## 2. Findings by MESH topic

### 2.1 How the plans are written (new guide: `what-you-study-by-level`)

**The official 1448 plans list course names by level (المستوى الأول to الثامن): eight levels, no credit hours, no course codes, no prerequisites.**
Q p.1, H p.1. Status: NEW

**The College of Hadith publishes a description (توصيف) for its programme and for every course, linked from each course name in its interactive guide. The guide covers the approved plan of 1445 (no. 106) and the approved plan of 1446 (no. 108).**
G p.2 to 3, p.8. Status: NEW

**The theoretical colleges with 1448 plans are: the Noble Qur'an and Islamic Studies, Noble Hadith and Islamic Studies, Aqidah and Da'wah (العقيدة والدعوة), Sharia (الشريعة), Arabic Language and Humanities (اللغة العربية والدراسات الإنسانية), Business, Economics department (الأعمال، قسم الاقتصاد), and Law and Judicial Studies (الأنظمة والدراسات القضائية). This list comes from the student compilation.**
SC p.1 to 14. Status: CONFIRMS applying-to-the-islamic-university: MESH says "Sharia, Creed and Da'wah, the Holy Qur'an, Hadith, Arabic language and Media, Law, and Business (Economics)"

**Each course code is a department prefix plus four digits, for example قرأ 3013 (Tajwid), عقد 3001 (Tawhid 1), سنة 3012 (Introduction to Prophetic Hadith). A course taught in several colleges keeps the same code: Tajwid, Tawhid 1 and 2, Fiqh 1 and 2, the Sirah, Introduction to Prophetic Hadith, Language Skills, Nahw 1, History of the Kingdom, Islamic Values, Religions, Sects, Contemporary Ideologies, Research Methods, Balaghah, Takhrij and Fara'id. This comes from the student compilation.**
SC p.2 to 13. Status: NEW

**In the student compilation, Aqidah and Da'wah, Arabic Language and Business (Economics) share the same first two levels: 10 courses in Level 1 and 8 in Level 2. Level 1: Language Skills, University Skills, the Sirah, Introduction to Prophetic Hadith, Tawhid 1, Introduction to the Study of Fiqh, Fiqh 1, Qur'an 1, Tajwid, Introduction to Saudi Law. Level 2: Entrepreneurship and Innovation, Principles and Methods of Da'wah, Introduction to Mustalah al-Hadith, Tawhid 2, Introduction to Tafsir and the Qur'anic Sciences, Fiqh 2, Qur'an 2, Nahw 1. Qur'an, Hadith, Sharia and Law start their own courses from Level 1.**
SC p.6, 10, 12. Status: NEW

**A course called Applications of Artificial Intelligence (تطبيقات الذكاء الاصطناعي, code عال 3054 in the student compilation) is in the official Hadith plan at Level 4. The student compilation also puts it in Sharia Level 8 and in Qur'an Level 8, but the official Qur'an plan does not list it.**
H p.1; Q p.1; SC p.3, 4, 9. Status: NEW (Qur'an placement unresolved, see section 5)

### 2.2 College of the Noble Qur'an and Islamic Studies (official plan) (new guide: `what-you-study-by-level`)

**The 1448 Qur'an plan has 65 courses: 8, 8, 8, 7, 8, 9, 9 and 8 in Levels 1 to 8.**
Q p.1. Status: NEW

**Qur'an students study the Seven Qira'at 1 to 6 in Levels 1 to 6 and the Three Qira'at 1 and 2 in Levels 7 and 8. Alongside them run Rasm al-Mushaf 1 and 2 (Levels 5 and 6), Dabt al-Mushaf (Level 7), 'Add al-Ay (Level 4) and Tawjih al-Qira'at (Level 5).**
Q p.1. Status: NEW

**Tafsir runs from Introduction to Tafsir (Level 1) through Usul at-Tafsir (Level 3), Methods of the Mufassirun (Level 4), Rules of Tafsir (Level 5) and Analytical Tafsir 1 to 5 (Levels 3 to 7) to Thematic Tafsir and Tafsir Skills (Level 8).**
Q p.1. Status: NEW

**The Qur'an college has no "Qur'an 1 to 8" memorisation courses, unlike every other college. Students enter with the whole Qur'an memorised.**
Q p.1; SC p.4 to 14. Status: CONFIRMS applying-to-the-islamic-university: MESH says "the whole Qur'an memorised, confirmed in an oral exam"

**Co-op training (تدريب تعاوني) comes twice: once for Tafsir (Level 7) and once for Qira'at (Level 8).**
Q p.1. Status: NEW

**What changed for 1448: the official plan does not say.** The library's Qur'an folders (older plan) show the earlier pattern: two shared first-year levels, and the Seven Qira'at starting in Level 3. This is an inference from the library, not from the source.
Q p.1. Status: NEW

Table: Qur'an college, 1448. Credit hours: not stated in any source. Codes are from the student compilation (SC p.2 to 3).

| Level | Course (English) | Arabic name | Code (SC) |
|---|---|---|---|
| 1 | The Seven Qira'at 1 | القراءات السبع (1) | قرأ 3100 |
| 1 | Tawhid 1 | توحيد (1) | عقد 3001 |
| 1 | Fiqh 1 | الفقه (1) | فقه 3101 |
| 1 | Tajwid | التجويد | قرأ 3013 |
| 1 | Introduction to Prophetic Hadith | المدخل إلى الحديث النبوي | سنة 3012 |
| 1 | Introduction to the Science of Qira'at | مدخل إلى علم القراءات | قرأ 3204 |
| 1 | Introduction to the Science of Tafsir | المدخل إلى علم التفسير | فسر 3101 |
| 1 | The Prophet's Sirah | السيرة النبوية | ترخ 3001 |
| 2 | The Seven Qira'at 2 | القراءات السبع (2) | قرأ 3101 |
| 2 | Tawhid 2 | توحيد (2) | عقد 3002 |
| 2 | Fiqh 2 | الفقه (2) | فقه 3102 |
| 2 | Qur'anic Sciences 1 | علوم القرآن (1) | فسر 3102 |
| 2 | Nahw (Arabic grammar) 1 | النحو (1) | لغة 3007 |
| 2 | Introduction to Mustalah al-Hadith | مقدمة في مصطلح الحديث | سند 3004 |
| 2 | Tajwid and Phonetics | علم التجويد والأصوات | قرأ 3203 |
| 2 | Islamic Values | القيم الإسلامية | ثقف 3001 |
| 3 | The Seven Qira'at 3 | القراءات السبع (3) | قرأ 3205 |
| 3 | Tawhid 3 | توحيد (3) | عقد 3004 |
| 3 | Language Skills | المهارات اللغوية | أدب 3004 |
| 3 | Qur'anic Sciences 2 | علوم القرآن (2) | فسر 3206 |
| 3 | Ethics of the Bearers of the Qur'an | أخلاقيات حملة القرآن | قرأ 3016 |
| 3 | Analytical Tafsir 1 | التفسير التحليلي (1) | فسر 3200 (SC prints "2") |
| 3 | Usul at-Tafsir | أصول التفسير | فسر 3203 |
| 3 | Analytical Hadith | حديث تحليلي | سنة 3030 |
| 4 | The Seven Qira'at 4 | القراءات السبع (4) | قرأ 3206 |
| 4 | Tawhid 4 | توحيد (4) | عقد 3005 |
| 4 | Counting the Verses ('Add al-Ay) | عد الآي | قرأ 3305 |
| 4 | Usul al-Fiqh | أصول الفقه | أصل 3006 |
| 4 | Nahw 2 | النحو (2) | لغة 3008 |
| 4 | Analytical Tafsir 2 | التفسير التحليلي (2) | فسر 3202 |
| 4 | Methods of the Mufassirun | مناهج المفسرين | فسر 3205 |
| 5 | The Seven Qira'at 5 | القراءات السبع (5) | قرأ 3307 |
| 5 | Rasm al-Mushaf (the Mushaf's script) 1 | رسم المصحف (1) | قرأ 3303 |
| 5 | Tawjih al-Qira'at (explaining the readings) | توجيه القراءات | قرأ 3306 |
| 5 | Rules of Tafsir | قواعد التفسير | فسر 3302 |
| 5 | Nahw 3 | النحو (3) | لغة 3009 |
| 5 | Analytical Tafsir 3 | التفسير التحليلي (3) | فسر 3204 |
| 5 | Principles and Methods of Da'wah | أصول الدعوة وطرقها | دعوة 3002 |
| 5 | History of the Kingdom | تاريخ المملكة | ترخ 3008 |
| 6 | The Seven Qira'at 6 | القراءات السبع (6) | قرأ 3308 |
| 6 | Rasm al-Mushaf 2 | رسم المصحف (2) | قرأ 3304 |
| 6 | Modern Technology in Qur'anic Studies | التقنيات الحديثة في الدراسات القرآنية | فسر 3013 |
| 6 | Hadith of Rulings (Worship) | أحاديث الأحكام (عبادات) | سنة 3041 |
| 6 | Religions | الأديان | دين 3007 |
| 6 | Analytical Tafsir 4 | التفسير التحليلي (4) | فسر 3300 |
| 6 | Balaghah (rhetoric) | البلاغة | أدب 3006 |
| 6 | Fara'id (inheritance) | الفرائض | فقه 3004 |
| 6 | Research Methods | مناهج البحث | ترب 3004 |
| 7 | The Three Qira'at 1 | القراءات الثلاث (1) | قرأ 3400 |
| 7 | Contemporary Ideologies and Movements | المذاهب والتيارات المعاصرة | دين 3009 |
| 7 | Recitation Performance Skills | مهارات أدائية | قرأ 3015 |
| 7 | Dabt al-Mushaf (marking the Mushaf) | ضبط المصحف | قرأ 3403 |
| 7 | Sarf (morphology) | الصرف | لغة 3012 |
| 7 | Analytical Tafsir 5 | التفسير التحليلي (5) | فسر 3303 |
| 7 | Academic Research in Qur'anic Studies | البحث العلمي في الدراسات القرآنية | فسر 3404 |
| 7 | Co-op Training (Tafsir) | تدريب تعاوني (فسر) | فسر 3406 |
| 7 | Sects (Firaq) | الفرق | فرق 3005 |
| 8 | The Three Qira'at 2 | القراءات الثلاث (2) | قرأ 3404 |
| 8 | Thematic Tafsir | التفسير الموضوعي | فسر 3401 |
| 8 | The Inimitability of the Qur'an (I'jaz) | إعجاز القرآن | فسر 3403 |
| 8 | Takhrij | التخريج | سند 3013 |
| 8 | Tafsir Skills | مهارات تفسيرية | فسر 3014 |
| 8 | Defending the Qur'an | الانتصار للقرآن | فسر 3405 |
| 8 | Qur'anic Rhetoric | البلاغة القرآنية | فسر 3400 |
| 8 | Co-op Training (Qira'at) | تدريب تعاوني (قرأ) | قرأ 3415 |
| (8, SC only) | Applications of Artificial Intelligence | تطبيقات الذكاء الاصطناعي | عال 3054 |

Total: 65 courses in the official plan (66 if the student compilation's AI course is right). Hours: not stated.

"Recitation Performance Skills" is my reading of مهارات أدائية. The course description would confirm it.

### 2.3 College of Noble Hadith and Islamic Studies (official plan) (new guide: `what-you-study-by-level`)

**The 1448 Hadith plan has 73 courses: 9, 8, 8, 10, 9, 9, 10 and 10 in Levels 1 to 8.**
H p.1. Status: NEW

**Hadith students take Qur'an 1 to 8, one per level. Hadith courses build up level by level: Introduction to Prophetic Hadith and History of the Sunnah (Level 1), Introduction to Mustalah (Level 2), Mustalah 1 to 5 (Levels 3 to 7), Narrators of Hadith 1 and 2 (Levels 3 and 4), al-Jarh wat-Ta'dil 1 and 2 (Levels 5 and 6), Takhrij 1 and 2 (Levels 6 and 7), Books of the Sunnah 1 to 5 (Levels 4 to 8), Principles of Studying Isnads (Level 8), and two research seminars (Level 7 Fiqh as-Sunnah, Level 8 Hadith Sciences).**
H p.1. Status: NEW

**Changed for 1448: the 1448 plan is plan 108 (1446) plus one course, Applications of Artificial Intelligence, in Level 4. Total: 73 courses against 72.**
H p.1; G p.9 to 12. Status: NEW

**Changed between 1445 (plan 106) and 1446 (plan 108): in Level 1, University Skills (مهارات جامعية) and Study of Saudi Law (دراسة الأنظمة) were dropped and History of the Sunnah moved in from Level 3. In Level 2, Innovation (الابتكار) was dropped and Analytical Hadith 1 moved in from Level 3. Analytical Hadith 2 to 6 each moved one level earlier (now Levels 3 to 7). Co-op Training (التدريب) was added in Level 8. Plan 106 had 74 courses, plan 108 has 72.**
G p.4 to 7, p.9 to 12. Status: NEW

**The student compilation's Hadith table matches the official one, except that it leaves out al-Jarh wat-Ta'dil 1 in Level 5.**
SC p.4 to 5; H p.1. Status: NEW

Table: Hadith college, 1448. Credit hours: not stated in any source. Codes are from the student compilation (SC p.4 to 5).

| Level | Course (English) | Arabic name | Code (SC) |
|---|---|---|---|
| 1 | Qur'an 1 | القرآن الكريم (1) | قرأ 3001 |
| 1 | Tawhid 1 | توحيد (1) | عقد 3001 |
| 1 | Fiqh 1 | الفقه (1) | فقه 3101 |
| 1 | History of the Sunnah | تاريخ السنة النبوية | سنة 3200 |
| 1 | Language Skills | المهارات اللغوية | أدب 3004 |
| 1 | The Prophet's Sirah | السيرة النبوية | ترخ 3001 |
| 1 | Introduction to Prophetic Hadith | المدخل إلى الحديث النبوي | سنة 3012 |
| 1 | Introduction to the Study of Fiqh | المدخل لدراسة الفقه | فقه 3100 |
| 1 | Tajwid | التجويد | قرأ 3013 |
| 2 | Qur'an 2 | القرآن الكريم (2) | قرأ 3002 |
| 2 | Tawhid 2 | توحيد (2) | عقد 3002 |
| 2 | Fiqh 2 | الفقه (2) | فقه 3102 |
| 2 | Nahw 1 | النحو (1) | لغة 3007 |
| 2 | Analytical Hadith 1 | حديث تحليلي (1) | سنة 3201 |
| 2 | Principles and Methods of Da'wah | أصول الدعوة وطرقها | دعو 3002 |
| 2 | Introduction to Mustalah al-Hadith | المقدمة في مصطلح الحديث | سند 3004 |
| 2 | Introduction to Tafsir and the Qur'anic Sciences | مدخل إلى تفسير القرآن وعلومه | فسر 3010 |
| 3 | Qur'an 3 | القرآن الكريم (3) | قرأ 3003 |
| 3 | Tawhid 3 | توحيد (3) | عقد 3004 |
| 3 | Narrators of Hadith 1 | رواة الحديث (1) | سند 3220 |
| 3 | Nahw 2 | النحو (2) | لغة 3008 |
| 3 | Analytical Hadith 2 | حديث تحليلي (2) | سنة 3202 |
| 3 | Usul al-Fiqh 1 | أصول الفقه (1) | أصل 3000 |
| 3 | Mustalah al-Hadith 1 | مصطلح الحديث (1) | سند 3250 |
| 3 | History of the Kingdom | تاريخ المملكة | ترخ 3008 |
| 4 | Qur'an 4 | القرآن الكريم (4) | قرأ 3004 |
| 4 | Islamic Values | قيم إسلامية | ثقف 3001 |
| 4 | Narrators of Hadith 2 | رواة الحديث (2) | سند 3261 |
| 4 | How the Muhaddithun Compiled Their Books | مناهج المحدثين في التصنيف | سنة 3210 |
| 4 | Analytical Hadith 3 | حديث تحليلي (3) | سنة 3203 |
| 4 | Usul al-Fiqh 2 | أصول الفقه (2) | أصل 3001 |
| 4 | Mustalah al-Hadith 2 | مصطلح الحديث (2) | سند 3251 |
| 4 | Tafsir 1 | التفسير (1) | فسر 3015 |
| 4 | Books of the Sunnah 1 | كتب سنة (1) | سنة 3221 |
| 4 | Applications of Artificial Intelligence (new in 1448) | تطبيقات الذكاء الاصطناعي | عال 3054 |
| 5 | Qur'an 5 | القرآن الكريم (5) | قرأ 3005 |
| 5 | Tawhid 4 | توحيد (4) | عقد 3005 |
| 5 | Al-Jarh wat-Ta'dil (narrator criticism) 1 | الجرح والتعديل (1) | not in SC |
| 5 | Nahw 3 | النحو (3) | لغة 3009 |
| 5 | Analytical Hadith 4 | حديث تحليلي (4) | سنة 3304 |
| 5 | The Standing of the Sunnah | مكانة السنة النبوية | سنة 3320 |
| 5 | Mustalah al-Hadith 3 | مصطلح الحديث (3) | سند 3270 |
| 5 | Legal Maxims | القواعد الفقهية | أصل 3052 |
| 5 | Books of the Sunnah 2 | كتب سنة (2) | سنة 3223 |
| 6 | Qur'an 6 | القرآن الكريم (6) | قرأ 3006 |
| 6 | Takhrij al-Hadith 1 | تخريج الحديث (1) | سند 3360 |
| 6 | Al-Jarh wat-Ta'dil 2 | الجرح والتعديل (2) | سند 3271 |
| 6 | Research Methods | مناهج البحث | ترب 3004 |
| 6 | Analytical Hadith 5 | حديث تحليلي (5) | سنة 3305 |
| 6 | Contemporary Ideologies and Movements | المذاهب والتيارات المعاصرة | دين 3009 |
| 6 | Mustalah al-Hadith 4 | مصطلح الحديث (4) | سند 3351 |
| 6 | Tafsir 2 | التفسير (2) | فسر 3016 |
| 6 | Books of the Sunnah 3 | كتب سنة (3) | سنة 3323 |
| 7 | Qur'an 7 | القرآن الكريم (7) | قرأ 3007 |
| 7 | Takhrij al-Hadith 2 | تخريج الحديث (2) | سند 3361 |
| 7 | Thematic Hadith | الحديث الموضوعي | سنة 3310 |
| 7 | Sects (Firaq) | الفرق | فرق 3005 |
| 7 | Analytical Hadith 6 | حديث تحليلي (6) | سنة 3306 |
| 7 | Religions | الأديان | دين 3007 |
| 7 | Mustalah al-Hadith 5 | مصطلح الحديث (5) | سند 3352 |
| 7 | Tafsir 3 | التفسير (3) | فسر 3017 |
| 7 | Books of the Sunnah 4 | كتب سنة (4) | سنة 3324 |
| 7 | Research Seminar: Fiqh as-Sunnah | قاعة بحث فقه السنة | سنة 3430 |
| 8 | Qur'an 8 | القرآن الكريم (8) | قرأ 3008 |
| 8 | Principles of Studying Isnads | أصول دراسة الأسانيد | سند 3460 |
| 8 | Technology in the Service of the Sunnah | التقانة في خدمة السنة النبوية | سند 3407 |
| 8 | Research Seminar: Hadith Sciences | قاعة بحث علوم الحديث | سند 3480 |
| 8 | Signs of Prophethood and the Prophet's Character (Dala'il and Shama'il) | الدلائل والشمائل النبوية | سنة 3410 |
| 8 | Co-op Training | التدريب التعاوني | سنة 3420 |
| 8 | Balaghah | البلاغة | أدب 3006 |
| 8 | Tafsir 4 | التفسير (4) | فسر 3018 |
| 8 | Books of the Sunnah 5 | كتب سنة (5) | سنة 3425 |
| 8 | Fara'id | الفرائض | فقه 3004 |

Total: 73 courses. Hours: not stated.

Table: how the Hadith plan changed (G p.4 to 7 for plan 106, p.9 to 12 for plan 108; H p.1 for 1448)

| Course | Plan 106 (1445) | Plan 108 (1446) | 1448 |
|---|---|---|---|
| University Skills (مهارات جامعية) | Level 1 | dropped | dropped |
| Study of Saudi Law (دراسة الأنظمة) | Level 1 | dropped | dropped |
| Innovation (الابتكار) | Level 2 | dropped | dropped |
| History of the Sunnah (تاريخ السنة النبوية) | Level 3 | Level 1 | Level 1 |
| Analytical Hadith 1 to 6 (حديث تحليلي) | Levels 3 to 8 | Levels 2 to 7 | Levels 2 to 7 |
| Co-op Training (التدريب التعاوني) | not in plan | Level 8 | Level 8 |
| Applications of AI (تطبيقات الذكاء الاصطناعي) | not in plan | not in plan | Level 4 |
| Courses in the plan | 74 | 72 | 73 |

### 2.4 College of Aqidah and Da'wah (student compilation) (new guide: `what-you-study-by-level`; library: `/library/dawah`)

**The 1448 plan of the College of Aqidah and Da'wah (كلية العقيدة والدعوة) has 78 courses: 10 in every level except Level 2 (8). Tawhid 1 to 8 runs one per level, and Qur'an 1 to 8 one per level. Sects 1 to 4 fall in Levels 3 to 6, Religions 1 to 3 and Contemporary Ideologies 1 to 3 in Levels 5 to 7, and Principles of Da'wah 1 to 4 in Levels 3 to 6. Debate and Logic 1 and 2 come in Levels 7 and 8. This comes from the student compilation.**
SC p.6 to 7. Status: NEW

Table: Aqidah and Da'wah, 1448 (student compilation, SC p.6 to 7). Credit hours: not stated.

| Level | Course (English) | Arabic name | Code (SC) |
|---|---|---|---|
| 1 | Language Skills | المهارات اللغوية | أدب 3004 |
| 1 | University Skills | مهارات جامعية | ترب 3003 |
| 1 | The Prophet's Sirah | السيرة النبوية | ترخ 3001 |
| 1 | Introduction to Prophetic Hadith | المدخل إلى الحديث النبوي | سنة 3012 |
| 1 | Tawhid 1 | توحيد 1 | عقد 3001 |
| 1 | Introduction to the Study of Fiqh | المدخل لدراسة الفقه | فقه 3100 |
| 1 | Fiqh 1 | الفقه 1 | فقه 3101 |
| 1 | Qur'an 1 | القرآن الكريم 1 | قرأ 3001 |
| 1 | Tajwid | التجويد | قرأ 3013 |
| 1 | Introduction to the Study of Saudi Law | المدخل إلى دراسة الأنظمة | نظم 3001 |
| 2 | Entrepreneurship and Innovation | ريادة الأعمال والابتكار | ترب 3001 |
| 2 | Principles and Methods of Da'wah | أصول الدعوة وطرقها | دعو 3002 |
| 2 | Introduction to Mustalah al-Hadith | المقدمة في مصطلح الحديث | سند 3003 |
| 2 | Tawhid 2 | توحيد 2 | عقد 3002 |
| 2 | Introduction to Tafsir and the Qur'anic Sciences | مدخل إلى تفسير القرآن وعلومه | فسر 3010 |
| 2 | Fiqh 2 | الفقه 2 | فقه 3102 |
| 2 | Qur'an 2 | القرآن الكريم 2 | قرأ 3002 |
| 2 | Nahw 1 | النحو 1 | لغة 3007 |
| 3 | Principles of Da'wah 1 | أصول الدعوة 1 | دعو 3223 |
| 3 | History of Da'wah 1 | تاريخ الدعوة 1 | دعو 3245 |
| 3 | Modern Technology in Da'wah | تطبيقات التقنية الحديثة في الدعوة | دعو 3345 |
| 3 | Tawhid 3 | توحيد 3 | عقد 3201 |
| 3 | Sects 1 | الفرق 1 | فرق 3201 |
| 3 | Research Methods | مناهج البحث | ترب 3004 |
| 3 | Hadith of Rulings (Worship) | أحاديث الأحكام (عبادات) | سنة 3041 |
| 3 | Tafsir 1 | التفسير 1 | فسر 3015 |
| 3 | Qur'an 3 | القرآن الكريم 3 | قرأ 3003 |
| 3 | Nahw 2 | النحو 2 | لغة 3008 |
| 4 | History of Da'wah 2 | تاريخ الدعوة 2 | دعو 3201 |
| 4 | Hisbah | الحسبة | دعو 3267 |
| 4 | Principles of Da'wah 2 | أصول الدعوة 2 | دعو 3289 |
| 4 | Tawhid 4 | توحيد 4 | عقد 3202 |
| 4 | Sects 2 | الفرق 2 | فرق 3331 |
| 4 | Takhrij | التخريج | سند 3013 |
| 4 | Hadith of Rulings (Transactions) | أحاديث الأحكام (معاملات) | سنة 3042 |
| 4 | Tafsir 2 | التفسير 2 | فسر 3016 |
| 4 | Qur'an 4 | القرآن الكريم 4 | قرأ 3004 |
| 4 | Nahw 3 | النحو 3 | لغة 3009 |
| 5 | Da'wah Texts in the Qur'an and Sunnah | نصوص الدعوة في القرآن والسنة | دعو 3301 |
| 5 | Principles of Da'wah 3 | أصول الدعوة 3 | دعو 3532 |
| 5 | Religions 1 | الأديان 1 | دين 3301 |
| 5 | Contemporary Ideologies and Movements 1 | المذاهب والتيارات المعاصرة 1 | دين 3403 |
| 5 | Tawhid 5 | توحيد 5 | عقد 3203 |
| 5 | Sects 3 | الفرق 3 | فرق 3302 |
| 5 | Islamic Values | قيم إسلامية | ثقف 3001 |
| 5 | Analytical Hadith | حديث تحليلي | سنة 3030 |
| 5 | Tafsir 3 | التفسير 3 | فسر 3017 |
| 5 | Qur'an 5 | القرآن الكريم 5 | قرأ 3005 |
| 6 | Principles of Da'wah 4 | أصول الدعوة 4 | دعو 3367 |
| 6 | Fiqh of Da'wah 1 | فقه الدعوة 1 | دعو 3645 |
| 6 | Religions 2 | الأديان 2 | دين 3302 |
| 6 | Contemporary Ideologies and Movements 2 | المذاهب والتيارات المعاصرة 2 | دين 3404 |
| 6 | Tawhid 6 | توحيد 6 | عقد 3301 |
| 6 | Sects 4 | الفرق 4 | فرق 3401 |
| 6 | Usul al-Fiqh 1 | أصول الفقه 1 | أصل 3000 |
| 6 | History of the Kingdom | تاريخ المملكة | ترخ 3008 |
| 6 | Thematic Tafsir | التفسير الموضوعي | فسر 3019 |
| 6 | Qur'an 6 | القرآن الكريم 6 | قرأ 3006 |
| 7 | Da'wah Training | التدريب الدعوي | دعو 3323 |
| 7 | Fiqh of Da'wah 2 | فقه الدعوة 2 | دعو 3389 |
| 7 | Academic Research in Da'wah | البحث العلمي في الدعوة | دعو 3401 |
| 7 | Religions 3 | الأديان 3 | دين 3401 |
| 7 | Contemporary Ideologies and Movements 3 | المذاهب والتيارات المعاصرة 3 | دين 3405 |
| 7 | Tawhid 7 | توحيد 7 | عقد 3302 |
| 7 | Debate and Logic 1 | الجدل والمنطق 1 | عقد 3404 |
| 7 | Usul al-Fiqh 2 | أصول الفقه 2 | أصل 3001 |
| 7 | Fara'id | الفرائض | printed "فرق 3004" (فقه 3004 elsewhere) |
| 7 | Qur'an 7 | القرآن الكريم 7 | قرأ 3007 |
| 8 | Orientalist Studies | دراسات استشراقية | ثقف 3403 |
| 8 | Means and Styles of Da'wah | وسائل الدعوة وأساليبها | دعو 3423 |
| 8 | Economics of Da'wah | اقتصاديات الدعوة | دعو 3823 |
| 8 | Tawhid 8 | توحيد 8 | عقد 3403 |
| 8 | Debate and Logic 2 | الجدل والمنطق 2 | عقد 3405 |
| 8 | Academic Research in Aqeedah | البحث العلمي في العقيدة | عقد 3406 |
| 8 | The Creed of the Four Imams | اعتقاد الأئمة الأربعة | عقد 3407 |
| 8 | Contemporary Islamic Groups and Movements | الجماعات والحركات الإسلامية المعاصرة | فرق 3303 |
| 8 | Legal Maxims | القواعد الفقهية | أصل 3052 |
| 8 | Qur'an 8 | القرآن الكريم 8 | قرأ 3008 |

Total: 78 courses. Hours: not stated.

### 2.5 College of Sharia (student compilation) (new guide: `what-you-study-by-level`; library: `/library/sharia`)

**The 1448 Sharia plan has 87 courses: 11, 12, 11, 10, 10, 11, 11 and 11 in Levels 1 to 8. It mixes fiqh and usul with Saudi law from Level 1: the Judicial System, Constitutional Law, Administrative Law and Judiciary, Private and Public International Law, Zakat and Tax Law, Court Procedure, Commercial Courts, Personal Status, Commercial Papers and Bankruptcy, Evidence, Banking, Labour, Legal Drafting, Companies, Enforcement, Legal Practice, Civil Transactions, Criminal Law and Criminal Procedure. This comes from the student compilation.**
SC p.8 to 9. Status: NEW

Table: Sharia, 1448 (student compilation, SC p.8 to 9). Credit hours: not stated.

| Level | Course (English) | Arabic name | Code (SC) |
|---|---|---|---|
| 1 | Introduction to Usul al-Fiqh | المدخل لدراسة أصول الفقه | أصل 3111 |
| 1 | Introduction to Prophetic Hadith | المدخل إلى الحديث النبوي | سنة 3012 |
| 1 | Qur'anic Sciences | علوم القرآن | فسر 3020 |
| 1 | Fiqh of Worship 1 | فقه العبادات 1 | فقه 3200 |
| 1 | The Judicial System | التنظيم القضائي | قضا 3004 |
| 1 | Arabic Writing | التحرير العربي | لغة 3015 |
| 1 | Nahw 1 | النحو 1 | لغة 3021 |
| 1 | Tawhid 1 | توحيد 1 | عقد 3001 |
| 1 | Introduction to the Study of Fiqh | المدخل لدراسة الفقه | فقه 3100 |
| 1 | Qur'an 1 | القرآن الكريم 1 | قرأ 3001 |
| 1 | Introduction to the Study of Saudi Law | المدخل إلى دراسة الأنظمة | نظم 3001 |
| 2 | The Sharia Ruling | الحكم الشرعي | أصل 3113 |
| 2 | Introduction to Mustalah al-Hadith | المقدمة في مصطلح الحديث | سند 3004 |
| 2 | Hadith of Rulings 1 | أحاديث الأحكام 1 | سنة 3051 |
| 2 | Introduction to the Science of Tafsir | المدخل إلى علم التفسير | فسر 3101 |
| 2 | Fiqh of Worship 2 (printed "1") | فقه العبادات | فقه 3111 |
| 2 | Administrative Judiciary | القضاء الإداري | قضا 3431 |
| 2 | Constitutional Law | النظام الدستوري | نظم 3017 |
| 2 | History of the Kingdom | تاريخ المملكة | ترخ 3008 |
| 2 | Islamic Values | قيم إسلامية | ثقف 3001 |
| 2 | Principles and Methods of Da'wah | أصول الدعوة وطرقها | دعو 3056 |
| 2 | Tawhid 2 | توحيد 2 | عقد 3002 |
| 2 | Qur'an 2 | القرآن الكريم 2 | قرأ 3002 |
| 3 | Evidences for Rulings 1 | أدلة الأحكام 1 | أصل 3201 |
| 3 | Research Methods and Sources in the Sharia Sciences | مناهج البحث ومصادر في العلوم الشرعية | أصل 3210 |
| 3 | Hadith of Rulings 2 | أحاديث الأحكام 2 | سنة 3052 |
| 3 | Tafsir of the Legal Verses 1 | تفسير آيات الأحكام 1 | فسر 3003 |
| 3 | Fiqh of Worship 3 | فقه العبادات 3 | فقه 3212 |
| 3 | Nahw 2 | النحو 2 | لغة 3022 |
| 3 | Private International Law | النظام الدولي الخاص | نظم 3020 |
| 3 | Zakat and Tax Law | نظم الزكاة والضرائب | نظم 3029 |
| 3 | Administrative Law | النظام الإداري | نظم 3030 |
| 3 | Tawhid 3 | توحيد 3 | عقد 3003 |
| 3 | Qur'an 3 | القرآن الكريم 3 | قرأ 3003 |
| 4 | Evidences for Rulings 2 | أدلة الأحكام 2 | أصل 3202 |
| 4 | Disputation, Juristic Disagreement and Debate | الجدل والخلاف والمناظرة | أصل 3212 |
| 4 | Hadith of Rulings 3 | أحاديث الأحكام 3 | سنة 3053 |
| 4 | Tafsir of the Legal Verses 2 | تفسير آيات الأحكام 2 | فسر 3004 |
| 4 | Fiqh of Worship 4 | فقه العبادات 4 | فقه 3213 |
| 4 | Law of Sharia Court Procedure | نظام المرافعات الشرعية | قضا 3240 |
| 4 | Nahw 3 | النحو 3 | لغة 3023 |
| 4 | Public International Law | النظام الدولي العام | نظم 3009 |
| 4 | Commercial Courts Law | نظام المحاكم التجارية | نظم 3021 |
| 4 | Qur'an 4 | القرآن الكريم 4 | قرأ 3004 |
| 5 | Evidences for Rulings 3 | أدلة الأحكام 3 | أصل 3300 |
| 5 | Tafsir of the Legal Verses 3 | تفسير آيات الأحكام 3 | فسر 3005 |
| 5 | Fara'id 1 | الفرائض 1 | فقه 3302 |
| 5 | Family Fiqh | فقه الأسرة | فقه 3308 |
| 5 | Personal Status Law | نظام الأحوال الشخصية | فقه 3321 |
| 5 | Commercial Papers and Bankruptcy Law | نظام الأوراق التجارية والإفلاس | نظم 3022 |
| 5 | Contemporary Ideologies and Movements | المذاهب والتيارات المعاصرة | دين 3009 |
| 5 | Religions and Sects | الأديان والفرق | دين 3011 |
| 5 | Takhrij | التخريج | سند 3013 |
| 5 | Qur'an 5 | القرآن الكريم 5 | قرأ 3005 |
| 6 | Linguistic Implications (Dalalat al-Alfaz) 1 | دلالات الألفاظ 1 | أصل 3310 |
| 6 | Fiqh of Food, Oaths and Vows | فقه الأطعمة والأيمان والنذور | فقه 3305 |
| 6 | Fara'id 2 | الفرائض 2 | فقه 3306 |
| 6 | Co-op Training | التدريب التعاوني | فقه 3327 |
| 6 | Fiqh of Transactions 1 | فقه المعاملات 1 | فقه 3401 |
| 6 | Fiqh of Judging | فقه القضاء | قضا 3001 |
| 6 | Law of Evidence | نظام الإثبات | قضا 3331 |
| 6 | Commercial Contracts and Banking | العقود التجارية وعمليات البنوك | نظم 3023 |
| 6 | Labour and Social Insurance Law | نظام العمل والتأمينات الاجتماعية | نظم 3031 |
| 6 | Legal Drafting | الصياغة القانونية | نظم 3032 |
| 6 | Qur'an 6 | القرآن الكريم 6 | قرأ 3006 |
| 7 | Legal Maxims 1 | القواعد الفقهية 1 | أصل 3304 |
| 7 | Deriving Rulings from Principles | تخريج الفروع على الأصول | أصل 3401 |
| 7 | Dalalat al-Alfaz 2 | دلالات الألفاظ 2 | أصل 3430 |
| 7 | Fara'id 3 | الفرائض 3 | فقه 3402 |
| 7 | Fiqh Research Paper | بحث فقه | فقه 3403 |
| 7 | Fiqh of Transactions 2 | فقه المعاملات 2 | فقه 3404 |
| 7 | Co-op Training 2 | التدريب التعاوني 2 | فقه 3417 |
| 7 | Companies Law | نظام الشركات | نظم 3026 |
| 7 | Enforcement Law | نظام التنفيذ | نظم 3028 |
| 7 | Law of Legal Practice | نظام المحاماة | نظم 3033 |
| 7 | Qur'an 7 | القرآن الكريم 7 | قرأ 3007 |
| 8 | Legal Maxims 2 | القواعد الفقهية 2 | أصل 3403 |
| 8 | Ijtihad | الاجتهاد | أصل 3405 |
| 8 | Objectives of the Sharia (Maqasid) | مقاصد الشريعة | أصل 3406 |
| 8 | Usul al-Fiqh Research Paper | بحث أصول الفقه | أصل 3407 |
| 8 | Fiqh of Hudud and Crimes | فقه الحدود والجنايات | فقه 3405 |
| 8 | Fiqh of New Issues (Nawazil) | فقه النوازل | فقه 3408 |
| 8 | Civil Transactions Law | نظام المعاملات المدنية | فقه 3427 |
| 8 | Criminal Law | النظام الجنائي | نظم 3003 |
| 8 | Criminal Procedure Law | نظام الإجراءات الجزائية | نظم 3005 |
| 8 | Applications of Artificial Intelligence | تطبيقات الذكاء الاصطناعي | عال 3054 |
| 8 | Qur'an 8 | القرآن الكريم 8 | قرأ 3008 |

Total: 87 courses. Hours: not stated.

### 2.6 College of Arabic Language and Humanities (student compilation) (new guide: `what-you-study-by-level`; library: `/library/arabic`)

**The 1448 plan of the College of Arabic Language and Humanities (اللغة العربية والدراسات الإنسانية) has 80 courses: 10, 8, 11, 11, 9, 11, 11 and 9 in Levels 1 to 8. Qur'an runs 1 to 4 only (Levels 1 to 4). Nahw runs 1 to 7 and Sarf 1 to 5, with Literary Texts 1 to 6 and a Graduation Project in Level 8. The plan includes media courses: Media Content Creation 1 and 2, Introduction to Communication, New Media and Television Studios. This comes from the student compilation.**
SC p.10 to 11. Status: CONFIRMS applying-to-the-islamic-university: MESH says "Arabic language and Media"

Table: Arabic Language and Humanities, 1448 (student compilation, SC p.10 to 11). Credit hours: not stated.

| Level | Course (English) | Arabic name | Code (SC) |
|---|---|---|---|
| 1 | Language Skills | المهارات اللغوية | أدب 3004 |
| 1 | University Skills | مهارات جامعية | ترب 3003 |
| 1 | The Prophet's Sirah | السيرة النبوية | ترخ 3001 |
| 1 | Introduction to Prophetic Hadith | المدخل إلى الحديث النبوي | سنة 3012 |
| 1 | Tawhid 1 | توحيد 1 | عقد 3001 |
| 1 | Introduction to the Study of Fiqh | المدخل لدراسة الفقه | فقه 3100 |
| 1 | Fiqh 1 | الفقه 1 | فقه 3101 |
| 1 | Qur'an 1 | القرآن الكريم 1 | قرأ 3001 |
| 1 | Tajwid | التجويد | قرأ 3013 |
| 1 | Introduction to the Study of Saudi Law | المدخل إلى دراسة الأنظمة | نظم 3001 |
| 2 | Entrepreneurship and Innovation | ريادة الأعمال والابتكار | ترب 3001 |
| 2 | Principles and Methods of Da'wah | أصول الدعوة وطرقها | دعو 3002 |
| 2 | Introduction to Mustalah al-Hadith | المقدمة في مصطلح الحديث | سند 3004 |
| 2 | Tawhid 2 | توحيد 2 | عقد 3002 |
| 2 | Introduction to Tafsir and the Qur'anic Sciences | مدخل إلى تفسير القرآن وعلومه | فسر 3010 |
| 2 | Fiqh 2 | الفقه 2 | فقه 3102 |
| 2 | Qur'an 2 | القرآن الكريم 2 | قرأ 3002 |
| 2 | Nahw 1 | النحو 1 | لغة 3007 |
| 3 | 'Ilm al-Ma'ani 1 | علم المعاني 1 | أدب 3206 |
| 3 | Pre-Islamic Literature | الأدب الجاهلي | أدب 3211 |
| 3 | Literary Texts 1 | النصوص الأدبية 1 | أدب 3223 |
| 3 | Nahw 2 | النحو 2 | لغة 3210 |
| 3 | The Origins of Nahw | نشأة النحو | لغة 3219 |
| 3 | Sarf 1 | الصرف 1 | لغة 3220 |
| 3 | Language Skills 2 | المهارات اللغوية 2 | لغة 3226 |
| 3 | History of the Kingdom | تاريخ المملكة | ترخ 3008 |
| 3 | Islamic Values | قيم إسلامية | ثقف 3001 |
| 3 | Religions and Sects | الأديان والفرق | عقد 3023 |
| 3 | Qur'an 3 | القرآن الكريم 3 | قرأ 3003 |
| 4 | 'Ilm al-Ma'ani 2 | علم المعاني 2 | أدب 3207 |
| 4 | Literature of Early Islam and the Umayyads | أدب صدر الإسلام وبني أمية | أدب 3231 |
| 4 | Literary Texts 2 | النصوص الأدبية 2 | أدب 3324 |
| 4 | Media Content Creation 1 | صناعة المحتوى الإعلامي 1 | علم 3403 |
| 4 | Phonetics | علم الأصوات | لغة 3203 |
| 4 | Nahw 3 | النحو 3 | لغة 3211 |
| 4 | Sarf 2 | الصرف 2 | لغة 3221 |
| 4 | Language Skills 3 | المهارات اللغوية 3 | لغة 3227 |
| 4 | Semantics | علم الدلالة | لغة 3304 |
| 4 | Lexicography | علم المعاجم | لغة 3305 |
| 4 | Qur'an 4 | القرآن الكريم 4 | قرأ 3004 |
| 5 | 'Ilm al-Ma'ani 3 | علم المعاني 3 | أدب 3208 |
| 5 | Abbasid Literature | الأدب العباسي | أدب 3314 |
| 5 | Literary Texts 3 | النصوص الأدبية 3 | أدب 3325 |
| 5 | Introduction to Communication | مقدمة في الاتصال | علم 3202 |
| 5 | Nahw 4 | النحو 4 | لغة 3212 |
| 5 | Sarf 3 | الصرف 3 | لغة 3222 |
| 5 | Research Methods in Linguistics | مناهج البحث في اللغة | لغة 3301 |
| 5 | Philology (Fiqh al-Lughah) | فقه اللغة | لغة 3306 |
| 5 | Arabic Dialects | اللهجات العربية | لغة 3418 |
| 6 | Research Methods in Literature | مناهج البحث في الأدب | أدب 3301 |
| 6 | 'Ilm al-Bayan 1 | علم البيان 1 | أدب 3303 |
| 6 | Andalusian Literature | الأدب الأندلسي | أدب 3315 |
| 6 | Classical Criticism | النقد القديم | أدب 3319 |
| 6 | Literary Texts 4 | النصوص الأدبية 4 | أدب 3326 |
| 6 | New Media | الإعلام الجديد | علم 3203 |
| 6 | Television Studios | الاستوديوهات التلفزيونية | علم 3405 |
| 6 | Nahw 5 | النحو 5 | لغة 3213 |
| 6 | Prosody and Rhyme | العروض والقافية | لغة 3225 |
| 6 | Sarf 4 | الصرف 4 | لغة 3323 |
| 6 | General Linguistics | علم اللغة العام | لغة 3406 |
| 7 | Literature of the Successive States | أدب الدول المتتابعة | أدب 3316 |
| 7 | Literary Texts 5 | النصوص الأدبية 5 | أدب 3327 |
| 7 | 'Ilm al-Bayan 2 | علم البيان 2 | أدب 3405 |
| 7 | The Inimitability of the Qur'an | إعجاز القرآن | أدب 3410 |
| 7 | Modern Criticism 1 | النقد الحديث 1 | أدب 3421 |
| 7 | Comparative Literature | الأدب المقارن | أدب 3429 |
| 7 | Literary Translation | الترجمة الأدبية | أدب 3432 |
| 7 | Media Content Creation 2 | صناعة المحتوى الإعلامي 2 | علم 3404 |
| 7 | Nahw 6 | النحو 6 | لغة 3314 |
| 7 | Sarf 5 | الصرف 5 | لغة 3324 |
| 7 | Applied Linguistics | علم اللغة التطبيقي | لغة 3408 |
| 8 | Literary Texts 6 | النصوص الأدبية 6 | أدب 3328 |
| 8 | 'Ilm al-Badi' | علم البديع | أدب 3402 |
| 8 | Discourse Analysis | تحليل الخطاب | أدب 3412 |
| 8 | Modern Criticism 2 | النقد الحديث 2 | أدب 3413 |
| 8 | Saudi Literature | الأدب السعودي | أدب 3418 |
| 8 | Nahw 7 | النحو 7 | لغة 3315 |
| 8 | Graduation Project | مشروع التخرج | لغة 3402 |
| 8 | Computational Linguistics | علم اللغة الحاسوبي | لغة 3409 |
| 8 | Sociolinguistics | علم اللغة الاجتماعي | لغة 3410 |

Total: 80 courses. Hours: not stated.

### 2.7 College of Business, Economics department (student compilation) (new guide: `what-you-study-by-level`; no library collection)

**The 1448 Economics plan has 65 courses: 10, 8, 7, 9, 8, 8, 8 and 7 in Levels 1 to 8. Qur'an runs 1 to 4 only (Levels 1, 2, 4 and 5). Level 8 includes Economic Terms in English and Research and Training. This comes from the student compilation.**
SC p.12 to 13. Status: NEW

Table: Business, Economics department, 1448 (student compilation, SC p.12 to 13). Credit hours: not stated. Levels 1 and 2 are the same 18 courses as Aqidah and Da'wah and Arabic (codes as in 2.6).

| Level | Course (English) | Arabic name | Code (SC) |
|---|---|---|---|
| 1 | Language Skills; University Skills; The Prophet's Sirah; Introduction to Prophetic Hadith; Tawhid 1; Introduction to the Study of Fiqh; Fiqh 1; Qur'an 1; Tajwid; Introduction to the Study of Saudi Law | المهارات اللغوية؛ مهارات جامعية؛ السيرة النبوية؛ المدخل إلى الحديث النبوي؛ توحيد 1؛ المدخل لدراسة الفقه؛ الفقه 1؛ القرآن الكريم 1؛ التجويد؛ المدخل إلى دراسة الأنظمة | as 2.6 |
| 2 | Entrepreneurship and Innovation; Principles and Methods of Da'wah; Introduction to Mustalah al-Hadith; Tawhid 2; Introduction to Tafsir and the Qur'anic Sciences; Fiqh 2; Qur'an 2; Nahw 1 | ريادة الأعمال والابتكار؛ أصول الدعوة وطرقها؛ المقدمة في مصطلح الحديث؛ توحيد 2؛ مدخل إلى تفسير القرآن وعلومه؛ الفقه 2؛ القرآن الكريم 2؛ النحو 1 | as 2.6 |
| 3 | Usul al-Fiqh | أصول الفقه | أصل 3215 |
| 3 | Principles of Microeconomics | مبادئ الاقتصاد الجزئي | قصد 3201 |
| 3 | Mathematics for Economists | الرياضيات للاقتصاديين | قصد 3202 |
| 3 | Foundations of Islamic Economics | أصول الاقتصاد الإسلامي | قصد 3203 |
| 3 | Fiqh of Zakat and Waqf | فقه الزكاة والوقف | قصد 3207 |
| 3 | Islamic Values | قيم إسلامية | ثقف 3002 |
| 3 | Nahw 2 | النحو 2 | لغة 3008 |
| 4 | Hadith of Rulings (Transactions) | أحاديث الأحكام (معاملات) | سنة 3042 |
| 4 | Fiqh of Transactions | فقه المعاملات | فقه 3216 |
| 4 | Microeconomic Analysis | التحليل الاقتصادي الجزئي | قصد 3204 |
| 4 | Principles of Macroeconomics | مبادئ الاقتصاد الكلي | قصد 3205 |
| 4 | Principles of Statistics | مبادئ الإحصاء | قصد 3206 |
| 4 | Principles of Business Administration | مبادئ إدارة الأعمال | قصد 3301 |
| 4 | History of the Kingdom | تاريخ المملكة | ترخ 3008 |
| 4 | Professional Ethics | أخلاقيات المهنة | ثقف 3005 |
| 4 | Qur'an 3 | القرآن الكريم 3 | قرأ 3003 |
| 5 | Macroeconomic Analysis | التحليل الاقتصادي الكلي | قصد 3208 |
| 5 | Money and Banking | النقود والبنوك | قصد 3209 |
| 5 | Public Finance | المالية العامة | قصد 3210 |
| 5 | Principles of Finance and Investment | مبادئ التمويل والاستثمار | قصد 3302 |
| 5 | Principles of Financial Accounting | مبادئ المحاسبة المالية | قصد 3303 |
| 5 | History of Economic Thought | تطور الفكر الاقتصادي | قصد 3311 |
| 5 | Resource and Environmental Economics | اقتصاديات الموارد والبيئة | قصد 3418 |
| 5 | Qur'an 4 | القرآن الكريم 4 | قرأ 3004 |
| 6 | Legal Maxims | القواعد الفقهية | أصل 3216 |
| 6 | Economics of Zakat and Waqf | اقتصاديات الزكاة والوقف | قصد 3304 |
| 6 | Applied Statistics | الإحصاء التطبيقي | قصد 3306 |
| 6 | Financial Markets | الأسواق المالية | قصد 3307 |
| 6 | Islamic Finance | التمويل الإسلامي | قصد 3308 |
| 6 | Principles of Marketing | مبادئ التسويق | قصد 3412 |
| 6 | Commercial Law | القانون التجاري | نظم 3024 |
| 6 | Balaghah | البلاغة | أدب 3006 |
| 7 | Objectives of the Sharia | مقاصد الشريعة | أصل 3217 |
| 7 | Financial Statement Analysis | تحليل التقارير المالية | قصد 3309 |
| 7 | Risk and Insurance | المخاطر والتأمين | قصد 3400 |
| 7 | Islamic Banking Operations | عمليات المصارف الإسلامية | قصد 3402 |
| 7 | Economic Development and Planning | التنمية والتخطيط الاقتصادي | قصد 3403 |
| 7 | Econometrics | الاقتصاد القياسي | قصد 3406 |
| 7 | Sharia Governance (as-Siyasah ash-Shar'iyyah) | السياسة الشرعية | قضا 3002 |
| 7 | Research Methods | مناهج البحث | ترب 3004 |
| 8 | Contemporary Ideologies and Movements | المذاهب والتيارات المعاصرة | دين 3009 |
| 8 | Foreign Trade | التجارة الخارجية | قصد 3401 |
| 8 | Feasibility Studies and Project Evaluation | دراسة الجدوى وتقييم المشروعات | قصد 3407 |
| 8 | Economic Terms in English | مصطلحات اقتصادية بالإنجليزية | قصد 3408 |
| 8 | The Saudi Economy | الاقتصاد السعودي | قصد 3409 |
| 8 | Research and Training | بحث وتدريب | قصد 3410 |
| 8 | Financial Engineering | الهندسة المالية | قصد 3411 |

Total: 65 courses. Hours: not stated. Two names are printed with typos and are given here corrected: "الاقتصادي الجزئي" in Level 3 and "المصاريف" for المصارف in Level 7.

### 2.8 College of Law and Judicial Studies (student compilation) (new guide: `what-you-study-by-level`; library: `/library/law`)

**The 1448 plan of the College of Law and Judicial Studies (الأنظمة والدراسات القضائية) has 67 places over 8 levels, including three electives (مقرر اختياري) in Levels 6, 7 and 8. Nahw 3 is printed twice in Level 3, so the plan has 66 distinct courses. This plan has no course codes. Qur'an runs 1 to 4 only. This comes from the student compilation.**
SC p.14. Status: NEW

Table: Law and Judicial Studies, 1448 (student compilation, SC p.14). No codes, no credit hours.

| Level | Courses (English) | Arabic names |
|---|---|---|
| 1 | Qur'an 1; Introduction to the Study of Fiqh; Introduction to the Study of Saudi Law; Principles of Economics; Islamic Values; Arabic Writing; Tawhid 1; Nahw 1; The Prophet's Sirah | القرآن الكريم 1؛ المدخل لدراسة الفقه؛ المدخل لدراسة الأنظمة؛ مبادئ علم الاقتصاد؛ قيم إسلامية؛ التحرير العربي؛ التوحيد 1؛ النحو 1؛ السيرة النبوية |
| 2 | Qur'an 2; Usul al-Fiqh 1; Tafsir of the Legal Verses; Fiqh of Worship; Sharia Governance; History of the Kingdom; Criminology and Penology; The Judicial System; Nahw 2 | القرآن الكريم 2؛ أصول الفقه 1؛ تفسير آيات الأحكام؛ فقه العبادات؛ السياسة الشرعية؛ تاريخ المملكة؛ علم الإجرام والعقاب؛ التنظيم القضائي؛ النحو 2 |
| 3 | Qur'an 3; Usul al-Fiqh 2; Commercial Law; Constitutional Law; Fiqh of Transactions; Sources of Obligation; Nahw 3 (printed twice); Tawhid 2 | القرآن الكريم 3؛ أصول الفقه 2؛ النظام التجاري؛ النظام الدستوري؛ فقه المعاملات؛ مصادر الالتزام؛ النحو 3؛ التوحيد 2 |
| 4 | Qur'an 4; Hadith of Rulings; Administrative Law; General Criminal Law; Rules of Obligation; Fiqh of Crimes and Hudud; Means of Proof; Religions and Sects | القرآن الكريم 4؛ أحاديث الأحكام؛ النظام الإداري؛ النظام الجزائي العام؛ أحكام الالتزام؛ فقه الجنايات والحدود؛ وسائل الإثبات؛ الأديان والفرق |
| 5 | Fiqh of Personal Status; Civil Contracts; Administrative Contracts; Companies Law; Sharia Court Procedure; Special Criminal Law; Public Finance; Research Methods | فقه الأحوال الشخصية؛ العقود المدنية؛ العقود الإدارية؛ نظام الشركات؛ المرافعات الشرعية؛ النظام الجنائي الخاص؛ المالية العامة؛ مناهج البحث |
| 6 | Fiqh of Waqf and Wills; Commercial Papers and Bankruptcy; Zakat and Tax Law; Criminal Procedure; Public International Law; Legal Practice and Notarisation; Administrative Judiciary; Elective; Inheritance | فقه الأوقاف والوصايا؛ الأوراق التجارية والإفلاس؛ نظام الزكاة والضرائب؛ الإجراءات الجزائية؛ القانون الدولي العام؛ المحاماة والتوثيق؛ القضاء الإداري؛ مقرر اختياري؛ المواريث |
| 7 | Legal Maxims; Commercial Contracts and Banking; Real Rights; International Humanitarian Law; Private International Law; Research and Training; Elective | القواعد الفقهية؛ العقود التجارية وعمليات البنوك؛ الحقوق العينية؛ القانون الدولي الإنساني؛ القانون الدولي الخاص؛ بحث وتدريب؛ مقرر اختياري |
| 8 | Objectives of the Sharia; Labour and Social Insurance Law; Alternative Dispute Resolution; Intellectual and Commercial Property; Enforcement Law; Principles of Legal Drafting; Discourse Analysis; Elective | مقاصد الشريعة؛ نظام العمل والتأمينات الاجتماعية؛ الوسائل البديلة لفض المنازعات؛ الملكية الفكرية والتجارية؛ نظام التنفيذ؛ أصول الصياغة القانونية؛ تحليل الخطاب؛ مقرر اختياري |

Course counts by level: 9, 9, 8 distinct (9 printed), 8, 8, 9, 7, 8.

### 2.9 Course counts at a glance (new guide: `what-you-study-by-level`)

**Course counts per level for 1448 (no hours in any source).**
Q p.1; H p.1; SC p.6 to 14. Status: NEW

| College | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | Total | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Noble Qur'an | 8 | 8 | 8 | 7 | 8 | 9 | 9 | 8 | 65 | official |
| Noble Hadith | 9 | 8 | 8 | 10 | 9 | 9 | 10 | 10 | 73 | official |
| Aqidah and Da'wah | 10 | 8 | 10 | 10 | 10 | 10 | 10 | 10 | 78 | student compilation |
| Sharia | 11 | 12 | 11 | 10 | 10 | 11 | 11 | 11 | 87 | student compilation |
| Arabic Language and Humanities | 10 | 8 | 11 | 11 | 9 | 11 | 11 | 9 | 80 | student compilation |
| Business (Economics) | 10 | 8 | 7 | 9 | 8 | 8 | 8 | 7 | 65 | student compilation |
| Law and Judicial Studies | 9 | 9 | 8 | 8 | 8 | 9 | 7 | 8 | 66 | student compilation |

### 2.10 The MESH library against the 1448 plans (library: `/library/<college>`; FAQ `muqarrarat`)

**The Hadith library follows plan 106 (1445), not the 1448 plan.** Its Level 1 has المدخل إلى دراسة الأنظمة and مهارات الجامعة, its Level 2 has ريادة الأعمال والابتكار, History of the Sunnah sits in lib L3, and Analytical Hadith 1 to 6 sit in lib L3 to L8. Neither Co-op Training nor Applications of AI has a folder. Every other folder sits at the 1448 level.
G p.4 to 7; H p.1. Status: CONFLICTS library/hadith: MESH says "Hadith texts, mustalah, takhrij and the narrators, level by level."

**The Qur'an library follows an older plan and has no Level 1 folder.** Its Level 2 holds shared first-year courses that are not in the 1448 Qur'an plan (ريادة الأعمال والإبتكار, مدخل إلى تفسير القرآن وعلومه). Most specialist courses sit one or two levels later than in 1448. 19 of the 65 courses in the 1448 plan have no folder.
Q p.1. Status: CONFLICTS muqarrarat: MESH says "has a folder for every college and level"

**The Sharia library follows an older plan.** 31 of the 87 courses in the 1448 Sharia plan (student compilation) have no folder, mostly the Saudi law courses, the two co-op trainings, the two research papers and Applications of AI. The library also has 12 folders for courses that are not in the 1448 plan.
SC p.8 to 9. Status: CONFLICTS library/sharia: MESH says "Fiqh, usul al-fiqh, the evidences and the legal verses and hadith, level by level."

**The Da'wah library matches the 1448 Aqidah and Da'wah plan (student compilation) exactly: all 78 courses, each at the same level.**
SC p.6 to 7. Status: CONFIRMS library/dawah: MESH says "Aqeedah, sects and religions, and da'wah methods, level by level."

**The plans name three colleges differently from the library cards: College of Aqidah and Da'wah (كلية العقيدة والدعوة) vs library "Da'wah and Usul ad-Din / كلية الدعوة وأصول الدين"; Arabic Language and Humanities (اللغة العربية والدراسات الإنسانية) vs library "Arabic Language / كلية اللغة العربية"; Law and Judicial Studies (الأنظمة والدراسات القضائية) vs library "Law / الأنظمة والقانون". MESH's own mashayikh pages already say "College of Aqidah and Da'wah". These names come from the student compilation.**
SC p.6, 10, 14. Status: CONFLICTS library (COLLECTIONS in `src/content/library-books.ts`): MESH says "Da'wah and Usul ad-Din"

**The Arabic library sits at the same levels as the 1448 plan (student compilation), but 26 of its 80 courses have no folder.** The gaps are mostly Literary Texts 1 to 6, the later Sarf and Nahw courses, and the Level 7 and 8 linguistics and media courses. Level 1 also lacks Tawhid 1 and Fiqh 1, and Level 2 lacks Fiqh 2.
SC p.10 to 11. Status: NEW

**The Business college has no library collection, and the Law collection is 23 loose files with no level folders.**
SC p.12 to 14. Status: CONFLICTS muqarrarat: MESH says "has a folder for every college and level"

**Two library subject hints are wrong for 1448 course names, and many get no hint.** `subjectHint` in `library-books.ts` labels فقه اللغة (Philology) and فقه الدعوة (Fiqh of Da'wah) as "Fiqh". It gives nothing for حديث تحليلي, كتب سنة, توحيد 3 (no ال), علم المعاني, علم البيان, علم البديع, رسم المصحف, ضبط المصحف, عد الآي, دلالات الألفاظ, مقاصد الشريعة, الاجتهاد, الحسبة or الجدل والمنطق (checked by running the hint table on 9 November 2026).
Status: NEW (internal)

**Library mapping, Hadith (1448 level against library level). Only the rows that differ are shown; every other 1448 course has a folder of the same name at the same level.**

| 1448 course | 1448 level | Library folder | Library level |
|---|---|---|---|
| تاريخ السنة النبوية | 1 | تاريخ السنة النبوية | 3 |
| حديث تحليلي 1 | 2 | حديث تحليلي 1 | 3 |
| حديث تحليلي 2 | 3 | حديث تحليلي 2 | 4 |
| حديث تحليلي 3 | 4 | حديث تحليلي 3 | 5 |
| حديث تحليلي 4 | 5 | حديث تحليلي 4 | 6 |
| حديث تحليلي 5 | 6 | حديث تحليلي 5 | 7 |
| حديث تحليلي 6 | 7 | حديث تحليلي 6 | 8 |
| تطبيقات الذكاء الاصطناعي | 4 | none | |
| التدريب التعاوني | 8 | none | |
| (not in 1448 Hadith plan) | | المدخل إلى دراسة الأنظمة, مهارات الجامعة | 1 |
| (not in 1448 Hadith plan) | | ريادة الأعمال والابتكار | 2 |
| قاعة بحث فقه السنة | 7 | قاعة البحث فقه السنة (name differs) | 7 |
| توحيد 1, 2 | 1, 2 | التوحيد 1, التوحيد 2 (name differs) | 1, 2 |

**Library mapping, Qur'an (every 1448 course).**

| 1448 course | 1448 level | Library folder | Library level |
|---|---|---|---|
| القراءات السبع 1 | 1 | القراءات السبع 1 | 3 |
| توحيد 1, الفقه 1, التجويد, المدخل إلى الحديث النبوي, السيرة النبوية | 1 | none in Qur'an (same-code folders exist in Hadith L1) | |
| مدخل إلى علم القراءات | 1 | مدخل إلى علم القراءات | 3 |
| المدخل إلى علم التفسير | 1 | none (lib L2 مدخل إلى تفسير القرآن وعلومه is a different course, فسر 3010) | |
| القراءات السبع 2 | 2 | القراءات السبع 2 | 4 |
| توحيد 2 | 2 | توحيد 2 | 2 |
| الفقه 2 | 2 | none | |
| علوم القرآن 1 | 2 | دراسات في علوم القرآن (name differs, match not certain) | 3 |
| النحو 1 | 2 | النحو 1 | 2 |
| مقدمة في مصطلح الحديث | 2 | المقدمة ومصطلح الحديث (name differs) | 2 |
| علم التجويد والأصوات | 2 | علم التجويد والأصوات | 3 |
| القيم الإسلامية | 2 | قيم الإسلامية | 3 |
| القراءات السبع 3 | 3 | القراءات السبع 3 | 5 |
| توحيد 3 | 3 | توحيد 3 | 4 |
| المهارات اللغوية, علوم القرآن 2, أخلاقيات حملة القرآن | 3 | none | |
| التفسير التحليلي 1 | 3 | التفسير التحليلي 1 | 3 |
| أصول التفسير | 3 | أصول التفسير | 4 |
| حديث تحليلي | 3 | حديث التحليلي | 3 |
| القراءات السبع 4 | 4 | القراءات السبع 4 | 6 |
| توحيد 4 | 4 | توحيد 4 | 5 |
| عد الآي, النحو 2, التفسير التحليلي 2, مناهج المفسرين | 4 | same names | 4 |
| أصول الفقه | 4 | أصول الفقه | 5 |
| القراءات السبع 5 | 5 | القراءات السبع 5 | 7 |
| رسم المصحف 1, توجيه القراءات, أصول الدعوة وطرقها | 5 | none | |
| قواعد التفسير, النحو 3, التفسير التحليلي 3 | 5 | same names | 5 |
| تاريخ المملكة | 5 | تاريخ المملكة | 6 |
| القراءات السبع 6, رسم المصحف 2 | 6 | none | |
| التقنيات الحديثة في الدراسات القرآنية, أحاديث الأحكام (عبادات), الأديان, التفسير التحليلي 4, البلاغة | 6 | same names | 6 |
| الفرائض | 6 | الفرائض | 8 |
| مناهج البحث | 6 | مناهج البحث | 4 |
| القراءات الثلاث 1, ضبط المصحف, الصرف, التفسير التحليلي 5 | 7 | same names | 7 |
| المذاهب والتيارات المعاصرة | 7 | المذاهب والتيارات المعاصرة | 8 |
| البحث العلمي في الدراسات القرآنية | 7 | same name | 8 |
| الفرق | 7 | فرق | 6 |
| مهارات أدائية, تدريب تعاوني (فسر) | 7 | none | |
| القراءات الثلاث 2, التفسير الموضوعي, التخريج, الانتصار للقرآن, البلاغة القرآنية | 8 | same names | 8 |
| إعجاز القرآن | 8 | إعجاز القرآن | 7 |
| مهارات تفسيرية, تدريب تعاوني (قرأ) | 8 | none | |
| (not in 1448 Qur'an plan) | | ريادة الأعمال والإبتكار, مدخل إلى تفسير القرآن وعلومه | 2 |

**Library mapping, Sharia (1448 courses with no folder, 31).** المدخل لدراسة أصول الفقه, التنظيم القضائي (L1); المدخل إلى علم التفسير, القضاء الإداري, النظام الدستوري, أصول الدعوة وطرقها (L2); النظام الدولي الخاص, نظم الزكاة والضرائب, النظام الإداري (L3); أحاديث الأحكام 3, نظام المرافعات الشرعية, النظام الدولي العام, نظام المحاكم التجارية (L4); نظام الأحوال الشخصية, نظام الأوراق التجارية والإفلاس (L5); التدريب التعاوني, فقه القضاء, نظام الإثبات, العقود التجارية وعمليات البنوك, نظام العمل والتأمينات الاجتماعية, الصياغة القانونية (L6); بحث فقه, التدريب التعاوني 2, نظام الشركات, نظام التنفيذ, نظام المحاماة (L7); بحث أصول الفقه, نظام المعاملات المدنية, النظام الجنائي, نظام الإجراءات الجزائية, تطبيقات الذكاء الاصطناعي (L8).

**Sharia courses with a folder at a different level.** 1448 level, then library level: المدخل إلى الحديث النبوي 1, L2; النحو 1 1, L2; المدخل إلى دراسة الأنظمة 1, L3 "المدخل إلى علم الأنظمة"; الحكم الشرعي 2, L1; المقدمة في مصطلح الحديث 2, L1 "مصطلح الحديث"; أحاديث الأحكام 1 2, L3 "أحاديث الأحكام (عبادات 1)"; قيم إسلامية 2, L1; أدلة الأحكام 1 3, L2; مناهج البحث ومصادر 3, L2 "مناهج البحث"; أحاديث الأحكام 2 3, L4; تفسير آيات الأحكام 1 3, L2; توحيد 3 3, L4; أدلة الأحكام 2 4, L3; الجدل والخلاف والمناظرة 4, L3 "الخلاف والمناظرة"; أدلة الأحكام 3 5, L4; فقه الأسرة 5, L7; المذاهب والتيارات المعاصرة 5, L7; الأديان والفرق 5, L6; التخريج 5, L6; فقه الأطعمة والأيمان والنذور 6, L8; فقه المعاملات 1 6, L5; القواعد الفقهية 1 7, L5; فقه المعاملات 2 7, L6; القواعد الفقهية 2 8, L7. Library folders not in the 1448 plan: المدخل إلى علم القضاء, مدخل إلى علم الاقتصاد (L3); الأنظمة القضائية السعودية, الدعوى القضائية (L4); أحاديث الأحكام (معاملات), أخلاقية المهنة, أدلة الأحكام 4 (L5); أحاديث الأحكام (جنايات وحدود), النحو 4, طرق الحكمية (L6); الصرف (L7); السياسة الشرعية (L8).

**Library mapping, Arabic (1448 courses with no folder, 26).** توحيد 1, الفقه 1 (L1); الفقه 2 (L2); النصوص الأدبية 1, نشأة النحو, المهارات اللغوية 2 (L3); النصوص الأدبية 2 (L4); النصوص الأدبية 3, الصرف 3, فقه اللغة, اللهجات العربية (L5); النصوص الأدبية 4, الاستوديوهات التلفزيونية, الصرف 4 (L6); النصوص الأدبية 5, النقد الحديث 1, الترجمة الأدبية, صناعة المحتوى الإعلامي 2, النحو 6, علم اللغة التطبيقي (L7); النصوص الأدبية 6, تحليل الخطاب, النقد الحديث 2, مشروع التخرج, علم اللغة الحاسوبي, علم اللغة الاجتماعي (L8). Names that differ: مهارات اللغوية (plan المهارات اللغوية), قيم الإسلامية (plan قيم إسلامية).

**Library mapping, Da'wah.** All 78 match by level. Names that differ: مدخل إلى حديث النبوي (plan المدخل إلى الحديث النبوي), المدخل لدراسة الأنظمة (plan المدخل إلى دراسة الأنظمة), الإعتقاد الأئمة الأربعة (plan اعتقاد الأئمة الأربعة), الجماعات والحركات الآسلامية المعاصرة (plan الإسلامية).

## 3. Conflicts with MESH

1. **`muqarrarat` FAQ.** MESH says the library "has a folder for every college and level". The Qur'an collection has no Level 1, the Business college has no collection, and the Law collection has no levels. **Change:** soften to "a folder for each college, sorted by level where the books allow", and add the 1448 note in section 4.3. Long term, add a Qur'an Level 1 folder (the shared courses can link to the same-code folders in Hadith Level 1).
2. **Library, Hadith collection.** It is sorted by the 1445 plan (no. 106). For 1448 students, History of the Sunnah and Analytical Hadith 1 to 6 sit one level too late (two levels for History of the Sunnah). Three folders hold courses 1448 Hadith students do not take. **Change:** tell students (section 4.3), then re-sort the Drive folders or add a level map in the library page. Add empty-state folders for Co-op Training and Applications of AI only once files exist.
3. **Library, Qur'an collection.** It is sorted by an older plan: no Level 1, shared first-year courses in Level 2, the Seven Qira'at starting in Level 3, and only five parts of the Seven Qira'at. **Change:** same as above; a level map for 1448 is the quickest fix.
4. **Library, Sharia collection.** It is sorted by an older plan, and 31 of 87 courses in the 1448 plan (student compilation) are missing. **Change:** hold until the 1448 Sharia plan is confirmed (section 5), then re-sort.
5. **Library collection names.** "Da'wah and Usul ad-Din" (كلية الدعوة وأصول الدين) should become "Aqidah and Da'wah" (كلية العقيدة والدعوة), matching the plan and MESH's own mashayikh pages. Consider "Arabic Language and Humanities" (كلية اللغة العربية والدراسات الإنسانية) and "Law and Judicial Studies" (كلية الأنظمة والدراسات القضائية) too. These names come from the student compilation, so confirm before renaming (section 5).
6. **Library subject hints (`subjectHint` in `src/content/library-books.ts`).** فقه اللغة and فقه الدعوة show "Fiqh". **Change:** add earlier rules such as `[/فقه اللغة/, "Philology (fiqh al-lughah)"]` and `[/فقه الدعوة/, "Fiqh of da'wah"]` above the general `/فقه/` rule. Also add hints for the unlabelled names listed in 2.10, and widen `/التوحيد/` to `/توحيد/`.

## 4. Ready-to-publish sections

### 4.1 New guide, proposed slug `what-you-study-by-level`, title "What you study in each college, level by level" (Qur'an and Hadith: ready)

```html
<p>Every bachelor's degree at the Islamic University runs over eight levels, one level each semester. Below are the courses for the 1448 year, college by college, with the Arabic name you will see in the Academic System. Use it to plan ahead, to find your books in the <a href="/library">Jamiah library</a>, and to choose your college before you leave the Ma'had.</p>
<h2>College of the Noble Qur'an and Islamic Studies</h2>
<p>You start your specialist subjects in your first semester. The Seven Qira'at run through Levels 1 to 6 and the Three Qira'at through Levels 7 and 8. Tafsir builds from an introduction in Level 1 to five levels of analytical tafsir. There are no Qur'an memorisation courses, because you join with the whole Qur'an memorised. The degree has 65 courses.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1</td><td>The Seven Qira'at 1 (القراءات السبع 1), Tawhid 1 (توحيد 1), Fiqh 1 (الفقه 1), Tajwid (التجويد), Introduction to Prophetic Hadith (المدخل إلى الحديث النبوي), Introduction to the Science of Qira'at (مدخل إلى علم القراءات), Introduction to the Science of Tafsir (المدخل إلى علم التفسير), the Prophet's Sirah (السيرة النبوية)</td></tr>
<tr><td>2</td><td>The Seven Qira'at 2, Tawhid 2, Fiqh 2, Qur'anic Sciences 1 (علوم القرآن 1), Nahw 1 (النحو 1), Introduction to Mustalah al-Hadith (مقدمة في مصطلح الحديث), Tajwid and Phonetics (علم التجويد والأصوات), Islamic Values (القيم الإسلامية)</td></tr>
<tr><td>3</td><td>The Seven Qira'at 3, Tawhid 3, Language Skills (المهارات اللغوية), Qur'anic Sciences 2, Ethics of the Bearers of the Qur'an (أخلاقيات حملة القرآن), Analytical Tafsir 1 (التفسير التحليلي 1), Usul at-Tafsir (أصول التفسير), Analytical Hadith (حديث تحليلي)</td></tr>
<tr><td>4</td><td>The Seven Qira'at 4, Tawhid 4, Counting the Verses (عد الآي), Usul al-Fiqh (أصول الفقه), Nahw 2, Analytical Tafsir 2, Methods of the Mufassirun (مناهج المفسرين)</td></tr>
<tr><td>5</td><td>The Seven Qira'at 5, Rasm al-Mushaf 1 (رسم المصحف 1), Tawjih al-Qira'at (توجيه القراءات), Rules of Tafsir (قواعد التفسير), Nahw 3, Analytical Tafsir 3, Principles and Methods of Da'wah (أصول الدعوة وطرقها), History of the Kingdom (تاريخ المملكة)</td></tr>
<tr><td>6</td><td>The Seven Qira'at 6, Rasm al-Mushaf 2, Modern Technology in Qur'anic Studies (التقنيات الحديثة في الدراسات القرآنية), Hadith of Rulings: Worship (أحاديث الأحكام: عبادات), Religions (الأديان), Analytical Tafsir 4, Balaghah (البلاغة), Fara'id (الفرائض), Research Methods (مناهج البحث)</td></tr>
<tr><td>7</td><td>The Three Qira'at 1 (القراءات الثلاث 1), Contemporary Ideologies and Movements (المذاهب والتيارات المعاصرة), Recitation Performance Skills (مهارات أدائية), Dabt al-Mushaf (ضبط المصحف), Sarf (الصرف), Analytical Tafsir 5, Academic Research in Qur'anic Studies (البحث العلمي في الدراسات القرآنية), Co-op Training in Tafsir (تدريب تعاوني: فسر), Sects (الفرق)</td></tr>
<tr><td>8</td><td>The Three Qira'at 2, Thematic Tafsir (التفسير الموضوعي), the Inimitability of the Qur'an (إعجاز القرآن), Takhrij (التخريج), Tafsir Skills (مهارات تفسيرية), Defending the Qur'an (الانتصار للقرآن), Qur'anic Rhetoric (البلاغة القرآنية), Co-op Training in Qira'at (تدريب تعاوني: قرأ)</td></tr>
</tbody></table>
<h2>College of Noble Hadith and Islamic Studies</h2>
<p>You take a Qur'an course in every level, one to eight. The hadith sciences build step by step: an introduction and the history of the Sunnah in Level 1, analytical hadith from Level 2, mustalah from Level 3, the narrators and al-jarh wat-ta'dil from Levels 3 to 6, and takhrij in Levels 6 and 7. The degree ends with two research seminars and co-op training. It has 73 courses.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1</td><td>Qur'an 1 (القرآن الكريم 1), Tawhid 1 (توحيد 1), Fiqh 1 (الفقه 1), History of the Sunnah (تاريخ السنة النبوية), Language Skills (المهارات اللغوية), the Prophet's Sirah (السيرة النبوية), Introduction to Prophetic Hadith (المدخل إلى الحديث النبوي), Introduction to the Study of Fiqh (المدخل لدراسة الفقه), Tajwid (التجويد)</td></tr>
<tr><td>2</td><td>Qur'an 2, Tawhid 2, Fiqh 2, Nahw 1 (النحو 1), Analytical Hadith 1 (حديث تحليلي 1), Principles and Methods of Da'wah (أصول الدعوة وطرقها), Introduction to Mustalah al-Hadith (المقدمة في مصطلح الحديث), Introduction to Tafsir and the Qur'anic Sciences (مدخل إلى تفسير القرآن وعلومه)</td></tr>
<tr><td>3</td><td>Qur'an 3, Tawhid 3, Narrators of Hadith 1 (رواة الحديث 1), Nahw 2, Analytical Hadith 2, Usul al-Fiqh 1 (أصول الفقه 1), Mustalah al-Hadith 1 (مصطلح الحديث 1), History of the Kingdom (تاريخ المملكة)</td></tr>
<tr><td>4</td><td>Qur'an 4, Islamic Values (قيم إسلامية), Narrators of Hadith 2, How the Muhaddithun Compiled Their Books (مناهج المحدثين في التصنيف), Analytical Hadith 3, Usul al-Fiqh 2, Mustalah al-Hadith 2, Tafsir 1 (التفسير 1), Books of the Sunnah 1 (كتب سنة 1), Applications of Artificial Intelligence (تطبيقات الذكاء الاصطناعي)</td></tr>
<tr><td>5</td><td>Qur'an 5, Tawhid 4, al-Jarh wat-Ta'dil 1 (الجرح والتعديل 1), Nahw 3, Analytical Hadith 4, the Standing of the Sunnah (مكانة السنة النبوية), Mustalah al-Hadith 3, Legal Maxims (القواعد الفقهية), Books of the Sunnah 2</td></tr>
<tr><td>6</td><td>Qur'an 6, Takhrij al-Hadith 1 (تخريج الحديث 1), al-Jarh wat-Ta'dil 2, Research Methods (مناهج البحث), Analytical Hadith 5, Contemporary Ideologies and Movements (المذاهب والتيارات المعاصرة), Mustalah al-Hadith 4, Tafsir 2, Books of the Sunnah 3</td></tr>
<tr><td>7</td><td>Qur'an 7, Takhrij al-Hadith 2, Thematic Hadith (الحديث الموضوعي), Sects (الفرق), Analytical Hadith 6, Religions (الأديان), Mustalah al-Hadith 5, Tafsir 3, Books of the Sunnah 4, Research Seminar in Fiqh as-Sunnah (قاعة بحث فقه السنة)</td></tr>
<tr><td>8</td><td>Qur'an 8, Principles of Studying Isnads (أصول دراسة الأسانيد), Technology in the Service of the Sunnah (التقانة في خدمة السنة النبوية), Research Seminar in Hadith Sciences (قاعة بحث علوم الحديث), Dala'il and Shama'il (الدلائل والشمائل النبوية), Co-op Training (التدريب التعاوني), Balaghah (البلاغة), Tafsir 4, Books of the Sunnah 5, Fara'id (الفرائض)</td></tr>
</tbody></table>
<h3>What changed in the Hadith plan</h3>
<p>The 1448 plan adds Applications of Artificial Intelligence in Level 4. In 1446 the college moved History of the Sunnah to Level 1, started Analytical Hadith one level earlier (Level 2 instead of Level 3), added Co-op Training in Level 8, and dropped University Skills, Study of Saudi Law and Innovation. Students who started on an earlier plan follow the plan they started on. Your registered courses in the Academic System show your own plan.</p>
<blockquote><p>Tip: Not sure which courses are yours? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>
```

Note for the owner: the sentence "Students who started on an earlier plan follow the plan they started on" is NOT in any source. Remove it unless confirmed (section 5, question 3). The rest of 4.1 rests on the two official plans and the official Hadith guide.

### 4.2 Same guide, five more colleges (hold until the owner confirms the student compilation)

```html
<h2>What the first year looks like in Aqidah and Da'wah, Arabic and Business</h2>
<p>These three colleges share the same first two levels. Level 1: Language Skills (المهارات اللغوية), University Skills (مهارات جامعية), the Prophet's Sirah (السيرة النبوية), Introduction to Prophetic Hadith (المدخل إلى الحديث النبوي), Tawhid 1 (توحيد 1), Introduction to the Study of Fiqh (المدخل لدراسة الفقه), Fiqh 1 (الفقه 1), Qur'an 1 (القرآن الكريم 1), Tajwid (التجويد) and Introduction to the Study of Saudi Law (المدخل إلى دراسة الأنظمة). Level 2: Entrepreneurship and Innovation (ريادة الأعمال والابتكار), Principles and Methods of Da'wah (أصول الدعوة وطرقها), Introduction to Mustalah al-Hadith (المقدمة في مصطلح الحديث), Tawhid 2, Introduction to Tafsir and the Qur'anic Sciences (مدخل إلى تفسير القرآن وعلومه), Fiqh 2, Qur'an 2 and Nahw 1 (النحو 1).</p>
<h2>College of Aqidah and Da'wah</h2>
<p>After the shared first year, you take a tawhid course every level up to Tawhid 8, alongside sects, religions, contemporary ideologies and da'wah. The degree has 78 courses.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>3</td><td>Principles of Da'wah 1 (أصول الدعوة 1), History of Da'wah 1 (تاريخ الدعوة 1), Modern Technology in Da'wah (تطبيقات التقنية الحديثة في الدعوة), Tawhid 3, Sects 1 (الفرق 1), Research Methods (مناهج البحث), Hadith of Rulings: Worship (أحاديث الأحكام: عبادات), Tafsir 1 (التفسير 1), Qur'an 3, Nahw 2</td></tr>
<tr><td>4</td><td>History of Da'wah 2, Hisbah (الحسبة), Principles of Da'wah 2, Tawhid 4, Sects 2, Takhrij (التخريج), Hadith of Rulings: Transactions (أحاديث الأحكام: معاملات), Tafsir 2, Qur'an 4, Nahw 3</td></tr>
<tr><td>5</td><td>Da'wah Texts in the Qur'an and Sunnah (نصوص الدعوة في القرآن والسنة), Principles of Da'wah 3, Religions 1 (الأديان 1), Contemporary Ideologies and Movements 1 (المذاهب والتيارات المعاصرة 1), Tawhid 5, Sects 3, Islamic Values (قيم إسلامية), Analytical Hadith (حديث تحليلي), Tafsir 3, Qur'an 5</td></tr>
<tr><td>6</td><td>Principles of Da'wah 4, Fiqh of Da'wah 1 (فقه الدعوة 1), Religions 2, Contemporary Ideologies 2, Tawhid 6, Sects 4, Usul al-Fiqh 1 (أصول الفقه 1), History of the Kingdom (تاريخ المملكة), Thematic Tafsir (التفسير الموضوعي), Qur'an 6</td></tr>
<tr><td>7</td><td>Da'wah Training (التدريب الدعوي), Fiqh of Da'wah 2, Academic Research in Da'wah (البحث العلمي في الدعوة), Religions 3, Contemporary Ideologies 3, Tawhid 7, Debate and Logic 1 (الجدل والمنطق 1), Usul al-Fiqh 2, Fara'id (الفرائض), Qur'an 7</td></tr>
<tr><td>8</td><td>Orientalist Studies (دراسات استشراقية), Means and Styles of Da'wah (وسائل الدعوة وأساليبها), Economics of Da'wah (اقتصاديات الدعوة), Tawhid 8, Debate and Logic 2, Academic Research in Aqeedah (البحث العلمي في العقيدة), the Creed of the Four Imams (اعتقاد الأئمة الأربعة), Contemporary Islamic Groups and Movements (الجماعات والحركات الإسلامية المعاصرة), Legal Maxims (القواعد الفقهية), Qur'an 8</td></tr>
</tbody></table>
<h2>College of Sharia</h2>
<p>You study fiqh, usul al-fiqh and the legal verses and hadith alongside Saudi law from your first semester. The degree has 87 courses.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1</td><td>Introduction to Usul al-Fiqh (المدخل لدراسة أصول الفقه), Introduction to Prophetic Hadith, Qur'anic Sciences (علوم القرآن), Fiqh of Worship 1 (فقه العبادات 1), the Judicial System (التنظيم القضائي), Arabic Writing (التحرير العربي), Nahw 1, Tawhid 1, Introduction to the Study of Fiqh, Qur'an 1, Introduction to the Study of Saudi Law</td></tr>
<tr><td>2</td><td>The Sharia Ruling (الحكم الشرعي), Introduction to Mustalah al-Hadith, Hadith of Rulings 1 (أحاديث الأحكام 1), Introduction to the Science of Tafsir (المدخل إلى علم التفسير), Fiqh of Worship 2, Administrative Judiciary (القضاء الإداري), Constitutional Law (النظام الدستوري), History of the Kingdom, Islamic Values, Principles and Methods of Da'wah, Tawhid 2, Qur'an 2</td></tr>
<tr><td>3</td><td>Evidences for Rulings 1 (أدلة الأحكام 1), Research Methods and Sources in the Sharia Sciences, Hadith of Rulings 2, Tafsir of the Legal Verses 1 (تفسير آيات الأحكام 1), Fiqh of Worship 3, Nahw 2, Private International Law (النظام الدولي الخاص), Zakat and Tax Law (نظم الزكاة والضرائب), Administrative Law (النظام الإداري), Tawhid 3, Qur'an 3</td></tr>
<tr><td>4</td><td>Evidences for Rulings 2, Disputation and Debate (الجدل والخلاف والمناظرة), Hadith of Rulings 3, Tafsir of the Legal Verses 2, Fiqh of Worship 4, Sharia Court Procedure (نظام المرافعات الشرعية), Nahw 3, Public International Law (النظام الدولي العام), Commercial Courts Law (نظام المحاكم التجارية), Qur'an 4</td></tr>
<tr><td>5</td><td>Evidences for Rulings 3, Tafsir of the Legal Verses 3, Fara'id 1 (الفرائض 1), Family Fiqh (فقه الأسرة), Personal Status Law (نظام الأحوال الشخصية), Commercial Papers and Bankruptcy Law (نظام الأوراق التجارية والإفلاس), Contemporary Ideologies and Movements, Religions and Sects (الأديان والفرق), Takhrij, Qur'an 5</td></tr>
<tr><td>6</td><td>Dalalat al-Alfaz 1 (دلالات الألفاظ 1), Fiqh of Food, Oaths and Vows (فقه الأطعمة والأيمان والنذور), Fara'id 2, Co-op Training (التدريب التعاوني), Fiqh of Transactions 1 (فقه المعاملات 1), Fiqh of Judging (فقه القضاء), Law of Evidence (نظام الإثبات), Commercial Contracts and Banking (العقود التجارية وعمليات البنوك), Labour and Social Insurance Law (نظام العمل والتأمينات الاجتماعية), Legal Drafting (الصياغة القانونية), Qur'an 6</td></tr>
<tr><td>7</td><td>Legal Maxims 1 (القواعد الفقهية 1), Takhrij al-Furu' 'ala al-Usul (تخريج الفروع على الأصول), Dalalat al-Alfaz 2, Fara'id 3, Fiqh Research Paper (بحث فقه), Fiqh of Transactions 2, Co-op Training 2, Companies Law (نظام الشركات), Enforcement Law (نظام التنفيذ), Law of Legal Practice (نظام المحاماة), Qur'an 7</td></tr>
<tr><td>8</td><td>Legal Maxims 2, Ijtihad (الاجتهاد), Maqasid ash-Shari'ah (مقاصد الشريعة), Usul al-Fiqh Research Paper (بحث أصول الفقه), Fiqh of Hudud and Crimes (فقه الحدود والجنايات), Fiqh of New Issues (فقه النوازل), Civil Transactions Law (نظام المعاملات المدنية), Criminal Law (النظام الجنائي), Criminal Procedure Law (نظام الإجراءات الجزائية), Applications of Artificial Intelligence (تطبيقات الذكاء الاصطناعي), Qur'an 8</td></tr>
</tbody></table>
<h2>College of Arabic Language and Humanities</h2>
<p>After the shared first year, you study nahw and sarf every level, balaghah in its three branches, literature from the pre-Islamic era to today, linguistics and media. The degree ends with a graduation project and has 80 courses.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>3</td><td>'Ilm al-Ma'ani 1 (علم المعاني 1), Pre-Islamic Literature (الأدب الجاهلي), Literary Texts 1 (النصوص الأدبية 1), Nahw 2, the Origins of Nahw (نشأة النحو), Sarf 1 (الصرف 1), Language Skills 2 (المهارات اللغوية 2), History of the Kingdom, Islamic Values, Religions and Sects (الأديان والفرق), Qur'an 3</td></tr>
<tr><td>4</td><td>'Ilm al-Ma'ani 2, Literature of Early Islam and the Umayyads (أدب صدر الإسلام وبني أمية), Literary Texts 2, Media Content Creation 1 (صناعة المحتوى الإعلامي 1), Phonetics (علم الأصوات), Nahw 3, Sarf 2, Language Skills 3, Semantics (علم الدلالة), Lexicography (علم المعاجم), Qur'an 4</td></tr>
<tr><td>5</td><td>'Ilm al-Ma'ani 3, Abbasid Literature (الأدب العباسي), Literary Texts 3, Introduction to Communication (مقدمة في الاتصال), Nahw 4, Sarf 3, Research Methods in Linguistics (مناهج البحث في اللغة), Philology (فقه اللغة), Arabic Dialects (اللهجات العربية)</td></tr>
<tr><td>6</td><td>Research Methods in Literature (مناهج البحث في الأدب), 'Ilm al-Bayan 1 (علم البيان 1), Andalusian Literature (الأدب الأندلسي), Classical Criticism (النقد القديم), Literary Texts 4, New Media (الإعلام الجديد), Television Studios (الاستوديوهات التلفزيونية), Nahw 5, Prosody and Rhyme (العروض والقافية), Sarf 4, General Linguistics (علم اللغة العام)</td></tr>
<tr><td>7</td><td>Literature of the Successive States (أدب الدول المتتابعة), Literary Texts 5, 'Ilm al-Bayan 2, the Inimitability of the Qur'an (إعجاز القرآن), Modern Criticism 1 (النقد الحديث 1), Comparative Literature (الأدب المقارن), Literary Translation (الترجمة الأدبية), Media Content Creation 2, Nahw 6, Sarf 5, Applied Linguistics (علم اللغة التطبيقي)</td></tr>
<tr><td>8</td><td>Literary Texts 6, 'Ilm al-Badi' (علم البديع), Discourse Analysis (تحليل الخطاب), Modern Criticism 2, Saudi Literature (الأدب السعودي), Nahw 7, Graduation Project (مشروع التخرج), Computational Linguistics (علم اللغة الحاسوبي), Sociolinguistics (علم اللغة الاجتماعي)</td></tr>
</tbody></table>
<h2>College of Business: Economics</h2>
<p>After the shared first year, economics, finance and statistics run alongside fiqh of transactions and zakat. The degree has 65 courses.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>3</td><td>Usul al-Fiqh, Principles of Microeconomics (مبادئ الاقتصاد الجزئي), Mathematics for Economists (الرياضيات للاقتصاديين), Foundations of Islamic Economics (أصول الاقتصاد الإسلامي), Fiqh of Zakat and Waqf (فقه الزكاة والوقف), Islamic Values, Nahw 2</td></tr>
<tr><td>4</td><td>Hadith of Rulings: Transactions, Fiqh of Transactions (فقه المعاملات), Microeconomic Analysis (التحليل الاقتصادي الجزئي), Principles of Macroeconomics (مبادئ الاقتصاد الكلي), Principles of Statistics (مبادئ الإحصاء), Principles of Business Administration (مبادئ إدارة الأعمال), History of the Kingdom, Professional Ethics (أخلاقيات المهنة), Qur'an 3</td></tr>
<tr><td>5</td><td>Macroeconomic Analysis (التحليل الاقتصادي الكلي), Money and Banking (النقود والبنوك), Public Finance (المالية العامة), Principles of Finance and Investment (مبادئ التمويل والاستثمار), Principles of Financial Accounting (مبادئ المحاسبة المالية), History of Economic Thought (تطور الفكر الاقتصادي), Resource and Environmental Economics (اقتصاديات الموارد والبيئة), Qur'an 4</td></tr>
<tr><td>6</td><td>Legal Maxims, Economics of Zakat and Waqf (اقتصاديات الزكاة والوقف), Applied Statistics (الإحصاء التطبيقي), Financial Markets (الأسواق المالية), Islamic Finance (التمويل الإسلامي), Principles of Marketing (مبادئ التسويق), Commercial Law (القانون التجاري), Balaghah</td></tr>
<tr><td>7</td><td>Maqasid ash-Shari'ah, Financial Statement Analysis (تحليل التقارير المالية), Risk and Insurance (المخاطر والتأمين), Islamic Banking Operations (عمليات المصارف الإسلامية), Economic Development and Planning (التنمية والتخطيط الاقتصادي), Econometrics (الاقتصاد القياسي), as-Siyasah ash-Shar'iyyah (السياسة الشرعية), Research Methods</td></tr>
<tr><td>8</td><td>Contemporary Ideologies and Movements, Foreign Trade (التجارة الخارجية), Feasibility Studies and Project Evaluation (دراسة الجدوى وتقييم المشروعات), Economic Terms in English (مصطلحات اقتصادية بالإنجليزية), the Saudi Economy (الاقتصاد السعودي), Research and Training (بحث وتدريب), Financial Engineering (الهندسة المالية)</td></tr>
</tbody></table>
<h2>College of Law and Judicial Studies</h2>
<p>Saudi law, fiqh and usul run together from Level 1, with three electives in the final three levels.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1</td><td>Qur'an 1, Introduction to the Study of Fiqh, Introduction to the Study of Saudi Law, Principles of Economics (مبادئ علم الاقتصاد), Islamic Values, Arabic Writing (التحرير العربي), Tawhid 1, Nahw 1, the Prophet's Sirah</td></tr>
<tr><td>2</td><td>Qur'an 2, Usul al-Fiqh 1, Tafsir of the Legal Verses (تفسير آيات الأحكام), Fiqh of Worship (فقه العبادات), as-Siyasah ash-Shar'iyyah (السياسة الشرعية), History of the Kingdom, Criminology and Penology (علم الإجرام والعقاب), the Judicial System (التنظيم القضائي), Nahw 2</td></tr>
<tr><td>3</td><td>Qur'an 3, Usul al-Fiqh 2, Commercial Law (النظام التجاري), Constitutional Law (النظام الدستوري), Fiqh of Transactions (فقه المعاملات), Sources of Obligation (مصادر الالتزام), Nahw 3, Tawhid 2</td></tr>
<tr><td>4</td><td>Qur'an 4, Hadith of Rulings (أحاديث الأحكام), Administrative Law (النظام الإداري), General Criminal Law (النظام الجزائي العام), Rules of Obligation (أحكام الالتزام), Fiqh of Crimes and Hudud (فقه الجنايات والحدود), Means of Proof (وسائل الإثبات), Religions and Sects (الأديان والفرق)</td></tr>
<tr><td>5</td><td>Fiqh of Personal Status (فقه الأحوال الشخصية), Civil Contracts (العقود المدنية), Administrative Contracts (العقود الإدارية), Companies Law (نظام الشركات), Sharia Court Procedure (المرافعات الشرعية), Special Criminal Law (النظام الجنائي الخاص), Public Finance (المالية العامة), Research Methods</td></tr>
<tr><td>6</td><td>Fiqh of Waqf and Wills (فقه الأوقاف والوصايا), Commercial Papers and Bankruptcy (الأوراق التجارية والإفلاس), Zakat and Tax Law (نظام الزكاة والضرائب), Criminal Procedure (الإجراءات الجزائية), Public International Law (القانون الدولي العام), Legal Practice and Notarisation (المحاماة والتوثيق), Administrative Judiciary (القضاء الإداري), an elective, Inheritance (المواريث)</td></tr>
<tr><td>7</td><td>Legal Maxims (القواعد الفقهية), Commercial Contracts and Banking (العقود التجارية وعمليات البنوك), Real Rights (الحقوق العينية), International Humanitarian Law (القانون الدولي الإنساني), Private International Law (القانون الدولي الخاص), Research and Training (بحث وتدريب), an elective</td></tr>
<tr><td>8</td><td>Maqasid ash-Shari'ah, Labour and Social Insurance Law (نظام العمل والتأمينات الاجتماعية), Alternative Dispute Resolution (الوسائل البديلة لفض المنازعات), Intellectual and Commercial Property (الملكية الفكرية والتجارية), Enforcement Law (نظام التنفيذ), Principles of Legal Drafting (أصول الصياغة القانونية), Discourse Analysis (تحليل الخطاب), an elective</td></tr>
</tbody></table>
```

### 4.3 Update for FAQ `muqarrarat` ("Where are the muqarrarat for my college?")

```html
<p>The <a href="/library#muqarrarat">Jamiah library</a> has a collection for each college, sorted by level.</p>
<p>Some folders follow an older study plan, so a course can sit under a different level from the one you are in. Search the library for the course name as it appears in your timetable, and it will find the folder wherever it sits.</p>
<ul>
<li><strong>Hadith:</strong> History of the Sunnah is a Level 1 course in the 1448 plan and is filed under Level 3. Analytical Hadith 1 to 6 (حديث تحليلي) are Levels 2 to 7 in the 1448 plan and are filed one level later, under Levels 3 to 8.</li>
<li><strong>Qur'an:</strong> the Seven Qira'at 1 to 4 are Levels 1 to 4 in the 1448 plan and are filed two levels later, under Levels 3 to 6. The shared Level 1 courses (Tawhid 1, Fiqh 1, Tajwid, the Sirah, Introduction to Prophetic Hadith) are in the Hadith collection under Level 1.</li>
</ul>
<p>If you've written a takhlees that could help others, send it to us and we'll review it and add it.</p>
```

### 4.4 Addition for guide `graduating-from-mahad`, under "1. Choose your college"

```html
<p>Before you rank your choices, look at what each college teaches across its eight levels in <a href="/guides/what-you-study-by-level">What you study in each college, level by level</a>. The Qur'an college starts the qira'at and tafsir in your first semester and asks for the whole Qur'an memorised. The Hadith college has a Qur'an course every level and builds the hadith sciences step by step from Level 1.</p>
```

### 4.5 Internal note: how the library's subject names should map to the 1448 plan (not for publishing)

- **Key every library folder to a course code, not a folder name.** The 1448 course code (from the student compilation: department prefix plus four digits) is stable across colleges and spellings. With a code per folder, one Tajwid folder (قرأ 3013) can serve Hadith, Qur'an, Da'wah, Arabic and Business, and spelling differences ("التوحيد 1" vs "توحيد (1)", "قيم الإسلامية" vs "قيم إسلامية") stop mattering.
- **Add a 1448 level map per college instead of moving Drive folders.** A small table in code (`{ college, code or name, level1448 }`) lets `/library/hadith` and `/library/quran` show "Level 2 in the 1448 plan" beside a folder filed under Level 3. That leaves the source Drive untouched.
- **Normalise names before matching:** drop a leading "ال", unify أ/إ/ا and ة/ه, strip brackets, and use Western digits. Then "المقدمة ومصطلح الحديث" and "المقدمة في مصطلح الحديث" still need a manual alias, as do "دراسات في علوم القرآن" for علوم القرآن 1, "الخلاف والمناظرة" for الجدل والخلاف والمناظرة, "المدخل إلى علم الأنظمة" for المدخل إلى دراسة الأنظمة, and "مهارات الجامعة" for مهارات جامعية.
- **Do not merge same-name courses with different codes.** Examples: Qur'an and Da'wah "حديث تحليلي" (سنة 3030) is a single course, not Hadith's Analytical Hadith 1 to 6 (سنة 3201 onwards); Sharia's "أصول الدعوة وطرقها" is دعو 3056, not دعو 3002; Arabic's Nahw 2 is لغة 3210, not لغة 3008; Sharia's Tawhid 3 is عقد 3003, Hadith and Qur'an's is عقد 3004 and Da'wah's is عقد 3201.
- **Fix the hints** listed in section 3, item 6.

## 5. Questions for the owner

1. **Credit hours and total hours.** None of the four sources gives them. Each course name in the Hadith guide links to an official course description in a University OneDrive (SharePoint) folder, about 160 links under `iuoffice365-my.sharepoint.com/.../hq4_iu_edu_sa/...`, and those descriptions normally state hours. Should a reader open them (a University login may be needed), or is there an official plan with hours for each college?
2. **Is the student compilation right for 1448?** It matches the official Qur'an and Hadith plans almost exactly, which suggests it copied official tables. But it is not official, so section 4.2 waits on your word. Do you have the official 1448 plans for Aqidah and Da'wah, Sharia, Arabic, Business and Law?
3. **Which plan do continuing students follow?** None of the sources says whether a student who started under plan 106 or 108 switches to the 1448 plan. This decides whether the library should be re-sorted or only annotated, and whether the last sentence of the "What changed" paragraph in 4.1 can stay.
4. **Applications of Artificial Intelligence in the Qur'an college.** The official 1448 Qur'an plan does not list it. The student compilation puts it in Qur'an Level 8 (code عال 3054). Which is right?
5. **College names.** The 1448 plans use "College of Aqidah and Da'wah", "College of Arabic Language and Humanities" and "College of Law and Judicial Studies". MESH's applying guide says "Arabic language and Media", and the library cards say "Da'wah and Usul ad-Din", "Arabic Language" and "Law". Rename them?
6. **Course names in English.** These are my renderings, not official English titles: مهارات أدائية (Recitation Performance Skills), الانتصار للقرآن (Defending the Qur'an), التقانة في خدمة السنة النبوية (Technology in the Service of the Sunnah). Is there an official English course list to align with?
7. **Typos in the student compilation, corrected in this file:** Qur'an L3 "التفسير التحليلي 2" for 1; Sharia L2 "فقه العبادات 1" for 2; Da'wah L7 Fara'id code "فرق 3004" for فقه 3004; Business L7 "المصاريف" for المصارف; Hadith L5 omits al-Jarh wat-Ta'dil 1; Law L3 prints Nahw 3 twice. The Law plan does not name its three electives.
8. **Colleges not covered.** No source here covers Education (the library has an Education collection), Engineering, Computing or Science. Is a 1448 plan wanted for those?
