import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Calendar, BarChart3, Bell, Settings, CheckCircle2, Trophy } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, SectionTitle } from '../../components/CommonComponents';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

const StudentCourses = () => {
  const courses = [
    { id: 'c1', title: 'Biblical Foundations', progress: 78, instructor: 'Pastor Mark' },
    { id: 'c2', title: 'Grace in Ministry', progress: 64, instructor: 'Pr. Grace' },
    { id: 'c3', title: 'Christian Leadership', progress: 91, instructor: 'Sis. Anna' },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="My Courses" subtitle="View your enrolled courses" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="p-6 border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-black text-slate-900">{course.title}</p>
                  <p className="text-xs text-slate-500">{course.instructor}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{course.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-indigo-600" style={{ width: `${course.progress}%` }} />
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const StudentAssignments = () => {
  const tasks = [
    { id: 'a1', title: 'Weekly Reflection', due: 'Apr 1', status: 'Submitted' },
    { id: 'a2', title: 'Memory Verse Quiz', due: 'Apr 3', status: 'Pending' },
    { id: 'a3', title: 'Discussion Response', due: 'Apr 7', status: 'In progress' },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Assignments" subtitle="View and submit assignments" />
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-5 border-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-slate-900">{task.title}</p>
                  <p className="text-xs text-slate-500">Due {task.due}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${task.status === 'Submitted' ? 'bg-emerald-100 text-emerald-700' : task.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {task.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const StudentSchedule = () => {
  const schedule = [
    { id: 's1', title: 'Orientation Session', date: 'Apr 2', time: '4:00 PM' },
    { id: 's2', title: 'Live Group Study', date: 'Apr 5', time: '7:30 PM' },
    { id: 's3', title: 'Prayer Meeting', date: 'Apr 8', time: '6:30 PM' },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Schedule" subtitle="View your class schedule" />
        <div className="space-y-3">
          {schedule.map((item) => (
            <Card key={item.id} className="flex items-center justify-between p-5 border-slate-200">
              <div>
                <p className="font-black text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm text-slate-500">{item.date}</p>
              </div>
              <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">{item.time}</div>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const StudentGrades = () => {
  const grades = [
    { id: 'g1', course: 'Biblical Foundations', grade: 'A-', percent: 89 },
    { id: 'g2', course: 'Grace in Ministry', grade: 'B+', percent: 85 },
    { id: 'g3', course: 'Christian Leadership', grade: 'A', percent: 94 },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Grades" subtitle="View your grades" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {grades.map((item) => (
            <Card key={item.id} className="p-6 border-slate-200">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.course}</p>
              <p className="mt-4 text-3xl font-black text-slate-900">{item.grade}</p>
              <p className="mt-2 text-sm text-slate-500">{item.percent}% score</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const StudentAnnouncements = () => {
  const announcements = [
    { id: 'n1', title: 'New worship section added', summary: 'A new module on worship is now available.', date: 'Mar 24' },
    { id: 'n2', title: 'Campus prayer time', summary: 'Join the weekly prayer meeting on Friday.', date: 'Mar 28' },
    { id: 'n3', title: 'Course feedback', summary: 'Please submit your feedback after each lesson.', date: 'Mar 29' },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Announcements" subtitle="View course announcements" />
        <div className="space-y-4">
          {announcements.map((item) => (
            <Card key={item.id} className="p-5 border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{item.summary}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const StudentSettings = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Settings" subtitle="Configure your preferences and student account details" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 border-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
            <h3 className="mt-4 text-lg font-black text-slate-900">Student Profile</h3>
            <p className="mt-3 text-sm text-slate-600">Update your name, contact information, and learning preferences.</p>
            <div className="mt-6 space-y-3">
              {['Edit profile info', 'Change avatar', 'Update contact details'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveModal(item)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-6 border-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Security</p>
            <h3 className="mt-4 text-lg font-black text-slate-900">Account Security</h3>
            <p className="mt-3 text-sm text-slate-600">Manage your password and access controls for your student dashboard.</p>
            <div className="mt-6 space-y-3">
              {['Change password', 'Review login activity', 'Secure your account'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveModal(item)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </Card>
          <Card className="p-6 border-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Notifications</p>
            <h3 className="mt-4 text-lg font-black text-slate-900">Alerts</h3>
            <p className="mt-3 text-sm text-slate-600">Select how you want to receive course updates and reminders.</p>
            <div className="mt-6 space-y-3">
              {['Course updates', 'Assignment reminders', 'Weekly digest'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveModal(item)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>

      <Dialog open={Boolean(activeModal)} onOpenChange={(open) => { if (!open) setActiveModal(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{activeModal}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-slate-600">
            This action is not yet available in the student portal. We are adding deeper profile, security, and alert settings soon.
          </DialogDescription>
          <DialogFooter>
            <DialogClose className="rounded-3xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Got it
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export { StudentCourses, StudentAssignments, StudentSchedule, StudentGrades, StudentAnnouncements, StudentSettings };
