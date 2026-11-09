/**
 * Local words a newcomer meets in Madinah, with the Arabic spelling, a plain meaning and one
 * line on where it comes up. Every fact here is also in the seeded guides and answers.
 *
 * `match` lists the spellings the guides use, in lower case. The first mention of any of them
 * in a guide gets a short definition (src/lib/guide-html.ts). A trailing "s" is matched too,
 * so "iqamas" counts as "iqama". `href` is the page that explains more.
 */

export type GlossaryGroup = "papers" | "university" | "money" | "daily" | "haram";

export type GlossaryHref = `/guides/${string}` | `/ask/${string}` | `/programs/${string}` | "/mahad";

export type GlossaryTerm = {
  id: string;
  term: string;
  ar: string;
  group: GlossaryGroup;
  meaning: string;
  use: string;
  match: string[];
  href?: GlossaryHref;
};

export const GLOSSARY_GROUPS: { id: GlossaryGroup; en: string; ar: string }[] = [
  { id: "papers", en: "Papers and government", ar: "الأوراق والجهات الحكومية" },
  { id: "university", en: "The University", ar: "الجامعة" },
  { id: "money", en: "Money and housing", ar: "المال والسكن" },
  { id: "daily", en: "Daily life", ar: "الحياة اليومية" },
  { id: "haram", en: "The Haram and worship", ar: "الحرم والعبادة" },
];

export const GLOSSARY: GlossaryTerm[] = [
  // Papers and government
  {
    id: "iqama", term: "Iqama", ar: "إقامة", group: "papers",
    meaning: "The residence permit for foreigners living in Saudi Arabia.",
    use: "Students who arrive on the educational visa are given a Visitor ID instead of an iqama.",
    match: ["iqama"], href: "/guides/iqama-and-exit-reentry-fees",
  },
  {
    id: "visitor-id", term: "Visitor ID", ar: "هوية زائر", group: "papers",
    meaning: "The digital identity Jawazat issues through Absher to students on the educational visa.",
    use: "It is digital only, cannot be printed, and is tied to your border number. It is enough to open a bank account.",
    match: ["visitor id"], href: "/guides/living-on-a-visitor-id",
  },
  {
    id: "border-number", term: "Border number", ar: "رقم الحدود", group: "papers",
    meaning: "The number Jawazat gives you when you first enter the Kingdom, linked to your visa.",
    use: "You use it to buy a SIM and register on Absher when you have no iqama.",
    match: ["border number"], href: "/guides/new-student-steps",
  },
  {
    id: "jawazat", term: "Jawazat", ar: "الجوازات", group: "papers",
    meaning: "The General Directorate of Passports.",
    use: "It issues the Visitor ID through Absher, and its offices have self-service kiosks.",
    match: ["jawazat"], href: "/guides/living-on-a-visitor-id",
  },
  {
    id: "absher", term: "Absher", ar: "أبشر", group: "papers",
    meaning: "The app and website for your visa and residency services.",
    use: "You issue your Visitor ID and your exit and re-entry visas here, and find your short address.",
    match: ["absher"], href: "/guides/new-student-steps",
  },
  {
    id: "nafath", term: "Nafath", ar: "نفاذ", group: "papers",
    meaning: "The national digital identity, activated in the Nafath app with a face check.",
    use: "Banks, Ejar and most government sites use it to confirm who you are.",
    match: ["nafath"], href: "/ask/absher-nafath-activation",
  },
  {
    id: "kiosk", term: "Self-service kiosk", ar: "جهاز الخدمة الذاتية", group: "papers",
    meaning: "A machine where you register your fingerprint to activate Absher.",
    use: "Kiosks are in Jawazat offices, at the University, at airports and in some malls.",
    match: ["self-service kiosk", "absher kiosk"], href: "/guides/new-student-steps",
  },
  {
    id: "national-address", term: "National Address", ar: "العنوان الوطني", group: "papers",
    meaning: "Your registered address with Saudi Post.",
    use: "Its short address is a code of four letters and four digits, used for deliveries and some official forms.",
    match: ["national address", "short address"], href: "/ask/short-address",
  },
  {
    id: "exit-reentry", term: "Exit and re-entry visa", ar: "تأشيرة خروج وعودة", group: "papers",
    meaning: "The visa an iqama holder needs to leave the Kingdom and come back.",
    use: "Issue one from Absher before every trip abroad.",
    match: ["exit and re-entry"], href: "/guides/iqama-and-exit-reentry-fees",
  },
  {
    id: "final-exit", term: "Final exit", ar: "خروج نهائي", group: "papers",
    meaning: "The visa for leaving Saudi Arabia for good.",
    use: "For graduates with an iqama, the University's Travel Management arranges it.",
    match: ["final exit"], href: "/guides/graduate-procedures",
  },
  {
    id: "istiqdam", term: "Istiqdam", ar: "استقدام", group: "papers",
    meaning: "Bringing your wife and children to live with you on a family residency.",
    use: "Students with an iqama can ask the University to sponsor their family, against a refundable deposit.",
    match: ["istiqdam"], href: "/ask/istiqdam-deposit",
  },
  {
    id: "muqeem", term: "Muqeem", ar: "مقيم", group: "papers",
    meaning: "The online system used to renew iqamas and extend visas.",
    use: "The University renews student iqamas through it, and a host can extend a visit visa on it.",
    match: ["muqeem"], href: "/ask/student-iqama-renewal",
  },
  {
    id: "sehhaty", term: "Sehhaty", ar: "صحتي", group: "papers",
    meaning: "The Ministry of Health app for residents.",
    use: "Book at a government health centre and keep your child's vaccination record here.",
    match: ["sehhaty"], href: "/guides/doctors-hospitals-and-pharmacies",
  },

  // The University
  {
    id: "mahad", term: "Ma'had", ar: "المعهد", group: "university",
    meaning: "An institute. At the Islamic University it is the Arabic Language Institute, which prepares you for your college.",
    use: "It lasts at most two years, and the placement test decides the level you start in.",
    match: ["ma'had"], href: "/mahad",
  },
  {
    id: "kulliyah", term: "Kulliyah", ar: "الكلية", group: "university",
    meaning: "A college. At the Islamic University these include Hadith, Sharia, and Creed and Da'wah.",
    use: "You move up to your Kulliyah after the Ma'had, with a new University number.",
    match: ["kulliyah"], href: "/guides/graduating-from-mahad",
  },
  {
    id: "muqarrarat", term: "Muqarrarat", ar: "المقررات", group: "university",
    meaning: "The set books for your courses.",
    use: "The Jamiah library has a folder of them for every college and level.",
    match: ["muqarrarat"], href: "/ask/muqarrarat",
  },
  {
    id: "tajeel", term: "Ta'jeel", ar: "تأجيل", group: "university",
    meaning: "Postponing a semester before it starts.",
    use: "Apply in the Academic System during the deferral window just before the semester.",
    match: ["ta'jeel"], href: "/guides/tajeel-and-itithaar",
  },
  {
    id: "itithaar", term: "I'tithaar", ar: "اعتذار", group: "university",
    meaning: "An excuse from a semester you have already started.",
    use: "Unlike ta'jeel, it counts towards your maximum study period.",
    match: ["i'tithaar"], href: "/guides/tajeel-and-itithaar",
  },
  {
    id: "mukafaa", term: "Mukafa'ah", ar: "مكافأة", group: "university",
    meaning: "The monthly stipend paid to full scholarship students.",
    use: "The University pays it each month onto the stipend card it issues in your name.",
    match: ["mukafa'ah", "mukafa'a", "stipend"], href: "/guides/getting-your-stipend-off-the-university-card",
  },
  {
    id: "academic-system", term: "Academic System", ar: "النظام الأكاديمي", group: "university",
    meaning: "The University's online system for your studies.",
    use: "Your timetable, final exams and requests for ta'jeel or i'tithaar are all here.",
    match: ["academic system"], href: "/ask/find-my-timetable",
  },
  {
    id: "tawasul", term: "Tawasul", ar: "تواصل", group: "university",
    meaning: "The University's request system.",
    use: "Use it to reach the right office for anything the Academic System cannot do.",
    match: ["tawasul"], href: "/guides/university-offices-and-contacts",
  },
  {
    id: "minhati", term: "Minhati", ar: "منحتي", group: "university",
    meaning: "The Islamic University's own portal for applicants.",
    use: "Applicants complete their second application here, and returning students ask for a new visa here.",
    match: ["minhati"], href: "/guides/applying-to-the-islamic-university",
  },
  {
    id: "etimad", term: "Etimad", ar: "اعتماد", group: "university",
    meaning: "The government platform that University flight tickets go through.",
    use: "Your yearly ticket home and your ticket as a graduate need a working account with correct details.",
    match: ["etimad"], href: "/guides/etimad-account",
  },
  {
    id: "matam", term: "Mat'am", ar: "المطعم", group: "university",
    meaning: "The University restaurant.",
    use: "It serves full scholarship students three subsidised meals a day, booked a month at a time.",
    match: ["mat'am"], href: "/guides/campus-life-islamic-university",
  },

  // Money and housing
  {
    id: "mada", term: "Mada", ar: "مدى", group: "money",
    meaning: "The Saudi debit card your bank issues with your account.",
    use: "Some shops take only mada or cash, so a mada card is worth having.",
    match: ["mada"], href: "/guides/sim-internet-bank",
  },
  {
    id: "iban", term: "IBAN", ar: "آيبان", group: "money",
    meaning: "The full number of your bank account. A Saudi IBAN starts with SA.",
    use: "Your family needs it, with your bank's SWIFT code, to send money to your Saudi account.",
    match: ["iban"], href: "/guides/sending-and-receiving-money",
  },
  {
    id: "ejar", term: "Ejar", ar: "إيجار", group: "money",
    meaning: "The Real Estate General Authority's platform for registering rental contracts.",
    use: "A registered contract is what you use to renew your iqama, update your National Address and connect utilities.",
    match: ["ejar"], href: "/ask/what-is-ejar",
  },
  {
    id: "riyal", term: "Riyal (SAR)", ar: "ريال", group: "money",
    meaning: "The Saudi currency, fixed at 3.75 riyals to one US dollar.",
    use: "Prices are written in SAR, as in 100 SAR.",
    match: ["riyal"], href: "/guides/what-to-bring-to-madinah",
  },

  // Daily life
  {
    id: "nusuk", term: "Nusuk", ar: "نسك", group: "daily",
    meaning: "The app for Rawdah, Umrah and Hajj bookings.",
    use: "Rawdah and Umrah permits are free here, and residents sign in with Nafath.",
    match: ["nusuk"], href: "/guides/umrah-rawdah-quba",
  },
  {
    id: "markaz", term: "Markaz", ar: "مركز", group: "daily",
    meaning: "A centre for study, usually of Arabic, the Qur'an or Islamic studies.",
    use: "Several in Madinah teach Arabic and Islamic studies to sisters.",
    match: ["markaz"], href: "/guides/sisters-studying-in-madinah",
  },
  {
    id: "mahram", term: "Mahram", ar: "محرم", group: "daily",
    meaning: "The husband or other mahram a woman travels with for Hajj. Nusuk checks the relationship against Absher.",
    use: "She adds him as a companion in the same booking, with the same company and the same package.",
    match: ["mahram"], href: "/guides/hajj-as-a-student",
  },
  {
    id: "thobe", term: "Thobe", ar: "ثوب", group: "daily",
    meaning: "The long robe men wear in Saudi Arabia.",
    use: "Tailors in every neighbourhood make one to measure in 2 to 4 days.",
    match: ["thobe"], href: "/guides/what-to-bring-to-madinah",
  },
  {
    id: "abaya", term: "Abaya", ar: "عباءة", group: "daily",
    meaning: "The long outer cloak women wear outdoors.",
    use: "Bring one or two for your first days. Many more are sold all over the city.",
    match: ["abaya"], href: "/guides/what-to-bring-to-madinah",
  },
  {
    id: "ajwa", term: "Ajwa", ar: "عجوة", group: "daily",
    meaning: "The best known date of Madinah: nearly black, soft and deeply sweet.",
    use: "It is grown almost only in the Madinah area.",
    match: ["ajwa"], href: "/guides/dates-of-madinah",
  },

  // The Haram and worship
  {
    id: "haram", term: "The Haram", ar: "الحرم", group: "haram",
    meaning: "A sacred mosque. In Madinah it means Masjid an-Nabawi, the Prophet's ﷺ Mosque.",
    use: "Almost all of its duroos are in Arabic, which is excellent listening practice.",
    match: ["haram"], href: "/guides/masjid-an-nabawi-first-visit",
  },
  {
    id: "rawdah", term: "Rawdah", ar: "الروضة الشريفة", group: "haram",
    meaning: "The space between the Prophet's ﷺ chamber and his minbar, marked by green carpet.",
    use: "Entry is by a free permit booked in Nusuk.",
    match: ["rawdah"], href: "/ask/rawdah-booking",
  },
  {
    id: "dars", term: "Dars (plural duroos)", ar: "درس، دروس", group: "haram",
    meaning: "A lesson, usually a shaykh teaching a book.",
    use: "The duroos of the mashayikh are open to everyone, with no registration.",
    match: ["duroos", "dars"], href: "/ask/do-i-register-for-duroos",
  },
  {
    id: "halaqah", term: "Halaqah (plural halaqat)", ar: "حلقة، حلقات", group: "haram",
    meaning: "A study circle, often for memorising or reciting the Qur'an.",
    use: "The Haram runs free Qur'an and mutun halaqat, which take registrations online.",
    match: ["halaqat", "halaqah"], href: "/programs/nabawi-halaqat",
  },
  {
    id: "mutun", term: "Mutun (singular matn)", ar: "متون، متن", group: "haram",
    meaning: "The essential classical Islamic texts that students memorise.",
    use: "Certificates for mutun count for the Islamic colleges when you apply to the University.",
    match: ["mutun"], href: "/programs/nabawi-halaqat",
  },
  {
    id: "mashayikh", term: "Mashayikh", ar: "مشايخ", group: "haram",
    meaning: "The plural of shaykh: scholars and teachers.",
    use: "The duroos of the mashayikh in the main hall are carried on the masjid's speakers.",
    match: ["mashayikh"], href: "/ask/do-i-register-for-duroos",
  },
  {
    id: "miqat", term: "Miqat", ar: "ميقات", group: "haram",
    meaning: "The point where pilgrims enter ihram for Umrah or Hajj.",
    use: "For people leaving Madinah it is Dhul Hulayfah (Abyar Ali), about 14 km from the Prophet's Mosque.",
    match: ["miqat", "dhul hulayfah"], href: "/guides/umrah-rawdah-quba",
  },
];

/** The terms of one group, in the order above. */
export const termsIn = (group: GlossaryGroup) => GLOSSARY.filter((t) => t.group === group);
