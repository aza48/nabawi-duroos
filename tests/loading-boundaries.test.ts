import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const APP = path.join(process.cwd(), "src", "app");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("loading boundaries keep real 404s (C5)", () => {
  // Next streams a 200 as soon as a loading.tsx fallback renders; a notFound() after that is only a noindex page.
  it("never puts a loading.tsx above a page that can call notFound()", () => {
    const files = walk(APP);
    const offenders = files
      .filter((f) => path.basename(f) === "loading.tsx")
      .flatMap((loading) => {
        const dir = path.dirname(loading);
        return files
          .filter((f) => f.startsWith(dir + path.sep) && /page\.tsx$/.test(f) && /notFound\(/.test(readFileSync(f, "utf8")))
          .map((page) => `${path.relative(APP, loading)} wraps ${path.relative(APP, page)}`);
      });
    expect(offenders).toEqual([]);
  });

  it("has an error boundary with Try again in each main section, in both languages", () => {
    for (const root of ["(site)", path.join("(ar)", "ar")])
      for (const s of ["duroos", "guides", "ask", "library"]) {
        const src = readFileSync(path.join(APP, root, s, "error.tsx"), "utf8");
        expect(src).toMatch(/^"use client";/);
        expect(src).toMatch(/retry/);
      }
  });
});
