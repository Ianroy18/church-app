function AttendanceTab({ attendanceLogs }) {
  const card = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    borderRadius: '24px',
  };

  return (
    <div style={card} className="p-6">
      <h2 className="font-black text-lg mb-4 text-slate-900">Live Attendance</h2>
      <div className="space-y-2">
        {attendanceLogs.map((log, i) => (
          <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-xl">
            <span className="font-bold text-sm text-slate-700">{log?.users?.email || 'Unknown'}</span>
            <span className="text-xs text-green-600">{log?.time || 'N/A'}</span>
          </div>
        ))}
        {attendanceLogs.length === 0 && (
          <div className="p-4 text-slate-400 border border-dashed border-slate-200 rounded-xl">No attendance logs found</div>
        )}
      </div>
    </div>
  );
}

export default AttendanceTab;
