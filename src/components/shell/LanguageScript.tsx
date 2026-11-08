import Script from "next/script";

/** On the English home page only: readers who chose Arabic are sent to the Arabic site before first paint. */
const code = `try{if(location.pathname==="/"&&!location.search&&(localStorage.getItem("mesh-lang")==="ar"||/(^|; )mesh-lang=ar/.test(document.cookie)))location.replace("/ar")}catch(e){}`;

export function LanguageScript({ nonce }: { nonce?: string }) {
  return (
    <Script id="mesh-lang" strategy="beforeInteractive" nonce={nonce}>
      {code}
    </Script>
  );
}
