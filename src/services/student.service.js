import api from './api';

export const StudentService = {
  /**
   * Listar estudiantes
   * @param {Object} params - { modalidad, page, limit }
   */
  async getStudents(params = {}) {
    const response = await api.get('/students', { params });
    return response.data;
  },

  /**
   * Obtener estudiante por ID
   * @param {number} id
   */
  async getStudentById(id) {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  /**
   * Crear nuevo estudiante (Admin)
   * @param {Object} data - { usuario_id, modalidad }
   */
  async createStudent(data) {
    const response = await api.post('/students', data);
    return response.data;
  },

  /**
   * Crear estudiante completo (Usuario + Estudiante en una sola operación)
   * @param {Object} data - {
   *   dni, nombres, apellidos, correo, telefono,
   *   modalidad
   * }
   * @returns {Promise} Estudiante creado con datos completos
   */
  async createStudentComplete(data) {
    try {
      // Paso 1: Crear usuario con rol estudiante
      const userData = {
        dni: data.dni,
        nombres: data.nombres,
        apellidos: data.apellidos,
        correo: data.correo || null,
        telefono: data.telefono || null,
        rol: 'estudiante',
      };

      const userResponse = await api.post('/auth/register', userData);

      if (!userResponse.data.success) {
        throw new Error(userResponse.data.message || 'Error al crear usuario');
      }

      const usuario = userResponse.data.data;

      // Paso 2: Crear estudiante con datos académicos
      // Nota: El área se asigna cuando el estudiante se matricula en un grupo
      const studentData = {
        usuarioId: usuario.usuarioId, // Backend espera usuarioId en camelCase
        modalidad: data.modalidad,
      };

      const studentResponse = await api.post('/students', studentData);

      if (!studentResponse.data.success) {
        throw new Error(studentResponse.data.message || 'Error al crear estudiante');
      }

      // Retornar datos completos
      return {
        success: true,
        data: {
          ...studentResponse.data.data,
          usuario,
        },
        message: 'Estudiante creado exitosamente',
      };
    } catch (error) {
      console.error('Error creating complete student:', error);
      throw error;
    }
  },
};
