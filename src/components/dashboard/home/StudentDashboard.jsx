import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../store/auth.store';

const StudentDashboard = () => {
    const user = useAtomValue(userAtom);
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="bg-primary-700 text-white rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <span className="text-[200px]">🎓</span>
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">¡Hola, {user?.nombres}!</h1>
                    <p className="text-primary-100 text-lg mb-6">¿Listo para seguir aprendiendo? Tienes 2 actividades pendientes hoy.</p>
                    <div className="flex gap-3">
                         <Button onClick={() => navigate('/dashboard/mis-notas')} className="bg-white text-primary-700 border-none hover:bg-primary-50">
                            Ver mis Notas
                         </Button>
                         <Button variant="outline" onClick={() => navigate('/dashboard/mis-asistencias')} className="text-white border-white hover:bg-white/10">
                            Mi Asistencia
                         </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Next Class */}
                <Card title="Tu Próxima Clase" className="border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Física I</h3>
                            <p className="text-slate-500">Aula 302 • Prof. Fernandez</p>
                        </div>
                        <Badge variant="activo">10:00 AM</Badge>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                        <div className="bg-emerald-500 h-full rounded-full" style={{width: '35%'}}></div>
                    </div>
                    <p className="text-xs text-slate-400 text-right">Comienza en 45 min</p>
                </Card>

                {/* Performance */}
                <Card title="Rendimiento Actual" className="border-l-4 border-l-blue-500">
                     <div className="flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-slate-800">16.5</p>
                            <p className="text-xs text-slate-500 font-bold uppercase mt-1">Promedio</p>
                        </div>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-slate-800">3º</p>
                            <p className="text-xs text-slate-500 font-bold uppercase mt-1">Puesto</p>
                        </div>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-emerald-600">95%</p>
                            <p className="text-xs text-slate-500 font-bold uppercase mt-1">Asistencia</p>
                        </div>
                     </div>
                </Card>

                 {/* Upcoming Exams */}
                 <Card title="Próximos Exámenes" className="border-l-4 border-l-purple-500">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-center min-w-[50px]">
                                <p className="text-xs font-bold">SEP</p>
                                <p className="text-lg font-bold leading-none">15</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Simulacro General</p>
                                <p className="text-xs text-slate-500">Todo el campus</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;
