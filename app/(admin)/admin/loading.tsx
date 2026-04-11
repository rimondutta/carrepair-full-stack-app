import React from 'react';

/**
 * Admin Dashboard Loading State
 * Simple, non-obtrusive loading for internal admin navigation.
 */
export default function AdminLoading() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Modern Bar Spinner */}
        <div className="flex items-center gap-1">
          <div className="h-8 w-1.5 bg-[#E31E24] animate-[bounce_1s_infinite_0ms]" />
          <div className="h-8 w-1.5 bg-[#E31E24] animate-[bounce_1s_infinite_200ms]" />
          <div className="h-8 w-1.5 bg-[#E31E24] animate-[bounce_1s_infinite_400ms]" />
        </div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Loading Dashboard...
        </p>
      </div>
    </div>
  );
}
