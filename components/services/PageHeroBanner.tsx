"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PageHeroBannerProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  tag?: string;
}

const ChevronRightSVG = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default function PageHeroBanner({ title, breadcrumbs, tag }: PageHeroBannerProps) {
  const [offsetY, setOffsetY] = useState(0);

  // Parallax subtle effect
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.4);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[280px] md:h-[320px] bg-[#110E10] overflow-hidden flex items-center border-b-[2px] border-[var(--color-primary)] mt-[80px] lg:mt-[134px]">
      
      {/* Background with parallax */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#110E10] via-[#1B1B1B] to-[#110E10] bg-cover bg-center opacity-80"
        style={{ transform: `translateY(${offsetY}px)` }}
      />
      
      {/* Decorative dark grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#2e2e2e_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none" />

      {/* Abstract gear SVG outline */}
      <div className="absolute right-[-10%] top-[20%] opacity-10 pointer-events-none overflow-hidden scale-150 transform">
        <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </div>

      {/* Content wrapper */}
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        
        {/* Detail Tag */}
        {tag && (
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 border-t-2 border-[var(--color-primary)]"></span>
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] text-sm md:text-xs uppercase">
              {tag}
            </span>
          </div>
        )}

        {/* Page Title */}
        <h1 className="text-white heading-font text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
          {title}
        </h1>

        {/* Breadcrumb row */}
        <nav className="flex items-center flex-wrap gap-2 text-sm font-medium">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <div key={index} className="flex items-center gap-2">
                {crumb.href && !isLast ? (
                  <Link 
                    href={crumb.href} 
                    className="text-[var(--color-textMuted)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest text-xs"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white uppercase tracking-widest text-xs">
                    {crumb.label}
                  </span>
                )}

                {!isLast && <ChevronRightSVG />}
              </div>
            );
          })}
        </nav>
      </div>

    </section>
  );
}
