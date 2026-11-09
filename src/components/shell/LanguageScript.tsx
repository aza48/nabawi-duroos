/**
 * On the English home page only: readers who chose Arabic are sent to the Arabic site before first paint.
 * A plain inline <script> in <head> (next/script's beforeInteractive would run it only after the main bundle loads).
 */
export const LANGUAGE_SCRIPT = `try{if(location.pathname==="/"&&!location.search&&(localStorage.getItem("mesh-lang")==="ar"||/(^|; )mesh-lang=ar/.test(document.cookie)))location.replace("/ar")}catch(e){}`;

export function LanguageScript({ nonce }: { nonce?: string }) {
  return <script id="mesh-lang" nonce={nonce} dangerouslySetInnerHTML={{ __html: LANGUAGE_SCRIPT }} />;
}
