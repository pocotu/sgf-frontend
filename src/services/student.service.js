import api from './api';

export const StudentService = {
  /**
   * Listar estudiantes
   * @param {Object} params - { modalidad, area, page, limit }
   */
  async getStudents(params = {}) {
    const response = await api.get('/estudiantes', { params });
    return response.data;
  },

  /**
   * Obtener estudiante por ID
   * @param {number} id
   */
  async getStudentById(id) {
    const response = await api.get(`/estudiantes/${id}`);
    return response.data;
  },

  /**
   * Crear nuevo estudiante (Admin)
   * @param {Object} data - { usuario_id, modalidad }
   */
  async createStudent(data) {
    const response = await api.post('/estudiantes', data);
    return response.data;
  },
};
