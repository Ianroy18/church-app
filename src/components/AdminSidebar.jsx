import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Users,
    BookOpen,
    CheckCircle,
    Camera,
    Award,
    LogOut,
    ShieldCheck,
    Activity,
    ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
    const menuItems = [
        { id: 'users', label: 'Users', icon: Users, description: 'Student Directory', color: '#60a5fa' },
        { id: 'attendance', label: 'Attendance', icon: CheckCircle, description: 'Live Session Logs', color: '#34d399' },
        { id: 'lessons', label: 'Modules', icon: BookOpen, description: 'Course Content', color: '#a78bfa' },
        { id: 'scanner', label: 'Scanner', icon: Camera, description: 'QR Verification', color: '#fb923c' },
        { id: 'cert', label: 'Awards', icon: Award, description: 'Certificates', color: '#fbbf24' },
    ];

    return (
        <div
            className="w-[270px] h-[calc(100vh-2rem)] flex flex-col m-4 rounded-[28px] overflow-hidden relative flex-shrink-0"
            style={{
                background: '#0b0f18',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5), 4px 0 24px rgba(0,0,0,0.3)',
            }}
        >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.03) 0%, transparent 70%)' }} />

            {/* Top accent line */}
            <div className="h-[1px] w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)' }} />

            {/* Brand */}
            <div className="px-6 pt-7 pb-6 relative z-10 flex-shrink-0">
                <Link to="/" className="flex items-center gap-4 group">
                    <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            boxShadow: '0 8px 20px rgba(34,197,94,0.3)',
                        }}
                    >
                        <ShieldCheck size={22} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="font-black text-white text-[13px] tracking-wider uppercase leading-none">LCC Core</h2>
                        <p className="text-[9px] font-black tracking-[0.35em] uppercase mt-1" style={{ color: 'rgba(34,197,94,0.6)' }}>
                            Admin Panel
                        </p>
                    </div>
                </Link>
            </div>

            {/* Divider */}
            <div className="mx-6 mb-4 h-px flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }} />

            {/* Nav label */}
            <p className="px-6 mb-2 text-[9px] font-black tracking-[0.35em] uppercase flex-shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Navigation
            </p>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto relative z-10" style={{ scrollbarWidth: 'none' }}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[18px] transition-all duration-300 group relative text-left"
                            style={{
                                background: isActive ? 'rgba(34,197,94,0.08)' : 'transparent',
                                border: isActive ? '1px solid rgba(34,197,94,0.15)' : '1px solid transparent',
                            }}
                            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                        >
                            {/* Active left bar */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full" style={{ background: '#22c55e' }} />
                            )}

                            {/* Icon box */}
                            <div
                                className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                style={{
                                    background: isActive ? item.color + '15' : 'rgba(255,255,255,0.05)',
                                    color: isActive ? item.color : 'rgba(255,255,255,0.25)',
                                }}
                            >
                                <Icon size={17} strokeWidth={2.5} />
                            </div>

                            {/* Labels */}
                            <div className="flex flex-col min-w-0 flex-1">
                                <span
                                    className="font-black text-[11px] uppercase tracking-[0.1em] leading-none transition-colors"
                                    style={{ color: isActive ? '#f0fdf4' : 'rgba(255,255,255,0.45)' }}
                                >
                                    {item.label}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.15em] mt-1 leading-none" style={{ color: 'rgba(255,255,255,0.2)' }}>
                                    {item.description}
                                </span>
                            </div>

                            {/* Arrow indicator */}
                            {isActive && (
                                <ChevronRight size={14} style={{ color: 'rgba(34,197,94,0.5)', flexShrink: 0 }} />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer section */}
            <div className="p-4 relative z-10 flex-shrink-0 space-y-3">

                {/* Status chip */}
                <div
                    className="rounded-[16px] p-3.5 flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.1)' }}>
                        <Activity size={13} style={{ color: '#22c55e' }} />
                    </div>
                    <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.25)' }}>System</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: '#4ade80' }}>Operational</p>
                        </div>
                    </div>
                </div>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-[16px] font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300 group"
                    style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', color: 'rgba(239,68,68,0.7)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; e.currentTarget.style.color = 'rgba(239,68,68,0.7)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.12)'; }}
                >
                    <LogOut size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                    Sign Out
                </button>

                <p className="text-center text-[8px] font-black uppercase tracking-[0.5em]" style={{ color: 'rgba(255,255,255,0.08)' }}>
                    LCC · v2.0
                </p>
            </div>
        </div>
    );
};

export default AdminSidebar;