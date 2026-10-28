const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;
const MAX_TRACKED_KEYS = 5000;

// Per server instance only: serverless instances do not share this map, so it slows abuse
// rather than strictly enforcing the limit. Phase 2 can move this into the database.
const hits = new Map<string, number[]>();

export function allowRequest(key: string, now: number = Date.now()): boolean {
  if (hits.size > MAX_TRACKED_KEYS) hits.clear();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  const allowed = recent.length < LIMIT;
  if (allowed) recent.push(now);
  hits.set(key, recent);
  return allowed;
}
