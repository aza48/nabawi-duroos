/** Library links: outside Ma'had resources, official links and channels worth following. */
export type LibraryLink = { title: string; titleAr?: string; note?: string; href: string; kind: "folder" | "pdf" | "site" | "youtube" | "telegram" | "x" | "whatsapp" };

/** Outside resources for Ma'had students. The course files themselves are in library-books. */
export const MAHAD_EXTRA: LibraryLink[] = [
  { title: "Every Madinah Book level, with answers", note: "Qalam: all the Madinah Book levels and their answer keys", href: "https://qalam.mediu.edu.my/2016/05/20/", kind: "site" },
  { title: "The Madinah Books as web pages", note: "Read and search them in your browser", href: "https://ejtaal.net/islam/arabic.html#madeenah-arabic", kind: "site" },
];

export const OFFICIAL: LibraryLink[] = [
  { title: "University portal (SSO login)", titleAr: "بوابة الجامعة", href: "https://sso.iu.edu.sa/Account/Login", kind: "site" },
  { title: "Islamic University website", titleAr: "موقع الجامعة الإسلامية", href: "https://iu.edu.sa/", kind: "site" },
  { title: "The University on X", titleAr: "الجامعة الإسلامية", href: "https://x.com/iu_edu", kind: "x" },
  { title: "Deanship of Admission on X", titleAr: "عمادة القبول والتسجيل", href: "https://x.com/AdmissDeanship", kind: "x" },
  { title: "Study in Saudi portal (applications)", href: "https://studyinsaudi.sa/", kind: "site" },
  { title: "Etimad (flight tickets and travel orders)", titleAr: "منصة اعتماد", href: "https://portal.etimad.sa/", kind: "site" },
];

export const CHANNELS: LibraryLink[] = [
  { title: "Study in Saudi (Madi Abu Yahya)", note: "Institutes, the scholarship portal, housing and costs, with detailed PDFs", href: "https://www.youtube.com/@MadinahUniversity", kind: "youtube" },
  { title: "Study in Saudi on Telegram", href: "https://t.me/notjustmadinah", kind: "telegram" },
  { title: "Study in Saudi on X", href: "https://x.com/study_in_saudi", kind: "x" },
  { title: "Madinah Arabic Program", note: "Classroom footage, student reviews, advice from the mashayikh", href: "https://www.youtube.com/@MadinahArabicProgram", kind: "youtube" },
  { title: "Durus al-Madinah", note: "Daily lesson schedules from the Haram and the city", href: "https://linkjar.co/drosalmadina", kind: "telegram" },
  { title: "HijrahNow: Madinah", note: "A directory of groups, housing, tutors, schools, services and family spots", href: "https://hijrahnow.com/madinah", kind: "site" },
  { title: "The Hijrah Family", note: "A family's life in Madinah, homeschooling and settling in", href: "https://www.youtube.com/@TheHijrahFamily", kind: "youtube" },
  { title: "Hijrah Diaries", note: "A sister's move to Madinah, from the first week onwards", href: "https://www.youtube.com/@HijrahDiariess", kind: "youtube" },
  { title: "Real Estate in Saudi", note: "Renting and buying property", href: "https://www.youtube.com/@RealEstateInSaudi", kind: "youtube" },
];

