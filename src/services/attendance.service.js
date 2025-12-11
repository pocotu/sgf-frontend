import api from './api';

export const AttendanceService = {
  /**
   * Listar asistencias
   * @param {Object} params - { grupo_id, fecha_desde, fecha_hasta, estudiante_id }
   */
  async getAttendance(params = {}) {
    const response = await api.get('/attendances', { params });
    return response.data;
  },

  /**
   * Registrar asistencia (Masivo)
   * @param {Object} data - { grupo_id, fecha_clase, asistencias: [{estudiante_id, estado}, ...] }
   */
  async registerAttendance(data) {
    const response = await api.post('/attendances', data);
    return response.data;
  },

  /**
   * Obtener resumen de asistencia de un estudiante
   */
  async getStudentAttendanceSummary(estudianteId) {
    const response = await api.get(`/attendances/student/${estudianteId}/summary`);
    return response.data;
  },
};
