"use client";

import { ShieldCheck, Clock, Star, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const guarantees = [
  {
    id: 1,
    icon: <ShieldCheck className="w-full h-full text-[var(--color-primary)]" />,
    title: "6 Month Guarantee",
    desc: "On all repair services"
  },
  {
    id: 2,
    icon: <Clock className="w-full h-full text-[var(--color-primary)]" />,
    title: "24/7 Support",
    desc: "Always available for you"
  },
  {
    id: 3,
    icon: <Star className="w-full h-full text-[var(--color-primary)]" />,
    title: "Certified Mechanics",
    desc: "Factory trained experts"
  },
  {
    id: 4,
    icon: <Award className="w-full h-full text-[var(--color-primary)]" />,
    title: "10+ Years Experience",
    desc: "Trusted by thousands"
  }
];

export default function ServiceGuarantee() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="bg-[#1B1B1B] border-t border-[#2e2e2e] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#2e2e2e]">
          {guarantees.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center gap-6 px-4 lg:px-8 transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 flex-shrink-0 group">
                <div className="group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-white heading-font text-lg font-bold uppercase tracking-wider mb-1">
                  {item.title}
                </h4>
                <p className="text-[var(--color-textMuted)] text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
