import { siteCardImage, SITE_OG_SIZE } from "@/app/_og/site";

export const size = SITE_OG_SIZE;
export const contentType = "image/png";
export const alt = "MESH: Medina English Student Hub";

/** The share card: the MESH logo lockup on the brand green lattice, with the Albaseerah credit in the corner. */
export default function OpenGraphImage() {
  return siteCardImage();
}
