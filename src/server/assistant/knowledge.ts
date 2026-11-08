import { parse, type HTMLElement } from "node-html-parser";
import type { Db } from "@/server/db/client";
import * as COMPANY from "@/features/guides/company/content";
import { listFaqs, listGuides, FAQ_CATEGORIES, GUIDE_STAGES } from "@/server/content/queries";
import { listShaykhs, scheduleRows } from "@/server/duroos/queries";
import { PROGRAMS } from "@/content/programs";
import { KEY_DATES } from "@/content/key-dates";
import { DISCOUNTS } from "@/content/discounts";
import { LIVE_COLLECTIONS } from "@/content/library-books";
import { OFFICIAL } from "@/content/library";
import { slugify } from "@/lib/guide-html";
import { HELP_CONTACT_DEFAULT } from "@/server/settings";

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
};

const MAX = 1100;
const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PRAYER = { fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" } as const;

const squash = (s: string) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim();

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
      const rest = r.slice(1).map((c, i) => (head[i + 1] ? `${head[i + 1]} ${c}` : c)).filter((x) => x.trim());
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

/** Cuts guide HTML into passages at each h2, with the guide summary as the first passage. */
export function chunkGuide(g: { slug: string; title: string; summary: string; bodyHtml: string }, base = "/guides/"): Chunk[] {
  const url = `${base}${g.slug}`;
  const out: Chunk[] = [{ id: `guide-${g.slug}-0`, kind: "guide", title: g.title, text: g.summary, url }];
  const root = parse(g.bodyHtml);
  const used = new Set<string>();
  let section: string | undefined;
  let anchor = "";
  let blocks: string[] = [];
  let n = 1;
  const flush = () => {
    for (const w of windows(blocks)) out.push({ id: `guide-${g.slug}-${n++}`, kind: "guide", title: g.title, section, text: w, url: anchor ? `${url}#${anchor}` : url });
    blocks = [];
  };
  for (const node of root.childNodes) {
    const el = node as HTMLElement;
    const tag = el.tagName?.toLowerCase();
    if (tag === "h2") {
      flush();
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
    const parts: Chunk[] = [{ id: `program-${p.slug}-0`, kind: "program", title: p.name, text: `${head}\n${p.overview.join(" ")}`.slice(0, MAX * 2), url }];
    const rest = [
      p.levels?.length ? `Levels and tracks:\n${p.levels.map((l) => `• ${l}`).join("\n")}` : "",
      p.included?.length ? `Included:\n${p.included.map((l) => `• ${l}`).join("\n")}` : "",
      p.steps?.length ? `How to join:\n${p.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}` : "",
    ].filter(Boolean);
    windows(rest).forEach((w, i) => parts.push({ id: `program-${p.slug}-${i + 1}`, kind: "program", title: p.name, section: "Details", text: w, url }));
    return parts;
  });
}

function dateChunks(): Chunk[] {
  const line = (d: (typeof KEY_DATES)[number]) =>
    `• ${d.title}: ${d.start}${d.end ? ` to ${d.end}` : ""} (${d.hijri})${d.after ? `. ${d.after}` : ""}${d.note ? `. ${d.note}` : ""}`;
  const main = KEY_DATES.filter((d) => !d.minor);
  const minor = KEY_DATES.filter((d) => d.minor);
  return [
    { id: "dates-main", kind: "date", title: "University calendar 1448 and Islamic dates", section: "Main dates", text: main.map(line).join("\n"), url: "/guides/university-calendar-1448" },
    ...windows(minor.map(line)).map((w, i) => ({ id: `dates-admin-${i}`, kind: "date" as const, title: "University calendar 1448", section: "Request windows (postponing, drop and add, withdrawal, excuses)", text: w, url: "/guides/university-calendar-1448" })),
  ];
}

function discountChunks(): Chunk[] {
  return DISCOUNTS.flatMap((g) =>
    windows(g.offers.map((o) => `• ${o.nameEn ?? o.name}: ${o.deal}${o.students ? " (students included)" : ""}`)).map((w, i) => ({
      id: `deal-${g.id}-${i}`,
      kind: "discount" as const,
      title: "Student discounts with the University card",
      section: g.label,
      text: `Show your Islamic University card and ask before paying; some offers are for staff only.\n${w}`,
      url: "/discounts",
    }))
  );
}

function siteChunks(): Chunk[] {
  const help = `please message Admin on WhatsApp at ${HELP_CONTACT_DEFAULT}`;
  return [
    {
      id: "page-about",
      kind: "page",
      title: "About MESH",
      text: `MESH (Medina English Student Hub, medinahub.org) is run by students, for English-speaking students and families in Madinah. It is independent and impartial. It has live duroos schedules of the mashayikh, study programmes, guides, answers to common questions, a library of Islamic University course books, student discounts and key dates, in English with an Arabic version under /ar. For anything else, or to suggest a correction, ${help}. The MESH WhatsApp group (announcements, events and daily help) is only for English-speaking Western students; the join link is on every page.`,
      url: "/more",
    },
    { id: "page-duroos", kind: "page", title: "Duroos in Madinah", text: "Today's duroos of the mashayikh in Masjid an-Nabawi, Masjid Quba and other masjids are at /duroos with live status, cancellations and changes. The weekly schedule by day and prayer is at /duroos/schedule. Live broadcasts are at /duroos/live. Cancellations, postponements and new books are at /duroos/updates. Duroos for sisters are at /duroos/sisters. Free phone alerts when a dars changes can be turned on at /more#alerts.", url: "/duroos" },
    { id: "page-library", kind: "page", title: "The Jamiah library", text: `Islamic University course books (muqarrarat) and Ma'had books by level are in the MESH library at /library, readable on the site. Collections: ${LIVE_COLLECTIONS.map((c) => c.title).join(", ")}. The Ma'had hub at /mahad has books by level, answer keys, the rules and what happens if you fail a level. Official links: ${OFFICIAL.map((o) => `${o.title} (${o.href})`).join("; ")}.`, url: "/library" },
    { id: "page-guides", kind: "page", title: "Guides", text: `MESH guides cover: ${GUIDE_STAGES.map((s) => `${s.label} (${s.blurb})`).join("; ")}. Questions and answers by topic: ${FAQ_CATEGORIES.map((c) => c.label).join(", ")}, at /ask.`, url: "/guides" },
  ];
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
    ...guides.flatMap((g) => (g.slug === "university-calendar-1448" ? chunkGuide({ ...g, bodyHtml: "" }) : chunkGuide(g))),
    ...companyChunks(),
    ...faqs.map((f) => ({
      id: `faq-${f.slug}`,
      kind: "faq" as const,
      title: f.question,
      text: squash(f.answerHtml.replace(/<li>/g, " • ").replace(/<\/(p|li|h\d)>/g, "\n").replace(/<[^>]+>/g, " ")).slice(0, MAX * 2),
      url: `/ask/${f.slug}`,
    })),
    ...programChunks(),
    ...dateChunks(),
    ...discountChunks(),
    ...shaykhs.map((s) => {
      const his = lessons.filter((l) => l.shaykh.slug === s.slug);
      return {
        id: `shaykh-${s.slug}`,
        kind: "shaykh" as const,
        title: `${s.nameEn} (${s.nameAr})`,
        text: `${s.roleEn ?? ""} ${(s.facts ?? []).map((f) => f.en).join(" ")}\nDuroos: ${his.length ? his.map(lessonText).join("\n") : "none listed now"}`.trim(),
        url: `/duroos/shaykh/${s.slug}`,
      };
    }),
    ...lessons.map((l) => ({ id: `dars-${l.slug}`, kind: "dars" as const, title: `${l.bookEn} with ${l.shaykh.nameEn}`, text: lessonText(l), url: `/duroos/lesson/${l.slug}` })),
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
