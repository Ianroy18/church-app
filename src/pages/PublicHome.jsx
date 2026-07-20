import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from "../lib/utils";
import Footer from '../components/Footer';
import ChatSupportSection from '../components/ChatSupportSection';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  ArrowRight, Play, MapPin, Clock, Users,
  MessageCircle, ShieldCheck, FileText, Heart, Globe,
  X, CheckCircle, Phone
} from 'lucide-react';


function PublicHome() {
  const navigate = useNavigate();

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
                Mission & Vision
              </h2>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <motion.div
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="scroll-reveal overflow-hidden rounded-sm shadow-2xl border border-slate-200"
              >
                <img
                  src="/lccm.jpg"
                  alt="LCCM"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="scroll-reveal overflow-hidden rounded-sm shadow-2xl border border-slate-200"
              >
                <img
                  src="/lccv.jpg"
                  alt="LCCV"
                  className="w-full h-full object-cover"
                />
              </motion.div>
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
              { title: "I'm New Here", label: "01. Start Here", img: "/1.jpg", route: "/nextsteps/new-here" },
              { title: "Join a D-Group", label: "02. Community", img: "/2.jpg", route: "/nextsteps/join-d-group" },
              { title: "Start Serving", label: "03. Volunteer", img: "/3.jpg", route: "/nextsteps/start-serving" }
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="scroll-reveal group relative h-[500px] overflow-hidden cursor-pointer shadow-2xl rounded-sm"
                style={{ perspective: "1000px" }}
                onClick={() => navigate(step.route)}
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
      <Footer />
    </div>
  );
}


export default PublicHome;
