import { describe, expect, it } from "vitest";
import { PROGRAMS } from "@/content/programs";
import { PROGRAMS_AR } from "@/content/programs-ar";
import { DISCOUNTS } from "@/content/discounts";
import { DEALS_AR } from "@/content/discounts-ar";
import { localProgram } from "@/features/programs/program-text";

const strings = (x: unknown): string[] => (typeof x === "string" ? [x] : Array.isArray(x) ? x.flatMap(strings) : x && typeof x === "object" ? Object.values(x).flatMap(strings) : []);
const ARABIC = /[؀-ۿ]/;

describe("Arabic programmes and discounts", () => {
  it("translates every programme, line for line", () => {
    for (const p of PROGRAMS) {
      const a = PROGRAMS_AR[p.slug];
      expect(a, p.slug).toBeTruthy();
      for (const k of ["overview", "levels", "included", "steps"] as const) expect(a[k]?.length ?? 0, `${p.slug} ${k}`).toBe(p[k]?.length ?? 0);
      expect(a.contactLabels?.length ?? 0, `${p.slug} contact`).toBe(p.contact?.length ?? 0);
      expect(a.videoTitles?.length ?? 0, `${p.slug} videos`).toBe(p.videos?.length ?? 0);
      expect(Boolean(a.nextIntake), `${p.slug} nextIntake`).toBe(Boolean(p.nextIntake));
      expect(localProgram(p, "ar").inArabic).toBe(true);
    }
    expect(Object.keys(PROGRAMS_AR).sort()).toEqual(PROGRAMS.map((p) => p.slug).sort());
  });

  it("translates every offer", () => {
    for (const o of DISCOUNTS.flatMap((g) => g.offers)) expect(DEALS_AR[o.deal], o.deal).toMatch(ARABIC);
  });

  it("follows the house rules in Arabic", () => {
    for (const s of [...strings(PROGRAMS_AR), ...Object.values(DEALS_AR)]) {
      expect(s, s).not.toMatch(/[—–]/);
      expect(s, s).not.toMatch(/(^|[\s«(])(قد|ربما|يُقال|يقال|يبدو)\s/);
    }
  });

  it("keeps English pages English and falls back per programme", () => {
    const p = PROGRAMS[0];
    expect(localProgram(p, "en")).toEqual({ ...p, inArabic: false });
    expect(localProgram(p, "ar", {}).tagline).toBe(p.tagline);
    expect(localProgram(p, "ar", {}).inArabic).toBe(false);
    // A translation whose list no longer matches the English keeps the English list.
    const stale = { ...PROGRAMS_AR[p.slug], overview: ["سطر واحد"] };
    expect(localProgram(p, "ar", { [p.slug]: stale }).overview).toEqual(p.overview);
  });
});
