import { describe, expect, it } from "vitest";
import { dir } from "@/lib/locale";
import { STRINGS, t } from "@/features/duroos/strings";

describe("locale", () => {
  it("is right-to-left for Arabic only", () => {
    expect(dir("ar")).toBe("rtl");
    expect(dir("en")).toBe("ltr");
  });
  it("translates duroos UI strings", () => {
    expect(t("ar", "today")).toBe("اليوم");
    expect(t("en", "today")).toBe("Today");
  });
  it("has an Arabic string for every English key", () => {
    const missing = Object.keys(STRINGS.en).filter((k) => !(k in STRINGS.ar));
    expect(missing).toEqual([]);
  });
  it("uses the owner's iqamah note wording", () => {
    expect(t("en", "afterIqamah")).toBe("Starts right after the iqamah");
  });
});

describe("localizeUrl", () => {
  it("sends Arabic readers to Arabic twins and leaves English-only pages alone", async () => {
    const { localizeUrl } = await import("@/lib/locale");
    expect(localizeUrl("/guides/iqama", "ar")).toBe("/ar/guides/iqama");
    expect(localizeUrl("/duroos/lesson/x", "ar")).toBe("/ar/duroos/lesson/x");
    expect(localizeUrl("/more#alerts", "ar")).toBe("/ar/more#alerts");
    expect(localizeUrl("/library", "ar")).toBe("/ar/library");
    expect(localizeUrl("/library/sharia", "ar")).toBe("/library/sharia");
    expect(localizeUrl("/mahad", "ar")).toBe("/mahad");
    expect(localizeUrl("/", "ar")).toBe("/ar");
    expect(localizeUrl("https://example.com", "ar")).toBe("https://example.com");
    expect(localizeUrl("/guides/iqama", "en")).toBe("/guides/iqama");
  });
});
