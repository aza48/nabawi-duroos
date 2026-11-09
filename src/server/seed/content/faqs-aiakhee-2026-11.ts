import type { SeedFaq } from "./guides-2026";

/**
 * aiakhee's FAQ overlay, November 2026. Spread last into SEED_FAQS (sync.ts), so an entry here with the
 * slug of an FAQ in the guide files replaces that FAQ, and an entry with a new slug adds a new FAQ.
 * The FAQs in guides-*.ts belong to akhiai and are not edited directly.
 * Evidence for every entry, and what was left out, is in docs/research/faq-content-2026-11.md.
 */

/** Replacements: same slug as an FAQ in the guide files. */
const REPLACEMENTS: SeedFaq[] = [
  // Yes or no said once: the lead in faq-leads.ts says it, and the answer no longer repeats it.
  // student-discounts, free-bus-to-haram and drive-on-visit-visa follow admin's November 2026 rewrite word for word
  // apart from that opening; if admin changes them again, change them here too.
  {
    slug: "bank-account-without-iqama",
    category: "getting-settled",
    question: "Can I open a Saudi bank account without an iqama?",
    answerHtml: `<p>Visitor ID holders have been able to do this since September 2025. Before you apply, check in Absher that all three are in place.</p><p>Either go to a branch with your passport and show your Visitor ID in the Absher app, or open the account online and confirm your identity through Nafath. The bank also asks for your home address and the purpose of your stay. The account works only while your Visitor ID is valid and is frozen when it expires. See <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a>.</p>`,
    tags: ["bank", "bank account", "visitor id", "mada", "iqama", "nafath"],
  },
  {
    slug: "student-discounts",
    category: "getting-settled",
    question: "Are there discounts for University students?",
    answerHtml: `<p>The University's partner programme has more than 100 offers at hospitals, clinics, labs, opticians, schools, car rentals, restaurants, hotels and gyms. Some name students, and many are written for University staff, so show your University card and ask before you pay. See <a href="/discounts">Student discounts</a>.</p><p>At the University Sports Club a student pays 125 SAR for one month, half the 250 SAR public price, and 1,000 SAR for a year. The full price list is in <a href="/guides/sports-and-activities">Sport and fitness classes</a>.</p>`,
    tags: ["discounts", "offers", "sports club", "gym", "university card", "students"],
  },
  {
    slug: "joint-bank-account-spouse",
    category: "family",
    question: "Can I open a joint bank account with my wife?",
    answerHtml: `<p>The Saudi Central Bank's rules allow joint accounts for residents between spouses and between first-degree relatives, and in a few other set cases. A dependant whose iqama does not allow work can open an account, but the money in it must not come from work. Ask your bank which documents it needs.</p>`,
    tags: ["bank", "joint account", "wife", "married"],
  },
  {
    slug: "foreign-prescriptions",
    category: "getting-settled",
    question: "Will a pharmacy accept my prescription from home?",
    answerHtml: `<p>Only doctors licensed in Saudi Arabia can prescribe here, and some medicines are controlled. If you take regular medicine, bring a letter from your doctor naming the drug, the dose and the amount, and see a Saudi doctor for a new prescription. More in <a href="/guides/doctors-hospitals-and-pharmacies">Doctors, hospitals, pharmacies and emergency numbers</a>.</p>`,
    tags: ["medicine", "prescription", "pharmacy", "health"],
  },
  {
    slug: "free-bus-to-haram",
    category: "university",
    question: "Is there a free bus from the University to the Haram?",
    answerHtml: `<p>The buses run between the campus, the halls outside it and Masjid an-Nabawi. Pick-up points and times change during the year, so for the current ones message Admin on WhatsApp at +1 234 567 9076 or email <a href="mailto:mesh@albaseerah.org">mesh@albaseerah.org</a>.</p><p>Meals, health and housing on campus are in <a href="/guides/campus-life-islamic-university">Student life at the Islamic University</a>.</p>`,
    tags: ["bus", "transport", "haram", "campus"],
  },
  {
    slug: "rent-on-student-visa",
    category: "getting-settled",
    question: "Can I register a rental contract on a student visa?",
    answerHtml: `<p>Find a flat and agree the rent, the length of the contract and how you will pay. Then pick an agent from Ejar's official list of accredited agents and give the agent your details and the landlord's. The agent enters the contract on Ejar, and you and the landlord each get a link by text message to check and approve it.</p><p>This is how students on the educational visa with a Visitor ID register a lease. More in <a href="/guides/finding-an-apartment">Finding and renting a flat</a> and <a href="/ask/what-is-ejar">What is Ejar?</a></p>`,
    tags: ["ejar", "rent", "housing", "visa", "visitor id"],
  },
  {
    slug: "drive-on-visit-visa",
    category: "getting-settled",
    question: "Can I drive on a visit visa?",
    answerHtml: `<p>Your own valid licence works if Saudi Arabia recognises it, for up to one year from the day you entered or until the licence expires, whichever comes first. This covers tourist, Umrah and family visit visas.</p><p>Carry the original licence, make sure its class matches the vehicle (a car licence does not cover a motorcycle), and after an accident report it in the Najm app. Car hire firms set their own rules, and many ask for an International Driving Permit. Gulf citizens drive on their own national licence, but permits issued in the Gulf states are not accepted.</p><p>To get a Saudi licence or register a car you need an iqama. See <a href="/guides/drivers-license">Getting a Saudi driving licence</a>.</p>`,
    tags: ["driving", "licence", "international driving permit", "visit visa", "tourist visa", "car hire", "najm"],
  },
  {
    slug: "bringing-medicine-into-saudi",
    category: "getting-started",
    question: "Can I bring my regular medicine to Saudi Arabia?",
    answerHtml: `<p>Bring enough for the first weeks, in the original boxes, in your hand luggage, with a letter from your doctor naming each medicine, the dose and the amount. Medicines with narcotic or psychotropic substances, such as some painkillers, sleeping pills, anxiety medicines, stimulants and antidepressants, also need the Saudi Food and Drug Authority's traveller's permit before you fly. Apply in its Controlled Drugs System at <a href="https://cds.sfda.gov.sa/">cds.sfda.gov.sa</a> and carry the approved permit. Prescriptions from other countries are not accepted by pharmacies here, so see a doctor in Madinah for a new one. More in <a href="/guides/what-to-bring-to-madinah">What to bring to Madinah</a>.</p>`,
    tags: ["medicine", "sfda", "permit", "prescription", "packing", "customs"],
  },
  {
    slug: "buying-a-used-car",
    category: "getting-settled",
    question: "Can I buy a used car as a student, and what do I need?",
    answerHtml: `<p><strong>With an iqama:</strong> used cars are sold on classified apps and websites and at used car showrooms. A resident can own private cars only.</p><ol><li><strong>Check the car before you pay:</strong> a valid registration (istimara), a valid periodic technical inspection (الفحص الفني الدوري), and no fines on the car. Have a mechanic look at it too.</li><li><strong>Insure it in your name</strong> before the transfer. Absher does not complete a sale without valid insurance.</li><li><strong>Transfer it in Absher.</strong> The seller starts the sale in his Absher, you accept it in yours and pay the fees Absher shows. Both of you need active Absher accounts, and the transfer is refused while there are unpaid fines on you or the car.</li><li><strong>Check</strong> that the car shows under your vehicles in Absher.</li></ol><p>Swap your home licence for a Saudi one as well: see <a href="/guides/drivers-license">Getting a Saudi driving licence</a>.</p><p><strong>On a Visitor ID,</strong> owning or registering a car needs an iqama, so you cannot buy one in your own name. You can drive on your valid home licence with an International Driving Permit for one year from the day you entered, and rent a car: see <a href="/guides/drivers-license">Getting a Saudi driving licence</a> and <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>`,
    tags: ["car", "used car", "buy", "absher", "ownership transfer", "insurance", "inspection", "istimara"],
  },

  // Fixes from the November 2026 content audit and fact-checks.
  {
    slug: "learn-arabic-before-iu",
    category: "getting-started",
    question: "Where can I learn Arabic in Madinah before getting into the University?",
    answerHtml: `<p>Madinah has year-round Arabic institutes, one-month intensive courses and free Arabic classes for sisters. The main options are on <a href="/programs">Study in Madinah</a>.</p><p>Each listing gives its cost, or how to ask about it, and how to join. If the University invites you to its Arabic placement test when you apply, the result decides whether you start in its Arabic Institute, and at which level, or go straight into a college. See <a href="/guides/applying-to-the-islamic-university">Applying to the Islamic University</a>.</p>`,
    tags: ["arabic", "arabic course", "institute", "study in madinah"],
  },
  {
    slug: "monthly-budget",
    category: "getting-settled",
    question: "How much money do I need per month in Madinah?",
    answerHtml: `<p>As of November 2026, about 2,900 to 6,700 SAR for one person, and 6,300 to 12,800 SAR for a family of three or four.</p><p>The single figure assumes a shared room or small flat, and the family figure does not include school fees. Single students on a full University scholarship live in the halls and receive a monthly stipend, so they spend far less. Full breakdown: <a href="/guides/cost-of-living">What it costs to live in Madinah</a>.</p>`,
    tags: ["budget", "cost of living", "rent", "money", "family"],
  },
  {
    slug: "home-internet-no-iqama",
    category: "getting-settled",
    question: "How do I get home internet without an iqama?",
    answerHtml: `<p>Fixed home internet needs an iqama. Without one, put an unlimited data SIM in a portable 5G router for Wi-Fi at home.</p><p>Every mobile operator sells data SIMs. Compare their current bundles and check the coverage where you live. See <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a> and <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>.</p>`,
    tags: ["internet", "wifi", "router", "sim", "visitor id", "iqama"],
  },
  {
    slug: "do-i-register-for-duroos",
    category: "duroos",
    question: "Do I need to register to attend the duroos?",
    answerHtml: `<p>No. The duroos of the mashayikh are open to everyone, with no registration.</p><p>Only the Qur'an and mutun halaqat take registrations, online at <a href="https://reg.qm.edu.sa/">reg.qm.edu.sa</a>. See <a href="/programs/nabawi-halaqat">Qur'an and mutun halaqat in the Haram</a> and today's <a href="/duroos">Duroos</a>.</p>`,
    tags: ["duroos", "registration", "halaqat", "haram"],
  },
  {
    slug: "join-mesh-group",
    category: "getting-started",
    question: "How do I join the MESH WhatsApp group?",
    answerHtml: `<p>Tap any "Join the group" button on this site.</p><p>Keep posts relevant, share only verified information, and no debates. The full rules are on the <a href="/more">More</a> page.</p>`,
    tags: ["whatsapp", "group", "mesh", "community"],
  },
];

/** New FAQs. */
const NEW_FAQS: SeedFaq[] = [
  {
    slug: "what-is-a-visitor-id",
    category: "getting-started",
    question: "What is a Visitor ID, and how do I get one?",
    answerHtml: `<p>A Visitor ID (هوية زائر) is the digital ID that comes with the educational visa, in place of an iqama. You get it in Absher.</p><ul><li>It is issued by the General Directorate of Passports (Jawazat) through Absher and tied to your border number, the number Jawazat gives you when you first enter the Kingdom.</li><li>It is digital only, shows in the Absher app, and cannot be printed. Your passport stays your travel document.</li><li>The educational visa behind it is valid for one year and renewed each year while you study.</li></ul><p>Get it in this order, because each step needs the one before:</p><ol><li>Buy a Saudi SIM with your passport and border number: see <a href="/ask/buy-a-sim-card">What do I need to buy a Saudi SIM card?</a></li><li>Register on Absher as a new user, then activate it at a self-service kiosk with your fingerprint.</li><li>Activate Nafath in the Nafath app.</li><li>In Absher, choose <strong>Issue visitor ID</strong> and complete the details.</li></ol><p>What it lets you do, from a bank account to renting, is in <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a>, and the whole first week in <a href="/guides/new-student-steps">First steps for new students</a>. If activation fails, see <a href="/ask/absher-nafath-activation">My Absher or Nafath activation keeps failing</a>.</p>`,
    tags: ["absher", "border number", "jawazat", "nafath"],
  },
  {
    slug: "visitor-id-expiry",
    category: "getting-started",
    question: "What happens when my Visitor ID expires?",
    answerHtml: `<p>Your bank account and mada card freeze until the Visitor ID is renewed. Ask the University about renewal well before the expiry date.</p><ol><li>Note the expiry date shown in Absher, and set reminders a month and a week before it.</li><li>Ask about renewal through Tawasul: choose the Deanship of Admission and Registration and the subject <strong>Educational visa</strong>.</li><li>Keep enough cash or a working foreign card for a few days, in case your Saudi card is frozen.</li><li>After the renewal, check that the new date shows in Absher and that your bank has it. If your card stays frozen, take your passport to a branch.</li><li>If your mobile line stops, take your passport to your operator, then update the number in Absher so your codes still reach you.</li></ol><p>More in <a href="/guides/living-on-a-visitor-id">Living on a Visitor ID</a> and <a href="/guides/phone-sims-and-absher">Your phone number, SIM checks and Absher</a>.</p>`,
    tags: ["visitor id", "expiry", "renewal", "bank", "frozen", "mada", "educational visa"],
  },
  {
    slug: "buy-a-sim-card",
    category: "getting-started",
    question: "What do I need to buy a Saudi SIM card?",
    answerHtml: `<p>Your passport and your border number, or your iqama if you have one. The shop registers the line to you with your fingerprint.</p><ul><li><strong>Where:</strong> at the airport, in malls or at any operator's branch.</li><li><strong>Which kind:</strong> a real Saudi SIM, not a data-only eSIM, because banks and Absher send their codes by text message.</li><li><strong>Students on the educational visa</strong> need this number before anything else, because Absher is registered with it.</li><li><strong>Your border number</strong> is the entry number linked to your visa. Write it down when you land: the SIM, Absher and the bank all ask for it.</li></ul><p>Coverage changes from area to area and bundles change often, so compare each operator's current offers. Home internet, SIM checks and changing your number are in <a href="/guides/sim-internet-bank">SIM card, internet and a Saudi bank card</a> and <a href="/guides/phone-sims-and-absher">Your phone number, SIM checks and Absher</a>.</p>`,
    tags: ["sim", "mobile", "border number", "fingerprint", "airport", "esim"],
  },
  {
    slug: "madinah-bus-fares",
    category: "getting-settled",
    question: "How much is the Madinah bus, and how do I pay?",
    answerHtml: `<p>As of November 2026, a city bus ride costs 3.45 SAR. No cash: pay by bank card, phone or the Madinah Bus app.</p><ul><li><strong>Ways to pay:</strong> mada, Visa or Mastercard, Apple Pay or another phone wallet, the virtual card in the app, or a plastic bus card.</li><li><strong>Passes in the app:</strong> 10 rides in a day for 10 SAR, 35 rides in a week for 60 SAR, and 175 rides in a month for 240 SAR.</li><li><strong>One ticket, one bus:</strong> changing buses means a new fare.</li><li><strong>The airport route (400)</strong> has its own fare, shown in the app.</li><li><strong>Hours:</strong> about 6 am to midnight, with some routes round the clock. Each route's times are under Prices and service times in the app.</li><li><strong>Help:</strong> Madinah Bus customer care, 920000877.</li></ul><p>Top up the app wallet in small amounts: only a balance above 50 SAR can be refunded, less a 20% fee. More in <a href="/guides/haramain-train-and-city-buses">The Haramain train and Madinah buses</a>.</p>`,
    tags: ["bus", "madinah bus", "fare", "pass", "transport", "apple pay", "route 400"],
  },
  {
    slug: "haramain-train-to-makkah",
    category: "getting-settled",
    question: "How do I take the Haramain train to Makkah, and what does it cost?",
    answerHtml: `<p>As of November 2026, economy to Makkah starts at 162 SAR before VAT, and the direct train takes about 2 hours 20 minutes.</p><ul><li><strong>Booking:</strong> on <a href="https://sar.hhr.sa/">sar.hhr.sa</a>, in the official HHR app or in the Nusuk app. Keep the e-ticket on your phone.</li><li><strong>Fares</strong> move with demand. Base fares from Madinah: Makkah from 162 SAR in economy and 455 SAR in business, Jeddah from 135 SAR in economy and 375 SAR in business. 15% VAT is added at checkout.</li><li><strong>Children</strong> get 50% off economy and 40% off business. An infant on a parent's lap pays 10% of the fare.</li><li><strong>ID:</strong> enter each passenger with the ID they will carry on the day (passport, iqama or Saudi ID). Staff check it with the ticket.</li><li><strong>Luggage:</strong> one bag of up to 25 kg (65 by 55 by 35 cm) and one small hand item each. Bags are screened, so arrive at least 30 minutes early.</li><li><strong>Changes:</strong> tickets bought online can be changed or refunded under the fare rules. Tickets bought at a station counter or machine cannot.</li></ul><p>Madinah station is in Al Hadra, about 9 km from the Haram, and express bus route 300 links it with the central bus station by the Prophet's Mosque. Going for Umrah? Book your Nusuk permit first: see <a href="/ask/umrah-from-madinah">How do I go for Umrah from Madinah?</a> More in <a href="/guides/haramain-train-and-city-buses">The Haramain train and Madinah buses</a>. Customer care: 920004433.</p>`,
    tags: ["haramain", "train", "makkah", "jeddah", "hhr", "fare", "umrah", "travel"],
  },
  {
    slug: "umrah-from-madinah",
    category: "getting-settled",
    question: "How do I go for Umrah from Madinah?",
    answerHtml: `<p>Book a free Umrah permit in Nusuk, enter ihram at Dhul Hulayfah (Abyar Ali), then travel to Makkah by train, bus or car.</p><ol><li><strong>Book the permit in Nusuk</strong> before you travel. It is free. Iqama holders sign in with Nafath, and visitors register with their passport and visa details. Students on a Visitor ID book in Nusuk too. You can hold only one active permit at a time and its time cannot be changed, so cancel it in the app and book again if your plans move.</li><li><strong>Enter ihram at the miqat</strong>, Dhul Hulayfah (Abyar Ali), about 14 km from the Prophet's Mosque on the road to Makkah. Buses and cars stop there. Going by train? Many people put on ihram at the masjid at Dhul Hulayfah, then take a taxi to the station.</li><li><strong>Travel to Makkah</strong>, about 420 km away: around 2 hours 20 minutes on the Haramain train, or 4.5 to 5 hours by road. Fares and booking: see <a href="/ask/haramain-train-to-makkah">How do I take the Haramain train to Makkah?</a></li></ol><p>Umrah permits stop from 1 Dhul Qa'dah until after Hajj. In 1448 that is from 8 April 2027, so plan any Umrah before then. Trains and buses fill up in Ramadan, so book early. See <a href="/guides/umrah-rawdah-quba">Umrah, the Rawdah and Quba</a> and <a href="/guides/getting-around">Getting around Madinah, and to Makkah</a>.</p>`,
    tags: ["umrah", "nusuk", "permit", "miqat", "dhul hulayfah", "abyar ali", "ihram", "makkah"],
  },
  {
    slug: "hajj-while-studying",
    category: "getting-settled",
    question: "Can I perform Hajj while I live in Madinah?",
    answerHtml: `<p>With a valid iqama, yes: register in Nusuk when registration opens. On a Visitor ID, ask the University through Tawasul before you register or pay.</p><ul><li><strong>Only through Nusuk.</strong> Every domestic package is sold by a licensed company in the Nusuk app or at <a href="https://www.nusuk.sa/">nusuk.sa</a>. A package sold outside Nusuk gives you no permit.</li><li><strong>Who goes first:</strong> people performing their first Hajj, and residents whose iqama was issued more than a year ago.</li><li><strong>Your iqama</strong> must stay valid until the end of Dhul Hijjah 1448 (5 June 2027).</li><li><strong>No visit visa</strong> of any kind, including the tourist eVisa, allows Hajj.</li><li><strong>Vaccinations:</strong> meningitis (ACWY) and seasonal flu, before you book.</li></ul><p>For 1448, watch Nusuk from the start of Ramadan (8 February 2027). Hajj without a permit is fined up to 20,000 SAR, and residents who are caught are deported and barred for 10 years, which ends a student's studies. Every step and the 1448 timeline are in <a href="/guides/hajj-as-a-student">Hajj from Madinah as a student or resident</a>.</p>`,
    tags: ["hajj", "nusuk", "resident", "iqama", "visitor id", "permit", "1448", "domestic hajj"],
  },
  {
    slug: "visiting-al-baqi",
    category: "getting-settled",
    question: "Can I visit al-Baqi'?",
    answerHtml: `<p>Brothers can. Al-Baqi' is on the eastern side of Masjid an-Nabawi, across the courtyard. It is open to men only, and entry is free.</p><ul><li><strong>Booking:</strong> visits can be booked, and the crowd level checked, on the Baqi' portal of Madinah Municipality, <a href="https://ekram.amana-md.gov.sa/">ekram.amana-md.gov.sa</a>.</li><li><strong>Inside:</strong> photos and filming are not allowed.</li><li><strong>Sisters</strong> can see it from outside the boundary.</li><li><strong>Lost a child nearby?</strong> The main lost children's office is by the Baqi' wall, opposite courtyard door 34C.</li></ul><p>More in <a href="/guides/masjid-an-nabawi-first-visit">Visiting Masjid an-Nabawi</a>.</p>`,
    tags: ["baqi", "al-baqi", "jannat al-baqi", "cemetery", "ziyarah", "haram", "men"],
  },
  {
    slug: "sisters-gates-masjid-an-nabawi",
    category: "family",
    question: "Which gates do sisters use at Masjid an-Nabawi?",
    answerHtml: `<p>Gates 25, 29 and 41 are women's entrances. The women's prayer areas are on the western and northern sides, behind screens and marked by signs.</p><ul><li><strong>Western side:</strong> through gates 13 and 17D.</li><li><strong>Northern side:</strong> through gates 23 to 31B.</li><li>There are also women's areas in the courtyards, and women staff check bags at the door.</li><li>Gate use changes during building work and in busy seasons, so go by the signs on the day.</li><li>Note the number of the gate you came in by, and agree a meeting gate with your family before you separate.</li></ul><p>The women's library, open 24 hours, is by the women's prayer areas near Gate 24 and Gate 16. Rawdah visits, children's centres and Qur'an circles are in <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>.</p>`,
    tags: ["sisters", "women", "gates", "bab", "women's section", "haram", "masjid an-nabawi"],
  },
  {
    slug: "children-at-masjid-an-nabawi",
    category: "family",
    question: "Is there somewhere for my children while I pray at Masjid an-Nabawi?",
    answerHtml: `<p>Yes. Children's hospitality centres in the courtyards look after young children while you pray: boys up to 6 and girls up to 9.</p><ul><li><strong>Bring your ID.</strong> It is needed to leave a child and to collect them.</li><li><strong>Inside the centres:</strong> play areas, activities and a class for memorising short surahs.</li><li><strong>Library:</strong> the Prophet's Mosque Library has reading halls for children.</li><li><strong>Lost children:</strong> the main office is by the Baqi' wall opposite courtyard door 34C, and there is one in each of the eastern and western women's prayer areas. Put a card with your phone number in your child's pocket.</li><li><strong>Babies:</strong> the women's toilets have shelves for changing a baby, and a baby carrier is easier than a pram in the crowds.</li></ul><p>The General Authority for the Care of the Two Holy Mosques answers on 1966. More in <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>.</p>`,
    tags: ["children", "kids", "childcare", "hospitality centre", "lost child", "haram", "family"],
  },
  {
    slug: "wheelchair-at-masjid-an-nabawi",
    category: "family",
    question: "Can I borrow a wheelchair at Masjid an-Nabawi?",
    answerHtml: `<p>Yes. Free wheelchairs are lent from the Gates Management Office at Gate 7.</p><ul><li><strong>Electric carts</strong> carry elderly and disabled visitors around the outer courtyards.</li><li><strong>Lifts:</strong> electric lifts at Gate 9 on the east side and Gate 33 on the west side go up to the roof, and there are ramps beside the entrances.</li><li><strong>Restrooms</strong> set aside for elderly and disabled visitors are spread around the masjid.</li><li><strong>Deaf visitors</strong> have a room on the western roof where the Friday sermon is interpreted into sign language.</li><li><strong>Health centres</strong> by Jibril Gate (355) and by Al-Safiyyah (305) are open round the clock.</li></ul><p>The General Authority for the Care of the Two Holy Mosques answers on 1966. In an emergency, call 997 for an ambulance. More in <a href="/guides/women-at-masjid-an-nabawi">Masjid an-Nabawi for sisters and families</a>.</p>`,
    tags: ["wheelchair", "elderly", "disabled", "accessibility", "lift", "electric cart", "haram"],
  },
  {
    slug: "nationality-representative",
    category: "university",
    question: "Who is my nationality representative and what does he do?",
    answerHtml: `<p>He is a student of your nationality who passes University notices on to you and collects your group's lists for tickets, visas and forms.</p><ul><li><strong>Notices:</strong> he forwards notices from the Travel Administration, the Deanship of Student Affairs and other offices, often with a short summary.</li><li><strong>Lists and forms:</strong> he gathers the lists for summer tickets and visas, and passes on urgent University forms, such as the forms for renewing the educational visa. Answer them by the deadline he gives.</li><li><strong>Emergency contact:</strong> representatives keep an emergency contact form for their students, so fill it in when he asks.</li><li><strong>Events:</strong> some University events take registration through the representatives. Register through one channel only.</li><li><strong>The role is unpaid.</strong> In 1448, nominations opened to any student in August 2026, at the nationality representatives' office in the Deanship of Student Affairs.</li></ul><p>To find yours, ask at that office. Your own requests, such as ta'jeel or a visa question, still go to the University through Tawasul: see <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>`,
    tags: ["representative", "mandoob", "nationality", "notices", "tickets", "visa", "student affairs"],
  },
  {
    slug: "skills-record",
    category: "university",
    question: "What is the University Skills Record?",
    answerHtml: `<p>It is the University's official platform for club and activity programmes: you register for events there, your attendance is taken, and certificates are issued.</p><ul><li><strong>Where:</strong> <a href="https://services.iu.edu.sa/student-skill-record/Programs">services.iu.edu.sa/student-skill-record</a>. It opened in October 2026, and courses, workshops and volunteering run by the University are logged there.</li><li><strong>Who can register:</strong> current students and graduates, within each programme's registration period and while seats remain.</li><li><strong>Attendance</strong> can be marked only in the first 10 minutes after the event starts, so arrive on time.</li><li><strong>Passing a programme:</strong> attend at least 75% of its hours and have the organiser approve your attendance. The activity and its hours are then added to your Skills Record.</li></ul><p>Volunteering opportunities also record your hours on the National Volunteering Platform at <a href="https://nvg.gov.sa/">nvg.gov.sa</a>, where you register on each opportunity's own page. Hours are approved only for volunteers who turn up and work. Other offices are in <a href="/guides/university-offices-and-contacts">Who to ask at the Islamic University</a>.</p>`,
    tags: ["skills record", "السجل المهاري", "clubs", "activities", "certificates", "volunteering", "nvg"],
  },
];

export const FAQS_AIAKHEE_2026_11: SeedFaq[] = [...REPLACEMENTS, ...NEW_FAQS];

/** Slugs of the entries above that replace an FAQ in the guide files. */
export const AIAKHEE_REPLACED_SLUGS = REPLACEMENTS.map((f) => f.slug);
