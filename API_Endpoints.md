# API_Endpoints

# 🔌 API ENDPOINTS - SGA-P

> Referencia rápida de endpoints REST
> 
> 
> Para detalles completos ver `API_contract.md`
> 

---

## 🔐 AUTENTICACIÓN

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| POST | `/auth/login` | Iniciar sesión | Todos |
| POST | `/auth/register` | Registrar usuario | Admin |
| GET | `/auth/me` | Usuario actual | Autenticado |

---

## 👥 USUARIOS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/usuarios` | Listar usuarios | Admin |
| GET | `/usuarios/:id` | Obtener usuario | Admin |
| PUT | `/usuarios/:id` | Actualizar usuario | Admin |

**Query Params:** `rol`, `page`, `limit`

---

## 🎓 ESTUDIANTES

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/estudiantes` | Listar estudiantes | Admin, Docente |
| POST | `/estudiantes` | Crear estudiante | Admin |
| GET | `/estudiantes/:id` | Obtener estudiante | Admin, Docente |

**Query Params:** `modalidad`, `area`

---

## 📚 CURSOS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/cursos` | Listar cursos | Todos |
| POST | `/cursos` | Crear curso | Admin |
| GET | `/cursos/:id` | Obtener curso | Todos |

**Query Params:** `area`

---

## 👥 GRUPOS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/grupos` | Listar grupos | Todos |
| POST | `/grupos` | Crear grupo | Admin |
| GET | `/grupos/:id` | Obtener grupo | Todos |

**Query Params:** `modalidad`, `area`, `estado`

---

## 📝 MATRÍCULAS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/matriculas` | Listar matrículas | Admin, Docente |
| POST | `/matriculas` | Matricular estudiante | Admin |

**Query Params:** `grupo_id`, `estudiante_id`, `estado`

---

## 📅 ASISTENCIAS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/asistencias` | Listar asistencias | Admin, Docente, Estudiante |
| POST | `/asistencias` | Registrar asistencia | Admin, Docente |
| GET | `/asistencias/estudiante/:id/resumen` | Resumen asistencia | Admin, Docente, Estudiante |

**Query Params:** `grupo_id`, `estudiante_id`, `fecha_desde`, `fecha_hasta`

**Estados:** `PRESENTE`, `TARDANZA`, `AUSENTE`

---

## 📊 EVALUACIONES

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/evaluaciones` | Listar evaluaciones | Todos |
| POST | `/evaluaciones` | Programar evaluación | Admin |
| GET | `/evaluaciones/:id` | Obtener evaluación | Todos |

**Query Params:** `grupo_id`, `estado`

**Estados:** `PROGRAMADA`, `EN_CURSO`, `FINALIZADA`, `CANCELADA`

---

## 📝 NOTAS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/notas` | Listar notas | Admin, Docente, Estudiante |
| POST | `/notas` | Registrar notas | Admin, Docente |
| GET | `/notas/estudiante/:id` | Notas de estudiante | Admin, Docente, Estudiante |

**Query Params:** `evaluacion_id`, `estudiante_id`, `curso_id`

**Validación:** Notas 0-20 (escala peruana)

---

## 🏆 RANKINGS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/rankings/grupo/:id` | Ranking de grupo | Todos |
| GET | `/rankings/estudiante/:id` | Posición estudiante | Todos |

**Query Params:** `evaluacion_id`

---

## 📊 REPORTES

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/reportes/rendimiento-por-curso` | Rendimiento por curso | Admin |
| GET | `/reportes/asistencia-por-grupo` | Asistencia por grupo | Admin |

**Query Params:** `grupo_id`, `area`, `fecha_desde`, `fecha_hasta`

---

## 📈 DASHBOARDS

| Método | Endpoint | Descripción | Rol |
| --- | --- | --- | --- |
| GET | `/dashboard/admin` | Dashboard administrador | Admin |
| GET | `/dashboard/docente` | Dashboard docente | Docente |
| GET | `/dashboard/estudiante` | Dashboard estudiante | Estudiante |

---

## 📊 RESUMEN POR SPRINT

| Sprint | Endpoints | % API |
| --- | --- | --- |
| Sprint 1 | Ninguno (documentación) | 0% |
| Sprint 2 | `/auth/*` | 15% |
| Sprint 3 | `/usuarios/*`, `/estudiantes/*`, `/cursos/*`, `/grupos/*` | 40% |
| Sprint 4 | `/matriculas/*`, `/asistencias/*` | 60% |
| Sprint 5 | `/evaluaciones/*`, `/notas/*` | 80% |
| Sprint 6 | `/rankings/*`, `/reportes/*` | 95% |
| Sprint 7 | `/dashboard/*` | 100% |

---

## 🔐 AUTENTICACIÓN

Todas las rutas protegidas requieren:

```
Authorization: Bearer <jwt_token>

```

## 📋 FORMATO DE RESPUESTA

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

---

**Total Endpoints:** 40+

**Ver detalles completos:** `API_contract.md`