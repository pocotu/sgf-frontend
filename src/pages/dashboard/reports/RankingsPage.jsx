import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import Table, { TableRow, TableCell } from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import { ReportService } from '../../../services/report.service';

const RankingsPage = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('2025-I');

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const response = await ReportService.getMeritOrder(period);
        if (response.success) {
          setRankings(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, [period]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Orden de Mérito</h1>
          <p className="text-slate-500 text-sm">Rankings académicos por periodo</p>
        </div>
        <select
          value={period}
          onChange={e => setPeriod(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-md bg-white"
        >
          <option value="2025-I">2025-I</option>
          <option value="2024-II">2024-II</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🥇</div>
            <div>
              <p className="text-sm text-yellow-800 font-bold">1er Puesto</p>
              <p className="text-lg font-bold text-slate-800">{rankings[0]?.nombre || '-'}</p>
              <p className="text-xs text-slate-500">Promedio: {rankings[0]?.promedio || '-'}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-slate-50 border-slate-200">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🥈</div>
            <div>
              <p className="text-sm text-slate-600 font-bold">2do Puesto</p>
              <p className="text-lg font-bold text-slate-800">{rankings[1]?.nombre || '-'}</p>
              <p className="text-xs text-slate-500">Promedio: {rankings[1]?.promedio || '-'}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🥉</div>
            <div>
              <p className="text-sm text-orange-800 font-bold">3er Puesto</p>
              <p className="text-lg font-bold text-slate-800">{rankings[2]?.nombre || '-'}</p>
              <p className="text-xs text-slate-500">Promedio: {rankings[2]?.promedio || '-'}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Table headers={['Puesto', 'Estudiante', 'Facultad', 'Promedio Ponderado']}>
          {loading ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                Cargando rankings...
              </TableCell>
            </TableRow>
          ) : (
            rankings.map(r => (
              <TableRow key={r.estudiante_id}>
                <TableCell>
                  <span
                    className={`font-bold ${r.puesto <= 3 ? 'text-primary-600 text-lg' : 'text-slate-500'}`}
                  >
                    #{r.puesto}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-slate-800">{r.nombre}</span>
                </TableCell>
                <TableCell>{r.facultad}</TableCell>
                <TableCell>
                  <Badge variant="primary">{r.promedio}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </Table>
      </Card>
    </div>
  );
};

export default RankingsPage;
