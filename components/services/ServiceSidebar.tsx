import Link from "next/link";
import { Phone } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";

interface ServiceSidebarProps {
  currentSlug: string;
}

export default async function ServiceSidebar({ currentSlug }: ServiceSidebarProps) {
  await connectDB();
  const servicesData = await Service.find({ isActive: true }).select("title slug").lean();
  return (
    <aside className="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 flex flex-col gap-10 lg:sticky lg:top-32">
      
      {/* Widget 1: Services List Box */}
      <div className="bg-[#1B1B1B] rounded-xl overflow-hidden border border-[#222]">
        <h4 className="border-l-4 border-[var(--color-primary)] pl-5 py-6 text-xl font-bold uppercase tracking-wider text-white border-b border-[#222]">
          Our Services
        </h4>
        <div className="flex flex-col">
          {servicesData.map((svc) => {
            const isActive = svc.slug === currentSlug;
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={`flex items-center justify-between py-4 px-6 border-b border-[#222] last:border-b-0 transition-all duration-300 font-semibold group
                  ${isActive ? "bg-[var(--color-primary)] text-white border-b-transparent" : "text-[#999] hover:bg-[var(--color-primary)] hover:text-white"}`}
              >
                <span>{svc.title}</span>
                <span className={`text-[var(--color-primary)] font-bold group-hover:text-white transition-colors group-hover:translate-x-1 ${isActive ? "text-white" : ""}`}>
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Widget 2: Contact/CTA Box */}
      <div className="rounded-xl overflow-hidden relative border border-[#D70006]/50 p-10 flex flex-col items-center justify-center text-center">
        
        {/* Deep Red CSS Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7A0004] to-[#D70006]"></div>
        
        {/* Diagonal Line Stripes Effect */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)" }}></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-white/80 text-sm font-semibold tracking-wider uppercase mb-6 drop-shadow-md">
            Get best Car Mechanics
          </span>
          
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-2xl mb-5 transform hover:scale-110 transition-transform">
            <Phone className="w-6 h-6" />
          </div>

          <span className="text-white text-xs font-bold uppercase tracking-widest mb-1 drop-shadow-xl">
            Need Help? Call Us Now
          </span>
          
          <a href="tel:+971 52 803 1110" className="text-white text-3xl font-black drop-shadow-xl hover:text-black transition-colors">
            +971 52 803 1110
          </a>
        </div>
      </div>

    </aside>
  );
}
