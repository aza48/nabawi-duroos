import type { SeedFaq, SeedGuide } from "./guides-2026";

/**
 * Guides and FAQs written in November 2026 to answer questions students asked that MESH could not
 * answer yet: packing before you fly, exams and attendance, the airport, the summer semester,
 * iqama renewal and graduation. Sources are listed in docs/research/gaps-2026-11.md, and facts that
 * could not be stated with authority are raised in docs/research/gaps-2026-11-questions.json.
 * The FAQs from eid-prayer-in-madinah onwards (Eid, health, passports, fines, cars, tajweed and
 * Blackboard) are sourced in docs/research/faq-gaps-2026-11-09.md.
 */
export const GUIDES_GAPS_2026_11: SeedGuide[] = [
  {
    slug: "what-to-bring-to-madinah",
    stage: "getting-started",
    title: "What to bring to Madinah: documents, money, clothes and medicines",
    summary: "A packing and paperwork list for students and families before they fly: documents and copies, money and cards, plugs and voltage, clothes for each season, medicines, and what to leave at home.",
    bodyHtml: `
<p>Checked 9 November 2026. Almost everything for daily life is easy to buy in Madinah. Documents, medicines and a few personal things are not, so they come first. The list works for students on the educational visa and for families coming on a visit visa or to join an iqama holder. Where the two differ, they are side by side.</p>
<h2>Documents</h2>
<p>Keep every original in your hand luggage, never in a checked bag.</p>
<ol>
<li><strong>Your passport</strong>, with at least six months left on it.</li>
<li><strong>Your visa.</strong> Save the e-visa on your phone and print one copy.</li>
<li><strong>Passport photos</strong> on a plain white background. Take a few printed copies, because offices and the student card desk ask for them.</li>
<li><strong>Copies of everything:</strong> a clear scan of each document in a folder on your phone and in cloud storage, plus two paper copies.</li>
<li><strong>Your border number</strong> (رقم الحدود), the entry number linked to your visa. Write it down when you land: you need it for your SIM, Absher and the bank.</li>
</ol>
<table><thead><tr><th>Topic</th><th>Students on the educational visa</th><th>Families and visitors</th></tr></thead><tbody>
<tr><td><strong>Your status</strong></td><td>Your final acceptance, your University number if you have one, and your Minhati login</td><td>Your visa, whether a tourist eVisa, a family visit visa or a dependant visa</td></tr>
<tr><td><strong>Certificates</strong></td><td>The originals of your school certificate and transcript, and every document you uploaded when you applied</td><td>Your marriage certificate and each child's birth certificate</td></tr>
<tr><td><strong>Children</strong></td><td>Not needed</td><td>Vaccination records and the latest school reports, for enrolling in a school or kindergarten</td></tr>
<tr><td><strong>Health cover</strong></td><td>The medical insurance details from your visa application</td><td>The insurance policy that comes with your visa. It covers emergencies only</td></tr>
<tr><td><strong>Driving</strong></td><td colspan="2">Your home licence and an International Driving Permit. The permit is issued only in your home country, so get it before you fly</td></tr>
</tbody></table>
<blockquote><p>Tip: Attesting documents is far easier at home than from Madinah. If your University, an institute or your children's school may ask for attested certificates, have them done before you leave.</p></blockquote>
<h2>Money and cards</h2>
<ul>
<li>The Saudi riyal is fixed at 3.75 riyals to one US dollar.</li>
<li>Bring enough for your first two months. Opening a bank account and receiving a first stipend both take time.</li>
<li>Carry two cards from different banks, and tell your bank you are moving. Foreign cards are sometimes blocked by bank security checks, so a second card saves the day.</li>
<li>Keep some cash for the first days. City buses do not take cash, but small shops and some taxis prefer it.</li>
<li>Cash, gold and jewellery above the customs limit must be declared when you arrive. Carry what you need for a few weeks and use cards for the rest.</li>
<li>Once you are settled, open a Saudi account. See <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
</ul>
<h2>Phone, plugs and power</h2>
<ul>
<li><strong>Plugs:</strong> type G, with three rectangular pins, the same as in the UK.</li>
<li><strong>Power:</strong> 230 volts at 60 hertz.</li>
<li><strong>Check the label on each charger.</strong> If it says 100 to 240 V, you only need a plug adapter. Appliances made only for 110 or 120 V, such as many hair dryers, kettles and shavers from North America, need a voltage converter. It is usually simpler to buy those here.</li>
<li><strong>Adapters and extension leads</strong> are sold in every supermarket and electronics shop.</li>
<li><strong>Unlock your phone</strong> before you travel, so a Saudi SIM works in it. Buy the SIM when you land.</li>
</ul>
<h2>Clothes for each season</h2>
<table><thead><tr><th>Months</th><th>What to pack</th></tr></thead><tbody>
<tr><td>November to February</td><td>Mild days and cold nights, especially in the open courtyards of the Haram. A warm jacket or jumper, socks and a warm layer for Fajr and Isha.</td></tr>
<tr><td>March to May</td><td>Pleasant in March, hot by May. Light clothes, a layer for March evenings, and a scarf for dusty days.</td></tr>
<tr><td>June to September</td><td>Very hot, with days around 44°C and more on the worst days. Loose, light cotton, sandals and a refillable water bottle.</td></tr>
<tr><td>October</td><td>Hot at first, cooling through the month. Summer clothes with one warmer layer.</td></tr>
</tbody></table>
<ul>
<li>Dress modestly at all times. Madinah is more conservative than Jeddah or Riyadh.</li>
<li><strong>Men:</strong> bring a few thobes to start. Every neighbourhood has tailors who make one for 100 to 300 SAR in 2 to 4 days.</li>
<li><strong>Women:</strong> women wear an abaya outdoors. Bring one or two for the first days. Many more are sold all over the city.</li>
<li><strong>Shoes:</strong> pick shoes that slip on and off easily. They come off at every masjid, and at the Haram they go on shelves.</li>
</ul>
<p>Month by month weather is in <a href="/guides/seasons-and-camping">Madinah by season, and where to camp</a>.</p>
<h2>Medicines and health</h2>
<ol>
<li><strong>Bring enough of your regular medicine for the first weeks,</strong> in the original boxes, in your hand luggage.</li>
<li><strong>Ask your doctor for a letter</strong> naming each medicine, the dose and the amount you carry. Prescriptions from other countries are not accepted here, so you will see a doctor in Madinah for a new one.</li>
<li><strong>Controlled medicines need a permit before you fly.</strong> Some painkillers, sleeping pills, anxiety medicines, stimulants and antidepressants contain narcotic or psychotropic substances. For these, apply for the Saudi Food and Drug Authority's traveller's permit in its Controlled Drugs System at <a href="https://cds.sfda.gov.sa/">cds.sfda.gov.sa</a>. Upload the prescription or medical report, give the name, strength and quantity of each medicine, and carry the approved permit with the medicine.</li>
<li><strong>Glasses:</strong> pack a spare pair and your lens prescription.</li>
<li><strong>Records:</strong> bring vaccination records for everyone in the family, and any medical reports for ongoing conditions.</li>
</ol>
<p>Where to find a doctor or pharmacy once you arrive: <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>
<h2>What to leave at home</h2>
<ul>
<li><strong>Alcohol</strong> of any kind, including duty-free bottles.</li>
<li><strong>Pork</strong> and anything made from it.</li>
<li><strong>Narcotics</strong>, and controlled medicines without the permit above.</li>
<li><strong>Indecent material</strong>, and anything that insults Islam.</li>
<li><strong>Heavy household goods.</strong> Furniture, kitchenware and bedding are cheap here, new and used. Leave the space in your suitcase for what you cannot buy.</li>
<li><strong>A big library.</strong> Madinah's bookshops and libraries hold most of what you will study, and you will want the luggage space for books on the way home.</li>
</ul>
<p>If you do carry restricted goods, declare them at the customs office at the airport when you land.</p>
<h2>Before you close the suitcase</h2>
<ol>
<li>Your name on the ticket, the visa and every University record matches your passport letter for letter.</li>
<li>Every document is scanned and saved in a folder you can open from any phone.</li>
<li>Your bank knows you are travelling, and both cards work abroad.</li>
<li>Your phone is unlocked.</li>
<li>Your medicines are packed with the doctor's letter, and the permit if you need one.</li>
<li>Every original is in your hand luggage.</li>
</ol>
<p>What to do once you land, in order: <a href="/guides/first-30-days-in-madinah">Your first 30 days in Madinah</a>. Getting from the airport: see <a href="/ask/airport-to-haram-and-university">How do I get from Madinah airport to the Haram or the University?</a></p>
<blockquote><p>Tip: Something missing from this list? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "exams-results-and-attendance",
    stage: "study",
    title: "Exams, results and attendance at the Islamic University",
    summary: "The absence limit with worked examples, the warnings, excusing an absence online, the exam timetable and exam-day rules, how grades work, seeing your results, missing a final, appealing a mark, withdrawing from a course, and what a failed course means.",
    bodyHtml: `
<p>Checked November 2026. These are the University's rules for degree students. The Ma'had applies the same absence limit, so read the attendance section whichever you are in, and ask the Ma'had office about its own exams. Where each screen sits in the Academic System is in <a href="/guides/university-student-system">Using the University's student system</a>.</p>
<h2>Attendance</h2>
<ul>
<li>You must attend at least <strong>75%</strong> of the lectures and practical sessions of each course.</li>
<li>Once your absence goes <strong>past 25%</strong> of a course, you are barred (محروم) from its final exam. Exactly 25% does not bar you. The course is recorded as failed, with the grade <strong>DN</strong> (ح).</li>
<li>The system warns you as your absence grows, at about <strong>10%</strong>, <strong>15%</strong> and <strong>20%</strong>. A warning is not a penalty. It tells you how close you are to the bar.</li>
<li>Your absence shows in the Academic System and the University app as soon as the teacher records it. Open <strong>Personal</strong>, then <strong>Absence</strong> (الغياب) to see, for each course, your absences, your late arrivals and your absence percentage. This is the record that counts. The attendance shown in Blackboard does not.</li>
<li><strong>Travel:</strong> travel only in the official holidays, or with your college's approval. Do not count on an absence for travel being excused, and travelling during the semester without permission can lead to dismissal.</li>
<li><strong>Twenty days in a row:</strong> missing 20 consecutive days without ta'jeel or i'tithaar closes your file (طي القيد). The semester still counts against you. A closed file can be reopened only once, within four semesters, with an accepted excuse.</li>
</ul>
<h3>Worked example</h3>
<p>Each absence is a share of all the lectures a course has in the semester. Take a two-hour course that meets once a week for 15 weeks:</p>
<table><thead><tr><th>Absences</th><th>Share of the course</th><th>What happens</th></tr></thead><tbody>
<tr><td>1</td><td>6.7%</td><td>Nothing yet</td></tr>
<tr><td>2</td><td>13.3%</td><td>Past the first warning</td></tr>
<tr><td>3</td><td>20%</td><td>Your last warning</td></tr>
<tr><td>4</td><td>26.7%</td><td>Barred from the final, grade DN</td></tr>
</tbody></table>
<p>So in a course like this you can miss three lectures at most, for any reason. A course that meets more often gives each absence a smaller share, but the rule is the same: past 25% you are barred. Check the percentage under <strong>Absence</strong> rather than counting from memory.</p>
<h3>Excusing an absence</h3>
<ol>
<li>Get proof for the day. For illness, that is a sick leave issued in Sehhaty (صحتي). The University Medical Center can issue one. A prescription on its own is not an excuse.</li>
<li>In the Academic System, open <strong>Academic</strong>, then <strong>Submit excuses for lecture absences</strong> (تقديم الأعذار عن غياب المحاضرات). Once an absence is recorded, a notice link also appears when you sign in.</li>
<li>Upload the proof for that course within the window the screen gives you. If your college announces its own excuse form as well, use it too.</li>
<li>If the course no longer appears on the screen, the window has passed. Send the excuse through Tawasul at <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a> to your college.</li>
<li>A reply takes from a few days to two weeks at busy times. If you hear nothing, follow it up with the wakeel of your college.</li>
</ol>
<p>An accepted excuse can lift a bar, but only if you attended at least half of the course.</p>
<blockquote><p>Tip: Teachers record absence in every lecture, and some take it from the very first week. Attend from day one, and keep your spare absences for real emergencies.</p></blockquote>
<h2>Before the exams</h2>
<ul>
<li>Your final exam timetable is in the Academic System under <strong>Academic</strong>, then <strong>Final Exams</strong>. It goes up between a week and a month before the exam period. The exam times are set by the University and differ from your class times.</li>
<li>The timetable marks each course you are barred from as barred (محروم), and each course you have withdrawn from as withdrawn.</li>
<li>Courses taught in several sections, and the Qur'an courses, usually have one unified final for the whole University.</li>
<li>Go by the Academic System only. Unofficial timetables and wrong dates circulate in the groups every semester.</li>
<li>Fill in the <strong>course evaluation</strong> as soon as it opens near the end of the semester. Your results stay hidden until you do. See <strong>Where results appear</strong> below.</li>
<li>For 1448, first semester finals run from 29 November to 14 December 2026, and second semester finals from 25 April to 10 May 2027. If a summer semester runs, its finals start on 27 July 2027. All the dates are in <a href="/guides/university-calendar-1448">The University calendar</a>.</li>
</ul>
<h2>On exam day</h2>
<ol>
<li>Be in the hall at least 10 minutes before the start.</li>
<li>Finals last between one and three hours.</li>
<li>No one may enter more than 30 minutes after the start.</li>
<li>No one may leave during the first 30 minutes.</li>
<li>Cheating is dealt with under the student conduct rules.</li>
</ol>
<h2>How grades work</h2>
<p>Every course is marked out of 100, and 60 is the pass mark. In most courses about 40 marks come from coursework, such as monthly tests, often taken on Blackboard, and 60 from the final exam. Your teacher gives the split at the start of the course. Your GPA is out of 5.</p>
<p>The University's distance programmes use a different split, 60 for coursework and 40 for the final: see <a href="/guides/studying-online-at-the-islamic-university">Studying online at the Islamic University</a>.</p>
<table><thead><tr><th>Grade</th><th>Mark</th><th>Points</th></tr></thead><tbody>
<tr><td>A+</td><td>95 to 100</td><td>5.00</td></tr>
<tr><td>A</td><td>90 to 94</td><td>4.75</td></tr>
<tr><td>B+</td><td>85 to 89</td><td>4.50</td></tr>
<tr><td>B</td><td>80 to 84</td><td>4.00</td></tr>
<tr><td>C+</td><td>75 to 79</td><td>3.50</td></tr>
<tr><td>C</td><td>70 to 74</td><td>3.00</td></tr>
<tr><td>D+</td><td>65 to 69</td><td>2.50</td></tr>
<tr><td>D</td><td>60 to 64</td><td>2.00</td></tr>
<tr><td>F</td><td>below 60</td><td>Fail</td></tr>
</tbody></table>
<ul>
<li><strong>DN</strong> means barred for absence, and counts as a fail.</li>
<li><strong>W</strong> means withdrawn, after an i'tithaar or a course withdrawal. It is not a fail and does not touch your GPA.</li>
<li><strong>Honours:</strong> first class needs a GPA of 4.75 to 5.00, and second class 4.25 to under 4.75. Both also need no failed course, finishing the degree within the time set for honours, and at least 60% of your credits taken at this University. A failed course, including a DN, rules out honours even after you pass it on a retake.</li>
</ul>
<h2>Where results appear</h2>
<ul>
<li><strong>Evaluate your courses first.</strong> Your grades, including your coursework marks, stay hidden until you complete the evaluation for each course: <strong>Academic</strong>, then <strong>Course evaluation</strong> (تقييم المقررات). Tap each course code and answer every statement. Your answers are anonymous. Evaluation opens near the end of the semester and closes again, so do it as soon as it opens.</li>
<li>Final results appear once your college has approved them, under <strong>Electronic Registration</strong> (التسجيل الإلكتروني), then <strong>Course results</strong> (نتائج المقررات). Choose the semester to see the final exam mark, the coursework mark, the total and the grade for each course. Grades come out course by course over several days.</li>
<li>Your <strong>academic record</strong> (السجل الأكاديمي), under Academic, shows every course with its hours, points and grade, and your semester and cumulative GPA. It is for your own reference, not an official document.</li>
<li>The courses still left in your plan are under Academic, then <strong>Remaining courses in the plan</strong> (المقررات المتبقية في الخطة).</li>
<li>A stamped transcript is free under <strong>Personal</strong>, then <strong>Official Documents</strong> (المستندات الرسمية). It opens in a pop-up, so allow pop-ups in your browser if nothing appears.</li>
<li>Check each result as soon as it appears. The time limit for an appeal starts from that day.</li>
</ul>
<h2>Missing a final exam</h2>
<p>Without an accepted excuse, you score zero in that exam and your course grade is worked out from your coursework, which in most courses means a fail. With an accepted excuse, such as a hospital report, you sit a substitute exam (اختبار بديل), no later than the end of the second week of the next semester.</p>
<ol>
<li>Get the proof on the day: a medical report or sick leave, or the official paper for whatever kept you away.</li>
<li>Tell your college straight away.</li>
<li>After the finals, apply in the Academic System: <strong>Academic</strong>, then <strong>Final exam excuse</strong> (تقديم الأعذار عن غياب الاختبار النهائي), then <strong>Request excuse from the final exams</strong> (طلب اعتذار عن الاختبارات النهائية). The screen opens only for a few days after the finals, so apply as soon as it opens. If your college also posts its own link, use it too.</li>
<li>Follow your request under <strong>Show and follow excuse requests</strong> (اظهار و متابعة طلبات الاعتذار).</li>
<li>In the first week of the next semester your college publishes the accepted names with the date, time and hall of each substitute exam. Check early, because the exams come quickly.</li>
<li>The course stays in your new timetable until you sit it. Your own teacher sets the substitute exam. Sit it on the date you are given.</li>
</ol>
<p>If the excuse is refused, the zero stands. Questions about excuses go to student care: <strong>920022042</strong> or <strong>care@iu.edu.sa</strong>.</p>
<h2>Appealing a mark</h2>
<p>A final exam is sat once. The only second sitting is the substitute exam for an accepted excuse, and there is no substitute exam for a course you failed. If you believe a final was marked wrongly, you can ask for it to be reviewed.</p>
<ol>
<li>Submit your request to the dean of your college <strong>within 15 days</strong> of the result being announced.</li>
<li>Give the course name and code, your section, the teacher, the mark you received, and why you believe it is wrong.</li>
<li>Keep a copy of the request and the date you handed it in.</li>
<li>Follow it up with your college, and watch your University email for the answer.</li>
</ol>
<h2>If a course is going badly</h2>
<p>Withdrawing from a course (الاعتذار عن مقرر) before the deadline gives a <strong>W</strong>, not a fail, and your GPA is not affected.</p>
<ol>
<li>In the Academic System, open <strong>Academic</strong>, then <strong>Course withdrawal</strong> (الإعتذار عن مقرر), then <strong>Withdrawal request</strong> (طلب إعتذار).</li>
<li>Keep attending the course until the request is decided. It is usually decided within a week, and the teacher's agreement is not needed.</li>
<li>Check the decision under <strong>Show withdrawn courses</strong> (إظهار المقررات المعتذر عنها). Once it is accepted, your name leaves the teacher's list and the course leaves your exam timetable, though it can still show in your class timetable.</li>
</ol>
<p>The limits:</p>
<ul>
<li>At most two courses in one semester, and six over your whole programme. You can withdraw from the same course only once.</li>
<li>Never below the minimum load, never in your first year, never in your expected graduation semester, and never from a course you are already barred from.</li>
<li>Only within the window in the calendar. Outside it the screen says the operation cannot be completed in this period. For the first semester of 1448 the window closed in early November 2026. For the second semester it runs from 20 December 2026 to 13 March 2027.</li>
</ul>
<p>Leaving a whole semester is ta'jeel or i'tithaar instead. See <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>. Simply stopping attending is not a withdrawal: after 20 days your file is closed.</p>
<h2>If you fail a course</h2>
<ul>
<li>The F or DN stays on your record and lowers your GPA.</li>
<li>You must pass every course in your plan to graduate, so register the failed course again in a later semester. A summer semester runs only in the years the University announces one. See <a href="/ask/summer-semester">Is there a summer semester?</a></li>
<li>A course that needs the failed one as a prerequisite does not appear for registration until you pass it. Plan the retake early, especially for courses that come in a chain, such as Qur'an 1 to 8.</li>
<li>Three semesters in a row with a cumulative GPA below the minimum for graduation lead to academic dismissal. So does going past the length of your programme plus half again.</li>
<li>A dismissed student can request one extra chance within the window in the calendar. For the second semester of 1448 the window is 11 to 14 December 2026.</li>
</ul>
<blockquote><p>Tip: Worried about a bar, a missed exam or a failed course? Speak to the wakeel of your college early, while there is still time to act. Still stuck? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "hajj-as-a-student",
    stage: "getting-settled",
    title: "Hajj from Madinah as a student or resident",
    summary: "How students and families living in Madinah register for Hajj in Nusuk: who can apply, iqama and Visitor ID side by side, packages and payment, what to prepare, the 1448 timeline around exams, and the penalties for Hajj without a permit.",
    bodyHtml: `
<p>Checked 9 November 2026. Hajj from inside the Kingdom is booked only in Nusuk, the official platform of the Ministry of Hajj and Umrah, with a licensed Hajj company listed there. This guide covers the official procedure: who can register, what to prepare, how the season runs, and what happens to anyone who goes without a permit. Hajj 1448 falls on 8 to 13 Dhul Hijjah, which is 14 to 19 May 2027, with the Day of Arafah on Saturday 15 May.</p>
<h2>Who can register</h2>
<p>Domestic Hajj is open to citizens and to residents who hold a valid residency. The applicant must be at least 15 years old by the Gregorian calendar and meet the health requirements, and a resident's iqama must stay valid until the end of Dhul Hijjah. When you register, Nusuk checks your record against the national systems, including whether you have performed Hajj before.</p>
<ul>
<li><strong>First Hajj first.</strong> People who have never performed Hajj book first. Those who have performed it register in a later phase, and only if places remain.</li>
<li><strong>Older residencies first.</strong> Residents whose iqama was issued more than a year ago are given priority.</li>
<li><strong>No visit visas.</strong> No visit visa of any kind, including the tourist eVisa, allows Hajj.</li>
</ul>
<table><thead><tr><th>Topic</th><th>Iqama</th><th>Visitor ID (educational visa)</th><th>Family on a visit visa</th></tr></thead><tbody>
<tr><td><strong>Domestic Hajj in Nusuk</strong></td><td>Yes, with an iqama valid to the end of Dhul Hijjah</td><td>Check your eligibility in Nusuk when registration opens, and ask the University through Tawasul before you pay anything</td><td>No</td></tr>
<tr><td><strong>Priority</strong></td><td>Higher once your iqama is more than a year old, and for a first Hajj</td><td>Shown in Nusuk if you are eligible</td><td>Not applicable</td></tr>
<tr><td><strong>Wife and children in the same booking</strong></td><td>Yes, if each holds a valid iqama</td><td>Only family members who are eligible in their own right</td><td>No</td></tr>
<tr><td><strong>Makkah in the Hajj months</strong></td><td>Entry only with a Hajj permit or a seasonal entry permit</td><td>The same rule</td><td>Must stay out of Makkah and the holy sites from 1 Dhul Qa'dah to 14 Dhul Hijjah</td></tr>
</tbody></table>
<p>The Visitor ID rules in general are in <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>
<h2>Packages and prices</h2>
<ul>
<li><strong>Only through Nusuk.</strong> Every domestic package is sold by a licensed company and booked in the Nusuk app or at <a href="https://www.nusuk.sa/">nusuk.sa</a>. A "campaign" sold by phone, social media or word of mouth outside Nusuk gives you no permit.</li>
<li><strong>Categories.</strong> The Ministry sets a small number of package categories each season. They differ in the camps in Mina and Arafat, the distance to the Jamarat and the services included, from an economy category up to upgraded camps with more services.</li>
<li><strong>Prices.</strong> Prices are published in Nusuk when package booking opens, with VAT included, and they change from season to season. Each package shows what it includes, so check whether travel from Madinah to Makkah is part of it. Often it is not.</li>
<li><strong>Paying.</strong> Booking issues a SADAD invoice, which you pay in your banking app within the time shown. An unpaid booking is cancelled. In 1447 the window was 72 hours, cut to 6 hours in the last days before Hajj.</li>
<li><strong>Cancelling.</strong> Cancelling early, before the permit is issued, costs nothing. Close to Hajj, nothing is refunded. Nusuk shows the rule for each stage, so read it before you pay.</li>
</ul>
<h2>What you need</h2>
<ol>
<li><strong>Your iqama</strong>, valid until the end of Dhul Hijjah 1448 (5 June 2027). If it expires before then, renew it first. On a Visitor ID, have your eligibility checked in Nusuk and with the University before you go further.</li>
<li><strong>A Nusuk account</strong> in your own name, with the mobile number registered to you in Absher.</li>
<li><strong>Vaccinations:</strong> meningitis (ACWY) and seasonal flu, given at a primary health centre before you book. Nusuk checks them.</li>
<li><strong>Your family's details</strong> if they come with you: each person's iqama number, date of birth and relationship to you. Relationships must already show in Absher, so add your wife and children there first.</li>
<li><strong>The full price</strong> of the package, ready to pay by SADAD.</li>
</ol>
<h2>Sisters and the mahram</h2>
<p>A woman travelling with her husband or another mahram adds him as a companion in the same booking, with the same company and the same package, and Nusuk checks the relationship against Absher. If the mahram has performed Hajj before, Nusuk offers a mahram exception request so that he can still accompany her. Ask the company about any other arrangement before you pay.</p>
<h2>The 1448 season, step by step</h2>
<p>The Ministry announces each season's dates in Nusuk. In 1447, registration opened on 6 Ramadan, package booking on 15 Ramadan, first-time pilgrims had priority until the end of Shawwal, and those who had performed Hajj before could register from 1 Dhul Qa'dah. For 1448, plan around these dates:</p>
<ol>
<li><strong>Now to January 2027:</strong> renew your iqama if it ends before June, add your family in Absher, and get vaccinated.</li>
<li><strong>From the start of Ramadan (8 February 2027):</strong> watch Nusuk for registration and book as soon as booking opens. Places for a first Hajj go first.</li>
<li><strong>Late Shawwal (early April 2027):</strong> entry to Makkah for anyone who does not live there needs a permit, and from 1 Dhul Qa'dah (8 April 2027) Umrah permits stop until after Hajj. Do any Umrah you plan before then. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</li>
<li><strong>25 April to 10 May 2027:</strong> second semester finals. Check your package's start date against your exam timetable before you book.</li>
<li><strong>11 to 22 May 2027:</strong> the Eid al-Adha holiday, which covers the days of Hajj. Classes resume on Sunday 23 May.</li>
</ol>
<p>All the University dates are in <a href="/guides/university-calendar-1448">The University calendar</a>.</p>
<h2>Hajj without a permit</h2>
<p>The Ministry of Interior enforces the permit rule every season, from 1 Dhul Qa'dah to 14 Dhul Hijjah.</p>
<ul>
<li>Anyone caught performing Hajj, or trying to, without a permit is fined up to 20,000 SAR.</li>
<li>Residents caught are deported and barred from entering the Kingdom for 10 years. For a student, that ends his studies.</li>
<li>Visit visa holders who enter or stay in Makkah or the holy sites during those weeks are fined.</li>
<li>Anyone who drives, houses, hides or applies for a visa for someone without a permit is fined up to 100,000 SAR for each person helped.</li>
<li>Violations can be reported on 911 in Makkah, Madinah, Riyadh and the Eastern Province, and on 999 elsewhere.</li>
</ul>
<blockquote><p>Tip: Not sure whether you can register this year, or which office to ask? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
];

export const FAQS_GAPS_2026_11: SeedFaq[] = [
  {
    slug: "airport-to-haram-and-university",
    category: "getting-started",
    question: "How do I get from Madinah airport to the Haram or the University?",
    answerHtml: `<p>Prince Mohammad bin Abdulaziz International Airport is about 20 km from Masjid an-Nabawi, a 20 to 30 minute drive.</p><ul><li><strong>Bus:</strong> the Madinah Bus airport route (400) runs round the clock between the airport and the Haram area. Cash is not accepted: tap a mada, Visa or Mastercard card or your phone, or pay in the Madinah Bus app, which shows the current fare.</li><li><strong>Ride apps:</strong> Bolt, Careem, Jeeny and Uber pick up at the airport. Expect about 40 to 80 SAR to the Haram, and more just after the prayers.</li><li><strong>Taxi:</strong> taxis wait outside arrivals. Agree the fare before you get in.</li></ul><p><strong>To the University:</strong> the University runs reception trips from the airport for arriving scholarship students. Before you fly, ask through Tawasul whether one is arranged for your flight. Otherwise a ride app is the simplest way to the campus.</p><p>Buy a Saudi SIM at the airport first, so the ride apps work. The Haramain train does not serve Madinah airport. More in <a href="/guides/getting-around">Getting around Madinah</a> and <a href="/guides/haramain-train-and-city-buses">The Haramain train and Madinah buses</a>.</p>`,
    tags: ["airport", "taxi", "uber", "careem", "bus", "arrival", "transport"],
  },
  {
    slug: "summer-semester",
    category: "university",
    question: "Is there a summer semester at the Islamic University?",
    answerHtml: `<p>Not every year. A summer semester runs only in the years the University announces one, and none ran in the summer of 2026, although the calendar had listed one. The 1448 calendar again lists a summer semester, from Sunday 6 June 2027 (1 Muharram 1449) with finals from Tuesday 27 July 2027, but it runs only if the University confirms it. Do not plan your graduation around it. There is no summer semester for the distance programmes.</p><p>When a summer semester runs, it works like this:</p><ul><li>The Deanship of Admission and Registration first asks students which courses they want, and opens only the courses enough students ask for. Not every course runs.</li><li>You then register your summer courses in the Academic System, under <strong>Drop and add</strong>, like any semester, and press <strong>Confirm</strong> (تثبيت).</li><li>You can take at most 12 credit hours.</li><li>The absence limit applies in full: past 25% you are barred. Register only if you will attend.</li></ul><p>Students use it to retake a failed course or catch up after an i'tithaar. If you are counting on one, ask your college early and register the course again in the next regular semester if no summer runs. All the dates are in <a href="/guides/university-calendar-1448">The University calendar</a>, and how failed courses work is in <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>`,
    tags: ["summer", "semester", "retake", "calendar", "courses"],
  },
  {
    slug: "student-iqama-renewal",
    category: "university",
    question: "Who renews my student iqama, and what do I need to do?",
    answerHtml: `<p><strong>With a student iqama:</strong> you do not renew it yourself. The University's Travel Management (إدارة السفر) renews student iqamas through the Muqeem system, or through its Reception Unit for some nationalities. Your part is to keep your file clear, because a renewal is held up by:</p><ul><li>unpaid traffic fines</li><li>children who have not been added to your iqama</li><li>unpaid fines for a late birth certificate</li><li>an expired visa on your file</li></ul><ol><li>Check your iqama's expiry date in Absher every month, and your family's under Family Members Services.</li><li>Pay any traffic fines in your banking app as soon as they appear.</li><li>Add newborn children to your iqama in good time. See <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, and dependent fees</a>.</li><li>If the expiry date is close and nothing has changed, or it has already passed, send a request to Travel Management through Tawasul straight away.</li></ol><p>Your wife's and children's iqamas are yours to renew in Absher, and an iqama renewed more than 3 days after it expires is fined 500 SAR the first time. See <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a>.</p><p><strong>On a Visitor ID:</strong> you have no iqama to renew. Your educational visa is renewed each year, and you ask the University about it through Tawasul. See <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>`,
    tags: ["iqama", "renewal", "muqeem", "travel management", "visitor id", "expired"],
  },
  {
    slug: "how-many-classes-can-i-miss",
    category: "university",
    question: "How many classes can I miss at the University?",
    answerHtml: `<p>Up to a quarter of each course. Once your absence goes past 25%, you are barred from that course's final exam and the course is recorded as failed, with the grade DN. The system warns you at about 10%, 15% and 20%.</p><p><strong>Worked example:</strong> in a two-hour course that meets once a week for 15 weeks, each absence is about 6.7%. The 2nd absence passes the first warning, the 3rd is your last warning, and the 4th (26.7%) bars you. Check your own percentage in the Academic System under <strong>Personal</strong>, then <strong>Absence</strong> (الغياب). That record counts, not Blackboard's.</p><p><strong>Excuses</strong> are uploaded online: Academic System, <strong>Academic</strong>, then <strong>Submit excuses for lecture absences</strong> (تقديم الأعذار عن غياب المحاضرات), within the window on the screen. For illness you need a sick leave in Sehhaty. If the window has passed, send it through Tawasul to your college. An accepted excuse can lift a bar only if you attended at least half of the course. Do not expect an absence for travel to be excused, so travel only in the official holidays or with your college's approval.</p><p>Missing 20 days in a row without ta'jeel or i'tithaar closes your file. Details: <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>`,
    tags: ["absence", "attendance", "hirman", "barred", "ghiyab", "DN", "excuse", "warning"],
  },
  {
    slug: "exam-results-where",
    category: "university",
    question: "Where do I see my exam results and my GPA?",
    answerHtml: `<p>In the Academic System, but first <strong>evaluate your courses</strong>: your grades, coursework marks included, stay hidden until you complete the evaluation for each course under <strong>Academic</strong>, then <strong>Course evaluation</strong> (تقييم المقررات). It opens near the end of the semester and closes again, so do it as soon as it opens.</p><ul><li><strong>Your grades:</strong> <strong>Electronic Registration</strong>, then <strong>Course results</strong> (نتائج المقررات). Choose the semester to see the final exam mark, coursework, total and grade for each course, once your college has approved them.</li><li><strong>Your GPA:</strong> your semester and cumulative GPA show on your dashboard when you sign in, and in your <strong>academic record</strong> (السجل الأكاديمي) under Academic. The academic record is for your own reference, not an official document.</li><li><strong>What is left:</strong> Academic, then <strong>Remaining courses in the plan</strong> (المقررات المتبقية في الخطة).</li><li><strong>An official transcript:</strong> free and stamped under <strong>Personal</strong>, then <strong>Official Documents</strong>. Allow pop-ups if it does not open.</li></ul><p>To appeal a mark, apply to the dean of your college within 15 days of the result. See <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>`,
    tags: ["results", "grades", "gpa", "transcript", "exams", "evaluation"],
  },
  {
    slug: "missed-a-final-exam",
    category: "university",
    question: "I missed a final exam. What happens now?",
    answerHtml: `<p>Without an accepted excuse, you score zero in that exam and your grade is worked out from your coursework, which in most courses means a fail. With an accepted excuse, such as a hospital report or a sick leave in Sehhaty, you sit a substitute exam no later than the end of the second week of the next semester.</p><ol><li>Get the proof on the day and tell your college straight away.</li><li>After the finals, apply in the Academic System: <strong>Academic</strong>, then <strong>Final exam excuse</strong> (تقديم الأعذار عن غياب الاختبار النهائي), then <strong>Request excuse from the final exams</strong>. It opens for a few days only, so apply at once. Follow it under <strong>Show and follow excuse requests</strong>.</li><li>In the first week of the next semester your college publishes the accepted names with the date, time and hall of each substitute exam. The course stays in your timetable until you sit it.</li></ol><p>If the excuse is refused, the zero stands. Questions: student care on <strong>920022042</strong> or <strong>care@iu.edu.sa</strong>. See <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>`,
    tags: ["exam", "missed", "excuse", "substitute exam", "finals"],
  },
  {
    slug: "failed-a-course",
    category: "university",
    question: "I failed a course. What does it mean for me?",
    answerHtml: `<p>The F stays on your record and lowers your GPA, and you must pass the course to graduate, so register it again in a later semester. A summer semester runs only in the years the University announces one, so do not count on it. Any course that needs the failed one as a prerequisite does not appear for registration until you pass it.</p><p>A final exam is sat once: there is no substitute exam for a failed course, only for a missed exam with an accepted excuse. If you believe the paper was marked wrongly, apply to the dean of your college within 15 days of the result. A failed course, including a DN for absence, also rules out honours, even after you pass it on a retake.</p><p>Three semesters in a row with a cumulative GPA below the minimum for graduation lead to academic dismissal, so speak to the wakeel of your college early. See <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>`,
    tags: ["fail", "failed", "retake", "resit", "gpa", "dismissal"],
  },
  {
    slug: "power-plugs-and-voltage",
    category: "getting-started",
    question: "What plugs and voltage does Saudi Arabia use?",
    answerHtml: `<p>Type G plugs, with three rectangular pins, the same as in the UK, at 230 volts and 60 hertz. Chargers labelled 100 to 240 V only need a plug adapter. Appliances made only for 110 or 120 V, such as many hair dryers and kettles from North America, need a voltage converter, so it is usually simpler to buy those here. Adapters are sold in every supermarket. More in <a href="/guides/what-to-bring-to-madinah">What to bring to Madinah</a>.</p>`,
    tags: ["plug", "adapter", "voltage", "electricity", "packing"],
  },
  {
    slug: "bringing-medicine-into-saudi",
    category: "getting-started",
    question: "Can I bring my regular medicine to Saudi Arabia?",
    answerHtml: `<p>Yes. Bring enough for the first weeks, in the original boxes, in your hand luggage, with a letter from your doctor naming each medicine, the dose and the amount. Medicines with narcotic or psychotropic substances, such as some painkillers, sleeping pills, anxiety medicines, stimulants and antidepressants, also need the Saudi Food and Drug Authority's traveller's permit before you fly. Apply in its Controlled Drugs System at <a href="https://cds.sfda.gov.sa/">cds.sfda.gov.sa</a> and carry the approved permit. Prescriptions from other countries are not accepted by pharmacies here, so see a doctor in Madinah for a new one. More in <a href="/guides/what-to-bring-to-madinah">What to bring to Madinah</a>.</p>`,
    tags: ["medicine", "sfda", "permit", "prescription", "packing", "customs"],
  },
  {
    slug: "graduation-certificate-name-check",
    category: "leaving",
    question: "How do I make sure my name is right on my degree certificate?",
    answerHtml: `<p>Check it before the certificate is printed. In the Academic System, open <strong>Graduation procedures</strong> (اجراءات التخرج) and use the graduation certificate data check (تدقيق بيانات شهادة التخرج), which shows the personal and academic details that will be printed. Do it during your final semester.</p><p>To correct your name, open <strong>Personal</strong>, then <strong>Update name in Arabic</strong> (تحديث الاسم باللغة العربية) or <strong>Update name in English</strong> (تحديث الاسم باللغة الانجليزية).</p><ul><li>Enter four parts, first name, father's, grandfather's and family name, exactly as in your passport. In Arabic, use Arabic letters only, with no space or hyphen in the family name.</li><li>Upload a copy of your passport, confirm the name and tap <strong>Save</strong> (حفظ).</li><li>The change shows once the Deanship of Admission and Registration has checked that your Arabic and English names match. If it does not go through, send a request to the Deanship through Tawasul.</li></ul><p>A wrong date or place of birth, or nationality, is corrected under Personal, then <strong>Nationality and place of birth correction request</strong>, with your passport and iqama uploaded together as one PDF.</p><p>Once your graduation document has been issued, a corrected name means a reissued document, and adding a missing Arabic name means paying for a replacement document. The rest of the steps are in <a href="/guides/graduate-procedures">Graduating</a>.</p>`,
    tags: ["graduation", "certificate", "degree", "name", "passport"],
  },
  {
    slug: "degree-collection-and-verification",
    category: "leaving",
    question: "Can someone else collect my degree certificate, and how can an employer check it?",
    answerHtml: `<p><strong>Collecting:</strong> your certificate is ready once your status in the Academic System has changed from Regular to Graduate. Book a collection appointment at <a href="https://services.iu.edu.sa/Appointment">services.iu.edu.sa/Appointment</a> with your University number, and collect it from the Deanship of Admission and Registration.</p><p><strong>Someone else collecting:</strong> yes. Fill in the Deanship of Admission and Registration's official form for authorising someone to collect your graduation documents, send it through Tawasul to the Deanship first, then give a printed copy to the person collecting. Someone can also collect your graduation bisht and gifts for you: send a request through Tawasul with your name, student card number and graduation date, and the full name and student card number of the person collecting. See <a href="/guides/graduate-procedures">Graduating</a>.</p><p><strong>Checking:</strong> employers, other universities and anyone you name can check an Islamic University degree on the University's public graduation document verification service (التحقق من وثيقة التخرج) at eduportal.iu.edu.sa. It is also listed on the national platform, my.gov.sa. A lost certificate needs a replacement (بدل فاقد): ask the Deanship through Tawasul.</p>`,
    tags: ["graduation", "certificate", "degree", "verification", "authorisation", "proxy"],
  },
  {
    slug: "online-arabic-year-to-madinah",
    category: "university",
    question: "I was offered a year of online Arabic. How do I get to Madinah after it?",
    answerHtml: `<p>The online year is offered to some applicants who hold initial acceptance for the Arabic Institute (Ma'had) but cannot be given a place in Madinah that year. It is free and lasts one academic year at most.</p><ul><li><strong>It does not lead to a visa by itself.</strong> To study in Madinah afterwards, submit a new application on Study in Saudi as soon as the portal next opens, even while you are still studying online. Without it, the University cannot issue your educational visa, however well you do.</li><li><strong>Priority is not a place.</strong> Attending and passing the online year gives you priority with the University, but you still need the Ministry's final acceptance before any visa is issued.</li><li><strong>No stipend</strong> is paid while you study online. The stipend starts once you are studying in Madinah on a full scholarship. See <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</li><li><strong>Already with the Ministry?</strong> If Minhati shows your status as initial acceptance on the Study in Saudi portal, you do not need the online stage. Wait for the Ministry's final decision.</li></ul><p>The full steps are in <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>. Questions about your own file? Message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p>`,
    tags: ["online", "arabic", "mahad", "study in saudi", "priority", "application", "stipend"],
  },
  {
    slug: "eid-prayer-in-madinah",
    category: "duroos",
    question: "Where is the Eid prayer held in Madinah, and when does it start?",
    answerHtml: `<p>At Masjid an-Nabawi, and in hundreds of masjids and open-air Eid musallas (مصليات العيد) across the city, so there is one near every neighbourhood. The prayer starts 15 minutes after sunrise by the Umm al-Qura calendar: for Eid al-Fitr 1447 that was 6:40 am in Madinah. The Ministry of Islamic Affairs publishes each city's exact time before Eid, and the day itself is confirmed the evening before, when the sighting of the new moon is announced. In 1448, Eid al-Fitr falls on Tuesday 9 March 2027 and Eid al-Adha on Sunday 16 May 2027 by the Umm al-Qura calendar.</p><ul><li><strong>Arrive early.</strong> At the Haram the courtyards fill well before sunrise and the rows spread into the streets around the masjid. Many people come for Fajr and stay.</li><li><strong>Sisters</strong> pray in the women's sections, which fill first. See <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>.</li><li><strong>Families:</strong> agree a meeting point before you separate, because phone signal drops in the crowds, and bring a prayer mat for the courtyards and streets.</li></ul><p>More in <a href="/guides/masjid-an-nabawi-first-visit">Visiting Masjid an-Nabawi</a>.</p>`,
    tags: ["eid", "eid prayer", "salat al-eid", "musalla", "haram", "eid al-fitr", "eid al-adha"],
  },
  {
    slug: "female-doctor",
    category: "family",
    question: "Can I see a female doctor in Madinah?",
    answerHtml: `<p>Yes. Women doctors work in most hospitals and in many clinics, above all in women's health, obstetrics and children's clinics.</p><ul><li><strong>When you book</strong> by phone, in a hospital's app or at reception, ask for a female doctor (طبيبة) before the appointment is confirmed.</li><li><strong>At a government health centre,</strong> book in the Sehhaty app, then ask at reception for a female doctor when you arrive, before you go in.</li><li><strong>During an examination</strong> by a male doctor, you may ask for a woman, such as a nurse, to be present. This is one of every patient's rights.</li><li><strong>In an emergency</strong> you are seen by the doctor on duty, so ask for a woman nurse to stay with you.</li></ul><p>Hospitals, clinics and health apps are in <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>, and maternity care in <a href="/guides/having-a-baby-in-madinah">Having a baby in Madinah</a>.</p>`,
    tags: ["female doctor", "women doctor", "tabiba", "sisters", "health", "clinic", "sehhaty"],
  },
  {
    slug: "baby-vaccinations",
    category: "family",
    question: "How do I get my baby vaccinated in Madinah?",
    answerHtml: `<p>Babies here follow the Ministry of Health's national immunisation schedule. The first vaccines are given at birth, in the hospital, before you take your baby home. The next doses start at two months and continue at set ages through the first 18 months, with more before school.</p><ol><li><strong>Before you leave the hospital,</strong> ask which vaccines your baby was given, and keep the record.</li><li><strong>Register at your nearest primary health care centre</strong> (مركز الرعاية الصحية الأولية).</li><li><strong>Add your baby to your file in Absher,</strong> then add the baby as a dependant in Sehhaty. The birth certificate, passport and iqama steps are in <a href="/guides/having-a-baby-in-madinah#after-the-birth-papers-step-by-step">Having a baby in Madinah</a>.</li><li><strong>Book each dose</strong> in Sehhaty or at the centre. Sehhaty keeps your child's vaccination record and certificate, in Arabic and English, in place of the old paper card, and reminds you before each dose is due.</li></ol><p>Older children who started their vaccines abroad: take their records to the centre so the remaining doses can be planned. A baby born abroad also needs a polio vaccination certificate for the iqama request, and schools ask for the vaccination record when you enrol. More in <a href="/guides/having-a-baby-in-madinah">Having a baby in Madinah</a>.</p>`,
    tags: ["vaccination", "vaccine", "immunisation", "baby", "newborn", "sehhaty", "primary health care"],
  },
  {
    slug: "renew-passport-in-saudi",
    category: "getting-settled",
    question: "My passport is expiring. How do I renew it in Saudi Arabia, and what must I update afterwards?",
    answerHtml: `<p>Renew it at your country's embassy in Riyadh or its consulate in Jeddah. Read their website for the steps, because many take applications online or by post. Start well before the expiry date, keep the old passport when the new one arrives, and then move your Saudi records to the new passport.</p><table><thead><tr><th>Topic</th><th>Iqama</th><th>Visitor ID</th></tr></thead><tbody><tr><td><strong>Your own record</strong></td><td>Your sponsor moves your iqama to the new passport. For a student iqama, that is the University's Travel Management: send it a copy of the new passport through Tawasul.</td><td>Your Visitor ID is tied to your passport. Send a copy of the new passport to the Deanship of Admission and Registration through Tawasul, subject Educational visa.</td></tr><tr><td><strong>Your family</strong></td><td>As head of the family, update each dependant's passport in Absher, under Passports, then Resident Identity services, then Update passport information, with the new passport's number, issue date and expiry date. Absher accepts it once the old passport has 12 months or less left, only while the family member is inside Saudi Arabia, and not while traffic fines are unpaid. It shows the fee before you pay.</td><td>Family on a multiple-entry visit visa: update the passport number on the visa in Absher.</td></tr></tbody></table><p><strong>A family member who is abroad</strong> travels back on the new passport and carries the old one. The entry stamp goes in the new passport, and you update it in Absher once they are inside.</p><p><strong>If Absher refuses the update,</strong> send a request through Absher's own Tawasul, which is the Ministry of Interior's service and not the University's: My Services, then Passports, then Tawasul, then New request, and choose the sector for updating and extending passports. Attach one PDF under 1 MB with a screenshot of the error, the old passport, any Saudi visa in it, the new passport and the family member's iqama. Name the file with one word and no spaces, write the iqama number and border number in the description, and send one request for each person. It is usually done within a day. You can also book a Jawazat appointment for Resident services and take the free passport update form (نقل معلومات, Naqal Maloomat), both passports and the iqama: Jawazat updates the record at the counter, and a text message confirms it once Absher shows the new passport, within two days.</p><p><strong>To check,</strong> open the family member under Family Members Services, then Visa Services, then More Details. The new expiry date shows once the update has gone through.</p><p><strong>Lost your passport?</strong> Get a police report, report the loss in Absher, then apply to your embassy: see <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>.</p><p>Then update your bank and your mobile operator, and check that your name on Etimad still matches the new passport letter for letter. Book no travel until the new passport shows in Absher. See <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a> and <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>`,
    tags: ["passport", "renewal", "embassy", "consulate", "absher", "iqama", "visitor id"],
  },
  {
    slug: "traffic-fines",
    category: "getting-settled",
    question: "How do I check and pay traffic fines?",
    answerHtml: `<ul><li><strong>Check:</strong> your fines show in Absher under traffic violations, with the date, place and amount, on an iqama or a Visitor ID. Check every month, because camera fines arrive without a paper ticket.</li><li><strong>Pay:</strong> in your banking app under SADAD government payments, traffic violations, or in Absher.</li><li><strong>Object:</strong> if a fine is wrong, object to it in Absher within 30 days of the violation. After that, the fine stands.</li></ul><h3>Objecting to a fine</h3><ol><li>Check the date, time and place of the violation and the camera photo. Sign in at absher.sa on a computer to see the photo.</li><li>Open Services, then Traffic, then <strong>Dispute traffic violation</strong>, and accept the terms.</li><li>Open the fine, choose the reason and explain in a few plain words. Leave out punctuation and symbols, or the form will not send.</li><li>Submit, then follow it in the list of objected violations on the same page. An accepted objection removes the fine within about a week.</li><li>Still "in process" after 7 days? Book a traffic department (Muroor) appointment in Absher with the reason إجراءات الهيئات المرورية and take the violation number with you.</li></ol><p>Object only when you are sure. Rejected objections count against you: after 5 rejections in a year, you cannot object to any more fines that year.</p><p>Pay as soon as a fine appears. Unpaid fines stop Absher issuing an exit and re-entry visa, hold up the renewal of a student iqama, block updating a family member's passport, and block transferring a car to your name. See <a href="/ask/student-iqama-renewal">Who renews my student iqama?</a> and <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, and dependent fees</a>.</p>`,
    tags: ["traffic", "fines", "violations", "mukhalafat", "absher", "sadad", "saher"],
  },
  {
    slug: "buying-a-used-car",
    category: "getting-settled",
    question: "Can I buy a used car as a student, and what do I need?",
    answerHtml: `<p><strong>With an iqama,</strong> yes. Used cars are sold on classified apps and websites and at used car showrooms. Residents may own at most two private cars at a time.</p><ol><li><strong>Check the car before you pay:</strong> a valid registration (istimara), a valid periodic technical inspection (الفحص الفني الدوري), and no fines on the car. Have a mechanic look at it too.</li><li><strong>Insure it in your name</strong> before the transfer. Absher does not complete a sale without valid insurance.</li><li><strong>Transfer it in Absher.</strong> Both of you need active Absher accounts, and the transfer is refused while there are unpaid fines on you or the car. Absher holds your money until you have the car:<ol><li>You pay the 150 SAR transfer fee first, in your banking app under Government payments, then Motor vehicles, then Transfer of ownership, with the seller's iqama number, the car's sequence number (on the istimara) and your iqama number.</li><li>The seller opens Vehicles, then Services, then Vehicle Ownership Transfer, chooses Seller, and enters the car, the price, your iqama number, your date of birth and his IBAN.</li><li>You open the same service, choose Buyer, accept the request and enter your own IBAN, which is refunded if the sale is cancelled. Accept within one hour of the seller creating it, because the request expires after that.</li><li>Absher shows an account number. Pay the price into it within 72 hours, in banking hours. A further 230 SAR fee is already added to the price shown, so the transfer costs 380 SAR in all. The price must be between 500 and 200,000 SAR.</li><li>When the seller hands you the car, Absher sends you a code. Give it to the seller only once the car and its keys are in your hands: he enters it, and Absher releases the money to him.</li></ol></li><li><strong>Check</strong> that the car shows under your vehicles in Absher, then order the new istimara by post or print it at the traffic department: see <a href="/guides/drivers-license">Driving in Madinah</a>. If Absher keeps refusing the transfer, a car transfer office completes it by hand.</li></ol><p>Swap your home licence for a Saudi one as well: see <a href="/guides/drivers-license">Getting a Saudi driving licence</a>.</p><p><strong>On a Visitor ID,</strong> owning or registering a car needs an iqama, so you cannot buy one in your own name. You can drive on your home licence while Saudi Arabia recognises it, and rent a car: see <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>`,
    tags: ["car", "used car", "buy", "absher", "ownership transfer", "insurance", "inspection", "istimara"],
  },
  {
    slug: "learn-tajweed-in-madinah",
    category: "duroos",
    question: "Where can I learn tajweed in Madinah?",
    answerHtml: `<p>Start with the Haram. Masjid an-Nabawi runs free Qur'an halaqat for men and women, and correcting recitation (تصحيح التلاوة) is one of their programmes, alongside memorisation and the mutun. Classes meet at set times around the prayers, in person at the masjid, and some are taught remotely.</p><ol><li>Open <a href="https://qm.edu.sa/">qm.edu.sa</a> and choose the men's or the women's section.</li><li>Register at <a href="https://reg.qm.edu.sa/">reg.qm.edu.sa</a> and wait for your placement.</li><li>Attend on the days and times you are given. Teaching is in Arabic.</li></ol><p>See <a href="/programs/nabawi-halaqat">Qur'an and mutun halaqat in the Haram</a>. Several institutes and marakiz in the city also teach the Qur'an and tajweed, some free and some paid: all are on <a href="/programs">Study in Madinah</a>. Sisters: see <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a> and <a href="/guides/sisters-studying-in-madinah">Where sisters can study</a>.</p>`,
    tags: ["tajweed", "quran", "recitation", "halaqat", "haram", "qm.edu.sa", "sisters"],
  },
  {
    slug: "blackboard-login",
    category: "university",
    question: "How do I log in to Blackboard, and what do I do if it fails?",
    answerHtml: `<p>Sign in at <a href="https://iu.edu.sa/">iu.edu.sa</a>: tap the user account icon, then sign in through Nafath, or with your University number, your password and the verification code (رمز التحقق) shown on the screen. Then tap the <strong>Zidni</strong> (زدني) tile, and Blackboard opens without a second sign-in.</p><p><strong>On a phone:</strong> in the Blackboard app, search for Islamic University of Madinah, tap <strong>Continue with Web-Login</strong>, and sign in with your University number and password. If the app keeps logging you out, use the browser instead.</p><p><strong>Forgot the Blackboard password:</strong> on the Web Login page tap <strong>Forgot your password?</strong> (هل نسيت كلمة المرور؟). Give your first and family name exactly as registered, with your University number or your email, and a reset link arrives by email. Your old password works until you change it.</p><p>If it still fails:</p><ol><li>Try signing in to the Academic System with the same login. If that fails too, the problem is your University account, not Blackboard.</li><li>If the Nafath request does not reach your phone, sign in with your University number and password instead. If the code on the screen is hard to read, tap the refresh arrow for a new one.</li><li>Try a private window, another browser, or the app.</li><li>Still stuck? Send a request through Tawasul at <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a> to the E-Learning Center with a screenshot of the error, or use the guest form if you cannot sign in. For Blackboard email <strong>bb@iu.edu.sa</strong>. For passwords and your University account email <strong>it.care@iu.edu.sa</strong> or call the Deanship of IT and E-Learning on <strong>+966 14 847 1856</strong>.</li></ol><p>Never share your password or a code, and never open links posted in class chats: see <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat</a>. Every other screen is in <a href="/guides/university-student-system">Using the University's student system</a>.</p>`,
    tags: ["blackboard", "login", "sso", "password", "nafath", "e-learning", "zidni"],
  },
];
