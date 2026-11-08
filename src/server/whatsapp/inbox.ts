/**
 * The MESH WhatsApp number: the owner forwards messages to it and they are read, sorted and
 * published (clear schedule changes) or queued for the admin ("Needs you"). Messages from any
 * other number are ignored without a reply.
 */
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { channelPosts, sources } from "@/server/db/schema";
import { addOverride } from "@/server/admin/duroos";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { decide } from "@/server/watcher/decide";
import { lessonContext, type WatcherDeps } from "@/server/watcher/run";
import { plainReading } from "@/features/admin/watcher/reading";

export const WA_SOURCE = "wa-forward";
const GRAPH = "https://graph.facebook.com/v21.0";

/** Meta signs every delivery with the app secret: X-Hub-Signature-256: sha256=<hex>. */
export function validSignature(raw: string, header: string | null, appSecret: string | undefined): boolean {
  if (!appSecret || !header?.startsWith("sha256=")) return false;
  const want = Buffer.from(createHmac("sha256", appSecret).update(raw).digest("hex"));
  const given = Buffer.from(header.slice(7));
  return want.length === given.length && timingSafeEqual(want, given);
}

export const digits = (s: string) => s.replace(/\D/g, "");
export const ownerNumbers = (env = process.env.WHATSAPP_OWNERS) => (env ?? "").split(",").map(digits).filter(Boolean);

export type Incoming = { id: string; from: string; at: Date; text: string; imageId: string | null; forwarded: boolean };

/** The messages in one webhook delivery, from the allowed numbers only. */
export function incomingMessages(payload: unknown, owners: string[]): Incoming[] {
  const out: Incoming[] = [];
  const p = payload as { entry?: { changes?: { value?: { messages?: Record<string, any>[] } }[] }[] };
  for (const e of p.entry ?? []) {
    for (const c of e.changes ?? []) {
      for (const m of c.value?.messages ?? []) {
        if (!owners.includes(digits(String(m.from ?? "")))) continue;
        const text = m.type === "text" ? String(m.text?.body ?? "") : String(m.image?.caption ?? m.document?.caption ?? "");
        const imageId = m.type === "image" ? String(m.image?.id ?? "") || null : null;
        if (!text && !imageId) continue;
        out.push({ id: String(m.id), from: digits(String(m.from)), at: new Date(Number(m.timestamp ?? 0) * 1000), text, imageId, forwarded: !!m.context?.forwarded });
      }
    }
  }
  return out;
}

/** Downloads a WhatsApp image as a data URL the AI reader can use. */
export async function mediaDataUrl(mediaId: string, token: string, f: typeof fetch = fetch): Promise<string | null> {
  try {
    const meta = await f(`${GRAPH}/${mediaId}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json() as Promise<{ url?: string; mime_type?: string }>);
    if (!meta.url) return null;
    const res = await f(meta.url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 3_000_000) return null;
    return `data:${meta.mime_type ?? "image/jpeg"};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function sendText(to: string, body: string, env = process.env, f: typeof fetch = fetch): Promise<void> {
  if (!env.WHATSAPP_TOKEN || !env.WHATSAPP_PHONE_NUMBER_ID) return;
  await f(`${GRAPH}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: body.slice(0, 4000) } }),
  }).catch(() => undefined);
}

export type Outcome = { status: "published" | "suggested" | "error" | "duplicate"; reply: string };

/** Reads one forwarded message and acts on it. The owner forwarded it, so it is trusted. */
export async function ingestForwarded(db: Db, msg: Incoming & { imageUrl: string | null }, readPost: WatcherDeps["readPost"], now = new Date()): Promise<Outcome> {
  await db.insert(sources).values({ handle: WA_SOURCE, name: "Forwarded on WhatsApp", trusted: true, autoPublish: true }).onConflictDoNothing({ target: sources.handle });
  const postId = `wa/${msg.id}`;
  const [seen] = await db.select({ id: channelPosts.id }).from(channelPosts).where(eq(channelPosts.postId, postId));
  if (seen) return { status: "duplicate", reply: "" };

  const ctx = await lessonContext(db);
  const today = riyadhDateIso(now);
  const textHash = createHash("sha256").update(`${msg.text}|${msg.imageUrl ?? ""}`).digest("hex");
  const base = { sourceHandle: WA_SOURCE, postId, url: "", text: msg.text, imageUrl: msg.imageUrl, postedAt: msg.at, textHash, updatedAt: now };

  let parse = null;
  try {
    parse = await readPost({ text: msg.text, imageUrl: msg.imageUrl }, ctx.list, today);
  } catch {
    parse = null;
  }
  if (!parse) {
    await db.insert(channelPosts).values({ ...base, status: "error", reason: "Could not be read" });
    return { status: "error", reply: "Saved for review. The reader could not understand this one, so it is in the admin inbox." };
  }

  const reading = plainReading(parse, parse.lesson_slug ? ctx.list.find((l) => l.slug === parse!.lesson_slug)?.label.split(": ")[1]?.split(" / ")[0] : undefined);
  const d = decide(parse, { today, trusted: true, autoPublish: true, lessonDays: ctx.days });
  if (d.action === "auto") {
    const o = await addOverride(db, "system", {
      lessonSlug: parse.lesson_slug!, kind: parse.kind as "cancelled", startsOn: parse.dates[0],
      noteEn: parse.note_en || null, noteAr: parse.note_ar || null, sourceUrl: null,
    }, "watcher_auto");
    await db.insert(channelPosts).values({ ...base, status: "published", parse, reason: d.reason, wouldAuto: true, overrideId: o.id, decidedBy: "MESH WhatsApp" });
    return { status: "published", reply: `Published. ${reading} You can undo it in Admin > Activity.` };
  }
  await db.insert(channelPosts).values({ ...base, status: "suggested", parse, reason: d.action === "ignore" ? "General information for the site" : d.reason, wouldAuto: false });
  return { status: "suggested", reply: `Saved to the admin inbox. ${reading}` };
}
