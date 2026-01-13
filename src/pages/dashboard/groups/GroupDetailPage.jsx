import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GroupService } from '../../../services/group.service';
import { EnrollmentService } from '../../../services/enrollment.service';

import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';

const GroupDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [group, setGroup] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const groupRes = await GroupService.getGroupById(id);
      if (groupRes.success) {
        setGroup(groupRes.data);
      }
      const enrollRes = await EnrollmentService.getEnrollments({ grupo_id: id });
      if (enrollRes.success) {
        setEnrollments(enrollRes.data);
      }
    } catch (error) {
      console.error('Error fetching group details', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollmentSuccess = () => {
    fetchData(); // Reload data
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando grupo...</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/dashboard/grupos')} className="pl-0">
        ← Volver a Grupos
      </Button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Grupo {group ? group.nombre_grupo : id}
          </h1>
          <p className="text-slate-500">Gestión de estudiantes y horario</p>
        </div>
        <div className="flex gap-2">
          {(user?.rol === 'admin' || user?.rol === 'docente') && (
            <Button onClick={() => navigate(`/dashboard/grupos/${id}/asistencia`)}>
              Tomar Asistencia
            </Button>
          )}
          <Button variant="outline">Configuración</Button>
        </div>
      </div>

      <Card title="Estudiantes Matriculados">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-slate-500">
            Total: <span className="font-bold text-slate-700">{enrollments.length}</span>{' '}
            estudiantes
          </div>
          {user?.rol === 'admin' && (
            <Button size="sm" onClick={() => setShowModal(true)}>
              + Matricular Estudiante
            </Button>
          )}
        </div>

        {enrollments.length === 0 ? (
          <div className="p-8 text-center text-slate-400 border border-dashed rounded-lg bg-slate-50">
            Este grupo aún no tiene estudiantes matriculados.
          </div>
        ) : (
          <Table headers={['Código', 'Estudiante', 'Fecha', 'Estado', 'Acciones']}>
            {enrollments.map(enrollment => (
              <TableRow key={enrollment.matricula_id}>
                <TableCell>
                  <span className="font-mono text-slate-600">{enrollment.codigo_interno}</span>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-slate-900">{enrollment.nombre_estudiante}</div>
                </TableCell>
                <TableCell>{enrollment.fecha_matricula}</TableCell>
                <TableCell>
                  <Badge variant="activo">{enrollment.estado}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    Retirar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      <EnrollmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        groupId={id}
        onSuccess={handleEnrollmentSuccess}
      />
    </div>
  );
};

export default GroupDetailPage;
