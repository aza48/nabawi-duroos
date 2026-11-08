import { Clock3 } from "lucide-react";
import type { getToday } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { toArabicDigits } from "@/lib/locale";
import { PRAYERS } from "@/lib/time/prayer";
import { formatClock } from "@/lib/time/riyadh";
import { t } from "@/features/duroos/strings";
import { DarsMiniCard } from "./DarsMiniCard";
import { DuroosCarousel } from "./DuroosCarousel";

type Today = Awaited<ReturnType<typeof getToday>>;

/** Today's duroos as one card per prayer. Each prayer's lessons sit in a swipeable rail. */
export function DuroosCards({ today, locale }: { today: Today; locale: Locale }) {
  const ar = locale === "ar";

  if (today.lessons.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-card p-8 text-center">
        <p className="font-heading text-lg font-semibold">{t(locale, "noLessonsToday")}</p>
        <p className="mt-1 text-sm text-muted">{ar ? "اطّلع على جدول الأسبوع." : "The weekly schedule shows the rest of the week."}</p>
      </div>
    );
  }

  const notCancelled = (s: string) => s !== "cancelled" && s !== "postponed";
  const upcomingTimes = today.lessons.filter((l) => l.phase === "upcoming" && l.timeKnown && notCancelled(l.status)).map((l) => l.adhanAt);
  const nextTime = upcomingTimes.length ? upcomingTimes.reduce((a, b) => (a < b ? a : b)) : null;

  const count = (n: number) => (ar ? `${toArabicDigits(n)} دروس` : `${n} ${n === 1 ? "dars" : "duroos"}`);

  return (
    <div className="space-y-4">
      <p className="flex items-center gap-2 text-sm text-muted">
        <Clock3 size={15} className="shrink-0" />
        {ar ? `الأوقات المعروضة هي وقت الأذان. ${t(locale, "afterIqamah")}.` : `Times are the adhan. ${t(locale, "afterIqamah")}.`}
      </p>

      {PRAYERS.map((p) => {
        const group = today.lessons.filter((l) => l.prayer === p);
        if (!group.length) return null;
        const many = group.length >= 3;
        return (
          <section key={p} id={`after-${p}`} className="scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-bg-2">
            <div className="flex items-center gap-3 px-5 pb-1 pt-4 sm:px-6">
              <h2 className="font-heading text-xl font-bold sm:text-2xl">
                {t(locale, "after")} {t(locale, p)}
              </h2>
              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{count(group.length)}</span>
              <span className="flex-1" />
              <span className="tabular text-sm font-bold text-primary" dir="ltr">
                {formatClock(new Date(today.prayers[p]), locale)}
              </span>
            </div>
            <div className="px-5 pb-5 pt-2 sm:px-6">
              <DuroosCarousel
                many={many}
                items={group.map((l) => (
                  <DarsMiniCard
                    key={l.slug}
                    lesson={l}
                    locale={locale}
                    isNext={l.adhanAt === nextTime && l.phase === "upcoming" && notCancelled(l.status)}
                  />
                ))}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}
