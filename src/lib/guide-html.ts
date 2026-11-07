import { parse } from "node-html-parser";

export type TocItem = { id: string; text: string };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";

const YOUTUBE = /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/;

/**
 * Adds the interactive layer to already-sanitised guide HTML: anchors and a table of contents
 * for h2s, numbered steps that readers can tick off, video slots for lone YouTube links, and
 * Tip/Note callouts. Runs on the server after sanitising, so it may add attributes freely.
 */
export function enhanceGuideHtml(html: string): { html: string; toc: TocItem[]; steps: number } {
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
    if (/^\s*(tip|note|important|warning)\b/i.test(q.text)) q.setAttribute("class", "callout");
  }

  return { html: root.toString(), toc, steps };
}
