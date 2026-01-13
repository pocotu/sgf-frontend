import api from './api';

/**
 * UserService
 * Servicio para gestión de usuarios siguiendo principios SOLID
 * - Single Responsibility: Solo maneja operaciones de usuarios
 * - Dependency Inversion: Depende de la abstracción 'api'
 */
export const UserService = {
  /**
   * Listar usuarios con filtros y paginación
   * @param {Object} params - { rol, page, limit }
   * @returns {Promise<Object>} Response con lista de usuarios
   */
  async getUsers(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  },

  /**
   * Obtener usuario por ID
   * @param {number} id - ID del usuario
   * @returns {Promise<Object>} Response con datos del usuario
   */
  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Crear nuevo usuario
   * @param {Object} data - { dni, nombres, apellidos, correo, telefono, rol }
   * @returns {Promise<Object>} Response con usuario creado
   */
  async createUser(data) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Actualizar usuario
   * @param {number} id - ID del usuario
   * @param {Object} data - { nombres, apellidos, correo, telefono }
   * @returns {Promise<Object>} Response con usuario actualizado
   */
  async updateUser(id, data) {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar usuario (soft delete)
   * @param {number} id - ID del usuario
   * @returns {Promise<Object>} Response de confirmación
   */
  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
