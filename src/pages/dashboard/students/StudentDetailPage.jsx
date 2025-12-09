import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*
     * Mock fetching single student
     * In a real app we would call StudentService.getStudentById(id)
     * For now, since mockAdapter doesn't support :id params well without regex, we manually mock here or fix adapter
     * Let's implement a simple direct fetch assuming the service handles it or we mock the object directly
     */
    
    // Simulate fetch
    setTimeout(() => {
      setStudent({
        estudiante_id: id,
        codigo_interno: '2025-A-ORD-001',
        dni: '12345678',
        nombre_completo: 'Juan Pérez',
        correo: 'juan@email.com',
        modalidad: 'ORDINARIO',
        area: 'A',
        estado: 'activo'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {return <div className="p-8 text-center text-slate-500">Cargando perfil...</div>;}
  if (!student) {return <div className="p-8 text-center text-red-500">Estudiante no encontrado</div>;}

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="mb-4 pl-0" onClick={() => navigate('/dashboard/estudiantes')}>
        ← Volver a lista
      </Button>

      {/* Header Profile */}
      <Card className="border-l-4 border-l-primary-500">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-500">
            {student.nombre_completo[0]}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{student.nombre_completo}</h1>
              <Badge variant="activo">{student.estado.toUpperCase()}</Badge>
            </div>
            <div className="flex gap-6 text-sm text-slate-600">
              <div>
                <span className="block font-medium text-slate-400">Código</span>
                {student.codigo_interno}
              </div>
              <div>
                <span className="block font-medium text-slate-400">DNI</span>
                {student.dni}
              </div>
              <div>
                <span className="block font-medium text-slate-400">Modalidad</span>
                {student.modalidad}
              </div>
               <div>
                <span className="block font-medium text-slate-400">Área</span>
                {student.area}
              </div>
            </div>
          </div>
          <div>
            <Button variant="outline">Editar Perfil</Button>
          </div>
        </div>
      </Card>

      {/* Tabs / Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Información Académica">
            <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                Gráficos de Rendimiento (Próximamente Sprint 6)
            </div>
        </Card>
        <Card title="Asistencias Recientes">
             <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                Resumen de asistencias (Próximamente Sprint 4)
            </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetailPage;
