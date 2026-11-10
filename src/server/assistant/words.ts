import { expandQuery, normalize } from "@/lib/search/normalize";

/**
 * The assistant's own vocabulary, on top of the site search's (src/lib/search/normalize.ts):
 * Arabic verbs and possessive forms students type ("أستأجر", "زوجتي", "بالغياب"), a few phrases
 * that mean one thing ("SIM card", "leave for good", "خروج نهائي"), and words whose site-wide
 * synonyms pull in the wrong page for a question (a SIM is not "internet").
 */

/** Each group: words that find each other. The first word is the one the site's own synonyms are looked up with. */
const GROUPS: string[][] = [
  ["activate", "activation", "activating", "تفعيل", "افعل", "يفعل", "فعل", "تفعيله"],
  ["timetable", "schedule", "class timetable", "جدول", "جدولي", "الجدول الدراسي", "جدول المحاضرات"],
  ["absence", "absences", "absent", "attendance", "barred", "hirman", "ghiyab", "غياب", "الغياب", "حرمان", "غيابات"],
  ["masters", "master", "postgraduate", "phd", "doctorate", "ماجستير", "الماجستير", "دكتوراه", "الدكتوراه", "دراسات عليا", "الدراسات العليا"],
  ["rent", "renting", "استاجر", "يستاجر", "ايجار", "اجار", "تاجير", "استئجار", "شقه", "شقق"],
  ["istiqdam", "bring my wife", "bring my family", "family visa", "استقدام", "استقدم", "استقدام الزوجه", "استقدام العائله"],
  ["wife", "spouse", "زوجه", "زوجتي", "زوجي", "زوج"],
  ["children", "kids", "child", "son", "sons", "daughter", "daughters", "ابني", "بنتي", "ابنتي", "اطفال", "اطفالي", "طفل", "ابناء", "ابنائي", "اولاد", "اولادي"],
  ["female doctor", "women doctor", "lady doctor", "tabiba", "طبيبه", "طبيبات", "دكتوره"],
  ["emergency", "ambulance", "اسعاف", "الاسعاف", "طوارئ", "الطوارئ", "النجده"],
  ["airport", "مطار", "المطار"],
  ["booking", "book", "احجز", "يحجز", "حجز", "الحجز", "موعد"],
  ["umrah", "اعتمر", "يعتمر", "اعتمار", "العمره"],
  ["apply", "application", "admission", "admissions", "submit", "submitting", "اقدم", "اتقدم", "تقديم", "التقديم", "قدم", "اسجل", "القبول"],
  ["open", "opening", "افتح", "فتح", "يفتح", "افتتاح"],
  ["without", "بدون", "بلا", "دون"],
  ["number", "numbers", "phone number", "رقم", "ارقام", "الرقم"],
  ["office", "offices", "who to ask", "deanship", "department", "مكتب", "عماده", "اداره"],
  ["final exit", "leaving madinah", "leave madinah", "leaving", "graduate", "graduating", "clearance", "خروج نهائي", "الخروج النهائي", "مغادره"],
  ["arabic", "arabic language", "عربي", "العربيه", "اللغه العربيه", "لغه عربيه"],
  ["learn", "learning", "study", "studying", "تعلم", "اتعلم", "دراسه", "ادرس"],
  ["institute", "markaz", "marakiz", "centre", "center", "معهد", "مركز", "مراكز"],
  ["semester", "term", "فصل", "الفصل الدراسي", "ترم"],
  ["legalise", "legalize", "legalisation", "legalization", "legalised", "legalized", "attest", "attestation", "توثيق", "تصديق"],
  ["certificate", "degree", "شهاده", "الشهاده", "شهادتي"],
  ["sim", "sims", "sim card", "شريحه", "شرائح", "الشريحه"],
  ["mobile", "phone", "جوال", "الجوال", "هاتف"],
  ["hijri", "hijri date", "islamic date", "هجري", "الهجري", "التاريخ الهجري"],
  ["cost of living", "living costs", "monthly budget", "budget", "المعيشه", "معيشه", "تكلفه المعيشه"],
  ["problem", "not working", "error", "failing", "fails", "مشكله", "خطا"],
  ["transfer", "move up", "moving up", "انتقل", "انتقال"],
  ["difference", "differences", "compare", "versus", "vs", "فرق", "الفرق", "الفروق"],
  ["renew", "renewal", "renewing", "اجدد", "تجديد", "يجدد", "جدد"],
  ["bring", "احضر", "احضار", "اجلب", "اخذ معي"],
  ["passport", "جواز", "جواز السفر", "الجواز", "جوازي"],
  ["sisters", "womens", "women", "sister", "النساء", "نساء"],
  ["arbain", "arbaun", "arbaeen", "forty", "forty hadith", "الاربعين", "الاربعون", "اربعين"],
  ["nawawiyyah", "nawawiyya", "nawawi", "an nawawi", "النوويه", "النووي"],
  ["paid", "payment", "pay day", "تصرف", "صرف", "يصرف", "تنزل"],
  ["muqarrarat", "course books", "textbooks", "مقررات", "المقررات", "مقرر", "كتب المقررات"],
  ["register", "registration", "enrol", "enroll", "تسجيل", "التسجيل", "يسجل"],
    ["books", "كتب", "الكتب"],
  ["add", "adding", "added", "اضافه", "اضيف", "يضاف", "اضافة"],
    ["pray", "praying", "prayer area", "prayer areas", "musalla", "تصلي", "اصلي", "يصلي", "نصلي", "يصلون", "مصلي", "المصلي", "مصلي النساء"],
  ["rajhi", "alrajhi", "al rajhi", "راجحي", "الراجحي"],
  ["part time", "part time job", "part time work", "دوام جزيي", "عمل جزيي"],
  ["lost", "stolen", "ضاع", "ضايع", "فقدت", "مفقود", "سرقت", "بدل فاقد"],
    ["arrive", "arrival", "arriving", "arrived", "new student", "new students", "first days", "وصول", "وصولي"],
  ["marriage", "marry", "marrying", "nikah", "زواج", "الزواج", "نكاح", "النكاح", "عقد النكاح"],
  ["married", "married students", "متزوج", "متزوجه", "متزوجين", "المتزوجين", "للمتزوجين"],
  ["exit reentry", "exit and reentry", "exit and re entry", "re entry", "reentry", "خروج وعوده", "الخروج والعوده"],
  ["library", "libraries", "مكتبه", "المكتبه", "مكتبات", "المكتبات"],
  ["meal", "meals", "mataam", "وجبه", "الوجبه", "وجبات", "الوجبات", "مطعم", "المطعم", "المطعم الجامعي"],
  ["university", "جامعي", "الجامعي"],
  ["womens section", "womens sections", "womens prayer area", "womens prayer areas", "womens gates", "prayer areas", "musalla", "مصلي النساء", "يصلي النساء"],
  ["grades", "grade", "results", "result", "gpa", "marks", "transcript", "نتايج", "النتايج", "نتيجه", "النتيجه", "درجات", "الدرجات", "المعدل"],
  ["skip", "skipping", "miss", "missing", "absence", "absences"],
  ["begin", "begins", "beginning", "start", "starts", "starting", "تبدا", "يبدا", "بدايه", "بدء"],
  ["account", "accounts", "حساب", "حسابي"],
];

/**
 * Words whose site-wide synonyms send a question to the wrong page. These use only the group above:
 * "sim" stays a SIM (not internet or a bank card), "شريحه" is a SIM, not home internet, and an "account" is
 * not always a bank card ("a Tawakkalna account", "an Absher account").
 */
const ONLY_OWN = new Set(["sim", "sims", "sim card", "شريحه", "شرائح", "الشريحه", "جوال", "الجوال", "account", "accounts"].map(normalize));

const LOOK = new Map<string, string[]>();
for (const g of GROUPS) {
  const words = g.map(normalize);
  for (const w of words) LOOK.set(w, [...new Set([...(LOOK.get(w) ?? []), ...words])]);
}

/** A term and the words of its own group here, without the site-wide synonyms ("hospital" and not "health"). */
export function ownForms(t: string): string[] {
  const term = t.replace(/_/g, " ");
  return [term, ...(LOOK.get(term) ?? [])];
}

/** The site search knows the word (it has synonyms there or here). */
export function knownWord(w: string): boolean {
  return LOOK.has(w) || expandQuery(w) !== w;
}

const AR = /[؀-ۿ]/;
const AR_PREFIXES = ["وبال", "وال", "فال", "بال", "كال", "لل", "ال", "و", "ف", "ب", "ل", "ك"];
const AR_SUFFIXES = ["كما", "هما", "كم", "هم", "هن", "نا", "ها", "ه", "ك", "ي"];

/**
 * A light Arabic stemmer, checked against the vocabulary: it strips "و", "ب", "ل", "ال" in front and
 * a possessive ending ("ي", "ها", "نا", "تي") behind, and the "أ" of "أحجز", but only keeps a shorter form
 * the site knows. "لأطفالي" becomes "اطفال", "بالغياب" becomes "غياب", "زوجتي" becomes "زوجه".
 */
export function stemAr(w: string): string {
  if (!AR.test(w) || knownWord(w)) return w;
  const tries = new Set<string>();
  const add = (s: string) => {
    if (s.length >= 3) tries.add(s);
  };
  const ends = (s: string) => {
    add(s);
    if (s.endsWith("تي") && s.length > 4) add(`${s.slice(0, -2)}ه`);
    if (s.endsWith("ات") && s.length > 4) add(s.slice(0, -2));
    for (const x of AR_SUFFIXES) if (s.endsWith(x) && s.length - x.length >= 3) add(s.slice(0, -x.length));
    // The accusative ending "ا" ("حسابا بنكيا"): the word without it.
    if (s.endsWith("ا") && s.length >= 4) add(s.slice(0, -1));
  };
  ends(w);
  for (const p of AR_PREFIXES) if (w.startsWith(p) && w.length - p.length >= 3) ends(w.slice(p.length));
  // The present tense ("أحجز", "يحجز", "نعتمر") carries one letter in front.
  for (const s of [...tries]) if (/^[ايتن]/.test(s) && s.length >= 4) add(s.slice(1));
  for (const s of tries) if (s !== w && knownWord(s)) return s;
  // Unknown words still lose the article, so "الجدول" and "جدول" meet.
  return w.length > 4 && w.startsWith("ال") ? w.slice(2) : w;
}

/** A light English stem for matching ("legalised" finds "legalisation", "renewing" finds "renew"). */
export function stemEn(w: string): string {
  if (!/^[a-z]+$/.test(w) || w.length < 6) return w;
  const s = w.replace(/(isation|ization|ations|ation|ising|izing|ised|ized|ises|izes|ings|ing|ied|ies|ed|es)$/, "");
  return s.length >= 4 ? s : w;
}

/** Phrases rewritten before the question is cut into words; "_" keeps a phrase as one term. */
const PHRASES: [RegExp, string][] = [
  [/\b(sim cards?|phone sim|mobile sim)\b/g, "sim"],
  [/(شريحه|شريحة) (جوال|الجوال|هاتف|اتصال|اتصالات)/g, "شريحه"],
  // Getting a SIM is buying one (the SIM card section), not checking the ones on your iqama.
  [/\b(get|getting|buy|buying|purchase) (a |an |my |the )?(first |new |saudi |local |prepaid |data )*sim\b/g, "buy sim"],
  [/(احصل علي|اشتري|اشتراء|شراء|استخراج) (ال)?(شريحه|شريحة)/g, "buy شريحه"],
  [/\b(leave|leaving|go home|going home|depart|departing)\b(.*)\bfor good\b/g, "$1$2 final_exit"],
  [/\bfor good\b/g, ""],
  // "When I arrive" says when, not what: "how do I get a SIM card when I arrive" is a SIM question.
  [/\b(when|after|once) (i|we) (arrive|land|get here|get to madinah|come)\b|\bon arrival\b|عند وصولي|بعد وصولي/g, ""],
  [/\bfinal exit\b/g, "final_exit"],
  // Exit and re-entry is one visa, not "exit" and "return".
  [/\bexit (and )?re[ -]?entry\b/g, "exit_reentry"],
  [/(تاشيره |تاشيرات )?(ال)?خروج (و|وال)عوده/g, "exit_reentry"],
  // Where sisters pray at the masjid is one place.
  [/\bwom[ae]n'?s'? (section|sections|prayer areas?|prayer halls?|areas?|musalla|side)\b/g, "womens_section"],
  [/\b(where|where do|where can) (do |can )?(women|sisters|ladies) pray\b/g, "where womens_section"],
  [/(مصلي|مصلى|مصليات) (ال)?نساء|(يصلي|تصلي|تصلين|يصلين) (ال)?نساء/g, "womens_section"],
  // Named fasts are one idea each ("white" alone is a photo background), and the Book of X is a kitab, not a booking.
  [/\b(white days?|ayy?am[ -](al|ul)[ -](bid|beed|beedh))( fasts?| fasting)?\b/g, "white_days"],
  [/\b(zakat|zakah)[ -]((al|ul)[ -])?(fitr|fitrah)\b|\bfitrah\b/g, "zakat_al_fitr"],
  [/\bbook of\b/g, "kitab"],
  [/(ال)?ايام (ال)?بيض/g, "white_days"],
  [/زكاه (ال)?فطر/g, "zakat_al_fitr"],
  // "Bring my wife to Madinah" is the family residency; "bring my kids to the Haram" is not.
  [/\b(bring|sponsor) (over )?(my |our )?(wife|spouse|family|children|kids)( and (my )?(children|kids|family))?( (over|here|to (madinah|medina|saudi|saudi arabia|the kingdom)))?( on (a |the )?(family |dependant |dependent |residence )?(visa|visas|iqama))?$/g, "istiqdam $4"],
  // "Not working" says nothing about which page answers; the topic word does.
  // "Part time" is one idea: its words alone ("part", "time") are in every page.
  [/\bpart[ -]time\b/g, "part_time"],
  [/(دوام|عمل) جزيي/g, "part_time"],
  [/\b(not working|doesnt work|does not work|isnt working|wont work|stopped working)\b/g, ""],
  [/(الخروج النهايي|خروج نهايي)/g, "خروج_نهايي"],
  // "الجامعة الإسلامية" is the University, one idea.
  [/(ال)?جامعه (ال)?اسلاميه/g, "الجامعه"],
  [/(لا يعمل|ما يشتغل|لا يشتغل|لا يفتح|ما يفتح|معطل)/g, ""],
];

/** The question with phrases joined up, ready to be cut into words. */
export function rewrite(normalized: string): string {
  let s = normalized;
  for (const [re, to] of PHRASES) s = s.replace(re, to);
  return s.replace(/\s+/g, " ").trim();
}

/** A term and every spelling and synonym it implies, normalised, the term first. */
export function expandTerm(t: string): string[] {
  const term = t.replace(/_/g, " ");
  const own = LOOK.get(term) ?? [];
  if (ONLY_OWN.has(term)) return [term, ...own.filter((x) => x !== term)];
  const out = new Set<string>([term]);
  // "عبدالرزاق" is also written "عبد الرزاق".
  if (/^عبد[^\s]{3,}/.test(term)) out.add(`عبد ${term.slice(3)}`);
  // A phrase ("خروج نهايي") is looked up whole: its words alone mean other things ("نهايي" is an exam).
  // A phrase with no group of its own ("white days") is only itself: its loose words ("days") are not it.
  if (!term.includes(" ")) for (const x of expandQuery(term).split(" ").slice(1)) out.add(x);
  for (const x of own) out.add(x);
  // A phrase ("part time") does not take the loose words of its group's synonyms ("time", "work").
  if (own.length && !term.includes(" ")) for (const x of expandQuery(own[0]).split(" ").slice(1)) out.add(x);
  return [...out];
}
