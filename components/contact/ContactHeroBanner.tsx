"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ContactHeroBannerProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export default function ContactHeroBanner({ title, breadcrumbs }: ContactHeroBannerProps) {
  return (
    <section className="relative w-full min-h-[400px] pt-[110px] bg-gradient-to-r from-[#110E10] via-[#1B1B1B] to-[#110E10] flex items-center overflow-hidden border-b-2 border-[#D70006]">
      
      {/* Background Dot Grid Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Abstract Mechanic SVG Outline (CSS only placeholder) */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.08] pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="1" className="w-full h-full">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 20 L50 40 M50 60 L50 80 M20 50 L40 50 M60 50 L80 50" strokeLinecap="round" />
          <path d="M35 35 L45 45 M55 55 L65 65" strokeLinecap="round" />
          <path d="M65 35 L55 45 M45 55 L35 65" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-start">
          
          {/* Red Tag Component */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#D70006]"></div>
            <span className="text-[#D70006] text-xs font-black uppercase tracking-[0.3em] heading-font">
              CONTACT US
            </span>
            <div className="w-8 h-[2px] bg-[#D70006]"></div>
          </div>

          <h1 className="text-white text-5xl md:text-6xl font-black uppercase heading-font mb-6 tracking-tight">
            {title}
          </h1>

          {/* Breadcrumbs Row */}
          <nav className="flex items-center gap-4">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-4">
                  {crumb.href && !isLast ? (
                    <Link 
                      href={crumb.href}
                      className="text-[#999] text-xs font-bold uppercase tracking-widest hover:text-[#D70006] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white text-xs font-bold uppercase tracking-widest">
                      {crumb.label}
                    </span>
                  )}
                  
                  {!isLast && (
                    <div className="flex items-center opacity-40">
                      <ChevronRight className="w-3 h-3 text-[#D70006]" />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

        </div>
      </div>
    </section>
  );
}
