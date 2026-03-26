import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

// Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { motion } from 'framer-motion';
import { cn } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ArrowRight, Play, MapPin, Clock, Users,
  MessageCircle, ShieldCheck, FileText, Heart, Globe
} from 'lucide-react';

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const ChatSupportSection = () => {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
        <span className="text-[#4CAF50] font-black tracking-[0.5em] text-[10px] uppercase italic block mb-4">Prayer & Support</span>
        <h2 className="text-5xl md:text-6xl font-['Bebas_Neue',_sans-serif] italic tracking-tighter text-slate-900 mb-6 leading-none">
          Do you just need someone to talk to?
        </h2>
        <p className="text-slate-600 mb-10 font-medium max-w-xl mx-auto uppercase text-xs tracking-widest leading-relaxed">
          Our prayer warriors and counselors are here for you. We believe in the power of prayer and the strength of community.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#4CAF50] hover:bg-[#3d8b40] text-white px-10 py-8 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-xl">
              <MessageCircle className="mr-3 h-5 w-5" />
              Chat With Us
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] bg-slate-900 border-none text-white p-0 overflow-hidden shadow-2xl">
            <div className="relative">
              <div className="h-32 bg-[#4CAF50] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <img src="/lcc1.png" className="w-full h-full object-cover scale-150 rotate-12" alt="bg" />
                </div>
                <Heart className="h-16 w-16 text-white animate-pulse relative z-10" />
              </div>

              <div className="p-8">
                <DialogHeader className="mb-8">
                  <DialogTitle className="text-4xl font-['Bebas_Neue',_sans-serif] italic tracking-wide text-white text-center uppercase">
                    We are here to pray for you
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <a
                    href="https://m.me/LifeCareCenterCDO"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group"
                  >
                    <div className="h-14 w-14 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] group-hover:scale-110 transition-transform">
                      <MessageCircle size={28} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-base uppercase tracking-wider">Facebook Messenger</h4>
                      <p className="text-[10px] text-slate-400 tracking-[0.1em] uppercase">Talk to our counselors now</p>
                    </div>
                  </a>

                  <button className="w-full flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group text-left">
                    <div className="h-14 w-14 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] group-hover:scale-110 transition-transform">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base uppercase tracking-wider">Prayer Request</h4>
                      <p className="text-[10px] text-slate-400 tracking-[0.1em] uppercase">Private and confidential request</p>
                    </div>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 text-center italic mt-8 uppercase tracking-widest">
                  "Where two or three are gathered in my name, there am I."
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

function PublicHome() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
    return () => revealElements.forEach(el => revealObserver.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#4CAF50]/30 selection:text-slate-900 overflow-x-hidden">
      <Navbar />

      <main>
        <section id="top" className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src="images/bible_study.png"
              className="w-full h-full object-cover opacity-40 scale-105"
              alt="Worship"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-6xl">
            <Badge variant="outline" className="text-[#4CAF50] border-[#4CAF50] px-4 py-1.5 tracking-[0.4em] uppercase mb-8 text-[10px]">
              Grace and Truth Life Care Centre
            </Badge>

            <h1 className="text-white text-3xl md:text-6xl lg:text-6xl font-black tracking-tighter leading-[0.9] mb-10 uppercase italic font-['Bebas_Neue',_sans-serif]">
              Know Christ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 via-white/40 to-white/10 italic">
                And Make Him Known
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="bg-[#4CAF50] hover:bg-[#439c47] text-white px-8 py-7 rounded-none font-bold text-xs tracking-[0.2em] transition-all hover:scale-105 shadow-[0_0_40px_rgba(76,175,80,0.3)]">
                <a href="https://web.facebook.com/LifeCareCenterCDO/videos" target="_blank" rel="noreferrer">
                  WATCH LATEST MESSAGE <Play className="ml-3 fill-current" size={14} />
                </a>
              </Button>
              <Button variant="ghost" asChild size="lg" className="text-white hover:text-[#4CAF50] hover:bg-white/5 font-bold tracking-[0.2em] text-xs group uppercase">
                <a href="#about" className="flex items-center">
                  Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </a>
              </Button>
            </div>
          </div>
        </section>
        {/* --- MISSION, VISION, & CORE VALUES SECTION --- */}
        <section id="purpose" className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">

            {/* Section Header */}
            <div className="text-center mb-24 scroll-reveal">
              <span className="text-[#4CAF50] font-black tracking-[0.5em] text-[10px] uppercase italic block mb-4">
                Our Heart & Soul
              </span>
              <h2 className="text-5xl md:text-7xl font-['Bebas_Neue'] tracking-tighter uppercase italic text-slate-900 leading-none">
                Purpose & Values
              </h2>
            </div>

            {/* Floating Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Our Mission",
                  subtitle: "What we do",
                  content: "To know Christ and make Him known through authentic discipleship and selfless community service.",
                  color: "bg-[#4CAF50]",
                  textColor: "text-white",
                  subColor: "text-white/60"
                },
                {
                  title: "Our Vision",
                  subtitle: "Where we're going",
                  content: "A Christ-centered community living out the fullness of God's grace and truth to impact generations for His glory.",
                  color: "bg-slate-950",
                  textColor: "text-white",
                  subColor: "text-white/40"
                },
                {
                  title: "Core Values",
                  subtitle: "How we live",
                  content: "Integrity, Excellence, Discipleship, and Compassion in every action we take for the Kingdom.",
                  color: "bg-[#ead143]",
                  textColor: "text-slate-900",
                  subColor: "text-[#4CAF50]"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -20, rotateX: 5, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="scroll-reveal h-full"
                  style={{ perspective: "1000px" }}
                >
                  <Card className={cn(
                    "relative h-full border-none rounded-sm shadow-2xl p-10 overflow-hidden group min-h-[400px] flex flex-col justify-center",
                    item.color
                  )}>
                    {/* WATERMARK LOGO */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-[0.15] group-hover:opacity-[0.1] transition-all duration-700">
                      <img
                        src="/favicon.png"
                        alt="watermark"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {/* Ghost Background Text */}
                    <div className={cn(
                      "absolute -right-2 -bottom-2 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none",
                      item.color === "bg-slate-950" ? "text-white" : "text-slate-900"
                    )}>
                      <h3 className="font-['Bebas_Neue'] text-7xl md:text-8xl uppercase italic leading-none tracking-tighter">
                        {item.title.split(' ')[1] || item.title}
                      </h3>
                    </div>
                    <CardContent className="p-0 relative z-10">
                      {/* Subtitle */}
                      <span className={cn(
                        "font-black tracking-[0.4em] text-[9px] uppercase italic mb-4 block",
                        item.subColor
                      )}>
                        {item.subtitle}
                      </span>

                      {/* Title */}
                      <h3 className={cn(
                        "font-['Bebas_Neue'] text-5xl tracking-tighter italic uppercase mb-8 leading-none",
                        item.textColor
                      )}>
                        {item.title}
                      </h3>

                      {/* Handwritten Content - Ginamit ang Caveat font */}
                      <p className={cn(
                        "font-['Caveat'] text-4xl leading-tight transition-transform duration-500 group-hover:scale-105 origin-left",
                        item.color === "bg-slate-50" ? "text-slate-600" : "text-white/90"
                      )}>
                        "{item.content}"
                      </p>

                      {/* Animated Accent Line */}
                      <div className={cn(
                        "h-1.5 w-12 mt-10 transition-all duration-500 group-hover:w-24",
                        item.color === "bg-[#4CAF50]" ? "bg-white" : "bg-[#4CAF50]"
                      )} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-32 bg-slate-950 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 scroll-reveal">
              <span className="text-[#4CAF50] font-black tracking-[0.5em] text-[10px] uppercase italic block mb-4">Our Leadership</span>
              <h2 className="text-5xl md:text-7xl font-['Bebas_Neue',_sans-serif] tracking-tighter uppercase italic text-white leading-none">Meet the Team</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { name: "Amb. Genard Ganapin", role: "Ambassador", img: "/G3.png", focus: "Community Outreach" },
                { name: "Ptr. Blaine Jakosalem", role: "Lead Pastor", img: "/B3.png", focus: "Spiritual Direction" },
                { name: "Amb. Louis Gio Noval", role: "Ambassador", img: "/L3.png", focus: "Media & Communications" }
              ].map((member, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="scroll-reveal group"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-8 rounded-sm shadow-2xl border-b-[6px] border-[#4CAF50]">
                    <img
                      src={member.img}
                      className="w-full h-full object-cover object-top"
                      alt={member.name}
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-['Bebas_Neue',_sans-serif] text-4xl tracking-tighter italic uppercase text-white leading-none">
                      {member.name}
                    </h4>
                    <div className="flex flex-col">
                      <span className="text-[#4CAF50] font-black tracking-[0.2em] text-[10px] uppercase italic">
                        {member.role}
                      </span>
                      <span className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-1">
                        {member.focus}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO CARDS */}
        <section id="about" className="relative z-20 -mt-24 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">

            {/* CARD 1: SUNDAY SERVICE */}
            <motion.div
              whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ perspective: "1000px" }}
            >
              <Card className="bg-[#4CAF50] border-none rounded-sm text-white p-10 h-full shadow-2xl group cursor-default">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-[#4CAF50] transition-all duration-500">
                    <Clock size={32} />
                  </div>
                  <h3 className="font-['Bebas_Neue',_sans-serif] tracking-tighter text-4xl mb-2 uppercase italic">Sunday Service</h3>
                  <p className="text-white/90 text-[10px] font-black tracking-[0.3em] uppercase italic">9:00 AM & 4:00 PM</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 2: LOCATION */}
            <motion.div
              whileHover={{ y: -15, rotateX: 5, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ perspective: "1000px" }}
            >
              <Card className="bg-slate-900 border-none rounded-sm text-white p-10 h-full shadow-2xl group cursor-default">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-500">
                    <MapPin size={32} />
                  </div>
                  <h3 className="font-['Bebas_Neue',_sans-serif] tracking-tighter text-4xl mb-2 uppercase italic">Location</h3>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-white/70 text-[10px] font-black tracking-[0.2em] uppercase italic hover:text-[#4CAF50] transition-colors">
                    Calamansi Drive, Patag, <br /> Cagayan de Oro
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 3: D-GROUPS */}
            <motion.div
              whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ perspective: "1000px" }}
            >
              <Card className="bg-white border-none rounded-sm text-slate-900 p-10 h-full shadow-2xl group cursor-default">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-500">
                    <Users size={32} className="text-[#4CAF50] group-hover:text-white" />
                  </div>
                  <h3 className="font-['Bebas_Neue',_sans-serif] tracking-tighter text-4xl mb-2 uppercase italic">D-Groups</h3>
                  <p className="text-slate-500 text-[10px] font-black tracking-[0.3em] uppercase italic">Discipleship community</p>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </section>

        {/* NEXT STEPS SECTION */}
        <section id="next-steps" className="py-32 bg-slate-800">
          <div className="max-w-7xl mx-auto px-6 text-center mb-24 scroll-reveal">
            <span className="text-[#4CAF50] font-black tracking-[0.5em] text-[10px] uppercase italic block mb-4">Get Involved</span>
            <h2 className="text-5xl md:text-8xl font-['Bebas_Neue'] tracking-tighter uppercase italic text-white leading-none">Your Next Step</h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              { title: "I'm New Here", label: "01. Start Here", img: "/1.jpg" },
              { title: "Join a D-Group", label: "02. Community", img: "/2.jpg" },
              { title: "Start Serving", label: "03. Volunteer", img: "/3.jpg" }
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="scroll-reveal group relative h-[500px] overflow-hidden cursor-pointer shadow-2xl rounded-sm"
                style={{ perspective: "1000px" }}
              >
                {/* Image - Inayos ang object-top para hindi maputol ang ulo */}
                <img
                  src={step.img}
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  alt={step.title}
                />

                {/* Dark Overlay - Mas pinatindi ang gradient para lumitaw ang puting text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute bottom-12 left-0 right-0 text-center px-8 z-10">
                  <span className="text-[#4CAF50] font-black tracking-[0.4em] text-[9px] uppercase mb-4 block italic">
                    {step.label}
                  </span>
                  <h4 className="text-white font-['Bebas_Neue'] text-5xl tracking-tighter italic uppercase mb-6 leading-none">
                    {step.title}
                  </h4>

                  {/* Animated Line */}
                  <div className="h-1 w-16 bg-[#4CAF50] mx-auto scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* THE CHAT SUPPORT SECTION COMPONENT */}
        <ChatSupportSection />

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-20 px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
            <div className="space-y-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-5">

                <span className="font-['Bebas_Neue',_sans-serif] tracking-widest text-3xl italic uppercase">LCC CDO</span>
              </div>
              <div className="space-y-6">
                <p className="text-slate-500 font-black text-[9px] tracking-[0.5em] uppercase italic">Stay Connected</p>
                <div className="flex flex-col gap-4">
                  <a href="https://web.facebook.com/LifeCareCenterCDO" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#4CAF50] flex items-center justify-center md:justify-start gap-4 text-[10px] font-bold tracking-tighter uppercase transition-colors">
                    <FacebookIcon size={18} /> /LifeCareCenterCDO
                  </a>
                  <a href="#" className="text-slate-400 hover:text-red-500 flex items-center justify-center md:justify-start gap-4 text-[10px] font-bold tracking-tighter uppercase transition-colors">
                    <YoutubeIcon size={18} /> /LifeCareCenterCDOmainTV
                  </a>
                  <a href="#" className="text-slate-400 hover:text-pink-500 flex items-center justify-center md:justify-start gap-4 text-[10px] font-bold tracking-tighter uppercase transition-colors">
                    <InstagramIcon size={18} /> @lifecarecentercdo
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 w-full md:w-auto text-center md:text-left">
              <div className="space-y-6">
                <h5 className="font-black text-[10px] tracking-[0.5em] uppercase italic text-slate-500">Legal & Privacy</h5>
                <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">
                  <li><a href="#" className="hover:text-[#4CAF50] flex items-center justify-center md:justify-start gap-3 transition-colors"><FileText size={14} /> Terms</a></li>
                  <li><a href="#" className="hover:text-[#4CAF50] flex items-center justify-center md:justify-start gap-3 transition-colors"><ShieldCheck size={14} /> Privacy</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="font-black text-[10px] tracking-[0.5em] uppercase italic text-slate-500">Contact Us</h5>
                <ul className="space-y-4 text-[10px] font-bold tracking-widest uppercase text-slate-400">
                  <li className="flex items-center justify-center md:justify-start gap-3">
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#4CAF50] transition-colors">
                      <MapPin size={14} className="text-[#4CAF50]" /> Calamansi Drive, Patag, CDO
                    </a>
                  </li>
                  <li className="flex items-center justify-center md:justify-start gap-3"><Globe size={14} className="text-[#4CAF50]" /> lcccdo.org</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="bg-white/10 mb-10" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-slate-600 text-[9px] font-black tracking-[0.5em] uppercase italic text-center">
            <p className="hover:text-white transition-colors">Grace and Truth Life Care Centre Inc. © 2026</p>
            <p className="text-[#4CAF50]/40 hover:text-[#4CAF50] transition-all cursor-default tracking-[1.5em] duration-700">Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default PublicHome;