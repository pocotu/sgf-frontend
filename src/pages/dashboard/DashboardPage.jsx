import React from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../store/auth.store';
import AdminDashboard from '../../components/dashboard/home/AdminDashboard';
import TeacherDashboard from '../../components/dashboard/home/TeacherDashboard';
import StudentDashboard from '../../components/dashboard/home/StudentDashboard';

const DashboardPage = () => {
  const user = useAtomValue(userAtom);

  // Return the appropriate dashboard based on user role
  if (!user) {return null;}

  switch (user.rol) {
    case 'admin':
      return <AdminDashboard />;
    case 'docente':
      return <TeacherDashboard />;
    case 'estudiante': 
      return <StudentDashboard />;
    default:
      // Fallback for unknown roles
      return (
        <div className="text-center py-20">
           <h2 className="text-2xl font-bold text-slate-800">Bienvenido al SGA-P</h2>
           <p className="text-slate-500">Tu rol no tiene un panel asignado.</p>
        </div>
      );
  }
};

export default DashboardPage;
