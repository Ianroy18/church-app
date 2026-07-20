import Sidebar from './Sidebar';

export default function MobileSidebar({ isOpen, onClose, onLogout }) {
  return (
    <div className={`lg:hidden fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} aria-hidden />

      <div className={`absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-900 p-4 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} role="dialog" aria-modal="true">
        <Sidebar onLogout={onLogout} />
      </div>
    </div>
  );
}
