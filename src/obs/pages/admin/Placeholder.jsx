import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, SectionTitle } from '../../components/CommonComponents';

const AdminPlaceholder = ({ title, subtitle, icon: Icon }) => {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title={title} subtitle={subtitle} />
        
        <Card className="h-96 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600">This page is under development. Content will be added soon.</p>
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminPlaceholder;
