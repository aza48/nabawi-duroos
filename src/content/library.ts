/** The Jamiah library: course texts, Ma'had materials, official links and channels worth following. */
export type LibraryLink = { title: string; titleAr?: string; note?: string; href: string; kind: "folder" | "pdf" | "site" | "youtube" | "telegram" | "x" | "whatsapp" };

export const MUQARRARAT: LibraryLink[] = [
  { title: "Shariah", titleAr: "كلية الشريعة", href: "https://drive.google.com/drive/folders/1RXBfiSCzB0oh1Z3esU96xeWA0TVUgX18", kind: "folder" },
  { title: "Hadith", titleAr: "كلية الحديث الشريف وعلومه", href: "https://drive.google.com/drive/folders/1KXm3_LkFeHRBWKuH_VjYWnwKbQJ8ZEqO", kind: "folder" },
  { title: "Usool ad-Deen and Da'wah", titleAr: "كلية الدعوة وأصول الدين", href: "https://drive.google.com/drive/folders/1MYxRBxcSXh33t8YdguvvxDFOJzB9Bbis", kind: "folder" },
  { title: "Qur'an", titleAr: "كلية القرآن الكريم", href: "https://drive.google.com/drive/folders/18uSzFiDHqIJAAenxzNzzKsVNqkmFnA1p", kind: "folder" },
  { title: "Arabic Language", titleAr: "كلية اللغة العربية", href: "https://drive.google.com/drive/folders/1fz6awGKUbvuaKCHVP6t0R2E_9aeYChxA", kind: "folder" },
  { title: "Law", titleAr: "القانون", href: "https://drive.google.com/drive/folders/1bODk8LjJ9O-5F9f0Owlo8oMNBiH0qcyg", kind: "folder" },
  { title: "Education", titleAr: "كلية التربية", href: "https://drive.google.com/drive/folders/1rp4AsqG_wZ2Az0FRMrTzsmFpKgY8RShC", kind: "folder" },
  { title: "Higher Diploma", titleAr: "الدبلوم العالي", href: "https://drive.google.com/drive/folders/1bIBgyVfp17dVi8wx9BdleK_VZvSIaaXp", kind: "folder" },
  { title: "Arabic Language Institute (Ma'had)", titleAr: "معهد تعليم اللغة العربية لغير الناطقين بها", href: "https://drive.google.com/drive/folders/1yqzf3ud2WA-YkVUWoF2lVneLNxZof7mx", kind: "folder" },
  { title: "Middle and high school", titleAr: "المرحلة المتوسطة والثانوية", href: "https://drive.google.com/drive/folders/158cfgeE1IzmhKojekF-VND4F_kPlHznR", kind: "folder" },
  { title: "Other Saudi universities", titleAr: "من جامعات سعودية أخرى", href: "https://drive.google.com/drive/folders/1HWAXGseIicub1Ag0olby9WonzAR9Joy8", kind: "folder" },
];

export const MAHAD: LibraryLink[] = [
  { title: "Ma'had study and exam regulations", titleAr: "لائحة الدراسة والاختبارات", note: "Approved 1445", href: "https://drive.google.com/drive/folders/1q6avQz_VdtxN7ndko5hmi6BwtHG3ViCk", kind: "folder" },
  { title: "Textbooks for all four levels", titleAr: "المقررات الدراسية", href: "https://drive.google.com/drive/folders/1-kSE5i5dygqCsYIqfyYQCbHkeX635z5M", kind: "folder" },
  { title: "Student guide", titleAr: "الدليل الإرشادي", href: "https://drive.google.com/drive/folders/1-FE45GQRmGQ1yeKlJxPXehSThTw7bN-P", kind: "folder" },
  { title: "How-to videos: excuses, withdrawal, deferral, Blackboard, your timetable", titleAr: "الفيديوهات الإرشادية", href: "https://drive.google.com/drive/folders/12S18SIE0hnAeqVQNKMnS1Pk6mAursT19", kind: "folder" },
  { title: "Course descriptions", titleAr: "توصيف المقررات", href: "https://drive.google.com/drive/folders/16Kp0P81PXY-kUCcJAcFXzVDs3OhE3Nak", kind: "folder" },
  { title: "Ma'had WhatsApp groups", titleAr: "مجموعات واتساب لطلاب المعهد", href: "https://drive.google.com/file/d/1FYG6LbT0-U7EuOmdob0OW3mvaR_ej1aH/view", kind: "pdf" },
  { title: "Absence and student-guidance form", titleAr: "نموذج رفع الغياب", href: "https://drive.google.com/file/d/10xO98MtKefOoM58W80tl9hsxxs_U3PvR/view", kind: "pdf" },
  { title: "Every level, with answers", note: "Qalam, all Madinah Book levels and their answer keys", href: "https://qalam.mediu.edu.my/2016/05/20/", kind: "site" },
  { title: "Extra learning material, old and new curriculum", titleAr: "مواد إضافية", href: "https://drive.google.com/drive/folders/0BwgjJdjfwhT2VGFiZHRTUjZqQ3c", kind: "folder" },
  { title: "New books collection, six levels", titleAr: "الكتب الجديدة", href: "https://drive.google.com/drive/folders/1Gb0UUVKdSedyKiBJjlfhwTLNCwwm45mq", kind: "folder" },
  { title: "The Madinah Books as web pages", note: "Read and search them in your browser", href: "https://ejtaal.net/islam/arabic.html#madeenah-arabic", kind: "site" },
];

export const OFFICIAL: LibraryLink[] = [
  { title: "University portal (SSO login)", titleAr: "بوابة الجامعة", href: "https://sso.iu.edu.sa/Account/Login", kind: "site" },
  { title: "Islamic University website", titleAr: "موقع الجامعة الإسلامية", href: "https://iu.edu.sa/", kind: "site" },
  { title: "IU in English on X", href: "https://x.com/iu_edu_en", kind: "x" },
  { title: "IU on X (Arabic)", href: "https://x.com/iu_ed", kind: "x" },
  { title: "Study in Saudi portal (applications)", href: "https://studyinsaudi.moe.gov.sa/", kind: "site" },
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

export type Manuscript = { name: string; url: string; country: string | null };
