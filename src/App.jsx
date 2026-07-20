import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// Pages imports
import PublicHome from './pages/PublicHome';
import Login from './pages/auth/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ChatBot from './components/ChatBot';
import Resources from './pages/Resources';
import MagazineFeed from './pages/MagazineFeed';
import Articles from './pages/Articles';
import SundayMessages from './pages/SundayMessages';
import MemoryVerses from './pages/MemoryVerses';
import FourWSGuide from './pages/FourWSGuide';
import Chronicle from './pages/Chronicle';
import GrowthMaterials from './pages/GrowthMaterials';
import GLCModules from './pages/GLCModules';
import Motivate from './pages/Motivate';
import NextStepsNewHere from './pages/NextStepsNewHere';
import NextStepsJoinDGroup from './pages/NextStepsJoinDGroup';
import NextStepsStartServing from './pages/NextStepsStartServing';
import AdminContentManager from './pages/AdminContentManager';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demo = localStorage.getItem('demoUser');
    if (demo) {
      const dUser = JSON.parse(demo);
      setUser(dUser);
      setRole(dUser.role);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      }
      setLoading(false);
    });

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

  const ScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
      if (hash) {
        const target = document.getElementById(hash.replace('#', ''));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [hash]);

    return null;
  };

  const FaviconController = () => {
    const location = useLocation();

    useEffect(() => {
      const faviconLink = document.querySelector("link[rel='icon']") || document.createElement('link');
      const nextHref = '/lccagti.png';

      faviconLink.rel = 'icon';
      faviconLink.type = 'image/png';
      faviconLink.href = nextHref;

      if (!document.head.contains(faviconLink)) {
        document.head.appendChild(faviconLink);
      }
    }, [location.pathname]);

    return null;
  };

  const ProtectedRoute = ({ children, requireAdmin, requireStudent, requireTeacher }) => {
    if (!user) return <Navigate to="/login" />;
    if (requireAdmin && role !== 'admin') return <Navigate to="/login" />;
    if (requireStudent && role !== 'student') return <Navigate to="/login" />;
    if (requireTeacher && role !== 'teacher') return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <ScrollToHash />
      <FaviconController />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login user={user} role={role} />} />
        <Route path="/register" element={<Register user={user} role={role} />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/magazine" element={<MagazineFeed />} />
        <Route path="/resources/articles" element={<Articles />} />
        <Route path="/resources/messages" element={<SundayMessages />} />
        <Route path="/resources/verses" element={<MemoryVerses />} />
        <Route path="/resources/4ws" element={<FourWSGuide />} />
        <Route path="/resources/chronicle" element={<Chronicle />} />
        <Route path="/resources/growth" element={<GrowthMaterials />} />
        <Route path="/resources/glc" element={<GLCModules />} />
        <Route path="/resources/motivate" element={<Motivate />} />
        <Route path="/nextsteps/new-here" element={<NextStepsNewHere />} />
        <Route path="/nextsteps/join-d-group" element={<NextStepsJoinDGroup />} />
        <Route path="/nextsteps/start-serving" element={<NextStepsStartServing />} />

        {/* Protected Student Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute requireStudent={true}>
            <StudentDashboard user={user} role={role} />
          </ProtectedRoute>
        } />

        {/* Protected Teacher Routes */}
        <Route path="/teacher" element={
          <ProtectedRoute requireTeacher={true}>
            <TeacherDashboard user={user} role={role} />
          </ProtectedRoute>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard user={user} role={role} />
          </ProtectedRoute>
        } />
        <Route path="/admin/content" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminContentManager user={user} role={role} />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ChatBot />
    </Router>
  );
}

export default App;