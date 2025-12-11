import api from './api';

export const GradeService = {
  /**
   * Registrar notas (Docente/Admin)
   * @param {Object} data - { evaluacion_id, grupo_id, notas: [{ estudiante_id, valor, curso_id }, ...] }
   * Note: The structure depends on whether we grade by course or global evaluation.
   * Assuming Evaluation is global but grade is per course if it's a "simulacro" type covering multiple courses?
   * OR simple model: One evaluation = One grade per student?
   * Based on API Contracts: GET /notas query params include evaluacion_id, estudiante_id, curso_id.
   * Let's assume for this sprint: Simple grading (One grade per student per evaluation/course context).
   */
  async registerGrades(data) {
    const response = await api.post('/grades', data);
    return response.data;
  },

  /**
   * Obtener notas
   * params: { evaluacion_id, estudiante_id, grupo_id }
   */
  async getGrades(params = {}) {
    const response = await api.get('/grades', { params });
    return response.data;
  },
};
