import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Play, Calendar, User,
    Share2, Bookmark, Search, Tv
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SundayMessages = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");

    // DUMMY SERMON DATA
    const sermons = [
        {
            id: 1,
            title: "The Power of Radical Faith",
            speaker: "Pastor Blaine jakusalem",
            date: "March 22, 2026",
            series: "Faith Unshaken",
            thumbnail: "/images/hero_bg.png",
            duration: "45:12",
            category: "Series"
        },
        {
            id: 2,
            title: "Finding Peace in the Midst of Storms",
            speaker: "Sis. Jane Smith",
            date: "March 15, 2026",
            series: "Inner Peace",
            thumbnail: "/images/worship.png",
            duration: "38:05",
            category: "Stand-alone"
        },
        {
            id: 3,
            title: "Stewardship: Beyond Finances",
            speaker: "Bro. Ernest Garcia",
            date: "March 8, 2026",
            series: "Kingdom Living",
            thumbnail: "/images/community_group.png",
            duration: "42:30",
            category: "Series"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] font-['Montserrat'] text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-[1200px] mx-auto">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <button
                                onClick={() => navigate('/resources')}
                                className="flex items-center gap-2 text-slate-400 hover:text-[#4CAF50] transition-colors mb-4 font-bold text-xs uppercase tracking-[0.2em]"
                            >
                                <ArrowLeft size={16} /> Back to Resources
                            </button>
                            <h2 className="text-5xl font-['Bebas_Neue'] tracking-tight italic uppercase">
                                Sunday <span className="text-[#4CAF50]">Messages</span>
                            </h2>
                            <p className="text-slate-400 text-sm mt-2 max-w-md">Catch up on our latest sermons and spiritual teachings. Re-watch, reflect, and grow.</p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                            {["All", "Series", "Stand-alone"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-[#4CAF50] text-white shadow-lg shadow-[#4CAF50]/20' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured/Latest Sermon (Big Card) */}
                    <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden mb-12 group cursor-pointer border border-white/10">
                        <img src="/images/hero_bg.png" className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" alt="Latest" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10 right-10">
                            <span className="bg-[#4CAF50] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Latest Message</span>
                            <h3 className="text-4xl font-bold mb-2">The Power of Radical Faith</h3>
                            <div className="flex items-center gap-6 text-slate-300 text-sm">
                                <span className="flex items-center gap-2"><User size={16} className="text-[#4CAF50]" /> Pastor Blaine Jakosalem</span>
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-[#4CAF50]" /> March 22, 2026</span>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <Play size={32} fill="white" className="ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Sermon Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sermons.filter(s => filter === "All" || s.category === filter).map((sermon) => (
                            <div key={sermon.id} className="group cursor-pointer">
                                {/* Thumbnail */}
                                <div className="relative aspect-video rounded-[24px] overflow-hidden border border-white/5 mb-4 shadow-lg shadow-black/40">
                                    <img
                                        src={sermon.thumbnail}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt={sermon.title}
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Sermon+Thumbnail"; }}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">
                                        {sermon.duration}
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                            <Play size={20} fill="white" className="ml-0.5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="px-2">
                                    <p className="text-[#4CAF50] text-[10px] font-black uppercase tracking-[0.2em] mb-1">{sermon.series}</p>
                                    <h4 className="text-lg font-bold mb-2 group-hover:text-[#4CAF50] transition-colors line-clamp-1">{sermon.title}</h4>
                                    <div className="flex items-center justify-between text-slate-500 text-xs">
                                        <span>{sermon.speaker}</span>
                                        <div className="flex gap-3">
                                            <Share2 size={16} className="hover:text-white transition-colors" />
                                            <Bookmark size={16} className="hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Watch More / YouTube Link */}
                    <div className="mt-20 p-10 rounded-[40px] bg-gradient-to-r from-[#1E293B] to-[#0F172A] border border-white/5 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-6">
                            <Tv size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Want to watch more?</h3>
                        <p className="text-slate-400 mb-8 max-w-sm">Subscribe to our YouTube channel to see our full archive of worship services and special events.</p>
                        <button className="bg-white text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#4CAF50] hover:text-white transition-all">
                            Visit YouTube Channel
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SundayMessages;