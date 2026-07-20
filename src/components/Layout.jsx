import React from 'react';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import Topbar from './Topbar';
import useSidebar from '../hooks/useSidebar';

export default function Layout({ children, onLogout, renderSidebar }) {
  const { isOpen, open, close, collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {renderSidebar ? (
        renderSidebar({ isOpen, open, close, collapsed, onLogout })
      ) : (
        <>
          <Sidebar collapsed={collapsed} onLogout={onLogout} />
          <MobileSidebar isOpen={isOpen} onClose={close} onLogout={onLogout} />
        </>
      )}

      <div className="lg:pl-80 p-4">
        <Topbar onHamburger={open} />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}
