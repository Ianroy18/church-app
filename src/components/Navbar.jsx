import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

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

    // Gi-update ang hrefs para mo-match sa mga sections sa PublicHome
    const navLinks = [
        { name: "Home", href: "#top" },
        { name: "About", href: "#about" },
        { name: "Ministries", href: "#next-steps" }, // Gi-connect sa Next Steps/Ministries
        { name: "Contact", href: "#contact" }, // Gi-connect sa Chat/Contact section
    ];

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* --- LOGO SECTION (Gi-ilis na ang Text og lcc1.png) --- */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img
                        src="/lcc1.png"
                        alt="LCC Logo"
                        className="h-10 w-auto transition-transform duration-300 object-contain group-hover:scale-110"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-[#4CAF50]",
                                scrolled ? "text-slate-600" : "text-white/90 drop-shadow-sm"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}


                </nav>

                {/* Mobile Toggle */}
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

            {/* Mobile Menu Dropdown */}
            <div className={cn(
                "absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden transition-all duration-300 origin-top shadow-2xl",
                mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
            )}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-slate-900 font-black text-xl italic uppercase tracking-tighter hover:text-[#4CAF50] border-b border-slate-50 pb-2"
                    >
                        {link.name}
                    </a>
                ))}
                <div className="pt-4">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-[#4CAF50] hover:bg-[#439c47] py-8 rounded-none font-black text-sm tracking-[0.2em] uppercase italic shadow-lg">
                            STUDENT PORTAL
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;