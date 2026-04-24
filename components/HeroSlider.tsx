"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    subtitle: "BEST TIRE & WHEEL EXPERTS",
    title: "Premium Tire Change and Wheel Services",
    description: "We provide comprehensive tire fitting, balancing, and alignment services utilizing advanced workshop equipment to get you back on the road safely.",
    image: "/assets/asset 62.jpeg",
  },
  {
    id: 2,
    subtitle: "PREMIUM TIRE SHOP",
    title: "Professional Tire Service For Premium Performance",
    description: "Our certified tire experts deliver dealership-quality service at honest prices, from routine tire swaps to high-performance wheel mounting.",
    image: "/assets/asset 63.jpeg",
  },
  {
    id: 3,
    subtitle: "CERTIFIED TIRE TECHNICIANS",
    title: "Complete Wheel Checkup & Alignment Services",
    description: "Don't let uneven wear ruin your tires. Schedule a comprehensive laser alignment with our advanced workshop tooling.",
    image: "/assets/asset 64.jpeg",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[var(--color-bgDark)]">

      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
            {/* Dark overlay for images */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            
            <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-center relative z-20">
              <div className="max-w-3xl pt-[140px] lg:pt-[160px]">
                
                {/* Dotted Grid Background */}
                <div className="absolute -top-10 left-0 hidden md:flex flex-col gap-3 opacity-80 pointer-events-none -z-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      {[...Array(7)].map((_, j) => (
                        <div key={j} className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Subtitle */}
                <div 
                  className={`flex items-center gap-4 mb-4 md:mb-6 transition-all duration-700 delay-300 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                >
                  <span className="w-10 md:w-12 border-t-2 border-[var(--color-primary)]"></span>
                  <p className="text-[var(--color-primary)] font-bold tracking-[0.2em] text-[10px] md:text-sm uppercase">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Title */}
                <h1 
                  className={`text-white heading-font text-3xl md:text-5xl lg:text-[70px] font-bold leading-[1.1] mb-4 md:mb-6 transition-all duration-700 delay-500 uppercase ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                >
                  {slide.title}
                </h1>

                {/* Subheading / Description */}
                <p 
                  className={`text-[var(--textLight)] text-base md:text-lg mb-10 max-w-xl transition-all duration-700 delay-600 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div 
                  className={`flex flex-wrap gap-4 md:gap-6 transition-all duration-700 delay-700 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 text-sm md:text-base font-bold uppercase tracking-wider hover:bg-[#111] hover:text-white transition-all group shadow-lg"
                  >
                    Contact Us
                    <ArrowUpRight className="w-5 h-5 group-hover:scale-125 transition-transform" />
                  </Link>

                  <a 
                    href="https://wa.me/447440164792" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white px-8 py-4 text-sm md:text-base font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:border-white transition-all group shadow-lg"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 w-full z-30">
        <div className="container mx-auto px-4 md:px-8 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-300 ${
                index === currentSlide 
                  ? "w-12 bg-[var(--color-primary)]" 
                  : "w-4 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
