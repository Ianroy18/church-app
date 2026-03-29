import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Calendar, Users, Heart,
    BookOpen, Award, Star, Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Chronicle = () => {
    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState(2026);

    // Chronicle Data - Church History & Testimonies
    const chronicleData = {
        2026: [
            {
                id: 1,
                date: "March 2026",
                title: "Easter Outreach Success",
                type: "Event",
                description: "Over 200 people attended our Easter outreach program, with 15 new visitors committing to follow Christ.",
                impact: "15 New Believers",
                icon: Heart,
                color: "#4CAF50"
            },
            {
                id: 2,
                date: "February 2026",
                title: "Community Service Initiative",
                type: "Ministry",
                description: "Launched feeding program for local families in need, serving 50 families weekly.",
                impact: "50 Families Served",
                icon: Users,
                color: "#FFC107"
            },
            {
                id: 3,
                date: "January 2026",
                title: "Youth Ministry Growth",
                type: "Achievement",
                description: "Youth group expanded to 75 members with new discipleship program implementation.",
                impact: "75 Youth Members",
                icon: Star,
                color: "#2196F3"
            }
        ],
        2025: [
            {
                id: 4,
                date: "December 2025",
                title: "Christmas Community Outreach",
                type: "Event",
                description: "Distributed gifts and food to 100 families during Christmas season.",
                impact: "100 Families Blessed",
                icon: Heart,
                color: "#FF5722"
            },
            {
                id: 5,
                date: "October 2025",
                title: "Bible Study Expansion",
                type: "Ministry",
                description: "Started 3 new small group Bible studies across different communities.",
                impact: "3 New Groups",
                icon: BookOpen,
                color: "#9C27B0"
            }
        ],
        2024: [
            {
                id: 6,
                date: "August 2024",
                title: "Church Building Completion",
                type: "Milestone",
                description: "Completed construction of new sanctuary, doubling our worship space capacity.",
                impact: "New Sanctuary",
                icon: Award,
                color: "#00BCD4"
            }
        ]
    };

    const years = Object.keys(chronicleData).sort((a, b) => b - a);
    const currentEntries = chronicleData[selectedYear] || [];

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
                                Church <span className="text-[#4CAF50]">Chronicle</span>
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Our story of faith, growth, and God's faithfulness</p>
                        </div>

                        <div className="bg-[#4CAF50] px-6 py-4 rounded-2xl shadow-lg shadow-[#4CAF50]/20">
                            <p className="text-white text-sm font-bold uppercase tracking-wider">Ministry History & Impact</p>
                        </div>
                    </div>

                    {/* Year Selector */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(parseInt(year))}
                                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                                    selectedYear === parseInt(year)
                                        ? 'bg-[#4CAF50] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>

                    {/* Chronicle Entries */}
                    <div className="space-y-6">
                        {currentEntries.map((entry) => (
                            <div key={entry.id} className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                                <div className="flex items-start gap-6">
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                                        style={{ backgroundColor: entry.color }}
                                    >
                                        <entry.icon size={32} />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                                {entry.date}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                entry.type === 'Event' ? 'bg-blue-100 text-blue-700' :
                                                entry.type === 'Ministry' ? 'bg-green-100 text-green-700' :
                                                entry.type === 'Achievement' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-purple-100 text-purple-700'
                                            }`}>
                                                {entry.type}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900 mb-3">
                                            {entry.title}
                                        </h3>

                                        <p className="text-slate-700 mb-4">{entry.description}</p>

                                        <div className="flex items-center gap-2">
                                            <Award size={16} className="text-[#4CAF50]" />
                                            <span className="text-sm font-bold text-[#4CAF50] uppercase tracking-wider">
                                                {entry.impact}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Impact Summary */}
                    <div className="mt-12 bg-gradient-to-r from-[#4CAF50] to-[#3d8b40] rounded-3xl p-8 text-white">
                        <h3 className="text-3xl font-['Bebas_Neue'] uppercase tracking-tight mb-6">
                            Our Impact in {selectedYear}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">
                                    {currentEntries.reduce((sum, entry) => {
                                        const match = entry.impact.match(/(\d+)/);
                                        return match ? sum + parseInt(match[1]) : sum;
                                    }, 0)}
                                </div>
                                <p className="text-sm uppercase tracking-wider opacity-90">Lives Impacted</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">{currentEntries.length}</div>
                                <p className="text-sm uppercase tracking-wider opacity-90">Major Events</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">
                                    {currentEntries.filter(e => e.type === 'Event').length}
                                </div>
                                <p className="text-sm uppercase tracking-wider opacity-90">Community Outreach</p>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-white/10 rounded-2xl">
                            <p className="text-center font-bold">
                                "For I know the plans I have for you... plans to prosper you and not to harm you, plans to give you hope and a future." - Jeremiah 29:11
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Chronicle;