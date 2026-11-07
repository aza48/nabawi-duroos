import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MESH: Medina English Student Hub";

/** The share card: the MESH logo lockup on the brand green lattice. */
export default function OpenGraphImage() {
  const tile = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><g fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1.2'><path d='M0 0H80V80H0z'/><path d='M40 8L72 40L40 72L8 40z'/></g></svg>");
  const gold = "#e2b23a";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", background: "#145c3e", backgroundImage: `url("${tile}")`, color: "white", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 170, fontWeight: 900, letterSpacing: -6, lineHeight: 1 }}>MESH</div>
        <div style={{ width: 150, height: 12, borderRadius: 6, background: gold, marginTop: 26 }} />
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, letterSpacing: 8, fontWeight: 700 }}>
          <span style={{ color: gold }}>M</span>EDINA&nbsp;<span style={{ color: gold }}>E</span>NGLISH&nbsp;<span style={{ color: gold }}>S</span>TUDENT&nbsp;<span style={{ color: gold }}>H</span>UB
        </div>
        <div style={{ marginTop: 44, fontSize: 34, color: "rgba(255,255,255,0.85)" }}>Live duroos, study programmes and guides to life in Madinah</div>
      </div>
    ),
    size
  );
}
