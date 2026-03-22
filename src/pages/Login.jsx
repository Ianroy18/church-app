import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, Navigate, Link } from 'react-router-dom';

function Login({ user, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
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
    // ------------------------

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      // Fetch role from users table
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();

      const userRole = profile?.role || 'student';
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Try demo: admin@lcc.com / admin123 or student@lcc.com / student123');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[url('https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1456105935968197')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transform transition hover:scale-105">
            <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507" alt="Logo" className="w-24 h-24 rounded-full mx-auto shadow-2xl border-4 border-[#4CAF50] object-cover" />
            <h1 className="text-3xl font-extrabold mt-4 text-white tracking-wider">GRACE & TRUTH</h1>
            <p className="text-[#FDD835] font-semibold text-sm tracking-widest uppercase mt-1">Life Care Centre Inc.</p>
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all placeholder-gray-400 font-medium"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all placeholder-gray-400 font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#4CAF50] text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline hover:bg-[#388E3C] hover:shadow-[0_10px_20px_rgba(76,175,80,0.3)] transition-all transform hover:-translate-y-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-300">
            <p className="mb-2">DEMO ACCESS: <strong>admin@lcc.com</strong> (admin123) <br /> <strong>student@lcc.com</strong> (student123)</p>
            <p>Don't have an FBS account? <Link to="/register" className="text-[#FDD835] hover:text-white font-semibold transition-colors underline">Register here</Link></p>
            <Link to="/" className="text-gray-400 hover:text-white mt-4 inline-block transition-colors">&larr; Return to Public Website</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
