import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, BookOpen, Users, Target,
    Download, Play, FileText, Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GrowthMaterials = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Growth Materials Data
    const materials = [
        {
            id: 1,
            title: "Spiritual Disciplines Handbook",
            category: "Discipleship",
            type: "PDF Guide",
            description: "Comprehensive guide to developing spiritual habits that deepen your relationship with God.",
            duration: "45 pages",
            level: "Beginner",
            downloads: 234,
            icon: BookOpen,
            color: "#4CAF50"
        },
        {
            id: 2,
            title: "Prayer Ministry Training",
            category: "Ministry",
            type: "Video Series",
            description: "Learn effective prayer strategies and intercession techniques for personal and corporate prayer.",
            duration: "6 sessions",
            level: "Intermediate",
            downloads: 189,
            icon: Play,
            color: "#FFC107"
        },
        {
            id: 3,
            title: "Small Group Leadership",
            category: "Leadership",
            type: "Workbook",
            description: "Essential skills and strategies for leading effective small groups and discipleship circles.",
            duration: "32 pages",
            level: "Advanced",
            downloads: 156,
            icon: Users,
            color: "#2196F3"
        },
        {
            id: 4,
            title: "Evangelism Made Simple",
            category: "Outreach",
            type: "Training Guide",
            description: "Practical tools and conversation starters for sharing the Gospel in everyday situations.",
            duration: "28 pages",
            level: "Beginner",
            downloads: 298,
            icon: Target,
            color: "#FF5722"
        },
        {
            id: 5,
            title: "Bible Study Methods",
            category: "Discipleship",
            type: "Interactive Course",
            description: "Learn inductive Bible study techniques and interpretation principles.",
            duration: "8 lessons",
            level: "Intermediate",
            downloads: 176,
            icon: FileText,
            color: "#9C27B0"
        },
        {
            id: 6,
            title: "Worship Leading Basics",
            category: "Ministry",
            type: "Video Training",
            description: "Fundamental skills for leading worship services and creating meaningful worship experiences.",
            duration: "4 sessions",
            level: "Beginner",
            downloads: 145,
            icon: Play,
            color: "#00BCD4"
        }
    ];

    const categories = ['all', ...new Set(materials.map(m => m.category))];
    const filteredMaterials = selectedCategory === 'all'
        ? materials
        : materials.filter(m => m.category === selectedCategory);

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
                                Growth <span className="text-[#4CAF50]">Materials</span>
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Resources for spiritual development and ministry training</p>
                        </div>

                        <div className="bg-[#FFC107] px-6 py-4 rounded-2xl shadow-lg shadow-[#FFC107]/20">
                            <p className="text-slate-900 text-sm font-bold uppercase tracking-wider">Spiritual Development Tools</p>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                                    selectedCategory === category
                                        ? 'bg-[#4CAF50] text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                {category === 'all' ? 'All Materials' : category}
                            </button>
                        ))}
                    </div>

                    {/* Materials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMaterials.map((material) => (
                            <div key={material.id} className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all">
                                <div className="flex items-start gap-4 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                                        style={{ backgroundColor: material.color }}
                                    >
                                        <material.icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block ${
                                            material.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                            material.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {material.level}
                                        </span>
                                        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2">
                                            {material.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-3">{material.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Type:</span>
                                        <span className="font-medium text-slate-700">{material.type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Duration:</span>
                                        <span className="font-medium text-slate-700">{material.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Downloads:</span>
                                        <span className="font-medium text-slate-700">{material.downloads}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-[#4CAF50] text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#3d8b40] transition-all flex items-center justify-center gap-2">
                                    <Download size={16} />
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Growth Path Section */}
                    <div className="mt-16 bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
                        <h3 className="text-3xl font-['Bebas_Neue'] uppercase tracking-tight text-slate-900 mb-8 text-center">
                            Recommended Growth Path
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                                    <Star size={32} />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">Beginner</h4>
                                <p className="text-sm text-slate-600 mb-4">Start your spiritual journey</p>
                                <ul className="text-left text-sm text-slate-700 space-y-1">
                                    <li>• Spiritual Disciplines Handbook</li>
                                    <li>• Evangelism Made Simple</li>
                                    <li>• Worship Leading Basics</li>
                                </ul>
                            </div>

                            <div className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                                <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                                    <Target size={32} />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">Intermediate</h4>
                                <p className="text-sm text-slate-600 mb-4">Deepen your understanding</p>
                                <ul className="text-left text-sm text-slate-700 space-y-1">
                                    <li>• Prayer Ministry Training</li>
                                    <li>• Bible Study Methods</li>
                                    <li>• Small Group Leadership</li>
                                </ul>
                            </div>

                            <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                                    <Users size={32} />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">Advanced</h4>
                                <p className="text-sm text-slate-600 mb-4">Lead and mentor others</p>
                                <ul className="text-left text-sm text-slate-700 space-y-1">
                                    <li>• Advanced Leadership Training</li>
                                    <li>• Ministry Development</li>
                                    <li>• Church Planting Guide</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GrowthMaterials;