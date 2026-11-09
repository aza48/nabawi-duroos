import { toArabicDigits, type Locale } from "@/lib/locale";
import type { StartWho } from "./plan";

/** Every fixed word on the first 100 days page, in English and Arabic. */
export const START_COPY = {
  en: {
    title: "Your first 100 days in Madinah",
    subtitle: "Settling in goes in order. Here is what to do and when, from the weeks before your flight to the end of your first semester, with a guide behind every step.",
    stagesNav: "Stages",
    stagesProgress: "Progress by stage",
    progress: "Your progress",
    done: (d: number, n: number) => `${d} of ${n} steps done`,
    allDone: "Every step done. Barakallahu feek.",
    hint: "Tap the circle beside a step to tick it off. It's saved on this phone.",
    again: "Start again",
    arrival: "Arrival date",
    arrivalHint: "Add the day you land and every step shows its date, in both calendars.",
    clear: "Clear date",
    show: "Show steps for",
    who: { all: "Everyone", student: "Students", family: "Families" } satisfies Record<StartWho, string>,
    forTag: { student: "Students", family: "Families" },
    tick: (step: string) => `Done: ${step}`,
    stageCount: (d: number, n: number) => `${d}/${n}`,
    open: { guides: "Read the guide", ask: "Read the answer" },
    helpTitle: "A question on any step?",
    helpBody: "Ask the Meshaykh. It searches every guide and answer for you.",
    helpAdmin: "Or message Admin on WhatsApp at ",
  },
  ar: {
    title: "أيامك المئة الأولى في المدينة",
    subtitle: "الاستقرار يسير بالترتيب. هذا ما تفعله ومتى، من الأسابيع التي تسبق سفرك إلى نهاية فصلك الأول، ولكل خطوة دليل يشرحها.",
    stagesNav: "المراحل",
    stagesProgress: "التقدم في كل مرحلة",
    progress: "تقدمك",
    done: (d: number, n: number) => `${toArabicDigits(d)} من ${toArabicDigits(n)} خطوة`,
    allDone: "أتممت كل الخطوات. بارك الله فيك.",
    hint: "اضغط على الدائرة بجانب الخطوة لتعليمها. يُحفظ ذلك على هذا الهاتف.",
    again: "ابدأ من جديد",
    arrival: "تاريخ الوصول",
    arrivalHint: "أضف يوم وصولك فيظهر لكل خطوة تاريخها بالتقويمين.",
    clear: "امسح التاريخ",
    show: "اعرض خطوات",
    who: { all: "الجميع", student: "الطلاب", family: "الأسر" } satisfies Record<StartWho, string>,
    forTag: { student: "للطلاب", family: "للأسر" },
    tick: (step: string) => `أتممت: ${step}`,
    stageCount: (d: number, n: number) => `${toArabicDigits(d)}/${toArabicDigits(n)}`,
    open: { guides: "اقرأ الدليل", ask: "اقرأ الجواب" },
    helpTitle: "سؤال عن خطوة؟",
    helpBody: "اسأل مساعد MESH، فهو يبحث في كل الأدلة والأجوبة.",
    helpAdmin: "أو راسل المشرف على واتساب على الرقم ",
  },
} as const;

export const startCopy = (locale: Locale) => START_COPY[locale];
