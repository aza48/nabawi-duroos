import type { SeedGuide } from "./guides-2026";

/**
 * Admin lane guides, November 2026 (task A): the University's online systems, the 1448 study plans,
 * registration, GPA and warnings, and the University email. Sources and confidence per fact are in
 * docs/research/iu-pdfs-2026-11/student-system-guide.md, docs/research/iu-pdfs-2026-11/study-plans-1448.md,
 * docs/research/telegram-iu-2026-11/c1..c4, c7 and docs/research/iu-official.md.
 * Register in sync.ts; topics in src/lib/guide-topics.ts.
 */
export const GUIDES_ADMIN_2026_11: SeedGuide[] = [
  {
    slug: "university-student-system",
    stage: "study",
    title: "Using the University's student system, step by step",
    summary: "Every screen you use as a student at the Islamic University: signing in, your password, the Academic System menus, registration and Confirm, your timetable, results and the course evaluation, absence, your stipend screen, documents, requests, Tawasul, Blackboard and who to contact when something fails.",
    bodyHtml: `
<p>Checked 9 November 2026. Almost everything you do as a student at the Islamic University happens in a few online systems: registering courses, reading your results, asking for a semester off, printing a letter. This page walks through each screen, with the menu names in English and in Arabic exactly as they appear.</p>
<h2>The systems you will use</h2>
<table><thead><tr><th>System</th><th>What it is for</th></tr></thead><tbody>
<tr><td><strong>Academic System</strong> (النظام الأكاديمي)</td><td>Registration, your timetable, results, academic record, study plan, absence, requests, your stipend record, official documents and personal details</td></tr>
<tr><td><strong>Blackboard</strong> (إدارة التعلم الإلكتروني زدني)</td><td>Your classes online: materials, assignments, tests, recorded lectures and messages to your teachers</td></tr>
<tr><td><strong>Tawasul</strong> (نظام تواصل / إدارة الطلبات)</td><td>Requests and problems for any University office</td></tr>
<tr><td><strong>Saudi Digital Library</strong> (المكتبة الرقمية السعودية)</td><td>Books, journals and references. It opens from inside Saudi Arabia</td></tr>
</tbody></table>
<p>All of them open from one sign-in, so you need only one password. Your University email is separate: see <a href="/guides/university-email-and-microsoft-365">Your University email and Microsoft 365</a>.</p>
<h2>Signing in</h2>
<ol>
<li>Open <a href="https://iu.edu.sa/">iu.edu.sa</a> and tap the <strong>user account</strong> icon at the top of the page, or go straight to <a href="https://sso.iu.edu.sa/">sso.iu.edu.sa</a>.</li>
<li>Choose <strong>Login through Nafath</strong> (الدخول عن طريق نفاذ), or <strong>Login with University number</strong> (الدخول بالرقم الجامعي / الوظيفي).</li>
<li>With your University number: type the number, your password, and the <strong>verification code</strong> (رمز التحقق) shown beside the box. Tap the refresh arrow if the code is hard to read.</li>
<li>Tap <strong>Login</strong> (دخول). Your dashboard, <strong>My student data</strong> (بياناتي الطلابية), shows your current semester, your semester and cumulative GPA, your total absences and today's lectures.</li>
<li>Tap the tile you need: <strong>Academic System</strong>, <strong>Zidni</strong> for Blackboard, or <strong>Tawasul</strong>.</li>
</ol>
<p><strong>Your first sign-in:</strong> your University number and a temporary password arrive by email from IU Eservices, under the title IU Single Sign-On. Change the password as soon as you are in.</p>
<p><strong>Sign-in hangs or the password fails:</strong> sign in through Nafath instead, then set a new password from the account menu. If Nafath is not working for you either, email <strong>it.care@iu.edu.sa</strong> from your personal email with your full name and University number.</p>
<h2>Changing your password or mobile number</h2>
<ol>
<li>Tap the <strong>user account</strong> icon, then <strong>Change password</strong> (تغيير كلمة المرور) or <strong>Change mobile number</strong> (تغيير رقم الجوال).</li>
<li><strong>Password:</strong> type your current password, or confirm through Nafath, then the new one twice, and tap <strong>Update</strong> (تحديث). It needs at least 8 characters, with a capital English letter, a small English letter, a number and a symbol such as ! @ # $ or %.</li>
<li><strong>Mobile:</strong> type the new number, tap <strong>Update</strong> (تحديث), then enter the code sent to that number. Keep this number current: your verification codes and University alerts go to it.</li>
</ol>
<h2>Finding your way in the Academic System</h2>
<p>The Academic System has five menus along the top.</p>
<table><thead><tr><th>Menu</th><th>What you find there</th></tr></thead><tbody>
<tr><td><strong>Electronic Registration</strong> (التسجيل الإلكتروني)</td><td>Instructions and guidance, Courses offered in the plan, Registered courses (your timetable), Course results, Drop and add</td></tr>
<tr><td><strong>Personal</strong> (شخصي)</td><td>Update your name in Arabic or English, Personal information, Absence, Send email to a teacher, Official documents, Nationality and birth details correction, Rewards (your stipend), E-payment</td></tr>
<tr><td><strong>Academic</strong> (أكاديمي)</td><td>Academic record, Previous academic movements, Student plan, Passed and Remaining courses in the plan, Course evaluation, Final exams, Excuses for missed lectures, Final exam excuse, Enter academic movements, Course withdrawal, Clearance, Contact the academic advisor</td></tr>
<tr><td><strong>Travel Management System</strong> (نظام إدارة السفر)</td><td>Your requests to Travel Management</td></tr>
<tr><td><strong>Graduation procedures</strong> (اجراءات التخرج)</td><td>Your graduation steps and the check of the details printed on your certificate</td></tr>
</tbody></table>
<p>The home page also shows your <strong>general status</strong> (الوضع العام), which should read <strong>Regular</strong> (منتظم), and your <strong>number of GPA warnings</strong> (عدد إنذارات المعدل). What a warning means is in <a href="/guides/gpa-warnings-and-dismissal">Your GPA, academic warnings and dismissal</a>.</p>
<blockquote><p>Tip: Official documents open in a pop-up window. If nothing opens, allow pop-ups for eservices.iu.edu.sa. In Chrome on a computer: Settings, then Privacy and security, then Site settings, then Pop-ups and redirects. On an Android phone: Chrome, then Settings, then Site settings, then Pop-ups.</p></blockquote>
<h2>Your timetable and registered courses</h2>
<ol>
<li>Open <strong>Electronic Registration</strong>, then <strong>Registered courses</strong> (المقررات المسجلة).</li>
<li>Choose the semester. Each course shows its code, section, credit hours, day, time, room and teacher, with your total credit hours and the name of your academic advisor at the bottom.</li>
<li>Tap <strong>Print</strong> (طباعة) to keep a copy.</li>
</ol>
<ul>
<li><strong>Days are numbers:</strong> 1 is Sunday, 2 Monday, 3 Tuesday, 4 Wednesday and 5 Thursday.</li>
<li><strong>The room</strong> names the building first. "Da'wah", for example, means the College of Da'wah building.</li>
<li><strong>Courses offered in the plan</strong> (المقررات المطروحة وفق الخطة) lists every section you can register this semester, with its teacher, and whether it is open or full. A course whose prerequisite you have not passed does not appear there.</li>
</ul>
<h2>Adding and dropping a course</h2>
<p>Drop and add opens only in the window in the academic calendar, and your college gives first-semester students a fixed timetable. The rules, the dates and what to do after the window are in <a href="/guides/registering-your-courses">Registering your courses: add, drop and withdraw</a>. Use a computer: the page does not work well on a phone.</p>
<ol>
<li>Open <strong>Electronic Registration</strong>, then <strong>Drop and add</strong> (الحذف والإضافة).</li>
<li>Tick the box beside the course you want.</li>
<li>Tap the magnifier under <strong>Search for a section</strong> (ابحث عن شعبة). If the course has more than one section, a box opens: tap the section number you want.</li>
<li>Scroll down and tap <strong>Add</strong> (إضافة).</li>
<li>The course now appears under <strong>Unconfirmed actions</strong> (إجراءات غير مثبتة). Tap <strong>Confirm</strong> (تثبيت). Until you confirm, nothing is registered.</li>
<li>To drop a course, tap the red <strong>Delete</strong> (حذف) button beside it on the same page, then tap <strong>Confirm</strong> again.</li>
<li>Open <strong>Registered courses</strong> afterwards and check that every change went through.</li>
</ol>
<p>The University's own illustrated instructions are under <strong>Electronic Registration</strong>, then <strong>Instructions and guidance</strong> (تعليمات و إرشادات).</p>
<h2>Results: evaluate your courses first</h2>
<p>Your results, including your coursework marks, stay hidden until you have filled in the evaluation for each course. The evaluation opens near the end of the semester and closes again, so do it as soon as it opens.</p>
<ol>
<li>Open <strong>Academic</strong>, then <strong>Course evaluation</strong> (تقييم المقررات).</li>
<li>Tap a course code under <strong>Course code</strong> (رمز المقرر).</li>
<li>Answer every statement by choosing one circle, from <strong>Strongly agree</strong> (أوافق بشدة) to <strong>Strongly disagree</strong> (لا أوافق بشدة), and save. Your answers are anonymous.</li>
<li>Repeat for every course.</li>
<li>Once your college has approved the grades, open <strong>Electronic Registration</strong>, then <strong>Course results</strong> (نتائج المقررات), and choose the semester. Each course shows the final exam mark, the coursework mark, the total and the grade. Tap <strong>Print</strong> to keep a copy.</li>
</ol>
<p>How grades and the GPA are worked out is in <a href="/guides/gpa-warnings-and-dismissal">Your GPA, academic warnings and dismissal</a>.</p>
<h2>Your academic record and study plan</h2>
<ul>
<li><strong>Academic record</strong> (السجل الأكاديمي), under Academic: every course with its hours, points and grade, and your semester and cumulative hours and GPA. It is for your own reference, not an official document.</li>
<li><strong>Student plan</strong> (خطة الطالب): all the courses of your degree in one grid, by course code.</li>
<li><strong>Passed courses in the plan</strong> (المقررات المجتازة في الخطة) and <strong>Remaining courses in the plan</strong> (المقررات المتبقية في الخطة): what you have finished and what is left, with each course's hours and level.</li>
</ul>
<p>What each college teaches, level by level, is in <a href="/guides/what-you-study-by-level">What you study in each college, level by level</a>.</p>
<h2>Your exams and your absence</h2>
<ul>
<li><strong>Final exam timetable:</strong> Academic, then <strong>Final exams</strong>. It goes up a few weeks before the exam period, and it marks any course you are barred from or have withdrawn from.</li>
<li><strong>Your absence:</strong> Personal, then <strong>Absence</strong> (الغياب). For each course you see your total absence, your total lateness and your absence percentage. Past 25% you are barred from the final exam. The record here is the one that counts; the attendance shown in Blackboard does not.</li>
<li><strong>An excuse for a missed lecture:</strong> Academic, then <strong>Excuses for missed lectures</strong> (تقديم الأعذار عن غياب المحاضرات). Upload the excuse while the course is still listed there. Once it has gone from the list, send the excuse to your college through Tawasul.</li>
<li><strong>A missed final exam:</strong> after the finals, Academic, then <strong>Final exam excuse</strong> (تقديم الأعذار عن غياب الاختبار النهائي), then <strong>Request excuse from the final exams</strong> (طلب اعتذار عن الاختبارات النهائية). Follow it under <strong>Show and follow excuse requests</strong> (اظهار و متابعة طلبات الاعتذار). See <a href="/ask/missed-a-final-exam">I missed a final exam. What happens now?</a></li>
</ul>
<p>The attendance and exam rules are in <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</p>
<h2>Your stipend, documents and payments</h2>
<ul>
<li><strong>Rewards</strong> (المكافآت), under Personal: your monthly stipend record. Everything about the stipend is in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</li>
<li><strong>Official documents</strong> (المستندات الرسمية), under Personal: the stamped papers you can hand to others, such as the student letter (تعريف بالطالب) and your transcript. They are free and issued at once.</li>
<li><strong>E-payment</strong> (الدفع الإلكتروني), under Personal, then <strong>Cards</strong> (بطاقات): for students on paid programmes only. Type the amount due in <strong>Amount to pay</strong> (المبلغ المراد دفعه) and tap <strong>Pay</strong> (دفع). It takes mada, Visa and Mastercard. Keep the receipt; you do not need to send it to anyone.</li>
</ul>
<h2>Writing to a teacher or your academic advisor</h2>
<ul>
<li><strong>A teacher:</strong> Personal, then <strong>Send email</strong> (إرسال بريد إلكتروني). Tick the teacher, write the subject and your message, and tap <strong>Send</strong> (إرسال). You can also message a teacher inside Blackboard.</li>
<li><strong>Your academic advisor:</strong> Academic, then <strong>Contact the academic advisor</strong> (التواصل مع المرشد الأكاديمي), then <strong>New request</strong> (طلب تواصل جديد). Write your message (500 characters at most), attach a file if needed, and tap <strong>Send</strong>. <strong>View previous requests</strong> (استعراض الطلبات السابقة) shows the replies. If an answer is slow and the matter is urgent, go to the wakeel of your college.</li>
</ul>
<h2>Correcting your name, nationality or birth details</h2>
<p><strong>Your name.</strong> Personal, then <strong>Update name in Arabic</strong> (تحديث الاسم باللغة العربية) or <strong>Update name in English</strong> (تحديث الاسم باللغة الانجليزية).</p>
<ul>
<li>Enter four parts: first name, father's name, grandfather's name and family name, exactly as in your passport. In Arabic, use Arabic letters only, with no space or hyphen in the family name.</li>
<li>Upload a copy of your passport (JPG or PDF), type the name, confirm it, and tap <strong>Save</strong> (حفظ).</li>
<li>The change shows once the Deanship of Admission and Registration has checked that your Arabic and English names match.</li>
<li>Do it well before your final semester. Once your graduation document is issued, adding or correcting your Arabic name means paying for a replacement document. See <a href="/ask/graduation-certificate-name-check">How do I make sure my name is right on my degree certificate?</a></li>
</ul>
<p><strong>Nationality, date or place of birth.</strong> Personal, then <strong>Nationality and place of birth correction request</strong> (طلب تعديل الجنسية ومكان الميلاد). Choose the type of correction and the right value, upload your passport and your new iqama together as one PDF, and tap <strong>Save</strong>.</p>
<p><strong>Mobile and email.</strong> Personal, then <strong>Personal information</strong> (المعلومات الشخصية). Edit your mobile, personal email or University email and tap <strong>Edit</strong> (تعديل).</p>
<h2>Requests in the Academic System</h2>
<ul>
<li><strong>A semester off:</strong> Academic, then <strong>Enter academic movements</strong> (إدخال حركات اكاديمية), within the windows in the calendar. Read the conditions and tap <strong>I agree</strong> (أوافق) to continue. Nothing changes until your status changes, so keep attending until it does. Full steps: <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>. Past requests are under <strong>Previous academic movements</strong> (حركات أكاديمية سابقة).</li>
<li><strong>Withdrawing from one course:</strong> Academic, then <strong>Course withdrawal</strong> (الإعتذار عن مقرر), then <strong>Withdrawal request</strong> (طلب إعتذار). Follow it under <strong>Show withdrawn courses</strong> (إظهار المقررات المعتذر عنها). Outside the window the screen says the operation cannot be completed in this period. The limits are in <a href="/guides/registering-your-courses">Registering your courses</a>.</li>
<li><strong>Leaving after graduation:</strong> Academic, then <strong>Clearance</strong> (إخلاء طرف). See <a href="/guides/graduate-procedures">Graduating</a>.</li>
</ul>
<h2>Asking for something: Tawasul</h2>
<ol>
<li>From the sign-in page, open <strong>Tawasul / Requests management</strong> (نظام تواصل / إدارة الطلبات), or go to <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a>.</li>
<li>Tap <strong>New request</strong> (طلب جديد) and choose the office from the list (قائمة الجهات): the Deanship of Admission and Registration, your college, Travel Management, the Deanship of Student Affairs, or another office.</li>
<li>Give the request a clear title under <strong>Subject</strong> (الموضوع) and explain it under <strong>Request details</strong> (تفاصيل الطلب). Add a screenshot or document with <strong>Add attachments</strong> (إضافة مرفقات).</li>
<li>Tap <strong>Send request</strong> (إرسال الطلب).</li>
<li>Follow the answer under <strong>My requests</strong> (طلباتي). Open requests are under <strong>Requests in progress</strong> (طلبات تحت التنفيذ).</li>
</ol>
<p>Your University number is attached to the request for you. Write it in your own words, one matter per request. Which office handles what, and how to write a request that gets answered, is in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>
<h2>Blackboard</h2>
<ul>
<li><strong>On a computer:</strong> sign in at iu.edu.sa and tap the <strong>Zidni</strong> tile. Blackboard opens without a second sign-in.</li>
<li><strong>On a phone:</strong> in the Blackboard app, search for Islamic University of Madinah, tap <strong>Continue with Web-Login</strong>, and sign in with your University number and password. If the app keeps logging you out, use Blackboard in your phone's browser.</li>
<li><strong>Forgot the Blackboard password:</strong> on the Web Login page tap <strong>Forgot your password?</strong> (هل نسيت كلمة المرور؟). Give your first name and family name exactly as registered, with your University number or your email, and a reset link arrives by email. Your old password works until you change it.</li>
<li><strong>Inside Blackboard:</strong> <strong>Activity</strong> shows what is new in your courses, <strong>Calendar</strong> shows the due dates for assignments and tests, and <strong>Grades</strong> shows your marks so far. A live lecture opens with <strong>Join session</strong>, and its recording is under the three dots, then <strong>View all recordings</strong>. Turn on notifications in your settings so you do not miss a deadline.</li>
</ul>
<p>More help: <a href="/ask/blackboard-login">How do I log in to Blackboard, and what do I do if it fails?</a> Never open links posted in class chats: see <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat</a>.</p>
<h2>On your phone</h2>
<p>The University's app, Islamic University of Madinah, is on the App Store and Google Play. Sign in with your University number and password. It shows your timetable, absences, GPA and student card, and it opens the Academic System. If a course seems to be missing in the app, check the Academic System on the website, which shows every course.</p>
<h2>When something does not work</h2>
<table><thead><tr><th>Problem</th><th>Who to contact</th></tr></thead><tbody>
<tr><td>Password and sign-in</td><td><strong>it.care@iu.edu.sa</strong>, or the Deanship of IT and E-Learning on <strong>+966 14 847 1856</strong></td></tr>
<tr><td>Blackboard</td><td><strong>bb@iu.edu.sa</strong>, or a Tawasul request to the E-Learning Center</td></tr>
<tr><td>Registration, your record and your name</td><td>The Deanship of Admission and Registration through Tawasul, or <strong>admission.reg@iu.edu.sa</strong></td></tr>
<tr><td>You cannot sign in at all</td><td>The guest form at <a href="https://helpdesk.iu.edu.sa/newticket_guest">helpdesk.iu.edu.sa/newticket_guest</a></td></tr>
<tr><td>You do not know where a question belongs</td><td>Student care on <strong>920022042</strong> or <strong>care@iu.edu.sa</strong></td></tr>
</tbody></table>
<blockquote><p>Tip: Stuck on a screen? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "registering-your-courses",
    stage: "study",
    title: "Registering your courses: add, drop and withdraw",
    summary: "How course registration works each semester at the Islamic University: your fixed first-semester timetable, the add and drop window and its batches, credit-hour limits and prerequisites, adding and dropping with Confirm, changes after the window, and withdrawing from a course with a W.",
    bodyHtml: `
<p>Checked 9 November 2026. Each semester you build your timetable in the Academic System, in a short window before classes begin. This guide explains the rules, the order things happen in, and what to do when a course will not go in. The screen-by-screen steps for every part of the system are in <a href="/guides/university-student-system">Using the University's student system</a>.</p>
<h2>Your first semester</h2>
<ul>
<li>Your college registers your first-semester courses for you and gives you a ready-made timetable. You cannot change it, so there is nothing to do in the add and drop window.</li>
<li>First-semester timetables are often all in the morning or all in the afternoon. That is normal.</li>
<li>Throughout your first year you cannot drop a course or withdraw from one, and ta'jeel or i'tithaar is allowed only for compelling reasons.</li>
<li>From your second semester you can change sections and times in the add and drop window.</li>
</ul>
<h2>The registration window</h2>
<ol>
<li><strong>Timetables appear</strong> in the Academic System in the days before the semester. Check what is already registered for you under <strong>Electronic Registration</strong>, then <strong>Registered courses</strong>.</li>
<li><strong>Add and drop opens in batches</strong> by University number, with students closest to graduation first. The add and drop page, and a text message, tell you your own opening time. The site is busy at the start, so try again a little later if it is slow.</li>
<li><strong>The window lasts a few days.</strong> For the second semester of 1448, add and drop runs from <strong>17 to 21 December 2026</strong>, and classes begin on Sunday 20 December. Every date is in <a href="/guides/university-calendar-1448">The University calendar</a>, and the Academic System is the live record if a window is extended.</li>
<li><strong>Classes start</strong> straight after. Some teachers take attendance from the first lecture, so go from day one.</li>
</ol>
<h2>Before you start: hours, prerequisites and sections</h2>
<ul>
<li><strong>Credit hours.</strong> In the colleges of Islamic and Arabic studies, law and business you register between <strong>18 and 25</strong> credit hours a semester. In the scientific colleges it is <strong>10 to 20</strong>. A student in his final semester who needs more hours to graduate asks his college to raise the limit, up to 28.</li>
<li><strong>Prerequisites.</strong> A course opens only once you have passed the course before it. Qur'an 5 needs Qur'an 4, Nahw 2 needs Nahw 1, and so on. So a course you failed or dropped comes back first, before the courses that build on it. Your plan, with the codes and levels of every course, is under <strong>Academic</strong>, then <strong>Student plan</strong> (خطة الطالب).</li>
<li><strong>Sections and teachers.</strong> <strong>Electronic Registration</strong>, then <strong>Courses offered in the plan</strong> (المقررات المطروحة وفق الخطة), lists every section with its times, its teacher and whether it is open or full. "Not assigned by the college" (لم يحدد من الكلية) means no teacher has been named yet. Section times stay fixed, but the teacher named can change after the window closes.</li>
<li><strong>No clashes and no full sections.</strong> The system will not register two courses at the same time, and it does not open a section that is full.</li>
</ul>
<h2>Adding and dropping, step by step</h2>
<p>Use a computer. The page does not work well on a phone, and it times out if you leave it open too long.</p>
<ol>
<li>Open <strong>Electronic Registration</strong>, then <strong>Drop and add</strong> (الحذف والإضافة).</li>
<li>Tick the course, tap the magnifier under <strong>Search for a section</strong> (ابحث عن شعبة), and choose the section number.</li>
<li>Tap <strong>Add</strong> (إضافة). The course moves to <strong>Unconfirmed actions</strong> (إجراءات غير مثبتة).</li>
<li>To drop a course, tap the red <strong>Delete</strong> (حذف) beside it.</li>
<li>Tap <strong>Confirm</strong> (تثبيت). Nothing is registered or dropped until you confirm.</li>
<li>Open <strong>Registered courses</strong> and check your total hours and every course.</li>
</ol>
<blockquote><p>Tip: To move from an afternoon section to a morning one, note the open morning section in Courses offered in the plan, then drop your section and add the new one in the same visit before you tap Confirm. Check your choices before you confirm: a course is not always easy to drop again afterwards, and you can never go below the minimum load.</p></blockquote>
<h2>When a course will not go in</h2>
<table><thead><tr><th>What you see</th><th>What it means and what to do</th></tr></thead><tbody>
<tr><td>The course is not in Courses offered in the plan</td><td>You have not passed its prerequisite, or it is not offered this semester. Check your Student plan</td></tr>
<tr><td>The section is full</td><td>Choose another section. If every section is full, ask the Deanship of Admission and Registration through Tawasul with the course code</td></tr>
<tr><td>A clash with another course</td><td>Choose a section at another time, or drop one of the two</td></tr>
<tr><td>The page says it is not your time yet</td><td>Your batch has not opened. Check the time shown on the page</td></tr>
<tr><td>You are short of the minimum hours because of failed courses or clashes</td><td>Go to the Deanship of Admission and Registration, 3rd floor, or your college's wakeel, during the window</td></tr>
<tr><td>You are graduating and the hours you need were not registered</td><td>The same: go in person during the window, with your Remaining courses in the plan</td></tr>
</tbody></table>
<h2>After the window closes</h2>
<ul>
<li>The Drop and add page locks when the window ends. From then on, a change is a request, and it is granted only with an accepted reason or when you are graduating.</li>
<li>For a section or time change, go to the wakeel of your college with the number of an open section that does not clash with your timetable.</li>
<li>For a missing course or a registration error, send a Tawasul request to the Deanship of Admission and Registration, with the course code, the section number and a screenshot, or go to its office on the 3rd floor.</li>
<li>Act in the first week. The longer you wait, the harder a change becomes.</li>
</ul>
<h2>Withdrawing from a course</h2>
<p>If a course is going badly, you can withdraw from it during the semester and receive a <strong>W</strong> instead of a fail. A W does not count in your GPA.</p>
<ol>
<li>Open <strong>Academic</strong>, then <strong>Course withdrawal</strong> (الإعتذار عن مقرر), then <strong>Withdrawal request</strong> (طلب إعتذار).</li>
<li>Choose the course and send the request. Your teacher does not need to agree.</li>
<li>Follow it under <strong>Show withdrawn courses</strong> (إظهار المقررات المعتذر عنها). A decision usually takes from one day to a week.</li>
<li>Keep attending the course until the withdrawal is approved. Until then, your absences still count.</li>
</ol>
<p><strong>The limits:</strong></p>
<ul>
<li>At most <strong>two courses</strong> in one semester, and <strong>six</strong> over your whole degree.</li>
<li>Only once for the same course.</li>
<li>Never below the minimum load, never in your first year, never in your expected graduation semester, and never from a course you are already barred from for absence.</li>
<li>Only within the window. For the second semester of 1448 it runs from <strong>20 December 2026 to 13 March 2027</strong>.</li>
</ul>
<p>To leave a whole semester, use ta'jeel or i'tithaar instead: see <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>. Never simply stop attending. Twenty days in a row of absence without ta'jeel or i'tithaar closes your file (طي القيد).</p>
<p>Studying online in the electronic courses? You withdraw through Tawasul to the E-Learning Center instead: see <a href="/guides/studying-online-at-the-islamic-university">Studying online at the Islamic University</a>.</p>
<h2>Catching up</h2>
<ul>
<li>A failed or dropped course has to be registered again in a later semester. Put it first, because the courses after it wait for it.</li>
<li>The summer semester runs only some courses, and not every year. See <a href="/ask/summer-semester">Is there a summer semester?</a></li>
<li>What failing does to your GPA and your study period is in <a href="/guides/gpa-warnings-and-dismissal">Your GPA, academic warnings and dismissal</a>.</li>
</ul>
<blockquote><p>Tip: Something will not register and the window is closing? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "gpa-warnings-and-dismissal",
    stage: "study",
    title: "Your GPA, academic warnings and dismissal",
    summary: "How the Islamic University works out your GPA out of 5, with worked examples, where to see it, what failing and retaking a course do to it, academic warnings and dismissal, the extra chance, honours, and how to raise a low GPA.",
    bodyHtml: `
<p>Checked 9 November 2026. Your GPA (المعدل) decides your honours, and a low one leads to warnings and, in the end, dismissal. This guide shows how it is worked out, where to see it, and what to do when it starts to slip.</p>
<h2>Grades and points</h2>
<p>Every course is marked out of 100, and 60 is the pass mark. Each grade carries points out of 5.</p>
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
<li><strong>DN</strong> (ح): barred from the final exam for absence. It counts as a fail, and it hurts your GPA more than an F.</li>
<li><strong>W</strong> (ع): withdrawn from the course. It is not a fail and does not count in your GPA.</li>
</ul>
<h2>How the GPA is worked out</h2>
<ol>
<li>For each course, multiply the grade's points by the course's credit hours.</li>
<li>Add the results together.</li>
<li>Divide by the total credit hours.</li>
</ol>
<p><strong>Example, one semester:</strong></p>
<table><thead><tr><th>Course</th><th>Hours</th><th>Grade</th><th>Points x hours</th></tr></thead><tbody>
<tr><td>Fiqh</td><td>3</td><td>A (4.75)</td><td>14.25</td></tr>
<tr><td>Nahw</td><td>2</td><td>B+ (4.50)</td><td>9.00</td></tr>
<tr><td>Tafsir</td><td>2</td><td>C (3.00)</td><td>6.00</td></tr>
<tr><td><strong>Total</strong></td><td><strong>7</strong></td><td></td><td><strong>29.25</strong></td></tr>
</tbody></table>
<p>Semester GPA: 29.25 divided by 7 = <strong>4.18</strong>.</p>
<p>Your <strong>semester GPA</strong> (المعدل الفصلي) covers one semester. Your <strong>cumulative GPA</strong> (المعدل التراكمي) covers every course you have taken, worked out the same way. The cumulative GPA is the one that counts for warnings, honours and graduation. The more hours you have behind you, the less one semester moves it.</p>
<h2>Where to see it</h2>
<ul>
<li>Your dashboard after sign-in, <strong>My student data</strong> (بياناتي الطلابية), shows your semester and cumulative GPA.</li>
<li><strong>Academic</strong>, then <strong>Academic record</strong> (السجل الأكاديمي), shows every course with its hours, points and grade, and your GPA semester by semester.</li>
<li>The Academic System home page shows your <strong>number of GPA warnings</strong> (عدد إنذارات المعدل).</li>
<li>Results appear only after you have filled in the course evaluation. See <a href="/guides/university-student-system">Using the University's student system</a>.</li>
</ul>
<h2>Failing and retaking a course</h2>
<ul>
<li>You must pass every course in your plan to graduate, so a failed course is registered again in a later semester.</li>
<li>When you pass it, the new grade is added to your record. The F or DN stays on your record and still counts in your GPA, so a retake raises your GPA but does not wipe out the fail.</li>
<li>A course you are barred from (DN) is a fail like any other, so attendance protects your GPA as much as revision does.</li>
<li>A final exam is sat once. The only second sitting is the substitute exam for an accepted excuse. See <a href="/ask/failed-a-course">I failed a course. What does it mean for me?</a></li>
</ul>
<h2>Academic warnings</h2>
<ul>
<li>A semester that ends with your cumulative GPA below the minimum the University sets for graduation gives you an <strong>academic warning</strong> (إنذار أكاديمي).</li>
<li>The number of warnings shows on the Academic System home page. Check it after every result.</li>
<li><strong>Three semesters in a row</strong> below that minimum lead to academic dismissal.</li>
<li>A warning is a signal to act now: the next section shows how.</li>
</ul>
<h2>Academic dismissal and the extra chance</h2>
<p>You are academically dismissed (مفصول أكاديمياً) in either of two cases:</p>
<ul>
<li>your cumulative GPA stays below the graduation minimum for three semesters in a row, or</li>
<li>you have not finished your degree within the time allowed for it.</li>
</ul>
<p>Ta'jeel is not counted in your study time, but an i'tithaar semester is. See <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</p>
<p><strong>The extra chance</strong> (فرصة إضافية): a dismissed student can request one extra chance.</p>
<ol>
<li>Watch for the window in the calendar. For the second semester of 1448 it runs from <strong>11 to 14 December 2026</strong>.</li>
<li>Apply in the Academic System within those dates.</li>
<li>See the wakeel of your college for academic affairs as well, who can support your request.</li>
<li>Check your status after the window. Once it is back to Regular (منتظم), register your courses for the semester.</li>
</ol>
<p>For a low GPA, the extra chance is given only when one semester of 14 credit hours could lift your cumulative GPA back to the minimum. Scholarship students cannot have their study time extended by more than half the length of the degree.</p>
<h2>Honours</h2>
<table><thead><tr><th>Honours</th><th>Cumulative GPA</th></tr></thead><tbody>
<tr><td>First class</td><td>4.75 to 5.00</td></tr>
<tr><td>Second class</td><td>4.25 to under 4.75</td></tr>
</tbody></table>
<p>Both also need:</p>
<ul>
<li><strong>No failed course</strong>, ever. A single F or DN rules out honours, even if you later pass the course on a retake.</li>
<li>Finishing your degree within the time the University sets for honours.</li>
<li>At least 60% of your credit hours taken at the Islamic University.</li>
</ul>
<p>A W is not a fail, so a course withdrawal does not cost you honours. If a course is going badly and honours matter to you, withdrawing before the deadline protects them.</p>
<h2>Raising a low GPA</h2>
<ul>
<li><strong>Retake failed courses early.</strong> Each pass adds points, and the courses after it are waiting for it.</li>
<li><strong>Use withdrawal in time.</strong> If you are heading for a fail, a W before the deadline keeps the fail off your record. The rules are in <a href="/guides/registering-your-courses">Registering your courses</a>.</li>
<li><strong>Never reach the absence bar.</strong> A DN is the worst grade for your GPA. Check Personal, then Absence, every week.</li>
<li><strong>Do the sums.</strong> Say you have 60 hours at a cumulative GPA of 2.60, which is 156 points. A semester of 20 hours at 4.00 adds 80 points: 236 points over 80 hours is <strong>2.95</strong>.</li>
<li><strong>Ask early.</strong> Your academic advisor and the wakeel of your college can help plan your load before a third warning.</li>
</ul>
<blockquote><p>Tip: Got a warning, or worried about dismissal? Speak to the wakeel of your college straight away. Still stuck? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "university-email-and-microsoft-365",
    stage: "study",
    title: "Your University email and Microsoft 365",
    summary: "Your University email address, how to sign in, the free Microsoft 365 apps and 1 TB of storage that come with it, why you must read it every day, writing to your teachers, keeping your account safe, and saving your files before you graduate.",
    bodyHtml: `
<p>Checked 9 November 2026. Every student at the Islamic University has a University email account. Official notices, replies to your requests and messages from your teachers come to it, and it gives you Microsoft 365 free while you study.</p>
<h2>Your address</h2>
<p>Your University email is your University number followed by <strong>@stu.iu.edu.sa</strong>. It is also shown in the Academic System under <strong>Personal</strong>, then <strong>Personal information</strong> (المعلومات الشخصية), where you can add a personal email as well.</p>
<h2>Signing in</h2>
<ol>
<li>Open <a href="https://outlook.office.com/">outlook.office.com</a>, or install the Outlook app on your phone.</li>
<li>Sign in with your full University email address and your University password, the same password as for the Academic System.</li>
<li>If the account does not open the first time, sign in at <a href="https://sso.iu.edu.sa/">sso.iu.edu.sa</a> first, then try again.</li>
<li>Still locked out? Email <strong>it.care@iu.edu.sa</strong> from your personal email with your full name and University number.</li>
</ol>
<p>Changing your password, and the rules for a new one, are in <a href="/guides/university-student-system">Using the University's student system</a>.</p>
<h2>What comes with it</h2>
<ul>
<li><strong>Microsoft 365 apps</strong>: Word, Excel, PowerPoint and Outlook, free, online and to install on your own computer and phone. Sign in to each app with your University email.</li>
<li><strong>1 TB of cloud storage</strong> in OneDrive, for your notes, research and scans.</li>
</ul>
<h2>Read it every day</h2>
<ul>
<li>The University sends official notices to your University email: exam calls, substitute exams, answers to your requests and changes to your status.</li>
<li>Your teachers use it, along with Blackboard messages, as the official way to reach you.</li>
<li>Turn on notifications in the Outlook app, so nothing waits unread.</li>
</ul>
<h2>Writing to your teachers</h2>
<ul>
<li>In the Academic System, <strong>Personal</strong>, then <strong>Send email</strong> (إرسال بريد إلكتروني), lists your teachers with their email addresses. Tick one, write your subject and message, and tap <strong>Send</strong>.</li>
<li>Or write from Outlook. Give your full name, University number, the course and your section in the first lines.</li>
<li>Keep it short and polite, and write in Arabic if you can.</li>
</ul>
<h2>Keeping your account safe</h2>
<ul>
<li>Your University password opens everything: your email, the Academic System, Blackboard and Tawasul. Never give it to anyone, including a classmate who offers to register your courses for you.</li>
<li>Never open links sent by people you do not know, in your email or in class chats. See <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat</a>.</li>
<li>Keep the mobile number on your University account current, because sign-in codes go to it.</li>
</ul>
<h2>Before you graduate</h2>
<p>Your University account closes after you graduate, and your email and OneDrive files go with it. In your final semester, copy your files to your own storage, and give the University and your teachers a personal email address for anything that comes later.</p>
<blockquote><p>Tip: Cannot get into your University email? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "what-you-study-by-level",
    stage: "study",
    title: "What you study in each college, level by level",
    summary: "The courses of the 1448 study plans for the University's seven colleges of Islamic and Arabic studies, law and business: the Noble Qur'an, Noble Hadith, Aqidah and Da'wah, Sharia, Arabic Language and Humanities, Business (Economics) and Law, level by level, in English and Arabic.",
    bodyHtml: `
<p>Checked 9 November 2026. Every bachelor's degree at the Islamic University runs over eight levels, one level each semester. Below are the courses of the 1448 study plans, college by college, with the Arabic name you see in the Academic System. Use it to plan ahead, to find your books in the <a href="/library#muqarrarat">Jamiah library</a>, and to choose your college before you leave the Ma'had: see <a href="/guides/graduating-from-mahad">Moving from the Ma'had to the Kulliyah</a>.</p>
<ul>
<li><strong>Your own plan</strong>, with the code, credit hours and prerequisites of every course, is in the Academic System under <strong>Academic</strong>, then <strong>Student plan</strong> (خطة الطالب). A plan can change from one intake to the next, so go by yours.</li>
<li>A failed course comes back before the courses that build on it. See <a href="/guides/registering-your-courses">Registering your courses</a>.</li>
</ul>
<blockquote><p>Tip: Some folders in the Jamiah library are sorted by an earlier study plan, so a course can sit a level or two away from where you study it. Search the library for the course's Arabic name and you will find it wherever it is filed.</p></blockquote>
<h2>At a glance</h2>
<table><thead><tr><th>College</th><th>Courses in the degree</th><th>The shape of the degree</th></tr></thead><tbody>
<tr><td>The Noble Qur'an and Islamic Studies</td><td>65</td><td>Qira'at and tafsir from Level 1. No memorisation courses: you join with the whole Qur'an memorised</td></tr>
<tr><td>Noble Hadith and Islamic Studies</td><td>73</td><td>A Qur'an course every level; the hadith sciences built step by step from Level 1</td></tr>
<tr><td>Aqidah and Da'wah</td><td>78</td><td>Shared first year, then tawhid every level with sects, religions and da'wah</td></tr>
<tr><td>Sharia</td><td>87</td><td>Fiqh and usul alongside Saudi law from Level 1</td></tr>
<tr><td>Arabic Language and Humanities</td><td>80</td><td>Shared first year, then nahw, sarf, balaghah, literature, linguistics and media</td></tr>
<tr><td>Business: Economics</td><td>65</td><td>Shared first year, then economics and finance with the fiqh of transactions</td></tr>
<tr><td>Law and Judicial Studies</td><td>66</td><td>Saudi law, fiqh and usul from Level 1, with three electives</td></tr>
</tbody></table>
<h2>College of the Noble Qur'an and Islamic Studies</h2>
<p>You start your specialist subjects in your first semester. The Seven Qira'at run through Levels 1 to 6 and the Three Qira'at through Levels 7 and 8. Tafsir builds from an introduction in Level 1 to five levels of analytical tafsir, and the script and marking of the Mushaf come in Levels 5 to 7. There are no Qur'an memorisation courses, because you join with the whole Qur'an memorised. Books: <a href="/library/quran">Qur'an library</a>.</p>
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
<p>You take a Qur'an course in every level, one to eight. The hadith sciences build step by step: an introduction and the history of the Sunnah in Level 1, analytical hadith from Level 2, mustalah from Level 3, the narrators and al-jarh wat-ta'dil from Levels 3 to 6, the books of the Sunnah from Level 4, and takhrij in Levels 6 and 7. The degree ends with two research seminars and co-op training. Books: <a href="/library/hadith">Hadith library</a>.</p>
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
<p>The 1448 plan adds Applications of Artificial Intelligence in Level 4. In 1446 the college moved History of the Sunnah to Level 1, started Analytical Hadith a level earlier (Level 2 instead of Level 3), added Co-op Training in Level 8, and dropped University Skills, Study of Saudi Law and Innovation. Your Student plan in the Academic System shows the plan you follow.</p>
<h2>The shared first year: Aqidah and Da'wah, Arabic, and Business</h2>
<p>These three colleges share the same first two levels, so you study alongside students of all three.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1</td><td>Language Skills (المهارات اللغوية), University Skills (مهارات جامعية), the Prophet's Sirah (السيرة النبوية), Introduction to Prophetic Hadith (المدخل إلى الحديث النبوي), Tawhid 1 (توحيد 1), Introduction to the Study of Fiqh (المدخل لدراسة الفقه), Fiqh 1 (الفقه 1), Qur'an 1 (القرآن الكريم 1), Tajwid (التجويد), Introduction to the Study of Saudi Law (المدخل إلى دراسة الأنظمة)</td></tr>
<tr><td>2</td><td>Entrepreneurship and Innovation (ريادة الأعمال والابتكار), Principles and Methods of Da'wah (أصول الدعوة وطرقها), Introduction to Mustalah al-Hadith (المقدمة في مصطلح الحديث), Tawhid 2, Introduction to Tafsir and the Qur'anic Sciences (مدخل إلى تفسير القرآن وعلومه), Fiqh 2, Qur'an 2, Nahw 1 (النحو 1)</td></tr>
</tbody></table>
<h2>College of Aqidah and Da'wah</h2>
<p>After the shared first year, you take a tawhid course every level up to Tawhid 8, alongside sects, religions, contemporary ideologies, the history and methods of da'wah, and debate and logic. Books: <a href="/library/dawah">Da'wah library</a>.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1 and 2</td><td>The shared first year, listed above</td></tr>
<tr><td>3</td><td>Principles of Da'wah 1 (أصول الدعوة 1), History of Da'wah 1 (تاريخ الدعوة 1), Modern Technology in Da'wah (تطبيقات التقنية الحديثة في الدعوة), Tawhid 3, Sects 1 (الفرق 1), Research Methods (مناهج البحث), Hadith of Rulings: Worship (أحاديث الأحكام: عبادات), Tafsir 1 (التفسير 1), Qur'an 3, Nahw 2</td></tr>
<tr><td>4</td><td>History of Da'wah 2, Hisbah (الحسبة), Principles of Da'wah 2, Tawhid 4, Sects 2, Takhrij (التخريج), Hadith of Rulings: Transactions (أحاديث الأحكام: معاملات), Tafsir 2, Qur'an 4, Nahw 3</td></tr>
<tr><td>5</td><td>Da'wah Texts in the Qur'an and Sunnah (نصوص الدعوة في القرآن والسنة), Principles of Da'wah 3, Religions 1 (الأديان 1), Contemporary Ideologies and Movements 1 (المذاهب والتيارات المعاصرة 1), Tawhid 5, Sects 3, Islamic Values (قيم إسلامية), Analytical Hadith (حديث تحليلي), Tafsir 3, Qur'an 5</td></tr>
<tr><td>6</td><td>Principles of Da'wah 4, Fiqh of Da'wah 1 (فقه الدعوة 1), Religions 2, Contemporary Ideologies 2, Tawhid 6, Sects 4, Usul al-Fiqh 1 (أصول الفقه 1), History of the Kingdom (تاريخ المملكة), Thematic Tafsir (التفسير الموضوعي), Qur'an 6</td></tr>
<tr><td>7</td><td>Da'wah Training (التدريب الدعوي), Fiqh of Da'wah 2, Academic Research in Da'wah (البحث العلمي في الدعوة), Religions 3, Contemporary Ideologies 3, Tawhid 7, Debate and Logic 1 (الجدل والمنطق 1), Usul al-Fiqh 2, Fara'id (الفرائض), Qur'an 7</td></tr>
<tr><td>8</td><td>Orientalist Studies (دراسات استشراقية), Means and Styles of Da'wah (وسائل الدعوة وأساليبها), Economics of Da'wah (اقتصاديات الدعوة), Tawhid 8, Debate and Logic 2, Academic Research in Aqidah (البحث العلمي في العقيدة), the Creed of the Four Imams (اعتقاد الأئمة الأربعة), Contemporary Islamic Groups and Movements (الجماعات والحركات الإسلامية المعاصرة), Legal Maxims (القواعد الفقهية), Qur'an 8</td></tr>
</tbody></table>
<h2>College of Sharia</h2>
<p>You study fiqh, usul al-fiqh and the legal verses and hadith alongside Saudi law from your first semester, with co-op training in Levels 6 and 7 and two research papers. Books: <a href="/library/sharia">Sharia library</a>.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1</td><td>Introduction to Usul al-Fiqh (المدخل لدراسة أصول الفقه), Introduction to Prophetic Hadith (المدخل إلى الحديث النبوي), Qur'anic Sciences (علوم القرآن), Fiqh of Worship 1 (فقه العبادات 1), the Judicial System (التنظيم القضائي), Arabic Writing (التحرير العربي), Nahw 1 (النحو 1), Tawhid 1 (توحيد 1), Introduction to the Study of Fiqh (المدخل لدراسة الفقه), Qur'an 1 (القرآن الكريم 1), Introduction to the Study of Saudi Law (المدخل إلى دراسة الأنظمة)</td></tr>
<tr><td>2</td><td>The Sharia Ruling (الحكم الشرعي), Introduction to Mustalah al-Hadith (المقدمة في مصطلح الحديث), Hadith of Rulings 1 (أحاديث الأحكام 1), Introduction to the Science of Tafsir (المدخل إلى علم التفسير), Fiqh of Worship 2, Administrative Judiciary (القضاء الإداري), Constitutional Law (النظام الدستوري), History of the Kingdom (تاريخ المملكة), Islamic Values (قيم إسلامية), Principles and Methods of Da'wah (أصول الدعوة وطرقها), Tawhid 2, Qur'an 2</td></tr>
<tr><td>3</td><td>Evidences for Rulings 1 (أدلة الأحكام 1), Research Methods and Sources in the Sharia Sciences (مناهج البحث ومصادر في العلوم الشرعية), Hadith of Rulings 2, Tafsir of the Legal Verses 1 (تفسير آيات الأحكام 1), Fiqh of Worship 3, Nahw 2, Private International Law (النظام الدولي الخاص), Zakat and Tax Law (نظم الزكاة والضرائب), Administrative Law (النظام الإداري), Tawhid 3, Qur'an 3</td></tr>
<tr><td>4</td><td>Evidences for Rulings 2, Disputation and Debate (الجدل والخلاف والمناظرة), Hadith of Rulings 3, Tafsir of the Legal Verses 2, Fiqh of Worship 4, Sharia Court Procedure (نظام المرافعات الشرعية), Nahw 3, Public International Law (النظام الدولي العام), Commercial Courts Law (نظام المحاكم التجارية), Qur'an 4</td></tr>
<tr><td>5</td><td>Evidences for Rulings 3, Tafsir of the Legal Verses 3, Fara'id 1 (الفرائض 1), Family Fiqh (فقه الأسرة), Personal Status Law (نظام الأحوال الشخصية), Commercial Papers and Bankruptcy Law (نظام الأوراق التجارية والإفلاس), Contemporary Ideologies and Movements (المذاهب والتيارات المعاصرة), Religions and Sects (الأديان والفرق), Takhrij (التخريج), Qur'an 5</td></tr>
<tr><td>6</td><td>Dalalat al-Alfaz 1 (دلالات الألفاظ 1), Fiqh of Food, Oaths and Vows (فقه الأطعمة والأيمان والنذور), Fara'id 2, Co-op Training (التدريب التعاوني), Fiqh of Transactions 1 (فقه المعاملات 1), Fiqh of Judging (فقه القضاء), Law of Evidence (نظام الإثبات), Commercial Contracts and Banking (العقود التجارية وعمليات البنوك), Labour and Social Insurance Law (نظام العمل والتأمينات الاجتماعية), Legal Drafting (الصياغة القانونية), Qur'an 6</td></tr>
<tr><td>7</td><td>Legal Maxims 1 (القواعد الفقهية 1), Takhrij al-Furu' 'ala al-Usul (تخريج الفروع على الأصول), Dalalat al-Alfaz 2, Fara'id 3, Fiqh Research Paper (بحث فقه), Fiqh of Transactions 2, Co-op Training 2, Companies Law (نظام الشركات), Enforcement Law (نظام التنفيذ), Law of Legal Practice (نظام المحاماة), Qur'an 7</td></tr>
<tr><td>8</td><td>Legal Maxims 2, Ijtihad (الاجتهاد), Maqasid ash-Shari'ah (مقاصد الشريعة), Usul al-Fiqh Research Paper (بحث أصول الفقه), Fiqh of Hudud and Crimes (فقه الحدود والجنايات), Fiqh of New Issues (فقه النوازل), Civil Transactions Law (نظام المعاملات المدنية), Criminal Law (النظام الجنائي), Criminal Procedure Law (نظام الإجراءات الجزائية), Applications of Artificial Intelligence (تطبيقات الذكاء الاصطناعي), Qur'an 8</td></tr>
</tbody></table>
<h2>College of Arabic Language and Humanities</h2>
<p>After the shared first year, you study nahw and sarf almost every level, balaghah in its three branches, literature from the pre-Islamic era to today, linguistics and media. Qur'an courses run to Level 4, and the degree ends with a graduation project. Books: <a href="/library/arabic">Arabic library</a>.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1 and 2</td><td>The shared first year, listed above</td></tr>
<tr><td>3</td><td>'Ilm al-Ma'ani 1 (علم المعاني 1), Pre-Islamic Literature (الأدب الجاهلي), Literary Texts 1 (النصوص الأدبية 1), Nahw 2, the Origins of Nahw (نشأة النحو), Sarf 1 (الصرف 1), Language Skills 2 (المهارات اللغوية 2), History of the Kingdom (تاريخ المملكة), Islamic Values (قيم إسلامية), Religions and Sects (الأديان والفرق), Qur'an 3</td></tr>
<tr><td>4</td><td>'Ilm al-Ma'ani 2, Literature of Early Islam and the Umayyads (أدب صدر الإسلام وبني أمية), Literary Texts 2, Media Content Creation 1 (صناعة المحتوى الإعلامي 1), Phonetics (علم الأصوات), Nahw 3, Sarf 2, Language Skills 3, Semantics (علم الدلالة), Lexicography (علم المعاجم), Qur'an 4</td></tr>
<tr><td>5</td><td>'Ilm al-Ma'ani 3, Abbasid Literature (الأدب العباسي), Literary Texts 3, Introduction to Communication (مقدمة في الاتصال), Nahw 4, Sarf 3, Research Methods in Linguistics (مناهج البحث في اللغة), Philology (فقه اللغة), Arabic Dialects (اللهجات العربية)</td></tr>
<tr><td>6</td><td>Research Methods in Literature (مناهج البحث في الأدب), 'Ilm al-Bayan 1 (علم البيان 1), Andalusian Literature (الأدب الأندلسي), Classical Criticism (النقد القديم), Literary Texts 4, New Media (الإعلام الجديد), Television Studios (الاستوديوهات التلفزيونية), Nahw 5, Prosody and Rhyme (العروض والقافية), Sarf 4, General Linguistics (علم اللغة العام)</td></tr>
<tr><td>7</td><td>Literature of the Successive States (أدب الدول المتتابعة), Literary Texts 5, 'Ilm al-Bayan 2, the Inimitability of the Qur'an (إعجاز القرآن), Modern Criticism 1 (النقد الحديث 1), Comparative Literature (الأدب المقارن), Literary Translation (الترجمة الأدبية), Media Content Creation 2, Nahw 6, Sarf 5, Applied Linguistics (علم اللغة التطبيقي)</td></tr>
<tr><td>8</td><td>Literary Texts 6, 'Ilm al-Badi' (علم البديع), Discourse Analysis (تحليل الخطاب), Modern Criticism 2, Saudi Literature (الأدب السعودي), Nahw 7, Graduation Project (مشروع التخرج), Computational Linguistics (علم اللغة الحاسوبي), Sociolinguistics (علم اللغة الاجتماعي)</td></tr>
</tbody></table>
<h2>College of Business: Economics</h2>
<p>After the shared first year, economics, finance, accounting and statistics run alongside usul al-fiqh, the fiqh of transactions and zakat. Qur'an courses run to Qur'an 4, and the final level includes economic terms in English and a research and training course.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1 and 2</td><td>The shared first year, listed above</td></tr>
<tr><td>3</td><td>Usul al-Fiqh (أصول الفقه), Principles of Microeconomics (مبادئ الاقتصاد الجزئي), Mathematics for Economists (الرياضيات للاقتصاديين), Foundations of Islamic Economics (أصول الاقتصاد الإسلامي), Fiqh of Zakat and Waqf (فقه الزكاة والوقف), Islamic Values (قيم إسلامية), Nahw 2</td></tr>
<tr><td>4</td><td>Hadith of Rulings: Transactions (أحاديث الأحكام: معاملات), Fiqh of Transactions (فقه المعاملات), Microeconomic Analysis (التحليل الاقتصادي الجزئي), Principles of Macroeconomics (مبادئ الاقتصاد الكلي), Principles of Statistics (مبادئ الإحصاء), Principles of Business Administration (مبادئ إدارة الأعمال), History of the Kingdom (تاريخ المملكة), Professional Ethics (أخلاقيات المهنة), Qur'an 3</td></tr>
<tr><td>5</td><td>Macroeconomic Analysis (التحليل الاقتصادي الكلي), Money and Banking (النقود والبنوك), Public Finance (المالية العامة), Principles of Finance and Investment (مبادئ التمويل والاستثمار), Principles of Financial Accounting (مبادئ المحاسبة المالية), History of Economic Thought (تطور الفكر الاقتصادي), Resource and Environmental Economics (اقتصاديات الموارد والبيئة), Qur'an 4</td></tr>
<tr><td>6</td><td>Legal Maxims (القواعد الفقهية), Economics of Zakat and Waqf (اقتصاديات الزكاة والوقف), Applied Statistics (الإحصاء التطبيقي), Financial Markets (الأسواق المالية), Islamic Finance (التمويل الإسلامي), Principles of Marketing (مبادئ التسويق), Commercial Law (القانون التجاري), Balaghah (البلاغة)</td></tr>
<tr><td>7</td><td>Maqasid ash-Shari'ah (مقاصد الشريعة), Financial Statement Analysis (تحليل التقارير المالية), Risk and Insurance (المخاطر والتأمين), Islamic Banking Operations (عمليات المصارف الإسلامية), Economic Development and Planning (التنمية والتخطيط الاقتصادي), Econometrics (الاقتصاد القياسي), as-Siyasah ash-Shar'iyyah (السياسة الشرعية), Research Methods (مناهج البحث)</td></tr>
<tr><td>8</td><td>Contemporary Ideologies and Movements (المذاهب والتيارات المعاصرة), Foreign Trade (التجارة الخارجية), Feasibility Studies and Project Evaluation (دراسة الجدوى وتقييم المشروعات), Economic Terms in English (مصطلحات اقتصادية بالإنجليزية), the Saudi Economy (الاقتصاد السعودي), Research and Training (بحث وتدريب), Financial Engineering (الهندسة المالية)</td></tr>
</tbody></table>
<h2>College of Law and Judicial Studies</h2>
<p>Saudi law, fiqh and usul run together from Level 1. Qur'an courses run to Level 4, and the last three levels each have one elective. Books: <a href="/library/law">Law library</a>.</p>
<table><thead><tr><th>Level</th><th>Courses</th></tr></thead><tbody>
<tr><td>1</td><td>Qur'an 1 (القرآن الكريم 1), Introduction to the Study of Fiqh (المدخل لدراسة الفقه), Introduction to the Study of Saudi Law (المدخل لدراسة الأنظمة), Principles of Economics (مبادئ علم الاقتصاد), Islamic Values (قيم إسلامية), Arabic Writing (التحرير العربي), Tawhid 1 (التوحيد 1), Nahw 1 (النحو 1), the Prophet's Sirah (السيرة النبوية)</td></tr>
<tr><td>2</td><td>Qur'an 2, Usul al-Fiqh 1 (أصول الفقه 1), Tafsir of the Legal Verses (تفسير آيات الأحكام), Fiqh of Worship (فقه العبادات), as-Siyasah ash-Shar'iyyah (السياسة الشرعية), History of the Kingdom (تاريخ المملكة), Criminology and Penology (علم الإجرام والعقاب), the Judicial System (التنظيم القضائي), Nahw 2</td></tr>
<tr><td>3</td><td>Qur'an 3, Usul al-Fiqh 2, Commercial Law (النظام التجاري), Constitutional Law (النظام الدستوري), Fiqh of Transactions (فقه المعاملات), Sources of Obligation (مصادر الالتزام), Nahw 3, Tawhid 2</td></tr>
<tr><td>4</td><td>Qur'an 4, Hadith of Rulings (أحاديث الأحكام), Administrative Law (النظام الإداري), General Criminal Law (النظام الجزائي العام), Rules of Obligation (أحكام الالتزام), Fiqh of Crimes and Hudud (فقه الجنايات والحدود), Means of Proof (وسائل الإثبات), Religions and Sects (الأديان والفرق)</td></tr>
<tr><td>5</td><td>Fiqh of Personal Status (فقه الأحوال الشخصية), Civil Contracts (العقود المدنية), Administrative Contracts (العقود الإدارية), Companies Law (نظام الشركات), Sharia Court Procedure (المرافعات الشرعية), Special Criminal Law (النظام الجنائي الخاص), Public Finance (المالية العامة), Research Methods (مناهج البحث)</td></tr>
<tr><td>6</td><td>Fiqh of Waqf and Wills (فقه الأوقاف والوصايا), Commercial Papers and Bankruptcy (الأوراق التجارية والإفلاس), Zakat and Tax Law (نظام الزكاة والضرائب), Criminal Procedure (الإجراءات الجزائية), Public International Law (القانون الدولي العام), Legal Practice and Notarisation (المحاماة والتوثيق), Administrative Judiciary (القضاء الإداري), Inheritance (المواريث), an elective</td></tr>
<tr><td>7</td><td>Legal Maxims (القواعد الفقهية), Commercial Contracts and Banking (العقود التجارية وعمليات البنوك), Real Rights (الحقوق العينية), International Humanitarian Law (القانون الدولي الإنساني), Private International Law (القانون الدولي الخاص), Research and Training (بحث وتدريب), an elective</td></tr>
<tr><td>8</td><td>Maqasid ash-Shari'ah (مقاصد الشريعة), Labour and Social Insurance Law (نظام العمل والتأمينات الاجتماعية), Alternative Dispute Resolution (الوسائل البديلة لفض المنازعات), Intellectual and Commercial Property (الملكية الفكرية والتجارية), Enforcement Law (نظام التنفيذ), Principles of Legal Drafting (أصول الصياغة القانونية), Discourse Analysis (تحليل الخطاب), an elective</td></tr>
</tbody></table>
<blockquote><p>Tip: Not sure which courses are yours this semester, or where to find a course's books? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
];
