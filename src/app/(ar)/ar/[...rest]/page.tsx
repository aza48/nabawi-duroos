import { notFound } from "next/navigation";

/** Unknown paths fall into this layout's not-found page (with header, footer and the right language) instead of the bare global one. */
export default function CatchAll() {
  notFound();
}
