import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, MoreHorizontal } from 'lucide-react';
import { cn } from "../lib/utils";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    return (
        /* Main Wrapper: Inangat ang z-index sa 999 at ginawang responsive ang spacing */
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[999] flex flex-col items-end font-['Montserrat']">

            {/* CHAT WINDOW */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        /* Width: calc(100vw - 32px) para hindi lumampas sa mobile screen side-to-side */
                        /* Height: h-[70vh] para mag-adjust sa height ng phone */
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[320px] md:w-[360px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col h-[70vh] md:h-[480px]"
                    >
                        {/* Compact Premium Header */}
                        <div className="bg-slate-900 p-5 text-white flex justify-between items-start relative overflow-hidden">
                            {/* Decorative Background Circle */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#4CAF50] rounded-full opacity-20 blur-2xl" />

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white rounded-full p-1.5 shadow-lg">
                                        <img src="/favicon.png" alt="LCC Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4CAF50] border-2 border-slate-900 rounded-full" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[13px] tracking-tight text-white">LCC Assistant</h4>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full animate-pulse" />
                                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Always Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 relative z-10">
                                <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-400">
                                    <MoreHorizontal size={18} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-slate-400"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-5 overflow-y-auto bg-slate-50/50 space-y-4">
                            <div className="flex gap-2.5">
                                <div className="w-7 h-7 bg-white rounded-full shadow-sm p-1 self-end border border-slate-100">
                                    <img src="/favicon.png" alt="bot" className="w-full h-full object-contain" />
                                </div>
                                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 max-w-[85%]">
                                    <p className="text-[15px] text-slate-700 leading-snug font-['Caveat'] text-2xl">
                                        "Blessed day! I'm here to help you navigate through Grace and Truth Life Care Centre. How can I assist you today?"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Minimalist Input Area */}
                        <div className="p-4 bg-white border-t border-slate-50 flex gap-2 items-center">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-full bg-slate-100/80 border-none rounded-2xl px-4 py-3 text-[13px] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none transition-all placeholder:text-slate-400"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 bg-[#4CAF50] text-white rounded-xl shadow-lg shadow-[#4CAF50]/30 hover:bg-[#43a047] transition-colors flex-shrink-0"
                            >
                                <Send size={18} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING BUTTON (FAB) */}
            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                /* Responsive sizes: w-14 h-14 sa mobile, w-16 h-16 sa desktop */
                className={cn(
                    "w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(76,175,80,0.3)] transition-all duration-500 relative overflow-hidden",
                    isOpen ? "bg-slate-900" : "bg-[#4CAF50]"
                )}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X className="text-white" size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="relative"
                        >
                            <MessageCircle className="text-white" size={26} fill="currentColor" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Visual Polish: Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 pointer-events-none" />

                {!isOpen && (
                    <span className="absolute inset-0 rounded-2xl bg-[#4CAF50] animate-ping opacity-10" />
                )}
            </motion.button>
        </div>
    );
};

export default ChatBot;