import { useEffect } from 'react';
import Navbar from '../components/Navbar';

// Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

// Lucide Icons
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Play from 'lucide-react/dist/esm/icons/play';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Users from 'lucide-react/dist/esm/icons/users';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Globe from 'lucide-react/dist/esm/icons/globe';

// Custom Social Icons
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.4 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

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
    <div className="min-h-screen bg-white font-sans selection:bg-[#4CAF50]/30 selection:text-slate-900">
      <Navbar />

      <main>
        {/* --- HERO SECTION (ID: top) --- */}
        <section id="top" className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-40"
              alt="Worship"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950"></div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-5xl">
            <Badge variant="outline" className="text-[#4CAF50] border-[#4CAF50] px-4 py-1 tracking-[0.4em] uppercase mb-8">
              Grace and Truth Life Care Centre
            </Badge>
            <h1 className="text-white text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] mb-10 uppercase italic">
              Know Christ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/20">And Make Him Known</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button asChild className="bg-[#4CAF50] hover:bg-[#439c47] text-white px-10 py-8 rounded-none font-bold text-xs tracking-[0.2em] transition-all hover:scale-105 shadow-[0_0_40px_rgba(76,175,80,0.3)]">
                <a href="https://web.facebook.com/LifeCareCenterCDO/videos" target="_blank" rel="noreferrer">
                  WATCH LATEST MESSAGE <Play className="ml-3 fill-current" size={14} />
                </a>
              </Button>
              <Button variant="ghost" asChild className="text-white hover:text-[#4CAF50] hover:bg-white/5 font-bold tracking-[0.2em] text-xs group uppercase">
                <a href="#about" className="flex items-center">
                  Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* --- SERVICE INFO / ABOUT (ID: about) --- */}
        <section id="about" className="relative z-20 -mt-20 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-0 shadow-2xl rounded-sm overflow-hidden border-none scroll-reveal">
            <Card className="bg-[#4CAF50] border-none rounded-none text-white p-6">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Clock className="mb-4 opacity-80" size={40} />
                <h3 className="font-black tracking-tighter text-2xl mb-1 uppercase italic">Sunday Service</h3>
                <p className="text-white/80 text-sm font-bold tracking-widest uppercase">9:00 AM & 4:00 PM</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-none rounded-none text-white p-6">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <MapPin className="mb-4 opacity-80" size={40} />
                <h3 className="font-black tracking-tighter text-2xl mb-1 uppercase italic">Location</h3>
                <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase italic text-center">2F Jofel Bldg, Mortola St., CDO</p>
              </CardContent>
            </Card>
            <Card className="bg-white border-none rounded-none text-slate-900 p-6">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Users className="mb-4 text-[#4CAF50]" size={40} />
                <h3 className="font-black tracking-tighter text-2xl mb-1 uppercase italic">D-Groups</h3>
                <p className="text-slate-500 text-sm font-bold tracking-widest uppercase italic">Discipleship community</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --- NEXT STEPS / MINISTRIES (ID: next-steps) --- */}
        <section id="next-steps" className="py-48">
          <div className="max-w-7xl mx-auto px-6 text-center mb-24 scroll-reveal">
            <span className="text-[#4CAF50] font-black tracking-[0.4em] text-[10px] uppercase italic">Get Involved</span>
            <h2 className="text-7xl font-black tracking-tighter uppercase italic text-slate-900 leading-none mt-4">Your Next Step</h2>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {[
              { title: "I'm New Here", label: "01. Start Here", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=500" },
              { title: "Join a D-Group", label: "02. Community", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500" },
              { title: "Start Serving", label: "03. Volunteer", img: "https://images.unsplash.com/photo-1469571483350-f63005ff16bd?q=80&w=500" }
            ].map((step, i) => (
              <div key={i} className="scroll-reveal group relative h-[500px] overflow-hidden cursor-pointer shadow-xl">
                <img src={step.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={step.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90"></div>
                <div className="absolute bottom-12 left-12 right-12 text-center">
                  <span className="text-[#4CAF50] font-black tracking-[0.3em] text-[10px] uppercase mb-4 block italic">{step.label}</span>
                  <h4 className="text-white font-black text-3xl tracking-tighter italic uppercase mb-6">{step.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CONTACT / CHAT SECTION (ID: contact) --- */}
        <section id="contact" className="bg-slate-50 py-32 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
            <Heart className="mx-auto text-[#4CAF50] mb-8" size={48} />
            <h3 className="text-slate-900 text-4xl md:text-5xl font-black tracking-tighter italic uppercase mb-4">Do you just need someone to talk to?</h3>
            <p className="text-slate-500 font-bold tracking-widest uppercase text-sm mb-10 italic">Our prayer warriors and counselors are here for you.</p>
            <div className="flex justify-center">
              <Button asChild className="bg-[#4CAF50] hover:bg-[#439c47] rounded-full px-12 py-8 h-auto text-white font-bold tracking-[0.2em] text-sm uppercase shadow-2xl hover:scale-105 transition-all">
                <a href="https://m.me/LifeCareCenterCDO" target="_blank" rel="noreferrer">
                  CHAT WITH US! <MessageCircle className="ml-3" size={20} />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-24 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-20">
            <div className="space-y-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <img
                  src="/favicon.png"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#4CAF50]/20"
                  alt="LCC Logo"
                  onError={(e) => { e.target.src = "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507"; }}
                />
                <span className="font-black tracking-tighter text-3xl italic uppercase">LCC CDO</span>
              </div>
              <div className="space-y-4">
                <p className="text-slate-500 font-black text-[10px] tracking-widest uppercase italic">Stay Updated</p>
                <div className="flex flex-col gap-4">
                  <a href="https://web.facebook.com/LifeCareCenterCDO" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#4CAF50] flex items-center justify-center md:justify-start gap-3 text-xs font-bold tracking-tighter uppercase transition-colors">
                    <FacebookIcon size={18} /> /LifeCareCenterCDO
                  </a>
                  <a href="#" className="text-slate-400 hover:text-[#FF0000] flex items-center justify-center md:justify-start gap-3 text-xs font-bold tracking-tighter uppercase transition-colors">
                    <YoutubeIcon size={18} /> /CCFmainTV
                  </a>
                  <a href="#" className="text-slate-400 hover:text-[#E4405F] flex items-center justify-center md:justify-start gap-3 text-xs font-bold tracking-tighter uppercase transition-colors">
                    <InstagramIcon size={18} /> @lifecarecentercdo
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full md:w-auto text-center md:text-left">
              <div className="space-y-6">
                <h5 className="font-black text-[10px] tracking-[0.4em] uppercase italic text-slate-500">Legal</h5>
                <ul className="space-y-4 text-xs font-bold tracking-widest uppercase">
                  <li><a href="#" className="hover:text-[#4CAF50] flex items-center justify-center md:justify-start gap-2 transition-colors"><FileText size={14} /> Terms and Conditions</a></li>
                  <li><a href="#" className="hover:text-[#4CAF50] flex items-center justify-center md:justify-start gap-2 transition-colors"><ShieldCheck size={14} /> Privacy Policy</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="font-black text-[10px] tracking-[0.4em] uppercase italic text-slate-500">Contact Us</h5>
                <ul className="space-y-4 text-xs font-bold tracking-widest uppercase text-slate-400">
                  <li className="flex items-center justify-center md:justify-start gap-2"><MapPin size={14} /> Mortola St., Cagayan de Oro</li>
                  <li className="flex items-center justify-center md:justify-start gap-2"><Globe size={14} /> lcccdo.org</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="bg-white/5 mb-12" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-slate-600 text-[10px] font-black tracking-[0.4em] uppercase italic text-center">
            <p>Christ's Commission Fellowship &copy; 2026</p>
            <p className="text-white/20 hover:text-[#4CAF50] transition-colors cursor-default tracking-[1em]">Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicHome;