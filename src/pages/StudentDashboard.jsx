import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import {
  BookOpen, Download, Calendar, LogOut, CheckCircle2,
  User, ChevronRight, Activity, FileText, Clock, Award, Zap
} from 'lucide-react';

function StudentDashboard({ user }) {
  const [lessons, setLessons] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons');
  const navigate = useNavigate();

  const navItems = [
    { id: 'lessons', label: 'Course Modules', sub: 'Study Materials', icon: BookOpen, color: '#a78bfa' },
    { id: 'downloads', label: 'Library Files', sub: 'Downloads', icon: Download, color: '#60a5fa' },
    { id: 'schedule', label: 'Event Timeline', sub: 'Schedule', icon: Calendar, color: '#fb923c' },
    { id: 'attendance', label: 'Digipass', sub: 'Attendance Logs', icon: CheckCircle2, color: '#34d399' },
    { id: 'profile', label: 'My Profile', sub: 'Account Info', icon: User, color: '#f472b6' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: lessonsData } = await supabase.from('lessons').select('*').order('created_at', { ascending: false });
        setLessons(lessonsData || []);
        const { data: downloadsData } = await supabase.from('downloads').select('*').order('created_at', { ascending: false });
        setDownloads(downloadsData || []);
        const { data: scheduleData } = await supabase.from('schedule').select('*').order('date', { ascending: true });
        setSchedule(scheduleData || []);
        if (user) {
          const userId = user.id || user.uid;
          const { data: attData } = await supabase.from('attendance').select('*').eq('user_id', userId).order('created_at', { ascending: false });
          setAttendance(attData || []);
        }
      } catch (e) {
        console.error("Supabase fetch error:", e);
        if (user && (user.uid || user.id || '').toString().startsWith('demo-')) {
          setLessons([{ id: 'demo1', title: 'Chapter 1: The Vision', description: 'This is a demo lesson shown when Supabase tables are not yet set up. Explore the platform features.', file_url: '#' }]);
          setSchedule([{ id: 'demo2', title: 'FBS Orientation', description: 'Orientation for new students.', date: '2026-03-22', time: '14:00' }]);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    localStorage.removeItem('demoUser');
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const userId = user?.id || user?.uid || '';
  const username = user?.email?.split('@')[0] || 'Student';

  // Shared styles
  const card = {
    background: 'rgba(255,255,255,0.98)',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    borderRadius: '24px',
  };

  const tabMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatDate = (dateStr) => {
    if (!dateStr) return { day: '--', month: '---' };
    const [y, m, d] = dateStr.split('-');
    return { day: d, month: tabMonths[parseInt(m) - 1] };
  };

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ background: '#f1f5f3' }}>

      {/* === SIDEBAR === */}
      <div
        className="w-[260px] h-[calc(100vh-2rem)] flex flex-col m-4 rounded-[28px] overflow-hidden relative flex-shrink-0"
        style={{
          background: '#0b0f18',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4), 4px 0 24px rgba(0,0,0,0.2)',
        }}
      >
        <div className="h-[1px] w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)' }} />

        {/* Brand */}
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

        {/* Nav */}
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
                <div className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: isActive ? color + '18' : 'rgba(255,255,255,0.05)', color: isActive ? color : 'rgba(255,255,255,0.25)' }}>
                  <Icon size={17} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-black text-[11px] uppercase tracking-[0.1em] leading-none" style={{ color: isActive ? '#f0fdf4' : 'rgba(255,255,255,0.45)' }}>{label}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider mt-1 leading-none" style={{ color: 'rgba(255,255,255,0.2)' }}>{sub}</span>
                </div>
                {isActive && <ChevronRight size={13} style={{ color: 'rgba(34,197,94,0.5)', flexShrink: 0 }} />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[16px] font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300"
            style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', color: 'rgba(239,68,68,0.7)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; e.currentTarget.style.color = 'rgba(239,68,68,0.7)'; }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="flex-1 overflow-y-auto flex flex-col p-4 pl-0 min-w-0">

        {/* Top Header Bar */}
        <div className="flex justify-between items-center mb-5 flex-shrink-0 px-2">
          <div>
            <h1 className="text-xl font-black tracking-tight" style={{ color: '#0f172a' }}>
              Good day, <span style={{ color: '#16a34a' }}>{username}</span> 👋
            </h1>
            <p className="text-xs font-bold mt-0.5" style={{ color: '#94a3b8' }}>Your spiritual learning command center</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: '#16a34a' }}>Active</span>
          </div>
        </div>

        {/* Content Panels */}
        <div className="flex-1 max-w-6xl w-full">

          {/* ── LESSONS ── */}
          {activeTab === 'lessons' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight" style={{ color: '#0f172a' }}>Course Materials</h2>
                <p className="text-xs font-bold mt-0.5" style={{ color: '#94a3b8' }}>Latest published doctrine modules</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {lessons.map(l => (
                  <div key={l.id} className="group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1" style={{
                    ...card,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'}
                  >
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300"
                      style={{ background: 'rgba(167,139,250,0.1)', color: '#7c3aed' }}>
                      <BookOpen size={22} strokeWidth={2} />
                    </div>
                    <h3 className="font-black text-base mb-2 transition-colors" style={{ color: '#0f172a' }}>{l.title}</h3>
                    <p className="text-xs leading-relaxed flex-1 mb-5" style={{ color: '#64748b' }}>{l.description}</p>
                    {l.file_url && (
                      <a href={l.file_url} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-black tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all duration-200"
                        style={{ background: 'rgba(124,58,237,0.08)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.15)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#7c3aed'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.08)'; e.currentTarget.style.color = '#7c3aed'; }}
                      >
                        <FileText size={13} /> Access PDF
                      </a>
                    )}
                  </div>
                ))}
                {lessons.length === 0 && (
                  <div className="col-span-3 text-center py-16" style={{ color: '#94a3b8' }}>
                    <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-bold">No modules published yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── DOWNLOADS ── */}
          {activeTab === 'downloads' && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight" style={{ color: '#0f172a' }}>Library Files</h2>
                <p className="text-xs font-bold mt-0.5" style={{ color: '#94a3b8' }}>Resources available for download</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {downloads.map(d => (
                  <div key={d.id} className="group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1" style={card}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'}
                  >
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(96,165,250,0.1)', color: '#2563eb' }}>
                      <Download size={22} strokeWidth={2} />
                    </div>
                    <h3 className="font-black text-base mb-2" style={{ color: '#0f172a' }}>{d.title}</h3>
                    <p className="text-xs leading-relaxed flex-1 mb-5" style={{ color: '#64748b' }}>{d.description}</p>
                    {d.file_url && (
                      <a href={d.file_url} download
                        className="inline-flex items-center gap-2 text-[11px] font-black tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all duration-200"
                        style={{ background: 'rgba(37,99,235,0.08)', color: '#2563eb', border: '1px solid rgba(37,99,235,0.15)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; e.currentTarget.style.color = '#2563eb'; }}
                      >
                        <Download size={13} /> Download
                      </a>
                    )}
                  </div>
                ))}
                {downloads.length === 0 && (
                  <div className="col-span-3 text-center py-16" style={{ color: '#94a3b8' }}>
                    <Download size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-bold">No files available yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── SCHEDULE ── */}
          {activeTab === 'schedule' && (
            <div className="max-w-3xl">
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight" style={{ color: '#0f172a' }}>Event Timeline</h2>
                <p className="text-xs font-bold mt-0.5" style={{ color: '#94a3b8' }}>Upcoming sessions and events</p>
              </div>
              <div className="space-y-3">
                {schedule.map((s) => {
                  const { day, month } = formatDate(s.date);
                  return (
                    <div key={s.id} className="flex overflow-hidden transition-all duration-300 hover:-translate-x-0.5" style={{ ...card, padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)'}
                    >
                      {/* Date column */}
                      <div className="w-24 flex flex-col items-center justify-center py-6 flex-shrink-0" style={{ background: 'rgba(251,146,60,0.06)', borderRight: '1px solid rgba(251,146,60,0.12)' }}>
                        <span className="text-2xl font-black leading-none" style={{ color: '#ea580c' }}>{day}</span>
                        <span className="text-[9px] font-black tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(251,146,60,0.8)' }}>{month}</span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 px-6 py-5 flex items-center justify-between">
                        <div>
                          <h3 className="font-black text-sm" style={{ color: '#0f172a' }}>{s.title}</h3>
                          <p className="text-xs mt-1" style={{ color: '#64748b' }}>{s.description}</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl flex-shrink-0 ml-4" style={{ background: 'rgba(0,0,0,0.04)' }}>
                          <Clock size={12} style={{ color: '#64748b' }} />
                          <span className="text-[10px] font-black" style={{ color: '#64748b' }}>{s.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {schedule.length === 0 && (
                  <div className="text-center py-16" style={{ color: '#94a3b8' }}>
                    <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-bold">No upcoming events</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── ATTENDANCE / DIGIPASS ── */}
          {activeTab === 'attendance' && (
            <div className="grid lg:grid-cols-5 gap-5">

              {/* QR Card */}
              <div className="lg:col-span-2 flex flex-col rounded-[24px] overflow-hidden" style={{ background: '#0b0f18', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)' }} />
                <div className="flex-1 p-8 text-center flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <Zap size={20} style={{ color: '#22c55e' }} />
                  </div>
                  <h3 className="text-white font-black text-lg mb-1">Digital Pass</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>Scan at terminal</p>

                  <div className="p-5 rounded-3xl mb-6" style={{ background: 'white', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                    <QRCode value={userId || 'no-id'} size={160} />
                  </div>

                  <div className="px-4 py-2.5 rounded-2xl max-w-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <p className="text-[8px] font-black tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Identity Hash</p>
                    <p className="font-mono text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>{userId || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Attendance Log */}
              <div className="lg:col-span-3 flex flex-col" style={{ ...card, overflow: 'hidden', padding: 0 }}>
                <div className="px-7 py-5 flex justify-between items-center flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <h3 className="font-black text-base" style={{ color: '#0f172a' }}>Attendance Log</h3>
                  <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl" style={{ background: 'rgba(34,197,94,0.08)', color: '#16a34a' }}>
                    {attendance.length} Sessions
                  </span>
                </div>

                <div className="overflow-auto flex-1 p-4 space-y-2">
                  {attendance.map(a => (
                    <div key={a.id} className="flex justify-between items-center px-5 py-4 rounded-2xl transition-all duration-200"
                      style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.04)'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.15)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)'; }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.1)' }}>
                          <CheckCircle2 size={18} style={{ color: '#16a34a' }} />
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color: '#0f172a' }}>Session Verified</p>
                          <p className="text-[9px] font-black uppercase tracking-wider mt-0.5" style={{ color: '#94a3b8' }}>QR Entry</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm" style={{ color: '#0f172a' }}>{a.date}</p>
                        <p className="text-[10px] font-bold mt-0.5" style={{ color: '#94a3b8' }}>{a.time}</p>
                      </div>
                    </div>
                  ))}
                  {attendance.length === 0 && (
                    <div className="text-center py-12">
                      <CheckCircle2 size={36} className="mx-auto mb-3 opacity-20" style={{ color: '#64748b' }} />
                      <p className="text-sm font-bold" style={{ color: '#94a3b8' }}>No attendance recorded yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── PROFILE ── */}
          {activeTab === 'profile' && (
            <div className="max-w-xl">
              <div className="mb-6">
                <h2 className="text-lg font-black tracking-tight" style={{ color: '#0f172a' }}>My Profile</h2>
                <p className="text-xs font-bold mt-0.5" style={{ color: '#94a3b8' }}>Your account information</p>
              </div>

              <div style={{ ...card, overflow: 'hidden', padding: 0 }}>
                {/* Profile header */}
                <div className="px-8 py-8 flex items-center gap-6" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
                    <span className="text-white font-black text-xl">{username[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-xl tracking-tight" style={{ color: '#0f172a' }}>{username.toUpperCase()}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#16a34a' }}>FBS Certified Student</p>
                    </div>
                  </div>
                </div>

                {/* Profile fields */}
                <div className="p-6 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Email Registry', value: user?.email, wide: true },
                    { label: 'Account Status', value: '● Active Enrolled', color: '#16a34a' },
                    { label: 'Total Attendance', value: `${attendance.length} Sessions` },
                    { label: 'Student UID', value: userId || '—', mono: true, wide: true },
                  ].map(({ label, value, color, mono, wide }) => (
                    <div key={label} className={`p-5 rounded-2xl ${wide ? 'col-span-2' : ''}`} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5" style={{ color: '#94a3b8' }}>{label}</p>
                      <p className={`font-bold text-sm truncate ${mono ? 'font-mono text-xs' : ''}`} style={{ color: color || '#0f172a' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;