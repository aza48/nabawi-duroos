import { describe, expect, it } from "vitest";
import { createElement, isValidElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as EN from "@/features/guides/company/content";
import * as AR from "@/features/guides/company/content-ar";
import { CompanyGuide, GUIDE_TEXT } from "@/features/guides/company/CompanyGuide";
import { ISLAND_TEXT } from "@/features/guides/company/islands";
import { companyContent } from "@/features/guides/company/locale";
import { sar } from "@/features/guides/company/ui";

/** Keys whose values are identifiers, not reader-facing text: they must be the same in both languages. */
const ID_KEYS = new Set(["id", "slug"]);

type Diff = string[];

/** Walks both values together and lists every place where the Arabic shape, an id or a number differs. */
function compare(en: unknown, ar: unknown, path: string, out: Diff, key = ""): void {
  if (Array.isArray(en)) {
    if (!Array.isArray(ar)) return void out.push(`${path}: not an array`);
    if (en.length !== ar.length) out.push(`${path}: length ${ar.length}, expected ${en.length}`);
    en.forEach((v, i) => compare(v, ar[i], `${path}[${i}]`, out, key));
    return;
  }
  if (en instanceof Date) {
    if (!(ar instanceof Date) || ar.getTime() !== en.getTime()) out.push(`${path}: date differs`);
    return;
  }
  if (en !== null && typeof en === "object") {
    if (ar === null || typeof ar !== "object") return void out.push(`${path}: not an object`);
    const ek = Object.keys(en).sort();
    const ak = Object.keys(ar).sort();
    if (ek.join() !== ak.join()) out.push(`${path}: keys ${ak.join(",")}, expected ${ek.join(",")}`);
    for (const k of ek) compare((en as Record<string, unknown>)[k], (ar as Record<string, unknown>)[k], `${path}.${k}`, out, k);
    return;
  }
  if (typeof en === "string") {
    if (typeof ar !== "string") out.push(`${path}: not a string`);
    else if (ID_KEYS.has(key) && ar !== en) out.push(`${path}: "${ar}", expected "${en}"`);
    return;
  }
  // Numbers, booleans and null must match exactly.
  if (ar !== en) out.push(`${path}: ${String(ar)}, expected ${String(en)}`);
}

/** Every reader-facing string in a value, with its path. Functions are called with sample numbers; JSX is rendered. */
function strings(v: unknown, path: string, out: [string, string][], key = ""): [string, string][] {
  if (typeof v === "string") {
    if (!ID_KEYS.has(key) && key !== "href") out.push([path, v]);
  } else if (typeof v === "function") {
    strings((v as (...a: number[]) => unknown)(3, 12), `${path}()`, out, key);
  } else if (isValidElement(v)) {
    out.push([path, renderToStaticMarkup(v as ReactElement).replace(/<[^>]+>/g, "")]);
  } else if (Array.isArray(v)) {
    v.forEach((x, i) => strings(x, `${path}[${i}]`, out, key));
  } else if (v !== null && typeof v === "object" && !(v instanceof Date)) {
    for (const [k, x] of Object.entries(v)) strings(x, `${path}.${k}`, out, k);
  }
  return out;
}

/** Characters from code points, so this file holds no dash or vowel mark itself. */
const ch = (...cps: number[]) => String.fromCodePoint(...cps);
/** Figure dash, en dash, em dash, horizontal bar, two and three em dashes, small and fullwidth dashes. */
const DASH = new RegExp(`[${ch(0x2012)}-${ch(0x2015)}${ch(0x2e3a, 0x2e3b, 0xfe58, 0xfe63, 0xff0d)}]`);
/** Arabic short vowels and other marks, and anything that is not an Arabic letter. */
const MARKS = new RegExp(`[${ch(0x064b)}-${ch(0x065f)}${ch(0x0670)}]`, "g");
const NOT_LETTER = new RegExp(`[^${ch(0x0621)}-${ch(0x064a)}]+`);
/** Words that show doubt. Matched as whole words (with a joined و or ف), after removing short vowels. */
const DOUBT = new Set(["قد", "وقد", "ربما", "وربما", "فربما", "يقال", "ويقال", "فيقال"]);
const doubtWords = (s: string) =>
  s.replace(MARKS, "").split(NOT_LETTER).filter((w) => DOUBT.has(w));

function textProblems(entries: [string, string][]): string[] {
  const bad: string[] = [];
  for (const [path, s] of entries) {
    if (DASH.test(s)) bad.push(`${path}: long dash in "${s}"`);
    const d = doubtWords(s);
    if (d.length) bad.push(`${path}: doubt word ${d.join(", ")} in "${s}"`);
  }
  return bad;
}

describe("company guide in Arabic: content-ar.ts", () => {
  it("exports the same keys as content.ts", () => {
    expect(Object.keys(AR).sort()).toEqual(Object.keys(EN).sort());
  });

  it("has the same shape, array lengths, ids and numbers", () => {
    const out: Diff = [];
    for (const k of Object.keys(EN)) compare((EN as Record<string, unknown>)[k], (AR as Record<string, unknown>)[k], k, out, k);
    expect(out).toEqual([]);
  });

  it("is the content the Arabic page reads", () => {
    expect(companyContent("ar").PLAN).toBe(AR.PLAN);
    expect(companyContent("en").PLAN).toBe(EN.PLAN);
  });

  it("has no long dash and no doubt word in any Arabic string", () => {
    const { SEARCH_TEXT: _search, ...rest } = AR;
    expect(textProblems(strings(rest, "content-ar", []))).toEqual([]);
  });
});

describe("company guide in Arabic: fixed strings", () => {
  it("has an Arabic twin for every English string", () => {
    expect(Object.keys(GUIDE_TEXT.ar).sort()).toEqual(Object.keys(GUIDE_TEXT.en).sort());
    expect(Object.keys(GUIDE_TEXT.ar.head).sort()).toEqual(Object.keys(GUIDE_TEXT.en.head).sort());
    expect(GUIDE_TEXT.ar.sections.map(([id]) => id)).toEqual(GUIDE_TEXT.en.sections.map(([id]) => id));
    expect(Object.keys(ISLAND_TEXT.ar).sort()).toEqual(Object.keys(ISLAND_TEXT.en).sort());
    expect(ISLAND_TEXT.ar.what.map(([k]) => k)).toEqual(ISLAND_TEXT.en.what.map(([k]) => k));
  });

  it("has no long dash and no doubt word", () => {
    expect(textProblems([...strings(GUIDE_TEXT.ar, "GUIDE_TEXT.ar", []), ...strings(ISLAND_TEXT.ar, "ISLAND_TEXT.ar", [])])).toEqual([]);
  });

  it("writes amounts in Arabic-Indic digits with riyal on Arabic", () => {
    expect(sar(1500, "ar")).toBe("١٬٥٠٠ ريال");
    expect(sar(1500)).toBe("1,500 SAR");
  });

  it("renders the Arabic guide with Arabic labels and amounts, and leaves the English one in English", () => {
    const ar = renderToStaticMarkup(createElement(CompanyGuide, { locale: "ar" }));
    const en = renderToStaticMarkup(createElement(CompanyGuide));
    expect(ar).toContain("في هذه الصفحة");
    expect(ar).toContain("ريال");
    expect(ar).not.toMatch(/\d SAR/);
    expect(ar).not.toContain("On this page");
    expect(en).toContain("On this page");
    expect(en).toMatch(/\d SAR/);
    expect(en).not.toContain("ريال");
    expect(en).not.toContain("في هذه الصفحة");
  });
});
