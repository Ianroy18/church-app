import { Trash2, Search, Users } from 'lucide-react';

function UsersTab({ filteredUsers, searchQuery, setSearchQuery, deleteRecord }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', borderRadius: '24px' }}>
      <div className="px-8 py-6 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.1)' }}>
            <Users size={18} style={{ color: '#2563eb' }} />
          </div>
          <div>
            <h2 className="font-black text-base text-slate-800">User Directory</h2>
            <p className="text-[10px] font-bold text-slate-400">{filteredUsers.length} registered accounts</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: '#94a3b8' }} />
          <input
            placeholder="Search students..."
            className="pl-10 pr-4 h-10 text-sm rounded-xl outline-none transition-all"
            style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)', color: '#0f172a', width: 220 }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full">
        <thead style={{ background: 'rgba(0,0,0,0.02)' }}>
          <tr>
            <th className="px-8 py-4 text-left text-[9px] font-black tracking-[0.3em] uppercase text-slate-400">Email Address</th>
            <th className="px-8 py-4 text-left text-[9px] font-black tracking-[0.3em] uppercase text-slate-400">Role</th>
            <th className="px-8 py-4 text-right text-[9px] font-black tracking-[0.3em] uppercase text-slate-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, i) => (
            <tr key={i} className="transition-all duration-150" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <td className="px-8 py-5 text-sm font-bold text-slate-800">{u.email}</td>
              <td className="px-8 py-5">
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl" style={{ background: u.role === 'admin' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)', color: u.role === 'admin' ? '#dc2626' : '#16a34a' }}>
                  {u.role}
                </span>
              </td>
              <td className="px-8 py-5 text-right">
                <button onClick={() => deleteRecord('users', u.id)} className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTab;
