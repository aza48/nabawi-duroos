import { HELP_CONTACT_DEFAULT, HELP_EMAIL_DEFAULT } from "@/server/settings";
import type { Chunk } from "./knowledge";
import { keyTerms, termHits } from "./retrieve";

/**
 * Answers without any AI: the sentences of the best passages that carry the question's words,
 * in their original order, each passage closed by its [n] marker. Used when no provider is
 * configured or all are out of quota, so the assistant is useful at any hour and at no cost.
 */

/** Abbreviations that end in a full stop without ending the sentence ("Dr. Hamid", "e.g. a car"). */
const ABBR = /(?:^|\s)(?:dr|prof|mr|mrs|ms|st|no|nos|vs|approx|eg|e\.g|i\.e|ie|jr|sr|mt|ave|rd|[A-Z])\.$/i;

/** Splits a passage into sentences and list lines, keeping each list line whole. */
export function sentences(text: string): string[] {
  return text
    .split("\n")
    .flatMap((line) => {
      if (/^(•|\d+\.)\s/.test(line)) return [line];
      // A sentence ends at ". ", "! ", "? " or "؟ ", so "sso.iu.edu.sa" and "2.5" stay whole.
      const out: string[] = [];
      for (const part of line.split(/(?<=[.!?؟])\s+(?=\S)/)) {
        if (out.length && ABBR.test(out[out.length - 1])) out[out.length - 1] += ` ${part}`;
        else out.push(part);
      }
      return out;
    })
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
}

/** A question about money ("how much", "كم"): sentences with amounts answer it. */
const MONEY_Q = /\b(how much|cost|costs|price|prices|fee|fees|fare|fares|rent|budget|expensive|cheap|pay)\b|كم|تكلف|سعر|اسعار|رسوم|ميزاني|مصاريف/i;
const AMOUNT = /\d[\d,.]*\s*(sar|riyal|£|\$)|(sar|£)\s*\d|\d+\s*ريال|\((sar|ريال)\)|\b\d{1,3}(,\d{3})+\b|\b\d+ to \d+\b/i;
/** A sentence that only points elsewhere ("See ...", "More in ...") is a last resort, never the answer itself. */
const POINTER = /^(see|more in|steps are in|details:|full breakdown:|read more)\b/i;

function score(s: string, terms: string[], money: boolean): number {
  return termHits(terms, s) + (money && AMOUNT.test(s) ? 1 : 0) - (POINTER.test(s) ? 0.5 : 0);
}

export type ExtractOptions = { max?: number; avoid?: RegExp };

/** The best few sentences of the passage, in order, within roughly `max` characters. */
export function extract(question: string, p: Chunk, opts: ExtractOptions | number = {}): string {
  const { max = 520, avoid } = typeof opts === "number" ? { max: opts } : opts;
  const terms = keyTerms(question);
  const money = MONEY_Q.test(question);
  const all = sentences(p.text);
  if (!all.length) return "";
  const ranked = all
    .map((s, i) => ({ s, i, v: avoid?.test(s) ? -1 : score(s, terms, money) }))
    .sort((a, b) => b.v - a.v || a.i - b.i);
  const picked = new Set<number>();
  let len = 0;
  for (const r of ranked) {
    if (r.v < 0 || (len && (r.v === 0 || len + r.s.length > max))) continue;
    picked.add(r.i);
    len += r.s.length;
    // A list line pulls in its neighbours so a list of steps reads as a list.
    if (/^(•|\d+\.)\s/.test(r.s)) {
      for (const j of [r.i - 1, r.i + 1, r.i + 2]) {
        // Steps travel together; table rows only when they are as relevant as the one picked.
        const neighbour = all[j] && /^(•|\d+\.)\s/.test(all[j]) && !avoid?.test(all[j]) && (/^\d+\./.test(all[j]) || score(all[j], terms, money) >= r.v);
        if (neighbour && len + all[j].length <= max) {
          picked.add(j);
          len += all[j].length;
        }
      }
    }
    if (len >= max * 0.8) break;
  }
  // A heading line ("Start of final exams:") means nothing without what follows it.
  for (const i of [...picked]) if (/:$/.test(all[i]) && !(all[i + 1] && picked.has(i + 1))) {
    if (all[i + 1] && len + all[i + 1].length <= max * 1.2) picked.add(i + 1);
    else picked.delete(i);
  }
  if (!picked.size) {
    const first = ranked.find((r) => r.v >= 0) ?? ranked[0];
    picked.add(first.i);
  }
  // A list line that opens the answer needs the sentence that introduces it.
  const first = Math.min(...picked);
  if (/^(•|\d+\.)\s/.test(all[first]) && first > 0 && !/^(•|\d+\.)\s/.test(all[first - 1])) picked.add(first - 1);
  const out: string[] = [];
  [...picked].sort((a, b) => a - b).forEach((i) => {
    const s = all[i];
    const isList = /^(•|\d+\.)\s/.test(s);
    if (isList) out.push(`\n${s.replace(/^•\s/, "- ")}`);
    else out.push(out.length && !out[out.length - 1].startsWith("\n") ? ` ${s}` : `\n${s}`);
  });
  return out.join("").trim();
}

/** The reply when MESH has no answer: the help line, said plainly. */
export function notFound(lang: "en" | "ar"): string {
  return lang === "ar"
    ? `هذا غير موجود في MESH بعد. راسل المشرف على واتساب على الرقم ‎${HELP_CONTACT_DEFAULT} أو على البريد الإلكتروني ‎${HELP_EMAIL_DEFAULT}، وسيساعدك فريق MESH ويُضاف الجواب إلى الموقع.`
    : `This isn't on MESH yet. Message Admin on WhatsApp at ${HELP_CONTACT_DEFAULT} or email ${HELP_EMAIL_DEFAULT}: the MESH team will help, and the answer is added to the site.`;
}

/** The line above an English passage that answers an Arabic question. */
export const ENGLISH_PAGE_AR = "إليك ما في MESH عن هذا، والنص بالإنجليزية:";

/** Numbers sources by link, in the order they are used: two passages from one section share a number. */
export class Citer {
  readonly used: Chunk[] = [];
  mark(c: Chunk): string {
    let i = this.used.findIndex((u) => u.url === c.url);
    if (i < 0) i = this.used.push(c) - 1;
    return `[${i + 1}]`;
  }
}

/** Puts the marker at the end of a block of text, after its last line. */
export const cite = (text: string, marker: string) => `${text.trim()} ${marker}`;

export type Composed = { text: string; used: Chunk[] };

/**
 * A plain answer from the top passages: the best one, plus one more when it adds something (a
 * second page, or another section of the same page, like the fares after the route). Each block
 * ends with the [n] of its source; `used` lists the sources in that order.
 */
export function composeExtractive(question: string, passages: Chunk[], lang: "en" | "ar", opts: { avoid?: RegExp; lead?: string } = {}): Composed {
  if (!passages.length) return { text: notFound(lang), used: [] };
  const citer = new Citer();
  const [a, ...rest] = passages;
  const terms = keyTerms(question);
  const money = MONEY_Q.test(question);
  const first = extract(question, a, { avoid: opts.avoid });
  const need = Math.max(1, Math.ceil(terms.length / 2));
  // A summary (the first, short passage of a guide) rarely holds the steps or the figures: the next section does.
  const short = a.text.length < 320;
  const b = rest.find((p) => {
    if (p.id === a.id) return false;
    const samePage = p.url.split("#")[0] === a.url.split("#")[0];
    if (samePage && !(short || (money && AMOUNT.test(p.text) && !AMOUNT.test(first)) || p.url !== a.url)) return false;
    return score(p.text, terms, money) >= need;
  });
  let second = b ? extract(question, b, { max: 360, avoid: opts.avoid }) : "";
  if (second && (first.includes(second) || second.includes(first))) second = "";
  // An Arabic answer says once, above the first English block, that the text below is English.
  const english = (c: Chunk) => lang === "ar" && c.lang !== "ar";
  // Marked in reading order, so the first block is [1].
  const firstBlock = cite(first, citer.mark(a));
  const secondBlock = second && b ? cite(second, citer.mark(b)) : "";
  const blocks = [
    opts.lead ?? "",
    english(a) ? ENGLISH_PAGE_AR : "",
    firstBlock,
    secondBlock && !english(a) && english(b!) ? ENGLISH_PAGE_AR : "",
    secondBlock,
  ].filter(Boolean);
  return { text: blocks.join("\n\n").trim(), used: citer.used };
}

/** Words that rank one place above another. A "which is best" answer leaves out sentences that use them. */
export const RANKING = /\b(best|top choice|recommended|we recommend|number one|most popular)\b/i;

/** The programmes page, cited when programmes are named side by side. */
export const PROGRAMS_PAGE: Chunk = { id: "page-programs", kind: "page", title: "Study programmes", titleAr: "برامج الدراسة", text: "", url: "/programs" };

/** Programmes named side by side, alphabetically, in one line, for a "which is best" question. */
export function programLine(programs: Chunk[], ar: boolean, citer: Citer): string {
  // "Markaz Mishkat (women)" keeps its name; the Arabic name in brackets is left for the page.
  const names = [...new Set(programs.map((p) => (ar && p.titleAr ? p.titleAr : p.title)))].sort((x, y) => x.localeCompare(y, ar ? "ar" : "en"));
  const list = names.join(ar ? "، " : ", ");
  return ar ? `البرامج في MESH بالترتيب الأبجدي: ${list} ${citer.mark(PROGRAMS_PAGE)}` : `Programmes on MESH, in alphabetical order: ${list} ${citer.mark(PROGRAMS_PAGE)}`;
}
