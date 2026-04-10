'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#110E10] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <AlertCircle className="w-20 h-20 text-[var(--color-primary)] mx-auto" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">
          System Failure
        </h1>
        
        <div className="h-1 w-20 bg-[var(--color-primary)] mx-auto mb-6"></div>
        
        <p className="text-[#888] text-sm md:text-base mb-10 leading-relaxed italic">
          &quot;Something went wrong with the digital diagnostic tools. Our technicians have been notified of the breakdown.&quot;
        </p>

        <div className="bg-[#161616] border border-[#222] p-4 rounded-lg mb-10 overflow-hidden text-left">
          <p className="text-[var(--color-primary)] text-xs font-mono break-all line-clamp-2">
            ID: {error.digest || 'Internal system interrupt'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="group relative px-8 py-4 bg-[var(--color-primary)] text-white font-bold uppercase tracking-widest text-sm overflow-hidden flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10"></div>
            <RefreshCcw className="w-4 h-4" />
            <span>Retry Hook-up</span>
          </button>
          
          <a
            href="/"
            className="px-8 py-4 border border-[#333] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#222] transition-colors"
          >
            Home Page
          </a>
        </div>
      </div>
    </div>
  );
}
