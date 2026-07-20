import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Download, Printer, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, SectionTitle } from '../../components/CommonComponents';
import { getAllData } from '../../data/dummyData';

const AdminTeachers = () => {
  const data = useMemo(() => getAllData(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTeachers = data.teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionTitle title="Teachers" subtitle="Manage all teachers in the system" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            <Plus size={18} />
            Add Teacher
          </motion.button>
        </div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900">Students</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900">Courses</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentTeachers.map((teacher) => (
                  <motion.tr
                    key={teacher.id}
                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-lg" />
                        <span className="font-bold text-slate-900">{teacher.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{teacher.subject}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{teacher.students}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{teacher.courses}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        Active
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminTeachers;
