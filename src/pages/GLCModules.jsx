import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, CheckCircle, Play,
    FileText, Award, Clock, Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GLCModules = () => {
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState(1);

    // GLC Modules Data
    const modules = [
        {
            id: 1,
            title: "Foundation of Faith",
            subtitle: "Understanding Christianity",
            description: "Core beliefs, biblical foundations, and introduction to Christian living.",
            lessons: 8,
            duration: "4 weeks",
            level: "Beginner",
            color: "#4CAF50",
            icon: BookOpen,
            topics: [
                "Who is God?",
                "The Bible: God's Word",
                "Sin and Salvation",
                "The Holy Spirit",
                "Prayer Basics",
                "Church Community",
                "Christian Ethics",
                "Sharing Your Faith"
            ]
        },
        {
            id: 2,
            title: "Growing in Christ",
            subtitle: "Spiritual Development",
            description: "Deepening your relationship with God through spiritual disciplines and growth.",
            lessons: 10,
            duration: "5 weeks",
            level: "Intermediate",
            color: "#FFC107",
            icon: Star,
            topics: [
                "Bible Study Methods",
                "Prayer Life",
                "Worship and Praise",
                "Spiritual Gifts",
                "Fasting and Discipline",
                "Meditation on Scripture",
                "Spiritual Warfare",
                "Fruit of the Spirit",
                "Christian Maturity",
                "Leadership Development"
            ]
        },
        {
            id: 3,
            title: "Living the Mission",
            subtitle: "Ministry and Service",
            description: "Discovering your calling and serving God through practical ministry.",
            lessons: 12,
            duration: "6 weeks",
            level: "Advanced",
            color: "#2196F3",
            icon: Award,
            topics: [
                "God's Mission",
                "Evangelism Training",
                "Small Group Leadership",
                "Community Outreach",
                "Youth Ministry",
                "Children's Ministry",
                "Worship Ministry",
                "Administrative Roles",
                "Counseling Skills",
                "Church Planting",
                "Cross-cultural Ministry",
                "Long-term Commitment"
            ]
        }
    ];

    const currentModule = modules.find(m => m.id === selectedModule);

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
                                GLC <span className="text-[#4CAF50]">Modules</span>
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Grace Life Center discipleship curriculum</p>
                        </div>

                        <div className="bg-[#4CAF50] px-6 py-4 rounded-2xl shadow-lg shadow-[#4CAF50]/20">
                            <p className="text-white text-sm font-bold uppercase tracking-wider">Structured Discipleship Program</p>
                        </div>
                    </div>

                    {/* Module Selector */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {modules.map((module) => (
                            <button
                                key={module.id}
                                onClick={() => setSelectedModule(module.id)}
                                className={`p-6 rounded-3xl border-2 transition-all text-left ${
                                    selectedModule === module.id
                                        ? 'border-[#4CAF50] bg-[#4CAF50] text-white shadow-lg'
                                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white`}
                                        style={{ backgroundColor: selectedModule === module.id ? 'white' : module.color }}
                                    >
                                        <module.icon size={20} className={selectedModule === module.id ? 'text-[#4CAF50]' : 'text-white'} />
                                    </div>
                                    <div>
                                        <h3 className="font-['Bebas_Neue'] text-xl uppercase tracking-wide">{module.title}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                            module.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                            module.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {module.level}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm opacity-80 mb-3">{module.subtitle}</p>
                                <div className="flex justify-between text-xs">
                                    <span>{module.lessons} lessons</span>
                                    <span>{module.duration}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Current Module Content */}
                    {currentModule && (
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 mb-8">
                            <div className="flex items-center gap-6 mb-8">
                                <div
                                    className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white`}
                                    style={{ backgroundColor: currentModule.color }}
                                >
                                    <currentModule.icon size={40} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900 mb-2">
                                        {currentModule.title}
                                    </h3>
                                    <p className="text-slate-600 mb-4">{currentModule.subtitle}</p>
                                    <p className="text-slate-700">{currentModule.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider">Module Overview</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Lessons:</span>
                                            <span className="font-bold text-slate-900">{currentModule.lessons}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Duration:</span>
                                            <span className="font-bold text-slate-900">{currentModule.duration}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Level:</span>
                                            <span className="font-bold text-slate-900">{currentModule.level}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider">Topics Covered</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {currentModule.topics.map((topic, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <CheckCircle size={16} className="text-[#4CAF50] flex-shrink-0" />
                                                <span className="text-slate-700 text-sm">{topic}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-[#4CAF50] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#3d8b40] transition-all flex items-center gap-2">
                                        <Play size={16} />
                                        Start Module
                                    </button>
                                    <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center gap-2">
                                        <FileText size={16} />
                                        Download Materials
                                    </button>
                                    <button className="border border-[#4CAF50] text-[#4CAF50] px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#4CAF50] hover:text-white transition-all">
                                        Track Progress
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress Tracking */}
                    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                        <h3 className="text-3xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900 mb-8 text-center">
                            Your GLC Journey
                        </h3>

                        <div className="space-y-6">
                            {modules.map((module) => (
                                <div key={module.id} className="border border-slate-200 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white`}
                                                style={{ backgroundColor: module.color }}
                                            >
                                                <module.icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{module.title}</h4>
                                                <p className="text-slate-500 text-sm">{module.level} • {module.lessons} lessons</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-slate-500">Progress</div>
                                            <div className="font-bold text-slate-900">0/{module.lessons}</div>
                                        </div>
                                    </div>

                                    <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                                        <div
                                            className="h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: '0%',
                                                backgroundColor: module.color
                                            }}
                                        ></div>
                                    </div>

                                    <button className="text-[#4CAF50] font-bold text-sm uppercase tracking-wider hover:text-[#3d8b40] transition-all">
                                        {module.id === 1 ? 'Start Module' : 'Locked'}
                                    </button>
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

export default GLCModules;