import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { htmlAttrs } from "@/lib/locale";

const APP = path.join(process.cwd(), "src", "app");
const ROUTES = ["", "schedule", "shaykh/[slug]", "lesson/[slug]", "updates", "live"];

describe("bilingual duroos routes", () => {
  it.each(ROUTES)("has both English and Arabic pages for /duroos/%s", (r) => {
    expect(existsSync(path.join(APP, "(site)", "duroos", r, "page.tsx"))).toBe(true);
    expect(existsSync(path.join(APP, "(ar)", "ar", "duroos", r, "page.tsx"))).toBe(true);
  });

  it("renders the Arabic root right-to-left", () => {
    expect(htmlAttrs("ar")).toEqual({ lang: "ar", dir: "rtl" });
    expect(htmlAttrs("en")).toEqual({ lang: "en", dir: "ltr" });
  });
});
