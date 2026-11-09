import { describe, expect, it } from "vitest";
import { shaykhSlug } from "@/server/seed/import-legacy";
import { LESSONS } from "@/server/seed/legacy/lessons";

describe("shaykhSlug", () => {
  it("strips titles in any order", () => {
    expect(shaykhSlug("Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli")).toBe("sulayman-ibn-saleemullah-al-ruhayli");
    expect(shaykhSlug("Shaykh Dr. Ali ibn Abdurrahman al-Hudhayfi")).toBe("ali-ibn-abdurrahman-al-hudhayfi");
    expect(shaykhSlug("Dr. Salih ibn Sa'd al-Suhaymi")).toBe("salih-ibn-sad-al-suhaymi");
  });
  it("keeps Shaykhah as part of a sister's name", () => {
    expect(shaykhSlug("Shaykhah Barakah")).toMatch(/^shaykhah-/);
  });
  it("never starts a seeded shaykh's slug with a title", () => {
    for (const l of LESSONS) expect(shaykhSlug(l.shaykh.en)).not.toMatch(/^(prof|dr|shaykh)-/);
  });
});
