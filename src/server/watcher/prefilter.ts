import { normalizeArabic, type LessonForMatch } from "./live-notice";

/**
 * Words that mean a schedule changed or something new is announced, written as they look after
 * normalizeArabic (أ إ آ become ا, ة becomes ه, ى becomes ي).
 */
const SCHEDULE_WORDS =
  /(يعتذر|اعتذار|الغاء|الغي|ملغي|تاجيل|تاجل|يؤجل|مؤجل|لا درس|لا يوجد درس|لن يقام|لن يكون|توقف|يتوقف|استئناف|يستانف|استانف|ينقل|نقل الدرس|تغيير موعد|تغير موعد|بدلا من|اجازه|ختم|درس جديد|بدايه شرح|بدايه درس|يبدا شرح|بدء شرح|محاضره|دوره علميه|دوره شرعيه|تعليق|معلق|عوده الدرس|يعود الدرس|يستكمل|استكمال|منقول|مكان الدرس|تغيير مكان|عن بعد|انقطاع|سفر|عطله|غياب|يغيب|بث مباشر|مباشر الان)/;

const NAME_STOP = new Set(["بن", "ابن", "الشيخ", "الله", "عبد", "محمد"]);

/** True when a post from a busy channel is worth one of the AI's few daily reads. */
export function worthReading(text: string, lessons: Pick<LessonForMatch, "shaykhAr">[]): boolean {
  const n = ` ${normalizeArabic(text)} `;
  if (SCHEDULE_WORDS.test(n)) return true;
  // Names a shaykh whose duroos we track: his family name, for example الرحيلي or السحيمي.
  for (const l of lessons) {
    const parts = normalizeArabic(l.shaykhAr).split(" ").filter((t) => t.length >= 4 && !NAME_STOP.has(t));
    const family = parts.at(-1);
    if (family && n.includes(` ${family} `)) return true;
  }
  return false;
}
