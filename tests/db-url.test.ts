import { describe, expect, it } from "vitest";
import { driverFor, sessionUrl, usesLiveDb } from "@/server/db/url";

const SUPA = "postgresql://postgres.abcdefghij:pw@aws-0-eu-central-1.pooler.supabase.com:6543/postgres";

describe("database url", () => {
  it("uses the Neon HTTP driver only for Neon hosts", () => {
    expect(driverFor("postgresql://u:p@ep-cool-1.eu-central-1.aws.neon.tech/neondb?sslmode=require")).toBe("neon");
    expect(driverFor(SUPA)).toBe("postgres");
    expect(driverFor("postgres://u:p@localhost:5432/mesh")).toBe("postgres");
  });
  it("turns the Supabase transaction pooler into the session pooler for migrations", () => {
    expect(sessionUrl(SUPA)).toBe(SUPA.replace(":6543/", ":5432/"));
    expect(sessionUrl("postgres://u:p@localhost:5432/mesh")).toBe("postgres://u:p@localhost:5432/mesh");
  });
  it("knows when pages read the live database (so detail pages are built on first visit, not at build time)", () => {
    expect(usesLiveDb({ DATABASE_URL: SUPA, VERCEL_ENV: "production" })).toBe(true);
    expect(usesLiveDb({ DATABASE_URL: SUPA, VERCEL_ENV: "preview" })).toBe(false);
    expect(usesLiveDb({})).toBe(false);
  });
});
