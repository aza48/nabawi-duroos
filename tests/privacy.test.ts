import { describe, expect, it } from "vitest";
import { gpcHeader, OPT_OUT_KEY, RETENTION_DAYS, trackingAllowed, VISITOR_KEYS } from "@/lib/privacy";
import { LEGACY_REDIRECTS } from "@/lib/redirects";

describe("privacy signals", () => {
  it("counts an ordinary browser", () => {
    expect(trackingAllowed({})).toBe(true);
    expect(trackingAllowed({ gpc: undefined, webdriver: false, optOut: null })).toBe(true);
  });
  it("stops for Global Privacy Control, automation and the opt-out flag", () => {
    expect(trackingAllowed({ gpc: true })).toBe(false);
    expect(trackingAllowed({ gpc: "1" })).toBe(false);
    expect(trackingAllowed({ webdriver: true })).toBe(false);
    expect(trackingAllowed({ optOut: "1" })).toBe(false);
  });
  it("reads the Sec-GPC request header", () => {
    expect(gpcHeader(new Headers({ "sec-gpc": "1" }))).toBe(true);
    expect(gpcHeader(new Headers({ "sec-gpc": "0" }))).toBe(false);
    expect(gpcHeader(new Headers())).toBe(false);
  });
  it("names the keys the tracker uses and the public retention", () => {
    expect(OPT_OUT_KEY).toBe("mesh_notrack");
    expect(VISITOR_KEYS).toEqual(["mesh_vid", "mesh_sid"]);
    expect(RETENTION_DAYS).toBe(180);
  });
  it("serves /privacy as a page, not a redirect", () => {
    expect(LEGACY_REDIRECTS.some((r) => r.source === "/privacy")).toBe(false);
  });
});
