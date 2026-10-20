"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  BellRing,
  BookOpen,
  CalendarRange,
  Check,
  ChevronLeft,
  Clock3,
  ExternalLink,
  Landmark,
  MapPin,
  MoonStar,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Announcement,
  Lesson,
  Localized,
  MASJIDS,
  MasjidId,
  PRAYERS,
  TOPICS,
  WEEKDAYS_AR,
  WEEKDAYS_EN,
  Weekday,
} from "../lib/types";
import { useLang } from "../lib/i18n";
import { ANNOUNCEMENTS, PENDING_POSTS, TELEGRAM_SOURCES } from "../data/announcements";
import { LESSONS, QUBA_PERIOD } from "../data/lessons";
import {
  AnnouncementCard,
  EmptyState,
  FilterChips,
  LessonCard,
  PillButton,
  Reveal,
  ScheduleTable,
  SeasonalBanner,
  ShaykhHeader,
  StatusBadge,
} from "./ui";

const L = (ar: string, en: string): Localized => ({ ar, en });

/** Today in the app's reference frame: Tuesday (index 2), 9/5/1448 */
export const TODAY: Weekday = 2;

const SHAYKH_CHANNELS: Record<string, { handle: string; url: string }> = {
  "د. صالح بن سعد السحيمي": { handle: "@sohaymi", url: "https://t.me/s/sohaymi" },
  "أ. د. سليمان بن سليم الله الرحيلي": { handle: "@Sulalruhaily", url: "https://t.me/s/Sulalruhaily" },
  "أ. د. علي بن غازي التويجري": { handle: "@twijri", url: "https://t.me/s/twijri" },
  "أ. د. ماهر بن عبد الرحيم خوجة": { handle: "@dr_maherkhujah", url: "https://t.me/s/dr_maherkhujah" },
};

const FINISHED_BOOKS: Record<string, Localized[]> = {
  "د. صالح بن سعد السحيمي": [L("الداء والدواء لابن القيم — انتهى قبل مدة", "Ad-Da' wad-Dawa' of Ibn al-Qayyim — finished a while ago")],
  "أ. د. عبد الرزاق بن عبد المحسن البدر": [L("التنبيهات السنية على العقيدة الواسطية — خُتم يوم الأحد ٣٠/٤/١٤٤٨", "At-Tanbihat as-Saniyyah 'ala al-Aqidah al-Wasitiyyah — completed Sunday 30/4/1448")],
  "أ. د. ماهر بن عبد الرحيم خوجة": [L("شرح كشف الشبهات — انتهى", "Explanation of Kashf ash-Shubuhat — finished")],
};

function groupByPrayer(lessons: Lesson[]): [string, Lesson[]][] {
  const order = Object.entries(PRAYERS).sort((a, b) => a[1].order - b[1].order);
  return order
    .map(([key]) => [key, lessons.filter((l) => l.prayer === key)] as [string, Lesson[]])
    .filter(([, ls]) => ls.length > 0);
}

/* =============================== HOME =============================== */
export function HomeView({
  lessons,
  onShaykh,
  goSchedule,
  goFeed,
  goDaily,
}: {
  lessons: Lesson[];
  onShaykh: (n: string) => void;
  goSchedule: () => void;
  goFeed: () => void;
  goDaily: () => void;
}) {
  const { t, ui } = useLang();
  const todays = lessons.filter(
    (l) => l.days.includes(TODAY) || (l.id === "abadr-tawhid" && TODAY !== 5 && TODAY !== 6)
  );
  const nabawiToday = todays.filter((l) => l.masjid === "nabawi");
  const latest = ANNOUNCEMENTS.find((a) => !a.expired) ?? ANNOUNCEMENTS[0];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="pt-4 text-center sm:pt-8">
        <p className="text-sm font-medium text-[var(--ink-soft)]">{ui("todayLabel")}</p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold leading-relaxed text-[var(--ink)] sm:text-5xl sm:leading-relaxed">
          {ui("heroTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-loose text-[var(--ink-soft)]">{ui("tagline")}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <PillButton onClick={goDaily}>
            <CalendarRange className="h-5 w-5" />
            {ui("todaysSchedule")}
          </PillButton>
          <PillButton variant="outline" onClick={goFeed}>
            <BellRing className="h-5 w-5" />
            {ui("liveUpdates")}
          </PillButton>
        </div>
        <button onClick={goSchedule} className="mt-4 text-sm font-medium text-[var(--brand)] hover:underline">
          {ui("schedule")} ←
        </button>
      </section>

      {/* Latest update */}
      <Reveal>
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
            <span className="h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
            {ui("latestUpdate")}
          </h2>
          <AnnouncementCard a={latest} />
        </section>
      </Reveal>

      {/* Today's Nabawi lessons by prayer */}
      <section>
        <h2 className="mb-5 text-lg font-semibold text-[var(--ink)]">
          {t(MASJIDS.nabawi)} — {ui("todaysSchedule")}
        </h2>
        {nabawiToday.length === 0 ? (
          <EmptyState title={ui("noLessonsToday")} />
        ) : (
          <div className="space-y-8">
            {groupByPrayer(nabawiToday).map(([prayer, ls]) => (
              <div key={prayer}>
                <h3 className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-[var(--brand-deep)]">
                  <Clock3 className="h-4 w-4" />
                  {ui("afterPrayer")} {t(PRAYERS[prayer as keyof typeof PRAYERS])}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {ls.map((l, i) => (
                    <Reveal key={l.id} delay={i * 0.05}>
                      <LessonCard lesson={l} onShaykh={onShaykh} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* =============================== SCHEDULE =============================== */
export function ScheduleView({
  masjid,
  setMasjid,
  lessons,
  onShaykh,
}: {
  masjid: MasjidId;
  setMasjid: (m: MasjidId) => void;
  lessons: Lesson[];
  onShaykh: (n: string) => void;
}) {
  const { t, ui } = useLang();
  const rows = lessons.filter((l) => l.masjid === masjid);
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MASJIDS) as MasjidId[]).map((m) => (
          <button
            key={m}
            onClick={() => setMasjid(m)}
            className={`inline-flex h-[50px] items-center gap-2 rounded-pill px-6 text-[15px] font-semibold transition-all duration-150 active:scale-95 ${
              masjid === m ? "bg-[var(--brand-deep)] text-white shadow-soft" : "bg-[var(--card)] text-[var(--ink-soft)] shadow-soft"
            }`}
          >
            <Landmark className="h-4 w-4" />
            {t(MASJIDS[m].short)}
          </button>
        ))}
      </div>

      <section>
        <h1 className="text-2xl font-semibold text-[var(--ink)]">{t(MASJIDS[masjid])}</h1>
        {masjid === "quba" ? (
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{t(QUBA_PERIOD)}</p>
        ) : null}
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          {rows.length} {ui("lessonsCount")}
        </p>
      </section>

      <ScheduleTable lessons={rows} onShaykh={onShaykh} />

      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((l, i) => (
          <Reveal key={l.id} delay={(i % 4) * 0.04}>
            <LessonCard lesson={l} onShaykh={onShaykh} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* =============================== DAILY =============================== */
export function DailyView({ lessons, onShaykh }: { lessons: Lesson[]; onShaykh: (n: string) => void }) {
  const { t, ui, lang } = useLang();
  const [day, setDay] = useState<Weekday>(TODAY);
  const dayLessons = lessons.filter((l) => l.days.includes(day));
  const weekdayNames = lang === "ar" ? WEEKDAYS_AR : WEEKDAYS_EN;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-[var(--ink)]">{ui("daily")}</h1>
      <div className="flex flex-wrap gap-2">
        {weekdayNames.map((name, i) => (
          <button
            key={name}
            onClick={() => setDay(i as Weekday)}
            className={`h-11 rounded-pill px-4 text-sm font-medium transition-all active:scale-95 ${
              day === i ? "bg-[var(--brand-deep)] text-white shadow-soft" : "bg-[var(--card)] text-[var(--ink-soft)] shadow-soft"
            }`}
          >
            {name}
            {i === TODAY ? <span className="ms-1 text-[10px] opacity-80">• {lang === "ar" ? "اليوم" : "today"}</span> : null}
          </button>
        ))}
      </div>

      {(Object.keys(MASJIDS) as MasjidId[]).map((m) => {
        const rows = dayLessons.filter((l) => l.masjid === m);
        if (rows.length === 0) return null;
        return (
          <section key={m}>
            <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">{t(MASJIDS[m])}</h2>
            <div className="space-y-6">
              {groupByPrayer(rows).map(([prayer, ls]) => (
                <div key={prayer}>
                  <h3 className="mb-3 text-[15px] font-semibold text-[var(--brand-deep)]">
                    {ui("afterPrayer")} {t(PRAYERS[prayer as keyof typeof PRAYERS])}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {ls.map((l) => (
                      <Reveal key={l.id}>
                        <LessonCard lesson={l} onShaykh={onShaykh} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
      {dayLessons.length === 0 ? <EmptyState title={ui("noLessonsToday")} /> : null}
    </div>
  );
}

/* =============================== SEARCH =============================== */
export function SearchView({ lessons, onShaykh }: { lessons: Lesson[]; onShaykh: (n: string) => void }) {
  const { t, ui, lang, statusLabel } = useLang();
  const [q, setQ] = useState("");
  const [masjid, setMasjidF] = useState("all");
  const [topic, setTopic] = useState("all");
  const [day, setDay] = useState("all");
  const [prayer, setPrayer] = useState("all");
  const [status, setStatus] = useState("all");
  const [advanced, setAdvanced] = useState(false);
  const [book, setBook] = useState("all");

  const books = useMemo(() => Array.from(new Set(lessons.map((l) => l.book.ar))), [lessons]);

  const results = lessons.filter((l) => {
    const hay = `${l.shaykh.ar} ${l.shaykh.en} ${l.book.ar} ${l.book.en}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (masjid !== "all" && l.masjid !== masjid) return false;
    if (topic !== "all" && l.topic !== topic) return false;
    if (day !== "all" && !l.days.includes(Number(day) as Weekday)) return false;
    if (prayer !== "all" && l.prayer !== prayer) return false;
    if (status !== "all" && l.status !== status) return false;
    if (book !== "all" && l.book.ar !== book) return false;
    return true;
  });

  const clear = () => {
    setQ(""); setMasjidF("all"); setTopic("all"); setDay("all"); setPrayer("all"); setStatus("all"); setBook("all");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--ink)]">{ui("search")}</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={ui("searchPlaceholder")}
        className="h-[50px] w-full rounded-pill bg-[var(--card)] px-6 text-[15px] shadow-soft outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]"
      />

      <div className="space-y-3">
        <p className="text-sm font-medium text-[var(--ink-soft)]">{lang === "ar" ? "المسجد" : "Mosque"}</p>
        <FilterChips
          value={masjid}
          onChange={setMasjidF}
          options={[
            { value: "all", label: ui("all") },
            ...(Object.keys(MASJIDS) as MasjidId[]).map((m) => ({ value: m, label: t(MASJIDS[m].short) })),
          ]}
        />
        <FilterChips
          value={topic}
          onChange={setTopic}
          options={[
            { value: "all", label: `${ui("topic")}: ${ui("all")}` },
            ...Object.entries(TOPICS).map(([k, v]) => ({ value: k, label: t(v) })),
          ]}
        />
        <FilterChips
          value={prayer}
          onChange={setPrayer}
          options={[
            { value: "all", label: `${ui("prayer")}: ${ui("all")}` },
            ...Object.entries(PRAYERS).map(([k, v]) => ({ value: k, label: t(v) })),
          ]}
        />
      </div>

      <button
        onClick={() => setAdvanced((v) => !v)}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)]"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {ui("advancedFilters")}
        <ChevronLeft className={`h-4 w-4 transition-transform ${advanced ? "-rotate-90" : "rotate-90"}`} />
      </button>
      {advanced ? (
        <div className="space-y-3 rounded-card bg-[var(--card)] p-5 shadow-soft">
          <FilterChips
            value={day}
            onChange={setDay}
            options={[
              { value: "all", label: `${ui("day")}: ${ui("all")}` },
              ...(lang === "ar" ? WEEKDAYS_AR : WEEKDAYS_EN).map((n, i) => ({ value: String(i), label: n })),
            ]}
          />
          <FilterChips
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: `${lang === "ar" ? "الحالة" : "Status"}: ${ui("all")}` },
              { value: "active", label: statusLabel("active") },
              { value: "cancelled", label: statusLabel("cancelled") },
              { value: "paused", label: statusLabel("paused") },
              { value: "guest", label: statusLabel("guest") },
            ]}
          />
          <label className="block text-sm text-[var(--ink-soft)]">
            {ui("book")}
            <select
              value={book}
              onChange={(e) => setBook(e.target.value)}
              className="mt-1 block h-11 w-full rounded-card bg-[var(--ceramic)] px-3 text-sm text-[var(--ink)] outline-none"
            >
              <option value="all">{ui("all")}</option>
              {books.map((b) => (
                <option key={b} value={b}>
                  {t(lessons.find((l) => l.book.ar === b)!.book)}
                </option>
              ))}
            </select>
          </label>
          <button onClick={clear} className="text-sm font-medium text-[var(--danger)]">
            {ui("clearFilters")}
          </button>
        </div>
      ) : null}

      {results.length === 0 ? (
        <EmptyState title={ui("noResults")} hint={ui("noResultsHint")} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((l) => (
            <Reveal key={l.id}>
              <LessonCard lesson={l} onShaykh={onShaykh} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

/* =============================== FEED =============================== */
export function FeedView({ extra }: { extra: Announcement[] }) {
  const { ui } = useLang();
  const all = [...extra, ...ANNOUNCEMENTS];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-[var(--ink)]">{ui("liveUpdates")}</h1>
      <div className="space-y-4">
        {all.map((a, i) => (
          <Reveal key={a.id} delay={Math.min(i, 3) * 0.04}>
            <AnnouncementCard a={a} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* =============================== SEASONAL =============================== */
export function SeasonalView() {
  const { t, ui } = useLang();
  const cards: { title: Localized; body: Localized }[] = [
    {
      title: L("توقف مؤقت خلال الحج", "Temporary pause during Hajj"),
      body: L("تتوقف الدروس الأسبوعية المعتادة خلال أيام الحج، وتُنشر المواعيد البديلة هنا فور اعتمادها", "Regular weekly lessons pause during the days of Hajj; replacement times are published here once approved"),
    },
    {
      title: L("استئناف الدروس بعد المواسم", "Lessons resume after the seasons"),
      body: L("تُستأنف الدروس بجدولها الأسبوعي المعتاد بعد انتهاء الموسم ما لم يُعلن غير ذلك", "Lessons resume on their normal weekly schedule after the season unless announced otherwise"),
    },
  ];
  return (
    <div className="space-y-8">
      <SeasonalBanner title={ui("seasonalTitle")} note={L(ui("seasonalNote"), ui("seasonalNote"))} />
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: ui("ramadan"), icon: <MoonStar className="h-5 w-5 text-[var(--gold)]" /> },
          { title: ui("hajj"), icon: <Landmark className="h-5 w-5 text-[var(--gold)]" /> },
        ].map((s) => (
          <div key={s.title} className="rounded-card bg-[var(--brand-deep)] p-6 text-white shadow-soft">
            <div className="flex items-center gap-2">
              {s.icon}
              <h3 className="text-lg font-semibold">{s.title}</h3>
            </div>
            <p className="mt-3 inline-block rounded-pill border border-[var(--gold)] px-3 py-1 text-xs font-semibold text-[var(--gold)]">
              {ui("toBeAnnounced")}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Reveal key={c.title.ar}>
            <div className="rounded-card bg-[var(--card)] p-6 shadow-soft">
              <h3 className="font-semibold text-[var(--ink)]">{t(c.title)}</h3>
              <p className="mt-2 text-sm leading-loose text-[var(--ink-soft)]">{t(c.body)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* =============================== SHAYKH =============================== */
export function ShaykhView({
  nameAr,
  lessons,
  onBack,
  onShaykh,
}: {
  nameAr: string;
  lessons: Lesson[];
  onBack: () => void;
  onShaykh: (n: string) => void;
}) {
  const { t, ui, lang } = useLang();
  const mine = LESSONS.filter((l) => l.shaykh.ar === nameAr).concat(
    lessons.filter((l) => l.shaykh.ar === nameAr && !LESSONS.some((x) => x.id === l.id))
  );
  const first = mine[0];
  const announcements = ANNOUNCEMENTS.filter((a) => a.shaykh.ar === nameAr);
  const channel = SHAYKH_CHANNELS[nameAr];
  const finished = FINISHED_BOOKS[nameAr] ?? [];
  const locations = Array.from(new Set(mine.map((l) => `${t(MASJIDS[l.masjid])} — ${t(l.location)}`)));

  if (!first) {
    return (
      <div className="space-y-4">
        <EmptyState title={ui("noResults")} />
        <PillButton variant="outline" onClick={onBack}>{lang === "ar" ? "رجوع" : "Back"}</PillButton>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)]">
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        {lang === "ar" ? "رجوع" : "Back"}
      </button>

      <ShaykhHeader name={t(first.shaykh)} sub={ui("shaykh")} />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">{ui("weeklySchedule")}</h2>
        <ScheduleTable lessons={mine} onShaykh={onShaykh} />
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
          <BookOpen className="h-5 w-5 text-[var(--brand-accent)]" />
          {ui("booksTaught")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(mine.map((l) => t(l.book)))).map((b) => (
            <span key={b} className="rounded-pill bg-[var(--card)] px-4 py-2 text-sm font-medium shadow-soft">{b}</span>
          ))}
        </div>
        {finished.length > 0 ? (
          <>
            <h3 className="mb-3 mt-6 text-[15px] font-semibold text-[var(--ink-soft)]">{ui("previousBooks")}</h3>
            <div className="flex flex-wrap gap-2">
              {finished.map((b) => (
                <span key={b.ar} className="rounded-pill bg-[var(--ceramic)] px-4 py-2 text-sm text-[var(--ink-soft)]">{t(b)}</span>
              ))}
            </div>
          </>
        ) : null}
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
          <MapPin className="h-5 w-5 text-[var(--brand-accent)]" />
          {ui("locationDetails")}
        </h2>
        <div className="space-y-2">
          {locations.map((loc) => (
            <p key={loc} className="rounded-card bg-[var(--card)] px-4 py-3 text-sm shadow-soft">{loc}</p>
          ))}
        </div>
      </section>

      {channel ? (
        <section className="rounded-card bg-[var(--brand-deep)] p-6 text-white shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Send className="h-5 w-5" />
            {ui("channelPage")}
          </h2>
          <a
            href={channel.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-pill bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
            dir="ltr"
          >
            {channel.handle}
            <ExternalLink className="h-4 w-4" />
          </a>
          <p className="mt-2 text-xs text-white/60">{ui("openPreview")}: t.me/s/{channel.handle.replace("@", "")}</p>
        </section>
      ) : null}

      {announcements.length > 0 ? (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">{ui("recentAnnouncements")}</h2>
          <div className="space-y-4">
            {announcements.map((a) => (
              <AnnouncementCard key={a.id} a={a} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

/* =============================== ADMIN =============================== */
type QueueState = Record<string, "approved" | "rejected" | "verified">;

export function AdminView({
  addAnnouncement,
  addLesson,
}: {
  addAnnouncement: (a: Announcement) => void;
  addLesson: (l: Lesson) => void;
}) {
  const { t, ui, lang } = useLang();
  const [queue, setQueue] = useState<QueueState>({});
  const [annText, setAnnText] = useState("");
  const [annShaykh, setAnnShaykh] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [lShaykh, setLShaykh] = useState("");
  const [lBook, setLBook] = useState("");
  const [lMasjid, setLMasjid] = useState<MasjidId>("nabawi");
  const [lPrayer, setLPrayer] = useState<Lesson["prayer"]>("maghrib");
  const [lSaved, setLSaved] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("duroos-admin-queue");
      if (raw) setQueue(JSON.parse(raw));
    } catch {}
  }, []);

  const decide = (id: string, d: "approved" | "rejected" | "verified") => {
    const next = { ...queue, [id]: d };
    setQueue(next);
    window.localStorage.setItem("duroos-admin-queue", JSON.stringify(next));
  };

  const submitAnnouncement = () => {
    if (!annText.trim()) return;
    addAnnouncement({
      id: `local-ann-${Date.now()}`,
      shaykh: L(annShaykh || (lang === "ar" ? "إدارة التطبيق" : "App admin"), annShaykh || "App admin"),
      text: L(annText, annText),
      postedHijri: L("الثلاثاء ٩/٥/١٤٤٨هـ", "Tuesday 9/5/1448 AH"),
      postedGregorian: L("٢٠ أكتوبر ٢٠٢٦", "20 October 2026"),
      source: "@admin",
      sourceName: L("إدخال يدوي", "Manual entry"),
      type: "info",
      expired: false,
    });
    setAnnText(""); setAnnShaykh("");
    setSavedMsg(ui("announcementSaved"));
  };

  const submitLesson = () => {
    if (!lBook.trim() || !lShaykh.trim()) return;
    addLesson({
      id: `local-lesson-${Date.now()}`,
      shaykh: L(lShaykh, lShaykh),
      book: L(lBook, lBook),
      masjid: lMasjid,
      days: [TODAY],
      prayer: lPrayer,
      location: L(lang === "ar" ? "يُحدَّد لاحقًا" : "To be confirmed", "To be confirmed"),
      topic: "manhaj",
      status: "active",
    });
    setLBook(""); setLShaykh("");
    setLSaved(ui("lessonSaved"));
  };

  const inputCls =
    "h-11 w-full rounded-card bg-[var(--ceramic)] px-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]";

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--ink)]">{ui("adminTitle")}</h1>
        <p className="mt-2 rounded-card bg-[var(--status-pause-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--status-pause-tx)]">
          {ui("adminNote")}
        </p>
      </div>

      {/* Sources */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--ink)]">
          <ShieldCheck className="h-5 w-5 text-[var(--brand-accent)]" />
          {ui("sourcesTitle")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TELEGRAM_SOURCES.map((s) => (
            <a
              key={s.handle}
              href={s.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-card bg-[var(--card)] p-4 shadow-soft transition-shadow hover:shadow-lift"
            >
              <p className="font-semibold text-[var(--ink)]">{t(s.name)}</p>
              <p className="mt-1 text-sm font-medium text-[var(--brand)]" dir="ltr">{s.handle}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">{t(s.note)}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-accent)]">
                {ui("openPreview")} <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Review queue */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">{ui("reviewQueue")}</h2>
        <div className="space-y-3">
          {PENDING_POSTS.map((p) => {
            const d = queue[p.id];
            return (
              <div key={p.id} className="rounded-card bg-[var(--card)] p-5 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    {t(p.sourceName)} <span className="font-medium text-[var(--brand)]" dir="ltr">{p.source}</span>
                  </p>
                  <span className="text-xs text-[var(--ink-soft)]">{t(p.receivedAt)}</span>
                </div>
                <p className="mt-2 text-sm leading-loose text-[var(--ink)]">{t(p.preview)}</p>
                {d ? (
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-[var(--ceramic)] px-3 py-1 text-xs font-semibold text-[var(--ink)]">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {d === "approved" ? ui("approve") : d === "rejected" ? ui("reject") : ui("verified")}
                  </p>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => decide(p.id, "approved")} className="inline-flex h-10 items-center gap-1.5 rounded-pill bg-[var(--brand-accent)] px-4 text-sm font-semibold text-white active:scale-95">
                      <Check className="h-4 w-4" /> {ui("approve")}
                    </button>
                    <button onClick={() => decide(p.id, "verified")} className="inline-flex h-10 items-center gap-1.5 rounded-pill border border-[var(--brand)] px-4 text-sm font-semibold text-[var(--brand)] active:scale-95">
                      <ShieldCheck className="h-4 w-4" /> {ui("verify")}
                    </button>
                    <button onClick={() => decide(p.id, "rejected")} className="inline-flex h-10 items-center gap-1.5 rounded-pill bg-[var(--status-cancel-bg)] px-4 text-sm font-semibold text-[var(--status-cancel-tx)] active:scale-95">
                      <X className="h-4 w-4" /> {ui("reject")}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {PENDING_POSTS.length === 0 ? <EmptyState title={ui("pendingEmpty")} /> : null}
        </div>
      </section>

      {/* Manual additions */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-card bg-[var(--card)] p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">{ui("addAnnouncement")}</h2>
          <div className="space-y-3">
            <input value={annShaykh} onChange={(e) => setAnnShaykh(e.target.value)} placeholder={ui("shaykh")} className={inputCls} />
            <textarea value={annText} onChange={(e) => setAnnText(e.target.value)} placeholder={ui("textField")} rows={3} className="w-full rounded-card bg-[var(--ceramic)] px-3 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:ring-2 focus:ring-[var(--brand-accent)]" />
            <PillButton onClick={submitAnnouncement}>{ui("save")}</PillButton>
            {savedMsg ? <p className="text-sm text-[var(--brand-accent)]">{savedMsg}</p> : null}
          </div>
        </div>
        <div className="rounded-card bg-[var(--card)] p-6 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">{ui("addLesson")}</h2>
          <div className="space-y-3">
            <input value={lShaykh} onChange={(e) => setLShaykh(e.target.value)} placeholder={ui("shaykh")} className={inputCls} />
            <input value={lBook} onChange={(e) => setLBook(e.target.value)} placeholder={ui("book")} className={inputCls} />
            <div className="grid grid-cols-2 gap-3">
              <select value={lMasjid} onChange={(e) => setLMasjid(e.target.value as MasjidId)} className={inputCls}>
                {(Object.keys(MASJIDS) as MasjidId[]).map((m) => (
                  <option key={m} value={m}>{t(MASJIDS[m].short)}</option>
                ))}
              </select>
              <select value={lPrayer} onChange={(e) => setLPrayer(e.target.value as Lesson["prayer"])} className={inputCls}>
                {Object.entries(PRAYERS).map(([k, v]) => (
                  <option key={k} value={k}>{t(v)}</option>
                ))}
              </select>
            </div>
            <PillButton onClick={submitLesson}>{ui("save")}</PillButton>
            {lSaved ? <p className="text-sm text-[var(--brand-accent)]">{lSaved}</p> : null}
          </div>
        </div>
      </section>

      {/* Seasonal image upload (portable v1) */}
      <section className="rounded-card bg-[var(--card)] p-6 shadow-soft">
        <h2 className="mb-2 text-lg font-semibold text-[var(--ink)]">
          {lang === "ar" ? "رفع صورة الجدول الموسمي" : "Upload seasonal schedule image"}
        </h2>
        <p className="mb-4 text-sm text-[var(--ink-soft)]">
          {lang === "ar"
            ? "في هذه النسخة المحمولة تُعرض الصورة محليًا فقط ولا تُنشر"
            : "In this portable build the image is kept locally and not published"}
        </p>
        <input type="file" accept="image/*" className="text-sm text-[var(--ink-soft)]" />
      </section>
    </div>
  );
}
