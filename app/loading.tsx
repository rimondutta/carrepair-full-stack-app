import React from 'react';

/**
 * Global Loading State
 * Highly styled loading skeleton for smooth page transitions.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#110E10]">
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="absolute h-24 w-24 rounded-full border-t-2 border-r-2 border-[#E31E24] opacity-20 animate-spin" />
        
        {/* Middle Pulse Ring */}
        <div className="absolute h-16 w-16 rounded-full bg-[#E31E24] opacity-10 animate-pulse" />
        
        {/* Core Spinner */}
        <div className="h-12 w-12 rounded-full border-4 border-[#333] border-t-[#E31E24] animate-spin" />
      </div>
      
      {/* Loading Text */}
      <p className="mt-8 text-sm font-medium tracking-[0.2em] text-[#888] uppercase animate-pulse">
        Care Plus <span className="text-[#E31E24]">Auto Repairing</span>
      </p>
    </div>
  );
}
