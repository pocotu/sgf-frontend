import React, { useState, useEffect } from 'react';
import Card from '../../ui/Card';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';
import { StudentService } from '../../../services/student.service';
import { UserService } from '../../../services/user.service';
import { CourseService } from '../../../services/course.service';
import { GroupService } from '../../../services/group.service';

const AdminDashboard = () => {
  const user = useAtomValue(userAtom);
  const [stats, setStats] = useState([
    { label: 'Total Estudiantes', value: '...', change: '', color: 'border-l-blue-500' },
    { label: 'Docentes Activos', value: '...', change: '', color: 'border-l-emerald-500' },
    { label: 'Cursos Ofertados', value: '...', change: '', color: 'border-l-purple-500' },
    { label: 'Grupos Activos', value: '...', change: '', color: 'border-l-orange-500' },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, usersRes, coursesRes, groupsRes] = await Promise.all([
          StudentService.getStudents(),
          UserService.getUsers({ rol: 'docente' }),
          CourseService.getCourses(),
          GroupService.getGroups(),
        ]);

        const totalStudents = studentsRes.data?.length || 0;
        const activeTeachers = usersRes.data?.filter(u => u.estado === 'activo').length || 0;
        const totalCourses = coursesRes.data?.length || 0;
        const activeGroups = groupsRes.data?.filter(g => g.estado === 'ACTIVO').length || 0;

        setStats([
          {
            label: 'Total Estudiantes',
            value: totalStudents.toString(),
            change: '',
            color: 'border-l-blue-500',
          },
          {
            label: 'Docentes Activos',
            value: activeTeachers.toString(),
            change: '',
            color: 'border-l-emerald-500',
          },
          {
            label: 'Cursos Ofertados',
            value: totalCourses.toString(),
            change: '',
            color: 'border-l-purple-500',
          },
          {
            label: 'Grupos Activos',
            value: activeGroups.toString(),
            change: '',
            color: 'border-l-orange-500',
          },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

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
              {stat.change && (
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Resumen del Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad Reciente */}
        <Card className="lg:col-span-2" title="Resumen del Sistema">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">Promedio General</p>
                <p className="text-2xl font-bold text-blue-600">15.8</p>
                <p className="text-xs text-slate-500">Escala vigesimal</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">Asistencia</p>
                <p className="text-2xl font-bold text-green-600">91.4%</p>
                <p className="text-xs text-slate-500">Promedio general</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Últimas Matrículas</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Juan Pérez - Grupo A1</span>
                  <span className="text-xs text-slate-400">Hace 2 días</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">María García - Grupo B1</span>
                  <span className="text-xs text-slate-400">Hace 3 días</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Pedro Sánchez - Grupo A2</span>
                  <span className="text-xs text-slate-400">Hace 5 días</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Distribución */}
        <Card title="Distribucion">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Por Modalidad</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Ordinario</span>
                  <span className="font-semibold text-blue-600">60%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Primera Opción</span>
                  <span className="font-semibold text-green-600">27%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Dirimencia</span>
                  <span className="font-semibold text-orange-600">13%</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Por Área</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Área A</span>
                  <span className="font-semibold">30%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Área B</span>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Área C</span>
                  <span className="font-semibold">23%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Área D</span>
                  <span className="font-semibold">22%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
