import api from './api';

export const ReportService = {
    /**
     * Obtener Orden de Méritos (Rankings)
     * @param {Object} params - Filtros de ranking
     */
    async getMeritOrder(params = {}) {
        const response = await api.get('/reportes/merito', { params });
        return response.data;
    },

    /**
     * Obtener Reporte Académico
     * @param {Object} params - { estudiante_id, periodo }
     */
    async getAcademicReport(params = {}) {
        const response = await api.get('/reportes/academico', { params });
        return response.data;
    }
};
