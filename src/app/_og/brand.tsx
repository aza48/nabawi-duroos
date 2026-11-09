import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Share-card pieces shared by every card: the gold bar with its Albaseerah diamond, and the small Albaseerah crest. */

export const OG_GOLD = "#e2b23a";
const ABS_MAROON = "#720000";
const ABS_GOLD = "#c5a059";

let crest: Promise<string> | undefined;
/** The Albaseerah crest as a data URL, read once. */
export function crestDataUrl(): Promise<string> {
  crest ??= readFile(join(process.cwd(), "public/images/albaseerah/crest.png"))
    .then((b) => `data:image/png;base64,${b.toString("base64")}`)
    .catch((e) => {
      crest = undefined;
      throw e;
    });
  return crest;
}

/** MESH's gold bar, ending in one small lattice diamond in Albaseerah maroon edged in Albaseerah gold. */
export function GoldBar({ width, height, gap, diamond, reverse = false }: { width: number; height: number; gap: number; diamond: number; reverse?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: reverse ? "row-reverse" : "row", alignItems: "center" }}>
      <div style={{ display: "flex", width, height, borderRadius: height / 2, background: OG_GOLD }} />
      <div
        style={{
          display: "flex",
          width: diamond,
          height: diamond,
          marginLeft: reverse ? 0 : gap,
          marginRight: reverse ? gap : 0,
          background: ABS_MAROON,
          border: `${Math.max(1, Math.round(diamond / 7))}px solid ${ABS_GOLD}`,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}
