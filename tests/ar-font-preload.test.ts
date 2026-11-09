import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { AR_FONT_PRELOADS } from "@/app/(ar)/ar/arabic-fonts";

const NEXT = path.join(process.cwd(), ".next");
const built = existsSync(path.join(NEXT, "static", "media"));

/** Every @font-face in the built CSS: family, weight, file, and whether it covers the Arabic block. */
function faces() {
  const dir = path.join(NEXT, "static", "chunks");
  const css = readdirSync(dir, { recursive: true })
    .map(String)
    .filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(path.join(dir, f), "utf8"))
    .join("\n");
  return [...css.matchAll(/@font-face\{([^}]*)\}/g)].map(([, b]) => ({
    family: /font-family:([^;]+)/.exec(b)?.[1] ?? "",
    weight: /font-weight:([^;]+)/.exec(b)?.[1] ?? "",
    file: /url\(\.\.\/media\/([^)]+)\)/.exec(b)?.[1] ?? "",
    arabic: /unicode-range:U\+6\?\?/.test(b),
  }));
}

describe("Arabic font preload (D7)", () => {
  it("names two same-origin woff2 files", () => {
    expect(AR_FONT_PRELOADS).toHaveLength(2);
    for (const href of AR_FONT_PRELOADS) expect(href).toMatch(/^\/_next\/static\/media\/[\w.-]+\.woff2$/);
  });

  it.skipIf(!built)("matches the files of the current build", () => {
    const f = faces();
    const amiri = f.find((x) => /Amiri/.test(x.family) && x.weight === "700" && x.arabic)?.file;
    const alexandria = f.find((x) => /Alexandria/.test(x.family) && x.arabic)?.file;
    expect(AR_FONT_PRELOADS).toEqual([`/_next/static/media/${amiri}`, `/_next/static/media/${alexandria}`]);
  });
});
