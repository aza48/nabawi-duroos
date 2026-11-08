import { normalize } from "@/lib/search/normalize";
import { HELP_CONTACT_DEFAULT } from "@/server/settings";
import type { Chunk } from "./knowledge";
import { keyTerms } from "./retrieve";

/**
 * Answers without any AI: the sentences of the best passages that carry the question's words,
 * in their original order. Used when no provider is configured or all are out of quota, so the
 * assistant is useful at any hour and at no cost.
 */

/** Splits a passage into sentences and list lines, keeping each list line whole. */
export function sentences(text: string): string[] {
  return text
    .split("\n")
    .flatMap((line) => (/^(•|\d+\.)\s/.test(line) ? [line] : line.match(/[^.!?؟]+[.!?؟]+(?=\s|$)|[^.!?؟]+$/g) ?? []))
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
}

function score(s: string, terms: string[]): number {
  const n = normalize(s);
  return terms.reduce((a, t) => a + (n.includes(t) ? 1 : 0), 0);
}

/** The best few sentences of the passage, in order, within roughly `max` characters. */
export function extract(question: string, p: Chunk, max = 520): string {
  const terms = keyTerms(question);
  const all = sentences(p.text);
  if (!all.length) return "";
  const ranked = all.map((s, i) => ({ s, i, v: score(s, terms) })).sort((a, b) => b.v - a.v || a.i - b.i);
  const picked = new Set<number>();
  let len = 0;
  for (const r of ranked) {
    if (len && (r.v === 0 || len + r.s.length > max)) continue;
    picked.add(r.i);
    len += r.s.length;
    // A list line pulls in its neighbours so a list of steps reads as a list.
    if (/^(•|\d+\.)\s/.test(r.s)) {
      for (const j of [r.i - 1, r.i + 1, r.i + 2]) {
        if (all[j] && /^(•|\d+\.)\s/.test(all[j]) && len + all[j].length <= max) {
          picked.add(j);
          len += all[j].length;
        }
      }
    }
    if (len >= max * 0.8) break;
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

export function notFound(lang: "en" | "ar"): string {
  return lang === "ar"
    ? `ليس عندي جواب موثوق عن هذا بعد. راسل المشرف على واتساب على الرقم ${HELP_CONTACT_DEFAULT} وسيساعدك فريق MESH، وقد نضيف الجواب إلى الموقع.`
    : `I don't have a reliable answer to that yet. Please message Admin on WhatsApp at ${HELP_CONTACT_DEFAULT} and the MESH team will help, and we may add the answer to the site.`;
}

/** A plain answer from the top passages: the best one, plus the second when it adds something. */
export function composeExtractive(question: string, passages: Chunk[], lang: "en" | "ar"): string {
  if (!passages.length) return notFound(lang);
  const [a, b] = passages;
  const first = extract(question, a);
  const terms = keyTerms(question);
  const second = b && b.url.split("#")[0] !== a.url.split("#")[0] && score(b.text, terms) >= Math.max(1, Math.ceil(terms.length / 2)) ? extract(question, b, 300) : "";
  const intro = lang === "ar" ? "هذا ما في MESH (بالإنجليزية):\n\n" : "";
  return `${intro}${first}${second ? `\n\n${second}` : ""}`.trim();
}
