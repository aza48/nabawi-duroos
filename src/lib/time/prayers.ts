/** The five prayers in day order. Kept free of imports so client bundles never pull the prayer-time library for the names alone. */
export type Prayer = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export const PRAYERS: Prayer[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
