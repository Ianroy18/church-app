
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const MENU_ITEMS = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/obs/admin/dashboard' },
    { icon: Users, label: 'Students', path: '/obs/admin/students' },
    { icon: Users, label: 'Teachers', path: '/obs/admin/teachers' },
    { icon: BookOpen, label: 'Courses', path: '/obs/admin/courses' },
    { icon: FileText, label: 'Assignments', path: '/obs/admin/assignments' },
    { icon: BarChart3, label: 'Analytics', path: '/obs/admin/analytics' },
    { icon: Bell, label: 'Announcements', path: '/obs/admin/announcements' },
    { icon: Settings, label: 'Settings', path: '/obs/admin/settings' },
  ],
  teacher: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/obs/teacher/dashboard' },
    { icon: BookOpen, label: 'My Classes', path: '/obs/teacher/classes' },
    { icon: Users, label: 'Students', path: '/obs/teacher/students' },
    { icon: FileText, label: 'Assignments', path: '/obs/teacher/assignments' },
    { icon: BarChart3, label: 'Grades', path: '/obs/teacher/grades' },
    { icon: Bell, label: 'Announcements', path: '/obs/teacher/announcements' },
    { icon: Settings, label: 'Settings', path: '/obs/teacher/settings' },
  ],
  student: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/obs/student/dashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/obs/student/courses' },
    { icon: FileText, label: 'Assignments', path: '/obs/student/assignments' },
    { icon: Calendar, label: 'Schedule', path: '/obs/student/schedule' },
    { icon: BarChart3, label: 'Grades', path: '/obs/student/grades' },
    { icon: Bell, label: 'Announcements', path: '/obs/student/announcements' },
    { icon: Settings, label: 'Settings', path: '/obs/student/settings' },
  ],
};

function SidebarContent({ collapsed, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = MENU_ITEMS[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img
              src="/lccagti.png"
              alt="AGTI Logo"
              className="w-10 h-10 rounded-lg object-cover border border-slate-700"
            />
            <div>
              <h1 className="font-black text-sm">AGTI</h1>
              <p className="text-xs text-slate-400">
                Ambassadors of Grace Training Institute
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className="shrink-0" />

                  {!collapsed && (
                    <>
                      <span className="text-sm font-bold flex-1">
                        {item.label}
                      </span>

                      {isActive && <ChevronRight size={16} />}
                    </>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all"
        >
          <LogOut size={20} />

          {!collapsed && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const [collapsed] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex h-screen sticky top-0 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl z-40 flex-col overflow-y-auto"
      >
        <SidebarContent collapsed={collapsed} onClose={() => {}} />
      </motion.aside>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl z-40 flex flex-col overflow-y-auto"
          >
            <SidebarContent collapsed={false} onClose={onClose} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}