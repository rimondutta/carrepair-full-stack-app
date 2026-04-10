/**
 * Lightweight In-Memory Rate Limiter
 * Token-bucket approach keyed by IP address.
 * Suitable for serverless/edge — resets on cold start which is acceptable.
 */

import { NextRequest } from 'next/server';
import { apiError } from './apiResponse';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Auto-cleanup stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}

/**
 * Check rate limit for a request.
 * @param request - The NextRequest object
 * @param maxRequests - Maximum requests allowed in the window (default: 30)
 * @param windowMs - Time window in milliseconds (default: 60 seconds)
 * @returns null if allowed, or a NextResponse with 429 status if limited
 */
export function checkRateLimit(
  request: NextRequest,
  maxRequests: number = 30,
  windowMs: number = 60 * 1000
) {
  cleanup();

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return null;
  }

  entry.count++;

  if (entry.count > maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return apiError(
      `Too many requests. Please try again in ${retryAfter} seconds.`,
      429
    );
  }

  return null;
}
