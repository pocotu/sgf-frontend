// ============================================
// MOCK DATA COMPLETO - ENTREGA 3
// Sistema 100% funcional con datos realistas
// ============================================

// USUARIOS (50+ usuarios)
export const MOCK_USERS = [
  // ADMINISTRADORES
  { usuarioId: 1, dni: '12345678', nombres: 'Administrador', apellidos: 'Admin', rol: 'admin', correo: 'admin@lumen.edu.pe', password: 'password123', requiereCambioPassword: false, estado: 'activo' },
  { usuarioId: 2, dni: '23456789', nombres: 'Carlos', apellidos: 'Mendoza', rol: 'admin', correo: 'cmendoza@lumen.edu.pe', password: 'password123', requiereCambioPassword: false, estado: 'activo' },
  
  // DOCENTES
  { usuarioId: 3, dni: '34567890', nombres: 'Roberto', apellidos: 'Gómez', rol: 'docente', correo: 'rgomez@lumen.edu.pe', password: 'password123', requiereCambioPassword: false, estado: 'activo' },
  { usuarioId: 4, dni: '45678901', nombres: 'Ana', apellidos: 'Torres', rol: 'docente', correo: 'atorres@lumen.edu.pe', password: 'password123', requiereCambioPassword: false, estado: 'activo' },
  { usuarioId: 5, dni: '56789012', nombres: 'Luis', apellidos: 'Vargas', rol: 'docente', correo: 'lvargas@lumen.edu.pe', password: 'password123', requiereCambioPassword: false, estado: 'activo' },
  
  // ESTUDIANTES (30% sin correo = menores de edad)
  ...Array.from({ length: 50 }, (_, i) => ({
    usuarioId: i + 6,
    dni: String(67890123 + i).slice(0, 8),
    estado: 'activo',
    nombres: ['Juan', 'María', 'Pedro', 'Lucía', 'Diego', 'Ana', 'Carlos', 'Sofia', 'Miguel', 'Laura'][i % 10],
    apellidos: ['Pérez', 'García', 'Sánchez', 'Ramírez', 'Flores', 'Torres', 'Mendoza', 'Vargas', 'Castro', 'Rojas'][i % 10],
    rol: 'estudiante',
    correo: i % 3 === 0 ? null : `estudiante${i + 1}@gmail.com`,
    password: 'password123',
    requiereCambioPassword: false,
  })),
];

// ESTUDIANTES COMPLETOS (150 estudiantes)
export const MOCK_STUDENTS = Array.from({ length: 150 }, (_, i) => ({
  estudiante_id: i + 1,
  usuario_id: i + 6,
  codigo_interno: `2025-${['A', 'B', 'C', 'D'][i % 4]}-${['ORD', 'PRI', 'DIR'][i % 3]}-${String(i + 1).padStart(3, '0')}`,
  dni: String(67890123 + i).slice(0, 8),
  nombres: ['Juan', 'María', 'Pedro', 'Lucía', 'Diego', 'Ana', 'Carlos', 'Sofia', 'Miguel', 'Laura'][i % 10],
  apellidos: ['Pérez', 'García', 'Sánchez', 'Ramírez', 'Flores', 'Torres', 'Mendoza', 'Vargas', 'Castro', 'Rojas'][i % 10],
  fecha_nacimiento: `200${5 + (i % 3)}-0${(i % 9) + 1}-${10 + (i % 18)}`,
  correo: i % 3 === 0 ? null : `estudiante${i + 1}@gmail.com`,
  telefono: `98765${String(i).padStart(4, '0')}`,
  direccion: `Av. Principal ${i + 100}, Cusco`,
  modalidad: ['ORDINARIO', 'PRIMERA_OPCION', 'DIRIMENCIA'][i % 3],
  area_interes: ['A', 'B', 'C', 'D'][i % 4],
  colegio_procedencia: ['San Antonio', 'Santa Rosa', 'Salesiano', 'La Salle', 'Ciencias'][i % 5],
  anio_egreso: 2024 + (i % 2),
  nombre_apoderado: `Apoderado ${i + 1}`,
  dni_apoderado: String(40000000 + i),
  telefono_apoderado: `95432${String(i).padStart(4, '0')}`,
  relacion_apoderado: ['Padre', 'Madre', 'Tutor'][i % 3],
  estado: 'ACTIVO',
  created_at: '2025-08-01',
}));

// CURSOS (10 cursos)
export const MOCK_COURSES = [
  { curso_id: 1, nombre: 'Aritmética', area: 'A', descripcion: 'Números reales y operaciones', estado: 'activo' },
  { curso_id: 2, nombre: 'Álgebra', area: 'A', descripcion: 'Polinomios y ecuaciones', estado: 'activo' },
  { curso_id: 3, nombre: 'Geometría', area: 'A', descripcion: 'Figuras planas y sólidos', estado: 'activo' },
  { curso_id: 4, nombre: 'Trigonometría', area: 'A', descripcion: 'Funciones trigonométricas', estado: 'activo' },
  { curso_id: 5, nombre: 'Física', area: 'A', descripcion: 'Mecánica y termodinámica', estado: 'activo' },
  { curso_id: 6, nombre: 'Química', area: 'A', descripcion: 'Química inorgánica y orgánica', estado: 'activo' },
  { curso_id: 7, nombre: 'Biología', area: 'B', descripcion: 'Célula y sistemas', estado: 'activo' },
  { curso_id: 8, nombre: 'Anatomía', area: 'B', descripcion: 'Sistemas del cuerpo humano', estado: 'activo' },
  { curso_id: 9, nombre: 'Economía', area: 'C', descripcion: 'Microeconomía y macroeconomía', estado: 'activo' },
  { curso_id: 10, nombre: 'Historia', area: 'D', descripcion: 'Historia del Perú y universal', estado: 'activo' },
];

// GRUPOS (8 grupos activos)
export const MOCK_GROUPS = [
  { grupo_id: 1, nombre_grupo: 'A1-ORD-MAÑ', nombre_curso: 'Matemática Integral', area: 'A', modalidad: 'ORDINARIO', turno: 'MAÑANA', dias: 'L-M-Mi-J-V-S', hora_inicio: '08:00', hora_fin: '13:00', capacidad: 30, estudiantes_matriculados: 28, cupos_disponibles: 2, docente_id: 3, docente_nombre: 'Roberto Gómez', estado: 'ACTIVO' },
  { grupo_id: 2, nombre_grupo: 'B1-PRI-TAR', nombre_curso: 'Ciencias Sociales', area: 'B', modalidad: 'PRIMERA_OPCION', turno: 'TARDE', dias: 'L-M-Mi-J-V', hora_inicio: '16:00', hora_fin: '20:00', capacidad: 25, estudiantes_matriculados: 20, cupos_disponibles: 5, docente_id: 4, docente_nombre: 'Ana Torres', estado: 'ACTIVO' },
  { grupo_id: 3, nombre_grupo: 'C1-ORD-MAÑ', nombre_curso: 'Ciencias Biológicas', area: 'C', modalidad: 'ORDINARIO', turno: 'MAÑANA', dias: 'L-M-Mi-J-V-S', hora_inicio: '08:00', hora_fin: '13:00', capacidad: 30, estudiantes_matriculados: 25, cupos_disponibles: 5, docente_id: 5, docente_nombre: 'Luis Vargas', estado: 'ACTIVO' },
  { grupo_id: 4, nombre_grupo: 'D1-DIR-MAÑ', nombre_curso: 'Humanidades', area: 'D', modalidad: 'DIRIMENCIA', turno: 'MAÑANA', dias: 'L-M-Mi-J-V-S', hora_inicio: '07:00', hora_fin: '12:00', capacidad: 20, estudiantes_matriculados: 18, cupos_disponibles: 2, docente_id: 3, docente_nombre: 'Roberto Gómez', estado: 'ACTIVO' },
  { grupo_id: 5, nombre_grupo: 'A2-ORD-TAR', nombre_curso: 'Matemática Integral', area: 'A', modalidad: 'ORDINARIO', turno: 'TARDE', dias: 'L-M-Mi-J-V-S', hora_inicio: '14:00', hora_fin: '19:00', capacidad: 30, estudiantes_matriculados: 22, cupos_disponibles: 8, docente_id: 4, docente_nombre: 'Ana Torres', estado: 'ACTIVO' },
  { grupo_id: 6, nombre_grupo: 'B2-ORD-MAÑ', nombre_curso: 'Ciencias Sociales', area: 'B', modalidad: 'ORDINARIO', turno: 'MAÑANA', dias: 'L-M-Mi-J-V-S', hora_inicio: '08:00', hora_fin: '13:00', capacidad: 30, estudiantes_matriculados: 27, cupos_disponibles: 3, docente_id: 5, docente_nombre: 'Luis Vargas', estado: 'ACTIVO' },
  { grupo_id: 7, nombre_grupo: 'C2-PRI-TAR', nombre_curso: 'Ciencias Biológicas', area: 'C', modalidad: 'PRIMERA_OPCION', turno: 'TARDE', dias: 'L-M-Mi-J-V', hora_inicio: '16:00', hora_fin: '20:00', capacidad: 25, estudiantes_matriculados: 15, cupos_disponibles: 10, docente_id: 3, docente_nombre: 'Roberto Gómez', estado: 'ACTIVO' },
  { grupo_id: 8, nombre_grupo: 'D2-ORD-TAR', nombre_curso: 'Humanidades', area: 'D', modalidad: 'ORDINARIO', turno: 'TARDE', dias: 'L-M-Mi-J-V-S', hora_inicio: '14:00', hora_fin: '19:00', capacidad: 30, estudiantes_matriculados: 24, cupos_disponibles: 6, docente_id: 4, docente_nombre: 'Ana Torres', estado: 'ACTIVO' },
];

// EVALUACIONES (Simulacros semanales)
export const MOCK_EVALUATIONS = [
  { evaluacion_id: 1, nombre: 'Simulacro Semana 1', tipo: 'SIMULACRO', semana: 1, fecha_programada: '2025-09-07', hora_inicio: '08:00', duracion_minutos: 180, estado: 'FINALIZADA', puntaje_total: 80 },
  { evaluacion_id: 2, nombre: 'Simulacro Semana 2', tipo: 'SIMULACRO', semana: 2, fecha_programada: '2025-09-14', hora_inicio: '08:00', duracion_minutos: 180, estado: 'FINALIZADA', puntaje_total: 80 },
  { evaluacion_id: 3, nombre: 'Simulacro Semana 3', tipo: 'SIMULACRO', semana: 3, fecha_programada: '2025-09-21', hora_inicio: '08:00', duracion_minutos: 180, estado: 'FINALIZADA', puntaje_total: 80 },
  { evaluacion_id: 4, nombre: 'Simulacro Semana 4', tipo: 'SIMULACRO', semana: 4, fecha_programada: '2025-09-28', hora_inicio: '08:00', duracion_minutos: 180, estado: 'FINALIZADA', puntaje_total: 80 },
  { evaluacion_id: 5, nombre: 'Examen Parcial', tipo: 'PARCIAL', semana: 5, fecha_programada: '2025-10-05', hora_inicio: '08:00', duracion_minutos: 240, estado: 'FINALIZADA', puntaje_total: 100 },
  { evaluacion_id: 6, nombre: 'Simulacro Semana 6', tipo: 'SIMULACRO', semana: 6, fecha_programada: '2025-10-12', hora_inicio: '08:00', duracion_minutos: 180, estado: 'PROGRAMADA', puntaje_total: 80 },
  { evaluacion_id: 7, nombre: 'Simulacro Semana 7', tipo: 'SIMULACRO', semana: 7, fecha_programada: '2025-10-19', hora_inicio: '08:00', duracion_minutos: 180, estado: 'PROGRAMADA', puntaje_total: 80 },
  { evaluacion_id: 8, nombre: 'Simulacro Semana 8', tipo: 'SIMULACRO', semana: 8, fecha_programada: '2025-10-26', hora_inicio: '08:00', duracion_minutos: 180, estado: 'PROGRAMADA', puntaje_total: 80 },
];

// NOTAS (Generadas para 30 estudiantes en 5 evaluaciones)
export const MOCK_GRADES = (() => {
  const grades = [];
  for (let evalId = 1; evalId <= 5; evalId++) {
    for (let studentId = 1; studentId <= 30; studentId++) {
      for (let courseId = 1; courseId <= 6; courseId++) {
        grades.push({
          nota_id: grades.length + 1,
          estudiante_id: studentId,
          evaluacion_id: evalId,
          curso_id: courseId,
          nota: Math.floor(Math.random() * 10) + 11, // 11-20
          fecha_registro: `2025-09-${String(evalId * 7).padStart(2, '0')}`,
        });
      }
    }
  }
  return grades;
})();

// RANKINGS (Top 30 estudiantes del grupo A1)
export const MOCK_RANKINGS = MOCK_STUDENTS.slice(0, 30).map((student, index) => {
  const promedio = parseFloat((18.5 - index * 0.25).toFixed(2));
  return {
    estudiante_id: student.estudiante_id,
    nombre_completo: `${student.nombres} ${student.apellidos}`,
    codigo_interno: student.codigo_interno,
    grupo_id: 1,
    promedio,
    posicion: index + 1,
    total_estudiantes: 30,
    estado: promedio >= 11 ? 'Aprobado' : 'Desaprobado',
  };
});

// ASISTENCIAS (5 días de clases para 30 estudiantes)
export const MOCK_ATTENDANCES = (() => {
  const attendances = [];
  const fechas = ['2025-09-01', '2025-09-02', '2025-09-03', '2025-09-04', '2025-09-05'];
  const estados = ['PRESENTE', 'PRESENTE', 'PRESENTE', 'PRESENTE', 'TARDANZA', 'AUSENTE'];
  
  for (const fecha of fechas) {
    for (let studentId = 1; studentId <= 30; studentId++) {
      attendances.push({
        asistencia_id: attendances.length + 1,
        estudiante_id: studentId,
        grupo_id: 1,
        fecha,
        estado: estados[Math.floor(Math.random() * estados.length)],
        hora_llegada: '08:00',
        observacion: null,
      });
    }
  }
  return attendances;
})();

// MATRICULAS (150 estudiantes distribuidos en 8 grupos)
export const MOCK_ENROLLMENTS = MOCK_STUDENTS.map((student, index) => ({
  matricula_id: index + 1,
  estudiante_id: student.estudiante_id,
  codigo_interno: student.codigo_interno,
  nombre_estudiante: `${student.nombres} ${student.apellidos}`,
  grupo_id: (index % 8) + 1,
  nombre_grupo: MOCK_GROUPS[index % 8].nombre_grupo,
  fecha_matricula: '2025-08-28',
  monto_pagado: 500.0,
  estado: 'MATRICULADO',
}));

// REPORTES ACADÉMICOS
export const MOCK_ACADEMIC_REPORTS = {
  resumen_general: {
    total_estudiantes: 150,
    total_aprobados: 135,
    total_desaprobados: 15,
    promedio_general: 15.8,
    porcentaje_aprobacion: 90,
    porcentaje_asistencia: 91.4,
  },
  por_area: [
    { area: 'A', nombre: 'Ingeniería', total: 45, aprobados: 40, desaprobados: 5, promedio: 16.2, porcentaje: 88.9 },
    { area: 'B', nombre: 'Salud', total: 38, aprobados: 35, desaprobados: 3, promedio: 15.8, porcentaje: 92.1 },
    { area: 'C', nombre: 'Empresariales', total: 35, aprobados: 32, desaprobados: 3, promedio: 15.5, porcentaje: 91.4 },
    { area: 'D', nombre: 'Sociales', total: 32, aprobados: 28, desaprobados: 4, promedio: 15.2, porcentaje: 87.5 },
  ],
  por_modalidad: [
    { modalidad: 'ORDINARIO', total: 90, aprobados: 80, desaprobados: 10, promedio: 15.9, porcentaje: 88.9 },
    { modalidad: 'PRIMERA_OPCION', total: 40, aprobados: 38, desaprobados: 2, promedio: 16.1, porcentaje: 95.0 },
    { modalidad: 'DIRIMENCIA', total: 20, aprobados: 17, desaprobados: 3, promedio: 15.5, porcentaje: 85.0 },
  ],
  cursos_bajo_promedio: [
    { curso: 'Física', promedio: 13.2, total_estudiantes: 150, aprobados: 120, porcentaje: 80.0 },
    { curso: 'Química', promedio: 13.8, total_estudiantes: 150, aprobados: 130, porcentaje: 86.7 },
  ],
  top_estudiantes: MOCK_RANKINGS.slice(0, 10),
};

// REPORTES DE ASISTENCIA
export const MOCK_ATTENDANCE_REPORTS = {
  resumen_general: {
    total_clases: 100,
    promedio_asistencia: 91.4,
    total_presentes: 9140,
    total_tardanzas: 520,
    total_ausentes: 340,
  },
  por_grupo: MOCK_GROUPS.map((group, index) => ({
    grupo_id: group.grupo_id,
    nombre_grupo: group.nombre_grupo,
    porcentaje_asistencia: parseFloat((88 + Math.random() * 8).toFixed(1)),
    total_faltas: Math.floor(Math.random() * 50) + 10,
    total_tardanzas: Math.floor(Math.random() * 30) + 5,
  })),
  estudiantes_bajo_80: [
    { estudiante: 'Pedro Sánchez', codigo: '2025-A-ORD-003', porcentaje: 75.5, faltas: 12, grupo: 'A1-ORD-MAÑ' },
    { estudiante: 'Lucía Ramírez', codigo: '2025-B-PRI-004', porcentaje: 78.2, faltas: 10, grupo: 'B1-PRI-TAR' },
  ],
};

// DASHBOARD STATS
export const MOCK_DASHBOARD_STATS = {
  admin: {
    total_estudiantes: 150,
    total_docentes: 5,
    total_cursos: 10,
    total_grupos: 8,
    estudiantes_activos: 150,
    grupos_activos: 8,
    promedio_general: 15.8,
    porcentaje_asistencia: 91.4,
    ultimas_matriculas: MOCK_ENROLLMENTS.slice(0, 5).map(e => ({
      ...e,
      fecha: '2025-08-28',
      tiempo: 'Hace 2 días',
    })),
    distribucion_modalidad: [
      { name: 'Ordinario', value: 90, color: '#3b82f6' },
      { name: 'Primera Opción', value: 40, color: '#10b981' },
      { name: 'Dirimencia', value: 20, color: '#f59e0b' },
    ],
    distribucion_area: [
      { name: 'Área A', value: 45, color: '#3b82f6' },
      { name: 'Área B', value: 38, color: '#10b981' },
      { name: 'Área C', value: 35, color: '#f59e0b' },
      { name: 'Área D', value: 32, color: '#ef4444' },
    ],
  },
  docente: {
    mis_grupos: MOCK_GROUPS.slice(0, 3),
    total_estudiantes: 73,
    clases_hoy: 4,
    evaluaciones_pendientes: 2,
    promedio_asistencia: 92.1,
    proximas_evaluaciones: MOCK_EVALUATIONS.filter(e => e.estado === 'PROGRAMADA').slice(0, 3),
  },
  estudiante: {
    mi_grupo: MOCK_GROUPS[0],
    mi_posicion: 5,
    mi_promedio: 16.8,
    mi_asistencia: 94.5,
    total_estudiantes_grupo: 30,
    proximas_evaluaciones: MOCK_EVALUATIONS.filter(e => e.estado === 'PROGRAMADA').slice(0, 3),
    mis_ultimas_notas: [
      { curso: 'Aritmética', nota: 18, evaluacion: 'Simulacro Semana 4' },
      { curso: 'Álgebra', nota: 17, evaluacion: 'Simulacro Semana 4' },
      { curso: 'Geometría', nota: 16, evaluacion: 'Simulacro Semana 4' },
      { curso: 'Física', nota: 15, evaluacion: 'Simulacro Semana 4' },
    ],
  },
};

// MÉTRICAS DE SOSTENIBILIDAD (Entrega 3)
export const MOCK_SUSTAINABILITY_METRICS = {
  impacto_social: {
    beneficiarios_directos: 166,
    estudiantes: 150,
    docentes: 12,
    administrativos: 4,
    satisfaccion_promedio: 91.4,
    estudiantes_sin_correo: 45,
    porcentaje_sin_correo: 30,
    accesibilidad_menores: 'Sistema adaptado para menores sin correo electrónico',
  },
  impacto_ambiental: {
    ahorro_papel_hojas: 12320,
    ahorro_papel_ciclo: '12,320 hojas/ciclo',
    reduccion_co2_kg: 61.6,
    reduccion_co2_ciclo: '61.6 kg CO2/ciclo',
    digitalizacion_procesos: '100%',
    arboles_salvados: 1.5,
  },
  impacto_economico: {
    beneficio_neto: 20101.50,
    beneficio_neto_formato: 'S/. 20,101.50/ciclo',
    roi_porcentaje: 208,
    roi_formato: '208%',
    ahorro_operativo: 9664.00,
    ahorro_operativo_formato: 'S/. 9,664/ciclo',
    costo_implementacion: 9664.00,
    ingresos_anuales: 30000.00,
  },
  cumplimiento_responsabilidades: {
    eticas: 95.8,
    legales: 100,
    sociales: 91.7,
    promedio_general: 95.8,
  },
};
