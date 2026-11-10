import type { SeedFaq, SeedGuide } from "./guides-2026";

/** Student life at the Islamic University. Only facts the owner confirmed or the University publishes. */
export const GUIDES_STUDENT_LIFE: SeedGuide[] = [
  {
    slug: "campus-life-islamic-university",
    stage: "study",
    title: "Student life at the Islamic University: meals, buses, health and housing",
    summary: "The subsidised mat'am meals, the free buses to the Haram, the Medical Center, the Central Library, housing and hall rules, Student Affairs services, Wi-Fi, the sports club and your University accounts.",
    bodyHtml: `
<p>Checked 9 November 2026. Full scholarship students get a lot of daily life covered. This page puts the basics in one place.</p>
<h2>Meals at the mat'am</h2>
<p>The University's mat'am (restaurant) serves full scholarship students three subsidised meals a day.</p>
<table><thead><tr><th>Meal</th><th>Price</th></tr></thead><tbody>
<tr><td>Breakfast</td><td>1 SAR</td></tr>
<tr><td>Lunch</td><td>2 SAR</td></tr>
<tr><td>Dinner</td><td>2 SAR</td></tr>
</tbody></table>
<ol>
<li>Sign in to the restaurant system at <a href="https://restaurant.iu.edu.sa/">restaurant.iu.edu.sa</a> with your University login.</li>
<li>Book your meals for the coming month. Booking is done a month at a time, so set a reminder before each month ends.</li>
<li>Meal times in term in 1447: breakfast from about 6:00 to 8:00 am, lunch from 11:00 am to 2:00 pm, and dinner from about 7:30 to 10:30 pm. Pay online when you book, or at the payment desk behind the restaurant, and show your meal barcode at the counter. The restaurant is behind the College of Sharia.</li>
<li>Use your own card only. Taking meals on two cards is not allowed.</li>
</ol>
<h2>Free buses</h2>
<p>The University runs free buses between the campus and Masjid an-Nabawi, so you can pray at the Haram without paying for a taxi. Free buses also link the halls outside the campus with the campus. Pick-up points and times change during the year, in Ramadan and in exam weeks, so message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a> for the current ones.</p>
<h2>Housing</h2>
<p>Full scholarship students are housed free by the University, either inside the Jamiah or in the Rabwa halls (الربوة). Rooms in the units (wihdat) are usually shared by two students, and some older units put three or four in a room. Each student has a bed, a desk, a chair and a wardrobe. Partial scholarships include no free housing: when places are free, the University offers partial scholarship students a paid room in Unit 13. See <a href="/ask/is-housing-included">Is housing included?</a> and <a href="/guides/unit-13-and-paid-university-housing">Unit 13 and paid University housing</a>.</p>
<p>Single students are housed. Family units are offered only when one is free, so most married students rent a flat in the city. See <a href="/guides/finding-an-apartment">Finding and renting a flat</a> and <a href="/guides/cost-of-living">What it costs to live in Madinah</a>.</p>
<h3>Hall rules that can cost you your place</h3>
<ul>
<li><strong>No guests in your room, and never lend your key.</strong> Hosting anyone, letting anyone in or giving anyone your key is banned, and the penalty is dismissal from the University. Halls inside and outside the campus are inspected all year.</li>
<li><strong>Nothing in empty rooms.</strong> Belongings left in a vacant or handed-back room are removed, and the University accepts no liability for them.</li>
<li><strong>Leave the furniture.</strong> Everything in the room, the bed included, stays there and is checked when you hand the room back.</li>
<li><strong>Laundry rooms:</strong> do not tie washing lines to the pipes or valves, and do not leave clothes there. Damage cuts the water to the whole unit until it is repaired.</li>
<li><strong>Scooters and bicycles</strong> need a registration form and a sticker from Unit 22. Keep them out of rooms and corridors. Do not charge scooters or phones overnight in your room: it has caused fires.</li>
</ul>
<h2>Health: the University Medical Center</h2>
<p>The Medical Center on campus is free for scholarship students. It has clinics for internal medicine, children, women and obstetrics, general surgery, skin, ear, nose and throat, and dentistry, with a pharmacy, X-ray and ultrasound, a laboratory and a vaccination unit.</p>
<table><thead><tr><th>Days</th><th>Hours</th></tr></thead><tbody>
<tr><td>Sunday to Thursday, clinics</td><td>8:00 am to 3:15 pm</td></tr>
<tr><td>Sunday to Thursday, emergency shift</td><td>3:15 pm to 11:00 pm</td></tr>
<tr><td>Friday and Saturday, emergency shift</td><td>1:00 pm to 9:00 pm</td></tr>
</tbody></table>
<p>Book a clinic appointment at <a href="https://vcappointments.iu.edu.sa/">vcappointments.iu.edu.sa</a> with your University login. Outside these hours, go to a hospital emergency department or call 997. See <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>
<h2>The Central Library</h2>
<p>The Central Library is on your right as you come in through the main gate. In term it opens Sunday to Thursday, 8:00 am to midnight, and during final exams it stays open 24 hours. It is closed on Friday and Saturday. It is open to visitors as well as students, and its collections include the personal libraries of several scholars, among them Shaykh al-Albani's. Laptops are allowed and bags are not. The library also lends set textbooks free for the semester: renew them each month and return them in the same condition, or pay a small fine. See <a href="/ask/library-bags-laptops">Can I take a bag or laptop into the libraries?</a></p>
<h2>Your University accounts</h2>
<ul>
<li><strong>Signing in:</strong> the University login at sso.iu.edu.sa works through Nafath, or with your University number, password and a verification code.</li>
<li><strong>Email:</strong> your University email comes with free Microsoft 365 apps and 1 TB of cloud storage. It is the official channel, so read it every day.</li>
<li><strong>Classes:</strong> Blackboard is the learning platform. Your timetable and final exams are in the Academic System: see <a href="/ask/find-my-timetable">Where do I find my class timetable?</a></li>
<li><strong>Proof that you are a student:</strong> a stamped student ID letter is free and instant in the Academic System under Personal, then Official Documents.</li>
<li><strong>Attendance:</strong> missing more than 25% of a course's hours bars you from its final exam.</li>
<li><strong>Wi-Fi:</strong> sign in to the campus network with your University number and password. Each student can connect <strong>2 devices</strong> at most. It is an open network, so avoid banking on it, and take connection problems to the Deanship of IT, in the building behind Unit 18.</li>
</ul>
<h2>Student Affairs services</h2>
<p>The Deanship of Student Affairs (عمادة شؤون الطلاب) and the offices in Unit 22 handle much of daily life:</p>
<ul>
<li><strong>Stipend card:</strong> issued, renewed and replaced at Unit 22. See <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</li>
<li><strong>Loans:</strong> the Student Fund in Unit 22 lends up to 2,000 SAR, repaid from your stipend.</li>
<li><strong>Printed iqama card:</strong> iqama holders can order a plastic iqama card through Student Affairs for about 58 SAR. Print your iqama from Absher, write your mobile number on it and hand it in. They call you to pay, and the card is ready in two to three weeks. Visitor ID holders have no card to print.</li>
<li><strong>Airport buses:</strong> at the end of the academic year the Deanship runs free buses from the University to Prince Mohammad bin Abdulaziz Airport. The start date is announced on its X account, <a href="https://x.com/dsa_iu_edu">@dsa_iu_edu</a>.</li>
<li><strong>Ramadan:</strong> the Deanship serves a daily iftar by the University sports ground and hands out suhoor meals. Classes follow a separate Ramadan timetable.</li>
<li><strong>Free Umrah trips:</strong> the Deanship runs free day trips to Makkah for Umrah by bus, in Ramadan and at other times of the year. Each trip is announced with a registration form on the Deanship's accounts, and buses usually leave from the campus in the early morning or after Dhuhr. The bus comes back the same day, and a student who misses it returns at his own cost. Book your Umrah permit in Nusuk before you go: see <a href="/ask/umrah-from-madinah">How do I go for Umrah from Madinah?</a></li>
<li><strong>Clubs and activities:</strong> run from the Deanship's first floor. You join through each club's president or group.</li>
<li><strong>Nationality representatives:</strong> each nationality has a student representative who passes on University notices and collects ticket and visa lists. Their office is at the Deanship.</li>
<li><strong>Cars:</strong> parking beside the housing units needs a permit. Permits are issued by the permits office just inside the main gate, mainly to postgraduate students and for medical need. Everyone else parks in the main car parks and walks.</li>
</ul>
<h2>Money and flights</h2>
<ul>
<li>Your monthly stipend, the arrival and graduation allowances and how to see them are in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money: stipend, allowances and tickets</a>.</li>
<li>Your yearly ticket home goes through Etimad. See <a href="/guides/etimad-account">Your University ticket: Etimad, the travel order and the rules</a>.</li>
<li>New students on the educational visa hold a Visitor ID, not an iqama, so there is no iqama fee to pay. See <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</li>
</ul>
<h2>Sport</h2>
<p>Students pay reduced rates at the Islamic University sports club, well below the public price, with memberships from one month to a year, and longer memberships can be frozen for a while. The full student price table and the classes at the sports center are in <a href="/guides/sports-and-activities">Sport and fitness classes</a>.</p>
<h2>Who to ask</h2>
<p>Student care: <strong>920022042</strong>, or email <strong>care@iu.edu.sa</strong>. Which office handles what is in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>`,
  },
];

export const FAQS_STUDENT_LIFE: SeedFaq[] = [
  { slug: "mataam-prices", category: "university", question: "How much do meals cost at the University mat'am?", answerHtml: "<p>Breakfast is 1 SAR, lunch 2 SAR and dinner 2 SAR, for full scholarship students. Book your meals a month at a time on <a href=\"https://restaurant.iu.edu.sa/\">restaurant.iu.edu.sa</a> with your University login. See <a href=\"/guides/campus-life-islamic-university\">Student life at the Islamic University</a>.</p>", tags: ["food", "mataam", "restaurant", "meals", "campus"] },
  { slug: "married-students-housing", category: "family", question: "Do married students get free housing?", answerHtml: "<p>No free family housing is promised. Single full scholarship students are housed free by the University. Family units are offered only when one is free, and with family residency (istiqdam) closed since 2025, most married students rent a flat in the city at their own cost. The University's Scholarship Fund (صندوق المنح) runs support programmes for married scholarship students whose families live with them in Madinah: follow its Telegram channel, <a href=\"https://t.me/BoxIslamicUniversity1\">t.me/BoxIslamicUniversity1</a>, and update your details when it asks. See <a href=\"/guides/finding-an-apartment\">Finding and renting a flat</a>.</p>", tags: ["married", "housing", "family", "students"] },
  { slug: "what-is-ejar", category: "getting-settled", question: "What is Ejar and what do I use it for?", answerHtml: "<p>Ejar is the national electronic platform of the Real Estate General Authority for registering a home rental, renewing it and ending it. An accredited agent or the landlord creates the contract, and you approve it from the link Ejar sends by SMS. The fee is 125 SAR a year, and the contract says who pays it. A registered contract is what you use for services such as renewing your iqama, updating your National Address and connecting utilities. Ejar's helpline is 199011. If you are on a student visa, an accredited agent registers the contract for you: see <a href=\"/ask/rent-on-student-visa\">Can I register a rental contract on a student visa?</a>.</p>", tags: ["ejar", "rent", "contract", "housing"] },
  { slug: "joint-bank-account-spouse", category: "family", question: "Can I open a joint bank account with my wife?", answerHtml: "<p>Yes. The Saudi Central Bank's rules allow joint accounts for residents between spouses and between first-degree relatives, and in a few other set cases. A dependant whose iqama does not allow work can open an account, but the money in it must not come from work. Ask your bank which documents it needs.</p>", tags: ["bank", "joint account", "wife", "married"] },
  { slug: "foreign-prescriptions", category: "getting-settled", question: "Will a pharmacy accept my prescription from home?", answerHtml: "<p>No. Prescriptions from other countries are not accepted, and only doctors licensed in Saudi Arabia can prescribe. Some medicines are controlled. If you take regular medicine, bring a letter from your doctor naming the drug, the dose and the amount, and see a Saudi doctor for a new prescription. More in <a href=\"/guides/doctors-hospitals-and-pharmacies\">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>", tags: ["medicine", "prescription", "pharmacy", "health"] },
  { slug: "free-bus-to-haram", category: "university", question: "Is there a free bus from the University to the Haram?", answerHtml: "<p>Yes. The University runs free buses between the campus and Masjid an-Nabawi, and between the halls outside the campus and the campus. Pick-up points and times change during the year, so message Admin on WhatsApp at +1 234 567 9076 or email <a href=\"mailto:mesh@albaseerah.org\">mesh@albaseerah.org</a> for the current ones.</p>", tags: ["bus", "transport", "haram", "campus"] },
  { slug: "medical-center-hours", category: "university", question: "When is the University Medical Center open?", answerHtml: "<p>Clinics run Sunday to Thursday from 8:00 am to 3:15 pm, followed by an emergency shift until 11:00 pm. On Fridays and Saturdays the emergency shift runs from 1:00 pm to 9:00 pm. Care is free for scholarship students. Book a clinic appointment at <a href=\"https://vcappointments.iu.edu.sa/\">vcappointments.iu.edu.sa</a> with your University login. Outside these hours, go to a hospital emergency department or call 997. See <a href=\"/guides/campus-life-islamic-university\">Student life at the Islamic University</a>.</p>", tags: ["clinic", "medical center", "doctor", "health", "campus"] },
  { slug: "student-ticket-rules", category: "university", question: "What are the rules for my University ticket home?", answerHtml: "<p>The ticket is a discounted economy round trip, issued only against a travel order on Etimad, and only when no other party already gives you a ticket. It goes to one of the cities the University sets for your country: in 2026 students going to the USA chose New York or Washington DC. It is valid for 3 months from the first travel date. The name, the destination and the outbound airports cannot be changed. The date can be changed at your cost, at the Saudia office on campus; for an exam clash, first send a Tawasul request to the Travel Administration with your ticket and exam timetable. Cancelling returns the ticket to the University with no cash refund, and a no-show loses it. You may take one cabin bag and two checked bags. Group tickets arrive as one PDF emailed to one student in the group. The full guide is <a href=\"/guides/etimad-account\">Your University ticket: Etimad, the travel order and the rules</a>.</p>", tags: ["ticket", "flight", "etimad", "travel", "holiday"] },
];
