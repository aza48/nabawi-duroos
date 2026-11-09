import { beforeAll, describe, expect, it, vi } from "vitest";
import { resetTestDb, type Db } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";

let db: Db;
vi.mock("@/server/db/client", async (orig) => {
  const real = await orig<typeof import("@/server/db/client")>();
  return { ...real, getDb: async () => db };
});

const get = async (handler: (req: Request, ctx: never) => Promise<Response>, url: string, params?: Record<string, string>) =>
  handler(new Request(url), { params: Promise.resolve(params ?? {}) } as never);

describe("/api/v1 for a native app", () => {
  beforeAll(async () => {
    db = await resetTestDb();
    await importLegacy(db);
  });

  it("answers in one envelope: data, error, generatedAt, version", async () => {
    const { GET } = await import("@/app/api/v1/duroos/shaykhs/route");
    const body = await (await get(GET as never, "https://medinahub.org/api/v1/duroos/shaykhs")).json();
    expect(body).toMatchObject({ error: null, version: 1 });
    expect(typeof body.generatedAt).toBe("string");
    expect(body.data.length).toBeGreaterThan(20);
    expect(body.data[0]).toHaveProperty("slug");
    expect(body.data[0]).not.toHaveProperty("id");
  });

  it("uses the same envelope for errors, calendar feeds included", async () => {
    const { GET } = await import("@/app/api/v1/duroos/lessons/[slug]/route");
    const res = await get(GET as never, "https://medinahub.org/api/v1/duroos/lessons/nope", { slug: "nope" });
    expect(res.status).toBe(404);
    expect(await res.json()).toMatchObject({ data: null, error: "not_found", version: 1 });
    const cal = await import("@/app/api/v1/calendar/[feed]/route");
    const bad = await get(cal.GET as never, "https://medinahub.org/api/v1/calendar/nope.ics", { feed: "nope.ics" });
    expect(bad.status).toBe(404);
    expect((await bad.json()).error).toBe("not_found");
  });

  it("gives today, or any day within 60 days, with Hijri numbers and an explicit timeKnown", async () => {
    const { GET } = await import("@/app/api/v1/duroos/today/route");
    const body = await (await get(GET as never, "https://medinahub.org/api/v1/duroos/today?date=2026-11-12")).json();
    expect(body.data.date).toBe("2026-11-12");
    expect(body.data.weekday).toBe(4);
    expect(body.data.hijri).toMatchObject({ day: 2, month: 6, year: 1448 });
    const dalil = body.data.lessons.find((l: { slug: string }) => l.slug === "ruh-dalil");
    expect(dalil).toMatchObject({ timeKnown: true });
    expect(typeof dalil.adhanAt).toBe("string");
    const far = await get(GET as never, "https://medinahub.org/api/v1/duroos/today?date=2030-01-01");
    expect(far.status).toBe(400);
    expect((await far.json()).error).toBe("bad_request");
    expect((await get(GET as never, "https://medinahub.org/api/v1/duroos/today?date=12-11-2026")).status).toBe(400);
    expect((await get(GET as never, "https://medinahub.org/api/v1/duroos/today?date=2026-11-31")).status).toBe(400);
  });

  it("lists lessons with filters, and masjids and streams", async () => {
    const lessons = await import("@/app/api/v1/duroos/lessons/route");
    const all = (await (await get(lessons.GET as never, "https://medinahub.org/api/v1/duroos/lessons")).json()).data;
    expect(all.length).toBeGreaterThan(40);
    const quba = (await (await get(lessons.GET as never, "https://medinahub.org/api/v1/duroos/lessons?masjid=quba&prayer=maghrib")).json()).data;
    expect(quba.length).toBeGreaterThan(0);
    expect(quba.every((l: { masjid: { id: string }; prayer: string }) => l.masjid.id === "quba" && l.prayer === "maghrib")).toBe(true);
    for (const l of all) for (const k of ["id", "shaykhId", "masjidId", "sort"]) expect(l).not.toHaveProperty(k);
    const masjids = await import("@/app/api/v1/duroos/masjids/route");
    expect((await (await get(masjids.GET as never, "https://medinahub.org/api/v1/duroos/masjids")).json()).data.some((m: { id: string }) => m.id === "nabawi")).toBe(true);
    const streams = await import("@/app/api/v1/duroos/streams/route");
    const s = (await (await get(streams.GET as never, "https://medinahub.org/api/v1/duroos/streams")).json()).data;
    expect(s.some((x: { slug: string }) => x.slug === "nabawi-youtube")).toBe(true);
    for (const x of s) for (const k of ["checkUrl", "shaykhId", "masjidId", "id"]) expect(x).not.toHaveProperty(k);
  });
});

describe("watch cron without an AI key", () => {
  it("still runs the parts that need no AI and says the key is missing", async () => {
    db = await resetTestDb();
    await importLegacy(db);
    vi.stubEnv("CRON_SECRET", "test-secret");
    vi.stubEnv("GEMINI_API_KEY", "");
    const fetchMock = vi.fn(async () => new Response("<html></html>", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    try {
      const { GET } = await import("@/app/api/cron/watch/route");
      const res = await GET(new Request("https://medinahub.org/api/cron/watch", { headers: { authorization: "Bearer test-secret" } }));
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toMatchObject({ ok: true, warning: "GEMINI_API_KEY is not set" });
      expect(fetchMock).toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
      vi.unstubAllEnvs();
    }
  });
});

describe("unknown /api/v1 addresses", () => {
  it("answer 404 in the JSON envelope", async () => {
    const { GET } = await import("@/app/api/v1/[...rest]/route");
    const res = await GET();
    expect(res.status).toBe(404);
    expect(await res.json()).toMatchObject({ data: null, error: "not_found", version: 1 });
  });
});
