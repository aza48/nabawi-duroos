import type { SeedFaq, SeedGuide } from "./guides-2026";

/** Student life at the Islamic University. Only facts the owner confirmed or the University publishes. */
export const GUIDES_STUDENT_LIFE: SeedGuide[] = [
  {
    slug: "campus-life-islamic-university",
    stage: "study",
    title: "Student life at the Islamic University: meals, buses, health and housing",
    summary: "The subsidised mat'am meals, the free buses to the Haram, the Medical Center, the Central Library, housing, the sports club and your University accounts.",
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
<li>Use your own card only. Taking meals on two cards is not allowed.</li>
</ol>
<h2>Free buses</h2>
<p>The University runs free buses between the campus and Masjid an-Nabawi, so you can pray at the Haram without paying for a taxi. Free buses also link the halls outside the campus with the campus. Pick-up points and times change during the year, in Ramadan and in exam weeks, so message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a> for the current ones.</p>
<h2>Housing</h2>
<p>Full scholarship students are housed by the University, either inside the Jamiah or in the Rabwa halls (الربوة). Partial scholarships cover tuition only, with no room. See <a href="/ask/is-housing-included">Is housing included?</a>.</p>
<p>Single students are housed. Family units are offered only when one is free, so most married students rent a flat in the city. See <a href="/guides/finding-an-apartment">Finding and renting a flat</a> and <a href="/guides/cost-of-living">What it costs to live in Madinah</a>.</p>
<h2>Health: the University Medical Center</h2>
<p>The Medical Center on campus is free for scholarship students. It has clinics for internal medicine, children, women and obstetrics, general surgery, skin, ear, nose and throat, and dentistry, with a pharmacy, X-ray and ultrasound, a laboratory and a vaccination unit.</p>
<table><thead><tr><th>Days</th><th>Hours</th></tr></thead><tbody>
<tr><td>Sunday to Thursday, clinics</td><td>8:00 am to 3:15 pm</td></tr>
<tr><td>Sunday to Thursday, emergency shift</td><td>3:15 pm to 11:00 pm</td></tr>
<tr><td>Friday and Saturday, emergency shift</td><td>1:00 pm to 9:00 pm</td></tr>
</tbody></table>
<p>Book a clinic appointment at <a href="https://vcappointments.iu.edu.sa/">vcappointments.iu.edu.sa</a> with your University login. Outside these hours, go to a hospital emergency department or call 997. See <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>
<h2>The Central Library</h2>
<p>Open 6:00 am to midnight, Sunday to Thursday, for men and women. Laptops are allowed and bags are not. See <a href="/ask/library-bags-laptops">Can I take a bag or laptop into the libraries?</a></p>
<h2>Your University accounts</h2>
<ul>
<li><strong>Signing in:</strong> the University login at sso.iu.edu.sa works through Nafath, or with your University number, password and a verification code.</li>
<li><strong>Email:</strong> your University email comes with free Microsoft 365 apps and 1 TB of cloud storage. It is the official channel, so read it every day.</li>
<li><strong>Classes:</strong> Blackboard is the learning platform. Your timetable and final exams are in the Academic System: see <a href="/ask/find-my-timetable">Where do I find my class timetable?</a></li>
<li><strong>Proof that you are a student:</strong> a stamped student ID letter is free and instant in the Academic System under Personal, then Official Documents.</li>
<li><strong>Attendance:</strong> missing more than 25% of a course's hours bars you from its final exam.</li>
</ul>
<h2>Money and flights</h2>
<ul>
<li>Your monthly stipend, the arrival and graduation allowances and how to see them are in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money: stipend, allowances and tickets</a>.</li>
<li>Your yearly ticket home goes through Etimad. See <a href="/guides/etimad-account">Your University ticket: Etimad, the travel order and the rules</a>.</li>
<li>New students on the educational visa hold a Visitor ID, not an iqama, so there is no iqama fee to pay. See <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</li>
</ul>
<h2>Sport</h2>
<p>Students pay reduced rates at the Islamic University sports club, well below the public price, and longer memberships can be frozen for a while. Prices change with seasonal offers, so ask at the club. There are also classes at the sports center: see <a href="/guides/sports-and-activities">Sport and fitness classes</a>.</p>
<h2>Who to ask</h2>
<p>Student care: <strong>920022042</strong>, or email <strong>care@iu.edu.sa</strong>. Which office handles what is in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>`,
  },
];

export const FAQS_STUDENT_LIFE: SeedFaq[] = [
  { slug: "mataam-prices", category: "university", question: "How much do meals cost at the University mat'am?", answerHtml: "<p>Breakfast is 1 SAR, lunch 2 SAR and dinner 2 SAR, for full scholarship students. Book your meals a month at a time on <a href=\"https://restaurant.iu.edu.sa/\">restaurant.iu.edu.sa</a> with your University login. See <a href=\"/guides/campus-life-islamic-university\">Student life at the Islamic University</a>.</p>", tags: ["food", "mataam", "restaurant", "meals", "campus"] },
  { slug: "married-students-housing", category: "family", question: "Do married students get free housing?", answerHtml: "<p>Single scholarship students are housed by the University. Family units are offered only when one is free, so most married students rent a flat in the city. See <a href=\"/guides/finding-an-apartment\">Finding and renting a flat</a>.</p>", tags: ["married", "housing", "family", "students"] },
  { slug: "what-is-ejar", category: "getting-settled", question: "What is Ejar and what do I use it for?", answerHtml: "<p>Ejar is the national electronic platform of the Real Estate General Authority for registering a home rental, renewing it and ending it. An accredited agent or the landlord creates the contract, and you approve it from the link Ejar sends by SMS. The fee is 125 SAR a year, and the contract says who pays it. A registered contract is what you use for services such as renewing your iqama, updating your National Address and connecting utilities. Ejar's helpline is 199011. If you are on a student visa, an accredited agent registers the contract for you: see <a href=\"/ask/rent-on-student-visa\">Can I register a rental contract on a student visa?</a>.</p>", tags: ["ejar", "rent", "contract", "housing"] },
  { slug: "joint-bank-account-spouse", category: "family", question: "Can I open a joint bank account with my wife?", answerHtml: "<p>Yes. The Saudi Central Bank's rules allow joint accounts for residents between spouses and between first-degree relatives, and in a few other set cases. A dependant whose iqama does not allow work can open an account, but the money in it must not come from work. Ask your bank which documents it needs.</p>", tags: ["bank", "joint account", "wife", "married"] },
  { slug: "foreign-prescriptions", category: "getting-settled", question: "Will a pharmacy accept my prescription from home?", answerHtml: "<p>No. Prescriptions from other countries are not accepted, and only doctors licensed in Saudi Arabia can prescribe. Some medicines are controlled. If you take regular medicine, bring a letter from your doctor naming the drug, the dose and the amount, and see a Saudi doctor for a new prescription. More in <a href=\"/guides/doctors-hospitals-and-pharmacies\">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>", tags: ["medicine", "prescription", "pharmacy", "health"] },
  { slug: "free-bus-to-haram", category: "university", question: "Is there a free bus from the University to the Haram?", answerHtml: "<p>Yes. The University runs free buses between the campus and Masjid an-Nabawi, and between the halls outside the campus and the campus. Pick-up points and times change during the year, so message Admin on WhatsApp at +1 234 567 9076 or email <a href=\"mailto:mesh@albaseerah.org\">mesh@albaseerah.org</a> for the current ones.</p>", tags: ["bus", "transport", "haram", "campus"] },
  { slug: "medical-center-hours", category: "university", question: "When is the University Medical Center open?", answerHtml: "<p>Clinics run Sunday to Thursday from 8:00 am to 3:15 pm, followed by an emergency shift until 11:00 pm. On Fridays and Saturdays the emergency shift runs from 1:00 pm to 9:00 pm. Care is free for scholarship students. Book a clinic appointment at <a href=\"https://vcappointments.iu.edu.sa/\">vcappointments.iu.edu.sa</a> with your University login. Outside these hours, go to a hospital emergency department or call 997. See <a href=\"/guides/campus-life-islamic-university\">Student life at the Islamic University</a>.</p>", tags: ["clinic", "medical center", "doctor", "health", "campus"] },
  { slug: "student-ticket-rules", category: "university", question: "What are the rules for my University ticket home?", answerHtml: "<p>The ticket is issued only against a travel order on Etimad, to a capital city in your own country or in the country that issued the visa you arrived on. It is valid for 3 months from the first travel date. The name and the outbound airports cannot be changed, date changes are at your cost, cancelling returns the ticket to the University with no cash refund, and a no-show loses the ticket. You may take one cabin bag and two checked bags. The full list is in <a href=\"/guides/etimad-account\">Setting up your Etimad account</a>.</p>", tags: ["ticket", "flight", "etimad", "travel", "holiday"] },
];
