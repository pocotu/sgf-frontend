# API_contract

# 🔌 CONTRATO DE API - SGA-P

> Propósito: Contrato de API REST entre Backend y Frontend. Pragmático y directo.
> 
> 
> **Para más información:**
> 
> - **Esquema ER:** Ver `ESQUEMA_ER.md`
> - **Contexto de negocio:** Ver `CONTEXTO_ACADEMIAS_PREUNIVERSITARIAS.md`
> - **Criterios de evaluación:** Ver `criterios-a-calificar.md`

---

## 🎯 CONVENCIONES GENERALES

### **Formato de Respuestas**

**Éxito:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa"
}

```

**Error:**

```json
{
  "success": false,
  "error": "Mensaje de error",
  "code": "ERROR_CODE"
}

```

### **Autenticación**

Todas las rutas protegidas requieren:

```
Authorization: Bearer <jwt_token>

```

### **Códigos HTTP**

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔐 AUTENTICACIÓN

### **POST /auth/login**

Iniciar sesión

**Request:**

```json
{
  "dni": "12345678",
  "password": "password123"
}

```

**Response 200:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "usuario_id": 1,
      "dni": "12345678",
      "nombres": "Juan",
      "apellidos": "Pérez",
      "rol": "estudiante",
      "correo": "juan@email.com"
    }
  }
}

```

**Errores:**

- `401` - Credenciales inválidas
- `400` - DNI o contraseña faltante

---

### **POST /auth/register**

Registrar nuevo usuario (solo admin)

**Request:**

```json
{
  "dni": "87654321",
  "nombres": "María",
  "apellidos": "García",
  "correo": "maria@email.com",
  "password": "password123",
  "rol": "estudiante",
  "telefono": "987654321"
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "usuario_id": 2,
    "dni": "87654321",
    "nombres": "María",
    "apellidos": "García",
    "rol": "estudiante"
  }
}

```

---

### **GET /auth/me**

Obtener usuario actual

**Headers:** `Authorization: Bearer <token>`

**Response 200:**

```json
{
  "success": true,
  "data": {
    "usuario_id": 1,
    "dni": "12345678",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "rol": "estudiante",
    "correo": "juan@email.com"
  }
}

```

---

## 👥 USUARIOS

### **GET /usuarios**

Listar usuarios (admin)

**Query Params:**

- `rol` (opcional): `admin`, `docente`, `estudiante`
- `page` (opcional): número de página (default: 1)
- `limit` (opcional): resultados por página (default: 20)

**Response 200:**

```json
{
  "success": true,
  "data": {
    "usuarios": [
      {
        "usuario_id": 1,
        "dni": "12345678",
        "nombres": "Juan",
        "apellidos": "Pérez",
        "rol": "estudiante",
        "correo": "juan@email.com",
        "estado": "activo"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150
    }
  }
}

```

---

### **GET /usuarios/:id**

Obtener usuario por ID (admin)

**Response 200:**

```json
{
  "success": true,
  "data": {
    "usuario_id": 1,
    "dni": "12345678",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "rol": "estudiante",
    "correo": "juan@email.com",
    "telefono": "987654321",
    "estado": "activo"
  }
}

```

---

### **PUT /usuarios/:id**

Actualizar usuario (admin)

**Request:**

```json
{
  "nombres": "Juan Carlos",
  "apellidos": "Pérez López",
  "correo": "juanc@email.com",
  "telefono": "987654321"
}

```

**Response 200:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Usuario actualizado"
}

```

---

## 🎓 ESTUDIANTES

### **GET /estudiantes**

Listar estudiantes

**Query Params:**

- `modalidad` (opcional): `ORDINARIO`, `PRIMERA_OPCION`, `DIRIMENCIA`
- `area` (opcional): `A`, `B`, `C`, `D`

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "estudiante_id": 1,
      "codigo_interno": "2025-A-ORD-001",
      "dni": "12345678",
      "nombre_completo": "Juan Pérez",
      "modalidad": "ORDINARIO",
      "estado": "activo"
    }
  ]
}

```

---

### **POST /estudiantes**

Crear estudiante (admin)

**Request:**

```json
{
  "usuario_id": 2,
  "modalidad": "ORDINARIO"
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "estudiante_id": 1,
    "codigo_interno": "2025-A-ORD-001",
    "modalidad": "ORDINARIO"
  }
}

```

**Nota:** El `codigo_interno` se genera automáticamente

---

### **GET /estudiantes/:id**

Obtener estudiante por ID

**Response 200:**

```json
{
  "success": true,
  "data": {
    "estudiante_id": 1,
    "codigo_interno": "2025-A-ORD-001",
    "usuario_id": 2,
    "dni": "12345678",
    "nombre_completo": "Juan Pérez",
    "correo": "juan@email.com",
    "modalidad": "ORDINARIO"
  }
}

```

---

## 📚 CURSOS

### **GET /cursos**

Listar cursos

**Query Params:**

- `area` (opcional): `A`, `B`, `C`, `D`

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "curso_id": 1,
      "nombre": "Aritmética",
      "area": "A",
      "descripcion": "Curso de aritmética básica",
      "estado": "activo"
    }
  ]
}

```

---

### **POST /cursos**

Crear curso (admin)

**Request:**

```json
{
  "nombre": "Álgebra",
  "area": "A",
  "descripcion": "Curso de álgebra"
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "curso_id": 2,
    "nombre": "Álgebra",
    "area": "A"
  }
}

```

---

## 👥 GRUPOS

### **GET /grupos**

Listar grupos

**Query Params:**

- `modalidad` (opcional): `ORDINARIO`, `PRIMERA_OPCION`, `DIRIMENCIA`
- `area` (opcional): `A`, `B`, `C`, `D`
- `estado` (opcional): `ACTIVO`, `INACTIVO`

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "grupo_id": 1,
      "nombre_grupo": "A1",
      "area": "A",
      "modalidad": "ORDINARIO",
      "dias": "L-M-Mi-J-V-S",
      "hora_inicio": "08:00:00",
      "hora_fin": "13:00:00",
      "capacidad": 30,
      "estudiantes_matriculados": 25,
      "cupos_disponibles": 5,
      "estado": "ACTIVO"
    }
  ]
}

```

---

### **POST /grupos**

Crear grupo (admin)

**Request:**

```json
{
  "nombre_grupo": "B1",
  "area": "B",
  "modalidad": "PRIMERA_OPCION",
  "dias": "L-M-Mi-J-V",
  "hora_inicio": "16:00",
  "hora_fin": "20:00",
  "capacidad": 30
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "grupo_id": 2,
    "nombre_grupo": "B1",
    "area": "B",
    "modalidad": "PRIMERA_OPCION"
  }
}

```

---

### **GET /grupos/:id**

Obtener grupo por ID

**Response 200:**

```json
{
  "success": true,
  "data": {
    "grupo_id": 1,
    "nombre_grupo": "A1",
    "area": "A",
    "modalidad": "ORDINARIO",
    "dias": "L-M-Mi-J-V-S",
    "hora_inicio": "08:00:00",
    "hora_fin": "13:00:00",
    "capacidad": 30,
    "estudiantes_matriculados": 25,
    "cupos_disponibles": 5
  }
}

```

---

## 📝 MATRÍCULAS

### **GET /matriculas**

Listar matrículas (admin/docente)

**Query Params:**

- `grupo_id` (opcional): filtrar por grupo
- `estudiante_id` (opcional): filtrar por estudiante
- `estado` (opcional): `MATRICULADO`, `RETIRADO`

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "matricula_id": 1,
      "estudiante_id": 1,
      "codigo_interno": "2025-A-ORD-001",
      "nombre_estudiante": "Juan Pérez",
      "grupo_id": 1,
      "nombre_grupo": "A1",
      "fecha_matricula": "2025-08-28",
      "monto_pagado": 500.00,
      "estado": "MATRICULADO"
    }
  ]
}

```

---

### **POST /matriculas**

Matricular estudiante (admin)

**Request:**

```json
{
  "estudiante_id": 1,
  "grupo_id": 1,
  "monto_pagado": 500.00
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "matricula_id": 1,
    "estudiante_id": 1,
    "grupo_id": 1,
    "fecha_matricula": "2025-08-28",
    "estado": "MATRICULADO"
  },
  "message": "Estudiante matriculado exitosamente"
}

```

**Errores:**

- `400` - No hay cupos disponibles
- `400` - Modalidad del estudiante no coincide con el grupo
- `400` - Estudiante ya matriculado en otro grupo

---

## 📅 ASISTENCIAS

### **GET /asistencias**

Listar asistencias

**Query Params:**

- `grupo_id` (requerido para docente)
- `estudiante_id` (opcional)
- `fecha_desde` (opcional): formato `YYYY-MM-DD`
- `fecha_hasta` (opcional): formato `YYYY-MM-DD`

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "asistencia_id": 1,
      "estudiante_id": 1,
      "codigo_interno": "2025-A-ORD-001",
      "nombre_estudiante": "Juan Pérez",
      "grupo_id": 1,
      "fecha_clase": "2025-09-01",
      "estado": "PRESENTE",
      "hora_registro": "08:05:00"
    }
  ]
}

```

---

### **POST /asistencias**

Registrar asistencia (docente)

**Request:**

```json
{
  "grupo_id": 1,
  "fecha_clase": "2025-09-01",
  "asistencias": [
    {
      "estudiante_id": 1,
      "estado": "PRESENTE"
    },
    {
      "estudiante_id": 2,
      "estado": "TARDANZA"
    },
    {
      "estudiante_id": 3,
      "estado": "AUSENTE"
    }
  ]
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "registradas": 3,
    "fecha_clase": "2025-09-01"
  },
  "message": "Asistencia registrada"
}

```

**Nota:** Estados válidos: `PRESENTE`, `TARDANZA`, `AUSENTE`

---

### **GET /asistencias/estudiante/:id/resumen**

Resumen de asistencia de un estudiante

**Response 200:**

```json
{
  "success": true,
  "data": {
    "estudiante_id": 1,
    "nombre_completo": "Juan Pérez",
    "total_clases": 20,
    "presentes": 18,
    "tardanzas": 1,
    "ausentes": 1,
    "porcentaje_asistencia": 90.0
  }
}

```

---

## 📊 EVALUACIONES

### **GET /evaluaciones**

Listar evaluaciones

**Query Params:**

- `grupo_id` (opcional)
- `estado` (opcional): `PROGRAMADA`, `EN_CURSO`, `FINALIZADA`, `CANCELADA`

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "evaluacion_id": 1,
      "grupo_id": 1,
      "nombre_grupo": "A1",
      "numero_semana": 1,
      "fecha_evaluacion": "2025-09-07",
      "descripcion": "Simulacro Semana 1",
      "duracion_minutos": 120,
      "estado": "PROGRAMADA"
    }
  ]
}

```

---

### **POST /evaluaciones**

Programar evaluación (admin)

**Request:**

```json
{
  "grupo_id": 1,
  "numero_semana": 1,
  "fecha_evaluacion": "2025-09-07",
  "descripcion": "Simulacro Semana 1",
  "duracion_minutos": 120
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "evaluacion_id": 1,
    "grupo_id": 1,
    "numero_semana": 1,
    "fecha_evaluacion": "2025-09-07",
    "estado": "PROGRAMADA"
  }
}

```

---

### **GET /evaluaciones/:id**

Obtener evaluación por ID

**Response 200:**

```json
{
  "success": true,
  "data": {
    "evaluacion_id": 1,
    "grupo_id": 1,
    "nombre_grupo": "A1",
    "numero_semana": 1,
    "fecha_evaluacion": "2025-09-07",
    "descripcion": "Simulacro Semana 1",
    "duracion_minutos": 120,
    "estado": "PROGRAMADA",
    "cursos": [
      { "curso_id": 1, "nombre": "Aritmética" },
      { "curso_id": 2, "nombre": "Álgebra" }
    ]
  }
}

```

---

## 📝 NOTAS

### **GET /notas**

Listar notas

**Query Params:**

- `evaluacion_id` (opcional)
- `estudiante_id` (opcional)
- `curso_id` (opcional)

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "nota_id": 1,
      "evaluacion_id": 1,
      "numero_semana": 1,
      "fecha_evaluacion": "2025-09-07",
      "estudiante_id": 1,
      "codigo_interno": "2025-A-ORD-001",
      "nombre_estudiante": "Juan Pérez",
      "curso_id": 1,
      "nombre_curso": "Aritmética",
      "nota": 15.50,
      "estado_nota": "APROBADO"
    }
  ]
}

```

---

### **POST /notas**

Registrar notas (docente/admin)

**Request:**

```json
{
  "evaluacion_id": 1,
  "notas": [
    {
      "estudiante_id": 1,
      "curso_id": 1,
      "nota": 15.50
    },
    {
      "estudiante_id": 1,
      "curso_id": 2,
      "nota": 14.00
    }
  ]
}

```

**Response 201:**

```json
{
  "success": true,
  "data": {
    "registradas": 2,
    "evaluacion_id": 1
  },
  "message": "Notas registradas"
}

```

**Validaciones:**

- Nota debe estar entre 0 y 20
- No duplicar notas (mismo estudiante-curso-evaluación)

---

### **GET /notas/estudiante/:id**

Notas de un estudiante

**Response 200:**

```json
{
  "success": true,
  "data": {
    "estudiante_id": 1,
    "nombre_completo": "Juan Pérez",
    "codigo_interno": "2025-A-ORD-001",
    "notas_por_evaluacion": [
      {
        "evaluacion_id": 1,
        "numero_semana": 1,
        "fecha_evaluacion": "2025-09-07",
        "notas_por_curso": [
          {
            "curso_id": 1,
            "nombre_curso": "Aritmética",
            "nota": 15.50
          },
          {
            "curso_id": 2,
            "nombre_curso": "Álgebra",
            "nota": 14.00
          }
        ],
        "promedio": 14.75
      }
    ],
    "promedio_general": 14.75
  }
}

```

---

## 🏆 RANKINGS

### **GET /rankings/grupo/:id**

Ranking de un grupo

**Query Params:**

- `evaluacion_id` (opcional): ranking de una evaluación específica

**Response 200:**

```json
{
  "success": true,
  "data": {
    "grupo_id": 1,
    "nombre_grupo": "A1",
    "evaluacion_id": 1,
    "numero_semana": 1,
    "ranking": [
      {
        "posicion": 1,
        "estudiante_id": 2,
        "codigo_interno": "2025-A-ORD-002",
        "nombre_completo": "María García",
        "promedio": 18.50
      },
      {
        "posicion": 2,
        "estudiante_id": 1,
        "codigo_interno": "2025-A-ORD-001",
        "nombre_completo": "Juan Pérez",
        "promedio": 14.75
      }
    ]
  }
}

```

---

### **GET /rankings/estudiante/:id**

Posición de un estudiante en el ranking

**Response 200:**

```json
{
  "success": true,
  "data": {
    "estudiante_id": 1,
    "nombre_completo": "Juan Pérez",
    "grupo_id": 1,
    "nombre_grupo": "A1",
    "posicion": 2,
    "total_estudiantes": 25,
    "promedio": 14.75,
    "promedio_grupo": 13.20
  }
}

```

---

## 📊 REPORTES

### **GET /reportes/rendimiento-por-curso**

Rendimiento por curso (admin)

**Query Params:**

- `grupo_id` (opcional)
- `area` (opcional)

**Response 200:**

```json
{
  "success": true,
  "data": [
    {
      "curso_id": 1,
      "nombre_curso": "Aritmética",
      "area": "A",
      "promedio_general": 13.50,
      "total_evaluaciones": 5,
      "total_estudiantes": 25
    }
  ]
}

```

---

### **GET /reportes/asistencia-por-grupo**

Reporte de asistencia por grupo (admin)

**Query Params:**

- `grupo_id` (requerido)
- `fecha_desde` (opcional)
- `fecha_hasta` (opcional)

**Response 200:**

```json
{
  "success": true,
  "data": {
    "grupo_id": 1,
    "nombre_grupo": "A1",
    "total_clases": 20,
    "porcentaje_asistencia_promedio": 85.5,
    "estudiantes": [
      {
        "estudiante_id": 1,
        "nombre_completo": "Juan Pérez",
        "presentes": 18,
        "tardanzas": 1,
        "ausentes": 1,
        "porcentaje": 90.0
      }
    ]
  }
}

```

---

## 📈 DASHBOARDS

### **GET /dashboard/admin**

Dashboard para administrador

**Response 200:**

```json
{
  "success": true,
  "data": {
    "total_estudiantes": 150,
    "estudiantes_por_modalidad": {
      "ORDINARIO": 80,
      "PRIMERA_OPCION": 50,
      "DIRIMENCIA": 20
    },
    "estudiantes_por_area": {
      "A": 40,
      "B": 35,
      "C": 40,
      "D": 35
    },
    "total_grupos_activos": 8,
    "promedio_general_academia": 13.8
  }
}

```

---

### **GET /dashboard/docente**

Dashboard para docente

**Response 200:**

```json
{
  "success": true,
  "data": {
    "grupos_asignados": [
      {
        "grupo_id": 1,
        "nombre_grupo": "A1",
        "total_estudiantes": 25,
        "promedio_grupo": 13.5,
        "porcentaje_asistencia": 85.0
      }
    ],
    "proximas_evaluaciones": [
      {
        "evaluacion_id": 2,
        "grupo_id": 1,
        "fecha_evaluacion": "2025-09-14",
        "numero_semana": 2
      }
    ]
  }
}

```

---

### **GET /dashboard/estudiante**

Dashboard para estudiante

**Response 200:**

```json
{
  "success": true,
  "data": {
    "estudiante_id": 1,
    "codigo_interno": "2025-A-ORD-001",
    "nombre_completo": "Juan Pérez",
    "modalidad": "ORDINARIO",
    "grupo": {
      "grupo_id": 1,
      "nombre_grupo": "A1",
      "area": "A"
    },
    "promedio_general": 14.75,
    "posicion_ranking": 2,
    "total_estudiantes_grupo": 25,
    "porcentaje_asistencia": 90.0,
    "proxima_evaluacion": {
      "evaluacion_id": 2,
      "fecha_evaluacion": "2025-09-14",
      "numero_semana": 2
    }
  }
}

```

---

## 🎯 **REGLAS DE NEGOCIO UNSAAC EN LA API**

### **Validaciones Críticas Implementadas:**

1. **DNI Peruano:** 8 dígitos numéricos únicos
2. **Modalidades:** ORDINARIO, PRIMERA_OPCION, DIRIMENCIA
3. **Áreas Académicas:** A, B, C, D
4. **Notas:** Escala 0-20 (sistema educativo peruano)
5. **Nota Aprobatoria:** >= 11
6. **Capacidad Grupos:** Típicamente 30 estudiantes
7. **Estados Asistencia:** PRESENTE, TARDANZA, AUSENTE
8. **Estados Evaluación:** PROGRAMADA, EN_CURSO, FINALIZADA, CANCELADA

### **Validaciones de Negocio:**

**Matrículas:**

- ✅ Un estudiante solo puede estar matriculado en UN grupo activo
- ✅ Modalidad estudiante = Modalidad grupo (validado por trigger)
- ✅ Verificar cupos disponibles antes de matricular
- ✅ Monto pagado > 0

**Asistencias:**

- ✅ No duplicar registros (mismo estudiante-grupo-fecha)
- ✅ Índice único: estudiante_id + grupo_id + fecha_clase

**Notas:**

- ✅ Rango 0-20 (sistema peruano)
- ✅ No duplicar notas (mismo estudiante-curso-evaluación)
- ✅ Índice único: evaluacion_id + estudiante_id + curso_id

**Grupos:**

- ✅ hora_fin > hora_inicio
- ✅ Capacidad > 0
- ✅ Índice único: area + modalidad + nombre_grupo

---

## 📊 **IMPLEMENTACIÓN POR SPRINT**

Este contrato de API se implementa progresivamente:

| Sprint | Endpoints Implementados | % API |
| --- | --- | --- |
| **Sprint 1** | Ninguno (solo documentación) | 0% |
| **Sprint 2** | /auth/* (login, register, me) | 15% |
| **Sprint 3** | /usuarios/*, /estudiantes/*, /cursos/*, /grupos/* | 40% |
| **Sprint 4** | /matriculas/*, /asistencias/* | 60% |
| **Sprint 5** | /evaluaciones/*, /notas/* | 80% |
| **Sprint 6** | /rankings/*, /reportes/* | 95% |
| **Sprint 7** | /dashboard/* (completo) | 100% |

---

## 🔐 **SEGURIDAD Y AUTORIZACIÓN**

### **Roles y Permisos:**

| Endpoint | Admin | Docente | Estudiante |
| --- | --- | --- | --- |
| POST /auth/login | ✅ | ✅ | ✅ |
| POST /auth/register | ✅ | ❌ | ❌ |
| GET /usuarios | ✅ | ❌ | ❌ |
| GET /estudiantes | ✅ | ✅ | ❌ |
| POST /matriculas | ✅ | ❌ | ❌ |
| POST /asistencias | ✅ | ✅ | ❌ |
| GET /asistencias | ✅ | ✅ (solo sus grupos) | ✅ (solo propias) |
| POST /evaluaciones | ✅ | ❌ | ❌ |
| POST /notas | ✅ | ✅ | ❌ |
| GET /notas | ✅ | ✅ (solo sus grupos) | ✅ (solo propias) |
| GET /rankings | ✅ | ✅ | ✅ |
| GET /dashboard/admin | ✅ | ❌ | ❌ |
| GET /dashboard/docente | ❌ | ✅ | ❌ |
| GET /dashboard/estudiante | ❌ | ❌ | ✅ |

---

## 📚 **Referencias Cruzadas**

- **Arquitectura:** Ver `ARQUITECTURA.md` para implementación Clean Architecture + MVC
- **Base de Datos:** Ver `ESQUEMA_ER.md` para estructura de 8 tablas + 3 vistas + 3 procedimientos
- **Backlog:** Ver `PRODUCT_BACKLOG_SGA-P.md` para historias de usuario
- **Planificación:** Ver `PLANIFICACION_SPRINTS.md` para implementación por sprint
- **Contexto:** Ver `CONTEXTO_ACADEMIAS_PREUNIVERSITARIAS.md` para reglas de negocio UNSAAC
- **Criterios:** Ver `criterios-a-calificar.md` para cumplimiento AG-C12