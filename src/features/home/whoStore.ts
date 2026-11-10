"use client";

import { useSyncExternalStore } from "react";
import { WHO_STORAGE_KEY, parseWho, serialiseWho, type WhoProfile } from "./who";

/**
 * The reader's "Who are you?" answers, saved on this phone and shared by the chooser and the
 * guide cards on the home page. The server and the first client render see `undefined` (not
 * loaded yet), so the markup matches and the saved answers apply just after the page loads.
 * After that the value is `null` (never answered) or the saved profile. When storage is blocked
 * the answers last for this visit only.
 */

const listeners = new Set<() => void>();
let state: WhoProfile | null = null;
let loaded = false;

function load() {
  try {
    state = parseWho(localStorage.getItem(WHO_STORAGE_KEY));
  } catch {
    state = null;
  }
  loaded = true;
}

const emit = () => listeners.forEach((fn) => fn());

function onStorage(e: StorageEvent) {
  if (e.key !== null && e.key !== WHO_STORAGE_KEY) return;
  load();
  emit();
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  if (listeners.size === 1) {
    try {
      window.addEventListener("storage", onStorage);
    } catch {}
  }
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      try {
        window.removeEventListener("storage", onStorage);
      } catch {}
    }
  };
}

function getSnapshot(): WhoProfile | null {
  if (!loaded) load();
  return state;
}

const getServerSnapshot = (): WhoProfile | null | undefined => undefined;

/** Saves the answers on the phone when storage allows, and redraws every piece that reads them. */
export function saveWho(p: WhoProfile) {
  state = p;
  loaded = true;
  try {
    localStorage.setItem(WHO_STORAGE_KEY, serialiseWho(p));
  } catch {}
  emit();
}

/** The saved answers: `undefined` until the page has loaded on the phone, then the profile or null. */
export function useWho(): WhoProfile | null | undefined {
  return useSyncExternalStore<WhoProfile | null | undefined>(subscribe, getSnapshot, getServerSnapshot);
}
