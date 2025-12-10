import api from './api';

export const GroupService = {
  /**
   * Listar grupos
   * @param {Object} params - { modalidad, area, estado }
   */
  async getGroups(params = {}) {
    // If params.modalidad or params.area is empty string, delete them to avoid sending empty filters if backend strictly checks
    const cleanParams = { ...params };
    if (!cleanParams.modalidad) {
      delete cleanParams.modalidad;
    }
    if (!cleanParams.area) {
      delete cleanParams.area;
    }

    const response = await api.get('/grupos', { params: cleanParams });
    return response.data;
  },

  /**
   * Obtener grupo por ID
   * @param {number} id
   */
  async getGroupById(id) {
    const response = await api.get(`/grupos/${id}`);
    return response.data;
  },

  async createGroup(data) {
    const response = await api.post('/grupos', data);
    return response.data;
  },
};
