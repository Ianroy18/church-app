import { NavLink } from 'react-router-dom';
import { Search, BookOpen, Calendar, Settings, LogOut, Moon, Sun, Newspaper } from 'lucide-react';
import { useState } from 'react';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: BookOpen },
  { to: '/resources', label: 'Resources', icon: Newspaper },
  { to: '/resources/magazine', label: 'Magazine', icon: Newspaper },
  { to: '/resources/articles', label: 'Articles', icon: Newspaper },
  { to: '/nextsteps/new-here', label: 'Next Steps', icon: Calendar },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed = false, onLogout }) {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleTheme = () => {
    setDarkMode(d => !d);
    if (!darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
  };

  return (
    <aside className={`hidden lg:flex lg:flex-col w-64 ${collapsed ? 'lg:w-20' : 'lg:w-64'} bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-4 fixed inset-y-0 left-4 rounded-2xl shadow-md`} aria-label="Main sidebar">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-lg bg-sky-500 flex items-center justify-center text-white font-black">AG</div>
        {!collapsed && (
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">AGTI</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        {!collapsed && (
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2">
            <Search className="text-slate-400" />
            <input aria-label="Search menu" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} className="bg-transparent outline-none text-sm w-full text-slate-700 dark:text-slate-200" />
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({isActive}) => `flex items-center gap-3 rounded-xl p-3 text-sm transition-colors duration-200 ${isActive ? 'bg-sky-50 dark:bg-sky-800/30 text-sky-600' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            <Icon className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4">
        <button onClick={onLogout} className="w-full flex items-center gap-3 rounded-xl p-3 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10">
          <LogOut />
          <span>Sign Out</span>
        </button>

        <div className="mt-3 flex items-center justify-between px-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Theme</span>
          <button onClick={handleTheme} aria-label="Toggle theme" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </aside>
  );
}
