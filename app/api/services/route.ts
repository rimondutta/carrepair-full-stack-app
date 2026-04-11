import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { redisUtils } from '@/lib/redis';

const CACHE_KEY = 'services:public';

export async function GET() {
  try {
    // 1. Try Cache hit
    const cached = await redisUtils.get<any[]>(CACHE_KEY);
    if (cached) {
      return apiSuccess({ services: cached, source: 'cache' });
    }

    // 2. Cache miss: DB Hit
    await connectDB();
    const services = await Service.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    // 3. Set Cache asynchronously (don't block response)
    if (services.length > 0) {
      redisUtils.set(CACHE_KEY, services, 3600); // 1 hour TTL
    }

    return apiSuccess({ services, source: 'db' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return apiError(message, 500);
  }
}
