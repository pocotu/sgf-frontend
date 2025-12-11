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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Card */}
        <Card className="lg:col-span-3" title="Resumen del Sistema">
          <div className="text-center py-8 text-slate-500">
            <p>Sistema de Gestión Académica operativo</p>
            <p className="text-sm mt-2">
              Utiliza el menú lateral para acceder a las diferentes secciones
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
