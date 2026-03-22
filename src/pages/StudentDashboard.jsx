import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { FiBook, FiDownload, FiCalendar, FiLogOut, FiCheckCircle, FiUser } from 'react-icons/fi';

const FIGMA_CARD = "bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300";
const FIGMA_BTN_SECONDARY = "bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-sm text-sm";

function StudentDashboard({ user }) {
  const [lessons, setLessons] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons');
  const navigate = useNavigate();

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
          const { data: attData } = await supabase
            .from('attendance')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
          setAttendance(attData || []);
        }
      } catch (e) {
        console.error("Supabase fetch error:", e);
        // Demo fallback
        if (user && (user.uid || user.id || '').toString().startsWith('demo-')) {
          setLessons([{ id: 'demo1', title: 'Chapter 1: The Vision', description: 'This is a demo lesson shown when Supabase tables are not yet set up.', file_url: '#' }]);
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

  const navItemClass = (tabName) => `
    flex items-center gap-4 w-full text-left px-5 py-3.5 mx-2 rounded-xl transition-all duration-300 font-semibold tracking-wide text-[13px] uppercase outline-none
    ${activeTab === tabName
      ? 'bg-white/10 text-[#FDD835]'
      : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }
  `;

  const userId = user?.id || user?.uid || '';

  return (
    <div className="flex h-screen bg-[#F4F7F6] font-['Caveat',_cursive] text-lg selection:bg-[#4CAF50] selection:text-white">
      {/* Premium Sidebar */}
      <div className="w-[300px] bg-[#111827] flex flex-col z-20 m-4 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="p-8 pb-6 flex items-center gap-4 bg-gradient-to-br from-gray-900 to-black">
          <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507" alt="Logo" className="w-12 h-12 rounded-xl shadow-lg border-2 border-[#4CAF50] object-cover" />
          <div>
            <h2 className="font-extrabold text-white tracking-widest text-[11px] uppercase">Grace & Truth</h2>
            <p className="text-[11px] text-[#4CAF50] font-bold mt-0.5 tracking-wider">Student Portal</p>
          </div>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto px-2">
          <button onClick={() => setActiveTab('lessons')} className={navItemClass('lessons')}>
            <FiBook size={18} /> Course Modules
          </button>
          <button onClick={() => setActiveTab('downloads')} className={navItemClass('downloads')}>
            <FiDownload size={18} /> Library Files
          </button>
          <button onClick={() => setActiveTab('schedule')} className={navItemClass('schedule')}>
            <FiCalendar size={18} /> Event Timeline
          </button>
          <button onClick={() => setActiveTab('attendance')} className={navItemClass('attendance')}>
            <FiCheckCircle size={18} /> Digipass & Logs
          </button>
          <button onClick={() => setActiveTab('profile')} className={navItemClass('profile')}>
            <FiUser size={18} /> Official Profile
          </button>
        </nav>

        <div className="p-6">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-red-400 hover:text-red-300 font-bold text-sm uppercase tracking-wider border border-red-900/30">
            <FiLogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col p-4 pl-0">
        <div className="bg-white rounded-3xl px-10 py-6 flex justify-between items-center shadow-sm mb-6 border border-gray-100 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Welcome, <span className="text-[#4CAF50]">{user?.email?.split('@')[0]}</span></h1>
            <p className="text-sm text-gray-500 font-medium mt-0.5">Your spiritual learning command center.</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#4CAF50] animate-pulse"></span>
            <span className="text-[#388E3C] text-xs font-bold tracking-widest uppercase">Verified ID</span>
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto relative flex-1">
          <div className="animate-fade-in-up h-full">

            {activeTab === 'lessons' && (
              <div>
                <div className="mb-8 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Current Materials</h2>
                    <p className="text-sm text-gray-500 mt-1">Review the latest published doctrine modules.</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {lessons.map(l => (
                    <div key={l.id} className={`${FIGMA_CARD} group p-6 flex flex-col`}>
                      <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-[#4CAF50] group-hover:scale-110 group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
                        <FiBook size={24} />
                      </div>
                      <h3 className="font-extrabold text-xl text-gray-900 mb-3 group-hover:text-[#4CAF50] transition-colors">{l.title}</h3>
                      <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-1">{l.description}</p>
                      {l.file_url && (
                        <a href={l.file_url} target="_blank" rel="noreferrer" className={FIGMA_BTN_SECONDARY}>
                          Access PDF &rarr;
                        </a>
                      )}
                    </div>
                  ))}
                  {lessons.length === 0 && (
                    <div className="col-span-full p-16 text-center bg-transparent border-2 border-dashed border-gray-200 rounded-3xl">
                      <FiBook className="mx-auto text-4xl mb-4 text-gray-300" />
                      <p className="font-bold text-gray-400">No lessons deployed yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 border-l-4 border-blue-500 pl-4">Digital Library</h2>
                  <p className="text-sm text-gray-500 mt-2 ml-5">Globally accessible forms and documents.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {downloads.map(d => (
                    <div key={d.id} className={`${FIGMA_CARD} p-6 flex flex-col items-center text-center group`}>
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                        <FiDownload size={28} />
                      </div>
                      <h3 className="font-extrabold text-gray-800 text-lg mb-6">{d.title}</h3>
                      <a href={d.file_url} download className="text-sm font-bold bg-blue-50 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all w-full">
                        Download Now
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="max-w-4xl mx-auto">
                <div className="mb-10 text-center">
                  <h2 className="text-2xl font-extrabold text-gray-900">Event Timeline</h2>
                  <p className="text-sm text-gray-500 mt-2">Your authorized schedule flow.</p>
                </div>

                <div className="space-y-6">
                  {schedule.map((s) => (
                    <div key={s.id} className={`${FIGMA_CARD} p-0 flex overflow-hidden group border-l-8 border-l-purple-500`}>
                      <div className="bg-purple-50 px-8 py-6 flex flex-col justify-center items-center w-40 flex-shrink-0 border-r border-gray-100">
                        <span className="font-extrabold text-gray-800 text-lg">{s.date.split('-')[2]}</span>
                        <span className="text-xs font-bold text-purple-600 tracking-widest uppercase">{s.date.substring(0, 7)}</span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-extrabold text-gray-900 text-xl">{s.title}</h3>
                          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md font-bold tracking-widest">{s.time}</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <div className={`${FIGMA_CARD} p-10 bg-gradient-to-br from-[#111827] to-black border-none relative overflow-hidden text-center`}>
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#4CAF50]/10 rounded-full blur-2xl"></div>

                    <h3 className="font-extrabold text-2xl text-white mb-2 relative z-10 tracking-tight">Digital Pass</h3>
                    <p className="text-gray-400 text-xs mb-8 relative z-10">Scan this code at the terminal.</p>

                    <div className="inline-block p-6 bg-white rounded-3xl shadow-2xl relative z-10 border-4 border-white">
                      <QRCode value={userId} size={200} />
                    </div>

                    <div className="mt-8 relative z-10">
                      <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">Assigned Identity Hash</p>
                      <div className="bg-white/10 text-white font-mono text-sm py-2 px-4 rounded-lg inline-block">{userId}</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className={`${FIGMA_CARD} h-full flex flex-col p-0`}>
                    <div className="p-8 pb-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-extrabold text-xl text-gray-900">Attendance Log</h3>
                      <span className="text-xs font-bold bg-[#4CAF50]/10 text-[#388E3C] px-3 py-1 rounded-md">{attendance.length} Total</span>
                    </div>

                    <div className="overflow-auto flex-1 p-4">
                      <ul className="space-y-2">
                        {attendance.map(a => (
                          <li key={a.id} className="flex justify-between items-center p-4 bg-gray-50 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="bg-green-100 text-[#4CAF50] p-2 rounded-xl"><FiCheckCircle size={20} /></div>
                              <div>
                                <p className="font-bold text-gray-800 text-sm">Session Recorded</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">QR Entry</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{a.date}</p>
                              <p className="text-xs text-gray-500 font-bold tracking-wider">{a.time}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="max-w-2xl mx-auto">
                <div className={`${FIGMA_CARD} p-12 text-center relative overflow-hidden transition-all hover:scale-[1.01]`}>
                  <div className="absolute top-0 left-0 w-full h-24 bg-[#4CAF50]/10"></div>
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-white rounded-3xl border-4 border-white shadow-xl mx-auto mb-6 flex items-center justify-center text-[#4CAF50]">
                      <FiUser size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-1">{user?.email?.split('@')[0].toUpperCase()}</h2>
                    <p className="text-gray-500 font-bold tracking-widest text-xs uppercase mb-8">FBS Certified Student</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Registry</span>
                        <span className="block font-bold text-gray-800 text-sm truncate">{user?.email}</span>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Account Status</span>
                        <span className="block font-bold text-green-600 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Active Enrolled
                        </span>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Student UID</span>
                        <span className="block font-mono text-[10px] text-gray-400 truncate">{user?.id || user?.uid}</span>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Attendance</span>
                        <span className="block font-bold text-gray-800 text-sm">{attendance.length} Sessions Recorded</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default StudentDashboard;
