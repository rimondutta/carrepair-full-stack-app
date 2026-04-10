'use client';

import Link from 'next/link';
import { Settings, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#110E10] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 blur-3xl rounded-full"></div>
          <Settings 
            className="w-24 h-24 text-[var(--color-primary)] mx-auto animate-spin-slow relative z-10" 
            style={{ animationDuration: '8s' }}
          />
          <span className="absolute -top-4 -right-4 bg-white text-black text-xs font-black px-2 py-1 rounded tracking-tighter uppercase italic">
            Engine Stall
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter italic">
          404
        </h1>
        
        <div className="h-1 w-20 bg-[var(--color-primary)] mx-auto mb-6"></div>
        
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-widest">
          Route Not Found
        </h2>
        
        <p className="text-[#888] text-sm md:text-base mb-10 leading-relaxed">
          It seems like you&apos;ve taken a wrong turn. The page you are looking for has been moved or doesn&apos;t exist in our workshop map.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="group relative px-8 py-4 bg-[var(--color-primary)] text-white font-bold uppercase tracking-widest text-sm overflow-hidden flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10"></div>
            <Home className="w-4 h-4" />
            <span>Return to Garage</span>
          </Link>
          
          <Link 
            href="/services"
            className="px-8 py-4 border border-[#333] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#222] transition-colors"
          >
            View Services
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-[#222]">
          <p className="text-[#555] text-xs uppercase tracking-widest">
            Care Plus Auto Repairing &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
