import { Clock3 } from "lucide-react";
import type { getToday } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { formatClock } from "@/lib/time/riyadh";
import { PRAYERS } from "@/lib/time/prayers";
import { DarsCard } from "@/features/duroos/DarsCard";
import { t } from "@/features/duroos/strings";
import { arCount, enCount } from "@/lib/arabic-count";

type Today = Awaited<ReturnType<typeof getToday>>;

/** Today's duroos grouped under the prayer they follow. Each group is an anchor the day arc links to. */
export function DuroosByPrayer({ today, locale }: { today: Today; locale: Locale }) {
  const ar = locale === "ar";
  if (today.lessons.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-card p-8 text-center">
        <p className="font-heading text-lg font-semibold">{t(locale, "noLessonsToday")}</p>
        <p className="mt-1 text-sm text-muted">{ar ? "اطّلع على جدول الأسبوع." : "The weekly schedule shows the rest of the week."}</p>
      </div>
    );
  }
  return (
    <div className="space-y-9">
      <p className="flex items-center gap-2 text-sm text-muted">
        <Clock3 size={15} className="shrink-0" />
        {ar ? `الأوقات المعروضة هي وقت الأذان. ${t(locale, "afterIqamah")}.` : `Times are the adhan. ${t(locale, "afterIqamah")}.`}
      </p>
      {PRAYERS.map((p) => {
        const group = today.lessons.filter((l) => l.prayer === p);
        if (!group.length) return null;
        const timed = group.filter((l) => l.timeKnown);
        const allDone = timed.length > 0 && timed.every((l) => l.phase === "done");
        return (
          <section key={p} id={`after-${p}`} className="scroll-mt-28">
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className="font-heading text-2xl font-bold">
                {t(locale, "after")} {t(locale, p)}
              </h2>
              <span className="text-sm text-muted tabular" dir="ltr">
                {formatClock(new Date(today.prayers[p]), locale)}
              </span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
              <span className="text-sm text-muted">
                {allDone ? (ar ? "انتهت" : "Finished") : ar ? arCount(group.length, "dars") : enCount(group.length, "dars", "duroos")}
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {group.map((l) => (
                <DarsCard key={l.slug} lesson={l} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
