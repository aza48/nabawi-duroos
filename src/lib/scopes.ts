import { LESSONS } from "../data/lessons";
import { Lesson, Localized, MasjidId, Prayer } from "./types";

/**
 * Subscription scopes — the single source of truth shared by the public UI,
 * the /manage page, the admin announcement form and the email fan-out.
 *
 * - Shaykh scope id: "shaykh:<slug>" where the slug is derived deterministically
 *   from the shaykh's English name in lessons.ts (titles stripped). A shaykh is
 *   identified across masjids by his Arabic name (the same key the UI uses).
 * - Book scope id: the lesson's own stable `id` from lessons.ts. Each lesson row
 *   is one book/course, so the lesson id is the most stable book identifier
 *   already present in the data model.
 */

export type ScopeType = "shaykh" | "book";

export interface ShaykhScope {
  id: string;
  name: Localized;
  masjids: MasjidId[];
}

export interface BookScope {
  id: string; // lesson id
  shaykhId: string;
  shaykh: Localized;
  book: Localized;
  masjid: MasjidId;
  prayer: Prayer;
}

export function shaykhScopeId(shaykh: Localized): string {
  const slug = shaykh.en
    .replace(/^(Prof\.\s*Dr\.|Dr\.|Shaykh)\s+/i, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `shaykh:${slug}`;
}

export function lessonShaykhScopeId(lesson: Lesson): string {
  return shaykhScopeId(lesson.shaykh);
}

let _shaykhs: ShaykhScope[] | null = null;
export function listShaykhScopes(): ShaykhScope[] {
  if (_shaykhs) return _shaykhs;
  const byName = new Map<string, ShaykhScope>();
  for (const l of LESSONS) {
    const id = shaykhScopeId(l.shaykh);
    const cur = byName.get(l.shaykh.ar);
    if (cur) {
      if (!cur.masjids.includes(l.masjid)) cur.masjids.push(l.masjid);
    } else {
      byName.set(l.shaykh.ar, { id, name: l.shaykh, masjids: [l.masjid] });
    }
  }
  _shaykhs = Array.from(byName.values());
  return _shaykhs;
}

let _books: BookScope[] | null = null;
export function listBookScopes(): BookScope[] {
  if (_books) return _books;
  _books = LESSONS.map((l) => ({
    id: l.id,
    shaykhId: shaykhScopeId(l.shaykh),
    shaykh: l.shaykh,
    book: l.book,
    masjid: l.masjid,
    prayer: l.prayer,
  }));
  return _books;
}

export function findShaykhScope(id: string): ShaykhScope | undefined {
  return listShaykhScopes().find((s) => s.id === id);
}

export function findBookScope(id: string): BookScope | undefined {
  return listBookScopes().find((b) => b.id === id);
}

export function isValidScope(scopeType: string, scopeId: string): boolean {
  if (scopeType === "shaykh") return !!findShaykhScope(scopeId);
  if (scopeType === "book") return !!findBookScope(scopeId);
  return false;
}

/**
 * Sentinel shaykh_id for announcements by a guest / one-off speaker who has
 * no standing lesson and therefore no subscription scope. The display name is
 * stored on the announcement row itself (shaykh_name_ar / shaykh_name_en);
 * the publish fan-out simply matches no subscribers for this scope.
 */
export const GUEST_SHAYKH_ID = "guest";

/** Display name for a DB announcement's shaykh: the stored guest name when
 *  present, otherwise the subscription scope's name, otherwise the raw id. */
export function dbShaykhName(row: {
  shaykh_id: string;
  shaykh_name_ar?: string | null;
  shaykh_name_en?: string | null;
}): Localized {
  if (row.shaykh_name_ar || row.shaykh_name_en) {
    return {
      ar: row.shaykh_name_ar ?? (row.shaykh_name_en as string),
      en: row.shaykh_name_en ?? (row.shaykh_name_ar as string),
    };
  }
  return findShaykhScope(row.shaykh_id)?.name ?? { ar: row.shaykh_id, en: row.shaykh_id };
}
