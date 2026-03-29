import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Heart, Quote, Share2,
    Copy, Star, Sparkles, Calendar
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Motivate = () => {
    const navigate = useNavigate();
    const [copiedId, setCopiedId] = useState(null);

    // Motivation Content Data
    const motivationData = [
        {
            id: 1,
            type: "Quote",
            title: "Daily Inspiration",
            content: "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
            author: "Psalm 28:7",
            category: "Strength",
            color: "#4CAF50",
            icon: Heart
        },
        {
            id: 2,
            type: "Testimony",
            title: "From Darkness to Light",
            content: "I was lost in addiction and despair, but God's love found me. Through this church community, I discovered hope, healing, and purpose. Today, I'm free and serving others.",
            author: "Maria Santos",
            category: "Transformation",
            color: "#FFC107",
            icon: Star
        },
        {
            id: 3,
            type: "Challenge",
            title: "Love Your Neighbor",
            content: "This week, intentionally reach out to someone in need. A kind word, a helping hand, or simply listening can change someone's day and reflect God's love.",
            author: "Weekly Challenge",
            category: "Action",
            color: "#2196F3",
            icon: Sparkles
        },
        {
            id: 4,
            type: "Quote",
            title: "God's Faithfulness",
            content: "Know therefore that the Lord your God is God; he is the faithful God, keeping his covenant of love to a thousand generations.",
            author: "Deuteronomy 7:9",
            category: "Faith",
            color: "#FF5722",
            icon: Heart
        },
        {
            id: 5,
            type: "Story",
            title: "The Power of Prayer",
            content: "During my darkest hour, the church gathered to pray for me. What seemed impossible became possible. Prayer moves mountains and changes lives.",
            author: "Pastor Blaine Jakosalem",
            category: "Prayer",
            color: "#9C27B0",
            icon: Star
        },
        {
            id: 6,
            type: "Challenge",
            title: "Gratitude Practice",
            content: "Start each day by listing 3 things you're grateful for. Gratitude shifts our focus from problems to blessings and opens our hearts to God's goodness.",
            author: "Daily Practice",
            category: "Mindfulness",
            color: "#00BCD4",
            icon: Sparkles
        }
    ];

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleShare = (content, title) => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: content,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(`${title}\n\n${content}\n\n${window.location.href}`);
            alert("Content copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-['Montserrat']">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <button
                                onClick={() => navigate('/resources')}
                                className="flex items-center gap-2 text-slate-500 hover:text-[#4CAF50] transition-colors mb-2 font-bold text-sm uppercase tracking-wider"
                            >
                                <ArrowLeft size={18} /> Back to Resources
                            </button>
                            <h2 className="text-4xl font-['Bebas_Neue'] tracking-tight italic uppercase">
                                <span className="text-[#4CAF50]">Motivate</span>
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Daily inspiration for your spiritual journey</p>
                        </div>

                        <div className="bg-[#FFC107] px-6 py-4 rounded-2xl shadow-lg shadow-[#FFC107]/20">
                            <p className="text-slate-900 text-sm font-bold uppercase tracking-wider">Encouragement & Hope</p>
                        </div>
                    </div>

                    {/* Featured Content */}
                    <div className="bg-gradient-to-r from-[#4CAF50] to-[#3d8b40] rounded-3xl p-8 text-white mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Quote size={24} />
                            <span className="text-sm font-bold uppercase tracking-wider">Featured Today</span>
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                            "I can do all things through Christ who strengthens me."
                        </blockquote>
                        <cite className="text-lg opacity-90">- Philippians 4:13</cite>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {motivationData.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white`}
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 inline-block ${
                                            item.type === 'Quote' ? 'bg-blue-100 text-blue-700' :
                                            item.type === 'Testimony' ? 'bg-green-100 text-green-700' :
                                            item.type === 'Challenge' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-purple-100 text-purple-700'
                                        }`}>
                                            {item.type}
                                        </span>
                                        <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                                    </div>
                                </div>

                                <blockquote className="text-slate-700 mb-4 text-sm leading-relaxed">
                                    "{item.content}"
                                </blockquote>

                                <div className="flex items-center justify-between">
                                    <cite className="text-xs text-slate-500 italic">— {item.author}</cite>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleCopy(`"${item.content}" — ${item.author}`, item.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                            copiedId === item.id
                                                ? 'bg-[#4CAF50] text-white'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {copiedId === item.id ? 'COPIED!' : <><Copy size={14} /> Copy</>}
                                    </button>
                                    <button
                                        onClick={() => handleShare(item.content, item.title)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider transition-all"
                                    >
                                        <Share2 size={14} /> Share
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Weekly Themes */}
                    <div className="mt-16 bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                        <h3 className="text-3xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900 mb-8 text-center">
                            This Week's Focus
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            {[
                                { day: 'Mon', theme: 'Strength', color: '#4CAF50' },
                                { day: 'Tue', theme: 'Hope', color: '#FFC107' },
                                { day: 'Wed', theme: 'Love', color: '#FF5722' },
                                { day: 'Thu', theme: 'Faith', color: '#2196F3' },
                                { day: 'Fri', theme: 'Joy', color: '#9C27B0' },
                                { day: 'Sat', theme: 'Peace', color: '#00BCD4' },
                                { day: 'Sun', theme: 'Grace', color: '#4CAF50' }
                            ].map((dayTheme) => (
                                <div key={dayTheme.day} className="text-center p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all">
                                    <div className="font-bold text-slate-900 mb-1">{dayTheme.day}</div>
                                    <div
                                        className="text-sm font-bold uppercase tracking-wider rounded-lg py-1 px-2 text-white"
                                        style={{ backgroundColor: dayTheme.color }}
                                    >
                                        {dayTheme.theme}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-[#4CAF50]/10 rounded-2xl border border-[#4CAF50]/20">
                            <p className="text-[#4CAF50] font-bold text-center">
                                "May the God of hope fill you with all joy and peace as you trust in him." - Romans 15:13
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <h3 className="text-2xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900 mb-4">
                            Need Personal Encouragement?
                        </h3>
                        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                            Our prayer team is here to support you. Share your prayer requests and receive personalized encouragement.
                        </p>
                        <button className="bg-[#4CAF50] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-[#3d8b40] transition-all shadow-lg shadow-[#4CAF50]/20">
                            Request Prayer Support
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Motivate;