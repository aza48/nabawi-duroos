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
<li>It is issued by the General Directorate of Passports (Jawazat) through your Absher account, and is tied to your <strong>border number</strong> (رقم الحدود), the number Jawazat gives you when you first enter the Kingdom.</li>
<li>It is digital only and cannot be printed on paper.</li>
<li>The long-term educational visa behind it is valid for one year and renewed each year while you study.</li>
<li>Jawazat accepts the digital Visitor ID as official proof of identity inside the Kingdom, so you can show it on your phone at checkpoints and offices.</li>
<li>Your passport is still your travel document. Carry it for flights, and for any bank or office counter that asks to see it.</li>
<li>Anything linked to the Visitor ID, such as a bank account, only runs while your visa is valid. Keep an eye on the expiry date in Absher.</li>
</ul>
<h2>Visitor ID and iqama side by side</h2>
<table><thead><tr><th></th><th>Visitor ID (educational visa)</th><th>Iqama</th></tr></thead><tbody>
<tr><td><strong>Absher and Nafath</strong></td><td>Register with your border number</td><td>Register with your iqama number</td></tr>
<tr><td><strong>Bank account and mada card</strong></td><td>Yes, at a branch or online with Nafath. The account is frozen when the Visitor ID expires</td><td>Yes, in the bank's app or at a branch</td></tr>
<tr><td><strong>SIM card</strong></td><td>Yes, registered to your passport and border number, with a fingerprint</td><td>Yes, registered to your iqama</td></tr>
<tr><td><strong>Home fibre internet</strong></td><td>No. Use a 5G router with a data SIM</td><td>Yes</td></tr>
<tr><td><strong>Rental contract on Ejar</strong></td><td>Yes, through an accredited Ejar agent</td><td>Yes, yourself or through an agent</td></tr>
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
<li>Add the account's IBAN for your stipend in the Academic System under Personal, then Rewards.</li>
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
<p>Once you hold an iqama, the swap is in <a href="/guides/drivers-license">Getting a Saudi driving licence</a>.</p>
<h2>Umrah, the Rawdah and Hajj</h2>
<ul>
<li>Book Umrah and Rawdah permits in the Nusuk app. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a>.</li>
<li>Hajj from inside the Kingdom is booked in Nusuk once registration opens, and a visit visa does not allow Hajj. Before you register or pay for a package on a Visitor ID, ask the University through Tawasul whether you are eligible.</li>
</ul>
<h2>Family</h2>
<p>A Visitor ID cannot sponsor family. Your wife, children or parents come on their own visas, most often the tourist eVisa where their passport qualifies. The options and the extension rules are in <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>. Children can still join many private kindergartens and schools: see <a href="/guides/kindergartens-and-schools">Kindergartens and schools</a>.</p>
<h2>Before your Visitor ID runs out</h2>
<p>Your bank account, your mada card and anything else tied to the Visitor ID stop working when it expires, until it is renewed. Plan for it like a deadline.</p>
<ol>
<li>Note the expiry date shown in Absher, and set reminders a month and a week before it.</li>
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
<blockquote><p>Tip: Still stuck? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
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
<blockquote><p>Tip: A question we have not answered here? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
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
<li>Bring enough cash or a working foreign card for your first month. The first stipend and your bank card take time.</li>
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
<li><strong>Open a bank account</strong> and order a mada card. Visitor ID holders go to a branch with their passport and their Visitor ID in Absher, or open online through Nafath. Then add your IBAN for the stipend in the Academic System under Personal, then Rewards.</li>
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
<li><strong>Know where to go when you are ill:</strong> the University Medical Center for students, a pharmacy for small things, and the nearest emergency department for anything serious. See <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</li>
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
<p>Checked 9 November 2026. The Institute of the Haram in Makkah has a branch at Masjid an-Nabawi, with an Institute (Ma'had) for intermediate and secondary study and a College (Kulliyah) for a bachelor's degree. Study is free and full time, inside the masjid, with separate sections for brothers and sisters.</p>
<h2>The levels</h2>
<table><thead><tr><th>Level</th><th>Who can apply</th></tr></thead><tbody>
<tr><td>Intermediate (Institute)</td><td>At least 12 at the start of the year, with a primary school certificate graded good or better</td></tr>
<tr><td>Secondary (Institute)</td><td>At least 15 at the start of the year, with an intermediate certificate graded good or better</td></tr>
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
<li><strong>Fare:</strong> 3.45 SAR a ride on the city routes, and 11.50 SAR on the airport route (400). Each ticket is for one bus, so changing buses means a new fare.</li>
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
<blockquote><p>Tip: A question about a route? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "university-offices-and-contacts",
    stage: "study",
    title: "Who to ask at the Islamic University: offices, portals and contacts",
    summary: "Which office or portal handles tickets, the Visitor ID, registration, housing, health, meals and documents, with the numbers and links, and how to write a request that gets answered.",
    bodyHtml: `
<p>Checked 9 November 2026. Most problems at the University are solved quickly once they reach the right office. This page lists who does what, and the portal or contact for each.</p>
<h2>Start here</h2>
<ul>
<li><strong>Student care:</strong> call <strong>920022042</strong> or email <strong>care@iu.edu.sa</strong> when you do not know where a question belongs.</li>
<li><strong>Tawasul</strong> (تواصل), the University's request system, at <a href="https://helpdesk.iu.edu.sa/">helpdesk.iu.edu.sa</a>. Sign in with your University login and send your request to the right deanship. If you cannot sign in yet, use the guest form at <a href="https://helpdesk.iu.edu.sa/newticket_guest">helpdesk.iu.edu.sa/newticket_guest</a>.</li>
<li><strong>Your University email.</strong> Replies and official notices come here, so read it every day.</li>
</ul>
<h2>Who handles what</h2>
<table><thead><tr><th>You need</th><th>Who handles it</th><th>Where</th></tr></thead><tbody>
<tr><td>Your ticket home, your arrival ticket, passport matters, the Visitor ID steps</td><td>Travel Management (إدارة السفر)</td><td>Tickets through Etimad: see <a href="/guides/etimad-account">Setting up your Etimad account</a>. Arrival tickets through Minhati</td></tr>
<tr><td>Registration, your timetable, adding and dropping courses, ta'jeel and i'tithaar, transfers</td><td>Deanship of Admission and Registration</td><td>The Academic System, and Tawasul for anything it cannot do</td></tr>
<tr><td>A new visa after ta'jeel, an excuse or a break in study</td><td>Deanship of Admission and Registration</td><td><a href="https://minhatee2.iu.edu.sa/Home/VisaLanding">Minhati visa page</a>, signing in with your University number</td></tr>
<tr><td>Housing, activities, clubs and life in the halls</td><td>Deanship of Student Affairs</td><td>Tawasul, or the office in person</td></tr>
<tr><td>Your stipend and IBAN</td><td>The rewards service</td><td>Academic System, Personal, then Rewards</td></tr>
<tr><td>A letter proving you are a student</td><td>Issued automatically, free and stamped</td><td>Academic System, Personal, then Official Documents</td></tr>
<tr><td>A doctor or dentist</td><td>University Medical Center</td><td>Book at <a href="https://vcappointments.iu.edu.sa/">vcappointments.iu.edu.sa</a></td></tr>
<tr><td>Meals at the mat'am</td><td>The University restaurant</td><td>Book monthly at <a href="https://restaurant.iu.edu.sa/">restaurant.iu.edu.sa</a></td></tr>
<tr><td>Your application, before you arrive</td><td>Deanship of Admission and Registration</td><td><a href="https://minhatee2.iu.edu.sa/">Minhati</a> and its helpdesk, and Study in Saudi for the final acceptance and visa</td></tr>
</tbody></table>
<h2>The portals you will use</h2>
<ul>
<li><strong>University login</strong> at sso.iu.edu.sa: through Nafath, or with your University number, password and a code sent to you. One login opens the Academic System, your email, Blackboard, Tawasul, the Medical Center bookings and the restaurant.</li>
<li><strong>Academic System:</strong> your timetable, final exams, academic requests, rewards and official documents.</li>
<li><strong>Blackboard:</strong> your classes, materials and class chats. Never open links posted by accounts you do not know: see <a href="/ask/blackboard-phishing">Someone posted a link in my Blackboard class chat</a>.</li>
<li><strong>Minhati:</strong> your application, the arrival ticket request and visa renewal for returning students.</li>
<li><strong>Etimad:</strong> travel orders for your University tickets.</li>
</ul>
<h2>Writing a request that gets answered</h2>
<ol>
<li>Send it to the office that handles the matter, using the table above.</li>
<li>Start with your full name as in your passport, your University number and your college.</li>
<li>Say in a few lines what you need, what you have already tried, where, and what you were told.</li>
<li>Attach screenshots of any error and copies of the documents involved.</li>
<li>Press send, then <strong>track request</strong>, and save the link or reference number so you can follow it up.</li>
<li>Watch your University email for the reply, and answer any follow-up question the same day.</li>
</ol>
<blockquote><p>Tip: Your name must match your passport letter for letter on every portal. A mismatch is the most common reason a ticket or a request gets stuck.</p></blockquote>
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
<blockquote><p>Tip: Not sure which office to ask? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "scholarship-stipend-and-allowances",
    stage: "study",
    title: "Your scholarship money: stipend, allowances and tickets",
    summary: "What a full scholarship pays: the monthly stipend, the arrival and graduation allowances and the yearly ticket home, how to see your rewards and add your IBAN, and what stops payment.",
    bodyHtml: `
<p>Checked 9 November 2026. A full (external) scholarship at the Islamic University pays more than the monthly stipend. This page sets out each payment, where to see it, and what can stop it.</p>
<h2>What a full scholarship gives you</h2>
<ul>
<li>A <strong>monthly stipend</strong> (mukafa'ah, مكافأة).</li>
<li>An <strong>arrival allowance</strong> of two months' stipend.</li>
<li>A <strong>graduation allowance</strong> of three months' stipend, for shipping your books home.</li>
<li>A <strong>discounted economy ticket home</strong> at the end of each academic year.</li>
<li>University housing, three subsidised meals a day, free buses to the Haram and free medical care at the University Medical Center.</li>
</ul>
<p>A partial (internal) scholarship, for applicants already living in Saudi Arabia, covers tuition only. It has no stipend, allowances, tickets, housing or meals.</p>
<h2>The monthly stipend</h2>
<ul>
<li>The rate is set by the University and depends on your college.</li>
<li>Your own payments are in the Academic System under <strong>Personal</strong>, then <strong>Rewards</strong> (المكافآت).</li>
<li>It is paid monthly into your bank account. The day changes from month to month, and the University sometimes pays early before a holiday, so plan your month without counting on a fixed date.</li>
</ul>
<blockquote><p>Tip: Bring enough money for your first two months. Opening a bank account and setting up your first payments takes time.</p></blockquote>
<h2>Getting paid: your bank account and IBAN</h2>
<ol>
<li>Open a Saudi bank account. On a Visitor ID, see <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
<li>Find the account's IBAN in your banking app. It starts with SA and has 24 characters.</li>
<li>In the Academic System, open <strong>Personal</strong>, then <strong>Rewards</strong>, and send an IBAN update request with the new number.</li>
<li>Check the Rewards screen after the next payment date to see that the payment went to the right account.</li>
</ol>
<p>If you change bank, send a new IBAN update request before the next payment.</p>
<h2>What stops the stipend</h2>
<ul>
<li><strong>Ta'jeel or i'tithaar:</strong> the stipend stops for the semester you are not studying. See <a href="/guides/tajeel-and-itithaar">Taking a semester off</a>.</li>
<li><strong>Leaving your studies:</strong> withdrawal or dismissal ends the scholarship.</li>
<li><strong>A frozen bank account:</strong> on a Visitor ID, the bank freezes the account when the ID expires. Renew in good time: see <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</li>
</ul>
<h2>Your ticket home</h2>
<p>Each academic year the University gives you a discounted economy ticket home, issued against a travel order on Etimad. The main rules:</p>
<ul>
<li>To a capital city in your own country, or in the country that issued the visa you arrived on.</li>
<li>Valid for 3 months from the first travel date. The name and the outbound airports cannot be changed.</li>
<li>Date changes are at your cost, cancelling returns the ticket to the University with no cash refund, and a no-show loses the ticket.</li>
<li>One cabin bag and two checked bags.</li>
</ul>
<p>The full list and how to set up your account are in <a href="/guides/etimad-account">Setting up your Etimad account</a>.</p>
<h2>When you graduate</h2>
<p>Graduates receive the graduation allowance of three months' stipend and a final ticket home, once the University has confirmed their clearance. The steps are in <a href="/guides/graduate-procedures">Graduating</a>.</p>
<blockquote><p>Tip: A payment missing or wrong? Check the Rewards screen first, then send a request through Tawasul. Still stuck? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
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
<p>Checked 9 November 2026. Since 2025 the whole journey runs through one national portal, a second application on the University's own portal, a final approval from the Ministry of Education and an electronic educational visa. New students arrive with a Visitor ID rather than an iqama.</p>
<h2>When applications open</h2>
<p>The University opens for international bachelor's applicants once a year on Study in Saudi and announces the dates each season. In recent years the main window has been in spring, with short reopenings for some applicants. The portal is closed outside the window.</p>
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
<li><strong>Health:</strong> medically fit, with a medical report showing no infectious disease.</li>
<li><strong>College of the Holy Qur'an:</strong> the whole Qur'an memorised, confirmed in an oral exam.</li>
<li><strong>Engineering, computing and science:</strong> these colleges teach in English and ask for IELTS or TOEFL, unless your earlier study was in English or you come from a country where English is an official or main language. The Islamic and Arabic colleges teach in Arabic.</li>
<li><strong>Finished school in Saudi Arabia?</strong> You count as an internal applicant even if you apply for an external scholarship, and you must submit the General Aptitude Test, plus the Achievement Test for the scientific colleges.</li>
<li><strong>Brothers only for study in Madinah.</strong> Sisters can study with the University online, and other routes are in <a href="/ask/sisters-study">Where can sisters study?</a></li>
</ul>
<h2>The programmes</h2>
<p>Degrees take four or five years, after the Arabic institute if your placement test puts you there.</p>
<ul>
<li><strong>Islamic and Arabic colleges:</strong> Sharia, Creed and Da'wah, the Holy Qur'an, Hadith, Arabic language and Media, Law, and Business (Economics).</li>
<li><strong>Engineering:</strong> chemical, civil, electrical, industrial and mechanical.</li>
<li><strong>Computing:</strong> computer science, data science and information technology.</li>
<li><strong>Science:</strong> chemistry, environmental sciences, financial and actuarial mathematics, mathematics and physics.</li>
</ul>
<p>Choose carefully. Scholarship students are placed in one college and cannot move to another after admission.</p>
<h2>Full and partial scholarships</h2>
<table><thead><tr><th></th><th>Full (external)</th><th>Partial (internal)</th></tr></thead><tbody>
<tr><td><strong>Who</strong></td><td>Applicants living outside Saudi Arabia</td><td>Applicants already living in Saudi Arabia, who must keep a legal residency throughout</td></tr>
<tr><td><strong>Tuition</strong></td><td>Free</td><td>Free</td></tr>
<tr><td><strong>Stipend and allowances</strong></td><td>Monthly stipend, arrival allowance and graduation allowance</td><td>None</td></tr>
<tr><td><strong>Housing and meals</strong></td><td>University housing and subsidised meals</td><td>None</td></tr>
<tr><td><strong>Tickets</strong></td><td>A discounted economy ticket home each year</td><td>None</td></tr>
<tr><td><strong>Also</strong></td><td>Free buses to the Haram, free medical care, the library, sport and activities</td><td>Employer approval if you work</td></tr>
</tbody></table>
<p>More in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money: stipend, allowances and tickets</a>.</p>
<h2>Prepare now for the next window</h2>
<ol>
<li><strong>Passport:</strong> valid well beyond your planned arrival. Every form must use your name exactly as it is printed in it.</li>
<li><strong>Secondary school certificate and transcript.</strong> Check it will still be under five years old when you apply.</li>
<li><strong>Police clearance</strong> from your country. In many countries this takes weeks, so start early.</li>
<li><strong>For a partial scholarship:</strong> your employer's approval.</li>
<li><strong>Two recommendation letters (tazkiyah)</strong> from recognised organisations, institutions or scholars in your country, or from people the University approves.</li>
<li><strong>Medical report</strong> showing you are fit to study and free of infectious disease.</li>
<li><strong>Birth certificate</strong> or another proof of age.</li>
<li><strong>IELTS or TOEFL</strong> for engineering, computing and science, unless you are exempt.</li>
<li><strong>Photo:</strong> passport style, plain white background, neutral face, and not in white clothes. A photo studio does this properly.</li>
<li><strong>Arabic translations</strong> of anything not in Arabic, made by a certified translator.</li>
<li><strong>Extra certificates</strong> for Qur'an memorisation, Arabic, mutun or ijazah, if you have them. They count for the Islamic colleges.</li>
<li><strong>Clear colour scans</strong> of everything. Do not use phone photos.</li>
<li><strong>An email address you check every day,</strong> including the spam folder. Your registered email is the University's official channel, and missing a message can end your application.</li>
</ol>
<h2>From application to arrival</h2>
<ol>
<li><strong>Apply on Study in Saudi.</strong> Create your account, fill in your details, upload your documents and choose your programmes. You can choose up to 25 programmes across more than ten universities, and each shows whether it is a full, partial or paid scholarship. Submit before the deadline and keep your application number.</li>
<li><strong>Complete the second application on Minhati.</strong> The University emails you login details for <a href="https://minhatee2.iu.edu.sa/">Minhati</a>, its own portal, and asks for extra details and documents with Arabic translations. You often have only about 24 hours, so act the same day.</li>
<li><strong>Sit the interview or the placement test if invited.</strong> The interview is online. The Arabic test is not pass or fail: it only places you in a Ma'had level, so answer honestly. A level that is too high makes your first year much harder.</li>
<li><strong>Accept your offer within 5 days.</strong> Initial acceptance arrives by email and shows on the portal as waiting for your confirmation. Accepting cancels your applications to other universities. If you ignore it, the offer lapses. Retype your first and last name exactly as in your passport.</li>
<li><strong>Wait for final acceptance.</strong> Minhati shows only a preliminary acceptance, which is conditional. Final acceptance appears on Study in Saudi, which is the official record and the only stage that leads to a visa.</li>
<li><strong>Fill in the visa application</strong> when the portal asks. You must be outside Saudi Arabia when you submit it, or it is rejected.</li>
<li><strong>Pay the educational visa fee</strong> through the link that is sent to you.</li>
<li><strong>Give your fingerprints</strong> through the Ministry of Foreign Affairs' <strong>Saudi Visa Bio</strong> app, or at an approved visa centre or Saudi embassy if the app does not work for you. Complete any medical tests you are asked for.</li>
<li><strong>Receive the visa.</strong> It appears in your Study in Saudi account and is sent by email. If you used the app for fingerprints, you need no embassy visit.</li>
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
<h2>What you agree to</h2>
<p>Scholarship students sign a declaration. It commits you to follow Saudi law and the University's rules, to attend regularly and keep up your grades, not to move your sponsorship to anyone other than the University, and to go home when you graduate, withdraw or leave. You cannot stay on in the Kingdom on the scholarship after your studies end.</p>
<h2>Housing and family</h2>
<p><strong>Housing:</strong> full scholarships include University housing and partial ones do not. See <a href="/ask/is-housing-included">Is housing included?</a> and check the support shown on your offer. <strong>Family:</strong> see <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</p>
<blockquote><p>Tip: Questions about your own application? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "new-student-steps",
    stage: "getting-started",
    title: "First steps for new students: SIM, Absher, Visitor ID, student card and bank account",
    summary: "What to do after you arrive, in order: a Saudi SIM, Absher and the kiosk, Nafath, your Visitor ID, your National Address, a bank account and your IBAN, then your student card and University accounts.",
    bodyHtml: `
<p>Checked 9 November 2026. New students on the educational visa do these steps in this order, because each one needs the one before it. By the end you will have a Saudi number, an active Absher and Nafath, your Visitor ID, a bank account for your stipend, your student card and your University accounts.</p>
<h2>Before you start</h2>
<ul>
<li>Keep your passport with you, and find your <strong>border number</strong> (رقم الحدود), the number linked to your visa when you first entered the Kingdom.</li>
<li>Have an email address you can open on your phone.</li>
<li>Bring enough money for your first weeks. Opening a bank account and setting up your first payments takes time.</li>
</ul>
<h2>The steps</h2>
<ol>
<li><strong>Get a Saudi SIM.</strong> At any mobile operator's branch, show your passport and visa or border number. The shop checks your fingerprint and registers the line in your name. Every code that follows comes to this number.</li>
<li><strong>Register on Absher</strong> (أبشر) as a new user, with your border number, your email and your new mobile number.</li>
<li><strong>Activate Absher at a self-service kiosk.</strong> Kiosks are in Jawazat (Passports) offices, at the University, at airports and in some malls. Enter your border number and register your fingerprint.</li>
<li><strong>Activate Nafath</strong> (نفاذ) in the Nafath app: open the settings, choose to activate your national digital identity, and complete your details and the face check.</li>
<li><strong>Issue your Visitor ID</strong> (هوية زائر) in Absher: choose <strong>Issue visitor ID</strong> and complete the details. It is digital only, it shows in the Absher app, and it cannot be printed.</li>
<li><strong>Register your National Address</strong> with Saudi Post. Your bank needs it. See <a href="/ask/short-address">What is a short address?</a></li>
<li><strong>Open a bank account.</strong> Either go to a branch with your passport and show your Visitor ID in the Absher app, or open the account online and confirm your identity through Nafath. The account number arrives by text message, and the mada card is collected at the branch or posted to you. See <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
<li><strong>Give the University your IBAN</strong> so your stipend is paid into your account: in the Academic System, open Personal, then Rewards, and send an IBAN update request. See <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money</a>.</li>
<li><strong>Collect your student card.</strong> New students receive it during orientation week. If you arrive later, take your Visitor ID to the student card office, which prints it on the spot.</li>
<li><strong>Sign in to your University accounts</strong> at sso.iu.edu.sa, through Nafath or with your University number, password and a code. This opens your University email, the Academic System, Blackboard and Tawasul. Your timetable is under Electronic Registration, then Registered Courses.</li>
<li><strong>Set up Etimad</strong> for your University tickets, with your name exactly as in your passport. See <a href="/guides/etimad-account">Setting up your Etimad account</a>.</li>
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
<blockquote><p>Tip: Stuck on a step? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
  {
    slug: "tajeel-and-itithaar",
    stage: "study",
    title: "Taking a semester off: ta'jeel and i'tithaar",
    summary: "How to postpone a semester (ta'jeel) or be excused from one (i'tithaar), the limits, what each does to your stipend, room and study period, the 1448 windows, and how to apply.",
    bodyHtml: `
<p>Checked 9 November 2026. Ta'jeel and i'tithaar both take you out of a semester, but they work differently and they share one limit. Read this before you apply, and speak to your college or the Ma'had first.</p>
<h2>Ta'jeel and i'tithaar in short</h2>
<table><thead><tr><th></th><th>Ta'jeel (تأجيل)</th><th>I'tithaar (اعتذار)</th></tr></thead><tbody>
<tr><td>What it is</td><td>Postponing a semester before it starts</td><td>An excuse from a semester you have already started</td></tr>
<tr><td>When</td><td>The deferral window just before the semester</td><td>After the deferral window, during the semester</td></tr>
<tr><td>Approval</td><td>Your college must approve it</td><td>Your college must approve it</td></tr>
<tr><td>Your courses</td><td>You are not registered that semester</td><td>You are withdrawn from all that semester's courses with a W grade, which is not a fail</td></tr>
<tr><td>Maximum study period</td><td>Not counted, so your deadline moves back</td><td>Counted, so your deadline stays where it was</td></tr>
<tr><td>Stipend (mukafa'ah)</td><td>Stops</td><td>Stops</td></tr>
<tr><td>Room in the halls</td><td>Hand it back and empty it</td><td>You may need to</td></tr>
</tbody></table>
<h2>The limits</h2>
<ul>
<li>Ta'jeel and i'tithaar added together cannot be more than <strong>three semesters</strong> over your whole programme.</li>
<li>In your <strong>first year</strong> neither is allowed except for compelling reasons. In the first year you also cannot withdraw from single courses or transfer to another college.</li>
<li>Because i'tithaar counts towards your maximum study period, you have to fit the missed courses into later semesters or summers. If you run out of time, you risk not getting your degree.</li>
</ul>
<h2>The 1448 windows</h2>
<table><thead><tr><th>Semester 2, 1448</th><th>Dates</th></tr></thead><tbody>
<tr><td>Ta'jeel (deferral)</td><td>13 to 19 December 2026</td></tr>
<tr><td>I'tithaar (excuse from the semester) and withdrawing from a course</td><td>20 December 2026 to 13 March 2027</td></tr>
</tbody></table>
<p>The windows for every semester are in <a href="/guides/university-calendar-1448">The University calendar</a>, and the Academic System is the live record if a window is extended. Miss the ta'jeel window and only i'tithaar is left.</p>
<h2>How to apply in the Academic System</h2>
<p>The steps are the same for both.</p>
<ol>
<li>Sign in to the University system and open the <strong>Academic System</strong>.</li>
<li>Under <strong>أكاديمي</strong> (Academic), choose <strong>ادخال حركات اكاديمية</strong>, then <strong>ادخال حركات أكاديمية جديدة</strong>.</li>
<li>Tap <strong>أوافق</strong> (I agree).</li>
<li>Set <strong>نوع الحركة</strong> (type) to <strong>تأجيل</strong> for ta'jeel, or <strong>الاعتذار</strong> for i'tithaar, which appears once the ta'jeel window has closed. Do not choose <strong>إنسحاب</strong>: that withdraws you from the University.</li>
<li>Choose the semesters. For one semester, set both <strong>من بداية الفصل</strong> and <strong>إلى نهاية الفصل</strong> to the same semester. For two, set <strong>إلى نهاية الفصل</strong> to the second one.</li>
<li>Choose your reason (<strong>السبب</strong>). Add notes under <strong>ملاحظات</strong> and supporting PDFs under <strong>مرفقات</strong>, such as a medical report. Tap <strong>التالي</strong> (next).</li>
<li>Check the summary and tap <strong>حفظ</strong> (save), then <strong>انهاء</strong> (finish).</li>
<li>See the wakeel of your college or the Ma'had, who handles student affairs, in case there are more forms to complete.</li>
</ol>
<p><strong>Checking your request:</strong> repeat steps 1 and 2, but choose <strong>إظهار الحركات الأكاديمية</strong>. Once it is approved, your status (<strong>الوضع العام</strong>) changes from <strong>منتظم</strong> (regular) to <strong>مؤجل</strong> (postponed).</p>
<h2>Travel and your visa</h2>
<table><thead><tr><th></th><th>Visitor ID (educational visa)</th><th>Iqama</th></tr></thead><tbody>
<tr><td><strong>Before you leave</strong></td><td>Ask the University through Tawasul what your status means for your visa, and check the expiry date in Absher</td><td>Ask Travel Management (إدارة السفر) which visa you need before you book</td></tr>
<tr><td><strong>Coming back</strong></td><td>Request a new visa on the <a href="https://minhatee2.iu.edu.sa/Home/VisaLanding">Minhati visa page</a>, signing in with your University number</td><td>Return on a valid exit and re-entry visa, or follow Travel Management's instructions</td></tr>
</tbody></table>
<p>Flights during a semester off are at your own cost. The University's ticket is the yearly one home.</p>
<h2>Questions</h2>
<p><strong>Can I apply from abroad?</strong> Yes, the request is online. But someone has to empty your room and return the key, and you cannot sort out problems in person.</p>
<p><strong>Can I cancel a request?</strong> Ask your college or the Ma'had straight away, as they may need to put you back into your classes.</p>
<blockquote><p>Tip: Not sure which one fits your case? Please message Admin on WhatsApp at +1 234 567 9076.</p></blockquote>`,
  },
];
