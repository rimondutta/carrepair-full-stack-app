"use client";

import { Phone } from "lucide-react";

export default function ServiceCTABanner() {
  return (
    <section className="relative w-full py-12 md:py-16 bg-[var(--color-primary)] overflow-hidden flex items-center justify-center">
      
      {/* Subtle diagonal stripe pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            #000 10px,
            #000 20px
          )`
        }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Left Block */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex opacity-60">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -translate-x-4">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </div>
            <span className="text-white font-bold uppercase tracking-widest text-xs md:text-sm">
              If Any Car Related Issues Are Bothering You
            </span>
          </div>

          {/* Center Block */}
          <h2 className="text-white heading-font text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider whitespace-nowrap drop-shadow-lg">
            Give A Call To Care Plus Auto Repairing
          </h2>

          {/* Right Block */}
          <div className="flex items-center gap-4 bg-black/20 px-6 py-4 rounded-full border border-white/10 hover:bg-white hover:text-[var(--color-primary)] group transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-white text-xs uppercase tracking-wider opacity-80 group-hover:text-[var(--color-primary)]">We are Available 24x7</span>
              <span className="text-white font-bold text-lg md:text-xl group-hover:text-[var(--color-primary)]">+971 52 803 1110</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
