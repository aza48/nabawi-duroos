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
<p>A city bus ride is 3.45 SAR, a Careem or Uber ride across town is 10 to 30 SAR, and petrol is about 2.18 SAR a litre for 91 and 2.33 for 95. See the getting-around guide for the details.</p>
<h2>Health</h2>
<p>On a visit or business visa there is no free healthcare. A GP visit is 100 to 200 SAR, a specialist 150 to 300, a dental check and clean 150 to 250, and an emergency visit 300 to 500. Keep 500 to 800 SAR aside for surprises. University students are covered by the University clinic, and many private clinics give students and staff big discounts (see Student discounts).</p>
<h2>A realistic monthly budget</h2>
<table><thead><tr><th></th><th>Single person</th><th>Family of 3 or 4</th></tr></thead><tbody>
<tr><td>Rent (shared room or small flat)</td><td>1,000 to 2,000</td><td>3,000 to 4,000</td></tr>
<tr><td>Groceries and household</td><td>1,000</td><td>2,000</td></tr>
<tr><td>Bills</td><td>300 to 600</td><td>400 to 800</td></tr>
<tr><td>Transport</td><td>300 to 1,000</td><td>300 to 1,000</td></tr>
<tr><td>Medical</td><td>0 to 600</td><td>0 to 1,000</td></tr>
<tr><td>Study and books</td><td>200 to 1,200</td><td>200 to 2,000</td></tr>
<tr><td>Everything else</td><td>100 to 300</td><td>400 to 2,000</td></tr>
<tr><td><strong>Total (SAR)</strong></td><td><strong>about 2,900 to 6,700</strong></td><td><strong>about 6,300 to 12,800</strong></td></tr>
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
<li>Get your Visitor ID and activate Nafath or Absher. The bank uses it to verify you.</li>
<li>Open the account in the bank's app or at a branch, verifying your identity through Nafath or Absher.</li>
<li>Order your mada debit card.</li>
</ol>
<blockquote><p>Tip: A mada card is worth having. Some shops take only mada or cash, foreign cards are sometimes blocked by bank security checks, and you need a local card to pay bills and government fees.</p></blockquote>
<p>Already have a SIM? See <a href="/guides/phone-sims-and-absher">Your phone number, SIM checks and Absher</a> for codes, SIM checks and updating your Absher number.</p>
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
<li><strong>City buses:</strong> 3.45 SAR a ride on all the main roads, and 11.50 SAR on the airport route (400). Cash is not accepted on board: pay in the Madinah Bus app, which also sells day, week and month passes (10, 60 and 240 SAR).</li>
<li><strong>Ride apps:</strong> Careem, Uber, Jeeny and Bolt. Expect 10 to 30 SAR across town. Bolt lets you choose a male or female driver.</li>
<li><strong>Quba walkway:</strong> small shuttles run along the Mamsha between the Haram and Masjid Quba for about 10 SAR.</li>
</ul>
<h2>Driving</h2>
<p>On a visit visa you can drive with your own licence if Saudi Arabia recognises your country's licence. Buying or registering a car needs an iqama. Most rental companies also ask for residency, but private rentals are common, and students rent out their cars over the summer for 1,500 to 3,500 SAR a month.</p>
<p>Petrol costs about 2.18 SAR a litre for 91 and 2.33 for 95.</p>
<h2>To Makkah for Umrah</h2>
<table><thead><tr><th>How</th><th>Time</th><th>Cost (SAR)</th></tr></thead><tbody>
<tr><td>Haramain high-speed train</td><td>about 2 h 20 min</td><td>from 162 SAR economy, plus VAT</td></tr>
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
<p>Makkah is about 420 km away: around 2 hours 20 minutes on the Haramain train (from 162 SAR plus VAT) or 4.5 to 5 hours by road. The miqat for people leaving Madinah is Dhul Hulayfah (Abyar Ali). See "Getting around Madinah, and to Makkah" for the options.</p>
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
<p>All gyms are men-only or women-only. Men's gyms cost 150 to 400 SAR a month, women's (Fitness Time Ladies and others) 250 to 500. Martial arts clubs are 150 to 300 SAR. Students get 50% off at the Islamic University sports club. Classes and trips are listed in <a href="/guides/sports-and-activities">Sport, fitness and outdoor activities</a>.</p>`,
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
<li><strong>Tourist eVisa:</strong> open to citizens of about 68 countries, including the UK, the US, Canada and most of Europe, with Bosnia and Herzegovina, Mexico, North Macedonia and Serbia added on 5 November 2026. It costs SAR 535 online or SAR 480 on arrival at an international airport, includes compulsory health insurance, and is valid for one year with multiple entries, up to 90 days in the country. It cannot be extended. Check the rules for your passport on <a href="https://visa.visitsaudi.com/">visa.visitsaudi.com</a>.</li>
<li><strong>Extending a visit visa:</strong> the host (a Saudi or an iqama holder) files the extension on Absher, from 7 days before expiry to 3 days after. It costs about SAR 100 each time, and the total stay is capped at 180 days.</li>
<li><strong>Family visit visa:</strong> the sponsor needs a professional iqama with at least 90 days left and a documented salary. Student and dependant iqamas cannot sponsor one.</li>
</ul>
<p>On a visit visa you may live here and take short courses at language centres. You may not work, and degree study needs a student visa.</p>
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
<li><strong>Agents:</strong> some real-estate offices work in English. Use an accredited agent from Ejar's official list.</li>
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
  {
    slug: "applying-to-the-islamic-university",
    stage: "getting-started",
    title: "Applying to the Islamic University",
    summary: "Undergraduate admission step by step: when the window opens, who can apply, the documents, what initial and final acceptance mean, and how to avoid paid agents.",
    bodyHtml: `
<blockquote><p>Important: applying is free and you do it yourself on <a href="https://studyinsaudi.sa/">studyinsaudi.sa</a>. The University has no offices or agents abroad. Anyone who asks you for money to apply, to speed things up or to guarantee a place is not working for the University. Do not pay them and do not give them your login.</p></blockquote>
<h2>When you can apply</h2>
<p>Applications open once a year on the Study in Saudi portal, usually in spring. For the 1448 year the window ran from 19 April to 21 May 2026. The portal is closed outside the window, so watch studyinsaudi.sa and the MESH group from March onwards.</p>
<p>On the portal you can choose up to 25 programmes across more than ten Saudi universities. Each one shows whether it is a full, partial or paid scholarship.</p>
<h2>Who can apply</h2>
<ul>
<li><strong>Age:</strong> at least 17 and no older than 25.</li>
<li><strong>School certificate:</strong> general secondary or its equivalent, no more than five years old. Scientific colleges need the scientific track. An old certificate is one of the most common reasons for rejection.</li>
<li><strong>Where you live:</strong> full scholarship applicants must be living outside Saudi Arabia.</li>
<li><strong>Record:</strong> good conduct, never expelled from a university for discipline, and not already on a Saudi scholarship.</li>
<li><strong>College of the Holy Qur'an:</strong> the whole Qur'an memorised, plus the University's own test.</li>
</ul>
<h2>Documents to have ready</h2>
<ul>
<li>Your passport, with your name exactly as it will appear on your visa.</li>
<li>Your secondary school certificate and transcript.</li>
<li>A police clearance from your country.</li>
<li>A recommendation (tazkiyah) from an organisation, institution or scholar in your country. The portal marks it optional, but the University's own form asks who gave it, so get one.</li>
<li>Proof of medical fitness.</li>
<li>For a partial scholarship, your employer's approval.</li>
</ul>
<p>Scan everything clearly before the window opens. Translations into Arabic help when a document is in another language.</p>
<h2>From application to arrival</h2>
<ol>
<li>Apply on Study in Saudi and keep your application number.</li>
<li>Watch your email. The University sends a link to finish a second application on Minhati, its own portal, often with only about 24 hours to complete it.</li>
<li>Sit the online interview or the Arabic test if you are invited. The Arabic test is not pass or fail: it only places you in a Ma'had level.</li>
<li>Initial acceptance appears on the portal. Confirm it within 5 days or the offer lapses.</li>
<li>Final acceptance comes from the Ministry of Education, not the University. Only then fill in the visa form on the portal.</li>
<li>Pay the educational visa fee when the payment link arrives. The visa comes by email, with no embassy visit. You must be outside Saudi Arabia when you submit the visa application.</li>
<li>Request your arrival ticket through Minhati once the visa is issued.</li>
</ol>
<h2>Housing, deferral and family</h2>
<p><strong>Housing:</strong> scholarship students are housed by default, either inside the Jamiah or in the Rabwa halls (الربوة). See <a href="/ask/is-housing-included">Is housing included?</a></p>
<p><strong>Deferral:</strong> the University allows new students to defer for up to two years. See <a href="/ask/defer-my-place">Can I defer my place?</a> for what students on the new visa report.</p>
<p><strong>Bringing your family:</strong> see <a href="/ask/istiqdam-deposit">Can I sponsor my family, and what is the deposit?</a></p>
<h2>Initial acceptance is not final</h2>
<p>Initial acceptance means the University has put your name forward. Final acceptance means the Ministry has approved it, and that is the only stage that leads to a visa. Do not resign from work, give up your home or book flights on initial acceptance alone. Some people with initial acceptance are moved to a later semester, and some are offered a year of online Arabic first.</p>
<p>Plan to arrive in the semester you are offered. Under the new educational visa, asking to arrive later can send your application back.</p>
<blockquote><p>Tip: Questions about your own application? Ask in the MESH WhatsApp group, where students who applied this year share each step as it happens.</p></blockquote>`,
  },
  {
    slug: "having-a-baby-in-madinah",
    stage: "family",
    title: "Having a baby in Madinah",
    summary: "Hospitals compared for fees, husbands and companions, female-only staff and free delivery for University wives. Checked April 2025.",
    bodyHtml: `
<blockquote><p>Important: this comparison was last checked in April 2025. Prices and visiting rules change, and a husband's access to the labour room is always decided by the staff and doctors on duty. Phone the hospital when you book and again near your due date.</p></blockquote>
<h2>Free delivery for University wives</h2>
<p>Wives of University students can deliver free of charge at <strong>Uhud Hospital</strong>. She needs her own iqama. It is the only hospital that offers this.</p>
<h2>Fees for a delivery (SAR)</h2>
<table><thead><tr><th>Hospital</th><th>Natural delivery</th><th>C-section</th></tr></thead><tbody>
<tr><td>Dr. Sulaiman Al Ahmadi Hospital</td><td>3,500</td><td>7,000, plus 3,000 for each later caesarean</td></tr>
<tr><td>Hayat National</td><td>4,500 (changes with an epidural)</td><td>10,350, including all medication, a 3 day stay and follow-up with the doctor and the paediatrician</td></tr>
<tr><td>Madina National Hospital</td><td>4,715, plus a 125 check-up fee and a 264 ultrasound fee</td><td>Ask the hospital</td></tr>
<tr><td>Mouwasat</td><td>About 6,000</td><td>Ask the hospital</td></tr>
<tr><td>Safa Al Madinah</td><td>3,500, plus a 115 check-up fee</td><td>Ask the hospital</td></tr>
<tr><td>Saudi German</td><td>5,000</td><td>About 10,000, plus 3,000 for each later caesarean</td></tr>
<tr><td>Uhud (private, paying patients)</td><td>3,500, plus a 100 check-up fee</td><td>7,000, plus a 100 check-up fee</td></tr>
<tr><td>UMMC (formerly Dar)</td><td>3,000</td><td>6,000</td></tr>
<tr><td>Wilaada (expats who are not students)</td><td>5,000</td><td>Ask the hospital</td></tr>
<tr><td>Zahra</td><td>4,100</td><td>9,000</td></tr>
</tbody></table>
<h2>Husbands and companions</h2>
<p>Every hospital below decides this case by case, so a husband can be turned away on the day.</p>
<ul>
<li><strong>Female-only staff:</strong> Zahra.</li>
<li><strong>Husband allowed during labour:</strong> Hayat National, Madina National Hospital, Mouwasat, Saudi German and Zahra.</li>
<li><strong>Husband allowed during the delivery itself:</strong> Hayat National and Mouwasat.</li>
<li><strong>Husband allowed to stay with you day and night after the delivery:</strong> Hayat National, Madina National Hospital, Mouwasat, Saudi German and Zahra.</li>
<li><strong>Birth companion programme</strong> (a female companion stays through the delivery, after getting a security pass first): Uhud and Zahra.</li>
</ul>
<h2>Which doctor delivers</h2>
<p>At Dr. Sulaiman Al Ahmadi Hospital, Madina National Hospital, Mouwasat, Uhud and Wilaada, the doctor on duty usually delivers your baby, so you generally cannot choose.</p>
<blockquote><p>Tip: Book antenatal visits early, ask the hospital for its current delivery price in writing, and ask what is included before you decide.</p></blockquote>`,
  },
  {
    slug: "sports-and-activities",
    stage: "getting-settled",
    title: "Sport, fitness and outdoor activities",
    summary: "Jiu-jitsu and fitness classes for children and adults at the University sports center, gym access, and outdoor trips, with schedules and prices.",
    bodyHtml: `
<p>Gyms in Madinah are men-only or women-only (see Everyday apps and services for usual prices). This page lists organised classes and trips for students and families. Details checked 8 November 2026.</p>
<h2>Jiu-jitsu, grappling and fitness at the Islamic University Sports Center</h2>
<p>Sunnah Strength runs classes for children and adults at the University's sports center. The coach is an American sports and fitness coach, a NASM and ASEP certified trainer and a jiu-jitsu black belt. The programme suits beginners and covers jiu-jitsu, grappling and wrestling, strength and fitness training, plyometrics, self-defence and sparring, and team-building challenges.</p>
<h3>Children</h3>
<p>Boys aged 5 to 14 and girls aged 5 to 11.</p>
<table><thead><tr><th>Days</th><th>Time</th></tr></thead><tbody>
<tr><td>Sunday, Tuesday and Thursday</td><td>2:00 to 3:00 pm</td></tr>
<tr><td>Monday and Wednesday (new)</td><td>5:30 to 6:30 pm</td></tr>
<tr><td>Saturday</td><td>10:00 am</td></tr>
</tbody></table>
<p>Monthly tuition: 275 SAR for one child, 250 SAR each for two or more children, and 200 SAR each for four or more children.</p>
<h3>Adults (15 and over)</h3>
<table><thead><tr><th>Days</th><th>Time</th></tr></thead><tbody>
<tr><td>Sunday, Tuesday and Thursday</td><td>1:00 to 2:00 pm</td></tr>
<tr><td>Monday and Wednesday (evening class)</td><td>6:30 to 7:30 pm</td></tr>
</tbody></table>
<p>Monthly tuition: 200 to 250 SAR. Adults aged 18 and over in the programme can also use the University gym facilities, including the CrossFit area and the pool and sauna.</p>
<p>Siblings, families and Islamic University students get discounts, so ask when you register. Private one-to-one training and swim lessons are also offered.</p>
<p>To register or ask a question, call or message on WhatsApp: <strong>+966 56 171 7539</strong>.</p>
<h2>Coming up: Muslim Scouts camping trip</h2>
<p>Blossom Star Tours is running a camping trip for fathers, sons and brothers on <strong>20 and 21 November 2026</strong> at Mundasa, Madinah. Activities include camping and survival skills, navigation and finding the qiblah, wudu, tayammum and Islamic rulings, father and son activities, jiu-jitsu, archery, a barbecue and campfire, Qur'an recitation, Islamic reminders, stories from the seerah, how to pitch a tent and practising the adhan for boys.</p>
<ul>
<li><strong>Adults:</strong> 130 SAR.</li>
<li><strong>University students and children aged 14 and under:</strong> 70 SAR.</li>
<li><strong>Families of three or more:</strong> discounts are available.</li>
</ul>
<p>There are only 25 places.</p>`,
  },
  {
    slug: "phone-sims-and-absher",
    stage: "getting-settled",
    title: "Your phone number, SIM checks and Absher",
    summary: "Find your own number and balance, see how many SIMs are registered on your iqama, remove one you do not know, and update your Absher mobile number.",
    bodyHtml: `
<p>Checked November 2026. Operators sometimes change their codes, so ask the operator if one stops working.</p>
<h2>Codes for your own number and balance</h2>
<table><thead><tr><th>Operator</th><th>Your number</th><th>Balance</th><th>Customer care</th></tr></thead><tbody>
<tr><td>Mobily</td><td>*222#</td><td>*1411#</td><td>1100</td></tr>
<tr><td>STC</td><td>*150#</td><td>*166#</td><td>900</td></tr>
<tr><td>Zain</td><td>*144#</td><td>*142#</td><td>959</td></tr>
</tbody></table>
<p>Dial the code from the SIM you want to check. Zain also shows your data balance if you send BC by SMS to 959.</p>
<h2>See how many SIMs are registered on your iqama</h2>
<p>The Communications, Space and Technology Commission (CST) runs a platform called Mutasil that lists the lines registered under your iqama. Only active, authenticated numbers show up. If one you use is missing, ask its operator to check its authentication.</p>
<ol>
<li><strong>Sign in to Mutasil with Nafath.</strong> Your registered numbers appear straight away.</li>
<li><strong>Use the My Numbers Inquiry without signing in.</strong> Choose English, enter your iqama number and date of birth, answer Yes to having a mobile number, enter that number and the captcha, then press Inquire. Type in the code sent to your phone and press Submit.</li>
<li><strong>No access to your registered number?</strong> Answer No to having a mobile number. You get a short summary, with fewer details.</li>
<li><strong>The CST app:</strong> sign in and open My Numbers (Argami).</li>
<li><strong>Tawakkalna:</strong> sign in and open the mobile number inquiry.</li>
</ol>
<blockquote><p>Note: These steps use an iqama number. If you are here on a Visitor ID, ask your operator in a branch which lines are registered to your passport.</p></blockquote>
<h2>A number you do not recognise</h2>
<ol>
<li>Contact the operator (STC 900, Mobily 1100, Zain 959, or a branch) with your iqama details ready, and ask them to cancel it.</li>
<li>File a complaint and keep the reference number.</li>
<li>If the operator has not fixed it within five working days, escalate to CST through its telecom complaints service.</li>
<li>Check Mutasil again to confirm the number is gone.</li>
</ol>
<h2>Update your mobile number in Absher</h2>
<p>Absher sends its verification codes to the number on file, so update it when you change your SIM. The new number must be active and able to receive SMS.</p>
<ul>
<li><strong>Absher app:</strong> before logging in, open Digital Identity Management, choose Change Mobile Number, enter your iqama or ID number and date of birth, enter the new number and finish the biometric check.</li>
<li><strong>Nafath app:</strong> open Digital Identity Account Management, choose Digital Identity Mobile Number Update, enter the details and finish the biometric check.</li>
<li><strong>Absher kiosk</strong> (at Jawazat offices, malls, airports and government service centres): choose your language, enter your iqama or ID number, choose Update Mobile Number, scan your fingerprint, then enter the new number and the code sent to it. This is the way to go if you no longer have your old number.</li>
</ul>
<p>Trouble activating Absher or Nafath in the first place? See the FAQ on activation problems.</p>`,
  },
  {
    slug: "iqama-and-exit-reentry-fees",
    stage: "getting-settled",
    title: "Iqama, exit and re-entry, and dependent fees",
    summary: "What Jawazat charges for the iqama, exit and re-entry visas, adding family and transfers. Checked November 2026.",
    bodyHtml: `
<blockquote><p>Important: these are Jawazat service fees, checked in November 2026. Other charges such as health insurance can apply separately, so confirm the final amount on Absher before you pay.</p></blockquote>
<p>Students on a study visa pay nothing for their own iqama. The fees below matter mostly for families and for anyone who travels.</p>
<h2>Iqama</h2>
<table><thead><tr><th>Who</th><th>Fee (SAR)</th></tr></thead><tbody>
<tr><td>Student with a study visa</td><td>Free</td></tr>
<tr><td>Dependent aged 18 and over, issue or renewal</td><td>500</td></tr>
<tr><td>Domestic worker, farmer or shepherd</td><td>600</td></tr>
<tr><td>Worker of a company or establishment</td><td>650</td></tr>
</tbody></table>
<h2>Exit and re-entry visa</h2>
<table><thead><tr><th>Visa</th><th>Fee (SAR)</th></tr></thead><tbody>
<tr><td>Single, up to 2 months, one trip</td><td>200</td></tr>
<tr><td>Each extra month on a single visa</td><td>100</td></tr>
<tr><td>Multiple, up to 3 months, several trips</td><td>500</td></tr>
<tr><td>Each extra month on a multiple visa</td><td>200</td></tr>
<tr><td>Final exit</td><td>Free</td></tr>
</tbody></table>
<p>Extra months must fall within the validity of your iqama.</p>
<h2>Adding family</h2>
<ul>
<li>Adding a dependent or newborn born inside Saudi Arabia: free.</li>
<li>Adding a dependent or newborn born outside Saudi Arabia: 2,000 SAR.</li>
</ul>
<h2>Visit visas</h2>
<ul>
<li>Extending a visit visa: 100 SAR each time.</li>
<li>Transit visa: 300 SAR.</li>
</ul>
<h2>Sponsorship transfer</h2>
<p>The first transfer costs 2,000 SAR, the second 4,000 SAR, and the third and every later one 6,000 SAR.</p>
<p>Visitor ID students pay none of the iqama fees above until they hold an iqama. See Visas for family members and visitors for the visit visa rules.</p>`,
  },
  {
    slug: "masjid-an-nabawi-first-visit",
    stage: "getting-settled",
    title: "Visiting Masjid an-Nabawi: a first-visit guide",
    summary: "What is inside the Prophet's Masjid, how to book the Rawdah, how to visit Al-Baqi', and the small habits that make a visit calm.",
    bodyHtml: `
<p>The masjid was first built by the Prophet ﷺ and his Companions in the first year after the Hijrah, and it has been expanded many times since. Most students and families go several times a week. These notes help the first few visits go smoothly.</p>
<h2>What to find inside</h2>
<table><thead><tr><th>Place</th><th>What it is</th></tr></thead><tbody>
<tr><td><strong>The Rawdah</strong> (الروضة الشريفة)</td><td>The space between the Prophet's ﷺ chamber and his minbar, marked by green carpet. Entry is by booking only.</td></tr>
<tr><td><strong>The Prophet's ﷺ chamber</strong></td><td>The resting place of the Prophet ﷺ, Abu Bakr and Umar. Visitors give salam quietly and briefly, keep moving and do not block those behind them.</td></tr>
<tr><td><strong>The minbar and the mihrab</strong></td><td>The pulpit and the prayer niche that mark the edge of the Rawdah.</td></tr>
<tr><td><strong>The Green Dome</strong></td><td>The dome over the chamber. The open courtyard on the south side gives the best view.</td></tr>
<tr><td><strong>King Fahd Holy Qur'an Library</strong></td><td>A multi-floor library inside the complex with rare and historic copies of the Qur'an. Hours vary and it closes around prayer times.</td></tr>
<tr><td><strong>Prophetic Biography Museum</strong></td><td>A multimedia exhibition on the life of the Prophet ﷺ and the story of the masjid, next to the western courtyards. A good first orientation for children.</td></tr>
<tr><td><strong>The courtyard umbrellas</strong></td><td>Large automatic parasols that open at dawn and close at dusk, so the courtyards stay shaded for prayer.</td></tr>
<tr><td><strong>Wudu areas and toilets</strong></td><td>Large facilities around the edge of the masjid, some underground and reached by ramps in the courtyards. They are cleanest just after a prayer and busiest just before.</td></tr>
</tbody></table>
<h2>Booking the Rawdah</h2>
<ol>
<li>Install the <strong>Nusuk</strong> app and sign in. Booking is free.</li>
<li>Choose a slot. Men and women have separate slots and separate times.</li>
<li>Book 1 to 2 days ahead in quiet weeks. In Ramadan, the Hajj season and school holidays, book 1 to 2 weeks ahead or more.</li>
<li>Keep the app open when you are at the masjid, because short-notice slots are sometimes released during the day.</li>
<li>Arrive at your booked time and follow the stewards. A visit inside the Rawdah is about 10 to 15 minutes.</li>
</ol>
<h2>Al-Baqi' cemetery</h2>
<p>Al-Baqi' is just east of the masjid, across the road. It is open to men only, usually after Fajr and after Asr. Bring your iqama or passport for the security check at the entrance.</p>
<h2>Small things that help</h2>
<ul>
<li>Come 20 to 30 minutes before a prayer if you want a place near the middle.</li>
<li>Carry a small bag with a zip. Larger bags are checked at security, and shoes go on shelves. The free left-luggage and bag rules are in the library FAQ.</li>
<li>Bring a small prayer mat for the open courtyards, because the marble gets hot at midday in summer.</li>
<li>Phone signal can drop at busy times. Agree a meeting point with your family before you separate.</li>
<li>Note the number of the gate you came in through. The masjid is huge and the exits look alike. Gate numbers can change during building work, so go by the signs.</li>
<li>Volunteers in beige vests near the main gates speak many languages and will point you the right way.</li>
</ul>
<blockquote><p>Tip: For the daily lessons inside the masjid, see the <a href="/duroos">Duroos</a> page. For the free Qur'an and mutun halaqat, see <a href="/programs">Study in Madinah</a>.</p></blockquote>
<p>See also <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba from Madinah</a> and <a href="/guides/historic-sites-and-masjids">Historic sites and masjids of Madinah</a>.</p>`,
  },
  {
    slug: "historic-sites-and-masjids",
    stage: "getting-settled",
    title: "Historic sites and masjids of Madinah",
    summary: "The masjids, battle sites, wells and farms worth visiting, grouped by area with approximate distances from the Haram.",
    bodyHtml: `
<p>Distances are approximate and measured from Masjid an-Nabawi. Most sites are a short taxi or ride-app trip, and several can be combined in one outing. Early morning or after Asr is best in the warm months.</p>
<h2>Close to the Haram</h2>
<table><thead><tr><th>Place</th><th>About</th></tr></thead><tbody>
<tr><td>Masjid al-Ghamamah</td><td>Where the Prophet ﷺ prayed for rain. A short walk south-west of the masjid.</td></tr>
<tr><td>Masjid Abu Bakr as-Siddiq</td><td>Next to Masjid al-Ghamamah.</td></tr>
<tr><td>Masjid Ali ibn Abi Talib</td><td>A small masjid within walking distance.</td></tr>
<tr><td>Masjid Bilal al-Habashi</td><td>Named for the Prophet's ﷺ muezzin, about 1 km away.</td></tr>
<tr><td>Masjid as-Suqya and its well</td><td>Where the Prophet ﷺ camped before Badr, about 2 km away.</td></tr>
</tbody></table>
<h2>Quba and the south</h2>
<ul>
<li><strong>Masjid Quba</strong> (about 4 km): the first masjid of Islam. Two rak'ahs after wudu at home carry the reward of an Umrah. Many people walk there on Saturdays along the Quba walkway, which is around 3 km and takes about 45 minutes.</li>
<li><strong>Masjid al-Jumu'ah</strong> (about 4 to 5 km): where the first Friday prayer was held in Madinah, on the way between the Haram and Quba.</li>
<li><strong>Masjid al-Qiblatayn</strong> (about 5 to 6 km): where the direction of prayer changed from Jerusalem to Makkah. Both original mihrabs are kept.</li>
<li><strong>Quba gardens:</strong> Bir Ariis and Bir al-Khatim are in the gardens near Quba, and the square around the masjid has family cafés.</li>
</ul>
<h2>Khandaq and Mount Sala'</h2>
<p>The Battle of the Trench took place in 5 AH around Mount Sala' (Sal'). Seven small masjids stand on its slope, including Masjid al-Fath, where the Prophet ﷺ made du'a, and masjids named for Salman al-Farisi and Umar ibn al-Khattab. The walk through the area takes about 40 minutes.</p>
<h2>Uhud</h2>
<p>Mount Uhud, about 5 km north of the Haram, is where the Battle of Uhud took place in 3 AH. The Shuhada cemetery at its foot holds seventy martyrs, including Hamzah ibn Abd al-Muttalib. A walk around the foot of the mountain takes about an hour. Masjid al-Mustarah is nearby.</p>
<h2>Wells and farms</h2>
<ul>
<li><strong>Bir Rumah (the well of Uthman):</strong> bought and given for the public by Uthman ibn Affan. It still gives water, and the dates of the surrounding farm are sold for charity.</li>
<li><strong>Bir Hā' (the garden of Abu Talhah)</strong> and the wells of Anas ibn Malik and Ghars are in working farms. Visits are by permission of the owner.</li>
<li><strong>Aliyat al-Madinah</strong> is the old farming belt. Some farms welcome visitors in the date harvest, late summer.</li>
</ul>
<h2>Further out</h2>
<p>Badr, Khaybar, Yanbu, AlUla and other places are covered in <a href="/guides/day-trips-from-madinah">Day trips from Madinah</a>.</p>
<blockquote><p>Note: Sites inside working farms are not open to everyone. Ask first, and leave nothing behind.</p></blockquote>`,
  },
  {
    slug: "day-trips-from-madinah",
    stage: "getting-settled",
    title: "Day trips and weekends away from Madinah",
    summary: "Badr, Khaybar, Yanbu, AlUla, Jeddah and more, with distance, drive time and the best months to go.",
    bodyHtml: `
<p>Distances and times are by road from Madinah. For anywhere over 300 km, a flight or the Haramain train is often easier. Checked November 2026.</p>
<table><thead><tr><th>Place</th><th>Distance</th><th>Drive</th><th>Good for</th></tr></thead><tbody>
<tr><td>Wadi al-Jinn</td><td>about 30 km</td><td>about 40 min</td><td>A half-day outing to the valley where cars seem to roll uphill. Any car will do and you need no guide.</td></tr>
<tr><td>Badr</td><td>about 130 km</td><td>1.5 to 2 h</td><td>The battlefield of the Battle of Badr, with a visitor centre and signs in Arabic and English. Leave after Fajr and be back by Maghrib. Take water and food, as services are limited.</td></tr>
<tr><td>Khaybar</td><td>about 160 km</td><td>about 2 h</td><td>The oasis and fortifications of the Battle of Khaybar, palm groves and the black lava fields. A 4WD helps in the lava fields.</td></tr>
<tr><td>Yanbu</td><td>about 230 km</td><td>2.5 to 3 h</td><td>Red Sea beaches, snorkelling and a corniche. Many people go for a Friday and Saturday.</td></tr>
<tr><td>AlUla and Hegra</td><td>about 340 km</td><td>3.5 to 4 h</td><td>The UNESCO World Heritage tombs of Hegra, the old town and the sandstone landscape. Plan two or three days and book entry through the official AlUla site.</td></tr>
<tr><td>Jeddah (Al-Balad)</td><td>about 420 km</td><td>4 to 5 h</td><td>The old town, corniche and seafood. The Haramain train takes about 2 hours.</td></tr>
<tr><td>Tabuk</td><td>about 700 km</td><td>7 to 8 h</td><td>The Tabuk fort and the route to the north-west coast. A flight is the practical choice.</td></tr>
</tbody></table>
<blockquote><p>Tip: October to April is the best time for every trip above. In summer, set out at dawn and avoid the middle of the day.</p></blockquote>
<h2>Before you go</h2>
<ol>
<li>Fill the tank and carry at least 10 litres of water per person for desert roads.</li>
<li>Check the weather. Heavy rain can cause flash floods in wadis in winter.</li>
<li>Tell someone your route. Mobile signal fades more than 30 km from the city.</li>
<li>Keep your iqama or passport and your car papers with you for police checkpoints.</li>
</ol>
<p>Hiring a car needs a licence your country is recognised for, and some companies ask for residency. See <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</p>`,
  },
  {
    slug: "seasons-and-camping",
    stage: "getting-settled",
    title: "Madinah by season, and where to camp",
    summary: "What each season feels like, when the crowds peak, and the rules and places for camping around the city.",
    bodyHtml: `
<h2>The year in Madinah</h2>
<table><thead><tr><th>Season</th><th>Typical temperatures</th><th>What it is like</th></tr></thead><tbody>
<tr><td>Winter, November to February</td><td>12 to 24°C</td><td>Cool and dry, the best weather for walking and trips. Nights are cold in the open courtyards, so bring a layer for Maghrib and Isha. It is also the busiest Umrah period.</td></tr>
<tr><td>Spring, March to May</td><td>18 to 35°C</td><td>Pleasant in March and early April, hot by late May. Dust storms can come, mostly from March to May.</td></tr>
<tr><td>Summer, June to August</td><td>32 to 45°C</td><td>Very hot. Do outdoor things before 9 am or after 6 pm and drink water all day. The date harvest runs in late summer.</td></tr>
<tr><td>Autumn, September to October</td><td>25 to 38°C</td><td>The heat breaks and crowds are lighter, especially after the Hajj season.</td></tr>
</tbody></table>
<h2>When it is busiest</h2>
<ul>
<li><strong>Hajj</strong> (8 to 13 Dhul Hijjah, moving earlier each year): hotels are at their highest prices and traffic around the Haram is heavy.</li>
<li><strong>The last 10 nights of Ramadan:</strong> huge crowds for Tahajjud. Daytime is quiet, and life and shopping start after Maghrib.</li>
<li><strong>December to February:</strong> the main Umrah season, with high but steadier numbers.</li>
<li>Late September to mid November and late February to March have the best mix of weather and calm.</li>
</ul>
<h2>Camping</h2>
<p>Camping in open desert and wadis is a favourite weekend activity. Day or weekend camping in open areas is generally fine, but protected reserves need permission from the authority that runs them, and the signed heritage zones around Uhud must be respected.</p>
<ul>
<li><strong>Fires:</strong> charcoal and gas stoves are the norm. Never light a fire inside a protected reserve or a city park, and check for fire restrictions in summer.</li>
<li><strong>Rubbish:</strong> take everything back with you, including charcoal ash and food scraps. Bring big bin bags.</li>
<li><strong>Water and safety:</strong> carry at least 10 litres per person per day, tell someone your route, and avoid wadis when rain is forecast.</li>
<li><strong>Wildlife:</strong> shake out your shoes in the morning and keep away from stray dogs and camels.</li>
<li><strong>Jumu'ah:</strong> plan to be back in Madinah or at a nearby village masjid for Friday prayer.</li>
</ul>
<h3>Places people camp</h3>
<table><thead><tr><th>Place</th><th>Notes</th></tr></thead><tbody>
<tr><td>Al-Hamra desert, north of the city</td><td>Open red sand, no shade or water. 4WD advised.</td></tr>
<tr><td>King Fahd Park</td><td>Day use only. Picnic shelters and barbecue areas.</td></tr>
<tr><td>Road towards Khaybar</td><td>Higher, rocky ground that is cooler on summer evenings. Check the weather for flash floods.</td></tr>
<tr><td>Wadi al-Aqiq</td><td>Flat, firm sand stretches within about 30 km of the Haram. Best from October to March.</td></tr>
<tr><td>Wadi al-Naqi</td><td>A wide sandy wadi south of the city that families like. Best from October to April.</td></tr>
<tr><td>Foothills of Mount Uhud</td><td>Public side only, away from the heritage zones.</td></tr>
</tbody></table>
<h3>Gear</h3>
<p>Amazon.sa, Decathlon (online) and Noon deliver to Madinah in 1 to 3 days. Traditional camping gear such as charcoal grills, dallah pots and floor mats is sold in the shops around Souq al-Manakhah.</p>
<p>Organised trips are listed in <a href="/guides/sports-and-activities">Sport, fitness and outdoor activities</a>.</p>`,
  },
  {
    slug: "dates-of-madinah",
    stage: "getting-settled",
    title: "Dates of Madinah: the varieties and how to buy",
    summary: "The main varieties sold in Madinah, what each is like, and how to buy good dates to eat or take home.",
    bodyHtml: `
<p>Madinah's date farms are among the oldest in Arabia. Every souk sells many varieties, and the choice can be bewildering at first. This guide lists the ones you will see.</p>
<table><thead><tr><th>Variety</th><th>What it is like</th></tr></thead><tbody>
<tr><td><strong>Ajwa</strong> (عجوة)</td><td>The best known of all. Nearly black, soft, a little chewy, with a deep sweetness. Grown almost only in the Madinah area. It is the date of the Sunnah of eating seven in the morning.</td></tr>
<tr><td><strong>Anbara</strong> (عنبرة)</td><td>Long, plump and golden, with a caramel and honey flavour. The most expensive of the common varieties and a favourite for gifts.</td></tr>
<tr><td><strong>Khalas</strong> (خلاص)</td><td>Light brown and soft with a buttery sweetness. It comes originally from Al-Hasa. Popular for stuffing with almonds or cream cheese.</td></tr>
<tr><td><strong>Mabroum</strong> (مبروم)</td><td>Long and reddish brown, firmer and less syrupy. A popular choice for iftar.</td></tr>
<tr><td><strong>Safawi</strong> (صفاوي)</td><td>Dark brown to black like Ajwa but smaller, drier and less sweet. Keeps well.</td></tr>
<tr><td><strong>Saghai</strong> (صغاي)</td><td>Yellow tipped and brown bodied, crunchy when fresh and softer with storage. An everyday family date, good value.</td></tr>
<tr><td><strong>Sukkari</strong> (سكري)</td><td>Golden and honey sweet, soft, very rich. Best fresh in the late summer harvest, in small servings.</td></tr>
</tbody></table>
<h2>Buying well</h2>
<ul>
<li><strong>Buy in Madinah.</strong> Good dates are usually cheaper here than back home for the same grade.</li>
<li><strong>Start with a sampler box.</strong> Many shops sell a mixed box of several varieties. Try that first, then buy a kilo of the ones you liked.</li>
<li><strong>Check your Ajwa.</strong> Good Ajwa is firm and slightly dry with a wrinkled skin. Very soft, shiny, sticky ones are often another variety.</li>
<li><strong>Go in the late afternoon.</strong> Shops are cooler and quieter, and sellers have more time for you.</li>
<li><strong>Taking them on a plane?</strong> Ask the shop to vacuum pack them for travel.</li>
<li><strong>Harvest season:</strong> the main harvest is late summer. Some farms in the Aliyat al-Madinah area welcome visitors then.</li>
</ul>`,
  },
  {
    slug: "doctors-hospitals-and-pharmacies",
    stage: "getting-settled",
    title: "Doctors, hospitals, pharmacies and emergency numbers",
    summary: "Emergency numbers, where to go for care, the main hospitals and pharmacy chains, and health apps.",
    bodyHtml: `
<h2>Emergency numbers</h2>
<table><thead><tr><th>Number</th><th>For</th></tr></thead><tbody>
<tr><td><strong>997</strong></td><td>Ambulance (Saudi Red Crescent)</td></tr>
<tr><td><strong>999</strong></td><td>Police</td></tr>
<tr><td><strong>998</strong></td><td>Civil Defence (fire)</td></tr>
<tr><td><strong>937</strong></td><td>Ministry of Health advice line, 24 hours, in Arabic and English</td></tr>
</tbody></table>
<h2>Where to go</h2>
<ul>
<li><strong>University students:</strong> start with the University clinic, which covers students. Many private clinics also give students big discounts (see <a href="/discounts">Student discounts</a>).</li>
<li><strong>Minor illness:</strong> a private clinic is quickest. A GP visit usually costs 100 to 200 SAR (see <a href="/guides/cost-of-living">What it costs to live in Madinah</a>).</li>
<li><strong>Emergencies:</strong> go to the nearest hospital emergency department, or call 997.</li>
<li><strong>Visitors:</strong> on a visit visa you pay for care yourself, so keep health insurance and some money aside.</li>
</ul>
<h2>Main hospitals</h2>
<p>Listed alphabetically. Prices and services differ, so ask before booking.</p>
<ul>
<li>Dr. Sulaiman Al Habib Hospital (private)</li>
<li>Hayat National Hospital (private)</li>
<li>King Fahd Hospital (government)</li>
<li>Madina National Hospital (private)</li>
<li>Mouwasat Hospital (private)</li>
<li>Saudi German Hospital (private)</li>
<li>Uhud Hospital</li>
<li>Zahra Hospital (private)</li>
</ul>
<p>Delivery fees, husband and companion rules, and the free option for University wives are in <a href="/guides/having-a-baby-in-madinah">Having a baby in Madinah</a>.</p>
<h2>Pharmacies</h2>
<p>Al Dawaa and Al Nahdi are the two big chains, with branches across the city and some open round the clock. Most staff speak English. Bring the box or the name of the medicine you take, and a copy of the prescription for anything stronger than basics.</p>
<h2>Health apps</h2>
<ul>
<li><strong>Altibbi:</strong> video consultations and a medical information library.</li>
<li><strong>Cura:</strong> video consultations with doctors in many specialties, with prescriptions delivered.</li>
<li><strong>Sehhaty:</strong> the Ministry of Health app for residents, for appointments and records.</li>
</ul>
<h2>Insurance</h2>
<p>To check that your health insurance is valid, see the FAQ on checking insurance.</p>`,
  },
  {
    slug: "other-universities-in-madinah",
    stage: "study",
    title: "Other universities in Madinah",
    summary: "Prince Mugrin, Saudi Electronic University and Taibah University: what each offers, and where the Islamic University fits.",
    bodyHtml: `
<p>The Islamic University is the main route for international students, with a full scholarship and the Ma'had al-Lughah for Arabic. Madinah has other universities too. Admission rules, fees and languages of teaching differ for each, so always check the university's own admissions page before applying.</p>
<h2>The universities</h2>
<table><thead><tr><th>University</th><th>Type</th><th>Known for</th></tr></thead><tbody>
<tr><td><strong>Islamic University of Madinah</strong></td><td>Public, founded 1961</td><td>Shariah, Qur'an, hadith, da'wah and Arabic, with scholarships for students from around the world. See <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</td></tr>
<tr><td><strong>Prince Mugrin University</strong></td><td>Private, founded 2014</td><td>Business and hospitality, engineering and technology, computing, and architecture and design. Teaching is mainly in English and students pay tuition.</td></tr>
<tr><td><strong>Saudi Electronic University, Madinah branch</strong></td><td>Public, online and blended</td><td>Business administration, computing and information sciences, health sciences, and education and language studies, mixing online study with some on-campus sessions.</td></tr>
<tr><td><strong>Taibah University</strong></td><td>Public, founded 2003</td><td>A full range of colleges including medicine, engineering, computer science, pharmacy, education, Shariah and business, with its own teaching hospital.</td></tr>
</tbody></table>
<h2>Choosing</h2>
<ul>
<li><strong>Want Islamic sciences and Arabic?</strong> The Islamic University is built for that. Other routes are in <a href="/programs">Study in Madinah</a>.</li>
<li><strong>Want a professional degree in English?</strong> Look at private universities such as Prince Mugrin.</li>
<li><strong>Need flexible hours?</strong> Online and blended programmes suit people who work or have family duties.</li>
<li><strong>Staying on a visa?</strong> Degree study needs a student visa. See <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</li>
</ul>`,
  },
];

export type SeedFaq = { slug: string; question: string; category: string; answerHtml: string; tags?: string[] };

export const FAQS_2026: SeedFaq[] = [
  { slug: "defer-my-place", category: "university", question: "Can I defer my place at the University?", answerHtml: "<p>Yes. The University allows new students to defer for up to two years. Request it through the University before the semester starts. There have been reports that students who came on the new electronic study visa were told deferral was not available to them, so check your own case before you plan around it.</p>" },
  { slug: "is-housing-included", category: "university", question: "Is housing included for scholarship students?", answerHtml: "<p>Yes. Scholarship students are housed by default, either inside the Jamiah or in the Rabwa halls (الربوة). The University's housing office allocates your room.</p>" },
  { slug: "istiqdam-deposit", category: "family", question: "Can I sponsor my family, and what is the deposit?", answerHtml: "<p>Students can ask the University to sponsor a family member (istiqdam). The latest amount quoted for the family residency deposit is 30,000 SAR (November 2025). Earlier reports quoted 10,000 SAR (January 2025). Confirm the amount, and whether requests are open, with the University before you pay.</p>" },
  { slug: "join-mesh-group", category: "getting-started", question: "How do I join the MESH WhatsApp group?", answerHtml: "<p>Tap any \"Join the group\" button on this site. Keep posts relevant, share only verified information, and no debates. The full rules are on the More page.</p>" },
  { slug: "how-to-apply-iu", category: "getting-started", question: "How do I apply to the Islamic University of Madinah?", answerHtml: "<p>Through the national Study in Saudi portal (studyinsaudi.sa) when applications open. You can choose up to 25 programmes across several universities and edit your application until the deadline. See <a href=\"/programs/iu-madinah\">Islamic University of Madinah</a> for the steps and a video walkthrough.</p>" },
  { slug: "stipend-amount", category: "university", question: "How much is the University stipend?", answerHtml: "<p>Fully funded scholarship students receive a monthly stipend (mukafa'ah) of 840 SAR, as well as housing and flights. The stipend stops during ta'jeel or i'tithaar.</p>" },
  { slug: "learn-arabic-before-iu", category: "getting-started", question: "Where can I learn Arabic in Madinah before getting into the University?", answerHtml: "<p>There are several options. Year-round institutes such as Ahlul Athar, Mutun al-Ijaz and Taba charge from about 350 SAR a month. The <a href=\"/programs/map\">Madinah Arabic Program</a> runs one-month intensives on the University campus. More options, with fees and dates, are on <a href=\"/programs\">Study in Madinah</a>.</p>" },
  { slug: "sisters-study", category: "family", question: "Where can sisters study Arabic and Islamic sciences?", answerHtml: "<p>There are free marakiz for sisters (Mishkat, Taibah, Academiyah al-Ma'rifah), the Masjid an-Nabawi Ma'had and Kulliyah for women, and paid options such as Fusha, Taba (now open to women) and MAP's sisters' classes. See <a href=\"/programs\">Study in Madinah</a>.</p>" },
  { slug: "monthly-budget", category: "getting-settled", question: "How much money do I need per month in Madinah?", answerHtml: "<p>Roughly 2,900 to 6,700 SAR for a single person renting their own place, and 6,300 to 12,800 SAR for a family of three or four. Scholarship students in the halls spend far less. Full breakdown: <a href=\"/guides/cost-of-living\">What it costs to live in Madinah</a>.</p>" },
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
  { slug: "absher-nafath-activation", category: "getting-settled", question: "My Absher or Nafath activation keeps failing. What do I do?", answerHtml: "<p>This happens to many new students on the student visa. Call Absher customer care on <strong>920020405</strong>, choose English and enter your border number. Ask them to open a technical support ticket, and say you are a new international scholarship student on a student visa with a border number. The fix can take a few days, and they may send you a temporary password.</p>", tags: ["absher", "nafath", "visa", "new students"] },
  { slug: "find-my-timetable", category: "university", question: "Where do I find my class timetable?", answerHtml: "<p>In the University's Academic System, open <strong>Electronic Registration</strong> (التسجيل الإلكتروني), then <strong>Registered Courses</strong> (المقررات المسجلة). Timetables appear in batches in the days before classes start, so check again if yours is empty.</p>", tags: ["timetable", "schedule", "registration"] },
  { slug: "rent-on-student-visa", category: "getting-settled", question: "Can I register a rental contract on a student visa?", answerHtml: "<p>Yes. Find a flat and agree the terms, then contact a real-estate agent from Ejar's official list of accredited agents. The agent registers the contract on Ejar for you.</p>", tags: ["ejar", "rent", "housing", "visa"] },
  { slug: "library-bags-laptops", category: "university", question: "Can I take a bag or laptop into the libraries?", answerHtml: "<p><strong>University Central Library:</strong> laptops are allowed but bags are not, so take the laptop out first. There are sockets. The private study rooms are for graduate students.</p><p><strong>Masjid an-Nabawi library:</strong> no bags, no food and no laptops without a permit. Tablets and notebooks are fine. The rules are applied strictly after about 2 pm. Leave your bag at the free left-luggage at the front left of the mosque, for up to 4 hours with a ticket.</p>", tags: ["library", "laptop", "haram", "study"] },
  { slug: "blackboard-phishing", category: "university", question: "Someone posted a link in my Blackboard class chat. Is it safe?", answerHtml: "<p>Do not open it. Fake accounts posing as students post links named things like \"timetable\" or \"class WhatsApp group\". Opening one can hand over your University account, and with it they can withdraw you from your courses. Report the account, leave the group, and warn your class.</p>", tags: ["blackboard", "security", "phishing", "account"] },
  { slug: "leaving-steps", category: "leaving", question: "What do I need to do when I graduate?", answerHtml: "<p>Hand back your room, return your student card, get your final exit visa, collect your degree, legalise your documents, and book your ticket. The full checklist is in <a href=\"/guides/graduate-procedures\">Graduating</a>.</p>" },
  { slug: "check-sims-on-iqama", category: "getting-settled", question: "How do I see how many SIMs are registered under my iqama?", answerHtml: "<p>Sign in to Mutasil with Nafath, or use the My Numbers Inquiry with your iqama number, date of birth and a code sent to your registered phone. The CST app and Tawakkalna also show your numbers. If you find one you do not know, ask its operator to cancel it. Steps are in <a href=\"/guides/phone-sims-and-absher\">Your phone number, SIM checks and Absher</a>.</p>", tags: ["sim", "iqama", "mutasil", "cst"] },
  { slug: "change-absher-mobile", category: "getting-settled", question: "How do I change the mobile number on my Absher account?", answerHtml: "<p>Three ways: in the Absher app (Digital Identity Management, then Change Mobile Number), in the Nafath app (Digital Identity Mobile Number Update), or at an Absher kiosk in a Jawazat office, mall or airport. The app methods need a biometric check, and the kiosk works even if you lost your old number. Details: <a href=\"/guides/phone-sims-and-absher\">Your phone number, SIM checks and Absher</a>.</p>", tags: ["absher", "nafath", "mobile number"] },
  { slug: "short-address", category: "getting-settled", question: "What is a short address and how do I find mine?", answerHtml: "<p>It is an eight character code, four letters then four digits, that stands for your full National Address. It is used for deliveries and some official forms. You need a registered National Address first. Then find the code in Absher (My Services, then National Address Services), on the Saudi Post website after signing in with Nafath, or in the Saudi Post app. If you move, update your National Address, because the code changes with it.</p>", tags: ["national address", "short address", "delivery", "saudi post"] },
  { slug: "check-health-insurance", category: "getting-settled", question: "How do I check that my health insurance is valid?", answerHtml: "<p>Iqama holders can check on the Council of Health Insurance website, on the Insurance Authority website (free, and the one that works from abroad), in the Tawakkalna app, in Absher (health insurance validity inquiry) or in the CHI Daman app. Enter your 10 digit iqama number and check the insurer and expiry date. Insurance expiry is separate from your iqama expiry. If nothing shows, retry and then ask your insurer.</p>", tags: ["insurance", "chi", "health", "iqama"] },
  { slug: "send-money-home", category: "getting-settled", question: "How do I send money home from Madinah?", answerHtml: "<p>Apps and services in common use include Alinma, Barq, D360, Enjaz, Mobily Pay, SNB NEO, STC Pay and STC Bank, Tahweel Al Rajhi, Tiqmo and urpay. What you can use depends on your ID and bank account. Fees, exchange rates and speed differ and change, so compare the final amount your family receives after fees, not the headline rate. Checked November 2026.</p>", tags: ["remittance", "money transfer", "bank", "apps"] },
  { slug: "emergency-numbers", category: "getting-settled", question: "What are the emergency numbers in Saudi Arabia?", answerHtml: "<p>Ambulance (Saudi Red Crescent): <strong>997</strong>. Police: <strong>999</strong>. Civil Defence (fire): <strong>998</strong>. The Ministry of Health advice line is <strong>937</strong>, 24 hours, in Arabic and English. More in <a href=\"/guides/doctors-hospitals-and-pharmacies\">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>", tags: ["emergency", "ambulance", "police", "health"] },
  { slug: "best-time-to-visit-madinah", category: "getting-settled", question: "What is the best time of year in Madinah?", answerHtml: "<p>November to February has the best weather (about 12 to 24°C) but is the busiest Umrah period. Late September to mid November and late February to March mix good weather with calmer crowds. Summer reaches 45°C, so do outdoor things early or late. See <a href=\"/guides/seasons-and-camping\">Madinah by season, and where to camp</a>.</p>", tags: ["weather", "season", "summer", "winter"] },
];
