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
  Menu,
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

const SidebarContent = ({ collapsed, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = MENU_ITEMS[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-black text-sm">
                OBS
              </div>
              <div>
                <h1 className="font-black text-sm">AGTI</h1>
                <p className="text-xs text-slate-400">Bible School</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-lg"
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-bold truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className="flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-bold flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !collapsed && (
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0"
                  />
                )}
                {collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute left-full ml-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                  >
                    {item.label}
                  </motion.div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-all group"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse Toggle (Desktop only) */}
      <div className="hidden lg:flex p-4 border-t border-slate-700 justify-center">
        <button
          onClick={() => {}}
          className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
        >
          <Menu size={18} />
        </button>
      </div>
    </>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
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

      {/* Desktop Sidebar (always visible on lg+) */}
      <motion.aside
        animate={{
          width: collapsed ? '80px' : '280px',
        }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex relative left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl z-40 flex-col overflow-y-auto"
      >
        <SidebarContent collapsed={collapsed} onClose={() => {}} />
      </motion.aside>

      {/* Mobile Sidebar (slides from left on mobile) */}
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
};

export default Sidebar;
