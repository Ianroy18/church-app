import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setProgress(5);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(email, password);

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/obs/admin/dashboard');
      } else if (result.user.role === 'teacher') {
        navigate('/obs/teacher/dashboard');
      } else if (result.user.role === 'student') {
        navigate('/obs/student/dashboard');
      }
    } else {
      setError(result.error);
    }

    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);
  };

  const demoAccounts = [
    { email: 'admin@agti.com', password: '123456', role: 'Admin' },
    { email: 'teacher@agti.com', password: '123456', role: 'Teacher' },
    { email: 'student@agti.com', password: '123456', role: 'Student' },
  ];

  const fillDemoAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-8 top-8 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-8 bottom-8 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full overflow-hidden rounded-[40px] border border-white/10 bg-slate-950/95 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[1.1fr_0.95fr]">
            <div className="relative hidden overflow-hidden bg-slate-900 px-10 py-12 text-white lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),transparent_35%)]" />
              <div className="relative z-10 max-w-[420px]">
                <div className="mb-8">
                  <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-950 shadow-xl">
                    <img
                      src="/lccagti.png"
                      alt="AGTI Logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="text-4xl font-black tracking-tight">Ambassadors of Grace</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    AGTI equips believers to understand Scripture, grow in grace, and serve their community through Biblically grounded online training.
                  </p>
                </div>

                <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Start your journey</p>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li>• Access teacher and student dashboards</li>
                    <li>• Track assignments, grades, and classes</li>
                    <li>• Download study resources instantly</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <div className="max-w-xl">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-300">AGTI Portal</p>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-white">Sign in to your account</h1>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Enter your email and password to continue. Use any demo account to preview the teacher or student experience.
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 text-red-400" size={18} />
                    <p>{error}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@agti.com"
                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/95 px-5 py-4 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">Password</label>
                  <div className="relative mt-3">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-3xl border border-white/10 bg-slate-900/95 px-5 py-4 pr-12 text-sm text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex w-full items-center justify-center gap-3 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  )}
                </motion.button>
                {loading && (
                  <div className="mt-4 overflow-hidden rounded-full bg-slate-900/80 border border-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </form>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Demo Accounts</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => fillDemoAccount(account)}
                      disabled={loading}
                      className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-left transition hover:border-emerald-400/30 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{account.role}</p>
                      <p className="mt-2 font-black text-sm text-white break-all">{account.email}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{account.password}</p>
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                Use the demo accounts to preview the teacher and student portals instantly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
