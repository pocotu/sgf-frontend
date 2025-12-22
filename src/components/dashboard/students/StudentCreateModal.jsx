import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../ui/Modal';
import StudentForm from './StudentForm';
import { StudentService } from '../../../services/student.service';

/**
 * StudentCreateModal Component
 * Modal para crear estudiantes completos (Usuario + Estudiante)
 * Siguiendo principios SOLID:
 * - Single Responsibility: Solo maneja la lógica del modal de creación
 * - Dependency Inversion: Depende de abstracciones (StudentService)
 */
const StudentCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  /**
   * Maneja la creación del estudiante completo
   * Crea Usuario + Estudiante en una sola operación
   */
  const handleSubmit = async formData => {
    setLoading(true);
    try {
      const response = await StudentService.createStudentComplete(formData);

      if (response.success) {
        addToast('Estudiante creado exitosamente', 'success');
        onSuccess();
        onClose();
      } else {
        addToast(response.message || 'Error al crear estudiante', 'error');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al crear estudiante. Verifique los datos.';
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nuevo Estudiante">
      <div className="text-sm text-slate-600 mb-6">
        Complete los datos personales, de contacto y académicos del estudiante. El sistema creará
        automáticamente las credenciales de acceso.
      </div>
      <StudentForm onSubmit={handleSubmit} onCancel={onClose} isLoading={loading} />
    </Modal>
  );
};

StudentCreateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default StudentCreateModal;
