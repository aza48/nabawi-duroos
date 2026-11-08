import type { Db } from "@/server/db/client";
import * as COMPANY from "@/features/guides/company/content";
import { listFaqs, listGuides } from "@/server/content/queries";
import { listShaykhs, scheduleRows } from "@/server/duroos/queries";
import { PROGRAMS } from "@/content/programs";
import { CHANNELS, MAHAD_EXTRA, OFFICIAL } from "@/content/library";
import { LIVE_COLLECTIONS, isFolder, levelLabel, subjectHint, treeOf, type LibFolder } from "@/content/library-books";
import { DISCOUNTS } from "@/content/discounts";
import type { SearchDoc } from "@/lib/search/engine";

const plain = (html: string, max = 1200) => html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PAGES: SearchDoc[] = [
  { id: "page-duroos", type: "page", title: "Today's duroos", subtitle: "Live schedule of the mashayikh, today", text: "lessons today haram nabawi quba cancelled live", url: "/duroos" },
  { id: "page-schedule", type: "page", title: "Weekly schedule", subtitle: "Every regular dars by day and prayer", text: "week timetable", url: "/duroos/schedule" },
  { id: "page-live", type: "page", title: "Live streams", subtitle: "Watch the Haram duroos live", text: "broadcast youtube mixlr audio video", url: "/duroos/live" },
  { id: "page-updates", type: "page", title: "Duroos updates", subtitle: "Cancellations, postponements and new books", text: "cancelled postponed changes", url: "/duroos/updates" },
  { id: "page-programs", type: "page", title: "Study in Madinah", subtitle: "Arabic institutes, degrees and sisters' marakiz compared", text: "learn arabic course", url: "/programs" },
  { id: "page-mahad", type: "page", title: "Ma'had hub", subtitle: "Books by level, answer keys, rules and what happens if you fail a level", text: "mahad arabic language institute levels textbooks answer keys fail level mustawa", url: "/mahad" },
  { id: "page-library", type: "page", title: "The Jamiah library", subtitle: "Muqarrarat and Ma'had books", text: "pdf books takhlees", url: "/library" },
  { id: "page-discounts", type: "page", title: "Student discounts", subtitle: "Offers with your University card", text: "deals offers", url: "/discounts" },
  { id: "page-alerts", type: "page", title: "Phone alerts", subtitle: "Free notifications when a dars changes", text: "notifications push morning brief", url: "/more#alerts" },
  { id: "page-group", type: "page", title: "Join the MESH WhatsApp group", subtitle: "Announcements, events and daily help", text: "whatsapp community", url: "/more#rules" },
];

/** Everything searchable on the site, in one list. */
export async function buildSearchDocs(db: Db): Promise<SearchDoc[]> {
  const [guides, faqs, shaykhs, lessons] = await Promise.all([listGuides(db), listFaqs(db), listShaykhs(db), scheduleRows(db)]);
  return [
    ...PAGES,
    { id: `guide-${COMPANY.SLUG}`, type: "guide" as const, title: COMPANY.TITLE, subtitle: COMPANY.SUMMARY, text: COMPANY.SEARCH_TEXT, url: `/guides/${COMPANY.SLUG}` },
    ...guides.map((g) => ({ id: `guide-${g.slug}`, type: "guide" as const, title: g.title, subtitle: g.summary, text: plain(g.bodyHtml), url: `/guides/${g.slug}` })),
    ...faqs.map((f) => ({ id: `faq-${f.slug}`, type: "faq" as const, title: f.question, subtitle: plain(f.answerHtml, 160), text: plain(f.answerHtml), url: `/ask/${f.slug}` })),
    ...PROGRAMS.map((p) => ({ id: `program-${p.slug}`, type: "program" as const, title: p.name, subtitle: `${p.tagline} ${p.price}`, text: `${p.nameAr} ${p.overview.join(" ")} ${(p.levels ?? []).join(" ")} ${p.audience.join(" ")}`, url: `/programs/${p.slug}` })),
    ...shaykhs.map((s) => ({ id: `shaykh-${s.slug}`, type: "shaykh" as const, title: s.nameEn, subtitle: s.nameAr, text: `${s.roleEn ?? ""} ${s.roleAr ?? ""} ${lessons.filter((l) => l.shaykh.slug === s.slug).map((l) => `${l.bookEn} ${l.bookAr}`).join(" ")}`, url: `/duroos/shaykh/${s.slug}` })),
    ...lessons.map((l) => ({
      id: `dars-${l.slug}`,
      type: "dars" as const,
      title: l.bookEn,
      subtitle: `${l.shaykh.nameEn}, after ${l.prayer}, ${l.masjid.shortEn}${l.days.length ? `, ${l.days.map((d) => DAY[d]).join(" ")}` : ""}`,
      text: `${l.bookAr} ${l.shaykh.nameAr} ${l.masjid.nameEn} ${l.masjid.nameAr} ${l.locationEn} ${l.prayer}`,
      url: `/duroos/lesson/${l.slug}`,
    })),
    ...[...MAHAD_EXTRA, ...OFFICIAL, ...CHANNELS].map((x, i) => ({ id: `lib-${i}`, type: "library" as const, title: x.title, subtitle: x.titleAr ?? x.note, text: `${x.note ?? ""} ${x.titleAr ?? ""}`, url: x.href })),
    ...LIVE_COLLECTIONS.map((c) => ({ id: `col-${c.slug}`, type: "library" as const, title: `${c.title} course books`, subtitle: c.titleAr, text: `${c.blurb} curriculum course books muqarrarat المقررات books levels summaries takhlees تلخيص`, url: `/library/${c.slug}` })),
    ...LIVE_COLLECTIONS.flatMap((c) => {
      const out: { id: string; type: "library"; title: string; subtitle: string; text: string; url: string }[] = [];
      for (const level of treeOf(c.slug)!.f.filter(isFolder)) {
        for (const sub of level.f.filter(isFolder) as LibFolder[]) {
          out.push({ id: `sub-${sub.id}`, type: "library", title: sub.t, subtitle: `${c.title}, ${levelLabel(level.t) ?? level.t}`, text: `${subjectHint(sub.t) ?? ""} ${c.title} ${level.t} course book`, url: `/library/${c.slug}#f-${level.id}` });
        }
      }
      return out;
    }),
    ...DISCOUNTS.flatMap((g) => g.offers.map((o, i) => ({ id: `deal-${g.id}-${i}`, type: "discount" as const, title: o.nameEn ?? o.name, subtitle: o.deal, text: `${o.name} ${g.label}`, url: `/discounts` }))),
  ];
}
