import React, { useState, useEffect } from 'react';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { StudentService } from '../../../services/student.service';
import { UserService } from '../../../services/user.service';

const StudentCreateModal = ({ isOpen, onClose, onSuccess }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [modality, setModality] = useState('ORDINARIO');

  /*
   * Load potential candidates (users with role 'estudiante' but maybe not registered in student table distinctively, 
   * or just any user we want to promote. API Contract says POST /estudiantes requires usuario_id.
   * We'll fetch all users for selection.
   */
  const fetchUsers = async () => {
      try {
          const res = await UserService.getUsers(); // Assuming this lists all users
          if (res.success) {
              setUsers(res.data.usuarios || []);
          }
      } catch (error) {
          console.error("Error loading users", error);
      }
  };

  useEffect(() => {
      if (isOpen) {
          fetchUsers();
          setSelectedUser(null);
          setModality('ORDINARIO');
          setSearchTerm('');
      }
  }, [isOpen]);

  useEffect(() => {
    if (!users) {return;}
    const term = searchTerm.toLowerCase();
    setFilteredUsers(users.filter(u => 
        (`${u.nombres  } ${  u.apellidos}`).toLowerCase().includes(term) ||
        u.dni.includes(term)
    ));
  }, [searchTerm, users]);

  const handleSubmit = async () => {
      if (!selectedUser) {return;}
      setLoading(true);
      try {
          const response = await StudentService.createStudent({
              usuario_id: selectedUser.usuario_id,
              modalidad: modality
          });

          if (response.success) {
              addToast('Estudiante registrado exitosamente', 'success');
              onSuccess();
              onClose();
          } else {
              addToast(response.error || "Error al registrar estudiante", 'error');
          }
      } catch (error) {
          console.error(error);
          addToast("Error de conexión", 'error');
      } finally {
          setLoading(false);
      }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Estudiante">
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
            Busca un usuario existente para registrarlo como estudiante académico.
        </p>

        {/* User Search */}
        <div>
            <Input 
                label="Buscar Usuario" 
                placeholder="Nombre o DNI..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* User List Info */}
            {selectedUser ? (
                <div className="mt-2 p-3 bg-primary-50 border border-primary-200 rounded-md flex justify-between items-center">
                    <div>
                        <p className="font-bold text-primary-900">{selectedUser.nombres} {selectedUser.apellidos}</p>
                        <p className="text-xs text-primary-700">DNI: {selectedUser.dni}</p>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="text-sm text-primary-600 hover:text-primary-800">
                        Cambiar
                    </button>
                </div>
            ) : (
                <div className="mt-2 max-h-40 overflow-y-auto border rounded-md bg-white">
                    {filteredUsers.length === 0 ? (
                        <div className="p-3 text-center text-slate-400 text-sm">No se encontraron usuarios</div>
                    ) : (
                        filteredUsers.map(user => (
                            <div 
                                key={user.usuario_id}
                                className="p-2 border-b last:border-0 hover:bg-slate-50 cursor-pointer text-sm"
                                onClick={() => setSelectedUser(user)}
                            >
                                <span className="font-medium text-slate-700">{user.nombres} {user.apellidos}</span>
                                <span className="text-slate-400 mx-2">|</span>
                                <span className="text-slate-500">{user.dni}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>

        {/* Modality Selection */}
        <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Modalidad de Ingreso</label>
            <select 
                className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                value={modality}
                onChange={(e) => setModality(e.target.value)}
            >
                <option value="ORDINARIO">Ordinario</option>
                <option value="PRIMERA_OPCION">Primera Opción</option>
                <option value="DIRIMENCIA">Dirimencia</option>
            </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button 
                onClick={handleSubmit} 
                loading={loading}
                disabled={!selectedUser}
            >
                Registrar
            </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentCreateModal;
