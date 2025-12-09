import api from './api';

export const CourseService = {
  /**
   * Listar cursos
   * @param {Object} params - { area }
   */
  async getCourses(params = {}) {
    const response = await api.get('/cursos', { params });
    return response.data;
  },

  /**
   * Crear curso (Admin)
   * @param {Object} data - { nombre, area, descripcion }
   */
  async createCourse(data) {
    const response = await api.post('/cursos', data);
    return response.data;
  },

  async getCourseById(id) {
    const response = await api.get(`/cursos/${id}`);
    return response.data;
  }
};
