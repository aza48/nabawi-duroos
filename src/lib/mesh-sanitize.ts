/**
 * Allowlist HTML sanitizer for MESH article bodies.
 *
 * Design notes:
 * - Only a small set of formatting tags survives (paragraphs, headings, bold/italic/
 *   underline/strike, quotes, lists, links, images, rules, code). Everything else is
 *   either dropped with its contents (script/style/iframe/…) or unwrapped.
 * - ALL attributes are stripped except a[href] and img[src|alt]. In particular `style`
 *   and `class` never survive, which is what guarantees article text can never be
 *   coloured (or otherwise restyled) by an author.
 * - Text nodes pass through verbatim so existing entities (&amp;, &#8217;, …) are
 *   never decoded/re-encoded and therefore never corrupted.
 */

const ALLOWED = new Set([
  "p", "br", "h1", "h2", "strong", "b", "em", "i", "u", "s",
  "blockquote", "ul", "ol", "li", "a", "img", "hr", "code", "pre",
]);
const VOID = new Set(["br", "hr", "img"]);
const DROP_WITH_CONTENTS = new Set([
  "script", "style", "iframe", "object", "embed", "form", "input", "button",
  "textarea", "select", "option", "svg", "math", "video", "audio", "source",
  "track", "link", "meta", "title", "head", "template", "noscript", "frame",
  "frameset", "applet", "base", "title",
]);

const TAG_RE = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/;
const ATTR_RE = /([a-zA-Z][a-zA-Z0-9-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => safeCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}
function safeCodePoint(n: number): string {
  if (!Number.isFinite(n) || n <= 0 || n > 0x10ffff) return "";
  try { return String.fromCodePoint(n); } catch { return ""; }
}
function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseAttrs(raw: string): Map<string, string> {
  const out = new Map<string, string>();
  ATTR_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ATTR_RE.exec(raw))) {
    const name = m[1].toLowerCase();
    if (!out.has(name)) out.set(name, decodeEntities(m[2] ?? m[3] ?? m[4] ?? ""));
  }
  return out;
}

/** Returns a safe href or null. Whitespace/control chars are stripped first so
 *  obfuscated schemes ("java\tscript:") cannot slip through. */
function safeHref(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[\u0000-\u0020]+/g, "");
  const lower = cleaned.toLowerCase();
  if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("mailto:")) return cleaned;
  return null;
}
function safeImgSrc(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.replace(/[\u0000-\u0020]+/g, "");
  const lower = cleaned.toLowerCase();
  if (lower.startsWith("https://")) return cleaned;
  if (/^data:image\/(jpeg|png|webp);base64,/.test(lower)) return cleaned;
  return null;
}

export function sanitizeArticleHtml(input: string): string {
  if (!input) return "";
  let out = "";
  const stack: string[] = [];
  let i = 0;
  let skipTag: string | null = null;
  let skipDepth = 0;

  while (i < input.length) {
    const lt = input.indexOf("<", i);
    if (lt === -1) {
      if (!skipTag) out += input.slice(i);
      break;
    }
    if (lt > i && !skipTag) out += input.slice(i, lt);

    // Comments / doctype / processing instructions: drop.
    if (input.startsWith("<!--", lt)) {
      const end = input.indexOf("-->", lt + 4);
      i = end === -1 ? input.length : end + 3;
      continue;
    }
    const m = TAG_RE.exec(input.slice(lt));
    if (!m) {
      // A "<" that does not start a tag is literal text.
      if (!skipTag) out += "&lt;";
      i = lt + 1;
      continue;
    }
    const [whole, closeSlash, rawName, rawAttrs, selfClose] = m;
    const name = rawName.toLowerCase();
    i = lt + whole.length;
    const isClose = closeSlash === "/";

    if (skipTag) {
      if (name === skipTag) {
        if (isClose) { skipDepth -= 1; if (skipDepth <= 0) { skipTag = null; skipDepth = 0; } }
        else if (!selfClose && !VOID.has(name)) skipDepth += 1;
      }
      continue;
    }

    if (DROP_WITH_CONTENTS.has(name)) {
      if (!isClose && !selfClose) { skipTag = name; skipDepth = 1; }
      continue;
    }
    if (!ALLOWED.has(name)) continue; // unwrap: drop the tag, keep children

    if (isClose) {
      if (VOID.has(name)) continue;
      const idx = stack.lastIndexOf(name);
      if (idx === -1) continue;
      while (stack.length > idx) out += `</${stack.pop()}>`;
      continue;
    }

    // Opening / self-closing allowed tag.
    if (name === "a") {
      const href = safeHref(parseAttrs(rawAttrs).get("href"));
      if (!href) continue; // unwrap links with unsafe/missing hrefs
      out += `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">`;
      if (selfClose) out += "</a>"; else stack.push("a");
      continue;
    }
    if (name === "img") {
      const attrs = parseAttrs(rawAttrs);
      const src = safeImgSrc(attrs.get("src"));
      if (!src) continue;
      const alt = attrs.get("alt");
      out += `<img src="${escapeAttr(src)}"${alt ? ` alt="${escapeAttr(alt)}"` : ""} loading="lazy">`;
      continue;
    }
    out += `<${name}>`;
    if (VOID.has(name)) continue;
    if (selfClose) out += `</${name}>`;
    else stack.push(name);
  }
  while (stack.length) out += `</${stack.pop()}>`;
  return out;
}

/** Plain-text view of an HTML fragment: tags removed, entities decoded, whitespace collapsed. */
export function plainTextOf(html: string): string {
  if (!html) return "";
  const noPartialTag = html.replace(/<[^>]*$/, "");
  const text = noPartialTag.replace(/<[^>]*>/g, " ");
  return decodeEntities(text).replace(/\s+/g, " ").trim();
}

export function excerptOf(html: string, max = 170): string {
  const text = plainTextOf(html);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

export function readingMinutes(html: string): number {
  const words = plainTextOf(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
