import React from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../store/auth.store';
import Card from '../../components/ui/Card';

const DashboardPage = () => {
  const user = useAtomValue(userAtom);

  const renderAdminStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-primary-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Cursos Activos</p>
            <h3 className="text-2xl font-bold text-slate-800">12</h3>
          </div>
        </div>
      </Card>
      <Card className="border-l-4 border-l-indigo-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
            <span className="text-2xl">👥</span>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Estudiantes Total</p>
            <h3 className="text-2xl font-bold text-slate-800">1,240</h3>
          </div>
        </div>
      </Card>
      <Card className="border-l-4 border-l-emerald-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Asistencia Hoy</p>
            <h3 className="text-2xl font-bold text-slate-800">92%</h3>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStudentStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Mi Próxima Clase">
        <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <div className="text-primary-600 text-3xl">🧮</div>
          <div>
            <h4 className="font-bold text-lg text-primary-900">Aritmética</h4>
            <p className="text-sm text-primary-700">Aula A1 • 10:00 AM</p>
          </div>
        </div>
      </Card>
      <Card title="Mi Asistencia Global">
        <div className="flex flex-col items-center justify-center h-full">
           <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
           <p className="text-xs text-slate-500 text-center">Excelente asistencia, sigue así.</p>
        </div>
      </Card>
    </div>
  );

  const renderTeacherStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-l-4 border-l-blue-500">
         <div className="p-2">
            <p className="text-sm text-slate-500">Grupos Asignados</p>
            <h3 className="text-2xl font-bold text-slate-800">4</h3>
         </div>
      </Card>
      <Card className="border-l-4 border-l-orange-500">
         <div className="p-2">
            <p className="text-sm text-slate-500">Evaluaciones Pendientes</p>
            <h3 className="text-2xl font-bold text-slate-800">2</h3>
         </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Hola, <span className="text-primary-600">{user?.nombres}</span> 👋
        </h1>
        <p className="text-slate-500 mt-2">
          {user?.rol === 'admin' && 'Panel de Administración General'}
          {user?.rol === 'estudiante' && 'Tu panel de estudiante'}
          {user?.rol === 'docente' && 'Panel de Gestión Docente'}
        </p>
      </header>
      
      {user?.rol === 'admin' && renderAdminStats()}
      {user?.rol === 'estudiante' && renderStudentStats()}
      {user?.rol === 'docente' && renderTeacherStats()}

      <div className="mt-8">
        <Card title={user?.rol === 'admin' ? "Actividad Reciente del Sistema" : "Avisos Importantes"}>
          <div className="p-4 text-center text-slate-400 italic">
            No hay notificaciones nuevas por el momento.
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
