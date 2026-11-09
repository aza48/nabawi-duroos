import { ImageResponse } from "next/og";
import { GATE_PATH, gateViewBox } from "@/components/shell/gate";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The home screen icon on iPhone: the MESH gate, gold on green (iOS rounds the corners itself). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#145c3e" }}>
        <svg width="180" height="180" viewBox={gateViewBox(0.62)}>
          <path d={GATE_PATH} fill="#e2b23a" fillRule="evenodd" />
        </svg>
      </div>
    ),
    size
  );
}
