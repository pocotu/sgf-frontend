import React, { useState, useEffect } from 'react';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { EnrollmentService } from '../../../services/enrollment.service';
import { StudentService } from '../../../services/student.service';

const EnrollmentModal = ({ isOpen, onClose, groupId, onSuccess }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await StudentService.getStudents();
      if (response.success) {
        setStudents(response.data || []);
      }
    } catch (error) {
      console.error('Error loading students', error);
    }
  };

  // Fetch students for selection (mock search)
  useEffect(() => {
    if (isOpen) {
      fetchStudents();
      setSelectedStudentIds([]); // Reset on open
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleToggleStudent = id => {
    setSelectedStudentIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(sid => sid !== id);
      }
      return [...prev, id];
    });
  };

  const handleEnroll = async () => {
    if (selectedStudentIds.length === 0) {
      return;
    }

    setLoading(true);
    try {
      // Serialize requests for bulk enrollment
      const enrollmentPromises = selectedStudentIds.map(studentId =>
        EnrollmentService.createEnrollment({
          estudiante_id: studentId,
          grupo_id: groupId,
          monto_pagado: 500,
        }),
      );

      const responses = await Promise.all(enrollmentPromises);
      const successCount = responses.filter(r => r.success || r.data).length;

      if (successCount > 0) {
        addToast(`Se matricularon ${successCount} estudiantes`, 'success');
        onSuccess();
        onClose();
      } else {
        addToast('Error al matricular', 'error');
      }
    } catch (error) {
      console.error('Error enrolling', error);
      addToast('Ocurrió un error en el proceso de matrícula', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(
    s =>
      s.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dni.includes(searchTerm),
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Matricular Estudiantes">
      <div className="space-y-4">
        <Input
          label="Buscar Estudiante (DNI o Nombre)"
          placeholder="Escribe para buscar..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="border rounded-md max-h-60 overflow-y-auto">
          {filteredStudents.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">
              No se encontraron estudiantes
            </div>
          ) : (
            filteredStudents.map(student => (
              <div
                key={student.estudiante_id}
                className={`p-3 text-sm cursor-pointer hover:bg-slate-50 flex justify-between items-center ${selectedStudentIds.includes(student.estudiante_id) ? 'bg-primary-50' : ''}`}
                onClick={() => handleToggleStudent(student.estudiante_id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.includes(student.estudiante_id)}
                    readOnly
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-slate-700">{student.nombre_completo}</p>
                    <p className="text-xs text-slate-400">
                      {student.dni} • {student.modalidad}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="text-sm text-slate-500">{selectedStudentIds.length} seleccionados</span>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleEnroll}
              loading={loading}
              disabled={selectedStudentIds.length === 0}
            >
              Matricular ({selectedStudentIds.length})
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EnrollmentModal;
