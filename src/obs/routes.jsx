import { Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminTeachers from './pages/admin/Teachers';
import AdminCourses from './pages/admin/Courses';
import { AdminAnalytics, AdminAssignments, AdminAnnouncements, AdminSettings } from './pages/admin/Placeholders';

// Teacher pages
import TeacherDashboard from './pages/teacher/Dashboard';
import {
  TeacherClasses,
  TeacherStudents,
  TeacherAssignments,
  TeacherGrades,
  TeacherAnnouncements,
  TeacherSettings,
} from './pages/teacher/Placeholders';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import {
  StudentCourses,
  StudentAssignments,
  StudentSchedule,
  StudentGrades,
  StudentAnnouncements,
  StudentSettings,
} from './pages/student/Placeholders';

export const obsRoutes = [
  {
    path: '/obs',
    element: <Outlet />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },

      // Admin Routes
      {
        path: 'admin',
        element: (
          <ProtectedRoute requiredRole="admin">
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'students', element: <AdminStudents /> },
          { path: 'teachers', element: <AdminTeachers /> },
          { path: 'courses', element: <AdminCourses /> },
          { path: 'analytics', element: <AdminAnalytics /> },
          { path: 'assignments', element: <AdminAssignments /> },
          { path: 'announcements', element: <AdminAnnouncements /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },

      // Teacher Routes
      {
        path: 'teacher',
        element: (
          <ProtectedRoute requiredRole="teacher">
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <TeacherDashboard /> },
          { path: 'classes', element: <TeacherClasses /> },
          { path: 'students', element: <TeacherStudents /> },
          { path: 'assignments', element: <TeacherAssignments /> },
          { path: 'grades', element: <TeacherGrades /> },
          { path: 'announcements', element: <TeacherAnnouncements /> },
          { path: 'settings', element: <TeacherSettings /> },
        ],
      },

      // Student Routes
      {
        path: 'student',
        element: (
          <ProtectedRoute requiredRole="student">
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <StudentDashboard /> },
          { path: 'courses', element: <StudentCourses /> },
          { path: 'assignments', element: <StudentAssignments /> },
          { path: 'schedule', element: <StudentSchedule /> },
          { path: 'grades', element: <StudentGrades /> },
          { path: 'announcements', element: <StudentAnnouncements /> },
          { path: 'settings', element: <StudentSettings /> },
        ],
      },

      {
        path: '*',
        element: <Navigate to="/obs/login" replace />,
      },
    ],
  },

  // Redirect /login to /obs/login
  {
    path: '/login',
    element: <Navigate to="/obs/login" replace />,
  },
];
