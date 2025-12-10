import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';
import { EvaluationService } from '../../../services/evaluation.service';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Table, { TableRow, TableCell } from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import EvaluationCreateModal from '../../../components/dashboard/evaluations/EvaluationCreateModal';

const EvaluationsPage = () => {
  const user = useAtomValue(userAtom);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchEvaluations = async () => {
    setLoading(true);
    try {
      const response = await EvaluationService.getEvaluations();
      if (response.success) {
        setEvaluations(response.data);
      }
    } catch (error) {
      console.error('Error fetching evaluations', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const statusVariant = status => {
    switch (status) {
      case 'PROGRAMADA':
        return 'warning';
      case 'EN_CURSO':
        return 'activo';
      case 'FINALIZADA':
        return 'success';
      case 'CANCELADA':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Evaluaciones</h1>
          <p className="text-slate-500 text-sm">Calendario de exámenes y simulacros</p>
        </div>
        {user?.rol === 'admin' && (
          <Button onClick={() => setShowModal(true)}>+ Programar Evaluación</Button>
        )}
      </div>

      <Card>
        <Table headers={['Nombre', 'Tipo', 'Fecha', 'Estado']}>
          {loading ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                Cargando...
              </TableCell>
            </TableRow>
          ) : evaluations.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                No hay evaluaciones programadas
              </TableCell>
            </TableRow>
          ) : (
            evaluations.map(eva => (
              <TableRow key={eva.evaluacion_id}>
                <TableCell>
                  <span className="font-semibold text-slate-800">{eva.nombre}</span>
                </TableCell>
                <TableCell>{eva.tipo}</TableCell>
                <TableCell>{eva.fecha_programada}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(eva.estado)}>{eva.estado}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </Table>
      </Card>

      <EvaluationCreateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchEvaluations}
      />
    </div>
  );
};

export default EvaluationsPage;
