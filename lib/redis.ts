import Redis from 'ioredis';
import { logger } from './logger';

const REDIS_URL = process.env.REDIS_URL || '';

interface RedisCache {
  conn: Redis | null;
}

declare global {
  // eslint-disable-next-line no-var
  var redisCache: RedisCache | undefined;
}

const cached: RedisCache = global.redisCache ?? { conn: null };

if (!global.redisCache) {
  global.redisCache = cached;
}

/**
 * Get or create a Redis client instance.
 * Returns null if REDIS_URL is not configured to fail gracefully.
 */
export function getRedisClient(): Redis | null {
  if (!REDIS_URL) {
    logger.warn('[Redis] REDIS_URL is not defined. Caching disabled.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  try {
    const client = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          logger.warn(`[Redis] Retry limit reached. Disabling Redis for this session.`);
          return null;
        }
        return Math.min(times * 200, 1000);
      },
    });

    client.on('error', (err) => {
      logger.error('[Redis Error]', err);
    });

    client.on('connect', () => {
      logger.log('[Redis] Connected successfully');
    });

    cached.conn = client;
    return client;
  } catch (err) {
    logger.error('[Redis Connection Exception]', err);
    return null;
  }
}

/**
 * Cache utilities
 */
export const redisUtils = {
  /**
   * Get parsed JSON data from cache
   */
  async get<T>(key: string): Promise<T | null> {
    const redis = getRedisClient();
    if (!redis) return null;

    try {
      const data = await redis.get(key);
      if (!data) return null;
      logger.log(`[Redis] HIT: ${key}`);
      return JSON.parse(data) as T;
    } catch (err) {
      logger.error(`[Redis] Failed to GET key: ${key}`, err);
      return null;
    }
  },

  /**
   * Set JSON data in cache with optional TTL (seconds)
   */
  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    const redis = getRedisClient();
    if (!redis) return;

    try {
      const data = JSON.stringify(value);
      if (ttlSeconds > 0) {
        await redis.set(key, data, 'EX', ttlSeconds);
      } else {
        await redis.set(key, data);
      }
      logger.log(`[Redis] SET: ${key} (TTL: ${ttlSeconds}s)`);
    } catch (err) {
      logger.error(`[Redis] Failed to SET key: ${key}`, err);
    }
  },

  /**
   * Delete keys matching a pattern (e.g. "services:*")
   */
  async invalidatePattern(pattern: string): Promise<void> {
    const redis = getRedisClient();
    if (!redis) return;

    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
        logger.log(`[Redis] INVALIDATE: ${pattern} (${keys.length} keys)`);
      }
    } catch (err) {
      logger.error(`[Redis] Failed to invalidate pattern: ${pattern}`, err);
    }
  },

  /**
   * Delete a specific key
   */
  async del(key: string): Promise<void> {
    const redis = getRedisClient();
    if (!redis) return;

    try {
      await redis.del(key);
      logger.log(`[Redis] DEL: ${key}`);
    } catch (err) {
      logger.error(`[Redis] Failed to DEL key: ${key}`, err);
    }
  }
};
