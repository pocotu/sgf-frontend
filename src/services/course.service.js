import api from './api';

export const CourseService = {
  /**
   * Listar cursos
   * @param {Object} params - { area }
   */
  async getCourses(params = {}) {
    const response = await api.get('/courses', { params });
    return response.data;
  },

  /**
   * Crear curso (Admin)
   * @param {Object} data - { nombre, area, descripcion }
   */
  async createCourse(data) {
    const response = await api.post('/courses', data);
    return response.data;
  },

  async getCourseById(id) {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
};
