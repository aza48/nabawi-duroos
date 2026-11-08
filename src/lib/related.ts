/** Picks the guides and answers most related to a page, by shared words, tags and section. */

export type RelItem = { slug: string; title: string; text: string; group: string; tags?: string[] };

const STOP = new Set(
  "a an and are as at be by can do does for from get go has have how i if in into is it its me my of on or our so the their them then there this to up we what when where which who why will with you your about after before do not no yes all any more most new one two use used using madinah medina saudi arabia islamic university iu student students step document need take time day first also just only like make get getting usually".split(
    " "
  )
);
/** University questions sit with the study guides. */
const SAME_GROUP: Record<string, string> = { university: "study", study: "study" };

function words(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/<[^>]+>/g, " ")
      .replace(/[^a-z0-9؀-ۿ\s]/g, " ")
      .split(/\s+/)
      .map((w) => (w.length > 4 && w.endsWith("s") ? w.slice(0, -1) : w))
      .filter((w) => w.length > 2 && !STOP.has(w))
  );
}

/** The `limit` items most like `me`, best first. Items with nothing in common are left out. */
export function related(me: RelItem, pool: RelItem[], limit = 4): RelItem[] {
  const mine = words(`${me.title} ${me.title} ${me.text}`);
  const myTags = new Set(me.tags ?? []);
  const myGroup = SAME_GROUP[me.group] ?? me.group;
  return pool
    .filter((o) => o.slug !== me.slug)
    .map((o) => {
      const theirs = words(`${o.title} ${o.text}`);
      const titleWords = words(o.title);
      let score = 0;
      for (const w of theirs) if (mine.has(w)) score += titleWords.has(w) ? 2 : 1;
      for (const t of o.tags ?? []) if (myTags.has(t)) score += 3;
      // Sharing a section only helps once there is real overlap in words or tags.
      const overlap = score;
      if ((SAME_GROUP[o.group] ?? o.group) === myGroup) score += 2;
      return { o, score, overlap };
    })
    .filter((x) => x.overlap >= 2 && x.score >= 3)
    .sort((a, b) => b.score - a.score || a.o.title.localeCompare(b.o.title))
    .slice(0, limit)
    .map((x) => x.o);
}
