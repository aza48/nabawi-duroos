import { arrayOverlaps, eq } from "drizzle-orm";
import { z } from "zod";
import type { Db } from "@/server/db/client";
import { lessons, pushSubscriptions, shaykhs } from "@/server/db/schema";
import type { getToday } from "@/server/duroos/queries";
import { formatHijri } from "@/lib/time/hijri";
import { formatClock } from "@/lib/time/riyadh";

/** Only real browser push services; MESH must never be usable to push to arbitrary servers. */
const PUSH_HOSTS = [/^fcm\.googleapis\.com$/, /^web\.push\.apple\.com$/, /^updates\.push\.services\.mozilla\.com$/, /\.notify\.windows\.com$/, /^android\.googleapis\.com$/];

const topic = z.string().regex(/^(all|daily|shaykh:[a-z0-9-]{3,80})$/);

/** Decoded length of a base64url string, or -1 when it is not base64url at all. */
function b64Bytes(s: string): number {
  if (!/^[A-Za-z0-9_-]+={0,2}$/.test(s)) return -1;
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64").length;
}
/** Browser push keys have fixed sizes: a 65-byte P-256 point and a 16-byte auth secret. Anything else can never be delivered to. */
const p256dhKey = z.string().max(200).refine((s) => b64Bytes(s) === 65, "Not a browser push key");
const authKey = z.string().max(100).refine((s) => b64Bytes(s) === 16, "Not a browser push auth secret");

const subInput = z.object({
  endpoint: z.string().max(1000).refine((u) => {
    try {
      const url = new URL(u);
      return url.protocol === "https:" && PUSH_HOSTS.some((h) => h.test(url.hostname));
    } catch {
      return false;
    }
  }, "Not a browser push service"),
  keys: z.object({ p256dh: p256dhKey, auth: authKey }),
  topics: z.array(topic).min(1).max(20),
});

/** Pushes go out in batches, so one broadcast never opens thousands of connections at once. */
const SEND_BATCH = 50;

export async function subscribePush(db: Db, input: unknown) {
  const v = subInput.parse(input);
  const topics = [...new Set(v.topics)];
  await db
    .insert(pushSubscriptions)
    .values({ endpoint: v.endpoint, p256dh: v.keys.p256dh, auth: v.keys.auth, topics })
    .onConflictDoUpdate({ target: pushSubscriptions.endpoint, set: { p256dh: v.keys.p256dh, auth: v.keys.auth, topics } });
}

export async function unsubscribePush(db: Db, endpoint: string) {
  await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
}

export type PushSender = (endpoint: string, payload: string, keys: { p256dh: string; auth: string }) => Promise<void>;

/** Real sender when VAPID keys are configured, otherwise null (push silently off). */
export async function getPushSender(): Promise<PushSender | null> {
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  if (!pub || !priv) return null;
  const webpush = (await import("web-push")).default;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT ?? "https://medinahub.org", pub, priv);
  return async (endpoint, payload, keys) => {
    await webpush.sendNotification({ endpoint, keys }, payload, { TTL: 6 * 3600 });
  };
}

async function sendToTopics(db: Db, topics: string[], payload: object, send: PushSender): Promise<number> {
  const subs = await db.select().from(pushSubscriptions).where(arrayOverlaps(pushSubscriptions.topics, topics));
  const body = JSON.stringify(payload);
  let delivered = 0;
  for (let i = 0; i < subs.length; i += SEND_BATCH) {
    await Promise.all(
      subs.slice(i, i + SEND_BATCH).map(async (s) => {
        try {
          await send(s.endpoint, body, { p256dh: s.p256dh, auth: s.auth });
          delivered++;
        } catch (e) {
          // Gone (404, 410), rejected by the push service (other 4xx) or a key the library cannot
          // encrypt for: the subscription is dead and is removed. Network trouble (no status) is kept.
          const code = (e as { statusCode?: number }).statusCode;
          const dead = (code !== undefined && code >= 400 && code < 500 && code !== 429) || /p256dh|auth|key|base64/i.test(String((e as Error).message ?? ""));
          if (dead) await unsubscribePush(db, s.endpoint);
        }
      })
    );
  }
  return delivered;
}

const KIND_TITLE: Record<string, string> = {
  cancelled: "Cancelled", postponed: "Postponed", moved: "Moved", resumed: "Back on", guest: "Guest teacher",
};

/** Tells subscribers about a lesson change. Returns how many phones were reached. */
export async function notifyOverride(db: Db, o: { lessonSlug: string; kind: string; startsOn: string; noteEn?: string | null }, send: PushSender) {
  if (!KIND_TITLE[o.kind]) return 0;
  const [row] = await db
    .select({ bookEn: lessons.bookEn, shaykh: shaykhs.nameEn, shaykhSlug: shaykhs.slug })
    .from(lessons)
    .innerJoin(shaykhs, eq(lessons.shaykhId, shaykhs.id))
    .where(eq(lessons.slug, o.lessonSlug));
  if (!row) return 0;
  return sendToTopics(db, ["all", `shaykh:${row.shaykhSlug}`], {
    title: `${KIND_TITLE[o.kind]}: ${row.bookEn}`,
    body: `${row.shaykh}, ${formatHijri(o.startsOn, "en", { weekday: true })}.${o.noteEn ? ` ${o.noteEn}` : ""}`,
    url: `/duroos/lesson/${o.lessonSlug}`,
    tag: `${o.lessonSlug}-${o.startsOn}`,
  }, send);
}

type Today = Awaited<ReturnType<typeof getToday>>;

export function dailyBriefText(t: Today): { title: string; body: string } {
  const cancelled = t.lessons.filter((l) => l.status === "cancelled" || l.status === "postponed");
  const first = t.lessons.find((l) => l.status === "on");
  const parts = [
    cancelled.length ? `Cancelled: ${cancelled.slice(0, 2).map((l) => l.shaykh.nameEn.split(" ").slice(-1)[0]).join(", ")}${cancelled.length > 2 ? " and more" : ""}.` : "Nothing cancelled.",
    first ? `First: ${first.bookEn.slice(0, 50)} after ${first.prayer} (${formatClock(new Date(first.adhanAt))}).` : "",
  ];
  return { title: `Today in Madinah: ${t.lessons.length} duroos`, body: parts.filter(Boolean).join(" ").slice(0, 190) };
}

export async function sendDailyBrief(db: Db, t: Today, send: PushSender) {
  return sendToTopics(db, ["daily"], { ...dailyBriefText(t), url: "/duroos", tag: `daily-${t.date}` }, send);
}
