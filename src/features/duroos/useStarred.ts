"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * "My duroos": the lessons a visitor starred, kept on the phone only (no account, nothing on the server).
 * Stored as a list of lesson slugs. When storage is blocked (private mode), stars still work until the tab closes.
 */
export const STARRED_KEY = "mesh-starred-duroos";
const EMPTY: readonly string[] = Object.freeze([]);

let memory: string | null = null;
/** Set once a write fails, so reads come from memory from then on. */
let blocked = false;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  if (blocked) return memory;
  try {
    return localStorage.getItem(STARRED_KEY);
  } catch {
    return memory;
  }
}

/** Parses the stored list, ignoring anything that is not a list of slugs. */
export function parseStarred(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? [...new Set(v.filter((s): s is string => typeof s === "string" && s.length > 0 && s.length < 200))] : [];
  } catch {
    return [];
  }
}

/** Adds the slug if it is missing, removes it if it is there. */
export function toggleIn(list: readonly string[], slug: string): string[] {
  return list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
}

// useSyncExternalStore needs the same array back while nothing changed.
let cacheRaw: string | null | undefined;
let cacheList: readonly string[] = EMPTY;
function snapshot(): readonly string[] {
  const raw = readRaw();
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    cacheList = raw ? parseStarred(raw) : EMPTY;
  }
  return cacheList;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  // Another tab starred something.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STARRED_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function write(list: string[]) {
  const raw = JSON.stringify(list);
  memory = raw;
  try {
    localStorage.setItem(STARRED_KEY, raw);
  } catch {
    blocked = true; // storage blocked: memory keeps the stars for this tab
  }
  listeners.forEach((cb) => cb());
}

/** The starred slugs, and a toggle. Empty on the server and on the first paint, so nothing jumps. */
export function useStarred() {
  const starred = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  const toggle = useCallback((slug: string) => write(toggleIn(snapshot(), slug)), []);
  return { starred, toggle, has: (slug: string) => starred.includes(slug) };
}
