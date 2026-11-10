/**
 * The course books students have collected for each college and the Ma'had, read from the public
 * Google Drive folders they live in (refresh with scripts/library-crawl). Every file opens on a
 * MESH reader page, so nobody has to dig through Drive.
 */
import data from "./library-books.json";
import { toArabicDigits, toAsciiDigits } from "@/lib/locale";
import { normalize } from "@/lib/search/normalize";

export type LibFile = { id: string; t: string; k: "pdf" | "img" | "video" | "audio" | "doc" | "other"; m?: string };
export type LibFolder = { id: string; t: string; f: LibNode[] };
export type LibNode = LibFile | LibFolder;
export const isFolder = (n: LibNode): n is LibFolder => "f" in n;

export type Collection = {
  slug: string;
  title: string;
  titleAr: string;
  group: "college" | "mahad";
  blurb: string;
  blurbAr: string;
  /** The Drive folder the files come from, for "see the source". */
  source: string;
};

export const COLLECTIONS: Collection[] = [
  { slug: "sharia", title: "Sharia", titleAr: "كلية الشريعة", group: "college", blurb: "Fiqh, usul al-fiqh, the evidences and the legal verses and hadith, level by level.", blurbAr: "الفقه وأصوله والأدلة وآيات الأحكام وأحاديثها، مستوى بعد مستوى.", source: "1RXBfiSCzB0oh1Z3esU96xeWA0TVUgX18" },
  { slug: "hadith", title: "Hadith and Islamic Studies", titleAr: "كلية الحديث الشريف والدراسات الإسلامية", group: "college", blurb: "Hadith texts, mustalah, takhrij and the narrators, level by level.", blurbAr: "متون الحديث والمصطلح والتخريج والرجال، مستوى بعد مستوى.", source: "1KXm3_LkFeHRBWKuH_VjYWnwKbQJ8ZEqO" },
  { slug: "dawah", title: "Da'wah and Usul ad-Din", titleAr: "كلية الدعوة وأصول الدين", group: "college", blurb: "Aqeedah, sects and religions, and da'wah methods, level by level.", blurbAr: "العقيدة والفرق والأديان ومناهج الدعوة، مستوى بعد مستوى.", source: "1MYxRBxcSXh33t8YdguvvxDFOJzB9Bbis" },
  { slug: "quran", title: "Qur'an and Islamic Studies", titleAr: "كلية القرآن الكريم والدراسات الإسلامية", group: "college", blurb: "Tafsir, Qur'anic sciences, tajwid and the qira'at, level by level.", blurbAr: "التفسير وعلوم القرآن والتجويد والقراءات، مستوى بعد مستوى.", source: "18uSzFiDHqIJAAenxzNzzKsVNqkmFnA1p" },
  { slug: "arabic", title: "Arabic Language", titleAr: "كلية اللغة العربية", group: "college", blurb: "Nahw, sarf, balaghah and literature, level by level.", blurbAr: "النحو والصرف والبلاغة والأدب، مستوى بعد مستوى.", source: "1fz6awGKUbvuaKCHVP6t0R2E_9aeYChxA" },
  { slug: "law", title: "Law", titleAr: "الأنظمة والقانون", group: "college", blurb: "Saudi systems and law courses.", blurbAr: "مقررات الأنظمة السعودية والقانون.", source: "1bODk8LjJ9O-5F9f0Owlo8oMNBiH0qcyg" },
  { slug: "education", title: "Education", titleAr: "كلية التربية", group: "college", blurb: "Education college course files.", blurbAr: "ملفات مقررات كلية التربية.", source: "1rp4AsqG_wZ2Az0FRMrTzsmFpKgY8RShC" },
  { slug: "mahad", title: "Arabic Language Institute (Ma'had)", titleAr: "معهد تعليم اللغة العربية لغير الناطقين بها", group: "mahad", blurb: "The textbooks for every level, the new six-level books, the student guide, regulations and extra practice.", blurbAr: "كتب كل مستوى، وسلسلة المستويات الست الجديدة، ودليل الطالب، واللوائح، وتمارين إضافية.", source: "1yqzf3ud2WA-YkVUWoF2lVneLNxZof7mx" },
];

/**
 * Drive file names arrive as they were uploaded: "Emailing القراءة م1", "التدريبات م٥ merged",
 * copy counters like "(2) (1)", stray bidi marks and ".pdf". Readers should see the book's name.
 */
export function cleanTitle(t: string): string {
  let s = t
    .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/^\s*Emailing\s+/i, "")
    .replace(/^\s*بدون حذف\s+/, "")
    .replace(/(^|\s)merged?(?=\s|$)/gi, " ")
    .replace(/\.(pdf|docx?|pptx?)\s*$/i, "")
    .replace(/\s*doc\s*$/i, "")
    .replace(/(\s*\(\s*\d+\s*\))+\s*$/g, "")
    .replace(/(\s*\(\s*\d+\s*\))+(?=-\d+\s*$)/g, "")
    .replace(/-\d+\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
  // File names saved with hyphens for spaces ("علم-مقاصد-الشارع") read as words.
  // A leading number ("7-الماتريدية") keeps its hyphen.
  if (!/\s/.test(s) && /[\u0600-\u06ff]/.test(s)) {
    const lead = /^\d+-/.exec(s)?.[0] ?? "";
    s = lead + s.slice(lead.length).replace(/-+/g, " ");
  }
  // Long dashes become a comma: Arabic comma in Arabic titles.
  const comma = /[\u0600-\u06ff]/.test(s) ? "\u060c " : ", ";
  s = s.replace(/\s*[\u2013\u2014]\s*/g, comma).replace(/\s+/g, " ").trim();
  if (/^IMG[\s_-]*\d{8}/i.test(t)) s = "Photo";
  return s || t.trim();
}

/**
 * Prefixes that file-sharing sites and phones add to a name ("Noor Book com", "arabicpdfs com tarbyah00053",
 * Indonesian "Salinan" for "Copy of", a site code like "Figh18455") come off when a real title follows.
 */
function stripSourcePrefix(s: string): string {
  return s
    .replace(/^Salinan\s+/i, "")
    .replace(/^Noor[\s.-]*Book[\s.-]*com\s+/i, "")
    .replace(/^arabicpdfs\s+com\s+\S+\s+/i, "")
    .replace(/^(?:Figh|fiqh)\d+\s+(?=[\u0600-\u06ff])/i, "")
    .replace(/\.zip$/i, "")
    .trim();
}

/** A name with no words a reader can use: a WhatsApp or Telegram file name, an id, a bare number or code. */
export function isJunkTitle(s: string): boolean {
  const t = s.trim();
  return (
    !t ||
    /^null$/i.test(t) ||
    /^DOC-\d{8}-WA\d+$/i.test(t) ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(t) ||
    /^[\d\s]+$/.test(t) ||
    /^(?:fiqh|figh)\d+$/i.test(t) ||
    /^[a-z]{2,5}$/.test(t)
  );
}

/** Names that were typed in Latin letters for an Arabic title, by Drive file id. */
const TITLE_FIXES: Record<string, string> = {
  "15ewnoNaBCNdGjUlP9z4ltdO4jOx7Qd2r": "الجداول الفقهية 1",
  "15kmwe1rjfp2u26eDr3XVwyEtdnEC9Xls": "الجداول الفقهية 2",
  "1LCl5HuqoUFSbQowgPiUuDm-EPneJlbC0": "فقه العبادات ج2",
  "1_TkaoTY-MrW55xlb7bUU2qUsJhUWW-YJ": "المشجرة الفقهية",
  "1MVzC9ACowxzWuEzEjBzE7s5psRZaG7q5": "معالم السنة النبوية 1",
  "1MYCKv-E5MMZy-59kHq0bsEOX427q1JCg": "معالم السنة النبوية 2",
  "1M_ZSFsOFLJ6kyxsz7hAb-dpuJx0CkvUb": "معالم السنة النبوية 3",
  "1CiJezqJ_A37w-eO0UzEVN3c1-0BfjffN": "المجموع المغيث في غريبي القرآن والحديث",
  "19Z2wvqGTylmBpe8EAJMbrb_LjTjMl10Z": "الجرح والتعديل",
  "1W9HzhCyEYlrBFurbsn8OdZFaOhnTdEKV": "الترجيح بالمكتشف التجريبي في التفسير، دراسة نقدية",
  "1qn7-fZTjSSrZ4Y45odKustBpAyWalRUm": "النحو",
  "1c9wlLE80kKACaQgL6uYPY_RsH0DVeh0h": "الأنظمة",
  "1sGqM2QLHpoCxi2hi3qlpO5nRPfmbUXXW": "أصول التربية الإسلامية وأساليبها في البيت والمدرسة والمجتمع",
  "1sPUEk4QE-bYyJtd2csXb66UgW75uDf56": "ملف من مقررات كلية التربية",
};

/** A file whose name says nothing takes its folder's name, numbered in brackets when several in that folder do. */
function cleanTree(n: LibFolder): LibFolder {
  const folder = cleanTitle(n.t);
  const named = n.f.map((c) => (isFolder(c) ? null : TITLE_FIXES[c.id] ?? stripSourcePrefix(cleanTitle(c.t))));
  const blanks = named.filter((t) => t !== null && isJunkTitle(t)).length;
  const numbered = blanks > 1 || named.includes(folder);
  const ar = /[\u0600-\u06ff]/.test(folder);
  let k = 0;
  return {
    ...n,
    t: folder,
    f: n.f.map((c, i) => {
      if (isFolder(c)) return cleanTree(c);
      const t = named[i]!;
      if (!isJunkTitle(t)) return { ...c, t };
      k++;
      return { ...c, t: numbered ? `${folder} (${ar ? toArabicDigits(k) : k})` : folder };
    }),
  };
}

const TREES = Object.fromEntries(
  Object.entries(data as unknown as Record<string, LibFolder>).map(([k, v]) => [k, cleanTree(v)])
) as Record<string, LibFolder>;
export const treeOf = (slug: string): LibFolder | null => (TREES[slug]?.f.length ? TREES[slug] : null);
export const LIVE_COLLECTIONS = COLLECTIONS.filter((c) => treeOf(c.slug));

export const countFiles = (n: LibNode): number => (isFolder(n) ? n.f.reduce((a, c) => a + countFiles(c), 0) : 1);

/** "المستوى 3" reads as "Level 3"; other folder names stay as they are. */
const ORDINALS: Record<string, number> = { الاول: 1, الأول: 1, الثاني: 2, الثالث: 3, الرابع: 4, الخامس: 5, السادس: 6, السابع: 7, الثامن: 8 };
export function levelLabel(t: string): string | null {
  const s = toAsciiDigits(t).trim();
  const m = /^المستوى\s*(\d+|\S+)$/.exec(s);
  if (!m) return null;
  const n = /^\d+$/.test(m[1]) ? Number(m[1]) : ORDINALS[m[1]];
  return n ? `Level ${n}` : null;
}

/** Arabic names for the few folders that were uploaded with English names (the Ma'had's top folders). */
const FOLDER_AR: Record<string, string> = {
  "Textbooks for all four levels": "كتب المستويات الأربعة",
  "The new books, six levels": "الكتب الجديدة ذات المستويات الست",
  "Student guide": "دليل الطالب",
  "Study and exam regulations": "لائحة الدراسة والاختبارات",
  "Course descriptions": "توصيف المقررات",
  "How-to videos: excuses, withdrawal, deferral, Blackboard": "مقاطع إرشادية: الأعذار والانسحاب والتأجيل وBlackboard",
  "Extra material, old and new curriculum": "مواد إضافية للمنهج القديم والجديد",
};
/** A folder's name for Arabic readers: its Arabic name where it was uploaded in English. */
export const folderNameAr = (t: string): string => FOLDER_AR[t] ?? t;

/** A plain English hint for an Arabic subject name, so non-Arab students know what a folder holds. */
const HINTS: [RegExp, string][] = [
  [/أصول الفقه/, "Usul al-fiqh (principles of fiqh)"],
  [/القواعد الفقهية/, "Legal maxims"],
  [/آيات الأحكام/, "Tafsir of the legal verses"],
  [/أحاديث الأحكام/, "Hadith of rulings"],
  [/أدلة الأحكام/, "Evidences for rulings"],
  [/الحكم الشرعي/, "The Sharia ruling (usul)"],
  [/الفرائض|المواريث/, "Inheritance (fara'id)"],
  [/فقه/, "Fiqh"],
  [/التوحيد/, "Tawhid (creed)"],
  [/العقيدة/, "Aqeedah (creed)"],
  [/مصطلح/, "Hadith terminology (mustalah)"],
  [/التخريج|دراسة الأسانيد/, "Takhrij and isnad study"],
  [/الجرح والتعديل|الرجال/, "Narrator criticism"],
  [/الحديث/, "Hadith"],
  [/علوم القرآن/, "Qur'anic sciences"],
  [/التجويد/, "Tajwid"],
  [/القراءات/, "The qira'at"],
  [/التفسير|تفسير/, "Tafsir"],
  [/القرآن/, "Qur'an"],
  [/النحو/, "Arabic grammar (nahw)"],
  [/الصرف/, "Morphology (sarf)"],
  [/البلاغة/, "Rhetoric (balaghah)"],
  [/العروض/, "Prosody"],
  [/الأدب/, "Arabic literature"],
  [/التحرير|الكتابة|الإملاء/, "Arabic writing"],
  [/السيرة/, "Sirah"],
  [/الفرق|الأديان|المذاهب/, "Sects and religions"],
  [/الدعوة/, "Da'wah"],
  [/القيم/, "Islamic values"],
  [/الثقافة/, "Islamic culture"],
  [/تاريخ/, "History"],
  [/مناهج البحث/, "Research methods"],
  [/الأنظمة|القضاء|القضائية|الدعوى/, "Saudi law and the courts"],
  [/الاقتصاد/, "Economics"],
  [/الإنجليزية/, "English"],
  [/الحاسب/, "Computing"],
  [/التربية/, "Education"],
  [/النفس/, "Psychology"],
];
export const subjectHint = (t: string): string | null => HINTS.find(([re]) => re.test(t))?.[1] ?? null;

export type FileHit = { file: LibFile; collection: Collection; path: LibFolder[] };

/** Every file with its collection and the folders above it. Built once per server instance. */
let index: Map<string, FileHit> | null = null;
export function fileIndex(): Map<string, FileHit> {
  if (index) return index;
  index = new Map();
  for (const c of LIVE_COLLECTIONS) {
    const walk = (n: LibNode, path: LibFolder[]) => {
      if (isFolder(n)) n.f.forEach((x) => walk(x, [...path, n]));
      else index!.set(n.id, { file: n, collection: c, path });
    };
    walk(treeOf(c.slug)!, []);
  }
  return index;
}

const fold = (s: string) => normalize(toAsciiDigits(s));

/** Files whose name, subject, level or college match every word typed. */
export function searchFiles(q: string, limit = 60): FileHit[] {
  const words = fold(q).split(" ").filter(Boolean);
  if (!words.length) return [];
  const out: FileHit[] = [];
  for (const hit of fileIndex().values()) {
    const hay = fold([hit.file.t, ...hit.path.map((p) => `${p.t} ${levelLabel(p.t) ?? ""} ${subjectHint(p.t) ?? ""}`), hit.collection.title, hit.collection.titleAr].join(" "));
    if (words.every((w) => hay.includes(w))) out.push(hit);
    if (out.length >= limit) break;
  }
  return out;
}

export const driveLinks = (id: string) => ({
  preview: `https://drive.google.com/file/d/${id}/preview`,
  view: `https://drive.google.com/file/d/${id}/view`,
  download: `https://drive.google.com/uc?export=download&id=${id}`,
});
