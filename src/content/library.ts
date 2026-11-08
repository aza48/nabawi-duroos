/** Library links: outside Ma'had resources, official links and channels worth following. */
export type LibraryLink = { title: string; titleAr?: string; note?: string; noteAr?: string; href: string; kind: "folder" | "pdf" | "site" | "youtube" | "telegram" | "x" | "whatsapp" };

/** Outside resources for Ma'had students. The course files themselves are in library-books. */
export const MAHAD_EXTRA: LibraryLink[] = [
  { title: "Every Madinah Book level, with answers", titleAr: "كل مستويات كتب المدينة مع الحلول", note: "Qalam: all the Madinah Book levels and their answer keys", noteAr: "موقع قلم: كل مستويات كتب المدينة ومفاتيح إجاباتها", href: "https://qalam.mediu.edu.my/2016/05/20/", kind: "site" },
  { title: "The Madinah Books as web pages", titleAr: "كتب المدينة صفحاتٍ على الإنترنت", note: "Read and search them in your browser", noteAr: "اقرأها وابحث فيها من المتصفح", href: "https://ejtaal.net/islam/arabic.html#madeenah-arabic", kind: "site" },
];

export const OFFICIAL: LibraryLink[] = [
  { title: "University portal (SSO login)", titleAr: "بوابة الجامعة", href: "https://sso.iu.edu.sa/Account/Login", kind: "site" },
  { title: "Islamic University website", titleAr: "موقع الجامعة الإسلامية", href: "https://iu.edu.sa/", kind: "site" },
  { title: "The University on X", titleAr: "الجامعة الإسلامية", href: "https://x.com/iu_edu", kind: "x" },
  { title: "Deanship of Admission on X", titleAr: "عمادة القبول والتسجيل", href: "https://x.com/AdmissDeanship", kind: "x" },
  { title: "Study in Saudi portal (applications)", titleAr: "منصة ادرس في السعودية (التقديم)", href: "https://studyinsaudi.sa/", kind: "site" },
  { title: "Etimad (flight tickets and travel orders)", titleAr: "منصة اعتماد", href: "https://portal.etimad.sa/", kind: "site" },
];

export const CHANNELS: LibraryLink[] = [
  { title: "Study in Saudi (Madi Abu Yahya)", note: "Institutes, the scholarship portal, housing and costs, with detailed PDFs", noteAr: "المعاهد ومنصة المنح والسكن والتكاليف، مع ملفات PDF مفصّلة", href: "https://www.youtube.com/@MadinahUniversity", kind: "youtube" },
  { title: "Study in Saudi on Telegram", titleAr: "Study in Saudi على تيليجرام", href: "https://t.me/notjustmadinah", kind: "telegram" },
  { title: "Study in Saudi on X", titleAr: "Study in Saudi على X", href: "https://x.com/study_in_saudi", kind: "x" },
  { title: "Madinah Arabic Program", titleAr: "برنامج المدينة للغة العربية", note: "Classroom footage, student reviews, advice from the mashayikh", noteAr: "مقاطع من الفصول، وآراء الطلاب، ونصائح المشايخ", href: "https://www.youtube.com/@MadinahArabicProgram", kind: "youtube" },
  { title: "Durus al-Madinah", titleAr: "دروس المدينة", note: "Daily lesson schedules from the Haram and the city", noteAr: "جداول الدروس اليومية في الحرم والمدينة", href: "https://linkjar.co/drosalmadina", kind: "telegram" },
  { title: "HijrahNow: Madinah", titleAr: "HijrahNow: المدينة", note: "A directory of groups, housing, tutors, schools, services and family spots", noteAr: "دليل للمجموعات والسكن والمدرّسين والمدارس والخدمات وأماكن العائلات", href: "https://hijrahnow.com/madinah", kind: "site" },
  { title: "The Hijrah Family", note: "A family's life in Madinah, homeschooling and settling in", noteAr: "حياة أسرة في المدينة، والتعليم المنزلي، والاستقرار", href: "https://www.youtube.com/@TheHijrahFamily", kind: "youtube" },
  { title: "Hijrah Diaries", note: "A sister's move to Madinah, from the first week onwards", noteAr: "انتقال أخت إلى المدينة منذ أسبوعها الأول", href: "https://www.youtube.com/@HijrahDiariess", kind: "youtube" },
  { title: "Real Estate in Saudi", note: "Renting and buying property", noteAr: "استئجار العقارات وشراؤها", href: "https://www.youtube.com/@RealEstateInSaudi", kind: "youtube" },
];

