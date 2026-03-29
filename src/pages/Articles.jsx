import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Search, BookOpen, Download,
    ExternalLink, Book, Star, Clock
} from 'lucide-react';
import { useSupabaseContent, getDummyData } from '../hooks/useSupabaseContent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Articles = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    
    // Fetch articles from Supabase
    const { content: supabaseBooks, loading } = useSupabaseContent('articles');
    
    // Use Supabase data if available, otherwise fall back to dummy data
    const ebooks = supabaseBooks.length > 0 ? supabaseBooks : getDummyData('articles');

    const filteredBooks = ebooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-['Montserrat']">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-[1200px] mx-auto">

                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <button
                                onClick={() => navigate('/resources')}
                                className="flex items-center gap-2 text-slate-500 hover:text-[#4CAF50] transition-colors mb-2 font-bold text-sm uppercase tracking-wider"
                            >
                                <ArrowLeft size={18} /> Back to Resources
                            </button>
                            <h2 className="text-4xl font-['Bebas_Neue'] tracking-tight italic uppercase">
                                Christian <span className="text-[#4CAF50]">E-Library</span>
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">Nurturing your soul through digital wisdom.</p>
                        </div>

                        <div className="relative w-full md:w-[400px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search books or topics..."
                                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 transition-all"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <div key={book.id} className="group bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">

                                {/* Cover Image */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-slate-200">
                                    <img
                                        src={book.image_url || book.cover}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Book+Cover"; }}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2E7D32]">
                                            {book.category}
                                        </span>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button className="p-3 bg-white rounded-full text-[#4CAF50] hover:scale-110 transition-transform shadow-lg">
                                            <Download size={20} />
                                        </button>
                                        <button className="p-3 bg-[#4CAF50] rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                                            <BookOpen size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                                        ))}
                                        <span className="text-[10px] text-slate-400 ml-1 font-bold">{book.rating}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-[#4CAF50] transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-[11px] text-slate-400 mb-4 italic">By {book.author}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                            <Clock size={12} /> {book.pages}
                                        </div>
                                        <button className="text-[10px] font-black text-[#4CAF50] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                            Read More <ExternalLink size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredBooks.length === 0 && (
                        <div className="text-center py-20">
                            <Book size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-medium">No e-books found matching your search.</p>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Articles;