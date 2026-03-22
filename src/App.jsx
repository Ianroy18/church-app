import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo Mode Bypass
    const demo = localStorage.getItem('demoUser');
    if (demo) {
      const dUser = JSON.parse(demo);
      setUser(dUser);
      setRole(dUser.role);
      setLoading(false);
      return;
    }

    // Check current session on load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
      if (error || !data) {
        setRole('student');
      } else {
        setRole(data.role);
      }
    } catch {
      setRole('student');
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F4F7F6]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const ProtectedRoute = ({ children, requireAdmin, requireStudent }) => {
    if (!user) return <Navigate to="/login" />;
    if (requireAdmin && role !== 'admin') return <Navigate to="/dashboard" />;
    if (requireStudent && role !== 'student') return <Navigate to="/admin" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login user={user} role={role} />} />
        <Route path="/register" element={<Register user={user} role={role} />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute requireStudent={true}>
            <StudentDashboard user={user} />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard user={user} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
