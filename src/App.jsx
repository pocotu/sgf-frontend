import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/layouts/AuthLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UsersPage from './pages/dashboard/users/UsersPage';
import StudentsPage from './pages/dashboard/students/StudentsPage';
import StudentDetailPage from './pages/dashboard/students/StudentDetailPage';
import CoursesPage from './pages/dashboard/courses/CoursesPage';
import GroupsPage from './pages/dashboard/groups/GroupsPage';
import GroupDetailPage from './pages/dashboard/groups/GroupDetailPage';
import GroupAttendancePage from './pages/dashboard/groups/GroupAttendancePage';
import StudentAttendancePage from './pages/dashboard/students/StudentAttendancePage';
import EvaluationsPage from './pages/dashboard/evaluations/EvaluationsPage';
import GradesRegisterPage from './pages/dashboard/grades/GradesRegisterPage';
// import RegisterPage from './pages/auth/RegisterPage'; // To be implemented

// Guard component to protect routes
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from './store/auth.store';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to dashboard (which helps check auth) or login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<div>Registro (Pendiente)</div>} />
          <Route index element={<Navigate to="login" replace />} />
        </Route>

        {/* Dashboard Routes (Protected) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="usuarios" element={<UsersPage />} />
          <Route path="estudiantes" element={<StudentsPage />} />
          <Route path="estudiantes/:id" element={<StudentDetailPage />} />
          <Route path="cursos" element={<CoursesPage />} />
          <Route path="evaluaciones" element={<EvaluationsPage />} />
          <Route path="notas" element={<GradesRegisterPage />} />
          <Route path="grupos" element={<GroupsPage />} />
          <Route path="grupos/:id" element={<GroupDetailPage />} />
          <Route path="grupos/:id/asistencia" element={<GroupAttendancePage />} />
          <Route path="mis-asistencias" element={<StudentAttendancePage />} />
          {/* Add more dashboard sub-routes here later */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
