import { User } from 'lucide-react';

function ProfilePage({ user }) {
  const username = user?.email?.split('@')[0] || 'Student';
  const email = user?.email || 'student@example.com';

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-lg font-black tracking-tight text-slate-900">My Profile</h2>
        <p className="text-xs font-bold mt-0.5 text-slate-500">Account information and preferences</p>
      </div>
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
            <User size={24} />
          </div>
          <div>
            <p className="text-lg font-black text-slate-900">{username}</p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>

        <div className="space-y-3 text-slate-500">
          <p><span className="font-black text-slate-700">Role:</span> {user?.role || 'Student'}</p>
          <p><span className="font-black text-slate-700">Registered:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
          <p><span className="font-black text-slate-700">Recommendations:</span> Engage with lessons daily for faster progress.</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
