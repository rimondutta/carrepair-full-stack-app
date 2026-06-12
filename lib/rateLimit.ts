/**
 * Lightweight In-Memory Rate Limiter
 * Token-bucket approach keyed by IP address.
 * Suitable for serverless/edge — resets on cold start which is acceptable.
 */

import { NextRequest } from 'next/server';
import { apiError } from './apiResponse';
import Redis from 'ioredis';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory fallback store
const memoryStore = new Map<string, RateLimitEntry>();

// Redis client with error handling
let redis: Redis | null = null;
if (process.env.REDIS_URL) {
  try {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
      lazyConnect: true,
    });
    
    redis.on('error', (err) => {
      console.warn('[Redis] Connection failed, falling back to in-memory rate limiting.', err.message);
      redis = null;
    });
  } catch (err) {
    console.warn('[Redis] Initialization failed, using in-memory store.');
  }
}

// Auto-cleanup stale memory entries
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupMemory() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of memoryStore.entries()) {
    if (now > entry.resetTime) {
      memoryStore.delete(key);
    }
  }
}

/**
 * Check rate limit for a request.
 */
export async function checkRateLimit(
  request: NextRequest,
  maxRequests: number = 30,
  windowMs: number = 60 * 1000
) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const key = `ratelimit:${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  let count = 0;
  let resetTime = now + windowMs;

  if (redis) {
    try {
      const current = await redis.get(key);
      if (current) {
        count = parseInt(current) + 1;
        await redis.incr(key);
        // Get TTL to calculate remaining time
        const ttl = await redis.ttl(key);
        resetTime = now + (ttl > 0 ? ttl * 1000 : windowMs);
      } else {
        count = 1;
        await redis.set(key, 1, 'PX', windowMs);
      }
    } catch (err) {
      // Redis failed during check, fallback to memory
      console.warn('[Redis] Runtime error, using memory fallback.');
      return checkMemoryLimit(key, maxRequests, windowMs);
    }
  } else {
    return checkMemoryLimit(key, maxRequests, windowMs);
  }

  if (count > maxRequests) {
    const retryAfter = Math.ceil((resetTime - now) / 1000);
    return apiError(
      `Too many requests. Please try again in ${retryAfter} seconds.`,
      429
    );
  }

  return null;
}

function checkMemoryLimit(key: string, maxRequests: number, windowMs: number) {
  cleanupMemory();
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetTime) {
    memoryStore.set(key, { count: 1, resetTime: now + windowMs });
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
