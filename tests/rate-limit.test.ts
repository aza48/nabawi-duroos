import { beforeEach, describe, expect, it } from "vitest";
import { allow, clientIp, resetRateLimits } from "@/server/rate-limit";

describe("rate limit", () => {
  beforeEach(() => resetRateLimits());

  it("lets `max` requests through in a window and refuses the next", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(allow("a", 3, 60_000, t + i)).toBe(true);
    expect(allow("a", 3, 60_000, t + 10)).toBe(false);
    expect(allow("b", 3, 60_000, t + 10)).toBe(true);
  });

  it("lets the caller back in once the window has slid past", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) allow("a", 3, 60_000, t + i);
    expect(allow("a", 3, 60_000, t + 59_000)).toBe(false);
    expect(allow("a", 3, 60_000, t + 60_001)).toBe(true);
  });

  it("a short-window caller does not wipe a long-window limit", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(allow("ask:a", 3, 3_600_000, t + i)).toBe(true);
    // A tracking call two minutes later triggers the sweep with its one-minute window.
    expect(allow("track:b", 120, 60_000, t + 120_000)).toBe(true);
    expect(allow("ask:a", 3, 3_600_000, t + 121_000)).toBe(false);
  });

  it("reads the first forwarded address, then x-real-ip, else unknown", () => {
    expect(clientIp(new Request("https://x", { headers: { "x-forwarded-for": "203.0.113.5, 10.0.0.1" } }))).toBe("203.0.113.5");
    expect(clientIp(new Request("https://x", { headers: { "x-real-ip": "198.51.100.7" } }))).toBe("198.51.100.7");
    expect(clientIp(new Request("https://x"))).toBe("unknown");
  });
});
