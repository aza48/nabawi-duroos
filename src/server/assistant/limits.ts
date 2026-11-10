/**
 * How many questions one address may ask: enough for a real conversation; more than this is a script.
 * Kept here, not in the route file, because a route file may only export its handlers and config.
 */
export const ASK_LIMITS = [
  { max: 12, windowMs: 60_000 },
  { max: 80, windowMs: 3_600_000 },
];
