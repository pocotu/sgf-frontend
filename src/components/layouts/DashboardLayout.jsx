import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSetAtom, useAtomValue } from 'jotai';
import { userAtom } from '../../store/auth.store';
import { AuthService } from '../../services/auth.service';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/outline';

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
    { name: 'Inicio', path: '/dashboard', icon: HomeIcon },
    { name: 'Usuarios', path: '/dashboard/usuarios', icon: UserGroupIcon, roles: ['admin'] },
    { name: 'Estudiantes', path: '/dashboard/estudiantes', icon: AcademicCapIcon, roles: ['admin', 'docente'] },
    { name: 'Cursos', path: '/dashboard/cursos', icon: BookOpenIcon },
    { name: 'Grupos', path: '/dashboard/grupos', icon: BuildingOfficeIcon, roles: ['admin', 'docente'] },
    { name: 'Evaluaciones', path: '/dashboard/evaluaciones', icon: DocumentTextIcon },
    { name: 'Registrar Notas', path: '/dashboard/notas', icon: ClipboardDocumentListIcon, roles: ['admin', 'docente'] },
    { name: 'Mis Asistencias', path: '/dashboard/mis-asistencias', icon: CalendarDaysIcon, roles: ['estudiante'] },
    { name: 'Rankings', path: '/dashboard/rankings', icon: ChartBarIcon },
    { name: 'Reportes', path: '/dashboard/reportes', icon: DocumentChartBarIcon },
  ];

  return (
    <div className="min-h-screen bg-brand-cream-light flex">
      {/* Sidebar con marrón vino */}
      <aside className="w-72 bg-gradient-to-b from-brand-maroon to-brand-maroon-dark hidden md:flex flex-col fixed h-full z-20 shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-brand-maroon/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">SGA-P</h1>
              <p className="text-xs text-brand-cream/70 mt-0.5">Sistema de Gestión Académica</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-brand-cream/50 uppercase tracking-wider px-3 pb-2">
            Navegación
          </p>

          {navItems
            .filter(item => !item.roles || (user?.rol && item.roles.includes(user.rol)))
            .map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) => `
                    relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300
                    group hover:pl-5 hover:bg-white/10
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-white/20 to-white/10 text-white shadow-inner border-l-4 border-brand-gold pl-3'
                        : 'text-brand-cream/80 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    'text-brand-cream/60' // Quité la referencia a isActive aquí
                  }`} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-5 border-t border-brand-maroon/30 bg-brand-maroon-dark/50">
          <div className="flex items-center gap-3 mb-4 p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/5">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">
                  {user?.nombres?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-brand-maroon rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.nombres}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-brand-cream/80 capitalize">{user?.rol}</span>
                <span className="w-1 h-1 bg-brand-cream/40 rounded-full"></span>
                <span className="text-xs text-brand-cream/60">En línea</span>
              </div>
            </div>
            <Cog6ToothIcon className="w-5 h-5 text-brand-cream/50 hover:text-white cursor-pointer transition-colors" />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 group"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-5 md:p-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Content Header con ángulo */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="bg-angled-maroon h-40"></div>
            <div className="absolute inset-0 p-6 md:p-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Panel de Control</h1>
                <p className="text-brand-cream mt-1">
                  Bienvenido de nuevo, <span className="font-semibold">{user?.nombres?.split(' ')[0] || 'Usuario'}</span>
                </p>
              </div>
              <div className="hidden md:block">
                <div className="text-sm text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <span className="font-medium">Hoy:</span>{' '}
                  {new Date().toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-brand-cream-dark overflow-hidden">
            <div className="p-6 md:p-8">
              <Outlet />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-sm text-secondary-600">
              © {new Date().getFullYear()} SGA-P • Sistema de Gestión Académica
            </p>
            <p className="text-xs text-secondary-500/80 mt-1">
              Universidad • {user?.rol ? `Rol: ${user.rol}` : ''}
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;