// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabase'; // Siguraduhing tama ang path
// import {
//     Heart, MessageCircle, Share2, Download,
//     MoreHorizontal, ArrowLeft, Globe, ThumbsUp
// } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const MagazineFeed = () => {
//     const navigate = useNavigate();
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // 1. FETCH DATA FROM SUPABASE
//     const fetchPosts = async () => {
//         const { data, error } = await supabase
//             .from('magazines')
//             .select('*, magazine_comments(*)')
//             .order('created_at', { ascending: false });

//         if (!error) setPosts(data);
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     // 2. LIKE LOGIC
//     const handleLike = async (postId, currentLikes) => {
//         const { error } = await supabase
//             .from('magazines')
//             .update({ likes_count: currentLikes + 1 })
//             .eq('id', postId);
//         if (!error) fetchPosts(); // Refresh list
//     };

//     // 3. SHARE LOGIC (Simple Copy Link)
//     const handleShare = (postId) => {
//         navigator.clipboard.writeText(`${window.location.origin}/resources/magazine`);
//         alert("Link copied to clipboard!");
//     };

//     return (
//         <div className="min-h-screen bg-[#F0F2F5] font-['Montserrat']">
//             <Navbar />
//             <div className="pt-32 pb-20 px-4">
//                 <div className="max-w-[680px] mx-auto">

//                     <div className="mb-6 flex items-center gap-4">
//                         <button onClick={() => navigate('/resources')} className="p-2 bg-white rounded-full shadow-sm"><ArrowLeft size={20} /></button>
//                         <h2 className="text-2xl font-['Bebas_Neue'] tracking-tight italic uppercase">Magazine <span className="text-[#4CAF50]">Feed</span></h2>
//                     </div>

//                     {loading ? (
//                         <div className="text-center py-20 text-slate-500">Loading feed...</div>
//                     ) : (
//                         posts.map((post) => (
//                             <div key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
//                                 {/* HEADER */}
//                                 <div className="p-4 flex items-center justify-between">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold">A</div>
//                                         <div>
//                                             <h4 className="font-bold text-[14px]">{post.author}</h4>
//                                             <p className="text-[12px] text-slate-500">{new Date(post.created_at).toLocaleDateString()} • <Globe size={10} className="inline" /></p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* CONTENT */}
//                                 <div className="px-4 pb-3 text-[15px]">{post.description}</div>
//                                 <div className="bg-slate-100 flex justify-center">
//                                     <img src={post.cover_image} className="w-full max-h-[600px] object-contain" alt="cover" />
//                                 </div>

//                                 {/* STATS */}
//                                 <div className="px-4 py-3 flex justify-between text-slate-500 text-[13px] border-b border-slate-50">
//                                     <div className="flex items-center gap-1"><ThumbsUp size={14} className="text-blue-500" /> {post.likes_count}</div>
//                                     <div>{post.magazine_comments?.length || 0} comments • {post.shares_count} shares</div>
//                                 </div>

//                                 {/* ACTIONS */}
//                                 <div className="px-2 py-1 flex justify-around">
//                                     <button onClick={() => handleLike(post.id, post.likes_count)} className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg font-semibold text-slate-600">
//                                         <ThumbsUp size={18} /> Like
//                                     </button>
//                                     <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg font-semibold text-slate-600">
//                                         <MessageCircle size={18} /> Comment
//                                     </button>
//                                     <button onClick={() => handleShare(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-50 rounded-lg font-semibold text-slate-600">
//                                         <Share2 size={18} /> Share
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import {
    MessageCircle, Share2, ArrowLeft, Globe, ThumbsUp, MoreHorizontal
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MagazineFeed = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // DUMMY DATA - Facebook Style Content
    const dummyPosts = [
        {
            id: 'dummy-1',
            author: 'LCC Core Admin',
            created_at: new Date().toISOString(),
            description: 'Explore our latest spiritual commemorative magazine collection. Stay inspired and connected with the community. 🙏✨',
            cover_image: '/article.jpg', // Path kung naa sa root sa public folder
            likes_count: 42,
            shares_count: 12,
            magazine_comments: [1, 2, 3, 4, 5]
        },
        {
            id: 'dummy-2',
            author: 'Ptr. Blaine Jakosalem',
            created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            description: 'This month\'s edition focuses on "Walking in Faith" - featuring testimonies from our community members who have experienced God\'s faithfulness in challenging times. Available now for download! 📖🙌',
            cover_image: '/article.jpg',
            likes_count: 67,
            shares_count: 23,
            magazine_comments: [1, 2, 3, 4, 5, 6, 7]
        },
        {
            id: 'dummy-3',
            author: 'Amb. Genard Ganapin',
            created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            description: 'Grateful for the opportunity to share about our community outreach programs. The March edition includes stories of hope, transformation, and God\'s love in action. 🌟❤️',
            cover_image: '/article.jpg',
            likes_count: 89,
            shares_count: 34,
            magazine_comments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            id: 'dummy-4',
            author: 'LCC Media Team',
            created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
            description: 'Behind the scenes: Our team working on the upcoming Easter special edition. Stay tuned for powerful messages of resurrection and new life! 🕊️✨',
            cover_image: '/article.jpg',
            likes_count: 156,
            shares_count: 67,
            magazine_comments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        }
    ];

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('magazines')
                .select('*, magazine_comments(*)')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                setPosts(data);
            } else {
                setPosts(dummyPosts);
            }
        } catch (err) {
            setPosts(dummyPosts);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleLike = (postId) => {
        setPosts(posts.map(p =>
            p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p
        ));
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] font-sans">
            <Navbar />

            <div className="pt-24 pb-10 px-0 sm:px-4">
                <div className="max-w-[680px] mx-auto">

                    {/* Header with Back Button */}
                    <div className="mb-4 px-4 flex items-center gap-3">
                        <button
                            onClick={() => navigate('/resources')}
                            className="p-2 hover:bg-white/50 rounded-full transition-all"
                        >
                            <ArrowLeft size={22} className="text-slate-700" />
                        </button>
                        <h2 className="text-xl font-bold text-slate-800">Magazine Feed</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4CAF50]"></div>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="bg-white sm:rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.1)] border-x sm:border border-slate-200 mb-4 overflow-hidden">

                                {/* FB Header Section */}
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white font-bold text-lg border border-slate-100 shadow-sm">
                                            {post.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[15px] leading-tight text-slate-900 hover:underline cursor-pointer">
                                                {post.author}
                                            </h4>
                                            <p className="text-[12px] text-slate-500 flex items-center gap-1">
                                                March 27 at 3:45 AM • <Globe size={12} />
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-slate-500 hover:bg-slate-100 p-2 rounded-full transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                {/* FB Description */}
                                <div className="px-4 pb-3 text-[15px] text-slate-800">
                                    {post.description}
                                </div>

                                {/* FB Image - Full Width (No Padding) */}
                                <div className="bg-slate-100 border-y border-slate-100 cursor-pointer">
                                    <img
                                        src={post.cover_image}
                                        className="w-full h-auto block"
                                        alt="Magazine Content"
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found+in+Public+Folder"; }}
                                    />
                                </div>

                                {/* FB Stats Section */}
                                <div className="px-4 py-2.5 flex justify-between items-center text-[13px] text-slate-500 border-b border-slate-100 mx-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="bg-[#1877F2] rounded-full p-1 shadow-sm">
                                            <ThumbsUp size={10} className="text-white fill-white" />
                                        </div>
                                        <span className="hover:underline cursor-pointer">{post.likes_count}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="hover:underline cursor-pointer">{post.magazine_comments?.length || 0} comments</span>
                                        <span>•</span>
                                        <span className="hover:underline cursor-pointer">{post.shares_count} shares</span>
                                    </div>
                                </div>

                                {/* FB Action Buttons */}
                                <div className="px-1 py-1 flex">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 rounded-md font-semibold text-[14px] text-slate-600 transition-colors"
                                    >
                                        <ThumbsUp size={20} /> Like
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 rounded-md font-semibold text-[14px] text-slate-600 transition-colors">
                                        <MessageCircle size={20} /> Comment
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 rounded-md font-semibold text-[14px] text-slate-600 transition-colors">
                                        <Share2 size={20} /> Share
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MagazineFeed;