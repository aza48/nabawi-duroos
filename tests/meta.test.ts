import { describe, expect, it } from "vitest";
import { clip, metaDescription, metaTitle } from "@/lib/text";
import { lessonTitle } from "@/features/duroos/routes";

describe("metadata lengths", () => {
  it("keeps short text as it is", () => expect(clip("Short title", 45)).toBe("Short title"));
  it("cuts long titles at a word and keeps the whole title within 60", () => {
    const t = metaTitle("A very long guide title about every single step of arriving in Madinah as a student");
    expect(t.length).toBeLessThanOrEqual(45);
    expect(t.endsWith("…")).toBe(true);
    expect(`${t} | MESH Madinah`.length).toBeLessThanOrEqual(60);
  });
  it("caps descriptions at 160", () => expect(metaDescription("word ".repeat(80)).length).toBeLessThanOrEqual(160));
  it("tells two duroos of the same book apart by prayer", () => {
    const a = lessonTitle("An Explanation of Kitab at-Tawhid of Shaykh Muhammad ibn Abdil Wahhab", "Abdur Razzaq al-Badr", "en", "Fajr");
    const b = lessonTitle("An Explanation of Kitab at-Tawhid of Shaykh Muhammad ibn Abdil Wahhab", "Abdur Razzaq al-Badr", "en", "Maghrib");
    expect(a).not.toBe(b);
    expect(a.length).toBeLessThanOrEqual(45);
  });
});
