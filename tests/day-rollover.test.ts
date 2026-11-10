import { describe, expect, it } from "vitest";
import { shouldRefresh } from "@/features/home/DayRollover";

// A saved home or duroos page opened offline on a later day used to reload itself forever:
// refresh fails offline, Next falls back to a full reload, and the offline worker serves the same copy.
describe("DayRollover only refreshes when it can succeed, once per day", () => {
  it("refreshes a page from yesterday when online", () => {
    expect(shouldRefresh("2026-11-09", "2026-11-10", true, false)).toBe(true);
  });

  it("never refreshes offline (no reload loop)", () => {
    expect(shouldRefresh("2026-11-09", "2026-11-10", false, false)).toBe(false);
  });

  it("tries once per page and day, so a weak signal cannot loop", () => {
    expect(shouldRefresh("2026-11-09", "2026-11-10", true, true)).toBe(false);
  });

  it("leaves today's page alone", () => {
    expect(shouldRefresh("2026-11-10", "2026-11-10", true, false)).toBe(false);
  });
});
