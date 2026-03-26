import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';

const Resources = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            }
        }
    }, [hash]);

    const resourcesData = [
        { id: "messages", title: "SUNDAY MESSAGES", iconName: "Mic", color: "bg-[#4CAF50]", textColor: "text-white", ghostColor: "text-white/10", accent: "bg-white" },
        { id: "verses", title: "MEMORY VERSE", iconName: "Star", color: "bg-[#FFC107]", textColor: "text-slate-900", ghostColor: "text-slate-900/10", accent: "bg-[#4CAF50]" },
        { id: "4ws", title: "4WS GUIDE", iconName: "BookOpen", color: "bg-slate-950", textColor: "text-white", ghostColor: "text-white/10", accent: "bg-[#4CAF50]" },
        { id: "chronicle", title: "CHRONICLE", iconName: "Newspaper", color: "bg-[#4CAF50]", textColor: "text-white", ghostColor: "text-white/10", accent: "bg-white" },
        { id: "growth", title: "GROWTH MATERIALS", iconName: "Zap", color: "bg-[#FFC107]", textColor: "text-slate-900", ghostColor: "text-slate-900/10", accent: "bg-[#4CAF50]" },
        { id: "glc", title: "GLC MODULES", iconName: "FileText", color: "bg-slate-950", textColor: "text-white", ghostColor: "text-white/10", accent: "bg-[#4CAF50]" },
        { id: "articles", title: "ARTICLES", iconName: "PenTool", color: "bg-[#4CAF50]", textColor: "text-white", ghostColor: "text-white/10", accent: "bg-white" },
        { id: "motivate", title: "MOTIVATE", iconName: "Heart", color: "bg-[#FFC107]", textColor: "text-slate-900", ghostColor: "text-slate-900/10", accent: "bg-[#4CAF50]" },
        { id: "magazine", title: "COMMEMORATIVE MAGAZINE", iconName: "Layers", color: "bg-slate-950", textColor: "text-white", ghostColor: "text-white/10", accent: "bg-[#4CAF50]" },
    ];

    return (
        <div className="min-h-screen bg-[#F1F5F9] font-['Montserrat'] overflow-x-hidden">
            <Navbar />

            {/* Header Section */}
            <section className="pt-44 pb-32 px-6 bg-slate-950 text-center relative overflow-hidden min-h-[55vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img src="/images/hero_bg.png" alt="BG" className="w-full h-full object-cover opacity-35" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-[#F1F5F9]"></div>
                </div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase italic font-['Bebas_Neue'] leading-none">
                        CHURCH <span className="text-[#4CAF50]">RESOURCES</span>
                    </h1>
                </div>
            </section>

            {/* FLOATING GHOST GRID - Focus dito sa card layout */}
            <section className="py-24 px-6 max-w-7xl mx-auto -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {resourcesData.map((item) => {
                        const IconComponent = LucideIcons[item.iconName];

                        return (
                            /* FULL CARD CLICKABLE */
                            <div
                                key={item.id}
                                id={item.id}
                                onClick={() => window.location.href = `/resources/${item.id}`}
                                className={`relative h-[480px] ${item.color} rounded-[3rem] p-12 overflow-hidden group 
                                    shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-b-[8px] border-black/10 
                                    flex flex-col justify-between scroll-mt-32 cursor-pointer transition-all duration-300
                                    hover:scale-[1.02] active:scale-95`}
                            >
                                {/* 1. GHOST BACKGROUND TEXT */}
                                <div className={`absolute -bottom-6 left-0 right-0 whitespace-nowrap pointer-events-none select-none ${item.ghostColor}`}>
                                    <h2 className="text-[110px] font-black italic tracking-tighter leading-none opacity-40 uppercase">
                                        {item.title.split(' ')[0]}
                                    </h2>
                                </div>

                                {/* 2. WATERMARK LOGO */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-[0.07] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                                    <img src="/favicon.png" alt="watermark" className="w-full h-full object-contain" />
                                </div>

                                {/* CONTENT LAYER */}
                                <div className="relative z-10">
                                    <span className={`text-[10px] font-black tracking-[0.4em] uppercase italic mb-8 block opacity-60 ${item.textColor}`}>
                                        RESOURCE LIBRARY
                                    </span>

                                    <div className="bg-white/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white backdrop-blur-md border border-white/20 mb-8 shadow-xl">
                                        {IconComponent && <IconComponent size={32} strokeWidth={2.5} />}
                                    </div>

                                    <h3 className={`text-4xl md:text-5xl font-['Bebas_Neue'] italic leading-[0.85] tracking-tighter mb-6 ${item.textColor} uppercase`}>
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <p className={`text-[11px] font-bold uppercase tracking-widest mb-10 opacity-70 ${item.textColor}`}>
                                        Explore our {item.title.toLowerCase()} collection.
                                    </p>

                                    {/* ANIMATED ACCENT LINE */}
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[11px] font-black tracking-[0.2em] italic uppercase ${item.textColor}`}>
                                            VIEW LIBRARY
                                        </span>
                                        <div className={`h-[4px] rounded-full transition-all duration-700 w-12 group-hover:w-24 ${item.accent}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <Footer />
            <ChatBot />
        </div>
    );
};

export default Resources;