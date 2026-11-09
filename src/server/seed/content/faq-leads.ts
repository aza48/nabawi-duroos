/**
 * A one-sentence short answer that opens each FAQ, ahead of the full answer.
 * Each lead restates only facts already in that FAQ's answer, in at most 25 words.
 * FAQs whose answer already opens with a short paragraph that answers outright have no lead:
 * do-i-register-for-duroos, female-doctor, home-internet-no-iqama and mahad-books.
 * Plain text: withFaqLead escapes it and adds it as the first paragraph when the content syncs.
 */
export const FAQ_LEADS: Record<string, string> = {
  "defer-my-place": "Do not count on it: asking to arrive later than the semester you are offered can send your visa application back.",
  "is-housing-included": "Yes for full scholarship students, whom the University houses; no for partial scholarships, which cover tuition only.",
  "istiqdam-deposit": "With an iqama you can ask the University to sponsor them; its student affairs office tells you the refundable deposit and when requests open.",
  "join-mesh-group": "Through any \"Join the group\" button on this site; members keep posts relevant, share only verified information and avoid debates.",
  "how-to-apply-iu": "Apply online on the national Study in Saudi portal while applications are open, choosing up to 25 programmes.",
  "stipend-amount": "It is set by college: check your own monthly figure in the Academic System, under Personal, then Rewards.",
  "learn-arabic-before-iu": "At year-round institutes, from about 350 SAR a month, or in one-month intensive courses on the University campus.",
  "sisters-study": "At the women's marakiz, at the Masjid an-Nabawi Ma'had and Kulliyah for women, and at several paid institutes.",
  "monthly-budget": "A single person renting needs roughly 2,900 to 6,700 SAR a month, and scholarship students in the halls spend far less.",
  "bank-account-without-iqama": "Yes. With an active Visitor ID, a National Address and a Saudi number linked to Absher, you can open one with a mada card.",
  "drive-on-visit-visa": "Yes, on your home licence if Saudi Arabia recognises it, but a Saudi licence or a car in your name needs an iqama.",
  "rawdah-booking": "With a free Nusuk permit booked for a set time; same-day slots are also released for people at the masjid.",
  "duroos-english": "Rarely: English lessons are few, and almost all duroos in the Haram are taught in Arabic.",
  "tajeel-vs-itithaar": "Ta'jeel is a planned semester off, requested before it starts; i'tithaar is an excuse from a semester you have already started.",
  "etimad-what-for": "It is the government platform for your University travel orders and ticket letters, and your details on it must match your passport exactly.",
  "student-discounts": "Yes. Students get over 100 partner offers through the University and reduced rates at its sports club.",
  "muqarrarat": "In the Jamiah library, under your college and then your level.",
  "absher-nafath-activation": "Call Absher customer care on 920020405 and ask for a technical support ticket, saying you are a new international scholarship student.",
  "find-my-timetable": "Your timetable is under Registered Courses, in the Electronic Registration section of the Academic System.",
  "rent-on-student-visa": "Yes, through an accredited real-estate agent from Ejar's official list, who registers the contract on Ejar for you.",
  "library-bags-laptops": "No bags in either library; laptops are allowed in the University Central Library, but not in the Masjid an-Nabawi library without a permit.",
  "blackboard-phishing": "No. Opening it can hand your University account to fake student accounts, so report the account and leave the group.",
  "leaving-steps": "Clear your file with the University before you leave, and book no ticket until it confirms your clearance.",
  "check-sims-on-iqama": "Mutasil, the My Numbers Inquiry, the CST app and Tawakkalna all list the numbers registered under your iqama.",
  "change-absher-mobile": "In the Absher app, in the Nafath app, or at an Absher kiosk, which works even without your old number.",
  "short-address": "It is the eight character code for your National Address, and you find it in Absher or with Saudi Post.",
  "check-health-insurance": "Enter your iqama number on the Council of Health Insurance or Insurance Authority website, Tawakkalna, Absher or CHI Daman, and check the expiry date.",
  "send-money-home": "Use a transfer app or service your ID and bank account allow, and compare what your family receives after fees.",
  "emergency-numbers": "Call 997 for an ambulance, 999 for the police and 998 for fire; 911 also works in Madinah.",
  "best-time-to-visit-madinah": "For weather, November to February; for good weather with calmer crowds, late September to mid November or late February to March.",
  "mataam-prices": "Full scholarship students pay 1 SAR or 2 SAR a meal, booked a month at a time online.",
  "married-students-housing": "Not as a rule: a University family unit is offered only when one is available, so most married students rent in the city.",
  "what-is-ejar": "Ejar is the national platform for registering a home rental, and a registered contract is what you use to connect utilities or renew your iqama.",
  "joint-bank-account-spouse": "Yes. Residents can open a joint account with a spouse; ask your bank which documents it needs.",
  "foreign-prescriptions": "No. Pharmacies here accept only prescriptions from doctors licensed in Saudi Arabia, so see a Saudi doctor for a new one.",
  "free-bus-to-haram": "Yes. University buses link the campus with Masjid an-Nabawi and with the halls outside the campus, at no charge.",
  "medical-center-hours": "Sunday to Thursday from 8:00 am, with emergency care until 11:00 pm; Fridays and Saturdays, emergency care only, 1:00 pm to 9:00 pm.",
  "student-ticket-rules": "Your ticket needs an Etimad travel order, is valid for 3 months from the first travel date, and has no cash refund.",
  "airport-to-haram-and-university": "Madinah Bus route 400, a ride app or a taxi takes you to the Haram; arriving scholarship students can ask about a University reception trip.",
  "summer-semester": "Yes. It is an optional semester for catching up, such as retaking a failed course.",
  "student-iqama-renewal": "The University's Travel Management renews it for you; your part is to keep your file clear so nothing holds the renewal up.",
  "how-many-classes-can-i-miss": "Missing more than a quarter of a course's hours bars you from its final exam and fails the course.",
  "exam-results-where": "Both are in the Academic System: grades under Course results once your college approves them, and your GPA under your academic record.",
  "missed-a-final-exam": "Without an accepted excuse you score zero; with one, you sit a substitute exam by the end of the next semester's second week.",
  "failed-a-course": "Retake it and pass it to graduate; the F still counts against your GPA.",
  "power-plugs-and-voltage": "Type G, the UK style plug, at 230 volts and 60 hertz; chargers labelled 100 to 240 V need only an adapter.",
  "bringing-medicine-into-saudi": "Yes, in the original boxes in your hand luggage with a doctor's letter; narcotic or psychotropic medicines also need a traveller's permit before you fly.",
  "graduation-certificate-name-check": "Use the graduation certificate data check in the Academic System during your final semester, and correct any difference from your passport.",
  "degree-collection-and-verification": "Yes, with the Deanship's official authorisation form, and employers can check your degree on eduportal.iu.edu.sa.",
  "online-arabic-year-to-madinah": "Apply again on Study in Saudi as soon as the portal next opens, because the online year does not lead to a visa by itself.",
  "eid-prayer-in-madinah": "At Masjid an-Nabawi and at masjids and Eid musallas across the city, starting 15 minutes after sunrise.",
  "baby-vaccinations": "Register at your nearest primary health care centre and book each dose in Sehhaty, following the national schedule from birth.",
  "renew-passport-in-saudi": "At your embassy in Riyadh or consulate in Jeddah; then send the University a copy and update your family's passports in Absher.",
  "traffic-fines": "Check them in Absher under traffic violations, and pay in your banking app through SADAD or in Absher.",
  "buying-a-used-car": "With an iqama, yes: insure it in your name, then transfer it in Absher; on a Visitor ID, you cannot buy one in your name.",
  "learn-tajweed-in-madinah": "In the free Qur'an halaqat of Masjid an-Nabawi, which teach correct recitation; register at reg.qm.edu.sa.",
  "blackboard-login": "Sign in at sso.iu.edu.sa or in the University app; if it fails, test the Academic System, then ask through Tawasul.",
};

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The FAQ with its short answer, if it has one, as the first paragraph of the answer. */
export function withFaqLead<F extends { slug: string; answerHtml: string }>(f: F): F {
  const lead = FAQ_LEADS[f.slug];
  return lead ? { ...f, answerHtml: `<p>${escapeHtml(lead)}</p>${f.answerHtml}` } : f;
}
