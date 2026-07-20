import { useState, useEffect } from 'react';
import { BookOpen, Download, Calendar, CheckCircle2 } from 'lucide-react';
import { supabase } from '../supabase';
import Layout from '../components/Layout';
import StudentSidebar from '../components/StudentSidebar';
import LessonsPage from './student/LessonsPage';
import DownloadsPage from './student/DownloadsPage';
import SchedulePage from './student/SchedulePage';
import AttendancePage from './student/AttendancePage';
import ProfilePage from './student/ProfilePage';

function StudentDashboard({ user }) {
  const [lessons, setLessons] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons');

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
        console.error('Supabase fetch error:', e);
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
    window.location.href = '/login';
  };

  const username = user?.email?.split('@')[0] || 'Student';

  return (
    <Layout onLogout={handleLogout} renderSidebar={({ isOpen, open, close, collapsed }) => (
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} isOpen={isOpen} onClose={close} />
    )}>
      <div className="flex-1 overflow-y-auto flex flex-col p-4 min-w-0">
        <div className="flex flex-col gap-4 mb-6 px-2">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: '#0f172a' }}>
                Good day, <span style={{ color: '#16a34a' }}>{username}</span> 👋
              </h1>
              <p className="text-sm font-semibold mt-2" style={{ color: '#475569' }}>Your spiritual learning command center</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-3xl" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.18)' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: '#16a34a' }}>Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Modules', value: lessons.length, icon: BookOpen, color: '#a78bfa' },
              { label: 'Downloads', value: downloads.length, icon: Download, color: '#60a5fa' },
              { label: 'Schedule', value: schedule.length, icon: Calendar, color: '#fb923c' },
              { label: 'Attendance', value: attendance.length, icon: CheckCircle2, color: '#34d399' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-3xl p-5 bg-white shadow-sm border border-slate-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-slate-500">{label}</p>
                    <p className="text-3xl font-black mt-3" style={{ color: '#0f172a' }}>{value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-3xl flex items-center justify-center" style={{ background: `${color}22`, color }}>
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 max-w-6xl w-full space-y-6">
          {activeTab === 'lessons' && <LessonsPage lessons={lessons} />}
          {activeTab === 'downloads' && <DownloadsPage downloads={downloads} />}
          {activeTab === 'schedule' && <SchedulePage schedule={schedule} />}
          {activeTab === 'attendance' && <AttendancePage attendance={attendance} />}
          {activeTab === 'profile' && <ProfilePage user={user} />}
        </div>
      </div>
    </Layout>
  );
}

export default StudentDashboard;