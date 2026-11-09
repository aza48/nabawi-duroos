import type { SeedGuide } from "./guides-2026";

/**
 * Admin lane guide, November 2026 (task H): studying at the Islamic University at a distance.
 * Sources and a status per fact are in docs/research/iu-pdfs-2026-11/distance-study-handbook.md
 * (the 60-page distance study system handbook, made 7 November 2026; the same PDF as
 * docs/research/iu-pdfs-2026-11/student-system-guide.md). Register in sync.ts; topics in src/lib/guide-topics.ts.
 */
export const GUIDES_ADMIN_ONLINE_2026_11: SeedGuide[] = [
  {
    slug: "studying-online-at-the-islamic-university",
    stage: "study",
    title: "Studying online at the Islamic University: the distance programmes, step by step",
    summary: "The Islamic University's three distance programmes and what they cost, choosing a specialisation, applying and your first sign-in, registering and paying each semester, live and recorded lectures, attendance, the 60 coursework marks, exams with the camera on, results, requests, common problems and who to contact.",
    bodyHtml: `
<p>Checked 9 November 2026. The Islamic University teaches some of its programmes at a distance, so you can study University courses in the Sharia sciences from your own country, in Arabic, with the University's own teachers. This guide explains the three distance programmes, what they cost, and how a semester runs from registration to results. The screens are the same ones students in Madinah use, and each one is shown step by step in <a href="/guides/university-student-system">Using the University's student system</a>.</p>
<p>Distance study is separate from the scholarship to study in Madinah. To come to Madinah as a full-time student, see <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>

<h2>The three distance programmes</h2>
<table><thead><tr><th></th><th>Electronic university courses (المقررات الجامعية الإلكترونية)</th><th>Distance Sharia bachelor's (بكالوريوس الشريعة عن بعد)</th><th>Associate diploma in the seven qira'at (الدبلوم المشارك في القراءات السبع)</th></tr></thead><tbody>
<tr><td><strong>What you study</strong></td><td>Any of seven specialisations: Qur'an, Hadith, Aqeedah and Da'wah, Sharia, Arabic language, Economics, and Regulations (الأنظمة)</td><td>Sharia only</td><td>The seven qira'at</td></tr>
<tr><td><strong>Plan</strong></td><td>Flexible: you choose your courses and your load</td><td>Fixed: eight levels of about nine courses each, which you must follow</td><td>Two semesters</td></tr>
<tr><td><strong>Load each semester</strong></td><td>No minimum, up to 25 credit hours</td><td>12 to 25 credit hours</td><td>The programme's fixed courses</td></tr>
<tr><td><strong>Length</strong></td><td>No time limit</td><td>8 to 12 semesters</td><td>Two semesters</td></tr>
<tr><td><strong>What you receive</strong></td><td>A certificate for every course you pass, a micro-certificate for a group of related courses, and an associate diploma, intermediate diploma or bachelor's once you complete one</td><td>A bachelor's in Sharia</td><td>An associate diploma</td></tr>
<tr><td><strong>Cost</strong></td><td>230 riyals per credit hour, plus a 230 riyal registration fee each semester</td><td>Free for students given a grant</td><td>230 riyals per credit hour</td></tr>
<tr><td><strong>Admission</strong></td><td>No interview. Apply online and upload your documents</td><td>Offered only when donor bodies fund grants. The University chooses the grant holders from the applicants, so places are fewer</td><td>The whole Qur'an memorised, and a personal interview</td></tr>
</tbody></table>
<p>Both bachelor's degrees end with an exam taken in person at the end of the programme. The rest of the study, lectures and exams included, is done online.</p>

<h2>Which programme suits you</h2>
<ul>
<li><strong>Electronic courses</strong> suit you if your time or budget changes from semester to semester. Pay only for the hours you take, take a semester off with no request and stay a regular student, and keep every hour you have passed for as long as you need. Some students study two years and stop with a diploma once they meet its conditions; others continue to the bachelor's.</li>
<li><strong>The Sharia bachelor's</strong> suits you if you can commit to a full, fixed load every semester and want a free place. It is a regular degree with a set plan and the same rules every semester.</li>
<li><strong>The qira'at diploma</strong> is for students who already hold the whole Qur'an by heart.</li>
</ul>
<p>The study suits beginners. Courses start at introductory levels and build up, and they combine understanding with memorisation. You need no amount of Qur'an by heart to begin the electronic courses or the bachelor's: memorisation starts step by step from Surat al-Baqarah in the first levels.</p>

<h2>The specialisations in the electronic courses</h2>
<table><thead><tr><th>Specialisation</th><th>What it focuses on</th></tr></thead><tbody>
<tr><td>Sharia (الشريعة)</td><td>Fiqh and usul al-fiqh</td></tr>
<tr><td>Qur'an (القرآن الكريم)</td><td>Qira'at, tajweed and tafsir</td></tr>
<tr><td>Hadith (الحديث الشريف)</td><td>Hadith, its chains and texts, and jarh wa ta'deel</td></tr>
<tr><td>Aqeedah and Da'wah (العقيدة والدعوة)</td><td>Tawheed and aqeedah</td></tr>
<tr><td>Arabic language (اللغة العربية)</td><td>Nahw, sarf and balaghah</td></tr>
<tr><td>Regulations (الأنظمة)</td><td>Law, above all Saudi law</td></tr>
<tr><td>Economics (الاقتصاد)</td><td>Economics, Islamic economics and mathematics</td></tr>
</tbody></table>
<p>The specialisations share some common courses. In the Sharia bachelor's the core is fiqh in its chapters, usul al-fiqh, qawa'id fiqhiyyah and judicial studies.</p>
<h3>How you specialise</h3>
<p>Every course of every specialisation is open to you when you register. You specialise by what you collect:</p>
<ol>
<li>Choose the specialisation you are aiming for, and look up its courses in the course table of the student guide for your programme. A "yes" under a specialisation marks a course that specialisation requires.</li>
<li>Register those courses semester by semester.</li>
<li>When you have passed every course and requirement of that specialisation, request the qualification.</li>
</ol>
<blockquote><p>Tip: The plans of the colleges in Madinah are a good map for ordering your courses, and the differences from the distance plan are small. See <a href="/guides/what-you-study-by-level">What you study, level by level</a>.</p></blockquote>

<h2>Applying</h2>
<ul>
<li>Apply on the University's official website, <a href="https://iu.edu.sa/">iu.edu.sa</a>. For the electronic courses there is no interview.</li>
<li>Upload the documents asked for, such as a copy of your passport and your certificates, and complete the registration steps on the site.</li>
<li>Follow your application by email. Watch your inbox and your spam folder.</li>
<li>Once you are accepted, an email arrives from IU Eservices titled <strong>IU Single Sign-On</strong>, with your University number and a temporary password.</li>
</ul>

<h2>Your first sign-in</h2>
<ol>
<li>Open <a href="https://iu.edu.sa/">iu.edu.sa</a> and tap the <strong>user account</strong> icon at the top.</li>
<li>Tap <strong>Login with University number</strong> (الدخول بالرقم الجامعي / الوظيفي). Nafath is the other option, for those who have it.</li>
<li>Type your University number, the temporary password, and the <strong>verification code</strong> (رمز التحقق) shown beside the box, then tap <strong>Login</strong> (دخول).</li>
<li>Change the password straight away: tap the <strong>user account</strong> icon, then <strong>Change password</strong> (تغيير كلمة المرور). It needs at least 8 characters, with a capital letter, a small letter, a number and a symbol such as ! @ # $ or %.</li>
<li>Check your mobile number under <strong>Change mobile number</strong> (تغيير رقم الجوال). Your codes and University alerts go to it.</li>
</ol>
<p>Your dashboard, <strong>My student data</strong> (بياناتي الطلابية), shows the semester you joined, your total absence and today's lectures. For students of the electronic courses, the current semester, semester GPA and cumulative GPA stay empty: courses earn certificates one by one, so no GPA is worked out there. Today's lectures appear only when the teacher has entered their times in the Academic System, so follow your courses in Blackboard as well.</p>

<h2>The platforms you will use</h2>
<table><thead><tr><th>Platform</th><th>What you do there</th></tr></thead><tbody>
<tr><td><strong>Academic System</strong> (النظام الأكاديمي)</td><td>Register and pay, see your registered courses, absence, results, academic record and plan, print documents, contact your academic advisor</td></tr>
<tr><td><strong>Blackboard</strong> (إدارة التعلم الإلكتروني زدني)</td><td>Live and recorded lectures, course files, assignments, tests, your marks and messages to your teachers</td></tr>
<tr><td><strong>Tawasul</strong> (نظام تواصل / إدارة الطلبات)</td><td>Requests and problems, including withdrawing from a course</td></tr>
<tr><td><strong>Saudi Digital Library</strong> (المكتبة الرقمية السعودية)</td><td>Books and references. It opens from inside Saudi Arabia, so teachers send the books and notes you need</td></tr>
</tbody></table>
<p>All of them open from the same sign-in. The <strong>Zidni</strong> tile opens Blackboard with no second login. On a phone or tablet, open the Blackboard app, type Islamic University of Madinah, tap <strong>Continue with Web-Login</strong> and sign in with your University number as the username.</p>

<h2>Registering your courses each semester</h2>
<p>Use a computer. The registration page does not work well on a phone, and it times out if you leave it open too long.</p>
<ol>
<li>Open the <strong>Academic System</strong>, then <strong>Electronic Registration</strong> (التسجيل الإلكتروني). Read <strong>Instructions and guidance</strong> (تعليمات و إرشادات) the first time.</li>
<li>Open <strong>Courses offered in the plan</strong> (المقررات المطروحة وفق الخطة) to see what you can register.</li>
<li>Open <strong>Drop and add</strong> (الحذف والإضافة). Tick the course, tap the magnifier under <strong>Search for a section</strong> (ابحث عن شعبة), and tap the section number in the box that opens.</li>
<li>Scroll down and tap <strong>Add</strong> (إضافة). The course moves to <strong>Unconfirmed actions</strong> (إجراءات غير مثبتة).</li>
<li>Tap <strong>Confirm</strong> (تثبيت). Nothing is registered until you confirm.</li>
<li>Pay your fees, as in the next section.</li>
<li>Open <strong>Registered courses</strong> (المقررات المسجلة) and check every course, its hours and its teacher.</li>
</ol>
<ul>
<li>Check your choices, both the number of courses and which ones, before you confirm. A course is not always easy to drop afterwards.</li>
<li>If you must drop a course after confirming and the drop fails, send a Tawasul request to the E-Learning Center asking for the course to be dropped (steps below).</li>
</ul>

<h2>Fees and paying by card</h2>
<p>Fees for the electronic courses come in two parts: a <strong>registration fee of 230 riyals</strong> at the start of each semester, and <strong>230 riyals for every credit hour</strong> you add.</p>
<table><thead><tr><th>Example semester</th><th>Riyals</th></tr></thead><tbody>
<tr><td>Registration fee</td><td>230</td></tr>
<tr><td>Three 2-hour courses and one 3-hour course: 9 hours x 230</td><td>2,070</td></tr>
<tr><td><strong>Total</strong></td><td><strong>2,300</strong></td></tr>
</tbody></table>
<ol>
<li>In the Academic System, open <strong>Personal</strong> (شخصي), then <strong>E-payment</strong> (الدفع الإلكتروني), then <strong>Cards</strong> (بطاقات).</li>
<li>The amount due is shown. Type exactly the same amount under <strong>Amount to pay</strong> (المبلغ المراد دفعه) and tap <strong>Pay</strong> (دفع).</li>
<li>Pay with mada, Visa or Mastercard. Once the payment goes through, the Financial Administration is told automatically and your amount due is updated. You do not need to send the receipt to anyone, but keep a copy.</li>
</ol>
<p><strong>Before you pay:</strong></p>
<ul>
<li>Make sure your card works for purchases outside your country and is not blocked.</li>
<li>Hold more than the amount due on the card: your bank adds a currency conversion fee.</li>
<li>If your card cannot pay abroad, ask a relative or someone you know who lives outside your country to pay for you.</li>
<li>Never ask a classmate to pay for you, in a group or in private. It is not allowed.</li>
<li>If a payment fails but the money left your account, contact the bank that issued your card.</li>
</ul>

<h2>How a course is taught</h2>
<p>Every course has a set number of weekly hours, depending on the course. They are split in two:</p>
<ul>
<li><strong>Live lectures</strong> (المحاضرة التزامنية): a meeting with your teacher in Blackboard, about an hour long.</li>
<li><strong>Self-paced study</strong> (المحاضرة غير التزامنية): recorded lectures and set learning activities that cover part of the course.</li>
</ul>
<p><strong>Example:</strong> Fiqh al-Ibadat 1 in the Sharia specialisation has 4 weekly hours: 1 live hour and 3 self-paced hours. A course's credit hours set its weight in your GPA.</p>
<p>Teachers teach mostly from their own summaries and notes, with enrichment material in Blackboard. All teachers in the distance programmes are men. The University teaches students in many countries, and teachers set lecture times with the time differences in mind.</p>
<h3>Joining a live lecture</h3>
<ol>
<li>In Blackboard, open <strong>Courses</strong> and tap the course.</li>
<li>Under <strong>Details and actions</strong> (التفاصيل والإجراءات), tap <strong>Class Collaborate</strong>, then <strong>Join session</strong> (الانضمام إلى الجلسة), and tap the lesson.</li>
<li>To keep the file your teacher is showing, tap the download icon at the top of the shared file during the session.</li>
</ol>
<p>You do not need to turn your camera on in lectures.</p>
<h3>Watching a recording</h3>
<ol>
<li>Tap the three dots beside <strong>Class Collaborate</strong>, then <strong>View all recordings</strong> (عرض جميع التسجيلات).</li>
<li>Tap the lesson's recording, then <strong>Watch now</strong> (المشاهدة الآن).</li>
</ol>
<p>Recordings stay available until after the final exams.</p>

<h2>Attendance</h2>
<ul>
<li>Lectures go out live. If you watch the recording <strong>within 24 hours</strong>, you are not marked absent.</li>
<li>Some lectures must be attended live, above all the Qur'an classes, and some teachers require every student to attend live. Your teacher tells you at the start of the course.</li>
<li>Attendance is recorded electronically when you attend or miss a lecture. Some teachers record it by hand, so learn each teacher's method, above all in the Qur'an courses.</li>
<li>The absence that counts is the one in the Academic System: <strong>Personal</strong>, then <strong>Absence</strong> (الغياب), shows your absence, lateness and absence percentage in each course, and the total is on your dashboard. The attendance shown in Blackboard is for follow-up only, and warnings come from the Academic System record.</li>
</ul>

<h2>Your marks: 60 for coursework, 40 for the final</h2>
<p>Every course is out of 100: <strong>60 marks of coursework</strong> (أعمال الفصل) and <strong>40 marks for the final exam</strong>. Each teacher divides the 60 in his own way, from these:</p>
<ul>
<li>one or two semester tests</li>
<li>questions set in Blackboard for you to answer</li>
<li>a research paper on a set topic</li>
<li>a summary of a set book</li>
<li>taking part in a discussion the teacher opens in Blackboard</li>
<li>marks for taking part in the lectures</li>
<li>in the Qur'an courses, recordings of your memorisation uploaded to a Blackboard assignment</li>
<li>other assignments and tasks</li>
</ul>
<ul>
<li>Semester tests are closed book unless your teacher allows notes, and some are invigilated like the final.</li>
<li>Every task has a start date and a due date. Submit before the deadline, or you lose its marks.</li>
<li>Enrichment lessons (الدروس الإثرائية) are self-study lessons that carry no marks, but you are expected to complete them.</li>
</ul>
<blockquote><p>Tip: In Blackboard, open <strong>Calendar</strong>, then <strong>Due dates</strong> (تواريخ الاستحقاق) every week, and turn on notifications in your settings: on a computer under your name, on a phone under <strong>More</strong>, then <strong>Settings</strong>. You can add your own study times to the calendar with the + button.</p></blockquote>

<h2>Exams</h2>
<ul>
<li>Exams are taken online, on a computer, with your camera on throughout.</li>
<li>Most questions are true or false and multiple choice. The lectures, semester tests and finals work the same way in the electronic courses and the Sharia bachelor's, but each teacher sets his own.</li>
<li>Before each exam, check your camera, your internet connection and your charger, and sit somewhere quiet where you will not be interrupted.</li>
<li>Missed a final for a real reason? After the finals, open <strong>Academic</strong>, then <strong>Final exam excuse</strong> (تقديم الأعذار عن غياب الاختبار النهائي), then <strong>Request excuse from the final exams</strong> (طلب اعتذار عن الاختبارات النهائية), to ask for a substitute exam. Follow it under <strong>Show and follow excuse requests</strong> (اظهار و متابعة طلبات الاعتذار).</li>
<li>There is no summer semester for distance students.</li>
</ul>

<h2>Results and certificates</h2>
<ol>
<li><strong>Evaluate every course first.</strong> Your results, coursework marks included, stay hidden until you do. Open <strong>Academic</strong>, then <strong>Course evaluation</strong> (تقييم المقررات), tap each course code and answer every statement. It opens just before the exams and for a short time at their start, then closes, so do it as soon as it opens.</li>
<li>Open <strong>Electronic Registration</strong>, then <strong>Course results</strong> (نتائج المقررات), and choose the semester. Each course shows the final exam mark, the coursework mark, the total and the grade. Tap <strong>Print</strong> (طباعة) to keep a copy.</li>
<li>Your <strong>academic record</strong> (السجل الأكاديمي), under Academic, shows your registered and passed hours and your grade in every course. It is for your own reference.</li>
<li>What you have passed and what is left: <strong>Academic</strong>, then <strong>Passed courses in the plan</strong> (المقررات المجتازة في الخطة), <strong>Remaining courses in the plan</strong> (المقررات المتبقية في الخطة) or <strong>Student plan</strong> (خطة الطالب).</li>
<li>Official papers are under <strong>Personal</strong>, then <strong>Official documents</strong> (المستندات الرسمية): your <strong>student statement</strong> (كشف الطالب) and the <strong>electronic university course completion certificate</strong> (شهادة إتمام مقرر جامعي إلكتروني). They open in a pop-up, so allow pop-ups for eservices.iu.edu.sa in your browser.</li>
</ol>
<p>Whether your country accepts the certificate depends on its own rules, so ask its education ministry before you rely on it for a job or further study. It is of use in Islamic centres and in da'wah work.</p>

<h2>Requests and getting in touch</h2>
<h3>Tawasul</h3>
<ol>
<li>From the sign-in page, open <strong>Tawasul / Requests management</strong> (نظام تواصل / إدارة الطلبات).</li>
<li>Tap <strong>New request</strong> (طلب جديد).</li>
<li>Choose <strong>Contact the E-Learning Center (Blackboard)</strong> (التواصل مع مركز التعليم الإلكتروني (بلاك بورد)) for anything about your courses, registration or Blackboard, or <strong>Technical contact</strong> (تواصل تقني) for a technical fault.</li>
<li>Give the request a clear title under <strong>Subject</strong> (الموضوع), explain it under <strong>Request details</strong> (تفاصيل الطلب), and add a screenshot if it helps.</li>
<li>Tap <strong>Send request</strong> (إرسال الطلب), and follow the answer under <strong>My requests</strong> (طلباتي).</li>
</ol>
<h3>Leaving a course or a semester</h3>
<ul>
<li><strong>Electronic courses:</strong> to withdraw from a course, send a Tawasul request to the E-Learning Center. The Course withdrawal screen in the Academic System does not work for these courses. There is no ta'jeel or i'tithaar, and you do not need one: a semester with no courses leaves you a regular student.</li>
<li><strong>Sharia bachelor's:</strong> for ta'jeel (postponing a semester) or i'tithaar (leaving a semester), open <strong>Academic</strong>, then <strong>Enter academic movements</strong> (إدخال حركات أكاديمية), then <strong>Enter a new academic movement</strong> (إدخال حركة أكاديمية جديدة), read the conditions and tap <strong>I agree</strong> (أوافق). It opens only in the windows the University sets. You have <strong>three chances in total</strong> over the whole programme. Never simply stop studying: your file is closed (طي القيد). Past requests are under <strong>Previous academic movements</strong> (حركات أكاديمية سابقة).</li>
</ul>
<h3>Your teachers and your academic advisor</h3>
<ul>
<li>The official ways to reach a teacher are your University email and Blackboard messages. In Blackboard, open the course and tap the envelope beside the teacher's name. In the Academic System, open <strong>Personal</strong>, then <strong>Send email</strong> (إرسال بريد إلكتروني), tick the teacher, write the subject and message, and tap <strong>Send</strong> (إرسال).</li>
<li>Your academic advisor: <strong>Academic</strong>, then <strong>Contact the academic advisor</strong> (التواصل مع المرشد الأكاديمي), then <strong>New request</strong> (طلب تواصل جديد). Write your message, attach a file if needed, and tap <strong>Send</strong>.</li>
</ul>
<p>Correcting your name, nationality or date of birth, and every other screen, are in <a href="/guides/university-student-system">Using the University's student system</a>.</p>

<h2>Common problems</h2>
<table><thead><tr><th>Problem</th><th>What to do</th></tr></thead><tbody>
<tr><td>I cannot sign in at all</td><td>Email <strong>it.care@iu.edu.sa</strong> for a password, or use the guest form at <a href="https://helpdesk.iu.edu.sa/newticket_guest">helpdesk.iu.edu.sa/newticket_guest</a></td></tr>
<tr><td>I forgot my Blackboard password</td><td>On the Web Login page tap <strong>Forgot your password?</strong> (هل نسيت كلمة المرور؟), give your first and family name exactly as registered with your University number or email, and a reset email arrives. See <a href="/ask/blackboard-login">How do I log in to Blackboard?</a></td></tr>
<tr><td>My GPA and current semester show a dash</td><td>Normal in the electronic courses. Your grades are under Course results</td></tr>
<tr><td>I cannot see my results</td><td>Fill in the course evaluation for every course first</td></tr>
<tr><td>I missed a live lecture</td><td>Watch the recording within 24 hours. In the Qur'an classes and with teachers who require live attendance, the absence stands</td></tr>
<tr><td>A course will not drop after I confirmed</td><td>Send a Tawasul request to the E-Learning Center with the course code</td></tr>
<tr><td>My card was declined</td><td>Check that it allows payments abroad, is not blocked and holds more than the amount due, then ask your bank</td></tr>
<tr><td>The payment failed but the money was taken</td><td>Contact the bank that issued your card, with the receipt or a screenshot</td></tr>
<tr><td>Today's lectures (محاضرات اليوم) shows nothing</td><td>Your teacher has not entered times in the Academic System. Check the course in Blackboard</td></tr>
<tr><td>The Saudi Digital Library will not open</td><td>It opens from inside Saudi Arabia. Ask your teacher for the material in Blackboard</td></tr>
<tr><td>Official documents will not open</td><td>Allow pop-ups for eservices.iu.edu.sa in your browser</td></tr>
</tbody></table>
<p>Never open links posted in class chats: see <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat</a>.</p>

<h2>Who to contact</h2>
<table><thead><tr><th>For</th><th>Contact</th></tr></thead><tbody>
<tr><td>Your courses, registration and Blackboard</td><td>Tawasul to the E-Learning Center, or <strong>elc@iu.edu.sa</strong></td></tr>
<tr><td>Blackboard</td><td><strong>bb@iu.edu.sa</strong></td></tr>
<tr><td>Technical support</td><td><strong>it.support@iu.edu.sa</strong></td></tr>
<tr><td>Passwords and your University account</td><td><strong>it.care@iu.edu.sa</strong>, or the Deanship of IT and E-Learning on <strong>+966 14 847 1856</strong></td></tr>
<tr><td>Admission and registration</td><td><strong>admission.reg@iu.edu.sa</strong> or <strong>admiss.deanship@iu.edu.sa</strong></td></tr>
<tr><td>No account yet, or locked out</td><td>The guest form at <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a></td></tr>
</tbody></table>
<blockquote><p>Tip: Stuck at any step? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
];
