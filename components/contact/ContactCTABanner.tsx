"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PhoneCall, ChevronRight } from "lucide-react";

export default function ContactCTABanner() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className="bg-[#D70006] py-12 relative overflow-hidden w-full flex items-center"
    >
      {/* Diagonal Stripe Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, #000 20px, #000 40px)" 
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Heading & Chevrons */}
        <div 
          className={`flex items-start gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="flex mt-1">
            <ChevronRight className="text-white w-6 h-6 -mr-4" />
            <ChevronRight className="text-white w-6 h-6 -mr-4 opacity-60" />
            <ChevronRight className="text-white w-6 h-6 opacity-30" />
          </div>
          <div>
            <span className="text-white/80 text-xs font-black uppercase tracking-[0.2em] heading-font mb-2 block">
              IF ANY CAR RELATED ISSUES ARE BOTHERING YOU
            </span>
            <h2 className="text-white heading-font text-3xl md:text-5xl font-black uppercase leading-tight tracking-tight">
              GIVE A CALL TO Care Plus Auto Repairing
            </h2>
          </div>
        </div>

        {/* Right: Phone Info Widget */}
        <div 
          className={`flex-shrink-0 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <div className="bg-white px-8 py-5 rounded-full shadow-2xl flex items-center gap-6 hover:scale-105 transition-transform group border-4 border-white/20">
            <div className="bg-[#D70006] w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:animate-pulse">
              <PhoneCall className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#110E10] font-black text-[10px] uppercase tracking-[0.2em] mb-0.5 heading-font opacity-70">Available 24x7</p>
              <a 
                href="tel:+971 52 803 1110" 
                className="text-xl md:text-2xl font-black text-[#D70006] heading-font tracking-wider leading-none"
              >
                +971 52 803 1110
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
