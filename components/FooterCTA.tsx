"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PhoneCall, ChevronRight } from "lucide-react";

export default function FooterCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className="bg-[var(--color-primary)] py-12 relative overflow-hidden w-full flex items-center"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute right-[-10%] top-[-50%] w-96 h-96 rounded-full border-[40px] border-white"></div>
        <div className="absolute left-[-5%] bottom-[-50%] w-64 h-64 rounded-full border-[20px] border-white"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Heading & Chevron */}
        <div 
          className={`flex items-start gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="bg-white/20 p-3 rounded-full hidden sm:block">
            <ChevronRight className="text-white w-8 h-8" />
          </div>
          <div>
            <h2 className="text-white heading-font text-3xl md:text-5xl font-bold uppercase mb-2">
              Give a Call to Care Plus Auto Repairing
            </h2>
            <p className="text-white/90 text-lg md:text-xl font-medium">
              If any car related issues are bothering you
            </p>
          </div>
        </div>

        {/* Right Side: Contact info / Illustration placeholder */}
        <div 
          className={`flex-shrink-0 relative flex items-center gap-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          {/* Mechanic silhouette placeholder */}
          <div className="hidden lg:block w-32 h-32 rounded-full bg-gradient-to-t from-black/40 to-transparent relative -mr-12 z-0 border-4 border-white/10" />
          
          <div className="bg-white p-5 md:p-8 rounded-xl shadow-2xl z-10 flex items-center gap-4 md:gap-5 hover:scale-105 transition-transform cursor-pointer w-full md:w-auto">
            <div className="bg-[var(--color-primary)]/10 p-3 md:p-4 rounded-full flex-shrink-0">
              <PhoneCall className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-primary)] animate-pulse" />
            </div>
            <div>
              <p className="text-[var(--color-bgDark)] font-bold mb-0.5 md:mb-1 text-[10px] md:text-sm uppercase whitespace-nowrap">We are Available 24x7</p>
              <h3 className="text-xl md:text-3xl font-bold text-[var(--color-primary)] heading-font leading-none tracking-tight">
                +971 52 803 1110
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
