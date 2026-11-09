import type { SeedGuide } from "./guides-2026";

/**
 * Residence papers guides, November 2026 (task E): checking a visa, a border number, insurance and
 * travel status online, and the head of family's Absher services for his wife and children.
 * Written from the research in docs/research/gomedine-2026-11 (parts 1, 3 and 4), cross-checked
 * against the existing MESH guides. Unsettled points went to the owner as questions, not into the text.
 * Registered in sync.ts by the coordinator; topics in src/lib/guide-topics.ts.
 */
export const GUIDES_ADMIN_PAPERS_2026_11: SeedGuide[] = [
  {
    slug: "check-visa-and-iqama-online",
    stage: "getting-settled",
    title: "Checking your visa, border number, insurance and fines online",
    summary: "The checks you can run with no sign-in (border number, visa and exit and re-entry validity, health insurance, SIMs on your iqama) and the ones inside Absher (traffic fines, travel restrictions, Absher reports, your family's iqamas), with a checklist before you travel.",
    bodyHtml: `
<p>Checked November 2026. Before you book a flight, pay a fee or buy insurance for a visitor, check the facts on the official sites. Several checks need no sign-in at all: your border number, whether a visa or an exit and re-entry visa is valid, your health insurance and the SIMs on your iqama. Others, such as traffic fines and travel restrictions, are inside your Absher account. This guide covers both, for iqama holders, Visitor ID holders and the hosts of family visitors.</p>
<h2>What you can check, and where</h2>
<table><thead><tr><th>Check</th><th>Sign-in</th><th>Where</th><th>What you enter</th></tr></thead><tbody>
<tr><td>Your border number</td><td>No</td><td>Absher, public services</td><td>Visa number and visa issue date</td></tr>
<tr><td>Is a visa valid?</td><td>No</td><td>Muqeem visa inquiry</td><td>Iqama or visa number, with date of birth or passport number</td></tr>
<tr><td>Exit and re-entry visa</td><td>No</td><td>Muqeem visa inquiry</td><td>Iqama number and date of birth</td></tr>
<tr><td>Health insurance</td><td>No</td><td>Council of Health Insurance website</td><td>Iqama number; for a visitor, the passport, visa or border number</td></tr>
<tr><td>SIMs on your iqama</td><td>No</td><td>CST My Numbers Inquiry</td><td>Iqama number, date of birth and a code sent to your phone</td></tr>
<tr><td>Traffic fines</td><td>Yes</td><td>Absher, traffic violations</td><td>Nothing: they show on your account</td></tr>
<tr><td>Travel restrictions and suspended services</td><td>Yes</td><td>Absher home page</td><td>Nothing: press Continue</td></tr>
<tr><td>Your family's iqamas and visas</td><td>Yes</td><td>Absher, Family Members Services</td><td>Choose the person</td></tr>
</tbody></table>
<h2>Your border number</h2>
<p>Your border number (رقم الحدود) is the 10 digit number Jawazat gives you when you first enter the Kingdom on a new visa. It is written by hand in your passport beside the entry stamp. You need it to register on Absher as a visitor or a new student, to buy a SIM, to buy or renew a visitor's insurance, to pay a visit visa extension and to pay a newborn's fees. Students on the educational visa use it for their Visitor ID.</p>
<ol>
<li>Open <a href="https://www.absher.sa/">absher.sa</a>. You do not sign in.</li>
<li>Open the public services and choose the border number inquiry, then Non-GCC citizens.</li>
<li>Enter the visa number and the visa issue date, then the image code.</li>
<li>Press Inquire. The name and the border number appear.</li>
</ol>
<p>A host finds each visitor's border number in Absher too: sign in and open the visitor under the visit visa extension service.</p>
<h2>Is a visa valid?</h2>
<p>Muqeem's public visa inquiry at <a href="https://vv.muqeem.sa/">vv.muqeem.sa</a> is free and needs no account.</p>
<ol>
<li>Choose the visa inquiry.</li>
<li>Enter the iqama number or the visa number, with the date of birth or the passport number, and the image code.</li>
<li>Read the result: the type of visa, its issue date and whether it is valid.</li>
</ol>
<p>Use it to check a visitor's visa before an extension, or your own visa after a renewal, before you rely on it at the airport.</p>
<h2>Checking an exit and re-entry visa</h2>
<ol>
<li>On the same Muqeem page, choose the exit and re-entry inquiry.</li>
<li>Enter the iqama number and the date of birth.</li>
<li>You see whether the visa is valid, its number, its length and the date you must return before.</li>
</ol>
<p>Signed in to Absher, the same check is under Inquiries, then Exit and re-entry visa status: enter the iqama number with the passport or visa number, and Absher shows whether the visa is active, used, expired or cancelled.</p>
<p>Compare the return-before date with your return ticket. If the ticket is later, extend the visa before you fly: see <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>. Students whose visa comes from the University's Travel Management check it the same way.</p>
<h2>Health insurance</h2>
<ul>
<li><strong>Iqama holders:</strong> the Council of Health Insurance (CHI) inquiry with your iqama number shows the insurer, the policy, the type of cover and the dates. Absher shows the same for you and each family member.</li>
<li><strong>Visitors:</strong> the CHI visa inquiry takes the passport number, the visa number or the border number.</li>
<li><strong>Before a visit visa extension,</strong> buy the visitor's new policy first. Insurers' websites find the visitor by visa number and passport number, then ask for the border number and the visa's expiry date, both shown in Absher.</li>
</ul>
<p>Other ways to check are in <a href="/ask/check-health-insurance">How do I check that my health insurance is valid?</a></p>
<h2>SIMs registered on your iqama</h2>
<p>The CST My Numbers Inquiry lists the lines registered under your iqama, with no sign-in: enter your iqama number and date of birth, then the code sent to your registered number. A line you do not know is a risk, so have it cancelled. The steps are in <a href="/guides/phone-sims-and-absher">Your phone number, SIM checks and Absher</a>.</p>
<h2>Inside your Absher account</h2>
<h3>Traffic fines</h3>
<p>Your fines show under traffic violations, with the date, place and amount; press More details beside a fine for a map of where it was recorded. Tawakkalna shows them too, under Traffic violations, then Unpaid traffic violations. Unpaid fines block an exit and re-entry visa, a renewal and a passport update, so check every month. Paying and objecting are in <a href="/ask/traffic-fines">How do I check and pay traffic fines?</a></p>
<h3>Travel restrictions and suspended services</h3>
<p>A court case, an unpaid amount or an official order can suspend your services or stop you travelling. Check before you book a flight home.</p>
<ol>
<li>Sign in to <a href="https://www.absher.sa/">absher.sa</a> as an individual.</li>
<li>On the home page, open the inquiry on suspended services and travel restrictions.</li>
<li>Press Continue. Any restriction appears with the body that placed it, and you can print the page. If nothing is recorded, Absher tells you so.</li>
</ol>
<h3>Absher reports</h3>
<p>Absher issues official reports that you download and print. Among them: your family members, your vehicles, your traffic violations, your traffic accidents, your travel record (the dates you entered and left), and a Muqeem report on your residence.</p>
<ol>
<li>Open <strong>Services</strong>, then <strong>General Services</strong>, then <strong>Absher Reports</strong>, then <strong>Request report</strong>.</li>
<li>Choose the report and English, press Next, and pay the fee shown. The traffic accidents report, for example, is 28.75 SAR.</li>
<li>Open <strong>View previous requests</strong>, choose the report and press View to download or print it. Its reference number is on the report.</li>
</ol>
<p>Someone handed you an Absher report and you want to know it is genuine? Open Absher Reports, then <strong>Inquire about a report</strong>, and enter its reference number and the iqama number of the person who requested it.</p>
<h3>Your family's iqamas and visas</h3>
<p>As head of the family, you see each person's iqama expiry date, passport details and visas under Family Members Services. Renewals, card delivery and name corrections are in <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a>.</p>
<h2>Before you travel: a five-minute check</h2>
<ol>
<li>Your passport, and each traveller's, has well over 90 days left after your return date.</li>
<li>Muqeem shows the exit and re-entry visa as valid, with a return-before date after your return flight.</li>
<li>Absher shows no unpaid traffic fines on you or any family member.</li>
<li>The travel restriction inquiry shows nothing recorded.</li>
<li>Every family member's iqama runs past the return date.</li>
<li>The visa is saved on your phone and printed, because airlines ask for it at check-in.</li>
</ol>
<blockquote><p>Tip: An inquiry shows an error or a date you do not expect? Take a screenshot before you do anything else. Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "family-records-on-absher",
    stage: "family",
    title: "Your family's iqamas and records on Absher",
    summary: "For a head of family with an iqama: renewing a wife's or child's iqama (even while they are abroad), having the card posted home, correcting a name in Arabic, passports, exit and re-entry visas and birth certificates, all under Family Members Services in Absher, and booking a Jawazat, Civil Affairs or traffic appointment.",
    bodyHtml: `
<p>Checked November 2026. When your wife and children hold iqamas as your dependants, you handle their residence records yourself in Absher, under <strong>Family Members Services</strong> (خدمات أفراد الأسرة). This guide is for iqama holders, including students with a student iqama, whose family's papers go through their own Absher account. On a Visitor ID there are no dependant iqamas: see <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>
<h2>Renewing a family member's iqama</h2>
<p>You can renew a dependant's iqama in Absher even while that person is outside Saudi Arabia.</p>
<ol>
<li>Sign in to Absher and open <strong>Family Members Services</strong>, then <strong>Resident ID services</strong>.</li>
<li>Choose the family member, then <strong>Renew Resident ID</strong>.</li>
<li>Choose the renewal period. Absher shows the fee before you pay. Pay it through SADAD in your banking app, under Government payments, with the family member's iqama number.</li>
<li>Return to Absher and finish the renewal. The new expiry date shows on the person's page, and the digital iqama in Absher and Tawakkalna carries it at once.</li>
</ol>
<p>Absher renews the iqama only if:</p>
<ul>
<li>the residence fees for the period are paid;</li>
<li>there are no unpaid traffic fines on that person's file;</li>
<li>their passport is valid, and each family member has a passport of their own;</li>
<li>fingerprints and a photo are on file for them, and for every family member over 6;</li>
<li>the iqama has not been expired for more than 6 months.</li>
</ul>
<p>Renew before the expiry date. An iqama renewed more than 3 days late is fined: 500 SAR the first time, 1,000 SAR the second time, and deportation the third time. The fees are in <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>.</p>
<h2>Getting the iqama card posted home</h2>
<p>Once a new or renewed iqama is ready, Saudi Post can deliver the card to your door instead of you collecting it.</p>
<ol>
<li>In Absher, open <strong>Resident ID services</strong> and choose the iqama delivery service for the family member.</li>
<li>Check the address. It must match your National Address with Saudi Post. See <a href="/ask/short-address">What is a short address?</a></li>
<li>Pay the delivery fee: Saudi Post sends a text with a payment link for 17.25 SAR.</li>
<li>Keep the tracking number from Saudi Post's second text and follow the parcel on Saudi Post's website or app.</li>
</ol>
<p>The same request is also under <strong>My Services</strong>, then <strong>Postal Delivery Service</strong>, which lists every card you can have posted: an iqama, a driving licence or a car registration, within 90 days of it being issued or renewed. The card must already be approved, and unpaid fines block the request, so pay them first.</p>
<h2>Correcting a name in Arabic</h2>
<p>If a family member's name is spelt wrongly in Arabic on the iqama, correct it early, because the same spelling goes onto the birth certificate, the bank, the school and every later record.</p>
<ol>
<li>Open <strong>Family Members Services</strong>, then <strong>Resident ID services</strong>.</li>
<li>Choose the family member and the name correction service, then press <strong>Start Service</strong>.</li>
<li>Enter the correct Arabic first name and family name. Check them letter by letter against the passport, then submit.</li>
<li>Follow the request in Absher until it is approved.</li>
</ol>
<p>The correction is free. If Absher does not let you do it online, go to a Jawazat office with the passport, the iqama and the correction form, which the office gives you.</p>
<ul>
<li><strong>Your own student iqama:</strong> the sponsor corrects the Arabic name in Muqeem, so send a copy of your passport to the University's Travel Management through Tawasul and ask for the translated name to be corrected (تعديل الاسم المترجم). Then collect a new print of the card at Jawazat.</li>
<li><strong>A mistake in the English name:</strong> Jawazat corrects it to match the passport exactly. Take the passport and a copy to a Jawazat appointment for Resident services.</li>
<li><strong>Jawazat forms are free.</strong> The office hands them out, and the Ministry of Interior publishes them on its website. People outside some offices sell forms and offer to fill them in: you do not need them, and you never hand over your Absher password or a code sent to your phone.</li>
</ul>
<h2>A new passport for a family member</h2>
<p>When your wife or child gets a new passport, move their iqama to it in Absher. It works only in the last 12 months of the old passport, only while the person is inside Saudi Arabia, and only with no unpaid traffic fines. A family member who is abroad travels back on the new passport, carries the old one, and you update it after they have entered. The steps, and what to do when Absher refuses, are in <a href="/ask/renew-passport-in-saudi">My passport is expiring. How do I renew it?</a></p>
<h2>Exit and re-entry visas for your family</h2>
<ul>
<li>You issue each family member's exit and re-entry visa yourself in Absher, and pay its fee against their iqama number.</li>
<li>You can extend it from Absher while they are abroad, up to 180 days in all, as long as the new return date is at least 7 days before their iqama expires.</li>
<li>An unpaid traffic fine on you or on them stops the visa.</li>
</ul>
<p>The fees, the conditions and the steps are in <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>.</p>
<h2>A new baby</h2>
<p>The hospital registers the birth, and you print the birth certificate from Absher under Civil Affairs services. You then add the baby to your iqama through a request in Absher and collect the card at Jawazat. Every step is in <a href="/guides/having-a-baby-in-madinah#after-the-birth-papers-step-by-step">Having a baby in Madinah</a>.</p>
<h2>Booking a Jawazat, Civil Affairs or traffic appointment</h2>
<p>Jawazat (the passports office), Civil Affairs and the traffic department (Muroor) see you only with an appointment booked in Absher. All three are booked the same way.</p>
<ol>
<li>Sign in to <a href="https://www.absher.sa/">absher.sa</a>, scroll down and open <strong>Appointments</strong> (المواعيد).</li>
<li>Choose <strong>Passports</strong> for Jawazat, <strong>Civil Affairs</strong> for a birth, or <strong>Traffic</strong> for the traffic department, then press <strong>Proceed to service</strong> and <strong>Book new appointment</strong>.</li>
<li>Choose the service (table below), the region, the number of transactions you have and the office.</li>
<li>Pick a date and time: green slots are free, red ones are taken. Check them, then press <strong>Confirm appointment details</strong>.</li>
<li>Print the appointment or keep a screenshot. The last screen lists the papers to bring.</li>
</ol>
<table><thead><tr><th>Office</th><th>Service to choose</th><th>For</th></tr></thead><tbody>
<tr><td>Jawazat</td><td>Resident services (خدمات المقيمين)</td><td>Almost everything: a newborn's iqama, a passport update, a name correction, cancelling an expired final exit</td></tr>
<tr><td>Jawazat</td><td>Biometrics for residents (تسجيل السمات الحيوية للوافدين)</td><td>Your own fingerprints</td></tr>
<tr><td>Jawazat</td><td>Biometrics for residents' companions (تسجيل السمات الحيوية لمرافقي الوافدين)</td><td>Your wife's and children's fingerprints</td></tr>
<tr><td>Jawazat</td><td>Inquiry on incoming transactions</td><td>An entry or exit that does not show in the Jawazat system</td></tr>
<tr><td>Civil Affairs</td><td>Birth registration (تسجيل واقعة ميلاد)</td><td>A birth certificate that could not be issued online. Any office in the region where the baby was born</td></tr>
<tr><td>Traffic</td><td>For example Replacement of driving licence (استبدال رخصة قيادة), Print istimara (طباعة رخصة سير مركبة), Print vehicle repair permit (طباعة إذن إصلاح مركبة), or a lost or damaged licence (إصدار رخصة قيادة بدل تالف / فاقد)</td><td>Licence and car services. The driving licence guide has the details: <a href="/guides/drivers-license">Driving in Madinah</a></td></tr>
</tbody></table>
<p>To change or cancel, open Appointments and the same office again, press the plus sign (+), then Modify (and Modify full appointment) or Cancel, and confirm. Cancel a slot you cannot use, so it goes to someone else.</p>
<h2>Checking everything in one place</h2>
<p>Each person's page under Family Members Services shows their iqama expiry, passport details and any visa. Look once a month, and set a reminder a month before each iqama expires. Checks that need no sign-in are in <a href="/guides/check-visa-and-iqama-online">Checking your visa, border number, insurance and fines online</a>.</p>
<blockquote><p>Tip: Stuck on a step? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
];
