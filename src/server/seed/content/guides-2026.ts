import type { GuideStage } from "@/server/db/schema";

/**
 * Guides written by MESH in November 2026 from students' notes, the institutes' own pages,
 * official portals and long-time residents' published guides, cross-checked and rewritten.
 * Numbered lists become tick-box steps on the site; "Tip:" blockquotes become callouts;
 * a paragraph holding only a YouTube link becomes a video player.
 */
export type SeedGuide = { slug: string; title: string; summary: string; stage: GuideStage; bodyHtml: string };

export const GUIDES_2026: SeedGuide[] = [
  {
    slug: "cost-of-living",
    stage: "getting-settled",
    title: "What it costs to live in Madinah",
    summary: "Rent, food, bills, transport and a realistic monthly budget, for a single student and for a family.",
    bodyHtml: `
<p>Madinah is one of the cheapest big cities in the Kingdom to live in. A two-bedroom flat here usually costs about half what it would in Jeddah or Riyadh. The figures below are typical prices for late 2025 and 2026. Treat them as ranges, not quotes.</p>
<h2>Rent</h2>
<table><thead><tr><th>Home</th><th>Who it suits</th><th>Monthly (SAR)</th></tr></thead><tbody>
<tr><td>Studio</td><td>One person or a couple</td><td>1,500 to 2,500</td></tr>
<tr><td>Two bedrooms</td><td>A small family</td><td>2,000 to 3,500</td></tr>
<tr><td>Three or four bedrooms</td><td>A family with children</td><td>3,000 to 4,500</td></tr>
<tr><td>Villa or a whole floor</td><td>Large families</td><td>from 5,000</td></tr>
<tr><td>Compound</td><td>Security, gym, pool</td><td>from 6,000</td></tr>
</tbody></table>
<p>These are furnished prices. An empty flat is usually 40 to 50% cheaper, and furnishing it yourself pays off if you are staying a year or more.</p>
<blockquote><p>Tip: Landlords who rent directly usually want 6 or 12 months paid up front. Middlemen rent month by month, furnished, for a higher price.</p></blockquote>
<h2>Food</h2>
<table><thead><tr><th>Item</th><th>Typical price (SAR)</th></tr></thead><tbody>
<tr><td>Bread, one pack</td><td>5</td></tr><tr><td>Milk, 1 litre</td><td>6</td></tr>
<tr><td>Chicken, 1 kg</td><td>25 to 30</td></tr><tr><td>Beef, 1 kg</td><td>40 to 50</td></tr>
<tr><td>Rice, 5 kg</td><td>50</td></tr><tr><td>Eggs, 30</td><td>25</td></tr>
<tr><td>Drinking water, 19 litres</td><td>8</td></tr><tr><td>Fruit and vegetables, per kg</td><td>4 to 12</td></tr>
<tr><td>Meal at a mid-range restaurant</td><td>25 to 40</td></tr>
</tbody></table>
<p>Cooking at home costs around 10 to 15 SAR a meal. Panda, Bin Dawood, Othaim and Carrefour are the big supermarkets, and the "5 riyal" shops are excellent for household basics.</p>
<h2>Bills</h2>
<ul>
<li><strong>Electricity:</strong> 100 to 300 SAR a month in winter, 200 to 800 in summer because of air conditioning.</li>
<li><strong>Water:</strong> 30 to 70 SAR.</li>
<li><strong>Home internet:</strong> around 250 to 300 SAR, but it needs an iqama. A data SIM in a portable router is the usual workaround.</li>
<li><strong>Mobile:</strong> 100 to 150 SAR on STC, Mobily or Zain.</li>
</ul>
<h2>Getting around</h2>
<p>A city bus ride is 3 SAR, a Careem or Uber ride across town is 10 to 30 SAR, and petrol is about 2.18 SAR a litre for 91 and 2.33 for 95. See the getting-around guide for the details.</p>
<h2>Health</h2>
<p>On a visit or business visa there is no free healthcare. A GP visit is 100 to 200 SAR, a specialist 150 to 300, a dental check and clean 150 to 250, and an emergency visit 300 to 500. Keep 500 to 800 SAR aside for surprises. University students are covered by the University clinic, and many private clinics give students and staff big discounts (see Student discounts).</p>
<h2>A realistic monthly budget</h2>
<table><thead><tr><th></th><th>Single person</th><th>Family of 3 or 4</th></tr></thead><tbody>
<tr><td>Rent</td><td>1,000 to 2,000</td><td>3,000 to 4,000</td></tr>
<tr><td>Groceries and household</td><td>1,000</td><td>2,000</td></tr>
<tr><td>Bills</td><td>300 to 600</td><td>400 to 800</td></tr>
<tr><td>Transport</td><td>300 to 1,000</td><td>300 to 1,000</td></tr>
<tr><td>Medical</td><td>0 to 600</td><td>0 to 1,000</td></tr>
<tr><td>Study and books</td><td>200 to 1,200</td><td>200 to 2,000</td></tr>
<tr><td>Everything else</td><td>100 to 300</td><td>400 to 2,000</td></tr>
<tr><td><strong>Total (SAR)</strong></td><td><strong>about 2,900 to 6,100</strong></td><td><strong>about 6,300 to 12,800</strong></td></tr>
</tbody></table>
<blockquote><p>Note: Students on the University scholarship live in the halls of residence and receive a monthly stipend, so their costs are far lower than this.</p></blockquote>
<h2>Saving money</h2>
<ul>
<li>Big sales come four times a year: Eid al-Fitr, Eid al-Adha, Saudi National Day (23 September) and Founding Day (22 February). Gyms and shops often cut prices by up to half.</li>
<li>The Barakah app sells restaurants' unsold food at the end of the day for 50 to 70% off.</li>
<li>Haraj market in Madinah sells new and used furniture and appliances with same-day delivery.</li>
</ul>`,
  },
  {
    slug: "sim-internet-bank",
    stage: "getting-started",
    title: "SIM card, internet and a Saudi bank card",
    summary: "Which network to pick, how to get internet without an iqama, and how visitors can now open a bank account.",
    bodyHtml: `
<h2>A SIM card</h2>
<p>All you need is your passport with a valid visa (or your iqama). You can buy one at the airport, in malls, or at STC, Mobily and Zain shops.</p>
<ul>
<li><strong>STC</strong> has the most stable coverage.</li>
<li><strong>Mobily</strong> has good data bundles.</li>
<li><strong>Zain</strong> is cheapest for calls and flexible plans.</li>
</ul>
<h2>Internet at home</h2>
<p>Fixed home internet (about 250 to 300 SAR a month) needs an iqama. Without one, buy a portable router, put an unlimited-data SIM in it, and you have Wi-Fi for the whole flat.</p>
<h2>A local bank account</h2>
<p>Since September 2025 the Saudi Central Bank lets visitors with a Visitor ID open an account and get a debit card, which used to need an iqama.</p>
<ol>
<li>Make sure you have a Saudi mobile number in your name.</li>
<li>Get your Visitor ID and activate Nafath or Absher if you can.</li>
<li>Open the account in the bank's app or at a branch, verifying your identity through Nafath or Absher.</li>
<li>Order your mada debit card.</li>
</ol>
<blockquote><p>Tip: A mada card is worth having. Some shops take only mada or cash, foreign cards are sometimes blocked by bank security checks, and you need a local card to pay bills and government fees.</p></blockquote>
<p>University students get their bank card through the University's steps for new students (see "First steps for new students").</p>`,
  },
  {
    slug: "getting-around",
    stage: "getting-settled",
    title: "Getting around Madinah, and to Makkah",
    summary: "Buses, ride apps, driving, renting a car, and the train or shared taxi to Makkah.",
    bodyHtml: `
<p>Madinah is compact. Most trips take 10 to 15 minutes by car.</p>
<h2>In the city</h2>
<ul>
<li><strong>City buses:</strong> 3 SAR a ride on all the main roads. Download the Madinah Bus app for routes and tickets.</li>
<li><strong>Ride apps:</strong> Careem, Uber, Jeeny and Bolt. Expect 10 to 30 SAR across town. Bolt lets you choose a male or female driver.</li>
<li><strong>Quba walkway:</strong> small shuttles run along the Mamsha between the Haram and Masjid Quba for about 10 SAR.</li>
</ul>
<h2>Driving</h2>
<p>On a visit visa you can drive with your own licence if Saudi Arabia recognises your country's licence. Buying or registering a car needs an iqama. Most rental companies also ask for residency, but private rentals are common, and students rent out their cars over the summer for 1,500 to 3,500 SAR a month.</p>
<p>Petrol costs about 2.18 SAR a litre for 91 and 2.33 for 95.</p>
<h2>To Makkah for Umrah</h2>
<table><thead><tr><th>How</th><th>Time</th><th>Cost (SAR)</th></tr></thead><tbody>
<tr><td>Haramain high-speed train</td><td>about 2 h 20 min</td><td>from 160 economy</td></tr>
<tr><td>Shared taxi from the stands near Masjid Bilal or Top 10</td><td>4.5 to 5 h</td><td>about 50 per seat</td></tr>
<tr><td>Bus</td><td>5 to 6 h</td><td>50 to 80</td></tr>
<tr><td>Own car (about 420 km)</td><td>4.5 to 5 h</td><td>petrol</td></tr>
</tbody></table>
<blockquote><p>Tip: Train fares rise with demand, so book early for Ramadan, Fridays and holidays.</p></blockquote>`,
  },
  {
    slug: "etimad-account",
    stage: "study",
    title: "Setting up your Etimad account for flight tickets",
    summary: "Etimad is where the University's travel orders and ticket letters go. Set it up once and check your details match your passport.",
    bodyHtml: `
<p>Your yearly ticket home and your final ticket as a graduate go through Etimad, the government platform. The ticket office asks you to have a working account with correct details.</p>
<ol>
<li>Open <a href="https://portal.etimad.sa/">portal.etimad.sa</a> and choose Log in.</li>
<li>Pick <strong>Individuals</strong>, then sign in through <strong>Nafath</strong>, with the app or your iqama number and password.</li>
<li>Enter your mobile number and email, accept the terms and save.</li>
<li>Type in the code sent to your phone, then confirm the link sent to your email.</li>
<li>Back on the site, open <strong>Travel orders</strong> (أوامر الإركاب), then your <strong>Profile</strong>.</li>
<li>Press <strong>Edit profile</strong> and check every detail exactly matches your passport, then save. A confirmation message means you're done.</li>
</ol>
<blockquote><p>Note: A spelling mismatch between Etimad and your passport is the most common reason a ticket gets stuck. Fix it before you request your ticket.</p></blockquote>`,
  },
  {
    slug: "kindergartens-and-schools",
    stage: "family",
    title: "Kindergartens and schools for your children",
    summary: "What you need to enrol, typical fees, daily times, and Qur'an circles in local masjids.",
    bodyHtml: `
<p>Madinah has plenty of private kindergartens and schools, and many accept children whose parents are on a visit visa, not only iqama holders. If a school hesitates, ask again politely and persist.</p>
<h2>Kindergarten</h2>
<ul>
<li><strong>Age:</strong> from 3.</li>
<li><strong>Day:</strong> drop-off around 7:00, classes from 7:30, pick-up at 12:00.</li>
<li><strong>Fees:</strong> around 4,000 SAR a year per child, paid per semester, with discounts for siblings. The same fee applies to visa and iqama families.</li>
<li><strong>Language:</strong> some groups are in Arabic, others follow English-based international programmes.</li>
</ul>
<h2>What to bring</h2>
<ol>
<li>Your child's birth certificate.</li>
<li>Passports with valid visas.</li>
<li>A passport photo.</li>
<li>A medical certificate if asked. Private clinics do the check-up for about 150 SAR.</li>
</ol>
<h2>Schools</h2>
<p>Boys and girls usually study together until about age 9, then separately. International schools such as Al Aqeeq International and AlKhandaq run English, Cambridge or national tracks. Several schools give Islamic University families a discount (see Student discounts).</p>
<h2>Qur'an circles</h2>
<p>Most neighbourhood masjids run Tahfidh al-Qur'an circles after Asr or Maghrib, usually starting with Juz 'Amma, tajweed and reading. Ask the imam of your local masjid. Masjid an-Nabawi also runs halaqat for children.</p>`,
  },
  {
    slug: "umrah-rawdah-quba",
    stage: "getting-settled",
    title: "Umrah, the Rawdah and Quba from Madinah",
    summary: "How to book the Rawdah, visit Quba every Saturday, and get to Makkah for Umrah.",
    bodyHtml: `
<h2>Masjid Quba every Saturday</h2>
<p>Praying two rak'ahs in Masjid Quba after purifying yourself at home carries the reward of an Umrah, and the Prophet ﷺ used to visit it on Saturdays. It is 3 to 4 km from the Haram, along the Mamsha Quba walkway, with shuttles for about 10 SAR.</p>
<h2>The Rawdah</h2>
<ol>
<li>Install the <strong>Nusuk</strong> app and sign in.</li>
<li>Book a Rawdah slot. Slots open in advance and go quickly.</li>
<li>Arrive at the time on your booking and follow the stewards.</li>
<li>Pray two rak'ahs and make du'a calmly, then make room for others.</li>
</ol>
<h2>Al-Baqi'</h2>
<p>Jannat al-Baqi' is next to the south-eastern side of the Haram, where many Companions and members of the Prophet's ﷺ family are buried.</p>
<h2>Umrah from Madinah</h2>
<p>Makkah is about 420 km away: around 2 hours 20 minutes on the Haramain train (from 160 SAR) or 4.5 to 5 hours by road. The miqat for people leaving Madinah is Dhul Hulayfah (Abyar Ali). See "Getting around Madinah, and to Makkah" for the options.</p>
<blockquote><p>Tip: Umrah in Ramadan is equal in reward to Hajj, so trains and buses fill up. Book well ahead.</p></blockquote>`,
  },
  {
    slug: "everyday-apps-and-services",
    stage: "getting-settled",
    title: "Everyday apps and services",
    summary: "The apps residents of Madinah use for food, repairs, cleaning, shopping and laundry, with typical prices.",
    bodyHtml: `
<h2>Food</h2>
<ul>
<li><strong>HungerStation</strong> and <strong>Keeta</strong> for delivery, usually in 20 to 30 minutes.</li>
<li><strong>Barakah</strong> for restaurants' end-of-day food at 50 to 70% off.</li>
</ul>
<h2>Shopping</h2>
<ul>
<li><strong>Amazon.sa</strong> and <strong>Noon</strong> deliver in 1 to 3 days, and Noon Minutes in an hour or two.</li>
<li><strong>Extra, Home Box and Carrefour</strong> for appliances with warranties. <strong>Haraj market</strong> for the cheapest new and used furniture with same-day delivery.</li>
<li>Thobes are tailored in every neighbourhood for 100 to 300 SAR, usually ready in 2 to 4 days.</li>
</ul>
<h2>Repairs and cleaning</h2>
<ul>
<li><strong>Dari</strong>: electricians, plumbers, AC technicians and furniture assembly, booked and paid in the app.</li>
<li><strong>Maharah</strong>: cleaners, nannies and cooks, one-off or live-in. A live-in helper costs about 2,000 to 3,500 SAR a month.</li>
<li><strong>Roha</strong>: cleaning, nannies and long-term helpers.</li>
</ul>
<h2>Laundry, barbers and pharmacies</h2>
<ul>
<li>Laundries are on almost every street and open 15 to 16 hours a day: about 2 SAR to wash or iron a thobe, 5 SAR for an abaya.</li>
<li>Men's haircut 10 to 50 SAR. Women's 40 to 80 SAR.</li>
<li>Al Nahdi and Nahhas pharmacies are open almost round the clock and most staff speak English.</li>
</ul>
<h2>Gyms</h2>
<p>All gyms are men-only or women-only. Men's gyms cost 150 to 400 SAR a month, women's (Fitness Time Ladies and others) 250 to 500. Martial arts clubs are 150 to 300 SAR. Students get 50% off at the Islamic University sports club.</p>`,
  },
  {
    slug: "visas-for-family-and-visitors",
    stage: "getting-started",
    title: "Visas for family members and visitors",
    summary: "The options people use to bring family over or stay for months, and what an iqama adds. Rules change, so always check the official site.",
    bodyHtml: `
<blockquote><p>Important: Visa rules change often. Everything here was checked in late 2025 and 2026. Confirm on <a href="https://visa.mofa.gov.sa/">visa.mofa.gov.sa</a> before you book anything.</p></blockquote>
<h2>Staying on a visa</h2>
<ul>
<li><strong>UK citizens:</strong> the e-Waiver visa (around £32) is issued online in minutes and allows up to 6 months at a time. Families leave for a nearby country and come back on a fresh one.</li>
<li><strong>US citizens:</strong> a multiple-entry business visa valid for 10 years, up to 180 days per stay.</li>
<li><strong>Other Europeans and Canadians:</strong> a multiple-entry business visa of 1 to 5 years, up to 90 days per stay.</li>
</ul>
<p>On a visa you may live here, study at language centres and work online for clients abroad. You may not take a job with a Saudi employer.</p>
<h2>What an iqama adds</h2>
<ul>
<li>A registered rental contract on Ejar.</li>
<li>A Saudi driving licence and a car in your name.</li>
<li>Bringing your spouse and children on dependant visas.</li>
<li>Long stays without visa runs.</li>
</ul>
<p>Iqamas come through employment, or through Premium Residency (about 100,000 SAR a year, or 800,000 SAR for life).</p>
<h2>University students' families</h2>
<p>Students' spouse and family visas go through the University and its own procedures. Ask at the student affairs office (Wihda 22) and in the MESH group, where married students share the current steps.</p>
<blockquote><p>Tip: Come on a visa for a few months first, get to know the city, and only then spend on an iqama.</p></blockquote>`,
  },
  {
    slug: "finding-an-apartment",
    stage: "getting-settled",
    title: "Finding and renting a flat",
    summary: "Where to look, furnished or empty, Ejar or a private agreement, and a checklist before you sign.",
    bodyHtml: `
<h2>Where to look</h2>
<ul>
<li><strong>Through people:</strong> the most reliable way. Ask in the MESH group and among students and brothers already here.</li>
<li><strong>WhatsApp and Telegram groups:</strong> up-to-date listings and direct contact. For example, Shoqaq Madinah (students' rentals) and LM Renting in Madinah.</li>
<li><strong>Haraj.com.sa:</strong> big, but prices tend to be inflated and most landlords speak only Arabic.</li>
<li><strong>Agencies for English speakers:</strong> LiveinMadinah and Find Baity help with searching and setting up.</li>
</ul>
<blockquote><p>Tip: If it's your first time, stay in a hotel or a short let (Booking, Airbnb or Gathern) for a week or two and look in person. You'll see the building, test the air conditioning and negotiate directly.</p></blockquote>
<h2>Furnished or empty</h2>
<p>For 3 to 6 months, take furnished. For a year or more, an empty flat is 40 to 50% cheaper and you can furnish it cheaply at Haraj market. Most good newer buildings are an 8 to 15 minute drive from the Haram rather than walking distance.</p>
<h2>The contract</h2>
<p><strong>Ejar</strong> is the official system that legally protects both sides, but it needs an iqama. Most rentals in Madinah are private paper agreements, which carry no legal protection. Owners usually want 6 or 12 months up front, or two payments a year.</p>
<h2>Checklist before you pay</h2>
<ol>
<li>Look for damp, cracks or mould, especially in bathrooms.</li>
<li>Run every air conditioner and check it blows cold. Summer reaches 44 to 46°C.</li>
<li>Open every tap, check pressure and hot water, flush the toilet and check for leaks or smells.</li>
<li>Test every light and socket.</li>
<li>Ask to see the electricity meter, and check there is no unpaid bill from the last tenant.</li>
<li>Test the fridge, cooker, water heater and washing machine if they're included.</li>
<li>Check windows shut tightly against sand, and ask for window guards if you have children.</li>
<li>Agree in writing who pays for small repairs, water and electricity.</li>
</ol>
<blockquote><p>Note: If the previous tenant left an unpaid electricity bill, your power can be cut soon after you move in. Ten minutes checking the meter saves weeks of trouble.</p></blockquote>`,
  },
  {
    slug: "drivers-license",
    stage: "getting-settled",
    title: "Getting a Saudi driving licence with your foreign one",
    summary: "From translation to the driving school appointment, with the fee and what to bring. You need an iqama.",
    bodyHtml: `
<p>With an iqama you can replace your home licence with a Saudi one. Holders of licences from around 47 countries can swap without a driving test. Others may be asked to sit a test at the driving school. Check your country on Absher before you start.</p>
<ol>
<li><strong>Translate your licence into Arabic</strong> at a certified translation office.</li>
<li><strong>Book an appointment on absher.sa</strong> on a computer, not the app: Appointments (مواعيد), then Traffic, then <em>Replacement of driving licence</em> (استبدال رخصة القيادة). Choose <strong>المدرسة النموذجية</strong> (the model driving school).</li>
<li><strong>Upload three PDFs:</strong> the translation, and the front and back of your original licence.</li>
<li><strong>Do the medical check</strong> before your appointment, at the Regional Laboratory and Central Blood Bank (المختبر الإقليمي وبنك الدم المركزي). It's a short taxi ride from the University. They take a blood test and check your eyes, and send the result to the driving school themselves.</li>
<li><strong>Pay the licence fee in your banking app:</strong> Payments, then Government payments, then Driving licence, then Issue licence. Enter your iqama number, choose private, then 5 years (200 SAR) or 10 years (400 SAR).</li>
<li><strong>Go to your appointment</strong> with your original licence, the translation, a photo, and your iqama (the card or the digital one in Absher).</li>
<li><strong>Check Absher afterwards.</strong> Your Saudi licence appears there once it's issued.</li>
</ol>
<blockquote><p>Tip: The driving school may keep your original licence. Take photos of both sides first.</p></blockquote>
<blockquote><p>Note: If you held a Saudi licence before and came back on a new iqama, you don't start again. Transfer or renew it onto the new iqama through Absher.</p></blockquote>`,
  },
];

export type SeedFaq = { slug: string; question: string; category: string; answerHtml: string; tags?: string[] };

export const FAQS_2026: SeedFaq[] = [
  { slug: "join-mesh-group", category: "getting-started", question: "How do I join the MESH WhatsApp group?", answerHtml: "<p>Tap any \"Join the group\" button on this site. Keep posts relevant, share only verified information, and no debates. The full rules are on the More page.</p>" },
  { slug: "how-to-apply-iu", category: "getting-started", question: "How do I apply to the Islamic University of Madinah?", answerHtml: "<p>Through the national Study in Saudi portal (studyinsaudi.moe.gov.sa) when applications open. You can choose up to 25 programmes across several universities and edit your application until the deadline. See <a href=\"/programs/iu-madinah\">Islamic University of Madinah</a> for the steps and a video walkthrough.</p>" },
  { slug: "stipend-amount", category: "university", question: "How much is the University stipend?", answerHtml: "<p>Fully funded scholarship students receive a monthly stipend (mukafa'ah) of 840 SAR, as well as housing and flights. The stipend stops during ta'jeel or i'tithaar.</p>" },
  { slug: "learn-arabic-before-iu", category: "getting-started", question: "Where can I learn Arabic in Madinah before getting into the University?", answerHtml: "<p>There are several options. Year-round institutes such as Ahlul Athar, Mutun al-Ijaz and Taba charge from about 350 SAR a month. The <a href=\"/programs/map\">Madinah Arabic Program</a> runs one-month intensives on the University campus. More options, with fees and dates, are on <a href=\"/programs\">Study in Madinah</a>.</p>" },
  { slug: "sisters-study", category: "family", question: "Where can sisters study Arabic and Islamic sciences?", answerHtml: "<p>There are free marakiz for sisters (Mishkat, Taibah, Academiyah al-Ma'rifah), the Masjid an-Nabawi Ma'had and Kulliyah for women, and paid options such as Al-Fusha Academy, Taba (now open to women) and MAP's sisters' classes. See <a href=\"/programs\">Study in Madinah</a>.</p>" },
  { slug: "monthly-budget", category: "getting-settled", question: "How much money do I need per month in Madinah?", answerHtml: "<p>Roughly 2,900 to 6,100 SAR for a single person renting their own place, and 6,300 to 12,800 SAR for a family of three or four. Scholarship students in the halls spend far less. Full breakdown: <a href=\"/guides/cost-of-living\">What it costs to live in Madinah</a>.</p>" },
  { slug: "bank-account-without-iqama", category: "getting-settled", question: "Can I open a Saudi bank account without an iqama?", answerHtml: "<p>Yes, since September 2025 visitors with a Visitor ID, a Saudi mobile number and Nafath or Absher verification can open an account and get a mada card. See <a href=\"/guides/sim-internet-bank\">SIM card, internet and a Saudi bank card</a>.</p>" },
  { slug: "home-internet-no-iqama", category: "getting-settled", question: "How do I get home internet without an iqama?", answerHtml: "<p>Fixed home internet needs an iqama, so most people use a portable router with an unlimited-data SIM from STC, Mobily or Zain.</p>" },
  { slug: "drive-on-visit-visa", category: "getting-settled", question: "Can I drive on a visit visa?", answerHtml: "<p>Yes, with your own licence if Saudi Arabia recognises it. To get a Saudi licence or register a car you need an iqama. See <a href=\"/guides/drivers-license\">Getting a Saudi driving licence</a>.</p>" },
  { slug: "rawdah-booking", category: "duroos", question: "How do I visit the Rawdah?", answerHtml: "<p>Book a slot in the Nusuk app and arrive at your booked time. Pray, make du'a calmly, and make room for others.</p>" },
  { slug: "duroos-english", category: "duroos", question: "Are there duroos in English in the Haram?", answerHtml: "<p>Almost all duroos are in Arabic, which is excellent listening practice. English lessons are rare. Take a notebook, write down words, and look them up later. Today's duroos are on the <a href=\"/duroos\">Duroos</a> page.</p>" },
  { slug: "do-i-register-for-duroos", category: "duroos", question: "Do I need to register to attend the duroos?", answerHtml: "<p>No. The duroos of the mashayikh are open to everyone. Only the Qur'an and mutun halaqat need registration.</p>" },
  { slug: "tajeel-vs-itithaar", category: "university", question: "What's the difference between ta'jeel and i'tithaar?", answerHtml: "<p>Ta'jeel is a planned semester off, requested in a short window before the semester. It doesn't count against your studies or your four-year limit. I'tithaar is withdrawing during a semester for an accepted excuse. That semester counts, and your deadline doesn't move. Details: <a href=\"/guides/tajeel-and-itithaar\">Taking a semester off</a>.</p>" },
  { slug: "etimad-what-for", category: "university", question: "What is Etimad and why do I need it?", answerHtml: "<p>It's the government platform where your University travel orders and ticket letters go. Set it up once and make sure your details match your passport exactly. See <a href=\"/guides/etimad-account\">Setting up your Etimad account</a>.</p>" },
  { slug: "student-discounts", category: "getting-settled", question: "Are there discounts for University students?", answerHtml: "<p>Yes. The University's partner programme lists over 100 offers at clinics, labs, opticians, schools, car rentals, restaurants and gyms. Students get 50% off at the University sports club. See <a href=\"/discounts\">Student discounts</a>.</p>" },
  { slug: "mahad-books", category: "university", question: "Where can I find the Ma'had books and the answers?", answerHtml: "<p>In the <a href=\"/library#mahad\">Jamiah library</a>: the official books for every level, the student guide, answer keys and the Madinah Books as web pages.</p>" },
  { slug: "muqarrarat", category: "university", question: "Where are the muqarrarat for my college?", answerHtml: "<p>The <a href=\"/library#muqarrarat\">Jamiah library</a> has a folder for every college and level. If you've written a takhlees that could help others, send it to us and we'll review it and add it.</p>" },
  { slug: "leaving-steps", category: "leaving", question: "What do I need to do when I graduate?", answerHtml: "<p>Hand back your room, return your student card, get your final exit visa, collect your degree, legalise your documents, and book your ticket. The full checklist is in <a href=\"/guides/graduate-procedures\">Graduating</a>.</p>" },
];
