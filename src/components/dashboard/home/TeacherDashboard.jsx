import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';

const TeacherDashboard = () => {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const todayClasses = [
    {
      time: '08:00 - 10:00',
      course: 'Matemática I',
      group: 'G1',
      room: 'Aula 101',
      status: 'En curso',
    },
    {
      time: '10:00 - 12:00',
      course: 'Física II',
      group: 'G3',
      room: 'Aula 204',
      status: 'Pendiente',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hola, Profesor {user?.apellidos}</h1>
          <p className="text-slate-500">Gestión Académica</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-2xl font-bold text-primary-600">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-sm text-slate-500">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <Card className="lg:col-span-2" title="Clases de Hoy">
          {todayClasses.length > 0 ? (
            <div className="space-y-4">
              {todayClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[80px]">
                      <p className="font-bold text-slate-800">{cls.time.split(' - ')[0]}</p>
                      <p className="text-xs text-slate-500">a {cls.time.split(' - ')[1]}</p>
                    </div>
                    <div className="h-10 w-1 bg-primary-200 rounded-full"></div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{cls.course}</h4>
                      <p className="text-sm text-slate-500">
                        Grupo {cls.group} • {cls.room}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex gap-2">
                    {cls.status === 'En curso' && (
                      <Button size="sm" onClick={() => navigate('/dashboard/grupos')}>
                        Registrar Asistencia
                      </Button>
                    )}
                    <Badge variant={cls.status === 'En curso' ? 'activo' : 'default'}>
                      {cls.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No tienes clases programadas para hoy
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card title="Accesos Rápidos">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/dashboard/notas')}
                className="p-4 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors text-center flex flex-col items-center gap-2"
              >
                <span className="text-2xl">📝</span>
                Notas
              </button>
              <button
                onClick={() => navigate('/dashboard/grupos')}
                className="p-4 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition-colors text-center flex flex-col items-center gap-2"
              >
                <span className="text-2xl">📅</span>
                Asistencia
              </button>
              <button
                onClick={() => navigate('/dashboard/estudiantes')}
                className="p-4 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors text-center flex flex-col items-center gap-2"
              >
                <span className="text-2xl">🎓</span>
                Alumnos
              </button>
            </div>
          </Card>

          <Card className="bg-orange-50 border-orange-100">
            <h3 className="font-bold text-orange-800 mb-2">📢 Aviso Administrativo</h3>
            <p className="text-sm text-orange-700">
              Recuerden que el cierre de notas del Parcial I es este viernes a las 11:59 PM.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
