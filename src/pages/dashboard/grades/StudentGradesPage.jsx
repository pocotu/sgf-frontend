import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';
import { EnrollmentService } from '../../../services/enrollment.service';
import Card from '../../../components/ui/Card';
import Table, { TableRow, TableCell } from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';

const StudentGradesPage = () => {
  const user = useAtomValue(userAtom);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!user?.id) {
        return;
      }
      setLoading(true);
      try {
        /*
         * In a real API we might have specific endpoint /estudiantes/:id/notas
         * For now we get enrollments which should contain course info and potentially grades
         * Or we mock the grade data structure here as per plan
         */
        const response = await EnrollmentService.getEnrollments({ estudiante_id: user.id });
        if (response.success) {
          setEnrollments(response.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [user]);

  const calculateAverage = (p, f) => Math.round((p + f) / 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mis Notas</h1>
        <p className="text-slate-500 text-sm">Rendimiento académico del periodo actual</p>
      </div>

      <Card>
        <Table headers={['Curso', 'Créditos', 'Parcial', 'Final', 'Promedio', 'Estado']}>
          {loading ? (
            <TableRow>
              <TableCell colSpan="6" className="text-center">
                Cargando notas...
              </TableCell>
            </TableRow>
          ) : enrollments.length === 0 ? (
            <TableRow>
              <TableCell colSpan="6" className="text-center">
                No estás matriculado en cursos este periodo
              </TableCell>
            </TableRow>
          ) : (
            enrollments.map((enrollment, idx) => {
              const parcial = enrollment.parcial || 0;
              const final = enrollment.final || 0;
              const avg = parcial && final ? calculateAverage(parcial, final) : 0;
              const status = avg >= 11 ? 'APROBADO' : avg > 0 ? 'DESAPROBADO' : 'PENDIENTE';
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <span className="font-semibold text-slate-700">
                      {enrollment.grupo?.nombreGrupo || `Grupo ${idx + 1}`}
                    </span>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{parcial || '-'}</TableCell>
                  <TableCell>{final || '-'}</TableCell>
                  <TableCell>
                    <span
                      className={`font-bold ${avg >= 11 ? 'text-blue-600' : avg > 0 ? 'text-red-500' : 'text-slate-400'}`}
                    >
                      {avg || '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        status === 'APROBADO'
                          ? 'success'
                          : status === 'DESAPROBADO'
                            ? 'danger'
                            : 'warning'
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </Table>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Información">
          <div className="text-center py-8 text-slate-500">
            <p className="text-sm">Las notas se mostrarán cuando estén disponibles en el sistema</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentGradesPage;
