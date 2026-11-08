import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { otherLanguagePath } from "@/components/shell/LanguageSwitch";
import { hasArabicTwin, localizeUrl } from "@/lib/locale";

describe("otherLanguagePath", () => {
  it("swaps each page for its counterpart in the other language", () => {
    expect(otherLanguagePath("/")).toBe("/ar");
    expect(otherLanguagePath("/ar")).toBe("/");
    expect(otherLanguagePath("/duroos/schedule")).toBe("/ar/duroos/schedule");
    expect(otherLanguagePath("/ar/duroos/lesson/ruh-dalil")).toBe("/duroos/lesson/ruh-dalil");
    expect(otherLanguagePath("/guides/cost-of-living")).toBe("/ar/guides/cost-of-living");
    expect(otherLanguagePath("/programs")).toBe("/ar/programs");
    expect(otherLanguagePath("/ar/programs/tayba")).toBe("/programs/tayba");
    expect(otherLanguagePath("/ask/iqama")).toBe("/ar/ask/iqama");
    expect(otherLanguagePath("/library")).toBe("/ar/library");
    expect(otherLanguagePath("/discounts")).toBe("/ar/discounts");
    expect(otherLanguagePath("/more")).toBe("/ar/more");
    expect(otherLanguagePath("/ar/more")).toBe("/more");
  });

  it("has Arabic twins for the library, the Ma'had hub and search", () => {
    expect(otherLanguagePath("/library/sharia")).toBe("/ar/library/sharia");
    expect(otherLanguagePath("/library/read/abc")).toBe("/ar/library/read/abc");
    expect(otherLanguagePath("/library/search")).toBe("/ar/library/search");
    expect(otherLanguagePath("/mahad")).toBe("/ar/mahad");
    expect(otherLanguagePath("/search")).toBe("/ar/search");
    expect(otherLanguagePath("/guides/start-a-company-in-saudi")).toBe("/ar/guides/start-a-company-in-saudi");
  });

  it("sends anything else to the Arabic home page", () => {
    expect(otherLanguagePath("/no-such-page")).toBe("/ar");
    expect(otherLanguagePath("/archive")).toBe("/ar");
  });
});

/** Every public English page route, as a sample URL ("[slug]" becomes "x"), with whether it is a catch-all. */
function routes(dir: string, base = ""): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    if (!statSync(p).isDirectory()) return name === "page.tsx" ? [base || "/"] : [];
    if (name.startsWith("[...")) return [];
    const seg = name.startsWith("[") ? "x" : name;
    return routes(p, `${base}/${seg}`);
  });
}

const APP = path.join(process.cwd(), "src", "app");
const twinFile = (route: string) => {
  // Map the sample URL back onto the Arabic tree, where dynamic folders keep their bracket names.
  let dir = path.join(APP, "(ar)", "ar");
  for (const seg of route.split("/").filter(Boolean)) {
    const exact = path.join(dir, seg);
    if (existsSync(exact)) dir = exact;
    else {
      const dyn = readdirSync(dir).find((n) => n.startsWith("[") && !n.startsWith("[..."));
      if (!dyn) return null;
      dir = path.join(dir, dyn);
    }
  }
  const page = path.join(dir, "page.tsx");
  return existsSync(page) ? page : null;
};

describe("Arabic twins", () => {
  const english = routes(path.join(APP, "(site)"));

  it("finds the English routes", () => {
    expect(english).toContain("/");
    expect(english).toContain("/mahad");
    expect(english).toContain("/library/read/x");
  });

  it.each(english)("%s has an Arabic page, and both the switch and localizeUrl lead to it", (route) => {
    expect(twinFile(route)).not.toBeNull();
    expect(hasArabicTwin(route)).toBe(true);
    const ar = route === "/" ? "/ar" : `/ar${route}`;
    expect(localizeUrl(route, "ar")).toBe(ar);
    expect(otherLanguagePath(route)).toBe(ar);
    expect(otherLanguagePath(ar)).toBe(route);
  });

  it("Arabic pages that redirect home do so to an Arabic page", () => {
    const home = readFileSync(path.join(APP, "(ar)", "ar", "page.tsx"), "utf8");
    expect(home).toMatch(/redirect\("\/ar\//i);
  });
});
