import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, Clock3, ExternalLink, MapPin, Radio } from "lucide-react";
import type { getLesson, getShaykh, AnnouncementRow, StreamRow } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { formatClock, riyadhDateIso } from "@/lib/time/riyadh";
import { formatHijri } from "@/lib/time/hijri";
import { prayerTimes } from "@/lib/time/prayer";
import { EmptyState } from "@/components/ui";
import { DuroosNav } from "./DuroosNav";
import { DAY_LONG_KEYS, publicLabel, t } from "./strings";
import { SistersTag } from "./StatusTag";
import { duroosPath } from "./DarsCard";
import { CalendarButton } from "./CalendarButton";
import { AlertsButton } from "./AlertsButton";
import { ShaykhBadge } from "./ShaykhBadge";

type Lesson = NonNullable<Awaited<ReturnType<typeof getLesson>>>;
type Shaykh = NonNullable<Awaited<ReturnType<typeof getShaykh>>>;

function daysText(l: Pick<Lesson, "days" | "daysLabelEn" | "daysLabelAr"> & { frequencyEn?: string | null; frequencyAr?: string | null }, locale: Locale): string {
  const label = publicLabel(locale === "ar" ? l.daysLabelAr : l.daysLabelEn);
  if (label) return label;
  if (!l.days.length) return publicLabel(locale === "ar" ? l.frequencyAr : l.frequencyEn) ?? t(locale, "daysNotStated");
  return l.days.map((d) => t(locale, DAY_LONG_KEYS[d])).join(locale === "ar" ? "، " : ", ");
}

export function ShaykhPage({ shaykh: s, locale }: { shaykh: Shaykh; locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center md:py-14">
          <ShaykhBadge nameAr={s.nameAr} photo={s.photo} size="lg" />
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">{ar ? s.nameAr : s.nameEn}</h1>
            {!ar && <p className="ar-text mt-1 text-xl text-white/80">{s.nameAr}</p>}
            {(ar ? s.roleAr : s.roleEn) && <p className="mt-3 max-w-2xl text-white/85">{ar ? s.roleAr : s.roleEn}</p>}
          </div>
        </div>
      </section>
      <div className="shell mt-6 md:mt-8">
        <DuroosNav locale={locale} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            {s.facts.length > 0 && (
              <ul className="mb-8 grid gap-2">
                {s.facts.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-bright" />
                    {ar ? f.ar : f.en}
                  </li>
                ))}
              </ul>
            )}
            <h2 className="mb-4 font-heading text-2xl font-bold">{t(locale, "lessons")}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {s.lessons.map((l) => (
                <Link key={l.slug} href={duroosPath(locale, `/lesson/${l.slug}`)} className="group flex flex-col rounded-2xl border border-line bg-card p-4 transition-colors hover:border-primary/50">
                  {l.audience === "women" && <span className="mb-1.5"><SistersTag locale={locale} /></span>}
                  <p className="ar-text text-lg leading-snug">{l.bookAr}</p>
                  {!ar && <p className="mt-0.5 text-sm text-muted group-hover:text-ink">{l.bookEn}</p>}
                  <p className="mt-auto flex flex-wrap items-center gap-x-2 pt-3 text-xs text-muted">
                    <span>{daysText(l, locale)}</span>
                    <span>{t(locale, "after")} {t(locale, l.prayer)}</span>
                    <span>{ar ? l.masjid.shortAr : l.masjid.shortEn}</span>
                    {l.bookUrl && <span className="flex items-center gap-1 text-primary"><BookOpen size={12} /> {ar ? "الكتاب" : "Book"}</span>}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-card p-5">
              <p className="font-heading text-lg font-bold">{ar ? "تابع دروسه" : "Follow his duroos"}</p>
              <AlertsButton topic={`shaykh:${s.slug}`} label={ar ? "تنبيه عند إلغاء أو تغيير دروسه" : "Alert me when his duroos change"} locale={locale} />
              <CalendarButton feed={`shaykh-${s.slug}`} locale={locale} />
            </div>
            {s.channels.length > 0 && (
              <div className="rounded-3xl border border-line bg-card p-5">
                <p className="font-heading text-lg font-bold">{t(locale, "channels")}</p>
                <ul className="mt-3 space-y-2">
                  {s.channels.map((c) => (
                    <li key={c.slug}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-xl bg-bg-2 px-3.5 py-2.5 text-sm font-semibold transition hover:bg-primary hover:text-primary-ink">
                        {ar ? c.labelAr : c.labelEn}
                        <ExternalLink size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

export function LessonPage({ lesson: l, locale }: { lesson: Lesson; locale: Locale }) {
  const ar = locale === "ar";
  const today = riyadhDateIso();
  const adhan = prayerTimes(today)[l.prayer];
  const streamHref = l.stream ? (l.stream.isLive && l.stream.liveUrl ? l.stream.liveUrl : l.stream.url) : null;
  const streamKind = l.stream ? ({ youtube: ar ? "فيديو على يوتيوب" : "Video on YouTube", mixlr: ar ? "صوت على Mixlr" : "Audio on Mixlr", web: ar ? "بث على الموقع" : "Broadcast online" } as Record<string, string>)[l.stream.kind] ?? (ar ? "بث مباشر" : "Live broadcast") : null;
  return (
    <div data-variant={l.audience === "women" ? "sisters" : undefined}>
      <section className="lattice overflow-hidden bg-brand text-white">
        <div className="shell py-10 md:py-14">
          {l.audience === "women" && <p className="mb-3"><SistersTag locale={locale} /></p>}
          <p className="ar-text text-3xl font-bold leading-snug md:text-5xl">{l.bookAr}</p>
          {!ar && <h1 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-4xl">{l.bookEn}</h1>}
          {ar && <h1 className="sr-only">{l.bookAr}</h1>}
          {(ar ? l.bookAuthorAr : l.bookAuthorEn) && <p className="mt-2 text-white/75">{t(locale, "by")} {ar ? l.bookAuthorAr : l.bookAuthorEn}</p>}
          <Link href={duroosPath(locale, `/shaykh/${l.shaykh.slug}`)} className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/10 py-2 pe-5 ps-2 ring-1 ring-white/15 transition hover:bg-white/15">
            <ShaykhBadge nameAr={l.shaykh.nameAr} photo={l.shaykh.photo} size="sm" />
            <span className="font-semibold">{ar ? l.shaykh.nameAr : l.shaykh.nameEn}</span>
          </Link>
        </div>
      </section>
      <div className="shell mt-6 md:mt-8">
        <DuroosNav locale={locale} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <dl className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card">
              <Item icon={<CalendarDays size={18} />} label={t(locale, "days")} value={daysText(l, locale)} />
              <Item icon={<Clock3 size={18} />} label={`${t(locale, "after")} ${t(locale, l.prayer)}`} value={`${t(locale, "adhan")} ${formatClock(adhan, locale)}. ${t(locale, "afterIqamah")}.`} />
              <Item icon={<MapPin size={18} />} label={t(locale, "location")} value={placeText(ar ? l.masjid.nameAr : l.masjid.nameEn, ar ? l.locationAr : l.locationEn, ar)} />
            </dl>
            <h2 className="mt-10 mb-3 font-heading text-2xl font-bold">{t(locale, "history")}</h2>
            {l.history.length === 0 ? (
              <p className="text-sm text-muted">{t(locale, "noHistory")}</p>
            ) : (
              <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
                {l.history.map((h) => (
                  <li key={h.id} className="p-4 text-sm">
                    <span className="font-semibold">{t(locale, (h.kind === "cancelled" ? "cancelled" : h.kind === "postponed" ? "postponed" : h.kind === "resumed" ? "resumed" : h.kind === "moved" ? "moved" : "on"))}</span>
                    {", "}
                    {formatHijri(h.startsOn, locale, { bracket: true, weekday: true })}
                    {publicLabel(ar ? h.noteAr : h.noteEn) && <p className="text-muted">{ar ? h.noteAr : h.noteEn}</p>}
                    {h.revokedAt && <p className="text-xs text-muted">{ar ? "أُلغي هذا التحديث" : "This change was withdrawn"}</p>}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6 text-xs text-muted">{t(locale, "today")}: {formatHijri(today, locale, { weekday: true })}</p>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {l.bookUrl && (
              <a href={l.bookUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-3xl border border-line bg-card p-5 transition-colors hover:border-primary/50">
                <span className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-gold-bg text-gold"><BookOpen size={20} /></span>
                  <span>
                    <span className="block font-heading text-lg font-bold">{ar ? "اقرأ الكتاب" : "Read the book"}</span>
                    <span className="block text-sm text-muted">{ar ? "قارئ إلكتروني مع ملف PDF" : "Online reader, with a PDF to download"}</span>
                  </span>
                </span>
                <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary">turath.io <ExternalLink size={13} /></span>
              </a>
            )}
            {l.stream && streamHref && (
              <a href={streamHref} target="_blank" rel="noopener noreferrer" className={`block rounded-3xl p-5 transition ${l.stream.isLive ? "bg-live text-white" : "border border-line bg-card hover:border-primary/50"}`}>
                <span className="flex items-center gap-3">
                  <span className={`grid size-11 place-items-center rounded-2xl ${l.stream.isLive ? "bg-white/20" : "bg-primary-soft text-primary"}`}><Radio size={20} /></span>
                  <span>
                    <span className="block font-heading text-lg font-bold">{l.stream.isLive ? t(locale, "watchLive") : ar ? "يُبث عادةً على" : "Usually live on"}</span>
                    <span className={`block text-sm ${l.stream.isLive ? "text-white/85" : "text-muted"}`}>{streamKind}{(ar ? l.stream.labelAr : l.stream.labelEn) ? `: ${ar ? l.stream.labelAr : l.stream.labelEn}` : ""}</span>
                  </span>
                </span>
              </a>
            )}
            {l.channels.length > 0 && (
              <div className="rounded-3xl border border-line bg-card p-5">
                <p className="font-heading text-lg font-bold">{l.stream ? (ar ? "وعلى قنوات الشيخ" : "Also on the shaykh's channels") : ar ? "يُبث عادةً على" : "Usually live on"}</p>
                <ul className="mt-2 grid gap-1 text-sm">
                  {l.channels.map((c) => (
                    <li key={c.url}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-primary hover:underline">
                        {ar ? c.labelAr : c.labelEn} <ExternalLink size={13} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-3xl border border-line bg-card p-5">
              <AlertsButton topic={`shaykh:${l.shaykh.slug}`} label={ar ? "تنبيه عند إلغاء أو تغيير الدرس" : "Alert me if this dars changes"} locale={locale} />
              <CalendarButton feed={`lesson-${l.slug}`} locale={locale} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/** "Masjid Quba" plus the spot inside it, without repeating the masjid's name. */
export function placeText(masjid: string, spot: string | null | undefined, ar = false): string {
  const clean = (x: string) => x.replace(/[^\p{L}\p{N}]+/gu, " ").trim().toLowerCase();
  if (!spot || clean(spot) === clean(masjid) || clean(masjid).includes(clean(spot))) return masjid;
  if (clean(spot).includes(clean(masjid))) return spot;
  return `${masjid}${ar ? "، " : ", "}${spot}`;
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4 p-4 md:p-5">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <dt className="text-sm font-semibold text-muted">{label}</dt>
        <dd className="mt-0.5">{value}</dd>
      </div>
    </div>
  );
}

/** Plain text with its web addresses made into links (update bodies are typed as text). */
export function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g).map((part, i) =>
        i % 2 ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-primary underline underline-offset-2" dir="ltr">
            {part.replace(/^https?:\/\//, "")}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
}

export function UpdatesPage({ current, history, locale }: { current: AnnouncementRow[]; history: AnnouncementRow[]; locale: Locale }) {
  const ar = locale === "ar";
  const currentSlugs = new Set(current.map((a) => a.slug));
  const earlier = history.filter((a) => !currentSlugs.has(a.slug));
  const Card = ({ a, faded }: { a: AnnouncementRow; faded?: boolean }) => (
    <article id={a.slug} className={`card scroll-mt-28 p-4 ${faded ? "opacity-70" : ""}`}>
      <h3 className="font-semibold leading-snug">{ar ? a.titleAr : a.titleEn}</h3>
      <p className="mt-1 whitespace-pre-line text-sm leading-relaxed">
        <Linkified text={ar ? a.bodyAr : a.bodyEn} />
      </p>
      {a.imageUrl && <Image src={a.imageUrl} alt="" width={600} height={800} className="mt-3 h-auto w-full rounded-xl" />}
      <p className="mt-2 flex flex-wrap gap-x-2 text-xs text-muted">
        {a.eventDate && <span>{formatHijri(a.eventDate, locale, { bracket: true, weekday: true })}</span>}
      </p>
    </article>
  );
  return (
    <div className="shell max-w-3xl pt-6 md:pt-10">
      <DuroosNav locale={locale} />
      <h1 className="mb-4 text-3xl font-semibold">{t(locale, "updates")}</h1>
      {current.length === 0 ? (earlier.length === 0 && <EmptyState title={t(locale, "noUpdates")} />) : <div className="grid gap-2.5">{current.map((a) => <Card key={a.slug} a={a} />)}</div>}
      {earlier.length > 0 && (
        <>
          {current.length === 0 && <p className="mb-4 text-muted">{ar ? "لا تغييرات حالية. كل الدروس على موعدها المعتاد." : "Nothing changed right now. Every dars is on as usual."}</p>}
          <h2 className="mt-8 mb-2.5 text-sm font-bold text-muted">{t(locale, "earlier")}</h2>
          <div className="grid gap-2.5">{earlier.map((a) => <Card key={a.slug} a={a} faded />)}</div>
        </>
      )}
    </div>
  );
}

export function LivePage({ streams, locale }: { streams: StreamRow[]; locale: Locale }) {
  const ar = locale === "ar";
  const yt = streams.find((s) => s.slug === "nabawi-youtube");
  const others = streams.filter((s) => s.slug !== "nabawi-youtube");
  return (
    <div className="shell max-w-3xl pt-6 md:pt-10">
      <DuroosNav locale={locale} />
      <h1 className="mb-1 text-3xl font-semibold">{t(locale, "livestreams")}</h1>
      {yt && (
        <>
          <p className="mb-3 text-sm text-muted">{t(locale, "officialStream")}</p>
          <div className="card overflow-hidden">
            <div className="aspect-video">
              <iframe
                className="size-full"
                src="https://www.youtube-nocookie.com/embed/live_stream?channel=UC0XNCc-DU8J5_ksR-eufPaw"
                title={ar ? yt.labelAr : yt.labelEn}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <a href={yt.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 text-sm font-semibold">
              {ar ? yt.labelAr : yt.labelEn} <ExternalLink size={15} className="text-muted" />
            </a>
          </div>
          <p className="mt-2 text-sm text-muted">
            {ar
              ? "إذا ظهرت رسالة أن الفيديو غير متاح فلا يوجد بث الآن. افتح القناة على يوتيوب لآخر التسجيلات، أو استمع عبر القنوات أدناه."
              : "If the video says it is unavailable, nothing is being broadcast right now. Open the channel on YouTube for the latest recordings, or listen on the channels below."}
          </p>
        </>
      )}
      <section aria-labelledby="sisters" className="mt-7 rounded-2xl border border-line bg-card p-4">
        <h2 id="sisters" className="text-lg font-semibold">{ar ? "للأخوات" : "For sisters"}</h2>
        <p className="mt-1.5 text-sm text-muted">
          {ar
            ? "تستطيع الأخوات متابعة الدروس مباشرة عبر البث الرسمي والقنوات الصوتية أدناه، من البيت أو من مصليات النساء في المسجد، باستخدام سماعات الأذن."
            : "Sisters can follow the duroos live through the official stream and the audio channels below, at home or from the women's prayer areas of the masjid with earphones."}
        </p>
      </section>
      <h2 className="mt-7 mb-2.5 text-lg font-semibold">{t(locale, "channels")}</h2>
      <div className="grid gap-2">
        {others.map((s) => (
          <a key={s.slug} href={s.url} target="_blank" rel="noopener noreferrer" className="card flex items-center justify-between p-3.5 text-sm font-semibold">
            {ar ? s.labelAr : s.labelEn}
            <ExternalLink size={15} className="text-muted" />
          </a>
        ))}
      </div>
    </div>
  );
}
