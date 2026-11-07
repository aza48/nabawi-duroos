/**
 * Study programmes and marakiz in Madinah. Written by MESH from the institutes' own pages,
 * their published videos and students' reports. Prices change often: every entry carries
 * the date it was last checked, and the page tells students to confirm before paying.
 */
export type Audience = "men" | "women" | "children" | "online" | "families";

export type Program = {
  slug: string;
  name: string;
  nameAr: string;
  kind: "arabic" | "degree" | "sisters" | "masjid";
  recommended?: boolean;
  tagline: string;
  audience: Audience[];
  price: string;
  where: string;
  overview: string[];
  /** Levels, tracks or curriculum, one line each. */
  levels?: string[];
  included?: string[];
  steps?: string[];
  contact?: { label: string; href: string }[];
  /** YouTube video ids, best first. */
  videos?: { id: string; title: string }[];
  checked: string;
};

export const PROGRAM_KINDS: { id: Program["kind"]; label: string; labelAr: string }[] = [
  { id: "arabic", label: "Arabic institutes", labelAr: "معاهد اللغة العربية" },
  { id: "degree", label: "Degrees", labelAr: "الدرجات الجامعية" },
  { id: "sisters", label: "For sisters", labelAr: "للأخوات" },
  { id: "masjid", label: "In the Haram", labelAr: "في المسجد النبوي" },
];

export const PROGRAMS: Program[] = [
  {
    slug: "map",
    name: "Madinah Arabic Program (MAP)",
    nameAr: "برنامج المدينة للغة العربية",
    kind: "arabic",
    recommended: true,
    tagline: "A month of Arabic on the Islamic University campus, with your stay, transport and an Umrah arranged for you.",
    audience: ["men", "women", "families"],
    price: "From £2,699 (international) or SAR 10,999 (Saudi residents)",
    where: "Islamic University of Madinah campus",
    overview: [
      "MAP is the easiest way to taste student life in Madinah before committing to years here. You study the same Madinah Books method the University uses for non-Arabs, taught on campus by University lecturers who specialise in teaching non-native speakers.",
      "Everything around the classes is handled: a room near campus, a daily shuttle to the University and to Masjid an-Nabawi, a guided Umrah, outings to historical sites, and a mushrif for every group of about ten students who helps you join halaqat in the Haram and settle in.",
      "Brothers and sisters study in fully separate classes, with separate housing and transport. The certificate is attested by the University and the Ministry of Education. It is not the same as being enrolled at the University, but students say it helps a lot when applying later.",
    ],
    levels: [
      "Level 1: for complete or near beginners. Reading, writing, listening and speaking.",
      "Level 2: intermediate, for students who already have the basics.",
      "A placement test on arrival puts you in the right level.",
      "Two pathways: Student of Arabic (language only), or Student of Knowledge (language plus halaqat in the Haram, lectures, Qur'an, tajweed and calligraphy).",
    ],
    included: [
      "80+ hours of classes over the month, around four to five hours a day",
      "Room in a shared flat (triple sharing), or a private flat on the family package",
      "Airport pickup and daily shuttles to campus and Masjid an-Nabawi",
      "Textbooks, regular tests and weekly feedback",
      "Guided Umrah and trips to historical sites",
      "Use of the University library, gym and buses",
      "Not included: flights, visa and food (you get a restaurant guide)",
    ],
    steps: [
      "Fill in the registration form on map-arabic.com.",
      "Pick a package: International (£2,699), Saudi residents (SAR 10,999) or Family (£3,948 for a student and one companion).",
      "MAP reviews your request and sends you the amount and payment details. Nothing is paid online until then.",
      "Arrange your visa and flight. Ask MAP about help with both.",
      "Next intake: the Ramadan intensive, 21 January to 20 February 2027.",
    ],
    contact: [
      { label: "map-arabic.com", href: "https://map-arabic.com/" },
      { label: "WhatsApp +44 7939 993613", href: "https://wa.me/447939993613" },
      { label: "YouTube", href: "https://www.youtube.com/@MadinahArabicProgram" },
      { label: "Instagram", href: "https://www.instagram.com/madinah_arabic_program/" },
    ],
    videos: [
      { id: "-Xj5MM3voOE", title: "Welcome to MAP" },
      { id: "umCklO32Hjo", title: "Study in the city of the Prophet ﷺ" },
      { id: "M_HZfl_722E", title: "Inside the classroom at the Islamic University" },
      { id: "L_4ShP6GqcA", title: "A University professor reviews MAP" },
      { id: "X_RXYmtkTmQ", title: "Student review: Hamza from America" },
    ],
    checked: "2026-11-07",
  },
  {
    slug: "taba",
    name: "Taba Institute",
    nameAr: "معهد طابة",
    kind: "arabic",
    tagline: "Structured Arabic for non-Arabs, in person or online, for brothers and sisters from age 12.",
    audience: ["men", "women", "online"],
    price: "About 400 SAR a month, or 1,000 SAR for three months (current offer)",
    where: "Madinah (morning programme until 3pm)",
    overview: [
      "Taba teaches Arabic to non-native speakers using its own Speak Arabic series. The morning programme now takes both men and women, from age 12 with no upper limit, in person or online, with printed and digital books.",
      "Besides the regular levels there is an intensive 90-day course for people who want to spend a few months in Madinah, and a 50-day programme that mixes 15 days online with 35 days of study in Madinah and a visit to Makkah.",
      "The evening programme is run separately, with its own administration and curriculum.",
    ],
    levels: [
      "Qari: beginners. Reading, writing, listening and first conversations.",
      "Qadir (3 levels): you can read the Qur'an and want to understand it and handle daily life in Arabic.",
      "Muhawir (3 levels): fluent speaking, preparing for university study.",
      "A placement test decides where you start.",
    ],
    steps: ["Message the institute on WhatsApp or apply on ktabaa.com.", "Sit the placement test.", "Pay per month or per three-month block."],
    contact: [
      { label: "ktabaa.com", href: "https://ktabaa.com" },
      { label: "WhatsApp +966 53 275 0874", href: "https://wa.me/966532750874" },
      { label: "Study-tour registration", href: "https://ktabaa.com/request" },
    ],
    videos: [{ id: "LjKrX5LdkbU", title: "Taba Institute: full guide (Study in Saudi)" }],
    checked: "2026-10-20",
  },
  {
    slug: "ahlul-athar",
    name: "Ahlul Athar Institute",
    nameAr: "معهد أهل الأثر",
    kind: "arabic",
    tagline: "One of the most affordable serious Arabic courses in the city, with month-long levels.",
    audience: ["men", "women", "online", "children"],
    price: "350 SAR a month",
    where: "About 25 to 30 minutes' walk from Masjid an-Nabawi",
    overview: [
      "Opened in 2025, Ahlul Athar runs a 13-level series for non-Arabs, each level lasting a month, with its own books reviewed by university professors. There is a separate track in grammar, morphology, rhetoric and spelling for Arabic speakers.",
      "Brothers study in person or online. Sisters currently study online only. Motivated children aged 7 to 10 can join adult groups.",
    ],
    levels: ["Non-Arab track: 13 levels, one month each", "Arab track: nahw, sarf, balaghah, imla'"],
    contact: [{ label: "WhatsApp +966 50 884 6407", href: "https://wa.me/966508846407" }],
    videos: [
      { id: "umjJeu3oJkE", title: "Inside Ahlul Athar Institute (full tour)" },
      { id: "Cj4CwDpyFes", title: "Ahlul Athar overview" },
    ],
    checked: "2026-03-26",
  },
  {
    slug: "mutun-alijaz",
    name: "Mutun al-Ijaz Institute",
    nameAr: "معهد متون الإيجاز",
    kind: "arabic",
    tagline: "Fourteen fast-moving five-week levels, then dedicated nahw and sarf courses.",
    audience: ["men", "children"],
    price: "550 SAR a month",
    where: "Al-Anabis, about 25 to 30 minutes' walk from the Haram",
    overview: [
      "Founded in 2025 by the former director of Markaz al-Furqan in Egypt. The course runs through the Silsilat al-Mutun series in 14 levels of five weeks each, followed by optional courses in morphology and grammar.",
      "Classes are for men, plus children aged 6 to 10. Courses for women are planned. The certificate is recognised by the Ministry of Education, and a recommendation for university admission may be possible.",
    ],
    contact: [{ label: "WhatsApp +966 54 357 7389", href: "https://wa.me/966543577389" }],
    videos: [{ id: "cnwiSZGgrUQ", title: "Mutun al-Ijaz overview" }],
    checked: "2025-10-01",
  },
  {
    slug: "fusha-academy",
    name: "Al-Fusha Academy",
    nameAr: "أكاديمية الفصحى",
    kind: "arabic",
    tagline: "In-person Arabic for sisters and children, using al-Arabiyyah Bayna Yadayk.",
    audience: ["women", "children", "men"],
    price: "Roughly 750 to 1,000 SAR a month (2,400 for the intensive)",
    where: "Madinah",
    overview: [
      "For a long time this was the main in-person Arabic option for sisters. Adults follow al-Arabiyyah Bayna Yadayk after a placement test. Children from age 5 start with letters and build up to reading.",
      "Students describe the pace as gentler than the men's institutes. Fees have risen over the last year and reports differ, so confirm before registering.",
    ],
    levels: ["Standard: 2 hours a day", "Intensive: 4 hours a day"],
    videos: [{ id: "jM9Xfvp3BJU", title: "Al-Fusha Academy overview" }],
    checked: "2026-07-01",
  },
  {
    slug: "as-safwah",
    name: "As-Safwah Institute",
    nameAr: "معهد الصفوة",
    kind: "arabic",
    tagline: "An affordable Arabic and Qur'an institute, reviewed in detail by Study in Saudi.",
    audience: ["men"],
    price: "Affordable. See the video and the institute for current fees.",
    where: "Madinah",
    overview: ["Arabic and Qur'an classes with a lower price than most private institutes. Watch the full review for levels, timings and fees, and check the linked details before enrolling."],
    contact: [{ label: "Details file", href: "https://drive.google.com/drive/folders/1LTz0wGBkf_odujJrdF0ZmgjjFsrQqmj3" }],
    videos: [{ id: "-GmAnmT6goQ", title: "As-Safwah complete review (2026)" }],
    checked: "2026-06-19",
  },
  {
    slug: "iu-madinah",
    name: "Islamic University of Madinah",
    nameAr: "الجامعة الإسلامية بالمدينة المنورة",
    kind: "degree",
    tagline: "The full scholarship: Arabic Ma'had, then a degree, with housing, a stipend and flights.",
    audience: ["men", "women"],
    price: "Free on scholarship, with a monthly stipend of 840 SAR",
    where: "Al-Jami'ah district",
    overview: [
      "Most English-speaking students here came on the University scholarship. You apply through the national Study in Saudi portal, usually starting in the Arabic Language Institute (Ma'had) before moving to a college.",
      "The portal now lets you choose up to 25 programmes across 10 or more universities. There are three funding types: fully funded (stipend, housing, flights), partly funded, and fully self-paid.",
    ],
    steps: [
      "Create an account on studyinsaudi.moe.gov.sa when applications open.",
      "Prepare your documents and translations (see the Study in Saudi list).",
      "Choose your programmes. You can edit until the closing date, then the application number is issued.",
      "Submit, then watch your email and the portal for results.",
    ],
    contact: [
      { label: "Study in Saudi portal", href: "https://studyinsaudi.moe.gov.sa/" },
      { label: "iu.edu.sa", href: "https://iu.edu.sa/" },
      { label: "Study in Saudi on Telegram", href: "https://t.me/notjustmadinah" },
    ],
    videos: [{ id: "_yKUpFGZgv8", title: "The Study in Saudi portal, step by step" }],
    checked: "2026-04-27",
  },
  {
    slug: "manarat-college",
    name: "Manarat al-Ilm College of Law and Islamic Sciences",
    nameAr: "كلية منارات العلم للحقوق والعلوم الإسلامية الأهلية",
    kind: "degree",
    tagline: "A new private college with a four-year Sharia degree taught in English, open to men and women of any age.",
    audience: ["men", "women"],
    price: "530 SAR per credit hour (about 95,400 SAR for the whole Sharia degree)",
    where: "Al-Jami'ah district, partnered with the Islamic University",
    overview: [
      "A licensed non-profit college in the University district. It offers a Bachelor of Sharia in Arabic or in English, a Bachelor of Law, and a two-year bridging course in law for diploma holders.",
      "It is self-funded rather than a scholarship, but there is no age limit, which makes it a real option for older students and families. International applications are open for the second semester of 1448.",
    ],
    included: ["Application fee: 1,000 SAR (non-refundable)", "Registration: 400 SAR per semester", "Graduation fee: 1,000 SAR"],
    contact: [
      { label: "clis.edu.sa", href: "https://www.clis.edu.sa/" },
      { label: "WhatsApp +966 54 911 1246", href: "https://wa.me/966549111246" },
      { label: "Admission guide", href: "https://drive.google.com/file/d/10EcLhrQSd6kJTnRh3FG26coDswb1NNet/view" },
    ],
    videos: [
      { id: "GOSCeblG3MY", title: "The new Sharia college: programmes and fees" },
      { id: "57kOlZRtsso", title: "What students think after joining" },
    ],
    checked: "2026-11-07",
  },
  {
    slug: "mishkat",
    name: "Markaz Mishkat (women)",
    nameAr: "مركز مشكاة للتدريب النسائي",
    kind: "sisters",
    tagline: "Free Arabic and Qur'an for sisters, best known for getting students speaking.",
    audience: ["women", "children"],
    price: "Free (small one-off book fee)",
    where: "Al-Aridh (Rabwah)",
    overview: [
      "A two-year programme built on al-Arabiyyah Bayna Yadayk plus Islamic studies. Sisters single it out for conversational Arabic and a warm atmosphere. Grammar is lighter, so add your own practice.",
      "Classes are in the morning, with a free nursery. Bring your passport and iqama or visa. A placement test is only needed to skip ahead.",
    ],
    checked: "2026-07-01",
  },
  {
    slug: "taibah-markaz",
    name: "Markaz Taibah (women)",
    nameAr: "مركز طيبة النسائي",
    kind: "sisters",
    tagline: "Free and grammar-focused, in four levels.",
    audience: ["women", "children"],
    price: "Free (small book fee)",
    where: "Hayy Taibah",
    overview: [
      "Four levels over two years using Bayna Yadayk, with Qur'an, writing, fiqh, aqeedah, seerah, hadith and tafseer added as you go up. Strong on grammar and comprehension, weaker on speaking.",
      "Morning classes, a placement test, and a paid bus. Mothers report the nursery is small and screen-heavy.",
    ],
    checked: "2026-07-01",
  },
  {
    slug: "marifah",
    name: "Academiyah al-Ma'rifah (women)",
    nameAr: "أكاديمية المعرفة",
    kind: "sisters",
    tagline: "Free Arabic, Shariah and Qur'an programmes for sisters.",
    audience: ["women", "children"],
    price: "Free (small book fee)",
    where: "Hayy al-Qaswa",
    overview: [
      "Formerly Markaz al-Manar, Ta'allum and Nebras. A two-year Arabic programme on the Madinah Books (with a foundation level), a one-year Shariah programme, and an advanced Qur'an programme taught by University and Haram teachers from behind a screen.",
      "Arabic students also memorise Juz 'Amma and Juz Tabarak. Free nursery, paid bus.",
    ],
    checked: "2026-07-01",
  },
  {
    slug: "nabawi-women",
    name: "Masjid an-Nabawi programmes for women",
    nameAr: "معهد وكلية المسجد النبوي للنساء",
    kind: "sisters",
    tagline: "Free middle and high school diplomas, and a four-year Shariah degree, inside the Haram.",
    audience: ["women"],
    price: "Free",
    where: "Women's sections of Masjid an-Nabawi",
    overview: [
      "The Ma'had (western women's side, gates 13 to 17) runs a three-year middle school diploma and a three-year high school diploma in classical texts. Juz 'Amma is required for the first, seven ajza' for the second.",
      "The Kulliyah (eastern women's side, gates 25 to 30) is a four-year Shariah bachelor's. Registration opens once a year, usually in Dhul Qa'dah, with a written exam and an interview. Good Arabic is required.",
    ],
    contact: [
      { label: "Website", href: "https://gph.edu.sa/public/?page=ins" },
      { label: "Telegram", href: "https://t.me/almaehad_1" },
    ],
    checked: "2026-07-01",
  },
  {
    slug: "nabawi-halaqat",
    name: "Qur'an and mutun halaqat in the Haram",
    nameAr: "حلقات القرآن والمتون في المسجد النبوي",
    kind: "masjid",
    tagline: "Free memorisation circles for every age, with exams, certificates and sometimes rewards.",
    audience: ["men", "women", "children"],
    price: "Free",
    where: "Masjid an-Nabawi",
    overview: [
      "The Haram runs halaqat for memorising the Qur'an and the classical mutun, from young children to adults, for brothers and sisters. You register, attend set days and times, and sit exams that come with certificates and occasionally financial rewards.",
      "The daily duroos of the mashayikh are open to anyone with no registration. See the Duroos section for today's schedule.",
    ],
    contact: [{ label: "Today's duroos", href: "/duroos" }],
    checked: "2026-11-07",
  },
];
