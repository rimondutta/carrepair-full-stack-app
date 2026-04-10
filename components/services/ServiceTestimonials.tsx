"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
}

export default function ServiceTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative bg-[#1B1B1B] p-8 md:p-12 rounded-xl border border-[#222] overflow-hidden group">
      
      {/* Background Icon */}
      <Quote className="absolute top-6 right-8 w-20 h-20 text-white/5 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < testimonials[current]?.rating ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : "text-[#444]"}`} 
            />
          ))}
        </div>

        <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-8 italic">
          &quot;{testimonials[current]?.review}&quot;
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg">{testimonials[current]?.name}</span>
            <span className="text-[#888] text-sm uppercase tracking-widest">{testimonials[current]?.role}</span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-white hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
