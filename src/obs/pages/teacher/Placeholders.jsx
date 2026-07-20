import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, FileText, BarChart3, Bell, Settings, CheckCircle2, Calendar } from 'lucide-react';
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

const sectionClass = 'grid gap-4 md:grid-cols-2 lg:grid-cols-3';

const TeacherClasses = () => {
  const classes = [
    { id: 'c1', title: 'Foundations of Scripture', students: 32, schedule: 'Tue / Thu • 7PM', progress: '82%' },
    { id: 'c2', title: 'Grace and Discipleship', students: 28, schedule: 'Mon / Wed • 6PM', progress: '75%' },
    { id: 'c3', title: 'Leadership in Ministry', students: 20, schedule: 'Sat • 10AM', progress: '91%' },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="My Classes" subtitle="Manage your teaching classes" />
        <div className={sectionClass}>
          {classes.map((item) => (
            <Card key={item.id} className="p-6 border-slate-200">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm font-black text-slate-900">{item.title}</p>
                  <p className="mt-2 text-xs text-slate-500">{item.schedule}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{item.progress}</div>
              </div>
              <p className="text-sm text-slate-500">Students enrolled: <span className="font-bold text-slate-900">{item.students}</span></p>
              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-emerald-600">
                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1">Live class</span>
                <span className="text-slate-400">Upcoming</span>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const TeacherStudents = () => {
  const students = [
    { id: 's1', name: 'Anna Cruz', progress: 92, status: 'On track' },
    { id: 's2', name: 'Miguel Reyes', progress: 78, status: 'Needs follow-up' },
    { id: 's3', name: 'Grace Lim', progress: 85, status: 'On track' },
    { id: 's4', name: 'Joshua Tan', progress: 64, status: 'At risk' },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Students" subtitle="Track your learners" />
        <div className="space-y-4">
          {students.map((student) => (
            <Card key={student.id} className="flex items-center justify-between p-5 border-slate-200">
              <div>
                <p className="font-black text-slate-900">{student.name}</p>
                <p className="text-xs text-slate-500">Progress: {student.progress}%</p>
              </div>
              <div className={`rounded-full px-3 py-1 text-xs font-bold ${student.status === 'At risk' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {student.status}
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const TeacherAssignments = () => {
  const assignments = [
    { id: 'a1', title: 'Bible Study Guide', due: 'Mar 30', status: 'Open', submitted: 18 },
    { id: 'a2', title: 'Sermon Reflection', due: 'Apr 4', status: 'Reviewing', submitted: 12 },
    { id: 'a3', title: 'Group Discussion', due: 'Apr 10', status: 'Draft', submitted: 0 },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Assignments" subtitle="Monitor upcoming work" />
        <div className="space-y-4">
          {assignments.map((item) => (
            <Card key={item.id} className="p-6 border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-500">Due: {item.due}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Reviewing' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">Submitted by {item.submitted} students</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const TeacherGrades = () => {
  const grades = [
    { id: 'g1', name: 'Anna Cruz', grade: 'A', average: 94 },
    { id: 'g2', name: 'Miguel Reyes', grade: 'B', average: 82 },
    { id: 'g3', name: 'Grace Lim', grade: 'A-', average: 90 },
    { id: 'g4', name: 'Joshua Tan', grade: 'C+', average: 72 },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Grades" subtitle="Review student performance" />
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-700">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">Average</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{row.name}</td>
                  <td className="px-6 py-4">{row.grade}</td>
                  <td className="px-6 py-4">{row.average}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const TeacherAnnouncements = () => {
  const announcements = [
    { id: 'n1', title: 'New course modules published', date: 'Mar 20', pinned: true },
    { id: 'n2', title: 'Live review session added', date: 'Mar 25', pinned: false },
    { id: 'n3', title: 'Attendance update reminder', date: 'Mar 28', pinned: false },
  ];

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Announcements" subtitle="Communicate with your class" />
        <div className="space-y-4">
          {announcements.map((item) => (
            <Card key={item.id} className="p-5 border-slate-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                {item.pinned && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">Pinned</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const TeacherSettings = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Settings" subtitle="Keep your teacher account and portal preferences up to date" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 border-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
            <h3 className="mt-4 text-lg font-black text-slate-900">Teacher Profile</h3>
            <p className="mt-3 text-sm text-slate-600">Update your name, contact information, and profile picture.</p>
            <div className="mt-6 space-y-3">
              {['Edit profile details', 'Change display picture', 'Update contact number'].map((item) => (
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
            <p className="mt-3 text-sm text-slate-600">Manage your password and secure access to your teaching dashboard.</p>
            <div className="mt-6 space-y-3">
              {['Change password', 'Enable two-factor auth', 'Review active sessions'].map((item) => (
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
            <h3 className="mt-4 text-lg font-black text-slate-900">Communication</h3>
            <p className="mt-3 text-sm text-slate-600">Choose how you receive updates about assignments and student activity.</p>
            <div className="mt-6 space-y-3">
              {['Assignment alerts', 'Student message alerts', 'Event reminders'].map((item) => (
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
            This action is not yet available in the teacher portal. We are adding deeper settings and communication controls soon.
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

export { TeacherClasses, TeacherStudents, TeacherAssignments, TeacherGrades, TeacherAnnouncements, TeacherSettings };
