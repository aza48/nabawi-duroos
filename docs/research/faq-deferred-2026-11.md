# Deferred FAQ drafts, November 2026 (aiakhee)

Not published. These are the FAQ drafts from aiakhee's 9 November 2026 plan that were held back from `aiakhee/faq-fixes-and-new` because the owner's agent "admin" was rewriting the same topics (issue 13). They are kept here so anyone can pick them up once admin's work has landed.

Before reusing any of them:

- **Recheck every fact and line number.** The evidence lines point at the files as they were on commit `5477ebb` (9 November 2026). Admin's research release (PR 76) has since rewritten many guides and FAQs, so line numbers have moved and some facts changed.
- **Check for overlap** with the FAQs and guides admin published, and drop or merge any draft that now repeats one.
- **A2 `mahad-books` and A3 `muqarrarat` are done:** admin fixed both broken library anchors, so they are not included.
- **A8 `how-to-apply-iu`:** admin rewrote this FAQ in PR 76. Compare before using the draft below.
- Put published entries in `src/server/seed/content/faqs-aiakhee-2026-11.ts`, keep the first paragraph to 25 words, and add an EXPIRING row for any dated fact (B11, B12, B13 and the A8 window line).

### A8. `how-to-apply-iu` (medium)

Category `getting-started`. Question: "How do I apply to the Islamic University of Madinah?"

**Problems**

- Missing facts the fact-check asks for: the yearly window and its announcement (docs/research/factcheck-2026-11-09-university.md:120, A11: "The University announces the dates each season ... The 1448 window was 19 April to 21 May 2026") and the second application on Minhati.
- Sends readers to the programme card for "the steps" while the full steps are in the applying guide, which is not linked.
- No warning about paid agents, which the applying guide leads with.

**Current answerHtml**

```html
<p>Through the national Study in Saudi portal (studyinsaudi.sa) when applications open. You can choose up to 25 programmes across several universities and edit your application until the deadline. See <a href="/programs/iu-madinah">Islamic University of Madinah</a> for the steps and a video walkthrough.</p>
```

**Replacement answerHtml (whole field)**

```html
<p>Apply yourself, free, on the national Study in Saudi portal (studyinsaudi.sa) while the yearly window is open.</p><p>The University announces the dates each season. The 1448 window ran from 19 April to 21 May 2026. You can choose up to 25 programmes and edit your application until the deadline, then complete a second application on the University's portal, Minhati. The University has no offices or agents abroad, so never pay anyone to apply for you. Every step is in <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>, with a video walkthrough on <a href="/programs/iu-madinah">Islamic University of Madinah</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:449 "applying is free ... The University has no offices or agents abroad"; src/server/seed/content/guides-research-2026-11.ts:452 "announces the dates each season"; src/server/seed/content/guides-research-2026-11.ts:457 "2026, for the 1448 year | 19 April to 21 May 2026"; src/server/seed/content/guides-research-2026-11.ts:509 "up to 25 programmes"; src/server/seed/content/guides-research-2026-11.ts:510 (Minhati second application).

### B4. `who-can-apply-iu`

- **Category:** `getting-started`
- **Question:** Who can apply to the Islamic University?
- **Tags:** ["apply", "admission", "age limit", "certificate", "scholarship", "study in saudi", "eligibility"]
- **Students ask it:** docs/research/group-chat-2026.md:243, question 29.

```html
<p>Brothers aged 17 to 25 with a secondary school certificate no more than five years old. Full scholarship applicants must live outside Saudi Arabia.</p><ul><li><strong>Age:</strong> at least 17 and no older than 25.</li><li><strong>Certificate:</strong> general secondary or its equivalent, no more than five years old. Scientific colleges need the scientific track.</li><li><strong>Where you live:</strong> outside Saudi Arabia for a full scholarship. Applicants already living in Saudi Arabia apply for a partial scholarship, which covers tuition only.</li><li><strong>Record and health:</strong> good conduct, not already on a Saudi scholarship, and medically fit.</li><li><strong>College of the Holy Qur'an:</strong> the whole Qur'an memorised, confirmed in an oral exam.</li><li><strong>Finished school in Saudi Arabia?</strong> You count as an internal applicant and submit the General Aptitude Test, plus the Achievement Test for the scientific colleges.</li></ul><p>Study in Madinah is for brothers only. Sisters can study with the University online: see <a href="/ask/sisters-study">Where can sisters study?</a> The documents and every step are in <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:462 "Age: at least 17 and no older than 25"; src/server/seed/content/guides-research-2026-11.ts:463 (certificate, five years, scientific track); src/server/seed/content/guides-research-2026-11.ts:464 (full scholarship applicants must be living outside Saudi Arabia); src/server/seed/content/guides-research-2026-11.ts:465 to 466 (record, health); src/server/seed/content/guides-research-2026-11.ts:467 (whole Qur'an, oral exam); src/server/seed/content/guides-research-2026-11.ts:469 (finished school in Saudi Arabia, Qiyas); src/server/seed/content/guides-research-2026-11.ts:470 "Brothers only for study in Madinah. Sisters can study with the University online"; partial scholarship tuition only: src/server/seed/content/guides-research-2026-11.ts:482.
- docs/research/factcheck-2026-11-09-university.md:108 to 114 (A10, 1448 guide, High); docs/research/factcheck-2026-11-09-university.md:235 ("IU is 17 to 25"); docs/research/factcheck-2026-11-09-university.md:304 (B2, partial scholarship, High).

### B5. `iu-application-documents`

- **Category:** `getting-started`
- **Question:** What documents do I need to apply to the Islamic University?
- **Tags:** ["apply", "documents", "tazkiyah", "recommendation", "police clearance", "translation", "ielts"]
- **Students ask it:** docs/research/group-chat-2026.md:243, question 29 ("When do university applications open and what documents?").

```html
<p>Your passport, school certificate and transcript, police clearance, two recommendation letters, a medical report, proof of age and a photo, with certified Arabic translations.</p><ul><li><strong>Passport</strong>, valid well beyond your planned arrival. Use your name exactly as printed in it on every form.</li><li><strong>Secondary school certificate and transcript</strong>, still under five years old when you apply.</li><li><strong>Police clearance</strong> from your country. It can take weeks, so start early.</li><li><strong>Two recommendation letters</strong> (tazkiyah) from recognised organisations, institutions or scholars in your country, or from people the University approves.</li><li><strong>Medical report</strong> showing you are fit to study and free of infectious disease.</li><li><strong>Birth certificate</strong> or another proof of age.</li><li><strong>Photo:</strong> passport style, on a plain white background.</li><li><strong>IELTS or TOEFL</strong> for engineering, computing and science, unless you are exempt.</li><li><strong>Arabic translations</strong> of anything not in Arabic, made by a certified translator.</li><li><strong>For a partial scholarship:</strong> your employer's approval.</li></ul><p>Certificates for Qur'an memorisation, Arabic, mutun or ijazah count for the Islamic colleges, so add them if you have them. Upload clear colour scans, not phone photos. See <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:493 to 505 (applying guide, "Prepare now for the next window": passport, certificate and transcript, police clearance, employer approval, "Two recommendation letters (tazkiyah) from recognised organisations, institutions or scholars in your country, or from people the University approves", medical report, birth certificate, IELTS or TOEFL, photo, Arabic translations, extra certificates, colour scans).
- docs/research/factcheck-2026-11-09-university.md:89 (A7, two recommendation letters, High); docs/research/factcheck-2026-11-09-university.md:109 to 111 (A10, birth certificate, photo, medical report, IELTS or TOEFL, High).

### B6. `initial-and-final-acceptance`

- **Category:** `getting-started`
- **Question:** What is the difference between initial and final acceptance?
- **Tags:** ["acceptance", "initial acceptance", "final acceptance", "minhati", "study in saudi", "offer"]
- **Students ask it:** docs/research/community-2026-11-09.md:39 (applicants confused by Minhati and Study in Saudi statuses, 2 posts).

```html
<p>Initial acceptance means a university has put your name forward. Final acceptance means the Ministry approved it, and only final acceptance leads to a visa.</p><ul><li><strong>Initial acceptance</strong> arrives by email and shows on Study in Saudi as waiting for your confirmation. Accept it within 5 days, or the offer lapses. Accepting cancels your applications to other universities.</li><li><strong>Minhati</strong>, the University's own portal, shows only a preliminary acceptance, which is conditional.</li><li><strong>Final acceptance</strong> appears on Study in Saudi. It is the official record, and the visa steps follow it.</li></ul><p>Do not resign from work, give up your home or book flights on initial acceptance alone. Some people with initial acceptance are moved to a later semester, and some are offered a year of online Arabic first: see <a href="/ask/online-arabic-year-to-madinah">I was offered a year of online Arabic</a>. What each status means is in <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:512 (accept within 5 days, cancels other applications, lapses); src/server/seed/content/guides-research-2026-11.ts:513 "Minhati shows only a preliminary acceptance, which is conditional. Final acceptance appears on Study in Saudi, which is the official record and the only stage that leads to a visa"; src/server/seed/content/guides-research-2026-11.ts:530 (initial acceptance is not final, do not resign, later semester, online Arabic).
- docs/research/factcheck-2026-11-09-university.md:102 (A9: "Minhati shows only a preliminary acceptance, which is conditional. Final acceptance appears only on Study in Saudi", High).

### B7. `educational-visa-fingerprints`

- **Category:** `getting-started`
- **Question:** Do I need to visit a Saudi embassy for my educational visa?
- **Tags:** ["visa", "educational visa", "fingerprints", "saudi visa bio", "embassy", "biometrics"]
- **Students ask it:** docs/research/community-2026-11-09.md:126 B3 and docs/research/community-2026-11-09.md:173 D5 (embassy visit confusion); open question 63 (certified originals) stays open and is not stated.

```html
<p>No, as long as the Saudi Visa Bio app works for you. You give your fingerprints in the app, and the visa arrives by email.</p><p>After final acceptance:</p><ol><li>Fill in the visa application when the portal asks. You must be outside Saudi Arabia when you submit it, or it is rejected.</li><li>Pay the educational visa fee through the link that is sent to you.</li><li>Give your fingerprints in the Ministry of Foreign Affairs' Saudi Visa Bio app. If the app does not work for you, go to an approved visa centre or a Saudi embassy.</li><li>Complete any medical tests you are asked for.</li><li>Receive the visa in your Study in Saudi account and by email, then request your arrival ticket on Minhati, with your name exactly as in your passport.</li></ol><p>See <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:514 to 518 (visa application outside Saudi Arabia; pay the fee through the link; "Give your fingerprints through the Ministry of Foreign Affairs' Saudi Visa Bio app, or at an approved visa centre or Saudi embassy if the app does not work for you"; "If you used the app for fingerprints, you need no embassy visit"; arrival ticket on Minhati).
- docs/research/factcheck-2026-11-09-university.md:95 (A8: fee link, medical tests, fingerprints at an embassy, approved office or MOFA app, visa appears in Study in Saudi, High); docs/research/factcheck-2026-11-09-university.md:97 ("no embassy visit" true only with the app or an approved office).

### B8. `study-in-english-at-iu`

- **Category:** `getting-started`
- **Question:** Can I study at the Islamic University in English?
- **Tags:** ["english", "engineering", "computing", "science", "ielts", "toefl", "language of teaching"]
- **Students ask it:** docs/research/factcheck-2026-11-09-university.md:237 (A21 asks for this line); other-universities guide "Want a professional degree?".

```html
<p>Yes, in engineering, computing and science, which are taught in English. The Islamic and Arabic colleges teach in Arabic.</p><ul><li><strong>Engineering:</strong> chemical, civil, electrical, industrial and mechanical.</li><li><strong>Computing:</strong> computer science, data science and information technology.</li><li><strong>Science:</strong> chemistry, environmental sciences, financial and actuarial mathematics, mathematics and physics.</li></ul><p>These colleges ask for IELTS or TOEFL, unless your earlier study was in English or you come from a country where English is an official or main language, and they need the scientific track in school. Degrees take four or five years. See <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a> and <a href="/guides/other-universities-in-madinah">Other universities in Madinah</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:468 "Engineering, computing and science: these colleges teach in English and ask for IELTS or TOEFL, unless your earlier study was in English or you come from a country where English is an official or main language. The Islamic and Arabic colleges teach in Arabic."; src/server/seed/content/guides-research-2026-11.ts:463 (scientific track); src/server/seed/content/guides-research-2026-11.ts:473 to 478 (programme list, four or five years).
- docs/research/factcheck-2026-11-09-university.md:111 (A10, High); docs/research/factcheck-2026-11-09-university.md:306 (B2 programme list, High); docs/research/factcheck-2026-11-09-university.md:237 (A21).

### B9. `change-college`

- **Category:** `university`
- **Question:** Can I change my college after I am admitted?
- **Tags:** ["college", "transfer", "change major", "kulliyah", "mahad", "placement"]
- **Students ask it:** The calendar shows "internal transfer" windows (key-dates.ts postpone-2), which students read as open to them; A13 says that rule is for students not on external scholarships.

```html
<p>No. Scholarship students are placed in one college and cannot move to another after admission, so choose carefully.</p><ul><li><strong>Applying:</strong> choose your programmes on Study in Saudi with care. The college you are placed in is final.</li><li><strong>Finishing the Ma'had:</strong> near the end of your last Ma'had semester, rank your first, second and third choice of college at <a href="https://alisc.iu.edu.sa/">alisc.iu.edu.sa</a>, before the deadline the Ma'had announces.</li><li><strong>First year:</strong> no transfer to another college is allowed in the first year.</li></ul><p>See <a href="/guides/graduating-from-mahad">Moving from the Ma'had to the Kulliyah</a> and <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:480 "Scholarship students are placed in one college and cannot move to another after admission"; src/server/seed/content/guides-research-2026-11.ts:838 to 840 (alisc.iu.edu.sa, first, second and third choice, deadline, "Scholarship students cannot move to another college once they are placed"); src/server/seed/content/guides-research-2026-11.ts:612 ("In the first year you also cannot ... transfer to another college").
- docs/research/factcheck-2026-11-09-university.md:131 (A13: "scholarship students may not move from one faculty to another after admission, and that placement is final (p.8)", High); docs/research/factcheck-2026-11-09-university.md:176 (A16 first-year rule); docs/research/factcheck-2026-11-09-university.md:251 (A23).

### B10. `stay-after-graduating`

- **Category:** `leaving`
- **Question:** Can I stay in Saudi Arabia after I graduate?
- **Tags:** ["graduation", "after graduating", "final exit", "sponsorship", "postgraduate", "declaration"]
- **Students ask it:** docs/research/group-chat-2026.md:241 question 27 (final exit and what follows, about 4 asks).

```html
<p>Not on the scholarship. Scholarship students agree, when admitted, to go home when they graduate, withdraw or leave their studies.</p><ul><li>The same declaration commits you not to move your sponsorship to anyone other than the University.</li><li>Your final ticket home is issued once the University has confirmed your clearance.</li><li>Want to go on to a master's or PhD? External scholarship students already at the University apply from inside the Kingdom on the University's postgraduate portal, in the yearly window: see <a href="/ask/postgraduate-applications">When do master's and PhD applications open?</a></li></ul><p>The steps before you leave are in <a href="/guides/graduate-procedures">Graduating</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:548 (applying guide, "What you agree to": "not to move your sponsorship to anyone other than the University, and to go home when you graduate, withdraw or leave. You cannot stay on in the Kingdom on the scholarship after your studies end"); src/server/seed/content/guides-research-2026-11.ts:708 (graduate-procedures, same); src/server/seed/content/guides-research-2026-11.ts:433 (final ticket once the University has confirmed clearance); src/server/seed/content/guides-research-2026-11.ts:880 (postgraduate: "external scholarship students already at the University" apply inside the Kingdom).
- docs/research/factcheck-2026-11-09-university.md:131 (A13, 1448 declaration p.10, High); docs/research/factcheck-2026-11-09-university.md:246 (A22).

### B11. `postgraduate-applications`

- **Category:** `university`
- **Question:** When do master's and PhD applications open at the Islamic University?
- **Tags:** ["postgraduate", "masters", "phd", "diploma", "graduate studies", "application", "dirasat ulya"]
- **Students ask it:** docs/research/factcheck-2026-11-09-university.md:444 D19; docs/research/group-chat-2026.md:243 question 29. Add an EXPIRING row: update when the 1449 window is announced.

```html
<p>Once a year, in a window the Deanship of Graduate Studies announces. For 1448, master's and PhD applications ran 16 November to 11 December 2025.</p><ul><li><strong>Where to watch:</strong> the Deanship's X account, <a href="https://x.com/highstudies_iu">@highstudies_iu</a>, and its Telegram channel, <a href="https://t.me/highstudies_iu">t.me/highstudies_iu</a>.</li><li><strong>Higher diplomas</strong> have their own window. For 1448 it was 5 to 11 April 2026.</li><li><strong>Fee:</strong> 300 SAR for every applicant, not refundable, paid by e-invoice on the portal.</li><li><strong>Portals:</strong> applicants inside Saudi Arabia, including external scholarship students already at the University, use <a href="https://postgraduate.iu.edu.sa/">postgraduate.iu.edu.sa</a>. International applicants for an external scholarship use <a href="https://postgraduateminhatee.iu.edu.sa/">postgraduateminhatee.iu.edu.sa</a>.</li></ul><p>Have your documents ready before the window opens. The conditions and documents are in <a href="/guides/postgraduate-admission-1448">Postgraduate admission at the Islamic University</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:874 to 877 (1448 windows: master's and PhD 16 November to 11 December 2025, higher diplomas 5 to 11 April 2026; @highstudies_iu and t.me/highstudies_iu); src/server/seed/content/guides-research-2026-11.ts:880 (portals by applicant type); src/server/seed/content/guides-research-2026-11.ts:887 "Application fee: 300 SAR for every applicant, not refundable, paid by e-invoice".
- docs/research/factcheck-2026-11-09-university.md:256 (A24: fee "without exception", window extended to 11 December 2025, diploma window 5 to 11 April 2026, High).

### B12. `university-holidays-1448`

- **Category:** `university`
- **Question:** When are the University holidays in 1448?
- **Tags:** ["holiday", "break", "calendar", "winter", "eid", "ramadan", "founding day", "1448"]
- **Students ask it:** docs/research/group-chat-2026.md:244 question 30 (which calendar is real, about 6 asks) and question 26 (holiday travel, about 4).

```html
<p>The next break is 15 to 19 December 2026, after the first semester finals. Every 1448 holiday is in the table below.</p><table><thead><tr><th>Holiday</th><th>Dates</th></tr></thead><tbody><tr><td>End of first semester</td><td>Tuesday 15 to Saturday 19 December 2026. The second semester starts on Sunday 20 December.</td></tr><tr><td>Winter holiday</td><td>Friday 8 to Saturday 16 January 2027. Classes resume on Sunday 17 January.</td></tr><tr><td>Founding Day</td><td>Friday 19 to Monday 22 February 2027</td></tr><tr><td>Eid al-Fitr</td><td>Friday 26 February to Saturday 13 March 2027</td></tr><tr><td>Eid al-Adha</td><td>Tuesday 11 to Saturday 22 May 2027</td></tr><tr><td>End of the year</td><td>From Thursday 3 June 2027. The 1449 year starts on Sunday 22 August 2027.</td></tr></tbody></table><p>First semester finals start on Sunday 29 November 2026, and second semester finals on Sunday 25 April 2027. Ramadan begins on Monday 8 February 2027 by the Umm al-Qura calendar. Planning a flight home? Read <a href="/ask/student-ticket-rules">the rules for your University ticket</a> first. The request windows, such as ta'jeel and dropping a course, are in <a href="/guides/university-calendar-1448">The University calendar</a>, and the Academic System is the live record if a date moves.</p>
```

**Evidence**

- docs/research/factcheck-2026-11-09-university.md:201 to 216 (A18, official 1448 poster, High): sem 1 finals 29 Nov 2026; end of semester holiday 15 to 19 Dec 2026; sem 2 start 20 Dec 2026; winter holiday 8 to 16 Jan 2027; Founding Day 19 to 22 Feb 2027; Eid al-Fitr holiday 26 Feb to 13 Mar 2027; sem 2 finals 25 Apr 2027; Eid al-Adha holiday 11 to 22 May 2027; year end holiday from 3 Jun 2027; new year 22 Aug 2027. docs/research/factcheck-2026-11-09-university.md:219 ("the Academic System is the live authority").
- src/content/key-dates.ts:41 to 57 (same rows; winter "Classes resume on Sunday 17 January"; Ramadan start 2027-02-08, 1 Ramadan 1448). Weekdays checked with Python's calendar.

### B13. `drop-or-withdraw-a-course`

- **Category:** `university`
- **Question:** Can I drop a course after the semester starts?
- **Tags:** ["drop", "add", "withdraw", "course withdrawal", "W grade", "hadhf", "idafah", "registration"]
- **Students ask it:** docs/research/group-chat-2026.md:220 question 6 and docs/research/gaps-2026-11.md:12 (exams gap).

```html
<p>Yes, within limits. Add and drop courses in the Drop and Add window, then withdraw with a W grade, which is not a fail.</p><ul><li><strong>Drop and Add:</strong> in the Academic System under Electronic Registration, only during the window. For the second semester of 1448 it runs from 17 to 21 December 2026.</li><li><strong>Course withdrawal:</strong> for the second semester of 1448, from 20 December 2026 to 13 March 2027. The course shows a W.</li><li><strong>Limits:</strong> at most two courses in one semester and six over your whole programme. Never below the minimum load, never in your first year, never in your expected graduation semester, and never from a course you are already barred from.</li></ul><p>To leave a whole semester, use ta'jeel or i'tithaar instead: see <a href="/ask/tajeel-vs-itithaar">What's the difference between ta'jeel and i'tithaar?</a> More in <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-gaps-2026-11.ts:172 to 176 (exams guide: W is not a fail; two a semester, six in total; not below minimum load, first year, graduation semester or when barred; window 20 December 2026 to 13 March 2027).
- docs/research/factcheck-2026-11-09-university.md:206 and :208 (A18: add, drop sem 2 17 to 21 Dec 2026; excuse and course withdrawal 20 Dec 2026 to 13 Mar 2027, High); docs/research/factcheck-2026-11-09-university.md:321 (B4: Drop and Add under Electronic Registration, only in the window, High); src/content/key-dates.ts drop-add-2 and excuse-2 rows.
- Course withdrawal limits: docs/research/gaps-2026-11.md:49 (1445 guide).

### B14. `student-letter-and-transcript`

- **Category:** `university`
- **Question:** How do I get a letter proving I am a student, or a transcript?
- **Tags:** ["student letter", "proof of enrolment", "transcript", "official documents", "ifadah", "academic record"]
- **Students ask it:** University offices guide row "A letter proving you are a student"; commonly needed for banks, embassies and schools (not stated in the answer).

```html
<p>Download both free from the Academic System, under <strong>Personal</strong>, then <strong>Official Documents</strong>. They come stamped.</p><ul><li><strong>Student ID letter:</strong> a stamped letter that you are a student at the University, free and ready at once.</li><li><strong>Academic transcript</strong> (السجل الأكاديمي), with your grades and GPA.</li><li><strong>Graduating?</strong> The same screen has your conduct certificate and graduation certificate. The University stamp on copies for the Ministry of Foreign Affairs is a separate step: see <a href="/guides/graduate-procedures">Graduating</a>.</li></ul><p>Sign in at sso.iu.edu.sa through Nafath or with your University number, password and a code. If nothing downloads, allow pop-ups for the site and try again in Chrome on a computer. Other offices are in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-student-life.ts:44 "a stamped student ID letter is free and instant in the Academic System under Personal, then Official Documents"; src/server/seed/content/guides-gaps-2026-11.ts:150 "A stamped transcript is free under Personal, then Official Documents"; src/server/seed/content/guides-research-2026-11.ts:656 to 662 (graduate-procedures: transcript, conduct certificate, graduation certificate under Official Documents; pop-ups tip); src/server/seed/content/guides-research-2026-11.ts:681 (University stamp before MOFA).
- docs/research/factcheck-2026-11-09-university.md:285 (B1: "Student ID letter (stamped and signed, free, instant): Academic System, Personal, Official Documents", High); docs/research/factcheck-2026-11-09-university.md:284 (sso login, High).

### B15. `stipend-payday-and-iban`

- **Category:** `university`
- **Question:** When is the stipend paid, and how do I get it into my bank account?
- **Tags:** ["stipend", "mukafaah", "mukafa", "iban", "rewards", "payday", "bank", "salary"]
- **Students ask it:** docs/research/group-chat-2026.md:219 question 5 ("When does the mukafa'ah arrive / why has mine not dropped?", about 8 asks). The payday itself is not stated (unconfirmed, see needs admins).

```html
<p>Monthly, into the account whose IBAN you give the University. The day changes from month to month, so plan without a fixed date.</p><ol><li>Open a Saudi bank account. On a Visitor ID, see <a href="/ask/bank-account-without-iqama">Can I open a Saudi bank account without an iqama?</a></li><li>Find the IBAN in your banking app. It starts with SA and has 24 characters.</li><li>In the Academic System, open <strong>Personal</strong>, then <strong>Rewards</strong>, and send an IBAN update request.</li><li>After the next payment, check the Rewards screen to see that it went to the right account. If you change bank, send a new request before the next payment.</li></ol><p>The University sometimes pays early before a holiday. Bring enough money for your first two months, because opening an account and setting up the first payment take time. A payment missing? Check Rewards first, then send a request through Tawasul. Amounts and what stops payment are in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:406 and 408 ("It is paid monthly into your bank account. The day changes from month to month, and the University sometimes pays early before a holiday"; bring money for two months); src/server/seed/content/guides-research-2026-11.ts:412 to 416 (IBAN starts with SA, 24 characters; Personal, Rewards, IBAN update request; check after payment; new request when changing bank); src/server/seed/content/guides-research-2026-11.ts:434 (Rewards, then Tawasul).
- docs/research/factcheck-2026-11-09-university.md:286 (B1, Rewards and IBAN update, High); docs/research/factcheck-2026-11-09-university.md:287 (paid early on 20 September 2026 for National Day, High).

### B16. `student-card`

- **Category:** `university`
- **Question:** Where do I get my student card?
- **Tags:** ["student card", "university card", "id card", "orientation", "bitaqah"]
- **Students ask it:** docs/research/group-chat-2026.md:416 (passport photos for the student card); docs/research/factcheck-2026-11-09-university.md:432 D7. Office location not stated (open question 58).

```html
<p>During orientation week. Arriving later? Take your Visitor ID or iqama to the student card office, which prints it on the spot.</p><ul><li><strong>Moving from the Ma'had to a college:</strong> you get a new University number and a new card. Take your old card, a passport photo, your Visitor ID or iqama number and your new University number to the student card office.</li><li><strong>Graduating:</strong> return the card at the student card office. Keep a copy or a PDF of it first.</li></ul><p>Proof that you are a student is also free in the Academic System: see <a href="/ask/student-letter-and-transcript">How do I get a letter proving I am a student?</a> The whole first week is in <a href="/guides/new-student-steps">First steps for new students</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-research-2026-11.ts:576 "New students receive it during orientation week. If you arrive later, take your Visitor ID to the student card office, which prints it on the spot" (first-30-days src/server/seed/content/guides-research-2026-11.ts:214 adds "or iqama"); src/server/seed/content/guides-research-2026-11.ts:846 to 849 (Ma'had to Kulliyah: old card, passport photo, Visitor ID or iqama number, new University number); src/server/seed/content/guides-research-2026-11.ts:673 (return the card, keep a copy).
- docs/research/factcheck-2026-11-09-university.md:163 (A15: cards collected at the orientation exhibition, August 2026); docs/research/factcheck-2026-11-09-university.md:296 (B1: ID card printing on day one of orientation week, High).

### B25. `extend-family-visit-visa`

- **Category:** `family`
- **Question:** Can my family's visit visa be extended?
- **Tags:** ["visit visa", "extension", "family visit", "tourist evisa", "absher", "muqeem", "parents"]
- **Students ask it:** Open question 76; first-30-days "Not a student?" section; families on visit visas are the second audience of the site.

```html
<p>Yes. The host extends a family visit visa on Absher or Muqeem, at least 7 days before it expires. A tourist eVisa cannot be extended.</p><ul><li><strong>Who files it:</strong> the host, who must be a Saudi or an iqama holder.</li><li><strong>Insurance:</strong> the visitor needs valid medical insurance for the new dates, bought as a new policy.</li><li><strong>Limit:</strong> the total stay is capped at 180 days.</li><li><strong>Fee:</strong> Absher shows the exact amount before you pay.</li><li><strong>If the online request fails,</strong> use the Absher communication service.</li><li><strong>Tourist eVisa:</strong> up to 90 days in total across all entries in its year. A new one can be issued only after the old one expires.</li></ul><p>Visa options for wives, children and parents are in <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</p>
```

**Evidence**

- src/server/seed/content/guides-2026.ts:262 (tourist eVisa: 90 days in total across entries, cannot be extended inside the Kingdom, new one only after the old one expires); src/server/seed/content/guides-2026.ts:263 ("the host (a Saudi or an iqama holder) files the extension on Absher or Muqeem at least 7 days before the visa expires. The visitor needs valid medical insurance for the new dates, bought as a new policy, and the total stay is capped at 180 days ... Absher shows the exact amount ... If the online request fails, use the Absher communication service").
- docs/research/factcheck-2026-11-09-haram-and-daily-life.md:45 (A3.4, Medium); docs/research/factcheck-2026-11-09-haram-and-daily-life.md:46 (A3.5: host, Absher or Muqeem, 7 days, insurance, 180 days, Absher communication service, Medium; the my.gov.sa service is for family visit visas). The SAR 100 fee and any window after expiry stay open (open question 76), so no figure is given.
