import type { SeedGuide } from "./guides-2026";

/**
 * Guides written in November 2026 from official portals (Study in Saudi, the University, SAMA,
 * Ejar, the Two Holy Mosques authority, Madinah Bus, Haramain) and the research notes in
 * docs/research, where several reports agree. Sources are listed in docs/research/new-guides-2026-11.md.
 * Facts that could not be stated with authority were left out and raised in scripts/open-questions.json.
 */
export const GUIDES_RESEARCH_2026_11: SeedGuide[] = [
  {
    slug: "living-on-a-visitor-id",
    stage: "getting-started",
    title: "Living on a Visitor ID: what works and what does not",
    summary: "New students on the educational visa get a Visitor ID, not an iqama. Banking, SIM, Absher, renting, driving, travel and family, side by side with the iqama.",
    bodyHtml: `
<p>Checked 8 November 2026. Students who arrive on the educational visa (the student visa) are given a digital Visitor ID (هوية زائر) linked to their border number. They are not issued an iqama. Most of daily life works on a Visitor ID, but some things need different steps and a few are open only to iqama holders. This page puts the two side by side.</p>
<h2>What the Visitor ID is</h2>
<ul>
<li>It sits in your Absher account and is tied to your <strong>border number</strong> (رقم الحدود), the number Jawazat gives you when you first enter the Kingdom.</li>
<li>Jawazat accepts the digital Visitor ID as official proof of identity inside the Kingdom, so you can show it on your phone at checkpoints and offices.</li>
<li>Your passport is still your travel document. Carry it for flights, and for any bank or office counter that asks to see it.</li>
<li>Anything linked to the Visitor ID, such as a bank account, only runs while your visa is valid. Keep an eye on the expiry date in Absher.</li>
</ul>
<h2>Visitor ID and iqama side by side</h2>
<table><thead><tr><th></th><th>Visitor ID (educational visa)</th><th>Iqama</th></tr></thead><tbody>
<tr><td><strong>Absher and Nafath</strong></td><td>Register with your border number</td><td>Register with your iqama number</td></tr>
<tr><td><strong>Bank account and mada card</strong></td><td>Yes, usually at a branch. The account ends with your visa</td><td>Yes, in the bank's app or at a branch</td></tr>
<tr><td><strong>SIM card</strong></td><td>Yes, registered to your passport and border number, with a fingerprint</td><td>Yes, registered to your iqama</td></tr>
<tr><td><strong>Home fibre internet</strong></td><td>No. Use a 5G router with a data SIM</td><td>Yes</td></tr>
<tr><td><strong>Rental contract on Ejar</strong></td><td>Yes, through an accredited Ejar agent</td><td>Yes, yourself or through an agent</td></tr>
<tr><td><strong>Saudi driving licence</strong></td><td>No</td><td>Yes, by swapping your foreign licence</td></tr>
<tr><td><strong>Buying or registering a car</strong></td><td>No</td><td>Yes</td></tr>
<tr><td><strong>Umrah and Rawdah permits in Nusuk</strong></td><td>Yes</td><td>Yes</td></tr>
<tr><td><strong>Hajj from inside the Kingdom</strong></td><td>No. Registration asks for a valid iqama</td><td>Yes, through Nusuk when registration opens</td></tr>
<tr><td><strong>Travelling abroad</strong></td><td>Check in Absher that your visa covers your return date, and follow the University's travel notice for holidays</td><td>An exit and re-entry visa from Absher before every trip</td></tr>
<tr><td><strong>Your own residence fees</strong></td><td>None</td><td>None for a student's own iqama. Dependants pay</td></tr>
</tbody></table>
<h2>Your first week on a Visitor ID</h2>
<ol>
<li><strong>Get a Saudi SIM.</strong> Take your passport to an STC, Mobily or Zain branch. The line is registered to your passport and border number, and they take your fingerprint. You need this number for every code that follows.</li>
<li><strong>Register on Absher</strong> with your border number. If it asks for a fingerprint, give it at an Absher kiosk, the Jawazat office or the airport.</li>
<li><strong>Activate Nafath</strong> in the Nafath app. Banks, Ejar and most government sites use it to confirm who you are.</li>
<li><strong>Find your Visitor ID</strong> in the Absher app once your account is active.</li>
<li><strong>Register your National Address</strong> with Saudi Post. Banks need an address in Saudi Arabia, and deliveries use it. See <a href="/ask/short-address">What is a short address?</a></li>
<li><strong>Open a bank account</strong> (below).</li>
</ol>
<blockquote><p>Note: If Absher or Nafath activation keeps failing, call Absher customer care on <strong>920020405</strong>, choose English, enter your border number and ask for a technical support ticket. Say you are a new international scholarship student on a student visa with a border number. The fix can take a few days. See <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>.</p></blockquote>
<h2>Banking</h2>
<p>The Saudi Central Bank allows banks to open accounts for holders of a Ministry of Interior Visitor ID. The bank must record your address in Saudi Arabia, your address at home and the purpose of your stay, and it cannot keep the account running past the end of your visa.</p>
<ol>
<li>Go to a branch rather than the app. Most banks open Visitor ID accounts in person.</li>
<li>Bring your passport, a printed copy of your visa, your Visitor ID in Absher, your National Address and your home address.</li>
<li>Say you are a student at the Islamic University on the educational visa.</li>
<li>Collect or order your mada debit card.</li>
</ol>
<blockquote><p>Tip: Banks apply the rules differently from branch to branch. If one says no, try another branch or another bank.</p></blockquote>
<p>Your stipend card is separate. It comes through the University's steps for new students: see <a href="/guides/new-student-steps">First steps for new students</a>.</p>
<h2>Phone and internet</h2>
<ul>
<li>Fixed fibre internet needs an iqama. On a Visitor ID, put an unlimited data SIM in a portable 5G router for Wi-Fi at home.</li>
<li>If your line stops working, take your passport to a branch of your operator. Afterwards update the number in Absher so your codes still reach you: see <a href="/guides/phone-sims-and-absher">Your phone number, SIM checks and Absher</a>.</li>
</ul>
<h2>Renting a flat</h2>
<p>You can register a rental contract on Ejar on a Visitor ID. An accredited agent does it for you.</p>
<ol>
<li>Find a flat and agree the rent, the length of the contract and how you will pay.</li>
<li>Pick a real-estate agent from Ejar's official list of accredited agents.</li>
<li>Give the agent your details and the landlord's. The agent enters the contract on Ejar.</li>
<li>You and the landlord each get a link by text message. Check the details and approve it.</li>
</ol>
<p>A registered contract protects both sides. More on choosing a flat in <a href="/guides/finding-an-apartment">Finding and renting a flat</a>.</p>
<h2>Driving and cars</h2>
<ul>
<li>A Saudi driving licence and owning a car both need an iqama, so neither is open on a Visitor ID.</li>
<li>You can drive with your own licence if Saudi Arabia recognises your country's licence. Carry the original. Car hire firms set their own rules, and many ask for an International Driving Permit.</li>
<li>Traffic fines show in Absher under violations. Pay them in your banking app.</li>
</ul>
<p>Once you hold an iqama, the swap is in <a href="/guides/drivers-license">Getting a Saudi driving licence</a>.</p>
<h2>Umrah, the Rawdah and Hajj</h2>
<ul>
<li>Book Umrah and Rawdah permits in the Nusuk app. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</li>
<li>Hajj from inside the Kingdom is booked in Nusuk by citizens and by residents with a valid iqama, so it is not open on a Visitor ID.</li>
</ul>
<h2>Family</h2>
<p>A Visitor ID cannot sponsor family. Your wife, children or parents come on their own visas, most often the tourist eVisa where their passport qualifies. The options and the extension rules are in <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>. Children can still join many private kindergartens and schools: see <a href="/guides/kindergartens-and-schools">Kindergartens and schools</a>.</p>
<h2>When something does not work</h2>
<p>The University has an Educational Visa Unit for students on the educational visa. Send your request through Tawasul:</p>
<ol>
<li>Sign in to your student page and open <strong>Tawasul</strong> (تواصل).</li>
<li>Choose the <strong>Deanship of Admission and Registration</strong>.</li>
<li>Pick the subject <strong>Educational visa</strong> and describe your case in full: what you tried, where, and what you were told.</li>
<li>Watch your University email. The reply comes there.</li>
</ol>
<blockquote><p>Tip: Still stuck? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "women-at-masjid-an-nabawi",
    stage: "family",
    title: "Women at Masjid an-Nabawi: sections, the Rawdah and halaqat",
    summary: "The women's sections and entrances, booking the Rawdah as a woman in Nusuk, following the duroos, joining Qur'an circles, and small things that make a visit easier.",
    bodyHtml: `
<p>Checked 8 November 2026. Masjid an-Nabawi has large sections for women with their own entrances, wudu areas and staff. Many sisters pray there daily, join Qur'an circles and follow the duroos. These notes are for the first visits and for settling into a routine.</p>
<h2>The women's sections</h2>
<ul>
<li>Women pray in their own sections on the eastern and western sides of the masjid, plus women's areas in the courtyards. They are closed off with screens and marked by signs.</li>
<li>Each section has its own gates, marked for women, with women staff who check bags at the door. Gate use changes during building work and in busy seasons, so go by the signs on the day.</li>
<li>Women's wudu areas and toilets are next to the women's sections. Some are underground and reached by ramps in the courtyards.</li>
<li>Note the number of the gate you entered by. The gates look alike, and the number is the easiest way back to your family.</li>
</ul>
<blockquote><p>Tip: Agree a meeting gate with your husband or family before you separate. Phone signal can drop when the masjid is full.</p></blockquote>
<h2>Visiting the Rawdah as a woman</h2>
<p>Women visit the Rawdah at their own set times, separate from the men. Entry is by a free permit in the Nusuk app only.</p>
<ol>
<li>Open <strong>Nusuk</strong> and sign in. Residents use Nafath, and visitors from abroad use their passport number and email.</li>
<li>Go to Services, then the Prophet's Masjid permits, then <strong>Visit the Rawdah</strong>, and choose the <strong>women</strong> category.</li>
<li>Pick a slot. Women's slots are in the morning after Fajr and at night after Isha, and are shorter on Fridays. The app shows only the times open to you.</li>
<li>Each person can book one scheduled permit in any 365 days. If you have used yours, try the <strong>instant</strong> option: it releases slots through the day to people near the masjid with location turned on. You can also join the waiting list in the app.</li>
<li>Arrive a little early. Permit holders enter through the southern courtyards, opposite Bab Makkah (gate 37), and follow the stewards.</li>
<li>Keep the permit open on your phone, with a screenshot in case the app is slow at the gate. A permit is cancelled if you miss your time.</li>
</ol>
<p>Inside, pray two rak'ahs and make du'a calmly, then make room for the next sister. The visit is short.</p>
<h2>Following the duroos</h2>
<ul>
<li>The duroos of the mashayikh in the main hall are carried on the masjid's speakers, so sisters can follow from the women's sections nearby. Many are also streamed live: see <a href="/duroos/live">Live</a>.</li>
<li>Duroos taught by women for women, at the Haram and in masjids around the city, are listed on <a href="/duroos/sisters">Sisters' duroos</a>.</li>
<li>Take a notebook and the book being taught. Most duroos are in Arabic, and following along with the text is the best way to learn.</li>
</ul>
<h2>Qur'an circles and study</h2>
<p>The Haram runs free halaqat for sisters and girls: memorising the Qur'an, correcting recitation (تصحيح التلاوة) and memorising the classical mutun.</p>
<ol>
<li>Open the halaqat site, <a href="https://qm.edu.sa/">qm.edu.sa</a>, and choose the women's section.</li>
<li>Pick the programme: memorisation, correcting recitation or the mutun.</li>
<li>Register on <a href="https://reg.qm.edu.sa/">reg.qm.edu.sa</a> with your details, then attend at the days and times you are given.</li>
</ol>
<p>For full-time study, the Masjid an-Nabawi Ma'had and Kulliyah for women run free diplomas and a Shariah degree, with one registration window a year in Safar. See <a href="/programs/nabawi-women">Masjid an-Nabawi programmes for women</a> and <a href="/guides/masjid-an-nabawi-institute-and-college">The Masjid an-Nabawi Institute and College</a>. Other options for sisters are in <a href="/programs">Study in Madinah</a>.</p>
<h2>Small things that help</h2>
<ul>
<li>Women's sections fill early before Jumu'ah, Tarawih and the big prayers. Come 30 to 45 minutes before if you want space near the front.</li>
<li>Carry a small bag with a zip. Bags are checked at the gate, and shoes go on the shelves inside, so a shoe bag helps.</li>
<li>Bring a light prayer mat for the courtyards. The marble is hot at midday in summer and cold on winter nights.</li>
<li>With young children, a seat near the back of the section makes it easy to step out without disturbing others.</li>
<li>Al-Baqi' is open to men only.</li>
</ul>
<p>For what is inside the masjid, the library and the courtyards, see <a href="/guides/masjid-an-nabawi-first-visit">Visiting Masjid an-Nabawi: a first-visit guide</a>.</p>
<blockquote><p>Tip: A question we have not answered here? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "first-30-days-in-madinah",
    stage: "getting-started",
    title: "Your first 30 days in Madinah: a checklist",
    summary: "From landing to settled: SIM, Absher, Nafath, bank, housing, University registration, transport, groceries and health, in the order that works.",
    bodyHtml: `
<p>Checked 8 November 2026. This is the order that saves the most time, because each step unlocks the next. Tick each one off as you go. Students on the educational visa have a Visitor ID rather than an iqama, and the steps below cover both.</p>
<h2>Before you fly</h2>
<ol>
<li>Check that the name on your ticket, visa and every University record matches your passport exactly, letter for letter.</li>
<li>Pack your original certificates, passport photos on a white background, and copies of everything on your phone.</li>
<li>Bring enough cash or a working foreign card for your first month. The first stipend and your bank card take time.</li>
<li>Bring a letter from your doctor for any regular medicine. Prescriptions from other countries are not accepted here.</li>
</ol>
<h2>Day 1 and 2: phone and the first night</h2>
<ol>
<li><strong>Get a Saudi SIM</strong> at the airport or a branch, with your passport. STC, Mobily and Zain all work. Your number receives the codes for Absher, Nafath and your bank. See <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
<li><strong>Get to your room or your first night's stay.</strong> Ride apps such as Careem and Uber work from the airport. Families renting a flat do best with a hotel or short let for the first week or two.</li>
<li><strong>Save the emergency numbers:</strong> 997 for an ambulance and 911, the unified emergency number in Madinah.</li>
</ol>
<h2>Week 1: University and your digital identity</h2>
<ol>
<li><strong>Finish your University paperwork</strong> and take the medical test paper to the University Hospital for the blood test and X-ray. Results take 2 to 3 days. The order of steps is in <a href="/guides/new-student-steps">First steps for new students</a>.</li>
<li><strong>Register on Absher</strong> with your border number (or your iqama number), then <strong>activate Nafath</strong>. If activation fails, see <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>.</li>
<li><strong>Find your Visitor ID</strong> in Absher if you are on the educational visa. What it can and cannot do is in <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</li>
<li><strong>Get your student card</strong> from the Istiqbal office with your Visitor ID or iqama, and ask the bank card desk to add your name for the stipend card.</li>
<li><strong>Set up your University email and the Academic System.</strong> Your timetable is under Electronic Registration (التسجيل الإلكتروني), then Registered Courses (المقررات المسجلة). See <a href="/ask/find-my-timetable">Where do I find my class timetable?</a></li>
<li><strong>Book your meals</strong> at the mat'am if you eat on campus. Meals are reserved a month at a time, so set a reminder before each month ends. See <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</li>
</ol>
<h2>Week 2: money and paperwork</h2>
<ol>
<li><strong>Register your National Address</strong> with Saudi Post. Banks and deliveries need it. See <a href="/ask/short-address">What is a short address?</a></li>
<li><strong>Open a bank account</strong> and order a mada card. Visitor ID holders usually go to a branch with their passport, printed visa and National Address.</li>
<li><strong>Set up Etimad</strong> for your University tickets and check your details match your passport. See <a href="/guides/etimad-account">Setting up your Etimad account</a>.</li>
<li><strong>Check the key dates</strong> for your semester: exams, breaks and the deadlines for ta'jeel and withdrawal. See <a href="/guides/university-calendar-1448">The University calendar</a>.</li>
</ol>
<h2>Week 3: housing and getting around</h2>
<ol>
<li><strong>Families and anyone renting:</strong> look at flats in person, check the meter and the air conditioning, and register the contract on Ejar (through an accredited agent on a Visitor ID). See <a href="/guides/finding-an-apartment">Finding and renting a flat</a>.</li>
<li><strong>Install the Madinah Bus app</strong> and add a card. Buses do not take cash. See <a href="/guides/haramain-train-and-city-buses">The Haramain train and Madinah buses</a>.</li>
<li><strong>Learn the route to the Haram:</strong> the University buses, the city buses and the ride apps. See <a href="/guides/getting-around">Getting around Madinah</a>.</li>
<li><strong>Get home internet</strong>: fibre with an iqama, or a 5G router with a data SIM on a Visitor ID.</li>
</ol>
<h2>Week 4: daily life</h2>
<ol>
<li><strong>Stock up on groceries.</strong> Bin Dawood, Carrefour, LuLu, Othaim and Panda are the big supermarkets, and delivery apps bring food and shopping to the door. Typical prices are in <a href="/guides/cost-of-living">What it costs to live in Madinah</a> and <a href="/guides/everyday-apps-and-services">Everyday apps and services</a>.</li>
<li><strong>Know where to go when you are ill:</strong> the University clinic for students, a pharmacy for small things, and the nearest emergency department for anything serious. See <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</li>
<li><strong>Book the Rawdah</strong> in Nusuk and plan your first Saturday at Quba. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</li>
<li><strong>Pick a dars or a halaqah</strong> to attend each week. Today's duroos are on <a href="/duroos">Duroos</a>.</li>
<li><strong>Check your phone, bank and Absher still work together.</strong> If you changed SIM, update the number in Absher.</li>
</ol>
<blockquote><p>Tip: Keep a folder on your phone with photos of your passport, visa, student card, contract and every receipt. You will be asked for them more often than you expect.</p></blockquote>
<h2>Not a student?</h2>
<p>Families and muhajirun on a visit visa follow most of the same list: SIM, Absher, bank, housing, transport. Check how long your visa lets you stay and how extensions work in <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>, and see <a href="/guides/kindergartens-and-schools">Kindergartens and schools</a> if you have children.</p>
<blockquote><p>Tip: Stuck on a step? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "masjid-an-nabawi-institute-and-college",
    stage: "study",
    title: "The Masjid an-Nabawi Institute and College",
    summary: "Free full-time study inside the Haram, from intermediate level to a bachelor's degree, for brothers and sisters with an iqama: who can apply, the yearly window in Safar, the exam and the interview.",
    bodyHtml: `
<p>Checked 8 November 2026. The Institute of the Haram in Makkah has a branch at Masjid an-Nabawi, with an Institute (Ma'had) for intermediate and secondary study and a College (Kulliyah) for a bachelor's degree. Study is free and full time, inside the masjid, with separate sections for brothers and sisters.</p>
<h2>The levels</h2>
<table><thead><tr><th>Level</th><th>Who can apply</th></tr></thead><tbody>
<tr><td>Intermediate (Institute)</td><td>At least 12 at the start of the year, with a primary school certificate graded good or better</td></tr>
<tr><td>Secondary (Institute)</td><td>At least 15 at the start of the year, with an intermediate certificate graded good or better</td></tr>
<tr><td>Bachelor's (College)</td><td>A general secondary certificate or its equivalent, with at least 85%</td></tr>
</tbody></table>
<h2>Who can apply</h2>
<ul>
<li><strong>Non-Saudis need a valid iqama.</strong> There is a separate quota for them. A Visitor ID or a visit visa is not enough to register.</li>
<li>Good conduct, and never dismissed from the Institute or a similar institution for discipline.</li>
<li>Study is full time, so you need written approval from your employer or sponsor.</li>
<li>Certificates from outside the Kingdom must be made equivalent and attested by the proper authorities before you apply.</li>
<li>Good Arabic. Teaching, exams and the interview are all in Arabic.</li>
</ul>
<h2>When and how to apply</h2>
<p>Registration opens once a year, from 5 to 20 Safar. For 1448 that was 20 July to 4 August 2026. In 1449, Safar falls in July 2027.</p>
<ol>
<li>Get your certificates equated and attested well before Safar. This takes the longest.</li>
<li>When registration opens, apply online through the portal of the General Authority for the Care of the Two Holy Mosques, choosing the Masjid an-Nabawi branch and your level.</li>
<li>Sit the written exam in person. In 1448 it was on 11 Rabi' al-Awwal.</li>
<li>Attend the personal interview in person. In 1448 it was on 13 Rabi' al-Awwal.</li>
<li>Watch the portal and your phone for the result.</li>
</ol>
<p>Sisters apply in the same window to the women's Institute and College. See <a href="/programs/nabawi-women">Masjid an-Nabawi programmes for women</a>.</p>
<h2>Without an iqama</h2>
<p>You can still study at the Haram every day. The duroos of the mashayikh are open to everyone with no registration, and the Qur'an and mutun halaqat take registrations online. See <a href="/programs/nabawi-halaqat">Qur'an and mutun halaqat in the Haram</a> and today's <a href="/duroos">Duroos</a>.</p>
<blockquote><p>Tip: Questions about your own case? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "haramain-train-and-city-buses",
    stage: "getting-settled",
    title: "The Haramain train and Madinah buses",
    summary: "Booking the high-speed train to Makkah and Jeddah, fares, luggage and tickets, and riding the city buses with the Madinah Bus app.",
    bodyHtml: `
<p>Checked 8 November 2026. Two public services cover most trips: the Haramain high-speed train to Makkah and Jeddah, and the Madinah Bus network inside the city.</p>
<h2>The Haramain train</h2>
<p>The train links Madinah, King Abdullah Economic City, Jeddah (including King Abdulaziz Airport) and Makkah. Makkah is about 2 hours 20 minutes away on a direct train. Madinah station is about 9 km from Masjid an-Nabawi.</p>
<h3>Booking</h3>
<ol>
<li>Book on <a href="https://sar.hhr.sa/">sar.hhr.sa</a>, in the official HHR app, or in the Nusuk app.</li>
<li>Enter each passenger with the same ID they will carry on the day: passport, iqama or Saudi ID.</li>
<li>Pick economy or business. Fares move with demand, so the same seat costs more close to the date and in busy weeks.</li>
<li>Check the final price. Prices shown as base fares have 15% VAT added at checkout.</li>
<li>Keep the e-ticket on your phone. Staff check it with your ID at the gate.</li>
</ol>
<ul>
<li><strong>Children</strong> pay less than adults, and an infant on a parent's lap pays a small part of the fare. The booking page shows the price for each passenger.</li>
<li><strong>Changes and refunds:</strong> tickets bought online can be changed or refunded under the fare rules. Tickets bought at a station counter or machine cannot.</li>
<li><strong>Customer care:</strong> 920004433.</li>
</ul>
<blockquote><p>Tip: Book early for Ramadan, the Eid holidays, Fridays and University breaks. Those trains sell out and fares rise.</p></blockquote>
<h3>Luggage</h3>
<ul>
<li>Each passenger may take one bag of up to 25 kg and 65 x 55 x 35 cm, plus one small hand item.</li>
<li>Extra bags are not allowed on board. Saudi Post counters at the stations can send them on.</li>
<li>All bags are screened before boarding, so arrive in good time.</li>
</ul>
<h3>Going for Umrah</h3>
<p>The miqat for people leaving Madinah is Dhul Hulayfah (Abyar Ali). Many people go to the masjid at Dhul Hulayfah first, put on ihram there, and then take a taxi to the station. Book your Umrah permit in Nusuk before you travel. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</p>
<h2>Madinah buses</h2>
<ul>
<li><strong>Fare:</strong> 3.45 SAR a ride on the city routes, and 11.50 SAR on the airport route (400). Each ticket is for one bus, so changing buses means a new fare.</li>
<li><strong>No cash on board.</strong> Pay with mada, Visa or Mastercard, Apple Pay or another phone wallet, the virtual card in the Madinah Bus app, or a plastic bus card.</li>
<li><strong>Passes in the app:</strong> 10 rides in a day for 10 SAR, 35 rides in a week for 60 SAR, and 175 rides in a month for 240 SAR.</li>
<li><strong>Wallet refunds:</strong> only a balance above 50 SAR can be refunded, less a 20% fee, so top up in small amounts.</li>
<li><strong>Customer care:</strong> 920000877.</li>
</ul>
<ol>
<li>Install the <strong>Madinah Bus</strong> app and create an account.</li>
<li>Add a bank card or buy a pass.</li>
<li>Use the route map in the app to plan your trip, including the routes that serve the University and the train station.</li>
<li>Tap your card or show the app code when you board.</li>
</ol>
<p>Ride apps, the Quba walkway shuttles and shared taxis to Makkah are in <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</p>
<blockquote><p>Tip: A question about a route? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
];

/**
 * Rewrites of guides that already exist in guides-2026.ts. They keep the same slug, and
 * sync.ts lets these replace the older text so a content sync publishes the new version.
 */
export const GUIDE_REWRITES_2026_11: SeedGuide[] = [
  {
    slug: "applying-to-the-islamic-university",
    stage: "getting-started",
    title: "Applying to the Islamic University",
    summary: "The 2025 to 2026 system step by step, from the Study in Saudi portal and the second application on Minhati to final approval, the educational visa and arrival, with past windows and what to prepare now.",
    bodyHtml: `
<blockquote><p>Important: applying is free and you do it yourself on <a href="https://studyinsaudi.sa/">studyinsaudi.sa</a>. The University has no offices or agents abroad. Anyone who asks you for money to apply, to speed things up or to guarantee a place is not working for the University. Do not pay them and do not give them your login.</p></blockquote>
<p>Checked 8 November 2026. Since 2025 the whole journey runs through one national portal, a second application on the University's own portal, a final approval from the Ministry of Education and an electronic educational visa. New students arrive with a Visitor ID rather than an iqama.</p>
<h2>When applications open</h2>
<p>The University opens for international bachelor's applicants once a year on Study in Saudi, in recent years in spring. The portal is closed outside the window.</p>
<table><thead><tr><th>Round</th><th>Window</th></tr></thead><tbody>
<tr><td>Autumn 2023</td><td>7 September to 7 December 2023</td></tr>
<tr><td>2024</td><td>21 April to 28 July 2024</td></tr>
<tr><td>2025, for the 1447 year</td><td>1 May to 14 June 2025</td></tr>
<tr><td>2026, for the 1448 year</td><td>19 April to 21 May 2026</td></tr>
</tbody></table>
<p>Watch studyinsaudi.sa and the University's announcements from March, and have every document ready before the window opens. Recent windows have lasted five to six weeks, and the last days are the busiest, so apply early in the window, not on the final day.</p>
<h2>Who can apply</h2>
<ul>
<li><strong>Age:</strong> at least 17 and no older than 25.</li>
<li><strong>School certificate:</strong> general secondary or its equivalent, no more than five years old. Scientific colleges need the scientific track. An old certificate is one of the most common reasons for rejection.</li>
<li><strong>Where you live:</strong> full scholarship applicants must be living outside Saudi Arabia.</li>
<li><strong>Record:</strong> good conduct, never expelled from a university for discipline, and not already on a Saudi scholarship.</li>
<li><strong>College of the Holy Qur'an:</strong> the whole Qur'an memorised, plus the University's own test.</li>
<li><strong>Brothers only for study in Madinah.</strong> Sisters can study with the University online, and other routes are in <a href="/ask/sisters-study">Where can sisters study?</a></li>
</ul>
<h2>Prepare now for the next window</h2>
<ol>
<li><strong>Passport:</strong> valid well beyond your planned arrival. Every form must use your name exactly as it is printed in it.</li>
<li><strong>Secondary school certificate and transcript.</strong> Check it will still be under five years old when you apply.</li>
<li><strong>Police clearance</strong> from your country. In many countries this takes weeks, so start early.</li>
<li><strong>For a partial scholarship:</strong> your employer's approval.</li>
<li><strong>Recommendation (tazkiyah)</strong> from an organisation, institution or scholar in your country. The portal marks it optional, but the University's own form asks who gave it, so get one.</li>
<li><strong>Medical report</strong> showing you are fit to study.</li>
<li><strong>Photo:</strong> passport style, plain white background, neutral face, and not in white clothes. A photo studio does this properly.</li>
<li><strong>Arabic translations</strong> of anything not in Arabic, made by a certified translator.</li>
<li><strong>Extra certificates</strong> for Qur'an memorisation, Arabic, mutun or ijazah, if you have them. They count for the Islamic colleges.</li>
<li><strong>Clear colour scans</strong> of everything. Do not use phone photos.</li>
<li><strong>An email address you check every day,</strong> including the spam folder.</li>
</ol>
<h2>From application to arrival</h2>
<ol>
<li><strong>Apply on Study in Saudi.</strong> Create your account, fill in your details, upload your documents and choose your programmes. You can choose up to 25 programmes across more than ten universities, and each shows whether it is a full, partial or paid scholarship. Submit before the deadline and keep your application number.</li>
<li><strong>Complete the second application on Minhati.</strong> The University emails you login details for <a href="https://minhatee2.iu.edu.sa/">Minhati</a>, its own portal, and asks for extra details and documents with Arabic translations. You often have only about 24 hours, so act the same day.</li>
<li><strong>Sit the interview or the placement test if invited.</strong> The interview is online. The Arabic test is not pass or fail: it only places you in a Ma'had level, so answer honestly. A level that is too high makes your first year much harder.</li>
<li><strong>Accept your offer within 5 days.</strong> Initial acceptance arrives by email and shows on the portal as waiting for your confirmation. Accepting cancels your applications to other universities. If you ignore it, the offer lapses. Retype your first and last name exactly as in your passport.</li>
<li><strong>Wait for final approval from the Ministry of Education.</strong> It shows on Study in Saudi, and it is the only stage that leads to a visa. Minhati may show a preliminary acceptance first, which is conditional.</li>
<li><strong>Fill in the visa application</strong> when the portal asks. You must be outside Saudi Arabia when you submit it, or it is rejected.</li>
<li><strong>Pay the educational visa fee</strong> through the link that is sent to you.</li>
<li><strong>Give your fingerprints</strong> through the Ministry of Foreign Affairs' <strong>Saudi Visa Bio</strong> app, or at an approved visa centre or Saudi embassy if the app does not work for you. Do any medical step you are asked for.</li>
<li><strong>Receive the visa by email.</strong> There is no embassy visit.</li>
<li><strong>Request your arrival ticket on Minhati,</strong> with your name exactly as in your passport.</li>
<li><strong>Arrive in the semester you were offered.</strong> Your first weeks are in <a href="/guides/first-30-days-in-madinah">Your first 30 days in Madinah</a>, and life without an iqama in <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</li>
</ol>
<h2>What your status means</h2>
<table><thead><tr><th>Status</th><th>What to do</th></tr></thead><tbody>
<tr><td>Under review</td><td>No university has made you an offer yet. Keep checking your email and the portal.</td></tr>
<tr><td>Returned for update</td><td>Something is missing or unclear. Fix it and resubmit through the link before the deadline.</td></tr>
<tr><td>Initially accepted, waiting for your confirmation</td><td>You have an offer. Accept or decline within 5 days.</td></tr>
<tr><td>Completing admission procedures</td><td>You accepted. Wait for the Ministry's final approval, then the visa steps.</td></tr>
<tr><td>No matching records</td><td>No university accepted this application. Apply again in the next window.</td></tr>
</tbody></table>
<h2>Initial acceptance is not final</h2>
<p>Initial acceptance means a university has put your name forward. Final acceptance means the Ministry has approved it. Do not resign from work, give up your home or book flights on initial acceptance alone. Some people with initial acceptance are moved to a later semester, and some are offered a year of online Arabic first.</p>
<p>Plan to arrive in the semester you are offered. Under the educational visa, asking to arrive later can send your application back. See <a href="/ask/defer-my-place">Can I defer my place?</a></p>
<h2>Common mistakes</h2>
<ul>
<li>A name that differs from the passport by even one letter. It can block the visa later.</li>
<li>Phone photos of documents instead of clear scans, or a photo that is not a plain passport picture on a white background.</li>
<li>Leaving the police clearance to the last weeks.</li>
<li>Missing the 5 day window to confirm an offer, or the short deadline on the Minhati application.</li>
<li>Applying for the visa while visiting Saudi Arabia.</li>
<li>Paying an agent. Every step is free and done by you.</li>
</ul>
<h2>If you are not accepted</h2>
<ul>
<li>Many students were accepted on their second, third or later try. Apply again in the next window.</li>
<li>Use the time to add what helps: Qur'an memorisation, Arabic study and certificates for any mutun you learn.</li>
<li>Some universities now give a reason with a rejection. Read it and fix that point first.</li>
</ul>
<h2>Housing and family</h2>
<p><strong>Housing:</strong> see <a href="/ask/is-housing-included">Is housing included?</a> and check the support shown on your offer. <strong>Family:</strong> see <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</p>
<blockquote><p>Tip: Questions about your own application? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
];
