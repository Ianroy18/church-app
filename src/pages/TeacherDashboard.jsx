import React from 'react';
import StudentSidebar from '../components/StudentSidebar';
import TopNav from '../components/TopNav';
import Layout from '../components/Layout';
import { supabase } from '../supabase';
import { BookOpen, Users, Calendar } from 'lucide-react';

export default function TeacherDashboard({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('demoUser');
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const stats = [
    { label: 'Students', value: 120, icon: Users, color: '#60a5fa' },
    { label: 'Courses', value: 8, icon: BookOpen, color: '#a78bfa' },
    { label: 'Events', value: 4, icon: Calendar, color: '#fb923c' },
  ];

  return (
    <Layout onLogout={handleLogout} renderSidebar={({ isOpen, open, close, collapsed }) => (
      <StudentSidebar activeTab="lessons" setActiveTab={() => {}} onLogout={handleLogout} isOpen={isOpen} onClose={close} />
    )}>
      <div className="flex-1 overflow-y-auto flex flex-col p-4 min-w-0" style={{ background: '#f1f5f3' }}>
        <TopNav />
        <div className="mb-6">
          <h1 className="text-2xl font-black">Teacher Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl p-5 bg-white shadow-sm border border-slate-200">
              <p className="text-xs uppercase tracking-widest font-black text-slate-500">{s.label}</p>
              <p className="text-3xl font-black mt-3" style={{ color: '#0f172a' }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="rounded-2xl p-5 bg-white shadow-sm border border-slate-200">Placeholder for charts and calendar</div>
        </div>
      </div>
    </Layout>
  );
}
