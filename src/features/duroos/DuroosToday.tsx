import type { getToday } from "@/server/duroos/queries";
import type { Locale } from "@/lib/locale";
import { TodayHero } from "@/features/home/TodayHero";
import { DuroosCards } from "@/features/home/DuroosCards";
import { DuroosNav } from "./DuroosNav";
import { t } from "./strings";
import { NowNext } from "./NowNext";
import { slimLesson } from "./now-next";

type Today = Awaited<ReturnType<typeof getToday>>;

export function DuroosToday({ today, locale }: { today: Today; locale: Locale }) {
  return (
    <>
      <TodayHero today={today} locale={locale} title={t(locale, "todaysDuroos")} />
      <div className="shell pt-6 md:pt-8" id="live">
        <DuroosNav locale={locale} />
        <div className="mt-4 max-w-5xl">
          <NowNext lessons={today.lessons.map(slimLesson)} serverNow={Date.now()} locale={locale} />
          <DuroosCards today={today} locale={locale} />
        </div>
      </div>
    </>
  );
}
