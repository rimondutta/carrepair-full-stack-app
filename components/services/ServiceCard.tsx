"use client";

import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { Service } from "../../types/service";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const IconComponent = ({ name }: { name: string }) => {
  // @ts-expect-error - Dynamic key access on lucide-react exports
  const Icon = LucideIcons[name] as React.ElementType;
  if (!Icon) return <LucideIcons.Wrench className="w-6 h-6 text-white" />;
  return <Icon className="w-6 h-6 text-white" />;
};

const categoryLabels: Record<string, string> = {
  "engine-mechanical": "Engine & Mechanical",
  "tires-wheels": "Tires & Wheels",
  "body-denting": "Body & Denting",
  "electrical": "Electrical",
  "glass-windshield": "Glass & Windshield",
};

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden bg-[#1B1B1B] 
        border border-[#2e2e2e] hover:border-[#D70006]/50 
        transition-all duration-500 cursor-pointer flex flex-col h-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {/* Image Area — top half */}
      <div className="relative overflow-hidden aspect-[4/3] w-full">
        {/* Real image or fallback gradient */}
        {service.image ? (
          <div 
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${service.image}')` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#222] to-[#111] group-hover:scale-105 transition-transform duration-700" />
        )}
        
        {/* Dark tint overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

        {/* Icon badge — bottom right of image */}
        <div className="absolute bottom-4 right-4 
          w-14 h-14 bg-[#D70006] flex items-center justify-center
          group-hover:bg-[#110E10] group-hover:border group-hover:border-[#D70006]
          transition-all duration-300 z-10">
          <IconComponent name={service.icon} />
        </div>

        {/* Category label — top left */}
        <span className="absolute top-4 left-0 
          bg-[#D70006] text-white text-xs uppercase font-bold
          px-3 py-1 tracking-wider z-10">
          {categoryLabels[service.category] || service.category}
        </span>
      </div>

      {/* Content Area — bottom half */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white heading-font font-bold text-xl mb-3
          group-hover:text-[#D70006] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-[#999] text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Read More button — diagonal parallelogram style */}
        <div className="mt-auto self-start relative inline-block">
          <Link href={`/services/${service.slug}`} 
            className="inline-flex items-center gap-2 relative
              bg-transparent border border-[#D70006]/50 
              text-white text-xs font-semibold uppercase tracking-wider
              px-6 py-3 transition-all duration-300
              before:content-[''] before:absolute before:inset-0 
              before:bg-[#D70006] before:scale-x-0 before:origin-left
              hover:before:scale-x-100 before:transition-transform before:duration-300
              overflow-hidden group/btn z-10"
            style={{ transform: 'skewX(-10deg)' }}>
            <span className="relative z-10" style={{ transform: 'skewX(10deg)' }}>Read More</span>
            <ArrowRight className="relative z-10 w-4 h-4 ml-1" style={{ transform: 'skewX(10deg)' }} />
          </Link>
        </div>
      </div>

      {/* Active state: left red border accent */}
      {service.isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D70006] z-20" />
      )}
    </article>
  );
}
