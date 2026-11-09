"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, RotateCcw } from "lucide-react";
import { START_STAGES, START_STEPS, type StartStageId, type StartStep } from "@/content/start";
import type { Locale } from "@/lib/locale";
import { startCopy } from "./copy";
import { dayLabel, dueLabel, isIsoDate, progressOf, toggleDone, type StartWho } from "./plan";
import { updateStart, useStart } from "./store";

/**
 * The small interactive pieces of the first 100 days page. The server renders the whole page;
 * these read the plan saved on this phone after it loads and add the ticks and dates.
 */

const WHO: StartWho[] = ["all", "student", "family"];

function Bar({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} className="h-1.5 overflow-hidden rounded-full bg-bg-2">
      <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Wraps the stages so the "Show steps for" choice can hide the steps for the other group. */
export function WhoScope({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const { who } = useStart();
  return (
    <div data-who={who} className={className}>
      {children}
    </div>
  );
}

/** Progress, arrival date, who the plan is for, and (on wide screens) progress per stage. */
export function StartPanel({ locale = "en" }: { locale?: Locale }) {
  const t = startCopy(locale);
  const ar = locale === "ar";
  const { done, arrival, who } = useStart();
  // The field's own text, so a half typed date is not wiped. It follows the saved date whenever that
  // changes from outside the field: the plan loading, the Clear button, another tab.
  const [draft, setDraft] = useState(arrival ?? "");
  const [seen, setSeen] = useState(arrival);
  if (seen !== arrival) {
    setSeen(arrival);
    setDraft(arrival ?? "");
  }
  const all = progressOf(START_STEPS, done, who);
  const finished = all.total > 0 && all.done === all.total;
  return (
    <div className="space-y-6 rounded-2xl border border-line bg-card p-4 md:p-5">
      <section aria-labelledby="start-progress">
        <div className="flex min-h-10 items-center justify-between gap-3">
          <h2 id="start-progress" className="font-heading text-lg font-bold">{t.progress}</h2>
          {done.length > 0 && (
            <button type="button" onClick={() => updateStart((s) => ({ ...s, done: [] }))} className="-me-2 flex min-h-10 items-center gap-1 rounded-lg px-2 text-sm text-muted hover:text-ink">
              <RotateCcw size={14} aria-hidden="true" /> {t.again}
            </button>
          )}
        </div>
        <p className="mb-2 mt-1 text-sm font-semibold tabular" aria-live="polite">
          {finished ? t.allDone : t.done(all.done, all.total)}
        </p>
        <Bar done={all.done} total={all.total} label={t.progress} />
        <p className="mt-2 text-xs text-muted">{t.hint}</p>
      </section>

      <section>
        <label htmlFor="start-arrival" className="block text-sm font-semibold">{t.arrival}</label>
        <p id="start-arrival-hint" className="mt-0.5 text-xs text-muted">{t.arrivalHint}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            id="start-arrival"
            type="date"
            aria-describedby="start-arrival-hint"
            value={draft}
            min="2000-01-01"
            max="2100-12-31"
            onChange={(e) => {
              // Keep what is typed, even a year typed one digit at a time, and save only a full date.
              const v = e.target.value;
              setDraft(v);
              if (isIsoDate(v)) {
                if (v !== arrival) updateStart((s) => ({ ...s, arrival: v }));
              } else if (v === "" && arrival) {
                updateStart((s) => ({ ...s, arrival: null }));
              }
            }}
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {arrival && (
            <button type="button" onClick={() => updateStart((s) => ({ ...s, arrival: null }))} className="min-h-11 rounded-xl px-3 text-sm font-medium text-muted hover:bg-bg-2 hover:text-ink">
              {t.clear}
            </button>
          )}
        </div>
      </section>

      <fieldset>
        <legend className="text-sm font-semibold">{t.show}</legend>
        <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-bg-2 p-1">
          {WHO.map((w) => (
            <button
              key={w}
              type="button"
              aria-pressed={who === w}
              onClick={() => updateStart((s) => ({ ...s, who: w }))}
              className={`min-h-10 rounded-lg px-2 text-sm font-semibold transition ${who === w ? "bg-card text-primary shadow-[var(--shadow)]" : "text-muted hover:text-ink"}`}
            >
              {t.who[w]}
            </button>
          ))}
        </div>
      </fieldset>

      <nav aria-label={t.stagesProgress} className="hidden lg:block">
        <ol className="space-y-1">
          {START_STAGES.map((stage) => {
            const p = progressOf(stage.steps, done, who);
            return (
              <li key={stage.id}>
                <a href={`#${stage.id}`} className="block rounded-xl px-2 py-2 transition hover:bg-bg-2">
                  <span className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-medium">{ar ? stage.ar : stage.en}</span>
                    <span className="tabular text-xs text-muted">{t.stageCount(p.done, p.total)}</span>
                  </span>
                  <span className="mt-1.5 block">
                    <Bar done={p.done} total={p.total} label={ar ? stage.ar : stage.en} />
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

/** "2/6" beside a stage's title, counting the steps that show. */
export function StageCount({ stageId, locale = "en" }: { stageId: StartStageId; locale?: Locale }) {
  const t = startCopy(locale);
  const { done, who } = useStart();
  const stage = START_STAGES.find((s) => s.id === stageId);
  if (!stage) return null;
  const p = progressOf(stage.steps, done, who);
  const finished = p.total > 0 && p.done === p.total;
  return (
    <span className={`inline-flex min-h-7 items-center gap-1 rounded-full px-2.5 text-xs font-semibold tabular ${finished ? "bg-primary text-primary-ink" : "bg-primary-soft text-primary"}`}>
      {finished && <Check size={13} aria-hidden="true" />}
      {t.stageCount(p.done, p.total)}
    </span>
  );
}

/** One step: a tick button, the line itself, when it is due, and the guide or answer behind it. */
export function StepCard({ step, locale = "en" }: { step: StartStep; locale?: Locale }) {
  const t = startCopy(locale);
  const ar = locale === "ar";
  const { done, arrival } = useStart();
  const ticked = done.includes(step.id);
  const text = ar ? step.ar : step.en;
  const due = dueLabel(arrival, step.by, locale);
  const kind = step.href.startsWith("/ask/") ? "ask" : "guides";
  // Hidden by WhoScope when the reader shows only the other group's steps.
  const scope = step.for === "student" ? "[[data-who=family]_&]:hidden" : step.for === "family" ? "[[data-who=student]_&]:hidden" : "";
  return (
    <li
      data-for={step.for}
      className={`flex gap-2 rounded-2xl border p-3 transition-colors md:p-4 ${ticked ? "border-primary/40 bg-primary-soft" : "border-line bg-card"} ${scope}`}
    >
      <button
        type="button"
        aria-pressed={ticked}
        aria-label={t.tick(text)}
        onClick={() => updateStart((s) => ({ ...s, done: toggleDone(s.done, step.id) }))}
        className="group/tick -my-1 grid size-11 shrink-0 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span
          className={`grid size-7 place-items-center rounded-full border-2 transition ${ticked ? "border-primary bg-primary text-primary-ink" : "border-muted bg-bg text-transparent group-hover/tick:border-primary"}`}
          aria-hidden="true"
        >
          <Check size={16} strokeWidth={3} />
        </span>
      </button>
      <div className="min-w-0 flex-1 pt-1.5">
        <p className={`leading-snug ${ticked ? "text-muted line-through decoration-ink/30" : ""}`}>{text}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-accent">
            <CalendarDays size={13} aria-hidden="true" className="shrink-0" />
            {due ? <time dateTime={due.iso}>{due.text}</time> : dayLabel(step.by, locale)}
          </span>
          {step.for && <span className="rounded-full bg-gold-bg px-2 py-0.5 font-semibold text-amber">{t.forTag[step.for]}</span>}
          <Link href={`${ar ? "/ar" : ""}${step.href}`} className="-my-1.5 ms-auto inline-flex min-h-10 items-center gap-1 font-semibold text-primary underline-offset-2 hover:underline">
            {t.open[kind]}
            <ArrowRight size={13} aria-hidden="true" className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </li>
  );
}
