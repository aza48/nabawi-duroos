/**
 * The assistant's name, "Ask the MESHaykh": MESH is set like the MESH wordmark (heavy, tight, in gold on green or brand
 * green on light grounds) and "aykh" plain, so the name reads as a play on MESH and never as a real shaykh.
 */
export function MeshaykhName({ ask = true, tone = "dark" }: { ask?: boolean; tone?: "dark" | "light" }) {
  return (
    <span className="whitespace-nowrap">
      {ask && "Ask the "}
      <span className={`meshaykh-mesh ${tone === "dark" ? "text-gold-bright" : "text-primary"}`}>MESH</span>
      <span className="meshaykh-rest">aykh</span>
    </span>
  );
}
