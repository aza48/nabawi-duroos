import { ImageResponse } from "next/og";
import { GATE_PATH, gateViewBox } from "@/components/shell/gate";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** The MESH gate from the hero (two arches whose roofline is the M), gold on green. */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#145c3e" }}>
        <svg width="512" height="512" viewBox={gateViewBox(0.66)}>
          <path d={GATE_PATH} fill="#e2b23a" fillRule="evenodd" />
        </svg>
      </div>
    ),
    size
  );
}
