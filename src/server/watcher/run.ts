import { isBroadSource, sourceRank } from "./sources";
import { worthReading } from "./prefilter";
import { createHash } from "node:crypto";
import { and, eq, gte, inArray, lte, ne, or } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { channelPosts, lessonLive, lessons, masjids, shaykhs, sources } from "@/server/db/schema";
import { isLiveNotice, matchLiveLesson, pickLiveLink } from "./live-notice";
import { assertCan, type Actor } from "@/server/auth/permissions";
import { addOverride } from "@/server/admin/duroos";
import { setSetting } from "@/server/settings";
import { riyadhDateIso } from "@/lib/time/riyadh";
import { parseChannelHtml, previewUrl, type ChannelPost } from "./telegram";
import { decide } from "./decide";
import type { AiParse } from "./ai";

/** Only posts this recent are read, so the first run doesn't spend the AI quota on old news. */
export const RECENT_DAYS = 3;
/** AI calls per run; whatever is left waits for the next run (free-tier friendly). */
export const MAX_AI_PER_RUN = 8;

export type WatcherDeps = {
  fetchHtml: (handle: string) => Promise<string>;
  readPost: (post: { text: string; imageUrl: string | null }, lessons: { slug: string; label: string }[], today: string) => Promise<AiParse | null>;
};

export type RunResult = { sources: number; newPosts: number; suggested: number; published: number; ignored: number; errors: number };

const hash = (s: string) => createHash("sha256").update(s).digest("hex");

export async function lessonContext(db: Db) {
  const rows = await db
    .select({ masjidId: lessons.masjidId, slug: lessons.slug, days: lessons.days, prayer: lessons.prayer, bookEn: lessons.bookEn, bookAr: lessons.bookAr, shaykh: shaykhs.nameEn, shaykhAr: shaykhs.nameAr, masjid: masjids.shortEn })
    .from(lessons)
    .innerJoin(shaykhs, eq(lessons.shaykhId, shaykhs.id))
    .innerJoin(masjids, eq(lessons.masjidId, masjids.id))
    .where(eq(lessons.status, "active"));
  const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    list: rows.map((r) => ({
      slug: r.slug,
      label: `${r.shaykh} (${r.shaykhAr}): ${r.bookEn} / ${r.bookAr}, ${r.masjid}, after ${r.prayer}, ${r.days.length ? r.days.map((d) => DAY[d]).join(" ") : "days not stated"}`,
    })),
    days: Object.fromEntries(rows.map((r) => [r.slug, r.days])) as Record<string, number[]>,
    shaykhs: Object.fromEntries(rows.map((r) => [r.slug, { ar: r.shaykhAr, en: r.shaykh }])) as Record<string, { ar: string; en: string }>,
    candidates: rows.map((r) => ({ slug: r.slug, bookAr: r.bookAr, shaykhAr: r.shaykhAr, masjidId: r.masjidId })),
  };
}

/** One pass over every channel. Network calls are injected so tests never touch the internet. */
/** Seconds a run may spend before leaving the remaining posts for the next run (the function limit is 60s). */
export const RUN_BUDGET_MS = 35_000;

export async function runWatcher(
  db: Db,
  deps: WatcherDeps,
  now: Date = new Date(),
  opts: { budgetMs?: number; clock?: () => number } = {}
): Promise<RunResult> {
  const clock = opts.clock ?? Date.now;
  const startedAt = clock();
  const budgetMs = opts.budgetMs ?? RUN_BUDGET_MS;
  const today = riyadhDateIso(now);
  const cutoff = new Date(now.getTime() - RECENT_DAYS * 86_400_000);
  const ctx = await lessonContext(db);
  const result: RunResult = { sources: 0, newPosts: 0, suggested: 0, published: 0, ignored: 0, errors: 0 };
  let aiBudget = MAX_AI_PER_RUN;
  let fetchedAny = false;
  const allSources = (await db.select().from(sources)).sort((a, b) => sourceRank(a.handle) - sourceRank(b.handle));

  /** A post that failed is retried after this long, not on every run. */
  const ERROR_RETRY_MS = 30 * 60_000;
  /** A forwarded copy of a notice counts as the same post only within this many hours of the first. */
  const TWIN_WINDOW_MS = 48 * 3_600_000;
  /** The same channel posting the same text again this soon is a repost, not a new notice. */
  const REPOST_WINDOW_MS = 6 * 3_600_000;

  for (const src of allSources) {
    // Forwarded WhatsApp messages arrive through the webhook, not from a channel page.
    if (src.handle === "wa-forward") continue;
    // The budget covers the channel fetches too, so a run never outlives the function limit.
    if (clock() - startedAt > budgetMs) break;
    result.sources++;
    let posts: ChannelPost[];
    try {
      posts = parseChannelHtml(await deps.fetchHtml(src.handle), src.handle).filter((p) => p.postedAt >= cutoff);
      await db.update(sources).set({ lastCheckedAt: now, lastError: null }).where(eq(sources.handle, src.handle));
      fetchedAny = true;
    } catch (e) {
      result.errors++;
      await db.update(sources).set({ lastError: String(e instanceof Error ? e.message : e).slice(0, 300) }).where(eq(sources.handle, src.handle));
      continue;
    }

    for (const p of posts) {
      const textHash = hash(`${p.text}|${p.imageUrl ?? ""}`);
      const [existing] = await db.select().from(channelPosts).where(eq(channelPosts.postId, p.postId));
      // "new" and "error" posts are (re)tried; anything already decided is left alone unless edited.
      if (existing && existing.textHash === textHash && existing.status !== "new" && existing.status !== "error") continue;
      // An AI error (quota, outage) is retried after a pause, so 429s do not multiply every three minutes.
      if (existing && existing.status === "error" && existing.textHash === textHash && now.getTime() - existing.updatedAt.getTime() < ERROR_RETRY_MS) continue;
      if (existing && existing.status === "published" && existing.textHash !== textHash) {
        await db.update(channelPosts).set({ text: p.text, textHash, status: "suggested", reason: "Edited after it was published. Check the change is still right.", updatedAt: now }).where(eq(channelPosts.id, existing.id));
        result.suggested++;
        continue;
      }
      if (existing?.status === "dismissed") continue;

      // The same notice forwarded to a second channel: copy the first decision instead of reading it again
      // (and never publishing it twice). Only another channel, within two days: the same short notice
      // posted again on a later week ("the shaykh excuses himself today") is a new notice and is read.
      if (!existing) {
        const [twin] = await db
          .select()
          .from(channelPosts)
          .where(and(
            eq(channelPosts.textHash, textHash),
            // Another channel within two days, or the same channel reposting within a few hours.
            or(
              and(ne(channelPosts.sourceHandle, src.handle), gte(channelPosts.postedAt, new Date(p.postedAt.getTime() - TWIN_WINDOW_MS)), lte(channelPosts.postedAt, new Date(p.postedAt.getTime() + TWIN_WINDOW_MS))),
              and(eq(channelPosts.sourceHandle, src.handle), gte(channelPosts.postedAt, new Date(p.postedAt.getTime() - REPOST_WINDOW_MS)), lte(channelPosts.postedAt, new Date(p.postedAt.getTime() + REPOST_WINDOW_MS))),
            ),
            ne(channelPosts.status, "new"),
            ne(channelPosts.status, "error"),
          ))
          .limit(1);
        if (twin) {
          await db.insert(channelPosts).values({
            sourceHandle: src.handle, postId: p.postId, url: p.url, text: p.text, imageUrl: p.imageUrl, postedAt: p.postedAt, textHash,
            status: "ignored", reason: `Same post as ${twin.sourceHandle} (${twin.status}); not read twice.`, updatedAt: now,
          });
          result.ignored++;
          continue;
        }
      }

      // "Live broadcast started": no AI needed. Mark the dars live with its stream link.
      // Only a trusted source may do this: the link becomes a public button.
      if (isLiveNotice(p.text)) {
        if (existing) continue;
        const slug = src.trusted ? matchLiveLesson(p.text, ctx.candidates) : null;
        const link = src.trusted ? pickLiveLink(p.links) : null;
        if (slug && link) {
          await db.insert(lessonLive).values({ lessonSlug: slug, url: link, postUrl: p.url, startedAt: p.postedAt })
            .onConflictDoUpdate({ target: lessonLive.lessonSlug, set: { url: link, postUrl: p.url, startedAt: p.postedAt } });
        }
        await db.insert(channelPosts).values({ sourceHandle: src.handle, postId: p.postId, url: p.url, text: p.text, imageUrl: p.imageUrl, postedAt: p.postedAt, textHash, status: "ignored", reason: !src.trusted ? "Live broadcast notice from an untrusted source (not applied)" : slug ? `Live broadcast notice: ${slug}` : "Live broadcast notice (lesson not recognised)" });
        result.ignored++;
        continue;
      }
      // Busy channels: skip posts with no schedule words without spending an AI read.
      if (isBroadSource(src.handle) && !worthReading(p.text, ctx.candidates)) {
        const skipped = { sourceHandle: src.handle, postId: p.postId, url: p.url, text: p.text, imageUrl: p.imageUrl, postedAt: p.postedAt, textHash, status: "ignored" as const, reason: "No schedule words. Skipped without AI.", updatedAt: now };
        if (existing) await db.update(channelPosts).set(skipped).where(eq(channelPosts.id, existing.id));
        else await db.insert(channelPosts).values(skipped);
        result.ignored++;
        continue;
      }
      if (aiBudget <= 0 || clock() - startedAt > budgetMs) {
        if (!existing) await db.insert(channelPosts).values({ sourceHandle: src.handle, postId: p.postId, url: p.url, text: p.text, imageUrl: p.imageUrl, postedAt: p.postedAt, textHash, status: "new" });
        continue;
      }
      aiBudget--;
      if (!existing) result.newPosts++;

      let parse: AiParse | null = null;
      let failure: string | null = null;
      try {
        parse = await deps.readPost({ text: p.text, imageUrl: p.imageUrl }, ctx.list, today);
        if (!parse) failure = "The AI reply couldn't be understood";
      } catch (e) {
        failure = `AI error: ${e instanceof Error ? e.message : e}`;
      }

      const base = { sourceHandle: src.handle, postId: p.postId, url: p.url, text: p.text, imageUrl: p.imageUrl, postedAt: p.postedAt, textHash, updatedAt: now };
      let row: typeof channelPosts.$inferInsert;
      if (!parse) {
        result.errors++;
        row = { ...base, status: "error", parse: null, reason: failure, wouldAuto: false };
      } else {
        const d = decide(parse, {
          today, trusted: src.trusted, autoPublish: src.autoPublish, lessonDays: ctx.days,
          text: p.text, imageOnly: !p.text.trim() && !!p.imageUrl, lessonShaykhs: ctx.shaykhs, sourceHandle: src.handle,
        });
        row = { ...base, status: d.action === "ignore" ? "ignored" : "suggested", parse, reason: d.reason, wouldAuto: d.wouldAuto };
        if (d.action === "auto") {
          // The AI's own wording never reaches the public page or a push alert: the status and date say it all.
          const o = await addOverride(db, "system", {
            lessonSlug: parse.lesson_slug!, kind: parse.kind as "cancelled", startsOn: parse.dates[0],
            noteEn: null, noteAr: null, sourceUrl: p.url,
          }, "watcher_auto");
          row = { ...row, status: "published", overrideId: o.id, decidedBy: "MESH watcher" };
          result.published++;
        } else if (d.action === "suggest") result.suggested++;
        else result.ignored++;
      }
      if (existing) await db.update(channelPosts).set(row).where(eq(channelPosts.id, existing.id));
      else await db.insert(channelPosts).values(row);
    }
  }

  // "Last checked" is only true when at least one channel was really read.
  if (fetchedAny) await setSetting(db, "watcher_last_checked_at", now.toISOString());
  else await setSetting(db, "watcher_last_error", `No channel could be read at ${now.toISOString()}`);
  return result;
}

/* ---------------- Admin review ---------------- */

export async function approveSuggestion(
  db: Db,
  actor: Actor,
  id: number,
  edits: { lessonSlug?: string; kind?: "cancelled" | "postponed" | "moved" | "resumed" | "guest" | "note"; startsOn?: string; endsOn?: string }
) {
  assertCan(actor, "duroos.write");
  const [p] = await db.select().from(channelPosts).where(and(eq(channelPosts.id, id), inArray(channelPosts.status, ["suggested", "error"])));
  if (!p) throw new Error("suggestion_not_found");
  const parse = (p.parse ?? {}) as Partial<AiParse>;
  const lessonSlug = edits.lessonSlug ?? parse.lesson_slug ?? undefined;
  const startsOn = edits.startsOn ?? parse.dates?.[0];
  if (!lessonSlug || !startsOn) throw new Error("needs_lesson_and_date");
  // Claim the post first, so two admins (or a stale tab) cannot both approve it or race a dismiss.
  const claimed = await db
    .update(channelPosts)
    .set({ status: "published", decidedBy: actor.name, updatedAt: new Date() })
    .where(and(eq(channelPosts.id, id), inArray(channelPosts.status, ["suggested", "error"])))
    .returning({ id: channelPosts.id });
  if (!claimed.length) throw new Error("suggestion_not_found");
  let o: Awaited<ReturnType<typeof addOverride>>;
  try {
    o = await addOverride(db, actor, {
      lessonSlug, kind: (edits.kind ?? parse.kind ?? "note") as "cancelled", startsOn, endsOn: edits.endsOn,
      noteEn: parse.note_en || null, noteAr: parse.note_ar || null, sourceUrl: p.url,
    }, "watcher_approved");
  } catch (e) {
    await db.update(channelPosts).set({ status: p.status, decidedBy: p.decidedBy, updatedAt: p.updatedAt }).where(eq(channelPosts.id, id));
    throw e;
  }
  await db.update(channelPosts).set({ overrideId: o.id }).where(eq(channelPosts.id, id));
  return o;
}

export async function dismissSuggestion(db: Db, actor: Actor, id: number) {
  assertCan(actor, "duroos.write");
  // Only a post still waiting for a decision: a dismiss racing an approve must not hide a live change.
  const done = await db
    .update(channelPosts)
    .set({ status: "dismissed", decidedBy: actor.name, updatedAt: new Date() })
    .where(and(eq(channelPosts.id, id), inArray(channelPosts.status, ["suggested", "error"])))
    .returning({ id: channelPosts.id });
  if (!done.length) throw new Error("suggestion_not_found");
}

/** Production wiring: real network calls. */
export function liveDeps(apiKey: string): WatcherDeps {
  return {
    fetchHtml: async (handle) => {
      const res = await fetch(previewUrl(handle), { headers: { "user-agent": "Mozilla/5.0 (MESH channel reader)" }, cache: "no-store", signal: AbortSignal.timeout(10_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    },
    readPost: async (post, lessonsList, today) => {
      const { readPostWithGemini } = await import("./ai");
      return readPostWithGemini(post, lessonsList, today, { apiKey, fetch: (url, init) => fetch(url, { ...init, signal: init?.signal ? AbortSignal.any([init.signal, AbortSignal.timeout(12_000)]) : AbortSignal.timeout(12_000) }) });
    },
  };
}

