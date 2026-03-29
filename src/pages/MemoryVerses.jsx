import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Copy, Share2, Download,
    Star, Quote, Sparkles, BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MemoryVerses = () => {
    const navigate = useNavigate();
    const [copiedId, setCopiedId] = useState(null);

    // DUMMY DATA - Base sa imong theme
    const verses = [
        {
            id: 1,
            verse: "Philippians 4:13",
            text: "I can do all things through Christ who strengthens me.",
            category: "Strength",
            accent: "#4CAF50"
        },
        {
            id: 2,
            verse: "Psalm 23:1",
            text: "The Lord is my shepherd; I shall not want.",
            category: "Provision",
            accent: "#2196F3"
        },
        {
            id: 3,
            verse: "Proverbs 3:5",
            text: "Trust in the Lord with all your heart and lean not on your own understanding.",
            category: "Trust",
            accent: "#FF5722"
        },
        {
            id: 4,
            verse: "Joshua 1:9",
            text: "Be strong and courageous. Do not be afraid; do not be discouraged.",
            category: "Courage",
            accent: "#9C27B0"
        },
        {
            id: 5,
            verse: "Jeremiah 29:11",
            text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",
            category: "Hope",
            accent: "#FF9800"
        },
        {
            id: 6,
            verse: "Matthew 11:28",
            text: "Come to me, all you who are weary and burdened, and I will give you rest.",
            category: "Rest",
            accent: "#00BCD4"
        },
        {
            id: 7,
            verse: "Romans 8:28",
            text: "And we know that in all things God works for the good of those who love him.",
            category: "Purpose",
            accent: "#8BC34A"
        },
        {
            id: 8,
            verse: "Psalm 46:1",
            text: "God is our refuge and strength, an ever-present help in trouble.",
            category: "Protection",
            accent: "#607D8B"
        },
        {
            id: 9,
            verse: "Ephesians 2:8-9",
            text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.",
            category: "Salvation",
            accent: "#E91E63"
        },
        {
            id: 10,
            verse: "Isaiah 40:31",
            text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
            category: "Renewal",
            accent: "#3F51B5"
        },
        {
            id: 11,
            verse: "John 14:6",
            text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
            category: "Truth",
            accent: "#795548"
        },
        {
            id: 12,
            verse: "Psalm 119:105",
            text: "Your word is a lamp for my feet, a light on my path.",
            category: "Guidance",
            accent: "#009688"
        }
    ];

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-['Montserrat']">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-[1100px] mx-auto">

                    {/* Header - Matching your Card Config */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => navigate('/resources')}
                                className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 hover:text-[#4CAF50] transition-all hover:shadow-md"
                            >
                                <ArrowLeft size={24} />
                            </button>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Star size={20} className="text-[#FFC107] fill-[#FFC107]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Daily Bread</span>
                                </div>
                                <h2 className="text-4xl font-['Bebas_Neue'] tracking-tight italic uppercase text-slate-900">
                                    Memory <span className="text-[#4CAF50]">Verses</span>
                                </h2>
                            </div>
                        </div>

                        {/* Search/Filter Mockup */}
                        <div className="bg-[#FFC107] px-6 py-3 rounded-2xl shadow-lg shadow-[#FFC107]/20 flex items-center gap-3">
                            <Sparkles size={20} className="text-slate-900" />
                            <span className="font-black text-xs uppercase tracking-widest text-slate-900">Hide the Word in your heart</span>
                        </div>
                    </div>

                    {/* Verse Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {verses.map((v) => (
                            <div key={v.id} className="group bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">

                                {/* Background Ghost Icon */}
                                <Star size={120} className="absolute -right-8 -top-8 text-slate-900/[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-700" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: v.accent }}>
                                                <Quote size={18} fill="currentColor" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                {v.category}
                                            </span>
                                        </div>
                                        <button className="text-slate-300 hover:text-[#FFC107] transition-colors">
                                            <Star size={20} />
                                        </button>
                                    </div>

                                    <blockquote className="text-xl md:text-2xl font-bold text-slate-800 leading-snug mb-8">
                                        "{v.text}"
                                    </blockquote>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="font-black text-xs uppercase tracking-[0.2em]" style={{ color: v.accent }}>
                                                — {v.verse}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCopy(`${v.text} (${v.verse})`, v.id)}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${copiedId === v.id ? 'bg-[#4CAF50] text-white' : 'bg-[#FFC107] text-slate-900 hover:scale-105'}`}
                                            >
                                                {copiedId === v.id ? 'COPIED!' : <><Copy size={14} /> COPY</>}
                                            </button>
                                            <button className="p-2.5 bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                                                <Share2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section - Study Tips */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FFC107]/10 rounded-2xl flex items-center justify-center text-[#FFC107]">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Read Context</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Understand the chapter</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center text-[#4CAF50]">
                                <Download size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Save Image</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Set as wallpaper</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                                <Share2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800">Share Daily</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Encourage others</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MemoryVerses;