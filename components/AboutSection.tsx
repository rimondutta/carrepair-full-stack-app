"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Wrench, ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-[var(--color-bgDark)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Overlapping Images */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Tall Image Placeholder */}
            <div 
              className={`w-[85%] aspect-[3/4] bg-[url('/assets/asset%2040.jpeg')] bg-cover bg-center rounded-xl relative z-10 overflow-hidden shadow-2xl transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              {/* Fake image tinting/overlay */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#110E10] to-transparent"></div>
            </div>

            {/* Smaller offset image */}
            <div 
              className={`absolute bottom-[-10%] right-[-5%] w-[45%] lg:w-[50%] aspect-square bg-[url('/assets/asset%2047.jpeg')] bg-cover bg-center rounded-xl border-4 flex items-end justify-start border-[var(--color-primary)] z-20 shadow-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Decorative arrow */}
            <div 
              className={`absolute top-10 right-0 w-20 h-20 rounded-full bg-white flex justify-center items-center z-30 transition-all duration-700 delay-500 animate-bounce ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <ArrowDown className="w-8 h-8 text-[var(--color-primary)]" />
            </div>

            {/* Dot pattern decor */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[radial-gradient(#D70006_2px,transparent_2px)] [background-size:16px_16px] opacity-20 -z-10"></div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div 
              className={`mb-6 flex justify-start transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 flex items-center justify-center rounded-lg">
                <Wrench 
                  className={`w-8 h-8 text-[var(--color-primary)] ${isVisible ? "animate-rotateInDownRight" : "opacity-0"}`} 
                />
              </div>
            </div>

            <h2 
              className={`text-white heading-font text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.1] mb-6 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              We Care For Your Car Just Like <span className="text-[var(--color-primary)] italic font-medium">You Do</span>
            </h2>

            <div 
              className={`space-y-6 text-[var(--color-textMuted)] leading-relaxed mb-10 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p>
                From simple maintenance to complete engine rebuilds, Care Plus Auto Repairing provides elite-level car servicing that prioritizes quality, precision, and longevity. We believe every vehicle deserves meticulous attention and premium parts. Our workshop is equipped with the latest automotive technology, allowing us to perform deep diagnostics and complex repairs with absolute accuracy.
              </p>
              <p>
                Our journey began with a simple mission: to provide transparent, reliable, and high-quality automotive care that vehicle owners can trust. Over the years, we have built a reputation for excellence by consistently delivering results that exceed expectations. Whether it’s a modern performance car or a reliable family SUV, we treat every machine with the respect it deserves.
              </p>
              <p>
                Our certified mechanics utilize state-of-the-art diagnostic equipment to pinpoint underlying issues that other shops miss. We don't just fix symptoms; we solve the root cause of the problem to ensure your safety and vehicle reliability. Experience true automotive performance care designed to extend the lifespan of your passion and keep you moving with confidence.
              </p>
            </div>

            <div 
              className={`transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-[var(--color-primary)] transition-all group"
              >
                Learn More About Us
                <ArrowUpRight className="w-5 h-5 group-hover:scale-125 transition-transform" />
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
