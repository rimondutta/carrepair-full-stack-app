import { Metadata } from "next";
import PageHeroBanner from "../../components/services/PageHeroBanner";
import ServicesContainer from "../../components/services/ServicesContainer";
import ServiceProcess from "../../components/services/ServiceProcess";
import ServiceCTABanner from "../../components/services/ServiceCTABanner";
import ServiceFAQ from "../../components/services/ServiceFAQ";
import ServiceGuarantee from "../../components/services/ServiceGuarantee";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { redisUtils } from "@/lib/redis";

export const metadata: Metadata = {
  title: "Our Services | Care Plus Auto Repairing",
  description: "Expert car repair services including engine repair, tire change, denting repair, ceramic coating and more. Certified mechanics, 6-month guarantee.",
};

export const revalidate = 3600; // revalidate at most every hour

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Services" }
];

export default async function ServicesPage() {
  const CACHE_KEY = 'services:public';
  
  // 1. Try Cache hit
  let services = await redisUtils.get<any[]>(CACHE_KEY);
  
  if (!services) {
    // 2. Cache miss: DB Hit
    await connectDB();
    services = await Service.find({ isActive: true }).lean();
    
    // 3. Set Cache asynchronously
    if (services && services.length > 0) {
      redisUtils.set(CACHE_KEY, services, 3600);
    }
  }
  
  // Serialize MongoDB document
  const serializedServices = JSON.parse(JSON.stringify(services || []));

  return (
    <div className="bg-[#110E10] min-h-screen">
      <main>
        {/* Top Hero Breadcrumbs Block */}
        <PageHeroBanner
          title="Services"
          breadcrumbs={breadcrumbs}
          tag="OUR SERVICES"
        />

        {/* Client side container handling Tabs + Grid + State */}
        <ServicesContainer initialServices={serializedServices} />

        {/* How it Works section */}
        <ServiceProcess />

        {/* Pre-footer Call to action red banner */}
        <ServiceCTABanner />

        {/* Accordions */}
        <ServiceFAQ />

        {/* Final Guarantee Badges */}
        <ServiceGuarantee />

      </main>
    </div>
  );
}
