import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ icon: Icon, label, value, color = '#4F46E5', trend }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-black text-slate-900">{value}</p>
          {trend && (
            <p className={`text-xs font-bold mt-2 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '↑' : '↓'} {trend.percent}%
            </p>
          )}
        </div>
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: color }}
        >
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};

export const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={`bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h2 className="text-2xl font-black text-slate-900">{title}</h2>
      {subtitle && <p className="text-slate-600 text-sm mt-1">{subtitle}</p>}
    </motion.div>
  );
};
