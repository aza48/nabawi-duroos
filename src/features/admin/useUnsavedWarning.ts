"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * While a form differs from its last saved version, leaving asks first: closing or reloading the tab
 * (the browser's own prompt) and tapping any link inside the app. On a phone one stray tap on the tab
 * bar lost a long edit. Returns `markSaved`, to call after a successful save.
 */
export function useUnsavedWarning(value: unknown): () => void {
  const snapshot = useMemo(() => JSON.stringify(value), [value]);
  const [baseline, setBaseline] = useState(snapshot);
  const latest = useRef(snapshot);
  useEffect(() => { latest.current = snapshot; }, [snapshot]);
  const dirty = snapshot !== baseline;

  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const click = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (!window.confirm("Leave without saving? Your changes will be lost.")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", click, true);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", click, true);
    };
  }, [dirty]);

  return useCallback(() => setBaseline(latest.current), []);
}
