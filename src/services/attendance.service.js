import api from './api';

export const AttendanceService = {
  /**
   * Listar asistencias
   * @param {Object} params - { grupo_id, fecha_desde, fecha_hasta, estudiante_id }
   */
  async getAttendance(params = {}) {
    const response = await api.get('/asistencias', { params });
    return response.data;
  },

  /**
   * Registrar asistencia (Masivo)
   * @param {Object} data - { grupo_id, fecha_clase, asistencias: [{estudiante_id, estado}, ...] }
   */
  async registerAttendance(data) {
    const response = await api.post('/asistencias', data);
    return response.data;
  },

  /**
   * Obtener resumen de asistencia de un estudiante
   */
  async getStudentAttendanceSummary(estudianteId) {
      const response = await api.get(`/asistencias/estudiante/${estudianteId}/resumen`);
      return response.data;
  }
};
