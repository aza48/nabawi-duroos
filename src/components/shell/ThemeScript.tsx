import Script from "next/script";

/** Sets data-theme before first paint so there is never a flash of the wrong theme. */
const code = `try{var t=localStorage.getItem("mesh-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export function ThemeScript({ nonce }: { nonce?: string }) {
  return (
    <Script id="mesh-theme" strategy="beforeInteractive" nonce={nonce}>
      {code}
    </Script>
  );
}
