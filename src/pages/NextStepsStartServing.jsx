import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Users, Calendar, Handshake } from 'lucide-react';

const NextStepsStartServing = () => {
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
              <div className="w-14 h-14 rounded-xl bg-[#2196F3] flex items-center justify-center text-white">
                <Handshake size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-['Bebas_Neue'] uppercase">Start Serving</h1>
                <p className="text-slate-500 mt-1">Harness your gifts to bless church and community.</p>
              </div>
            </div>

            <p className="mb-6 text-slate-700 leading-relaxed">
              Serving is one of the richest ways to grow spiritually and build community. Choose a ministry track and join us.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Worship Team', icon: Users, desc: 'Lead praise with heart and creativity.' },
                { title: 'Outreach', icon: Handshake, desc: 'Serve neighbors and share hope.' },
                { title: 'Logistics', icon: Calendar, desc: 'Support events and ministry operations.' }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 p-5 hover:border-[#4CAF50] transition">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#4CAF50] text-white flex items-center justify-center"><item.icon size={16} /></div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/resources/messages" className="inline-flex items-center gap-2 rounded-full bg-[#4CAF50] text-white px-5 py-3 font-bold uppercase tracking-wider hover:bg-[#3d8b40] transition">
              <Calendar size={16} /> View Serving Calendar
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NextStepsStartServing;
