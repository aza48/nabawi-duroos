import { permanentRedirect } from "next/navigation";

/** The Arabic part of MESH is the duroos section for now. */
export default function ArabicHome() {
  permanentRedirect("/ar/duroos");
}
