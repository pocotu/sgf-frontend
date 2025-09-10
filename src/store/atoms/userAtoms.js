// userAtoms.js - Atoms usuarios del sistema
import { atom } from 'jotai';

// Atom para la lista de usuarios
export const usersListAtom = atom([]);

// Atom para el usuario seleccionado
export const selectedUserAtom = atom(null);

// Atom para el estado de loading de usuarios
export const usersLoadingAtom = atom(false);

// Atom para filtros de usuarios
export const usersFiltersAtom = atom({
  role: '',
  status: '',
  search: ''
});

// Atom para paginación de usuarios
export const usersPaginationAtom = atom({
  page: 1,
  limit: 10,
  total: 0
});

// Atom derivado para usuarios filtrados
export const filteredUsersAtom = atom((get) => {
  const users = get(usersListAtom);
  const filters = get(usersFiltersAtom);
  
  return users.filter(user => {
    if (filters.role && user.role !== filters.role) return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
});
