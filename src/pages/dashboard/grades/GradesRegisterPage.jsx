import React, { useState, useEffect } from 'react';
import { useToast } from '../../../context/ToastContext';
import { EvaluationService } from '../../../services/evaluation.service';
import { GroupService } from '../../../services/group.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { GradeService } from '../../../services/grade.service';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Table, { TableRow, TableCell } from '../../../components/ui/Table';

const GradesRegisterPage = () => {
  const { addToast } = useToast();
  const [groups, setGroups] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEvaluation, setSelectedEvaluation] = useState('');
  const [grades, setGrades] = useState({}); // { student_id: score }

  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingEvaluations, setLoadingEvaluations] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [saving, setSaving] = useState(false);

  // 1. Initial Load: Get Groups
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await GroupService.getGroups();
        if (res.success) {
          setGroups(res.data);
        }
      } catch (error) {
        console.error(error);
        addToast('Error al cargar grupos', 'error');
      } finally {
        setLoadingGroups(false);
      }
    };
    loadGroups();
  }, [addToast]);

  // 2. Handle Group Selection
  const handleGroupChange = async groupId => {
    setSelectedGroup(groupId);
    setSelectedEvaluation(''); // Reset evaluation
    setEvaluations([]); // Clear evaluations
    setStudents([]); // Clear students
    setGrades({});

    if (!groupId) {
      return;
    }

    setLoadingEvaluations(true);
    setLoadingStudents(true);

    try {
      // Load Evaluations for this Group AND Students
      const [evalRes, enrollRes] = await Promise.all([
        EvaluationService.getEvaluations({ grupo_id: groupId }),
        EnrollmentService.getEnrollments({ grupo_id: groupId }),
      ]);

      if (evalRes.success) {
        setEvaluations(evalRes.data);
        if (evalRes.data.length === 0) {
          addToast('No hay evaluaciones programadas para este grupo', 'warning');
        }
      }
      if (enrollRes.success) {
        setStudents(enrollRes.data);
        // Initialize grades
        const initial = {};
        enrollRes.data.forEach(s => (initial[s.estudiante_id] = ''));
        setGrades(initial);
      }
    } catch (error) {
      console.error(error);
      addToast('Error cargando datos del grupo', 'error');
    } finally {
      setLoadingEvaluations(false);
      setLoadingStudents(false);
    }
  };

  const handleEvaluationChange = evalId => {
    setSelectedEvaluation(evalId);
    // Maybe load existing grades if editing? For now just setting ID
  };

  const handleGradeChange = (studentId, value) => {
    // Validate 0-20
    if (value !== '' && (value < 0 || value > 20)) {
      return;
    }
    setGrades(prev => ({ ...prev, [studentId]: value }));
  };

  const handleSave = async () => {
    if (!selectedEvaluation || !selectedGroup) {
      return;
    }
    setSaving(true);
    try {
      // Transform for API
      const gradesList = Object.keys(grades)
        .map(sid => ({
          estudiante_id: parseInt(sid),
          valor: parseFloat(grades[sid]),
        }))
        .filter(g => !isNaN(g.valor) && g.valor !== ''); // Only send filled grades

      if (gradesList.length === 0) {
        addToast('Debe ingresar al menos una nota válida', 'warning');
        setSaving(false);
        return;
      }

      const response = await GradeService.registerGrades({
        evaluacion_id: selectedEvaluation,
        grupo_id: selectedGroup,
        notas: gradesList,
      });

      if (response.success) {
        addToast('Notas guardadas correctamente', 'success');
      } else {
        addToast('Error al guardar', 'error');
      }
    } catch (error) {
      console.error(error);
      addToast('Error al guardar notas', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Registro de Notas</h1>
          <p className="text-slate-500 text-sm">Ingreso de calificaciones por grupo y evaluación</p>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 1. Select Group */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              1. Seleccionar Grupo
            </label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedGroup}
              onChange={e => handleGroupChange(e.target.value)}
              disabled={loadingGroups}
            >
              <option value="">-- Seleccione Grupo --</option>
              {groups.map(g => (
                <option key={g.grupo_id} value={g.grupo_id}>
                  {g.nombre_grupo} - {g.nombre_curso || 'Curso'}
                </option>
              ))}
            </select>
            {loadingGroups && <p className="text-xs text-slate-400 mt-1">Cargando grupos...</p>}
          </div>

          {/* 2. Select Evaluation (Dependent on Group) */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${!selectedGroup ? 'text-slate-400' : 'text-slate-700'}`}
            >
              2. Seleccionar Evaluación
            </label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-100 disabled:text-slate-400"
              value={selectedEvaluation}
              onChange={e => handleEvaluationChange(e.target.value)}
              disabled={!selectedGroup || loadingEvaluations || evaluations.length === 0}
            >
              <option value="">
                {evaluations.length === 0 && selectedGroup
                  ? 'No hay evaluaciones'
                  : '-- Seleccione Evaluación --'}
              </option>
              {evaluations.map(ev => (
                <option key={ev.evaluacion_id} value={ev.evaluacion_id}>
                  {ev.nombre}
                </option>
              ))}
            </select>
            {loadingEvaluations && (
              <p className="text-xs text-slate-400 mt-1">Buscando evaluaciones...</p>
            )}
          </div>
        </div>

        {/* 3. Students Table */}
        {selectedGroup && selectedEvaluation && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">
                Listado de Estudiantes ({students.length})
              </h3>
            </div>

            {loadingStudents ? (
              <div className="text-center py-8 text-slate-500">
                Cargando lista de estudiantes...
              </div>
            ) : students.length > 0 ? (
              <>
                <Table headers={['Estudiante', 'Código', 'Nota (0-20)']}>
                  {students.map(student => (
                    <TableRow key={student.estudiante_id}>
                      <TableCell>
                        <div className="font-medium text-slate-900">
                          {student.nombre_estudiante}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-xs text-slate-500">
                          {student.codigo_interno}
                        </span>
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="-"
                          className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-primary-500 outline-none"
                          value={grades[student.estudiante_id] || ''}
                          onChange={e => handleGradeChange(student.estudiante_id, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </Table>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedEvaluation('')}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} loading={saving}>
                    Guardar Calificaciones
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <p className="text-slate-500">No hay estudiantes matriculados en este grupo.</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default GradesRegisterPage;
