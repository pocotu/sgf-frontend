import React, { useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { EvaluationService } from '../../../services/evaluation.service';

const EvaluationCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
      nombre: '',
      tipo: 'SIMULACRO',
      fecha_programada: '',
      descripcion: ''
  });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
      setLoading(true);
      try {
          const response = await EvaluationService.createEvaluation(formData);
          if (response.success) {
              addToast('Evaluación programada con éxito', 'success');
              onSuccess();
              onClose();
          } else {
              addToast("Error al crear evaluación", 'error');
          }
      } catch (error) {
          console.error("Error creating evaluation", error);
      } finally {
          setLoading(false);
      }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Programar Evaluación">
      <div className="space-y-4">
        <Input 
            label="Nombre de la Evaluación" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange}
            placeholder="Ej: Primer Parcial 2025-II"
        />

        <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Tipo</label>
            <select 
                name="tipo" 
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                <option value="SIMULACRO">Simulacro</option>
                <option value="PARCIAL">Examen Parcial</option>
                <option value="FINAL">Examen Final</option>
                <option value="ENTRADA">Examen de Entrada</option>
            </select>
        </div>

        <Input 
            label="Fecha Programada" 
            type="date"
            name="fecha_programada" 
            value={formData.fecha_programada} 
            onChange={handleChange}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSubmit} loading={loading}>Programar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EvaluationCreateModal;
