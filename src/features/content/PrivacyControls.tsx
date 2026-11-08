"use client";

import { useEffect, useState } from "react";
import { Check, EyeOff } from "lucide-react";
import { OPT_OUT_KEY, VISITOR_KEYS } from "@/lib/privacy";
import type { Locale } from "@/lib/locale";

type State = "loading" | "counting" | "off" | "gpc";

function read(): State {
  try {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.globalPrivacyControl === true) return "gpc";
    return localStorage.getItem(OPT_OUT_KEY) ? "off" : "counting";
  } catch {
    return "counting";
  }
}

/** The switch on the privacy page: stop or resume anonymous counting on this device. */
export function PrivacyControls({ locale = "en" }: { locale?: Locale }) {
  const ar = locale === "ar";
  const [state, setState] = useState<State>("loading");
  useEffect(() => setState(read()), []);

  const stop = () => {
    try {
      localStorage.setItem(OPT_OUT_KEY, "1");
      for (const k of VISITOR_KEYS) localStorage.removeItem(k);
    } catch {}
    setState(read());
  };
  const resume = () => {
    try {
      localStorage.removeItem(OPT_OUT_KEY);
    } catch {}
    setState(read());
  };

  const text: Record<State, string> = ar
    ? {
        loading: "جارٍ التحقق من إعدادات هذا الجهاز.",
        counting: "زياراتك من هذا المتصفح تُعدّ الآن دون اسم.",
        off: "لا تُعدّ زياراتك من هذا المتصفح. حُذف المعرّف العشوائي.",
        gpc: "متصفحك يرسل إشارة Global Privacy Control، فلا تُعدّ زياراتك هنا.",
      }
    : {
        loading: "Checking this device's setting.",
        counting: "Visits from this browser are counted anonymously.",
        off: "Visits from this browser are not counted. The random id has been removed.",
        gpc: "Your browser sends the Global Privacy Control signal, so nothing is counted here.",
      };

  return (
    <div className="mt-5 rounded-2xl border border-line bg-card p-5" data-no-track>
      <p className="flex items-start gap-3 text-sm">
        <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${state === "counting" ? "bg-primary-soft text-primary" : "bg-gold-bg text-gold"}`}>
          {state === "counting" ? <Check size={14} /> : <EyeOff size={14} />}
        </span>
        <span aria-live="polite">{text[state]}</span>
      </p>
      {state === "counting" && (
        <button type="button" onClick={stop} className="mt-4 inline-flex min-h-11 items-center rounded-full border border-primary px-5 font-semibold text-primary transition hover:bg-primary-soft">
          {ar ? "أوقف عدّ زياراتي على هذا الجهاز" : "Stop counting my visits on this device"}
        </button>
      )}
      {state === "off" && (
        <button type="button" onClick={resume} className="mt-4 inline-flex min-h-11 items-center rounded-full border border-line px-5 font-semibold transition hover:border-primary">
          {ar ? "أعد عدّ زياراتي" : "Count my visits again"}
        </button>
      )}
    </div>
  );
}
