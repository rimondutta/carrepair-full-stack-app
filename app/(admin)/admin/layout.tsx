'use client';
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  const pageTitle = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || '';
    const parentSegment = segments[segments.length - 2] || '';

    if (lastSegment === 'dashboard') return 'Overview';
    if (lastSegment === 'new') return `Add New ${parentSegment.slice(0, -1).charAt(0).toUpperCase() + parentSegment.slice(1, -1)}`;
    if (lastSegment === 'edit') return `Edit ${parentSegment.slice(0, -1).charAt(0).toUpperCase() + parentSegment.slice(1, -1)}`;
    
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }, [pathname]);

  if (isLoginPage) {
    return (
      <SessionProvider>
        <div className="min-h-screen">
          {children}
        </div>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="transition-all duration-300 lg:ml-64 flex flex-col min-h-screen">
          <Header title={pageTitle} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
