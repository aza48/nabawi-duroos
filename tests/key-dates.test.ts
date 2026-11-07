import { describe, expect, it } from "vitest";
import { KEY_DATES, keyDatesState } from "@/content/key-dates";

const at = (iso: string) => new Date(`${iso}T09:00:00+03:00`);

describe("keyDatesState", () => {
  it("before exams: nothing current, finals next, Ramadan featured", () => {
    const s = keyDatesState(at("2026-11-07"), KEY_DATES);
    expect(s.current).toBeNull();
    expect(s.upcoming[0].id).toBe("finals-1");
    expect(s.featured?.id).toBe("ramadan");
  });
  it("during finals: the exams are current and the break comes next", () => {
    const s = keyDatesState(at("2026-12-01"), KEY_DATES);
    expect(s.current?.id).toBe("finals-1");
    expect(s.upcoming.map((e) => e.id)).toContain("break-1");
  });
  it("during the Eid holiday: shows it as current, with classes resuming after it", () => {
    const s = keyDatesState(at("2027-03-01"), KEY_DATES);
    expect(s.current?.id).toBe("eid-fitr-holiday");
    expect(s.current?.after).toMatch(/Classes resume/);
  });
  it("never lists the featured date twice", () => {
    const s = keyDatesState(at("2026-11-07"), KEY_DATES);
    expect(s.upcoming.some((e) => e.id === s.featured?.id)).toBe(false);
  });
});
