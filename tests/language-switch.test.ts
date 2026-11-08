import { describe, expect, it } from "vitest";
import { otherLanguagePath } from "@/components/shell/LanguageSwitch";

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

  it("sends pages without an Arabic version to the nearest Arabic section", () => {
    expect(otherLanguagePath("/library/sharia")).toBe("/ar/library");
    expect(otherLanguagePath("/mahad")).toBe("/ar/guides");
    expect(otherLanguagePath("/search")).toBe("/ar");
  });
});
