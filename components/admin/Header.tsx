'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Menu, Bell, Search, User as UserIcon, X, Clock, Check, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Notification State
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Poll for notifications
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  // Debounced Search
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    
    const handler = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const markAsRead = async (id?: string) => {
    try {
      await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id ? { id } : { all: true })
      });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg lg:text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-6">
        {/* Search */}
        <div className="relative" ref={searchRef}>
          <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64 md:w-80' : 'w-10'}`}>
            {isSearchOpen ? (
              <div className="w-full flex items-center bg-gray-100 rounded-xl px-3 py-1.5 border border-gray-200 group focus-within:border-[var(--color-primary)]/30 focus-within:bg-white transition-all shadow-sm">
                <Search size={18} className="text-gray-400" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Search bookings, services..."
                  className="bg-transparent border-none focus:ring-0 text-sm w-full px-2 text-gray-900 placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <Search size={22} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearchOpen && (searchQuery || isSearching) && (
            <div className="absolute top-full right-0 mt-2 w-72 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-3 border-b border-gray-50 bg-gray-50/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Search Results</p>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {isSearching ? (
                  <div className="p-8 text-center">
                    <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Searching global records...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((res: any) => (
                    <button
                      key={res.id}
                      onClick={() => {
                        router.push(res.link);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-4 hover:bg-gray-50 flex items-start gap-3 transition-colors group"
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${
                        res.type === 'booking' ? 'bg-blue-50 text-blue-500' :
                        res.type === 'service' ? 'bg-red-50 text-red-500' :
                        'bg-purple-50 text-purple-500'
                      }`}>
                        {res.type === 'booking' ? <Clock size={16} /> : <Search size={16} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">{res.title}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 uppercase tracking-wide">{res.subtitle}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    <Search size={24} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm font-medium italic">No matches found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all relative"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-red-600 border-2 border-white" />
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotifOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} NEW
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => markAsRead()}
                  className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] hover:opacity-70 transition-opacity"
                >
                  Mark all as read
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif: any) => (
                    <div 
                      key={notif._id}
                      className={`p-4 border-b border-gray-50 flex items-start gap-4 transition-colors group ${!notif.isRead ? 'bg-red-50/30' : 'hover:bg-gray-50'}`}
                    >
                      <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!notif.isRead ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-gray-200'}`} />
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={notif.link || '#'}
                          onClick={() => {
                            if (!notif.isRead) markAsRead(notif._id);
                            setIsNotifOpen(false);
                          }}
                        >
                          <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-[var(--color-primary)] transition-colors">{notif.title}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notif.message}</p>
                          <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1 font-medium">
                            <Clock size={10} />
                            {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </Link>
                      </div>
                      {!notif.isRead && (
                        <button 
                          onClick={() => markAsRead(notif._id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-green-600 transition-all"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-gray-400">
                    <Trash2 size={24} className="mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No notifications found.</p>
                  </div>
                )}
              </div>
              
              <Link 
                href="/admin/bookings" 
                onClick={() => setIsNotifOpen(false)}
                className="block p-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[var(--color-primary)] border-t border-gray-50 bg-gray-50/30 transition-all"
              >
                View All Activity
              </Link>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200 hidden md:block" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {session?.user?.name || 'Admin User'}
            </p>
            <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-0.5">
              {(session?.user as { role?: string })?.role || 'Administrator'}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 border border-white shadow-sm rounded-xl flex items-center justify-center text-slate-600 group cursor-pointer hover:shadow-md transition-all">
            <UserIcon size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
