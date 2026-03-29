import { ChevronRight, LogOut, Activity, BookOpen, Download, Calendar, CheckCircle2, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'lessons', label: 'Course Modules', sub: 'Study Materials', icon: BookOpen, color: '#a78bfa' },
  { id: 'downloads', label: 'Library Files', sub: 'Downloads', icon: Download, color: '#60a5fa' },
  { id: 'schedule', label: 'Event Timeline', sub: 'Schedule', icon: Calendar, color: '#fb923c' },
  { id: 'attendance', label: 'Digipass', sub: 'Attendance Logs', icon: CheckCircle2, color: '#34d399' },
  { id: 'profile', label: 'My Profile', sub: 'Account Info', icon: User, color: '#f472b6' },
];

function StudentSidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <div
      className="w-[260px] h-[calc(100vh-2rem)] flex flex-col m-4 rounded-[28px] overflow-hidden relative flex-shrink-0"
      style={{
        background: '#0b0f18',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.4), 4px 0 24px rgba(0,0,0,0.2)',
      }}
    >
      <div className="h-[1px] w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)' }} />

      <div className="px-6 pt-7 pb-6 flex items-center gap-3.5 flex-shrink-0">
        <img
          src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507"
          alt="Logo"
          className="w-10 h-10 rounded-2xl object-cover flex-shrink-0"
          style={{ border: '2px solid rgba(34,197,94,0.5)', boxShadow: '0 0 12px rgba(34,197,94,0.2)' }}
        />
        <div>
          <h2 className="font-black text-white text-[12px] tracking-wider uppercase leading-none">Grace & Truth</h2>
          <p className="text-[9px] font-black tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(34,197,94,0.6)' }}>Student Portal</p>
        </div>
      </div>

      <div className="mx-6 mb-4 h-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }} />

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {navItems.map(({ id, label, sub, icon: Icon, color }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[18px] transition-all duration-300 relative text-left"
              style={{
                background: isActive ? 'rgba(34,197,94,0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full" style={{ background: '#22c55e' }} />}
              <div
                className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: isActive ? color + '15' : 'rgba(255,255,255,0.05)',
                  color: isActive ? color : 'rgba(255,255,255,0.25)',
                }}
              >
                <Icon size={17} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-black text-[11px] uppercase tracking-[0.1em] leading-none" style={{ color: isActive ? '#f0fdf4' : 'rgba(255,255,255,0.45)' }}>{label}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] mt-1 leading-none" style={{ color: 'rgba(255,255,255,0.2)' }}>{sub}</span>
              </div>
              {isActive && <ChevronRight size={13} style={{ color: 'rgba(34,197,94,0.5)', flexShrink: 0 }} />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 flex-shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[16px] font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
          style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', color: 'rgba(239,68,68,0.7)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; e.currentTarget.style.color = 'rgba(239,68,68,0.7)'; }}
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default StudentSidebar;
