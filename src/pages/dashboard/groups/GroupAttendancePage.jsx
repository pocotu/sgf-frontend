import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';

import { EnrollmentService } from '../../../services/enrollment.service';

import { GroupService } from '../../../services/group.service';
import { AttendanceService } from '../../../services/attendance.service';

const GroupAttendancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [group, setGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [groupRes, enrollRes] = await Promise.all([
                GroupService.getGroupById(id),
                EnrollmentService.getEnrollments({ grupo_id: id })
            ]);

            if (groupRes.success) {setGroup(groupRes.data);}
            if (enrollRes.success) {
                const list = enrollRes.data;
                setStudents(list);
                
                // Initialize all as PRESENT by default
                const initialData = {};
                list.forEach(s => {
                    initialData[s.estudiante_id] = 'PRESENTE'; // Default
                });
                setAttendanceData(initialData);
            }

        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, [id]);

  const handleStatusChange = (studentId, status) => {
      setAttendanceData(prev => ({
          ...prev,
          [studentId]: status
      }));
  };

  const handleSave = async () => {
      setSaving(true);
      try {
          // Flatten data for API: [{estudiante_id, estado}, ...]
          const asistencias = Object.keys(attendanceData).map(studentId => ({
              estudiante_id: parseInt(studentId),
              estado: attendanceData[studentId]
          }));

          const payload = {
              grupo_id: id,
              fecha_clase: date,
              asistencias
          };

          const response = await AttendanceService.registerAttendance(payload);
          if (response.success) {
              addToast('Asistencia registrada con éxito', 'success');
              navigate(`/dashboard/grupos/${id}`);
          } else {
              addToast('Error al guardar asistencia', 'error');
          }
      } catch (error) {
          console.error("Error saving attendance", error);
          addToast("Hubo un error al guardar", 'error');
      } finally {
          setSaving(false);
      }
  };

  if (loading) {return <div className="p-8 text-center text-slate-500">Cargando lista...</div>;}

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(`/dashboard/grupos/${id}`)} className="pl-0">
         ← Volver al Grupo
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h1 className="text-3xl font-bold text-slate-800">Tomar Asistencia</h1>
            <p className="text-slate-500">Grupo: {group?.nombre_grupo} • {group?.modalidad}</p>
         </div>
         <div className="flex items-end gap-2">
            <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Fecha de Clase</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
            </div>
            <Button onClick={handleSave} loading={saving}>
                💾 Guardar Asistencia
            </Button>
         </div>
      </div>

      <Card>
         <Table headers={['Código', 'Estudiante', 'Estado (Seleccionar)']}>
             {students.map(student => (
                 <TableRow key={student.estudiante_id}>
                     <TableCell>
                        <span className="font-mono text-slate-600">{student.codigo_interno}</span>
                     </TableCell>
                     <TableCell>
                        <span className="font-medium text-slate-800">{student.nombre_estudiante}</span>
                     </TableCell>
                     <TableCell>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name={`status-${student.estudiante_id}`} 
                                    checked={attendanceData[student.estudiante_id] === 'PRESENTE'}
                                    onChange={() => handleStatusChange(student.estudiante_id, 'PRESENTE')}
                                    className="text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className={`text-sm ${attendanceData[student.estudiante_id] === 'PRESENTE' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}>Presente</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name={`status-${student.estudiante_id}`} 
                                    checked={attendanceData[student.estudiante_id] === 'TARDANZA'}
                                    onChange={() => handleStatusChange(student.estudiante_id, 'TARDANZA')}
                                    className="text-orange-500 focus:ring-orange-500"
                                />
                                <span className={`text-sm ${attendanceData[student.estudiante_id] === 'TARDANZA' ? 'font-bold text-orange-700' : 'text-slate-600'}`}>Tardanza</span>
                            </label>

                             <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name={`status-${student.estudiante_id}`} 
                                    checked={attendanceData[student.estudiante_id] === 'AUSENTE'}
                                    onChange={() => handleStatusChange(student.estudiante_id, 'AUSENTE')}
                                    className="text-red-600 focus:ring-red-500"
                                />
                                <span className={`text-sm ${attendanceData[student.estudiante_id] === 'AUSENTE' ? 'font-bold text-red-700' : 'text-slate-600'}`}>Ausente</span>
                            </label>
                        </div>
                     </TableCell>
                 </TableRow>
             ))}
         </Table>
      </Card>
    </div>
  );
};

export default GroupAttendancePage;
