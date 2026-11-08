/**
 * Search text normalisation for English, transliterated Arabic and Arabic script, plus the
 * vocabulary of student life in Madinah, so "ikama", "iqamah" and "إقامة" all find the same page.
 */

const TASHKEEL = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g;

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // Latin accents (ā, ī, ṣ)
    .replace(TASHKEEL, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/['’‘`ʿʾ]/g, "")
    .replace(/[^a-z0-9؀-ۿ\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Each group lists words that should find each other. The first is the canonical spelling. */
const GROUPS: string[][] = [
  ["iqama", "iqamah", "ikama", "ikamah", "igama", "muqeem", "residency", "residence permit", "izin tinggal", "اقامه", "اقامہ"],
  ["visitor id", "visitor", "zair", "zaer", "zaair", "zaeer", "hawiya", "hawiyah", "hawiyat zair", "hawiya zair", "zair id", "zaer id", "digital id", "study visa", "student visa", "educational visa", "هويه زائر", "تاشيره دراسيه"],
  ["tazkiyah", "tazkiya", "tazkia", "recommendation", "recommendation letter", "reference letter", "surat rekomendasi", "تزكيه", "توصيه", "تزکیہ"],
  ["admission", "apply", "application", "applying", "acceptance", "accepted", "qubool", "dakhla", "minhati", "manhati", "studyinsaudi", "study in saudi", "pendaftaran", "قبول", "منحتي", "داخلہ"],
  ["absher", "abshir", "ابشر"],
  ["nafath", "nafaz", "nafaaz", "نفاذ"],
  ["mukafaah", "mukafa", "mukaafa", "mukafaa", "mukafah", "mukafat", "mukaafah", "makafa", "wazifa", "uang saku", "stipend", "allowance", "salary", "bursary", "مكافاه", "وظیفہ"],
  ["tajeel", "taajeel", "ta jeel", "tajil", "deferral", "deferment", "defer", "postpone", "semester off", "تاجيل"],
  ["itithaar", "itidhar", "itizar", "withdraw", "withdrawal", "excuse", "اعتذار"],
  ["mahad", "mahhad", "maahad", "mahad lughah", "preparatory year", "arabic prep", "institute", "arabic institute", "language institute", "معهد"],
  ["kulliyah", "kulliyyah", "kuliyah", "college", "faculty", "كليه"],
  ["jamiah", "jamia", "jamiyah", "jaamia", "jaamiah", "uim", "madinah university", "medina university", "university", "iu", "ium", "islamic university", "جامعه"],
  ["duroos", "durus", "dars", "darss", "lesson", "lessons", "class", "lecture", "دروس", "درس"],
  ["shaykh", "sheikh", "shaikh", "sheikh", "shiekh", "scholar", "mashayikh", "شيخ"],
  ["masjid", "mosque", "masjed", "مسجد"],
  ["nabawi", "nabawee", "prophets mosque", "haram", "نبوي", "حرم"],
  ["quba", "qubaa", "kuba", "قباء"],
  ["takhlees", "talkhees", "summary", "notes", "تلخيص"],
  ["muqarrarat", "muqararat", "curriculum", "syllabus", "textbooks", "books", "مقررات"],
  ["markaz", "marakiz", "centre", "center", "مركز"],
  ["sisters", "women", "female", "wife", "ladies", "اخوات", "نساء"],
  ["family", "wife", "children", "kids", "spouse", "عائله"],
  ["rent", "apartment", "flat", "housing", "accommodation", "ejar", "سكن", "شقه", "ايجار", "استئجار", "عقار"],
  ["sim", "mobile", "phone", "stc", "mobily", "zain", "internet", "data", "شريحه", "جوال", "انترنت", "اتصالات"],
  ["bank", "mada", "card", "account", "alrajhi", "rajhi", "بنك", "بنكي", "مصرف", "حساب", "مدى"],
  ["licence", "license", "driving", "rukhsa", "رخصه", "قياده"],
  ["visa", "tasheera", "exit reentry", "final exit", "khuruj", "تاشيره"],
  ["umrah", "umra", "omrah", "عمره"],
  ["rawdah", "rawda", "rowdah", "روضه"],
  ["ticket", "flight", "tazkirah", "etimad", "اعتماد", "تذكره", "تذاكر", "طيران"],
  ["discount", "offer", "deal", "cheap", "خصم"],
  ["doctor", "clinic", "hospital", "dentist", "medical", "health", "paediatrician", "pediatrician", "gp", "pharmacy", "طبيب", "مستشفى", "صيدليه"],
  ["optician", "glasses", "eye doctor", "optometrist", "نظارات"],
  ["childcare", "nursery", "daycare", "preschool", "kindergarten", "حضانه"],
  ["playground", "play area", "kids activities", "things to do with kids", "park"],
  ["gym", "fitness", "sports club", "sport", "martial arts", "نادي"],
  ["fiqh", "fikh", "jurisprudence", "فقه"],
  ["aqeedah", "aqidah", "aqida", "aqeeda", "creed", "tawhid", "tawheed", "عقيده", "توحيد"],
  ["hadith", "hadeeth", "ahadith", "حديث"],
  ["tafsir", "tafseer", "exegesis", "تفسير"],
  ["exam", "exams", "finals", "final exams", "test", "اختبار", "اختبارات", "نهائي", "نهائيه"],
  ["calendar", "key dates", "holiday", "holidays", "vacation", "break", "تقويم", "اجازه"],
  ["eid", "eid al fitr", "eid al adha", "عيد"],
  ["ramadan", "ramadhan", "ramazan", "رمضان"],
  ["bus", "buses", "transport", "shuttle", "حافله", "باص"],
  ["job", "work", "part time", "عمل"],
  ["cost", "costs", "price", "prices", "expensive", "budget", "living costs", "cost of living", "تكلفه", "سعر", "اسعار", "ميزانيه", "مصاريف"],
  ["cost of living", "living costs", "living expenses", "monthly budget", "معيشه", "تكاليف المعيشه"],
  ["makkah", "mecca", "makka", "macca", "مكه"],
  ["pack", "packing", "packing list", "what to bring", "suitcase", "moving", "relocating", "relocation", "move to madinah", "ماذا احضر", "تجهيز السفر"],
  ["mataam", "matam", "mat am", "mataim", "cafeteria", "canteen", "dining hall", "meals", "مطعم"],
  ["train", "haramain", "haramain train", "قطار"],
  ["school", "schools", "madrasa", "مدرسه", "مدارس"],
  ["baby", "birth", "giving birth", "pregnancy", "pregnant", "maternity", "ولاده", "حمل"],
  ["tamr", "ajwa", "ajwah", "date fruit", "تمر", "تمور", "عجوه"],
  ["women", "sisters section", "womens section", "مصلى النساء", "النساء"],
  ["fajr", "فجر"], ["dhuhr", "zuhr", "duhr", "ظهر"], ["asr", "عصر"], ["maghrib", "مغرب"], ["isha", "ishaa", "عشاء"],
];

const LOOKUP = new Map<string, string[]>();
for (const g of GROUPS) for (const w of g) LOOKUP.set(normalize(w), g.map(normalize));

/** The query plus every spelling and synonym it implies, normalised. */
export function expandQuery(q: string): string {
  const base = normalize(q);
  const words = base.split(" ").filter(Boolean);
  const extra = new Set<string>();
  // Arabic words often carry the article ("المعيشه"): look them up with and without it.
  const bare = (w: string) => (w.length > 4 && w.startsWith("ال") ? w.slice(2) : w);
  for (const w of words) (LOOKUP.get(w) ?? LOOKUP.get(bare(w)))?.forEach((x) => extra.add(x));
  for (let i = 0; i < words.length - 1; i++) LOOKUP.get(`${words[i]} ${words[i + 1]}`)?.forEach((x) => extra.add(x));
  words.forEach((w) => extra.delete(w));
  return [base, ...extra].join(" ");
}
