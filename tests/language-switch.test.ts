import { describe, expect, it } from "vitest";
import { otherLanguagePath } from "@/components/shell/LanguageSwitch";

describe("otherLanguagePath", () => {
  it("swaps between English and Arabic pages, and sends untranslated pages to the Arabic home", () => {
    expect(otherLanguagePath("/")).toBe("/ar");
    expect(otherLanguagePath("/ar")).toBe("/");
    expect(otherLanguagePath("/duroos/schedule")).toBe("/ar/duroos/schedule");
    expect(otherLanguagePath("/ar/duroos/lesson/ruh-dalil")).toBe("/duroos/lesson/ruh-dalil");
    expect(otherLanguagePath("/guides/cost-of-living")).toBe("/ar");
  });
});
