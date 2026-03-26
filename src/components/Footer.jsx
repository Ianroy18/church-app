import React from 'react';
import { FileText, ShieldCheck, MapPin, Globe } from 'lucide-react';

const FacebookIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const YoutubeIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

const InstagramIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const Footer = () => {
    return (
        <footer className="bg-[#020617] py-10 px-6 text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* Main Content Grid - Mas compact na gaps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="font-['Bebas_Neue'] tracking-widest text-2xl italic uppercase">LCC CDO</h2>
                        <div className="space-y-3">
                            <p className="text-slate-500 font-black text-[8px] tracking-[0.4em] uppercase italic">Stay Connected</p>
                            <div className="flex flex-col gap-2">
                                <a href="https://web.facebook.com/LifeCareCenterCDO" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#4CAF50] flex items-center gap-3 text-[9px] font-bold uppercase transition-colors">
                                    <FacebookIcon /> /LifeCareCenterCDO
                                </a>
                                <a href="#" className="text-slate-400 hover:text-[#4CAF50] flex items-center gap-3 text-[9px] font-bold uppercase transition-colors">
                                    <YoutubeIcon /> /LCCmainTV
                                </a>
                                <a href="#" className="text-slate-400 hover:text-[#4CAF50] flex items-center gap-3 text-[9px] font-bold uppercase transition-colors">
                                    <InstagramIcon /> @lifecarecentercdo
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Spacer para sa Desktop para hindi masyadong dikit-dikit */}
                    <div className="hidden md:block"></div>

                    {/* Legal Section */}
                    <div className="space-y-4">
                        <h5 className="font-black text-[9px] tracking-[0.4em] uppercase italic text-slate-500">Legal & Privacy</h5>
                        <ul className="space-y-2 text-[9px] font-bold uppercase text-slate-400">
                            <li><a href="#" className="hover:text-[#4CAF50] flex items-center gap-2 transition-colors"><FileText size={12} /> Terms</a></li>
                            <li><a href="#" className="hover:text-[#4CAF50] flex items-center gap-2 transition-colors"><ShieldCheck size={12} /> Privacy</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h5 className="font-black text-[9px] tracking-[0.4em] uppercase italic text-slate-500">Contact Us</h5>
                        <ul className="space-y-2 text-[9px] font-bold uppercase text-slate-400">
                            <li className="flex items-center gap-2">
                                <MapPin size={12} className="text-[#4CAF50]" /> Patag, CDO
                            </li>
                            <li className="flex items-center gap-2">
                                <Globe size={12} className="text-[#4CAF50]" /> lcccdo.org
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-white/5 mb-6" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[8px] font-black tracking-[0.3em] uppercase italic">
                    <p>© 2026 Grace and Truth Life Care Centre Inc.</p>
                    <p className="text-[#4CAF50]/30 tracking-[1em]">Excellence</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;