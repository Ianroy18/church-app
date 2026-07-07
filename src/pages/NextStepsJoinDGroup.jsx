import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Users, MessageCircle } from 'lucide-react';

const NextStepsJoinDGroup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-['Montserrat']">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="mb-8 text-sm font-bold uppercase tracking-wider text-[#4CAF50] hover:text-[#3d8b40]">
            <ArrowLeft size={16} /> Back
          </button>

          <section className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-[#FFC107] flex items-center justify-center text-white">
                <Users size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-['Bebas_Neue'] uppercase">Join a D-Group</h1>
                <p className="text-slate-500 mt-1">Small group discipleship for meaningful spiritual growth.</p>
              </div>
            </div>

            <p className="mb-6 text-slate-700 leading-relaxed">
              D-Groups are the heartbeat of our church community. Discover where to connect, what each group focuses on, and sign up for upcoming meetings.
            </p>

            <div className="space-y-4">
              {[
                { title: 'Newcomers', times: 'Wed 7PM', purpose: 'Intro to faith basics and community', color: 'bg-[#4CAF50]' },
                { title: 'Discipleship', times: 'Thu 6PM', purpose: 'Bible study and spiritual habits', color: 'bg-[#2196F3]' },
                { title: 'Service', times: 'Sat 4PM', purpose: 'Outreach planning and mission training', color: 'bg-[#FF5722]' }
              ].map((group) => (
                <div key={group.title} className="rounded-2xl border border-slate-200 p-4 flex justify-between items-center"> 
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{group.title}</h3>
                    <p className="text-sm text-slate-500">{group.purpose}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-white font-black text-xs ${group.color}`}>{group.times}</div>
                </div>
              ))}
            </div>

            <Link to="/resources/glc" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#4CAF50] text-white px-5 py-3 font-bold uppercase tracking-wider hover:bg-[#3d8b40] transition">
              <MessageCircle size={16} /> Register For D-Group
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NextStepsJoinDGroup;
