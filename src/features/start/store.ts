"use client";

import { useSyncExternalStore } from "react";
import { START_STEPS } from "@/content/start";
import { EMPTY_SAVED, START_STORAGE_KEY, parseSaved, type StartSaved } from "./plan";

/**
 * One shared copy of the reader's plan (ticks, arrival date, who it is for), saved on this phone.
 * Every small client piece of the page reads it through useStart(). The server and the first
 * client render both see the empty plan, so nothing shifts until the saved plan loads.
 * Storage can be blocked (private mode, strict settings): the page then works for the visit only.
 */

const VALID = new Set(START_STEPS.map((s) => s.id));
const listeners = new Set<() => void>();
let state: StartSaved = EMPTY_SAVED;
let loaded = false;

function load() {
  try {
    state = parseSaved(localStorage.getItem(START_STORAGE_KEY), VALID);
  } catch {
    state = EMPTY_SAVED;
  }
  loaded = true;
}

const emit = () => listeners.forEach((fn) => fn());

/** Another tab changed the plan: pick it up here too. */
function onStorage(e: StorageEvent) {
  if (e.key !== null && e.key !== START_STORAGE_KEY) return;
  load();
  emit();
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): StartSaved {
  if (!loaded) load();
  return state;
}

const getServerSnapshot = (): StartSaved => EMPTY_SAVED;

/** Changes the plan, saves it on the phone when storage allows, and redraws every piece. */
export function updateStart(change: (s: StartSaved) => StartSaved) {
  state = change(getSnapshot());
  try {
    localStorage.setItem(START_STORAGE_KEY, JSON.stringify(state));
  } catch {}
  emit();
}

/** The plan as it stands now, outside React (used by tests). */
export const readStart = (): StartSaved => getSnapshot();

/** What the server and the first client render see: always the empty plan, so the markup matches. */
export const readStartOnServer = getServerSnapshot;

export function useStart(): StartSaved {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
