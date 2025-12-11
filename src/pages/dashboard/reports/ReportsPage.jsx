import React, { useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportsPage = () => {
  const { addToast } = useToast();
  const [generating, setGenerating] = useState(false);

  const handleGenerate = type => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      addToast(`Funcionalidad de ${type} en desarrollo`, 'info');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Reportes Académicos</h1>
        <p className="text-slate-500 text-sm">Generación y exportación de documentos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Reporte de Notas por Estudiante" className="hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Genera el historial completo de notas de un alumno específico.
            </p>
            <Input placeholder="Buscar por DNI o Código..." />
            <Button
              className="w-full"
              onClick={() => handleGenerate('Historial de Notas')}
              loading={generating}
            >
              Descargar PDF
            </Button>
          </div>
        </Card>

        <Card title="Acta de Notas por Grupo" className="hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Acta oficial de notas finales para cierre de ciclo.
            </p>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-sm">
              <option>-- Seleccionar Grupo --</option>
              <option>G1 - Matemática I</option>
              <option>G2 - Física I</option>
            </select>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleGenerate('Acta Oficial')}
              loading={generating}
            >
              Generar Acta
            </Button>
          </div>
        </Card>

        <Card title="Reporte de Matrícula" className="hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Resumen de matriculados por facultad y modalidad.
            </p>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-sm">
              <option>2025-I</option>
              <option>2024-II</option>
            </select>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => handleGenerate('Resumen Matrícula')}
              loading={generating}
            >
              Exportar Excel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
