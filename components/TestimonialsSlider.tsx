"use client";

import { useState, useEffect } from "react";
import { Quote, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Omar Al-Fayed",
    city: "Dubai, UAE",
    quote: "I've visited numerous auto maintenance shops in the Emirates, but Care Plus Auto Repairing exceeds all expectations. Their attention to detail on my luxury sedan was phenomenal. True experts.",
    rating: 5,
    image: "/assets/asset 35.png"
  },
  {
    id: 2,
    name: "Sarah Williams",
    city: "Abu Dhabi, UAE",
    quote: "After a major denting issue, I thought my vehicle was ruined. Their paintless dent repair and color matching technique brought it back to showroom condition. Unbelievable service in the heart of the city!",
    rating: 5,
    image: "/assets/asset 36.png"
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    city: "Sharjah, UAE",
    quote: "The only place I trust for my engine diagnostics. They don't just fix problems; they explain the 'why' and ensure everything is calibrated perfectly. Outstanding professionalism and reliability.",
    rating: 5,
    image: "/assets/asset 37.png"
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="bg-[var(--color-bgDark2)] py-20 md:py-28 overflow-hidden relative border-t border-neutral-900">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 relative z-10">
          <div className="max-w-xl">
             <span className="text-[var(--color-primary)] font-bold tracking-widest text-sm uppercase mb-4 block">
                CLIENTS TESTIMONIALS
             </span>
             <h2 className="text-white heading-font text-4xl md:text-5xl font-bold uppercase leading-tight">
                What Our Clients <br />
                <span className="text-[var(--color-primary)] italic">Say About</span> Care Plus Auto Repairing...
             </h2>
          </div>
          <Link 
            href="#" 
            className="inline-flex items-center justify-center bg-white text-[var(--color-bgDark)] px-8 py-4 font-bold uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-white transition-all group"
          >
            See All Reviews
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Slider Area */}
        <div 
          className="relative max-w-4xl mx-auto flex"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Content (left side) */}
          <div className="flex-1 relative min-h-[450px] md:min-h-[350px]">
            {testimonials.map((test, index) => {
              const isActive = index === current;
              return (
                <div 
                  key={test.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    isActive ? "opacity-100 translate-x-0 z-10" : "opacity-0 -translate-x-10 z-0"
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                    
                    {/* User Photo */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[#222222] flex-shrink-0 p-1">
                      <div className="w-full h-full rounded-full bg-[#110E10] border-4 border-[#1B1B1B] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <Quote className="w-10 h-10 md:w-16 md:h-16 text-[var(--color-primary)] opacity-20 mb-2 md:mb-4" />
                      
                      {/* Stars */}
                      <div className="flex gap-1 mb-4 md:mb-6">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={`${test.id}-star-${i}`} className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      
                      {/* Quote text */}
                      <p className="text-lg md:text-2xl text-[var(--color-textLight)] font-medium leading-relaxed mb-6 md:mb-8 italic">
                        &quot;{test.quote}&quot;
                      </p>

                      {/* Author Info */}
                      <div>
                        <h4 className="heading-font text-white font-bold text-xl uppercase tracking-wider">
                          {test.name}
                        </h4>
                        <p className="text-[var(--color-textMuted)] text-sm tracking-widest uppercase">
                          {test.city}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Vertical Pagination (Right side) */}
          <div className="w-12 flex flex-col items-center justify-center gap-4 ml-8 relative z-20">
            {testimonials.map((test) => (
              <button
                key={`test-indicator-${test.id}`}
                onClick={() => setCurrent(testimonials.findIndex(t => t.id === test.id))}
                className={`w-3 rounded-full transition-all duration-300 ${
                  testimonials[current].id === test.id 
                    ? "h-12 bg-[var(--color-primary)]" 
                    : "h-3 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
