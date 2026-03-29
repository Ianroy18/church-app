import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, CheckCircle, Target,
    Calendar, Users, Heart, Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FourWSGuide = () => {
    const navigate = useNavigate();
    const [activeWeek, setActiveWeek] = useState(1);

    // 4WS Framework Data
    const weeks = [
        {
            id: 1,
            title: "WORD",
            subtitle: "Study God's Word",
            description: "Dive deep into Scripture through daily reading, meditation, and study.",
            color: "#4CAF50",
            icon: BookOpen,
            activities: [
                "Read assigned Bible passages daily",
                "Memorize key verses",
                "Journal insights and applications",
                "Discuss with accountability partner"
            ]
        },
        {
            id: 2,
            title: "WORSHIP",
            subtitle: "Connect with God",
            description: "Express your love and adoration to God through prayer and praise.",
            color: "#FFC107",
            icon: Heart,
            activities: [
                "Daily prayer time (minimum 15 minutes)",
                "Worship through music and song",
                "Practice gratitude and thanksgiving",
                "Seek God's presence in quiet time"
            ]
        },
        {
            id: 3,
            title: "WITNESS",
            subtitle: "Share the Gospel",
            description: "Share your faith and invite others to know Christ through your testimony.",
            color: "#2196F3",
            icon: Users,
            activities: [
                "Share your testimony with someone",
                "Invite a friend to church or small group",
                "Pray for unsaved friends/family",
                "Practice sharing the Gospel message"
            ]
        },
        {
            id: 4,
            title: "WORK",
            subtitle: "Serve Others",
            description: "Use your gifts and talents to serve God by serving others in practical ways.",
            color: "#FF5722",
            icon: Target,
            activities: [
                "Identify your spiritual gifts",
                "Volunteer for church ministry",
                "Serve your community",
                "Use your workplace as mission field"
            ]
        }
    ];

    const currentWeek = weeks.find(w => w.id === activeWeek);

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
                                4WS <span className="text-[#4CAF50]">Guide</span>
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Word • Worship • Witness • Work</p>
                        </div>

                        <div className="bg-[#4CAF50] px-6 py-4 rounded-2xl shadow-lg shadow-[#4CAF50]/20">
                            <p className="text-white text-sm font-bold uppercase tracking-wider">Weekly Discipleship Framework</p>
                        </div>
                    </div>

                    {/* Week Selector */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {weeks.map((week) => (
                            <button
                                key={week.id}
                                onClick={() => setActiveWeek(week.id)}
                                className={`p-6 rounded-2xl border-2 transition-all ${
                                    activeWeek === week.id
                                        ? 'border-[#4CAF50] bg-[#4CAF50] text-white shadow-lg'
                                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <week.icon size={24} className="mb-2 mx-auto" />
                                <h3 className="font-['Bebas_Neue'] text-lg uppercase tracking-wide">{week.title}</h3>
                                <p className="text-xs opacity-80">{week.subtitle}</p>
                            </button>
                        ))}
                    </div>

                    {/* Current Week Content */}
                    {currentWeek && (
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                                    style={{ backgroundColor: currentWeek.color }}
                                >
                                    <currentWeek.icon size={32} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900">
                                        {currentWeek.title}
                                    </h3>
                                    <p className="text-slate-600">{currentWeek.subtitle}</p>
                                </div>
                            </div>

                            <p className="text-slate-700 mb-8 text-lg">{currentWeek.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentWeek.activities.map((activity, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                                        <CheckCircle size={20} className="text-[#4CAF50] mt-0.5 flex-shrink-0" />
                                        <p className="text-slate-700 text-sm">{activity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Weekly Progress Tracker */}
                    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                        <h3 className="text-2xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900 mb-6">
                            Weekly Progress
                        </h3>

                        <div className="space-y-4">
                            {weeks.map((week) => (
                                <div key={week.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                                            style={{ backgroundColor: week.color }}
                                        >
                                            {week.id}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{week.title}</h4>
                                            <p className="text-slate-500 text-sm">{week.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" className="w-5 h-5 text-[#4CAF50] rounded" />
                                        <span className="text-sm text-slate-600">Complete</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-[#4CAF50]/10 rounded-2xl border border-[#4CAF50]/20">
                            <p className="text-[#4CAF50] font-bold text-center">
                                "Therefore go and make disciples of all nations..." - Matthew 28:19
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FourWSGuide;