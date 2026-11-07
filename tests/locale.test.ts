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
