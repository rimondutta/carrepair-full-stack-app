"use client";

import { filterTabs } from "../../data/services";
import { ServiceCategory } from "../../types/service";

interface ServiceFilterBarProps {
  activeCategory: ServiceCategory;
  onFilterChange: (category: ServiceCategory) => void;
  resultsCount: number;
}

export default function ServiceFilterBar({ activeCategory, onFilterChange, resultsCount }: ServiceFilterBarProps) {
  
  return (
    <div className="relative z-40 bg-[#1B1B1B] border-b border-[#2e2e2e] shadow-xl">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-3 md:py-0">
          
          {/* Mobile Dropdown (visible only on small screens) */}
          <div className="w-full md:hidden flex justify-between items-center">
            <span className="text-[var(--color-textMuted)] text-sm">Filter Category:</span>
            <select 
              className="bg-[#110E10] text-white border border-[#2e2e2e] px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              value={activeCategory}
              onChange={(e) => onFilterChange(e.target.value as ServiceCategory)}
            >
              {filterTabs.map((tab) => (
                <option key={tab.label} value={tab.value}>
                  {tab.label} ({tab.count})
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Filter Row (hidden on mobile) */}
          <div className="hidden md:flex flex-row overflow-x-auto hide-scrollbar w-full relative">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.value;
              return (
                <button
                  key={tab.label}
                  onClick={() => onFilterChange(tab.value)}
                  className={`whitespace-nowrap py-5 px-6 uppercase text-xs md:text-sm font-bold tracking-wider transition-all relative block ${
                    isActive 
                      ? "text-white bg-[var(--color-primary)]/10" 
                      : "text-[var(--color-textMuted)] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                  {/* Bottom Border Highlight Element */}
                  <span 
                    className={`absolute bottom-0 left-0 h-[3px] bg-[var(--color-primary)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-[#2e2e2e]">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-textMuted)] text-xs uppercase tracking-wider hidden lg:block">Sort by:</span>
              <select className="bg-transparent text-white text-xs md:text-sm font-bold uppercase tracking-wider focus:outline-none cursor-pointer">
                <option value="latest" className="bg-[#110E10] text-white">Latest Added</option>
                <option value="popular" className="bg-[#110E10] text-white">Most Popular</option>
                <option value="az" className="bg-[#110E10] text-white">A-Z Name</option>
              </select>
            </div>
            {/* Results Count */}
            <div className="text-[var(--color-textMuted)] text-xs hidden lg:block border-l border-[#2e2e2e] pl-6 py-2">
              Showing {resultsCount} results
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
