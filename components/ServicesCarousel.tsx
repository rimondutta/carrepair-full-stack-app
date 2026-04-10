"use client";

import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { 
  Wrench, 
  Settings, 
  BatteryCharging, 
  Droplets, 
  ArrowUpRight, 
  Cog, 
  Circle, 
  Hammer, 
  Battery, 
  Disc, 
  Layers, 
  AlignCenter, 
  Aperture, 
  Sparkles, 
  Settings2,
  LucideIcon 
} from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/data/services";

// Local icon mapping for the carousel
const ICON_MAP: Record<string, LucideIcon> = {
  Wrench,
  Settings,
  BatteryCharging,
  Droplets,
  Cog,
  Circle,
  Hammer,
  Battery,
  Disc,
  Layers,
  AlignCenter,
  Aperture,
  Sparkles,
  Settings2,
};

export default function ServicesCarousel({ services = servicesData.slice(0, 8) }: { services?: any[] }) {
  const { ref, isVisible } = useScrollAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Simple drag-to-scroll functionality
  // Simple drag-to-scroll functionality
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (carouselRef.current) {
      carouselRef.current.classList.add('cursor-grabbing');
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  };

  const onMouseLeave = () => {
    isDown.current = false;
    if (carouselRef.current) {
      carouselRef.current.classList.remove('cursor-grabbing');
    }
  };

  const onMouseUp = () => {
    isDown.current = false;
    if (carouselRef.current) {
      carouselRef.current.classList.remove('cursor-grabbing');
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    if (carouselRef.current) {
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX.current) * 2; // Scroll-fast
      carouselRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[var(--color-bgDark)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div 
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-xl">
            <span className="text-[var(--color-primary)] font-bold tracking-widest text-sm uppercase mb-4 block">
              OUR SERVICE LIST
            </span>
            <h2 className="text-white heading-font text-4xl md:text-5xl font-bold uppercase leading-tight">
              Providing All Types of <br />
              <span className="text-[var(--color-primary)] italic">Car Maintenance</span> Services
            </h2>
          </div>
          
          <Link 
            href="#contact" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 font-bold uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-white transition-all group"
          >
            Contact Us
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar transition-all duration-1000 delay-300 cursor-grab ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
          style={{ scrollbarWidth: "none" /* Firefox */, msOverflowStyle: "none" /* IE/Edge */ }}
        >
          {services.map((service: any, index: number) => {
            const Icon = ICON_MAP[service.icon] || Settings;
            return (
              <div 
                key={service._id || service.slug || index} 
                className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] bg-[var(--color-bgDark2)] bg-cover bg-center p-8 snap-center group relative overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300"
                style={{ backgroundImage: `url('${service.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#110E10] via-[#110E10]/90 to-[#110E10]/40 group-hover:opacity-90 z-0 transition-opacity"></div>
                
                <div className="relative z-10 flex-grow">
                  <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full flex flex-col items-center justify-center mb-8 transform group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white heading-font uppercase mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-textLight)] leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Diagonal button */}
                <div className="relative z-10 block mt-auto self-start">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="relative inline-flex items-center px-6 py-3 overflow-hidden text-white font-bold tracking-wider text-sm uppercase bg-[var(--color-primary)] group-hover:bg-white group-hover:text-[var(--color-primary)] transition-colors"
                    style={{ transform: 'skewX(-15deg)' }}
                  >
                    <span style={{ transform: 'skewX(15deg)' }}>Get Service</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
