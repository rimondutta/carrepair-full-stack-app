"use client";

import { CalendarCheck, Search, Wrench, Car } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    id: 1,
    num: "01",
    title: "Book Appointment",
    desc: "Schedule your visit via our online portal or a quick call.",
    icon: <CalendarCheck className="w-8 h-8 text-white" />
  },
  {
    id: 2,
    num: "02",
    title: "Vehicle Inspection",
    desc: "Our mechanics perform a multi-point computerized diagnostic check.",
    icon: <Search className="w-8 h-8 text-white" />
  },
  {
    id: 3,
    num: "03",
    title: "Expert Repair",
    desc: "We utilize certified parts to restore your vehicle to factory standards.",
    icon: <Wrench className="w-8 h-8 text-white" />
  },
  {
    id: 4,
    num: "04",
    title: "Road Test & Delivery",
    desc: "Rigorous testing protocols ensure everything is perfectly aligned.",
    icon: <Car className="w-8 h-8 text-white" />
  }
];

export default function ServiceProcess() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[#1B1B1B] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 border-t-2 border-[var(--color-primary)]"></span>
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] text-sm md:text-xs uppercase">
              HOW IT WORKS
            </span>
            <span className="w-10 border-t-2 border-[var(--color-primary)]"></span>
          </div>
          <h2 className="text-white heading-font text-3xl md:text-5xl font-bold uppercase tracking-wide">
            Our Simple Service Process
          </h2>
        </div>

        {/* Steps Row */}
        <div className="relative flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
          
          {/* Connecting Dashed Line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[var(--color-primary)]/30 z-0"></div>

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative z-10 w-full lg:w-1/4 flex flex-col items-center text-center group
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              
              {/* Giant Background Number */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 text-6xl md:text-8xl font-black text-[#2e2e2e]/40 heading-font z-0 pointer-events-none select-none group-hover:text-[var(--color-primary)]/10 transition-colors duration-500">
                {step.num}
              </div>

              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-[#110E10] border-4 border-[#2e2e2e] flex items-center justify-center mb-6 relative z-10 group-hover:border-[var(--color-primary)] group-hover:scale-110 transition-all duration-300">
                {/* Inner red dot */}
                <div className="w-full h-full rounded-full bg-[var(--color-primary)] scale-0 group-hover:scale-100 absolute inset-0 transition-transform duration-300 z-0"></div>
                <div className="relative z-10">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 px-4">
                <h3 className="text-white font-bold heading-font text-xl uppercase tracking-wider mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[var(--color-textMuted)] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
