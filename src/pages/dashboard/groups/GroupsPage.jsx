import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GroupService } from '../../../services/group.service';
import { useToast } from '../../../context/ToastContext';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const GroupsPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await GroupService.getGroups();
      if (response.success) {
        setGroups(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Grupos de Estudio</h1>
          <p className="text-slate-500 text-sm">Gestión de aulas y horarios</p>
        </div>
        <Button
          onClick={() => addToast('Funcionalidad solo para administradores (ver contrato)', 'info')}
        >
          + Nuevo Grupo
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Cargando grupos...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groups.map(group => (
            <div
              key={group.grupo_id}
              onClick={() => navigate(`/dashboard/grupos/${group.grupo_id}`)}
              className="group cursor-pointer"
            >
              <Card className="hover:border-primary-300 transition-colors h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {group.nombre_grupo}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {group.modalidad} • Área {group.area}
                    </p>
                  </div>
                  <Badge variant={group.estado === 'ACTIVO' ? 'activo' : 'inactivo'}>
                    {group.estado}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span>🕒</span>
                    <span>
                      {group.dias} | {group.hora_inicio} - {group.hora_fin}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>
                      {group.estudiantes_matriculados} / {group.capacidad} estudiantes
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Capacity */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary-500 h-full rounded-full"
                    style={{
                      width: `${(group.estudiantes_matriculados / group.capacidad) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>Ocupación</span>
                  <span>{group.cupos_disponibles} libres</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
