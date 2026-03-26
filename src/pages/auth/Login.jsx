import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { cn } from "@/lib/utils";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Icons
import { Loader2, ArrowLeft, ShieldCheck, Mail, Lock, Sparkles } from "lucide-react";

function Login({ user, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user && role === 'admin') return <Navigate to="/admin" />;
  if (user && role === 'student') return <Navigate to="/dashboard" />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'admin@lcc.com' && password === 'admin123') {
      localStorage.setItem('demoUser', JSON.stringify({ uid: 'demo-admin-999', id: 'demo-admin-999', email, role: 'admin' }));
      window.location.href = '/admin';
      return;
    }
    if (email === 'student@lcc.com' && password === 'student123') {
      localStorage.setItem('demoUser', JSON.stringify({ uid: 'demo-student-777', id: 'demo-student-777', email, role: 'student' }));
      window.location.href = '/dashboard';
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      const { data: profile, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (roleError) console.warn("Role not found, defaulting to student.");
      const userRole = profile?.role || 'student';
      navigate(userRole === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Try the demo access below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans" style={{ background: '#060a10' }}>

      {/* Multi-layer cinematic background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1456105935968197"
          alt="Background"
          className="w-full h-full object-cover opacity-20 scale-105"
          style={{ filter: 'saturate(0.4)' }}
        />
        {/* Layered gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,10,16,0.97) 0%, rgba(6,10,16,0.7) 50%, rgba(6,10,16,0.97) 100%)' }} />
        {/* Green light leak top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px]" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)' }} />
        {/* Warm light leak bottom-left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]" style={{ background: 'radial-gradient(circle, rgba(253,216,53,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 w-full max-w-[420px] px-5">

        {/* Logo + Brand */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl scale-150" style={{ background: 'rgba(34,197,94,0.25)' }} />
              <img
                src="/favicon.png"
                alt="Logo"
                className="relative w-[72px] h-[72px] rounded-full object-cover border-2 transition-transform duration-500 group-hover:scale-110"
                style={{ borderColor: 'rgba(34,197,94,0.6)', boxShadow: '0 0 0 4px rgba(34,197,94,0.1), 0 20px 40px rgba(0,0,0,0.5)' }}
                onError={(e) => { e.target.src = "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507"; }}
              />
            </div>
            <div>
              <p className="text-[9px] font-black tracking-[0.45em] uppercase" style={{ color: 'rgba(34,197,94,0.7)', letterSpacing: '0.4em' }}>
                Grace & Truth Life Care Centre
              </p>
            </div>
          </Link>
        </div>

        {/* Main Card */}
        <div className="rounded-[28px] overflow-hidden" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>

          {/* Card top accent line */}
          <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent)' }} />

          <div className="p-8">

            <div className="mb-7">
              <h1 className="text-[22px] font-black text-white tracking-tight leading-none mb-1.5">Welcome back</h1>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Sign in to your portal
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl text-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p className="text-[11px] font-bold tracking-wider" style={{ color: 'rgba(252,165,165,0.9)' }}>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <input
                    type="email"
                    placeholder="name@lcc.com"
                    className="w-full h-[52px] pl-11 pr-4 text-sm font-medium text-white outline-none transition-all duration-200 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      caretColor: '#22c55e',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.5)'; e.target.style.background = 'rgba(34,197,94,0.04)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="w-full h-[52px] pl-11 pr-4 text-sm font-medium text-white outline-none transition-all duration-200 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      caretColor: '#22c55e',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.5)'; e.target.style.background = 'rgba(34,197,94,0.04)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[52px] font-black text-[11px] tracking-[0.25em] uppercase text-white transition-all duration-300 rounded-2xl mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.25), 0 1px 0 rgba(255,255,255,0.1) inset' }}
                onMouseEnter={e => { if (!loading) e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 12px 32px rgba(34,197,94,0.35), 0 1px 0 rgba(255,255,255,0.1) inset'; }}
                onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 24px rgba(34,197,94,0.25), 0 1px 0 rgba(255,255,255,0.1) inset'; }}
              >
                {loading
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Authenticating...</>
                  : 'Sign In to Portal'
                }
              </button>

            </form>
          </div>

          {/* Demo Access + Footer */}
          <div className="px-8 pb-8 space-y-5">

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>demo</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Demo Badge */}
            <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(253,216,53,0.04)', border: '1px solid rgba(253,216,53,0.12)' }}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldCheck size={12} style={{ color: '#FDD835' }} />
                <span className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#FDD835' }}>Demo Access</span>
              </div>
              <code className="text-[10px] block" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
                admin@lcc.com · admin123
              </code>
            </div>

            {/* Links */}
            <div className="text-center space-y-3">
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                No account yet?{' '}
                <Link to="/register" className="font-bold transition-colors" style={{ color: 'rgba(34,197,94,0.9)' }}
                  onMouseEnter={e => e.target.style.color = '#22c55e'}
                  onMouseLeave={e => e.target.style.color = 'rgba(34,197,94,0.9)'}
                >
                  Register here
                </Link>
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.2)'}
              >
                <ArrowLeft size={12} /> Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom micro-text */}
        <p className="text-center text-[9px] font-black tracking-[0.4em] uppercase mt-8" style={{ color: 'rgba(255,255,255,0.1)' }}>
          Secured · Encrypted · LCC Portal v2
        </p>
      </div>
    </div>
  );
}

export default Login;