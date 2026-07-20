import { useState } from 'react';
import { Search, Bell, Globe, User, ChevronDown, Menu } from 'lucide-react';

export default function TopNav() {
  const [query, setQuery] = useState('');

  return (
    <header className="w-full py-3 px-2 lg:px-6 bg-transparent flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button className="inline-flex items-center justify-center lg:hidden p-2 rounded-lg bg-white/5 border border-white/6 text-slate-200">
          <Menu size={18} />
        </button>
        <div className="hidden md:flex items-center bg-white/5 border border-white/6 rounded-2xl px-3 py-2 gap-2 w-full max-w-md">
          <Search className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-slate-200 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative inline-flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/6 text-slate-200">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-white text-[10px]">3</span>
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/6 text-slate-200">
            <Globe size={16} />
            <span className="text-sm">EN</span>
            <ChevronDown size={14} />
          </button>

          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/6 text-slate-200">
            <div className="h-8 w-8 rounded-full bg-slate-300/10 flex items-center justify-center text-slate-100">U</div>
            <span className="text-sm font-medium">Admin</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
