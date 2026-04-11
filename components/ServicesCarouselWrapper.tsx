import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import ServicesCarousel from "./ServicesCarousel";
import { redisUtils } from "@/lib/redis";

export default async function ServicesCarouselWrapper() {
  const CACHE_KEY = 'services:public';
  
  // 1. Try Cache hit (reuse public list)
  let services = await redisUtils.get<any[]>(CACHE_KEY);
  
  if (!services) {
    // 2. Cache miss: DB Hit
    await connectDB();
    services = await Service.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    
    // 3. Set Cache asynchronously (for full list)
    if (services && services.length > 0) {
      redisUtils.set(CACHE_KEY, services, 3600);
    }
  }

  const initialLimit = 8;
  const limitedServices = (services || []).slice(0, initialLimit);
  
  // Efficiently serialize Mongo documents
  const serializedServices = limitedServices.map(service => ({
    ...service,
    _id: typeof service._id === 'object' ? service._id.toString() : service._id,
  }));

  return <ServicesCarousel services={serializedServices} />;
}
