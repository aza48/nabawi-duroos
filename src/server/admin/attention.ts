import { count, eq, inArray, isNotNull } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { channelPosts, faqs, guides, sources } from "@/server/db/schema";
import { PROGRAMS } from "@/content/programs";
import { getSetting } from "@/server/settings";

export type AttentionItem = { key: string; label: string; count: number; href: string; detail?: string };

export type AttentionInput = {
  suggested: number;
  failedPosts: number;
  failingSources: string[];
  watcherLastRun: Date | null;
  drafts: number;
  staleGuides: { slug: string; title: string; verified: Date | null }[];
  staleFaqs: { slug: string; question: string; verified: Date | null }[];
  programmes: { slug: string; name: string; checked: string }[];
};

const DAY = 86_400_000;
/** Facts older than this count as stale. */
export const STALE_DAYS = 180;

/** What needs a person right now, most urgent first. Pure, so it is easy to test. */
export function buildAttention(i: AttentionInput, now: Date): AttentionItem[] {
  const out: AttentionItem[] = [];
  const old = (d: Date | null) => !d || now.getTime() - d.getTime() > STALE_DAYS * DAY;
  if (!i.watcherLastRun || now.getTime() - i.watcherLastRun.getTime() > 30 * 60_000) {
    out.push({ key: "watcher", label: "The channel watcher has stopped", count: 1, href: "/admin/sources", detail: i.watcherLastRun ? "New posts are not being read." : "It has not run yet." });
  }
  if (i.failingSources.length) out.push({ key: "sources", label: "Channels that failed to load", count: i.failingSources.length, href: "/admin/sources", detail: i.failingSources.join(", ") });
  if (i.suggested) out.push({ key: "suggested", label: "Channel posts to approve or dismiss", count: i.suggested, href: "/admin#channels" });
  if (i.failedPosts) out.push({ key: "failed", label: "Posts the reader could not understand", count: i.failedPosts, href: "/admin#channels" });
  if (i.drafts) out.push({ key: "drafts", label: "Drafts waiting to publish", count: i.drafts, href: "/admin#drafts" });
  const staleProgrammes = i.programmes.filter((p) => old(new Date(`${p.checked}T00:00:00+03:00`)));
  if (staleProgrammes.length) out.push({ key: "programmes", label: `Programmes not checked in ${STALE_DAYS / 30} months`, count: staleProgrammes.length, href: "/programs", detail: staleProgrammes.map((p) => p.name).join(", ") });
  const staleContent = [...i.staleGuides.filter((g) => old(g.verified)), ...i.staleFaqs.filter((f) => old(f.verified))];
  if (staleContent.length) out.push({ key: "content", label: `Guides and answers not verified in ${STALE_DAYS / 30} months`, count: staleContent.length, href: "/admin/content" });
  return out;
}

export async function needsAttention(db: Db, now = new Date()): Promise<AttentionItem[]> {
  const [posts, failing, last, g, f, da, dg] = await Promise.all([
    db.select({ status: channelPosts.status, n: count() }).from(channelPosts).where(inArray(channelPosts.status, ["suggested", "error"])).groupBy(channelPosts.status),
    db.select({ handle: sources.handle }).from(sources).where(isNotNull(sources.lastError)),
    getSetting<string>(db, "watcher_last_checked_at"),
    db.select({ slug: guides.slug, title: guides.title, verified: guides.lastVerifiedAt }).from(guides).where(eq(guides.status, "published")),
    db.select({ slug: faqs.slug, question: faqs.question, verified: faqs.lastVerifiedAt }).from(faqs).where(eq(faqs.status, "published")),
    db.select({ n: count() }).from(faqs).where(eq(faqs.status, "draft")),
    db.select({ n: count() }).from(guides).where(eq(guides.status, "draft")),
  ]);
  return buildAttention(
    {
      suggested: posts.find((p) => p.status === "suggested")?.n ?? 0,
      failedPosts: posts.find((p) => p.status === "error")?.n ?? 0,
      failingSources: failing.map((s) => `@${s.handle}`),
      watcherLastRun: last ? new Date(last) : null,
      drafts: (da[0]?.n ?? 0) + (dg[0]?.n ?? 0),
      staleGuides: g,
      staleFaqs: f,
      programmes: PROGRAMS.map((p) => ({ slug: p.slug, name: p.name, checked: p.checked })),
    },
    now
  );
}
