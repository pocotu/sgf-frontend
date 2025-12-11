import api from './api';

export const UserService = {
  /**
   * Listar usuarios con filtros y paginación
   * @param {Object} params - { rol, page, limit }
   */
  async getUsers(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  },

  /**
   * Obtener usuario por ID
   * @param {number} id
   */
  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Actualizar usuario
   * @param {number} id
   * @param {Object} data - { nombres, apellidos, correo, telefono }
   */
  async updateUser(id, data) {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },
};
