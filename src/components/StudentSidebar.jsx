import { useState, useMemo } from 'react';
import { ChevronRight, LogOut, Activity, BookOpen, Download, Calendar, CheckCircle2, User, Search, Moon, Sun, X } from 'lucide-react';

const navItems = [
  { id: 'lessons', label: 'Course Modules', sub: 'Study Materials', icon: BookOpen, color: '#a78bfa' },
  { id: 'downloads', label: 'Library Files', sub: 'Downloads', icon: Download, color: '#60a5fa' },
  { id: 'schedule', label: 'Event Timeline', sub: 'Schedule', icon: Calendar, color: '#fb923c' },
  { id: 'attendance', label: 'Digipass', sub: 'Attendance Logs', icon: CheckCircle2, color: '#34d399' },
  { id: 'profile', label: 'My Profile', sub: 'Account Info', icon: User, color: '#f472b6' },
];

function StudentSidebar({ activeTab, setActiveTab, onLogout, isOpen = true, onClose }) {
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const filteredNav = useMemo(
    () => navItems.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.sub.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  return (
    <>
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-slate-950/60 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-[280px] h-full flex flex-col m-4 rounded-[32px] overflow-hidden flex-shrink-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:translate-x-0 lg:h-[calc(100vh-2rem)]`}
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.45), 4px 0 24px rgba(0,0,0,0.25)',
          backdropFilter: 'blur(18px)',
        }}
      >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-44 h-44 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-8 right-8 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="px-6 pt-7 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-3xl flex items-center justify-center"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <User size={20} strokeWidth={2.2} className="text-slate-100" />
              </div>
              <div>
                <h1 className="text-sm font-black uppercase tracking-[0.35em] text-white">Student Hub</h1>
                <p className="text-[9px] uppercase tracking-[0.35em] text-emerald-300/70 mt-1">Learning Portal</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/90 text-white transition hover:bg-slate-900"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 pb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search menu"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition duration-200 placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="mx-6 mb-3 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

        <nav className="flex-1 px-3 space-y-2 overflow-y-auto pb-4">
          {filteredNav.length ? filteredNav.map(({ id, label, sub, icon: Icon, color }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className="w-full relative flex items-center gap-3.5 rounded-[20px] px-4 py-3.5 text-left transition-all duration-300"
                style={{
                  background: isActive ? 'rgba(34,197,94,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(34,197,94,0.16)' : '1px solid transparent',
                }}
              >
                {isActive && <span className="absolute left-0 top-1/2 h-5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-400" />}
                <div
                  className="w-10 h-10 rounded-[16px] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isActive ? `${color}20` : 'rgba(255,255,255,0.05)',
                    color: isActive ? color : 'rgba(255,255,255,0.25)',
                  }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.12em] leading-none"
                    style={{ color: isActive ? '#f8fafc' : 'rgba(255,255,255,0.6)' }}>
                    {label}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.15em] mt-1 leading-none text-slate-400">
                    {sub}
                  </p>
                </div>
                {isActive && <ChevronRight size={14} className="text-emerald-300" />}
              </button>
            );
          }) : (
            <div className="px-4 py-3 rounded-2xl bg-white/5 text-[11px] text-slate-400">
              No matching menu items.
            </div>
          )}
        </nav>

        <div className="px-6 pb-6 space-y-3">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 rounded-[18px] border border-red-500/20 bg-red-500/10 py-3.5 text-[10px] font-black uppercase tracking-[0.25em] text-red-300 transition duration-200 hover:bg-red-500/15"
          >
            <LogOut size={14} /> Log Out
          </button>

          <div className="rounded-[18px] border border-white/10 bg-white/5 p-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Theme</p>
              <p className="text-[9px] text-slate-500">{darkMode ? 'Dark' : 'Light'} Mode</p>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode(prev => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-slate-200 transition hover:bg-slate-900/90"
              aria-label="Toggle theme"
            >
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>

          <p className="text-center text-[8px] uppercase tracking-[0.4em] text-slate-500">Student Hub · v1.0</p>
        </div>
      </div>
      </aside>
    </>
  );
}

export default StudentSidebar;
