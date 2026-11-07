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

/** Plain-English line for the activity feed, e.g. "Bilal cancelled ruh-dalil on 2026-11-12". */
export function describeActivity(r: AuditRow): string {
  const who = r.actorName ?? "Someone";
  const after = (r.after ?? {}) as Record<string, unknown>;
  const before = (r.before ?? {}) as Record<string, unknown>;
  if (r.action === "undo") return `${who} undid a change to a ${ENTITY_LABEL[r.entity] ?? r.entity}`;
  if (r.entity === "override" && r.action === "create") {
    const date = after.startsOn === after.endsOn ? `on ${after.startsOn}` : `from ${after.startsOn} to ${after.endsOn}`;
    return `${who} ${KIND_VERB[String(after.kind)] ?? "changed"} ${after.lessonSlug ?? "a lesson"} ${date}`;
  }
  if (r.entity === "override" && after.revokedAt) return `${who} withdrew a lesson change`;
  const name = (after.titleEn ?? after.title ?? after.question ?? after.bookEn ?? after.nameEn ?? before.titleEn ?? r.entityId) as string;
  const verb = r.action === "create" ? "added" : r.action === "delete" ? "deleted" : "edited";
  if (r.entity === "announcement" && after.status === "published" && before.status !== "published") return `${who} published "${name}"`;
  if (r.entity === "setting") return `${who} changed the ${r.entityId.replace(/_/g, " ")}`;
  if (r.entity === "admin") return `${who} changed an admin's access`;
  return `${who} ${verb} the ${ENTITY_LABEL[r.entity] ?? r.entity} "${name}"`;
}

export function isUndoable(r: AuditRow): boolean {
  return !r.undoneAt && r.action !== "undo" && r.entity !== "admin";
}
