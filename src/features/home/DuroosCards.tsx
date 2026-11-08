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

/** Today's duroos as one card per prayer. On phones each prayer shows its priority lesson with a button for the rest; wider screens use a swipeable rail. */
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

  const count = (n: number) => (ar ? (n === 1 ? "درس واحد" : n === 2 ? "درسان" : `${toArabicDigits(n)} دروس`) : `${n} ${n === 1 ? "dars" : "duroos"}`);

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
        const isNext = (l: (typeof group)[number]) => l.adhanAt === nextTime && l.phase === "upcoming" && notCancelled(l.status);
        const others = group.length - 1;
        const moreLabel = ar ? `عرض ${toArabicDigits(others)} ${others === 1 ? "درس آخر" : "دروس أخرى"}` : `Show ${others} more`;
        const lessLabel = ar ? "إخفاء" : "Show less";
        return (
          <section key={p} id={`after-${p}`} className="scroll-mt-28 overflow-hidden rounded-3xl border border-line/70 border-s-4 border-s-primary bg-bg shadow-[var(--shadow)]">
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
                meta={group.map((l) => ({ liveFrom: l.liveFrom, liveUntil: l.liveUntil, adhanAt: l.adhanAt, timeKnown: l.timeKnown, off: !notCancelled(l.status), phase: l.phase }))}
                moreLabel={moreLabel}
                lessLabel={lessLabel}
                items={group.map((l) => (
                  <DarsMiniCard
                    key={l.slug}
                    lesson={l}
                    locale={locale}
                    isNext={isNext(l)}
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
