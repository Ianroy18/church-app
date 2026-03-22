import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, Navigate, Link } from 'react-router-dom';

function Register({ user, role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user && role === 'admin') return <Navigate to="/admin" />;
  if (user && role === 'student') return <Navigate to="/dashboard" />;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        // Create profile in the users table
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            role: 'student' // Default role
          });

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Even if profile fails, user was created in Auth. 
          // They might need to contact admin if profile doesn't show up.
        }

        setSuccess('Registration successful! Please check your email for verification (if enabled) or sign in.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[url('https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=125438837139151')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transform transition hover:scale-105">
            <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507" alt="Logo" className="w-24 h-24 rounded-full mx-auto shadow-2xl border-4 border-[#4CAF50] object-cover" />
            <h1 className="text-3xl font-extrabold mt-4 text-white tracking-wider uppercase">Join FBS</h1>
            <p className="text-[#FDD835] font-semibold text-sm tracking-widest uppercase mt-1">Field Bible School Enrollment</p>
          </Link>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-100 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all placeholder-gray-400 font-medium"
                placeholder="you@example.com"
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
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all placeholder-gray-400 font-medium"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#4CAF50] text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline hover:bg-[#388E3C] hover:shadow-[0_10px_20px_rgba(76,175,80,0.3)] transition-all transform hover:-translate-y-1 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Register as Student'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-300">
            <p>Already have an account? <Link to="/login" className="text-[#FDD835] hover:text-white font-semibold transition-colors">Sign In here</Link></p>
            <Link to="/" className="text-gray-400 hover:text-white mt-4 inline-block transition-colors">&larr; Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
