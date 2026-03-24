import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Users,
    BookOpen,
    CheckCircle,
    Camera,
    Award,
    LogOut,
    LayoutDashboard,
    Zap,
    ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
    const menuItems = [
        { id: 'users', label: 'Users', icon: Users, description: 'Student Directory' },
        { id: 'attendance', label: 'Attendance', icon: CheckCircle, description: 'Live Logs' },
        { id: 'lessons', label: 'Modules', icon: BookOpen, description: 'Course Content' },
        { id: 'scanner', label: 'Scanner', icon: Camera, description: 'QR Verification' },
        { id: 'cert', label: 'Awards', icon: Award, description: 'Certificates' },
    ];

    return (
        <div className="w-[280px] h-[calc(100vh-2rem)] bg-[#030712] flex flex-col m-4 rounded-[3rem] shadow-[0_0_50px_-12px_rgba(16,185,129,0.2)] overflow-hidden border border-emerald-500/10 relative">

            {/* --- GLOW ORB EFFECT (BACKGROUND) --- */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-[100px]" />

            {/* --- BRANDING --- */}
            <div className="p-10 pb-6 relative z-10">
                <Link to="/" className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck size={28} className="text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-center mt-2">
                        <h2 className="text-white font-black text-xl tracking-[0.1em] uppercase italic leading-none">LCC CORE</h2>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <span className="h-[2px] w-4 bg-emerald-500 rounded-full" />
                            <p className="text-[9px] text-emerald-500/70 font-black uppercase tracking-[0.3em] italic">Admin v2.0</p>
                            <span className="h-[2px] w-4 bg-emerald-500 rounded-full" />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="px-10">
                <Separator className="bg-emerald-500/10 h-[1px]" />
            </div>

            {/* --- NAVIGATION --- */}
            <nav className="flex-1 px-6 space-y-3 overflow-y-auto no-scrollbar py-8 relative z-10">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-5 py-4 rounded-[1.8rem] transition-all duration-500 group relative",
                                isActive
                                    ? "bg-emerald-500/10 border border-emerald-500/20"
                                    : "hover:bg-white/[0.03] border border-transparent"
                            )}
                        >
                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-full" />
                            )}

                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-500 shadow-sm",
                                isActive
                                    ? "bg-emerald-500 text-[#030712] rotate-[10deg]"
                                    : "bg-slate-900 text-slate-500 group-hover:text-emerald-400"
                            )}>
                                <Icon size={18} strokeWidth={2.5} />
                            </div>

                            <div className="flex flex-col items-start">
                                <span className={cn(
                                    "font-black text-[11px] uppercase tracking-wider transition-colors italic",
                                    isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"
                                )}>
                                    {item.label}
                                </span>
                                <span className="text-[7px] text-slate-600 font-bold uppercase tracking-widest leading-none mt-1">
                                    {item.description}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* --- SYSTEM STATS / FOOTER --- */}
            <div className="p-6 relative z-10">
                <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Zap size={14} className="text-emerald-500 animate-pulse" />
                        </div>
                        <div>
                            <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">System Status</p>
                            <p className="text-[9px] text-emerald-400 font-black uppercase italic">All Systems Operational</p>
                        </div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full py-7 rounded-[1.5rem] bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/10 transition-all duration-500 gap-3 font-black text-[10px] uppercase tracking-[0.2em] italic group"
                    onClick={handleLogout}
                >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Terminate Session
                </Button>

                <p className="text-[7px] text-slate-700 text-center mt-6 font-black uppercase tracking-[0.5em] italic">
                    Binary Integrity Secured
                </p>
            </div>
        </div>
    );
};

export default AdminSidebar;