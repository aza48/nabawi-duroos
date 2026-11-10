"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, User, Users } from "lucide-react";
import {
  EMPTY_WHO,
  GENDER_LABEL,
  HOUSEHOLD_LABEL,
  PLACE_LABEL,
  WHO_GENDERS,
  WHO_HOUSEHOLDS,
  WHO_PLACES,
  WHO_SAVED_NOTE,
  hasAnswers,
  startLinkFor,
  startViewChange,
  summariseWho,
  type WhoProfile,
} from "./who";
import { saveWho, useWho } from "./whoStore";

/**
 * "Who are you?" above the home page guides: three one-tap questions (brother or sister, single or
 * with family, what brings you to Madinah), asked once and saved on this device. Once answered or
 * skipped it folds to a "For you" line beside one link into the first 100 days.
 *
 * Both views sit in a box of the same height, so nothing below moves when the saved answers load
 * or when the questions fold away. The server renders the folded view with no answers.
 *
 * Skip, Clear and Cancel come after the answers in the page order (focus moves to the question
 * after each tap, so Tab reaches the answers first and then these), and sit at the top of the box.
 */

const STEPS = ["gender", "household", "place"] as const;
type Step = 0 | 1 | 2;

const QUESTION: Record<Step, string> = {
  0: "Are you a brother or a sister?",
  1: "Single, or with family?",
  2: "What brings you to Madinah?",
};

type Option = { value: string; label: string; hint?: string; art: React.ReactNode };

function optionsFor(step: Step): Option[] {
  if (step === 0) {
    const ar = { brother: "أخ", sister: "أخت" } as const;
    return WHO_GENDERS.map((g) => ({
      value: g,
      label: GENDER_LABEL[g],
      art: (
        <span lang="ar" aria-hidden="true" className="ar-text text-xl leading-none text-gold">
          {ar[g]}
        </span>
      ),
    }));
  }
  if (step === 1) {
    return WHO_HOUSEHOLDS.map((h) => ({
      value: h,
      label: HOUSEHOLD_LABEL[h],
      hint: h === "single" ? "Just me" : "Spouse or children",
      art: h === "single" ? <User size={22} className="text-gold" /> : <Users size={22} className="text-gold" />,
    }));
  }
  return WHO_PLACES.map((p) => ({ value: p, label: PLACE_LABEL[p].label, hint: PLACE_LABEL[p].hint, art: null }));
}

/** The box both views share: the same height at every width, so the grid below stays put. */
const BOX =
  "grid min-h-[14.625rem] content-start gap-3 md:min-h-[8.75rem] md:grid-cols-[15rem_minmax(0,1fr)] md:gap-5 lg:min-h-24 lg:grid-cols-[21rem_minmax(0,1fr)]";

const OPTION =
  "relative flex flex-col rounded-xl border px-3 text-start font-semibold transition hover:border-primary/60 hover:bg-primary-soft";

const ACTION = "inline-flex min-h-10 items-center rounded-lg px-3 text-sm font-semibold";

/** The small top line of both views: a label on one side, its buttons (if any) on the other. */
function TopLine({ label, children, reserve }: { label: React.ReactNode; children?: React.ReactNode; reserve?: boolean }) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-2">
      <p className={`min-w-0 text-xs font-bold uppercase tracking-wide text-gold ${reserve ? "pe-36" : ""}`}>{label}</p>
      {children && <div className="-me-3 flex shrink-0 items-center">{children}</div>}
    </div>
  );
}

export function WhoChooser({ initial }: { initial?: WhoProfile | null }) {
  const saved = useWho();
  const profile = initial !== undefined ? initial : saved;
  // null: follow what is saved (ask when nothing is). true or false: the reader opened or closed it.
  const [editing, setEditing] = useState<boolean | null>(null);
  const [step, setStep] = useState<Step>(0);
  const [draft, setDraft] = useState<WhoProfile>(EMPTY_WHO);
  const [said, setSaid] = useState("");
  // Where focus goes after a tap, so keyboard and screen reader users follow along.
  const [focusTo, setFocusTo] = useState<"question" | "change" | null>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const changeRef = useRef<HTMLButtonElement>(null);

  const asking = editing ?? profile === null;
  const changing = hasAnswers(profile);

  useEffect(() => {
    if (!focusTo) return;
    (focusTo === "question" ? questionRef : changeRef).current?.focus();
    setFocusTo(null);
  }, [focusTo]);

  function close(message: string) {
    setEditing(false);
    setSaid(message);
    setFocusTo("change");
  }

  function finish(p: WhoProfile) {
    const view = startViewChange(profile, p);
    saveWho(p);
    // The /start plan store (and the steps it reads) loads only when the view has to change.
    if (view) {
      void import("@/features/start/store")
        .then(({ updateStart }) =>
          updateStart((s) => (view === "family" ? (s.who === "all" ? { ...s, who: "family" } : s) : s.who === "family" ? { ...s, who: "all" } : s)),
        )
        .catch(() => {});
    }
    close(hasAnswers(p) ? "Saved. The guides for you now come first." : "Done. The guides show in their usual order.");
  }

  function answer(value: string) {
    const next = { ...draft, [STEPS[step]]: value } as WhoProfile;
    setDraft(next);
    if (step < 2) {
      setStep((step + 1) as Step);
      setSaid("");
      setFocusTo("question");
    } else {
      finish({ ...next, skipped: false });
    }
  }

  function open() {
    setDraft(profile ?? EMPTY_WHO);
    setStep(0);
    setSaid("");
    setEditing(true);
    setFocusTo("question");
  }

  const link = startLinkFor(profile);
  const summary = summariseWho(profile);
  const helper = step === 2 && draft.household === "family" ? "With family, choose for the student." : `Your guides come first. ${WHO_SAVED_NOTE.en}`;

  return (
    <div className="relative rounded-2xl border border-line bg-card p-4 shadow-[var(--shadow)] md:p-5" data-who={asking ? "asking" : "folded"}>
      <p className="sr-only" aria-live="polite">
        {said}
      </p>
      {asking ? (
        <>
          <div className={BOX}>
            <div className="min-w-0">
              <TopLine
                reserve
                label={
                  <>
                    Who are you? <span className="tabular font-semibold text-muted">{`· ${step + 1} of 3`}</span>
                  </>
                }
              />
              <h3 ref={questionRef} tabIndex={-1} id="who-question" className="font-heading text-lg font-bold leading-snug md:text-xl">
                {QUESTION[step]}
              </h3>
              {/* On phones step 3 needs the room for its hints, so the line shows from tablets up there. */}
              <p className={`mt-1 text-sm text-muted ${step === 2 ? "hidden md:block" : ""}`}>{helper}</p>
            </div>
            <div role="group" aria-labelledby="who-question" className={step === 2 ? "flex flex-wrap gap-2 lg:flex-nowrap" : "grid grid-cols-2 gap-2"}>
              {optionsFor(step).map((o) => {
                const pressed = draft[STEPS[step]] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => answer(o.value)}
                    className={`${OPTION} ${
                      step === 2
                        ? "min-h-14 grow basis-[calc((100%-1rem)/3)] justify-center py-1.5 lg:min-h-24 lg:basis-0 lg:py-2"
                        : "min-h-24 items-start justify-between py-3 md:flex-row md:items-center md:justify-start md:gap-4 md:px-4"
                    } ${pressed ? "border-primary bg-primary-soft text-primary" : "border-line"}`}
                  >
                    {o.art && (
                      <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-bg md:size-12">
                        {o.art}
                      </span>
                    )}
                    <span className="block leading-tight">
                      <span className={`block text-[15px] ${step === 2 ? "md:text-base" : "md:text-lg"}`}>{o.label}</span>
                      {o.hint && <span className="mt-0.5 block text-xs font-normal text-muted">{o.hint}</span>}
                    </span>
                    {pressed && <Check size={16} aria-hidden="true" className="absolute end-2 top-2 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* After the answers in the page order; on screen at the end of the top line, over the question column. */}
          <div className="pointer-events-none absolute inset-x-4 top-4 flex justify-end md:end-auto md:start-5 md:top-5 md:w-60 lg:w-[21rem]">
            <div className="pointer-events-auto -me-3 flex items-center">
              {changing ? (
                <>
                  <button type="button" onClick={() => finish({ ...EMPTY_WHO, skipped: true })} className={`${ACTION} text-muted hover:text-ink`}>
                    Clear
                  </button>
                  <button type="button" onClick={() => close("")} className={`${ACTION} text-muted hover:text-ink`}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => finish({ ...draft, skipped: true })} className={`${ACTION} text-muted hover:text-ink`}>
                  Skip
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={BOX}>
          <div className="min-w-0">
            <TopLine label="For you">
              <button ref={changeRef} type="button" onClick={open} aria-describedby="who-summary" className={`${ACTION} text-primary hover:underline`}>
                {summary ? "Change" : "Choose"}
              </button>
            </TopLine>
            <p id="who-summary" className="font-heading text-lg font-bold leading-snug md:text-xl">
              {summary ?? "Guides for everyone"}
            </p>
            <p className="mt-1 text-sm text-muted">{summary ? `Your guides come first. ${WHO_SAVED_NOTE.en}` : "Three taps put the guides for you first."}</p>
          </div>
          <Link href={link.href} className="group flex min-h-24 items-center gap-4 rounded-xl bg-primary-soft px-4 py-3 transition hover:bg-primary/15">
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wide text-gold">{link.eyebrow}</span>
              <span className="mt-0.5 block font-heading text-lg font-bold leading-snug text-ink group-hover:underline">{link.title}</span>
              <span className="mt-0.5 line-clamp-2 text-sm text-muted">{link.body}</span>
            </span>
            <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-primary transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
