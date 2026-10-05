import { createHash } from 'node:crypto';

/**
 * Fixed-window rate limiter for the public inquiry endpoint (SRS §13.2).
 *
 * In-memory and therefore per-instance: on a serverless host each warm instance
 * keeps its own counter, so this blunts casual abuse rather than acting as a
 * hard quota. That is the right trade for a small business site — it needs no
 * extra infrastructure, and the honeypot plus submit-timing checks catch the
 * bulk of automated traffic. Swap in Redis or a WAF rule if abuse becomes real.
 */
type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

/** Drop expired buckets so the map cannot grow without bound. */
function sweep(now: number): void {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

export function checkRateLimit(identifier: string, now = Date.now()): RateLimitResult {
  sweep(now);

  // Hash the identifier so the map never holds a raw IP address in memory.
  const key = createHash('sha256').update(identifier).digest('hex').slice(0, 32);
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Best-effort client address behind a proxy or CDN. */
export function clientIdentifier(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') ?? 'unknown';
}
