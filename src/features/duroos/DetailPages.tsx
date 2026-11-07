import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, MapPin, Radio, UserRound } from "lucide-react";
import type { getLesson, getShaykh, AnnouncementRow, StreamRow } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { formatClock, riyadhDateIso } from "@/lib/time/riyadh";
import { formatHijri } from "@/lib/time/hijri";
import { prayerTimes } from "@/lib/time/prayer";
import { EmptyState } from "@/components/ui";
import { DuroosNav } from "./DuroosNav";
import { DAY_LONG_KEYS, t } from "./strings";
import { duroosPath } from "./DarsCard";
import { CalendarButton } from "./CalendarButton";
import { AlertsButton } from "./AlertsButton";

type Lesson = NonNullable<Awaited<ReturnType<typeof getLesson>>>;
type Shaykh = NonNullable<Awaited<ReturnType<typeof getShaykh>>>;

function daysText(l: Pick<Lesson, "days" | "daysLabelEn" | "daysLabelAr">, locale: Locale): string {
  if (locale === "ar" && l.daysLabelAr) return l.daysLabelAr;
  if (locale === "en" && l.daysLabelEn) return l.daysLabelEn;
  if (!l.days.length) return t(locale, "daysNotStated");
  return l.days.map((d) => t(locale, DAY_LONG_KEYS[d])).join(locale === "ar" ? "، " : ", ");
}

export function ShaykhPage({ shaykh: s, locale }: { shaykh: Shaykh; locale: Locale }) {
  const ar = locale === "ar";
  return (
    <div className="mx-auto max-w-2xl">
      <DuroosNav locale={locale} />
      <div className="card flex gap-4 p-4">
        {s.photo ? (
          <Image src={s.photo} alt={ar ? s.nameAr : s.nameEn} width={96} height={96} className="size-24 shrink-0 rounded-2xl object-cover" />
        ) : (
          <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-bg-2 text-muted">
            <UserRound size={36} />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold leading-tight">{ar ? s.nameAr : s.nameEn}</h1>
          {!ar && <p className="ar-text mt-0.5 text-muted">{s.nameAr}</p>}
          {(ar ? s.roleAr : s.roleEn) && <p className="mt-1.5 text-sm">{ar ? s.roleAr : s.roleEn}</p>}
        </div>
      </div>
      {s.facts.length > 0 && (
        <ul className="mt-3 grid gap-1.5 text-sm">
          {s.facts.map((f, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {ar ? f.ar : f.en}
            </li>
          ))}
        </ul>
      )}
      <h2 className="mt-7 mb-2.5 text-xl font-semibold">{t(locale, "lessons")}</h2>
      <div className="grid gap-2">
        {s.lessons.map((l) => (
          <Link key={l.slug} href={duroosPath(locale, `/lesson/${l.slug}`)} className="card block p-3.5 transition hover:border-primary">
            <p className="ar-text text-[15px]">{l.bookAr}</p>
            {!ar && <p className="text-sm text-muted">{l.bookEn}</p>}
            <p className="mt-1.5 text-xs text-muted">
              {daysText(l, locale)} · {t(locale, "after")} {t(locale, l.prayer)} · {ar ? l.masjid.shortAr : l.masjid.shortEn}
            </p>
          </Link>
        ))}
      </div>
      <AlertsButton topic={`shaykh:${s.slug}`} label={ar ? "تنبيه عند إلغاء أو تغيير دروسه" : "Alert me when his duroos change"} locale={locale} />
      <CalendarButton feed={`shaykh-${s.slug}`} locale={locale} />
      {s.channels.length > 0 && (
        <>
          <h2 className="mt-7 mb-2.5 text-xl font-semibold">{t(locale, "channels")}</h2>
          {s.channels.map((c) => (
            <a key={c.slug} href={c.url} target="_blank" rel="noopener noreferrer" className="card flex items-center justify-between p-3.5 text-sm font-semibold">
              {ar ? c.labelAr : c.labelEn}
              <ExternalLink size={15} className="text-muted" />
            </a>
          ))}
        </>
      )}
    </div>
  );
}

export function LessonPage({ lesson: l, locale }: { lesson: Lesson; locale: Locale }) {
  const ar = locale === "ar";
  const today = riyadhDateIso();
  const adhan = prayerTimes(today)[l.prayer];
  return (
    <div className="mx-auto max-w-2xl">
      <DuroosNav locale={locale} />
      <p className="ar-text text-2xl font-bold leading-snug">{l.bookAr}</p>
      {!ar && <h1 className="mt-1 text-2xl font-semibold leading-tight">{l.bookEn}</h1>}
      {ar && <h1 className="sr-only">{l.bookAr}</h1>}
      {(ar ? l.bookAuthorAr : l.bookAuthorEn) && (
        <p className="mt-1 text-sm text-muted">
          {t(locale, "by")} {ar ? l.bookAuthorAr : l.bookAuthorEn}
        </p>
      )}
      <Link href={duroosPath(locale, `/shaykh/${l.shaykh.slug}`)} className="card mt-4 flex items-center gap-3 p-3 transition hover:border-primary">
        {l.shaykh.photo ? (
          <Image src={l.shaykh.photo} alt="" width={48} height={48} className="size-12 rounded-xl object-cover" />
        ) : (
          <span className="grid size-12 place-items-center rounded-xl bg-bg-2 text-muted"><UserRound size={22} /></span>
        )}
        <span className="font-semibold">{ar ? l.shaykh.nameAr : l.shaykh.nameEn}</span>
      </Link>
      <dl className="card mt-3 divide-y divide-line">
        <Item icon={<CalendarDays size={16} />} label={t(locale, "days")} value={daysText(l, locale)} />
        <Item
          icon={<Radio size={16} />}
          label={`${t(locale, "after")} ${t(locale, l.prayer)}`}
          value={`${t(locale, "adhan")} ${formatClock(adhan, locale)} · ${t(locale, "afterIqamah")}`}
        />
        <Item icon={<MapPin size={16} />} label={t(locale, "location")} value={`${ar ? l.masjid.nameAr : l.masjid.nameEn}${ar ? "، " : ", "}${ar ? l.locationAr : l.locationEn}`} />
      </dl>
      {(ar ? l.noteAr : l.noteEn) && <p className="mt-3 rounded-xl bg-bg-2 p-3 text-sm">{ar ? l.noteAr : l.noteEn}</p>}
      {(ar ? l.sequenceAr : l.sequenceEn) && <p className="mt-2 text-sm text-muted">{ar ? l.sequenceAr : l.sequenceEn}</p>}
      {l.stream && (
        <a href={l.stream.isLive && l.stream.liveUrl ? l.stream.liveUrl : l.stream.url} target="_blank" rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-ink">
          <Radio size={17} /> {l.stream.isLive ? t(locale, "watchLive") : t(locale, "listen")}
        </a>
      )}
      <AlertsButton topic={`shaykh:${l.shaykh.slug}`} label={ar ? "تنبيه عند إلغاء أو تغيير الدرس" : "Alert me if this dars changes"} locale={locale} />
      <CalendarButton feed={`lesson-${l.slug}`} locale={locale} />
      <h2 className="mt-7 mb-2 text-lg font-semibold">{t(locale, "history")}</h2>
      {l.history.length === 0 ? (
        <p className="text-sm text-muted">{t(locale, "noHistory")}</p>
      ) : (
        <ul className="card divide-y divide-line">
          {l.history.map((h) => (
            <li key={h.id} className="p-3 text-sm">
              <span className="font-semibold">{t(locale, (h.kind === "cancelled" ? "cancelled" : h.kind === "postponed" ? "postponed" : h.kind === "resumed" ? "resumed" : h.kind === "moved" ? "moved" : "on"))}</span>{" "}
              · {formatHijri(h.startsOn, locale, { bracket: true, weekday: true })}
              {(ar ? h.noteAr : h.noteEn) && <p className="text-muted">{ar ? h.noteAr : h.noteEn}</p>}
              {h.revokedAt && <p className="text-xs text-muted">{ar ? "أُلغي هذا التحديث" : "This change was withdrawn"}</p>}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-muted">{t(locale, "today")}: {formatHijri(today, locale, { weekday: true })}</p>
    </div>
  );
}

function Item({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 p-3.5">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
        <dd className="text-sm">{value}</dd>
      </div>
    </div>
  );
}

export function UpdatesPage({ current, history, locale }: { current: AnnouncementRow[]; history: AnnouncementRow[]; locale: Locale }) {
  const ar = locale === "ar";
  const currentSlugs = new Set(current.map((a) => a.slug));
  const earlier = history.filter((a) => !currentSlugs.has(a.slug));
  const Card = ({ a, faded }: { a: AnnouncementRow; faded?: boolean }) => (
    <article className={`card p-4 ${faded ? "opacity-70" : ""}`}>
      <h3 className="font-semibold leading-snug">{ar ? a.titleAr : a.titleEn}</h3>
      <p className="mt-1 whitespace-pre-line text-sm">{ar ? a.bodyAr : a.bodyEn}</p>
      {a.imageUrl && <Image src={a.imageUrl} alt="" width={600} height={800} className="mt-3 h-auto w-full rounded-xl" />}
      <p className="mt-2 flex flex-wrap gap-x-2 text-xs text-muted">
        {a.eventDate && <span>{formatHijri(a.eventDate, locale, { bracket: true, weekday: true })}</span>}
        {a.sourceUrl && (
          <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {t(locale, "source")}: {a.sourceHandle}
          </a>
        )}
      </p>
    </article>
  );
  return (
    <div className="mx-auto max-w-2xl">
      <DuroosNav locale={locale} />
      <h1 className="mb-4 text-3xl font-semibold">{t(locale, "updates")}</h1>
      {current.length === 0 ? <EmptyState title={t(locale, "noUpdates")} /> : <div className="grid gap-2.5">{current.map((a) => <Card key={a.slug} a={a} />)}</div>}
      {earlier.length > 0 && (
        <>
          <h2 className="mt-8 mb-2.5 text-sm font-bold uppercase tracking-wide text-muted">{t(locale, "earlier")}</h2>
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
    <div className="mx-auto max-w-2xl">
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
        </>
      )}
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
