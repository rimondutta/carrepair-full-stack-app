"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCounter } from "@/hooks/useCounter";
import { Settings, Car, PaintBucket } from "lucide-react";

export default function StatsCounter() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });

  const stats = [
    {
      id: 1,
      target: 600,
      label: "Wheel Replacement",
      icon: <Settings className="w-12 h-12 text-white/50" />,
    },
    {
      id: 2,
      target: 250,
      label: "Interior Remodeling",
      icon: <Car className="w-12 h-12 text-white/50" />,
    },
    {
      id: 3,
      target: 456,
      label: "Color Correction",
      icon: <PaintBucket className="w-12 h-12 text-white/50" />,
    },
  ];

  return (
    <section ref={ref} className="bg-[var(--color-primary)] py-16 md:py-20 relative z-20 shadow-2xl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-around items-center gap-10 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x-2 divide-white/20">
          
          {stats.map((stat) => (
            <StatItem 
              key={stat.id} 
              stat={stat} 
              isVisible={isVisible} 
            />
          ))}

        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

function StatItem({ stat, isVisible }: { stat: {id: number, target: number, label: string, icon: ReactNode}, isVisible: boolean }) {
  const currentCount = useCounter({ 
    end: stat.target, 
    duration: 2500, 
    start: isVisible 
  });

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center pt-8 md:pt-0 group">
      <div className="mb-4 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
        {stat.icon}
      </div>
      <div className="flex items-end mb-2">
        <span className="text-5xl md:text-6xl font-bold text-white heading-font tabular-nums tracking-tighter">
          {currentCount}
        </span>
        <span className="text-4xl font-bold text-white heading-font ml-1">+</span>
      </div>
      <p className="text-white/80 font-medium tracking-wider uppercase text-sm md:text-base">
        {stat.label}
      </p>
    </div>
  );
}
