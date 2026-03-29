import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Users, BookOpen, Sparkles } from 'lucide-react';

const NextStepsNewHere = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-['Montserrat']">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-sm font-bold uppercase tracking-wider text-[#4CAF50] hover:text-[#3d8b40]"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <section className="bg-white rounded-3xl border border-slate-200 shadow-lg p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-[#4CAF50] flex items-center justify-center text-white">
                <Users size={28} />
              </div>
              <div>
                <h1 className="text-4xl font-['Bebas_Neue'] uppercase">I&apos;m New Here</h1>
                <p className="text-slate-500 mt-1">First steps for new members to connect, grow, and get started.</p>
              </div>
            </div>

            <p className="mb-6 text-slate-700 leading-relaxed">
              Welcome to the Grace and Truth Life Care Centre community. This page guides you step-by-step into your first weeks:
            </p>

            <ol className="list-decimal list-inside space-y-3 text-slate-700">
              <li><strong>Meet the Team:</strong> Join the next orientation and get to know church leaders.</li>
              <li><strong>Connect in Community:</strong> Attend our Sunday service and one D-Group meeting.</li>
              <li><strong>Learn the Values:</strong> Study purpose, vision, and core values from the 4WS guide.</li>
              <li><strong>Take the Next Step:</strong> Select a volunteer track and submit your information in the contact section.</li>
            </ol>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: BookOpen, title: 'Read 4WS Guide', desc: 'Start with the discipleship framework.', link: '/resources/4ws' },
                { icon: Sparkles, title: 'Motivation Boost', desc: 'Daily encouragement for new believers.', link: '/resources/motivate' },
                { icon: Users, title: 'Join D-Group', desc: 'Find the group that fits you.', link: '/resources/d-group' }
              ].map((item) => (
                <a href={item.link} key={item.title} className="block rounded-2xl border border-slate-200 p-5 hover:bg-[#f1f5f9] transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4CAF50] text-white flex items-center justify-center"><item.icon size={18} /></div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NextStepsNewHere;
