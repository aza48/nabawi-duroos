import { HTMLElement, TextNode, parse } from "node-html-parser";
import { GLOSSARY, type GlossaryTerm } from "@/content/glossary";

export type TocItem = { id: string; text: string };

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";

const YOUTUBE = /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/;

/**
 * A blockquote that opens with one of these labels is a callout. Arabic text often starts with an
 * invisible direction mark (RLM, LRM or ALM), so those are skipped like spaces. "\b" does not work after
 * Arabic letters, so an Arabic label must be followed by a space, a colon, a comma, "!", "." or the end
 * ("مهمة" is not "مهم").
 */
const CALLOUT = /^[\s\u200E\u200F\u061C]*(?:(?:tip|note|important|warning)\b|(?:نصيحة|ملاحظة|مهم|تنبيه)(?=[\s:،!.]|$))/i;

/**
 * True when article HTML shows something: text other than spaces, or an image. An emptied editor
 * sends "<p></p>", which is nothing. Admin and the content sync both use this, so an empty Arabic
 * body is stored as null and the Arabic page falls back to the English.
 */
export const hasVisibleHtml = (html: string | null | undefined): boolean =>
  !!html && (/<img\b/i.test(html) || html.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;|\u00A0/g, " ").trim().length > 0);

/**
 * Adds the interactive layer to already-sanitised guide HTML: anchors and a table of contents
 * for h2s, numbered steps that readers can tick off, video slots for lone YouTube links, and
 * Tip/Note callouts, and a short definition on the first mention of each glossary term (see
 * markGlossaryTerms). Runs on the server after sanitising, so it may add attributes freely.
 * `glossary: false` skips the terms; `glossaryBase` is the glossary page the terms link to.
 */
export function enhanceGuideHtml(
  html: string,
  opts: { glossary?: boolean; glossaryBase?: string } = {},
): { html: string; toc: TocItem[]; steps: number } {
  const root = parse(html);
  const toc: TocItem[] = [];
  const used = new Set<string>();
  for (const h of root.querySelectorAll("h2")) {
    const text = h.text.trim();
    let id = slugify(text);
    for (let n = 2; used.has(id); n++) id = `${slugify(text)}-${n}`;
    used.add(id);
    h.setAttribute("id", id);
    toc.push({ id, text });
  }

  let steps = 0;
  for (const ol of root.querySelectorAll("ol")) {
    ol.setAttribute("class", "steps");
    for (const li of ol.querySelectorAll(":scope > li")) li.setAttribute("data-step", String(steps++));
  }

  for (const p of root.querySelectorAll("p")) {
    const links = p.querySelectorAll("a");
    if (links.length !== 1 || p.text.trim() !== links[0].text.trim()) continue;
    const m = (links[0].getAttribute("href") ?? "").match(YOUTUBE);
    if (!m) continue;
    const title = links[0].text.trim().replace(/"/g, "&quot;");
    p.replaceWith(`<div class="video-slot" data-youtube="${m[1]}" data-title="${title}"></div>`);
  }

  for (const q of root.querySelectorAll("blockquote")) {
    if (CALLOUT.test(q.text)) q.setAttribute("class", "callout");
  }

  if (opts.glossary !== false) markGlossaryTerms(root, { base: opts.glossaryBase });

  return { html: root.toString(), toc, steps };
}

/* ---------- Glossary terms ---------- */

/** Text inside these is never marked: headings, links, controls, code, quotes and table headers. */
const NO_MARK = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "a", "button", "code", "pre", "kbd", "blockquote", "q", "th", "script", "style", "summary", "select", "textarea"]);

// Tailwind scans this file, so these classes are written out in full.
/** The term in running text: a quiet dotted underline that opens the popover. */
const TERM_CLASS = "inline cursor-help underline decoration-dotted decoration-primary/70 underline-offset-[3px] hover:text-primary focus-visible:text-primary";
/**
 * Inside a numbered step a tap toggles the step, so the term is a plain link to the glossary there.
 * The article's own link rule (`.article :where(a)` in globals.css) is unlayered and beats Tailwind
 * utilities, so the link's look is set inline: the step's own colour with a dotted green underline.
 */
const STEP_LINK_CLASS = "cursor-help";
const STEP_LINK_STYLE =
  "color:inherit;text-decoration:underline dotted;text-decoration-color:color-mix(in srgb,var(--primary) 70%,transparent);text-underline-offset:3px";
/** The popover's "More in the glossary" link, inline for the same reason. */
const POP_LINK_STYLE = "color:var(--primary);font-weight:600;text-decoration:underline;text-underline-offset:3px";
/**
 * The popover card. It must not set `display`, or it would show while closed; browsers without the
 * Popover API hide it, leaving only the underlined word. Tailwind's reset sets every margin to 0,
 * which undoes the browser's centring of popovers, so `fixed inset-0 m-auto` puts it back.
 */
const POP_CLASS =
  "fixed inset-0 m-auto h-fit w-[min(22rem,calc(100vw-2rem))] max-h-[80vh] overflow-auto rounded-2xl border border-line bg-card p-4 text-start text-sm font-normal not-italic leading-relaxed tracking-normal text-ink no-underline shadow-[var(--shadow-lg)] backdrop:bg-[rgb(0_0_0/0.2)] not-supports-[selector(:popover-open)]:hidden";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Whole words only, any case, either apostrophe, any spacing, and an optional plural "s". */
function termPattern(t: GlossaryTerm): RegExp {
  const alts = [...t.match]
    .sort((a, b) => b.length - a.length)
    .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/['’]/g, "['’ʼ]").replace(/\s+/g, "\\s+"));
  return new RegExp(`(?<![\\p{L}\\p{N}_-])(?<!\\p{L}['’ʼ])(?:${alts.join("|")})s?(?![\\p{L}\\p{N}_-])`, "giu");
}

const PATTERNS = new Map(GLOSSARY.map((t) => [t.id, termPattern(t)]));

function popoverHtml(t: GlossaryTerm, popId: string, text: string, base: string): string {
  return (
    `<button type="button" popovertarget="${popId}" class="${TERM_CLASS}">${esc(text)}</button>` +
    `<span id="${popId}" popover class="${POP_CLASS}">` +
    `<span class="flex items-start justify-between gap-3">` +
    `<span><strong class="font-semibold">${esc(t.term)}</strong> <span lang="ar" dir="rtl" class="font-arabic text-base text-muted">${esc(t.ar)}</span></span>` +
    `<button type="button" popovertarget="${popId}" popovertargetaction="hide" aria-label="Close" class="-me-2 -mt-2 grid size-10 shrink-0 place-items-center rounded-full text-lg leading-none text-muted hover:bg-bg-2 hover:text-ink">&times;</button>` +
    `</span>` +
    `<span class="mt-1 block">${esc(t.meaning)}</span>` +
    `<a href="${base}#${t.id}" class="mt-2 inline-block" style="${POP_LINK_STYLE}">More in the glossary</a>` +
    `</span>`
  );
}

function stepLinkHtml(t: GlossaryTerm, text: string, base: string): string {
  return `<a href="${base}#${t.id}" class="${STEP_LINK_CLASS}" style="${STEP_LINK_STYLE}" title="${esc(`${t.term}: ${t.meaning}`)}">${esc(text)}</a>`;
}

/**
 * Marks the first mention of each glossary term in a parsed document, in reading order. Outside the
 * numbered steps the term opens a native popover with its meaning (no client JavaScript); inside a
 * step, where a tap toggles the step, it links to the glossary instead. At most one mark per term.
 * Mutates `root` and returns the ids of the terms it marked, in order.
 */
export function markGlossaryTerms(root: HTMLElement, opts: { base?: string; terms?: GlossaryTerm[] } = {}): string[] {
  const base = opts.base ?? "/glossary";
  const left = new Map((opts.terms ?? GLOSSARY).map((t) => [t.id, t]));
  const marked: string[] = [];

  /** The earliest match of any term still waiting, in `text` from `from`. Ties go to the longer match. */
  const next = (text: string, from: number) => {
    let best: { t: GlossaryTerm; index: number; text: string } | null = null;
    for (const t of left.values()) {
      const re = opts.terms ? termPattern(t) : PATTERNS.get(t.id)!;
      re.lastIndex = from;
      const m = re.exec(text);
      if (m && (!best || m.index < best.index || (m.index === best.index && m[0].length > best.text.length))) best = { t, index: m.index, text: m[0] };
    }
    return best;
  };

  const markText = (node: TextNode, inStep: boolean) => {
    const text = node.text;
    let out = "";
    let pos = 0;
    for (let hit = next(text, 0); hit && left.size; hit = next(text, pos)) {
      left.delete(hit.t.id);
      marked.push(hit.t.id);
      const popId = `gl-${hit.t.id}-${marked.length}`;
      out += esc(text.slice(pos, hit.index)) + (inStep ? stepLinkHtml(hit.t, hit.text, base) : popoverHtml(hit.t, popId, hit.text, base));
      pos = hit.index + hit.text.length;
    }
    if (!pos) return;
    const parent = node.parentNode!;
    const nodes = parse(out + esc(text.slice(pos))).childNodes;
    for (const n of nodes) n.parentNode = parent;
    parent.childNodes.splice(parent.childNodes.indexOf(node), 1, ...nodes);
  };

  const walk = (el: HTMLElement, inStep: boolean) => {
    for (const child of [...el.childNodes]) {
      if (!left.size) return;
      if (child instanceof TextNode) {
        if (!child.isWhitespace) markText(child, inStep);
      } else if (child instanceof HTMLElement) {
        const tag = child.rawTagName?.toLowerCase();
        if (NO_MARK.has(tag) || child.hasAttribute("popover") || child.classList.contains("video-slot")) continue;
        walk(child, inStep || (tag === "li" && child.hasAttribute("data-step")));
      }
    }
  };

  walk(root, false);
  return marked;
}
