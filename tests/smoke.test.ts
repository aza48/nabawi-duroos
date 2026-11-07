import { describe, expect, it } from "vitest";

describe("legacy data", () => {
  it("exposes the 45 verified lessons through the @ alias", async () => {
    const mod = await import("@/server/seed/legacy/lessons");
    expect(mod.LESSONS).toHaveLength(45);
  });
});
