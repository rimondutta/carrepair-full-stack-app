"use client";

import { useState, useEffect, useMemo } from "react";
import ServiceCard from "./ServiceCard";
import { Service, ServiceCategory } from "../../types/service";

interface ServiceGridProps {
  services: Service[];
  activeCategory: ServiceCategory;
}

export default function ServiceGrid({ services, activeCategory }: ServiceGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const postsPerPage = 9;

  // Filter based on active category
  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return services;
    return services.filter(s => s.category === activeCategory);
  }, [services, activeCategory]);

  useEffect(() => {
    // eslint-disable-next-line
    setCurrentPage(1);
  }, [activeCategory]);

  // Pagination bounds
  const totalItems = filteredServices.length;
  const totalPages = Math.ceil(totalItems / postsPerPage);
  
  const currentServices = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredServices.slice(startIndex, startIndex + postsPerPage);
  }, [currentPage, filteredServices]);

  // Handle page switch with fade effect
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll back near top of grid
      setIsAnimating(false);
    }, 300);
  };

  const startItemCount = totalItems === 0 ? 0 : ((currentPage - 1) * postsPerPage) + 1;
  const endItemCount = Math.min(currentPage * postsPerPage, totalItems);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
      
      {/* Grid wrapper with fade transition */}
      <div 
        className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
      >
        {filteredServices.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
             <span className="text-white heading-font text-2xl font-bold uppercase mb-2">No Services Found</span>
             <p className="text-[var(--color-textMuted)]">Try selecting a different category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[15px] mb-16">
            {currentServices.map((service: any, index: number) => (
              <ServiceCard 
                key={service._id || service.slug || index} 
                service={{
                  ...service,
                  isActive: [0, 2, 3, 5, 6, 8].includes(index)
                }} 
                index={index} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#2e2e2e] pt-10">
          
          <div className="text-[var(--color-textMuted)] text-sm font-medium">
            Showing <span className="text-white">{startItemCount}-{endItemCount}</span> of <span className="text-white">{totalItems}</span> Services
          </div>

          <div className="flex items-center gap-2">
            {/* Prev button */}
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border border-[#2e2e2e] text-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &laquo;
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center font-bold transition-colors ${
                    currentPage === pageNum 
                      ? "bg-[var(--color-primary)] text-white border border-[var(--color-primary)]" 
                      : "bg-[#1B1B1B] text-white border border-[#2e2e2e] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next button */}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-[#2e2e2e] text-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &raquo;
            </button>
          </div>

        </div>
      )}
      
    </section>
  );
}
