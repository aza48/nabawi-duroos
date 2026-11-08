/**
 * "🔴 بدأ البث المباشر" posts: a dars has just gone live. These are read
 * without AI: the book title in «», the shaykh's name and the masjid pick the
 * lesson, and the best stream link is kept.
 */

export type LessonForMatch = { slug: string; bookAr: string; shaykhAr: string; masjidId: string };

export function normalizeArabic(s: string): string {
  return s
    .replace(/[ـ‌-‏ً-ٰٟ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/عبد\s+/g, "عبد")
    .replace(/[^ء-ي0-9a-z]+/gi, " ")
    .trim();
}

export function isLiveNotice(text: string): boolean {
  const n = normalizeArabic(text);
  // A start verb and "live", or "live now". A bare "البث المباشر" (a link to the stream) is not a start notice.
  return /(بدا|بدات|يبدا|انطلق|انطلاق|يبث الان|الان يبث)[^.]{0,40}?مباشر|البث المباشر الان|مباشر الان/.test(n);
}

const BOOK_STOP = new Set(["شرح", "كتاب", "من", "في", "على", "لشيخ", "الشيخ", "الاسلام", "تقريرات", "سماحه"]);
const NAME_STOP = new Set(["بن", "ابن", "الشيخ", "الله", "اد", "د", "ا"]);
const tokens = (s: string, stop: Set<string>) => normalizeArabic(s).split(" ").filter((t) => t.length >= 3 && !stop.has(t));

/** The lesson a live notice is about, or null when it isn't clear. */
export function matchLiveLesson(text: string, lessons: LessonForMatch[]): string | null {
  const title = /«([^»]+)»/.exec(text)?.[1];
  if (!title) return null;
  const titleTokens = tokens(title, BOOK_STOP);
  if (!titleTokens.length) return null;
  const norm = ` ${normalizeArabic(text)} `;
  const atQuba = norm.includes("قباء");
  const atNabawi = norm.includes("المسجد النبوي");

  const scored = lessons
    .map((l) => {
      const book = new Set(tokens(l.bookAr, BOOK_STOP));
      const overlap = titleTokens.filter((t) => book.has(t)).length / titleTokens.length;
      const nameHits = tokens(l.shaykhAr, NAME_STOP).filter((t) => norm.includes(` ${t} `)).length;
      let place = 0;
      if (atQuba) place = l.masjidId === "quba" ? 1 : -2;
      else if (atNabawi) place = l.masjidId === "nabawi" ? 1 : -2;
      return { slug: l.slug, overlap, score: overlap * 3 + Math.min(nameHits, 3) * 0.6 + place };
    })
    .filter((s) => s.overlap >= 0.5)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;
  if (scored.length > 1 && scored[0].score - scored[1].score < 0.3) return null;
  return scored[0].slug;
}

/** Hosts a public "Live" button may point at. Anything else in a post is ignored. */
const LIVE_HOSTS: [RegExp, number][] = [
  [/^(www\.|m\.)?youtube\.com$/i, 0],
  [/^youtu\.be$/i, 0],
  [/^([a-z0-9-]+\.)?mixlr\.com$/i, 1],
  [/^t\.me$/i, 2],
];

/** The rank of a link as a broadcast: video, then audio, then a Telegram livestream; null if it is not one. */
function liveRank(raw: string): number | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const host = LIVE_HOSTS.find(([re]) => re.test(u.hostname));
  if (!host) return null;
  const r = host[1];
  if (r === 0 && /youtube\.com$/i.test(u.hostname) && !/^\/(live|watch)/.test(u.pathname)) return null;
  if (r === 2 && !(/^\/[^/]+$/.test(u.pathname) && u.searchParams.has("livestream"))) return null;
  return r;
}

/** Best link to the broadcast itself: video, then audio, then a Telegram livestream. Only known broadcast hosts count. */
export function pickLiveLink(links: string[]): string | null {
  const ranked = links.map((u) => ({ u, r: liveRank(u) })).filter((x) => x.r !== null).sort((a, b) => a.r! - b.r!);
  return ranked[0]?.u ?? null;
}
