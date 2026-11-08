import { eq, sql } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { channelPosts, sources } from "@/server/db/schema";

/**
 * The public Telegram channels MESH reads, in the order they are read. Everything starts in
 * shadow mode (autoPublish off). "Core" channels are about the duroos we track, so every post
 * goes to the AI, flyer images included. "Broad" channels post a lot of other material, so only
 * posts that pass the free keyword check in prefilter.ts reach the AI and its small daily quota.
 */
export const DEFAULT_SOURCES: { handle: string; name: string; broad?: true }[] = [
  { handle: "drosalmadina", name: "Duroos al-Madinah an-Nabawiyyah" },
  { handle: "Sualruhaily", name: "Shaykh Sulayman al-Ruhayli (official)" },
  { handle: "twijri", name: "Prof. Dr. Ali al-Tuwaijri (official)" },
  { handle: "rehyli", name: "Prof. Dr. Ibrahim al-Ruhayli (official)" },
  { handle: "dr_maherkhujah", name: "Prof. Dr. Mahir Khujah (official)" },
  { handle: "khizana_62", name: "Khizanat al-Ilm" },
  { handle: "dr_elbukhary", name: "Prof. Dr. Abdullah al-Bukhari (official)" },
  { handle: "Duroos_alhramain", name: "Duroos al-Haramayn" },
  { handle: "sohaymi", name: "Shaykh Salih al-Suhaymi (benefits)", broad: true },
  { handle: "Miraathalanbeyaa", name: "Miraath al-Anbiya", broad: true },
  { handle: "almanashet", name: "Women's da'wah activities in Madinah", broad: true },
  { handle: "Dawah_Madina", name: "Da'wah and Guidance Society, Madinah", broad: true },
  { handle: "Abo3omr_ALArjon", name: "Shaykh Abdulaziz al-Arjun", broad: true },
];

/** Handles that were wrong or have gone quiet. Removed when nothing refers to them. */
export const RETIRED_SOURCES = ["Sulalruhaily"];

const BROAD = new Set(DEFAULT_SOURCES.filter((s) => s.broad).map((s) => s.handle.toLowerCase()));
export const isBroadSource = (handle: string) => BROAD.has(handle.toLowerCase());

const ORDER = new Map(DEFAULT_SOURCES.map((s, i) => [s.handle.toLowerCase(), i]));
/** Core channels first, so the busy ones never use up the AI budget before them. */
export const sourceRank = (handle: string) => ORDER.get(handle.toLowerCase()) ?? DEFAULT_SOURCES.length;

export async function seedSources(db: Db): Promise<void> {
  for (const s of DEFAULT_SOURCES) {
    await db.insert(sources).values({ handle: s.handle, name: s.name, trusted: true, autoPublish: false }).onConflictDoNothing({ target: sources.handle });
  }
  for (const handle of RETIRED_SOURCES) {
    const [used] = await db.select({ n: sql<number>`count(*)::int` }).from(channelPosts).where(eq(channelPosts.sourceHandle, handle));
    if (!used?.n) await db.delete(sources).where(eq(sources.handle, handle));
  }
}

/** Channels run by one shaykh: a post there is about him even when it does not name him. */
const OWN_CHANNEL: Record<string, RegExp> = {
  sualruhaily: /Sulayman.*Ruhayli/i,
  twijri: /Ali.*Tuwaijri/i,
  rehyli: /Ibrahim.*Ruhayli/i,
  dr_maherkhujah: /Mahir.*Khujah/i,
  dr_elbukhary: /Abdullah.*Bukhari/i,
  sohaymi: /Salih.*Suhaymi/i,
  abo3omr_alarjon: /Abdulaziz.*Arjun/i,
};

export const isOwnChannel = (handle: string, shaykhEn: string): boolean => OWN_CHANNEL[handle.toLowerCase()]?.test(shaykhEn) ?? false;
