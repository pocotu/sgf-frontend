import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentService } from '../../../services/student.service';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Table, { TableRow, TableCell } from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import StudentCreateModal from '../../../components/dashboard/students/StudentCreateModal';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  UserGroupIcon,
  AcademicCapIcon,
  StarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const StudentsPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ modalidad: '', area: '', search: '' });
  const [showModal, setShowModal] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await StudentService.getStudents();
      if (response.success) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const getModalityColor = mod => {
    switch (mod) {
      case 'ORDINARIO':
        return { bg: 'bg-brand-maroon/10', text: 'text-brand-maroon', border: 'border-brand-maroon/20' };
      case 'PRIMERA_OPCION':
        return { bg: 'bg-brand-gold/10', text: 'text-brand-gold-dark', border: 'border-brand-gold/20' };
      case 'DIRIMENCIA':
        return { bg: 'bg-secondary-100', text: 'text-secondary-700', border: 'border-secondary-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const formatModalidad = mod => {
    const map = {
      'ORDINARIO': 'Ordinario',
      'PRIMERA_OPCION': 'Primera Opción',
      'DIRIMENCIA': 'Dirimencia'
    };
    return map[mod] || mod;
  };

  // Stats para mostrar
  const stats = {
    total: students.length,
    activos: students.filter(s => s.estado === 'activo').length,
    ordinarios: students.filter(s => s.modalidad === 'ORDINARIO').length,
    primeraOpcion: students.filter(s => s.modalidad === 'PRIMERA_OPCION').length
  };

  return (
    <div className="space-y-8">
      {/* Header con estadísticas */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-maroon to-brand-maroon-dark flex items-center justify-center shadow-lg">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-secondary-900">Gestión de Estudiantes</h1>
                <p className="text-secondary-600 text-sm md:text-base">Directorio completo de alumnos matriculados</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-brand-maroon to-brand-maroon-dark hover:from-brand-maroon-dark hover:to-brand-maroon border-0 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
          >
            <UserPlusIcon className="w-5 h-5" />
            <span>Nuevo Estudiante</span>
          </Button>
        </div>

        {/* Stats Cards con nueva paleta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-brand-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-secondary-600">Total Estudiantes</span>
              <div className="w-10 h-10 rounded-lg bg-brand-maroon/10 flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5 text-brand-maroon" />
              </div>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.total}</p>
            <p className="text-xs text-secondary-500 mt-1">Registrados en el sistema</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-brand-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-secondary-600">Activos</span>
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-success-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.activos}</p>
            <p className="text-xs text-secondary-500 mt-1">Estudiantes activos</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-brand-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-secondary-600">Ordinarios</span>
              <div className="w-10 h-10 rounded-lg bg-brand-maroon/10 flex items-center justify-center">
                <AcademicCapIcon className="w-5 h-5 text-brand-maroon" />
              </div>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.ordinarios}</p>
            <p className="text-xs text-secondary-500 mt-1">Modalidad ordinaria</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-brand-cream-dark shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-secondary-600">Primera Opción</span>
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-brand-gold-dark" />
              </div>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.primeraOpcion}</p>
            <p className="text-xs text-secondary-500 mt-1">Primera opción</p>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <Card className="bg-white border border-brand-cream-dark rounded-2xl shadow-sm !p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Buscar estudiante por nombre..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-cream-dark focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20 outline-none transition-all bg-white"
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-4 h-4 text-secondary-500" />
              <span className="text-sm font-medium text-secondary-600">Filtros:</span>
            </div>
            <select
              className="px-4 py-3 rounded-xl border border-brand-cream-dark focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20 outline-none transition-all bg-white text-secondary-700 font-medium min-w-[180px]"
              value={filters.modalidad}
              onChange={e => setFilters({ ...filters, modalidad: e.target.value })}
            >
              <option value="">Todas las modalidades</option>
              <option value="ORDINARIO">Ordinario</option>
              <option value="PRIMERA_OPCION">Primera Opción</option>
              <option value="DIRIMENCIA">Dirimencia</option>
            </select>

            <select
              className="px-4 py-3 rounded-xl border border-brand-cream-dark focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20 outline-none transition-all bg-white text-secondary-700 font-medium min-w-[120px]"
              value={filters.area}
              onChange={e => setFilters({ ...filters, area: e.target.value })}
            >
              <option value="">Todas las áreas</option>
              <option value="A">Área A</option>
              <option value="B">Área B</option>
              <option value="C">Área C</option>
              <option value="D">Área D</option>
            </select>
          </div>
        </div>

        {/* Tabla de estudiantes */}
        <div className="overflow-hidden rounded-xl border border-brand-cream-dark">
          <Table headers={['Código', 'Estudiante', 'DNI', 'Modalidad', 'Estado', 'Acciones']}>
            {loading ? (
              <TableRow>
                <TableCell className="text-center py-12" colSpan="6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-4 border-brand-maroon/10 border-t-brand-maroon animate-spin"></div>
                    <p className="text-secondary-500 font-medium">Cargando estudiantes...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell className="text-center py-12" colSpan="6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center">
                      <UserGroupIcon className="w-8 h-8 text-secondary-400" />
                    </div>
                    <div>
                      <p className="text-secondary-700 font-medium">No hay estudiantes registrados</p>
                      <p className="text-secondary-500 text-sm mt-1">
                        Comienza registrando el primer estudiante
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              students.map(student => {
                const modalityColor = getModalityColor(student.modalidad);
                return (
                  <TableRow
                    key={student.estudiante_id}
                    className="hover:bg-brand-cream-light transition-colors group"
                    onClick={() => navigate(`/dashboard/estudiantes/${student.estudiante_id}`)}
                  >
                    <TableCell>
                      <div className="font-mono font-semibold text-secondary-700 bg-brand-cream px-3 py-1.5 rounded-lg inline-block">
                        {student.codigo_interno}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-maroon/10 to-brand-maroon/5 flex items-center justify-center text-brand-maroon font-semibold">
                          {student.nombre_completo?.[0]?.toUpperCase() || 'E'}
                        </div>
                        <div>
                          <p className="font-semibold text-secondary-900 group-hover:text-brand-maroon transition-colors">
                            {student.nombre_completo}
                          </p>
                          <p className="text-xs text-secondary-500">{student.email || 'Sin email'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-secondary-700">{student.dni}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${modalityColor.bg} ${modalityColor.text} border ${modalityColor.border}`}>
                        {formatModalidad(student.modalidad)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${student.estado === 'activo' ? 'bg-success-500' : 'bg-secondary-300'}`}></div>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${student.estado === 'activo' ? 'bg-success-50 text-success-700 border border-success-100' : 'bg-secondary-100 text-secondary-700 border border-secondary-200'}`}>
                          {student.estado === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button 
                        className="px-4 py-2 text-sm font-medium text-brand-maroon bg-brand-maroon/10 hover:bg-brand-maroon/20 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/estudiantes/${student.estudiante_id}`);
                        }}
                      >
                        Ver detalles
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </Table>
        </div>

        {/* Footer de la tabla */}
        {!loading && students.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-brand-cream-dark">
            <div className="text-sm text-secondary-500">
              Mostrando <span className="font-semibold text-secondary-700">{students.length}</span> estudiantes
            </div>
            <div className="text-xs text-secondary-400">
              SGA-P • Sistema de Gestión Académica
            </div>
          </div>
        )}
      </Card>

      <StudentCreateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchStudents}
      />
    </div>
  );
};

export default StudentsPage;