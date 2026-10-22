/**
 * IndexNow — instant indexing notifications to Bing, Yandex and the other
 * participating engines when content is created or published.
 *
 * The key below is public by design: the matching key file lives at
 * public/<key>.txt (its entire content is the key), which is how the
 * engines verify ownership of the host.
 *
 * Fire-and-forget: a failed ping must never affect the request that
 * triggered it. Pings only go out from the production runtime.
 */
import { siteUrl } from "./site";

export const INDEXNOW_KEY = "dfb17907c38cc593cfbef9e3f127cd9b";

export function pingIndexNow(urls: string[]): void {
  if (process.env.NODE_ENV !== "production") return;
  const urlList = urls.filter(Boolean).slice(0, 10000);
  if (urlList.length === 0) return;
  try {
    const host = new URL(siteUrl()).host;
    void fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteUrl()}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    }).catch(() => {
      /* non-fatal */
    });
  } catch {
    /* never throw */
  }
}
