"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative w-full min-h-[75vh] flex items-center pt-32 pb-24 overflow-hidden bg-white">
      {/* Uploaded Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/blog-hero-bg.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Gradient overlay to ensure white text remains readable if the image is too bright at the top */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 py-2 px-6 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Link href="/" className="text-white/60 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
              <Home className="w-3 h-3" /> HOME
            </Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-[var(--color-primary)]">OUR BLOG</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
            EXPERT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#ff4d4d]">INSIGHTS</span><br />
            & GUIDES
          </h1>

          <p className="max-w-2xl text-[var(--color-textLight)] text-lg opacity-60 leading-relaxed font-medium">
            Stay ahead with the latest automotive technology, maintenance tips, and luxury car care guides from Dubai's master technicians.
          </p>
        </div>
      </div>
    </section>
  );
}
