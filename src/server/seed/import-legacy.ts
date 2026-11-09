import { count, eq } from "drizzle-orm";
import type { Db } from "@/server/db/client";
import { announcements, events, lessons, masjids, shaykhs, streams } from "@/server/db/schema";
import { getSetting, setSetting, WHATSAPP_INVITE_DEFAULT } from "@/server/settings";
import { hijriIsoBounds } from "@/lib/time/hijri";
import { cleanRow } from "@/lib/text";
import { importOldMesh } from "./import-old-mesh";
import { syncContent2026 } from "./content/sync";
import { syncBookLinks } from "./content/book-links";
import { syncAlMidad } from "./content/al-midad";
import { seedSources } from "@/server/watcher/sources";
import { LESSONS } from "./legacy/lessons";
import { SHAYKH_PROFILES } from "./legacy/profiles";
import { ANNOUNCEMENTS } from "./legacy/announcements";
import { EVENTS } from "./legacy/events";
import { DAR_HIJRAH_STREAM, GENERAL_TELEGRAM, NABAWI_YOUTUBE, SHAYKH_TELEGRAM } from "./legacy/streams";
import { MASHAYIKH_POSITIONS } from "./content/mashayikh";
import { MASJIDS } from "./legacy/types";

/** "Prof. Dr. Sulayman ibn Saleemullah al-Ruhayli" → "sulayman-ibn-saleemullah-al-ruhayli" */
export function shaykhSlug(nameEn: string): string {
  return nameEn
    .replace(/^(Prof\.\s*)?(Dr\.\s*)?(Shaykh\s+)?/i, "")
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/['’`]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const TYPE_LABEL_EN: Record<string, string> = {
  cancellation: "Lesson cancelled",
  postponement: "Lesson postponed",
  resumption: "Lessons resume",
  "new-book": "New book",
  "book-finished": "Book completed",
  reminder: "Reminder",
  info: "Notice",
  guest: "Guest lesson",
  lecture: "Lecture",
};
const TYPE_LABEL_AR: Record<string, string> = {
  cancellation: "اعتذار عن الدرس",
  postponement: "تأجيل الدرس",
  resumption: "استئناف الدروس",
  "new-book": "كتاب جديد",
  "book-finished": "ختم كتاب",
  reminder: "تذكير",
  info: "إعلان",
  guest: "درس ضيف",
  lecture: "محاضرة",
};

export async function importLegacy(db: Db) {
  // Masjids
  let sort = 0;
  for (const [id, m] of Object.entries(MASJIDS)) {
    const v = cleanRow({ id, nameEn: m.en, nameAr: m.ar, shortEn: m.short.en, shortAr: m.short.ar, sort: sort++ });
    await db.insert(masjids).values(v).onConflictDoUpdate({ target: masjids.id, set: v });
  }

  // Shaykhs (deduplicated by Arabic name; first English spelling wins)
  const shaykhIdByAr = new Map<string, number>();
  for (const l of LESSONS) {
    if (shaykhIdByAr.has(l.shaykh.ar)) continue;
    const p = SHAYKH_PROFILES[l.shaykh.ar];
    const slug = shaykhSlug(l.shaykh.en);
    // Current positions (sourced, see docs/research/mashayikh-positions-2026-11.md) win over the older profile lines.
    const pos = MASHAYIKH_POSITIONS[slug];
    const v = cleanRow({
      slug,
      nameEn: pos?.nameEn ?? l.shaykh.en,
      nameAr: pos?.nameAr ?? l.shaykh.ar,
      photo: p?.photo ?? null,
      roleEn: pos?.roleEn ?? p?.role.en ?? null,
      roleAr: pos?.roleAr ?? p?.role.ar ?? null,
      facts: pos?.facts ?? p?.facts ?? [],
    });
    const [row] = await db
      .insert(shaykhs)
      .values(v)
      .onConflictDoNothing({ target: shaykhs.slug })
      .returning({ id: shaykhs.id });
    const id = row?.id ?? (await db.select({ id: shaykhs.id }).from(shaykhs).where(eq(shaykhs.slug, v.slug)))[0]?.id;
    if (id) shaykhIdByAr.set(l.shaykh.ar, id);
  }

  // Lessons
  const qubaFrom = hijriIsoBounds(1448, 4, 1);
  const qubaTo = hijriIsoBounds(1448, 6, 30);
  const lessonIdBySlug = new Map<string, number>();
  for (const [i, l] of LESSONS.entries()) {
    const v = cleanRow({
      slug: l.id,
      shaykhId: shaykhIdByAr.get(l.shaykh.ar)!,
      masjidId: l.masjid,
      bookEn: l.book.en,
      bookAr: l.book.ar,
      bookAuthorEn: l.bookAuthor?.en ?? null,
      bookAuthorAr: l.bookAuthor?.ar ?? null,
      topic: l.topic,
      prayer: l.prayer,
      days: [...l.days],
      daysLabelEn: l.daysLabel?.en ?? null,
      daysLabelAr: l.daysLabel?.ar ?? null,
      frequencyEn: l.frequency?.en ?? null,
      frequencyAr: l.frequency?.ar ?? null,
      timeLabelEn: l.timeLabel?.en ?? null,
      timeLabelAr: l.timeLabel?.ar ?? null,
      prayerNoteEn: l.prayerNote?.en ?? null,
      prayerNoteAr: l.prayerNote?.ar ?? null,
      locationEn: l.location.en,
      locationAr: l.location.ar,
      noteEn: l.note?.en ?? null,
      noteAr: l.note?.ar ?? null,
      sequenceEn: l.sequence?.en ?? null,
      sequenceAr: l.sequence?.ar ?? null,
      // Legacy cancelled/paused/guest states were day-specific notes; the weekly lesson itself stays active.
      status: "active" as const,
      validFrom: l.masjid === "quba" ? qubaFrom : null,
      validTo: l.masjid === "quba" ? qubaTo : null,
      sort: i,
    });
    const [row] = await db
      .insert(lessons)
      .values(v)
      .onConflictDoNothing({ target: lessons.slug })
      .returning({ id: lessons.id });
    const id = row?.id ?? (await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.slug, v.slug)))[0]?.id;
    if (id) lessonIdBySlug.set(l.id, id);
  }

  // Announcements (historic feed)
  for (const a of ANNOUNCEMENTS) {
    const shaykhId = shaykhIdByAr.get(a.shaykh.ar) ?? null;
    const posted = Date.parse(a.postedGregorian.en);
    const v = cleanRow({
      slug: a.id,
      shaykhId,
      guestNameEn: shaykhId ? null : a.shaykh.en,
      guestNameAr: shaykhId ? null : a.shaykh.ar,
      masjidId: a.masjidId ?? null,
      type: a.type,
      titleEn: `${TYPE_LABEL_EN[a.type] ?? "Notice"}: ${a.shaykh.en}`,
      titleAr: `${TYPE_LABEL_AR[a.type] ?? "إعلان"}: ${a.shaykh.ar}`,
      bodyEn: a.text.en,
      bodyAr: a.text.ar,
      eventDate: a.eventDate ?? null,
      imageUrl: a.image ?? null,
      sourceHandle: a.source,
      sourceUrl: a.source.startsWith("@") ? `https://t.me/${a.source.slice(1)}` : null,
      postedAt: Number.isNaN(posted) ? new Date() : new Date(posted),
      status: a.expired ? ("archived" as const) : ("published" as const),
      publishedAt: Number.isNaN(posted) ? new Date() : new Date(posted),
    });
    await db.insert(announcements).values(v).onConflictDoNothing({ target: announcements.slug });
  }

  // Past events
  for (const e of EVENTS) {
    const v = cleanRow({
      slug: e.id,
      masjidId: e.masjid,
      kind: e.kind,
      titleEn: e.title.en,
      titleAr: e.title.ar,
      shaykhEn: e.shaykh?.en ?? null,
      shaykhAr: e.shaykh?.ar ?? null,
      hijriLabelEn: e.hijriDate.en,
      hijriLabelAr: e.hijriDate.ar,
      prayerLabelEn: e.prayer?.en ?? null,
      prayerLabelAr: e.prayer?.ar ?? null,
      startsOn: e.dateIso,
      endsOn: e.endIso,
      sourceUrl: e.source,
    });
    await db.insert(events).values(v).onConflictDoUpdate({ target: events.slug, set: v });
  }

  // Streams and channel link-outs
  const streamRows: (typeof streams.$inferInsert)[] = ([
    {
      slug: "nabawi-youtube",
      labelEn: NABAWI_YOUTUBE.channelName.en,
      labelAr: NABAWI_YOUTUBE.channelName.ar,
      kind: "youtube",
      url: NABAWI_YOUTUBE.liveUrl,
      checkUrl: NABAWI_YOUTUBE.liveUrl,
      masjidId: "nabawi",
    },
    {
      slug: "dar-hijrah-telegram",
      labelEn: `Telegram ${DAR_HIJRAH_STREAM.handle}`,
      labelAr: `تيليجرام ${DAR_HIJRAH_STREAM.handle}`,
      kind: "telegram",
      url: DAR_HIJRAH_STREAM.url,
      masjidId: "dar-hijrah",
    },
    ...GENERAL_TELEGRAM.map((c) => ({
      slug: `tg-${slugify(c.handle)}`,
      labelEn: c.name.en,
      labelAr: c.name.ar,
      kind: "telegram" as const,
      url: c.url,
    })),
    ...Object.entries(SHAYKH_TELEGRAM)
      .filter(([ar]) => shaykhIdByAr.has(ar))
      .map(([ar, c]) => ({
        slug: `tg-${slugify(c.handle)}`,
        labelEn: `Telegram ${c.handle}`,
        labelAr: `تيليجرام ${c.handle}`,
        kind: "telegram" as const,
        url: c.url,
        shaykhId: shaykhIdByAr.get(ar)!,
      })),
  ] as (typeof streams.$inferInsert)[]).map((r) => cleanRow(r));
  for (const s of streamRows) {
    await db.insert(streams).values(s).onConflictDoNothing({ target: streams.slug });
  }

  await importOldMesh(db);
  await syncContent2026(db);
  await syncBookLinks(db);
  await syncAlMidad(db);
  await seedSources(db);

  if ((await getSetting(db, "whatsapp_invite_url")) === null) {
    await setSetting(db, "whatsapp_invite_url", WHATSAPP_INVITE_DEFAULT);
  }

  const [m] = await db.select({ n: count() }).from(masjids);
  const [s] = await db.select({ n: count() }).from(shaykhs);
  const [l] = await db.select({ n: count() }).from(lessons);
  const [a] = await db.select({ n: count() }).from(announcements);
  const [e] = await db.select({ n: count() }).from(events);
  const [st] = await db.select({ n: count() }).from(streams);
  return { masjids: m.n, shaykhs: s.n, lessons: l.n, announcements: a.n, events: e.n, streams: st.n };
}
