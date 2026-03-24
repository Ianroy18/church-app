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
import { Loader2, ArrowLeft, ShieldCheck, Mail, Lock } from "lucide-react";

function Login({ user, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if na-detect na may active session na
  if (user && role === 'admin') return <Navigate to="/admin" />;
  if (user && role === 'student') return <Navigate to="/dashboard" />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // --- DEMO MODE BYPASS ---
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

      // Kuhaon ang role gikan sa 'users' table base sa auth ID
      const { data: profile, error: roleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (roleError) {
        console.warn("Role not found, defaulting to student.");
      }

      const userRole = profile?.role || 'student';
      navigate(userRole === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Subukan ang demo access kung wala pang account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-950 font-sans">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1456105935968197"
          alt="Background"
          className="w-full h-full object-cover opacity-30 scale-110 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[450px] px-6">
        {/* Logo Section */}
        <div className="text-center mb-10 group">
          <Link to="/" className="inline-block transition-transform duration-300 group-hover:scale-110">
            <img
              src="/favicon.png"
              alt="Logo"
              className="w-20 h-20 rounded-full mx-auto border-4 border-[#4CAF50] shadow-[0_0_40px_rgba(76,175,80,0.5)] object-cover"
              onError={(e) => { e.target.src = "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507"; }}
            />
          </Link>

          {/* Kani nga part ang na-usab */}
          <h2 className="text-white text-3xl font-black tracking-tighter uppercase italic mt-4">
          </h2>

          <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase italic">
            Grace & Truth Life Care Centre
          </p>
        </div>
        {/* Shadcn Card Login Form */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6 text-center md:text-left">
            <CardTitle className="text-xl font-black text-white italic uppercase tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400 text-xs font-bold uppercase tracking-widest">Enter your credentials to continue</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/50 text-red-200 rounded-2xl animate-shake">
                <AlertDescription className="text-[11px] font-bold uppercase tracking-wider text-center">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-slate-300 text-[10px] font-black uppercase tracking-[2px] ml-1">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#4CAF50] transition-colors" size={18} />
                  <Input
                    type="email"
                    placeholder="name@lcc.com"
                    className="bg-white/5 border-white/10 text-white pl-12 h-14 rounded-2xl focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all placeholder:text-slate-600 border-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 text-[10px] font-black uppercase tracking-[2px] ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#4CAF50] transition-colors" size={18} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white pl-12 h-14 rounded-2xl focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-all placeholder:text-slate-600 border-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#4CAF50] hover:bg-[#439c47] text-white font-black text-xs tracking-[0.2em] uppercase italic rounded-2xl shadow-[0_10px_30px_rgba(76,175,80,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...</> : 'Sign In To Portal'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pt-2 pb-8">
            {/* Demo Access Info */}
            <div className="w-full bg-slate-900/50 p-4 rounded-2xl border border-white/5 text-center">
              <p className="text-[10px] font-black text-[#FDD835] uppercase mb-1 tracking-widest flex items-center justify-center gap-2">
                <ShieldCheck size={12} /> Demo Access Enabled
              </p>
              <code className="text-[10px] text-slate-400 block">admin@lcc.com | admin123</code>
            </div>

            {/* Bottom Links */}
            <div className="text-center space-y-4">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                Don't have an account? {" "}
                <Link to="/register" className="text-[#4CAF50] hover:underline decoration-dotted transition-colors">Register Now</Link>
              </p>
              <Link to="/" className="text-slate-600 hover:text-white flex items-center justify-center gap-2 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
                <ArrowLeft size={14} /> Back to Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;