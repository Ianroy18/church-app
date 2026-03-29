import { Calendar } from 'lucide-react';

function SchedulePage({ schedule }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-lg font-black tracking-tight text-slate-900">Event Timeline</h2>
        <p className="text-xs font-bold mt-0.5 text-slate-500">Upcoming sessions and events</p>
      </div>
      <div className="space-y-3">
        {schedule.length > 0 ? schedule.map((item) => (
          <article key={item.id} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-100 text-orange-600">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                <p className="text-[10px] mt-2 uppercase tracking-wide text-slate-400">{item.date} {item.time ? `• ${item.time}` : ''}</p>
              </div>
            </div>
          </article>
        )) : (
          <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">No scheduled events yet</div>
        )}
      </div>
    </div>
  );
}

export default SchedulePage;
