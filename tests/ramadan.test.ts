import { describe, expect, it } from "vitest";
import { ramadanMode, ramadanNow, type RamadanSettings } from "@/features/home/ramadan";
import { pluralVerb } from "@/features/home/TodayHero";
import { prayerTimes } from "@/lib/time/prayer";

const ms = (iso: string) => new Date(iso).getTime();
const day = (iso: string) => {
  const m = ramadanMode(iso);
  if (m?.kind !== "ramadan") throw new Error(`expected Ramadan on ${iso}`);
  return m;
};

describe("Ramadan mode (D4), fixed dates of Ramadan 1448", () => {
  it("is off outside Ramadan, its eve and Eid", () => {
    expect(ramadanMode("2027-02-06")).toBeNull(); // 29 Shaban
    expect(ramadanMode("2027-03-10")).toBeNull(); // 2 Shawwal
    expect(ramadanMode("2026-11-09")).toBeNull();
  });

  it("knows the day, the eve of Ramadan and the eve of Eid", () => {
    expect(ramadanMode("2027-02-07")).toMatchObject({ kind: "eve" }); // 30 Shaban
    expect(ramadanMode("2027-02-08")).toMatchObject({ kind: "ramadan", day: 1, eidTomorrow: false });
    expect(ramadanMode("2027-03-08")).toMatchObject({ day: 29, eidTomorrow: true });
    expect(ramadanMode("2027-03-09")).toEqual({ kind: "eid", eidPrayerAt: null });
  });

  it("uses the adhan times, with Isha at Maghrib plus 120 minutes", () => {
    const m = day("2027-02-15");
    const t = prayerTimes("2027-02-15");
    expect(m.iftarAt).toBe(t.maghrib.toISOString());
    expect(m.suhoorEndsAt).toBe(t.fajr.toISOString());
    expect(m.nextSuhoorEndsAt).toBe(prayerTimes("2027-02-16").fajr.toISOString());
    expect((ms(m.ishaAt) - ms(m.iftarAt)) / 60_000).toBe(120);
  });

  it("counts to the end of suhoor before Fajr, to iftar by day, and to the next suhoor after Maghrib", () => {
    const m = day("2027-02-22"); // 15 Ramadan
    expect(ramadanNow(m, ms(m.suhoorEndsAt) - 2 * 3600_000).countdown).toEqual({ to: "suhoor", at: m.suhoorEndsAt }); // 02:30 or so
    expect(ramadanNow(m, ms(m.suhoorEndsAt) + 60_000).countdown).toEqual({ to: "iftar", at: m.iftarAt });
    expect(ramadanNow(m, ms(m.iftarAt) - 60_000).countdown).toEqual({ to: "iftar", at: m.iftarAt });
    expect(ramadanNow(m, ms(m.iftarAt) + 60_000)).toMatchObject({ countdown: { to: "suhoor", at: m.nextSuhoorEndsAt }, taraweeh: true });
  });

  it("starts the last ten nights at Maghrib on the 20th", () => {
    const d20 = day("2027-02-27");
    expect(ramadanNow(d20, ms(d20.iftarAt) - 60_000).lastTen).toBe(false);
    expect(ramadanNow(d20, ms(d20.iftarAt) + 60_000).lastTen).toBe(true);
    const d21 = day("2027-02-28");
    expect(ramadanNow(d21, ms(d21.suhoorEndsAt) + 60_000).lastTen).toBe(true);
  });

  it("has no suhoor or Taraweeh on the eve of Eid", () => {
    const m = day("2027-03-08");
    expect(ramadanNow(m, ms(m.iftarAt) - 60_000)).toMatchObject({ countdown: { to: "iftar" }, taraweeh: false, lastTen: true });
    expect(ramadanNow(m, ms(m.iftarAt) + 60_000)).toEqual({ countdown: null, taraweeh: false, lastTen: false, eidTonight: true });
  });

  it("opens Ramadan at Maghrib on its eve, with Taraweeh and the first suhoor", () => {
    const eve = ramadanMode("2027-02-07");
    if (eve?.kind !== "eve") throw new Error("expected the eve");
    expect(ramadanNow(eve, ms(eve.iftarAt) - 60_000).countdown).toBeNull();
    expect(ramadanNow(eve, ms(eve.iftarAt) + 60_000)).toMatchObject({ countdown: { to: "suhoor", at: eve.nextSuhoorEndsAt }, taraweeh: true });
  });

  it("shows only what the owner has confirmed", () => {
    const set: RamadanSettings = { tahajjud: { en: "1:00 AM", ar: "١:٠٠ ص" }, eidPrayerAt: "2027-03-09T03:30:00.000Z", duroosNote: null };
    expect(ramadanMode("2027-03-08", set)).toMatchObject({ settings: set });
    expect(ramadanMode("2027-03-09", set)).toEqual({ kind: "eid", eidPrayerAt: set.eidPrayerAt });
  });
});

describe("Arabic verb before a counted subject", () => {
  it("is feminine with a plural of 3 to 10, masculine otherwise", () => {
    expect(pluralVerb(1, "أُلغي", "أُلغيت")).toBe("أُلغي");
    expect(pluralVerb(2, "أُلغي", "أُلغيت")).toBe("أُلغي");
    expect(pluralVerb(3, "أُلغي", "أُلغيت")).toBe("أُلغيت");
    expect(pluralVerb(10, "أُلغي", "أُلغيت")).toBe("أُلغيت");
    expect(pluralVerb(11, "أُلغي", "أُلغيت")).toBe("أُلغي");
  });
});
