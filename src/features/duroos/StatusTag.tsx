import type { DayStatus } from "@/server/duroos/schedule";
import type { Locale } from "@/lib/locale";
import { t } from "./strings";

const STYLE: Record<DayStatus, string> = {
  on: "bg-on-bg text-on",
  resumed: "bg-on-bg text-on",
  cancelled: "bg-cancel-bg text-cancel",
  postponed: "bg-amber-bg text-amber",
  moved: "bg-amber-bg text-amber",
  guest: "bg-gold-bg text-gold",
};

export function StatusTag({ status, locale }: { status: DayStatus; locale: Locale }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10.5px] font-bold tracking-wide ${STYLE[status]}`}>
      {t(locale, status)}
    </span>
  );
}

export function LiveBadge({ locale, href }: { locale: Locale; href?: string | null }) {
  const inner = (
    <>
      <span className="live-dot size-2 rounded-full bg-live" />
      {t(locale, "liveNow")}
    </>
  );
  const cls = "inline-flex items-center gap-1.5 rounded-full bg-cancel-bg px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-live";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}
