import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';
import { StatCard, Card, SectionTitle } from '../../components/CommonComponents';
import { getAllData } from '../../data/dummyData';

const TeacherDashboard = () => {
  const data = useMemo(() => getAllData(), []);

  // Teacher specific stats
  const stats = {
    myClasses: 5,
    totalStudents: 120,
    assignmentsPending: 24,
    upcomingClasses: 8,
    averageScore: 78,
    coursesTeaching: 3,
  };

  // Sample class data
  const classData = [
    { class: 'Class A', students: 25, avgScore: 82 },
    { class: 'Class B', students: 28, avgScore: 75 },
    { class: 'Class C', students: 22, avgScore: 88 },
    { class: 'Class D', students: 25, avgScore: 79 },
    { class: 'Class E', students: 20, avgScore: 76 },
  ];

  // Assignment submission
  const submissionData = [
    { day: 'Mon', submitted: 45, pending: 15 },
    { day: 'Tue', submitted: 52, pending: 8 },
    { day: 'Wed', submitted: 48, pending: 12 },
    { day: 'Thu', submitted: 58, pending: 2 },
    { day: 'Fri', submitted: 60, pending: 0 },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-black mb-2">Welcome back, Teacher!</h1>
          <p className="text-white/80">Manage your classes and track student progress.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={BookOpen}
            label="My Classes"
            value={stats.myClasses}
            color="#7C3AED"
          />
          <StatCard
            icon={Users}
            label="Total Students"
            value={stats.totalStudents}
            color="#10B981"
          />
          <StatCard
            icon={FileText}
            label="Assignments Pending"
            value={stats.assignmentsPending}
            color="#F59E0B"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon={Clock}
            label="Upcoming Classes"
            value={stats.upcomingClasses}
            color="#3B82F6"
          />
          <StatCard
            icon={TrendingUp}
            label="Average Score"
            value={`${stats.averageScore}%`}
            color="#10B981"
          />
          <StatCard
            icon={BookOpen}
            label="Courses Teaching"
            value={stats.coursesTeaching}
            color="#EC4899"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Class Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Class Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#7C3AED" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Assignment Submissions */}
          <Card className="p-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Assignment Submissions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={submissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="submitted" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
                <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* My Classes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-slate-900">My Classes</h3>
            <motion.a
              whileHover={{ x: 4 }}
              href="/obs/teacher/classes"
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
                <h4 className="font-bold text-slate-900 mb-2">{course.title}</h4>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>👥 {course.students} students</p>
                  <p>📝 {course.lessons} lessons</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
