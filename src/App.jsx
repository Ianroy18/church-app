import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Pages imports
import PublicHome from './pages/PublicHome';
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

// OBS Imports
import { AuthProvider } from './obs/contexts/AuthContext';
import { obsRoutes } from './obs/routes';

function App() {

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

  return (
    <Router>
      <AuthProvider>
        <ScrollToHash />
        <FaviconController />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHome />} />
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

          {/* OBS Routes (Online Bible School) */}
          {obsRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children && route.children.map((child) => (
                <Route key={child.path} path={child.path} element={child.element}>
                  {child.children && child.children.map((grandchild) => (
                    <Route key={grandchild.path} path={grandchild.path} element={grandchild.element} />
                  ))}
                </Route>
              ))}
            </Route>
          ))}

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ChatBot />
      </AuthProvider>
    </Router>
  );
}

export default App;