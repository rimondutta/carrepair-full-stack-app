"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Play, ShieldCheck, Droplet, Settings2, Wind } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Car Protection & Fitness",
    desc: "We provide comprehensive protective ceramic coating services and structural fitness checks to ensure your vehicle remains in peak condition and retains its original aesthetic value.",
    isActive: true,
  },
  {
    icon: <Droplet className="w-8 h-8" />,
    title: "Complimentary Car Wash",
    desc: "Every repair service includes a premium high-pressure car wash utilizing PH-balanced chemicals to protect your paint while removing stubborn road grime and contaminants.",
    isActive: false,
  },
  {
    icon: <Settings2 className="w-8 h-8" />,
    title: "Expert Engine & Balancing",
    desc: "Our workshop uses laser-precision diagnostic equipment for engine tuning and wheel balancing, ensuring a smooth ride and optimal fuel efficiency for your vehicle.",
    isActive: false,
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: "Windshield & Glass Repair",
    desc: "We specialize in shatter-free resin restorations for windshield cracks and full glass replacements using OEM-standard materials for maximum visibility and safety.",
    isActive: true,
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="bg-[var(--color-bgDark)] flex flex-col lg:flex-row min-h-[600px]">
      
      {/* Left Half: Video Trailer Placeholder */}
      <div 
        className="w-full lg:w-1/2 min-h-[400px] lg:min-h-full relative bg-[url('/assets/asset%2062.jpeg')] bg-cover bg-center flex items-center justify-center overflow-hidden"
      >
        {/* Background Image tint logic */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Play Button */}
        <button 
          className="relative z-10 flex flex-col items-center justify-center gap-4 group"
          onClick={() => alert("Video popup would open here.")}
        >
          <div className="w-24 h-24 bg-[var(--color-primary)] rounded-full flex items-center justify-center relative">
            {/* Ripple rings */}
            <div className="absolute inset-0 rounded-full border border-[var(--color-primary)] animate-ripple"></div>
            <div className="absolute inset-0 rounded-full border border-[var(--color-primary)] animate-ripple" style={{ animationDelay: '0.75s' }}></div>
            
            <Play className="w-10 h-10 text-white ml-2 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-white heading-font text-xl font-bold uppercase tracking-widest mt-2">
            Play Video
          </span>
        </button>
      </div>

      {/* Right Half: Feature Grid */}
      <div className="w-full lg:w-1/2 flex items-center py-20 px-4 md:px-12 lg:px-20 bg-[#1B1B1B]">
        <div className="w-full">
          
          <div className="mb-12">
            <span className="text-[var(--color-primary)] font-bold tracking-widest text-sm uppercase mb-4 block">
              WHY CHOOSE US
            </span>
            <h2 className="text-white heading-font text-4xl lg:text-5xl font-bold uppercase leading-tight mb-4">
              Best Garage For Your Car
            </h2>
            <p className="text-[var(--color-textMuted)] leading-relaxed text-sm lg:text-base">
              We stand apart through our commitment to technical precision and superior customer service. Your vehicle represents a significant investment, and our certified mechanics treat it accordingly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((item, index) => (
              <div 
                key={index}
                className={`p-8 transition-colors duration-500 flex flex-col justify-center h-[220px] group cursor-pointer ${
                  item.isActive 
                    ? "bg-[var(--color-primary)] text-white" 
                    : "bg-[#222222] text-white hover:bg-[var(--color-primary)]"
                } ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
                    item.isActive 
                      ? "bg-black/20" 
                      : "bg-[#110E10] group-hover:bg-black/20 text-[var(--color-primary)] group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="heading-font font-bold text-lg uppercase mb-2">
                  {item.title}
                </h3>
                <p className={`text-sm ${
                  item.isActive ? "text-white/80" : "text-[var(--color-textMuted)] group-hover:text-white/80"
                }`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
