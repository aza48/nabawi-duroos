/**
 * The question the site's own search box hands to /assistant. AssistantPanel asks a ?q= question at once
 * only when it matches this, so a link someone shared fills the box and waits for a click instead.
 */
export const ASK_PENDING_KEY = "mesh-ask-pending";

/** The form both sides compare: trimmed and cut as the /assistant page cuts it. */
export const askKey = (q: string) => q.trim().slice(0, 600);

export function markAskPending(q: string): void {
  try {
    sessionStorage.setItem(ASK_PENDING_KEY, askKey(q));
  } catch {
    /* storage blocked: the question is shown, not asked */
  }
}

/** True once, when the panel's question is the one the search box just handed over. */
export function takeAskPending(q: string): boolean {
  try {
    const ok = sessionStorage.getItem(ASK_PENDING_KEY) === askKey(q);
    sessionStorage.removeItem(ASK_PENDING_KEY);
    return ok;
  } catch {
    return false;
  }
}
