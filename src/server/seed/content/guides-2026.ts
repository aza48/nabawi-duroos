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
<tr><td>Bed or room in a shared flat</td><td>A single student</td><td>300 to 1,000</td></tr>
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
<tr><td>Bread, one pack</td><td>3 to 5</td></tr><tr><td>Milk, 1 litre</td><td>6</td></tr>
<tr><td>Chicken, 1 kg</td><td>25 to 30</td></tr><tr><td>Beef, 1 kg</td><td>40 to 50</td></tr>
<tr><td>Rice, 5 kg</td><td>50</td></tr><tr><td>Eggs, 30</td><td>25</td></tr>
<tr><td>Drinking water, 19 litres</td><td>8</td></tr><tr><td>Fruit and vegetables, per kg</td><td>4 to 12</td></tr>
<tr><td>Meal at a mid-range restaurant</td><td>25 to 40</td></tr>
</tbody></table>
<p>Cooking at home costs around 10 to 15 SAR a meal. Bin Dawood, Carrefour, LuLu, Othaim and Panda are the big supermarkets, and the "5 riyal" shops are excellent for household basics.</p>
<h2>Bills</h2>
<ul>
<li><strong>Electricity:</strong> 100 to 300 SAR a month in winter, 200 to 800 in summer because of air conditioning.</li>
<li><strong>Water:</strong> 30 to 70 SAR.</li>
<li><strong>Home internet:</strong> around 250 to 300 SAR, but it needs an iqama. A data SIM in a portable router is the usual workaround.</li>
<li><strong>Mobile:</strong> 100 to 150 SAR on STC, Mobily or Zain.</li>
</ul>
<h2>Getting around</h2>
<p>A city bus ride is 3.45 SAR, a Careem or Uber ride across town is 10 to 30 SAR, and petrol is 2.18 SAR a litre for 91 and 2.33 for 95 (November 2026). See the getting-around guide for the details.</p>
<h2>Health</h2>
<p>On a visit or business visa there is no free healthcare. The insurance that comes with the visa covers emergencies only, so routine visits are paid by you. A GP visit is 100 to 200 SAR, a specialist 150 to 300, a dental check and clean 150 to 250, and an emergency visit 300 to 500. Keep 500 to 800 SAR aside for surprises. Scholarship students are treated free at the University Medical Center, and many private clinics give students and staff big discounts (see Student discounts).</p>
<h2>A realistic monthly budget</h2>
<table><thead><tr><th>Item</th><th>Single person</th><th>Family of 3 or 4</th></tr></thead><tbody>
<tr><td>Rent (shared room or small flat)</td><td>1,000 to 2,000</td><td>3,000 to 4,000</td></tr>
<tr><td>Groceries and household</td><td>1,000</td><td>2,000</td></tr>
<tr><td>Bills</td><td>300 to 600</td><td>400 to 800</td></tr>
<tr><td>Transport</td><td>300 to 1,000</td><td>300 to 1,000</td></tr>
<tr><td>Medical</td><td>0 to 600</td><td>0 to 1,000</td></tr>
<tr><td>Study and books</td><td>200 to 1,200</td><td>200 to 2,000</td></tr>
<tr><td>Everything else</td><td>100 to 300</td><td>400 to 2,000</td></tr>
<tr><td><strong>Total (SAR)</strong></td><td><strong>about 2,900 to 6,700</strong></td><td><strong>about 6,300 to 12,800</strong></td></tr>
</tbody></table>
<p>The family budget does not include school fees. Kindergarten alone is around 4,000 SAR a year per child (see Kindergartens and schools).</p>
<blockquote><p>Note: Single students on a full University scholarship live in the halls of residence and receive a monthly stipend, so their costs are far lower than this.</p></blockquote>
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
<p>Bring your passport with a valid visa and your border number (the entry number linked to your visa), or your iqama if you have one. You can buy a SIM at the airport, in malls, or at any operator's shop. The shop scans your fingerprint and registers the line to you: to your passport and border number if you are on a visa or Visitor ID, or to your iqama if you have one. Buy a real Saudi SIM rather than a data-only eSIM, because banks and Absher send their codes by SMS. New students on the educational visa need this number before anything else, because Absher is registered with it.</p>
<p>Coverage and prices change from area to area and month to month, so compare the current bundles of each operator and ask students in your building which network works best there.</p>
<h2>Internet at home</h2>
<p>Fixed home internet (about 250 to 300 SAR a month) needs an iqama. Without one, buy a portable router, put an unlimited-data SIM in it, and you have Wi-Fi for the whole flat.</p>
<h2>A local bank account</h2>
<p>Since September 2025 the Saudi Central Bank lets visitors with a Visitor ID open an account and get a debit card, which used to need an iqama. The steps differ for the two groups.</p>
<h3>With an iqama</h3>
<ol>
<li>Make sure you have a Saudi mobile number registered to your iqama.</li>
<li>Open the account in the bank's app, signing in with Nafath, or at a branch with your iqama.</li>
<li>Order your mada debit card.</li>
</ol>
<h3>With a Visitor ID</h3>
<ol>
<li>Make sure you have a Saudi mobile number in your name, linked to your Absher account.</li>
<li>Activate Nafath, which online account opening uses to confirm who you are, then issue your Visitor ID in Absher and make sure it shows as active.</li>
<li>Register your National Address with Saudi Post. The bank records your address in Saudi Arabia, your home address abroad and the purpose of your stay.</li>
<li>Open the account in one of two ways. <strong>At a branch:</strong> take your passport and show your Visitor ID in the Absher app. <strong>Online:</strong> apply in the bank's app or website and confirm your identity through Nafath. Each bank sets its own extra conditions, so if one turns you away, try another bank.</li>
<li>Your account number arrives by text message. Collect your mada debit card at the branch or ask for it to be posted to your National Address.</li>
</ol>
<p>A Visitor ID account works only while your Visitor ID and your stay are valid. When the ID expires the bank freezes the account until it is renewed, so renew your visa in good time.</p>
<blockquote><p>Tip: A mada card is worth having. Some shops take only mada or cash, foreign cards are sometimes blocked by bank security checks, and you need a local card to pay bills and government fees.</p></blockquote>
<p>Already have a SIM? See <a href="/guides/phone-sims-and-absher">Your phone number, SIM checks and Absher</a> for codes, SIM checks and updating your Absher number.</p>
<p>University students: the stipend is paid onto <a href="/guides/getting-your-stipend-off-the-university-card">the University stipend card</a>, not into an account you open yourself. Your own account is for receiving money from home and moving your stipend across. See <a href="/guides/new-student-steps">First steps for new students</a>.</p>`,
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
<li><strong>City buses:</strong> 3.45 SAR a ride on the city routes. The airport route has its own fare, shown in the Madinah Bus app. Each ticket is for one bus, so changing bus means paying again. Cash is not accepted on board: tap a mada, Visa or Mastercard card or your phone, or pay in the Madinah Bus app, which also sells day, week and month passes (10, 60 and 240 SAR). Customer service: 920000877.</li>
<li><strong>From the Haramain station:</strong> the station is in Al Hadra, about 9 km from the Haram. Express bus route 300 runs between the station and the central bus station by the Prophet's Mosque, or take a ride app.</li>
<li><strong>Ride apps:</strong> Bolt, Careem, Jeeny and Uber. Expect 10 to 30 SAR across town, and more just after the prayers at the Haram, especially Jumu'ah, when prices surge.</li>
<li><strong>Quba walkway:</strong> small electric carts run along the Quba walkway between the Haram and Masjid Quba for about 10 to 20 SAR. Agree the price before you get in.</li>
</ul>
<h2>Driving</h2>
<p>On a visit visa you can drive with your own licence if Saudi Arabia recognises your country's licence. Bring an International Driving Permit too, because rental companies usually ask for one, and always carry the original licence, not a photo of it. Buying or registering a car needs an iqama. Many rental companies also ask for residency, but private rentals are common, and students rent out their cars over the summer for 1,500 to 3,500 SAR a month.</p>
<p>Petrol costs 2.18 SAR a litre for 91 and 2.33 for 95 (November 2026). Traffic fines appear in Absher under Violations.</p>
<h2>To Makkah for Umrah</h2>
<table><thead><tr><th>How</th><th>Time</th><th>Cost (SAR)</th></tr></thead><tbody>
<tr><td>Haramain high-speed train</td><td>about 2 h 20 min</td><td>base fare 162 economy, plus 15% VAT; fares change with demand</td></tr>
<tr><td>Shared taxi from the stands near Masjid Bilal or Top 10</td><td>4.5 to 5 h</td><td>40 to 50 per seat</td></tr>
<tr><td>Intercity coach</td><td>6 to 7 h</td><td>about 85 to 100</td></tr>
<tr><td>Own car (about 420 km)</td><td>4.5 to 5 h</td><td>petrol</td></tr>
</tbody></table>
<h3>Riding the Haramain train</h3>
<ul>
<li>Book on the Haramain railway's website or app, or in the Nusuk app, and read the change and refund rules before you pay.</li>
<li>Each traveller enters an ID when booking (iqama, passport or Saudi ID). Carry that same ID on the day, because it is checked against the ticket.</li>
<li>Each passenger may bring one bag of up to 25 kg (65 by 55 by 35 cm) and one small hand bag. Extra luggage is not allowed on board.</li>
<li>There is a security check before the platform, so arrive at least 30 minutes early.</li>
</ul>
<blockquote><p>Tip: Train fares rise with demand, so book early for Ramadan, Fridays and holidays.</p></blockquote>`,
  },
  {
    slug: "etimad-account",
    stage: "study",
    title: "Your University ticket: Etimad, the travel order and the rules",
    summary: "Who gets the arrival, yearly and final tickets and how each is requested, setting up Etimad so your details match your passport, how group tickets arrive, the 2026 ticket rules, changing a date for an exam clash, and what to do when a ticket is stuck.",
    bodyHtml: `
<p>Checked November 2026. Full scholarship students receive a discounted economy ticket home and back at the end of each academic year, an arrival ticket when they first come, and a final ticket when they graduate. Every one of them is a government ticket: the University issues a travel order (أمر إركاب) on Etimad, the government platform, and a travel agency books the flight against it. No travel order, no ticket. This guide covers the account, the yearly ticket from request to boarding, and the rules.</p>
<h2>Who gets a ticket, and when</h2>
<table><thead><tr><th>Ticket</th><th>Who</th><th>How it is requested</th></tr></thead><tbody>
<tr><td>Arrival ticket</td><td>New full scholarship students</td><td>On Minhati, with your passport and visa uploaded and your name exactly as in the passport. Travel Management prepares the order and the agency issues the ticket</td></tr>
<tr><td>Yearly ticket home</td><td>Full scholarship students, at the end of the academic year, unless another party already provides them with a ticket</td><td>Through Travel Management, which collects the travel lists months before the summer break, through your nationality representative and Etimad. Bachelor's and Ma'had students travel on group bookings with dates the University sets</td></tr>
<tr><td>Final ticket</td><td>Graduates, and students whose studies have ended</td><td>Issued only after Travel Management confirms your clearance in the University's records</td></tr>
<tr><td>Graduate studies</td><td>Students admitted to a master's or PhD</td><td>Through Travel Management on admission. Master's and PhD students get individual tickets, not group bookings</td></tr>
</tbody></table>
<p>Partial (internal) scholarships include no tickets. Family tickets are at your own cost. The Travel Administration issues no tickets during the academic year: travel in term, with your college's permission, is at your own cost. Unused student tickets are cancelled by Travel Management and their value goes back to the University, so a ticket you cannot use is best cancelled early.</p>
<h2>Setting up your Etimad account</h2>
<ol>
<li>Open <a href="https://portal.etimad.sa/">portal.etimad.sa</a> and choose Log in.</li>
<li>Pick <strong>Individuals</strong>, then sign in through <strong>Nafath</strong>.</li>
<li>Enter your mobile number and email, accept the terms and save.</li>
<li>Type in the code sent to your phone, then confirm the link sent to your email.</li>
<li>Back on the site, open <strong>Travel orders</strong> (أوامر الإركاب), then your <strong>Profile</strong>.</li>
<li>Press <strong>Edit profile</strong> and check every detail exactly matches your passport, then save. A confirmation message means you are done.</li>
</ol>
<blockquote><p>Note: A spelling mismatch between Etimad and your passport is the most common reason a ticket gets stuck. Fix it before you request your ticket.</p></blockquote>
<p>Do the first sign-in while you are in Saudi Arabia, through Nafath. After that the account also works from abroad. Keep the mobile number on the account alive, because the codes go there, and use an email address you read: your e-ticket is sent to the email on your Etimad profile.</p>
<h2>Check your ID number is on your University record</h2>
<p>Without your Visitor ID or iqama number in the Academic System, the Travel Administration cannot issue your tickets or visas. Check it in either of two ways:</p>
<ul>
<li>On the University website, open Travel and Visas (السفر والتأشيرات), sign in with your University login, open Students' Basic Information (المعلومات الأساسية للطلاب) and look under ID number (رقم الهوية).</li>
<li>Or open Academic Services (الخدمات الأكاديمية), then Academic Information (المعلومات الأكاديمية), and look under ID number (رقم الهوية).</li>
</ul>
<p>If it is empty or wrong, go to the Travel Administration (إدارة السفر) with your passport and ID before the summer travel lists close.</p>
<h2>From request to boarding pass</h2>
<ol>
<li><strong>Check your profile on Etimad</strong> early in the second semester: name, passport number, passport expiry, phone and email.</li>
<li><strong>Sign up when the University asks.</strong> Travel Management collects the summer lists months ahead, through your nationality representative or a form and Etimad. Choose your city from the ones set for your country, or say that you do not want a ticket. A student who misses the list gets no ticket. Graduating students are not on this list, because their final ticket is separate.</li>
<li><strong>Watch Etimad.</strong> Your travel order appears under Travel orders once it is approved. On a group booking the order sits under the group leader's name, so not seeing your own order there is normal.</li>
<li><strong>Find your ticket.</strong> Tickets come out in batches from mid April to mid May. A group ticket arrives as one PDF from Saudia, emailed to one student in the group, with everyone's tickets in it. Search all your email, spam and junk included, for "Saudia" and "flight confirmation", going back a month. If you receive a ticket that is not yours, pass it to your representative. Check the name, the dates and the airports the day you receive it.</li>
<li><strong>Get your own e-ticket from a group booking</strong> if you want one: in the Saudia app open Assistant, then Change or cancel flight, enter the booking reference and your last name and continue as if changing (nothing is changed), then choose Download e-tickets on the Saudia website.</li>
<li><strong>Do not book your own return.</strong> The ticket is a round trip, and the University books the return date for the start of the new year.</li>
<li><strong>Get your exit and re-entry visa</strong> if you hold an iqama, with dates that cover the whole trip. See <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>.</li>
<li><strong>Check in online</strong> and arrive early. A no-show loses the whole ticket.</li>
</ol>
<h2>The rules for student tickets</h2>
<p>The University issues a ticket only against an official travel order on Etimad, so no open tickets are issued. The rules for tickets issued from 2026:</p>
<ol>
<li><strong>Where to:</strong> one of the cities the University sets for each country, in your own country or in the country that issued the visa you arrived on. In summer 2026, for example, students going to the USA chose New York (JFK) or Washington DC (IAD). A connection beyond that city is a separate booking at your own cost.</li>
<li><strong>Validity:</strong> 3 months from the first travel date. After that no changes are possible.</li>
<li><strong>Name:</strong> the passenger name cannot be changed, which is why it must match your passport from the start.</li>
<li><strong>Airports:</strong> the destination and the departure and arrival airports of the outbound flight cannot be changed.</li>
<li><strong>Date and time:</strong> can be changed, but you pay the fare difference and any fees.</li>
<li><strong>Class:</strong> no downgrades. You can upgrade at your own cost.</li>
<li><strong>Cancelling:</strong> the ticket goes back to the University. There is no cash refund to you.</li>
<li><strong>Missing the flight:</strong> a no-show loses the whole ticket.</li>
<li><strong>Refund vouchers:</strong> after any change, no voucher goes to the student and nothing can be added to a wallet.</li>
<li><strong>Baggage:</strong> one cabin bag and two checked bags, within the airline's own limits.</li>
</ol>
<blockquote><p>Tip: Pick your date carefully before the travel order is issued. Changing it later costs you money, and missing the flight costs you the ticket.</p></blockquote>
<h2>Common problems</h2>
<table><thead><tr><th>Problem</th><th>What to do</th></tr></thead><tbody>
<tr><td>Nafath will not sign you in</td><td>Activate Nafath first: see <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a></td></tr>
<tr><td>Your name on the ticket differs from the passport</td><td>Tell Travel Management through Tawasul the same day. The name cannot be changed on the ticket, so the order has to be corrected before issue</td></tr>
<tr><td>No travel order after the list closed</td><td>Send a request through Tawasul to Travel Management with your University number and dates</td></tr>
<tr><td>You want a different city</td><td>You can only choose from the cities set for your country. An onward flight to another city is at your own cost, so book it as soon as your ticket arrives</td></tr>
<tr><td>No ticket email by mid May</td><td>Search every folder for "Saudia", ask the students in your group who received the group PDF, then ask your representative</td></tr>
<tr><td>You renewed your passport</td><td>Update Etimad and tell Travel Management before the order is issued</td></tr>
<tr><td>Your ticket date clashes with an exam</td><td>Send a Tawasul request to the Travel Administration asking to change the date, with a copy of the ticket and of your exam timetable. The date is then changed at the Saudia office on campus, at your own cost</td></tr>
<tr><td>You need another date on a group ticket, for Hajj for example</td><td>Only the date can change, never the route. Go to the Saudia office on campus and pay the difference</td></tr>
<tr><td>You will not use the ticket</td><td>Cancel it in person at Travel Management as soon as you are sure. There is no app for it. If you do nothing, you simply lose the ticket</td></tr>
</tbody></table>
<blockquote><p>Note: In the ticket season a Saudia office opens on campus for students changing travel dates. In 2026 it opened on 13 May, from 7:30 am to 3:00 pm on working days. Use this office, not Saudia branches in the city.</p></blockquote>
<p>Graduates: the final ticket comes after everything else is cleared, and the order of steps is in <a href="/guides/graduate-procedures">Leaving Madinah for good</a>. What the yearly ticket covers alongside your stipend is in <a href="/guides/scholarship-stipend-and-allowances">Your scholarship money: stipend, allowances and tickets</a>.</p>
<blockquote><p>Tip: Ticket stuck and Tawasul silent? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "kindergartens-and-schools",
    stage: "family",
    title: "Kindergartens and schools for your children",
    summary: "Kindergartens, how Saudi schooling is organised, the documents to enrol, Noor, changing school, typical fees, the free Qur'an and Islamic schools, and Qur'an circles in local masjids.",
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
<p>Government and Saudi private schools teach boys and girls separately. Many international schools teach them together in the early years, so check each school's own policy. International schools run English, Cambridge or national tracks alongside the Saudi curriculum. Several schools give Islamic University families a discount (see <a href="/discounts">Student discounts</a>).</p>
<h3>How Saudi schooling is organised</h3>
<table><thead><tr><th>Stage</th><th>Ages</th><th>Length</th></tr></thead><tbody>
<tr><td>Kindergarten (روضة)</td><td>3 to 6</td><td>Up to 3 years</td></tr>
<tr><td>Primary (ابتدائي)</td><td>From 6</td><td>6 years</td></tr>
<tr><td>Intermediate (متوسط)</td><td>From 12</td><td>3 years</td></tr>
<tr><td>Secondary (ثانوي)</td><td>From 15</td><td>3 years</td></tr>
</tbody></table>
<p>School days are Sunday to Thursday, from about 7:00 to 13:00 or 14:00.</p>
<h3>Documents for a school age child</h3>
<ul>
<li>The parent's iqama or Visitor ID, and passport.</li>
<li>The child's passport with a valid visa, or the child's iqama.</li>
<li>The birth certificate, attested and translated into Arabic.</li>
<li>The vaccination record.</li>
<li>School reports for the last two or three years, translated and attested if they are not in Arabic or English.</li>
<li>The leaving certificate from the last school.</li>
<li>Four to eight passport photos.</li>
</ul>
<h3>Noor, the Ministry's school system</h3>
<p>Once your child is accepted, the school registers him or her on Noor, the Ministry of Education's system. Reports and moves up a year are recorded there. Parents sign in to Noor with Nafath to see results, attendance and assessments.</p>
<h3>Changing school during the year</h3>
<ol>
<li>Make sure the new school has a place.</li>
<li>Ask the current school for a transfer certificate.</li>
<li>The new school completes the transfer on Noor.</li>
</ol>
<p>Private schools usually charge the full fee for the term you are in, so time a move for the end of a term.</p>
<h3>Private school fees</h3>
<p>Private schools on the Saudi track charge roughly 9,000 to 25,000 SAR a year, rising with each stage, and English-medium international tracks cost more. Uniforms, books and the school bus are extra, and the bus alone adds 3,000 SAR or more a year. Many schools give 10% off for brothers and sisters and take the fee in three instalments. Many close registration for the new year in late August, so apply in the spring or early summer.</p>
<h2>Free Qur'an and Islamic schools</h2>
<p>Listed alphabetically.</p>
<table><thead><tr><th>School</th><th>Ages and length</th><th>Who can join</th><th>What it asks</th></tr></thead><tbody>
<tr><td>Dar al-Hadith</td><td>From 11, for 6 years: 3 intermediate and 3 secondary</td><td>Children with an iqama</td><td>Reading and writing in Arabic; 2 to 3 juz memorised for intermediate, 4 to 5 for secondary; the last school certificate attested, translated into Arabic and equated at the Ministry of Education office; online registration, then a placement exam in person</td></tr>
<tr><td>Masjid an-Nabawi halaqat</td><td>From 5, no end date</td><td>Children and adults with an iqama or any visa</td><td>A passport with visa or an iqama, and a Saudi mobile number. Register at <a href="https://reg.qm.edu.sa/">reg.qm.edu.sa</a> any time of year</td></tr>
<tr><td>Masjid an-Nabawi Ma'had</td><td>From 12 for intermediate, from 15 for secondary, 3 years each</td><td>Iqama holders, with written consent from the sponsor</td><td>Arabic, Qur'an memorisation, a written exam and an interview. One registration window a year: see <a href="/guides/masjid-an-nabawi-institute-and-college">The Masjid an-Nabawi Institute and College</a></td></tr>
</tbody></table>
<ul>
<li>Dar al-Hadith teaches the Qur'an, the Islamic sciences, Arabic, history and maths, and pays its pupils a monthly allowance. Its graduates have priority for the Islamic University. A pupil aiming for another field, such as medicine or engineering, moves to a government secondary school after intermediate.</li>
<li>The halaqat meet after Fajr or Duha, between Asr and Maghrib, and between Maghrib and Isha, and some classes run online. They give small rewards for passed memorisation exams, paid into a bank account, so keep an IBAN letter from your bank ready.</li>
</ul>
<h2>Qur'an circles</h2>
<p>Most neighbourhood masjids run Tahfidh al-Qur'an circles after Asr or Maghrib, usually starting with Juz 'Amma, tajweed and reading. Ask the imam of your local masjid. Masjid an-Nabawi also runs halaqat for children (above).</p>`,
  },
  {
    slug: "umrah-rawdah-quba",
    stage: "getting-settled",
    title: "Umrah, the Rawdah and Quba from Madinah",
    summary: "How to book the Rawdah, visit Quba every Saturday, and get to Makkah for Umrah.",
    bodyHtml: `
<h2>Masjid Quba every Saturday</h2>
<p>Praying two rak'ahs in Masjid Quba after purifying yourself at home carries the reward of an Umrah, and the Prophet ﷺ used to visit it on Saturdays. It is 3 to 4 km from the Haram along the Quba walkway, about 45 minutes on foot, with electric carts for about 10 to 20 SAR (agree the price first). You need no booking to pray at Quba.</p>
<h2>The Rawdah</h2>
<ol>
<li>Install the <strong>Nusuk</strong> app and sign in.</li>
<li>Book a Rawdah slot. The permit is free and is issued straight away. Residents sign in with Nafath. Slots open in advance and go quickly, and the app shows how many permits you can book. Men and women have separate times.</li>
<li>If no slot is free, join the waiting list in the app, or keep the app open with location on when you are at the masjid, because same-day slots are released for people nearby.</li>
<li>A day before your slot, Nusuk sends a reminder asking you to confirm or cancel. Confirm it, or cancel so the place goes to someone else.</li>
<li>Arrive at the time on your booking and follow the stewards. The barcode on the permit opens the automatic gates only at your slot time, and people with special needs have their own path.</li>
<li>Pray two rak'ahs and make du'a calmly, then make room for others.</li>
</ol>
<h2>Al-Baqi'</h2>
<p>Jannat al-Baqi', where many Companions and members of the Prophet's ﷺ family are buried, is on the eastern side of the Haram. It is open to men. Visits can be booked, and the crowd level checked, on the Baqi' portal of Madinah Municipality at <a href="https://ekram.amana-md.gov.sa/">ekram.amana-md.gov.sa</a>.</p>
<h2>Umrah from Madinah</h2>
<ol>
<li><strong>Book an Umrah permit in Nusuk</strong> before you travel. It is free. Iqama holders sign in with Nafath, and visitors register with their passport and visa details. You can hold only one active permit at a time, and its time cannot be changed, so cancel it in the app and book again if your plans move.</li>
<li><strong>Enter ihram at the miqat.</strong> For people leaving Madinah it is Dhul Hulayfah (Abyar Ali), about 14 km from the Prophet's Mosque on the road to Makkah. Buses and cars stop there.</li>
<li><strong>Travel to Makkah,</strong> about 420 km away: around 2 hours 20 minutes on the Haramain train (base fare 162 SAR plus VAT) or 4.5 to 5 hours by road. See "Getting around Madinah, and to Makkah" for the options.</li>
</ol>
<p>Every valid Saudi visa allows Umrah with a Nusuk permit, the tourist eVisa and the family visit visa included. From 1 Dhul Qa'dah 1448 (8 April 2027) Umrah permits stop for the Hajj season. Relatives coming on an Umrah visa keep to that visa's own season dates: see <a href="/guides/bringing-parents-to-visit">Bringing your parents to visit Madinah</a>.</p>
<p>Wheelchairs are lent free at Masjid al-Haram too, round the clock. Any Haram worker will point you to the nearest collection point. Register your name, and return the chair straight after your Umrah.</p>
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
<li><strong>Barakah</strong> for unsold food from restaurants, bakeries and shops at 50 to 70% off, collected at a set time. Orders can be cancelled by the shop up to an hour before pick-up.</li>
</ul>
<h2>Shopping</h2>
<ul>
<li><strong>Amazon.sa</strong> and <strong>Noon</strong> deliver in 1 to 3 days, and Noon Minutes in an hour or two.</li>
<li><strong>Extra, Home Box and Carrefour</strong> for appliances with warranties. <strong>Haraj market</strong> for the cheapest new and used furniture with same-day delivery.</li>
<li>Thobes are tailored in every neighbourhood for 100 to 300 SAR, usually ready in 2 to 4 days.</li>
</ul>
<h2>Repairs and cleaning</h2>
<ul>
<li><strong>Dari</strong>: cleaning, electricians, plumbers, AC technicians and furniture assembly, booked and paid in the app.</li>
<li><strong>Maharah</strong>: cleaners, nannies and cooks, by the hour or live-in. A live-in helper costs about 2,000 to 3,500 SAR a month.</li>
<li><strong>Raha</strong>: domestic helpers by the hour (usually a four-hour visit) or on monthly contracts.</li>
</ul>
<h2>Laundry, barbers and pharmacies</h2>
<ul>
<li>Laundries are on almost every street and open 15 to 16 hours a day: about 2 SAR to wash or iron a thobe, 5 SAR for an abaya.</li>
<li>Men's haircut 10 to 50 SAR. Women's 40 to 80 SAR.</li>
<li>Al Dawaa and Al Nahdi pharmacies have branches all over the city, some open round the clock, and most staff speak English.</li>
</ul>
<h2>Gyms</h2>
<p>All gyms are men-only or women-only. Men's gyms cost 150 to 400 SAR a month, women's 250 to 500. Martial arts clubs are 150 to 300 SAR. At the Islamic University Sports Club on campus a student pays 125 SAR for a month, against 250 SAR for the public; longer memberships cost less per month. Prices, facilities, classes and trips are listed in <a href="/guides/sports-and-activities">Sport and fitness classes</a>.</p>`,
  },
  {
    slug: "visas-for-family-and-visitors",
    stage: "getting-started",
    title: "Visas for family members and visitors",
    summary: "The visas people use to bring family over or stay for months, the fingerprint step at a visa centre, extending a family visit visa in Absher with its fees and fines, and what an iqama adds.",
    bodyHtml: `
<blockquote><p>Important: Visa rules change often. Everything here was checked in November 2026. Confirm on <a href="https://visa.mofa.gov.sa/">visa.mofa.gov.sa</a> before you book anything.</p></blockquote>
<h2>Staying on a visa</h2>
<ul>
<li><strong>Tourist eVisa:</strong> open to citizens of dozens of countries, including the UK, the US, Canada and most of Europe. Bosnia and Herzegovina, Mexico, North Macedonia and Serbia were added in early November 2026. It costs about SAR 535 in total online or SAR 480 on arrival at an international airport (paid by card at the airport kiosks), includes compulsory health insurance, and is valid for one year with multiple entries. You may stay up to 90 days in total, counted across all your entries. Your passport must be valid for at least six months when you enter. The visa cannot be extended inside the Kingdom, and a new one can be issued only after the old one expires. It covers Umrah with a Nusuk permit, but not Hajj. Check the rules for your passport on <a href="https://visa.visitsaudi.com/">visa.visitsaudi.com</a>, and apply only there, not through agents who add their own fees.</li>
<li><strong>Holders of a US, UK or Schengen visa:</strong> a person whose US, UK or Schengen visa has already been used to enter that country, or who lives in the US, the UK or the EU with a valid residence permit, gets the tourist eVisa whatever their nationality. Their spouse, children and parents come with them on the same terms, also whatever their nationality. The visa on arrival is meant mainly for passengers on Saudi national airlines, so anyone flying with another airline gets the eVisa online before the flight, or risks being refused boarding.</li>
<li><strong>Extending a visit visa:</strong> the host (a Saudi or an iqama holder) extends it in Absher from 7 days before it expires, for 100 SAR each time, with new medical insurance for the new dates. The total stay is capped at 180 days. The steps are below.</li>
<li><strong>Family visit visa:</strong> an iqama holder applies on the Ministry of Foreign Affairs visa platform for close relatives such as a spouse, children or parents. The government fee is SAR 300 for a single entry or SAR 500 for multiple entries, plus medical insurance. Approval is decided case by case.</li>
<li><strong>Umrah visa:</strong> applied for on Nusuk, once the hotel and transport are booked and recorded there or through a licensed agent. It must be used to enter within 30 days of being issued, and the 1448 season's last day of entry is 23 March 2027. The full season dates are in <a href="/guides/bringing-parents-to-visit">Bringing your parents to visit Madinah</a>.</li>
</ul>
<p>On a visit visa you may live here and take short courses at language centres. You may not work, and degree study needs a student visa.</p>
<h2>Family visit visa: fingerprints at a visa centre</h2>
<p>For a family visit visa, a personal visit visa, a business visa or a work visa, the visitor goes in person to a Tasheer visa centre before the visa is issued, and gives fingerprints and a photo there. Tourist eVisas and Umrah visas skip this step.</p>
<ul>
<li>Children under 6 give no fingerprints.</li>
<li>Any Tasheer centre in the world can be used. In the online application, enter the capital of the country where the visitor will hand in the file as the place of processing.</li>
<li>Someone else can collect the passport with a signed authorisation and the receipt, or it can be sent back by courier.</li>
</ul>
<p>The visitor takes to the visa centre:</p>
<ul>
<li>the original passport, valid for at least 6 months, with two blank pages side by side;</li>
<li>a photo 51 x 51 mm on a white background, taken in the last 3 months;</li>
<li>the approval from the Ministry of Foreign Affairs visa platform;</li>
<li>proof of the relationship, such as the marriage certificate or a child's birth certificate naming both parents;</li>
<li>a copy of the host's iqama;</li>
<li>for a visitor living outside their own country, a copy of their residence permit there.</li>
</ul>
<h2>Extending a family visit visa in Absher</h2>
<p>The host extends the visa in Absher, and the visitor stays in the country. Start a week before it expires.</p>
<ol>
<li><strong>Buy new health insurance</strong> for the extra period first. Absher refuses the extension without it. Insurers' websites find the visitor by visa number and passport number, then ask for the border number and the visa's expiry date, both shown in Absher.</li>
<li><strong>Pay the 100 SAR extension fee</strong> through SADAD in your banking app. The insurance is priced separately and costs more for older visitors.</li>
<li><strong>From 7 days before the visa ends,</strong> sign in to absher.sa on a computer and open the service Extend Visit Visa (تمديد تأشيرة زيارة).</li>
<li><strong>Choose the visitor,</strong> press Start service, check the details, press Next, then accept the terms and confirm.</li>
<li><strong>Check the new end date</strong> by opening the visitor again, before the old date passes.</li>
</ol>
<table><thead><tr><th>When you apply</th><th>What you pay (SAR)</th></tr></thead><tbody>
<tr><td>From 7 days before expiry to the expiry date</td><td>100</td></tr>
<tr><td>In the 3 days after expiry</td><td>100, plus a 500 fine</td></tr>
</tbody></table>
<p>The total stay, with every extension, is 180 days at most. A tourist eVisa cannot be extended at all. If the online request fails, use the Absher communication service. To find a visitor's border number or check a visa without signing in, see <a href="/guides/check-visa-and-iqama-online">Checking your visa, border number, insurance and fines online</a>.</p>
<h2>What an iqama adds</h2>
<ul>
<li>A Saudi driving licence and a car in your name.</li>
<li>Bringing your spouse and children on dependant visas.</li>
<li>Long stays without visa runs.</li>
</ul>
<p>A registered rental contract on Ejar is open to iqama holders and to students on the educational visa, whose contract an accredited agent registers. See <a href="/guides/finding-an-apartment">Finding and renting a flat</a>.</p>
<p>Employment is the usual route to an iqama. Premium Residency is another: about 100,000 SAR a year, or 800,000 SAR once for permanent residency. Five other Premium Residency products, for skilled professionals, gifted people, investors, entrepreneurs and property owners, each have their own conditions.</p>
<h2>University students' families</h2>
<p>Students' spouse and family visas go through the University and its own procedures, and the rules differ for students with an iqama and students on the educational visa with a Visitor ID. Ask the Deanship of Student Affairs or send a request through Tawasul before you plan, and message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a> if you need help finding the right office.</p>
<blockquote><p>Tip: Come on a visa for a few months first, get to know the city, and only then spend on an iqama.</p></blockquote>`,
  },
  {
    slug: "finding-an-apartment",
    stage: "getting-settled",
    title: "Finding and renting a flat",
    summary: "Where to look, furnished or empty, Ejar or a private agreement, renting on your own (payments, deposits, taking over, subletting, repairs and bills), and a checklist before you sign.",
    bodyHtml: `
<h2>Where to look</h2>
<ul>
<li><strong>Through people:</strong> the most reliable way. Ask in the MESH group and among students and brothers already here.</li>
<li><strong>WhatsApp and Telegram groups:</strong> up-to-date listings and direct contact with landlords and students who are leaving.</li>
<li><strong>Property sites and apps:</strong> Aqar, Bayut and Haraj are the biggest. Prices on them tend to be inflated and many landlords speak only Arabic.</li>
<li><strong>Agents:</strong> some real-estate offices work in English. Use an agent from Ejar's official list of accredited agents, and check their FAL licence number in the FAL app or on the Real Estate General Authority's website before you pay anything.</li>
<li><strong>Taking over a flat:</strong> students who are leaving often hand over their flat, sometimes with the furniture. Ask to see the contract and meet the landlord before you pay for the furniture or the remaining rent.</li>
</ul>
<blockquote><p>Tip: If it's your first time, stay in a hotel or a short let (Booking, Airbnb or Gathern) for a week or two and look in person. You'll see the building, test the air conditioning and negotiate directly.</p></blockquote>
<h2>Furnished or empty</h2>
<p>For 3 to 6 months, take furnished. For a year or more, an empty flat is 40 to 50% cheaper and you can furnish it cheaply at Haraj market. Most good newer buildings are an 8 to 15 minute drive from the Haram rather than walking distance.</p>
<h2>The contract</h2>
<p><strong>Ejar</strong> is the official system of the Real Estate General Authority, and a registered contract legally protects both sides. You do not type the contract in yourself: an accredited agent, or a landlord who meets Ejar's conditions, creates it on Ejar, and you approve it from the link Ejar sends you by SMS. This works with an iqama, and on the educational visa with a Visitor ID (see the answer on renting on a student visa). The registration fee is 125 SAR a year, so check in the contract who pays it. Since September 2025 landlords must register their leases, and a tenant can ask for registration too. Many rentals in Madinah are still private paper agreements, which carry no legal protection. Ejar's helpline is 199011.</p>
<h2>Renting on your own</h2>
<p>Everything below applies with an iqama and on a Visitor ID. On a Visitor ID, the Ejar contract is registered for you by an accredited agent.</p>
<h3>Contract length and payments</h3>
<ul>
<li>Empty flats are let for 6 or 12 months at a time. An Ejar contract can set the rent yearly, half-yearly, quarterly or monthly, but most owners in Madinah want the whole period up front, or two payments a year.</li>
<li>Paying the whole year at once often brings the price down, so ask for the yearly price and the instalment price before you agree.</li>
<li>Furnished flats offered by middlemen are usually rented month by month, at a higher price and often with no contract in your name.</li>
<li>On a registered Ejar contract, pay the rent only through Ejar, by mada or SADAD from the invoice. Cash or a bank transfer outside Ejar does not count as proof that you paid.</li>
<li>A registered contract renews itself unless you or the owner gives notice at least 60 days before it ends. If you plan to leave, tell the owner in writing well before then.</li>
</ul>
<h3>What you pay at the start</h3>
<ul>
<li>The first payment of rent, usually 6 or 12 months.</li>
<li>The agent's commission, if you use an agent. Agree the amount before he starts.</li>
<li>The Ejar fee of 125 SAR a year, if the contract puts it on you.</li>
<li>A deposit, if the owner asks for one. Write the amount, and when and how it comes back, into the contract.</li>
<li>Furniture and air conditioners, since an empty flat may come without them.</li>
</ul>
<h3>Taking over a flat from a student who is leaving</h3>
<p>Students who leave often hand over their flat and sell their furniture cheaply. A tenant cannot pass a flat or a contract to someone else without the owner's consent, so:</p>
<ol>
<li>Meet the owner or his agent before you pay anything, and make sure he agrees to rent to you.</li>
<li>If the leaving student had an Ejar contract, it is ended and a new one is registered in your name. If he had no contract, agree the rent, the period and any months already paid directly with the owner.</li>
<li>Pay for the furniture separately, against a written list of what you are buying.</li>
<li>Never pay the leaving student rent for months ahead unless the owner confirms in writing that he has the money and the months are yours.</li>
</ol>
<h3>Subletting</h3>
<ul>
<li>Letting out the flat or a room to someone else, or taking in flatmates who pay rent to you, needs the owner's permission. Without it, you are breaking the contract and the owner can end it.</li>
<li>If you rent from someone who is not the owner, you have no contract with the owner. If the main tenant leaves or stops paying, you can lose the flat. Ask to see the main tenant's contract and the owner's written permission to sublet.</li>
<li>When students share a flat, agree in writing among yourselves how the rent, the deposit and the bills are split, and what happens when one of you leaves.</li>
</ul>
<h3>Repairs</h3>
<p>Under the Ejar contract, the owner pays for repairs that keep the flat safe and usable, such as structural faults and defects that stop you living in it. You pay for everyday upkeep and for damage caused by use, unless the contract says otherwise. Paper agreements often say nothing on repairs, so agree in writing before you sign who fixes the air conditioners, the water heater and the plumbing.</p>
<h3>Bills in your name</h3>
<ul>
<li>With an Ejar contract, the electricity and water accounts move into your name through Ejar's financial liability transfer (نقل المسؤولية المالية). The agent selects it when he registers the contract, or you request it in Ejar for a contract already running. It moves back to the owner when the contract ends.</li>
<li>Photograph the meter reading on the day you move in.</li>
<li>Without a contract, the bills stay in the owner's name. Agree how you pay them and keep every receipt.</li>
<li>Home internet: see <a href="/ask/home-internet-no-iqama">How do I get home internet without an iqama?</a></li>
</ul>
<h3>Red flags before you pay</h3>
<ul>
<li>You cannot meet the owner, or see his papers or the agent's FAL licence.</li>
<li>You are asked for money to hold a flat you have not seen, especially by transfer to a personal account.</li>
<li>The rent is far below other flats in the same area.</li>
<li>The owner refuses to register the contract on Ejar, or asks for rent in cash on a registered contract.</li>
<li>Someone sublets to you without the owner's written permission.</li>
<li>The electricity is cut off, or the last tenant left a large unpaid bill.</li>
</ul>
<blockquote><p>Tip: Unsure about a contract or an offer? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a> before you pay.</p></blockquote>
<h2>Checklist before you pay</h2>
<ol>
<li>Look for damp, cracks or mould, especially in bathrooms.</li>
<li>Run every air conditioner and check it blows cold. Summer days reach about 44°C, and more on the worst days.</li>
<li>Open every tap, check pressure and hot water, flush the toilet and check for leaks or smells.</li>
<li>Test every light and socket.</li>
<li>Ask to see the electricity meter, and check there is no unpaid bill from the last tenant.</li>
<li>Test the fridge, cooker, water heater and washing machine if they're included.</li>
<li>Check windows shut tightly against sand, and ask for window guards if you have children.</li>
<li>Agree in writing who pays for small repairs, water and electricity.</li>
<li>Check whether you are renting from the owner or from someone subletting, and see the owner's papers or the agent's licence.</li>
<li>If the building has a lift, make sure it works, especially with children or elderly parents.</li>
</ol>
<blockquote><p>Note: If the previous tenant left an unpaid electricity bill, your power can be cut soon after you move in. Ten minutes checking the meter saves weeks of trouble.</p></blockquote>`,
  },
  {
    slug: "drivers-license",
    stage: "getting-settled",
    title: "Driving in Madinah: your Saudi driving licence, the driving school, insurance, fines and renting a car",
    summary: "Who can drive on what, swapping a foreign licence at the model driving school, the driving school route, renewal, insurance and Najm, the common fines and the Saher cameras, and renting or buying a car. The swap needs an iqama.",
    bodyHtml: `
<p>Checked November 2026. Madinah is an easy city to drive in: wide roads, cheap fuel, and parking at the Haram that fills only on Fridays and in Ramadan. What you need in order to drive depends on what you hold.</p>
<table><thead><tr><th>You hold</th><th>You can drive on</th><th>A Saudi licence</th><th>Buying a car</th></tr></thead><tbody>
<tr><td>A visit or tourist visa</td><td>Your valid home licence, with an International Driving Permit if it is not in English or Arabic, for one year from the day you entered or until the licence expires, whichever comes first</td><td>No</td><td>No. Rent instead</td></tr>
<tr><td>A Visitor ID (educational visa)</td><td>Your valid home licence and an International Driving Permit, for the same one year from entry</td><td>No. The swap and the driving school both need an iqama</td><td>No. Rent instead</td></tr>
<tr><td>An iqama</td><td>Your home licence for a short period after the iqama is issued</td><td>Yes: swap your licence or go through the driving school</td><td>Yes</td></tr>
</tbody></table>
<p>Always carry the original licence, not a photo, and the class on it must match the car. An International Driving Permit is a translation of your licence, not a licence in itself, so it is valid only with the original, and permits issued in the Gulf states are not accepted here.</p>
<p>Women have driven in Saudi Arabia since June 2018, on the same licence, at the same fees and through the same steps as men. The model driving school in Madinah has a separate women's section with women instructors, and no husband or mahram is needed for any step.</p>
<h2>What it costs</h2>
<table><thead><tr><th>Item</th><th>Cost (SAR), as of November 2026</th><th>Paid to</th></tr></thead><tbody>
<tr><td>Private licence, 40 a year</td><td>80 for 2 years, 200 for 5, 400 for 10</td><td>Government payments in your banking app (SADAD)</td></tr>
<tr><td>Efada medical check</td><td>60 to 200</td><td>The approved clinic</td></tr>
<tr><td>Certified Arabic translation of your licence</td><td>50 to 100</td><td>A certified translation office, often online</td></tr>
<tr><td>Driving school training, if you need it</td><td>About 700 for the shortest course to about 2,800 for the 30-hour beginners' course</td><td>The school, after its assessment sets your hours</td></tr>
</tbody></table>
<h2>Swapping your foreign licence (iqama holders)</h2>
<p>Holders of licences from a list of countries, including the Gulf states, the UK, the US, Canada, Australia and most of Europe, swap without going through the driving school's course. At the appointment the school checks the licence and can ask you to drive a short assessment. Others are sent to the driving school's training and test. Your licence must be valid, a full licence and not a learner's or provisional one, and plan to switch within three months of your iqama being issued.</p>
<ol>
<li><strong>Translate your licence into Arabic</strong> at a certified translation office, if it is not already in Arabic or English. Many offices work fully online and send back a signed and stamped PDF the same day.</li>
<li><strong>Do the medical check</strong> at a clinic approved for the Efada medical report. They check your eyes, your blood group and your general fitness, and the result goes to Absher within a day. As of November 2026 the check costs 60 to 200 SAR depending on the clinic. The Regional Laboratory and Central Blood Bank (المختبر الإقليمي وبنك الدم المركزي), a short taxi ride from the University, does it.</li>
<li><strong>Book an appointment on absher.sa</strong> on a computer, not the app: Appointments (مواعيد), then Traffic, then <em>Replacement of driving licence</em> (استبدال رخصة القيادة). Choose the model driving school (المدرسة النموذجية لتعليم قيادة السيارات), on Airport Road in Al-Aqoul. The other schools do not swap foreign licences.</li>
<li><strong>Upload three PDFs:</strong> the translation, and the front and back of your original licence.</li>
<li><strong>Pay the licence fee in your banking app:</strong> Payments, then Government payments, then Driving licence, then Issue licence. Enter your iqama number, choose private, then the length. The fee is 40 SAR a year: 2 years is 80 SAR, 5 years is 200 SAR and 10 years is 400 SAR.</li>
<li><strong>Go to your appointment</strong> with your original licence, the translation, a photo, and your iqama (the card or the digital one in Absher).</li>
<li><strong>Check Absher afterwards.</strong> Your Saudi licence appears there once it is issued, and Absher offers delivery of the card to your National Address.</li>
</ol>
<blockquote><p>Tip: The driving school keeps your original licence in some cases. Take photos of both sides first.</p></blockquote>
<blockquote><p>Note: People near the driving school offer to book a slot for you for a small fee, but they ask for your Absher password or the code sent to your phone. Never share either. Book the appointment yourself on Absher.</p></blockquote>
<blockquote><p>Note: If you held a Saudi licence before and came back on a new iqama, you do not start again. Transfer or renew it onto the new iqama through Absher.</p></blockquote>
<h2>If your country is not on the list: the driving school</h2>
<p>You go through the same school as a new driver, but a licence from home shortens the training.</p>
<ol>
<li>Do the Efada medical check as above.</li>
<li>In Absher, open Appointments, then Traffic, then <em>Issue driving licence</em>, and book at a driving school. You must be 18 or over.</li>
<li>At the school, pay the training fee and sit the theory lessons and the computer test on the road signs and rules. The test is offered in English.</li>
<li>Do the driving assessment. It decides how many training hours you are given, from about six hours for a confident driver up to thirty for a beginner.</li>
<li>Pass the practical test, pay the licence fee as above, and collect the licence or have it delivered.</li>
</ol>
<p>The school's fees are in the table above, on top of the medical and the licence fee. Free practice tests for the theory exam are online in English.</p>
<h2>Renewing, losing and reading your licence</h2>
<ul>
<li>Renew in Absher under Services, then Traffic, then Driving licence services, once the licence is in its last months. You need a fresh Efada medical report on the system, every traffic fine paid, and the fee for the years you choose. The new card can be delivered to your National Address.</li>
<li>The licence cannot outlast your iqama, so a short iqama gives a short licence.</li>
<li>A lost or damaged card is replaced in Absher under the same menu, for a fee shown before you pay.</li>
<li>A number printed under restrictions is a condition, for example that glasses or contact lenses must be worn.</li>
</ul>
<h2>Insurance and accidents</h2>
<ul>
<li><strong>Third-party insurance is the law.</strong> Every car must have it, and Absher will not register a car to you, or transfer one, without a policy in your name. Comprehensive cover for your own car is optional, and a bank that finances a car insists on it.</li>
<li><strong>Compare policies online.</strong> Several Saudi comparison sites quote every licensed insurer at once. Prices depend on the car, your age and your record.</li>
<li><strong>A small accident with nobody hurt:</strong> move to the side if you can, do not leave, and report it through the Najm app or on 920000560. Najm's inspector records the damage, decides fault and sends the report to both insurers. Report within 24 hours.</li>
<li><strong>Anyone hurt, or a dispute:</strong> call 911 and wait for the traffic police.</li>
</ul>
<h2>Fines, cameras and points</h2>
<p>Madinah's main roads carry Saher cameras for speed and red lights, and mobile cameras appear in bus lanes. Fines arrive in Absher without a paper ticket, so check your violations every month, pay in your banking app under government payments, and object in Absher within 30 days if a fine is wrong. As of November 2026 the common fines are:</p>
<table><thead><tr><th>Violation</th><th>Fine (SAR)</th></tr></thead><tbody>
<tr><td>Phone in hand while driving</td><td>500 to 900</td></tr>
<tr><td>No seat belt</td><td>150 to 300</td></tr>
<tr><td>Running a red light</td><td>3,000 to 6,000, and the car is impounded on a repeat</td></tr>
<tr><td>Speeding</td><td>From 300 SAR, rising with the speed to 2,000 SAR and more</td></tr>
<tr><td>Expired registration (istimara)</td><td>100 to 150</td></tr>
<tr><td>Parking in a disabled space</td><td>500 to 900</td></tr>
</tbody></table>
<p>Serious violations also add points to your licence, and enough points suspend it. Unpaid fines stop your exit and re-entry visa, hold up an iqama renewal, and block selling a car. See <a href="/ask/traffic-fines">How do I check and pay traffic fines?</a></p>
<h2>Renting a car</h2>
<p>Renting is the answer for anyone without an iqama, and for families with visitors. Companies at the airport and across the city rent by the day, the week and the month. The usual conditions: you are 21 or over, you hold a licence in English or Arabic or an International Driving Permit with it, and you pay with a credit card in your own name. Every camera fine during the rental is charged to you, with the company's handling fee on top, so drive as if the car were yours. A monthly rental of a small car is one of the cheaper ways for a family to have wheels for a season.</p>
<h2>Buying a car</h2>
<p>With an iqama you can buy a used car and transfer it to your name in Absher. The checks to make before you pay, and the steps, are in <a href="/ask/buying-a-used-car">Can I buy a used car as a student, and what do I need?</a>. When you leave the Kingdom, sell it first: a car in your name blocks a final exit. See <a href="/guides/graduate-procedures">Leaving Madinah for good</a>.</p>
<h2>Driving well in Madinah</h2>
<ul>
<li>Fuel is sold by the litre at every station, 2.18 SAR for 91 and 2.33 SAR for 95 as of November 2026, and most stations take cards and phone payment.</li>
<li>The ring roads are fast. Inside the central area around the Haram, speed limits drop and the cameras are frequent.</li>
<li>Friday before Jumu'ah, Ramadan nights and the days around Eid are the only times parking near the Haram is hard. The car parks under the courtyards fill first.</li>
<li>For Makkah, the Haramain train and the coaches are cheaper and calmer than driving: see <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</li>
</ul>
<p>Students on the educational visa: what works and what does not on a Visitor ID is in <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>
<blockquote><p>Tip: Not sure whether your country's licence swaps without a test? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    // Superseded: the published version is GUIDE_REWRITES_2026_11 in guides-research-2026-11.ts (SEED_GUIDES keeps the later one). Edit that one.
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
<li>Pay the educational visa fee when the payment link arrives, and complete the medical check and fingerprints if the portal asks for them. Fingerprints can be given in the Saudi Visa Bio app or at an approved centre. The visa comes by email. You must be outside Saudi Arabia when you submit the visa application, or it is rejected.</li>
<li>Request your arrival ticket through Minhati once the visa is issued.</li>
</ol>
<h2>Housing, deferral and family</h2>
<p><strong>Housing:</strong> scholarship students are housed by default, either inside the Jamiah or in the Rabwa halls (الربوة). See <a href="/ask/is-housing-included">Is housing included?</a></p>
<p><strong>Deferral:</strong> the University's rules allow up to two years after final acceptance, but under the educational visa you are expected to arrive in the semester you were accepted for. See <a href="/ask/defer-my-place">Can I defer my place?</a></p>
<p><strong>Bringing your family:</strong> see <a href="/ask/istiqdam-deposit">Can I sponsor my family, and what is the deposit?</a></p>
<h2>Initial acceptance is not final</h2>
<p>Initial acceptance means the University has put your name forward. Final acceptance means the Ministry has approved it, and that is the only stage that leads to a visa. Do not resign from work, give up your home or book flights on initial acceptance alone. Some people with initial acceptance are moved to a later semester, and some are offered a year of online Arabic first.</p>
<p>Plan to arrive in the semester you are offered. Under the new educational visa, asking to arrive later can send your application back.</p>
<h2>Common mistakes</h2>
<ul>
<li>Typing a name that differs from the passport by even one letter. It can block the visa later.</li>
<li>Sending photos of documents instead of clear scans, or a photo that is not a plain passport-style picture on a white background.</li>
<li>Leaving the police clearance to the last weeks. In some countries it takes a long time.</li>
<li>Missing the 5 day window to confirm an offer, or the short deadline on the University's second application.</li>
<li>Applying for the visa while visiting Saudi Arabia.</li>
</ul>
<blockquote><p>Tip: Questions about your own application? Message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
  },
  {
    slug: "having-a-baby-in-madinah",
    stage: "family",
    title: "Having a baby in Madinah",
    summary: "Hospitals compared for fees, husbands and companions, female-only staff and free delivery for University wives (checked April 2025), then the papers after the birth: birth record, birth certificate, passport and your baby's iqama.",
    bodyHtml: `
<blockquote><p>Important: this comparison was last checked in April 2025. Prices and visiting rules change, and a husband's access to the labour room is always decided by the staff and doctors on duty. Phone the hospital when you book and again near your due date.</p></blockquote>
<h2>Free delivery for University wives</h2>
<p>Wives of University students can deliver free of charge at <strong>Uhud Hospital</strong>. She needs her own iqama. It is the only hospital that offers this.</p>
<h2>Fees for a delivery (SAR)</h2>
<table><thead><tr><th>Hospital</th><th>Natural delivery</th><th>C-section</th></tr></thead><tbody>
<tr><td>Dr. Hamid Suliman Al Ahmadi Hospital</td><td>3,500</td><td>7,000, plus 3,000 for each later caesarean</td></tr>
<tr><td>Hayat National</td><td>4,500 (changes with an epidural)</td><td>10,350, including all medication, a 3 day stay and follow-up with the doctor and the paediatrician</td></tr>
<tr><td>Madina National Hospital</td><td>4,715, plus a 125 check-up fee and a 264 ultrasound fee</td><td>Ask the hospital</td></tr>
<tr><td>Mouwasat</td><td>About 6,000</td><td>Ask the hospital</td></tr>
<tr><td>Safa Al Madinah</td><td>3,500, plus a 115 check-up fee</td><td>Ask the hospital</td></tr>
<tr><td>Saudi German</td><td>5,000</td><td>About 10,000, plus 3,000 for each later caesarean</td></tr>
<tr><td>Uhud (government hospital, paying patients)</td><td>3,500, plus a 100 check-up fee</td><td>7,000, plus a 100 check-up fee</td></tr>
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
<p>At Dr. Hamid Suliman Al Ahmadi Hospital, Madina National Hospital, Mouwasat, Uhud and Wilaada, the doctor on duty usually delivers your baby, so you generally cannot choose.</p>
<blockquote><p>Tip: Book antenatal visits early, ask the hospital for its current delivery price in writing, and ask what is included before you decide.</p></blockquote>
<p>On a visit visa, the insurance that comes with the visa pays for emergency pregnancy and childbirth care only up to a low limit (5,000 SAR), so plan to pay for a delivery yourself.</p>
<h2>After the birth: papers, step by step</h2>
<p>Your baby needs four papers, in this order: the birth record, the birth certificate, a passport from your embassy, then a place on your iqama. Start in the first week.</p>
<h3>1. The birth record at the hospital</h3>
<ol>
<li>The hospital where your baby is born registers the birth with Civil Affairs. You do not need to visit the Civil Affairs office.</li>
<li>Before the hospital submits it, check the spelling of every name, the parents' and the baby's, letter by letter against your passports. A mistake here follows your child onto every later document.</li>
<li>The hospital gives you the original birth notification. It is issued only once, so make several copies and keep the original safe. Your embassy needs it.</li>
</ol>
<h3>2. The birth certificate in Absher</h3>
<p>Once the birth is registered, sign in to Absher and open <strong>Services</strong>, then <strong>Civil Affairs services</strong>, then <strong>Birth certificate services</strong>, then <strong>View birth certificate</strong>. View it, check it and print it. Register the birth promptly: a late birth certificate carries a fine and holds up your iqama renewal.</p>
<h3>3. The baby's passport</h3>
<p>Your embassy registers the birth and issues the baby's passport. Embassies ask for the birth notification translated by a translator they accept, so read your embassy's website for its list before you go, and take copies of both parents' passports and iqamas.</p>
<h3>4. Your baby's iqama</h3>
<p>If you hold an iqama, add your baby to it as a dependant. Send one request for each child, twins included.</p>
<table><thead><tr><th>Where the baby was born</th><th>Fee</th></tr></thead><tbody>
<tr><td>In Saudi Arabia</td><td>The dependant fees only, shown in Absher before you pay</td></tr>
<tr><td>Outside Saudi Arabia</td><td>The dependant fees plus 2,000 SAR for the dependant entry visa</td></tr>
</tbody></table>
<ol>
<li><strong>Make one PDF for the child, under 1 MB,</strong> with these pages in this order: the birth certificate, the baby's passport, the health insurance, the fee receipt, a photo of the baby, and the passports and iqamas of both parents.</li>
<li><strong>Born outside Saudi Arabia?</strong> Add the baby's Saudi visa with the entry stamp and border number, and a polio vaccination certificate from the hospital. Pay the 2,000 SAR before you submit.</li>
<li><strong>Send the request in Absher:</strong> My Services, then Passports, then Tawasul, then New request. Choose the sector Resident services inside the kingdom, then <strong>NewBorn registration</strong> for a baby born here, or <strong>Separate Dependent</strong> for a baby born abroad. For a baby born abroad, write the border number in the description.</li>
<li><strong>Wait for two text messages:</strong> the first with your reference number, the second when the request is approved. Sign in to Tawasul again and print the approval.</li>
<li><strong>Book a Jawazat appointment in Absher</strong> and take the appointment letter, the approval, the printed PDF, the baby's original passport and passport photos.</li>
<li><strong>Check every detail on the iqama</strong> before you leave the counter.</li>
</ol>
<p>This Tawasul is the Ministry of Interior's request service inside Absher, not the University's Tawasul. Add the baby within three months of a baby born abroad arriving, to avoid a fine. The fees for dependants are in <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>, and the family services in Absher are in <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a>.</p>
<p>On a Visitor ID there is no iqama to add the baby to. Register the birth and get the passport the same way, then ask the Deanship of Admission and Registration through Tawasul, subject Educational visa, how your baby's stay is arranged.</p>
<h3>5. Vaccinations</h3>
<p>The first vaccines are given in the hospital before you go home. The rest follow the national schedule at your primary health care centre: see <a href="/ask/baby-vaccinations">How do I get my baby vaccinated in Madinah?</a></p>`,
  },
  {
    slug: "sports-and-activities",
    stage: "getting-settled",
    title: "Sport and fitness classes",
    summary: "The Islamic University Sports Club's facilities, membership prices and pause rules, plus jiu-jitsu and fitness classes for children and adults with schedules and prices.",
    bodyHtml: `
<p>This page covers the Islamic University Sports Club on campus and the regular classes held there for students and families. Gyms in Madinah are men-only or women-only (see <a href="/guides/everyday-apps-and-services">Everyday apps and services</a> for usual prices). Details checked 9 November 2026.</p>
<h2>The Islamic University Sports Club</h2>
<p>The University Sports Club (النادي الرياضي) is on the main campus, behind the science colleges. It has one branch. University students, University staff and people from outside the University can all join, each at their own price, and students pay the least.</p>
<h3>Facilities</h3>
<ul>
<li>An indoor sports hall with courts for basketball, handball and volleyball, and seats for spectators</li>
<li>A covered, air-conditioned Olympic pool, and an outdoor Olympic pool</li>
<li>A squash court</li>
<li>A weights and bodybuilding hall</li>
<li>A CrossFit hall</li>
<li>A cardio hall with exercise bikes and cross-trainers</li>
<li>Outdoor pitches for football, five-a-side, volleyball and tennis</li>
<li>IU Coffee, for hot and cold drinks and healthy meals, and IU Store, a sports shop</li>
</ul>
<h3>Membership prices</h3>
<table><thead><tr><th>Membership</th><th>University students</th><th>University staff</th><th>Everyone else</th></tr></thead><tbody>
<tr><td>One day</td><td>30 SAR</td><td>30 SAR</td><td>30 SAR</td></tr>
<tr><td>1 month</td><td>125 SAR</td><td>175 SAR</td><td>250 SAR</td></tr>
<tr><td>3 months</td><td>345 SAR</td><td>450 SAR</td><td>600 SAR</td></tr>
<tr><td>6 months</td><td>600 SAR</td><td>800 SAR</td><td>1,000 SAR</td></tr>
<tr><td>12 months</td><td>1,000 SAR</td><td>1,200 SAR</td><td>1,700 SAR</td></tr>
</tbody></table>
<p>All prices include VAT. Show your University card to get the student or staff price. For one month a student pays exactly half the public price. On longer memberships the student saving is about 40% (for example 1,000 SAR a year instead of 1,700), but the monthly cost drops further: a year works out at about 83 SAR a month.</p>
<h3>Pausing your membership</h3>
<p>You can pause (freeze) a longer membership, for example when you travel in the holidays:</p>
<ul>
<li>3 months: once, for up to 15 days</li>
<li>6 months: once, for up to 30 days</li>
<li>12 months: twice, for up to 60 days in total</li>
</ul>
<blockquote><p>Tip: A day pass costs 30 SAR for everyone, so try the club once before you pay for a longer membership.</p></blockquote>
<p>Discounts at other gyms, clubs and riding stables in Madinah are on <a href="/discounts">Student discounts</a>.</p>
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
<p>To register or ask a question, call or message on WhatsApp: <strong>+966 56 171 7539</strong>.</p>`,
  },
  {
    slug: "phone-sims-and-absher",
    stage: "getting-settled",
    title: "Your phone number, SIM checks and Absher",
    summary: "Find your own number and balance, see how many SIMs are registered on your iqama, remove one you do not know, update your Absher mobile number, activate Absher, and move a SIM to someone else's name.",
    bodyHtml: `
<p>Checked November 2026. Operators sometimes change their codes, so ask the operator if one stops working.</p>
<h2>Codes for your own number and balance</h2>
<table><thead><tr><th>Operator</th><th>Your number</th><th>Balance</th><th>Customer care</th></tr></thead><tbody>
<tr><td>Mobily</td><td>*222#</td><td>*1411#</td><td>1100</td></tr>
<tr><td>STC</td><td>*150#</td><td>*166#</td><td>900</td></tr>
<tr><td>Zain</td><td>*144#</td><td>*142#</td><td>959</td></tr>
</tbody></table>
<p>Dial the code from the SIM you want to check.</p>
<h2>See how many SIMs are registered on your iqama</h2>
<p>The Communications, Space and Technology Commission (CST) runs a platform called Mutasil that lists the lines registered under your iqama. Only active, authenticated numbers show up. If one you use is missing, ask its operator to check its authentication.</p>
<ol>
<li><strong>Sign in to Mutasil with Nafath.</strong> Your registered numbers appear straight away.</li>
<li><strong>Use the My Numbers Inquiry without signing in.</strong> Choose English, enter your iqama number and date of birth, answer Yes to having a mobile number, enter that number and the captcha, then press Inquire. Type in the code sent to your phone and press Submit.</li>
<li><strong>No access to your registered number?</strong> Answer No to having a mobile number. You get a short summary, with fewer details.</li>
<li><strong>The CST app:</strong> sign in and open My Numbers (Argami). The service is free.</li>
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
<p>Absher sends its verification codes to the number on file, so update it when you change your SIM. The new number must be active, able to receive SMS, and registered to your own ID (or that of a close relative). Your bank keeps its own record of your number, so update it with the bank as well.</p>
<ul>
<li><strong>Absher app:</strong> before logging in, open Digital Identity Management, choose Change Mobile Number, enter your iqama or ID number and date of birth, enter the new number and finish the biometric check.</li>
<li><strong>Nafath app:</strong> open Digital Identity Account Management, choose Digital Identity Mobile Number Update, enter the details and finish the biometric check.</li>
<li><strong>Absher kiosk</strong> (at Jawazat offices, malls, airports and government service centres): choose your language, enter your iqama or ID number, choose Update Mobile Number, scan your fingerprint, then enter the new number and the code sent to it. This is the way to go if you no longer have your old number.</li>
</ul>
<h2>Activating Absher</h2>
<p>After you register on Absher with your iqama or border number, a Saudi mobile number in your name and an email, the account must be activated with your fingerprints. There are three ways:</p>
<ol>
<li><strong>In the Nafath app:</strong> open the settings, choose to activate your national digital identity through Absher self service, sign in with your Absher user name and password, enter the details it asks for, then capture the fingerprints of your left hand with the phone's camera. Sign in to Absher afterwards to check the account shows as active.</li>
<li><strong>At a self-service Absher kiosk</strong> (at Jawazat offices, malls, airports and government service centres): enter your iqama or border number, scan your fingerprints and confirm with the code sent to your registered mobile.</li>
<li><strong>At a Jawazat office,</strong> with an appointment booked in Absher.</li>
</ol>
<p>Trouble activating Absher or Nafath in the first place? See <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>.</p>
<h2>Moving a SIM to someone else's name</h2>
<p>A line registered on your iqama stays your responsibility until it is moved or cancelled. To hand a SIM to someone, both of you go to a branch of the operator with your iqamas and your Absher-registered numbers, and the line is moved to the new owner's name there. Some operators also let the owner start the transfer in their app, and the new owner accepts it within 24 hours with Nafath. Then check Mutasil to confirm the line has left your iqama.</p>
<p>Other checks that need no sign-in, such as your border number and your visa dates, are in <a href="/guides/check-visa-and-iqama-online">Checking your visa, border number, insurance and fines online</a>.</p>`,
  },
  {
    slug: "iqama-and-exit-reentry-fees",
    stage: "getting-settled",
    title: "Iqama, exit and re-entry, final exit and dependant fees: what they cost and who issues them",
    summary: "What Jawazat charges for the iqama, exit and re-entry visas, final exit, adding family and visit visa extensions, who issues each paper for a student and his family, the rules that catch people, late renewal and lost card fines, extending a family member's visa from abroad, and the Absher steps. Checked November 2026.",
    bodyHtml: `
<blockquote><p>Important: these are Jawazat service fees, checked in November 2026. Other charges such as health insurance can apply separately, so confirm the final amount on Absher before you pay.</p></blockquote>
<p>New students on the educational visa are not issued an iqama: they hold a Visitor ID and pay none of these fees. Students from earlier intakes who hold a student iqama pay nothing for their own iqama. The fees below matter mostly for families and for anyone who travels. Fees are paid through SADAD in your banking app, under Government payments, and Absher shows the final amount before you pay.</p>
<h2>Who issues what</h2>
<p>With a student iqama, the University is your sponsor, so the papers for you go through its Travel Management (إدارة السفر). The papers for your family go through your own Absher account, as head of the family.</p>
<table><thead><tr><th>Paper</th><th>For you</th><th>For your wife and children</th></tr></thead><tbody>
<tr><td>Iqama issue and renewal</td><td>Travel Management, through Muqeem. See <a href="/ask/student-iqama-renewal">Who renews my student iqama?</a></td><td>Travel Management's Reception Unit issues the first iqama. You renew it in Absher</td></tr>
<tr><td>Exit and re-entry visa</td><td>Travel Management. It collects the lists for the summer break, approved leave and ta'jeel, and handles students away for more than six months</td><td>You, in Absher</td></tr>
<tr><td>Final exit</td><td>Travel Management, once your clearance shows</td><td>You, in Absher</td></tr>
<tr><td>Visit visa for a relative, and its extension</td><td colspan="2">You, in Absher or Muqeem, as the host</td></tr>
</tbody></table>
<h2>Iqama</h2>
<table><thead><tr><th>Who</th><th>Fee (SAR)</th></tr></thead><tbody>
<tr><td>Student with a student iqama</td><td>Free</td></tr>
<tr><td>Domestic worker, farmer or shepherd</td><td>600</td></tr>
<tr><td>Worker of a company or establishment</td><td>650</td></tr>
</tbody></table>
<p>A company worker's iqama can be renewed for 3, 6, 9 or 12 months at a time:</p>
<table><thead><tr><th>Renewal period</th><th>Fee (SAR)</th></tr></thead><tbody>
<tr><td>3 months</td><td>163</td></tr>
<tr><td>6 months</td><td>325</td></tr>
<tr><td>9 months</td><td>488</td></tr>
<tr><td>12 months</td><td>650</td></tr>
</tbody></table>
<p>A renewal is held up by unpaid traffic fines, children not yet added to the iqama, a late birth certificate fine or an expired visa on the file. Clear these before the expiry date, not after. How to renew your wife's and children's iqamas, even while they are abroad, is in <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a>.</p>
<h3>Renewing late</h3>
<p>An iqama that is not renewed within 3 days of its expiry date is fined:</p>
<ul>
<li>First time: 500 SAR.</li>
<li>Second time: 1,000 SAR.</li>
<li>Third time: deportation.</li>
</ul>
<p>Check every iqama in your family in Absher once a month. Once a renewal goes through, the digital iqama in Absher and Tawakkalna shows the new date at once.</p>
<h3>If you lose your iqama or passport</h3>
<ol>
<li><strong>Get a police report</strong> at the nearest police station the same day, and keep it.</li>
<li><strong>A lost iqama:</strong> the sponsor requests a replacement through Jawazat (Travel Management for a student iqama, you for your family). A replacement costs 1,000 SAR the first time and 2,000 SAR the second time. Your digital iqama in Absher and Tawakkalna stays valid proof of identity meanwhile.</li>
<li><strong>A lost passport:</strong> report it in Absher, which has a service for a lost or stolen passport, then go to your embassy or consulate for a new one. Embassies ask for the police report, a written statement of the loss, a Jawazat printout of your iqama details, a copy of the lost passport if you have one, your national ID card, a copy of your iqama and the passport fee. Each country sets its own list, so read its website first.</li>
<li><strong>Move your Saudi records to the new passport:</strong> see <a href="/ask/renew-passport-in-saudi">My passport is expiring</a>.</li>
</ol>
<p>Keep photos of both sides of your iqama and of your passport's photo page on your phone, and paper copies at home.</p>
<h2>Exit and re-entry visa</h2>
<table><thead><tr><th>Visa</th><th>Fee (SAR)</th></tr></thead><tbody>
<tr><td>Single, up to 2 months, one trip</td><td>200</td></tr>
<tr><td>Each extra month on a single visa</td><td>100</td></tr>
<tr><td>Multiple, up to 3 months, several trips</td><td>500</td></tr>
<tr><td>Each extra month on a multiple visa</td><td>200</td></tr>
<tr><td>Final exit</td><td>Free</td></tr>
</tbody></table>
<p>Extra months must fall within the validity of your iqama. If you extend while you are already abroad, the extra months cost double: 200 SAR a month on a single visa and 400 SAR a month on a multiple visa. Fees are not refunded if you cancel the visa, so choose the length carefully.</p>
<h3>The rules that catch people</h3>
<ul>
<li><strong>Come back before it expires.</strong> An exit and re-entry visa that runs out while you are abroad leaves you outside with no way back on that iqama.</li>
<li><strong>Your passport must outlast the trip.</strong> Absher refuses a visa when the passport has less than 90 days left. Renew the passport first: see <a href="/ask/renew-passport-in-saudi">My passport is expiring</a>.</li>
<li><strong>Fines block it.</strong> Any unpaid traffic fine on you, or on a dependant, stops the visa being issued.</li>
<li><strong>Apply from inside Saudi Arabia.</strong> The traveller must be in the Kingdom when the visa is issued, with a valid iqama.</li>
<li><strong>Fingerprints on file.</strong> The traveller's fingerprints must be registered with Jawazat, or their Absher account active.</li>
<li><strong>One open visa at a time.</strong> An earlier exit and re-entry visa that was issued and never used blocks a new one. Cancel it in Absher before you issue the next.</li>
<li><strong>Pay against the right iqama.</strong> The fee is paid with the iqama number of the person travelling, not the head of the family's.</li>
<li><strong>Print it or save it.</strong> Airlines ask to see the visa at check-in. Keep a copy on your phone.</li>
<li><strong>The summer ticket and the visa go together.</strong> Request the visa when the University collects the summer travel lists, so the visa dates cover the ticket dates.</li>
</ul>
<h3>Issuing one for a dependant in Absher</h3>
<ol>
<li>Sign in to Absher Individuals, open <strong>Services</strong>, then <strong>Passports</strong>, then <strong>Exit and re-entry visa</strong> (or <strong>Final exit visa</strong>).</li>
<li>Choose the family member, the type of visa and the months, and check the dates against the iqama's expiry.</li>
<li>Set the length one of two ways: <strong>by number of days</strong>, counted from the day the person leaves, or <strong>by return date</strong>, the last day on which they may come back.</li>
<li>Pay the fee shown through SADAD in your banking app, under Government payments, with the traveller's iqama number, then return to Absher to issue the visa and download it.</li>
</ol>
<h3>Extending a family member's visa while they are abroad</h3>
<p>If your wife or children are outside Saudi Arabia and need more time, extend their exit and re-entry visa from Absher. They do not need to come back first.</p>
<ol>
<li>Sign in to Absher and open <strong>Family Members Services</strong>, then <strong>Visa Services</strong>.</li>
<li>Choose the family member and open their visa.</li>
<li>Pay the extension fee (the double rate for a visa extended from abroad, above), then press <strong>Extend</strong>.</li>
<li>Check the new return date on the same page, or on Muqeem's public visa inquiry.</li>
</ol>
<p>Absher accepts the extension only when the family member is outside Saudi Arabia on the day you apply, the new return date is at least 7 days before their iqama expires, and the visa's total extension stays within 180 days. Where the Hijri and Gregorian dates on the screen differ, the Gregorian date counts. If their iqama is close to expiry, renew it first: see <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a>.</p>
<h3>Checking a visa without signing in</h3>
<p>Muqeem's public visa inquiry shows whether an exit and re-entry visa is valid and the date to return before, with just the iqama number and date of birth. See <a href="/guides/check-visa-and-iqama-online">Checking your visa, border number, insurance and fines online</a>.</p>
<h2>Final exit</h2>
<p>A final exit visa is free. It is valid for 60 days from the day it is issued, the iqama must have at least 30 days left, and it cancels the iqama when the holder crosses the border, so it is the last paper you take, after the bank, the car and the flat are settled. It is refused while there are unpaid fines, a car registered in the person's name, or a dependant left behind on an unsettled iqama. Returning later means a new visa of your own. The whole leaving process is in <a href="/guides/graduate-procedures">Leaving Madinah for good</a>.</p>
<h2>Adding family</h2>
<ul>
<li>Adding a dependant, or a newborn born inside Saudi Arabia, is done on Absher, which shows any fee before you pay. Register a birth promptly: a late birth certificate carries a fine and holds up the iqama renewal. The newborn's request, step by step, is in <a href="/guides/having-a-baby-in-madinah#after-the-birth-papers-step-by-step">Having a baby in Madinah</a>.</li>
<li>A child born outside Saudi Arabia first needs an entry visa as a dependant: 2,000 SAR. Add the child within three months of arrival to avoid a fine.</li>
<li>The monthly levy for dependants on a work iqama is 400 SAR per dependant a month. Student iqamas are not work iqamas, so ask Travel Management before you plan around it.</li>
</ul>
<h2>Visit visas</h2>
<ul>
<li>Extending a visit visa: 100 SAR each time, requested by the host in Absher from 7 days before the visa expires. Requested in the 3 days after it expires, it costs a 500 SAR fine on top. Buy the visitor's new health insurance first, because Absher refuses the extension without it.</li>
<li>Who can host a relative, the eVisa and the 180 day limit are in <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</li>
</ul>
<h2>On a Visitor ID</h2>
<p>Students on the educational visa hold no iqama, so none of the fees above apply. Leaving and returning follows your visa, not an exit and re-entry visa: see <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a> before you book a trip, and ask the Deanship of Admission and Registration through Tawasul, subject Educational visa, if your plans cross the visa's dates.</p>
<blockquote><p>Tip: Absher refused the visa and you cannot see why? Check your violations page, the travel restriction inquiry and every dependant's iqama and passport dates first. Still stuck? Please message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p></blockquote>`,
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
<tr><td><strong>The Prophet's Mosque Library</strong></td><td>A library of rare manuscripts and classical texts for researchers and students, open every day, 24 hours, with reading halls for men, women and children. The men's library is on the upper floor, reached by the escalator near Gate 10. The women's library is by the women's prayer areas near Gate 24 and Gate 16. Bags are not allowed, and laptops need a permit.</td></tr>
<tr><td><strong>Museum of the Prophet's Biography</strong></td><td>A multimedia exhibition on the life of the Prophet ﷺ and Islamic civilisation, just south of the masjid. Entry is by ticket, booked online: 40 SAR for the standard ticket (November 2026), free for children under 7. A good first orientation for children.</td></tr>
<tr><td><strong>The courtyard umbrellas</strong></td><td>250 large parasols that open and close automatically with the sun and the weather, so the courtyards stay shaded for prayer.</td></tr>
<tr><td><strong>Health centres</strong></td><td>Two centres open round the clock: by Jibril Gate (355) and by Al-Safiyyah (305).</td></tr>
<tr><td><strong>Wudu areas and toilets</strong></td><td>Large facilities around the edge of the masjid, some underground and reached by ramps in the courtyards. They are cleanest just after a prayer and busiest just before.</td></tr>
</tbody></table>
<h2>Booking the Rawdah</h2>
<ol>
<li>Install the <strong>Nusuk</strong> app or open the Nusuk website and sign in. Residents sign in with Nafath. The permit is free and is issued straight away.</li>
<li>Choose a date and slot. Men and women have separate slots and separate times, and the time printed on your permit is the one that counts.</li>
<li>Book as early as the app allows. Slots go quickly, most of all in Ramadan, the Hajj season and school holidays. The app shows how many permits you can book.</li>
<li>Keep the app open with location on when you are at the masjid, because short-notice slots are released during the day for people nearby. You can also join the waiting list in the app.</li>
<li>Arrive at your booked time and follow the stewards. Expect to wait about 20 minutes before entry, and keep the visit short so others can pray too.</li>
</ol>
<h2>Al-Baqi' cemetery</h2>
<p>Al-Baqi' is on the eastern side of the masjid, across the courtyard. It is open to men only, and entry is free. Visits can be booked, and the crowd level checked, on the Baqi' portal of Madinah Municipality at <a href="https://ekram.amana-md.gov.sa/">ekram.amana-md.gov.sa</a>. Photos and filming are not allowed inside. Women can see it from outside the boundary.</p>
<h2>Small things that help</h2>
<ul>
<li>Come 20 to 30 minutes before a prayer if you want a place near the middle.</li>
<li>Carry a small bag with a zip. Larger bags are checked at security, and shoes go on shelves. A free left-luggage centre keeps bags for up to 4 hours, round the clock. The library bag rules are in the library FAQ.</li>
<li>Bring a small prayer mat for the open courtyards, because the marble gets hot at midday in summer.</li>
<li>Phone signal can drop at busy times. Agree a meeting point with your family before you separate.</li>
<li>Note the number of the gate you came in through. The masjid is huge and the exits look alike. Gate numbers can change during building work, so go by the signs.</li>
<li>Visit the Prophet's ﷺ chamber by the walkways that start at Bab as-Salam (Gate 1). Keep your voice low, give salam briefly and move on, and do not crowd or touch the walls hoping for blessing.</li>
<li>Free wheelchairs are lent from the Gates Management Office at Gate 7, and lifts at Gate 9 and Gate 33 go up to the roof. More for families and anyone with limited mobility is in <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>.</li>
<li>Lost a child? The main office is by the Baqi' wall opposite courtyard door 34C, and there is one in each of the eastern and western women's prayer areas. The General Authority for the Care of the Two Holy Mosques has a unified number, <strong>1966</strong>.</li>
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
<li><strong>Masjid Quba</strong> (about 3.5 km): the first masjid of Islam. Two rak'ahs after wudu at home carry the reward of an Umrah. Many people walk there on Saturdays along the Quba walkway, which is around 3 km and takes about 45 minutes.</li>
<li><strong>Masjid al-Jumu'ah</strong> (about 4 to 5 km): where the first Friday prayer was held in Madinah, on the way between the Haram and Quba.</li>
<li><strong>Quba gardens:</strong> Bir Ariis and Bir al-Khatim are in the gardens near Quba, and the square around the masjid has family cafés.</li>
</ul>
<h2>Khandaq, Mount Sala' and Qiblatayn</h2>
<p>The Battle of the Trench took place in 5 AH around Mount Sala' (Sal'), north-west of the Haram. The small masjids on its slope are still called the Seven Masjids, although several have been rebuilt or joined into larger ones and fewer stand today. The best known is Masjid al-Fath, where the Prophet ﷺ made du'a, and the large Masjid al-Khandaq stands beside the site. The walk through the area takes about 40 minutes.</p>
<p><strong>Masjid al-Qiblatayn</strong> (about 4 km, north-west of the Haram, on Khalid ibn al-Walid Road) is where the direction of prayer changed from Jerusalem to Makkah. It is a short drive from the Seven Masjids, so the two make one outing.</p>
<h2>Uhud</h2>
<p>Mount Uhud, about 5 km north of the Haram, is where the Battle of Uhud took place in 3 AH. The Shuhada cemetery at its foot holds seventy martyrs, including Hamzah ibn Abd al-Muttalib. A walk around the foot of the mountain takes about an hour. Masjid al-Mustarah is nearby.</p>
<h2>Wells and farms</h2>
<ul>
<li><strong>Bir Rumah (the well of Uthman),</strong> about 6 km north-west of the Haram: bought and given for the public by Uthman ibn Affan. It still gives water to a working date farm whose dates are sold for charity. At times visitors can only see it from outside the fence.</li>
<li>The wells of Anas ibn Malik and Ghars are in working farms. Visits are by permission of the owner.</li>
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
<tr><td>Badr</td><td>about 150 km</td><td>1.5 to 2 h</td><td>The battlefield of the Battle of Badr, with a visitor centre and signs in Arabic and English. Leave after Fajr and be back by Maghrib. Take water and food, as services are limited.</td></tr>
<tr><td>Khaybar</td><td>about 170 km</td><td>about 2 h</td><td>The oasis and fortifications of the Battle of Khaybar, palm groves and the black lava fields. A 4WD helps in the lava fields.</td></tr>
<tr><td>Yanbu</td><td>about 230 km</td><td>2.5 to 3 h</td><td>Red Sea beaches, snorkelling and a corniche. Many people go for a Friday and Saturday.</td></tr>
<tr><td>AlUla and Hegra</td><td>about 340 km</td><td>3.5 to 4 h</td><td>The UNESCO World Heritage tombs of Hegra, the old town and the sandstone landscape. Plan two or three days. Hegra is entered only on a timed guided tour booked through Experience AlUla (from about 95 SAR a person, November 2026), and private cars cannot drive inside, so book ahead.</td></tr>
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
<p>Hiring a car needs a licence your country is recognised for, and many companies ask for residency. See <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</p>`,
  },
  {
    slug: "seasons-and-camping",
    stage: "getting-settled",
    title: "Madinah by season, and where to camp",
    summary: "What each season feels like, when the crowds peak, and the rules and places for camping around the city.",
    bodyHtml: `
<h2>The year in Madinah</h2>
<table><thead><tr><th>Season</th><th>Typical temperatures</th><th>What it is like</th></tr></thead><tbody>
<tr><td>Winter, November to February</td><td>12 to 24°C in January, warmer in November</td><td>Cool and mostly dry, the best weather for walking and trips. Nights are cold in the open courtyards, so bring a layer for Maghrib and Isha. Most of the year's little rain falls between November and January, sometimes in sudden heavy bursts. It is also the busiest Umrah period.</td></tr>
<tr><td>Spring, March to May</td><td>15 to 40°C</td><td>Pleasant in March and early April, hot by May. Dust storms can come, mostly from March to May.</td></tr>
<tr><td>Summer, June to August</td><td>28 to 44°C, hotter on the worst days</td><td>Very hot, with August the hottest month. Do outdoor things before 9 am or after 6 pm and drink water all day. The date harvest runs in late summer.</td></tr>
<tr><td>Autumn, September to October</td><td>23 to 41°C</td><td>September is still very hot. The heat breaks during October and crowds are lighter.</td></tr>
</tbody></table>
<h2>When it is busiest</h2>
<ul>
<li><strong>Hajj</strong> (8 to 13 Dhul Hijjah, moving earlier each year): hotels are at their highest prices and traffic around the Haram is heavy.</li>
<li><strong>The last 10 nights of Ramadan:</strong> huge crowds for Tahajjud. Daytime is quiet, and life and shopping start after Maghrib.</li>
<li><strong>December to February:</strong> the main Umrah season, with high but steadier numbers.</li>
<li>Late September to mid November and late February to March have the best mix of weather and calm.</li>
</ul>
<h2>Camping</h2>
<p>Camping in open desert and wadis is a favourite weekend activity, but it is regulated. Camping in areas with natural vegetation needs a licence from the National Center for Vegetation Cover, issued on its Nabati platform, protected areas need a permit, and unlicensed camping in forests or national parks can be fined up to 3,000 SAR. Check the current rules before you go, and respect the signed heritage zones around Uhud.</p>
<ul>
<li><strong>Fires:</strong> gas stoves and bought, imported charcoal are the norm. Never buy or burn local firewood or charcoal made from local trees: it is banned, and fines start in the thousands of riyals for each cubic metre. Never light a fire inside a protected reserve or a city park, and check for fire restrictions in summer.</li>
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
<p>Camping gear is sold online and in the shops around Souq al-Manakhah, including charcoal grills, dallah pots and floor mats.</p>
`,
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
<tr><td><strong>911</strong></td><td>Unified emergency number, which also works in Madinah</td></tr>
<tr><td><strong>999</strong></td><td>Police</td></tr>
<tr><td><strong>998</strong></td><td>Civil Defence (fire)</td></tr>
<tr><td><strong>937</strong></td><td>Ministry of Health advice line, 24 hours, in several languages</td></tr>
</tbody></table>
<h2>Where to go</h2>
<ul>
<li><strong>University students:</strong> start with the University Medical Center on campus. It is free for scholarship students. Clinics run Sunday to Thursday from 8:00 am to 3:15 pm. An emergency shift follows until 11:00 pm on those days, and runs from 1:00 pm to 9:00 pm on Fridays and Saturdays. Book clinic appointments at <a href="https://vcappointments.iu.edu.sa/">vcappointments.iu.edu.sa</a> with your University login. Many private clinics also give students big discounts (see <a href="/discounts">Student discounts</a>).</li>
<li><strong>Minor illness:</strong> a private clinic is quickest. A GP visit usually costs 100 to 200 SAR (see <a href="/guides/cost-of-living">What it costs to live in Madinah</a>).</li>
<li><strong>Emergencies:</strong> go to the nearest hospital emergency department, or call 997.</li>
<li><strong>Visitors:</strong> every visit visa comes with compulsory medical insurance, but it covers emergencies only, up to 100,000 SAR, with low limits for dental emergencies and childbirth. Routine visits are paid by you, and a private hospital may ask for payment up front, so keep some money aside or buy extra cover. If you extend your visa, the insurance must be extended too.</li>
</ul>
<h2>Main hospitals</h2>
<p>Listed alphabetically. Prices and services differ, so ask before booking. Doctors usually speak English; reception and nursing staff less often.</p>
<ul>
<li>Hayat National Hospital (private)</li>
<li>King Fahd Hospital (government)</li>
<li>Madina National Hospital (private)</li>
<li>Madinah Maternity and Children's Hospital (government)</li>
<li>Mouwasat Hospital (private)</li>
<li>Saudi German Hospital (private)</li>
<li>Uhud Hospital (government)</li>
<li>Zahra Hospital (private)</li>
</ul>
<p>Delivery fees, husband and companion rules, and the free option for University wives are in <a href="/guides/having-a-baby-in-madinah">Having a baby in Madinah</a>.</p>
<h2>Pharmacies</h2>
<p>Al Dawaa and Al Nahdi are the two big chains, with branches across the city and some open round the clock. Most staff speak English. Bring the box or the name of the medicine you take, and a copy of the prescription for anything stronger than basics.</p>
<p>Prescriptions from other countries are not accepted, and only doctors licensed in Saudi Arabia can prescribe. Some medicines are controlled. If you take regular medicine, bring a letter from your doctor naming the drug, the dose and the amount.</p>
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
    summary: "Prince Mugrin, Prince Musaid bin Abdulrahman (formerly the Saudi Electronic University) and Taibah University: what each offers, and where the Islamic University fits.",
    bodyHtml: `
<p>The Islamic University is the main route for international students, with a full scholarship and the Ma'had al-Lughah for Arabic. Madinah has other universities too. Admission rules, fees and languages of teaching differ for each, so always check the university's own admissions page before applying.</p>
<h2>The universities</h2>
<table><thead><tr><th>University</th><th>Type</th><th>Known for</th></tr></thead><tbody>
<tr><td><strong>Islamic University of Madinah</strong></td><td>Public, founded 1961</td><td>Shariah, Qur'an, hadith, da'wah and Arabic, with scholarships for students from around the world. See <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</td></tr>
<tr><td><strong>Prince Mugrin University</strong></td><td>Private, non-profit</td><td>Three colleges: business and tourism, computer science and cybersecurity, and engineering. Students pay tuition, and the university runs its own scholarship programme.</td></tr>
<tr><td><strong>Prince Musaid bin Abdulrahman University, Madinah branch</strong></td><td>Public, blended</td><td>Known until September 2026 as the Saudi Electronic University. Business administration, computing and informatics, and health sciences, mixing online study with sessions at its Madinah centre.</td></tr>
<tr><td><strong>Taibah University</strong></td><td>Public, founded 2003</td><td>A full range of colleges including medicine, engineering, computer science, pharmacy, education, Shariah and business. It runs its own international scholarships for bachelor's and master's study, applied for on Study in Saudi. Bachelor's applicants must be 17 to 24, live outside Saudi Arabia and hold a school certificate under five years old.</td></tr>
</tbody></table>
<h2>Choosing</h2>
<ul>
<li><strong>Want Islamic sciences and Arabic?</strong> The Islamic University is built for that. Other routes are in <a href="/programs">Study in Madinah</a>.</li>
<li><strong>Want a professional degree?</strong> The Islamic University also has colleges of engineering, computing and science, taught in English, which ask for IELTS or TOEFL. Compare the programmes, fees and language of teaching on each university's admissions page. International applicants apply to most of them through the Study in Saudi portal.</li>
<li><strong>Need flexible hours?</strong> Online and blended programmes suit people who work or have family duties.</li>
<li><strong>Staying on a visa?</strong> Degree study needs a student visa. See <a href="/guides/visas-for-family-and-visitors">Visas for family members and visitors</a>.</li>
</ul>`,
  },
];

export type SeedFaq = { slug: string; question: string; category: string; answerHtml: string; tags?: string[] };

export const FAQS_2026: SeedFaq[] = [
  { slug: "defer-my-place", category: "university", question: "Can I defer my place at the University?", answerHtml: "<p>Plan to arrive in the semester you are offered. Under the educational visa, the visa application names the semester you will arrive, and asking to arrive later can send it back. If something serious stops you travelling, ask the University before you change your plans. See <a href=\"/guides/applying-to-the-islamic-university\">Applying to the Islamic University</a>.</p>" },
  { slug: "is-housing-included", category: "university", question: "Is housing included for scholarship students?", answerHtml: "<p>For full (external) scholarship students, yes. The University gives you a free room, either inside the Jamiah or in the Rabwa halls (الربوة), shared with one other student, and the housing office allocates it. A partial (internal) scholarship, for applicants already living in Saudi Arabia, covers tuition only: it includes no free housing, no stipend, no tickets and no meals. When places are free, partial scholarship students are offered a paid room in Unit 13: see <a href=\"/guides/unit-13-and-paid-university-housing\">Unit 13 and paid University housing</a>. Your offer on Study in Saudi shows which scholarship you have, and the full comparison is in <a href=\"/guides/scholarship-stipend-and-allowances\">Your scholarship money</a>.</p>" },
  { slug: "istiqdam-deposit", category: "family", question: "Can I sponsor my family, and what is the deposit?", answerHtml: "<p>Not at present. Family residency (istiqdam) through the University has been closed since January 2025, and no reopening has been announced as of November 2026, so there is no deposit to pay. Plan without it. Families who come do so on visit visas at their own cost, and the University does not arrange visit visas. The University Medical Center treats family members on istiqdam only. See <a href=\"/guides/visas-for-family-and-visitors\">Visas for family members and visitors</a>.</p>" },
  { slug: "join-mesh-group", category: "getting-started", question: "How do I join the MESH WhatsApp group?", answerHtml: "<p>Tap any \"Join the group\" button on this site. Keep posts relevant, share only verified information, and no debates. The full rules are on the More page.</p>" },
  { slug: "how-to-apply-iu", category: "getting-started", question: "How do I apply to the Islamic University of Madinah?", answerHtml: "<p>Through the national Study in Saudi portal (studyinsaudi.sa) when applications open. It is free, you apply yourself, and the University has no offices or agents. The main window is in spring (19 April to 21 May in 2026), with short extra rounds later in the year (16 September to 6 October in 2026). You can choose up to 25 programmes across several universities and edit your application until the deadline. Have your passport, secondary certificate and transcript, police clearance, medical report, two recommendation letters (tazkiyah) and a passport photo ready before the window opens. The full steps are in <a href=\"/guides/applying-to-the-islamic-university\">Applying to the Islamic University</a>, and the overview with a video walkthrough is at <a href=\"/programs/iu-madinah\">Islamic University of Madinah</a>.</p>" },
  { slug: "stipend-amount", category: "university", question: "How much is the University stipend?", answerHtml: "<p>Full scholarship students receive a monthly stipend (mukafa'ah). The rate depends on your college, and your own amount is in the Academic System under <strong>Personal</strong>, then <strong>Rewards</strong>. It is paid onto your University stipend card, an Al Rajhi Bank card, usually between the 21st and 25th of each month and earlier before holidays. New students get nothing in their first month and a double payment in the second. On top of it come an arrival allowance of two months' stipend, a yearly books allowance, an excellence allowance for a semester GPA of 4.50 or more in both semesters, three months' stipend when you graduate, a ticket home each year, housing and subsidised meals. The stipend stops during ta'jeel or i'tithaar and after the regular length of your programme. Partial scholarships cover tuition only. Full details: <a href=\"/guides/scholarship-stipend-and-allowances\">Your scholarship money: stipend, allowances and tickets</a>.</p>" },
  { slug: "learn-arabic-before-iu", category: "getting-started", question: "Where can I learn Arabic in Madinah before getting into the University?", answerHtml: "<p>There are several options. Year-round institutes such as Ahlul Athar, Mutun al-Ijaz and Taba charge from about 350 SAR a month. The <a href=\"/programs/map\">Madinah Arabic Program</a> runs one-month intensives on the University campus. More options, with fees and dates, are on <a href=\"/programs\">Study in Madinah</a>.</p>" },
  { slug: "sisters-study", category: "family", question: "Where can sisters study Arabic and Islamic sciences?", answerHtml: "<p>There are women's marakiz (Academiyah al-Ma'rifah, Dar at-Tawheed wa as-Sunnah, Markaz Mishkat and Markaz Taibah), the Masjid an-Nabawi Ma'had and Kulliyah for women, and paid options such as Fusha, MAP's sisters' classes and Taba (now open to women). See <a href=\"/guides/sisters-studying-in-madinah\">Where sisters can study</a> and <a href=\"/programs\">Study in Madinah</a>.</p>" },
  { slug: "monthly-budget", category: "getting-settled", question: "How much money do I need per month in Madinah?", answerHtml: "<p>Roughly 2,900 to 6,700 SAR for a single person renting their own place, and 6,300 to 12,800 SAR for a family of three or four. Scholarship students in the halls spend far less. Full breakdown: <a href=\"/guides/cost-of-living\">What it costs to live in Madinah</a>.</p>" },
  { slug: "bank-account-without-iqama", category: "getting-settled", question: "Can I open a Saudi bank account without an iqama?", answerHtml: "<p>Yes. Since September 2025 holders of a Visitor ID can open an account and get a mada card. You need an active Visitor ID in Absher, a registered National Address and a Saudi mobile number linked to Absher. Either go to a branch with your passport and show your Visitor ID in the Absher app, or open the account online and confirm your identity through Nafath. The bank also asks for your home address and the purpose of your stay. The account works only while your Visitor ID is valid and is frozen when it expires. See <a href=\"/guides/sim-internet-bank\">SIM card, internet and a Saudi bank card</a>.</p>" },
  { slug: "home-internet-no-iqama", category: "getting-settled", question: "How do I get home internet without an iqama?", answerHtml: "<p>Fixed home internet needs an iqama, so most people use a portable router with an unlimited-data SIM from STC, Mobily or Zain.</p>" },
  { slug: "drive-on-visit-visa", category: "getting-settled", question: "Can I drive on a visit visa?", answerHtml: "<p>Yes, with your own valid licence if Saudi Arabia recognises it, for up to one year from the day you entered or until the licence expires, whichever comes first. This covers tourist, Umrah and family visit visas. Carry the original licence, make sure its class matches the vehicle (a car licence does not cover a motorcycle), and after an accident report it in the Najm app. Car hire firms set their own rules, and many ask for an International Driving Permit. Gulf citizens drive on their own national licence, but permits issued in the Gulf states are not accepted. To get a Saudi licence or register a car you need an iqama. See <a href=\"/guides/drivers-license\">Getting a Saudi driving licence</a>.</p>" },
  { slug: "rawdah-booking", category: "duroos", question: "How do I visit the Rawdah?", answerHtml: "<p>Book a free permit in the Nusuk app or on the Nusuk website (residents sign in with Nafath) and arrive at the time printed on it. The app shows how many permits you can book, and same-day slots are released for people at the masjid. Pray, make du'a calmly, and make room for others. More in <a href=\"/guides/masjid-an-nabawi-first-visit\">Visiting Masjid an-Nabawi</a>.</p>" },
  { slug: "duroos-english", category: "duroos", question: "Are there duroos in English in the Haram?", answerHtml: "<p>Almost all duroos are in Arabic, which is excellent listening practice. English lessons are rare. Take a notebook, write down words, and look them up later. Today's duroos are on the <a href=\"/duroos\">Duroos</a> page.</p>" },
  { slug: "do-i-register-for-duroos", category: "duroos", question: "Do I need to register to attend the duroos?", answerHtml: "<p>No. The duroos of the mashayikh are open to everyone. Only the Qur'an and mutun halaqat need registration.</p>" },
  { slug: "tajeel-vs-itithaar", category: "university", question: "What's the difference between ta'jeel and i'tithaar?", answerHtml: "<p>Ta'jeel is a planned semester off, requested in a short window before the semester. Its time is not counted in your maximum study period. I'tithaar is an excuse from a semester you have already started: you are withdrawn from all its courses with a W grade, not a fail, but that semester does count towards your maximum study period. Both need your college's approval, together they cannot exceed three semesters over your whole programme, and in your first year they are allowed only for compelling reasons.</p><p>Either way, keep attending until your status changes, and your stipend stops for that semester. If you live in the halls, a ta'jeel is not approved until you hand back your room, and after an i'tithaar you move out once your status changes. With an iqama, one semester off means leaving on an exit and re-entry visa and returning a week before the next semester. More than one semester means final exit within two weeks. Details: <a href=\"/guides/tajeel-and-itithaar\">Taking a semester off</a>.</p>", tags: ["tajeel", "itithaar", "deferral", "semester off", "withdrawal"] },
  { slug: "etimad-what-for", category: "university", question: "What is Etimad and why do I need it?", answerHtml: "<p>It's the government platform where your University travel orders and ticket letters go. Set it up once and make sure your details match your passport exactly. See <a href=\"/guides/etimad-account\">Setting up your Etimad account</a>.</p>" },
  { slug: "student-discounts", category: "getting-settled", question: "Are there discounts for University students?", answerHtml: "<p>Yes. The University's partner programme has more than 100 offers at hospitals, clinics, labs, opticians, schools, car rentals, restaurants, hotels and gyms. Some name students, and many are written for University staff, so show your University card and ask before you pay. See <a href=\"/discounts\">Student discounts</a>.</p><p>At the University Sports Club a student pays 125 SAR for one month, half the 250 SAR public price, and 1,000 SAR for a year. The full price list is in <a href=\"/guides/sports-and-activities\">Sport and fitness classes</a>.</p>", tags: ["discounts", "sports club", "gym", "university card"] },
  { slug: "mahad-books", category: "university", question: "Where can I find the Ma'had books and the answers?", answerHtml: "<p>In the <a href=\"/library/mahad\">Ma'had collection</a> of the Jamiah library: the textbooks for all four levels, the new six-level books, the student guide, the study and exam regulations, the course descriptions, how-to videos for excuses, withdrawal, deferral and Blackboard, and extra practice from the old and new curriculum. The <a href=\"/library\">library page</a> also links to every level of the Madinah Books with their answer keys, and to the Madinah Books as web pages you can read and search in your browser.</p>", tags: ["mahad", "books", "library", "madinah books", "answers"] },
  { slug: "muqarrarat", category: "university", question: "Where are the muqarrarat for my college?", answerHtml: "<p>The <a href=\"/library\">Jamiah library</a> has a collection for each college, with the course books and notes sorted by level. The folders follow the study plans of earlier years, so some current courses are not there yet, and some sit at a different level from the one in your plan:</p><ul><li><a href=\"/library/quran\">Qur'an</a>: 19 of the 65 courses in the 1448 plan have no folder yet, and there is no Level 1 folder. Most specialist courses sit one or two levels later than in the 1448 plan.</li><li><a href=\"/library/sharia\">Sharia</a>: 31 of the 87 courses in the 1448 plan have no folder yet, mostly the new law courses, the co-op training, the two research papers and Applications of AI.</li><li><a href=\"/library/hadith\">Hadith</a>: History of the Sunnah and Analytical Hadith 1 to 6 sit one or two levels later than in the 1448 plan.</li><li><a href=\"/library/dawah\">Da'wah</a> matches the 1448 plan level by level. <a href=\"/library/law\">Law</a> is a single set of files without levels.</li></ul><p>So search for the course by its name with the <a href=\"/library/search\">library search</a> rather than by level. Your own plan is in the Academic System under <strong>Academic</strong>, then <strong>Student plan</strong> (خطة الطالب). If your course is not there, ask the course teacher for the set book or notes, or ask your department. If you've written a takhlees that could help others, send it to us and we'll review it and add it.</p>", tags: ["library", "muqarrarat", "books", "study plan", "courses"] },
  { slug: "absher-nafath-activation", category: "getting-settled", question: "My Absher or Nafath activation keeps failing. What do I do?", answerHtml: "<p>This happens to many new students on the student visa. Call Absher customer care on <strong>920020405</strong>, choose English and enter your border number. Ask them to open a technical support ticket, and say you are a new international scholarship student on a student visa with a border number. The fix can take a few days, and they may send you a temporary password.</p><p>Meanwhile, try the other ways to activate Absher: in the Nafath app (settings, then activate your national digital identity through Absher self service, then capture your left hand's fingerprints with the camera), at a self-service Absher kiosk with your fingerprints, or at a Jawazat office with an appointment. After any of them, sign in to Absher to check the account shows as active. The steps are in <a href=\"/guides/phone-sims-and-absher\">Your phone number, SIM checks and Absher</a>.</p>", tags: ["absher", "nafath", "visa", "new students"] },
  { slug: "find-my-timetable", category: "university", question: "Where do I find my class timetable?", answerHtml: "<p>In the University's Academic System, open <strong>Electronic Registration</strong> (التسجيل الإلكتروني), then <strong>Registered Courses</strong> (المقررات المسجلة), and choose the semester. Each course shows its section, credit hours, day, time, room and teacher, with your total hours and the name of your academic advisor at the bottom, and a <strong>Print</strong> (طباعة) button. Days are numbered: 1 is Sunday, 2 Monday, 3 Tuesday, 4 Wednesday and 5 Thursday.</p><p>Timetables appear in the days before classes start, so check again if yours is empty. New students receive a ready-made timetable and cannot change it in their first semester. To change a course later, use <strong>Drop and Add</strong> (الحذف والإضافة) under Electronic Registration, open only during the window in the academic calendar: tick the course, choose a section, tap <strong>Add</strong> (إضافة), then tap <strong>Confirm</strong> (تثبيت). Nothing is registered until you confirm, so check Registered Courses afterwards. Your final exam timetable is under <strong>Academic</strong>, then <strong>Final Exams</strong>. Step by step: <a href=\"/guides/university-student-system\">Using the University's student system</a>.</p>", tags: ["timetable", "schedule", "registration", "drop and add"] },
  { slug: "rent-on-student-visa", category: "getting-settled", question: "Can I register a rental contract on a student visa?", answerHtml: "<p>Yes. Find a flat and agree the terms, then contact a real-estate agent from Ejar's official list of accredited agents. The agent registers the contract on Ejar for you.</p>", tags: ["ejar", "rent", "housing", "visa"] },
  { slug: "library-bags-laptops", category: "university", question: "Can I take a bag or laptop into the libraries?", answerHtml: "<p><strong>University Central Library:</strong> open Sunday to Thursday, 8:00 am to midnight, for men and women, and closed on Friday and Saturday. During the final exams it stays open 24 hours. Laptops are allowed but bags are not, so take the laptop out first. There are sockets. The private study rooms are for graduate students.</p><p><strong>Masjid an-Nabawi library:</strong> open every day, 24 hours. Men go up by the escalator near Gate 10, and the women's library is by the women's prayer areas near Gate 24 and Gate 16. No bags, no food and no laptops without a permit. Tablets and notebooks are fine. The rules are applied strictly after about 2 pm. Leave your bag at the free left-luggage centre, which keeps bags for up to 4 hours, round the clock, with a ticket.</p>", tags: ["library", "laptop", "haram", "study", "hours", "exams"] },
  { slug: "blackboard-phishing", category: "university", question: "Someone posted a link in my Blackboard class chat. Is it safe?", answerHtml: "<p>Do not open it. Fake accounts posing as students post links named things like \"timetable\" or \"class WhatsApp group\". Opening one and signing in can hand over your University account, and with it they can withdraw you from your courses. Report the account, leave the group, and warn your class.</p><p>Your teachers reach you through your University email and Blackboard messages. Never type your password or a verification code into a page you reached from a link. If you already have:</p><ol><li>Change your password at once: at <a href=\"https://iu.edu.sa/\">iu.edu.sa</a>, tap the user account icon, then <strong>Change password</strong> (تغيير كلمة المرور).</li><li>Check that the mobile number on your account is still yours, and that your registered courses have not changed.</li><li>Tell the Deanship of IT and E-Learning on <strong>it.care@iu.edu.sa</strong>, and report the fake account to <strong>bb@iu.edu.sa</strong>.</li></ol><p>Treat \"investment\" offers in student groups the same way, and if a stranger sends you money \"by mistake\" and asks you to forward it, do not transfer anything: tell your bank.</p>", tags: ["blackboard", "security", "phishing", "account", "scam"] },
  { slug: "leaving-steps", category: "leaving", question: "What do I need to do when I graduate?", answerHtml: "<p>Hand back your room, return your student card and clear your file with Travel Management, collect your degree, legalise your documents, and book your ticket once the University has confirmed your clearance. With an iqama, Travel Management also arranges your final exit visa. On a Visitor ID there is no iqama to hand in, so ask Travel Management through Tawasul what clearance it needs from you. The full checklist is in <a href=\"/guides/graduate-procedures\">Graduating</a>.</p>" },
  { slug: "check-sims-on-iqama", category: "getting-settled", question: "How do I see how many SIMs are registered under my iqama?", answerHtml: "<p>Sign in to Mutasil with Nafath, or use the My Numbers Inquiry, which needs no sign-in, with your iqama number, date of birth and a code sent to your registered phone. The CST app and Tawakkalna also show your numbers. If you find one you do not know, ask its operator to cancel it. Steps are in <a href=\"/guides/phone-sims-and-absher\">Your phone number, SIM checks and Absher</a>.</p>", tags: ["sim", "iqama", "mutasil", "cst"] },
  { slug: "change-absher-mobile", category: "getting-settled", question: "How do I change the mobile number on my Absher account?", answerHtml: "<p>Three ways: in the Absher app (Digital Identity Management, then Change Mobile Number), in the Nafath app (Digital Identity Mobile Number Update), or at an Absher kiosk in a Jawazat office, mall or airport. The app methods need a biometric check, and the kiosk works even if you lost your old number. Details: <a href=\"/guides/phone-sims-and-absher\">Your phone number, SIM checks and Absher</a>.</p>", tags: ["absher", "nafath", "mobile number"] },
  { slug: "short-address", category: "getting-settled", question: "What is a short address and how do I find mine?", answerHtml: "<p>It is an eight character code, four letters then four digits, that stands for your full National Address. It is used for deliveries and some official forms. You need a registered National Address first. Then find the code in Absher (My Services, then National Address Services), on the Saudi Post website after signing in with Nafath, or in the Saudi Post app. If you move, update your National Address, because the code changes with it.</p>", tags: ["national address", "short address", "delivery", "saudi post"] },
  { slug: "check-health-insurance", category: "getting-settled", question: "How do I check that my health insurance is valid?", answerHtml: "<p>Iqama holders can check on the Council of Health Insurance website, on the Insurance Authority website (free, and the one that works from abroad), in the Tawakkalna app, in Absher (health insurance validity inquiry) or in the CHI Daman app. Enter your 10 digit iqama number and check the insurer, the policy, the type of cover and the dates. Absher shows validity for you and for each family member. Insurance expiry is separate from your iqama expiry. If nothing shows, retry and then ask your insurer.</p><p><strong>Visitors:</strong> use the Council of Health Insurance visa inquiry with the passport number, visa number or border number. Before a visit visa extension, buy the new policy first: insurers find the visitor by visa number and passport number. More checks are in <a href=\"/guides/check-visa-and-iqama-online\">Checking your visa, border number, insurance and fines online</a>.</p>", tags: ["insurance", "chi", "health", "iqama"] },
  { slug: "send-money-home", category: "getting-settled", question: "How do I send money home from Madinah?", answerHtml: "<p>Apps and services in common use include Alinma, Barq, D360, Enjaz, Mobily Pay, SNB NEO, STC Pay and STC Bank, Tahweel Al Rajhi, Tiqmo and urpay. What you can use depends on your ID and bank account. Fees, exchange rates and speed differ and change, so compare the final amount your family receives after fees, not the headline rate. Checked November 2026.</p>", tags: ["remittance", "money transfer", "bank", "apps"] },
  { slug: "emergency-numbers", category: "getting-settled", question: "What are the emergency numbers in Saudi Arabia?", answerHtml: "<p>Ambulance (Saudi Red Crescent): <strong>997</strong>. Police: <strong>999</strong>. Civil Defence (fire): <strong>998</strong>. The unified emergency number <strong>911</strong> also works in Madinah. The Ministry of Health advice line is <strong>937</strong>, 24 hours, in several languages. More in <a href=\"/guides/doctors-hospitals-and-pharmacies\">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>", tags: ["emergency", "ambulance", "police", "health"] },
  { slug: "best-time-to-visit-madinah", category: "getting-settled", question: "What is the best time of year in Madinah?", answerHtml: "<p>November to February has the best weather (about 12 to 24°C in January, warmer in November) but is the busiest Umrah period. Late September to mid November and late February to March mix good weather with calmer crowds. Summer days reach about 44°C, and more on the worst days, so do outdoor things early or late. See <a href=\"/guides/seasons-and-camping\">Madinah by season, and where to camp</a>.</p>", tags: ["weather", "season", "summer", "winter"] },
];
