import React, { useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { CourseService } from '../../../services/course.service';

const CourseCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    area: 'A',
    descripcion: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      /*
       * Assuming CourseService has createCourse, if not I need to check service file.
       * Based on API Contract: POST /cursos
       */
      const response = await CourseService.createCourse(formData);
      if (response.success) {
        addToast('Curso creado exitosamente', 'success');
        onSuccess();
        onClose();
        setFormData({ nombre: '', area: 'A', descripcion: '' });
      } else {
        addToast('Error al crear curso', 'error');
      }
    } catch (error) {
      console.error(error);
      addToast('Error de conexión', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Curso">
      <div className="space-y-4">
        <Input
          label="Nombre del Curso"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Aritmética Avanzada"
          required
        />

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Área Académica</label>
          <select
            name="area"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
            value={formData.area}
            onChange={handleChange}
          >
            <option value="A">Área A (Ingenierías)</option>
            <option value="B">Área B (Biomédicas)</option>
            <option value="C">Área C (Sociales)</option>
            <option value="D">Área D (Económicas)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Descripción</label>
          <textarea
            name="descripcion"
            className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white h-24 resize-none"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción breve del contenido del curso..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} loading={loading} disabled={!formData.nombre}>
            Crear Curso
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CourseCreateModal;
