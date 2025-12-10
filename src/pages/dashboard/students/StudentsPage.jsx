import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import { StudentService } from '../../../services/student.service';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Table, { TableRow, TableCell } from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import StudentCreateModal from '../../../components/dashboard/students/StudentCreateModal';

const StudentsPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ modalidad: '', area: '' });
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

  const getModalityColor = (mod) => {
    switch(mod) {
      case 'ORDINARIO': return 'primary';
      case 'PRIMERA_OPCION': return 'success';
      case 'DIRIMENCIA': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Estudiantes</h1>
          <p className="text-slate-500 text-sm">Directorio de alumnos matriculados por modalidad</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          + Registrar Estudiante
        </Button>
      </div>

      <Card className="border-0 shadow-none bg-transparent !p-0">
        <div className="flex gap-4 mb-4">
          <select 
            className="px-4 py-2 rounded-lg glass-input text-slate-700 font-medium"
            value={filters.modalidad}
            onChange={(e) => setFilters({...filters, modalidad: e.target.value})}
          >
            <option value="">Todas las Modalidades</option>
            <option value="ORDINARIO">Ordinario</option>
            <option value="PRIMERA_OPCION">Primera Opción</option>
            <option value="DIRIMENCIA">Dirimencia</option>
          </select>
          
          <select 
            className="px-4 py-2 rounded-lg glass-input text-slate-700 font-medium"
            value={filters.area}
            onChange={(e) => setFilters({...filters, area: e.target.value})}
          >
            <option value="">Todas las Áreas</option>
            <option value="A">Área A</option>
            <option value="B">Área B</option>
            <option value="C">Área C</option>
            <option value="D">Área D</option>
          </select>
        </div>

        <Table headers={['Código', 'Nombre Completo', 'DNI', 'Modalidad', 'Estado']}>
          {loading ? (
             <TableRow>
                <TableCell className="text-center py-8" colSpan="5">Cargando...</TableCell>
             </TableRow>
          ) : students.length === 0 ? (
            <TableRow>
              <TableCell className="text-center py-8" colSpan="5">No se encontraron estudiantes</TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow 
                key={student.estudiante_id} 
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => navigate(`/dashboard/estudiantes/${student.estudiante_id}`)}
              >
                <TableCell>
                  <span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded">{student.codigo_interno}</span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-slate-900">{student.nombre_completo}</span>
                </TableCell>
                <TableCell>{student.dni}</TableCell>
                <TableCell>
                  <Badge variant={getModalityColor(student.modalidad)}>{student.modalidad}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={student.estado === 'activo' ? 'activo' : 'inactivo'}>
                    {student.estado?.toUpperCase() || 'ACTIVO'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </Table>
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
