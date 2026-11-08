import MiniSearch from "minisearch";
import type { Db } from "@/server/db/client";
import * as COMPANY from "@/features/guides/company/content";
import { listFaqs, listGuides } from "@/server/content/queries";
import { scheduleRows } from "@/server/duroos/queries";
import { PROGRAMS } from "@/content/programs";
import { DISCOUNTS } from "@/content/discounts";
import { KEY_DATES } from "@/content/key-dates";
import { expandQuery, normalize } from "@/lib/search/normalize";
import { slugify } from "@/lib/guide-html";

/** One passage the assistant can read and cite: a guide section, an FAQ, a programme, a dars, a date. */
export type Passage = { id: string; title: string; url: string; text: string; kind: string };

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const plain = (html: string) =>
  html
    .replace(/<\/(p|li|h[1-6]|tr|blockquote)>/gi, "\n")
    .replace(/<(td|th)[^>]*>/gi, " | ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();

/** Splits a guide at its h2 headings so each passage is about one thing and links to its own section. */
export function guidePassages(g: { slug: string; title: string; summary: string; bodyHtml: string }): Passage[] {
  const parts = g.bodyHtml.split(/(?=<h2[^>]*>)/i);
  const out: Passage[] = [];
  parts.forEach((part, i) => {
    const h = /<h2[^>]*>([\s\S]*?)<\/h2>/i.exec(part);
    const heading = h ? plain(h[1]) : null;
    const text = plain(part).slice(0, 2400);
    if (!text) return;
    out.push({
      id: `guide-${g.slug}-${i}`,
      kind: "guide",
      title: heading ? `${g.title}: ${heading}` : g.title,
      url: heading ? `/guides/${g.slug}#${slugify(heading)}` : `/guides/${g.slug}`,
      text: i === 0 ? `${g.summary}\n${text}` : text,
    });
  });
  return out;
}

/** Everything MESH says, as passages. Built from the live content, so it is always current. */
export async function buildPassages(db: Db): Promise<Passage[]> {
  const [guides, faqs, lessons] = await Promise.all([listGuides(db), listFaqs(db), scheduleRows(db)]);
  const out: Passage[] = [];
  for (const g of guides) out.push(...guidePassages(g));
  out.push({ id: `guide-${COMPANY.SLUG}`, kind: "guide", title: COMPANY.TITLE, url: `/guides/${COMPANY.SLUG}`, text: `${COMPANY.SUMMARY}\n${COMPANY.SEARCH_TEXT}`.slice(0, 2400) });
  for (const f of faqs) out.push({ id: `faq-${f.slug}`, kind: "faq", title: f.question, url: `/ask/${f.slug}`, text: plain(f.answerHtml).slice(0, 2000) });
  for (const p of PROGRAMS) {
    out.push({
      id: `program-${p.slug}`,
      kind: "programme",
      title: `${p.name} (${p.nameAr})`,
      url: `/programs/${p.slug}`,
      text: [p.tagline, `Price: ${p.price}`, `Where: ${p.where}`, p.nextIntake ? `Next intake: ${p.nextIntake}` : "", `For: ${p.audience.join(", ")}`, ...p.overview, ...(p.levels ?? []), ...(p.included ?? []), ...(p.steps ?? []), ...(p.contact ?? []).map((c) => `${c.label}: ${c.href}`)]
        .filter(Boolean)
        .join("\n")
        .slice(0, 2400),
    });
  }
  for (const l of lessons) {
    if (l.status !== "active") continue;
    out.push({
      id: `dars-${l.slug}`,
      kind: "dars",
      title: `${l.bookEn} (${l.bookAr}) with ${l.shaykh.nameEn}`,
      url: `/duroos/lesson/${l.slug}`,
      text: [
        `Shaykh: ${l.shaykh.nameEn} (${l.shaykh.nameAr})`,
        `Book: ${l.bookEn} (${l.bookAr})`,
        `Where: ${l.masjid.nameEn}, ${l.locationEn}`,
        `When: after ${l.prayer}${l.days.length ? `, on ${l.days.map((d) => DAY[d]).join(", ")}` : ", every day"}`,
        l.timeLabelEn ? `Time: ${l.timeLabelEn}` : "",
        l.audience && l.audience !== "all" ? `For: ${l.audience}` : "",
      ].filter(Boolean).join("\n"),
    });
  }
  for (const g of DISCOUNTS) {
    out.push({ id: `discounts-${g.id}`, kind: "discounts", title: `Student discounts: ${g.label}`, url: "/discounts", text: g.offers.map((o) => `${o.nameEn ?? o.name}: ${o.deal}`).join("\n").slice(0, 2400) });
  }
  const dates = KEY_DATES.map((d) => `${d.title}: ${d.start}${d.end ? ` to ${d.end}` : ""} (${d.hijri})${d.note ? `. ${d.note}` : ""}`);
  for (let i = 0; i < dates.length; i += 12) {
    out.push({ id: `dates-${i}`, kind: "dates", title: "Key dates: University calendar and Islamic dates", url: "/guides/university-calendar-1448", text: dates.slice(i, i + 12).join("\n") });
  }
  out.push(
    { id: "site-group", kind: "page", title: "The MESH WhatsApp group", url: "/more#rules", text: "MESH is run by students, for English-speaking students in Madinah. Announcements, events and everyday help happen in the MESH WhatsApp group. Join it with any \"Join the group\" button on the site." },
    { id: "site-alerts", kind: "page", title: "Phone alerts for the duroos", url: "/more#alerts", text: "Free phone alerts, no account: a morning brief of today's duroos, or every cancellation and change, or one shaykh's lessons from his page." },
    { id: "site-library", kind: "page", title: "The Jamiah library", url: "/library", text: "The course books (muqarrarat) for every college and level of the Islamic University, and the Ma'had books, answer keys and student guide." },
    { id: "site-mahad", kind: "page", title: "Ma'had hub", url: "/mahad", text: "The Arabic Language Institute at the Islamic University: the textbooks for every level, the answer keys, and what happens if you fail a level." },
  );
  return out;
}

/** Search over the passages with the site's Arabic and transliteration-aware normaliser. */
export function createRetriever(passages: Passage[]) {
  const ms = new MiniSearch<Passage>({
    fields: ["title", "text"],
    storeFields: ["id"],
    processTerm: (t) => normalize(t) || null,
    tokenize: (s) => normalize(s).split(/[\s-]+/),
    searchOptions: { boost: { title: 2.5, text: 1 }, prefix: (t) => t.length >= 4, fuzzy: (t) => (t.length >= 6 ? 0.2 : false), combineWith: "OR" },
  });
  ms.addAll(passages);
  const byId = new Map(passages.map((p) => [p.id, p]));
  return (q: string, limit = 8): Passage[] => {
    if (!q.trim()) return [];
    return ms.search(expandQuery(q)).slice(0, limit).map((r) => byId.get(r.id)!).filter(Boolean);
  };
}

let cache: { at: number; retrieve: ReturnType<typeof createRetriever>; passages: Passage[] } | null = null;
const TTL_MS = 10 * 60 * 1000;

/** The retriever, rebuilt from the live content at most every 10 minutes per instance. */
export async function getRetriever(db: Db) {
  if (cache && Date.now() - cache.at < TTL_MS) return cache;
  const passages = await buildPassages(db);
  cache = { at: Date.now(), retrieve: createRetriever(passages), passages };
  return cache;
}

/** Test hook. */
export function resetKnowledgeCache() {
  cache = null;
}
