import type { SeedGuide } from "./guides-2026";

/**
 * New guides by naseer, November 2026, batch 1: Eid al-Adha and the udhiyah, janazah and al-Baqi',
 * electricity, water and gas at home, and the Qur'an Printing Complex.
 * Each was researched from official sources, then checked by three independent reviewers (facts,
 * house rules, consistency with the site). Sources, conflicts and open questions per guide are in
 * docs/research/guides-naseer-2026-11/<slug>.md. Topics in src/lib/guide-topics.ts.
 */
export const GUIDES_NASEER_2026_11: SeedGuide[] = [
{
    slug: "eid-al-adha-and-udhiyah",
    stage: "getting-settled",
    title: "Eid al-Adha and the udhiyah in Madinah",
    summary: "The ten days of Dhul Hijjah and the Day of Arafah in Madinah, the official ways to buy and slaughter an udhiyah with 2026 prices, the slaughter days, sending an udhiyah abroad, sharing the meat, and what closes over the 1448 Eid holiday.",
    bodyHtml: `
<p>Checked November 2026. In 1448 the first of Dhul Hijjah is Friday 7 May 2027, the Day of Arafah is Saturday 15 May and Eid is Sunday 16 May, by the Umm al-Qura calendar. This guide covers those days, the official ways to arrange your udhiyah and what they cost, and what is open over the University holiday.</p>
<h2>The ten days, Arafah and Eid morning</h2>
<ul>
<li><strong>Dates:</strong> each date is confirmed the evening before, when the sighting of the new moon is announced.</li>
<li><strong>The city:</strong> many pilgrims visit Madinah before Hajj and many come after it, so the Haram is full in those weeks. From 8 Dhul Hijjah the pilgrims are in Makkah, and the Haram is calmer.</li>
<li><strong>The Day of Arafah:</strong> many residents fast it.</li>
<li><strong>Buses:</strong> in 1447 the regular Madinah Bus routes stopped at noon on 9 Dhul Hijjah and restarted on the morning of the second day of Eid. Shuttle routes ran to Masjid an-Nabawi and Quba from noon on Arafah until an hour after Isha, and some ran until 8 am on Eid morning. Check the Madinah Bus app for the 1448 times.</li>
<li><strong>Eid prayer:</strong> held at the Haram and in masjids and musallas across the city. On Eid morning the pilgrims are in Mina, so the Haram is less crowded than at Eid al-Fitr. Times and tips are in <a href="/ask/eid-prayer-in-madinah">Where is the Eid prayer held in Madinah, and when does it start?</a></li>
</ul>
<p>For the acts of worship of these days, and for what applies to someone who plans to sacrifice, ask a scholar. The scholars at Masjid an-Nabawi and at the University answer questions.</p>
<h2>Ways to arrange your udhiyah</h2>
<table><thead><tr><th>Option</th><th>How it works</th><th>Cost in 1447 (May 2026)</th></tr></thead><tbody>
<tr><td>Buy a sheep and use a slaughterhouse</td><td>You choose the animal at the livestock market, have it slaughtered at a government-supervised slaughterhouse and take the meat home</td><td>The animal, plus a slaughter fee from 75 SAR</td></tr>
<tr><td>Adahi voucher</td><td>The Kingdom's Project for the Utilisation of Hady and Adahi (أضاحي) slaughters in Makkah under veterinary supervision and gives the meat to the needy in the Kingdom and in more than 25 countries. You receive no meat</td><td>Shown in the app or on the website when you buy</td></tr>
<tr><td>Licensed Madinah charity</td><td>Several charities in the city run udhiyah projects: you pay, and they slaughter and give the meat to poor families in Madinah</td><td>Set by each charity</td></tr>
<tr><td>Butcher or livestock trader</td><td>Several in Madinah sell a sheep with slaughter, cutting and home delivery, ordered through their own apps or websites. Ask which slaughterhouse they use</td><td>Set by each seller</td></tr>
</tbody></table>
<p>Adahi vouchers are sold in the Adahi app and website, Nusuk, the Ehsan platform (إحسان) at <a href="https://ehsan.sa/">ehsan.sa</a>, the major banks' apps and Saudi Post. Ehsan sends a text message once the sacrifice is done. An order cannot be cancelled or refunded once paid, so check the details before you pay.</p>
<h2>Buying a sheep and using a slaughterhouse</h2>
<ol>
<li><strong>Choose the animal</strong> at the livestock market (سوق الأنعام). Vets from the Ministry of Environment, Water and Agriculture inspect the markets before Eid. Choose a healthy animal, and ask a scholar about the age and conditions an udhiyah must meet.</li>
<li><strong>Book a slot</strong> on the Ministry's Naama platform (نما) at <a href="https://naama.sa/">naama.sa</a>: choose the slaughterhouse, the day, the time and the animal. Booking cuts the wait on Eid.</li>
<li><strong>Take the animal to the slaughterhouse.</strong> For Eid the Ministry's Madinah branch supervises 17 slaughterhouses in the region, six of them main slaughterhouses in the city, with vets on site.</li>
<li><strong>Choose the cut and pay.</strong> Every slaughterhouse shows its prices on a board and gives an electronic invoice.</li>
</ol>
<table><thead><tr><th>Slaughterhouse service, Madinah, Eid 1447</th><th>SAR, VAT included</th></tr></thead><tbody>
<tr><td>Slaughter, skinning and cleaning, carcass handed over whole</td><td>75</td></tr>
<tr><td>Cut into quarters</td><td>85</td></tr>
<tr><td>Cut small for the freezer</td><td>100</td></tr>
<tr><td>A cow</td><td>300</td></tr>
</tbody></table>
<p>Average prices for one animal across the Kingdom in May 2026, the month of Eid 1447:</p>
<table><thead><tr><th>Animal</th><th>Average price (SAR)</th></tr></thead><tbody>
<tr><td>Najdi sheep</td><td>1,966</td></tr>
<tr><td>Naemi sheep</td><td>1,945</td></tr>
<tr><td>Harri sheep</td><td>1,811</td></tr>
<tr><td>Sawakni sheep</td><td>1,391</td></tr>
<tr><td>Local goat</td><td>1,218</td></tr>
<tr><td>Barbari sheep</td><td>717</td></tr>
</tbody></table>
<h2>When and where the slaughter is done</h2>
<ul>
<li><strong>The days:</strong> in the Kingdom the udhiyah is slaughtered from after the Eid prayer on 10 Dhul Hijjah to the end of the days of Tashreeq on 13 Dhul Hijjah. In 1448 that is Sunday 16 to Wednesday 19 May 2027. Scholars differ on the last day, so ask a scholar.</li>
<li><strong>The rush:</strong> the first two days of Eid are the busiest at the markets and slaughterhouses. Book on Naama early.</li>
<li><strong>Only in a licensed place:</strong> slaughtering an animal in a place that is not licensed for it, such as a street or a car park, is a municipal violation. The fine is set for each animal, from 400 to 2,000 SAR depending on the city, and doubles for a repeat.</li>
</ul>
<h2>Sending an udhiyah abroad</h2>
<ul>
<li><strong>Through family or a charity at home:</strong> send the money a week or more before Eid and they arrange it there. See <a href="/guides/sending-and-receiving-money">Sending money home and receiving money in Madinah</a>.</li>
<li><strong>Through Adahi:</strong> the meat goes to the needy in the Kingdom and abroad, but you do not choose the family.</li>
<li><strong>Through KSrelief:</strong> the King Salman Humanitarian Aid and Relief Centre's Sahem platform at <a href="https://sahem.ksrelief.org/">sahem.ksrelief.org</a> sold an udhiyah for needy families in six countries in 1447: Burkina Faso 416 SAR, Mali 498, Niger 465, Sudan 1,171, Syria 946 and Yemen 483.</li>
</ul>
<p>Whether your udhiyah should be in Madinah or where your family lives is a question for a scholar.</p>
<h2>Sharing the meat</h2>
<ul>
<li>Many families divide the meat in three: for the household, as gifts to neighbours and friends, and for people in need. Ask a scholar how much has to be given.</li>
<li>Share with families in need you know, your building's guard and cleaners, and students far from home. To meet other English-speaking students and families over Eid, see <a href="/ask/join-mesh-group">How do I join the MESH WhatsApp group?</a></li>
<li>A whole sheep is a lot for a small freezer. Ask for the freezer cut, and share fresh meat on the first day.</li>
</ul>
<h2>Over the Eid holiday</h2>
<ul>
<li><strong>The University:</strong> second semester finals run from 25 April to 10 May 2027. The Eid al-Adha holiday is Tuesday 11 to Saturday 22 May 2027 (5 to 16 Dhul Hijjah 1448), and classes resume on Sunday 23 May. Every date is in <a href="/guides/university-calendar-1448">The University calendar</a>.</li>
<li><strong>University offices</strong> close over the Eid holiday. Arrange exit and re-entry visas, letters and tickets before 11 May. See <a href="/guides/iqama-and-exit-reentry-fees">Iqama, exit and re-entry, final exit and dependant fees</a>.</li>
<li><strong>Work and services:</strong> private companies give at least four days off from the Day of Arafah, and government offices close for the Eid holiday. In an emergency, call 997 for an ambulance.</li>
<li><strong>Makkah:</strong> Umrah permits stop from 1 Dhul Qa'dah until after Hajj, and entering Makkah in these weeks needs a permit. See <a href="/guides/hajj-as-a-student">Hajj from Madinah as a student or resident</a>.</li>
</ul>
`,
  },
{
    slug: "janazah-al-baqi-and-when-someone-dies",
    stage: "family",
    title: "Janazah prayers, al-Baqi', and when someone dies in Madinah",
    summary: "What happens at a janazah in Masjid an-Nabawi, how washing, shrouding and burial are arranged in Madinah, the death certificate on Absher, the steps to take a body home, and how classmates help when a student of the University dies.",
    bodyHtml: `
<p>Checked November 2026. A death far from home is hard, and the paperwork in another country adds to the weight of it. This page explains the janazah prayers you will see at Masjid an-Nabawi, then sets out what to do if someone in your family dies in Madinah: burial here, the death certificate, and the steps if the family wants the body taken home. It ends with how classmates can help when a student of the University dies.</p>
<h2>The janazah prayer at Masjid an-Nabawi</h2>
<p>Janazah prayers are held at Masjid an-Nabawi after almost every obligatory prayer, sometimes for one person and sometimes for several. Families in Madinah bring their dead to the masjid so that its large congregation prays for them.</p>
<ul>
<li><strong>The call:</strong> as soon as the imam ends the obligatory prayer, a short announcement over the speakers says that the funeral prayer follows, for example <em>as-salatu 'ala al-amwat, yarhamukumullah</em>, "the prayer for the dead, may Allah have mercy on you".</li>
<li><strong>Stay where you are.</strong> The janazah follows straight away, behind the same imam and in the same rows. Wait before you start a sunnah prayer or get up to leave.</li>
<li><strong>The bodies</strong> are placed at the front, before the imam, and carried out as soon as the prayer ends.</li>
</ul>
<blockquote><p>Note: For questions of fiqh about the janazah, washing or burial, ask a scholar. The University's scholars and the scholars at the Haram answer questions.</p></blockquote>
<h2>Following the funeral to al-Baqi'</h2>
<p>After the prayer, the bodies are carried out of the masjid to al-Baqi', the cemetery on its eastern side, for burial. Men who wish to follow the funeral walk with it from the masjid. Entry to al-Baqi' is for men only.</p>
<p>Visiting al-Baqi' at other times, and the Madinah Municipality's booking portal for visits, are covered in <a href="/ask/visiting-al-baqi">Can I visit al-Baqi'?</a> and <a href="/guides/masjid-an-nabawi-first-visit">Visiting Masjid an-Nabawi: a first-visit guide</a>. To find where someone is buried, the municipality's grave search on the same portal shows the cemetery and the date of burial.</p>
<h2>When someone in your family dies in Madinah</h2>
<ul>
<li><strong>In hospital,</strong> the hospital confirms the death and reports it electronically. The burial and the death certificate both rest on that report, so there is nothing for you to register at this stage.</li>
<li><strong>At home or anywhere else,</strong> call <strong>997</strong> for an ambulance, or <strong>911</strong>. The Madinah Municipality's department for the care of the deceased, Ekram (إكرام الموتى), handles a death outside a hospital. Its portal has a service to report a death when no hospital has issued a burial permit.</li>
<li><strong>Tell your embassy or consulate</strong> early, whether the burial will be in Madinah or at home.</li>
<li><strong>Decide where the burial will be.</strong> Everything else follows from that choice. If the family is abroad, agree one person here who speaks for them.</li>
</ul>
<p>Every emergency number is in <a href="/ask/emergency-numbers">What are the emergency numbers in Saudi Arabia?</a></p>
<h2>Washing, shrouding and burial in Madinah</h2>
<p>The Madinah Municipality runs the care of the deceased through its Baqi' portal at <a href="https://ekram.amana-md.gov.sa/">ekram.amana-md.gov.sa</a>, the same site that books visits, and through the national Balady platform. Most steps are done online, without visiting an office.</p>
<ul>
<li><strong>Transport and preparation:</strong> request it online. The department sets a time to move the body and prepare it, with washing and shrouding, ready for the janazah prayer.</li>
<li><strong>Charities:</strong> registered charities in Madinah also move and prepare the dead. Balady lists them by city, with their location and contact number. They collect only from hospitals.</li>
<li><strong>The grave:</strong> burial is in al-Baqi' or another Madinah cemetery. The cemetery and the time are booked on Balady with the person's details, and the municipality confirms or adjusts the time with the family.</li>
<li><strong>The burial certificate:</strong> after the burial, the person who received the body prints it from Balady, once the mobile number registered for them is confirmed.</li>
</ul>
<h2>The death certificate</h2>
<p>The official death certificate comes from Civil Affairs (الأحوال المدنية) through Absher, once the hospital's report is in the system. You issue it on Absher, and you need an active account.</p>
<ol>
<li>Sign in to <a href="https://www.absher.sa/">absher.sa</a> as an individual.</li>
<li>Open My Services, then Civil Affairs, then Death Certificate Services.</li>
<li>Choose the report from the list of deaths without a certificate.</li>
<li>Agree to the declaration and confirm the issue.</li>
</ol>
<p>A close family member issues it: a parent, a son or daughter, or a husband or wife. An employer issues it for an employee. The certificate is issued only once, then stays in Absher for the family to view, and a copy can be checked with the Verify Death Certificate service on <a href="https://my.gov.sa/">my.gov.sa</a>. Keep several printed copies.</p>
<h2>Taking the body home</h2>
<ol>
<li><strong>Contact your embassy or consulate first.</strong> It explains its own papers and issues the no objection letter that allows the body to leave the Kingdom.</li>
<li><strong>Give the embassy the next of kin's consent.</strong> If they are abroad, the embassy asks for it in writing.</li>
<li><strong>Issue the death certificate</strong> as above. The embassy and the airline both need it.</li>
<li><strong>Clear the person's record with Jawazat.</strong> Their exit is recorded against the iqama, and any fines on it are settled first.</li>
<li><strong>Embalming</strong> is required before the body is flown, and the hospital issues an embalming certificate.</li>
<li><strong>Book the flight.</strong> Airlines ask for several certified copies of every document, so make them early.</li>
</ol>
<h2>Papers afterwards</h2>
<ul>
<li><strong>The iqama:</strong> the sponsor deals with it at Jawazat. For a wife or child, the sponsor is you as head of the family. Your family's records in Absher are explained in <a href="/guides/family-records-on-absher">Your family's iqamas and records on Absher</a>.</li>
<li><strong>A student on an iqama:</strong> the University's Travel Management handles student iqamas. Write to it through Tawasul.</li>
<li><strong>A student on a Visitor ID:</strong> write to the Deanship of Admission and Registration through Tawasul, subject Educational visa.</li>
</ul>
<h2>When a student of the University dies</h2>
<p>Tell the University straight away: the student's college, and student care on <strong>920022042</strong> or <a href="mailto:care@iu.edu.sa">care@iu.edu.sa</a>. The family abroad decides between burial in Madinah and taking the body home, and the embassy works with them on it. Every office and contact is in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>
<p>Classmates and friends carry much of the load in the first days. Some ways to help:</p>
<ul>
<li><strong>One voice for the family.</strong> Agree one person, a relative or close friend, to speak with the family, so they hear calm and clear news, not many messages.</li>
<li><strong>Share the janazah time</strong> in class and hall groups once it is confirmed, so classmates can pray it.</li>
<li><strong>Go with whoever handles the papers</strong> to the hospital, the embassy or Jawazat, translate for them and keep a copy of every document.</li>
<li><strong>Keep the student's passport, iqama or Visitor ID and University card safe</strong> for the family, and ask Student Affairs before you move anything from a room in the halls.</li>
<li><strong>Keep news and photos off social media</strong> until the family has been told.</li>
</ul>
<blockquote><p>Tip: Write every step down as it happens: who you spoke to, the date and any reference number. The family, the embassy and the University will each ask, and one written record saves you repeating it in a hard week.</p></blockquote>`,
  },
{
    slug: "electricity-water-and-gas-at-home",
    stage: "getting-settled",
    title: "Electricity, water and gas at home",
    summary: "Putting the electricity and water in your name, paying the bills, what each unit costs now and from January 2027, power and water cuts, air conditioning before summer, cooking gas prices and gas safety, and closing it all when you move out.",
    bodyHtml: `
<p>Checked November 2026. In Madinah, electricity comes from Saudi Energy, the company known until 2026 as the Saudi Electricity Company, and water from the National Water Company (NWC). Cooking gas comes in cylinders that you swap when they run out. This guide covers the accounts, the bills and what they cost, cuts and emergencies, and what to do when you leave.</p>
<h2>Accounts in your name</h2>
<p>Before you move in, ask the owner for the electricity and water account numbers, printed on every bill. Enter the electricity number on the View and Pay Bill page of <a href="https://www.se.com.sa/">se.com.sa</a>, with no sign-in, to see whether anything is unpaid. Ask whether the water meter serves your flat alone or the whole building, and how a shared bill is split. The full viewing checklist is in <a href="/guides/finding-an-apartment">Finding and renting a flat</a>.</p>
<p>The person living in a flat is responsible for its meter. With a contract registered on Ejar, the free Financial Liability Transfer service (نقل المسؤولية المالية) moves the electricity and water accounts into your name:</p>
<ol>
<li>The agent selects the transfer when he registers the contract, or you request it in Ejar for a contract already running.</li>
<li>Give the meter's account number from the bill and, for an older meter, the current reading.</li>
<li>Both sides approve the request in Ejar, and it goes to Saudi Energy and NWC to complete.</li>
</ol>
<p>Bills from before the transfer are not yours to pay, unless the meter's owner is not registered with Saudi Energy. On a student visa, see <a href="/ask/rent-on-student-visa">Can I register a rental contract on a student visa?</a> Without an Ejar contract, the accounts stay in the owner's name, so agree in writing who pays which bill and keep every receipt. Anyone can pay a bill with its account number.</p>
<blockquote><p>Tip: Photograph both meters, with the reading clear, on the day you move in.</p></blockquote>
<h2>Paying for electricity, and what it costs</h2>
<ul>
<li><strong>The app:</strong> Saudi Energy, on iPhone and Android, called Alkahrabaa before the 2026 rebrand. To add your meter, open Account management, choose Add account, enter the account details, choose your type of beneficiary and accept the consumption agreement.</li>
<li><strong>Paying:</strong> in the app, on the View and Pay Bill page, or in any bank app under SADAD bill payments, choosing the electricity company as the biller and entering the account number. Pay each bill when it arrives: an unpaid bill leads to the power being cut.</li>
</ul>
<table><thead><tr><th>Home tariff</th><th>Until 31 December 2026</th><th>From 1 January 2027</th></tr></thead><tbody>
<tr><td>First 6,000 kWh a month</td><td>18 halalas per kWh</td><td>21 halalas per kWh</td></tr>
<tr><td>Above 6,000 kWh a month</td><td>30 halalas per kWh</td><td>33 halalas per kWh</td></tr>
<tr><td>Fixed monthly charge</td><td>A meter reading, maintenance and billing fee set by the size of your breaker</td><td>70 SAR for a breaker under 100 amps, more for larger breakers</td></tr>
</tbody></table>
<p>VAT at 15% is added. Under the 2027 tariff, 1,000 kWh in 30 days on a breaker under 100 amps costs 280 SAR before VAT: 210 SAR for the electricity and the 70 SAR fixed charge. Electricity used before 1 January 2027 is billed at the old rates. Typical winter and summer bills are in <a href="/guides/cost-of-living">What it costs to live in Madinah</a>.</p>
<h2>Air conditioning before summer</h2>
<p>Air conditioning is most of a summer bill, and an unserviced unit uses more power and cools less.</p>
<ul>
<li><strong>Service every unit in March or April,</strong> before the heat. A service cleans the filters and the indoor coil, clears the drain pipe, checks the refrigerant gas and cleans the outdoor unit.</li>
<li><strong>Wash the filters</strong> every two to four weeks in summer.</li>
<li><strong>Set the thermostat to 24°C.</strong> Close the curtains on the sunny side, switch off units in empty rooms, and keep the outdoor unit clear of boxes.</li>
<li>Water dripping indoors points to a blocked drain, and weak cooling to a dirty filter or low gas.</li>
</ul>
<p>Who pays for repairs depends on your contract: see the repairs section of <a href="/guides/finding-an-apartment">Finding and renting a flat</a>. Technicians are booked through the home service apps in <a href="/guides/everyday-apps-and-services">Everyday apps and services</a> or through any air conditioning shop.</p>
<h2>Power cuts</h2>
<ul>
<li><strong>Sparks, a burning smell or a fallen cable:</strong> keep away and call <strong>911</strong>.</li>
<li><strong>Only your flat is dark:</strong> check the breaker box inside the flat and switch back any breaker that has tripped.</li>
<li><strong>The building or the street is out too:</strong> report it to Saudi Energy on <strong>933</strong>, 24 hours a day, with your account number, meter number and location, or report it in the app.</li>
</ul>
<p>If an unplanned cut lasts more than 3 hours, the account holder is owed 50 SAR, plus 50 SAR for each further hour or part of an hour. It is credited to the bill within 10 working days, with no claim needed.</p>
<h2>Water</h2>
<p>NWC's app, National Water (المياه الوطنية), and its online branch at <a href="https://ebranch.nwc.com.sa/">ebranch.nwc.com.sa</a> handle bills, payments and requests. You can also pay in any bank app under SADAD with the water account number. NWC's call centre is <strong>8004411110</strong>.</p>
<table><thead><tr><th>Home use from 1 January 2027, per cubic metre</th><th>Water</th><th>Wastewater</th></tr></thead><tbody>
<tr><td>Up to 15 m³ a month</td><td>1 SAR</td><td>0.50 SAR</td></tr>
<tr><td>15 to 30 m³</td><td>2 SAR</td><td>1 SAR</td></tr>
<tr><td>30 to 45 m³</td><td>4 SAR</td><td>2 SAR</td></tr>
<tr><td>Above 45 m³</td><td>6 SAR</td><td>3 SAR</td></tr>
</tbody></table>
<p>From the same date, a fixed monthly charge of 20 SAR for water and 10 SAR for wastewater applies to a meter up to 20 mm, more for larger meters, with a further 20 SAR and 10 SAR for each extra home on the same meter. Until 31 December 2026 the older, lower tariff applies.</p>
<ul>
<li><strong>No water:</strong> report it in the app or on 8004411110.</li>
<li><strong>Water by tanker:</strong> order one in the app or the online branch and choose the tanker size.</li>
<li><strong>Septic tank:</strong> if the building is not on the sewer, book the emptying through NWC's Be'ati service in the same app.</li>
</ul>
<h2>Cooking gas</h2>
<p>Swap an empty cylinder for a full one at a gas shop, or have one delivered to your door. A few buildings have a central tank, refilled by the litre. Refill prices are set for the whole Kingdom and include VAT and transport (from 1 July 2026):</p>
<table><thead><tr><th>Refill</th><th>Price</th></tr></thead><tbody>
<tr><td>11 kg cylinder, the usual home size</td><td>37 SAR</td></tr>
<tr><td>5 kg cylinder</td><td>16.82 SAR</td></tr>
<tr><td>Central gas tank</td><td>1.69 SAR per litre</td></tr>
</tbody></table>
<ul>
<li>Keep the cylinder upright in a well ventilated spot, away from the cooker's heat and out of the sun.</li>
<li>Check the hose, regulator and connections often, and replace a hose that is cracked or hard.</li>
<li>Close the cylinder valve when you leave the kitchen and before you sleep, and fit a gas leak detector for an early warning.</li>
</ul>
<blockquote><p>Important: If you smell gas, do not touch a light switch, a lighter or anything that makes a spark. Get everyone out, close the cylinder valve, open the doors and windows slowly, and call Civil Defence on 998, or 911. All emergency numbers are in <a href="/ask/emergency-numbers">What are the emergency numbers in Saudi Arabia?</a></p></blockquote>
<h2>Moving out, and home internet</h2>
<ul>
<li><strong>With an Ejar contract,</strong> the transfer ends by itself when the contract ends. Ejar asks you for a final meter reading, the meters go back to the owner and no further bills come to you. Without a reading the bill is estimated, so photograph both meters on your last day.</li>
<li><strong>Without Ejar,</strong> the accounts are already in the owner's name. If you added yourself to the meter in the Saudi Energy app, remove yourself under Account management, which issues a final bill.</li>
<li>Pay the last electricity and water bills before you hand back the keys. Notice, handover and deposit are in <a href="/guides/graduate-procedures">Leaving Madinah for good</a>.</li>
<li><strong>Home internet:</strong> see <a href="/ask/home-internet-no-iqama">How do I get home internet without an iqama?</a> and <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</li>
</ul>`,
  },
{
    slug: "visiting-the-quran-printing-complex",
    stage: "getting-settled",
    title: "Visiting the King Fahd Qur'an Printing Complex",
    summary: "How to book a free visit to the Complex that prints the Madinah Mushaf, with visiting hours, how to get there, its study apps and fonts, and how to buy Mushafs to send home.",
    bodyHtml: `
<p>Checked November 2026. The King Fahd Glorious Qur'an Printing Complex (مجمع الملك فهد لطباعة المصحف الشريف) is where the Madinah Mushaf is printed, and it welcomes visitors. Entry is free: you book a time online, walk through the stages of producing a Mushaf, and leave with a copy as a gift. The Complex also publishes digital editions of the Mushaf, translations and recitations that are useful for study.</p>
<h2>What the Complex is</h2>
<p>The Complex opened in 1405 AH (1984). It prints the Madinah Mushaf (مصحف المدينة النبوية) in the narration of Hafs, editions in other narrations such as Warsh and Qalun, translations of the meanings of the Qur'an in more than 70 languages, and books on the sciences of the Qur'an. It also records the whole Qur'an with its approved reciters in its own studio. Its website, <a href="https://qurancomplex.gov.sa/en/">qurancomplex.gov.sa</a>, is in Arabic and English.</p>
<h2>Booking a visit</h2>
<p>Visits are by appointment, booked in advance through the Complex's own booking service.</p>
<ol>
<li>Open <a href="https://visit.qurancomplex.gov.sa/">visit.qurancomplex.gov.sa</a>, or the Complex's iPhone app <strong>Visit Quran Press in Madinah</strong> (زيارة مطبعة المصحف بالمدينة).</li>
<li>Create an account or sign in.</li>
<li>Choose a day and a time within the visiting hours below.</li>
<li>Keep the confirmation on your phone and arrive a little before your time.</li>
</ol>
<p>For a question about a family or group visit, call the Complex on +966 14 861 5600.</p>
<h2>Visiting hours</h2>
<table><thead><tr><th>Day</th><th>Morning</th><th>Afternoon and evening</th></tr></thead><tbody>
<tr><td>Sunday to Thursday</td><td>7 am to 12 noon</td><td>2 pm to 7 pm</td></tr>
<tr><td>Friday</td><td>Closed</td><td>3 pm to 7 pm</td></tr>
<tr><td>Saturday</td><td>8 am to 12 noon</td><td>3 pm to 7 pm</td></tr>
</tbody></table>
<blockquote><p>Note: Ramadan and the Hajj season have their own timetables. The Complex announces them before each season, including on its X account, @qurancomplex.</p></blockquote>
<h2>On the day</h2>
<ul>
<li><strong>What you see:</strong> the visit follows the making of a Mushaf, from printing to the review and checking that every copy passes through before it leaves the Complex.</li>
<li><strong>The gift:</strong> at the end, each visitor receives a copy of the Mushaf, or a translation of its meanings, as a gift.</li>
<li><strong>Dress:</strong> dress as you would for the masjid.</li>
<li><strong>Photos:</strong> ask the staff before you take photos or film.</li>
<li><strong>Prayer:</strong> the Complex has its own masjid.</li>
</ul>
<blockquote><p>Tip: A visit makes a good outing for a halaqah, a class or parents visiting from home. For their stay, see <a href="/guides/bringing-parents-to-visit">Bringing your parents to visit Madinah</a>.</p></blockquote>
<h2>Getting there</h2>
<p>The Complex is on the Tabuk road (طريق تبوك) in the Al Nakhil district, on the north-west side of the city, about 10 km by road from Masjid an-Nabawi. Search for its Arabic name in your maps app.</p>
<ul>
<li><strong>Ride apps:</strong> Bolt, Careem, Jeeny and Uber all go there. Book your ride back once you come out of the visit.</li>
<li><strong>By car:</strong> take the Tabuk road north-west out of the city.</li>
</ul>
<p>Fares and other ways around the city are in <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</p>
<h2>Digital editions for study</h2>
<p>The Complex publishes its Mushaf and its other work in digital form. Download each one from the Complex's own sites or its page in the app store.</p>
<table><thead><tr><th>Resource</th><th>What it does</th><th>Where</th></tr></thead><tbody>
<tr><td>Mushaf apps</td><td>The Madinah Mushaf page by page in high resolution: <strong>Quran Hafs by KFGQPC</strong> (listed in some stores as <strong>Quran Madina</strong>) for iPhone, Android, Mac and Windows, and a Warsh edition</td><td><a href="https://qurancomplex.gov.sa/en/apps/">qurancomplex.gov.sa/en/apps</a></td></tr>
<tr><td>Madinah Mushaf for computer publishing</td><td>Copies ayat by surah, page, ayah or word into your documents in the Uthmanic script, ready for research papers and handouts</td><td><a href="https://nashr.qurancomplex.gov.sa/en/">nashr.qurancomplex.gov.sa</a></td></tr>
<tr><td>Nashr Maktabi</td><td>A single file that runs without installing. Pick an ayah on the page view and copy it into any program</td><td><a href="https://nashrmaktabi.qurancomplex.gov.sa/en/">nashrmaktabi.qurancomplex.gov.sa</a></td></tr>
<tr><td>Mushaf fonts</td><td>The Uthmanic script fonts of the Madinah Mushaf for Hafs and the other narrations, such as KFGQPC Uthmanic Script HAFS</td><td>The Complex's website</td></tr>
<tr><td>Translations of the meanings</td><td>The Complex's translations, language by language, with the translator of each</td><td><a href="https://qurancomplex.gov.sa/en/kfgqpc-quran-translate/">qurancomplex.gov.sa, Translations</a></td></tr>
<tr><td>Recitations</td><td>The complete Mushaf recited by the Complex's approved reciters, to stream by surah or download</td><td><a href="https://audio.qurancomplex.gov.sa/site/">audio.qurancomplex.gov.sa</a></td></tr>
<tr><td>Virtual tour</td><td>A virtual reality tour of the Complex, good for family back home</td><td><a href="https://my.gov.sa/en/services/483656">my.gov.sa</a></td></tr>
</tbody></table>
<p>For learning to recite with a teacher, see <a href="/ask/learn-tajweed-in-madinah">Where can I learn tajweed in Madinah?</a></p>
<h2>Buying Mushafs and sending them home</h2>
<p>The Complex sells its editions, including Mushafs in Hafs and the other narrations, translations and books on the sciences of the Qur'an, at its Mushaf Services Centre (مركز خدمات المصحف الشريف) on the Tabuk road. The editions for sale are listed on the website under <a href="https://qurancomplex.gov.sa/kfgqpc-pub-sales/">publications for sale</a>.</p>
<ol>
<li>Message the sales team on WhatsApp at +966 53 724 1277 with the editions and quantities you want, and confirm they are in stock and when to collect.</li>
<li>Pay for the order before you collect it, in cash or by another payment method the centre accepts.</li>
<li>Collect your order at the centre.</li>
</ol>
<p>The centre does not post orders. To send Mushafs abroad, arrange the shipping yourself with a courier: the centre takes no responsibility for damage or loss on the way. Couriers and packing are covered in <a href="/guides/shipping-and-receiving-parcels">Shipping and receiving parcels in Madinah</a>.</p>
<h2>More places to visit</h2>
<p>The masjids, battle sites and wells of the city are in <a href="/guides/historic-sites-and-masjids">Historic sites and masjids of Madinah</a>, and longer outings are in <a href="/guides/day-trips-from-madinah">Day trips and weekends away from Madinah</a>. For an afternoon with young children, see <a href="/guides/kids-activities">Play areas and fun places for children in Madinah</a>.</p>`,
  },
];
