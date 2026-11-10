import { parse, type HTMLElement } from "node-html-parser";
import type { Db } from "@/server/db/client";
import * as COMPANY from "@/features/guides/company/content";
import { listFaqs, listGuides, FAQ_CATEGORIES } from "@/server/content/queries";
import { GUIDE_TOPICS } from "@/lib/guide-topics";
import { listShaykhs, scheduleRows } from "@/server/duroos/queries";
import { PROGRAMS } from "@/content/programs";
import { KEY_DATES } from "@/content/key-dates";
import { DISCOUNTS } from "@/content/discounts";
import { LIVE_COLLECTIONS } from "@/content/library-books";
import { OFFICIAL } from "@/content/library";
import { MAHAD_COPY } from "@/features/library/MahadPage";
import { slugify } from "@/lib/guide-html";
import { HELP_CONTACT_DEFAULT, HELP_EMAIL_DEFAULT } from "@/server/settings";

/**
 * The assistant's knowledge: every public page of MESH cut into small, self-contained passages
 * (a guide is split at its h2 headings, long sections again by paragraph). Each passage keeps
 * the link to the exact place it came from, so an answer can always point to "read more".
 */
export type ChunkKind = "guide" | "faq" | "program" | "date" | "discount" | "dars" | "shaykh" | "library" | "page";

export type Chunk = {
  id: string;
  kind: ChunkKind;
  /** The page title (guide, question, programme). */
  title: string;
  /** The section heading inside the page, when there is one. */
  section?: string;
  text: string;
  url: string;
  /** Extra search words that are not shown (an FAQ's tags). */
  keywords?: string;
  /** Arabic words that find an English passage (its page's Arabic title or question). Only Arabic questions search them. */
  keywordsAr?: string;
  /** A guide passage's place: -1 the summary, then 0 for the text before the first heading and 1, 2... per heading. The Arabic twin of a section has the same number. */
  part?: number;
  /** "ar" when the passage itself is Arabic (a translated guide or answer); English otherwise. */
  lang?: "ar";
  /** The page's Arabic title, shown as the source when an English passage answers an Arabic question. */
  titleAr?: string;
};

const MAX = 1100;
const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PRAYER = { fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" } as const;

const squash = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?)])/g, "$1")
    .trim();

/** Plain text of an element, with list items and table cells kept apart so sentences do not run together. */
function textOf(el: HTMLElement): string {
  const tag = el.tagName?.toLowerCase();
  if (tag === "li") return `• ${squash(el.text)}`;
  if (tag === "tr") return el.querySelectorAll("th,td").map((c) => squash(c.text)).filter(Boolean).join(" | ");
  if (tag === "ul" || tag === "ol") return el.querySelectorAll(":scope > li").map((li, i) => `${tag === "ol" ? `${i + 1}.` : "•"} ${squash(li.text)}`).join("\n");
  if (tag === "table") return tableText(el);
  return squash(el.text);
}

/**
 * A table as readable lines: each row becomes "• first cell: header two value two; header three
 * value three", so a passage about bus and train fares still reads as sentences.
 */
function tableText(table: HTMLElement): string {
  const rows = table.querySelectorAll("tr").map((r) => r.querySelectorAll("th,td").map((c) => squash(c.text)));
  const headed = table.querySelectorAll("tr")[0]?.querySelectorAll("th").length > 0;
  const head = headed ? rows[0] : [];
  return rows
    .slice(headed ? 1 : 0)
    .filter((r) => r.some(Boolean))
    .map((r) => {
      const rest = r.slice(1).map((c, i) => (!c.trim() ? "" : head[i + 1] ? `${head[i + 1]}: ${c}` : c)).filter(Boolean);
      return `• ${r[0]}${rest.length ? `: ${rest.join("; ")}` : ""}`;
    })
    .join("\n");
}

/** Splits a long section into windows of whole blocks, each under MAX characters where possible. */
function windows(blocks: string[]): string[] {
  const out: string[] = [];
  let cur = "";
  for (const b of blocks) {
    if (cur && cur.length + b.length > MAX) {
      out.push(cur);
      cur = "";
    }
    cur = cur ? `${cur}\n${b}` : b;
  }
  if (cur) out.push(cur);
  return out;
}

/**
 * Cuts guide HTML into passages at each h2, with the guide summary as the first passage. An Arabic
 * guide (`lang: "ar"`) gets its own ids and the /ar link, with the same anchors as the Arabic page.
 */
export function chunkGuide(g: { slug: string; title: string; summary: string; bodyHtml: string }, base = "/guides/", opts: { lang?: "ar"; titleAr?: string } = {}): Chunk[] {
  const url = `${base}${g.slug}`;
  const id = opts.lang ? `guide-ar-${g.slug}` : `guide-${g.slug}`;
  const extra = { ...(opts.lang ? { lang: opts.lang } : {}), ...(opts.titleAr ? { titleAr: opts.titleAr, keywordsAr: opts.titleAr } : {}) };
  const out: Chunk[] = [{ id: `${id}-0`, kind: "guide", title: g.title, text: g.summary, url, part: -1, ...extra }];
  const root = parse(g.bodyHtml);
  const used = new Set<string>();
  let section: string | undefined;
  let anchor = "";
  let blocks: string[] = [];
  let n = 1;
  let part = 0;
  const flush = () => {
    for (const w of windows(blocks)) out.push({ id: `${id}-${n++}`, kind: "guide", title: g.title, section, text: w, url: anchor ? `${url}#${anchor}` : url, part, ...extra });
    blocks = [];
  };
  for (const node of root.childNodes) {
    const el = node as HTMLElement;
    const tag = el.tagName?.toLowerCase();
    if (tag === "h2") {
      flush();
      part++;
      section = squash(el.text);
      // Same ids as enhanceGuideHtml gives the headings on the page.
      let id = slugify(section);
      for (let k = 2; used.has(id); k++) id = `${slugify(section)}-${k}`;
      used.add(id);
      anchor = id;
      continue;
    }
    const t = tag ? textOf(el) : squash(node.text);
    if (t) blocks.push(tag === "h3" || tag === "h4" ? `${t}:` : t);
  }
  flush();
  return out.filter((c) => c.text.length > 0);
}

function companyChunks(): Chunk[] {
  const url = `/guides/${COMPANY.SLUG}`;
  const c = (id: string, section: string, text: string): Chunk => ({ id: `company-${id}`, kind: "guide", title: COMPANY.TITLE, section, text, url });
  return [
    c("summary", "Overview", `${COMPANY.SUMMARY} ${COMPANY.NOT_FREELANCE}`),
    c("fit", "Is it right for you", COMPANY.FIT.map((f) => `• ${f.title}: ${f.body}`).join("\n")),
    c("changes", "What changed in 2025", COMPANY.CHANGES_2025.map((f) => `• ${f.title}: ${f.body}`).join("\n")),
    c("situations", "Your situation", COMPANY.SITUATIONS.map((s) => `• ${s.label}: ${s.first} ${s.residency} ${s.warn ?? ""}`).join("\n")),
    c("paths", "Company types", COMPANY.PATHS.map((p) => `• ${p.name}: best for ${p.bestFor}. ${p.needs} Capital: ${p.capital} ${p.note ?? ""}`).join("\n")),
    ...COMPANY.PHASES.map((p) => c(`phase-${p.id}`, `Phase: ${p.name} (${p.time})`, `${p.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\nWatch out: ${p.watch}`)),
    c("costs", "Set-up costs", `${COMPANY.SETUP_COSTS.map((x) => `• ${x.label}: about ${x.sar} SAR${x.note ? ` (${x.note})` : ""}`).join("\n")}\nYearly: iqama ${COMPANY.YEARLY.iqama} SAR, work permit levy ${COMPANY.YEARLY.levyMonthly} SAR a month, dependant fee ${COMPANY.YEARLY.dependantMonthly} SAR a month each, Muqeem ${COMPANY.YEARLY.muqeem} SAR.`),
    c("tax", "Taxes", COMPANY.TAX.map((t) => `• ${t.title}: ${t.body}`).join("\n")),
    c("family", "Bringing your family", COMPANY.FAMILY.map((f) => `• ${f}`).join("\n")),
    c("running", "Running the company", COMPANY.RUNNING.map((r) => `${r.when}: ${r.items.join(" ")}`).join("\n")),
    c("pitfalls", "Common mistakes", COMPANY.PITFALLS.map((p) => `• ${p.title}: ${p.body}`).join("\n")),
  ];
}

function programChunks(): Chunk[] {
  return PROGRAMS.flatMap((p) => {
    const url = `/programs/${p.slug}`;
    const head = `${p.name} (${p.nameAr}). ${p.tagline} For: ${p.audience.join(", ")}. Price: ${p.price}. Where: ${p.where}.${p.nextIntake ? ` Next intake: ${p.nextIntake}.` : ""} Last checked ${p.checked}.`;
    const parts: Chunk[] = [{ id: `program-${p.slug}-0`, kind: "program", title: p.name, titleAr: p.nameAr, text: `${head}\n${p.overview.join(" ")}`.slice(0, MAX * 2), url }];
    const rest = [
      p.levels?.length ? `Levels and tracks:\n${p.levels.map((l) => `• ${l}`).join("\n")}` : "",
      p.included?.length ? `Included:\n${p.included.map((l) => `• ${l}`).join("\n")}` : "",
      p.steps?.length ? `How to join:\n${p.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}` : "",
    ].filter(Boolean);
    windows(rest).forEach((w, i) => parts.push({ id: `program-${p.slug}-${i + 1}`, kind: "program", title: p.name, titleAr: p.nameAr, section: "Details", text: w, url }));
    return parts;
  });
}

function dateChunks(): Chunk[] {
  const line = (d: (typeof KEY_DATES)[number]) =>
    `• ${d.title}: ${d.start}${d.end ? ` to ${d.end}` : ""} (${d.hijri})${d.after ? `. ${d.after}` : ""}${d.note ? `. ${d.note}` : ""}`;
  const main = KEY_DATES.filter((d) => !d.minor);
  const minor = KEY_DATES.filter((d) => d.minor);
  return [
    { id: "dates-main", kind: "date", title: "University calendar 1448 and Islamic dates", titleAr: "تقويم الجامعة 1448 والمواسم", section: "Main dates", text: main.map(line).join("\n"), url: "/guides/university-calendar-1448" },
    ...windows(minor.map(line)).map((w, i) => ({ id: `dates-admin-${i}`, kind: "date" as const, title: "University calendar 1448", titleAr: "تقويم الجامعة 1448", section: "Request windows (postponing, drop and add, withdrawal, excuses)", text: w, url: "/guides/university-calendar-1448" })),
  ];
}

function discountChunks(): Chunk[] {
  return DISCOUNTS.flatMap((g) =>
    windows(g.offers.map((o) => `• ${o.nameEn ?? o.name}: ${o.deal}${o.students ? " (students included)" : ""}`)).map((w, i) => ({
      id: `deal-${g.id}-${i}`,
      kind: "discount" as const,
      title: "Student discounts with the University card",
      titleAr: "خصومات الطلاب بالبطاقة الجامعية",
      section: g.label,
      text: `Show your Islamic University card and ask before paying; some offers are for staff only.\n${w}`,
      url: "/discounts",
    }))
  );
}

function siteChunks(): Chunk[] {
  const help = `please message Admin on WhatsApp at ${HELP_CONTACT_DEFAULT} or email ${HELP_EMAIL_DEFAULT}`;
  return [
    {
      id: "page-about",
      kind: "page",
      title: "About MESH",
      titleAr: "عن MESH",
      text: `MESH (Medina English Student Hub, medinahub.org) is for English-speaking students and families in Madinah. It is brought to you by Albaseerah International Institute. It is independent and impartial. It has live duroos schedules of the mashayikh, study programmes, guides, answers to common questions, a library of Islamic University course books, student discounts and key dates, in English with an Arabic version under /ar. For anything else, or to suggest a correction, ${help}. The MESH WhatsApp group (announcements, events and daily help) is only for English-speaking Western students; the join link is on every page.`,
      url: "/more",
    },
    { id: "page-duroos", kind: "page", title: "Duroos in Madinah", titleAr: "الدروس في المدينة", text: "Today's duroos of the mashayikh in Masjid an-Nabawi, Masjid Quba and other masjids are at /duroos with live status, cancellations and changes. The weekly schedule by day and prayer is at /duroos/schedule. Live broadcasts are at /duroos/live. Cancellations, postponements and new books are at /duroos/updates. Duroos for sisters are at /duroos/sisters. Free phone alerts when a dars changes can be turned on at /more#alerts.", url: "/duroos" },
    { id: "page-library", kind: "page", title: "The Jamiah library", titleAr: "مكتبة الجامعة", text: `Islamic University course books (muqarrarat) and Ma'had books by level are in the MESH library at /library, readable on the site. Collections: ${LIVE_COLLECTIONS.map((c) => c.title).join(", ")}. The Ma'had hub at /mahad has books by level, answer keys, the rules and what happens if you fail a level. Official links: ${OFFICIAL.map((o) => `${o.title} (${o.href})`).join("; ")}.`, url: "/library" },
    {
      id: "mahad-fail",
      kind: "guide",
      title: "Ma'had hub",
      titleAr: "المعهد",
      section: MAHAD_COPY.en.failTitle,
      text: `${MAHAD_COPY.en.fail.map(([b, rest]) => `• ${b}${rest}`).join("\n")}\n${MAHAD_COPY.en.checked}`,
      url: "/mahad#fail",
    },
    {
      id: "mahad-about",
      kind: "guide",
      title: "Ma'had hub",
      titleAr: "المعهد",
      text: `${MAHAD_COPY.en.subtitle} ${MAHAD_COPY.en.booksIntro} ${MAHAD_COPY.en.sixTitle}: ${MAHAD_COPY.en.sixIntro} ${MAHAD_COPY.en.answersIntro} Rules and guides: ${MAHAD_COPY.en.rules.join(", ")}.`,
      url: "/mahad",
    },
    { id: "page-guides", kind: "page", title: "Guides", titleAr: "الأدلة", text: `MESH guides, by topic: ${GUIDE_TOPICS.map((t) => `${t.label} (${t.blurb})`).join("; ")}. Questions and answers by topic: ${FAQ_CATEGORIES.map((c) => c.label).join(", ")}, at /ask.`, url: "/guides" },
  ];
}

const filled = (s: string | null | undefined): s is string => typeof s === "string" && s.trim().length > 0;

/**
 * True when article HTML shows something: text other than spaces, or an image. An emptied editor sends
 * "<p></p>", which is nothing, so the Arabic passages fall back to the English ones.
 */
const hasVisibleHtml = (html: string | null | undefined): html is string =>
  !!html && (/<img\b/i.test(html) || html.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;|\u00A0/g, " ").trim().length > 0);

/** An FAQ answer as plain text. Inline tags (bold, links) go without a gap so "<b>Personal</b>, then" stays "Personal, then". */
const answerText = (html: string) =>
  squash(html.replace(/<li>/g, " • ").replace(/<\/(p|li|h\d)>/g, " ").replace(/<\/?(strong|b|em|i|a|span|code)\b[^>]*>/g, "").replace(/<[^>]+>/g, " ")).slice(0, MAX * 2);

type GuideIn = { slug: string; title: string; summary: string; bodyHtml: string; titleAr?: string | null; summaryAr?: string | null; bodyHtmlAr?: string | null };

/**
 * A guide's passages: the English ones (carrying the Arabic title when there is one, so an Arabic
 * question finds them), and the Arabic ones when the guide is translated (AR1 columns).
 */
export function guideChunks(g: GuideIn): Chunk[] {
  const titleAr = filled(g.titleAr) ? g.titleAr.trim() : undefined;
  const en = chunkGuide(g, "/guides/", { titleAr });
  const body = hasVisibleHtml(g.bodyHtmlAr) ? g.bodyHtmlAr! : "";
  if (!body && !filled(g.summaryAr)) return en;
  const ar = chunkGuide({ slug: g.slug, title: titleAr ?? g.title, summary: filled(g.summaryAr) ? g.summaryAr : "", bodyHtml: body }, "/ar/guides/", { lang: "ar" });
  return [...en, ...ar];
}

type FaqIn = { slug: string; question: string; answerHtml: string; tags?: string[] | null; questionAr?: string | null; answerHtmlAr?: string | null };

/** An answer's passage, and its Arabic twin when the answer is translated. */
export function faqChunks(f: FaqIn): Chunk[] {
  const tags = (f.tags ?? []).join(" ");
  const questionAr = filled(f.questionAr) ? f.questionAr.trim() : undefined;
  const en: Chunk = { id: `faq-${f.slug}`, kind: "faq", title: f.question, text: answerText(f.answerHtml), url: `/ask/${f.slug}`, keywords: tags, ...(questionAr ? { titleAr: questionAr, keywordsAr: questionAr } : {}) };
  if (!hasVisibleHtml(f.answerHtmlAr)) return [en];
  return [en, { id: `faq-ar-${f.slug}`, kind: "faq", lang: "ar", title: questionAr ?? f.question, text: answerText(f.answerHtmlAr!), url: `/ar/ask/${f.slug}`, keywords: [tags, f.question].join(" ") }];
}

/** Every passage of the site. Database rows (guides, FAQs, duroos) plus the content files. */
export async function buildKnowledge(db: Db): Promise<Chunk[]> {
  const [guides, faqs, shaykhs, lessons] = await Promise.all([listGuides(db), listFaqs(db), listShaykhs(db), scheduleRows(db)]);
  const lessonText = (l: (typeof lessons)[number]) => {
    const days = l.daysLabelEn ?? (l.days.length ? l.days.map((d) => DAY[d]).join(", ") : "days vary");
    const status = l.status === "active" ? "" : ` Status: ${l.status}.`;
    return `${l.bookEn} (${l.bookAr}) with ${l.shaykh.nameEn}, after ${PRAYER[l.prayer]}${l.timeLabelEn ? ` (${l.timeLabelEn})` : ""}, ${days}, at ${l.masjid.nameEn}, ${l.locationEn}.${l.audience === "women" ? " For sisters." : ""}${status}${l.noteEn ? ` ${l.noteEn}` : ""}`;
  };
  return [
    ...siteChunks(),
    // The calendar guide's page is drawn from the key dates (indexed below), not from its stored body.
    ...guides.flatMap((g) => guideChunks(g.slug === "university-calendar-1448" ? { ...g, bodyHtml: "", bodyHtmlAr: null } : g)),
    ...companyChunks(),
    ...faqs.flatMap(faqChunks),
    ...programChunks(),
    ...dateChunks(),
    ...discountChunks(),
    ...shaykhs.map((s) => {
      const his = lessons.filter((l) => l.shaykh.slug === s.slug);
      return {
        id: `shaykh-${s.slug}`,
        kind: "shaykh" as const,
        title: `${s.nameEn} (${s.nameAr})`,
        titleAr: s.nameAr,
        text: `${[s.roleEn ?? "", ...(s.facts ?? []).map((f) => f.en)].map((x) => x.trim()).filter(Boolean).map((x) => (/[.!?]$/.test(x) ? x : `${x}.`)).join(" ")}\nDuroos: ${his.length ? his.map(lessonText).join("\n") : "none listed now"}`.trim(),
        url: `/duroos/shaykh/${s.slug}`,
      };
    }),
    ...lessons.map((l) => ({ id: `dars-${l.slug}`, kind: "dars" as const, title: `${l.bookEn} with ${l.shaykh.nameEn}`, titleAr: `${l.bookAr} مع ${l.shaykh.nameAr}`, text: lessonText(l), url: `/duroos/lesson/${l.slug}` })),
  ];
}

let cache: { at: number; chunks: Chunk[] } | null = null;

/** The knowledge, built at most once every 10 minutes per server instance. */
export async function getKnowledge(db: Db, now = Date.now()): Promise<Chunk[]> {
  if (cache && now - cache.at < 10 * 60_000) return cache.chunks;
  const chunks = await buildKnowledge(db);
  cache = { at: now, chunks };
  return chunks;
}

/** Test hook. */
export function resetKnowledge() {
  cache = null;
}
