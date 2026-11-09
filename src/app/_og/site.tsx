import { ImageResponse } from "next/og";
import { crestDataUrl, GoldBar, OG_GOLD } from "./brand";

export const SITE_OG_SIZE = { width: 1200, height: 630 };

const TILE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><g fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1.2'><path d='M0 0H80V80H0z'/><path d='M40 8L72 40L40 72L8 40z'/></g></svg>"
  );

/** The site share card: the MESH lockup on the brand green lattice, and a quiet Albaseerah credit in the corner. */
export async function siteCardImage(): Promise<ImageResponse> {
  const crest = await crestDataUrl().catch(() => null);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", background: "#145c3e", backgroundImage: `url("${TILE}")`, color: "white", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ fontSize: 170, fontWeight: 900, letterSpacing: -6, lineHeight: 1 }}>MESH</div>
        <div style={{ display: "flex", marginTop: 26 }}>
          <GoldBar width={150} height={12} gap={14} diamond={13} />
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, letterSpacing: 8, fontWeight: 700 }}>
          <span style={{ color: OG_GOLD }}>M</span>EDINA&nbsp;<span style={{ color: OG_GOLD }}>E</span>NGLISH&nbsp;<span style={{ color: OG_GOLD }}>S</span>TUDENT&nbsp;<span style={{ color: OG_GOLD }}>H</span>UB
        </div>
        <div style={{ marginTop: 44, fontSize: 34, color: "rgba(255,255,255,0.85)" }}>Live duroos, study programmes and guides to life in Madinah</div>
        {crest && (
          <div style={{ position: "absolute", right: 90, bottom: 48, display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- next/og draws plain img elements */}
            <img src={crest} width={64} height={57} alt="" />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}>
              <div style={{ display: "flex", fontSize: 15, letterSpacing: 3, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>BROUGHT TO YOU BY</div>
              <div style={{ display: "flex", marginTop: 4, fontSize: 22, color: "rgba(255,255,255,0.88)" }}>Albaseerah International Institute</div>
            </div>
          </div>
        )}
      </div>
    ),
    SITE_OG_SIZE
  );
}
