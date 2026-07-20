import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Resources = () => {
    const { hash } = useLocation();
    const navigate = useNavigate();

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
        { id: "magazine", title: "COMMEMORATIVE MAGAZINE", iconName: "Layers", color: "bg-[#4CAF50]", textColor: "text-white", ghostColor: "text-white/10", accent: "bg-white" },
    ];

    const resourceDetails = {
        messages: {
            heading: 'Sunday Messages',
            description: 'Weekly sermon teaching library. Includes video archives, study notes, and sermon series playlists.',
            link: '/resources/messages',
            keyPoints: [
                'Faith-building sermon series',
                'Worship teaching notes',
                'Speaker insights and reflections'
            ]
        },
        verses: {
            heading: 'Memory Verses',
            description: 'Daily scripture to memorize, meditate on, and share within the community for practical Christian growth.',
            link: '/resources/verses',
            keyPoints: [
                'Top scripture reference cards',
                'Share-to-social and copy link',
                'Daily verse reminders'
            ]
        },
        '4ws': {
            heading: '4WS Guide',
            description: 'A focused discipleship framework: Word, Worship, Witness, Work. Step-by-step practice guide for each week.',
            link: '/resources/4ws',
            keyPoints: ['Study plan', 'Worship action items', 'Evangelism prompts', 'Serving checklist']
        },
        chronicle: {
            heading: 'Chronicle',
            description: 'Ministry history and testimony archives. Stories of how God moved in the church through past events.',
            link: '/resources/chronicle',
            keyPoints: ['Milestone timelines', 'Transformational testimonies', 'Photos and narrative journals']
        },
        growth: {
            heading: 'Growth Materials',
            description: 'Resources to support spiritual discipleship: podcasts, small group studies, and personal development tracks.',
            link: '/resources/growth',
            keyPoints: ['Growth plans', 'Leader guides', 'Practice worksheets']
        },
        glc: {
            heading: 'GLC Modules',
            description: 'Structured curriculum for the Grace Life Center (GLC). Module downloads and lesson tracking for students.',
            link: '/resources/glc',
            keyPoints: ['Module PDF downloads', 'Progress tracking', 'Assessment templates']
        },
        articles: {
            heading: 'Articles',
            description: 'In-depth articles, devotionals and teaching notes from church leadership and invited authors.',
            link: '/resources/articles',
            keyPoints: ['Bible studies', 'Devotional insights', 'Practical faith application']
        },
        motivate: {
            heading: 'Motivate',
            description: 'Weekly encouragement content for mental and spiritual health, including quotes, stories, and life lessons.',
            link: '/resources/motivate',
            keyPoints: ['Inspirational quotes', 'Testimony snippets', 'Action challenges']
        },
        magazine: {
            heading: 'Commemorative Magazine',
            description: 'Periodical digital magazine archive for church events, campaigns, and special issues.',
            link: '/resources/magazine',
            keyPoints: ['Latest issue preview', 'Articles feature', 'Download options']
        }
    };


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
                                onClick={() => {
                                    const routeMap = {
                                        messages: '/resources/messages',
                                        verses: '/resources/verses',
                                        articles: '/resources/articles',
                                        magazine: '/resources/magazine',
                                        '4ws': '/resources/4ws',
                                        chronicle: '/resources/chronicle',
                                        growth: '/resources/growth',
                                        glc: '/resources/glc',
                                        motivate: '/resources/motivate'
                                    };
                                    if (routeMap[item.id]) {
                                        navigate(routeMap[item.id]);
                                    } else {
                                        navigate(`#${item.id}`);
                                    }
                                }}
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

            {/* Details Sections for each resource */}
            <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-200">
                <h2 className="text-4xl md:text-5xl font-['Bebas_Neue'] italic text-slate-900 uppercase tracking-tight mb-12 text-center">
                    Discover Resource Basics
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {Object.entries(resourceDetails).map(([key, detail]) => (
                        <div key={key} id={`${key}-details`} className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">{detail.heading}</h3>
                                <span className="text-xs font-black uppercase tracking-wider text-slate-400">{key.toUpperCase()}</span>
                            </div>
                            <p className="text-slate-600 mb-4">{detail.description}</p>
                            <ul className="list-disc list-inside text-slate-500 space-y-1 mb-6">
                                {detail.keyPoints.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={detail.link}
                                    className="text-xs font-black uppercase py-2 px-5 rounded-full border border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-all"
                                >
                                    Open {detail.heading}
                                </a>
                                <a
                                    href={key === 'messages' ? '/resources/messages' : '#'}
                                    className="text-xs font-bold uppercase py-2 px-5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Full content blocks for each category */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto space-y-16">
                    {Object.entries(resourceDetails).map(([key, detail]) => (
                        <div key={key} id={key} className="rounded-3xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
                            <h3 className="text-3xl md:text-4xl font-['Bebas_Neue'] tracking-tight uppercase mb-4 text-slate-900">{detail.heading}</h3>
                            <p className="text-slate-600 mb-6">{detail.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {detail.keyPoints.slice(0, 4).map((item, idx) => (
                                    <div key={item} className="rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
                                        <h4 className="font-black text-sm uppercase text-[#4CAF50] tracking-wider mb-2">Step {idx + 1}</h4>
                                        <p className="text-slate-500 text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    className="rounded-full bg-[#4CAF50] text-white text-xs font-black uppercase tracking-wider px-5 py-2 hover:bg-[#3d8b40] transition-all"
                                    href={detail.link}
                                >
                                    Open {detail.heading}
                                </a>
                                <a
                                    className="rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider px-5 py-2 hover:bg-slate-300 transition-all"
                                    href="#top"
                                >
                                    Back to top
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Resources;