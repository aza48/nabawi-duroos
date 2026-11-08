/**
 * The big dates of the year: the Islamic University calendar for 1448 and the
 * Islamic dates (Umm al-Qura). Shown as live countdowns.
 */
export type KeyDate = {
  id: string;
  title: string;
  titleAr: string;
  kind: "exams" | "holiday" | "study" | "islamic" | "deadline";
  /** Inclusive, Madinah dates. */
  start: string;
  end?: string;
  hijri: string;
  /** Shown while it's happening, e.g. what comes after it. */
  after?: string;
  note?: string;
  /** Admin windows (requests, drop and add). Shown on the calendar page, not on the home card. */
  minor?: true;
  term?: "first" | "second" | "summer";
};

export const KEY_DATES: KeyDate[] = [
  { id: "postpone-1", kind: "deadline", minor: true, term: "first", title: "Postponing your studies (ta'jeel)", titleAr: "طلبات تأجيل الدراسة", start: "2026-08-02", end: "2026-09-01", hijri: "19 Safar to 19 Rabi al-Awwal 1448" },
  { id: "drop-add-1", kind: "deadline", minor: true, term: "first", title: "Drop, add and change sections", titleAr: "الحذف والإضافة وتغيير الشعب", start: "2026-08-10", end: "2026-08-30", hijri: "27 Safar to 17 Rabi al-Awwal 1448" },
  { id: "withdraw-uni-1", kind: "deadline", minor: true, term: "first", title: "Requests to withdraw from the University", titleAr: "طلبات الانسحاب من الجامعة", start: "2026-08-09", end: "2026-11-28", hijri: "26 Safar to 18 Jumada al-Akhirah 1448" },
  { id: "excuse-1", kind: "deadline", minor: true, term: "first", title: "Excuse from the semester, or drop a course", titleAr: "طلبات الاعتذار عن الفصل والانسحاب من مقرر", start: "2026-08-16", end: "2026-11-06", hijri: "3 Rabi al-Awwal to 26 Jumada al-Ula 1448", },
  { id: "reenrol-1", kind: "deadline", minor: true, term: "first", title: "Re-enrolment requests", titleAr: "طلبات إعادة الانتظام", start: "2026-09-06", end: "2026-10-22", hijri: "24 Rabi al-Awwal to 11 Jumada al-Ula 1448" },
  { id: "extra-chance", kind: "deadline", minor: true, term: "second", title: "Extra chance requests for dismissed students", titleAr: "طلبات الفرص الإضافية للمفصولين أكاديميًا", start: "2026-12-11", end: "2026-12-14", hijri: "2 to 5 Rajab 1448" },
  { id: "postpone-2", kind: "deadline", minor: true, term: "second", title: "Postponing your studies (ta'jeel) or an internal transfer", titleAr: "طلبات تأجيل الدراسة والتحويل الداخلي", start: "2026-12-13", end: "2026-12-19", hijri: "4 to 10 Rajab 1448" },
  { id: "drop-add-2", kind: "deadline", minor: true, term: "second", title: "Drop, add and change sections", titleAr: "الحذف والإضافة وتغيير الشعب", start: "2026-12-17", end: "2026-12-21", hijri: "8 to 12 Rajab 1448" },
  { id: "withdraw-uni-2", kind: "deadline", minor: true, term: "second", title: "Requests to withdraw from the University", titleAr: "طلبات الانسحاب من الجامعة", start: "2026-12-17", end: "2027-04-24", hijri: "8 Rajab to 17 Dhul Qa'dah 1448" },
  { id: "excuse-2", kind: "deadline", minor: true, term: "second", title: "Excuse from the semester, or drop a course", titleAr: "طلبات الاعتذار عن الفصل والانسحاب من مقرر", start: "2026-12-20", end: "2027-03-13", hijri: "11 Rajab to 5 Shawwal 1448" },
  { id: "reenrol-2", kind: "deadline", minor: true, term: "second", title: "Re-enrolment requests for next semester", titleAr: "طلبات إعادة الانتظام للفصل القادم", start: "2027-01-24", end: "2027-04-11", hijri: "16 Sha'ban to 4 Dhul Qa'dah 1448" },
  { id: "summer-start", kind: "study", minor: true, term: "summer", title: "Summer semester classes begin", titleAr: "بداية الدراسة للفصل الصيفي", start: "2027-06-06", hijri: "1 Muharram 1449" },
  { id: "summer-finals", kind: "exams", minor: true, term: "summer", title: "Summer semester final exams", titleAr: "الاختبارات النهائية للفصل الصيفي", start: "2027-07-27", hijri: "23 Safar 1449" },
  { id: "finals-1", term: "first", kind: "exams", title: "First-semester final exams", titleAr: "الاختبارات النهائية", start: "2026-11-29", end: "2026-12-14", hijri: "19 Jumada al-Akhirah 1448", after: "The semester break starts on 15 December." },
  { id: "break-1", term: "first", kind: "holiday", title: "End-of-semester break", titleAr: "إجازة نهاية الفصل", start: "2026-12-15", end: "2026-12-19", hijri: "6 to 10 Rajab 1448", after: "Second semester classes start on Sunday 20 December." },
  { id: "sem-2", term: "second", kind: "study", title: "Second semester begins", titleAr: "بداية الفصل الثاني", start: "2026-12-20", hijri: "11 Rajab 1448" },
  { id: "winter", term: "second", kind: "holiday", title: "Winter holiday", titleAr: "إجازة الشتاء", start: "2027-01-08", end: "2027-01-16", hijri: "30 Rajab to 8 Sha'ban 1448", after: "Classes resume on Sunday 17 January." },
  { id: "ramadan", kind: "islamic", title: "Ramadan", titleAr: "رمضان", start: "2027-02-08", end: "2027-03-08", hijri: "1 Ramadan 1448" },
  { id: "founding-day", term: "second", kind: "holiday", title: "Founding Day holiday", titleAr: "إجازة يوم التأسيس", start: "2027-02-19", end: "2027-02-22", hijri: "12 to 15 Ramadan 1448" },
  { id: "eid-fitr-holiday", term: "second", kind: "holiday", title: "Eid al-Fitr holiday", titleAr: "إجازة عيد الفطر", start: "2027-02-26", end: "2027-03-13", hijri: "19 Ramadan to 5 Shawwal 1448", after: "Classes resume on Sunday 14 March." },
  { id: "last-ten", kind: "islamic", title: "The last ten nights", titleAr: "العشر الأواخر", start: "2027-02-28", hijri: "21 Ramadan 1448" },
  { id: "eid-fitr", kind: "islamic", title: "Eid al-Fitr", titleAr: "عيد الفطر", start: "2027-03-09", hijri: "1 Shawwal 1448" },
  { id: "finals-2", term: "second", kind: "exams", title: "Second-semester final exams", titleAr: "الاختبارات النهائية", start: "2027-04-25", end: "2027-05-10", hijri: "18 Dhul Qa'dah 1448", after: "The Eid al-Adha holiday starts on 11 May." },
  { id: "dhul-hijjah", kind: "islamic", title: "The ten days of Dhul Hijjah", titleAr: "عشر ذي الحجة", start: "2027-05-07", end: "2027-05-16", hijri: "1 Dhul Hijjah 1448" },
  { id: "eid-adha-holiday", term: "second", kind: "holiday", title: "Eid al-Adha holiday", titleAr: "إجازة عيد الأضحى", start: "2027-05-11", end: "2027-05-22", hijri: "5 to 16 Dhul Hijjah 1448", after: "Classes resume on Sunday 23 May." },
  { id: "arafah", kind: "islamic", title: "Day of Arafah", titleAr: "يوم عرفة", start: "2027-05-15", hijri: "9 Dhul Hijjah 1448" },
  { id: "eid-adha", kind: "islamic", title: "Eid al-Adha", titleAr: "عيد الأضحى", start: "2027-05-16", hijri: "10 Dhul Hijjah 1448" },
  { id: "summer-break", term: "second", kind: "holiday", title: "End-of-year holiday", titleAr: "إجازة نهاية العام", start: "2027-06-03", end: "2027-08-21", hijri: "28 Dhul Hijjah 1448", after: "The 1449 academic year starts on Sunday 22 August. Summer-semester students start on 6 June." },
  { id: "new-year", kind: "islamic", title: "Islamic New Year 1449", titleAr: "رأس السنة الهجرية", start: "2027-06-06", hijri: "1 Muharram 1449" },
  { id: "ashura", kind: "islamic", title: "Day of Ashura", titleAr: "يوم عاشوراء", start: "2027-06-15", hijri: "10 Muharram 1449" },
  { id: "year-1449", term: "summer", kind: "study", title: "1449 academic year begins", titleAr: "بداية العام الدراسي ١٤٤٩", start: "2027-08-22", hijri: "20 Rabi al-Awwal 1449" },
];

/** Midnight in Madinah (UTC+3, no daylight saving) at the start of a date. */
export const startOf = (iso: string) => new Date(`${iso}T00:00:00+03:00`);
export const endOf = (iso: string) => new Date(`${iso}T23:59:59+03:00`);

/**
 * What's on now (an exam period or holiday underway), the next University date with the three
 * after it, and the coming Islamic dates as small side counters.
 */
export function keyDatesState(now: Date, dates: KeyDate[] = KEY_DATES) {
  const t = now.getTime();
  const current =
    dates.find((d) => d.end && !d.minor && (d.kind === "exams" || d.kind === "holiday") && startOf(d.start).getTime() <= t && t <= endOf(d.end).getTime()) ?? null;
  const future = dates.filter((d) => startOf(d.start).getTime() > t);
  const uni = future.filter((d) => d.kind !== "islamic" && !d.minor && d.id !== current?.id);
  return { current, next: uni[0] ?? null, following: uni.slice(1, 4), islamic: future.filter((d) => d.kind === "islamic").slice(0, 3) };
}
