import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import siteCard from "@/app/(site)/opengraph-image";
import { getDb } from "@/server/db/client";
import { getLesson, getShaykh, getToday } from "@/server/duroos/queries";
import { getFaq } from "@/server/content/queries";
import { t } from "@/features/duroos/strings";
import { faqText } from "@/lib/arabic-content";
import { arCount, enCount } from "@/lib/arabic-count";
import { toArabicDigits, type Locale } from "@/lib/locale";
import { cleanText, publicLabel } from "@/lib/text";
import { prayerTimes } from "@/lib/time/prayer";
import { formatClock, riyadhDateIso } from "@/lib/time/riyadh";
import { arSegments, fitLine, fitTitle, isArabic, ogWords } from "./text";

/**
 * Share cards for single pages (a dars, a shaykh, an answer): the MESH lattice in brand green,
 * the wordmark small, and the page's own title. Anything that cannot be found gets the site card.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const GREEN = "#145c3e";
const GOLD = "#e2b23a";
const RED = "#b42318";
const TILE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><g fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1.2'><path d='M0 0H80V80H0z'/><path d='M40 8L72 40L40 72L8 40z'/></g></svg>"
  );

export type Card = {
  locale: Locale;
  /** Small gold line above the title. */
  kicker: string;
  title: string;
  /** Lines under the title, largest first. */
  lines: string[];
  /** A red band across the top, for a dars cancelled or postponed today. */
  band?: string | null;
};

type Font = { name: string; data: Buffer; weight: 700; style: "normal" };
let arabicFonts: Promise<Font[]> | undefined;

/** Alexandria: its Arabic subset is the one next/og can shape; the Latin subset covers "MESH", digits and punctuation. */
export function loadArabicFonts(): Promise<Font[]> {
  arabicFonts ??= Promise.all(
    ["alexandria-arabic-700.woff", "alexandria-latin-700.woff"].map(async (file, i) => ({
      name: i === 0 ? "Alexandria Arabic" : "Alexandria Latin",
      data: await readFile(join(process.cwd(), "assets/og", file)),
      weight: 700 as const,
      style: "normal" as const,
    }))
  ).catch((e) => {
    arabicFonts = undefined;
    throw e;
  });
  return arabicFonts;
}

/**
 * One line of text. Arabic is drawn one block per word in a reversed, wrapping row, and each word
 * as its pieces in a reversed row: next/og would otherwise lay words and punctuation out left to right.
 */
function Text({ text, size, color, ar, weight = 700 }: { text: string; size: number; color: string; ar: boolean; weight?: number }) {
  const lineHeight = 1.35;
  if (isArabic(text)) {
    const words = ogWords(toArabicDigits(text));
    return (
      <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", columnGap: Math.round(size * 0.26), width: "100%", fontSize: size, lineHeight, color, fontWeight: weight }}>
        {words.map((w, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "row-reverse" }}>
            {arSegments(w).map((x, j) => (
              <span key={j}>{x}</span>
            ))}
          </div>
        ))}
      </div>
    );
  }
  // One span per word, so a name such as "al-Rifa'i" never breaks at its hyphen.
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: Math.round(size * 0.22), width: "100%", justifyContent: ar ? "flex-end" : "flex-start", fontSize: size, lineHeight: 1.15, color, fontWeight: weight }}>
      {ogWords(text).map((w, i) => (
        <span key={i}>{w}</span>
      ))}
    </div>
  );
}

/** Draws a card. Exported for checks that render a sample card. */
export function renderCard(card: Card, fonts?: Font[]): ImageResponse {
  const ar = card.locale === "ar";
  const title = fitTitle(card.title);
  const align = ar ? "flex-end" : "flex-start";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: GREEN,
          backgroundImage: `url("${TILE}")`,
          color: "white",
          fontFamily: fonts ? "Alexandria Arabic, Alexandria Latin" : "sans-serif",
        }}
      >
        {card.band && (
          <div style={{ display: "flex", justifyContent: align, alignItems: "center", height: 72, padding: "0 80px", background: RED }}>
            <Text text={card.band} size={34} color="white" ar={ar} />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: card.band ? "40px 80px 56px" : "56px 80px" }}>
          <div style={{ display: "flex", flexDirection: ar ? "row-reverse" : "row", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: align }}>
              <div style={{ display: "flex", fontSize: 46, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>MESH</div>
              <div style={{ display: "flex", width: 64, height: 6, borderRadius: 3, background: GOLD, marginTop: 10 }} />
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.7)" }}>medinahub.org</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", alignItems: align }}>
            <Text text={card.kicker} size={30} color={GOLD} ar={ar} />
            <div style={{ display: "flex", width: "100%", marginTop: 14 }}>
              <Text text={title.text} size={title.size} color="white" ar={ar} />
            </div>
            {card.lines.map((line, i) => (
              <div key={i} style={{ display: "flex", width: "100%", marginTop: i === 0 ? 26 : 10 }}>
                <Text text={fitLine(line)} size={i === 0 ? 36 : 30} color={i === 0 ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)"} ar={ar} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, ...(fonts ? { fonts } : {}) }
  );
}

/**
 * ImageResponse draws lazily, so the PNG is read here: a drawing error then still falls back to the
 * site card. The plain response also leaves caching to the route's revalidate, so a band stays current.
 */
async function png(res: Response): Promise<Response> {
  return new Response(await res.arrayBuffer(), { headers: { "Content-Type": "image/png" } });
}

/** Draws a card, or the site card when the page has nothing to show or anything fails. */
async function drawOrFallback(load: () => Promise<Card | null>): Promise<Response> {
  try {
    const card = await load();
    if (!card) return png(siteCard());
    return await png(renderCard(card, card.locale === "ar" ? await loadArabicFonts() : undefined));
  } catch (e) {
    console.error("[og] card failed, using the site card", e);
    return png(siteCard());
  }
}

const clean = (s: string, locale: Locale) => cleanText(s, locale).trim();

/** A dars: the book, the shaykh, the masjid, the prayer with today's adhan, and today's cancellation or postponement. */
export function lessonImage(slug: string, locale: Locale): Promise<Response> {
  return drawOrFallback(async () => {
    const db = await getDb();
    const [l, today] = await Promise.all([getLesson(db, slug), getToday(db)]);
    if (!l) return null;
    const ar = locale === "ar";
    const status = today.lessons.find((x) => x.slug === slug)?.status;
    const band =
      status === "cancelled" ? (ar ? "أُلغي اليوم" : "Cancelled today") : status === "postponed" ? (ar ? "أُجّل اليوم" : "Postponed today") : null;
    const lines = [clean(ar ? l.shaykh.nameAr : l.shaykh.nameEn, locale), clean(ar ? l.masjid.nameAr : l.masjid.nameEn, locale)];
    // A dars whose time is not confirmed only sits in an evening bucket: it says "Evening", with no prayer or time.
    if (l.timeKnown) {
      const prayer = `${t(locale, "after")} ${t(locale, l.prayer)}`;
      const showTime = l.current || l.notYetStarted;
      const adhan = showTime ? `${t(locale, "adhan")} ${formatClock(prayerTimes(riyadhDateIso())[l.prayer], locale)}` : null;
      lines.push(adhan ? `${prayer}${ar ? "، " : " · "}${adhan}` : prayer);
    } else {
      lines.push(t(locale, "timeNotConfirmed"));
    }
    return { locale, kicker: ar ? "درس في المدينة" : "Dars in Madinah", title: clean(ar ? l.bookAr : l.bookEn, locale), lines, band };
  });
}

/** A shaykh: the name, the role where the data has one, and how many duroos he gives now. */
export function shaykhImage(slug: string, locale: Locale): Promise<Response> {
  return drawOrFallback(async () => {
    const s = await getShaykh(await getDb(), slug);
    if (!s) return null;
    const ar = locale === "ar";
    const role = publicLabel(ar ? s.roleAr : s.roleEn);
    const n = s.lessons.length;
    const count = n > 0 ? (ar ? arCount(n, "dars") : enCount(n, "dars", "duroos")) : null;
    const lines = [role && clean(role, locale), count].filter((x): x is string => Boolean(x));
    return { locale, kicker: ar ? "الدروس" : "Duroos", title: clean(ar ? s.nameAr : s.nameEn, locale), lines };
  });
}

/** An answer: the question under "MESH answers". */
export function faqImage(slug: string, locale: Locale): Promise<Response> {
  return drawOrFallback(async () => {
    const f = await getFaq(await getDb(), slug);
    if (!f) return null;
    const q = faqText(f, locale).question;
    return { locale, kicker: locale === "ar" ? "أجوبة MESH" : "MESH answers", title: clean(q, locale), lines: [] };
  });
}
