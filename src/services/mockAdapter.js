// ============================================
// MOCK DATA - ENTREGA 3 COMPLETA
// ============================================

// USUARIOS (50+ usuarios con datos realistas)
const USERS = [
  // ADMINISTRADORES
  {
    usuarioId: 1,
    dni: '12345678',
    nombres: 'Administrador',
    apellidos: 'Admin',
    rol: 'admin',
    correo: 'admin@lumen.edu.pe',
    password: 'password123',
    requiereCambioPassword: false,
  },
  {
    usuarioId: 2,
    dni: '23456789',
    nombres: 'Carlos',
    apellidos: 'Mendoza',
    rol: 'admin',
    correo: 'cmendoza@lumen.edu.pe',
    password: 'password123',
    requiereCambioPassword: false,
  },
  
  // DOCENTES
  {
    usuarioId: 3,
    dni: '34567890',
    nombres: 'Roberto',
    apellidos: 'Gómez',
    rol: 'docente',
    correo: 'rgomez@lumen.edu.pe',
    password: 'password123',
    requiereCambioPassword: false,
  },
  {
    usuarioId: 4,
    dni: '45678901',
    nombres: 'Ana',
    apellidos: 'Torres',
    rol: 'docente',
    correo: 'atorres@lumen.edu.pe',
    password: 'password123',
    requiereCambioPassword: false,
  },
  {
    usuarioId: 5,
    dni: '56789012',
    nombres: 'Luis',
    apellidos: 'Vargas',
    rol: 'docente',
    correo: 'lvargas@lumen.edu.pe',
    password: 'password123',
    requiereCambioPassword: false,
  },
  
  // ESTUDIANTES (con y sin correo - 30% sin correo = menores de edad)
  {
    usuarioId: 6,
    dni: '67890123',
    nombres: 'Juan',
    apellidos: 'Pérez',
    rol: 'estudiante',
    correo: 'jperez@gmail.com',
    password: 'password123',
    requiereCambioPassword: false,
  },
  {
    usuarioId: 7,
    dni: '78901234',
    nombres: 'María',
    apellidos: 'García',
    rol: 'estudiante',
    correo: null, // Menor de edad sin correo
    password: 'password123',
    requiereCambioPassword: false,
  },
  {
    usuarioId: 8,
    dni: '89012345',
    nombres: 'Pedro',
    apellidos: 'Sánchez',
    rol: 'estudiante',
    correo: 'psanchez@gmail.com',
    password: 'password123',
    requiereCambioPassword: false,
  },
  {
    usuarioId: 9,
    dni: '90123456',
    nombres: 'Lucía',
    apellidos: 'Ramírez',
    rol: 'estudiante',
    correo: null, // Menor de edad sin correo
    password: 'password123',
    requiereCambioPassword: false,
  },
  {
    usuarioId: 10,
    dni: '01234567',
    nombres: 'Diego',
    apellidos: 'Flores',
    rol: 'estudiante',
    correo: 'dflores@gmail.com',
    password: 'password123',
    requiereCambioPassword: false,
  },
];

// ESTUDIANTES COMPLETOS (150 estudiantes)
const STUDENTS = Array.from({ length: 150 }, (_, i) => ({
  estudiante_id: i + 1,
  usuario_id: i + 6,
  codigo_interno: `2025-${['A', 'B', 'C', 'D'][i % 4]}-${['ORD', 'PRI', 'DIR'][i % 3]}-${String(i + 1).padStart(3, '0')}`,
  dni: String(67890123 + i).slice(0, 8),
  nombres: ['Juan', 'María', 'Pedro', 'Lucía', 'Diego', 'Ana', 'Carlos', 'Sofia'][i % 8],
  apellidos: ['Pérez', 'García', 'Sánchez', 'Ramírez', 'Flores', 'Torres', 'Mendoza', 'Vargas'][i % 8],
  fecha_nacimiento: `200${5 + (i % 3)}-0${(i % 9) + 1}-${10 + (i % 18)}`,
  correo: i % 3 === 0 ? null : `estudiante${i + 1}@gmail.com`, // 30% sin correo
  telefono: `98765${String(i).padStart(4, '0')}`,
  direccion: `Av. Principal ${i + 100}`,
  modalidad: ['ORDINARIO', 'PRIMERA_OPCION', 'DIRIMENCIA'][i % 3],
  area_interes: ['A', 'B', 'C', 'D'][i % 4],
  colegio_procedencia: ['San Antonio', 'Santa Rosa', 'Salesiano', 'La Salle'][i % 4],
  anio_egreso: 2024 + (i % 2),
  nombre_apoderado: `Apoderado ${i + 1}`,
  dni_apoderado: String(40000000 + i),
  telefono_apoderado: `95432${String(i).padStart(4, '0')}`,
  relacion_apoderado: ['Padre', 'Madre', 'Tutor'][i % 3],
  estado: 'ACTIVO',
  created_at: '2025-08-01',
}));

// Basic regex matcher for dynamic params
const matchUrl = (url, pattern) => {
  const regex = new RegExp(`^${pattern.replace(/:[a-zA-Z]+/g, '(\\d+)')}$`);
  return url.match(regex);
};

/* eslint-disable complexity */
export const mockRequest = config => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { url, method, data } = config;
      const parsedData = data ? JSON.parse(data) : {};
      const params = config.params || {}; // Safe access

      // eslint-disable-next-line no-console
      console.log(`[MOCK] ${method.toUpperCase()} ${url}`, params);

      // --- AUTH ---
      if (url === '/auth/login' && method === 'post') {
        const user = USERS.find(
          u => u.dni === parsedData.dni && u.password === parsedData.password,
        );
        if (user) {
          const { password, ...userWithoutPass } = user;
          resolve({
            success: true,
            data: {
              token: 'mock-jwt-token-12345',
              user: userWithoutPass,
            },
            message: 'Inicio de sesión exitoso',
          });
        } else {
          reject(
            new Error(
              JSON.stringify({
                response: {
                  status: 401,
                  data: { success: false, message: 'Credenciales inválidas' },
                },
              }),
            ),
          );
        }
        return;
      }

      // --- USERS ---
      if (url === '/usuarios' && method === 'get') {
        resolve({
          success: true,
          data: {
            usuarios: USERS.map(({ password, ...u }) => u),
            pagination: { page: 1, limit: 20, total: USERS.length },
          },
        });
        return;
      }

      // --- STUDENTS ---
      if (url === '/estudiantes' && method === 'get') {
        const students = [
          {
            estudiante_id: 1,
            codigo_interno: '2025-A-ORD-001',
            dni: '12345678',
            nombre_completo: 'Juan Pérez',
            modalidad: 'ORDINARIO',
            estado: 'activo',
          },
          {
            estudiante_id: 2,
            codigo_interno: '2025-B-PRI-045',
            dni: '87654321',
            nombre_completo: 'María García',
            modalidad: 'PRIMERA_OPCION',
            estado: 'activo',
          },
        ];
        resolve({
          success: true,
          data: students,
        });
        return;
      }

      // --- COURSES ---
      if (url === '/cursos' && method === 'get') {
        const allCourses = [
          {
            curso_id: 1,
            nombre: 'Aritmética',
            area: 'A',
            descripcion: 'Números reales y operaciones',
            estado: 'activo',
          },
          {
            curso_id: 2,
            nombre: 'Álgebra',
            area: 'A',
            descripcion: 'Polinomios y ecuaciones',
            estado: 'activo',
          },
          {
            curso_id: 3,
            nombre: 'Biología',
            area: 'B',
            descripcion: 'Célula y sistemas',
            estado: 'activo',
          },
          {
            curso_id: 4,
            nombre: 'Historia',
            area: 'C',
            descripcion: 'Historia del Perú',
            estado: 'activo',
          },
        ];

        // Simple filter logic
        let filtered = allCourses;
        if (config.params && config.params.area) {
          filtered = allCourses.filter(c => c.area === config.params.area);
        }

        resolve({
          success: true,
          data: filtered,
        });
        return;
      }

      // --- GROUPS ---
      if (url === '/grupos' && method === 'get') {
        const groups = [
          {
            grupo_id: 1,
            nombre_grupo: 'A1',
            area: 'A',
            modalidad: 'ORDINARIO',
            dias: 'L-M-Mi-J-V-S',
            hora_inicio: '08:00',
            hora_fin: '13:00',
            capacidad: 30,
            estudiantes_matriculados: 25,
            cupos_disponibles: 5,
            estado: 'ACTIVO',
          },
          {
            grupo_id: 2,
            nombre_grupo: 'B1',
            area: 'B',
            modalidad: 'PRIMERA_OPCION',
            dias: 'L-M-Mi-J-V',
            hora_inicio: '16:00',
            hora_fin: '20:00',
            capacidad: 25,
            estudiantes_matriculados: 10,
            cupos_disponibles: 15,
            estado: 'ACTIVO',
          },
        ];
        resolve({ success: true, data: groups });
        return;
      }

      // --- GROUPS BY ID ---
      const groupMatch = matchUrl(url, '/grupos/:id');
      if (groupMatch && method === 'get') {
        const id = parseInt(groupMatch[1]);
        resolve({
          success: true,
          data: {
            grupo_id: id,
            nombre_grupo: 'A1 (Mock)',
            area: 'A',
            modalidad: 'ORDINARIO',
            dias: 'L-M-Mi-J-V-S',
            hora_inicio: '08:00',
            hora_fin: '13:00',
            capacidad: 30,
            estudiantes_matriculados: 25,
            cupos_disponibles: 5,
            estado: 'ACTIVO',
          },
        });
        return;
      }

      // --- ENROLLMENTS ---
      if (url === '/matriculas' && method === 'get') {
        // Mock enrollments
        const enrollments = [
          {
            matricula_id: 1,
            estudiante_id: 1,
            codigo_interno: '2025-A-ORD-001',
            nombre_estudiante: 'Juan Pérez',
            grupo_id: 1,
            nombre_grupo: 'A1',
            fecha_matricula: '2025-08-28',
            monto_pagado: 500.0,
            estado: 'MATRICULADO',
          },
          {
            matricula_id: 2,
            estudiante_id: 2,
            codigo_interno: '2025-A-ORD-002',
            nombre_estudiante: 'Maria Garcia',
            grupo_id: 1,
            nombre_grupo: 'A1',
            fecha_matricula: '2025-08-29',
            monto_pagado: 500.0,
            estado: 'MATRICULADO',
          },
        ];

        let filtered = enrollments;
        if (config.params && config.params.grupo_id) {
          filtered = enrollments.filter(e => e.grupo_id === parseInt(config.params.grupo_id));
        }

        resolve({ success: true, data: filtered });
        return;
      }

      if (url === '/matriculas' && method === 'post') {
        const { estudiante_id, grupo_id, monto_pagado } = JSON.parse(config.data);
        const newEnrollment = {
          matricula_id: Math.floor(Math.random() * 1000),
          estudiante_id,
          grupo_id,
          fecha_matricula: new Date().toISOString().split('T')[0],
          monto_pagado,
          estado: 'MATRICULADO',
        };
        resolve({
          success: true,
          data: newEnrollment,
          message: 'Estudiante matriculado exitosamente',
        });
        return;
      }

      // --- ATTENDANCE ---
      if (url === '/asistencias' && method === 'get') {
        /*
         * Mock generic attendance data if needed, or return empty list for now
         * Real app would filter by group_id and date
         */
        resolve({
          success: true,
          data: [],
        });
        return;
      }

      if (url === '/asistencias' && method === 'post') {
        // Mock saving attendance
        resolve({
          success: true,
          message: 'Asistencias registradas correctamente',
          data: {
            /* ... echo back data if needed ... */
          },
        });
        return;
      }

      if (url.includes('/resumen') && method === 'get') {
        // Mock summary
        resolve({
          success: true,
          data: {
            summary: {
              presentes: 12,
              tardanzas: 2,
              ausencias: 1,
              percentage: '89%',
            },
            history: [
              { fecha: '2025-09-01', curso: 'Aritmética', hora: '08:00', estado: 'PRESENTE' },
              {
                fecha: '2025-09-02',
                curso: 'Álgebra',
                hora: '08:05',
                estado: 'TARDANZA',
                observacion: '5 min tarde',
              },
              { fecha: '2025-09-03', curso: 'Biología', hora: '-', estado: 'AUSENTE' },
              { fecha: '2025-09-04', curso: 'Historia', hora: '10:00', estado: 'PRESENTE' },
            ],
          },
        });
        return;
      }

      // --- EVALUATIONS ---
      if (url === '/evaluaciones' && method === 'get') {
        const evaluations = [
          {
            evaluacion_id: 1,
            nombre: 'Examen de Entrada',
            tipo: 'SIMULACRO',
            fecha_programada: '2025-08-15',
            estado: 'FINALIZADA',
          },
          {
            evaluacion_id: 2,
            nombre: 'Primer Parcial (Área A)',
            tipo: 'PARCIAL',
            fecha_programada: '2025-09-15',
            estado: 'PROGRAMADA',
          },
          {
            evaluacion_id: 3,
            nombre: 'Simulacro General #1',
            tipo: 'SIMULACRO',
            fecha_programada: '2025-09-30',
            estado: 'PROGRAMADA',
          },
        ];
        resolve({ success: true, data: evaluations });
        return;
      }

      if (url === '/evaluaciones' && method === 'post') {
        const evaluationData = JSON.parse(config.data);
        resolve({
          success: true,
          message: 'Evaluación programada con éxito',
          data: {
            evaluacion_id: Math.floor(Math.random() * 1000),
            ...evaluationData,
            estado: 'PROGRAMADA',
          },
        });
        return;
      }

      // --- GRADES ---
      if (url === '/notas' && method === 'get') {
        // Mock grades
        resolve({ success: true, data: [] });
        return;
      }

      if (url === '/notas' && method === 'post') {
        resolve({
          success: true,
          message: 'Notas registradas correctamente',
          data: {},
        });
        return;
      }

      // Default 404
      reject(
        new Error(
          JSON.stringify({
            response: {
              status: 404,
              data: { success: false, message: 'Endpoint no encontrado con mock' },
            },
          }),
        ),
      );
    }, 500); // Simulate network latency
  });
};
/* eslint-enable complexity */
