import { Clock3 } from "lucide-react";
import type { getToday } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { EmptyState } from "@/components/ui";
import { DarsCard } from "./DarsCard";
import { DuroosNav } from "./DuroosNav";
import { t } from "./strings";

type Today = Awaited<ReturnType<typeof getToday>>;

export function DuroosToday({ today, locale }: { today: Today; locale: Locale }) {
  const ar = locale === "ar";
  const upcoming = today.lessons.filter((l) => l.phase !== "done");
  const finished = today.lessons.filter((l) => l.phase === "done");
  return (
    <div className="mx-auto max-w-2xl">
      <DuroosNav locale={locale} />
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {ar ? `${today.hijri.ar} — ${today.gregorian.ar}` : `${today.hijri.en} · ${today.gregorian.en}`}
      </p>
      <h1 className="mt-1 text-3xl font-semibold">{t(locale, "todaysDuroos")}</h1>
      <p className="mt-1.5 mb-4 flex items-center gap-1.5 text-sm text-muted">
        <Clock3 size={14} />
        {ar ? `الأوقات المعروضة هي وقت الأذان. ${t(locale, "afterIqamah")}.` : `Times shown are the adhan. ${t(locale, "afterIqamah")}.`}
      </p>
      {today.lessons.length === 0 ? (
        <EmptyState title={t(locale, "noLessonsToday")} />
      ) : (
        <div className="grid gap-2.5">
          {upcoming.map((l) => (
            <DarsCard key={l.slug} lesson={l} locale={locale} />
          ))}
          {finished.length > 0 && (
            <>
              <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">{t(locale, "done")}</h2>
              {finished.map((l) => (
                <DarsCard key={l.slug} lesson={l} locale={locale} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
