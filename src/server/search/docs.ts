import type { Db } from "@/server/db/client";
import * as COMPANY from "@/features/guides/company/content";
import { listFaqs, listGuides } from "@/server/content/queries";
import { listShaykhs, scheduleRows } from "@/server/duroos/queries";
import { PROGRAMS } from "@/content/programs";
import { CHANNELS, MAHAD_EXTRA, OFFICIAL } from "@/content/library";
import { LIVE_COLLECTIONS, isFolder, levelLabel, subjectHint, treeOf, type LibFolder } from "@/content/library-books";
import { DISCOUNTS } from "@/content/discounts";
import { KEY_DATES } from "@/content/key-dates";
import { GLOSSARY } from "@/content/glossary";
import { formatGregorian } from "@/lib/time/hijri";
import { riyadhDateIso } from "@/lib/time/riyadh";
import type { SearchDoc } from "@/lib/search/engine";

const plain = (html: string, max = 1200) => html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
/** A guide's headings: a search for a section's subject ("Uhud", "Cooking gas") finds the guide, however long it is. */
const headings = (html: string) => [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)].map((m) => plain(m[1], 200)).join(" · ");
const guideText = (html: string) => `${headings(html)} ${plain(html)}`;
const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PRAYER_AR: Record<string, string> = { fajr: "الفجر", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء" };

const PAGES: SearchDoc[] = [
  { id: "page-duroos", type: "page", title: "Today's duroos", subtitle: "Live schedule of the mashayikh, today", titleAr: "دروس اليوم", subtitleAr: "جدول دروس المشايخ اليوم، مباشرة", text: "lessons today haram nabawi quba cancelled live", url: "/duroos" },
  { id: "page-schedule", type: "page", title: "Weekly schedule", subtitle: "Every regular dars by day and prayer", titleAr: "الجدول الأسبوعي", subtitleAr: "كل الدروس الثابتة حسب اليوم والصلاة", text: "week timetable", url: "/duroos/schedule" },
  { id: "page-live", type: "page", title: "Live streams", subtitle: "Watch the Haram duroos live", titleAr: "البث المباشر", subtitleAr: "تابع دروس الحرم مباشرة", text: "broadcast youtube mixlr audio video", url: "/duroos/live" },
  { id: "page-updates", type: "page", title: "Duroos updates", subtitle: "Cancellations, postponements and new books", titleAr: "آخر التحديثات", subtitleAr: "الإلغاءات والتأجيلات والكتب الجديدة", text: "cancelled postponed changes", url: "/duroos/updates" },
  { id: "page-programs", type: "page", title: "Study in Madinah", subtitle: "Arabic institutes, degrees and sisters' marakiz compared", titleAr: "الدراسة في المدينة", subtitleAr: "معاهد العربية والدرجات الجامعية ومراكز الأخوات", text: "learn arabic course", url: "/programs" },
  { id: "page-mahad", type: "page", title: "Ma'had hub", subtitle: "Books by level, answer keys, rules and what happens if you fail a level", titleAr: "دليل المعهد", subtitleAr: "الكتب حسب المستوى ومفاتيح الإجابات والأنظمة", text: "mahad arabic language institute levels textbooks answer keys fail level mustawa", url: "/mahad" },
  { id: "page-library", type: "page", title: "The Jamiah library", subtitle: "Muqarrarat and Ma'had books", titleAr: "المكتبة", subtitleAr: "مقررات الجامعة وكتب المعهد", text: "pdf books takhlees", url: "/library" },
  { id: "page-discounts", type: "page", title: "Student discounts", subtitle: "Offers with your University card", titleAr: "خصومات الطلاب", subtitleAr: "عروض ببطاقتك الجامعية", text: "deals offers", url: "/discounts" },
  { id: "page-alerts", type: "page", title: "Phone alerts", subtitle: "Free notifications when a dars changes", titleAr: "تنبيهات الجوال", subtitleAr: "تنبيهات مجانية عند تغيّر أي درس", text: "notifications push morning brief", url: "/more#alerts" },
  { id: "page-start", type: "page", title: "Your first 100 days", subtitle: "Start here: what to do first, week by week", titleAr: "أول ١٠٠ يوم", subtitleAr: "ابدأ هنا: ماذا تفعل أولًا، أسبوعًا بأسبوع", text: "start here new arrival first steps checklist new student begin", url: "/start" },
  { id: "page-glossary", type: "page", title: "Glossary of local words", subtitle: "Iqama, mukafa'ah, ta'jeel and every word newcomers meet", titleAr: "المصطلحات", subtitleAr: "الكلمات التي يسمعها القادم الجديد ومعانيها", text: "glossary words meaning terms dictionary definitions what does mean", url: "/glossary" },
  { id: "page-assistant", type: "page", title: "Ask the MESHaykh", subtitle: "Ask any question about life and study in Madinah", titleAr: "مساعد MESH", subtitleAr: "اسأل أي سؤال عن الحياة والدراسة في المدينة", text: "assistant ask question chat help ai answer", url: "/assistant" },
  { id: "page-sisters", type: "page", title: "Duroos for sisters", subtitle: "Lessons for women in Madinah", titleAr: "دروس النساء", subtitleAr: "دروس للأخوات في المدينة", text: "sisters women ladies female duroos lessons halaqat", url: "/duroos/sisters" },
  { id: "page-answers", type: "page", title: "Questions and answers", subtitle: "Short, checked answers to common questions", titleAr: "أسئلة وأجوبة", subtitleAr: "أجوبة قصيرة موثّقة عن الأسئلة الشائعة", text: "faq questions answers", url: "/ask" },
  { id: "page-guides", type: "page", title: "All guides", subtitle: "Every MESH guide, by topic", titleAr: "كل الأدلة", subtitleAr: "كل أدلة MESH حسب الموضوع", text: "guides how to", url: "/guides" },
  { id: "page-lite", type: "page", title: "MESH Lite", subtitle: "Today's duroos on a slow connection", titleAr: "MESH الخفيف", subtitleAr: "دروس اليوم على اتصال ضعيف", text: "lite light slow data offline", url: "/lite" },
  { id: "page-group", type: "page", title: "Join the MESH WhatsApp group", subtitle: "Announcements, events and daily help", titleAr: "انضم لمجموعة MESH على واتساب", subtitleAr: "الإعلانات والفعاليات والمساعدة اليومية", text: "whatsapp community", url: "/more#rules" },
];

/** Everything searchable on the site, in one list. */
export async function buildSearchDocs(db: Db, now = new Date()): Promise<SearchDoc[]> {
  const today = riyadhDateIso(now);
  const [guides, faqs, shaykhs, lessons] = await Promise.all([listGuides(db), listFaqs(db), listShaykhs(db), scheduleRows(db)]);
  return [
    ...PAGES,
    { id: `guide-${COMPANY.SLUG}`, type: "guide" as const, title: COMPANY.TITLE, subtitle: COMPANY.SUMMARY, text: COMPANY.SEARCH_TEXT, url: `/guides/${COMPANY.SLUG}` },
    ...guides.map((g) => ({ id: `guide-${g.slug}`, type: "guide" as const, title: g.title, subtitle: g.summary, text: guideText(g.bodyHtml), url: `/guides/${g.slug}` })),
    ...faqs.map((f) => ({ id: `faq-${f.slug}`, type: "faq" as const, title: f.question, subtitle: plain(f.answerHtml, 160), text: plain(f.answerHtml), url: `/ask/${f.slug}` })),
    ...PROGRAMS.map((p) => ({ id: `program-${p.slug}`, type: "program" as const, title: p.name, subtitle: `${p.tagline} ${p.price}`, titleAr: p.nameAr, subtitleAr: "", text: `${p.nameAr} ${p.overview.join(" ")} ${(p.levels ?? []).join(" ")} ${p.audience.join(" ")}`, url: `/programs/${p.slug}` })),
    ...shaykhs.map((s) => ({ id: `shaykh-${s.slug}`, type: "shaykh" as const, title: s.nameEn, subtitle: s.nameAr, titleAr: s.nameAr, subtitleAr: s.roleAr ?? "", text: `${s.roleEn ?? ""} ${s.roleAr ?? ""} ${lessons.filter((l) => l.shaykh.slug === s.slug).map((l) => `${l.bookEn} ${l.bookAr}`).join(" ")}`, url: `/duroos/shaykh/${s.slug}` })),
    ...lessons.map((l) => ({
      id: `dars-${l.slug}`,
      type: "dars" as const,
      title: l.bookEn,
      subtitle: `${l.shaykh.nameEn}, after ${l.prayer}, ${l.masjid.shortEn}${l.days.length ? `, ${l.days.map((d) => DAY[d]).join(" ")}` : ""}`,
      titleAr: l.bookAr || undefined,
      subtitleAr: `${l.shaykh.nameAr}، بعد ${PRAYER_AR[l.prayer] ?? l.prayer}، ${l.masjid.shortAr}`,
      text: `${l.bookAr} ${l.shaykh.nameAr} ${l.masjid.nameEn} ${l.masjid.nameAr} ${l.locationEn} ${l.prayer}`,
      url: `/duroos/lesson/${l.slug}`,
    })),
    ...[...MAHAD_EXTRA, ...OFFICIAL, ...CHANNELS].map((x, i) => ({ id: `lib-${i}`, type: "library" as const, title: x.title, subtitle: x.titleAr ?? x.note, titleAr: x.titleAr, subtitleAr: x.noteAr ?? "", text: `${x.note ?? ""} ${x.titleAr ?? ""}`, url: x.href })),
    ...LIVE_COLLECTIONS.map((c) => ({ id: `col-${c.slug}`, type: "library" as const, title: `${c.title} course books`, subtitle: c.titleAr, titleAr: `مقررات ${c.titleAr}`, subtitleAr: c.blurbAr, text: `${c.blurb} curriculum course books muqarrarat المقررات books levels summaries takhlees تلخيص`, url: `/library/${c.slug}` })),
    ...LIVE_COLLECTIONS.flatMap((c) => {
      const out: { id: string; type: "library"; title: string; subtitle: string; titleAr: string; subtitleAr: string; text: string; url: string }[] = [];
      for (const level of treeOf(c.slug)!.f.filter(isFolder)) {
        for (const sub of level.f.filter(isFolder) as LibFolder[]) {
          out.push({ id: `sub-${sub.id}`, type: "library", title: sub.t, subtitle: `${c.title}, ${levelLabel(level.t) ?? level.t}`, titleAr: sub.t, subtitleAr: `${c.titleAr}، ${level.t}`, text: `${subjectHint(sub.t) ?? ""} ${c.title} ${level.t} course book`, url: `/library/${c.slug}#f-${level.id}` });
        }
      }
      return out;
    }),
    // The University calendar, from today on: "final exams", "eid holiday" and "ramadan" show the date itself.
    ...KEY_DATES.filter((d) => (d.end ?? d.start) >= today).map((d) => ({
      id: `date-${d.id}`,
      type: "date" as const,
      title: d.title,
      subtitle: `${formatGregorian(d.start, "en")}${d.end ? ` to ${formatGregorian(d.end, "en")}` : ""} (${d.hijri})`,
      titleAr: d.titleAr,
      subtitleAr: `${formatGregorian(d.start, "ar")}${d.end ? ` إلى ${formatGregorian(d.end, "ar")}` : ""}`,
      text: `${d.kind} ${d.term ?? ""} date dates calendar when ${d.after ?? ""} ${d.afterAr ?? ""}`,
      url: "/guides/university-calendar-1448",
    })),
    // Local words: "mukafaah" or "what is an iqama" shows its meaning in the result itself.
    ...GLOSSARY.map((t) => ({ id: `term-${t.id}`, type: "term" as const, title: t.term, subtitle: t.meaning, titleAr: t.ar, subtitleAr: t.meaning, text: `${t.match.join(" ")} ${t.use} meaning definition`, url: `/glossary#${t.id}` })),
    ...DISCOUNTS.flatMap((g) => g.offers.map((o, i) => ({ id: `deal-${g.id}-${i}`, type: "discount" as const, title: o.nameEn ?? o.name, subtitle: o.deal, titleAr: o.name, subtitleAr: g.labelAr, text: `${o.name} ${g.label}`, url: `/discounts` }))),
  ];
}
