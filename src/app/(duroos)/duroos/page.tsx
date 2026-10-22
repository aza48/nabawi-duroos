"use client";

import { useEffect, useState } from "react";
import {
  BellRing,
  CalendarRange,
  Home,
  LayoutDashboard,
  MoonStar,
  Rows3,
  Search,
  Sun,
  Moon,
  Languages,
} from "lucide-react";
import { Announcement, Lesson, MasjidId } from "../../../lib/types";
import { LanguageProvider, useLang } from "../../../lib/i18n";
import { LESSONS } from "../../../data/lessons";
import {
  FloatingLiveButton,
  LoadingSkeleton,
  MobileBottomNav,
  ViewKey,
} from "../../../components/ui";
import {
  AdminView,
  DailyView,
  FeedView,
  HomeView,
  LivestreamsView,
  ScheduleView,
  SearchView,
  SeasonalView,
  ShaykhView,
} from "../../../components/views";
import { LectureAlert } from "../../../components/LectureAlert";

function Shell() {
  const { lang, setLang, ui } = useLang();
  const [view, setView] = useState<ViewKey>("home");
  const [themeMasjid, setThemeMasjid] = useState<MasjidId>("nabawi");
  const [scheduleMasjid, setScheduleMasjid] = useState<MasjidId>("nabawi");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);
  const [shaykhName, setShaykhName] = useState<string | null>(null);
  const [extraLessons, setExtraLessons] = useState<Lesson[]>([]);

  // hydrate persisted state
  useEffect(() => {
    try {
      const m = window.localStorage.getItem("duroos-mode");
      if (m === "dark" || m === "light") setMode(m);
      const el = window.localStorage.getItem("duroos-extra-lessons");
      if (el) setExtraLessons(JSON.parse(el));
    } catch {}
    const id = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const lessons = [...LESSONS, ...extraLessons];

  const addLesson = (l: Lesson) => {
    const next = [...extraLessons, l];
    setExtraLessons(next);
    window.localStorage.setItem("duroos-extra-lessons", JSON.stringify(next));
  };
  const openShaykh = (nameAr: string) => {
    setShaykhName(nameAr);
    const first = lessons.find((l) => l.shaykh.ar === nameAr);
    if (first) setThemeMasjid(first.masjid);
  };

  const nav = (v: ViewKey) => {
    // Admin lives on its own password-protected route now.
    if (v === "admin") {
      window.location.href = "/admin";
      return;
    }
    setView(v);
    setShaykhName(null);
    if (v === "home" || v === "schedule") setThemeMasjid(scheduleMasjid);
    window.scrollTo({ top: 0 });
  };

  const changeScheduleMasjid = (m: MasjidId) => {
    setScheduleMasjid(m);
    setThemeMasjid(m);
  };

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    window.localStorage.setItem("duroos-mode", next);
  };

  const bottomItems = [
    { key: "home" as ViewKey, label: ui("home"), icon: <Home className="h-5 w-5" /> },
    { key: "schedule" as ViewKey, label: ui("schedule"), icon: <Rows3 className="h-5 w-5" /> },
    { key: "search" as ViewKey, label: ui("search"), icon: <Search className="h-5 w-5" /> },
    { key: "feed" as ViewKey, label: ui("feed"), icon: <BellRing className="h-5 w-5" /> },
    { key: "admin" as ViewKey, label: ui("admin"), icon: <LayoutDashboard className="h-5 w-5" /> },
  ];

  const headerLink = (v: ViewKey, label: string) => (
    <button
      key={v}
      onClick={() => nav(v)}
      className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
        view === v && !shaykhName ? "bg-[var(--brand-deep)] text-white" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      className="app-shell theme-animated min-h-screen bg-[var(--canvas)] text-[var(--ink)]"
      data-masjid={themeMasjid}
      data-mode={mode}
    >
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[var(--canvas)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <button onClick={() => nav("home")} className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-deep)] text-white">
              <MoonStar className="h-5 w-5" />
            </span>
            <span className="text-[15px] font-semibold">{ui("appName")}</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {headerLink("home", ui("home"))}
            {headerLink("schedule", ui("schedule"))}
            {headerLink("daily", ui("daily"))}
            {headerLink("search", ui("search"))}
            {headerLink("feed", ui("feed"))}
            {headerLink("streams", ui("streams"))}
            {headerLink("seasonal", ui("seasonal"))}
            {headerLink("admin", ui("admin"))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/"
              className="hidden h-10 items-center rounded-pill bg-[var(--card)] px-3.5 text-sm font-semibold shadow-soft transition-transform active:scale-95 sm:inline-flex"
            >
              MESH
            </a>
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="inline-flex h-10 items-center gap-1.5 rounded-pill bg-[var(--card)] px-3.5 text-sm font-semibold shadow-soft transition-transform active:scale-95"
              aria-label="Language / اللغة"
            >
              <Languages className="h-4 w-4" />
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <button
              onClick={toggleMode}
              className="flex h-10 w-10 items-center justify-center rounded-pill bg-[var(--card)] shadow-soft transition-transform active:scale-95"
              aria-label="Dark mode"
            >
              {mode === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-5xl px-4 pb-32 pt-4 sm:px-6 lg:pb-16">
        {!ready ? (
          <LoadingSkeleton rows={4} />
        ) : shaykhName ? (
          <ShaykhView
            nameAr={shaykhName}
            lessons={lessons}
            onBack={() => setShaykhName(null)}
            onShaykh={openShaykh}
          />
        ) : view === "home" ? (
          <HomeView
            lessons={lessons}
            onShaykh={openShaykh}
            goSchedule={() => nav("schedule")}
            goFeed={() => nav("feed")}
            goDaily={() => nav("daily")}
          />
        ) : view === "schedule" ? (
          <ScheduleView masjid={scheduleMasjid} setMasjid={changeScheduleMasjid} lessons={lessons} onShaykh={openShaykh} />
        ) : view === "daily" ? (
          <DailyView lessons={lessons} onShaykh={openShaykh} />
        ) : view === "search" ? (
          <SearchView
            lessons={lessons}
            onShaykh={openShaykh}
            onMasjidFocus={(m) => setThemeMasjid(m ?? "nabawi")}
          />
        ) : view === "feed" ? (
          <FeedView extra={[]} />
        ) : view === "streams" ? (
          <LivestreamsView />
        ) : view === "seasonal" ? (
          <SeasonalView />
        ) : (
          <AdminView addLesson={addLesson} />
        )}
      </main>

      <LectureAlert />
      <FloatingLiveButton onClick={() => nav("streams")} />
      <MobileBottomNav view={view} setView={nav} items={bottomItems} />
    </div>
  );
}

export default function Page() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}
