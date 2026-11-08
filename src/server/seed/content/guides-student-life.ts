import type { SeedFaq, SeedGuide } from "./guides-2026";

/** Student life at the Islamic University. Only facts the owner confirmed or the University publishes. */
export const GUIDES_STUDENT_LIFE: SeedGuide[] = [
  {
    slug: "campus-life-islamic-university",
    stage: "study",
    title: "Student life at the Islamic University: meals, buses and housing",
    summary: "The subsidised mat'am meals, the free buses from the University to the Haram, housing, your stipend and how to reach the University.",
    bodyHtml: `
<p>Scholarship students get a lot of daily life covered. This page puts the basics in one place. Checked 8 November 2026.</p>
<h2>Meals at the mat'am</h2>
<p>The University's mat'am (restaurant) serves three subsidised meals a day.</p>
<table><thead><tr><th>Meal</th><th>Price</th></tr></thead><tbody>
<tr><td>Breakfast</td><td>1 SAR</td></tr>
<tr><td>Lunch</td><td>2 SAR</td></tr>
<tr><td>Dinner</td><td>2 SAR</td></tr>
</tbody></table>
<p>Eating there every day costs about 5 SAR, so most students keep their stipend for everything else.</p>
<h2>Free buses to the Haram</h2>
<p>The University runs free buses between the University and Masjid an-Nabawi, so you can pray at the Haram without paying for a taxi. Ask in the MESH group for the current pick-up points and times, as they change.</p>
<h2>Housing</h2>
<p>Scholarship students are housed by default, either inside the Jamiah or in the Rabwa halls (الربوة). See <a href="/ask/is-housing-included">Is housing included?</a>.</p>
<h2>Money and flights</h2>
<ul>
<li>The monthly stipend is 840 SAR, paid during your studies (see the <a href="/ask/stipend-amount">stipend FAQ</a>).</li>
<li>Your yearly ticket home goes through Etimad. See <a href="/guides/etimad-account">Setting up your Etimad account</a>.</li>
<li>Students on a study visa pay nothing for their iqama. See <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, and dependent fees</a>.</li>
</ul>
<h2>Health</h2>
<p>The University clinic covers students. For hospitals, pharmacies and emergency numbers, see <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>
<h2>Sport</h2>
<p>Students get 50% off at the Islamic University sports club, and there are classes at the sports center. See <a href="/guides/sports-and-activities">Sport, fitness and outdoor activities</a>.</p>
<h2>Contacting the University</h2>
<p>Student care: <strong>920022042</strong>, or email <strong>care@iu.edu.sa</strong>. Your own application is on the Study in Saudi and Minhati portals, so keep those logins safe.</p>`,
  },
];

export const FAQS_STUDENT_LIFE: SeedFaq[] = [
  { slug: "mataam-prices", category: "university", question: "How much do meals cost at the University mat'am?", answerHtml: "<p>Breakfast is 1 SAR, lunch 2 SAR and dinner 2 SAR. See <a href=\"/guides/campus-life-islamic-university\">Student life at the Islamic University</a>.</p>", tags: ["food", "mataam", "restaurant", "meals", "campus"] },
  { slug: "free-bus-to-haram", category: "university", question: "Is there a free bus from the University to the Haram?", answerHtml: "<p>Yes. The University runs free buses between the University and Masjid an-Nabawi. Ask in the MESH group for the current pick-up points and times, as they change.</p>", tags: ["bus", "transport", "haram", "campus"] },
];
