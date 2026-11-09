/**
 * The MESH lockup from the logo: heavy wordmark, gold bar, spaced name with gold initials. The gold bar ends in one
 * small lattice diamond in Albaseerah maroon, edged in Albaseerah gold: the quiet sign that Albaseerah brings MESH.
 */
export function Wordmark({ size = "sm", tone = "brand" }: { size?: "sm" | "lg"; tone?: "brand" | "light" }) {
  const lg = size === "lg";
  const word = tone === "light" ? "text-white" : "text-brand dark:text-ink";
  const line = tone === "light" ? "text-white/85" : "text-muted";
  const Initial = ({ c }: { c: string }) => <span className="text-gold-bright">{c}</span>;
  return (
    <span className="inline-flex flex-col items-start" dir="ltr">
      <span className={`wordmark ${word} ${lg ? "text-6xl md:text-7xl" : "text-[1.7rem]"}`}>MESH</span>
      <span className={`flex items-center ${lg ? "mt-3 gap-2.5" : "mt-1 gap-1.5"}`} aria-hidden="true">
        <span className={`block rounded-full bg-gold-bright ${lg ? "h-1.5 w-24" : "h-[3px] w-9"}`} />
        <span className={`mesh-jewel ${lg ? "size-2.5" : "size-[5px]"}`} />
      </span>
      <span className={`brand-line ${line} ${lg ? "mt-3 text-sm" : "mt-1 text-[8.5px]"}`}>
        <Initial c="M" />EDINA <Initial c="E" />NGLISH <Initial c="S" />TUDENT <Initial c="H" />UB
      </span>
    </span>
  );
}
