/**
 * Share a page: the phone's own share sheet when the browser has one, otherwise copy the link.
 * Pure, so it can be tested with a fake navigator and document. "copied" is returned only when a copy
 * really succeeded, so the button never claims "Copied" when nothing was copied.
 */
export type ShareResult = "shared" | "cancelled" | "copied" | "failed";

type ShareNav = {
  share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
  canShare?: (data: { title?: string; text?: string; url?: string }) => boolean;
  clipboard?: { writeText?: (text: string) => Promise<void> };
};

type CopyDoc = {
  createElement: (tag: "textarea") => { value: string; setAttribute: (k: string, v: string) => void; select: () => void; style: { position: string; opacity: string; top: string; left: string } };
  activeElement?: { focus?: (opts?: { preventScroll?: boolean }) => void } | null;
  body: { appendChild: (el: unknown) => unknown; removeChild: (el: unknown) => unknown };
  execCommand?: (cmd: "copy") => boolean;
};

export async function shareOrCopy(data: { title: string; text?: string; url: string }, nav: ShareNav, doc?: CopyDoc): Promise<ShareResult> {
  if (typeof nav.share === "function" && (!nav.canShare || nav.canShare(data))) {
    try {
      await nav.share(data);
      return "shared";
    } catch (e) {
      // The reader closed the share sheet: not an error, and nothing to copy.
      if (e && typeof e === "object" && (e as { name?: string }).name === "AbortError") return "cancelled";
      // Any other failure (no permission, unsupported data) falls through to copying.
    }
  }
  if (nav.clipboard && typeof nav.clipboard.writeText === "function") {
    try {
      await nav.clipboard.writeText(data.url);
      return "copied";
    } catch {
      // Clipboard blocked (no permission or an insecure page): try the old way below.
    }
  }
  if (doc && typeof doc.execCommand === "function") {
    // Selecting the hidden field moves focus; give it back afterwards so keyboard users keep their place.
    const prev = doc.activeElement;
    const el = doc.createElement("textarea");
    el.value = data.url;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.opacity = "0";
    doc.body.appendChild(el);
    let ok = false;
    try {
      el.select();
      ok = doc.execCommand("copy");
    } catch {
      ok = false;
    } finally {
      doc.body.removeChild(el);
      prev?.focus?.({ preventScroll: true });
    }
    if (ok) return "copied";
  }
  return "failed";
}
