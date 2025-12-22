import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

/**
 * UserForm Component
 * Formulario para crear/editar usuarios siguiendo principios SOLID
 * - Single Responsibility: Solo maneja la lógica del formulario de usuario
 * - Open/Closed: Extensible mediante props sin modificar el componente
 */
const UserForm = ({ onSubmit, onCancel, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      dni: '',
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      rol: 'estudiante',
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

    if (!formData.rol) {
      newErrors.rol = 'El rol es obligatorio';
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <p className="text-xs text-slate-500 mt-1">
          La contraseña inicial será el mismo DNI del usuario
        </p>
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
          placeholder="usuario@ejemplo.com"
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

      {/* Rol */}
      <div>
        <label htmlFor="rol" className="block text-sm font-medium text-slate-700 mb-1">
          Rol <span className="text-red-500">*</span>
        </label>
        <select
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.rol ? 'border-red-500' : 'border-slate-300'
          } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
        >
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="admin">Administrador</option>
        </select>
        {errors.rol && <p className="text-red-500 text-xs mt-1">{errors.rol}</p>}
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Usuario'}
        </Button>
      </div>
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    dni: PropTypes.string,
    nombres: PropTypes.string,
    apellidos: PropTypes.string,
    correo: PropTypes.string,
    telefono: PropTypes.string,
    rol: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};

export default UserForm;
