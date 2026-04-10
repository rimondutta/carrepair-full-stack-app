import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import ServicesCarousel from "./ServicesCarousel";

export default async function ServicesCarouselWrapper() {
  await connectDB();
  const services = await Service.find({ isActive: true }).limit(8).lean();
  
  // Efficiently serialize Mongo documents
  const serializedServices = services.map(service => ({
    ...service,
    _id: service._id.toString(),
    createdAt: service.createdAt?.toISOString(),
    updatedAt: service.updatedAt?.toISOString(),
  }));

  return <ServicesCarousel services={serializedServices} />;
}
