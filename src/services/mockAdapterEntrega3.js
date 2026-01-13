// ============================================
// MOCK ADAPTER - ENTREGA 3 COMPLETA
// Simula TODAS las funcionalidades del backend
// ============================================

import {
  MOCK_USERS,
  MOCK_STUDENTS,
  MOCK_COURSES,
  MOCK_GROUPS,
  MOCK_EVALUATIONS,
  MOCK_GRADES,
  MOCK_RANKINGS,
  MOCK_ATTENDANCES,
  MOCK_ENROLLMENTS,
  MOCK_ACADEMIC_REPORTS,
  MOCK_ATTENDANCE_REPORTS,
  MOCK_DASHBOARD_STATS,
  MOCK_SUSTAINABILITY_METRICS,
} from './mockDataEntrega3';

// Helper para simular latencia de red
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper para match de URLs con parámetros
const matchUrl = (url, pattern) => {
  const regex = new RegExp(`^${pattern.replace(/:[a-zA-Z]+/g, '([^/]+)')}`);
  return url.match(regex);
};

/* eslint-disable complexity */
export const mockRequestEntrega3 = async config => {
  await delay(300); // Simular latencia

  const { url, method, data, params = {} } = config;
  const parsedData = typeof data === 'string' ? JSON.parse(data) : (data || {});

  console.log(`[MOCK E3] ${method.toUpperCase()} ${url}`, params, parsedData);

  try {
    // ============================================
    // AUTENTICACIÓN
    // ============================================
    
    if (url === '/auth/login' && method === 'post') {
      const { dni, identifier, password } = parsedData;
      const loginId = dni || identifier; // Soportar ambos campos
      const user = MOCK_USERS.find(u => 
        (u.dni === loginId || u.correo === loginId) && u.password === password
      );
      
      if (!user) {
        const error = new Error('Credenciales inválidas');
        error.response = {
          status: 401,
          data: { success: false, message: 'Credenciales inválidas' },
        };
        throw error;
      }
      
      const { password: _, ...userWithoutPass } = user;
      return {
        success: true,
        data: {
          token: `mock-jwt-token-${user.usuarioId}-${Date.now()}`,
          user: userWithoutPass,
        },
        message: 'Inicio de sesión exitoso',
      };
    }

    if (url === '/auth/change-password' && method === 'post') {
      return {
        success: true,
        message: 'Contraseña actualizada exitosamente',
      };
    }

    // ============================================
    // USUARIOS (English endpoints)
    // ============================================
    
    if (url === '/users' && method === 'get') {
      let filtered = MOCK_USERS.map(({ password, ...u }) => u);
      
      if (params.rol) {
        filtered = filtered.filter(u => u.rol === params.rol);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    // ============================================
    // ESTUDIANTES (English endpoints)
    // ============================================
    
    if (url === '/students' && method === 'get') {
      let filtered = MOCK_STUDENTS;
      
      if (params.modalidad) {
        filtered = filtered.filter(s => s.modalidad === params.modalidad);
      }
      if (params.area) {
        filtered = filtered.filter(s => s.area_interes === params.area);
      }
      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(s => 
          s.nombres.toLowerCase().includes(search) ||
          s.apellidos.toLowerCase().includes(search) ||
          s.dni.includes(search) ||
          s.codigo_interno.toLowerCase().includes(search)
        );
      }
      
      // Mapear a la estructura que espera el frontend
      const mappedStudents = filtered.map(s => {
        const usuario = MOCK_USERS.find(u => u.usuarioId === s.usuario_id);
        return {
          estudianteId: s.estudiante_id,
          usuarioId: s.usuario_id,
          codigoInterno: s.codigo_interno,
          nombreCompleto: `${s.nombres} ${s.apellidos}`,
          modalidad: s.modalidad,
          areaInteres: s.area_interes,
          usuario: usuario ? {
            dni: usuario.dni,
            correo: usuario.correo,
            estado: usuario.estado,
          } : null,
        };
      });
      
      return {
        success: true,
        data: mappedStudents,
      };
    }

    if (url === '/students' && method === 'post') {
      const newStudent = {
        estudiante_id: MOCK_STUDENTS.length + 1,
        usuario_id: MOCK_USERS.length + 1,
        ...parsedData,
        codigo_interno: `2026-X-${parsedData.modalidad.slice(0, 3).toUpperCase()}-${String(MOCK_STUDENTS.length + 1).padStart(3, '0')}`,
        estado: 'ACTIVO',
        created_at: new Date().toISOString().split('T')[0],
      };
      
      // Agregar a la lista de mocks para que aparezca en la UI
      MOCK_STUDENTS.unshift(newStudent);
      
      // También crear el usuario mock
      const newUser = {
        usuarioId: MOCK_USERS.length + 1,
        dni: parsedData.dni,
        nombres: parsedData.nombres,
        apellidos: parsedData.apellidos,
        rol: 'estudiante',
        correo: parsedData.correo || null,
        password: parsedData.dni,
        requiereCambioPassword: true,
        estado: 'activo',
      };
      MOCK_USERS.push(newUser);
      
      return {
        success: true,
        data: newStudent,
        message: 'Estudiante registrado exitosamente',
      };
    }

    // ============================================
    // CURSOS (English endpoints)
    // ============================================
    
    if (url === '/courses' && method === 'get') {
      let filtered = MOCK_COURSES;
      
      if (params.area) {
        filtered = filtered.filter(c => c.area === params.area);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    // ============================================
    // GRUPOS (English endpoints)
    // ============================================
    
    if (url === '/groups' && method === 'get') {
      let filtered = MOCK_GROUPS;
      
      if (params.modalidad) {
        filtered = filtered.filter(g => g.modalidad === params.modalidad);
      }
      if (params.area) {
        filtered = filtered.filter(g => g.area === params.area);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    // ============================================
    // USUARIOS (Spanish endpoints)
    // ============================================
    
    if (url === '/usuarios' && method === 'get') {
      let filtered = MOCK_USERS.map(({ password, ...u }) => u);
      
      if (params.rol) {
        filtered = filtered.filter(u => u.rol === params.rol);
      }
      
      return {
        success: true,
        data: {
          usuarios: filtered,
          pagination: { page: 1, limit: 100, total: filtered.length },
        },
      };
    }

    if (url === '/usuarios' && method === 'post') {
      const newUser = {
        usuarioId: MOCK_USERS.length + 1,
        ...parsedData,
        password: parsedData.dni, // Password inicial = DNI
        requiereCambioPassword: true,
      };
      
      return {
        success: true,
        data: newUser,
        message: 'Usuario creado exitosamente. Password inicial: DNI',
      };
    }

    // ============================================
    // ESTUDIANTES
    // ============================================
    
    if (url === '/estudiantes' && method === 'get') {
      let filtered = MOCK_STUDENTS;
      
      if (params.modalidad) {
        filtered = filtered.filter(s => s.modalidad === params.modalidad);
      }
      if (params.area) {
        filtered = filtered.filter(s => s.area_interes === params.area);
      }
      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(s => 
          s.nombres.toLowerCase().includes(search) ||
          s.apellidos.toLowerCase().includes(search) ||
          s.dni.includes(search) ||
          s.codigo_interno.toLowerCase().includes(search)
        );
      }
      
      return {
        success: true,
        data: filtered,
        pagination: { page: 1, limit: 100, total: filtered.length },
      };
    }

    if (url === '/estudiantes' && method === 'post') {
      const newStudent = {
        estudiante_id: MOCK_STUDENTS.length + 1,
        ...parsedData,
        codigo_interno: `2025-${parsedData.area_interes}-${parsedData.modalidad.slice(0, 3)}-${String(MOCK_STUDENTS.length + 1).padStart(3, '0')}`,
        estado: 'ACTIVO',
        created_at: new Date().toISOString().split('T')[0],
      };
      
      return {
        success: true,
        data: newStudent,
        message: 'Estudiante registrado exitosamente',
      };
    }

    const studentMatch = matchUrl(url, '/estudiantes/:id');
    if (studentMatch && method === 'get') {
      const id = parseInt(studentMatch[1]);
      const student = MOCK_STUDENTS.find(s => s.estudiante_id === id);
      
      if (!student) {
        throw new Error(JSON.stringify({
          response: { status: 404, data: { success: false, message: 'Estudiante no encontrado' } },
        }));
      }
      
      return { success: true, data: student };
    }

    // ============================================
    // CURSOS
    // ============================================
    
    if (url === '/cursos' && method === 'get') {
      let filtered = MOCK_COURSES;
      
      if (params.area) {
        filtered = filtered.filter(c => c.area === params.area);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    if (url === '/cursos' && method === 'post') {
      const newCourse = {
        curso_id: MOCK_COURSES.length + 1,
        ...parsedData,
        estado: 'activo',
      };
      
      return {
        success: true,
        data: newCourse,
        message: 'Curso creado exitosamente',
      };
    }

    // ============================================
    // GRUPOS
    // ============================================
    
    if (url === '/grupos' && method === 'get') {
      let filtered = MOCK_GROUPS;
      
      if (params.area) {
        filtered = filtered.filter(g => g.area === params.area);
      }
      if (params.modalidad) {
        filtered = filtered.filter(g => g.modalidad === params.modalidad);
      }
      if (params.estado) {
        filtered = filtered.filter(g => g.estado === params.estado);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    if (url === '/grupos' && method === 'post') {
      const newGroup = {
        grupo_id: MOCK_GROUPS.length + 1,
        ...parsedData,
        estudiantes_matriculados: 0,
        cupos_disponibles: parsedData.capacidad,
        estado: 'ACTIVO',
      };
      
      return {
        success: true,
        data: newGroup,
        message: 'Grupo creado exitosamente',
      };
    }

    const groupMatch = matchUrl(url, '/grupos/:id');
    if (groupMatch && method === 'get') {
      const id = parseInt(groupMatch[1]);
      const group = MOCK_GROUPS.find(g => g.grupo_id === id);
      
      if (!group) {
        throw new Error(JSON.stringify({
          response: { status: 404, data: { success: false, message: 'Grupo no encontrado' } },
        }));
      }
      
      return { success: true, data: group };
    }

    // ============================================
    // MATRÍCULAS
    // ============================================
    
    if (url === '/matriculas' && method === 'get') {
      let filtered = MOCK_ENROLLMENTS;
      
      if (params.grupo_id) {
        filtered = filtered.filter(e => e.grupo_id === parseInt(params.grupo_id));
      }
      if (params.estudiante_id) {
        filtered = filtered.filter(e => e.estudiante_id === parseInt(params.estudiante_id));
      }
      if (params.estado) {
        filtered = filtered.filter(e => e.estado === params.estado);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    if (url === '/matriculas' && method === 'post') {
      const { estudiante_id, grupo_id } = parsedData;
      
      // Validaciones
      const student = MOCK_STUDENTS.find(s => s.estudiante_id === estudiante_id);
      const group = MOCK_GROUPS.find(g => g.grupo_id === grupo_id);
      
      if (!student || !group) {
        throw new Error(JSON.stringify({
          response: { status: 404, data: { success: false, message: 'Estudiante o grupo no encontrado' } },
        }));
      }
      
      if (student.modalidad !== group.modalidad) {
        throw new Error(JSON.stringify({
          response: { status: 400, data: { success: false, message: 'Las modalidades no coinciden' } },
        }));
      }
      
      if (group.cupos_disponibles <= 0) {
        throw new Error(JSON.stringify({
          response: { status: 400, data: { success: false, message: 'Grupo lleno (máx. 30 estudiantes)' } },
        }));
      }
      
      const existingEnrollment = MOCK_ENROLLMENTS.find(
        e => e.estudiante_id === estudiante_id && e.estado === 'MATRICULADO'
      );
      
      if (existingEnrollment) {
        throw new Error(JSON.stringify({
          response: { status: 400, data: { success: false, message: 'Estudiante ya matriculado en un grupo activo' } },
        }));
      }
      
      const newEnrollment = {
        matricula_id: MOCK_ENROLLMENTS.length + 1,
        estudiante_id,
        codigo_interno: student.codigo_interno,
        nombre_estudiante: `${student.nombres} ${student.apellidos}`,
        grupo_id,
        nombre_grupo: group.nombre_grupo,
        fecha_matricula: new Date().toISOString().split('T')[0],
        monto_pagado: parsedData.monto_pagado || 500.0,
        estado: 'MATRICULADO',
      };
      
      return {
        success: true,
        data: newEnrollment,
        message: 'Matrícula exitosa',
      };
    }

    // ============================================
    // EVALUACIONES (English endpoints)
    // ============================================
    
    if (url === '/evaluations' && method === 'get') {
      let filtered = MOCK_EVALUATIONS;
      
      if (params.tipo) {
        filtered = filtered.filter(e => e.tipo === params.tipo);
      }
      if (params.estado) {
        filtered = filtered.filter(e => e.estado === params.estado);
      }
      
      // Mapear a la estructura que espera el frontend
      const mappedEvaluations = filtered.map(e => ({
        evaluacionId: e.evaluacion_id,
        descripcion: e.nombre,
        tipo: e.tipo,
        fechaEvaluacion: e.fecha_programada,
        horaInicio: e.hora_inicio,
        duracionMinutos: e.duracion_minutos,
        estado: e.estado,
        puntajeTotal: e.puntaje_total,
        grupo: {
          grupoId: 1,
          nombreGrupo: 'A1-ORD-MAÑ',
          area: 'A',
        },
      }));
      
      return {
        success: true,
        data: mappedEvaluations,
      };
    }

    if (url === '/evaluations' && method === 'post') {
      const newEvaluation = {
        evaluacion_id: MOCK_EVALUATIONS.length + 1,
        ...parsedData,
        estado: 'PROGRAMADA',
      };
      
      return {
        success: true,
        data: newEvaluation,
        message: 'Evaluación programada exitosamente',
      };
    }

    // ============================================
    // EVALUACIONES (Spanish endpoints)
    // ============================================
    
    if (url === '/evaluaciones' && method === 'get') {
      let filtered = MOCK_EVALUATIONS;
      
      if (params.tipo) {
        filtered = filtered.filter(e => e.tipo === params.tipo);
      }
      if (params.estado) {
        filtered = filtered.filter(e => e.estado === params.estado);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    if (url === '/evaluaciones' && method === 'post') {
      const newEvaluation = {
        evaluacion_id: MOCK_EVALUATIONS.length + 1,
        ...parsedData,
        estado: 'PROGRAMADA',
      };
      
      return {
        success: true,
        data: newEvaluation,
        message: 'Evaluación programada exitosamente',
      };
    }

    // ============================================
    // NOTAS
    // ============================================
    
    if (url === '/notas' && method === 'get') {
      let filtered = MOCK_GRADES;
      
      if (params.evaluacion_id) {
        filtered = filtered.filter(g => g.evaluacion_id === parseInt(params.evaluacion_id));
      }
      if (params.estudiante_id) {
        filtered = filtered.filter(g => g.estudiante_id === parseInt(params.estudiante_id));
      }
      if (params.curso_id) {
        filtered = filtered.filter(g => g.curso_id === parseInt(params.curso_id));
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    if (url === '/notas' && method === 'post') {
      const { notas } = parsedData; // Array de notas
      
      return {
        success: true,
        message: 'Notas registradas correctamente. Ranking actualizado.',
        data: { registradas: notas.length },
      };
    }

    // ============================================
    // RANKINGS
    // ============================================
    
    if (url === '/rankings' && method === 'get') {
      let filtered = MOCK_RANKINGS;
      
      if (params.grupo_id) {
        filtered = filtered.filter(r => r.grupo_id === parseInt(params.grupo_id));
      }
      
      // Ordenar por posición
      filtered.sort((a, b) => a.posicion - b.posicion);
      
      return {
        success: true,
        data: {
          rankings: filtered,
          grupo: MOCK_GROUPS.find(g => g.grupo_id === parseInt(params.grupo_id || 1)),
        },
      };
    }

    const rankingStudentMatch = matchUrl(url, '/rankings/estudiante/:id');
    if (rankingStudentMatch && method === 'get') {
      const id = parseInt(rankingStudentMatch[1]);
      const ranking = MOCK_RANKINGS.find(r => r.estudiante_id === id);
      
      if (!ranking) {
        return {
          success: true,
          data: {
            estudiante_id: id,
            posicion: null,
            promedio: 0,
            mensaje: 'Sin notas registradas aún',
          },
        };
      }
      
      return { success: true, data: ranking };
    }

    // ============================================
    // ASISTENCIAS
    // ============================================
    
    if (url === '/asistencias' && method === 'get') {
      let filtered = MOCK_ATTENDANCES;
      
      if (params.grupo_id) {
        filtered = filtered.filter(a => a.grupo_id === parseInt(params.grupo_id));
      }
      if (params.estudiante_id) {
        filtered = filtered.filter(a => a.estudiante_id === parseInt(params.estudiante_id));
      }
      if (params.fecha) {
        filtered = filtered.filter(a => a.fecha === params.fecha);
      }
      
      return {
        success: true,
        data: filtered,
      };
    }

    if (url === '/asistencias' && method === 'post') {
      const { asistencias } = parsedData; // Array de asistencias
      
      return {
        success: true,
        message: 'Asistencias registradas correctamente',
        data: { registradas: asistencias.length },
      };
    }

    if (url.includes('/asistencias/resumen') && method === 'get') {
      const estudianteId = params.estudiante_id;
      
      return {
        success: true,
        data: {
          summary: {
            presentes: 45,
            tardanzas: 3,
            ausencias: 2,
            porcentaje: 94.5,
            total_clases: 50,
          },
          history: MOCK_ATTENDANCES.filter(a => a.estudiante_id === parseInt(estudianteId)).slice(0, 10),
        },
      };
    }

    // ============================================
    // REPORTES
    // ============================================
    
    if (url === '/reportes/merito' && method === 'get') {
      // Orden de Mérito - Rankings generales
      const rankingsData = MOCK_RANKINGS.map((r, index) => {
        const student = MOCK_STUDENTS.find(s => s.estudiante_id === r.estudiante_id);
        const areaNames = {
          'A': 'Ingeniería',
          'B': 'Ciencias de la Salud',
          'C': 'Empresariales',
          'D': 'Sociales y Humanidades',
        };
        
        return {
          estudiante_id: r.estudiante_id,
          puesto: index + 1,
          nombre: r.nombre_completo || `${student?.nombres} ${student?.apellidos}`,
          facultad: areaNames[student?.area_interes] || 'Ciencias',
          promedio: r.promedio.toFixed(2),
        };
      });
      
      return {
        success: true,
        data: rankingsData,
      };
    }
    
    if (url === '/reportes/academico' && method === 'get') {
      return {
        success: true,
        data: MOCK_ACADEMIC_REPORTS,
      };
    }

    if (url === '/reportes/asistencia' && method === 'get') {
      return {
        success: true,
        data: MOCK_ATTENDANCE_REPORTS,
      };
    }

    if (url === '/reportes/grupo/:id' && method === 'get') {
      const grupoId = parseInt(params.grupo_id || 1);
      const grupo = MOCK_GROUPS.find(g => g.grupo_id === grupoId);
      
      return {
        success: true,
        data: {
          grupo,
          estudiantes: MOCK_ENROLLMENTS.filter(e => e.grupo_id === grupoId).length,
          promedio_grupo: 15.8,
          porcentaje_asistencia: 92.1,
          ranking: MOCK_RANKINGS.filter(r => r.grupo_id === grupoId),
        },
      };
    }

    // ============================================
    // DASHBOARD
    // ============================================
    
    if (url === '/dashboard/admin' && method === 'get') {
      return {
        success: true,
        data: MOCK_DASHBOARD_STATS.admin,
      };
    }

    if (url === '/dashboard/docente' && method === 'get') {
      return {
        success: true,
        data: MOCK_DASHBOARD_STATS.docente,
      };
    }

    if (url === '/dashboard/estudiante/:id' && method === 'get') {
      return {
        success: true,
        data: MOCK_DASHBOARD_STATS.estudiante,
      };
    }

    // ============================================
    // SOSTENIBILIDAD (NUEVO - ENTREGA 3)
    // ============================================
    
    if (url === '/sostenibilidad/metricas' && method === 'get') {
      return {
        success: true,
        data: MOCK_SUSTAINABILITY_METRICS,
      };
    }

    // ============================================
    // STORED PROCEDURES (SIMULADOS)
    // ============================================
    
    if (url === '/sp/matricular-estudiante' && method === 'post') {
      // Simula sp_matricular_estudiante
      const { estudiante_id, grupo_id } = parsedData;
      
      // Validaciones del SP
      const student = MOCK_STUDENTS.find(s => s.estudiante_id === estudiante_id);
      const group = MOCK_GROUPS.find(g => g.grupo_id === grupo_id);
      
      if (!student || !group) {
        throw new Error(JSON.stringify({
          response: { status: 404, data: { success: false, message: 'SQLSTATE[45000]: Estudiante o grupo no encontrado' } },
        }));
      }
      
      if (student.modalidad !== group.modalidad) {
        throw new Error(JSON.stringify({
          response: { status: 400, data: { success: false, message: 'SQLSTATE[45000]: Modalidades no coinciden' } },
        }));
      }
      
      if (group.cupos_disponibles <= 0) {
        throw new Error(JSON.stringify({
          response: { status: 400, data: { success: false, message: 'SQLSTATE[45000]: Grupo lleno' } },
        }));
      }
      
      return {
        success: true,
        message: 'Stored Procedure ejecutado: Matrícula exitosa',
        data: { matricula_id: MOCK_ENROLLMENTS.length + 1 },
      };
    }

    if (url === '/sp/ranking-grupo' && method === 'get') {
      // Simula sp_ranking_grupo_evaluacion
      const grupoId = parseInt(params.grupo_id || 1);
      
      return {
        success: true,
        message: 'Stored Procedure ejecutado: Ranking calculado',
        data: {
          rankings: MOCK_RANKINGS.filter(r => r.grupo_id === grupoId),
          calculado_con: 'RANK() OVER (ORDER BY promedio DESC)',
        },
      };
    }

    // ============================================
    // VISTAS SQL (SIMULADAS)
    // ============================================
    
    if (url === '/vistas/estudiantes-completa' && method === 'get') {
      // Simula vista estudiantes_completa (JOIN usuarios + estudiantes)
      const estudiantesCompletos = MOCK_STUDENTS.map(student => {
        const usuario = MOCK_USERS.find(u => u.usuarioId === student.usuario_id);
        return {
          ...student,
          correo_usuario: usuario?.correo,
          requiere_cambio_password: usuario?.requiereCambioPassword,
          rol: usuario?.rol,
        };
      });
      
      return {
        success: true,
        message: 'Vista SQL: estudiantes_completa',
        data: estudiantesCompletos,
      };
    }

    // ============================================
    // OPTIMIZACIONES (SIMULADAS)
    // ============================================
    
    if (url === '/health' && method === 'get') {
      return {
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: '99.9%',
        database: 'connected',
        cache: 'active',
      };
    }

    if (url === '/metrics' && method === 'get') {
      return {
        success: true,
        data: {
          response_time_p95: '245ms',
          throughput: '120 req/s',
          error_rate: '0.3%',
          cache_hit_rate: '85%',
          active_connections: 45,
        },
      };
    }

    // ============================================
    // DEFAULT 404
    // ============================================
    
    throw new Error(JSON.stringify({
      response: {
        status: 404,
        data: { 
          success: false, 
          message: `Endpoint no encontrado: ${method.toUpperCase()} ${url}`,
          mock: 'Entrega 3',
        },
      },
    }));

  } catch (error) {
    // Re-throw errors para que sean manejados por el interceptor
    throw error;
  }
};
/* eslint-enable complexity */
