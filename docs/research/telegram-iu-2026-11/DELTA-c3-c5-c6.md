# Delta: Telegram periods c3, c5 and c6 against the live MESH guides

## README

**What was compared.** The three Telegram reader files that were not used when the admin research was published: `c3-2025-08-to-12.md` (Aug to Dec 2025, 107 findings), `c5-2024.md` (2024, 114 findings) and `c6-2019-to-2023-long.md` (2019 to 2023 long posts, about 109 findings). All three were read in full on 9 November 2026.

Each finding was checked against the **current** guide text, meaning the last same-slug guide in the merge order of `src/server/seed/content/sync.ts` (GUIDES_2026, then student-life, research, gaps, lane E, admin, admin-life, admin-online, admin-papers, and GUIDE_REWRITES_2026_11 last), plus the FAQs in `guides-2026.ts`, `guides-student-life.ts`, `guides-gaps-2026-11.ts` and `faqs-aiakhee-2026-11.ts`. The bodies were dumped to plain text and searched by keyword (the dump script is not in the repo; it only reads the seed files). Before calling anything a conflict, the same topic was checked in c1, c2, c4, c7, `docs/research/iu-pdfs-2026-11/*.md` and `docs/research/admin-publish-2026-11/OWNER-QUESTIONS.md`. Newer evidence (c1, c2: 2026) beats these older periods, and official PDFs beat forum posts.

Ideas already listed in `docs/research/GUIDE-IDEAS-admin-2026-11.md` are not repeated as new topics.

**Counts per class** (about 330 findings in all; one finding can feed a merged item, so the ready-to-publish items in section 2 are fewer than the ADDS DETAIL findings):

| Class | c3 (2025) | c5 (2024) | c6 (2019 to 2023) | Total |
|---|---|---|---|---|
| ALREADY COVERED | 55 | 56 | 48 | 159 |
| ADDS DETAIL (medium or high) | 15 | 15 | 10 | 40, merged into 27 items with HTML in section 2 |
| NEW TOPIC | 2 | 6 | 12 | 20, feeding 7 ideas in section 3 |
| CONFLICTS | 3 | 3 | 0 | 6, merged into 5 entries in section 1 (none needs an urgent fix) |
| OUTDATED (history only, skipped) | 6 | 10 | 18 | 34 |
| Low confidence or needs the owner (section 4) | 20 | 20 | 16 | 56 |
| Out of scope (Saudi-only admission and jobs, professor gossip already filtered) | 6 | 4 | 5 | 15 |

**Headline.** The publishing session already covered almost everything that matters from these periods: registration, absence, withdrawal, ta'jeel, the stipend card, the Student Fund, Unit 13, graduation and the student system are all in the guides, often in more detail than these periods give. The real delta is:
1. **Two new guides with strong evidence across four or five periods:** Ramadan as a student (classes, iftar, Umrah trips, i'tikaf registration, volunteering), and scams and staying safe. Full drafts are in section 3.
2. **About 27 small additions**, the most useful being: the general grade scale (Excellent 4.50, Very good 3.75, Good 2.75, Pass 2.00), the 2.75 GPA stipend rule, the 840 SAR stipend figure, that the extra semester after a ta'jeel is paid, a mark correction before grades lock, summer courses meeting twice as often, mat'am hours, Umrah trips through the year, class groups per section, lost property on campus, and how a guest sees a Tawasul reply.
3. **Cross-period confirmations** (section 2.0) that raise confidence in facts the guides state from one source, and help settle several open owner questions.

Nothing in `src/` was edited. Nothing was committed.

---

## Section 1. Conflicts with the current guides

None of these needs an urgent change. 1.1 and 1.5 are settled in MESH's favour by newer evidence, 1.2 needs one date filled in, 1.3 is a wording choice, and 1.4 needs a quick check by the owner.

### 1.1 `missed-a-final-exam` and `exams-results-and-attendance`: when the substitute exam is held
- **MESH says:** substitute exam "no later than the end of the second week of the next semester"; accepted names posted in the first week of the next semester.
- **Forum shows:** for semester 1 of 1446 the excuse deadline was 26 Dec 2024 and the substitute exams ran 29 Dec 2024 to 2 Jan 2025, *before* semester 2 began (c5 #39, msg #531037, #531394, official notice, high). In January 2024 they were in week 3 of the next semester (c5 #38).
- **Weighing:** every later period has them at the start of the next semester: Aug 2025 (c3 #42), Jan 2025 (c4 #26), Jan 2026 (c2 #22, #23), Aug 2026 (c1 #56). December 2024 was a one-off.
- **Confidence:** high that MESH is right for 1448.
- **Recommendation:** no change.

### 1.2 `postgraduate-admission-1448`: the 1448 closing date
- **MESH says:** "Opened 16 November 2025 and closed in early December 2025."
- **Forum shows:** the University's X post of 15 Nov 2025 gave Sun 16 Nov to Sat 6 Dec 2025 (c3 #98, msg #580316, #581294, official, high). A University poster in the chats says the same (owner question B1 #7).
- **Confidence:** high.
- **Recommendation:** state the date. Replace the cell text `Opened 16 November 2025 and closed in early December 2025` with:

```html
Opened 16 November 2025 and closed on 6 December 2025
```

### 1.3 `how-many-classes-can-i-miss` (FAQ) and `exams-results-and-attendance`: counting absences
- **MESH says:** worked example of a two-hour course meeting once a week for 15 weeks: the 4th absence (26.7%) bars you.
- **Forum shows:** a per-credit table: 1 credit hour allows 4 absences (the 5th bars), 2 hours 8, 3 hours 12, 4 hours 16 (c3 #30, Sep to Nov 2025, several members, high). c5 #24 (2024) agrees that exactly 25% is allowed and 25.01% bars.
- **Weighing:** not a real contradiction. The table counts lecture *hours* over a 16-week term (a missed two-hour lecture is two absences), while MESH counts lectures over 15 weeks. Over 16 weeks, four missed two-hour lectures are exactly 25% and do not bar; over 15 weeks they do. MESH's example is the safer reading, and c1 (2026) gives the same 4th-absence example. Owner question C #1 is the same point.
- **Confidence:** medium.
- **Recommendation:** keep MESH as it is. If the owner wants one clarifying line, add after the worked-example table in `exams-results-and-attendance`, after `Check the percentage under Absence rather than counting from memory.`:

```html
<p>Absence is counted in lecture hours. Missing a two-hour lecture counts as two hours of absence, so in a 16-week semester a one-hour course allows 4 hours of absence, a two-hour course 8, a three-hour course 12 and a four-hour course 16. One hour more bars you.</p>
```

### 1.4 `campus-life-islamic-university`: meals booked for someone else
- **MESH says:** "Use your own card only. Taking meals on two cards is not allowed."
- **Forum shows:** the mat'am notice of 22 Aug 2024 said a student who cannot come may send his meal barcode to a friend (c5 #3, #61, msg #521470, high for 2024). Students also resell booked meals in the group (c5 #62).
- **Weighing:** the 1447 caterer changed (c3 #79), and MESH's rule is newer. MESH may mean one student collecting twice, which the 2024 rule does not allow either.
- **Confidence:** low that MESH is wrong.
- **Recommendation:** no change; owner question 4.6.

### 1.5 Settled by newer evidence (listed so no one reopens them)
- **Stipend route:** the c5 and c6 readers noted "MESH says IBAN". The guides have since been corrected to the University Al Rajhi card, and c5 (2024) and c6 (2020, 2022 to 2023) both confirm the card. No change.
- **Student Fund loan repayment:** 150 SAR a month (c3 #54, 2025) against 200 SAR (c1 #85, c2 #54, 2026). MESH has 200, the newer figure. No change.
- **Student Fund office:** Deanship of Student Affairs, 3rd floor (c5 #75, 2024; c4) against Unit 22 (c1 #85, 2026). MESH has Unit 22. No change.
- **Central Library hours:** c5 #74 (2024: 8 am to 8 pm, or from 7 am). MESH has 8 am to midnight, with 24 hours in finals, which c3 #81 confirms for Dec 2025. No change.
- **Campus Wi-Fi password:** c3 #67 says the national ID or iqama number; c5 #23 and MESH say your University password. No change.
- **Sports club day pass:** 39 SAR in 2024 (c5 #65) against MESH's 30 SAR from the official leaflet. No change.
- **Postgraduate master's ranking in 2019** (25% GPA, 25% aptitude, 50% test; c6 1.6): replaced by the 1448 guide that MESH follows. No change.

---
## Section 2. ADDS DETAIL, by guide

### 2.0 Cross-period confirmations (no change needed; they raise confidence)
Facts the published guides state from one source or one period, now confirmed independently by c3, c5 or c6:
- **Stipend on a University Al Rajhi card, not your own IBAN:** c6 (cards handed out Sep 2020, msg #306064; "University ATM card" 2022 to 2023), c5 #5 (2024, several members), c3 #49, #60 (2025). The card has been the route since at least 2020. This answers owner questions B1 #1 and B2 #1 in favour of the card.
- **840 SAR bachelor's stipend:** c5 #1 (2024, humanities, FAQ post), c3 #50 (2025), plus c4 and c1. Four periods. See item 2.1.3.
- **Arrival allowance of two months and a yearly books allowance:** c5 #13 (2024) gives 1,700 SAR once and 850 SAR a year, which is two months and one month of 840 SAR. Confirms MESH's "two months' stipend" and c4's "one month" for books (owner question B1 #5: about 850 SAR).
- **Excellence allowance 1,000 SAR for a semester GPA of 4.50 in two consecutive semesters, cumulative GPA not counted:** c5 #12 (2024), c3 #55 (2025), and c6 7.3 (it existed in 2019). A substitute exam does not affect it (c5). Supports the published "1,000 SAR" (owner question B1 #3).
- **Pay day around the 25th, Friday moves to Thursday, Saturday to Sunday, early payments before National Day and Founding Day:** c5 #2, #3 (2024, official), c3 #56, #57 (2025, official).
- **Card renewal or replacement takes about two weeks and the stipend is kept:** c5 #7 (2024), c3 #61 (2025).
- **The stipend stops when the regular length of the plan is used up:** c5 #9 (2024, "8 semesters, then nothing"), c3 #53 (2025).
- **Unit 13 prices, 500 SAR deposit and 1,000 SAR a semester:** c6 8.1 (2021) gives the same figures as c1 and c2 (2026). Stable for five years (owner question B1 #11).
- **Credit load 18 to 25 a semester, up to 28 for a graduating student, summer at most about 12:** c5 #44 (2024, Sharia), c3 #19 (2025). Supports owner question A #11.
- **Exactly 25% absence does not bar you:** c5 #24 (2024, majority view). MESH already says so.
- **Results stay hidden until the course evaluation is done:** c5 #30 (2024, high) and c3 #36 (2025) against c4 #31. Two periods to one for MESH's wording (owner question C #3).
- **First-semester timetable is fixed:** c6 3.1 (2023), c5 #41 (2024), c3 #10 (2025).
- **20 consecutive days of absence closes the file:** c5 #28 (2024, quoting article 19 of the study regulations), c3 #46.
- **Substitute exam set by your own teacher, with different questions:** c3 #42 (2025), c6 5.4 (2019).
- **Prerequisite chains (Qur'an 1 to 8, Nahw 1 and 2):** c5 #46, c3 #20.
- **Honours lost by any failed course:** c3 #39, c5 #98.
- **The extra-chance window falls at the turn of the semester:** c3 #47 (20 Dec 2025 to 3 Jan 2026), c5 #53 (7 to 13 Jan 2024).
- **Postgraduate application fee 300 SAR, not refundable:** c3 #99, c5 #92, c6 1.6 (2019).
- **Rain rarely closes the University:** c3 #9 (Dec 2025); c5 #102 shows students waiting for announcements in 2024 that did not close it.
- **Scholarship students cannot change between the theoretical and scientific tracks:** c3 #23, c5 #50 (several members each). Fits the official "scholarship students cannot change college after placement" (owner question A #10).
- **The graduation minimum is a GPA of 2.00:** c6 5.9 (member quoting the regulation, 2023) puts "Pass" at 2.00 to under 2.75, so the "minimum for graduation" in the warning rule is 2.00. The 2.75 figure that members keep quoting for warnings (c1 #55, c2 #31, c7 #5) matches the stipend rule instead (item 2.1.1). This helps settle owner questions A #1 and C #7. See item 2.3.1.

Each item below gives the guide, the seed file, exactly where the HTML goes, the HTML itself, and the evidence. All are medium or high confidence.

### 2.1 `scholarship-stipend-and-allowances` (`guides-research-2026-11.ts`, GUIDES_RESEARCH_2026_11)

**2.1.1 The 2.75 GPA rule.** Where: under `<h2>What stops the stipend</h2>`, a new `<li>` after the one starting `<li><strong>Passing the regular length of your programme:</strong>`.
```html
<li><strong>A low GPA:</strong> since 1445 the stipend stops while your cumulative GPA is below 2.75 out of 5. Check your GPA after every result, and if it is close to 2.75, speak to the stipends section (قسم المكافآت) of the Deanship of Student Affairs before the next semester.</li>
```
Evidence: c5 #10, #11 (2024; early 2024 posts say "below 2.00", then from June 2024 Student Affairs told a student of a "new decision" at 2.75, dated to semester 2 of 1445; msg #504384, #512391, #513519, #524736, #526602); c3 #52 (Dec 2025, #583743, #584299, #586550); also c4 #41 and c2 #50 (2025 to 2026). Four periods, one with a staff answer. Confidence: medium. Writer B1 held this back (owner question B1 #12) because a minority say 2.00. Recommendation: publish once the owner or a student confirms with the stipends section; the evidence now spans 2024 to 2026 and names the date of the change.

**2.1.2 Ta'jeel versus i'tithaar and the paid period.** Where: replace the `<li>` starting `<li><strong>Ta'jeel or i'tithaar:</strong> the stipend stops for the semester you are not studying.` with:
```html
<li><strong>Ta'jeel or i'tithaar:</strong> the stipend stops for the semester you are not studying. A ta'jeel semester is not counted in your study period, so the extra semester it adds at the end of your degree is still paid. An i'tithaar semester is counted, so the semester you add to make up for it falls outside the paid period. See <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</li>
```
Evidence: c5 #10 (2024 FAQ post: "deferral stops it but is made up with an extra semester; semester withdrawal is not made up", msg #513519, #525464); c3 #53 (2025, "a deferred semester is unpaid but can be made up later", #583385, #583477); c2 #5, #37 (2026, #611044, #597259). Three periods agree. Confidence: medium-high. Settles owner question C #6.

**2.1.3 The amount.** Where: under `<h2>The monthly stipend</h2>`, replace the `<li>` starting `<li><strong>The rate</strong> is set by the University and depends on your college.` with:
```html
<li><strong>The rate</strong> is set by the University and depends on your college. In 1447 and 1448 a bachelor's student in the Shari'ah and Arabic colleges received 840 SAR a month. Your own payments are in the Academic System under <strong>Personal</strong>, then <strong>Rewards</strong> (المكافآت).</li>
```
Evidence: c5 #1 (Jul 2024 FAQ post: 840 SAR humanities, 990 SAR science, #513519, #521923), c3 #50 (Dec 2025, #583742), c4 #39 and c1 #76. Confidence: medium-high for 840; the 990 SAR science figure is from 2024 only, so it is left out. Settles owner question B1 #4 if the owner agrees.

**2.1.4 Ration cards and emergency aid for families.** Where: under `<h2>Married students</h2>`, add after the paragraph that ends `all as PDF, before the deadline.</p>`:
```html
<p>Past rounds have included emergency cash aid (March 2024) and food ration cards (December 2024). The ration card round was open to married scholarship students living with their families in Madinah, including families whose wife holds her own iqama or is on a visit, tourist or Umrah visa. Rounds close within days, so turn on notifications for the channel.</p>
```
Evidence: c5 #77, #78 (official forms forwarded, 5 Mar 2024 msg #505171; 3 Dec 2024 msg #529026, #529027). Confidence: high for 2024; the dated wording keeps it true.

### 2.2 `getting-your-stipend-off-the-university-card` (`guides-admin-life-2026-11.ts`)

**2.2.1 The linked mobile number.** Where: under `<h2>When the stipend lands</h2>`, after the `<li>` starting `<li><strong>No text message?</strong>`:
```html
<li><strong>Your mobile number:</strong> the card's alerts and codes go to the mobile number on your University account, and the number must be in your own name. If you change your number, update it from the user account icon on iu.edu.sa first, and allow a few days for the card to follow.</li>
```
Evidence: c5 #6 (2024, "activate it at an ATM and link your mobile", #513831, #521834); c3 #60 (2025, "must be linked to your own verified phone number to withdraw; change it on the IU site; links in a few days", #575661, #578833, #580755). Confidence: medium.

### 2.3 `gpa-warnings-and-dismissal` (`guides-admin-2026-11.ts`)

**2.3.1 The general grade.** Where: a new section immediately before `<h2>Honours</h2>`.
```html
<h2>Your general grade</h2>
<p>Your transcript and degree also give a general grade (التقدير العام), worked out from your cumulative GPA. It is what postgraduate programmes and employers mean by "very good" or "good".</p>
<table><thead><tr><th>General grade</th><th>Cumulative GPA out of 5</th></tr></thead><tbody>
<tr><td>Excellent (ممتاز)</td><td>4.50 to 5.00</td></tr>
<tr><td>Very good (جيد جداً)</td><td>3.75 to under 4.50</td></tr>
<tr><td>Good (جيد)</td><td>2.75 to under 3.75</td></tr>
<tr><td>Pass (مقبول)</td><td>2.00 to under 2.75</td></tr>
</tbody></table>
<p>A cumulative GPA below 2.00 is below the pass grade needed to graduate.</p>
```
Evidence: c6 5.9 (Mar 2023, member quoting the regulation, msg #445464, high); c3 #39 ("excellent from 4.50", 2025); matches the 1446 postgraduate guide's "very good is at least 3.75 out of 5" (`iu-pdfs-2026-11/postgraduate-admission-1448.md` line 271) and the national university study regulation. Confidence: high. The last sentence also lets the owner replace "below the minimum for graduation" in the warning rule with "below 2.00" if wanted (owner questions A #1, C #7); that edit is not proposed here because the warning count itself is not in these periods.

### 2.4 `exams-results-and-attendance` (`guides-gaps-2026-11.ts`, GUIDES_GAPS_2026_11)

**2.4.1 Sick leave from private clinics.** Where: under `<h3>Excusing an absence</h3>`, a new `<li>` after the one starting `<li>Get proof for the day.`
```html
<li>A sick leave from a private hospital or clinic counts as much as one from a government hospital, as long as it is issued in Sehhaty and shows the date. A paper note without the electronic record is not enough.</li>
```
Evidence: c5 #27 (Jan to Feb 2024, "must be electronically stamped and show day and time; government or private hospitals both count", #488331, #504620, #504628); c3 #33 (2025, "the doctor uploads it to Sehhaty", #576262, #579442). Confidence: medium-high.

**2.4.2 Two finals at the same time.** Where: under `<h2>Before the exams</h2>`, a new `<li>` after the one starting `<li>Courses taught in several sections, and the Qur'an courses,`.
```html
<li>Two finals on the same day at the same hour are a clash. Take your exam timetable to the wakeel of your college as soon as it appears: one exam is moved, or sat later with the substitute exams. Two exams on the same day at different times, such as 8:00 and 10:30, are not a clash.</li>
```
Evidence: c6 5.3 (2019, 2021, 2022, several members, msg #221239, #364738, #423633). Confidence: medium. Nothing newer contradicts it.

**2.4.3 How Qur'an courses are marked.** Where: under `<h2>How grades work</h2>`, after the sentence `Your teacher gives the split at the start of the course.` (inside the same `<p>`):
```html
 Qur'an courses are split differently: recitation and memorisation tests carry marks through the semester, and the written final, a unified paper of about 20 multiple-choice questions, is out of 40.
```
Evidence: c3 #27, #28 (Oct to Dec 2025, several members: monthly test 20, final 40, plus recitation; about 20 multiple-choice questions on completing ayat, ayah endings and word meanings; unified finals set by the Qur'an College), c5 #33, #34 (2024: finals out of 60 except Qur'an out of 40). Confidence: medium.

**2.4.4 Checking a mark before grades lock.** Where: under `<h2>Appealing a mark</h2>`, a new paragraph after the `<p>` that starts `A final exam is sat once.`
```html
<p>Check each mark the day it appears. If you think the teacher entered it wrongly, ask him first: a teacher can correct an entry error himself until the grading period closes. After that, a confirmed grade changes only through the formal review below, and a review can move the mark down as well as up.</p>
```
Evidence: c3 #38 (Dec 2025, "lecturers can correct a recording error until the end of the grading period; an appeal gives the re-marked score, up or down", #583570, #583793, #583811); c5 #36 (Dec 2024, "escalate quickly, before grades are locked"); c6 5.2 (2019 to 2020, lecturers: "once confirmed, only through the Deanship with an official letter"). Three periods. Confidence: medium-high.

**2.4.5 What to bring on exam day.** Where: under `<h2>On exam day</h2>`, a new `<li>` after `<li>Be in the hall at least 10 minutes before the start.</li>`.
```html
<li>Bring your University card or another official ID, such as your iqama or Visitor ID in Absher. Switch your phone off and leave it where the proctor tells you.</li>
```
Evidence: c5 #35 (Aug and Dec 2024, "any proof of identity is enough; phones in a basket or switched off", #529068, #529400). Confidence: medium.

### 2.5 `registering-your-courses` (`guides-admin-2026-11.ts`)

**2.5.1 When every section is full.** Where: in the table under `<h2>When a course will not go in</h2>`, replace the row `<tr><td>The section is full</td><td>Choose another section. If every section is full, ask the Deanship of Admission and Registration through Tawasul with the course code</td></tr>` with:
```html
<tr><td>The section is full</td><td>Check again at different times: seats free up as other students swap. If every section stays full, message your academic advisor in the Academic System and ask for the section to be expanded (توسيع شعبة), or ask the Deanship of Admission and Registration through Tawasul with the course code. A section is more often opened or expanded when several students ask together</td></tr>
```
Evidence: c3 #14 (Aug 2025, several members, #566497, #567276, #568912); c5 #42 (2024: requests used to open closed sections "when enough students asked", #511674, #511683); c6 6.3 (2020 to 2021: lobby for a section with enough names). Three periods. Confidence: medium.

**2.5.2 The two things that trip people up on the page.** Where: replace `<p>Use a computer. The page does not work well on a phone, and it times out if you leave it open too long.</p>` with:
```html
<p>Use a computer. The page does not work well on a phone, and it times out if you leave it open too long. Check the semester shown at the top of the page first, because it can open on the previous semester. When the system is busy, confirm one or two courses at a time rather than a whole timetable at once, and refresh Registered courses after each confirm.</p>
```
Evidence: c3 #12 (Aug 2025, "the page may default to Summer 1446", #564848, #565288, #566119); c5 #42 (Jan to Aug 2024, "time expired on confirm; confirm in small batches and refresh", #493401, #493804, #500054). Confidence: medium-high.

**2.5.3 A course withdrawal leaves your stipend and room alone.** Where: under `<h2>Withdrawing from a course</h2>`, inside the first `<p>`, after `A W does not count in your GPA.`:
```html
 Withdrawing from single courses does not affect your stipend or your room, as long as you stay above the minimum load. Only leaving the whole semester does.
```
Evidence: c6 3.4 (official college guidance notice, Apr 2020, msg #277879, high for the rule); c5 #10 (2024: only semester withdrawal and deferral stop the stipend; a bar does not). Confidence: medium-high.

### 2.6 `summer-semester` FAQ (`guides-gaps-2026-11.ts`, FAQS_GAPS_2026_11)

**2.6.1 A compressed term.** Where: in the list that follows `When a summer semester runs, it works like this:`, a new `<li>` after `<li>You can take at most 12 credit hours.</li>`.
```html
<li>It is compressed: each course meets about twice as many hours a week as in a regular semester, for the same credit hours and the same weight in your GPA. Sections are small, and your own teacher sets the final.</li>
```
Evidence: c5 #100 (2024, high, several members and the course-request notice, #505040, #508930, #511403, #529690); c6 6.2 (2022 to 2023, #399896, #462835); c3 #100 (2025, low, "classes small, own lecturer sets the exam"); c4 #85. Confidence: high. Settles owner question C #9 (the level-4 eligibility part stays out: low).

### 2.7 `campus-life-islamic-university` (`guides-student-life.ts`, GUIDES_STUDENT_LIFE)

**2.7.1 Meal times and paying.** Where: under `<h2>Meals at the mat'am</h2>`, a new `<li>` after the one starting `<li>Book your meals for the coming month.`
```html
<li>Meal times in term in 1447: breakfast from about 6:00 to 8:00 am, lunch from 11:00 am to 2:00 pm, and dinner from about 7:30 to 10:30 pm. Pay online when you book, or at the payment desk behind the restaurant, and show your meal barcode at the counter. The restaurant is behind the College of Sharia.</li>
```
Evidence: c3 #79, #80 (official reopening notice, 31 Aug 2025: breakfast 6 to 8, lunch 11 to 14, dinner 19:30 to 22:30, #571654, #572757, #573896; behind the Sharia College); c4 #52 (2025: after Fajr to 8, 10 to 2, after Maghrib to 10, barcode); c1 #100 (2026: pay online or at the desk behind the restaurant). Confidence: medium-high. Times shift a little between years, hence "about" and "in 1447".

**2.7.2 Umrah trips all year.** Where: replace the `<li>` starting `<li><strong>Ramadan:</strong> the Deanship serves a daily iftar` with:
```html
<li><strong>Ramadan:</strong> the Deanship serves a daily iftar by the University sports ground and hands out suhoor meals. Classes follow a separate Ramadan timetable.</li>
<li><strong>Free Umrah trips:</strong> the Deanship runs free day trips to Makkah for Umrah by bus, in Ramadan and at other times of the year. Each trip is announced with a registration form on the Deanship's accounts, and buses usually leave from the campus in the early morning or after Dhuhr. The bus comes back the same day, and a student who misses it returns at his own cost. Book your Umrah permit in Nusuk before you go: see <a href="/ask/umrah-from-madinah">How do I go for Umrah from Madinah?</a></li>
```
Evidence: c6 9.9 (Deanship notices, weekly trips in 2023, 7 am from Unit 13, 6 am from the University grocery, #468582, #484427, high); c5 #84 (2024); c4 #98 (7 Ramadan 1446, 1:30 pm, MS Forms); c2 #104 (2026: "free Umrah trips through the year return the same day and a late student returns at his own cost"). Four periods. Confidence: high.

**2.7.3 Cars and parking on campus.** Where: under `<h2>Student Affairs services</h2>`, a new `<li>` at the end of the list.
```html
<li><strong>Cars:</strong> parking beside the housing units needs a permit. Permits are issued by the permits office just inside the main gate, mainly to postgraduate students and for medical need. Everyone else parks in the main car parks and walks.</li>
```
Evidence: c5 #66 (Mar to Aug 2024, #505586, #506190, #522142); c3 #83 (Sep to Oct 2025, #576280, #576289). Confidence: medium.

**2.7.4 The library is open to visitors.** Where: in the paragraph under `<h2>The Central Library</h2>`, after `It is closed on Friday and Saturday.`:
```html
 It is open to visitors as well as students, and its collections include the personal libraries of several scholars, among them Shaykh al-Albani's.
```
Evidence: c3 #81 (Sep and Dec 2025, #576039, #582345). Confidence: medium. Useful for families and for `bringing-parents-to-visit`.

### 2.8 `what-to-bring-to-madinah` (`guides-gaps-2026-11.ts`)

**2.8.1 The thobe on campus.** Where: after the sentence `Every neighbourhood has tailors who make one for 100 to 300 SAR in 2 to 4 days.` (same item):
```html
 The thobe is everyday dress on campus, in class and in exams: the University reminded staff and students of this in September 2025.
```
Evidence: c3 #86 (official notice, 14 Sep 2025, #574836, high); c5 #68 (2024, "nearly all students wear the thobe"; University volunteers wear thobe and cap). Confidence: medium-high.

### 2.9 `your-first-semester-week-by-week` (`guides-admin-life-2026-11.ts`)

**2.9.1 Your section's group.** Where: under `<h2>Weeks 2 to 5: settling into your courses</h2>`, a new `<li>` after the one starting `<li><strong>Course description:</strong>`.
```html
<li><strong>Your section's group:</strong> most sections have a WhatsApp or Telegram group run by a student class head (رئيس الشعبة), who passes on the teacher's notices, test dates and marks. Ask for it in your first lecture. The Academic System and your University email stay the official record, and a link posted in a group is never a reason to type your password.</li>
```
Evidence: c6 3.10 (2020 to 2023, many members; term-by-term lists of groups, #270885, #304419, #482905, high). MESH's own blackboard-phishing FAQ mentions class groups as a phishing lure. Confidence: high.

### 2.10 `university-offices-and-contacts` (`guides-research-2026-11.ts`, GUIDES_RESEARCH_2026_11)

**2.10.1 Seeing a reply to a guest request.** Where: under `<h2>Start here</h2>`, in the Tawasul `<li>`, after `If you cannot sign in yet, use the guest form at <a href="https://helpdesk.iu.edu.sa/newticket_guest">helpdesk.iu.edu.sa/newticket_guest</a>.`:
```html
 A reply often shows only once the request is closed, so if you see nothing, switch the request filter from in progress to closed, awaiting rating.
```
Evidence: c5 #17 (Jul 2024, #512593, #513379, high). Confidence: high for 2024; the screen may have been relabelled since, so the owner may want to check the label once.

**2.10.2 Student counselling.** Where: in the table under `<h2>Who handles what</h2>`, a new row after `<tr><td>A doctor or dentist</td>...`.
```html
<tr><td>Stress, exam worries, homesickness or a personal difficulty</td><td>The Student Guidance and Counselling Unit (الإرشاد الطلابي) of the Deanship of Student Affairs</td><td>In person, next to the Imam Ibn Baz masjid on the mat'am side, or through your college's own guidance unit. Free and confidential</td></tr>
```
Evidence: c6 9.4 (official posts 2020 to 2023: Student Counselling Centre, mental-health seminars, exam tips; Sharia College's own guidance unit, #274863, #422791, #486221, high); c5 #21 (Nov 2024, location next to the Ibn Baz mosque, #528068, medium). Confidence: medium. "Confidential" is standard for the service but not stated in the posts; drop the word if the owner prefers.

### 2.11 `lost-your-iqama-passport-or-card` (`guides-admin-life-2026-11.ts`)

**2.11.1 Lost property on campus.** Where: under `<h2>The first hour</h2>`, after `<li><strong>Look again calmly</strong> where you last had it: your room, the mat'am, the prayer room, the bus, the car you came in.</li>`:
```html
<li><strong>Lost it on campus?</strong> Ask campus security, and Student Relations (العلاقات الطلابية) on the first floor of the Deanship of Student Affairs. Things found on campus are handed in to them, and they contact the owner. If you find something yourself, take it there.</li>
```
Evidence: c6 9.12 (message from the Dean of Student Affairs, Sep 2023, #480832, #481889, high). Confidence: medium-high (2023; nothing newer contradicts it).

### 2.12 `university-housing-and-student-services` (`guides-admin-life-2026-11.ts`)

**2.12.1 Who cannot borrow.** Where: in the Student Fund table, replace `<tr><td>Not open to</td><td>Students in their final year</td></tr>` with:
```html
<tr><td>Not open to</td><td>Students in their first semester, who have no GPA yet, and students in their final year</td></tr>
```
Evidence: c5 #75 (May to Sep 2024, "not for level-1 students (no GPA yet)", #509231, #519011, #523697); c1 (2026) says the GPA decides the amount, which is consistent. Confidence: medium.

### 2.13 `muqarrarat` FAQ (`guides-2026.ts`, FAQS_2026)

**2.13.1 Printed notes and second-hand books.** Where: after the sentence `If your course is not there, ask the course teacher for the set book or notes, or ask your department.`:
```html
 Printed notes (مذكرات) for many courses are sold at the Student Services bookshop in Unit 22, and the bookshops in al-Faisaliyah next to the campus buy and sell used course books. Prices for the same book vary a lot from shop to shop, so compare before you buy.
```
Evidence: c5 #64 (Aug to Sep 2024, #517560, #523659); c3 #104 (Sep to Oct 2025, the same title from about 115 to 293 SAR, #573079, #578328, #578663); c6 16.2 (2022, photocopied course books near campus). Three periods. Confidence: medium. No shop is named.

### 2.14 `learn-tajweed-in-madinah` FAQ (`guides-gaps-2026-11.ts`)

**2.14.1 Weekend revision for huffaz.** Where: after the sentence `Classes meet at set times around the prayers, in person at the masjid, and some are taught remotely.`:
```html
 For those who have memorised, the halaqat also run weekend revision programmes from Dhuhr to Isha, covering the whole Qur'an or 10 or 20 juz, with registration on the same site.
```
Evidence: c5 #108 (Nov 2024, notice, register at reg.qm.edu.sa, #527777); c3 #102 (Sep 2025, "weekend intensive Quran revision, whole Quran, 20 or 10 juz, Dhuhr to Isha, by Gate 22", #574708). Confidence: medium.

---
## Section 3. NEW TOPIC ideas

Checked against every live slug and FAQ and against `GUIDE-IDEAS-admin-2026-11.md`; none of these is there. Ranked by how many readers each helps and how strong the evidence is.

1. **Ramadan as a student in Madinah** (evidence in c2, c4, c5, c6; draft below). What changes at the University in Ramadan: the shorter class timetable and the holidays inside Ramadan in 1448, iftar and suhoor on campus, the early stipend, the Deanship's Umrah trips, i'tikaf registration at Masjid an-Nabawi, volunteering at the Haram, and getting to the Haram at night. Today these are scattered over one bullet in `campus-life-islamic-university`, the key dates and the Umrah FAQ. Every student asks about it each February, and i'tikaf registration is not in MESH at all.
2. **Scams and staying safe** (evidence in c1, c2, c3, c5, c6, c7; draft below). The tricks that come round every year: strangers borrowing money near the colleges, theft from rooms and prayer rooms, stolen accounts and shared codes, fake bank messages, money "sent by mistake", investment and test-solving offers, Hajj packages outside Nusuk, false forwarded rumours, and what to do if one catches you. MESH has only the `blackboard-phishing` FAQ.
3. **Finding your way around the campus.** A plain-words map: the main gate (permits office, Central Library on the right), Unit 22 (stipend card counter, student card desk, Student Fund, housing office, Student Services bookshop), Unit 13 (paid rooms, trip departures), Unit 5 (temporary rooms), the Deanship of Student Affairs (stipends section, Student Relations, clubs on the first floor), the Deanship of Admission and Registration (3rd floor), the Deanship of IT (behind Unit 18), the Salam and King Saud halls, the Ibn Baz masjid and the guidance unit beside it, the mat'am behind the College of Sharia and its payment desk, the sports club behind the science colleges, Gate 4 for taxis and pick-ups, and how room numbers work in the Sharia buildings (rooms 121 to 127 on the first floor of the new building, 221 to 227 on the second). Evidence: c6 8.4, 9.10, 9.11 (2019 to 2023, high for the landmarks), c5 #18, #21, #66, c3 #77, #79, #83, and many guides that already name these places one at a time. Scope: one page, no new rules, links out to each guide. Medium evidence; best checked on a walk round campus before publishing.
4. **Can I work while I study?** (FAQ). Asked in c1, c2, c3 and c5 every year, with no MESH answer. c5 #103 (2024, medium): non-Saudi students need their sponsor's, that is the University's, approval to work; holiday jobs mentioned were security and phone shops. Also relevant: University jobs and teaching-assistant posts are advertised on iu.edu.sa (c1 #119), student imams for University masjids (c6 9.6, 2021, Deanship notice: full hafiz, good conduct, housing residents first), and paid Hajj-season work for Ramadan volunteers (c5 #82). Needs the owner's ruling on what students on an educational visa or a student iqama may do before anything is published.
5. **Student support when things go wrong** (a short guide or a section of `university-offices-and-contacts`). The Student Guidance and Counselling Unit, the colleges' guidance units and their pre-exam sessions, the Student Fund's aid section, the Scholarship Fund's hardship rounds for families, and the Medical Center. Evidence: c6 9.4 (high), c5 #21, #75, #77, #78. Item 2.10.2 covers the minimum.
6. **The Educational Preparation Diploma alongside your degree.** The Education Department runs a teaching diploma open to scholarship students during their bachelor's, needed for postgraduate study in Education: registration in early Safar (5 to 15 Safar 1445), four semesters in the evenings (Sunday 4 to 10 pm, Monday 6 to 6:50 pm in 2023); in 2020 students applied in level 6. Evidence: c6 1.8 (Education Department notices, 2020 and 2023, high for those years); c5 #98 says the bachelor's itself carries no teaching qualification. Not seen in 2024 to 2026, so confirm it still runs before writing.
7. **Choosing between Sharia, Law and the Qur'an College** (comparison page). Asked dozens of times in c6 (section 4, item 11). `what-you-study-by-level` already lists the courses; a short page could compare the shape of each degree, the memorisation required, the postgraduate routes (c6 2.7: Fiqh, Usul al-Fiqh, Islamic Economics after a Sharia BA) and the field training at courts for Sharia and Law (c6 9.14). Low priority; scholarship students are placed rather than choosing freely.

### 3.1 Draft: Ramadan as a student in Madinah

- **Proposed slug:** `ramadan-as-a-student`
- **Title:** Ramadan as a student in Madinah: classes, iftar, Umrah and i'tikaf
- **Summary:** How Ramadan works for University students: the shorter class timetable and the holidays in Ramadan 1448, iftar and suhoor on campus, the early stipend, free Umrah trips, i'tikaf at Masjid an-Nabawi and volunteering at the Haram.
- **Stage:** `getting-settled`
- **Topic:** the campus life topic in `src/lib/guide-topics.ts` (whichever holds `campus-life-islamic-university`).
- **Evidence:** c2 #80, #103, #104, #106 (2026); c4 #78, #98, #101 (2025); c5 #80 to #83 (2024, official notices for iftar and volunteering); c6 9.1, 13.4, 13.6 (2022 to 2023); key dates from `src/content/key-dates.ts`; stipend timing from the live stipend guides. Confidence: high for the pattern, medium for single-year details, which carry their year.

```html
<p>Checked November 2026. Ramadan in Madinah is the high point of the year, and the University changes its rhythm for it. This guide covers what changes on campus and what to plan for, with the dates of Ramadan 1448.</p>
<h2>Ramadan 1448 at a glance</h2>
<table><thead><tr><th>What</th><th>1448</th></tr></thead><tbody>
<tr><td>Ramadan begins, by moon sighting</td><td>Expected Monday 8 February 2027</td></tr>
<tr><td>Classes on the Ramadan timetable</td><td>8 to 18 February, and 23 to 25 February 2027</td></tr>
<tr><td>Founding Day holiday</td><td>Friday 19 to Monday 22 February 2027</td></tr>
<tr><td>Eid al-Fitr holiday</td><td>Friday 26 February to Saturday 13 March 2027 (19 Ramadan to 5 Shawwal)</td></tr>
<tr><td>The last ten nights</td><td>From the night of Sunday 28 February 2027, all inside the Eid holiday</td></tr>
<tr><td>Eid al-Fitr</td><td>Expected Tuesday 9 March 2027</td></tr>
<tr><td>Classes resume</td><td>Sunday 14 March 2027</td></tr>
</tbody></table>
<p>So in 1448 there are only about two weeks of classes in Ramadan, and the whole of the last ten nights is free for worship. Every date is in <a href="/guides/university-calendar-1448">The University calendar</a>.</p>
<h2>Classes in Ramadan</h2>
<ul>
<li><strong>A separate timetable.</strong> The University publishes the Ramadan lecture times a few days before Ramadan, on its official X account (@iu_edu) and in the Academic System. In 1447 they came out on 16 February 2026.</li>
<li><strong>Shorter lectures.</strong> A two-hour lecture becomes about one hour, and a one-hour lecture about 30 minutes. The morning day usually starts at 10 am, and afternoon classes at about 2 pm.</li>
<li><strong>The absence rules do not change.</strong> Every absence still counts towards the 25% limit, so keep going until the last day of teaching. See <a href="/ask/how-many-classes-can-i-miss">How many classes can I miss?</a></li>
<li><strong>The Ma'had</strong> can finish teaching a few days before the colleges. Go by its own notice.</li>
<li><strong>No final exams</strong> fall in Ramadan in 1448. Second semester finals start on 25 April 2027.</li>
</ul>
<h2>Iftar and suhoor on campus</h2>
<ul>
<li><strong>A free iftar every day.</strong> The Deanship of Student Affairs serves iftar next to the University sports ground, often with Qur'an competitions and prizes. In 1445 iftar was also served in the lobbies of Units 24 and 25, about 3,000 meals a day.</li>
<li><strong>Meals run out.</strong> If you are coming back late from the Haram, carry dates and water with you.</li>
<li><strong>Suhoor</strong> meals are handed out in the last ten nights, including at Gate 4.</li>
<li><strong>Do not queue at cars</strong> handing out meals or cash near the campus gates, and never take money from strangers. The University has warned students against this. Eat at the University iftar instead.</li>
</ul>
<h2>Your stipend in Ramadan</h2>
<p>The University usually pays the stipend early in Ramadan, a few days before Eid. The next payment then comes more than a month later, so plan your spending for the gap. See <a href="/guides/getting-your-stipend-off-the-university-card">Your University stipend card</a>.</p>
<h2>Umrah in Ramadan</h2>
<ul>
<li><strong>Free trips.</strong> The Deanship of Student Affairs runs free Umrah trips by bus in Ramadan, each announced with a registration form. In 1446 one left on 7 Ramadan at 1:30 pm from in front of the University grocery, and in 1447 one left on 22 Ramadan at 1 pm from the sports ground. Colleges run their own trips as well. The bus returns the same day, and a student who misses it comes back at his own cost.</li>
<li><strong>Your permit.</strong> Book your Umrah permit in Nusuk for the time you will arrive in Makkah. Permits, trains and buses fill quickly in Ramadan, most of all in the last ten nights.</li>
<li><strong>Going on your own:</strong> see <a href="/ask/umrah-from-madinah">How do I go for Umrah from Madinah?</a> and <a href="/ask/haramain-train-to-makkah">How do I take the Haramain train to Makkah?</a></li>
<li><strong>Go on a day off.</strong> Travel absences are not excused, so plan Umrah for a weekend or the holidays, not a teaching day.</li>
</ul>
<h2>I'tikaf at Masjid an-Nabawi</h2>
<ul>
<li><strong>Registration is needed</strong> for a place in the masjid's i'tikaf areas in the last ten days. The General Authority for the Care of the Two Holy Mosques opens it around the middle of Ramadan, and places are limited.</li>
<li><strong>Register</strong> with your iqama or ID number on the link the Authority announces, as soon as it opens. Whether you were accepted shows in your account.</li>
<li><strong>Sisters</strong> should check the women's arrangements in the same announcement. See <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>.</li>
</ul>
<h2>Volunteering at the Haram</h2>
<ul>
<li>Each Ramadan the University recruits students to volunteer at Masjid an-Nabawi. In 1445 volunteers served every day of Ramadan, in thobe and cap, and received certificates, hours on the National Volunteering Platform and priority for work in the Hajj season.</li>
<li>Charities in the city recruit volunteers on <a href="https://nvg.gov.sa/">nvg.gov.sa</a> too. Hours are approved only when you turn up and work. See <a href="/ask/skills-record">What is the University Skills Record?</a></li>
</ul>
<h2>Getting to the Haram at night</h2>
<ul>
<li>University bus times change in Ramadan. The new times are posted in the halls and by the Deanship of Student Affairs. See <a href="/guides/university-to-the-haram">Getting from the University to the Haram</a>.</li>
<li>For Tarawih and Qiyam the courtyards fill an hour before the adhan, and parking near the Haram is hardest at night. Leave early, or take the bus.</li>
<li>Rawdah permits go quickly in Ramadan: book in Nusuk as early as the app allows. See <a href="/guides/masjid-an-nabawi-first-visit">Visiting Masjid an-Nabawi</a>.</li>
</ul>
<p><strong>Tip:</strong> Write the Eid holiday into your plans now. Most students stay in Madinah for the last ten nights, and trains and flights out after Eid sell out early. Questions? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p>
```

Before publishing: confirm the link slugs (`/ask/how-many-classes-can-i-miss`, `/ask/haramain-train-to-makkah`, `/ask/skills-record`, `/ask/umrah-from-madinah` are FAQs; the rest are guides), and add the guide to the topic list. Owner question 4.2 covers i'tikaf for Visitor ID holders and sisters.

### 3.2 Draft: Scams and staying safe

- **Proposed slug:** `scams-and-staying-safe`
- **Title:** Scams and staying safe: what students in Madinah run into
- **Summary:** The tricks students meet on and around campus and online, from strangers borrowing money to stolen accounts, fake bank messages and Hajj packages, and what to do if one catches you.
- **Stage:** `getting-settled`
- **Evidence:** c3 #84, #103 (2025: fake muezzin borrower, thefts from a room in Unit 22 and a prayer room; report with the phone number); c6 12.1, 15.1 to 15.5, 5.6 (2020 to 2023: the borrowing scam twice, WhatsApp hijack, shared login codes, fake Hajj sites, false viral visa message, identical answers reported as cheating); c5 #81, #106 (2024: bank SMS pattern; University warning about car hand-outs in Ramadan); c2 #105, #126 and c1 #149 (2026: pickpockets, investment schemes, money sent by mistake, work-from-home offers); c7 #4; the live `blackboard-phishing` FAQ and `hajj-as-a-student`. Six periods. Confidence: high for the patterns.

```html
<p>Checked November 2026. Madinah is a safe city, and people here trust each other. That trust is exactly what scammers count on. The same few tricks come round every year, and once you know them you will spot them.</p>
<h2>Strangers who want to borrow money</h2>
<p>This is the most common trick near the University. A well-dressed man stops you near the colleges or the gates, often from a car. He says he is a graduate of the University, an imam or a muezzin, and tells a story: an ATM swallowed his card, his car has broken down, a relative is in hospital. He asks for a few hundred riyals and promises to repay it tonight. He never does, and he blocks your number. The same men come back months later with new stories.</p>
<ul>
<li>Never lend money to someone you do not know, however respectable he looks and however moving the story.</li>
<li>If he insists, walk away and tell campus security.</li>
<li>If you have already paid, report it at the nearest police station with his phone number and any transfer receipt. The phone number is enough to trace him.</li>
</ul>
<h2>Theft on campus and in crowds</h2>
<ul>
<li>Lock your room every time you go out, even for a minute. Rooms have been entered and wallets taken.</li>
<li>Keep your bag and phone with you in the prayer rooms, the mat'am and the library.</li>
<li>Watch your pockets in bus queues and crowds, at the Haram as well as on campus.</li>
<li>Lost something? See <a href="/guides/lost-your-iqama-passport-or-card">Lost your passport, iqama, phone or University card?</a></li>
</ul>
<h2>Links, codes and stolen accounts</h2>
<ul>
<li><strong>Never type your University password</strong> into a page you reached from a link in a group or a class chat. Fake accounts post links named "timetable" or "class group" to steal accounts. See <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat. Is it safe?</a></li>
<li><strong>Never share a code</strong> that arrives by text, for WhatsApp, Telegram, Absher, Nafath or your bank. Whoever has the code has your account. Someone asking you to "send me the code, it came to you by mistake" is stealing it.</li>
<li><strong>Turn on two-step verification</strong> in WhatsApp and Telegram. A hijacked account is used to ask your friends and family for money in your name.</li>
<li><strong>Never photograph your bank card</strong> or stipend card for anyone, and never give out its CVV.</li>
</ul>
<h2>Bank messages and calls</h2>
<ul>
<li>A Saudi bank never asks for a code, a PIN or your card details by phone, text or WhatsApp.</li>
<li>Messages with spelling mistakes, messages that ask you to call an ordinary mobile number, and messages warning that your account or Absher will be suspended unless you act now are fraud.</li>
<li>If in doubt, hang up and call your bank on the number printed on your card or shown in its app.</li>
<li>Money from a stranger "sent by mistake", followed by a request to send it on: do not transfer anything. Tell your bank. Passing it on can make you part of a fraud.</li>
</ul>
<h2>Offers that are too good to be true</h2>
<ul>
<li>"Investment" schemes promising daily profits, and "work from home" offers posted in student groups, are scams, even when a group admin posts them.</li>
<li>Services that offer to solve your Blackboard tests or "guarantee full marks" are cheating. Two identical answers lead to a cheating report against both students, under the student conduct rules.</li>
<li>A Hajj package sold by phone or on social media, outside Nusuk, gives you no permit. See <a href="/guides/hajj-as-a-student">Hajj from Madinah as a student or resident</a>.</li>
<li>Buying from a stranger online? Pay on delivery, or meet in a public place and check the item before you pay. A seller in a hurry for the money is a warning sign.</li>
</ul>
<h2>Rumours and forwarded messages</h2>
<p>Every year messages go round the groups about visa fines, new deadlines, stopped stipends or students being sent home. Many are false or years old. Go only by the University's official accounts on X (@iu_edu, @AdmissDeanship and @dsa_iu_edu), your University email and the Academic System. If a message worries you, ask the office concerned through Tawasul before you act. See <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>
<h2>If it happens to you</h2>
<ol>
<li><strong>Money gone from a card or account:</strong> freeze the card in your banking app and call your bank at once. Speed matters. For the stipend card, go to the counter in Unit 22: see <a href="/guides/getting-your-stipend-off-the-university-card">Your University stipend card</a>.</li>
<li><strong>An account taken over:</strong> change the password from a device you trust and sign out of other devices. For your University account, change it from the user account icon on iu.edu.sa and tell the Deanship of IT on <a href="mailto:it.care@iu.edu.sa">it.care@iu.edu.sa</a>.</li>
<li><strong>Report it</strong> at the nearest police station with screenshots, phone numbers and transfer receipts. In an emergency, call 911.</li>
<li><strong>Warn others:</strong> tell your class group and friends, so the same trick does not catch them.</li>
</ol>
<p><strong>Tip:</strong> When someone rushes you, slow down. Every scam on this page depends on you acting before you think. Questions? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p>
```

Before publishing: link the Ramadan guide from the car hand-outs warning once both exist, and link this guide from `blackboard-phishing`, `first-30-days-in-madinah` and `university-housing-and-student-services` (its theft line).

---
## Section 4. Questions for the owner

Low-confidence or unconfirmed findings that matter, and decisions the items above depend on. Message ids point into the export.

### 4.1 Decisions on items in sections 1 to 3
1. **Stipend GPA rule (item 2.1.1).** Publish "the stipend stops below a cumulative 2.75" now that 2024, 2025 and 2026 all report it, with a 2024 staff answer dating the change to semester 2 of 1445? Or confirm with the stipends section first? Does it apply to external scholarship students as well as Saudis (most posters are Saudi)? (c5 #11, c3 #52, c4 #41, c2 #50)
2. **840 SAR (item 2.1.3).** Publish the figure for the Shari'ah and Arabic colleges? Is the science, engineering and computing rate still higher (990 SAR in 2024, c5 #1), given that Study in Saudi says "up to 840"?
3. **The warning threshold.** c6 5.9 puts the pass grade at 2.00, so "below the minimum for graduation" would mean below 2.00. Happy to write 2.00 into `gpa-warnings-and-dismissal` and the `failed-a-course` FAQ? (owner questions A #1, C #7)
4. **Absence counting (item 1.3).** Add the hours-based line, or keep only the 15-week worked example?
5. **Ramadan and scams guides (section 3).** Approve the two drafts and their slugs?

### 4.2 Ramadan and the Haram
6. **I'tikaf registration:** which app or page does the General Authority use now (it was the "Zairun" or "Zairoon" app in 1443 and 1445), can Visitor ID holders and sisters register, and does it still open around the middle of Ramadan? (c6 13.4, c5 #83, c4 #101, c2 #106)
7. **University Ramadan volunteering at Masjid an-Nabawi:** does it still run each year, and how do students sign up? (c5 #82, 2024 only)
8. **The Scholarships Fund's Hajj aid** for students who have never performed Hajj (2022), and the University Hajj campaign that asked for the GPA (2024): do either still run? (c6 13.1, c5 #84) Not published.

### 4.3 Money and support
9. **Scholarship Fund rounds:** are emergency aid and ration cards still offered, and is the Fund's Telegram channel still the place they are announced? (c5 #77, #78)
10. **Student Fund "Taiseer" laptop instalments** (Sep 2024): still running? (c5 #76) Not published.
11. **Unwithdrawn stipend:** members say money left on the card for 30 or 90 days can be taken back, but that this is not applied. Worth a line? (c5 #15, low)
12. **Semester withdrawal and the yearly ticket:** does an i'tithaar cost the student that year's ticket home? Asked in 2024, never answered. (c5 #60)
13. **Card replacement fee:** 30 SAR (c3 #61) or 57 SAR (c4 #45)? Still open from writer B1.

### 4.4 Housing and campus
14. **December 2023 housing rules** from the Dean of Student Affairs: a student whose wife came on a visit visa must hand back his single room; no trading, no stockpiling books in rooms, no unofficial money collections. Still in force? If so, `campus-life-islamic-university` ("Hall rules that can cost you your place") and `married-students-housing` need the visit-visa line. (c6 8.3, medium-high for 2023; c3 #89 low for 2025 says a room can be kept while staying with a friend if the supervisor is told)
15. **Room rules and inspections** (also writer B2 #7): the 2023 list above adds to c7's 2018 list. One confirmed list would let MESH publish a "what you can keep in your room" section.
16. **Medical Center:** does it treat family members, and on which visas (istiqdam yes, Umrah or visit visa no, in members' words), and does it stop treating students once they graduate? (c3 #91, c5 #73, c6 9.3; all low to medium)
17. **University WhatsApp channel:** c3 #74 gives an official announcements channel, `whatsapp.com/channel/0029VaHnihtId7nSpuvli70D`, and c1 #100 one for the restaurant. Add them to `university-offices-and-contacts` once someone confirms they belong to the University?
18. **contact@iu.edu.sa:** quoted in 2021 and 2024 (c6 10.1, c5 #16) alongside MESH's care@iu.edu.sa. Keep only care@? The 2021 extension numbers in c6 10.1 are not published.
19. **Library services:** thesis and manuscript requests, self-checkout and a WhatsApp news channel (c6 9.2, 2022). Worth a line in the library paragraph?

### 4.5 Academic
20. **New colleges from October 2025:** c3 #96 lists a College of Foreign Languages and Translation, an Applied College (vocational) and a Comparative Religions and Contemporary Thought department in Aqidah and Da'wah, besides the Law and Business colleges MESH already has. Neither c1, c2 nor the 1448 study plans mention the first three. Add them to the college table in `applying-to-the-islamic-university`?
21. **Common first year and its 2.50 GPA:** c6 1.9 (2023, two members) says Sharia new students had to reach 2.50 in a common first year to continue. MESH has a shared first year for Aqidah and Da'wah, Arabic and Business only. Does any GPA gate exist in 1448?
22. **Fiqh texts in the Sharia plan:** al-Rawd al-Murbi' (new plan, c6 2.3) or Umdat al-Fiqh then Bidayat al-Mujtahid (c5 #114, 2024)? Students abroad ask whether the comparative fiqh of the four schools is still taught. Not published.
23. **Changing major for non-scholarship students** (also writer A #10): c3 #23, #24 and c5 #49 to #52 give the rules students meet (after the first year, same track only, a GPA set by the target college, approval by both colleges, the request under Academic). Write a short FAQ that says scholarship students cannot change and describes the rest, or leave it?
24. **Shift change after add and drop:** the dean's approval (c6 3.8) or the Deanship of Admission and Registration (c5 #18)? Low.
25. **Summer eligibility:** only students past level 4? (c3 #100, low; writer C #9)
26. **Course withdrawal cap:** members in 2025 guessed five or six over the degree (c3 section 4); MESH has two a semester and six in all. No new evidence; still open (writer A #3, C #2).
27. **Evening study:** one member in 2025 said evening (مسائي) study is being phased out (c3 section 6). Worth checking before the next registration guide update.

### 4.6 Smaller checks
28. **Mat'am barcode (item 1.4):** may a student send his meal barcode to a friend, as the August 2024 notice allowed, or is that what "taking meals on two cards" forbids?
29. **Field training for Sharia and Law students at the courts** (c6 9.14, 2023, single member; c1 #148 on the Board of Grievances' Khabeer platform): worth a short section in `what-you-study-by-level`?
30. **Free dental care by supervised Taibah University dental students and charity medical caravans** (c6 16.5, 2020 and 2022): the doctors guide is held by its lane, so this is only noted.
