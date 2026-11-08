import { describe, expect, it } from "vitest";
import { publicAnnouncement, publicLesson, publicOverride } from "@/server/duroos/public";

describe("public API shapes", () => {
  it("never carries sources, origins or internal ids", () => {
    const o = publicOverride({
      id: 1, lessonId: 2, kind: "cancelled", startsOn: "2026-11-08", endsOn: "2026-11-08", noteEn: "x", noteAr: null,
      sourceUrl: "https://t.me/c/1", origin: "watcher_auto", createdAt: new Date(), revokedAt: null, createdBy: "system",
    } as never);
    for (const k of ["sourceUrl", "origin", "lessonId", "id", "createdBy"]) expect(o).not.toHaveProperty(k);

    const a = publicAnnouncement({
      slug: "s", type: "cancel", titleEn: "t", titleAr: "ت", bodyEn: "b", bodyAr: "ب", eventDate: null, imageUrl: null,
      postedAt: new Date(), status: "published", sourceHandle: "@x", sourceUrl: "https://t.me/x", id: 3, shaykhId: 1,
      lessonId: 1, masjidId: "nabawi", guestNameEn: null, guestNameAr: null, publishedAt: null,
    } as never);
    for (const k of ["sourceHandle", "sourceUrl", "id", "lessonId"]) expect(a).not.toHaveProperty(k);

    const l = publicLesson({
      slug: "l", shaykh: { slug: "s", nameEn: "n", nameAr: "ن", photo: null },
      masjid: { id: "nabawi", nameEn: "N", nameAr: "ن", shortEn: "N", shortAr: "ن" },
      bookEn: "b", bookAr: "ب", bookAuthorEn: null, bookAuthorAr: null, bookUrl: null, topic: "fiqh", prayer: "asr", days: [1],
      daysLabelEn: null, daysLabelAr: null, locationEn: "x", locationAr: "س", audience: "all", status: "active", validFrom: null, validTo: null,
      timeLabelEn: "research wording", prayerNoteEn: "internal", noteEn: "internal", sequenceEn: "internal", id: 9, shaykhId: 1, masjidId: "nabawi", sort: 0,
    } as never);
    for (const k of ["timeLabelEn", "prayerNoteEn", "noteEn", "sequenceEn", "id", "shaykhId"]) expect(l).not.toHaveProperty(k);
  });
});
