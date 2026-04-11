import Service, { IService } from '@/models/Service';
import { connectDB } from '@/lib/mongodb';
import { redisUtils } from '@/lib/redis';

const CACHE_KEY_PUBLIC = 'services:public';

export class ServiceService {
  static async getActiveServices() {
    const cached = await redisUtils.get<IService[]>(CACHE_KEY_PUBLIC);
    if (cached) return { services: cached, source: 'cache' };

    await connectDB();
    const services = await Service.find({ isActive: true })
      .sort({ category: 1, title: 1 })
      .lean();

    if (services.length > 0) {
      redisUtils.set(CACHE_KEY_PUBLIC, services, 86400); // 24 hours
    }

    return { services, source: 'db' };
  }

  static async getServiceBySlug(slug: string) {
    const cacheKey = `service:slug:${slug}`;
    const cached = await redisUtils.get<IService>(cacheKey);
    if (cached) return { service: cached, source: 'cache' };

    await connectDB();
    const service = await Service.findOne({ slug, isActive: true }).lean();
    
    if (service) {
      redisUtils.set(cacheKey, service, 86400);
    }
    
    return { service, source: 'db' };
  }

  static async clearCache() {
    await redisUtils.del(CACHE_KEY_PUBLIC);
  }

  static async createService(data: Partial<IService>) {
    await connectDB();
    const service = await Service.create(data);
    await this.clearCache();
    return service;
  }
}
