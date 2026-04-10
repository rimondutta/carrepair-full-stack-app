'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { X, LayoutDashboard, Calendar, FileText, Settings, LogOut, Zap, ChevronRight } from 'lucide-react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Bookings',
    href: '/admin/bookings',
    icon: <Calendar size={20} />,
  },
  {
    label: 'Posts',
    href: '/admin/posts',
    icon: <FileText size={20} />,
  },
  {
    label: 'Services',
    href: '/admin/services',
    icon: <Settings size={20} />,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// [x] Create Context or State for Sidebar Toggle in `AdminLayout` <!-- id: 0 -->
// [/] Refactor `Sidebar.tsx` for responsiveness and modern dark theme <!-- id: 1 -->

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`
      fixed inset-y-0 left-0 bg-[#0F172A] text-slate-300 w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Header / Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:scale-105 transition-transform">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">Care Plus</h1>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-1">Admin Dashboard</p>
          </div>
        </Link>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center justify-between group px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${isActive 
                  ? 'bg-red-600/10 text-red-500' 
                  : 'hover:bg-slate-800/50 hover:text-white'}
              `}
            >
              <div className="flex items-center gap-3.5">
                <span className={`transition-colors ${isActive ? 'text-red-500' : 'group-hover:text-red-500'}`}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              {isActive && <ChevronRight size={14} className="text-red-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile / Logout */}
      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300 group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          Logout Session
        </button>
      </div>
    </aside>
  );
}
