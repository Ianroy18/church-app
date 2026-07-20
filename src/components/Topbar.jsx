import { Menu, Search, Bell, Globe, User, ChevronDown } from 'lucide-react';
import React from 'react';

export default function Topbar({ onHamburger }) {
  return (
    <div className="w-full flex items-center justify-between gap-4 py-3 px-4 lg:px-6 bg-transparent">
      <div className="flex items-center gap-3">
        <button onClick={onHamburger} aria-label="Open sidebar" className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/6 lg:hidden">
          <Menu />
        </button>
        <div className="hidden md:flex items-center bg-white/5 border border-white/6 rounded-2xl px-3 py-2 gap-2 w-full max-w-md">
          <Search className="text-slate-400" />
          <input aria-label="Search" placeholder="Search..." className="bg-transparent outline-none text-sm w-full text-slate-700 dark:text-slate-200" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg bg-white/5 border border-white/6">
          <Bell />
        </button>
        <button className="p-2 rounded-lg bg-white/5 border border-white/6 hidden sm:inline-flex">
          <Globe />
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/6">
          <div className="h-8 w-8 rounded-full bg-slate-300/10 flex items-center justify-center">U</div>
          <span className="text-sm">Admin</span>
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}
