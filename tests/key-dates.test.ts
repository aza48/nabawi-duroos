import { describe, expect, it } from "vitest";
import { KEY_DATES, keyDatesState } from "@/content/key-dates";

const at = (iso: string) => new Date(`${iso}T09:00:00+03:00`);

describe("keyDatesState", () => {
  it("leads with the next University date, with Islamic dates as side counters", () => {
    const s = keyDatesState(at("2026-11-07"), KEY_DATES);
    expect(s.current).toBeNull();
    expect(s.next?.id).toBe("finals-1");
    expect(s.following.map((e) => e.id)).toEqual(["break-1", "sem-2", "winter"]);
    expect(s.islamic[0].id).toBe("ramadan");
    expect(s.islamic.every((e) => e.kind === "islamic")).toBe(true);
  });
  it("during finals: the exams are current, and the break is next", () => {
    const s = keyDatesState(at("2026-12-01"), KEY_DATES);
    expect(s.current?.id).toBe("finals-1");
    expect(s.next?.id).toBe("break-1");
  });
  it("during the Eid holiday: shows it as current, with classes resuming after it", () => {
    const s = keyDatesState(at("2027-03-01"), KEY_DATES);
    expect(s.current?.id).toBe("eid-fitr-holiday");
    expect(s.current?.after).toMatch(/Classes resume/);
  });
  it("keeps University dates out of the Islamic counters and vice versa", () => {
    const s = keyDatesState(at("2026-11-07"), KEY_DATES);
    expect([s.next, ...s.following].some((e) => e?.kind === "islamic")).toBe(false);
  });
});
