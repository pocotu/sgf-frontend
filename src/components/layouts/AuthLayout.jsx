import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-900 to-primary-700 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="relative z-10 p-12 text-white max-w-xl">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">Lumen</h1>
          <p className="text-xl text-primary-100 font-light leading-relaxed">
            Sistema de Gestión Académica para la excelencia preuniversitaria. Gestiona estudiantes,
            matrículas y rendimiento académico en una sola plataforma.
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in-up">
          <Outlet />
          <p className="mt-8 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Lumen. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
