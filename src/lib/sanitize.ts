import sanitizeHtml from "sanitize-html";

/** Allow-list sanitizer for admin-written guide/FAQ HTML. Runs on save and on render. */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "mark",
      "ul", "ol", "li", "blockquote", "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td", "code", "pre", "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https", "http"] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const out: Record<string, string> = { href };
        if (/^https?:\/\//i.test(href)) {
          out.target = "_blank";
          out.rel = "noopener noreferrer";
        }
        return { tagName, attribs: out };
      },
    },
  });
}
