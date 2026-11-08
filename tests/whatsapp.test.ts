import { describe, expect, it } from "vitest";
import { createHmac } from "node:crypto";
import { eq } from "drizzle-orm";
import { resetTestDb } from "@/server/db/client";
import { importLegacy } from "@/server/seed/import-legacy";
import { channelPosts, lessonOverrides } from "@/server/db/schema";
import { incomingMessages, ingestForwarded, ownerNumbers, validSignature } from "@/server/whatsapp/inbox";
import type { AiParse } from "@/server/watcher/ai";

const delivery = (from: string, extra: Record<string, unknown>) => ({ entry: [{ changes: [{ value: { messages: [{ from, id: "wamid.1", timestamp: "1762600000", ...extra }] } }] }] });

describe("whatsapp webhook", () => {
  it("accepts only deliveries signed with the app secret", () => {
    const raw = JSON.stringify({ a: 1 });
    const sig = "sha256=" + createHmac("sha256", "s3cret").update(raw).digest("hex");
    expect(validSignature(raw, sig, "s3cret")).toBe(true);
    expect(validSignature(raw, sig, "other")).toBe(false);
    expect(validSignature(raw, null, "s3cret")).toBe(false);
    expect(validSignature(raw, sig, undefined)).toBe(false);
  });
  it("keeps messages from the owner and ignores everyone else", () => {
    const owners = ownerNumbers("+966 50 123 4567, 12345679076");
    expect(incomingMessages(delivery("966501234567", { type: "text", text: { body: "hello" }, context: { forwarded: true } }), owners)).toMatchObject([{ from: "966501234567", text: "hello", forwarded: true }]);
    expect(incomingMessages(delivery("447700900000", { type: "text", text: { body: "hi" } }), owners)).toEqual([]);
    expect(incomingMessages(delivery("12345679076", { type: "image", image: { id: "media1", caption: "poster" } }), owners)).toMatchObject([{ imageId: "media1", text: "poster" }]);
  });
});

describe("ingestForwarded", () => {
  it("publishes a clear cancellation forwarded by the owner, and replies in plain words", async () => {
    const db = await resetTestDb();
    await importLegacy(db);
    const parse: AiParse = { about_lesson: true, lesson_slug: "ruh-dalil", kind: "cancelled", dates: ["2026-11-12"], note_en: "The shaykh will not give this dars today", note_ar: "", confidence: 0.95 };
    const out = await ingestForwarded(db, { id: "wamid.9", from: "966501234567", at: new Date("2026-11-08T08:00:00Z"), text: "يعتذر الشيخ سليمان الرحيلي عن درس الخميس", imageId: null, forwarded: true, imageUrl: null }, async () => parse, new Date("2026-11-08T09:00:00Z"));
    expect(out.status).toBe("published");
    expect(out.reply).toMatch(/^Published\. Looks like: lesson cancelled/);
    const [row] = await db.select().from(channelPosts).where(eq(channelPosts.postId, "wa/wamid.9"));
    expect(row.status).toBe("published");
    expect((await db.select().from(lessonOverrides)).some((o) => o.id === row.overrideId)).toBe(true);
    const again = await ingestForwarded(db, { id: "wamid.9", from: "966501234567", at: new Date(), text: "x", imageId: null, forwarded: true, imageUrl: null }, async () => parse);
    expect(again.status).toBe("duplicate");
  });
  it("queues general information for the admin instead of publishing", async () => {
    const db = await resetTestDb();
    await importLegacy(db);
    const other: AiParse = { about_lesson: false, lesson_slug: null, kind: "other", dates: [], note_en: "", note_ar: "", confidence: 0.9 };
    const out = await ingestForwarded(db, { id: "wamid.10", from: "966501234567", at: new Date(), text: "New discount at a gym", imageId: null, forwarded: true, imageUrl: null }, async () => other);
    expect(out.status).toBe("suggested");
    expect(out.reply).toMatch(/^Saved to the admin inbox/);
  });
});
