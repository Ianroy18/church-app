import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  FileText,
  BarChart3,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';
import { StatCard, Card, SectionTitle } from '../../components/CommonComponents';
import { getAllData } from '../../data/dummyData';

const StudentDashboard = () => {
  const data = useMemo(() => getAllData(), []);

  // Student specific stats
  const stats = {
    enrolledCourses: 8,
    averageGrade: 82,
    completedAssignments: 34,
    pendingAssignments: 5,
    certificatesEarned: 3,
    completionRate: 72,
  };

  // Progress data
  const progressData = [
    { month: 'Week 1', progress: 10 },
    { month: 'Week 2', progress: 18 },
    { month: 'Week 3', progress: 25 },
    { month: 'Week 4', progress: 42 },
    { month: 'Week 5', progress: 58 },
    { month: 'Week 6', progress: 72 },
  ];

  // Course completion
  const courseCompletion = [
    { name: 'Completed', value: 4, fill: '#10B981' },
    { name: 'In Progress', value: 3, fill: '#3B82F6' },
    { name: 'Not Started', value: 1, fill: '#E5E7EB' },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-black mb-2">Welcome back, Student!</h1>
          <p className="text-white/80">Continue your learning journey with AGTI Online Bible School.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={BookOpen}
            label="Enrolled Courses"
            value={stats.enrolledCourses}
            color="#4F46E5"
            trend={{ positive: true, percent: 15 }}
          />
          <StatCard
            icon={BarChart3}
            label="Average Grade"
            value={`${stats.averageGrade}%`}
            color="#10B981"
          />
          <StatCard
            icon={FileText}
            label="Pending Assignments"
            value={stats.pendingAssignments}
            color="#F59E0B"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={CheckCircle}
            label="Completed Assignments"
            value={stats.completedAssignments}
            color="#10B981"
          />
          <StatCard
            icon={Award}
            label="Certificates Earned"
            value={stats.certificatesEarned}
            color="#EC4899"
          />
          <StatCard
            icon={TrendingUp}
            label="Completion Rate"
            value={`${stats.completionRate}%`}
            color="#7C3AED"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Learning Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Learning Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Course Status */}
          <Card className="p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Course Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={courseCompletion} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {courseCompletion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {courseCompletion.map((item) => (
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

        {/* My Courses */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900">My Courses</h3>
            <motion.a
              whileHover={{ x: 4 }}
              href="/obs/student/courses"
              className="text-indigo-600 text-sm font-bold hover:underline"
            >
              View all →
            </motion.a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.courses.slice(0, 4).map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -2 }}
                className="p-4 border border-slate-200 rounded-lg hover:border-indigo-300 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900">{course.title}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                    {course.level}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">By {course.teacher.name}</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 font-bold">{course.lessons} lessons</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Announcements */}
        <Card className="p-6">
          <h3 className="text-lg font-black text-slate-900 mb-4">Latest Announcements</h3>
          <div className="space-y-3">
            {data.announcements.slice(0, 5).map((announcement) => (
              <motion.div
                key={announcement.id}
                whileHover={{ x: 4 }}
                className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-indigo-300 transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{announcement.title}</p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{announcement.content}</p>
                  </div>
                  {announcement.isPinned && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                      Pinned
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
