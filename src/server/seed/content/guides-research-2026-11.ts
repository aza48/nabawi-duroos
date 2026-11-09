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
<p>Checked 9 November 2026. Students who arrive on the educational visa (the student visa) are given a digital Visitor ID (هوية زائر) linked to their border number. They are not issued an iqama. Most of daily life works on a Visitor ID, but some things need different steps and a few are open only to iqama holders. This page puts the two side by side.</p>
<h2>What the Visitor ID is</h2>
<ul>
<li>It is issued by the General Directorate of Passports (Jawazat) through your Absher account, and is tied to your <strong>border number</strong> (رقم الحدود), the 10 digit number Jawazat gives you when you first enter the Kingdom. Jawazat writes it by hand in your passport, and Absher's public border number inquiry finds it from your visa number and visa issue date.</li>
<li>It is digital only and cannot be printed on paper.</li>
<li>The long-term educational visa behind it is valid for one year and renewed each year while you study.</li>
<li>Jawazat accepts the digital Visitor ID as official proof of identity inside the Kingdom, so you can show it on your phone at checkpoints and offices.</li>
<li>Your passport is still your travel document. Carry it for flights, and for any bank or office counter that asks to see it.</li>
<li>Anything linked to the Visitor ID, such as a bank account, only runs while your visa is valid. Keep an eye on the expiry date in Absher.</li>
</ul>
<h2>Visitor ID and iqama side by side</h2>
<table><thead><tr><th>Topic</th><th>Visitor ID (educational visa)</th><th>Iqama</th></tr></thead><tbody>
<tr><td><strong>Absher and Nafath</strong></td><td>Register with your border number</td><td>Register with your iqama number</td></tr>
<tr><td><strong>Bank account and mada card</strong></td><td>Yes, at a branch or online with Nafath. The account is frozen when the Visitor ID expires</td><td>Yes, in the bank's app or at a branch</td></tr>
<tr><td><strong>SIM card</strong></td><td>Yes, registered to your passport and border number, with a fingerprint</td><td>Yes, registered to your iqama</td></tr>
<tr><td><strong>Home fibre internet</strong></td><td>No. Use a 5G router with a data SIM</td><td>Yes</td></tr>
<tr><td><strong>Rental contract on Ejar</strong></td><td>Yes, through an accredited Ejar agent</td><td>Yes, created by an accredited agent or the landlord and approved by you</td></tr>
<tr><td><strong>Saudi driving licence</strong></td><td>No</td><td>Yes, by swapping your foreign licence</td></tr>
<tr><td><strong>Buying or registering a car</strong></td><td>No</td><td>Yes</td></tr>
<tr><td><strong>Umrah and Rawdah permits in Nusuk</strong></td><td>Yes</td><td>Yes</td></tr>
<tr><td><strong>Hajj from inside the Kingdom</strong></td><td>Ask the University before you register or pay for a package</td><td>Yes, through Nusuk when registration opens</td></tr>
<tr><td><strong>Travelling abroad</strong></td><td>Check in Absher that your visa covers your return date, and follow the University's travel notice for holidays</td><td>An exit and re-entry visa from Absher before every trip</td></tr>
<tr><td><strong>Your own residence fees</strong></td><td>None</td><td>None for a student's own iqama. Dependants pay</td></tr>
</tbody></table>
<h2>Getting your Visitor ID</h2>
<p>Do these in order, because each step needs the one before it. The full first week, with your student card and University accounts, is in <a href="/guides/new-student-steps">First steps for new students</a>.</p>
<ol>
<li><strong>Get a Saudi SIM.</strong> Take your passport to any operator's branch. The line is registered to your passport and border number, and they take your fingerprint. You need this number for every code that follows.</li>
<li><strong>Register on Absher</strong> as a new user with your border number, your email and your new mobile number.</li>
<li><strong>Activate Absher at a self-service kiosk.</strong> Kiosks are in Jawazat offices, at the University, at airports and in some malls. Enter your border number and register your fingerprint.</li>
<li><strong>Activate Nafath</strong> in the Nafath app: open the settings, choose to activate your national digital identity, and complete your details and the face check. Banks, Ejar and most government sites use Nafath to confirm who you are.</li>
<li><strong>Issue your Visitor ID</strong> in Absher: choose <strong>Issue visitor ID</strong> and complete the details. It then shows in the app.</li>
<li><strong>Register your National Address</strong> with Saudi Post. Banks need an address in Saudi Arabia, and deliveries use it. See <a href="/ask/short-address">What is a short address?</a></li>
<li><strong>Open a bank account</strong> (below).</li>
</ol>
<blockquote><p>Note: If Absher or Nafath activation keeps failing, call Absher customer care on <strong>920020405</strong>, choose English, enter your border number and ask for a technical support ticket. Say you are a new international scholarship student on a student visa with a border number. The fix can take a few days. See <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>.</p></blockquote>
<h2>Banking</h2>
<p>The Saudi Central Bank allows banks to open accounts for holders of a Ministry of Interior Visitor ID. The bank must record your address in Saudi Arabia, your address at home and the purpose of your stay, and it cannot keep the account running past the end of your visa.</p>
<ol>
<li>Check that your Visitor ID shows as active in Absher, your National Address is registered and your mobile number is linked to Absher.</li>
<li><strong>At a branch:</strong> take your passport and show your Visitor ID in the Absher app. <strong>Online:</strong> apply in the bank's app or website and confirm your identity through Nafath.</li>
<li>Say you are a student at the Islamic University on the educational visa, and give your home address.</li>
<li>Your account number comes by text message. Collect your mada debit card at the branch or ask for it to be posted.</li>
<li>Your own account is for transfers and everyday spending. The stipend itself is paid onto <a href="/guides/getting-your-stipend-off-the-university-card">the University stipend card</a>, and you move it to your own account from there.</li>
</ol>
<blockquote><p>Tip: Banks apply the rules differently from branch to branch. If one says no, try another branch or another bank.</p></blockquote>
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
<p>Once you hold an iqama, the swap is in <a href="/guides/drivers-license">Driving in Madinah: your Saudi driving licence</a>.</p>
<h2>Umrah, the Rawdah and Hajj</h2>
<ul>
<li>Book Umrah and Rawdah permits in the Nusuk app. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</li>
<li>Hajj from inside the Kingdom is booked in Nusuk once registration opens, and a visit visa does not allow Hajj. Before you register or pay for a package on a Visitor ID, ask the University through Tawasul whether you are eligible.</li>
</ul>
<h2>Family</h2>
<p>Family visas for students on the educational visa go through the University's own procedures, so ask the University through Tawasul before you plan. Many wives, children and parents come on their own visas, most often the tourist eVisa where their passport qualifies. The options and the extension rules are in <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>. Children can still join many private kindergartens and schools: see <a href="/guides/kindergartens-and-schools">Kindergartens and schools</a>.</p>
<h2>Before your Visitor ID runs out</h2>
<p>Your bank account, your mada card and anything else tied to the Visitor ID stop working when it expires, until it is renewed. Plan for it like a deadline.</p>
<ol>
<li>Note the expiry date shown in Absher, and set reminders a month and a week before it. You can also check your visa without signing in on Muqeem's public visa inquiry, with the visa number and your passport number: see <a href="/guides/check-visa-and-iqama-online">Checking your visa, border number, insurance and fines online</a>.</li>
<li>Ask the University about renewal well before that date, through Tawasul.</li>
<li>Keep enough cash or a working foreign card to get through a few days if your Saudi card is frozen.</li>
<li>After the renewal, check that the new date shows in Absher and that your bank has it. If your card stays frozen, take your passport to a branch.</li>
<li>If your mobile line stops, take your passport to your operator, then update the number in Absher so your codes still reach you.</li>
</ol>
<p>Students returning after ta'jeel, an excuse or a break in study ask for a new visa on Minhati at <a href="https://minhatee2.iu.edu.sa/Home/VisaLanding">minhatee2.iu.edu.sa</a>, signing in with their University number.</p>
<h2>When something does not work</h2>
<p>Send questions about the educational visa to the University through Tawasul:</p>
<ol>
<li>Sign in to your student page and open <strong>Tawasul</strong> (تواصل).</li>
<li>Choose the <strong>Deanship of Admission and Registration</strong>.</li>
<li>Pick the subject <strong>Educational visa</strong> and describe your case in full: what you tried, where, and what you were told.</li>
<li>Watch your University email. The reply comes there.</li>
</ol>
<p>Other offices and contacts are in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>
<blockquote><p>Tip: Still stuck? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "women-at-masjid-an-nabawi",
    stage: "family",
    title: "Masjid an-Nabawi for sisters and families",
    summary: "The women's gates and prayer areas, booking the Rawdah as a woman, children's centres, wheelchairs and lifts, lost children, the women's library, duroos and Qur'an circles.",
    bodyHtml: `
<p>Checked 9 November 2026. Masjid an-Nabawi has large sections for women with their own gates, wudu areas and staff, and plenty of help for families with children, elderly parents or anyone who needs a wheelchair. Many sisters pray there daily, join Qur'an circles and follow the duroos. These notes are for the first visits and for settling into a routine.</p>
<h2>The women's gates and prayer areas</h2>
<ul>
<li>Women enter by their own gates. Gates 25, 29 and 41 are women's entrances.</li>
<li>The women's prayer areas are on the western side, through gates 13 and 17D, and on the northern side, through gates 23 to 31B, plus women's areas in the courtyards. They are closed off with screens and marked by signs.</li>
<li>Women staff check bags at the door. Gate use changes during building work and in busy seasons, so go by the signs on the day.</li>
<li>Women's wudu areas and toilets are next to the women's sections. Some are underground and reached by ramps in the courtyards. The women's toilets have shelves for changing a baby.</li>
<li>Note the number of the gate you entered by. The gates look alike, and the number is the easiest way back to your family.</li>
</ul>
<blockquote><p>Tip: Agree a meeting gate with your husband or family before you separate. Phone signal can drop when the masjid is full.</p></blockquote>
<h2>Visiting the Rawdah as a woman</h2>
<p>Women visit the Rawdah at their own set times, separate from the men. Entry is by a free permit in the Nusuk app or on the Nusuk website only.</p>
<ol>
<li>Open <strong>Nusuk</strong> and sign in. Residents use Nafath, and visitors from abroad use their passport number and email.</li>
<li>Go to Services, then the Prophet's Masjid permits, then <strong>Visit the Rawdah</strong>, and choose the <strong>women</strong> category.</li>
<li>Pick a date and slot. Women's slots are in the morning and late at night. The app shows only the times open to women, and the time printed on your permit is the one that counts. The permit is issued straight away.</li>
<li>The app also shows how many permits you can book. If no slot is free, try the <strong>instant</strong> option, which releases slots through the day to people near the masjid with location turned on, or join the waiting list.</li>
<li>Arrive a little early and follow the women stewards to the queue. Expect to wait about 20 minutes before entry.</li>
<li>Keep the permit open on your phone, with a screenshot in case the app is slow at the gate. A permit is cancelled if you miss your time.</li>
</ol>
<p>Inside, pray two rak'ahs and make du'a calmly, then make room for the next sister. Keep your voice low, do not crowd, and do not touch the walls or fittings hoping for blessing.</p>
<h2>Coming with children</h2>
<ul>
<li><strong>Children's centres:</strong> the masjid runs children's hospitality centres in the courtyards, where staff look after young children while you pray. They take boys up to 6 and girls up to 9, and run play areas, activities and a class for memorising short surahs. Bring your ID, because it is needed to leave a child and to collect them.</li>
<li><strong>Library:</strong> the Prophet's Mosque Library has reading halls for children.</li>
<li><strong>Lost children:</strong> there is a lost children's office in each of the eastern and western women's prayer areas, and the main office is by the Baqi' wall opposite courtyard door 34C. Write your phone number on a card in your child's pocket.</li>
<li><strong>Where to sit:</strong> with young children, a place near the back of the section makes it easy to step out without disturbing others. A baby carrier is easier than a pram in the crowds.</li>
</ul>
<h2>Elderly parents and wheelchairs</h2>
<ul>
<li>Free wheelchairs are lent from the Gates Management Office at Gate 7, and electric carts carry elderly and disabled visitors around the outer courtyards.</li>
<li>Electric lifts at Gate 9 on the east side and Gate 33 on the west side go up to the roof, and there are ramps beside the entrances.</li>
<li>Restrooms set aside for elderly and disabled visitors are spread around the masjid.</li>
<li>Deaf visitors have a room on the western roof where the Friday sermon is interpreted into sign language.</li>
<li>Two health centres are open round the clock: by Jibril Gate (355) and by Al-Safiyyah (305).</li>
</ul>
<h2>Bags, luggage and help</h2>
<ul>
<li>Carry a small bag with a zip. Bags are checked at the gate, and shoes go on the shelves inside, so a shoe bag helps.</li>
<li>A free left-luggage centre keeps bags for up to 4 hours, round the clock.</li>
<li>The General Authority for the Care of the Two Holy Mosques has a unified number, <strong>1966</strong>. In an emergency, call 997 for an ambulance or 911.</li>
<li>Car parks are reached from the Abu Bakr as-Siddiq entrance on the north side, the Quba and Prince Abdulmohsen Road entrance on the south side and the Umar ibn al-Khattab entrance on the west side, with self-service payment machines.</li>
</ul>
<h2>The women's library</h2>
<p>The Prophet's Mosque Library is open every day, 24 hours. The women's library is by the women's prayer areas near Gate 24 and Gate 16. Bags and food are not allowed, and laptops need a permit. See <a href="/ask/library-bags-laptops">Can I take a bag or laptop into the libraries?</a></p>
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
<h2>Fridays, Ramadan and busy nights</h2>
<ul>
<li>Women's sections fill early before Jumu'ah, Tarawih and the big prayers. Come 30 to 45 minutes before if you want space near the front.</li>
<li>The Authority publishes how full each prayer area is, live, on <a href="https://alharamain.gov.sa/public/?module=prayers_ar">alharamain.gov.sa</a>. Check it before you set out on a Friday or in Ramadan.</li>
<li>Bring a light prayer mat for the courtyards. The marble is hot at midday in summer and cold on winter nights.</li>
</ul>
<h2>Quba and al-Baqi'</h2>
<ul>
<li>Masjid Quba needs no booking, and sisters pray there in their own section. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</li>
<li>Al-Baqi' is open to men only. Women can see it from outside the boundary.</li>
</ul>
<p>For what is inside the masjid and the courtyards, see <a href="/guides/masjid-an-nabawi-first-visit">Visiting Masjid an-Nabawi: a first-visit guide</a>.</p>
<blockquote><p>Tip: A question we have not answered here? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "first-30-days-in-madinah",
    stage: "getting-started",
    title: "Your first 30 days in Madinah: a checklist",
    summary: "From landing to settled: SIM, Absher, Nafath, bank, housing, University registration, transport, groceries and health, in the order that works.",
    bodyHtml: `
<p>Checked 9 November 2026. This is the order that saves the most time, because each step unlocks the next. Tick each one off as you go. Students on the educational visa have a Visitor ID rather than an iqama, and the steps below cover both.</p>
<h2>Before you fly</h2>
<ol>
<li>Check that the name on your ticket, visa and every University record matches your passport exactly, letter for letter.</li>
<li>Pack your original certificates, passport photos on a white background, and copies of everything on your phone.</li>
<li>Bring enough cash or a working foreign card for your first two months. The first stipend and your bank card take time.</li>
<li>Bring a letter from your doctor for any regular medicine. Prescriptions from other countries are not accepted here.</li>
</ol>
<h2>Day 1 and 2: phone and the first night</h2>
<ol>
<li><strong>Get a Saudi SIM</strong> at the airport or any operator's branch, with your passport and border number. The shop takes your fingerprint. Your number receives the codes for Absher, Nafath and your bank. See <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
<li><strong>Get to your room or your first night's stay.</strong> Ride apps such as Careem and Uber work from the airport. Families renting a flat do best with a hotel or short let for the first week or two.</li>
<li><strong>Save the emergency numbers:</strong> 997 for an ambulance and 911, the unified emergency number in Madinah.</li>
</ol>
<h2>Week 1: University and your digital identity</h2>
<ol>
<li><strong>Register on Absher</strong> with your border number (or your iqama number), <strong>activate it at a self-service kiosk</strong> with your fingerprint, then <strong>activate Nafath</strong>. If activation fails, see <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>. The full order is in <a href="/guides/new-student-steps">First steps for new students</a>.</li>
<li><strong>Issue your Visitor ID</strong> in Absher if you are on the educational visa. What it can and cannot do is in <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</li>
<li><strong>Get your student card.</strong> New students receive it during orientation week. If you arrive later, take your Visitor ID or iqama to the student card office, which prints it on the spot.</li>
<li><strong>Set up your University email and the Academic System.</strong> Your timetable is under Electronic Registration (التسجيل الإلكتروني), then Registered Courses (المقررات المسجلة). See <a href="/ask/find-my-timetable">Where do I find my class timetable?</a></li>
<li><strong>Book your meals</strong> at the mat'am if you eat on campus. Meals are reserved a month at a time, so set a reminder before each month ends. See <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</li>
</ol>
<h2>Week 2: money and paperwork</h2>
<ol>
<li><strong>Register your National Address</strong> with Saudi Post. Banks and deliveries need it. See <a href="/ask/short-address">What is a short address?</a></li>
<li><strong>Open a bank account</strong> and order a mada card. Visitor ID holders go to a branch with their passport and their Visitor ID in Absher, or open online through Nafath. The stipend itself is paid onto <a href="/guides/getting-your-stipend-off-the-university-card">the University stipend card</a>, which the University issues, not into this account.</li>
<li><strong>Set up Etimad</strong> for your University tickets and check your details match your passport. See <a href="/guides/etimad-account">Your University ticket: Etimad, the travel order and the rules</a>.</li>
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
<li><strong>Know where to go when you are ill:</strong> the University Medical Center for students, a pharmacy for small things, and the nearest emergency department for anything serious. See <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</li>
<li><strong>Book the Rawdah</strong> in Nusuk and plan your first Saturday at Quba. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</li>
<li><strong>Pick a dars or a halaqah</strong> to attend each week. Today's duroos are on <a href="/duroos">Duroos</a>.</li>
<li><strong>Check your phone, bank and Absher still work together.</strong> If you changed SIM, update the number in Absher.</li>
</ol>
<blockquote><p>Tip: Keep a folder on your phone with photos of your passport, visa, student card, contract and every receipt. You will be asked for them more often than you expect.</p></blockquote>
<h2>Not a student?</h2>
<p>Families and muhajirun on a visit visa follow most of the same list: SIM, Absher, bank, housing, transport. Check how long your visa lets you stay and how extensions work in <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>, and see <a href="/guides/kindergartens-and-schools">Kindergartens and schools</a> if you have children.</p>
<blockquote><p>Tip: Stuck on a step? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "masjid-an-nabawi-institute-and-college",
    stage: "study",
    title: "The Masjid an-Nabawi Institute and College",
    summary: "Free full-time study inside the Haram, from intermediate level to a bachelor's degree, for brothers and sisters with an iqama: who can apply, the yearly window in Safar, the exam and the interview.",
    bodyHtml: `
<p>Checked 9 November 2026. The Institute of the Haram in Makkah has a branch at Masjid an-Nabawi, with an Institute (Ma'had) for intermediate and secondary study and a College (Kulliyah) for a bachelor's degree. Study is free and full time, inside the masjid, with separate sections for brothers and sisters.</p>
<h2>The levels</h2>
<table><thead><tr><th>Level</th><th>Who can apply</th></tr></thead><tbody>
<tr><td>Intermediate (Institute)</td><td>At least 12 at the start of the year, with a primary school certificate</td></tr>
<tr><td>Secondary (Institute)</td><td>At least 15 at the start of the year, with an intermediate certificate</td></tr>
<tr><td>Bachelor's (College)</td><td>A general secondary certificate or its equivalent, with at least 85%, and at least three juz of the Qur'an memorised. Non-Saudis need at least three months left on their iqama</td></tr>
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
<p>Registration opens once a year, from 5 to 20 Safar. For 1448 that was 19 July to 3 August 2026. In 1449, Safar falls in July 2027.</p>
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
<blockquote><p>Tip: Questions about your own case? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "haramain-train-and-city-buses",
    stage: "getting-settled",
    title: "The Haramain train and Madinah buses",
    summary: "Booking the high-speed train to Makkah and Jeddah, fares, luggage and tickets, and riding the city buses with the Madinah Bus app.",
    bodyHtml: `
<p>Checked 9 November 2026. Two public services cover most trips: the Haramain high-speed train to Makkah and Jeddah, and the Madinah Bus network inside the city.</p>
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
<li><strong>Children</strong> get 50% off economy and 40% off business. An infant on a parent's lap pays 10% of the fare. The booking page shows the price for each passenger.</li>
<li><strong>Base fares:</strong> Madinah to Makkah from 162 SAR in economy and 455 SAR in business, and Madinah to Jeddah from 135 SAR in economy and 375 SAR in business, before VAT.</li>
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
<li><strong>Fare:</strong> 3.45 SAR a ride on the city routes. The airport route (400) has its own fare, shown in the Madinah Bus app. Each ticket is for one bus, so changing buses means a new fare.</li>
<li><strong>No cash on board.</strong> Pay with mada, Visa or Mastercard, Apple Pay or another phone wallet, the virtual card in the Madinah Bus app, or a plastic bus card.</li>
<li><strong>Passes in the app:</strong> 10 rides in a day for 10 SAR, 35 rides in a week for 60 SAR, and 175 rides in a month for 240 SAR.</li>
<li><strong>Wallet refunds:</strong> only a balance above 50 SAR can be refunded, less a 20% fee, so top up in small amounts.</li>
<li><strong>Hours:</strong> buses run from about 6 am to midnight, and some routes run round the clock. Each route's times are under Prices and service times in the app.</li>
<li><strong>Customer care:</strong> 920000877.</li>
</ul>
<ol>
<li>Install the <strong>Madinah Bus</strong> app and create an account.</li>
<li>Add a bank card or buy a pass.</li>
<li>Use the route map in the app to plan your trip, including the routes that serve the University and the train station.</li>
<li>Tap your card or show the app code when you board.</li>
</ol>
<p>Ride apps, the Quba walkway shuttles and shared taxis to Makkah are in <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</p>
<blockquote><p>Tip: A question about a route? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "university-offices-and-contacts",
    stage: "study",
    title: "Who to ask at the Islamic University: offices, portals and contacts",
    summary: "Which office or portal handles tickets, visas, registration, absence, housing, health, meals, passwords and documents, with the numbers, emails and links, how to sign in, and how to write a request that gets answered.",
    bodyHtml: `
<p>Checked November 2026. Most problems at the University are solved quickly once they reach the right office. This page lists who does what, and the portal or contact for each.</p>
<h2>Start here</h2>
<ul>
<li><strong>Student care:</strong> call <strong>920022042</strong> or email <strong>care@iu.edu.sa</strong> when you do not know where a question belongs.</li>
<li><strong>Tawasul</strong> (تواصل), the University's request system, at <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a>. Sign in with your University login and send your request to the right office. If you cannot sign in yet, use the guest form at <a href="https://helpdesk.iu.edu.sa/newticket_guest">helpdesk.iu.edu.sa/newticket_guest</a>.</li>
<li><strong>Your University email.</strong> Replies and official notices come here, so read it every day.</li>
<li><strong>Your college's wakeel</strong> (vice dean) for student affairs: absences, excuses, timetable problems after drop and add, and anything your college decides.</li>
</ul>
<h2>Who handles what</h2>
<table><thead><tr><th>You need</th><th>Who handles it</th><th>Where</th></tr></thead><tbody>
<tr><td>Your ticket home, your arrival ticket, passport matters</td><td>Travel Management (إدارة السفر)</td><td>Tickets through Etimad: see <a href="/guides/etimad-account">Your University ticket: Etimad, the travel order and the rules</a>. Arrival tickets through Minhati</td></tr>
<tr><td>An exit and re-entry visa, your iqama renewal</td><td>Travel Management (إدارة السفر)</td><td>The <strong>Travel Management System</strong> (نظام إدارة السفر) in the University's e-services, or Tawasul</td></tr>
<tr><td>Your educational visa and Visitor ID</td><td>Deanship of Admission and Registration</td><td>Tawasul, subject Educational visa: see <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a></td></tr>
<tr><td>Registration, your timetable, adding and dropping courses, ta'jeel and i'tithaar, transfers</td><td>Deanship of Admission and Registration</td><td>The Academic System, and Tawasul or <strong>admission.reg@iu.edu.sa</strong> for anything it cannot do</td></tr>
<tr><td>A new visa after ta'jeel, an excuse or a break in study</td><td>Deanship of Admission and Registration</td><td><a href="https://minhatee2.iu.edu.sa/Home/VisaLanding">Minhati visa page</a>, signing in with your University number</td></tr>
<tr><td>An absence excuse, a missed final, a mark you want reviewed</td><td>Your college</td><td>The Academic System screens in <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>, then the wakeel of your college</td></tr>
<tr><td>Advice on your study plan</td><td>Your academic advisor</td><td>Academic System, Academic, then <strong>Contact the academic advisor</strong> (التواصل مع المرشد الأكاديمي)</td></tr>
<tr><td>A message to a teacher</td><td>The teacher</td><td>Academic System, Personal, then <strong>Send email</strong> (إرسال بريد إلكتروني), or a message in Blackboard</td></tr>
<tr><td>Housing, activities, clubs and life in the halls</td><td>Deanship of Student Affairs</td><td>Tawasul, or the office in person. The housing office for room handovers is in Unit 22</td></tr>
<tr><td>Your stipend and the stipend card</td><td>The rewards service</td><td>Academic System, Personal, then Rewards</td></tr>
<tr><td>A letter proving you are a student, a transcript</td><td>Issued automatically, free and stamped</td><td>Academic System, Personal, then Official Documents</td></tr>
<tr><td>Passwords and sign-in problems</td><td>Deanship of IT and E-Learning</td><td><strong>it.care@iu.edu.sa</strong>, or <strong>+966 14 847 1856</strong></td></tr>
<tr><td>Blackboard</td><td>E-Learning Center</td><td><strong>bb@iu.edu.sa</strong>, or Tawasul to the E-Learning Center: see <a href="/ask/blackboard-login">How do I log in to Blackboard?</a></td></tr>
<tr><td>A doctor or dentist</td><td>University Medical Center</td><td>Book at <a href="https://vcappointments.iu.edu.sa/">vcappointments.iu.edu.sa</a></td></tr>
<tr><td>Meals at the mat'am</td><td>The University restaurant</td><td>Book monthly at <a href="https://restaurant.iu.edu.sa/">restaurant.iu.edu.sa</a></td></tr>
<tr><td>Your application, before you arrive</td><td>Deanship of Admission and Registration</td><td><a href="https://minhatee2.iu.edu.sa/">Minhati</a> and its helpdesk, and Study in Saudi for the final acceptance and visa</td></tr>
</tbody></table>
<h2>Signing in</h2>
<ol>
<li>Open <a href="https://iu.edu.sa/">iu.edu.sa</a> and tap the <strong>user account</strong> icon in the top bar, or go straight to sso.iu.edu.sa.</li>
<li>Choose <strong>Login through Nafath</strong> (الدخول عن طريق نفاذ), or <strong>Login with University number</strong> (الدخول بالرقم الجامعي / الوظيفي).</li>
<li>With your University number: type the number, your password and the <strong>verification code</strong> (رمز التحقق) shown on the screen beside the box. Tap the refresh arrow if the code is hard to read. Then tap <strong>Login</strong> (دخول).</li>
<li>If the website hangs, sign in through Nafath or use the University's app.</li>
</ol>
<p>One login opens every University system. Your password, and the mobile number that receives your University alerts and codes, are changed from the same <strong>user account</strong> icon. Every screen is explained step by step in <a href="/guides/university-student-system">Using the University's student system</a>.</p>
<h2>The portals you will use</h2>
<ul>
<li><strong>Academic System</strong> (النظام الأكاديمي): five menus, Electronic Registration, Personal, Academic, Travel Management System and Graduation procedures. Your timetable, results, absence, academic requests, rewards and official documents are all here.</li>
<li><strong>Blackboard</strong>, the tile named <strong>Zidni</strong> (زدني): your classes, materials, tests and class chats. Never open links posted by accounts you do not know: see <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat</a>.</li>
<li><strong>Tawasul</strong> (نظام تواصل / إدارة الطلبات): requests to any office.</li>
<li><strong>Saudi Digital Library</strong> (المكتبة الرقمية السعودية): books, journals and databases, opened from inside the Kingdom.</li>
<li><strong>Minhati:</strong> your application, the arrival ticket request and visa renewal for returning students.</li>
<li><strong>Etimad:</strong> travel orders for your University tickets.</li>
</ul>
<h2>Writing a request that gets answered</h2>
<ol>
<li>Send it to the office that handles the matter, using the table above. In Tawasul, tap <strong>New request</strong> (طلب جديد) and choose the office from the list.</li>
<li>Give it a clear title under <strong>Subject</strong> (الموضوع). Under <strong>Request details</strong> (تفاصيل الطلب), start with your full name as in your passport, your University number and your college.</li>
<li>Say in a few lines what you need, what you have already tried, where, and what you were told.</li>
<li>Attach screenshots of any error and copies of the documents involved, then tap <strong>Send request</strong> (إرسال الطلب).</li>
<li>Follow it under <strong>My requests</strong> (طلباتي), and save the reference number so you can follow it up.</li>
<li>Watch your University email for the reply, and answer any follow-up question the same day. If nothing comes, follow it up in person.</li>
</ol>
<blockquote><p>Tip: Your name must match your passport letter for letter on every portal. A mismatch is the most common reason a ticket or a request gets stuck.</p></blockquote>
<h2>Official news</h2>
<p>The University posts announcements, calendars and deadlines on X: <strong>@iu_edu</strong> for the University, <strong>@AdmissDeanship</strong> for the Deanship of Admission and Registration, and <strong>@dsa_iu_edu</strong> for the Deanship of Student Affairs. Go by these and your University email, not by forwarded messages in groups.</p>
<h2>Outside the University</h2>
<table><thead><tr><th>For</th><th>Contact</th></tr></thead><tbody>
<tr><td>Absher or Nafath not activating</td><td>Absher customer care, <strong>920020405</strong>, 24 hours. See <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a></td></tr>
<tr><td>A rental contract</td><td>Ejar, <strong>199011</strong></td></tr>
<tr><td>City buses</td><td>Madinah Bus, <strong>920000877</strong></td></tr>
<tr><td>The Haramain train</td><td><strong>920004433</strong></td></tr>
<tr><td>The Prophet's Mosque</td><td>General Authority for the Care of the Two Holy Mosques, <strong>1966</strong></td></tr>
<tr><td>Emergencies</td><td>Ambulance <strong>997</strong>, unified emergency number <strong>911</strong></td></tr>
</tbody></table>
<p>Daily life on campus is in <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</p>
<blockquote><p>Tip: Not sure which office to ask? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "scholarship-stipend-and-allowances",
    stage: "study",
    title: "Your scholarship money: stipend, allowances and tickets",
    summary: "What a full scholarship pays and when: the monthly stipend and pay days, the University stipend card, the arrival, books, excellence and graduation allowances, the yearly ticket home, Student Fund loans, and what stops payment.",
    bodyHtml: `
<p>Checked 9 November 2026. A full (external) scholarship at the Islamic University pays more than the monthly stipend. This page sets out each payment, when it comes, where it lands and what can stop it.</p>
<h2>What a full scholarship gives you</h2>
<ul>
<li>A <strong>monthly stipend</strong> (mukafa'ah, مكافأة).</li>
<li>An <strong>arrival allowance</strong> (بدل تجهيز) of two months' stipend, paid after you first arrive.</li>
<li>A <strong>books allowance</strong> (بدل كتب) once a year for college (kulliyah) students. In 1448 it was paid in October.</li>
<li>An <strong>excellence allowance</strong> (بدل التفوق) for top grades. See below.</li>
<li>A <strong>graduation allowance</strong> (بدل تخرج) of three months' stipend, for shipping your books home.</li>
<li>A <strong>ticket home at the end of each academic year</strong>, in discounted economy class, by the most direct route. It is given only when no other party already provides you with a ticket.</li>
<li>University housing, three subsidised meals a day, free buses to the Haram and free medical care at the University Medical Center.</li>
</ul>
<h2>Partial scholarships</h2>
<p>A partial (internal) scholarship, for applicants already living in Saudi Arabia, covers tuition only. It pays no stipend and no allowances, and includes no ticket, no meals and no free housing. When places are free, the University offers partial scholarship students a paid room in Unit 13: see <a href="/guides/unit-13-and-paid-university-housing">Unit 13 and paid University housing</a>.</p>
<h2>The monthly stipend</h2>
<ul>
<li><strong>The rate</strong> is set by the University and depends on your college. Your own payments are in the Academic System under <strong>Personal</strong>, then <strong>Rewards</strong> (المكافآت).</li>
<li><strong>Where it goes:</strong> onto your <strong>University stipend card</strong>, an Al Rajhi Bank card the University issues to you. It is not paid into a bank account of your own. See the next section.</li>
<li><strong>When:</strong> usually between the <strong>21st and the 25th</strong> of each Gregorian month, late at night. If the day falls on a weekend it moves to the nearest working day, and the University pays early before holidays such as National Day and Founding Day. After an early payment, the next one comes more than a month later.</li>
<li><strong>All year:</strong> it is paid every month, the summer break included.</li>
<li><strong>Alerts:</strong> the text message does not always arrive, so check the card balance itself.</li>
</ul>
<h3>Your first months</h3>
<p>New students receive no stipend in their first month. The second month brings a double payment that covers both months: in September 2026 new students received two payments of the monthly rate, a day apart. The arrival allowance is a separate payment. If nothing has arrived by the end of your second month, go to the stipends section (قسم المكافآت) of the Deanship of Student Affairs.</p>
<blockquote><p>Tip: Bring enough money for your first two months. Your first stipend comes in your second month.</p></blockquote>
<h2>The University stipend card</h2>
<ul>
<li><strong>Getting it:</strong> new students receive the card after orientation. Cards are issued and renewed at the card office in Unit 22 (الوحدة 22), 8:00 am to 2:00 pm on working days. The University activates the card, and the PIN comes in the envelope. You can change the PIN at any Al Rajhi ATM.</li>
<li><strong>Money only goes out:</strong> the card takes no cash deposits and no transfers in, and it cannot be added to Apple Pay or the Al Rajhi app.</li>
<li><strong>Using the money:</strong> withdraw it at an Al Rajhi ATM, or move it to your own bank account with the Barq app, which is instant and free. Step by step: <a href="/guides/getting-your-stipend-off-the-university-card">Getting your stipend off the University card</a>.</li>
<li><strong>Your own account:</strong> open a Saudi bank account early so you have somewhere to move the money. On a Visitor ID, see <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
<li><strong>Lost, swallowed or expired card:</strong> ask the stipends section for a replacement (بدل فاقد). It takes about two weeks, a small fee is taken from the card, and your stipend is kept. An expired card cannot be used at all, so renew it before the expiry date.</li>
<li><strong>After a card change:</strong> a new or renewed card can hold up a payment while the University updates its records. If a payment is missing after a change, tell the stipends section.</li>
</ul>
<h2>The excellence allowance</h2>
<p>Full scholarship students with a <strong>semester GPA of 4.50 or more out of 5 in both semesters</strong> of the academic year receive an excellence allowance (بدل التفوق) once a year. In recent years it has been 1,000 SAR.</p>
<ul>
<li>Each semester's GPA counts on its own. Your cumulative GPA does not.</li>
<li>There is nothing to apply for. It is paid onto your stipend card in batches after the year ends, usually from July, with the last batches alongside the August or September stipend.</li>
<li>A bar (حرمان) from a course loses it.</li>
<li>If you qualified and nothing has arrived by the end of September, ask the stipends section.</li>
</ul>
<h2>Student Fund loans</h2>
<p>If you run short, the Student Fund (صندوق الطالب) in Unit 22 gives loans (سلفة) of up to <strong>2,000 SAR</strong>, repaid in fixed monthly instalments taken from your stipend.</p>
<ol>
<li>Collect the Fund's form at Unit 22.</li>
<li>Bring an IBAN certificate for your own bank account, your academic record and your student card.</li>
<li>Hand in the form. The money reaches your account in one to four weeks.</li>
</ol>
<p>You can borrow once only, and not in your final year. A good GPA helps your request. The Fund also has an aid section (إعانة) for students in real hardship.</p>
<h2>What stops the stipend</h2>
<ul>
<li><strong>Ta'jeel or i'tithaar:</strong> the stipend stops for the semester you are not studying. See <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</li>
<li><strong>Passing the regular length of your programme:</strong> the stipend covers the normal number of semesters in your study plan. Extra semesters beyond it are unpaid unless the University approves them.</li>
<li><strong>Leaving your studies:</strong> withdrawal or dismissal ends the scholarship.</li>
</ul>
<h2>Your ticket home</h2>
<p>Each academic year the University gives you a discounted economy ticket home and back, issued against a travel order on Etimad. The main rules:</p>
<ul>
<li>It goes to one of the cities the University sets for your country. In 2026, for example, students going to the USA chose New York or Washington DC. A connection beyond that city is at your own cost.</li>
<li>It is given only when no other party already provides you with a ticket.</li>
<li>Valid for 3 months from the first travel date. The name, the destination and the outbound airports cannot be changed.</li>
<li>Date changes are at your cost, cancelling returns the ticket to the University with no cash refund, and a no-show loses the ticket.</li>
<li>One cabin bag and two checked bags.</li>
</ul>
<p>How to request it, how group tickets arrive and what to do about an exam clash are in <a href="/guides/etimad-account">Your University ticket: Etimad, the travel order and the rules</a>.</p>
<h2>Married students</h2>
<p>The University's Scholarship Fund (صندوق المنح) runs support programmes for married scholarship students whose families live with them in Madinah, including a hardship programme (تفريج كرب). It announces each round on its Telegram channel, <a href="https://t.me/BoxIslamicUniversity1">t.me/BoxIslamicUniversity1</a>. When it asks married students to update their details, send a recent enrolment letter (إفادة), an IBAN certificate and the iqamas of every family member, all as PDF, before the deadline.</p>
<h2>When you graduate</h2>
<p>Graduates receive the graduation allowance of three months' stipend and a final ticket home, once the University has confirmed their clearance. The allowance reaches your card one to two months after you graduate. The steps are in <a href="/guides/graduate-procedures">Leaving Madinah for good</a>.</p>
<blockquote><p>Tip: A payment missing or wrong? Check the Rewards screen and your card balance first, then go to the stipends section of the Deanship of Student Affairs or send a request through Tawasul. Still stuck? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
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
    summary: "The 2025 to 2026 system step by step, from the Study in Saudi portal and the second application on Minhati to final approval, the educational visa and arrival, with past windows, the colleges and programme lengths, full and partial scholarships, how internal applicants are ranked and what to prepare now.",
    bodyHtml: `
<blockquote><p>Important: applying is free and you do it yourself on <a href="https://studyinsaudi.sa/">studyinsaudi.sa</a>. The University has no offices or agents abroad. Anyone who asks you for money to apply, to speed things up or to guarantee a place is not working for the University. Do not pay them and do not give them your login.</p></blockquote>
<p>Checked 9 November 2026. Since 2025 the whole journey runs through one national portal, a second application on the University's own portal, a final approval from the Ministry of Education and an electronic educational visa. New students arrive with a Visitor ID rather than an iqama.</p>
<h2>When applications open</h2>
<p>The University opens for international bachelor's applicants once a year on Study in Saudi and announces the dates each season. In recent years the main window has been in spring, with short reopenings for some applicants. The portal is closed outside the window.</p>
<table><thead><tr><th>Round</th><th>Window</th></tr></thead><tbody>
<tr><td>Autumn 2023</td><td>7 September to 7 December 2023</td></tr>
<tr><td>2024</td><td>21 April to 28 July 2024</td></tr>
<tr><td>2025, for the 1447 year</td><td>1 May to 14 June 2025</td></tr>
<tr><td>2026, for the 1448 year</td><td>19 April to 21 May 2026</td></tr>
<tr><td>2026, extra round (second round for full scholarships, third for partial)</td><td>16 September to 6 October 2026</td></tr>
</tbody></table>
<p>Extra rounds like the September 2026 one are short and are also open to applicants who were not accepted earlier in the year. Watch studyinsaudi.sa and the University's announcements from March, and have every document ready before the window opens. Recent windows have lasted five to six weeks, and the last days are the busiest, so apply early in the window, not on the final day.</p>
<h2>Who can apply</h2>
<ul>
<li><strong>Age:</strong> at least 17 and no older than 25.</li>
<li><strong>School certificate:</strong> general secondary or its equivalent, no more than five years old. Scientific colleges need the scientific track. An old certificate is one of the most common reasons for rejection.</li>
<li><strong>Where you live:</strong> full scholarship applicants must be living outside Saudi Arabia.</li>
<li><strong>Record:</strong> good conduct, never expelled from a university for discipline, and not already on a Saudi scholarship.</li>
<li><strong>Health:</strong> medically fit, with a medical report showing you are in good health.</li>
<li><strong>Recommendation:</strong> two scholarly recommendation letters (tazkiyah) are a condition of admission, not an extra.</li>
<li><strong>College of the Holy Qur'an:</strong> the whole Qur'an memorised, confirmed in an oral exam.</li>
<li><strong>Engineering, computing and science:</strong> these colleges teach in English and ask for IELTS or TOEFL, unless your earlier study was in English or you come from a country where English is an official or main language. The Islamic and Arabic colleges teach in Arabic.</li>
<li><strong>Finished school in Saudi Arabia?</strong> You count as an internal applicant even if you apply for an external scholarship, and you must submit the General Aptitude Test, plus the Achievement Test for the scientific colleges.</li>
<li><strong>Brothers only for study in Madinah.</strong> Sisters can study with the University online, and other routes are in <a href="/ask/sisters-study">Where can sisters study?</a></li>
</ul>
<h2>The programmes</h2>
<p>These are the bachelor's programmes open to scholarship students for the 1448 year.</p>
<table><thead><tr><th>College</th><th>Programmes</th><th>Length</th><th>Taught in</th></tr></thead><tbody>
<tr><td>Sharia</td><td>Sharia</td><td>4 years</td><td>Arabic</td></tr>
<tr><td>Creed and Da'wah</td><td>Creed and Da'wah</td><td>4 years</td><td>Arabic</td></tr>
<tr><td>Holy Qur'an</td><td>Holy Qur'an</td><td>4 years</td><td>Arabic</td></tr>
<tr><td>Hadith</td><td>Hadith</td><td>4 years</td><td>Arabic</td></tr>
<tr><td>Arabic Language and Humanities</td><td>Arabic Language, Media</td><td>4 years</td><td>Arabic</td></tr>
<tr><td>Law</td><td>Law (al-Anzimah, الأنظمة)</td><td>4 years</td><td>Arabic</td></tr>
<tr><td>Business</td><td>Economics</td><td>4 years</td><td>Arabic</td></tr>
<tr><td>Engineering</td><td>Chemical, Civil, Electrical, Industrial, Mechanical</td><td>5 years</td><td>English</td></tr>
<tr><td>Computer</td><td>Computer Science, Data Science, Information Technology</td><td>5 years</td><td>English</td></tr>
<tr><td>Science</td><td>Chemistry, Environmental Sciences, Financial and Actuarial Mathematics, Mathematics, Physics</td><td>4 years</td><td>English</td></tr>
</tbody></table>
<p>New in 1448: Law is now its own College of Law, and Economics sits in the College of Business. Classes for both are held in the Sharia buildings.</p>
<h3>The Arabic Language Institute (Ma'had)</h3>
<p>The Institute runs two Arabic diplomas before college: the Intermediate Diploma (الدبلوم المتوسط), 2 years, and the Associate Diploma (الدبلوم المشارك), 1 year. You do not choose the Ma'had. The University places you there if your Arabic needs it, and students with strong Arabic start straight in their college. Your degree years come after any time in the Ma'had.</p>
<h3>Choose your college with care</h3>
<p>Scholarship students cannot transfer to another college after admission. You study the programme and college you are accepted into.</p>
<h2>Full and partial scholarships</h2>
<p>The University offers international bachelor's students two kinds of scholarship. Both are full-time study on campus in Madinah, and your offer on Study in Saudi shows which one you have.</p>
<table><thead><tr><th>Topic</th><th>Full (external, منحة خارجية)</th><th>Partial (internal, منحة داخلية)</th></tr></thead><tbody>
<tr><td><strong>Who</strong></td><td>Non-Saudi applicants living outside Saudi Arabia</td><td>Non-Saudi applicants living in Saudi Arabia on a legal residency, which they must keep for their whole degree</td></tr>
<tr><td><strong>Tuition</strong></td><td>Free</td><td>Free</td></tr>
<tr><td><strong>Monthly stipend</strong></td><td>Yes</td><td>No</td></tr>
<tr><td><strong>Arrival and graduation allowances</strong></td><td>Yes: two months' stipend on arrival and three months' stipend on graduating</td><td>No</td></tr>
<tr><td><strong>Ticket home each year</strong></td><td>Yes, discounted economy, unless another party already gives you a ticket</td><td>No</td></tr>
<tr><td><strong>Housing</strong></td><td>Free University housing</td><td>No free housing. Paid rooms in Unit 13 are offered when places are free</td></tr>
<tr><td><strong>Subsidised meals</strong></td><td>Yes</td><td>No</td></tr>
<tr><td><strong>Extra condition</strong></td><td>None</td><td>If you work, your employer's written approval to study</td></tr>
</tbody></table>
<p>More in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money: stipend, allowances and tickets</a> and <a href="/guides/unit-13-and-paid-university-housing">Unit 13 and paid University housing</a>.</p>
<h2>Applying from inside Saudi Arabia</h2>
<p>If you live in Saudi Arabia on a legal residency, you apply for a partial (internal) scholarship. If you finished secondary school in Saudi Arabia, you are treated as an internal applicant for every admission rule, even if you apply for a full scholarship.</p>
<p>Internal applicants must sit the General Aptitude Test (اختبار القدرات العامة). For engineering, computing and science you also need the Achievement Test (الاختبار التحصيلي). Without these results your application is not considered. Places are ranked by a weighted score:</p>
<table><thead><tr><th>Colleges</th><th>Secondary certificate</th><th>General Aptitude Test</th><th>Achievement Test</th></tr></thead><tbody>
<tr><td>Islamic, Arabic, Law and Business colleges</td><td>50%</td><td>50%</td><td>Not used</td></tr>
<tr><td>Engineering, Computer and Science colleges</td><td>30%</td><td>30%</td><td>40%</td></tr>
</tbody></table>
<p>Applicants are then sorted by score and by the order of their choices, and each programme takes as many students as it has seats. <strong>Worked example:</strong> for Sharia, a secondary certificate of 90% and an aptitude score of 80 give a weighted score of 45 + 40 = 85.</p>
<h2>Prepare now for the next window</h2>
<ol>
<li><strong>Passport:</strong> valid well beyond your planned arrival. Every form must use your name exactly as it is printed in it.</li>
<li><strong>Secondary school certificate and transcript.</strong> Check it will still be under five years old when you apply.</li>
<li><strong>Police clearance</strong> from your country. In many countries this takes weeks, so start early.</li>
<li><strong>For a partial scholarship:</strong> your employer's approval.</li>
<li><strong>Two scholarly recommendation letters (tazkiyah)</strong> from recognised organisations, institutions or scholars in your country, or from well-known figures the University approves. Both are required.</li>
<li><strong>Medical report</strong> showing you are in good health and fit to study.</li>
<li><strong>Birth certificate</strong>, or an official age assessment certificate (شهادة التسنين) if you have no birth certificate.</li>
<li><strong>IELTS or TOEFL</strong> for engineering, computing and science, unless you are exempt.</li>
<li><strong>Photo:</strong> passport style, plain white background, neutral face, and not in white clothes. A photo studio does this properly.</li>
<li><strong>Arabic translations</strong> of anything not in Arabic, made by a certified translator.</li>
<li><strong>Extra certificates</strong> for Qur'an memorisation, Arabic, mutun or ijazah, if you have them. They count for the Islamic colleges.</li>
<li><strong>Clear colour scans</strong> of everything. Do not use phone photos.</li>
<li><strong>An email address you check every day,</strong> including the spam folder. Your registered email is the University's official channel. If you lose access to it, your admission or visa can stop and your application can be removed.</li>
</ol>
<p>Everything you enter in your application must be backed by a document. Details without a document are not accepted, and applying does not oblige the University to admit you.</p>
<h2>From application to arrival</h2>
<ol>
<li><strong>Apply on Study in Saudi.</strong> Create your account, fill in your details, upload your documents and choose your programmes. You can choose up to 25 programmes across more than ten universities, and each shows whether it is a full, partial or paid scholarship. Submit before the deadline and keep your application number.</li>
<li><strong>Complete the second application on Minhati.</strong> The University emails you login details for <a href="https://minhatee2.iu.edu.sa/">Minhati</a>, its own portal, and asks for extra details and documents with Arabic translations. You often have only about 24 hours, so act the same day.</li>
<li><strong>Sit the interview or the placement test if invited.</strong> The interview is online. The Arabic placement test (اختبار تحديد مستوى اللغة العربية) is for full scholarship applicants the University chooses to assess. It is not pass or fail: it decides whether you start in the Ma'had and at which level, or go straight to your college, so answer honestly. A level that is too high makes your first year much harder.</li>
<li><strong>Accept your offer within 5 days.</strong> Initial acceptance arrives by email and shows on the portal as waiting for your confirmation. Accepting cancels your applications to other universities. If you ignore it, the offer lapses. Retype your first and last name exactly as in your passport.</li>
<li><strong>Wait for final acceptance.</strong> Minhati shows only a preliminary acceptance, which is conditional. Final acceptance appears on Study in Saudi, which is the official record and the only stage that leads to a visa.</li>
<li><strong>Fill in the visa application</strong> when the portal asks. You must be outside Saudi Arabia when you submit it, or it is rejected.</li>
<li><strong>Pay the educational visa fee</strong> through the link that is sent to you.</li>
<li><strong>Give your fingerprints</strong> through the Ministry of Foreign Affairs' <strong>Saudi Visa Bio</strong> app, or at an approved visa centre or Saudi embassy if the app does not work for you. Complete any medical tests you are asked for.</li>
<li><strong>Receive the visa.</strong> It appears in your Study in Saudi account and is sent by email. If you used the app for fingerprints, you need no embassy visit.</li>
<li><strong>Request your arrival ticket on Minhati,</strong> with your name exactly as in your passport, and wait for it. Full scholarship students arrive on the University's ticket, so do not buy your own.</li>
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
<h2>What you agree to</h2>
<p>Scholarship students sign a declaration. It commits you to follow Saudi law and the University's rules, to attend regularly and keep up your grades, not to move your sponsorship to anyone other than the University, and to go home when you graduate, withdraw or leave. You cannot stay on in the Kingdom on the scholarship after your studies end.</p>
<h2>Housing and family</h2>
<p><strong>Housing:</strong> full scholarships include free University housing. Partial scholarships include no free housing, and paid rooms in Unit 13 are offered when places are free. See <a href="/ask/is-housing-included">Is housing included?</a> and check the support shown on your offer. <strong>Family:</strong> family residency (istiqdam) through the University has been closed since 2025, so plan to come alone at first. See <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</p>
<blockquote><p>Tip: Questions about your own application? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "new-student-steps",
    stage: "getting-started",
    title: "First steps for new students: SIM, Absher, Visitor ID, student card and bank account",
    summary: "What to do after you arrive, in order: a Saudi SIM, Absher and the kiosk, Nafath, your Visitor ID, your National Address, a bank account, orientation, your stipend card and student card, then your University accounts and Etimad.",
    bodyHtml: `
<p>Checked 9 November 2026. New students on the educational visa do these steps in this order, because each one needs the one before it. By the end you will have a Saudi number, an active Absher and Nafath, your Visitor ID, a bank account, your stipend card, your student card and your University accounts.</p>
<h2>Before you start</h2>
<ul>
<li>Keep your passport with you, and find your <strong>border number</strong> (رقم الحدود), the number linked to your visa when you first entered the Kingdom.</li>
<li>Have an email address you can open on your phone.</li>
<li>Bring enough money for your first two months. No stipend is paid in your first month.</li>
</ul>
<h2>The steps</h2>
<ol>
<li><strong>Get a Saudi SIM.</strong> At any mobile operator's branch, show your passport and visa or border number. The shop checks your fingerprint and registers the line in your name. Every code that follows comes to this number.</li>
<li><strong>Register on Absher</strong> (أبشر) as a new user, with your border number, your email and your new mobile number.</li>
<li><strong>Activate Absher at a self-service kiosk.</strong> Kiosks are in Jawazat (Passports) offices, at the University, at airports and in some malls. Enter your border number and register your fingerprint.</li>
<li><strong>Activate Nafath</strong> (نفاذ) in the Nafath app: open the settings, choose to activate your national digital identity, and complete your details and the face check.</li>
<li><strong>Issue your Visitor ID</strong> (هوية زائر) in Absher: choose <strong>Issue visitor ID</strong> and complete the details. It is digital only, it shows in the Absher app, and it cannot be printed.</li>
<li><strong>Register your National Address</strong> with Saudi Post. Your bank needs it. See <a href="/ask/short-address">What is a short address?</a></li>
<li><strong>Open a bank account.</strong> Either go to a branch with your passport and show your Visitor ID in the Absher app, or open the account online and confirm your identity through Nafath. The account number arrives by text message, and the mada card is collected at the branch or posted to you. This is the account you move your stipend into from the University card. See <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
<li><strong>Attend orientation.</strong> New students have an orientation meeting in the first week, announced on the University's X account. It explains how your first weeks work, so do not miss it.</li>
<li><strong>Collect your stipend card.</strong> Your stipend is paid onto a University stipend card (an Al Rajhi Bank card), not into your own account. New students receive it after orientation, and cards are issued and renewed at the card office in Unit 22. Your first stipend comes in your second month, as a double payment. See <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a> and <a href="/guides/getting-your-stipend-off-the-university-card">Getting your stipend off the University card</a>.</li>
<li><strong>Get your student card.</strong> Your University ID is digital, in the Tawakkalna app. A printed card is optional: take a 4x6 photo and your ID to the Comprehensive Services Office on the ground floor of Unit 22, 8:00 am to 2:00 pm on working days.</li>
<li><strong>Sign in to your University accounts</strong> at sso.iu.edu.sa, through Nafath or with your University number, password and a code. This opens your University email, the Academic System, Blackboard and Tawasul. Your timetable is under Electronic Registration, then Registered Courses. In the timetable, day 1 is Sunday and day 5 is Thursday.</li>
<li><strong>Check your ID number is on your University record.</strong> Without your Visitor ID or iqama number in the Academic System, the Travel Administration cannot issue your tickets or visas. Sign in to the University website and open Academic Services (الخدمات الأكاديمية), then Academic Information (المعلومات الأكاديمية), and look under ID number (رقم الهوية). If it is empty, go to the Travel Administration (إدارة السفر) with your passport and Visitor ID.</li>
<li><strong>Set up Etimad</strong> for your University tickets, with your name exactly as in your passport. See <a href="/guides/etimad-account">Your University ticket: Etimad, the travel order and the rules</a>.</li>
</ol>
<blockquote><p>Note: If Absher or Nafath activation keeps failing, call Absher customer care on <strong>920020405</strong> (24 hours), choose English, enter your border number and ask for a technical support ticket. See <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>.</p></blockquote>
<h2>If you hold an iqama</h2>
<p>Students from earlier intakes who hold an iqama follow the same order, with two differences: Absher, Nafath and the SIM use your iqama number, and there is no Visitor ID to issue. Banks also let iqama holders open an account in the bank's app.</p>
<h2>What comes next</h2>
<ul>
<li>What a Visitor ID can and cannot do, and what to do before it expires: <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</li>
<li>Meals, buses, the Medical Center and the library: <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</li>
<li>Which office handles what: <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</li>
<li>The rest of your first month: <a href="/guides/first-30-days-in-madinah">Your first 30 days in Madinah</a>.</li>
</ul>
<blockquote><p>Tip: Stuck on a step? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "tajeel-and-itithaar",
    stage: "study",
    title: "Taking a semester off: ta'jeel and i'tithaar",
    summary: "How to postpone a semester (ta'jeel) or be excused from one (i'tithaar), the limits, what each does to your stipend, room, visa and study period, handing back your room from abroad, the 60-day rule, the 1448 windows, coming back after a closed file, and how to apply.",
    bodyHtml: `
<p>Checked November 2026. Ta'jeel and i'tithaar both take you out of a semester, but they work differently and they share one limit. Read this before you apply, and speak to your college or the Ma'had first.</p>
<h2>Ta'jeel and i'tithaar in short</h2>
<table><thead><tr><th>Topic</th><th>Ta'jeel (تأجيل)</th><th>I'tithaar (اعتذار)</th></tr></thead><tbody>
<tr><td>What it is</td><td>Postponing a semester before it starts</td><td>An excuse from a semester you have already started</td></tr>
<tr><td>When</td><td>The deferral window just before the semester</td><td>After the deferral window, during the semester</td></tr>
<tr><td>Approval</td><td>Your college must approve it</td><td>Your college must approve it</td></tr>
<tr><td>Your courses</td><td>You are not registered that semester</td><td>You are withdrawn from all that semester's courses with a W grade, which is not a fail</td></tr>
<tr><td>Maximum study period</td><td>Not counted, so your deadline moves back</td><td>Counted, so your deadline stays where it was</td></tr>
<tr><td>Stipend (mukafa'ah)</td><td>Stops</td><td>Stops</td></tr>
<tr><td>Room in the halls</td><td>Hand it back first: the request is not approved until you do</td><td>Hand it back and move out as soon as your status changes</td></tr>
<tr><td>Visa (iqama, one semester)</td><td>Exit and re-entry: you leave the Kingdom and return a week before the next semester</td><td>Exit and re-entry: you leave the Kingdom and return a week before the next semester</td></tr>
</tbody></table>
<h2>The limits</h2>
<ul>
<li>Ta'jeel and i'tithaar added together cannot be more than <strong>three semesters</strong> over your whole programme.</li>
<li>In your <strong>first year</strong> neither is allowed except for compelling reasons. In the first year you also cannot withdraw from single courses or transfer to another college.</li>
<li>Because i'tithaar counts towards your maximum study period, you have to fit the missed courses into later semesters. If you run out of time, you risk not getting your degree.</li>
<li>To leave a single course rather than the whole semester, see <a href="/guides/exams-results-and-attendance">Exams, results and attendance</a>.</li>
</ul>
<h2>The 1448 windows</h2>
<table><thead><tr><th>Semester 2, 1448</th><th>Dates</th></tr></thead><tbody>
<tr><td>Ta'jeel (deferral)</td><td>13 to 19 December 2026</td></tr>
<tr><td>I'tithaar (excuse from the semester) and withdrawing from a course</td><td>20 December 2026 to 13 March 2027</td></tr>
<tr><td>Re-enrolment requests for the next semester, after a closed file or a semester off</td><td>24 January to 11 April 2027</td></tr>
</tbody></table>
<p>The windows for every semester are in <a href="/guides/university-calendar-1448">The University calendar</a>, and the Academic System is the live record if a window is extended. Outside a window the screen says no movement can be entered in this period (لا يمكن إدخال اي حركة في هذه الفترة). Miss the ta'jeel window and only i'tithaar is left.</p>
<h2>How to apply in the Academic System</h2>
<p>The steps are the same for both. Use a computer if you can.</p>
<ol>
<li>Sign in to the University system and open the <strong>Academic System</strong>.</li>
<li>Under <strong>أكاديمي</strong> (Academic), choose <strong>ادخال حركات اكاديمية</strong> (Enter academic movements), then <strong>ادخال حركات أكاديمية جديدة</strong>.</li>
<li>Read the conditions on the screen, including the visa and housing rules below, and tap <strong>أوافق</strong> (I agree).</li>
<li>Set <strong>نوع الحركة</strong> (type) to <strong>تأجيل</strong> for ta'jeel, or <strong>الاعتذار</strong> for i'tithaar, which appears once the ta'jeel window has closed. Do not choose <strong>إنسحاب</strong>: that withdraws you from the University.</li>
<li>Choose the semesters. For one semester, set both <strong>من بداية الفصل</strong> and <strong>إلى نهاية الفصل</strong> to the same semester. For two, set <strong>إلى نهاية الفصل</strong> to the second one.</li>
<li>Choose your reason (<strong>السبب</strong>). Add notes under <strong>ملاحظات</strong> and supporting PDFs under <strong>مرفقات</strong>, such as a medical report. Tap <strong>التالي</strong> (next).</li>
<li>Check the summary and tap <strong>حفظ</strong> (save), then <strong>انهاء</strong> (finish).</li>
<li>If you live in the halls, hand back your room now (see below). See the wakeel of your college or the Ma'had, who handles student affairs, in case there are more forms to complete.</li>
</ol>
<p><strong>Checking your request:</strong> repeat steps 1 and 2, but choose <strong>إظهار الحركات الأكاديمية</strong> (Show academic movements). Once it is approved, your status (<strong>الوضع العام</strong>) changes from <strong>منتظم</strong> (regular) to <strong>مؤجل</strong> (postponed). Past requests stay under <strong>حركات أكاديمية سابقة</strong> (Previous academic movements). If a request sits unanswered for days, follow it up with the wakeel of your college. The other screens of the Academic System are in <a href="/guides/university-student-system">Using the University's student system</a>.</p>
<h2>What happens after you apply</h2>
<ul>
<li>Your request takes effect only when your status changes. Until then you are still a regular student, so <strong>keep attending your classes</strong>. Absences in the meantime count against you.</li>
<li>Once your status changes, leave your room in the University halls straight away.</li>
<li>Your stipend stops for the semester you are out.</li>
</ul>
<h2>Your room in the halls</h2>
<p>A ta'jeel request is not approved until the housing office shows no room in your name. After an i'tithaar, you hand the room back as soon as your status changes. Belongings left in the halls after the Deanship's deadline are removed at your own risk.</p>
<ol>
<li>Empty the room. Everything the University provided stays: the mattress, the bed, the wardrobe, the desk and the chair.</li>
<li>Get the handover form from the housing office in Unit 22, or at the Deanship of Student Affairs.</li>
<li>Your building's mushrif (supervisor) checks the room is empty, takes the key and signs the form.</li>
<li>Take the signed form back to the housing office, which records the room as returned.</li>
</ol>
<h3>If you are already abroad</h3>
<p>Authorise a fellow student to hand back the room for you.</p>
<ol>
<li>In Tawasul at <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a>, tap <strong>New request</strong> (طلب جديد) and choose <strong>Housing Administration</strong> (إدارة الإسكان). Use a subject such as "Authorisation to hand back my room".</li>
<li>Write: "I, student [your full name], University number [your number], authorise student [his full name], University number [his number], to hand back my room: Unit [..], floor [..], room [..], bed [..]." Send it.</li>
<li>Your friend prints the request, takes it to the housing office in Unit 22, and collects the handover form.</li>
<li>He empties the room, the mushrif checks it and signs, and he takes the form back to the housing office.</li>
<li>Once the system shows no room in your name, your ta'jeel can be approved.</li>
</ol>
<h2>Travel and your visa</h2>
<p>These rules are for international students on a full scholarship. They are set out on the application screen, and you agree to them when you apply.</p>
<h3>If you hold an iqama</h3>
<table><thead><tr><th>Your request</th><th>Visa you receive</th><th>What you must do</th></tr></thead><tbody>
<tr><td>Ta'jeel or i'tithaar for one semester</td><td>Exit and re-entry visa</td><td>Leave the halls and the Kingdom once your status changes, and come back one week before the next semester starts</td></tr>
<tr><td>Ta'jeel or i'tithaar for more than one semester, or withdrawal from the University</td><td>Final exit visa</td><td>Complete your clearance (إخلاء طرف) and leave the Kingdom within two weeks of your status changing</td></tr>
<tr><td>Coming back to study after a final exit (re-enrolment, إعادة الانتظام)</td><td>A new study visa</td><td>Apply for it as the Deanship of Admission and Registration announces. You cannot return to study on any other kind of visa</td></tr>
</tbody></table>
<p><strong>The 60-day rule.</strong> If your exit and re-entry visa runs out while you are abroad on ta'jeel or i'tithaar, send a Tawasul request to Travel Management (إدارة السفر) to extend it, within 60 days of the day it expired. Ask someone in Madinah to pay the fee and finish the paperwork for you. Do it by day 59 at the latest. After 60 days your status becomes exited and did not return (خرج ولم يعد): the visa can no longer be extended, and you apply for a new study visa the way new students do.</p>
<h3>If you hold a Visitor ID</h3>
<p>Before you leave, ask the University through Tawasul what your status means for your visa, and check its expiry date in Absher. See <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>
<h3>Getting a new visa to come back</h3>
<p>Returning ta'jeel and i'tithaar students whose status has become exited and did not return, and students whose file was closed, request a new study visa on the <a href="https://minhatee2.iu.edu.sa/Home/VisaLanding">Minhati visa page</a>, signing in with their University number. The Deanship of Admission and Registration announces when it opens each semester, and the letter you need for the application is on the University website. From there it is the same process as for new students, through the Saudi embassy in your country.</p>
<p>Flights during a semester off are at your own cost. The University's ticket is the yearly one home.</p>
<h2>Coming back after a closed file</h2>
<p>Missing 20 days in a row without ta'jeel or i'tithaar closes your file (مطوي القيد). A closed file can be reopened only once, within four semesters.</p>
<ol>
<li>Within the re-enrolment window, open the Academic System, then <strong>أكاديمي</strong>, <strong>ادخال حركات اكاديمية</strong>, <strong>ادخال حركة أكاديمية جديدة</strong>, and tap <strong>أوافق</strong>.</li>
<li>Set <strong>نوع الحركة</strong> to <strong>اعادة قيد</strong> (re-enrolment), choose the reason that fits, attach your excuse, tap <strong>التالي</strong> and send.</li>
<li>If you are outside the Kingdom, request your new visa on Minhati as above once you are accepted.</li>
</ol>
<h2>Questions</h2>
<p><strong>Can I apply from abroad?</strong> Yes, the request is online. Authorise a fellow student to hand back your room, as above, and watch the 60-day rule if your visa runs out.</p>
<p><strong>Can I cancel a request?</strong> Ask your college or the Ma'had straight away, as they may need to put you back into your classes.</p>
<blockquote><p>Tip: Not sure which one fits your case? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "graduate-procedures",
    stage: "leaving",
    title: "Leaving Madinah for good: graduation, final exit, shipping, selling up and closing accounts",
    summary: "Everything to do when you leave for good, in order and on a timeline: your certificate and room, clearance and final exit on an iqama or a Visitor ID, the University ticket, shipping your books, selling the furniture and the car, the bank account, SIMs, your flat's deposit and bills, and the children's school papers.",
    bodyHtml: `
<p>Checked November 2026. Leaving Madinah for good is more than handing back a room. It is also the final exit, your University ticket, the books you want to keep, the furniture you cannot take, your bank account, your SIM, your flat and its deposit, and your children's school papers. This guide puts all of it in one place, in the order it needs doing. Graduates start at the top. If you are leaving for another reason, or you are a family who never studied, skip the University steps and start at <strong>Leaving the Kingdom</strong>.</p>
<h2>Your leaving timeline</h2>
<table><thead><tr><th>When</th><th>What to do</th></tr></thead><tbody>
<tr><td>Three months before</td><td>Check the name on your certificate. Tell your landlord. Ask the children's school for their leaving papers. Start selling the big things and shipping the first boxes of books.</td></tr>
<tr><td>One month before</td><td>Pay every fine. Sell or transfer the car. Decide what travels with you, what ships and what goes. Print your University documents.</td></tr>
<tr><td>Two weeks before</td><td>Hand back your room or flat, collect your deposit, settle electricity and water, collect your degree, legalise your documents.</td></tr>
<tr><td>Last days</td><td>Clearance confirmed, ticket issued, final exit issued, bank account emptied and closed, spare SIMs cancelled, last photos taken.</td></tr>
<tr><td>After you land</td><td>Keep your Saudi number alive for codes until every account is closed. Check your degree verifies online.</td></tr>
</tbody></table>
<h2>1. Check the details on your certificate</h2>
<p>Your degree certificate is printed with your name and details exactly as they are in the University's records. Check them in the Academic System during your final semester, under <strong>Graduation procedures</strong> (اجراءات التخرج), and correct any difference from your passport before printing. Adding a missing Arabic name after the document is issued means paying for a replacement. See <a href="/ask/graduation-certificate-name-check">How do I make sure my name is right on my degree certificate?</a></p>
<p>After your final results are approved, your status in the Academic System changes from <strong>Regular</strong> (منتظم) to <strong>Graduate</strong> (متخرج). Your clearance and the collection of your certificate both wait for that change, which can take some weeks after the finals.</p>
<h2>2. Download and print your documents</h2>
<p>In the Academic System, open <strong>Personal</strong>, then <strong>Official Documents</strong> (المستندات الرسمية), and download:</p>
<ul>
<li>your <strong>academic transcript</strong> (السجل الأكاديمي)</li>
<li>your <strong>conduct certificate</strong> (إفادة سلوك)</li>
<li>your <strong>graduation certificate</strong> (إفادة تخرج)</li>
</ul>
<p>Print one colour copy and two black and white copies of each, and keep copies of your passport, your student card and your Visitor ID or iqama. Having them ready saves extra trips.</p>
<blockquote><p>Tip: If nothing downloads, allow pop-ups for the site in your browser settings and try again in Chrome on a computer.</p></blockquote>
<h2>3. Hand back your room (taslim sakan)</h2>
<p>The housing office of the Deanship of Student Affairs handles the handover.</p>
<ol>
<li><strong>Get the handover form</strong> (istimarah) from the housing office. Say you are graduating and want to hand back your room, and give your University number.</li>
<li><strong>Clean the room</strong> and check the furniture. Five items must all be there: the mattress, the bed frame, the wardrobe, the desk and the chair. Nothing can be missing or swapped, and any missing or swapped item is charged to you. A carpet is the only thing you can leave behind.</li>
<li><strong>Arrange the inspection</strong> with your building's mushrif (supervisor), at his office or by phone. He checks the room, takes the key and signs the form. <strong>Keep the original form.</strong></li>
<li><strong>Go back to the housing office</strong> the next working morning for the final clearance. The system then shows your room as returned.</li>
</ol>
<p>The University sets a date by which graduates must empty their rooms. In 2026 it was 27 June, about five weeks after the final exams. Anything left after that date is removed at your own risk, so plan your handover, your visa and your ticket around it.</p>
<p>Your blanket and bedsheets are yours to take home. Anything else you bought for the room, from a kettle to a bookshelf, goes with you, to a friend or to the market: see <strong>Your things</strong> below.</p>
<h2>4. Return your student card and clear your file</h2>
<p>Hand in the signed room form at the housing office, and return your student card at the student card office. Keep a copy or a PDF of the card first. Then complete the clearance (إخلاء طرف) in the Academic System, under <strong>Academic</strong>, then <strong>Clearance</strong>. It opens once your status shows Graduate, and lists each office that must sign you off. Travel Management (إدارة السفر) then confirms your clearance in the University's records, and your ticket and, with an iqama, your final exit follow from that. Nothing is issued before the clearance shows.</p>
<h2>5. Collect your degree and the University stamp</h2>
<p>Once your status shows Graduate, book a collection appointment at <a href="https://services.iu.edu.sa/Appointment">services.iu.edu.sa/Appointment</a>, signing in with your University number. Collect your certificate from the Deanship of Admission and Registration at your appointment, and sign for it. If you cannot be there, fill in the Deanship's official form for authorising someone to collect it for you, send it through Tawasul first, and give a printed copy to the person collecting. See <a href="/ask/degree-collection-and-verification">Can someone else collect my degree certificate?</a></p>
<p>Then ask for the University stamp on the black and white copies of your transcript, conduct certificate and graduation certificate, and on a copy of your degree. The Ministry of Foreign Affairs legalises only documents that already carry the University stamp.</p>
<h2>6. Legalise your documents: the Ministry, then your embassy</h2>
<p>Most embassies will not legalise a Saudi degree until the Ministry of Foreign Affairs has. The documents usually legalised are the degree, the Ma'had certificate, the transcript, the conduct certificate and the graduation certificate.</p>
<ol>
<li>Open the Ministry's ratification service at <a href="https://ratification.mofa.gov.sa/">ratification.mofa.gov.sa</a> and sign in through Nafath.</li>
<li>Start a new request and enter each document.</li>
<li>Pay the fee for each document online, and book an appointment at the Ministry's branch in Madinah.</li>
<li>Go to the branch at your appointment with the payment receipt and the stamped copies.</li>
</ol>
<blockquote><p>Tip: Pay straight after booking. An unpaid appointment is cancelled.</p></blockquote>
<p>Saudi Post also carries documents to the Ministry of Foreign Affairs and brings them back legalised, for a fee, so you can skip the branch visit: ask at any Saudi Post branch.</p>
<p><strong>Apostille or embassy?</strong> Saudi Arabia has been part of the Hague Apostille Convention since December 2022. If your own country is also a member (most of Europe, the UK, the US, Australia, India, Pakistan, Indonesia, Malaysia and South Africa are), an apostille from the Ministry of Foreign Affairs is all your documents need and your embassy has no part to play. Ask for the apostille, not the legalisation stamp, when you file the request.</p>
<p>If your country is not a member, it can also want the documents legalised by its embassy in Riyadh or its consulate in Jeddah. Requirements differ from country to country, so read your embassy's website first. Take the documents legalised by the Ministry of Foreign Affairs and copies of your passport, student card and Visitor ID or iqama, and register online beforehand if your embassy asks you to. Do this before your clearance and ticket, because once your final exit is issued your time in the Kingdom is short.</p>
<h2>7. The graduation allowance, bisht and gifts</h2>
<ul>
<li><strong>Graduation allowance:</strong> full (external) scholarship students receive a graduation allowance of three months' stipend, for shipping their books home, once the University has confirmed their clearance. It lands in the same account as your stipend, so keep that account open until it arrives. See <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</li>
<li><strong>The ceremony:</strong> the University holds one graduation ceremony a year, near the end of the second semester (on 27 April in 2026). Graduates collect the bisht, the sash and the invitation cards beforehand from the Deanship of Admission and Registration, ground floor, on the days the University announces. Each graduate receives two invitation cards for family. Students who finish between semesters attend the next ceremony.</li>
<li><strong>Bisht and gifts:</strong> bachelor's, master's and PhD graduates are given a graduation bisht (mishlah) and gifts such as books. If you have already gone home, someone can collect them for you: send a request through Tawasul with your name, student card number and graduation date, and the full name and student card number of the person collecting.</li>
</ul>
<h2>8. Leaving the Kingdom: final exit on an iqama, or on a Visitor ID</h2>
<p>How you leave depends on what you hold.</p>
<table><thead><tr><th>Topic</th><th>Iqama</th><th>Visitor ID (educational visa)</th></tr></thead><tbody>
<tr><td><strong>What is issued</strong></td><td>A final exit visa (خروج نهائي). It is free, it is valid for 60 days from the day it is issued, it needs at least 30 days left on your iqama, and it cancels the iqama when you cross the border</td><td>Nothing to issue. Your educational visa ends when you leave, so you must leave before it expires</td></tr>
<tr><td><strong>Who issues it</strong></td><td>Travel Management, as your sponsor, once your clearance shows. Send a request through Tawasul if it has not moved a week after your clearance</td><td>Ask Travel Management through Tawasul what clearance it needs from you, then book</td></tr>
<tr><td><strong>Your family</strong></td><td>You issue your dependants' final exit yourself in Absher: Services, then Passports, then Visa services, then Final exit visa. Their iqamas must be valid and their fines paid</td><td>Family on visit visas leave with you or before their own visas expire</td></tr>
<tr><td><strong>What blocks it</strong></td><td colspan="2">Unpaid traffic fines, a car still registered in your name, a dependant with an unpaid fine or an expired iqama, and a passport close to expiry. Clear all of these first</td></tr>
<tr><td><strong>Coming back</strong></td><td colspan="2">Your scholarship ends when you graduate and you agreed on admission to go home. You can return later on a new visa of your own, for example an Umrah or tourist visa, and students admitted to graduate studies arrive on a new educational visa</td></tr>
</tbody></table>
<blockquote><p>Note: The 60 days start on the day the visa is issued, not the day you choose to fly. Do not let it be issued before your ticket date is fixed and your bank, flat and car are settled. A fine recorded after the visa is issued can still stop you at the airport, so check Absher once more the day before.</p></blockquote>
<h2>9. Your ticket home</h2>
<ol>
<li>Finish everything above first, including the embassy, before you book.</li>
<li>Make sure the University has confirmed your clearance. Graduates' tickets are issued only after that.</li>
<li>Your final ticket is issued against a travel order on Etimad, to one of the cities the University sets for your country. Check that your name on Etimad matches your passport letter for letter.</li>
<li>Tell the ticket unit the date you can really travel. A date change later costs you the fare difference, and a no-show loses the ticket.</li>
<li>You can upgrade the class of travel at your own cost. Your family's tickets are at your own cost.</li>
</ol>
<p>The ticket rules (validity, date changes, no refunds and baggage) are in <a href="/guides/etimad-account">Your University ticket: Etimad, the travel order and the rules</a>.</p>
<h2>10. Your bank account</h2>
<p>Banks close the accounts of expatriates on final exit, and an account on a Visitor ID is frozen when the ID expires. So the money must move before you leave, not after.</p>
<ol>
<li><strong>Wait for the last payments:</strong> your final stipend and the graduation allowance go to this account. Check the Rewards screen in the Academic System for the amounts.</li>
<li><strong>Send the balance home</strong> while your Saudi number and Absher still work, because transfers need the codes sent to your phone. Compare the final amount your family receives, not the headline rate: see <a href="/ask/send-money-home">How do I send money home from Madinah?</a></li>
<li><strong>Cancel what charges the account:</strong> subscriptions, a car instalment, the internet contract, any standing order.</li>
<li><strong>Close the account at a branch</strong> and ask for a closure letter. Keep it with your papers.</li>
</ol>
<blockquote><p>Tip: Leave nothing of value in the account. Getting money out of a Saudi account from abroad takes a representative, paperwork and weeks.</p></blockquote>
<h2>11. Your phone and SIMs</h2>
<ol>
<li><strong>See every line registered to you</strong> in Mutasil or the CST app, and cancel the ones you do not need with their operator. A forgotten line stays on your record. Steps are in <a href="/guides/phone-sims-and-absher">Your phone number, SIM checks and Absher</a>.</li>
<li><strong>Do not count on a Saudi number after you leave.</strong> Operators treat a final departure as grounds to cancel a line, and a cancelled number loses its balance and goes to someone else. Finish everything that needs a code first: the bank transfers, the final exit printout, your Absher records. If you keep one line, keep it topped up and on roaming, and move your bank to app-based approval before you go if your bank offers it.</li>
<li><strong>Save what lives on the number:</strong> export your WhatsApp chats and tell your groups your new number before the Saudi one dies.</li>
</ol>
<h2>12. Your flat: handover, deposit, electricity and water</h2>
<p>If you rented in the city, your contract decides the notice you must give. Most are for a year, and an early exit needs the landlord's agreement, so tell the landlord in writing as early as you can.</p>
<ol>
<li><strong>Give notice</strong> in the way your contract says. An Ejar contract that renews by itself needs 60 days' written notice. Leaving before the end date needs both sides to agree: either of you starts the termination in Ejar and the other approves it, and many contracts charge one or two months' rent for an early exit, so read that clause first.</li>
<li><strong>Take dated photos</strong> of every room on the day you hand over, with the meters in shot.</li>
<li><strong>Sign the handover</strong> with the landlord or agent, and fill in the move-out form in Ejar within seven days of the end date. Your deposit, which Ejar holds in its own account, is released when both sides sign. Only documented damage you caused can be deducted, not ordinary wear.</li>
<li><strong>Settle electricity:</strong> pay the last bill in the Saudi Energy app and remove yourself from the meter under Account management, so later bills go to the owner.</li>
<li><strong>Settle water:</strong> pay the last bill in the National Water Company app. A rented property's meter goes back to the owner's name when the contract ends.</li>
<li><strong>Return the router</strong> and end the home internet contract with the operator, or the monthly charge continues.</li>
</ol>
<p>If anything is withheld without a reason, open a rental dispute from your Ejar dashboard, or call Ejar on 199011. Nothing in Ejar depends on the landlord's goodwill when the contract and the move-out form are filled in properly. See <a href="/guides/finding-an-apartment">Finding and renting a flat</a>.</p>
<h2>13. Your things: sell, give, ship</h2>
<p>Decide early, because the last week is for paperwork, not for selling a fridge.</p>
<h3>Sell or give away</h3>
<ul>
<li><strong>Where to sell:</strong> Haraj (it takes 1% from the seller on sales made through the site), the notice boards and group chats of the halls and your college, and the second-hand furniture shops at the end of Imam Bukhari Street, which buy as well as sell. New students arrive every August and want exactly what you are selling. Take payment by a transfer you see arrive before the item leaves the flat.</li>
<li><strong>Price it to go.</strong> As of late 2026, a used sofa set or washing machine goes for a few hundred riyals, a single mattress for under a hundred, and buyers expect to collect. A pickup van, flagged down on the road or booked by phone, carries a mattress or a fridge across the city for a few tens of riyals.</li>
<li><strong>Give the rest away.</strong> Charities in Madinah collect usable furniture and appliances, and a new student in your hall will be glad of your desk lamp.</li>
</ul>
<h3>Your car</h3>
<p>A car registered in your name blocks your final exit, so sell it or transfer it first.</p>
<ol>
<li>Pay every fine on the car and on you, and keep the registration (istimara) and the periodic inspection valid.</li>
<li>Start the sale in Absher under Vehicle services, entering the buyer's ID number and date of birth, the price and your bank account.</li>
<li>The buyer insures the car in his own name, accepts the sale in his Absher and pays. As of November 2026 the transfer carries a government fee of 150 SAR and an Absher fee of 230 SAR, paid by the buyer.</li>
<li>Hand over the car, the buyer confirms delivery in Absher, and the car leaves your name. Check it is gone from your vehicles list before you ask for final exit.</li>
</ol>
<h3>Ship your books</h3>
<p>Books are the heaviest thing a student owns, and the graduation allowance exists for exactly this. Compare these ways, and weigh your boxes before you choose.</p>
<table><thead><tr><th>Way</th><th>Good for</th><th>What to know</th></tr></thead><tbody>
<tr><td>Your checked baggage</td><td>Up to two bags on the University ticket</td><td>Often the cheapest for the first 40 to 50 kg. The airlines flying from Madinah allow about 23 kg a bag in economy on most fares, a bag between 23 and 32 kg pays an excess fee per piece or per kilo, and nothing heavier than 32 kg goes in the hold. Buy an extra bag from the airline online before the flight, not at the counter</td></tr>
<tr><td>SPL (Saudi Post)</td><td>Boxes up to 30 kg</td><td>Economy is delivered to the post office nearest the receiver, Express and Sea Freight to the door. Priced by weight and country in SPL's price calculator. As of 2025 a 30 kg express parcel costs from under 300 SAR to South Asia to about 750 SAR to Europe and North America. Customer service 19992</td></tr>
<tr><td>Courier companies</td><td>Faster, tracked, any weight</td><td>Aramex, DHL, FedEx, SMSA and UPS all ship from Madinah. Ask each for a quote by weight, and ask about a books or student rate</td></tr>
<tr><td>Sea cargo</td><td>Many boxes to Africa or Asia</td><td>Cargo offices in the city ship by the box or the cubic metre. Slow, but far cheaper per kilo for a whole library</td></tr>
</tbody></table>
<p>Pack books in small double-walled boxes of 20 to 25 kg, because a 30 kg box of books splits and hurts whoever carries it. Put the heaviest flat at the bottom, fill gaps with clothes, tape every seam, and write your name, phone and destination on two sides and inside the lid. Carriers charge the greater of the real weight and the volumetric weight (length by width by height in centimetres, divided by 5,000), so a half-empty big box costs as much as a full one. List the contents of each box with an honest value: it goes on the customs form and it is your claim if a box is lost. Printed books carry no customs duty in most countries, including the UK and the US, and the campus has a travel and shipping office that quotes for students. Addresses, customs and every carrier are in <a href="/guides/shipping-and-receiving-parcels">Shipping and receiving parcels in Madinah</a>.</p>
<h2>14. Your children's school papers</h2>
<ol>
<li>Ask the school for a transfer certificate and the report cards of every year, and settle any fees first, because schools release papers only to a clear account.</li>
<li>If the next school is in another country, ask it exactly which stamps it needs. Attestation of school papers by the Ministry of Education takes about a month, so start three months before you leave.</li>
<li>Download the children's vaccination record from Sehhaty and ask the clinic for any medical records you want to keep.</li>
</ol>
<h2>Your last week</h2>
<ol>
<li>Clearance confirmed in the University's records, and the final exit issued (iqama) or Travel Management's clearance done (Visitor ID).</li>
<li>Ticket in hand, name matching the passport.</li>
<li>Bank account emptied and closed, closure letter kept.</li>
<li>Flat handed over, deposit back, electricity and water paid, router returned.</li>
<li>Car out of your name, fines at zero in Absher.</li>
<li>Spare SIMs cancelled, one line kept alive.</li>
<li>Degree, transcript, legalised copies, the room form and the closure letter all in your hand luggage, with photos of each on your phone.</li>
<li>Boxes shipped, receipts saved.</li>
</ol>
<h2>After you leave</h2>
<ul>
<li>Scholarship students agree when they are admitted to go home on graduating. You cannot stay on in the Kingdom on the scholarship after your studies end.</li>
<li>Employers and other universities can check your degree on the University's graduation document verification service. See <a href="/ask/degree-collection-and-verification">Can someone else collect my degree certificate, and how can an employer check it?</a></li>
<li>Your Absher account stays yours. Keep its password and the phone number it uses, because you need it if you ever return.</li>
<li>Visit your teachers before the last week, ask those who taught you for a tazkiyah (a letter of recommendation), and keep the contact details of your mashayikh, your college office and your friends. The du'a of a student for his shaykh, and of a shaykh for his student, does not stop at the border.</li>
<li>Make a last visit to the Prophet's Mosque with time to spare, give salam at the grave, pray in Quba, and visit al-Baqi'.</li>
</ul>
<p>May Allah grant success to every graduate.</p>
<blockquote><p>Tip: Stuck on a step? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "sisters-studying-in-madinah",
    stage: "family",
    title: "Where sisters can study Arabic and Islamic sciences in Madinah",
    summary: "The in-person options for sisters, listed alphabetically: the women's marakiz for Arabic, Qur'an and Shariah, and the Masjid an-Nabawi Ma'had and Kulliyah, with who each is for, what it teaches and how to apply.",
    bodyHtml: `
<p>Checked 9 November 2026. Madinah has several places where sisters study Arabic, the Qur'an and the Islamic sciences in person. They are listed here alphabetically. Teaching is in Arabic, and most classes are in the morning. Contact each place for the start of the next term before you plan around it.</p>
<h2>At a glance</h2>
<table><thead><tr><th>Where</th><th>What it teaches</th><th>Length</th><th>Nursery</th></tr></thead><tbody>
<tr><td>Academiyah al-Ma'rifah</td><td>Arabic for non-Arabic speakers, Shariah and Qur'an</td><td>Arabic 2 years, Shariah 1 year</td><td>Yes</td></tr>
<tr><td>Dar at-Tawheed wa as-Sunnah</td><td>Qur'an, tajweed, Arabic and the mutun</td><td>Ongoing classes</td><td>Yes, ages 1 to 3, and a kindergarten for 4 to 6</td></tr>
<tr><td>Markaz Mishkat</td><td>Arabic and Islamic studies</td><td>2 years</td><td>Yes</td></tr>
<tr><td>Markaz Taibah</td><td>Arabic in 4 levels, with Qur'an and Islamic studies</td><td>2 years</td><td>Yes</td></tr>
<tr><td>Masjid an-Nabawi Ma'had</td><td>The classical texts, intermediate and secondary stages</td><td>6 years</td><td>No</td></tr>
<tr><td>Masjid an-Nabawi Kulliyah</td><td>A bachelor's degree in Shariah</td><td>4 years</td><td>No</td></tr>
</tbody></table>
<h2>Academiyah al-Ma'rifah</h2>
<p>Run by the Ma'rifah charitable society in Madinah, for women whose first language is not Arabic. Formerly known as Markaz al-Manar, Markaz Ta'allum and Markaz Nebras.</p>
<ul>
<li><strong>Where:</strong> Al-Iskan, opposite Abdul Latif Al Sheikh Mosque. Phone 014 846 1300.</li>
<li><strong>Arabic programme (2 years):</strong> a foundation level (the alphabet, reading, writing and Qur'an), then four levels on the Madinah books covering grammar, reading, expression and writing. Levels 3 and 4 add aqeedah, hadith, seerah and history. Students memorise Juz 'Amma and Juz Tabarak alongside.</li>
<li><strong>Shariah programme (1 year, 2 levels):</strong> tafseer, hadith, fiqh, aqeedah, the sciences of the Qur'an, grammar, tajweed and usul al-fiqh, then seerah, tarbiyah, mustalah al-hadith and research. It expects good Arabic.</li>
<li><strong>Qur'an programme:</strong> for students with strong Arabic and seven ajza memorised. Taught by male teachers from behind a screen, with a female teacher supervising.</li>
<li><strong>To apply:</strong> your passport with your iqama or visa, and a placement test.</li>
<li><strong>For mothers:</strong> a nursery, and a bus for a fee.</li>
</ul>
<h2>Dar at-Tawheed wa as-Sunnah</h2>
<p>A women's centre in the Suqman district for sisters and girls. Classes began on 1 November 2026.</p>
<ul>
<li><strong>What it teaches:</strong> the Qur'an, tajweed, al-Qa'idah an-Nuraniyyah, the Arabic language and the essential Islamic texts (mutun).</li>
<li><strong>To apply:</strong> in person at the centre between 7:00 and 11:00 in the morning. Places are limited.</li>
<li><strong>For mothers:</strong> a nursery for ages 1 to 3 and a kindergarten for ages 4 to 6.</li>
</ul>
<p>Contact details are on <a href="/programs/dar-tawheed-sunnah">Dar at-Tawheed wa as-Sunnah</a>.</p>
<h2>Markaz Mishkat</h2>
<ul>
<li><strong>Where:</strong> Al-Aridh district. <a href="https://maps.app.goo.gl/1UFgNiPjZ7pS1ybu9">Location on Google Maps</a></li>
<li><strong>Length:</strong> 2 years.</li>
<li><strong>Books:</strong> al-Arabiyyah Bayna Yadayk, with Islamic studies books chosen by the markaz. Qur'an classes cover Juz 'Amma and part of Juz Tabarak.</li>
<li><strong>To apply:</strong> your passport with your iqama or visa. A placement test only if you want to start above the first level.</li>
<li><strong>For mothers:</strong> a nursery.</li>
</ul>
<h2>Markaz Taibah</h2>
<ul>
<li><strong>Where:</strong> Taibah district. <a href="https://maps.app.goo.gl/NPFFeZu8MUvxfnK19">Location on Google Maps</a></li>
<li><strong>Length:</strong> 2 years, in 4 levels.</li>
<li><strong>Books:</strong> al-Arabiyyah Bayna Yadayk, books 1 to 4, with Qur'an and writing at every level. Level 1 adds al-Qa'idah an-Nuraniyyah. Levels 2 to 4 add fiqh, aqeedah, seerah and hadith, levels 3 and 4 add tafseer, and level 4 adds imla'.</li>
<li><strong>To apply:</strong> your passport and your husband's iqama, then a placement test. When a level is full, you start the following semester.</li>
<li><strong>For mothers:</strong> a nursery, and a bus for a fee.</li>
</ul>
<h2>Masjid an-Nabawi Ma'had and Kulliyah</h2>
<p>Free full-time study inside the Haram, in the women's sections of the masjid. Children do not come to class.</p>
<ul>
<li><strong>Ma'had, intermediate stage (3 years):</strong> foundational texts in tajweed, tawheed, tafseer, hadith, fiqh, fara'id, seerah, grammar, imla' and Arabic calligraphy. Students memorise Juz 'Amma.</li>
<li><strong>Ma'had, secondary stage (3 years):</strong> more advanced texts, adding usul at-tafseer, mustalah al-hadith, history and balaghah. Entry needs seven ajza memorised. Each stage ends with a diploma.</li>
<li><strong>Kulliyah (4 years):</strong> a bachelor's degree in Shariah.</li>
</ul>
<h3>Who can apply</h3>
<ul>
<li>Non-Saudis need a valid iqama. A Visitor ID or a visit visa is not enough to register.</li>
<li>Good written and spoken Arabic. The exam and the interview are in Arabic.</li>
<li>Certificates from outside the Kingdom must be made equivalent and attested before you apply.</li>
<li>Dependants need a letter of permission from their sponsor. Kulliyah applicants also bring two letters of recommendation (tazkiyah) from a school or a Qur'an teacher.</li>
</ul>
<h3>When and how to apply</h3>
<p>Registration opens once a year, in Safar, for the Ma'had and the Kulliyah together. For 1448 it ran from 5 to 20 Safar (19 July to 3 August 2026).</p>
<ol>
<li>Apply online on the portal of the General Authority for the Care of the Two Holy Mosques while registration is open, with all your documents in one PDF.</li>
<li>Sit the written exam in person. For 1448 it was on 11 Rabi' al-Awwal (24 August 2026).</li>
<li>Attend the personal interview in person. For 1448 it was on 13 Rabi' al-Awwal (26 August 2026).</li>
<li>Bring the originals and copies of your documents when you are accepted, then start your studies.</li>
</ol>
<p>The full conditions for each level are in <a href="/guides/masjid-an-nabawi-institute-and-college">The Masjid an-Nabawi Institute and College</a> and <a href="/programs/nabawi-women">Masjid an-Nabawi programmes for women</a>.</p>
<h2>Without registering</h2>
<p>The Haram's free Qur'an and mutun halaqat for sisters take registrations online, and the duroos in the masjid are open to everyone. See <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>. For online study and the other routes, see <a href="/ask/sisters-study">Where can sisters study?</a> and <a href="/programs">Study in Madinah</a>.</p>
<blockquote><p>Tip: A question about your own case? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "kids-activities",
    stage: "family",
    title: "Play areas and fun places for children in Madinah",
    summary: "Soft play centres, mall crèches and gardens for young children in Madinah, with the ages each takes and what is there.",
    bodyHtml: `
<p>Checked 9 November 2026. Madinah has indoor soft play centres, crèches in the malls and gardens with rides, which are a good way to spend a hot afternoon with young children. Each section below is in alphabetical order. Entry is paid per child at the desk.</p>
<h2>Soft play centres</h2>
<h3>Kinetic</h3>
<ul>
<li><strong>Ages:</strong> 1 to 13.</li>
<li><strong>What is there:</strong> two floors of play, with an area upstairs for children under three, and a café.</li>
<li><a href="https://maps.app.goo.gl/sjH7sompZUFuZGPL9">Location on Google Maps</a></li>
</ul>
<h3>Peekboo</h3>
<ul>
<li><strong>What is there:</strong> a large indoor play centre with a café, in a building with many restaurants and cafés.</li>
<li><a href="https://maps.app.goo.gl/HHUiSx6Ln8s4DbUq9">Location on Google Maps</a></li>
</ul>
<h3>Poky</h3>
<ul>
<li><strong>Where:</strong> inside Wow 5! (the 5 Riyal Market).</li>
<li><strong>Ages:</strong> 1 to 10.</li>
<li><strong>What is there:</strong> two floors of play, with an area on the top floor for babies and toddlers.</li>
<li><a href="https://maps.app.goo.gl/RFS3ftpoG8AVNn8P9">Location on Google Maps</a></li>
</ul>
<h2>Mall crèches for under fives</h2>
<p>You can leave a child under five in these crèches or stay and play with them.</p>
<ul>
<li><strong>Al Noor Mall:</strong> a slide into a ball pit, a climbing frame and other activities. The mall has a second play area as well: <a href="https://maps.app.goo.gl/1xB4qFEvuGpt1vjA6">location on Google Maps</a>.</li>
<li><strong>Al Rashid Mall:</strong> on the basement floor, near Home Centre. A ball pit, slides, activity tables and role-play corners such as a kitchen. For children under five only.</li>
</ul>
<h2>Gardens and parks</h2>
<p>Gardens such as Reef Al Bustan have bouncy castles and rides such as small trains.</p>
<blockquote><p>Tip: Many mall arcade rides and the large bouncy castles in the gardens are built for children of four and over. Toddlers have their own areas in the soft play centres above.</p></blockquote>
<p>For schools and nurseries, see <a href="/guides/kindergartens-and-schools">Kindergartens and schools</a>. The children's centres at the Haram are in <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>.</p>
<blockquote><p>Tip: Know a place for children we should add? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "graduating-from-mahad",
    stage: "study",
    title: "Moving from the Ma'had to the Kulliyah",
    summary: "The three things to do when you finish the Ma'had: choose your college, get your new University card, and keep your room.",
    bodyHtml: `
<p>Checked 9 November 2026. The Ma'had (the Arabic Language Institute) prepares you for your college and lasts at most two years, depending on the level you are placed in. When you finish it, three things need doing: one before the break and two after it.</p>
<h2>1. Choose your college (before the break)</h2>
<ul>
<li>Near the end of your final Ma'had semester, go to <a href="https://alisc.iu.edu.sa/">alisc.iu.edu.sa</a> and rank your first, second and third choice of college.</li>
<li>The Ma'had announces the deadline. Do not miss it.</li>
<li>Choose carefully. Scholarship students cannot move to another college once they are placed.</li>
</ul>
<blockquote><p>Tip: If the page gives you trouble, sign in to the University system at sso.iu.edu.sa first, then open the link. Use Chrome on a computer, or desktop mode on your phone.</p></blockquote>
<h2>2. Get your new University card (after the break)</h2>
<p>You receive a new University number for the Kulliyah. Use it everywhere from then on. Take these to the student card office:</p>
<ul>
<li>your old University card</li>
<li>a passport photo</li>
<li>your Visitor ID number or your iqama number</li>
<li>your new University number</li>
</ul>
<h2>3. Keep your room (after the break)</h2>
<p>The University system now lists you as a Ma'had graduate, so confirm that you still live in your room.</p>
<ol>
<li>Go to the housing office (إدارة السكن) and get the paper that confirms which room you are in. It is the same paper you were given when you first arrived.</li>
<li>Find your building's mushrif (supervisor) and check that his records show your Visitor ID or iqama number and your <strong>new</strong> University number.</li>
</ol>
<h2>Also check</h2>
<ul>
<li>Your stipend continues into the Kulliyah. Check under Personal, then Rewards, in the Academic System that the next payment shows and that your stipend card is still active. See <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</li>
<li>Your new timetable is in the Academic System, under Electronic Registration, then Registered Courses.</li>
<li>The rules on ta'jeel and i'tithaar are in <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</li>
</ul>
<blockquote><p>Tip: Stuck on a step? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "postgraduate-admission-1448",
    stage: "study",
    title: "Postgraduate admission at the Islamic University: master's, PhD and diplomas",
    summary: "Who can apply for a master's, PhD or higher diploma, how to apply from inside or outside Saudi Arabia, the conditions for each department, how applicants are ranked, the enrolment documents, the 1448 dates and fees, and what each kind of student receives.",
    bodyHtml: `
<p>Checked 9 November 2026. The Deanship of Graduate Studies admits master's, PhD and higher diploma students once a year. The 1448 window is closed and the 1449 window has not opened yet. The 1448 cycle below shows what to prepare.</p>
<h2>Dates</h2>
<table><thead><tr><th>1448 intake</th><th>Window</th></tr></thead><tbody>
<tr><td>Master's and PhD</td><td>Opened 16 November 2025 and closed in early December 2025</td></tr>
<tr><td>Higher diplomas</td><td>5 to 11 April 2026 (17 to 23 Shawwal 1447)</td></tr>
</tbody></table>
<p>The University announces each window on the Deanship's X account, <a href="https://x.com/highstudies_iu">@highstudies_iu</a>, and its Telegram channel, <a href="https://t.me/highstudies_iu">t.me/highstudies_iu</a>. The 1448 master's and PhD window opened in mid November and ran for about three weeks, so watch these channels from early November and have your documents ready before it opens.</p>
<p>For applicants inside Saudi Arabia, the 1448 cycle then ran like this: the specialist exams in mid January 2026, the interviews in late January, and acceptances announced from Ramadan. Postgraduate classes are held in the evening.</p>
<blockquote><p>Tip: The University holds a Postgraduate Week on campus for students in their final levels. In 2026 it opened on 8 November at Qa'at as-Salam, with an exhibition on each programme and its admission conditions.</p></blockquote>
<h2>How to apply</h2>
<table><thead><tr><th>Topic</th><th>Inside Saudi Arabia</th><th>Outside Saudi Arabia</th></tr></thead><tbody>
<tr><td><strong>Who</strong></td><td>Saudis, GCC citizens, legal residents (internal scholarship) and external scholarship students already at the University who are about to graduate</td><td>International applicants for an external scholarship who do not hold a scholarship in Saudi Arabia</td></tr>
<tr><td><strong>Where</strong></td><td>The University's postgraduate admission portal, <a href="https://postgraduate.iu.edu.sa/">postgraduate.iu.edu.sa</a></td><td>The postgraduate Minhati portal, <a href="https://postgraduateminhatee.iu.edu.sa/">postgraduateminhatee.iu.edu.sa</a></td></tr>
<tr><td><strong>Written exam</strong></td><td>Where the department sets one</td><td>Exempt, unless you already hold a scholarship in Saudi Arabia</td></tr>
</tbody></table>
<ul>
<li>All programmes are taught at the main campus in Madinah.</li>
<li>The University has <strong>no offices or agents anywhere</strong> that take applications for it.</li>
<li><strong>Application fee: 300 SAR</strong> for every applicant, not refundable, paid by e-invoice on the portal. Your application is not considered, and you cannot sit the exam, until it is paid.</li>
<li>You apply yourself. Keep your login safe, give a working email and phone number (with promotional text messages not blocked), and follow your application on the portal.</li>
</ul>
<blockquote><p>Important: A message from any of these counts as official notice from the University: the Deanship's X account, the admission portal (the public page or your own page), your official email, a text message, the admission WhatsApp number or the admission unit's email.</p></blockquote>
<h2>Who can apply</h2>
<p>Saudis, GCC citizens, legal residents of Saudi Arabia (internal scholarship) and international applicants (external scholarship).</p>
<p><strong>To apply you need:</strong> a degree from an institution recognised by the Ministry of Education, no conduct record that bars admission, the 300 SAR fee paid, every required document uploaded and matching by the deadline, medical fitness, and any extra conditions your department sets.</p>
<p><strong>To be accepted you need to:</strong> pass the department's specialist exam and interview, where it holds them; pass any supplementary courses it sets; complete all your admission documents by the deadline, or the nomination is cancelled; and, on a paid programme, pay the first semester's tuition before you enrol.</p>
<p>If you apply without meeting the conditions, the responsibility is yours and the 300 SAR fee is not refunded. Check the conditions for your programme below before you pay.</p>
<h3>About your qualifications</h3>
<ul>
<li><strong>Non-Saudi with a qualification from abroad:</strong> final acceptance needs the Saudi embassy's attestation of your qualification. You can apply and be nominated before you have it.</li>
<li><strong>Not graduated yet:</strong> you are compared with other applicants on your grade and cumulative GPA at the time you apply. A later rise in your GPA does not count.</li>
<li>The University awards the degree only. It takes no responsibility for your employment or promotion, and does not ask for your employer's approval. Arranging that is up to you.</li>
</ul>
<h2>Already studying at the University?</h2>
<p>Students who hold an Islamic University scholarship apply on the University's postgraduate portal, not on Minhati. For the 1448 intake the rules are strict:</p>
<ul>
<li><strong>You can apply in your final year</strong> if you will graduate before the programme starts.</li>
<li><strong>If you have already graduated, you cannot apply.</strong> The only exception is a special decision of the University President, for students who graduated after the start of the first semester of 1447 and whose scholarship is still valid.</li>
<li><strong>Final year of a bachelor's:</strong> you count as an expected graduate if your remaining hours fit within the maximum load allowed, summer semester included.</li>
<li><strong>Final year of a master's by thesis:</strong> your thesis is already defended with a recommendation to award the degree, or submitted with the defence set for the second semester of 1447 at the latest.</li>
<li><strong>Final year of a master's by coursework:</strong> your graduation project is submitted when you apply.</li>
</ul>
<p>You are ranked on your grade and GPA on the day you apply. If you do not graduate in time, you lose the nomination and cannot keep it for the next year. A scholarship student who moves straight from a bachelor's into a master's keeps his room.</p>
<p>Iqama holders on an internal scholarship apply on the same portal. Graduates can apply if their degree is from a GCC government university or a university recognised by the Saudi Ministry of Education. Expected graduates are accepted only from the Islamic University.</p>
<h2>Conditions by department</h2>
<p>These are the main conditions for the 1448 intake, on top of the general conditions above. "Exam" is the written specialist exam and "interview" is the personal interview, each marked out of 100. Applicants from outside Saudi Arabia with no current scholarship skip the written exam but still sit the interview and any Qur'an test.</p>
<table><thead><tr><th>Department</th><th>Previous grade</th><th>Qur'an memorisation</th><th>Pass marks</th></tr></thead><tbody>
<tr><td>Aqeedah</td><td>Very good. Master's: a Shari'ah degree. PhD: Aqeedah</td><td>None</td><td>Exam 60, interview 60</td></tr>
<tr><td>Arabic Language Institute (teaching Arabic to non-native speakers)</td><td>Very good for the master's. Diploma: a degree in Arabic or Shari'ah</td><td>None</td><td>Exam 60</td></tr>
<tr><td>Da'wah and Islamic Culture</td><td>Very good (diploma: good)</td><td>Diploma 1 juz, master's 3, PhD 5</td><td>Exam 60, interview 60, Qur'an 60</td></tr>
<tr><td>Education (master's)</td><td>Very good, regular study</td><td>None</td><td>Exam 60, interview 60</td></tr>
<tr><td>Education (PhD)</td><td>A master's in the same field</td><td>None</td><td>Exam 70, interview 70</td></tr>
<tr><td>Fiqh and Usul al-Fiqh</td><td>Very good, regular study. Master's: a Shari'ah degree</td><td>None</td><td>Exam 60, interview 60</td></tr>
<tr><td>Fiqh as-Sunnah</td><td>Very good</td><td>Master's 3 juz, PhD 5</td><td>Written and oral 70, Qur'an 80</td></tr>
<tr><td>Hadith Sciences</td><td>Very good. Master's: a Hadith or Shari'ah degree</td><td>Master's 4 juz, PhD 8</td><td>Written and oral 70, Qur'an 80</td></tr>
<tr><td>History and Civilisation</td><td>Very good. Geography and literature graduates can apply</td><td>None</td><td>Exam 60</td></tr>
<tr><td>Islamic Economics</td><td>Very good</td><td>None</td><td>Exam 60, interview 60</td></tr>
<tr><td>Judicial Studies</td><td>Diplomas: good. Master's and PhD: very good</td><td>None</td><td>Exam 60, interview 60</td></tr>
<tr><td>Law (al-Anzimah)</td><td>Very good, regular study</td><td>None</td><td>Exam 60, interview 60</td></tr>
<tr><td>Linguistics, Literature and Rhetoric</td><td>Good, with a bachelor's in Arabic</td><td>None</td><td>Exam 60</td></tr>
<tr><td>Media and Communication</td><td>Not set</td><td>None</td><td>Exam 60, interview 60</td></tr>
<tr><td>Qira'at</td><td>Very good. Master's: a Qira'at degree or an ijazah in the ten qira'at</td><td>The whole Qur'an</td><td>Exam 60, interview 60</td></tr>
<tr><td>Tafsir and Qur'anic Sciences</td><td>Very good, full regular study</td><td>Master's 5 juz, PhD 10</td><td>Exam 60</td></tr>
</tbody></table>
<p>The higher diploma in Guidance and Counselling is open only to external scholarship students, with a very good bachelor's and an exam mark of 60. A master's applicant in Da'wah who studied the higher diploma in Da'wah and Islamic Culture needs at least 4.75 out of 5 in the diploma.</p>
<h2>Science, engineering and computing</h2>
<p>These master's programmes have extra conditions for the 1448 intake:</p>
<ul>
<li><strong>Degree:</strong> a bachelor's by regular study in the same field. Engineering programmes take engineering graduates, and Renewable Energy and Mechatronics take electrical or mechanical engineers only. Data Science and Cybersecurity take computer science, information technology and information systems graduates, and not education graduates.</li>
<li><strong>GPA:</strong> at least 3.50 out of 5 or 2.50 out of 4 in engineering and computing, and at least "good" in physics, chemistry and mathematics.</li>
<li><strong>English:</strong> at least TOEFL PBT 450, TOEFL iBT 45, IELTS 4 (4.5 for Cybersecurity) or STEP 60, taken within the last two years.</li>
<li><strong>English waiver:</strong> engineering and science can waive it if you are a national of an English-speaking country or took your bachelor's in one. Science also accepts a written undertaking to bring the certificate before you submit your thesis proposal. Computing has no waiver.</li>
<li><strong>Aptitude test (Qiyas):</strong> at least 60, taken within the last five years, for Saudi and internal scholarship applicants. External scholarship students are exempt.</li>
<li><strong>Interview:</strong> required for Data Science and Cybersecurity.</li>
<li><strong>Statement of Purpose:</strong> required for Physics, Chemistry and Mathematics.</li>
</ul>
<h2>How applicants are ranked</h2>
<p>Every applicant who meets the conditions gets a weighted score, and the highest scores win the seats. The University's Standing Committee for Graduate Studies decides how many seats go to external scholarship, internal scholarship and Saudi applicants, based on how many in each group pass. The 1448 weights:</p>
<table><thead><tr><th>Programmes</th><th>How the score is made</th></tr></thead><tbody>
<tr><td>Applying from outside Saudi Arabia (no current scholarship): Shari'ah, Arabic, science and engineering programmes</td><td>50% previous GPA, 50% interview</td></tr>
<tr><td>Applying from outside Saudi Arabia (no current scholarship): computing programmes</td><td>50% GPA, 30% interview, 20% English test</td></tr>
<tr><td>Most Shari'ah, Arabic, education and media programmes inside Saudi Arabia</td><td>40% GPA, 30% written exam, 30% interview</td></tr>
<tr><td>Tafsir; Linguistics; Literature and Rhetoric; History and Civilisation; Arabic Language Skills diploma; Guidance and Counselling diploma</td><td>50% GPA, 50% written exam</td></tr>
<tr><td>Arbitration diploma</td><td>60% bachelor's GPA, 40% interview</td></tr>
<tr><td>Computing, inside Saudi Arabia</td><td>50% GPA, 30% interview, 10% aptitude test, 10% English test</td></tr>
<tr><td>Engineering, inside Saudi Arabia</td><td>50% GPA, 20% interview, 15% aptitude test, 15% English test</td></tr>
<tr><td>Physics, Chemistry, Mathematics</td><td>50% GPA, 25% aptitude test, 15% interview, 10% English certificate</td></tr>
<tr><td>Industrial Laboratories (professional master's)</td><td>50% GPA, 25% aptitude test, 25% years of lab experience</td></tr>
</tbody></table>
<p>The aptitude test counts only for Saudi and internal scholarship applicants. External scholarship students are exempt from it.</p>
<h2>Documents for enrolment</h2>
<p>Once you are nominated, upload these on the admission portal by the date the Deanship announces, each as a PDF under 5 MB, or your nomination is cancelled. For non-Saudi students:</p>
<ol>
<li>Your degree certificate</li>
<li>Your academic transcript</li>
<li>A copy of your iqama</li>
<li>A copy of your passport</li>
<li>The admission agreement, signed and dated</li>
<li>Your aptitude test certificate, for programmes that require it</li>
<li>Saudi embassy attestation of your certificate, if it is from outside Saudi Arabia</li>
<li>Your English certificate, for programmes that require it</li>
</ol>
<p>Then fill in the University's enrolment form. On a paid programme, pay the first semester's fee before you are enrolled. If anything you submit turns out to be false or altered, your admission is cancelled, even after you have started studying, and legal penalties follow.</p>
<h2>Fees for the 1448 intake</h2>
<p>Paid programmes charge only for the minimum study period: one year for a diploma, two for a master's and three for a PhD. Extra semesters beyond that are not charged. Fees are in SAR.</p>
<table><thead><tr><th>Programme</th><th>Level</th><th>Per semester</th><th>Whole programme</th></tr></thead><tbody>
<tr><td>Aqeedah</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Aqeedah</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Arabic language skills</td><td>Diploma</td><td>Free</td><td>Free</td></tr>
<tr><td>Arbitration</td><td>Diploma</td><td>8,000</td><td>16,000</td></tr>
<tr><td>Chemistry</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Comparative education</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Curricula and teaching methods</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Curricula and teaching methods</td><td>PhD</td><td>Free</td><td>Free</td></tr>
<tr><td>Cybersecurity</td><td>Diploma</td><td>8,000</td><td>16,000</td></tr>
<tr><td>Cybersecurity</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Da'wah</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Da'wah and Islamic culture</td><td>Diploma</td><td>8,000</td><td>16,000</td></tr>
<tr><td>Da'wah and Islamic culture</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Data science</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Educational administration</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Educational administration</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Educational psychology</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Engineering and technology management</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Fiqh</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Fiqh</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Fiqh as-Sunnah</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Fiqh as-Sunnah</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Foundations of Islamic education</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Foundations of Islamic education</td><td>PhD</td><td>Free</td><td>Free</td></tr>
<tr><td>Guidance and counselling</td><td>Diploma</td><td>Free</td><td>Free</td></tr>
<tr><td>Hadith sciences</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Hadith sciences</td><td>PhD</td><td>Free</td><td>Free</td></tr>
<tr><td>History and civilisation</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>History and civilisation</td><td>PhD</td><td>Free</td><td>Free</td></tr>
<tr><td>Islamic culture</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Islamic economics</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Islamic economics</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Judicial studies</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Judicial studies</td><td>PhD</td><td>Free</td><td>Free</td></tr>
<tr><td>Judiciary and Shari'ah policy</td><td>Diploma</td><td>8,000</td><td>16,000</td></tr>
<tr><td>Law (al-Anzimah)</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Law (al-Anzimah)</td><td>PhD</td><td>13,000</td><td>78,000</td></tr>
<tr><td>Linguistics</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Linguistics</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Literature and rhetoric</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Literature and rhetoric</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Mathematics</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Mechatronics and robotics</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Media and communication</td><td>Diploma</td><td>Free</td><td>Free</td></tr>
<tr><td>Media and communication</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Physics</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Professional science in industrial laboratories</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Qira'at</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Qira'at</td><td>PhD</td><td>Free</td><td>Free</td></tr>
<tr><td>Religions and ideologies</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Renewable energy</td><td>Master's</td><td>Free</td><td>Free</td></tr>
<tr><td>Sects and doctrines</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Sects and doctrines</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Tafsir and Qur'anic sciences</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Tafsir and Qur'anic sciences</td><td>PhD</td><td>Free</td><td>Free</td></tr>
<tr><td>Teaching Arabic to non-native speakers</td><td>Diploma</td><td>8,000</td><td>16,000</td></tr>
<tr><td>Teaching Arabic to non-native speakers</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Teaching Arabic to non-native speakers</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
<tr><td>Usul al-Fiqh</td><td>Master's</td><td>11,000</td><td>44,000</td></tr>
<tr><td>Usul al-Fiqh</td><td>PhD</td><td>11,000</td><td>66,000</td></tr>
</tbody></table>
<p>The diploma in teaching Arabic to non-native speakers trains teachers. It is for graduates of Arabic or Islamic studies, not a course for learning Arabic.</p>
<h2>What you receive as a postgraduate student</h2>
<table><thead><tr><th>You are</th><th>What you receive</th></tr></thead><tbody>
<tr><td>Saudi, a GCC citizen, a stateless GCC resident, or the child of a Saudi mother</td><td>A study place, the library, medical services, subsidised meals, subsidised housing when available, and academic and cultural activities</td></tr>
<tr><td><strong>External scholarship student</strong> (sponsored by the University)</td><td>A study place, a <strong>monthly stipend</strong>, a set-up allowance, a books allowance, a printing allowance, a graduation allowance, housing, subsidised meals, <strong>tickets</strong>, the library, medical services and activities</td></tr>
<tr><td><strong>Internal scholarship student</strong> (legal resident)</td><td>A study place, the library, and academic and cultural activities</td></tr>
</tbody></table>
<h2>Contact the Deanship of Graduate Studies</h2>
<p>During official working hours. If a problem is not solved, you can contact them again within one working day.</p>
<ul>
<li>X: <a href="https://x.com/highstudies_iu">@highstudies_iu</a></li>
<li>Admission unit WhatsApp: <strong>0148137257</strong></li>
<li>Admission unit email: <a href="mailto:g.r@iu.edu.sa">g.r@iu.edu.sa</a></li>
<li>Phone extensions: <strong>31009</strong> and <strong>31006</strong></li>
</ul>
<p>Bachelor's admission is in <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>
<blockquote><p>Tip: Questions about your own application? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
];
