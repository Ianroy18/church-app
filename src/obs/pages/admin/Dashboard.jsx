import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';
import { StatCard, Card, SectionTitle } from '../../components/CommonComponents';
import { getAllData } from '../../data/dummyData';

const AdminDashboard = () => {
  const data = useMemo(() => getAllData(), []);

  // Calculate statistics
  const stats = {
    totalStudents: data.students.length,
    totalTeachers: data.teachers.length,
    totalCourses: data.courses.length,
    totalClasses: Math.floor(data.courses.length * 2.5),
    todayAttendance: Math.floor(data.students.length * 0.85),
    upcomingClasses: 12,
    pendingAssignments: 45,
    newEnrollments: 23,
  };

  // Chart data - Attendance by day
  const attendanceData = [
    { day: 'Mon', present: 85, absent: 15 },
    { day: 'Tue', present: 88, absent: 12 },
    { day: 'Wed', present: 82, absent: 18 },
    { day: 'Thu', present: 90, absent: 10 },
    { day: 'Fri', present: 78, absent: 22 },
  ];

  // Course distribution
  const courseDistribution = [
    { name: 'Active', value: 20, fill: '#10B981' },
    { name: 'Pending', value: 7, fill: '#F59E0B' },
    { name: 'Completed', value: 3, fill: '#3B82F6' },
  ];

  // Student progress
  const studentProgress = [
    { month: 'Jan', enrolled: 45, completed: 12 },
    { month: 'Feb', enrolled: 52, completed: 18 },
    { month: 'Mar', enrolled: 48, completed: 15 },
    { month: 'Apr', enrolled: 61, completed: 25 },
    { month: 'May', enrolled: 55, completed: 20 },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-black mb-2">Welcome back, Administrator!</h1>
          <p className="text-white/80">Here's what's happening at AGTI Online Bible School today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Students"
            value={stats.totalStudents}
            color="#4F46E5"
            trend={{ positive: true, percent: 12 }}
          />
          <StatCard
            icon={Users}
            label="Total Teachers"
            value={stats.totalTeachers}
            color="#7C3AED"
            trend={{ positive: true, percent: 8 }}
          />
          <StatCard
            icon={BookOpen}
            label="Total Courses"
            value={stats.totalCourses}
            color="#10B981"
            trend={{ positive: true, percent: 5 }}
          />
          <StatCard
            icon={Award}
            label="Classes"
            value={stats.totalClasses}
            color="#F59E0B"
            trend={{ positive: false, percent: 2 }}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={CheckCircle}
            label="Today's Attendance"
            value={`${stats.todayAttendance}/${stats.totalStudents}`}
            color="#10B981"
          />
          <StatCard
            icon={Calendar}
            label="Upcoming Classes"
            value={stats.upcomingClasses}
            color="#3B82F6"
          />
          <StatCard
            icon={Clock}
            label="Pending Assignments"
            value={stats.pendingAssignments}
            color="#F59E0B"
          />
          <StatCard
            icon={TrendingUp}
            label="New Enrollments"
            value={stats.newEnrollments}
            color="#EC4899"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="absent" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Course Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Course Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {courseDistribution.map((item) => (
                <div key={item.name} className="text-center">
                  <p className="text-2xl font-black" style={{ color: item.fill }}>
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-600 font-bold">{item.name}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Student Progress */}
        <Card className="p-6">
          <h3 className="text-lg font-black text-slate-900 mb-4">Student Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studentProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="enrolled" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 5 }} />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Announcements */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900">Recent Announcements</h3>
              <motion.a
                whileHover={{ x: 4 }}
                href="/obs/admin/announcements"
                className="text-indigo-600 text-sm font-bold hover:underline"
              >
                View all →
              </motion.a>
            </div>
            <div className="space-y-3">
              {data.announcements.slice(0, 5).map((announcement) => (
                <div key={announcement.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-indigo-300 transition">
                  <p className="text-sm font-bold text-slate-900">{announcement.title}</p>
                  <p className="text-xs text-slate-600 mt-1 truncate">{announcement.content}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Latest Students */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-900">Latest Students</h3>
              <motion.a
                whileHover={{ x: 4 }}
                href="/obs/admin/students"
                className="text-indigo-600 text-sm font-bold hover:underline"
              >
                View all →
              </motion.a>
            </div>
            <div className="space-y-3">
              {data.students.slice(0, 5).map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-2">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{student.name}</p>
                    <p className="text-xs text-slate-600">{student.email}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Active</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
