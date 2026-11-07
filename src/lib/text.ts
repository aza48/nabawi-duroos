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
