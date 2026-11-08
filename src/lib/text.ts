import type { Locale } from "./locale";

const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);
const EM_ASIDE = new RegExp(`\\s*${EM}\\s*`, "g");
const EN_RANGE = new RegExp(`(\\d)\\s*${EN}\\s*(\\d)`, "g");
const EN_ASIDE = new RegExp(`\\s*${EN}\\s*`, "g");

/** House style: no em dashes. Asides become commas; English ranges read "to". */
export function cleanText<T extends string | null | undefined>(s: T, locale: Locale): T {
  if (typeof s !== "string") return s;
  const comma = locale === "ar" ? "، " : ", ";
  return s
    .replace(EM_ASIDE, comma)
    .replace(EN_RANGE, locale === "ar" ? "$1 إلى $2" : "$1 to $2")
    .replace(EN_ASIDE, comma)
    .replace(/،\s*،/g, "،")
    .replace(/,\s*,/g, ",") as T;
}

/** Research wording that must never reach visitors (it stays in the admin area). */
const BACKSTAGE = /source|stated|instance|inferred|channel|\bposts?\b|poster|unclear|not clear|reported|المصدر|المصادر|مذكور|القناة|المنشور|أُعلن عن درس/i;

/** A label or note from the data, or null when it carries research wording. */
export const publicLabel = (x: string | null | undefined) => (x && !BACKSTAGE.test(x) ? x : null);

/** Cleans every string field of a row; keys ending in "Ar" are treated as Arabic. */
export function cleanRow<R extends Record<string, unknown>>(row: R): R {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    const locale: Locale = /Ar$/.test(k) ? "ar" : "en";
    if (typeof v === "string" && !/(url|Url|slug|photo|Handle|id|Id|kind|type|status|topic|prayer|origin)$/.test(k)) {
      out[k] = cleanText(v, locale);
    } else if (Array.isArray(v) && v.every((x) => x && typeof x === "object" && "en" in x && "ar" in x)) {
      out[k] = (v as { en: string; ar: string }[]).map((x) => ({ en: cleanText(x.en, "en"), ar: cleanText(x.ar, "ar") }));
    } else {
      out[k] = v;
    }
  }
  return out as R;
}

/** Trim to at most `max` characters at a word boundary, ending with an ellipsis. */
export function clip(s: string, max: number): string {
  const v = s.replace(/\s+/g, " ").trim();
  if (v.length <= max) return v;
  const cut = v.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return `${(at > max / 2 ? cut.slice(0, at) : cut).replace(/[,،:;.\s]+$/, "")}…`;
}

/** Page titles: the site layout adds " | MESH Madinah" (15 characters), so 45 keeps the whole title within 60. */
export const metaTitle = (s: string) => clip(s, 45);
/** Meta descriptions: 160 characters at most. */
export const metaDescription = (s: string) => clip(s, 160);
