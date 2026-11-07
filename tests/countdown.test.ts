import { describe, expect, it } from "vitest";
import { formatUntil } from "@/features/duroos/Countdown";

describe("formatUntil", () => {
  it("shows hours and minutes in English", () => {
    expect(formatUntil((2 * 60 + 10) * 60_000, "en")).toBe("in 2h 10m");
  });
  it("shows minutes only under an hour, never zero", () => {
    expect(formatUntil(20_000, "en")).toBe("in 1m");
  });
  it("uses Arabic digits in Arabic", () => {
    expect(formatUntil(45 * 60_000, "ar")).toBe("بعد ٤٥ د");
  });
});
