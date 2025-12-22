import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

/**
 * StudentForm Component
 * Formulario unificado para crear estudiantes (Usuario + Estudiante)
 * Siguiendo principios SOLID:
 * - Single Responsibility: Solo maneja la lógica del formulario de estudiante
 * - Open/Closed: Extensible mediante props sin modificar el componente
 */
const StudentForm = ({ onSubmit, onCancel, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      // Datos de Usuario (credenciales)
      dni: '',
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      // Datos de Estudiante (académicos)
      modalidad: 'ORDINARIO',
    },
  );

  const [errors, setErrors] = useState({});

  /**
   * Valida el DNI (8 dígitos)
   */
  const validateDNI = dni => {
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(dni);
  };

  /**
   * Valida el correo electrónico
   */
  const validateEmail = email => {
    if (!email) {
      return true; // Correo es opcional
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valida el teléfono (9 dígitos)
   */
  const validatePhone = phone => {
    if (!phone) {
      return true; // Teléfono es opcional
    }
    const phoneRegex = /^\d{9}$/;
    return phoneRegex.test(phone);
  };

  /**
   * Valida todo el formulario
   */
  const validateForm = () => {
    const newErrors = {};

    // Validaciones de Usuario
    if (!formData.dni) {
      newErrors.dni = 'El DNI es obligatorio';
    } else if (!validateDNI(formData.dni)) {
      newErrors.dni = 'El DNI debe tener 8 dígitos';
    }

    if (!formData.nombres) {
      newErrors.nombres = 'Los nombres son obligatorios';
    }

    if (!formData.apellidos) {
      newErrors.apellidos = 'Los apellidos son obligatorios';
    }

    if (formData.correo && !validateEmail(formData.correo)) {
      newErrors.correo = 'El correo electrónico no es válido';
    }

    if (formData.telefono && !validatePhone(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener 9 dígitos';
    }

    // Validaciones de Estudiante
    if (!formData.modalidad) {
      newErrors.modalidad = 'La modalidad es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el cambio de valores en los inputs
   */
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sección: Datos Personales */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Datos Personales</h3>
        <div className="space-y-4">
          {/* DNI */}
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-slate-700 mb-1">
              DNI <span className="text-red-500">*</span>
            </label>
            <Input
              id="dni"
              name="dni"
              type="text"
              value={formData.dni}
              onChange={handleChange}
              placeholder="12345678"
              maxLength={8}
              disabled={isLoading || initialData !== null}
              className={errors.dni ? 'border-red-500' : ''}
            />
            {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
            {!initialData && (
              <p className="text-xs text-slate-500 mt-1">
                La contraseña inicial será el mismo DNI del estudiante
              </p>
            )}
          </div>

          {/* Nombres */}
          <div>
            <label htmlFor="nombres" className="block text-sm font-medium text-slate-700 mb-1">
              Nombres <span className="text-red-500">*</span>
            </label>
            <Input
              id="nombres"
              name="nombres"
              type="text"
              value={formData.nombres}
              onChange={handleChange}
              placeholder="Juan Carlos"
              disabled={isLoading}
              className={errors.nombres ? 'border-red-500' : ''}
            />
            {errors.nombres && <p className="text-red-500 text-xs mt-1">{errors.nombres}</p>}
          </div>

          {/* Apellidos */}
          <div>
            <label htmlFor="apellidos" className="block text-sm font-medium text-slate-700 mb-1">
              Apellidos <span className="text-red-500">*</span>
            </label>
            <Input
              id="apellidos"
              name="apellidos"
              type="text"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Pérez García"
              disabled={isLoading}
              className={errors.apellidos ? 'border-red-500' : ''}
            />
            {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
          </div>
        </div>
      </div>

      {/* Sección: Datos de Contacto */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Datos de Contacto</h3>
        <div className="space-y-4">
          {/* Correo */}
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-slate-700 mb-1">
              Correo Electrónico <span className="text-slate-400">(opcional)</span>
            </label>
            <Input
              id="correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              placeholder="estudiante@ejemplo.com"
              disabled={isLoading}
              className={errors.correo ? 'border-red-500' : ''}
            />
            {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
            <p className="text-xs text-slate-500 mt-1">
              Opcional para menores de edad según Ley N° 29733
            </p>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-slate-700 mb-1">
              Teléfono <span className="text-slate-400">(opcional)</span>
            </label>
            <Input
              id="telefono"
              name="telefono"
              type="text"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="987654321"
              maxLength={9}
              disabled={isLoading}
              className={errors.telefono ? 'border-red-500' : ''}
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
        </div>
      </div>

      {/* Sección: Datos Académicos */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Datos Académicos</h3>
        <div className="space-y-4">
          {/* Modalidad */}
          <div>
            <label htmlFor="modalidad" className="block text-sm font-medium text-slate-700 mb-1">
              Modalidad de Ingreso <span className="text-red-500">*</span>
            </label>
            <select
              id="modalidad"
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.modalidad ? 'border-red-500' : 'border-slate-300'
              } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
            >
              <option value="ORDINARIO">Ordinario</option>
              <option value="PRIMERA_OPCION">Primera Opción</option>
              <option value="DIRIMENCIA">Dirimencia</option>
            </select>
            {errors.modalidad && <p className="text-red-500 text-xs mt-1">{errors.modalidad}</p>}
            <p className="text-xs text-slate-500 mt-1">
              El área se asignará al matricular al estudiante en un grupo
            </p>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Estudiante'}
        </Button>
      </div>
    </form>
  );
};

StudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    dni: PropTypes.string,
    nombres: PropTypes.string,
    apellidos: PropTypes.string,
    correo: PropTypes.string,
    telefono: PropTypes.string,
    modalidad: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};

export default StudentForm;
