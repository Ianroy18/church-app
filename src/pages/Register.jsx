import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, UserPlus, Mail, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react';

function Register({ user, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user && role === 'admin') return <Navigate to="/admin" />;
  if (user && role === 'student') return <Navigate to="/dashboard" />;

  const passwordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#22c55e', '#22c55e'];
  const strength = passwordStrength();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({ id: data.user.id, email: data.user.email, role: 'student' });

        if (profileError) console.error("Profile creation error:", profileError);

        setSuccess('Account created! Check your email or sign in now.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    caretColor: '#22c55e',
  };
  const inputFocus = (e) => { e.target.style.borderColor = 'rgba(34,197,94,0.5)'; e.target.style.background = 'rgba(34,197,94,0.04)'; };
  const inputBlur = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.04)'; };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans py-10" style={{ background: '#060a10' }}>

      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[700px] h-[700px]" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 w-full max-w-[420px] px-5">

        {/* Brand header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl scale-150" style={{ background: 'rgba(34,197,94,0.2)' }} />
              <img
                src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507"
                alt="Logo"
                className="relative w-[64px] h-[64px] rounded-full object-cover border-2 transition-transform duration-500 group-hover:scale-110"
                style={{ borderColor: 'rgba(34,197,94,0.5)', boxShadow: '0 0 0 4px rgba(34,197,94,0.08), 0 20px 40px rgba(0,0,0,0.5)' }}
              />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-[0.2em] uppercase text-white">Join FBS</h1>
              <p className="text-[9px] font-black tracking-[0.4em] uppercase mt-0.5" style={{ color: 'rgba(253,216,53,0.7)' }}>
                Field Bible School
              </p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-[28px] overflow-hidden" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>

          {/* Top accent */}
          <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent)' }} />

          <div className="p-8">

            <div className="mb-7">
              <h2 className="text-[22px] font-black text-white tracking-tight leading-none mb-1.5">Create account</h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Register as a student
              </p>
            </div>

            {/* Error / Success */}
            {error && (
              <div className="mb-5 p-4 rounded-2xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p className="text-[11px] font-bold tracking-wider text-center" style={{ color: 'rgba(252,165,165,0.9)' }}>{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-5 p-4 rounded-2xl flex items-center gap-3" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <CheckCircle2 size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                <p className="text-[11px] font-bold tracking-wider" style={{ color: 'rgba(134,239,172,0.9)' }}>{success}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full h-[52px] pl-11 pr-4 text-sm font-medium text-white outline-none transition-all duration-200 rounded-2xl"
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    placeholder="Create a strong password"
                    className="w-full h-[52px] pl-11 pr-12 text-sm font-medium text-white outline-none transition-all duration-200 rounded-2xl"
                    style={inputStyle}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80">
                    {showPass ? <EyeOff size={16} style={{ color: 'rgba(255,255,255,0.3)' }} /> : <Eye size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />}
                  </button>
                </div>
                {/* Password strength bar */}
                {password && (
                  <div className="space-y-1.5 px-0.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{
                          background: i <= strength ? strengthColor[strength] : 'rgba(255,255,255,0.08)'
                        }} />
                      ))}
                    </div>
                    <p className="text-[9px] font-black tracking-widest uppercase" style={{ color: strengthColor[strength] }}>
                      {strengthLabel[strength]}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    placeholder="Repeat your password"
                    className="w-full h-[52px] pl-11 pr-12 text-sm font-medium text-white outline-none transition-all duration-200 rounded-2xl"
                    style={{
                      ...inputStyle,
                      borderColor: confirmPassword && confirmPassword !== password ? 'rgba(239,68,68,0.4)' : confirmPassword && confirmPassword === password ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'
                    }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80">
                    {showConfirm ? <EyeOff size={16} style={{ color: 'rgba(255,255,255,0.3)' }} /> : <Eye size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />}
                  </button>
                  {confirmPassword && confirmPassword === password && (
                    <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2" size={14} style={{ color: '#22c55e' }} />
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[52px] font-black text-[11px] tracking-[0.25em] uppercase text-white transition-all duration-300 rounded-2xl mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.25), inset 0 1px 0 rgba(255,255,255,0.1)' }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,197,94,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'; }}
              >
                {loading
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating Account...</>
                  : <><UserPlus size={14} /> Register as Student</>
                }
              </button>
            </form>
          </div>

          {/* Footer links */}
          <div className="px-8 pb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <div className="text-center space-y-3">
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Already have an account?{' '}
                <Link to="/login" className="font-bold" style={{ color: 'rgba(34,197,94,0.9)' }}>
                  Sign in here
                </Link>
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase transition-colors"
                style={{ color: 'rgba(255,255,255,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
              >
                <ArrowLeft size={12} /> Back to Home
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[9px] font-black tracking-[0.4em] uppercase mt-8" style={{ color: 'rgba(255,255,255,0.1)' }}>
          Field Bible School · Enrollment Portal
        </p>
      </div>
    </div>
  );
}

export default Register;