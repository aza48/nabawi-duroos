import type { SeedGuide } from "./guides-2026";

/**
 * Admin lane guides on University life, November 2026: the first semester, the stipend card,
 * getting to the Haram, paid housing in Unit 13, the Student Fund and your room, and lost documents.
 * Sources and confidence per fact are in docs/research/telegram-iu-2026-11/ (c1 to c4, c7),
 * docs/research/chats-2026-11/ and docs/research/gomedine-2026-11/. Registered in sync.ts; topics in src/lib/guide-topics.ts.
 */
export const GUIDES_ADMIN_LIFE_2026_11: SeedGuide[] = [
  {
    slug: "your-first-semester-week-by-week",
    stage: "getting-started",
    title: "Your first semester at the University, week by week",
    summary: "What happens in a new student's first semester and when: orientation and your two cards, reading your fixed timetable, the attendance rules, the first stipend, monthly tests, course evaluation and the final exams, with the dates of the first semester of 1448.",
    bodyHtml: `
<p>Checked 9 November 2026. Every first semester at the Islamic University follows the same pattern. This guide walks you through it week by week, using the first semester of 1448 as the example, so you know what is coming before it arrives. It starts where <a href="/guides/new-student-steps">First steps for new students</a> ends: your SIM, Absher, Nafath and Visitor ID are already done.</p>
<h2>The semester at a glance</h2>
<table><thead><tr><th>When</th><th>What happens</th><th>First semester of 1448</th></tr></thead><tbody>
<tr><td>The week before classes</td><td>Timetables are released. Returning students add and drop courses</td><td>Timetables on Monday 10 August, add and drop from Tuesday 11 to Saturday 15 August 2026</td></tr>
<tr><td>Week 1</td><td>Classes start. Orientation for new students, where you collect your student card and your stipend card</td><td>Classes from Sunday 16 August, orientation on Monday 17 August 2026</td></tr>
<tr><td>Weeks 2 to 5</td><td>Course descriptions, books, Blackboard and the first attendance records</td><td>17 August to 17 September</td></tr>
<tr><td>Week 6</td><td>National Day holiday, the only holiday in the first semester</td><td>Wednesday 23 and Thursday 24 September 2026, joined to the weekend</td></tr>
<tr><td>Month 2</td><td>Your first stipend arrives, with two months paid together</td><td>Saturday 19 and Sunday 20 September 2026</td></tr>
<tr><td>Weeks 4 to 14</td><td>Monthly tests, and absence warnings for anyone missing classes</td><td>September to November</td></tr>
<tr><td>Week 12</td><td>Last day for returning students to withdraw from a course or the semester</td><td>Thursday 5 November 2026</td></tr>
<tr><td>Weeks 14 to 15</td><td>The final exam timetable appears. Fill in your course evaluations</td><td>November</td></tr>
<tr><td>Weeks 16 to 17</td><td>Final exams</td><td>From Sunday 29 November 2026</td></tr>
<tr><td>Semester break</td><td>Short break, then the second semester</td><td>Break 15 to 19 December, second semester from Sunday 20 December 2026</td></tr>
</tbody></table>
<p>Every date for the year is in <a href="/guides/university-calendar-1448">The University calendar</a>.</p>
<h2>Week 1: orientation and your two cards</h2>
<ul>
<li><strong>Orientation</strong> for new students is held in the first week and announced on the University's official X account. In 1448 it was on Monday 17 August, in the Salam hall (Qa'at as-Salam).</li>
<li><strong>You collect two cards there:</strong> your University card and your stipend bank card. Bring a 4x6 personal photo, taken at a proper photo studio.</li>
<li><strong>Your University ID is also digital,</strong> in the Tawakkalna app. The printed card is useful on campus, and a lost one is replaced at Unit 22: see <a href="/guides/lost-your-iqama-passport-or-card">Lost your passport, iqama, phone or University card?</a></li>
<li><strong>The stipend card</strong> is an Al Rajhi card the University activates for you. The PIN is in the envelope. How to use it is in <a href="/guides/getting-your-stipend-off-the-university-card">Your University stipend card</a>.</li>
</ul>
<h2>Week 1: reading your timetable</h2>
<p>Your timetable is in the Academic System under <strong>Electronic Registration</strong> (التسجيل الإلكتروني), then <strong>Registered Courses</strong> (المقررات المسجلة), with a Print button. The University app shows the same timetable laid out by day. See <a href="/ask/find-my-timetable">Where do I find my class timetable?</a></p>
<table><thead><tr><th>In the timetable</th><th>What it means</th></tr></thead><tbody>
<tr><td>Day 1, 2, 3, 4, 5</td><td>Sunday, Monday, Tuesday, Wednesday, Thursday</td></tr>
<tr><td>Room</td><td>The building, by college. "Da'wah" means the College of Da'wah building</td></tr>
<tr><td>Section</td><td>Your group for that course, shown separately from the room</td></tr>
<tr><td>Instructor not set</td><td>The teacher has not been entered yet. It fills in during the first weeks</td></tr>
</tbody></table>
<ul>
<li><strong>Your first timetable is fixed.</strong> In the first semester the University gives every new student a ready-made timetable, and you cannot add, drop or withdraw from a course. From the second semester you choose your own sections and times in add and drop.</li>
<li><strong>Afternoon classes are normal.</strong> Many new students' timetables start at 1 pm.</li>
<li><strong>Go to every class from day one.</strong> Few teachers teach a full lesson in the first week, but some take attendance from the first day, and an absence counts the same in week 1 as in week 10.</li>
</ul>
<h2>Weeks 2 to 5: settling into your courses</h2>
<ul>
<li><strong>Course description:</strong> teachers hand out the course description (توصيف المقرر) in the first week or two. It lists the topics, the books and how the marks are split.</li>
<li><strong>Books:</strong> see <a href="/ask/muqarrarat">What are muqarrarat?</a></li>
<li><strong>Blackboard:</strong> class materials, monthly tests and announcements. If you cannot sign in, see <a href="/ask/blackboard-login">How do I sign in to Blackboard?</a></li>
<li><strong>Your study plan</strong> is in the Academic System under <strong>Academic</strong>, then <strong>Student Plan</strong> (خطة الطالب). It shows every course you will take, level by level, and what each needs first.</li>
<li><strong>Your academic advisor's</strong> name is under <strong>Academic</strong>, then <strong>Contact academic advisor</strong>. For an urgent problem go to the wakeel (vice dean) of your college.</li>
<li><strong>Meals:</strong> book the mat'am a month at a time. See <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</li>
</ul>
<h2>Attendance: the rule that catches new students</h2>
<p>Once your absence in a course goes past 25% of its hours, you are barred (محروم) from its final exam and the course is recorded as failed, with the grade DN.</p>
<ul>
<li><strong>Worked example:</strong> a course that meets for 2 hours a week over 15 weeks has 30 hours. Each missed lecture is 2 hours, or 6.7%. Three absences take you to 20%. The fourth takes you to 26.7%, past the limit, and you are barred.</li>
<li><strong>Warnings:</strong> the Academic System warns you as your absence climbs, at about 10%, 15% and 20%. Absence shows in the app as soon as the teacher records it.</li>
<li><strong>Excuses:</strong> when an absence is recorded, a link appears when you sign in. Upload your medical report or official excuse in the Academic System under <strong>Academic</strong>, then <strong>Submit excuses for lecture absences</strong> (تقديم الأعذار عن غياب المحاضرات), within the window it shows. If the window has closed, send it to your college through Tawasul.</li>
<li><strong>Medical excuses</strong> are accepted when they show in Sehhaty, and the University Medical Center can write one. Family occasions such as weddings are not accepted.</li>
</ul>
<p>The full rules are in <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>
<h2>Month 2: your first stipend</h2>
<ul>
<li><strong>Nothing is paid in your first month.</strong> In the second month the first two months arrive together. In 1448 new students were paid on 19 and 20 September 2026.</li>
<li>From then on the stipend usually lands between the 21st and the 25th of each month, and early before National Day, Founding Day and Eid.</li>
<li>Bring enough money from home to cover the first two months.</li>
<li>Moving the money to your own account, and fixing card problems, is in <a href="/guides/getting-your-stipend-off-the-university-card">Your University stipend card</a>. The allowances on top of the stipend are in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</li>
</ul>
<h2>Weeks 4 to 14: monthly tests</h2>
<ul>
<li>In most courses, coursework counts for about 40 marks out of 100 and the final exam for about 60. The coursework is mostly monthly tests, many of them on Blackboard.</li>
<li>Monthly tests are arranged by each teacher. If you miss one for a good reason, give the teacher your excuse straight away.</li>
<li>Qur'an courses, and courses taught in several sections, have one final exam for the whole University. Qur'an finals are mostly multiple choice on paper: completing an ayah, or saying what comes before or after it.</li>
</ul>
<h2>Weeks 14 to 15: before the finals</h2>
<ol>
<li><strong>Find your final exam timetable</strong> in the Academic System under <strong>Academic</strong>, then <strong>Final Exams</strong> (الاختبارات النهائية). It appears one to four weeks before the exams. Go by this screen only, not timetables shared in groups.</li>
<li><strong>Fill in the course evaluation</strong> under <strong>Academic</strong>, then <strong>Course evaluation</strong> (تقييم المقررات), for every course. Your results, including your coursework marks, stay hidden until you do.</li>
<li><strong>Check your absence</strong> in each course. If you are barred and have an excuse, hand it in before the finals start.</li>
<li><strong>Read the exam-day rules</strong> in <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>: be in the hall 10 minutes early, and no one enters more than 30 minutes after the start.</li>
</ol>
<h2>Weeks 16 to 17: finals, and what comes next</h2>
<ul>
<li>If illness or an emergency stops you sitting a final, get the proof on the day: see <a href="/ask/missed-a-final-exam">I missed a final exam. What happens now?</a></li>
<li>Results appear in the Academic System under <strong>Course results</strong> once your college approves them. See <a href="/ask/exam-results-where">Where do I see my exam results and my GPA?</a></li>
<li>From the second semester you register your own courses in add and drop. In 1448 it opens on 17 December 2026.</li>
<li>If you need to postpone the second semester, the ta'jeel window for it is in December, before classes start: see <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</li>
</ul>
<blockquote><p>Tip: Put the key dates in your phone's calendar on the first day: National Day, the course evaluation, the start of finals and the second semester's add and drop. Stuck on anything in your first semester? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "getting-your-stipend-off-the-university-card",
    stage: "study",
    title: "Your University stipend card: getting the money off it, and fixing problems",
    summary: "The Al Rajhi card the University pays your stipend onto: when the money lands, moving it to your own account through a wallet app or an ATM, the PIN, and what to do when the card expires, stops working or is lost.",
    bodyHtml: `
<p>Checked 9 November 2026. The University pays the monthly stipend onto a bank card it issues in your name: an Al Rajhi card, called the stipend card or the mukafa'ah card (بطاقة المكافأة). This guide covers how to get the money off it and what to do when the card gives trouble. What the scholarship pays, and what stops it, is in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</p>
<h2>Getting the card</h2>
<ul>
<li>New students collect it with their University card at orientation in the first week. In 2026 both were handed out in the Salam hall on 17 August. Bring a 4x6 personal photo.</li>
<li>Missed orientation? Collect it from the stipend card counter in Unit 22 (see below).</li>
<li>The University activates the card. Your PIN is in the envelope it comes in. Change the PIN at any Al Rajhi ATM.</li>
</ul>
<h2>What the card can and cannot do</h2>
<table><thead><tr><th>The card can</th><th>The card cannot</th></tr></thead><tbody>
<tr><td>Withdraw cash at an ATM</td><td>Take cash deposits or transfers in. Only the University pays into it</td></tr>
<tr><td>Transfer to your own account from an Al Rajhi ATM</td><td>Be added to Apple Pay or to the Al Rajhi app</td></tr>
<tr><td>Top up a wallet app such as Barq, Alinma Pay or urpay</td><td>Be used at all once it has expired, even with money on it</td></tr>
</tbody></table>
<h2>When the stipend lands</h2>
<ul>
<li><strong>Usually between the 21st and the 25th</strong> of each Gregorian month, often late in the evening.</li>
<li><strong>Weekends:</strong> when the 25th falls on a Friday or Saturday, the payment comes the day before or after.</li>
<li><strong>Early payments:</strong> before National Day in September, before Founding Day in February, and in Ramadan a few days before Eid. After an early payment, the next one comes more than 30 days later.</li>
<li><strong>The summer:</strong> the stipend is paid through the summer break as well.</li>
<li><strong>New students:</strong> nothing is paid in your first month. The first two months come together in the second month.</li>
<li><strong>No text message?</strong> Alerts do not always arrive. Check the balance at an ATM, or your payments in the Academic System under <strong>Personal</strong>, then <strong>Rewards</strong> (المكافآت).</li>
</ul>
<h2>Moving the money to your own account with a wallet app</h2>
<p>This is the quickest way, and it needs no ATM. The steps below are for Barq. Alinma Pay and urpay accept the card the same way.</p>
<ol>
<li>Install the wallet app and open an account in your own name, verified with Nafath.</li>
<li>Wait until the stipend is on the card. The app accepts the card only once it holds money.</li>
<li>Choose to add money from a card, enter the stipend card's number, expiry date and CVV, and the amount.</li>
<li>When the app asks for your source of income, choose <strong>student stipend</strong> or <strong>salary</strong>.</li>
<li>Transfer from the wallet to your own bank account by IBAN. In 2026 a transfer from Barq to a Saudi bank was instant and free. Other wallets show their fee before you confirm.</li>
</ol>
<h2>Using an ATM</h2>
<ul>
<li>Withdraw cash at an Al Rajhi ATM with your PIN.</li>
<li>To move money without cash, choose transfer at an Al Rajhi ATM and send it to your own account by its account number.</li>
<li>Sending money home from your own account or wallet is in <a href="/guides/sending-and-receiving-money">Sending money home and receiving money in Madinah</a>.</li>
</ul>
<h2>Where to go: the stipend card counter in Unit 22</h2>
<p>Card problems are handled at the stipend counter in Unit 22 (الوحدة 22), on the ground floor. Enter by the main entrance, turn left through the glass door, and go to the counter on the far right. Unit 22 is the second building after the College of Da'wah, heading towards the Muhammad bin Ibrahim masjid. Go in the morning, between 8 am and noon: the counter closes in the early afternoon. Questions about the payment itself also go to the stipends section (قسم المكافآت) of the Deanship of Student Affairs.</p>
<h2>Problems and what to do</h2>
<table><thead><tr><th>Problem</th><th>What to do</th></tr></thead><tbody>
<tr><td>The stipend has not arrived by the 26th</td><td>Check the Rewards screen. If it is missing, go to the stipend counter in Unit 22. A new student is not paid in the first month, and after a semester off the stipend restarts with the next regular payment or the one after</td></tr>
<tr><td>The card has expired</td><td>The money stays safe, but the card cannot be used. Fill in a form at the Unit 22 counter. The new card takes about two weeks, and the balance moves onto it. The bank cannot replace the card without the University</td></tr>
<tr><td>You forgot the PIN, or it is blocked</td><td>Ask the Unit 22 counter to reset the PIN first. If that fails, they order a new card</td></tr>
<tr><td>The card is lost, stolen or kept by an ATM</td><td>Report it at the Unit 22 counter straight away so the card is stopped, and request a replacement. It takes about two weeks, a replacement fee is taken from the card, and no stipend is lost</td></tr>
<tr><td>The payment is smaller than usual</td><td>A Student Fund loan is repaid from the stipend each month. See <a href="/guides/university-housing-and-student-services">Your University room, the Student Fund and class suspensions</a></td></tr>
<tr><td>The stipend has stopped</td><td>A semester off, the end of your regular study period, or leaving your studies stops it. See <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a></td></tr>
</tbody></table>
<blockquote><p>Tip: Take a photo of the front of your card and keep it in a private album. The Unit 22 counter asks for the card number when you report a problem. A payment still missing after you have been to the counter? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "university-to-the-haram",
    stage: "getting-settled",
    title: "From the University to the Haram: University buses, shared taxis and city buses",
    summary: "Every way from the Islamic University to Masjid an-Nabawi and back: the free University buses and when they run, the 3 riyal shared taxis from Gate 4, Madinah Bus route 150, ride apps, and getting back after Isha.",
    bodyHtml: `
<p>Checked 9 November 2026. Students at the Islamic University reach Masjid an-Nabawi in four ways. This guide compares them, then explains each one, so you can pray in the Haram as often as you like without spending much.</p>
<h2>The four ways at a glance</h2>
<table><thead><tr><th>Way</th><th>Cost</th><th>When</th><th>Good for</th></tr></thead><tbody>
<tr><td>University bus</td><td>Free</td><td>From Maghrib, and Friday mornings for Jumu'ah</td><td>Maghrib, Isha and Jumu'ah, and the duroos between them</td></tr>
<tr><td>Shared taxi from Gate 4</td><td>3 SAR a seat, cash</td><td>Most of the day</td><td>Any prayer, at short notice</td></tr>
<tr><td>Madinah Bus, route 150</td><td>The city bus fare, by card or app</td><td>About every 15 minutes</td><td>The daytime, when you do not mind a walk</td></tr>
<tr><td>Ride app</td><td>About 10 to 30 SAR a trip</td><td>Any time</td><td>Late at night, families, or carrying bags</td></tr>
</tbody></table>
<h2>The University buses</h2>
<ul>
<li>The University runs free buses between the campus and Masjid an-Nabawi, and between the Rabwa halls (الربوة) and the campus.</li>
<li><strong>There is no University bus to the Haram before Maghrib.</strong> The buses run for Maghrib and Isha.</li>
<li><strong>Jumu'ah:</strong> in the first semester of 1448 the Friday buses left campus at about 9:30 and 10:30 am.</li>
<li><strong>Coming back after Isha,</strong> the buses wait for the janazah prayer, so there is no need to rush out of the masjid.</li>
<li>Times change in Ramadan and in exam weeks. New times are posted in the halls and by the Deanship of Student Affairs.</li>
</ul>
<h2>Shared taxis from Gate 4</h2>
<ul>
<li>Cars wait outside Gate 4 and take students to Bab as-Salam (باب السلام) for <strong>3 SAR a seat</strong>.</li>
<li>They run through most of the day and leave as soon as the car is full.</li>
<li>Pay in cash, so keep small notes and coins with you.</li>
</ul>
<h2>The city bus: route 150</h2>
<ol>
<li>Walk to the <strong>Taibah University B</strong> stop, about 750 m or 11 minutes on foot from the Islamic University.</li>
<li>Board route 150 in the direction of Mudhainib. Buses come about every 15 minutes.</li>
<li>Get off at the Manakhah tunnel stop, about 28 minutes later.</li>
<li>Walk about 1 km to Masjid an-Nabawi.</li>
</ol>
<ul>
<li>City buses also stop outside Gate 5. Check the route in the Madinah Bus app before you board, because not every route goes on to the Haram.</li>
<li>No cash is taken on board: pay by card, phone or the Madinah Bus app. The fare, passes and the app are in <a href="/guides/haramain-train-and-city-buses">The Haramain train and Madinah buses</a>.</li>
</ul>
<h2>Ride apps</h2>
<p>Bolt, Careem, Jeeny and Uber all work between the University and the Haram. Expect about 10 to 30 SAR, more just after the prayers in the Haram and most of all after Jumu'ah, when prices surge. More in <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</p>
<h2>Getting back at night</h2>
<ul>
<li>After Isha, take the University bus. It waits for the janazah prayer.</li>
<li>If you miss it, a ride app is the simplest way back. A car shared with friends costs each of you little.</li>
<li>Keep your phone charged and some balance in the Madinah Bus app, so you are never stuck.</li>
</ul>
<blockquote><p>Tip: For Jumu'ah, leave early whichever way you go, because the courtyards fill well before the khutbah. First time in the masjid? See <a href="/guides/masjid-an-nabawi-first-visit">Visiting Masjid an-Nabawi: a first-visit guide</a>. Coming from the airport instead: see <a href="/ask/airport-to-haram-and-university">From the airport to the Haram or the University</a>.</p></blockquote>`,
  },
  {
    slug: "unit-13-and-paid-university-housing",
    stage: "study",
    title: "Unit 13: paid University housing for Saudi and internal scholarship students",
    summary: "Who can apply for a paid room in Unit 13, who comes first, the price per semester and the deposit, how to apply, how to renew each semester by paying the Student Fund, and how to hand the room back.",
    bodyHtml: `
<p>Checked 9 November 2026. Full (external) scholarship students are given a free room by the University: see <a href="/ask/is-housing-included">Is housing included?</a> Students without a full scholarship, that is Saudi students and internal (partial) scholarship students, can apply for a paid room in Unit 13 (الوحدة 13), the University's paid men's housing on campus. This guide covers who can apply, what it costs and how to apply and renew.</p>
<h2>Who can apply</h2>
<ul>
<li><strong>Saudi students,</strong> with priority for those from outside Madinah. You show a secondary school certificate from a school outside Madinah.</li>
<li><strong>Internal scholarship students.</strong> A committee reviews each request.</li>
<li>Rooms are given only when places are free. An internal scholarship covers tuition only and includes no housing, so a paid room is a separate request, and a place is never guaranteed.</li>
<li>A student already in University housing who graduates and is accepted for a master's keeps his room.</li>
</ul>
<h2>What it costs</h2>
<table><thead><tr><th>Item</th><th>Amount</th><th>When</th></tr></thead><tbody>
<tr><td>Rent</td><td>1,000 SAR a semester</td><td>Before you get the room, then before each new semester</td></tr>
<tr><td>Deposit</td><td>500 SAR, once</td><td>With your first payment. It is returned when you hand the room back after you graduate</td></tr>
</tbody></table>
<ul>
<li>Every room is shared by two students.</li>
<li>For comparison, a furnished room with its own bathroom near the University rents for about 1,500 SAR a month, bills included (2026). Flats and rents are in <a href="/guides/finding-an-apartment">Finding and renting a flat</a> and <a href="/guides/cost-of-living">What it costs to live in Madinah</a>.</li>
</ul>
<h2>How to apply</h2>
<ol>
<li><strong>Watch for the announcement</strong> at the start of the academic year. The Student Fund administration (صندوق الطالب) announces the free rooms, with an online application form. In 1448 the form opened on 14 August 2026.</li>
<li><strong>Fill in the form</strong> while it is open.</li>
<li><strong>Visit the housing office</strong> of the Deanship of Student Affairs as well, ideally in the first week or before the semester starts, and ask that your request is on the list.</li>
<li><strong>Follow it up every few days.</strong> An answer takes from a week to a month, and longer in a busy year.</li>
<li><strong>Once accepted, pay</strong> the rent and the deposit as the acceptance message tells you. First-time residents pay before they receive the room.</li>
<li><strong>Collect your key</strong> from the unit supervisor (mushrif), and check the room and its furniture with him.</li>
</ol>
<h2>Renewing each semester</h2>
<ol>
<li>Before each new semester you receive a renewal notice, with about two weeks to pay.</li>
<li>Transfer <strong>1,000 SAR</strong> to the Student Fund's bank account given in the notice. Write your name and room number as the transfer reference.</li>
<li>Print the transfer receipt and staple it to your academic record showing that you are enrolled this semester. The record is in the Academic System under <strong>Academic</strong>, then <strong>Academic record</strong> (السجل الأكاديمي).</li>
<li>Hand both to the unit supervisor before the deadline in the notice.</li>
</ol>
<blockquote><p>Tip: Pay on the day the notice arrives, so your receipt is ready well before the deadline.</p></blockquote>
<h2>Living in Unit 13</h2>
<ul>
<li>The same rules apply as in every University hall: the furniture stays in the room, repairs go through Tawasul, and room swaps are arranged with the unit supervisor. See <a href="/guides/university-housing-and-student-services">Your University room, the Student Fund and class suspensions</a>.</li>
<li><strong>A semester off:</strong> postponing a semester means handing the room back first. See <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</li>
<li><strong>Leaving:</strong> hand the room back to the unit supervisor and get his signature. Your clearance on graduation needs it, and the deposit is returned against it. See <a href="/guides/graduate-procedures">Leaving Madinah for good</a>.</li>
</ul>
<blockquote><p>Tip: Married students and families rent in the city: see <a href="/ask/married-students-housing">Do married students get free housing?</a> A question about your own housing request? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "university-housing-and-student-services",
    stage: "study",
    title: "Your University room, the Student Fund and class suspensions",
    summary: "Living in the University halls: what stays in your room, repairs and power cuts, temporary rooms and scooters; the Student Fund's interest-free loan of up to 2,000 SAR and its aid; and how class suspensions for weather are announced.",
    bodyHtml: `
<p>Checked 9 November 2026. This guide gathers three things every student living on campus needs sooner or later: the rules of your room, the Student Fund when money runs short, and what happens when bad weather hits Madinah. Meals, buses, the Medical Center and the library are in <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</p>
<h2>Your room</h2>
<ul>
<li><strong>The furniture stays.</strong> The bed, wardrobe, desk and chair belong to the room. Do not take any of it out, because you hand all of it back when you leave.</li>
<li><strong>Internet:</strong> rooms have an ethernet socket for a cable connection.</li>
<li><strong>Lock your door</strong> every time you go out, and keep your bag with you in the prayer rooms and the mat'am. Thefts happen on campus.</li>
<li><strong>Changing rooms:</strong> swaps between students are arranged with the unit supervisor (mushrif).</li>
<li><strong>A semester off:</strong> ta'jeel is approved only once you have handed your room back and emptied it. See <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</li>
<li><strong>A temporary room:</strong> a student between rooms, or a graduate waiting for his final exit, is given a temporary room in Unit 5. Ask at the main housing office in Unit 22.</li>
<li><strong>Electric scooters</strong> ridden on campus must be registered with a QR code and carry a sticker from Unit 22. Lock it whenever you leave it.</li>
</ul>
<h2>Repairs and power cuts</h2>
<ol>
<li><strong>Power off in your room only?</strong> Check the fuse box at the end of your corridor first.</li>
<li><strong>Anything still broken</strong>, such as a socket, the light, the air conditioning or the plumbing: send a request through Tawasul at <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a>, under Maintenance (صيانة), then the type of fault, for example Electricity (كهرباء). Give your unit, floor and room number, and attach a photo.</li>
<li><strong>The whole building is out,</strong> or there is a leak or anything dangerous: tell your unit supervisor at once.</li>
</ol>
<p>How to write a request that gets answered is in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>
<h2>The Student Fund: loans and aid</h2>
<p>The Student Fund (صندوق الطالب) helps students who are short of money, with an interest-free loan (سلفة) and with aid (إعانة) for students in hardship. Its office is in Unit 22.</p>
<table><thead><tr><th>The loan</th><th>Details</th></tr></thead><tbody>
<tr><td>Amount</td><td>Up to 2,000 SAR. Your GPA counts towards how much you are given</td></tr>
<tr><td>Repayment</td><td>200 SAR a month, taken from your stipend</td></tr>
<tr><td>How often</td><td>Once only</td></tr>
<tr><td>Not open to</td><td>Students in their final year</td></tr>
<tr><td>Time to arrive</td><td>One to two weeks, and up to a month in busy periods</td></tr>
</tbody></table>
<ol>
<li>Prepare an <strong>IBAN certificate</strong> for your own bank account, printed from your banking app or the branch.</li>
<li>Print your <strong>academic record</strong> from the Academic System, and a copy of your ID from Absher (your iqama or Visitor ID).</li>
<li>Take them, with your University card, to the Student Fund office in Unit 22, and fill in the loan form.</li>
<li>The loan is paid into your bank account, and the repayment starts on your stipend from the following months.</li>
</ol>
<p><strong>Aid:</strong> a student facing real hardship, such as an illness or an emergency at home, can ask the Fund's aid section for help. Take any papers that show the need. Rent for the paid rooms in Unit 13 is also paid to the Fund: see <a href="/guides/unit-13-and-paid-university-housing">Unit 13: paid University housing</a>.</p>
<blockquote><p>Tip: A loan repayment explains a stipend that arrives 200 SAR short. Plan for it before you borrow: see <a href="/guides/getting-your-stipend-off-the-university-card">Your University stipend card</a>.</p></blockquote>
<h2>When classes are suspended</h2>
<ul>
<li><strong>The University rarely suspends classes for weather.</strong> Most students live on campus, so classes and exams usually go ahead in rain and dust. In December 2025 heavy rain closed Madinah's schools and other universities, and the Islamic University kept its final exams.</li>
<li><strong>Only a University announcement counts.</strong> A school closure in Madinah, or a suspension at another university, does not close the Islamic University.</li>
<li><strong>Where it is announced:</strong> on the University's official X account (@iu_edu) and the Deanship of Student Affairs account (@dsa_iu_edu).</li>
<li><strong>School long weekends do not apply to the University.</strong> In the first semester the only holiday is National Day. Every holiday is in <a href="/guides/university-calendar-1448">The University calendar</a>.</li>
</ul>
<blockquote><p>Tip: On a stormy day, stay in the halls rather than travelling across the city, and check the official accounts before you set out for an early class. Questions about your room or the Fund? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "lost-your-iqama-passport-or-card",
    stage: "getting-settled",
    title: "Lost your passport, iqama, phone or University card? What to do",
    summary: "Step by step for each loss: a passport, an iqama card, the phone your Visitor ID and Absher live on, your University card, your stipend card and your bank card, with who to tell and what to do first.",
    bodyHtml: `
<p>Checked 9 November 2026. Losing a document in a foreign country is frightening, but every loss here has a clear route. Act on the same day: the loss of a passport or an iqama must be reported within 24 hours. Find what you lost below and follow the steps in order.</p>
<h2>The first hour</h2>
<ol>
<li><strong>Look again calmly</strong> where you last had it: your room, the mat'am, the prayer room, the bus, the car you came in.</li>
<li><strong>Block anything that holds money:</strong> freeze your bank card in your banking app, and report the stipend card (below).</li>
<li><strong>Suspend your SIM</strong> if your phone is gone, by calling your mobile operator, so nobody receives your codes.</li>
<li><strong>Write down what was lost</strong>, when and where. You need it for the police report.</li>
</ol>
<h2>Your passport</h2>
<ol>
<li><strong>Get a police report</strong> at the nearest police station. Take an Arabic speaker with you if you can, and keep the report.</li>
<li><strong>Report the loss in Absher.</strong> Absher has a service for a lost or stolen passport.</li>
<li><strong>Apply for a new passport</strong> at your country's embassy in Riyadh or its consulate in Jeddah. Most ask for the police report, a written statement of the loss, a copy of the lost passport if you have one, your national ID card from home, a printout of your details from Absher, and the passport fee. Each country sets its own list, so read its website first, because many take applications online or by post.</li>
<li><strong>Move your Saudi record to the new passport.</strong> On a Visitor ID: send a copy of the new passport to the Deanship of Admission and Registration through Tawasul, subject Educational visa. With a student iqama: send it to Travel Management (إدارة السفر) through Tawasul.</li>
<li><strong>Check the new passport shows in Absher</strong> before you book any travel, and that your name on Etimad still matches it letter for letter.</li>
</ol>
<p>The same update after a normal renewal is in <a href="/ask/renew-passport-in-saudi">My passport is expiring. How do I renew it?</a></p>
<h2>Your iqama card</h2>
<ul>
<li><strong>Your digital iqama</strong> in the Absher app is accepted as your ID inside the Kingdom, so you can still show it at checkpoints, banks and offices while you replace the card.</li>
<li><strong>Get a police report</strong> at the nearest police station.</li>
<li><strong>Tell Travel Management</strong> through Tawasul, with the police report and a copy of your passport. The University is your sponsor, so it records the loss and arranges a new card.</li>
</ul>
<p>Who renews a student iqama, and what holds it up, is in <a href="/ask/student-iqama-renewal">Who renews my student iqama?</a></p>
<h2>Your phone, with your Visitor ID and Absher on it</h2>
<p>A Visitor ID is digital only, so it cannot be lost: it lives in your Absher account, not on your phone. What you lose with the phone is access to it.</p>
<ol>
<li><strong>Get a replacement SIM with the same number</strong> at a branch of your mobile operator. Take your passport (or iqama). The shop checks your fingerprint.</li>
<li><strong>Sign in to Absher</strong> on the new phone. If the password or the number does not work, reset it at an Absher self-service kiosk with your fingerprint. Kiosks are at the University, in Jawazat offices and in some malls.</li>
<li><strong>Activate Nafath again</strong> on the new phone, with the face check.</li>
<li><strong>Sign in to your bank, Tawakkalna and the University app</strong> again through Nafath.</li>
</ol>
<p>If Absher or Nafath will not activate, see <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>. To change the number on Absher, see <a href="/ask/change-absher-mobile">How do I change the mobile number on my Absher account?</a></p>
<h2>Your University card</h2>
<ul>
<li>Your University ID is also digital, in the Tawakkalna app, so you can show that while you wait.</li>
<li>A new printed card is issued at Unit 22 (الوحدة 22), ground floor, at the Comprehensive Services Office, from about 8 am to 2 pm, Sunday to Thursday.</li>
<li>Bring a 4x6 personal photo from a photo studio, and your ID in Tawakkalna or Absher.</li>
</ul>
<h2>Your stipend card</h2>
<ol>
<li>Report it at the stipend card counter in Unit 22, ground floor, straight away, so the card is stopped.</li>
<li>Fill in the form for a replacement. It takes about two weeks, and a replacement fee is taken from the card.</li>
<li>Your stipend is not lost. The balance moves onto the new card.</li>
</ol>
<p>Details are in <a href="/guides/getting-your-stipend-off-the-university-card">Your University stipend card</a>.</p>
<h2>Your bank card</h2>
<ol>
<li>Freeze the card in your banking app at once, or call your bank.</li>
<li>Order a replacement in the app, or print one at the card machine in a branch of your bank.</li>
<li>Check your recent payments, and report any you did not make to the bank the same day.</li>
</ol>
<h2>Before it happens</h2>
<ul>
<li>Keep photos of your passport, visa or iqama, University card and stipend card in a private album on your phone, and a paper copy of your passport in your room.</li>
<li>Carry your passport only when you need it, such as for travel, a bank counter or an embassy. Inside the Kingdom your digital ID in Absher is enough.</li>
<li>Write your mobile operator's and your bank's customer care numbers on paper, away from the phone.</li>
</ul>
<blockquote><p>Tip: Stuck at any step, or not sure which office to go to? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
];
