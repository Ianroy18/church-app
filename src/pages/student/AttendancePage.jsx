import { CheckCircle2 } from 'lucide-react';

function AttendancePage({ attendance }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-lg font-black tracking-tight text-slate-900">Digipass Attendance</h2>
        <p className="text-xs font-bold mt-0.5 text-slate-500">Your recent attendance records</p>
      </div>
      <div className="space-y-2">
        {attendance.length > 0 ? attendance.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between p-4 bg-white shadow-sm rounded-2xl border border-slate-100">
            <div>
              <p className="font-bold text-slate-900 text-sm">{entry.date || 'N/A'}</p>
              <p className="text-xs text-slate-500">{entry.time || 'No time logged'}</p>
            </div>
            <div className="text-green-600">
              <CheckCircle2 size={18} />
            </div>
          </div>
        )) : (
          <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl">No attendance data available</div>
        )}
      </div>
    </div>
  );
}

export default AttendancePage;
