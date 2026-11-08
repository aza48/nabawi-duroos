import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS } from "@/lib/redirects";

const EXPECTED: [string, string][] = [
  ["/mesh", "/"],
  ["/mesh/:path*", "/:path*"],
  ["/browse", "/ask"],
  ["/category/:slug", "/ask"],
  ["/question/:id", "/ask"],
  ["/resources", "/guides"],
  ["/resources/:id", "/guides"],
  ["/signup", "/"],
  ["/login", "/"],
  ["/forgot", "/"],
  ["/notifications", "/"],
  ["/profile/:id", "/"],
  ["/guidelines", "/more#rules"],
  ["/about", "/more#about"],
  ["/manage", "/more"],
];

describe("legacy redirects", () => {
  it.each(EXPECTED)("permanently redirects %s to %s", (source, destination) => {
    const r = LEGACY_REDIRECTS.find((x) => x.source === source);
    expect(r).toBeDefined();
    expect(r!.destination).toBe(destination);
    expect(r!.permanent).toBe(true);
  });
  it("never redirects the live duroos or admin paths", () => {
    expect(LEGACY_REDIRECTS.some((r) => r.source.startsWith("/duroos") || r.source.startsWith("/ar"))).toBe(false);
  });
});
