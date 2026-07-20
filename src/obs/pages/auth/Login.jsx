import React, { useState } from 'react';
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(email, password);

    if (result.success) {
      // Redirect based on role
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

    setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden backdrop-blur-lg border border-slate-100">
          {/* Header */}
          <div
            className="h-24 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12" />
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">OBS</span>
              </div>
              <div>
                <h1 className="text-white font-black text-xl">AGTI</h1>
                <p className="text-white/60 text-xs font-bold">Online Bible School</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-600 text-sm">Sign in to your account to continue</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>

            {/* Demo Accounts Info */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs font-bold text-slate-600 mb-3 uppercase">Demo Accounts</p>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => fillDemoAccount(account)}
                    className="w-full text-left p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{account.role}</p>
                        <p className="text-xs text-slate-500">{account.email}</p>
                      </div>
                      <div className="text-xs font-mono text-slate-400 group-hover:text-slate-600">
                        {account.password}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              © 2024 AGTI Online Bible School. All rights reserved.
            </p>
          </div>
        </div>

        {/* Floating Decorations */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default Login;
