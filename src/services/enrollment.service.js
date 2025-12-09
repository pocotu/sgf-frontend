import api from './api';

export const EnrollmentService = {
  /**
   * Listar matrículas
   * @param {Object} params - { grupo_id, estudiante_id, estado }
   */
  async getEnrollments(params = {}) {
    const response = await api.get('/matriculas', { params });
    return response.data;
  },

  /**
   * Matricular estudiante
   * @param {Object} data - { estudiante_id, grupo_id, monto_pagado }
   */
  async createEnrollment(data) {
    const response = await api.post('/matriculas', data);
    return response.data;
  }
};
