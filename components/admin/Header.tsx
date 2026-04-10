import { useSession } from 'next-auth/react';
import { Menu, Bell, Search, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  const { data: session } = useSession();

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
        {/* Search & Notifications */}
        <div className="hidden md:flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
          </button>
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
