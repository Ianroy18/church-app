import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const TopNav = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 right-0 left-0 lg:left-0 h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-30 shadow-sm"
      style={{
        paddingLeft: 'calc(var(--sidebar-width, 280px) + 1.5rem)',
      }}
    >
      {/* Left - Menu & Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Right - Notifications & Profile */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-slate-100 rounded-lg transition"
        >
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </motion.button>

        <div className="w-px h-6 bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-lg"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
          title="Logout"
        >
          <LogOut size={20} />
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default TopNav;
