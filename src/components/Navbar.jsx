import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "../lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuGroups = [
        {
            title: "About",
            links: [
                { name: "Who We Are", href: "#about-details" }, // Church Description section
                { name: "Mission & Vision", href: "#purpose" },
                { name: "Core Values", href: "#purpose" },
                { name: "Meet The Team", href: "#team" },
                { name: "Location", href: "#about" },
                { name: "Contact Us", href: "#contact" },
            ]
        },
        {
            title: "Watch",
            links: [
                { name: "Online Service (Sundays)", href: "#" },
                { name: "Video On Demand", href: "https://web.facebook.com/LifeCareCenterCDO/videos" },
                { name: "Broadcast Channels", href: "#" },
                { name: "Runthrough", href: "#" },
                { name: "Podcast", href: "#" },
                { name: "Spotify", href: "#" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Sunday Messages", href: "#" },
                { name: "Memory Verse", href: "#" },
                { name: "4WS", href: "#" },
                { name: "Chronicle", href: "#" },
                { name: "Growth Materials", href: "#" },
                { name: "GLC", href: "#" },
                { name: "Articles", href: "#" },
                { name: "Motivate", href: "#" },
                { name: "Commemorative Magazine", href: "#" },
            ]
        },
        {
            title: "Discipleship",
            links: [
                { name: "Discipleship Journey", href: "#" },
                { name: "DMembers Corner", href: "#" },
                { name: "DLeaders Corner", href: "#" },
            ]
        }
    ];

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4",
                scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-slate-100"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img
                        src="/lcc1.png"
                        alt="LCC Logo"
                        className="h-10 w-auto transition-transform duration-300 object-contain group-hover:scale-105"
                    />
                </Link>

                {/* DESKTOP MENU */}
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#top" className={cn(
                        "text-[11px] font-bold uppercase tracking-[0.2em] hover:text-[#4CAF50] transition-colors",
                        scrolled ? "text-slate-600" : "text-white drop-shadow-sm"
                    )}>
                        Home
                    </a>

                    {menuGroups.map((group) => (
                        <div key={group.title} className="relative group/item">
                            <button className={cn(
                                "flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-[#4CAF50] py-2 outline-none",
                                scrolled ? "text-slate-600" : "text-white drop-shadow-sm"
                            )}>
                                {group.title}
                                <ChevronDown size={12} className="opacity-50 group-hover/item:rotate-180 transition-transform duration-300" />
                            </button>

                            {/* FIXED DROPDOWN MODAL */}
                            <div className="absolute top-full right-0 mt-1 opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-300 min-w-[240px] z-[100]">
                                {/* Decorative Triangle/Arrow */}
                                <div className="absolute -top-1 right-6 w-3 h-3 bg-slate-900 rotate-45 border-l border-t border-white/10" />

                                <ul className="relative bg-slate-900/95 backdrop-blur-md py-4 shadow-2xl rounded-sm border border-white/10 border-t-[#4CAF50] border-t-2 overflow-hidden">
                                    {group.links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="block px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/80 hover:text-white hover:bg-[#4CAF50] transition-all duration-200"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </nav>

                {/* MOBILE HAMBURGER */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className={scrolled ? "text-slate-900" : "text-white"} />
                    ) : (
                        <Menu className={scrolled ? "text-slate-900" : "text-white"} />
                    )}
                </button>
            </div>

            {/* MOBILE MENU */}
            <div className={cn(
                "absolute top-full left-0 w-full bg-white border-b border-slate-100 flex flex-col md:hidden transition-all duration-300 origin-top shadow-2xl overflow-y-auto max-h-[85vh]",
                mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
            )}>
                <div className="p-6 space-y-6">
                    <a href="#top" onClick={() => setMobileMenuOpen(false)} className="block text-slate-900 font-black text-lg italic uppercase tracking-tighter border-b pb-2">Home</a>

                    {menuGroups.map((group) => (
                        <div key={group.title} className="space-y-3">
                            <h4 className="text-[#4CAF50] text-[10px] font-black uppercase tracking-[0.3em]">{group.title}</h4>
                            <div className="grid grid-cols-1 gap-4 pl-3 border-l-2 border-slate-100">
                                {group.links.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-slate-600 font-bold text-xs uppercase tracking-widest hover:text-[#4CAF50]"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Navbar;