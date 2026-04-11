import mongoose from 'mongoose';
import dns from 'dns';
import { logger } from './logger';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  // Bypass local DNS resolution issues with SRV records (e.g. local router blocking querySrv)
  try {
    // Only apply DNS override if we're NOT in Vercel to avoid hitting edge network performance
    if (!process.env.VERCEL) {
      // Use Google DNS which is reliable for SRV lookups
      dns.setServers(['8.8.8.8', '8.8.4.4']);
    }
  } catch (err) {
    logger.warn('[MongoDB] Failed to set custom DNS servers:', err);
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      heartbeatFrequencyMS: 30000,
      family: 4, // Force IPv4 to resolve SRV issues on local machines
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        logger.log('[MongoDB] Connected successfully');
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    cached.promise = null;
    
    // Explicitly check for Whitelist/Connectivity errors to help user
    if (e.message?.includes('ECONNREFUSED') || e.message?.includes('querySrv')) {
      logger.error('[MongoDB] FATAL: Connection refused. Please check if your local IP is WHITELISTED in MongoDB Atlas (Network Access).');
    } else {
      logger.error('[MongoDB] Connection failed:', e);
    }
    
    throw e;
  }

  return cached.conn;
}
