import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import { userAtom } from '../../store/auth.store';
import { AuthService } from '../../services/auth.service';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/auth/login');
  };

  const navItems = [
    { name: 'Inicio', path: '/dashboard', icon: '🏠' },
    { name: 'Usuarios', path: '/dashboard/usuarios', icon: '👥', roles: ['admin'] },
    { name: 'Estudiantes', path: '/dashboard/estudiantes', icon: '🎓', roles: ['admin', 'docente'] },
    { name: 'Estudiantes', path: '/dashboard/estudiantes', icon: '🎓', roles: ['admin', 'docente'] },
    { name: 'Cursos', path: '/dashboard/cursos', icon: '📚' },
    { name: 'Grupos', path: '/dashboard/grupos', icon: '🏫', roles: ['admin', 'docente'] },
    { name: 'Mis Asistencias', path: '/dashboard/mis-asistencias', icon: '📅', roles: ['estudiante'] },
    // Add more items here
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-primary-700 tracking-tight">SGA-P</h1>
          <p className="text-xs text-slate-400 mt-1">Panel de Control</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems
            .filter(item => !item.roles || (user?.rol && item.roles.includes(user.rol)))
            .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'} // Only exact match for root dashboard
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 text-primary-700 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
              {user?.nombres?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.nombres}</p>
              <p className="text-xs text-slate-500 truncate capitalize">{user?.rol}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
