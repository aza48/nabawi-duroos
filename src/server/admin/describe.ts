import type { AuditRow } from "./audit";

const KIND_VERB: Record<string, string> = {
  cancelled: "cancelled",
  postponed: "postponed",
  moved: "moved",
  resumed: "marked as resumed",
  guest: "added a guest for",
  new_book: "noted a new book for",
  book_finished: "marked the book finished for",
  note: "added a note to",
};

const KIND_NOUN: Record<string, string> = {
  cancelled: "cancellation", postponed: "postponement", moved: "move", resumed: "resumption",
  guest: "guest note", new_book: "new book note", book_finished: "finished book note", note: "note",
};

const ENTITY_LABEL: Record<string, string> = {
  lesson: "lesson",
  shaykh: "shaykh profile",
  override: "lesson change",
  announcement: "update",
  faq: "answer",
  guide: "guide",
  setting: "setting",
  admin: "admin",
};

/** "2026-11-12" reads as "Thu 12 Nov". */
function day(iso: unknown): string {
  const t = Date.parse(`${String(iso)}T12:00:00Z`);
  if (Number.isNaN(t)) return String(iso);
  return new Date(t).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}

const article = (word: string) => (/^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`);

/** The name people know an item by: a title, a question, a book, never a slug when there is a choice. */
function nameOf(...snaps: Record<string, unknown>[]): string | null {
  for (const x of snaps) {
    const n = x.titleEn ?? x.title ?? x.question ?? x.bookEn ?? x.nameEn ?? x.lessonLabel;
    if (typeof n === "string" && n.trim()) return n;
  }
  return null;
}

/** Plain-English line for the activity feed, e.g. "Bilal cancelled Dalil al-Talib on Thu 12 Nov". */
export function describeActivity(r: AuditRow): string {
  const who = r.actorName ?? "Someone";
  const after = (r.after ?? {}) as Record<string, unknown>;
  const before = (r.before ?? {}) as Record<string, unknown>;
  const label = ENTITY_LABEL[r.entity] ?? r.entity;
  if (r.action === "undo") {
    // An undo row stores the undone version as `before`: name the item from either side.
    const n = nameOf(before, after);
    return n ? `${who} undid a change to the ${label} "${n}"` : `${who} undid a change to ${article(label)}`;
  }
  if (r.entity === "override" && r.action === "create") {
    const date = after.startsOn === after.endsOn ? `on ${day(after.startsOn)}` : `from ${day(after.startsOn)} to ${day(after.endsOn)}`;
    return `${who} ${KIND_VERB[String(after.kind)] ?? "changed"} ${after.lessonLabel ?? after.lessonSlug ?? "a lesson"} ${date}`;
  }
  if (r.entity === "override" && after.revokedAt) {
    const noun = KIND_NOUN[String(after.kind)] ?? "change";
    return `${who} withdrew the ${noun} on ${day(after.startsOn)}`;
  }
  if (r.entity === "setting") return `${who} changed the ${r.entityId.replace(/_/g, " ")}`;
  if (r.entity === "admin") {
    if (r.entityId.startsWith("invite:") && after.email) return `${who} invited ${after.email} as ${String(after.role).replace("_", " ")}`;
    if (r.action === "create" && after.name) return `${after.name} joined as ${String(after.role).replace("_", " ")}`;
    return `${who} changed an admin's access`;
  }
  const name = nameOf(after, before) ?? r.entityId;
  if (r.entity === "announcement" && after.status === "published" && before.status !== "published") return `${who} published "${name}"`;
  if (r.entity === "announcement" && after.status === "archived" && before.status !== "archived") return `${who} took down "${name}"`;
  const verb = r.action === "create" ? "added" : r.action === "delete" ? "deleted" : "edited";
  return `${who} ${verb} the ${label} "${name}"`;
}

export function isUndoable(r: AuditRow): boolean {
  return !r.undoneAt && r.action !== "undo" && r.entity !== "admin";
}
