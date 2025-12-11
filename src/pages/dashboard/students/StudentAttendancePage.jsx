import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';
import { AttendanceService } from '../../../services/attendance.service';
import Card from '../../../components/ui/Card';
import Table, { TableRow, TableCell } from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';

const StudentAttendancePage = () => {
  const user = useAtomValue(userAtom);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async estudianteId => {
    if (!estudianteId) {
      return;
    }

    setLoading(true);
    try {
      const response = await AttendanceService.getStudentAttendanceSummary(estudianteId);
      if (response.success) {
        setSummary(response.data.summary);
        setHistory(response.data.history || []);
      }
    } catch (error) {
      console.error('Error fetching attendance', error);
      setSummary({ presentes: 0, tardanzas: 0, ausencias: 0, percentage: '0%' });
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.usuarioId) {
      fetchData(user.usuarioId);
    }
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando asistencia...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mi Asistencia</h1>
        <p className="text-slate-500 text-sm">Registro detallado de asistencias y pontualidad</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="items-center justify-center flex flex-col p-4 bg-emerald-50 border-emerald-100">
          <span className="text-3xl font-bold text-emerald-600">{summary?.presentes || 0}</span>
          <span className="text-xs text-emerald-800 uppercase font-bold tracking-wide mt-1">
            Presentes
          </span>
        </Card>
        <Card className="items-center justify-center flex flex-col p-4 bg-orange-50 border-orange-100">
          <span className="text-3xl font-bold text-orange-600">{summary?.tardanzas || 0}</span>
          <span className="text-xs text-orange-800 uppercase font-bold tracking-wide mt-1">
            Tardanzas
          </span>
        </Card>
        <Card className="items-center justify-center flex flex-col p-4 bg-red-50 border-red-100">
          <span className="text-3xl font-bold text-red-600">{summary?.ausencias || 0}</span>
          <span className="text-xs text-red-800 uppercase font-bold tracking-wide mt-1">
            Faltas
          </span>
        </Card>
        <Card className="items-center justify-center flex flex-col p-4">
          <span className="text-3xl font-bold text-slate-700">{summary?.percentage || '0%'}</span>
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wide mt-1">
            Asistencia Global
          </span>
        </Card>
      </div>

      {/* History Table */}
      <Card title="Historial Reciente">
        <Table headers={['Fecha', 'Curso', 'Hora', 'Estado', 'Obs']}>
          {history.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.fecha}</TableCell>
              <TableCell>
                <span className="font-medium text-slate-800">{record.curso}</span>
              </TableCell>
              <TableCell>{record.hora}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    record.estado === 'PRESENTE'
                      ? 'activo'
                      : record.estado === 'TARDANZA'
                        ? 'warning'
                        : 'danger'
                  }
                >
                  {record.estado}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-slate-400 font-light italic">
                {record.observacion || '-'}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
};

export default StudentAttendancePage;
