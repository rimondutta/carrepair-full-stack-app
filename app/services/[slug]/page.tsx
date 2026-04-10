import PageHeroBanner from "../../../components/services/PageHeroBanner";
import ServiceDetails from "../../../components/services/ServiceDetails";
import ServiceSidebar from "../../../components/services/ServiceSidebar";
import ServiceCTABanner from "../../../components/services/ServiceCTABanner";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const service = await Service.findOne({ slug, isActive: true }).lean();
  
  if (!service) {
    return {
      title: "Service Not Found | Care Plus Auto Repairing",
    };
  }

  return {
    title: `${service.title} | Care Plus Auto Repairing`,
    description: service.shortDescription,
  };
}

export default async function DynamicServicePage({ params }: Props) {
  const { slug } = await params;
  await connectDB();
  
  const service = await Service.findOne({ slug, isActive: true }).lean();

  if (!service) {
    notFound();
  }

  // Serialize MongoDB document
  const serializedService = JSON.parse(JSON.stringify(service));

  return (
    <div className="bg-[#0E0E0E] min-h-screen font-sans text-white">
      {/* 1. Page Hero */}
      <PageHeroBanner 
        title={serializedService.title} 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: serializedService.title }
        ]} 
      />

      {/* 2. Main Content Area */}
      <main className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column Component Layer */}
          <ServiceDetails service={serializedService} />

          {/* Right Column Component Layer */}
          <ServiceSidebar currentSlug={slug} />

        </div>
      </main>

      {/* 3. CTA Banner */}
      <ServiceCTABanner />

      {/* Structured Data (Schema.org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": serializedService.title,
            "description": serializedService.shortDescription || serializedService.description,
            "provider": {
              "@type": "AutoRepair",
              "name": "Care Plus Auto Repairing",
              "url": "https://careplusauto.vercel.app",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "9 19dStreet - 3 St - Al Qouz Ind.third",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              }
            },
            "areaServed": "Dubai, UAE",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Automotive Repair Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": serializedService.title
                  }
                }
              ]
            }
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": (serializedService.faqs && serializedService.faqs.length > 0 ? serializedService.faqs : [
              {
                question: "How long does a standard vehicle repair take?",
                answer: "The duration depends on the complexity of the issue. Routine maintenance typically takes 2-4 hours, while complex engine or transmission work might require 2-3 business days."
              },
              {
                question: "Do you use genuine parts for all repairs?",
                answer: "Yes, we prioritize the use of 100% genuine OEM (Original Equipment Manufacturer) parts for all vehicle services."
              },
              {
                question: "Can I get a price estimate over the phone?",
                answer: "We can provide general estimates, but a precise quote requires a physical diagnostic of your vehicle."
              },
              {
                question: "Is there a warranty on your repair services?",
                answer: "We stand behind our work with a comprehensive service warranty on both parts and labor."
              }
            ]).map((faq: any) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
