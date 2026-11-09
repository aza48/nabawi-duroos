import Link from "next/link";
import { ArrowRight, BookOpen, CalendarRange, Fingerprint, MessageCircleQuestion, PlaneLanding, PlaneTakeoff, Wallet, type LucideIcon } from "lucide-react";
import { PageBand, SectionHeader } from "@/components/ui";
import { START_STAGES, type StartStageId } from "@/content/start";
import { toArabicDigits, type Locale } from "@/lib/locale";
import { HELP_CONTACT_DEFAULT, whatsappLink } from "@/server/settings";
import { startCopy } from "./copy";
import { StageCount, StartPanel, StepCard, WhoScope } from "./StartControls";

const STAGE_ICON: Record<StartStageId, LucideIcon> = {
  before: PlaneTakeoff,
  arrival: PlaneLanding,
  "first-72-hours": Fingerprint,
  "first-week": CalendarRange,
  "first-month": Wallet,
  "first-semester": BookOpen,
};

/**
 * The first 100 days in Madinah: every step, in order, rendered in full on the server.
 * Ticks, the arrival date and the "Show steps for" choice live on the reader's phone and are
 * added by the client pieces after the page loads.
 */
export function StartPage({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const t = startCopy(locale);
  return (
    <>
      <PageBand title={t.title} subtitle={t.subtitle}>
        {/* One swipeable row on phones, wrapped on wider screens. */}
        <nav aria-label={t.stagesNav} className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none]">
          {START_STAGES.map((stage, i) => {
            const Icon = STAGE_ICON[stage.id];
            return (
              <a key={stage.id} href={`#${stage.id}`} className="inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                <Icon size={16} className="text-gold-bright" aria-hidden="true" />
                <span className="text-white/75 tabular">{ar ? toArabicDigits(i + 1) : i + 1}</span>
                {ar ? stage.ar : stage.en}
              </a>
            );
          })}
        </nav>
      </PageBand>

      <div className="shell mt-8 grid gap-8 md:mt-12 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[22rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain">
          <StartPanel locale={locale} />
        </aside>

        <WhoScope className="min-w-0 space-y-12 md:space-y-14">
          {START_STAGES.map((stage) => (
            <section key={stage.id} id={stage.id} aria-labelledby={`${stage.id}-title`} className="scroll-mt-24">
              <SectionHeader
                id={`${stage.id}-title`}
                title={ar ? stage.ar : stage.en}
                subtitle={
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span>{ar ? stage.blurbAr : stage.blurbEn}</span>
                    <StageCount stageId={stage.id} locale={locale} />
                  </span>
                }
                icon={STAGE_ICON[stage.id]}
                rtl={ar}
              />
              <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {stage.steps.map((step) => (
                  <StepCard key={step.id} step={step} locale={locale} />
                ))}
              </ol>
            </section>
          ))}

          <div className="rounded-2xl border border-primary/30 bg-primary-soft p-5 md:p-6">
            <Link href={ar ? "/ar/assistant" : "/assistant"} className="group flex flex-wrap items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-ink" aria-hidden="true">
                <MessageCircleQuestion size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg font-semibold group-hover:underline">{t.helpTitle}</span>
                <span className="block text-sm text-muted">{t.helpBody}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 text-primary rtl:rotate-180" aria-hidden="true" />
            </Link>
            <p className="mt-4 border-t border-primary/20 pt-4 text-sm text-muted">
              {t.helpAdmin}
              <a
                href={whatsappLink(HELP_CONTACT_DEFAULT)}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="inline-flex min-h-10 items-center whitespace-nowrap font-semibold text-primary [unicode-bidi:isolate] hover:underline"
              >
                {HELP_CONTACT_DEFAULT}
              </a>
            </p>
          </div>
        </WhoScope>
      </div>
    </>
  );
}
