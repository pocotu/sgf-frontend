import api from './api';

export const EvaluationService = {
  /**
   * Listar evaluaciones
   * @param {Object} params - { grupo_id, estado }
   */
  async getEvaluations(params = {}) {
    const response = await api.get('/evaluaciones', { params });
    return response.data;
  },

  /**
   * Crear evaluación (Admin)
   * @param {Object} data - { nombre, tipo, fecha_programada, grupo_id (opcional) }
   */
  async createEvaluation(data) {
    const response = await api.post('/evaluaciones', data);
    return response.data;
  },

  /**
   * Obtener evaluación por ID
   */
  async getEvaluationById(id) {
    const response = await api.get(`/evaluaciones/${id}`);
    return response.data;
  }
};
