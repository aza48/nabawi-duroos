"use client";

import { useLinkStatus } from "next/link";

/**
 * A thin bar under a menu link while its page is on the way (Next 16 useLinkStatus). On a weak signal, before the
 * page has been prefetched, a tap would otherwise show nothing until the page arrives. Must sit inside the <Link>.
 */
export function NavPending() {
  const { pending } = useLinkStatus();
  return <span aria-hidden="true" className={pending ? "nav-pending" : "hidden"} />;
}
