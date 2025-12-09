import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    
    // Roles
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
    docente: 'bg-blue-50 text-blue-700 border-blue-200',
    estudiante: 'bg-teal-50 text-teal-700 border-teal-200',

    // Estados
    activo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    inactivo: 'bg-slate-100 text-slate-500 border-slate-200',
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedVariant} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
