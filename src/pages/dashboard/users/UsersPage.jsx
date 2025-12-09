import React, { useState, useEffect } from 'react';
import { UserService } from '../../../services/user.service';


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ rol: '', page: 1, limit: 10 });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      if (response.success) {
        setUsers(response.data.usuarios);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const roleColors = {
    admin: 'admin',
    docente: 'docente',
    estudiante: 'estudiante'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Usuarios</h1>
          <p className="text-slate-500 text-sm">Administra los accesos y roles del sistema</p>
        </div>
        <Button onClick={() => alert("Registro solo para Admin (ver contrato auth/register)")}>
          + Nuevo Usuario
        </Button>
      </div>

      <Card className="border-0 shadow-none bg-transparent !p-0">
        {/* Filters */}
        <div className="flex gap-4 mb-4">
            <select 
              className="px-4 py-2 rounded-lg glass-input text-slate-700 font-medium"
              value={filters.rol}
              onChange={(e) => setFilters({...filters, rol: e.target.value})}
            >
              <option value="">Todos los Roles</option>
              <option value="admin">Administrador</option>
              <option value="docente">Docente</option>
              <option value="estudiante">Estudiante</option>
            </select>
        </div>

        <Table headers={['Usuario', 'Rol', 'Contacto', 'Estado', 'Acciones']}>
          {loading ? (
             <TableRow>
                <TableCell className="text-center py-8" colSpan="5">Cargando usuarios...</TableCell>
             </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell className="text-center py-8" colSpan="5">No se encontraron usuarios</TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.usuario_id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {user.nombres[0]}{user.apellidos[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{user.nombres} {user.apellidos}</p>
                      <p className="text-xs text-slate-500">DNI: {user.dni}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={roleColors[user.rol]}>{user.rol.toUpperCase()}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{user.correo}</p>
                    <p className="text-xs text-slate-400">{user.telefono || '-'}</p>
                  </div>
                </TableCell>
                <TableCell>
                   <Badge variant={user.estado === 'activo' ? 'activo' : 'inactivo'}>
                     {user.estado?.toUpperCase() || 'ACTIVO'}
                   </Badge>
                </TableCell>
                <TableCell>
                  <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    Editar
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </Table>
      </Card>
    </div>
  );
};

export default UsersPage;
