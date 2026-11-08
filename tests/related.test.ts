import { describe, expect, it } from "vitest";
import { related, type RelItem } from "@/lib/related";

const g = (slug: string, title: string, text: string, group: string): RelItem => ({ slug, title, text, group });
const pool = [
  g("bank-account", "Opening a bank account", "Al Rajhi, iqama, Absher, card", "getting-settled"),
  g("absher", "Activating Absher and Nafath", "Absher account, iqama number, Nafath app", "getting-started"),
  g("sim-card", "Getting a SIM card", "Iqama, Absher, phone number", "getting-settled"),
  g("graduation", "Graduation procedures", "Certificate, legalisation, consulate", "leaving"),
];

describe("related", () => {
  it("finds pages that share words and never returns the page itself", () => {
    const r = related(pool[1], pool).map((x) => x.slug);
    expect(r).not.toContain("absher");
    expect(r[0]).toBe("bank-account");
    expect(r).toContain("sim-card");
  });
  it("leaves out pages with nothing in common", () => {
    expect(related(pool[1], pool).map((x) => x.slug)).not.toContain("graduation");
  });
  it("treats university questions as related to study guides", () => {
    const q = g("q", "When are the exams?", "final exams timetable", "university");
    const r = related(q, [g("cal", "University calendar", "final exams and breaks", "study")]);
    expect(r).toHaveLength(1);
  });
});

import { shortName } from "@/features/duroos/ScheduleBrowser";
describe("shortName", () => {
  it("drops whole titles only", () => {
    expect(shortName("Shaykhah Barakah bint Mudayf al-Talhi")).toBe("Barakah al-Talhi");
    expect(shortName("Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli")).toBe("Sulayman al-Ruhayli");
    expect(shortName("Shaykh Ali Battin")).toBe("Ali Battin");
  });
});
