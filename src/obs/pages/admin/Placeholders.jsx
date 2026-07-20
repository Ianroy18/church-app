// Admin placeholder pages
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Bell, Settings } from 'lucide-react';
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

const PlaceholderPage = ({ title, subtitle, icon: Icon }) => {
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

export const AdminAnalytics = () => <PlaceholderPage title="Analytics" subtitle="View system analytics and reports" icon={BarChart3} />;
export const AdminAssignments = () => <PlaceholderPage title="Assignments" subtitle="Manage all assignments" icon={FileText} />;
export const AdminAnnouncements = () => <PlaceholderPage title="Announcements" subtitle="Manage system announcements" icon={Bell} />;

export const AdminSettings = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <SectionTitle title="Settings" subtitle="Manage your admin account and portal preferences" />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-6 border-slate-200">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Profile</p>
            <h3 className="mt-4 text-lg font-black text-slate-900">Admin Profile</h3>
            <p className="mt-3 text-sm text-slate-600">Update your name, email, and display settings for the admin portal.</p>
            <div className="mt-6 space-y-3">
              {['Update profile photo', 'Change display name', 'Edit admin email'].map((item) => (
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
            <p className="mt-3 text-sm text-slate-600">Manage password, login activity, and access controls for your admin account.</p>
            <div className="mt-6 space-y-3">
              {['Change password', 'Review login history', 'Manage active sessions'].map((item) => (
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
            <h3 className="mt-4 text-lg font-black text-slate-900">Alert Preferences</h3>
            <p className="mt-3 text-sm text-slate-600">Choose which admin notifications you want to receive by email or in-app.</p>
            <div className="mt-6 space-y-3">
              {['System alerts', 'New user requests', 'Weekly summaries'].map((item) => (
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
            This action is not yet available in the admin portal. We are adding richer admin profile, security, and notification settings soon.
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

export default PlaceholderPage;
