import React from 'react';
import Card from '../../ui/Card';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';

const AdminDashboard = () => {
  const user = useAtomValue(userAtom);

  const stats = [
    { label: 'Total Estudiantes', value: '1,240', change: '+12%', color: 'border-l-blue-500' },
    { label: 'Docentes Activos', value: '45', change: '+2%', color: 'border-l-emerald-500' },
    { label: 'Cursos Ofertados', value: '28', change: '0%', color: 'border-l-purple-500' },
    { label: 'Grupos Activos', value: '12', change: '+4%', color: 'border-l-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Bienvenido, {user?.nombres}</h1>
        <p className="text-slate-500">Panel de Administración General</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`${stat.color} border-l-4`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              </div>
              <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Mock) */}
        <Card className="lg:col-span-2" title="Matrículas por Periodo">
          <div className="h-64 flex items-end justify-between px-4 gap-2">
            {[65, 40, 75, 55, 80, 95].map((h, i) => (
              <div key={i} className="w-full bg-primary-100 rounded-t-lg relative group">
                <div
                  className="absolute bottom-0 w-full bg-primary-600 rounded-t-lg transition-all duration-500 group-hover:bg-primary-500"
                  style={{ height: `${h}%` }}
                ></div>
                <div className="absolute -bottom-6 w-full text-center text-xs text-slate-500">
                  {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'][i]}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card title="Actividad Reciente">
          <div className="space-y-4">
            {[
              { action: 'Nuevo usuario registrado', user: 'Admin', time: 'Hace 2 min' },
              { action: 'Cierre de acta G1', user: 'Prof. Garcia', time: 'Hace 15 min' },
              { action: 'Matrícula completada', user: 'Est. Perez', time: 'Hace 1 hora' },
              { action: 'Backup del sistema', user: 'System', time: 'Hace 3 horas' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.action}</p>
                  <p className="text-xs text-slate-400">
                    {item.user} • {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
