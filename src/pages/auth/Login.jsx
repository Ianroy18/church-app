import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { Loader2, ArrowLeft, ShieldCheck, Mail, Lock } from 'lucide-react';

function Login({ user, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user && role === 'admin') return <Navigate to="/admin" />;
  if (user && role === 'student') return <Navigate to="/dashboard" />;

  const executeLogin = async (emailValue, passwordValue) => {
    if (emailValue === 'admin@lcc.com' && passwordValue === 'admin123') {
      localStorage.setItem('demoUser', JSON.stringify({ uid: 'demo-admin-999', id: 'demo-admin-999', email: emailValue, role: 'admin' }));
      window.location.href = '/admin';
      return;
    }
    if (emailValue === 'student@lcc.com' && passwordValue === 'student123') {
      localStorage.setItem('demoUser', JSON.stringify({ uid: 'demo-student-777', id: 'demo-student-777', email: emailValue, role: 'student' }));
      window.location.href = '/dashboard';
      return;
    }
    if (emailValue === 'teacher@lcc.com' && passwordValue === 'teacher123') {
      localStorage.setItem('demoUser', JSON.stringify({ uid: 'demo-teacher-555', id: 'demo-teacher-555', email: emailValue, role: 'teacher' }));
      window.location.href = '/teacher';
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: emailValue, password: passwordValue });
    if (authError) throw authError;

    const { data: profile, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (roleError) console.warn("Role not found, defaulting to student.");
    const userRole = profile?.role || 'student';
    navigate(userRole === 'admin' ? '/admin' : '/dashboard');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await executeLogin(email, password);
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Try the demo access below.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (emailValue, passwordValue) => {
    setEmail(emailValue);
    setPassword(passwordValue);
    setLoading(true);
    setError('');

    try {
      await executeLogin(emailValue, passwordValue);
    } catch (err) {
      console.error(err);
      setError('Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans" style={{ background: '#060a10' }}>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.12),_transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(253,216,53,0.08),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(6,10,16,0.98),_rgba(6,10,16,0.88)_45%,_rgba(6,10,16,0.98))]" />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] px-5 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">

          <div className="p-10 text-center">
            <div className="inline-flex flex-col items-center gap-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-3xl bg-emerald-500/20" />
                <img
                  src="/lccagti.png"
                  alt="AGTI Logo"
                  className="relative mx-auto h-28 w-28 rounded-full border border-white/10 bg-slate-950 object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">Welcome to</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Ambassadors of Grace Training Institute (AGTI)! Equipping believers to understand the Bible,
                  grow in God&apos;s grace, and serve others through biblical teaching, discipleship, and Christ-centered ministry.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="mb-8 space-y-4 text-center">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-emerald-300/75">Welcome back</p>
              <h1 className="text-3xl font-black tracking-tight text-white">Sign in to your portal</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@agti.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-14 py-4 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                    style={{ caretColor: '#22c55e' }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-14 py-4 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                    style={{ caretColor: '#22c55e' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In to Portal'}
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-center space-y-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Demo Access</p>
                <p className="mt-3 text-sm text-slate-300">admin@lcc.com · admin123<br />teacher@lcc.com · teacher123<br />student@lcc.com · student123</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin@lcc.com', 'admin123')}
                  className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-emerald-500/10 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-emerald-200 transition hover:bg-emerald-500/15"
                >
                  Demo Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('teacher@lcc.com', 'teacher123')}
                  className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-sky-500/10 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-sky-200 transition hover:bg-sky-500/15"
                >
                  Demo Teacher
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('student@lcc.com', 'student123')}
                  className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-slate-100 transition hover:bg-slate-900/90"
                >
                  Demo Student
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-center text-sm text-slate-400">
              <Link to="/register" className="font-semibold text-slate-100 transition hover:text-emerald-300">Register here</Link>
              <Link to="/" className="inline-flex items-center justify-center gap-2 text-slate-500 transition hover:text-slate-200">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.35em] text-slate-500">
          Secured · Encrypted · LCC Portal
        </p>
      </div>
    </div>
  );
}

export default Login;