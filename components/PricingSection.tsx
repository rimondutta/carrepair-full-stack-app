"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const CustomCheck = () => (
  <div className="relative w-4 h-4 mr-3 flex-shrink-0 mt-1">
    <svg className="absolute w-full h-full text-[var(--color-primary)]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 12l4-4 8 8-4 4-8-8z" opacity="0.8"/>
      <path d="M10 6l4-4 8 8-4 4-8-8z"/>
    </svg>
  </div>
);

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-[var(--color-bgDark)] py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-start">
          
          {/* Left Column */}
          <div className="w-full lg:w-1/3 pt-4">
            <ArrowRight className="w-12 h-12 text-[var(--color-primary)] mb-6 animate-pulse" />
            <span className="text-[var(--color-primary)] font-bold tracking-widest text-sm uppercase mb-4 block">
              OUR PRICING PLAN
            </span>
            <h2 className="text-white heading-font text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
              Car Maintenance Packages
            </h2>
            <p className="text-[var(--color-textMuted)] leading-relaxed mb-10 text-lg">
              Save <span className="text-[var(--color-primary)] font-bold">30%</span> On Yearly Packages
            </p>

            {/* Toggle switch */}
            <div className="bg-[#1B1B1B] border border-neutral-800 p-2 inline-flex rounded-full">
              <button 
                onClick={() => setIsYearly(false)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  !isYearly ? "bg-[var(--color-primary)] text-white shadow-lg" : "text-[var(--color-textMuted)] hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsYearly(true)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  isYearly ? "bg-[var(--color-primary)] text-white shadow-lg" : "text-[var(--color-textMuted)] hover:text-white"
                }`}
              >
                Yearly
              </button>
            </div>

            {/* Decorative illustration */}
            <div className="mt-16 w-full h-64 bg-[url('/assets/asset%2063.jpeg')] bg-cover bg-center rounded-3xl relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-primary)] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>

          {/* Right Column: Pricing Cards */}
          <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-6">
            
            {/* Card 1: Detailing BASIC */}
            <div className="bg-[#1B1B1B] border border-neutral-800 border-t-4 border-t-[var(--color-primary)] flex-1 p-8 md:p-10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center text-center">
              
              <div className="absolute top-6 -right-12 bg-[var(--color-primary)] text-white text-[10px] uppercase font-bold tracking-widest py-1 px-12 rotate-45 shadow-lg">
                Most Popular
              </div>

              <h3 className="heading-font text-2xl font-bold uppercase text-white mb-2">Basic Maintenance</h3>
              <p className="text-[var(--color-textMuted)] uppercase text-sm font-bold tracking-wider mb-8">Service Plan</p>
              
              <div className="flex items-end justify-center gap-1 mb-10 h-[80px]">
                <span className="text-2xl font-bold text-[var(--color-primary)] mb-2">$</span>
                <span className={`heading-font text-6xl font-bold text-white transition-opacity duration-300 ${isYearly ? "animate-pulse" : ""}`}>
                  {isYearly ? "2,400" : "250"}
                </span>
                <span className="text-[var(--color-textMuted)] text-lg mb-2">/car</span>
              </div>

              <div className="w-full h-px bg-white/10 mb-8"></div>

              <ul className="flex flex-col gap-5 text-left w-full mb-12">
                {['Oil & Filter Change', 'Comprehensive Inspection', 'Tire Rotation & Pressure', 'Fluid Level Top-Offs', 'Battery Health Check'].map((feature, i) => (
                  <li key={i} className="flex items-start text-[var(--color-textLight)] font-medium">
                    <CustomCheck />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="mt-auto w-full py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300">
                Get Membership
              </button>
            </div>

            {/* Card 2: Premium Fit */}
            <div className="bg-[#222222] border border-neutral-800 flex-1 p-8 md:p-10 relative group hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center text-center">

              <h3 className="heading-font text-2xl font-bold uppercase text-white mb-2">Premium Maintenance</h3>
              <p className="text-[var(--color-textMuted)] uppercase text-sm font-bold tracking-wider mb-8">Service Plan</p>
              
              <div className="flex items-end justify-center gap-1 mb-10 h-[80px]">
                <span className="text-2xl font-bold text-[var(--color-primary)] mb-2">$</span>
                <span className={`heading-font text-6xl font-bold text-white transition-opacity duration-300 ${isYearly ? "animate-pulse" : ""}`}>
                  {isYearly ? "3,800" : "335.99"}
                </span>
                <span className="text-[var(--color-textMuted)] text-lg mb-2">/car</span>
              </div>

              <div className="w-full h-px bg-white/10 mb-8"></div>

              <ul className="flex flex-col gap-5 text-left w-full mb-12">
                {['Full Synthetic Oil Change', 'Complete AC System Check', 'Tire Rotation & Alignment', 'Brake Inspection & Service', 'Fluid System Flush', 'Engine Diagnostic Scan'].map((feature, i) => (
                  <li key={i} className="flex items-start text-[var(--color-textLight)] font-medium">
                    <CustomCheck />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="mt-auto w-full py-4 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300">
                Get Membership
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
