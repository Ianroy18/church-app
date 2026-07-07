import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  ArrowRight,
  Users,
  MessageCircle,
  ShieldCheck,
  Heart,
  Globe,
  X,
  CheckCircle,
  Phone,
} from 'lucide-react';

const ChatSupportSection = () => {
  const [leaders] = useState([
    { id: 1, name: 'Amb. Genard Ganapin', role: 'Ambassador', messenger: 'https://www.messenger.com/t/100047233473984', phone: '+63 912 345 6789' },
    { id: 2, name: 'Ptr. Blaine Jakosalem', role: 'Lead Pastor', messenger: 'https://m.me/BlaineJakosalem', phone: '+63 918 765 4321' },
    { id: 3, name: 'Sis. Maria Santos', role: 'Prayer Team Lead', messenger: 'https://m.me/MariaSantos', phone: '+63 917 555 1234' },
  ]);
  const [selectedLeader, setSelectedLeader] = useState(null);

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

          <DialogContent className="sm:max-w-[700px] bg-slate-900 border-none text-white p-0 overflow-hidden shadow-2xl">
            <div className="relative">
              <div className="relative h-40 bg-gradient-to-br from-[#4CAF50] via-[#45a049] to-[#3d8b40] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <img src="/lcc1.png" className="w-full h-full object-cover scale-150 rotate-12" alt="bg" />
                </div>
                <div className="absolute top-4 right-4">
                  <DialogClose className="text-white/70 hover:text-white transition-colors">
                    <X size={24} />
                  </DialogClose>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="relative z-10 flex items-center gap-4"
                >
                  <Heart className="h-12 w-12 text-white animate-pulse" />
                  <div className="text-left">
                    <h1 className="text-2xl font-['Bebas_Neue',_sans-serif] italic tracking-wide text-white uppercase">
                      Prayer Support
                    </h1>
                    <p className="text-white/80 text-sm">We're here for you</p>
                  </div>
                </motion.div>
              </div>

              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-[#4CAF50]" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Connect with Leaders</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {leaders.map((leader, index) => (
                      <motion.button
                        key={leader.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        onClick={() => setSelectedLeader(leader)}
                        className={`w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border rounded-2xl transition-all duration-300 group text-left ${
                          selectedLeader?.id === leader.id
                            ? 'border-[#4CAF50] bg-[#4CAF50]/20 shadow-lg shadow-[#4CAF50]/20'
                            : 'border-white/10 hover:border-[#4CAF50]/50'
                        }`}
                      >
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          selectedLeader?.id === leader.id
                            ? 'bg-[#4CAF50] text-white scale-110'
                            : 'bg-[#4CAF50]/20 text-[#4CAF50] group-hover:scale-105'
                        }`}>
                          {leader.role === 'Ambassador' && <Globe size={20} />}
                          {leader.role === 'Lead Pastor' && <Heart size={20} />}
                          {leader.role === 'Prayer Team Lead' && <ShieldCheck size={20} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-base uppercase tracking-wider text-white group-hover:text-[#4CAF50] transition-colors">
                            {leader.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 tracking-[0.1em] uppercase">{leader.role}</p>
                        </div>
                        {selectedLeader?.id === leader.id && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[#4CAF50]">
                            <CheckCircle size={20} />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {selectedLeader && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-[#4CAF50]/10 to-[#45a049]/10 border border-[#4CAF50]/30 rounded-2xl p-6 mb-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white">
                        {selectedLeader.role === 'Ambassador' && <Globe size={16} />}
                        {selectedLeader.role === 'Lead Pastor' && <Heart size={16} />}
                        {selectedLeader.role === 'Prayer Team Lead' && <ShieldCheck size={16} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white">{selectedLeader.name}</h4>
                        <p className="text-[#4CAF50] text-sm font-medium">{selectedLeader.role}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <a
                        href={selectedLeader.messenger}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-white hover:text-[#4CAF50] transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-xl"
                      >
                        <MessageCircle size={18} />
                        <span className="text-sm font-medium">Message on Messenger</span>
                        <ArrowRight size={16} className="ml-auto" />
                      </a>
                      <div className="flex items-center gap-3 text-slate-300 p-3 bg-white/5 rounded-xl">
                        <Phone size={18} />
                        <span className="text-sm">{selectedLeader.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/60 text-sm uppercase tracking-wider">Or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-4">
                  <a
                    href="https://m.me/LifeCareCenterCDO"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="h-14 w-14 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] group-hover:scale-110 transition-transform">
                      <MessageCircle size={28} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-base uppercase tracking-wider">General Messenger</h4>
                      <p className="text-[10px] text-slate-400 tracking-[0.1em] uppercase">Talk to our counselors now</p>
                    </div>
                  </a>

                  <button className="w-full flex items-center gap-5 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 group text-left">
                    <div className="h-14 w-14 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] group-hover:scale-110 transition-transform">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base uppercase tracking-wider">Prayer Request</h4>
                      <p className="text-[10px] text-slate-400 tracking-[0.1em] uppercase">Private and confidential request</p>
                    </div>
                  </button>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-[10px] text-slate-500 text-center italic mt-8 uppercase tracking-widest">
                  "Where two or three are gathered in my name, there am I."
                </motion.p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ChatSupportSection;
