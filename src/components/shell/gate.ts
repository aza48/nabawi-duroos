/**
 * The MESH gate: the two arches in the hero sky, whose roofline is the M. Drawn in a 100 by 62 box
 * (the shape spans x 4 to 96 and y 4 to 62). Used for the app icons; the PNGs in public/icons are rendered
 * from the same path.
 */
export const GATE_PATH = "M4 28Q4 6 27 4Q44 6 50 22Q56 6 73 4Q96 6 96 28V62H4ZM14 62V33Q14 17 27 16Q40 17 40 33V62ZM60 62V33Q60 17 73 16Q86 17 86 33V62Z";

/** A square viewBox that centres the gate and makes it `scale` of the icon's width. */
export function gateViewBox(scale: number): string {
  const side = 92 / scale;
  return `${50 - side / 2} ${33 - side / 2} ${side} ${side}`;
}
