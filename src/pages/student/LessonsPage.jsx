import { BookOpen, FileText } from 'lucide-react';

function LessonsPage({ lessons }) {
  const card = {
    background: 'rgba(255,255,255,0.98)',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    borderRadius: '24px',
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-black tracking-tight text-slate-900">Course Materials</h2>
        <p className="text-xs font-bold mt-0.5 text-slate-500">Latest published doctrine modules</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lessons.length > 0 ? lessons.map(l => (
          <div key={l.id} className="group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1" style={card}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 text-purple-600" style={{ background: 'rgba(167,139,250,0.1)' }}>
              <BookOpen size={22} strokeWidth={2} />
            </div>
            <h3 className="font-black text-base mb-2 text-slate-900">{l.title}</h3>
            <p className="text-xs leading-relaxed flex-1 mb-5 text-slate-500">{l.description}</p>
            {l.file_url ? (
              <a href={l.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-black tracking-wider uppercase px-4 py-2.5 rounded-xl border transition-all duration-200" style={{ borderColor: 'rgba(124,58,237,0.2)', color: '#7c3aed', background: 'rgba(124,58,237,0.08)' }}>
                <FileText size={13} /> Access PDF
              </a>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">No PDF link</span>
            )}
          </div>
        )) : (
          <div className="col-span-3 text-center py-16 text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-bold">No modules published yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonsPage;
