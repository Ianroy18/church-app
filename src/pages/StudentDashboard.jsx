import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
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
    window.location.href = '/';
  };

  const username = user?.email?.split('@')[0] || 'Student';

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ background: '#f1f5f3' }}>
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <div className="flex-1 overflow-y-auto flex flex-col p-4 min-w-0">
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

        <div className="flex-1 max-w-6xl w-full">
          {activeTab === 'lessons' && <LessonsPage lessons={lessons} />}
          {activeTab === 'downloads' && <DownloadsPage downloads={downloads} />}
          {activeTab === 'schedule' && <SchedulePage schedule={schedule} />}
          {activeTab === 'attendance' && <AttendancePage attendance={attendance} />}
          {activeTab === 'profile' && <ProfilePage user={user} />}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;