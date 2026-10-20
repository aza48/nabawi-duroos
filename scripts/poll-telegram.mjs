#!/usr/bin/env node
/**
 * poll-telegram.mjs — polls the public Telegram channel previews
 * (t.me/s/<channel>) for the Duroos Aggregator sources and records
 * newly seen posts into data/pending.json for admin review.
 *
 * No Telegram account login is used anywhere — these are all
 * public web previews. Run: `node scripts/poll-telegram.mjs`
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const CHANNELS = [
  "drosalmadina",
  "khizana_62",
  "sohaymi",
  "dr_maherkhujah",
  "Sulalruhaily",
  "twijri",
];

const OUT = "data/pending.json";

async function loadState() {
  try {
    const raw = await readFile(OUT, "utf8");
    return JSON.parse(raw);
  } catch {
    return { seen: {}, pending: [], updatedAt: null };
  }
}

function extractPosts(html, channel) {
  // Public preview pages expose messages as tgme_widget_message blocks;
  // each carries a data-post attribute like "drosalmadina/12345".
  const posts = [];
  const re = /data-post="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    posts.push({
      id: m[1],
      channel,
      url: `https://t.me/${m[1]}`,
    });
  }
  return posts;
}

async function main() {
  const state = await loadState();
  const fresh = [];

  for (const channel of CHANNELS) {
    const url = `https://t.me/s/${channel}`;
    let html;
    try {
      const res = await fetch(url, {
        headers: { "user-agent": "duroos-aggregator-poll/1.0" },
      });
      if (!res.ok) {
        console.warn(`[poll] ${channel}: HTTP ${res.status}, skipped`);
        continue;
      }
      html = await res.text();
    } catch (err) {
      console.warn(`[poll] ${channel}: fetch failed (${err.message}), skipped`);
      continue;
    }

    for (const post of extractPosts(html, channel)) {
      if (!state.seen[post.id]) {
        state.seen[post.id] = new Date().toISOString();
        fresh.push({ ...post, discoveredAt: new Date().toISOString(), status: "pending" });
      }
    }
    console.log(`[poll] ${channel}: ok`);
  }

  if (fresh.length > 0) {
    state.pending = [...fresh, ...state.pending];
    console.log(`[poll] ${fresh.length} new post(s) queued for admin review`);
  } else {
    console.log("[poll] no new posts");
  }

  state.updatedAt = new Date().toISOString();
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(state, null, 2) + "\n", "utf8");
}

main().catch((err) => {
  console.error("[poll] fatal:", err);
  process.exit(1);
});
