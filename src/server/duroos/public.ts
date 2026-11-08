import type { AnnouncementRow, OverrideRow, ScheduleRow, StreamRef } from "./queries";

/**
 * What the public API (/api/v1) is allowed to say. Rows are never serialized whole:
 * sources, origins, internal ids and research wording stay inside.
 */
export function publicLesson(l: ScheduleRow) {
  return {
    slug: l.slug,
    shaykh: { slug: l.shaykh.slug, nameEn: l.shaykh.nameEn, nameAr: l.shaykh.nameAr, photo: l.shaykh.photo },
    masjid: { id: l.masjid.id, nameEn: l.masjid.nameEn, nameAr: l.masjid.nameAr, shortEn: l.masjid.shortEn, shortAr: l.masjid.shortAr },
    bookEn: l.bookEn,
    bookAr: l.bookAr,
    bookAuthorEn: l.bookAuthorEn,
    bookAuthorAr: l.bookAuthorAr,
    bookUrl: l.bookUrl,
    topic: l.topic,
    prayer: l.prayer,
    days: l.days,
    daysLabelEn: l.daysLabelEn,
    daysLabelAr: l.daysLabelAr,
    locationEn: l.locationEn,
    locationAr: l.locationAr,
    audience: l.audience,
    status: l.status,
    validFrom: l.validFrom,
    validTo: l.validTo,
  };
}

export function publicOverride(o: OverrideRow) {
  return {
    kind: o.kind,
    startsOn: o.startsOn,
    endsOn: o.endsOn,
    noteEn: o.noteEn,
    noteAr: o.noteAr,
    createdAt: o.createdAt,
    revokedAt: o.revokedAt,
  };
}

export function publicAnnouncement(a: AnnouncementRow) {
  return {
    slug: a.slug,
    type: a.type,
    titleEn: a.titleEn,
    titleAr: a.titleAr,
    bodyEn: a.bodyEn,
    bodyAr: a.bodyAr,
    eventDate: a.eventDate,
    imageUrl: a.imageUrl,
    postedAt: a.postedAt,
    status: a.status,
  };
}

export function publicStream(s: StreamRef | null) {
  return s ? { url: s.url, kind: s.kind, isLive: s.isLive, liveUrl: s.liveUrl, labelEn: s.labelEn ?? null, labelAr: s.labelAr ?? null } : null;
}
