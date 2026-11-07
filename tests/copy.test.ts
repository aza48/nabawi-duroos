import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { cleanText } from "@/lib/text";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) return p.includes(`${path.sep}legacy`) ? [] : files(p);
    return /\.(tsx?|css)$/.test(p) ? [p] : [];
  });
}

/** String literals and JSX text only: comments are not shown to anyone. */
function visibleText(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
}

describe("site copy", () => {
  it("has no em dashes anywhere a visitor could see", () => {
    const offenders = files(path.join(process.cwd(), "src")).filter((f) => /—/.test(visibleText(readFileSync(f, "utf8"))));
    expect(offenders).toEqual([]);
  });
});

describe("cleanText", () => {
  it("turns English em-dash asides into commas", () => {
    expect(cleanText("Circle 2 / First Saudi Expansion — between Bab Umar and Bab Uthman", "en")).toBe(
      "Circle 2 / First Saudi Expansion, between Bab Umar and Bab Uthman"
    );
  });
  it("uses the Arabic comma in Arabic", () => {
    expect(cleanText("التوسعة السعودية الأولى — بين الحصوتين", "ar")).toBe("التوسعة السعودية الأولى، بين الحصوتين");
  });
  it("writes English ranges with 'to'", () => {
    expect(cleanText("During the period 1/4/1448 – 30/6/1448 AH", "en")).toBe("During the period 1/4/1448 to 30/6/1448 AH");
  });
  it("leaves null alone", () => {
    expect(cleanText(null, "en")).toBeNull();
  });
});
