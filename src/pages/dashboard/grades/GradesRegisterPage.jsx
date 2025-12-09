import React, { useState, useEffect } from 'react';
import { EvaluationService } from '../../../services/evaluation.service';
import { GroupService } from '../../../services/group.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { GradeService } from '../../../services/grade.service';

const GradesRegisterPage = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    
    const [selectedEvaluation, setSelectedEvaluation] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [grades, setGrades] = useState({}); // { student_id: score }
    const [loading, setLoading] = useState(false);

    const loadInitialData = async () => {
        try {
            const [evalRes, groupRes] = await Promise.all([
                EvaluationService.getEvaluations(),
                GroupService.getGroups()
            ]);
            if (evalRes.success) {setEvaluations(evalRes.data);}
            if (groupRes.success) {setGroups(groupRes.data);}
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const handleGroupChange = async (groupId) => {
        setSelectedGroup(groupId);
        if (!groupId) {
            setStudents([]);
            return;
        }
        
        // Load students for this group
        try {
            const res = await EnrollmentService.getEnrollments({ grupo_id: groupId });
            if (res.success) {
                setStudents(res.data);
                // Initialize grades object
                const initialGrades = {};
                res.data.forEach(s => initialGrades[s.estudiante_id] = '');
                setGrades(initialGrades);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGradeChange = (studentId, value) => {
        // Validate 0-20
        if (value !== '' && (value < 0 || value > 20)) {return;}
        setGrades(prev => ({ ...prev, [studentId]: value }));
    };

    const handleSave = async () => {
        if (!selectedEvaluation || !selectedGroup) {return;}
        setLoading(true);
        try {
            // Transform for API
            const gradesList = Object.keys(grades).map(sid => ({
                estudiante_id: parseInt(sid),
                valor: parseFloat(grades[sid])
            })).filter(g => !isNaN(g.valor)); // Only send filled grades

            const response = await GradeService.registerGrades({
                evaluacion_id: selectedEvaluation,
                grupo_id: selectedGroup,
                notas: gradesList
            });

            if (response.success) {
                alert("Notas guardadas correctamente");
                // Reset or navigate?
            } else {
                alert("Error al guardar");
            }
        } catch (error) {
            console.error(error);
            alert("Error al guardar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Registro de Notas</h1>
            
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Seleccionar Evaluación</label>
                        <select 
                            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                            value={selectedEvaluation}
                            onChange={(e) => setSelectedEvaluation(e.target.value)}
                        >
                            <option value="">-- Seleccione Evaluación --</option>
                            {evaluations.map(ev => (
                                <option key={ev.evaluacion_id} value={ev.evaluacion_id}>{ev.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Seleccionar Grupo</label>
                        <select 
                            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                            value={selectedGroup}
                            onChange={(e) => handleGroupChange(e.target.value)}
                        >
                            <option value="">-- Seleccione Grupo --</option>
                            {groups.map(g => (
                                <option key={g.grupo_id} value={g.grupo_id}>{g.nombre_grupo}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {students.length > 0 && (
                     <>
                        <Table headers={['Estudiante', 'Nota (0-20)']}>
                            {students.map(student => (
                                <TableRow key={student.estudiante_id}>
                                    <TableCell>{student.nombre_estudiante}</TableCell>
                                    <TableCell>
                                        <input 
                                            type="number" 
                                            min="0" max="20"
                                            className="w-20 px-2 py-1 border border-slate-300 rounded text-center font-bold"
                                            value={grades[student.estudiante_id] || ''}
                                            onChange={(e) => handleGradeChange(student.estudiante_id, e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSave} loading={loading} disabled={!selectedEvaluation || !selectedGroup}>
                                Guardar Notas
                            </Button>
                        </div>
                     </>
                )}
            </Card>
        </div>
    );
};

export default GradesRegisterPage;
