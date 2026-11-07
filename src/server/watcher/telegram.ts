import { parse } from "node-html-parser";

export type ChannelPost = { postId: string; url: string; text: string; imageUrl: string | null; postedAt: Date };

/** Public channel preview page; no login, no API key. */
export const previewUrl = (handle: string) => `https://t.me/s/${encodeURIComponent(handle)}`;

/** Reads the posts from a t.me/s/<channel> preview page. */
export function parseChannelHtml(html: string, handle: string): ChannelPost[] {
  const root = parse(html);
  const out: ChannelPost[] = [];
  for (const el of root.querySelectorAll(".tgme_widget_message[data-post]")) {
    const postId = el.getAttribute("data-post") ?? "";
    if (!postId.toLowerCase().startsWith(`${handle.toLowerCase()}/`)) continue;
    const textEl = el.querySelector(".tgme_widget_message_text");
    const text = textEl ? textEl.innerHTML.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "") : "";
    const decoded = parse(`<div>${text}</div>`).text.trim();
    const style = el.querySelector(".tgme_widget_message_photo_wrap")?.getAttribute("style") ?? "";
    const imageUrl = /url\('([^']+)'\)/.exec(style)?.[1] ?? null;
    const dt = el.querySelector("time[datetime]")?.getAttribute("datetime");
    if (!dt) continue;
    out.push({ postId, url: `https://t.me/${postId}`, text: decoded, imageUrl, postedAt: new Date(dt) });
  }
  return out;
}
