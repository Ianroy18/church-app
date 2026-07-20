import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, BookOpen } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, SectionTitle } from '../../components/CommonComponents';
import { getAllData } from '../../data/dummyData';

const AdminCourses = () => {
  const data = useMemo(() => getAllData(), []);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = data.courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionTitle title="Courses" subtitle="Manage all Bible courses" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            <Plus size={18} />
            Add Course
          </motion.button>
        </div>

        <Card className="p-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition"
            >
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-black text-slate-900 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Teacher:</span>
                    <span className="font-bold text-slate-900">{course.teacher.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Students:</span>
                    <span className="font-bold text-slate-900">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Level:</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminCourses;
