import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';
import { useToast } from '../../../context/ToastContext';
import { CourseService } from '../../../services/course.service';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import CourseCreateModal from '../../../components/dashboard/courses/CourseCreateModal';

const CoursesPage = () => {
  // const { addToast } = useToast(); -> Removed unused hook
  const user = useAtomValue(userAtom);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await CourseService.getCourses();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const getAreaColor = area => {
    const colors = {
      A: 'bg-red-100 text-red-700',
      B: 'bg-blue-100 text-blue-700',
      C: 'bg-orange-100 text-orange-700',
      D: 'bg-purple-100 text-purple-700',
    };
    return colors[area] || 'bg-slate-100';
  };

  const filteredCourses = selectedArea ? courses.filter(c => c.area === selectedArea) : courses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cursos</h1>
          <p className="text-slate-500 text-sm">Catálogo de materias por área</p>
        </div>
        {user?.rol === 'admin' && <Button onClick={() => setShowModal(true)}>+ Nuevo Curso</Button>}
      </div>

      <div className="flex gap-2 pb-2 overflow-x-auto">
        <button
          onClick={() => setSelectedArea('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedArea === '' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
        >
          Todas
        </button>
        {['A', 'B', 'C', 'D'].map(area => (
          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedArea === area ? 'bg-primary-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
          >
            Área {area}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Cargando cursos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-8 text-slate-400">
              No se encontraron cursos en esta área.
            </div>
          )}
          {filteredCourses.map(course => (
            <Card key={course.curso_id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${getAreaColor(course.area)}`}
                >
                  Área {course.area}
                </span>
                <Badge variant={course.estado === 'activo' ? 'activo' : 'inactivo'}>
                  {course.estado}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{course.nombre}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{course.descripcion}</p>
              <Button variant="outline" size="sm" className="w-full">
                Ver Sílabo
              </Button>
            </Card>
          ))}
        </div>
      )}

      <CourseCreateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchCourses}
      />
    </div>
  );
};

export default CoursesPage;
