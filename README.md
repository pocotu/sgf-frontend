# 🎨 SGA-P Frontend - Sistema de Gestión Integral para Academias Preuniversitarias

Frontend del **Sistema de Gestión Integral para Academias Preuniversitarias (SGA-P)** desarrollado con **React 19 + Vite 6 + Redux Toolkit 2.0 + Tailwind CSS**, diseñado específicamente para academias de preparación preuniversitaria en Perú.

## 🎯 **Descripción del Proyecto**

Interfaz web moderna, responsive y optimizada para academias preuniversitarias peruanas que preparan estudiantes para exámenes de admisión de universidades como **UNMSM, UNI, PUCP, UNFV**. Incluye dashboards especializados por rol académico, sistema de gestión integral y comunicación efectiva con padres/apoderados.

## 🏗️ **Arquitectura Frontend SGA-P**

Sistema diseñado específicamente para **academias preuniversitarias peruanas** con arquitectura React moderna que soporta **8 roles académicos** y interfaz optimizada para gestión educativa integral.

### **🏛️ Estructura de Directorios Actual**

```
sgf-frontend/
├── index.html                       # HTML principal con meta tags SEO
├── package.json                     # Configuración NPM y dependencias
├── vite.config.js                   # Configuración Vite 6 + optimizaciones
├── tailwind.config.js               # Configuración Tailwind CSS personalizada
├── postcss.config.js                # PostCSS para Tailwind processing
├── eslint.config.js                 # ESLint configuración moderna
├── README.md                        # Documentación del proyecto
│
├── public/                          # Recursos públicos estáticos
│   ├── vite.svg                     # Favicon principal
│   ├── manifest.json                # Manifiesto PWA para instalación
│   └── icons/                       # Iconos PWA (16x16 hasta 512x512)
│       ├── icon-192x192.png         # Icono PWA Android
│       └── icon-512x512.png         # Icono PWA pantalla completa
│
├── src/                             # Código fuente principal
│   ├── main.jsx                     # Punto entrada React + Redux Provider
│   ├── App.jsx                      # Componente raíz con routing
│   ├── index.css                    # Estilos globales Tailwind base
│   ├── App.css                      # Estilos específicos componente App
│   │
│   ├── components/                  # 🧩 Componentes React reutilizables
│   │   ├── ui/                      # Componentes UI base
│   │   │   ├── Button.jsx           # Botón reutilizable con variantes
│   │   │   ├── Input.jsx            # Input con validación integrada
│   │   │   ├── Modal.jsx            # Modal responsive con backdrop
│   │   │   ├── Card.jsx             # Tarjeta contenido con shadow
│   │   │   ├── Table.jsx            # Tabla con paginación y filtros
│   │   │   ├── Loading.jsx          # Spinner loading personalizado
│   │   │   ├── Alert.jsx            # Componente alertas tipo toast
│   │   │   ├── Calendar.jsx         # Calendario horarios académicos
│   │   │   ├── Chart.jsx            # Gráficos para dashboards
│   │   │   └── Pagination.jsx       # Paginación para listas grandes
│   │   │
│   │   ├── layout/                  # Componentes estructura visual
│   │   │   ├── Header.jsx           # Cabecera con navegación principal
│   │   │   ├── Sidebar.jsx          # Sidebar navegación por rol
│   │   │   ├── Footer.jsx           # Pie página con links importantes
│   │   │   ├── Navigation.jsx       # Navegación responsive principal
│   │   │   ├── Breadcrumbs.jsx      # Migajas pan navegación jerárquica
│   │   │   └── Layout.jsx           # Layout principal aplicación
│   │   │
│   │   ├── auth/                    # Componentes autenticación específicos
│   │   │   ├── LoginForm.jsx        # Form login multi-rol académico
│   │   │   ├── RegisterForm.jsx     # Form registro por tipo usuario
│   │   │   ├── ForgotPassword.jsx   # Recuperación contraseña
│   │   │   ├── ResetPassword.jsx    # Reset contraseña con token
│   │   │   ├── ProtectedRoute.jsx   # HOC rutas protegidas por rol
│   │   │   └── RoleGuard.jsx        # Guard específico por permisos
│   │   │
│   │   ├── dashboards/              # Dashboards especializados por rol
│   │   │   ├── AdminDashboard.jsx   # Dashboard administrador general
│   │   │   ├── CoordinadorDashboard.jsx # Dashboard coordinador académico
│   │   │   ├── DocenteDashboard.jsx # Dashboard docente con clases
│   │   │   ├── TutorDashboard.jsx   # Dashboard tutor personalizado
│   │   │   ├── EstudianteDashboard.jsx # Dashboard estudiante
│   │   │   ├── PadreDashboard.jsx   # Dashboard padre/apoderado
│   │   │   ├── AdmisionesDashboard.jsx # Dashboard oficial admisiones
│   │   │   └── FinancieroDashboard.jsx # Dashboard oficial financiero
│   │   │
│   │   ├── forms/                   # Formularios específicos SGA-P
│   │   │   ├── RegistroPostulante.jsx # Form registro postulante
│   │   │   ├── MatriculaEstudiante.jsx # Form matrícula estudiante
│   │   │   ├── RegistroAsistencia.jsx # Form marcado asistencia
│   │   │   ├── RegistroNotas.jsx    # Form registro calificaciones
│   │   │   ├── CrearCurso.jsx       # Form creación curso especializado
│   │   │   ├── AsignarDocente.jsx   # Form asignación docente-curso
│   │   │   ├── ProcesarPago.jsx     # Form procesamiento pagos
│   │   │   ├── AsignarBeca.jsx      # Form asignación becas
│   │   │   └── GenerarReporte.jsx   # Form configuración reportes
│   │   │
│   │   ├── academic/                # Componentes módulo académico
│   │   │   ├── ListaCursos.jsx      # Lista cursos por carrera
│   │   │   ├── HorarioClases.jsx    # Horarios visualización grid
│   │   │   ├── ControlAsistencia.jsx # Interface control asistencia
│   │   │   ├── LibretaNotas.jsx     # Libreta calificaciones
│   │   │   ├── SimulacroExamen.jsx  # Interface simulacros
│   │   │   ├── PerfilEstudiante.jsx # Perfil académico estudiante
│   │   │   └── ProgresoCurso.jsx    # Progreso estudiante por curso
│   │   │
│   │   ├── admissions/              # Componentes proceso admisiones
│   │   │   ├── ListaPostulantes.jsx # Lista y filtros postulantes
│   │   │   ├── ProcesoInscripcion.jsx # Wizard inscripción
│   │   │   ├── ExamenIngreso.jsx    # Interface examen ingreso
│   │   │   ├── ResultadosExamen.jsx # Resultados y estadísticas
│   │   │   ├── ProcesoMatricula.jsx # Wizard matrícula completa
│   │   │   └── DocumentosRequeridos.jsx # Checklist documentos
│   │   │
│   │   ├── financial/               # Componentes gestión financiera
│   │   │   ├── HistorialPagos.jsx   # Historial pagos estudiante
│   │   │   ├── EstadoCuenta.jsx     # Estado cuenta detallado
│   │   │   ├── GestionBecas.jsx     # Lista y gestión becas
│   │   │   ├── ReporteMorosidad.jsx # Reporte estudiantes morosos
│   │   │   ├── FacturacionMasiva.jsx # Facturación por lotes
│   │   │   └── DashboardFinanciero.jsx # KPIs financieros
│   │   │
│   │   └── communications/          # Componentes comunicación
│   │       ├── CentroNotificaciones.jsx # Centro notificaciones
│   │       ├── EnvioEmails.jsx      # Interface envío emails masivos
│   │       ├── EnvioSMS.jsx         # Interface envío SMS
│   │       ├── ReportesAcademicos.jsx # Generador reportes académicos
│   │       ├── ChatTutoria.jsx      # Chat tutor-estudiante
│   │       └── ComunicacionPadres.jsx # Comunicación con apoderados
│   │
│   ├── pages/                       # 📄 Páginas principales (React Router)
│   │   ├── HomePage.jsx             # Página inicio/landing
│   │   ├── LoginPage.jsx            # Página login/autenticación
│   │   ├── RegisterPage.jsx         # Página registro usuarios
│   │   ├── DashboardPage.jsx        # Dashboard router por rol
│   │   ├── academic/                # Páginas módulo académico
│   │   │   ├── CursosPage.jsx       # Página gestión cursos
│   │   │   ├── HorariosPage.jsx     # Página horarios
│   │   │   ├── AsistenciaPage.jsx   # Página control asistencia
│   │   │   ├── CalificacionesPage.jsx # Página calificaciones
│   │   │   └── SimulacrosPage.jsx   # Página simulacros
│   │   ├── admissions/              # Páginas admisiones
│   │   │   ├── PostulantesPage.jsx  # Página gestión postulantes
│   │   │   ├── InscripcionesPage.jsx # Página inscripciones
│   │   │   ├── ExamenesPage.jsx     # Página exámenes ingreso
│   │   │   └── MatriculasPage.jsx   # Página matrículas
│   │   ├── financial/               # Páginas financiero
│   │   │   ├── PagosPage.jsx        # Página gestión pagos
│   │   │   ├── BecasPage.jsx        # Página becas
│   │   │   ├── MorosidadPage.jsx    # Página morosidad
│   │   │   └── ReportesPage.jsx     # Página reportes financieros
│   │   └── communications/          # Páginas comunicaciones
│   │       ├── NotificacionesPage.jsx # Página notificaciones
│   │       ├── EmailsPage.jsx       # Página emails
│   │       ├── SMSPage.jsx          # Página SMS
│   │       └── ReportesPage.jsx     # Página reportes académicos
│   │
│   ├── hooks/                       # 🎣 Custom Hooks específicos SGA-P
│   │   ├── useAuth.js               # Hook autenticación multi-rol
│   │   ├── useApi.js                # Hook llamadas API con loading
│   │   ├── useRolePermissions.js    # Hook permisos por rol académico
│   │   ├── useDebounce.js           # Hook debounced search
│   │   ├── useLocalStorage.js       # Hook persistencia local
│   │   ├── useAcademicCalendar.js   # Hook calendario académico
│   │   ├── useNotifications.js      # Hook sistema notificaciones
│   │   └── useFormValidation.js     # Hook validación formularios
│   │
│   ├── services/                    # 🔌 Servicios API y comunicación backend
│   │   ├── api.js                   # Configuración Axios base
│   │   ├── authService.js           # Servicios autenticación
│   │   ├── userService.js           # Servicios gestión usuarios
│   │   ├── academicService.js       # Servicios módulo académico
│   │   ├── admissionsService.js     # Servicios admisiones
│   │   ├── financialService.js      # Servicios financieros
│   │   ├── communicationsService.js # Servicios comunicaciones
│   │   ├── uploadService.js         # Servicio subida archivos
│   │   └── reportService.js         # Servicio generación reportes
│   │
│   ├── store/                       # 📦 Redux Toolkit Store configuración
│   │   ├── index.js                 # Store principal configuración
│   │   └── slices/                  # Redux Slices por dominio
│   │       ├── authSlice.js         # Estado autenticación y sesión
│   │       ├── userSlice.js         # Estado usuarios del sistema
│   │       ├── academicSlice.js     # Estado módulo académico
│   │       ├── admissionsSlice.js   # Estado proceso admisiones
│   │       ├── financialSlice.js    # Estado gestión financiera
│   │       ├── communicationsSlice.js # Estado comunicaciones
│   │       ├── uiSlice.js           # Estado interfaz usuario
│   │       └── notificationsSlice.js # Estado notificaciones sistema
│   │
│   ├── utils/                       # 🛠️ Utilidades y helpers
│   │   ├── constants.js             # Constantes aplicación SGA-P
│   │   ├── dateUtils.js             # Utilidades fechas académicas
│   │   ├── formatters.js            # Formateadores datos (moneda, fechas)
│   │   ├── validators.js            # Validadores formularios
│   │   ├── permissions.js           # Matriz permisos por rol
│   │   ├── academicHelpers.js       # Helpers cálculos académicos
│   │   └── reportHelpers.js         # Helpers generación reportes
│   │
│   └── assets/                      # 📁 Recursos estáticos
│       ├── react.svg                # Logo React
│       └── images/                  # Imágenes aplicación
│           ├── backgrounds/         # Fondos páginas específicas
│           │   ├── login-bg.jpg     # Fondo página login
│           │   └── dashboard-bg.jpg # Fondo dashboards
│           ├── icons/               # Iconos específicos academia
│           │   ├── university-icon.svg # Icono universidad
│           │   ├── student-icon.svg # Icono estudiante
│           │   └── teacher-icon.svg # Icono docente
│           └── logos/               # Logos institucionales
│               ├── sga-p-logo.png   # Logo principal SGA-P
│               └── university-logos/ # Logos universidades peruanas
│                   ├── unmsm.png    # Logo UNMSM
│                   ├── uni.png      # Logo UNI
│                   └── pucp.png     # Logo PUCP
```

### **🎯 Características Específicas SGA-P Frontend**

- **8 Dashboards Especializados:** Por cada rol académico del sistema
- **PWA Ready:** Installable como aplicación nativa en móviles
- **Responsive Design:** Optimizado para tablets usados en academias
- **Real-time Notifications:** WebSockets para notificaciones inmediatas
- **Multi-theme:** Temas personalizables por academia
- **Offline Support:** Funcionalidad básica sin conexión

## 🚀 **Stack Tecnológico SGA-P Frontend**

### **Framework y Core**
- **Framework:** React 19 (con Concurrent Features)
- **Build Tool:** Vite 6 (ultra-fast HMR + optimizaciones)
- **Transpiler:** SWC (Speedy Web Compiler para mejor performance)
- **Routing:** React Router DOM v7 (con Data APIs)

### **Estado y Gestión Datos**
- **Estado Global:** Redux Toolkit 2.0 (RTK Query para API calls)
- **Cliente HTTP:** Axios 1.6+ (con interceptors personalizados)
- **Cache:** React Query + Redux Toolkit Query (cache inteligente)
- **Validación:** React Hook Form + Yup (validación optimizada)

### **UI y Estilos**
- **CSS Framework:** Tailwind CSS 4.0 (con JIT compiler)
- **Componentes Base:** Headless UI (accesibilidad integrada)
- **Iconos:** Heroicons + Lucide React (iconos académicos)
- **Animaciones:** Framer Motion (transiciones fluidas)

### **PWA y Performance**
- **PWA:** Vite PWA Plugin (service workers automáticos)
- **Performance:** React.lazy + Suspense (code splitting)
- **Bundle Analyzer:** Rollup Bundle Analyzer
- **Image Optimization:** Vite ImageOptim Plugin

### **Testing y Calidad**
- **Unit Testing:** Vitest (test runner nativo Vite)
- **Component Testing:** React Testing Library
- **E2E Testing:** Playwright (testing multi-browser)
- **Linting:** ESLint 9 + Prettier (configuración moderna)

## 🎨 **Sistema de Diseño SGA-P**

### **🎯 Paleta de Colores Académica**
```css
/* Colores Primarios - Academia */
--primary-50: #eff6ff;     /* Azul académico muy claro */
--primary-500: #3b82f6;    /* Azul principal academia */
--primary-700: #1d4ed8;    /* Azul oscuro contraste */

/* Colores Funcionales */
--success-500: #10b981;    /* Verde aprobado/exitoso */
--warning-500: #f59e0b;    /* Amarillo advertencias/pendiente */
--error-500: #ef4444;      /* Rojo reprobado/error */
--info-500: #06b6d4;       /* Cyan informativo */

/* Grises Neutros */
--gray-50: #f9fafb;        /* Fondo aplicación */
--gray-100: #f3f4f6;       /* Fondo tarjetas */
--gray-300: #d1d5db;       /* Bordes elementos */
--gray-600: #4b5563;       /* Texto secundario */
--gray-900: #111827;       /* Texto principal */
```

### **🧩 Componentes UI Reutilizables**
- ✅ **Button** - 6 variantes (primary, secondary, success, warning, error, ghost)
- ✅ **Input** - Con validación, placeholder animado, iconos integrados
- ✅ **Card** - Elevación adaptive, hover effects, loading states
- ✅ **Modal** - Backdrop blur, responsive, animation entrance/exit
- ✅ **Table** - Sorteable, filterable, pagination, export CSV/PDF
- ✅ **Calendar** - Vista mensual/semanal, eventos académicos
- ✅ **Chart** - Líneas, barras, donuts para dashboards académicos
- ✅ **Alert** - 4 tipos (success, warning, error, info) con auto-dismiss

### **📱 Responsive Design System**
```css
/* Breakpoints Académicos */
sm: 640px   /* Móviles (uso estudiantes/padres) */
md: 768px   /* Tablets (uso docentes en aula) */
lg: 1024px  /* Laptops (uso administrativo) */
xl: 1280px  /* Desktops (uso coordinación) */
2xl: 1536px /* Pantallas grandes (proyección aula) */
```

### **🎭 Temas y Personalización**
- **Tema Claro:** Optimizado para uso durante el día
- **Tema Oscuro:** Modo nocturno para estudio nocturno
- **Tema Academia:** Colores personalizables por institución
- **Tema Alto Contraste:** Accesibilidad para usuarios con discapacidad visual

## 👥 **Dashboards Especializados por Rol Académico**

### **🔧 Administrador Dashboard**
- **Vista General Sistema:** Métricas KPI (estudiantes activos, docentes, ingresos)
- **Gestión Usuarios:** CRUD completo 8 tipos de usuario académico
- **Configuración Academia:** Ciclos, horarios, aulas, especialidades
- **Reportes Ejecutivos:** Dashboards financieros, académicos, operativos
- **Auditoria Sistema:** Logs actividad, cambios críticos

### **📚 Coordinador Académico Dashboard**
- **Planificación Académica:** Creación ciclos, asignación docentes-cursos
- **Seguimiento Estudiantes:** Progreso académico, alertas rendimiento
- **Gestión Docentes:** Evaluación, horarios, disponibilidad
- **Simulacros Masivos:** Programación y análisis resultados
- **Reportes Académicos:** Performance por curso, docente, estudiante

### **🎓 Oficial de Admisiones Dashboard**
- **Gestión Postulantes:** Pipeline inscripción completo
- **Exámenes Ingreso:** Programación, aplicación, evaluación automática
- **Proceso Matrícula:** Workflow matrícula con documentación
- **Análisis Conversión:** Métricas postulante → estudiante matriculado
- **Comunicación Masiva:** Emails/SMS automatizados proceso admisión

### **👨‍🏫 Docente Dashboard**
- **Calendario Personal:** Horarios clases, disponibilidad, sustituciones
- **Gestión Cursos:** Lista estudiantes, asistencia, calificaciones
- **Registro Académico:** Marcado asistencia, ingreso notas en tiempo real
- **Material Didáctico:** Upload recursos, tareas, exámenes
- **Comunicación Estudiantes:** Mensajería directa, avisos grupales

### **👨‍🎓 Tutor Dashboard** *(Específico del sistema peruano)*
- **Seguimiento Personalizado:** Estudiantes asignados, progreso individual
- **Plan Tutorías:** Calendario sesiones personalizadas
- **Alertas Académicas:** Identificación temprana problemas rendimiento
- **Comunicación Padres:** Reports progreso, recomendaciones estudio
- **Recursos Apoyo:** Material reforzamiento, técnicas estudio

### **� Estudiante Dashboard**
- **Panel Académico:** Horarios, asistencia, calificaciones en tiempo real
- **Progreso Personal:** Avance por curso, simulacros, ranking relativo
- **Inscripción Simulacros:** Disponibilidad, resultados históricos
- **Recursos Estudio:** Material descarga, videos explicativos
- **Comunicación:** Chat con tutores, avisos importantes

### **👨‍👩‍👧‍👦 Padre/Apoderado Dashboard**
- **Seguimiento Hijo:** Asistencia diaria, calificaciones, comportamiento
- **Estado Financiero:** Pagos realizados, pendientes, becas
- **Comunicación Academia:** Mensajes directos docentes/tutores
- **Calendario Familiar:** Exámenes, eventos, reuniones padres
- **Reportes Progreso:** Informes académicos descargables

### **💰 Oficial Financiero Dashboard**
- **Gestión Pagos:** Procesamiento, confirmación, conciliación
- **Control Morosidad:** Estudiantes morosos, alertas automáticas
- **Sistema Becas:** Asignación, seguimiento, renovación becas
- **Reportes Financieros:** Ingresos, proyecciones, análisis cobranza
- **Facturación Masiva:** Generación lotes facturas por ciclo

## 🔐 **Autenticación y Autorización Académica**

### **🔑 Sistema de Roles y Permisos**
- **Login Multi-rol:** Interface adaptable según tipo de usuario
- **JWT con Refresh:** Tokens seguros con renovación automática transparente  
- **8 Roles Académicos:** Administrador, Coordinador, Oficial Admisiones, Docente, Tutor, Estudiante, Padre, Oficial Financiero
- **Guards por Componente:** Protección granular por funcionalidad
- **Session Management:** Persistencia segura con timeout automático

### **🛡️ Matriz de Permisos Frontend**
```javascript
// Ejemplo configuración permisos
const rolePermissions = {
  ADMINISTRADOR: ['*'], // Acceso total
  COORDINADOR_ACADEMICO: [
    'academic:read', 'academic:write', 'users:read', 
    'reports:academic', 'courses:manage'
  ],
  DOCENTE: [
    'attendance:write', 'grades:write', 'students:read',
    'courses:assigned', 'materials:upload'
  ],
  TUTOR: [
    'students:assigned', 'tutoring:manage', 'parents:communicate',
    'progress:track', 'alerts:academic'
  ],
  ESTUDIANTE: [
    'profile:read', 'grades:own', 'attendance:own',
    'simulacros:participate', 'materials:download'
  ],
  PADRE: [
    'children:track', 'payments:view', 'reports:children',
    'communication:receive', 'calendar:family'
  ]
};
```

### **🔒 Funcionalidades de Seguridad**
- **Rutas Protegidas:** HOC `ProtectedRoute` con validación rol
- **Guards de Componente:** `RoleGuard` para funcionalidades específicas
- **Auto-logout:** Cierre automático por inactividad
- **Sesión Múltiple:** Detección y manejo sesiones concurrentes
- **Recuperación Contraseña:** Workflow seguro con tokens temporales

## 📱 **Responsive Design para Academias**

### **📐 Diseño Mobile-First Académico**
- **Mobile First:** Optimizado para smartphones (padres/estudiantes)
- **Tablet Optimized:** Interface especial para tablets en aula (docentes)
- **Desktop Enhanced:** Dashboards completos para administración
- **Large Screen Support:** Proyección en aulas y salas de reuniones

### **🖥️ Breakpoints Específicos**
```css
/* Configuración Tailwind personalizada */
screens: {
  'xs': '480px',    // Smartphones pequeños
  'sm': '640px',    // Smartphones estándar (estudiantes/padres)
  'md': '768px',    // Tablets (docentes en aula)
  'lg': '1024px',   // Laptops (coordinadores)
  'xl': '1280px',   // Desktops (administración)
  '2xl': '1536px',  // Pantallas grandes (proyección)
  'print': {'raw': 'print'}, // Optimización impresión reportes
}
```

### **🎯 Adaptación por Contexto de Uso**
- **Sidebar Collapsible:** Navegación adaptable según pantalla
- **Menús Contextuales:** Touch-friendly para tablets
- **Grid Flexible:** Layout adaptable para diferentes densidades información
- **Typography Scale:** Tamaños texto optimizados por dispositivo

### **♿ Accesibilidad (WCAG 2.1)**
- **Contraste Alto:** Ratio mínimo 4.5:1 para legibilidad
- **Navegación Keyboard:** Soporte completo teclado
- **Screen Reader:** Etiquetas ARIA comprehensivas
- **Focus Management:** Indicadores visuales focus claros

## ⚙️ **Instalación y Configuración**

### **1. Prerrequisitos**
- Node.js 18+
- npm o yarn

### **2. Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/sgf-frontend.git
cd sgf-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL del backend
```

### **4. Variables de Entorno (.env.local)**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_BASE_URL=ws://localhost:3000

# Application Info
VITE_APP_NAME=SGA-P - Academia Preuniversitaria
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Sistema Gestión Integral Academias Preuniversitarias

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_ANALYTICS=false

# Authentication
VITE_JWT_REFRESH_MINUTES=15
VITE_SESSION_TIMEOUT_MINUTES=120

# External Services
VITE_GOOGLE_MAPS_API_KEY=tu_google_maps_key
VITE_ANALYTICS_ID=tu_google_analytics_id

# Development Only
VITE_MOCK_API=false
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
```

### **5. Scripts de Desarrollo**
```bash
# 🚀 Desarrollo
npm run dev              # Servidor desarrollo con HMR
npm run dev:host         # Desarrollo con acceso red local
npm run dev:https        # Desarrollo con HTTPS (PWA testing)

# 🏗️ Build y Producción
npm run build            # Build optimizado para producción
npm run build:analyze    # Build con análisis bundle size
npm run preview          # Preview build local
npm run build:pwa        # Build con optimizaciones PWA

# 🧪 Testing y Calidad
npm run test            # Tests unitarios con Vitest
npm run test:ui         # Tests con interface gráfica
npm run test:coverage   # Coverage report
npm run e2e             # Tests end-to-end con Playwright

# 📋 Linting y Formatting
npm run lint            # ESLint check
npm run lint:fix        # ESLint fix automático
npm run format          # Prettier format
npm run type-check      # TypeScript type checking

# 📊 Analysis y Performance
npm run analyze         # Análisis bundle con visualización
npm run lighthouse      # Audit performance con Lighthouse
npm run size-limit      # Verificar límites tamaño bundles
```

## 🧩 **Componentes Principales SGA-P**

### **🔐 Autenticación Académica**
- **`LoginForm`** - Form login adaptable por rol con validación
- **`RegisterForm`** - Registro multi-step con documentación específica
- **`ProtectedRoute`** - HOC protección rutas por rol académico
- **`RoleGuard`** - Guard granular por permisos específicos
- **`SessionManager`** - Gestión automática sesiones y renewals

### **📊 Dashboards Especializados**
- **`AdminDashboard`** - KPIs ejecutivos, gestión completa sistema
- **`CoordinadorDashboard`** - Planificación académica, seguimiento docentes
- **`DocenteDashboard`** - Gestión clases, calificaciones, asistencia
- **`TutorDashboard`** - Seguimiento personalizado, comunicación padres
- **`EstudianteDashboard`** - Progreso académico, simulacros, recursos
- **`PadreDashboard`** - Seguimiento hijos, comunicación academia
- **`FinancieroDashboard`** - Gestión pagos, becas, reportes financieros

### **📚 Gestión Académica**
- **`CursoManager`** - CRUD cursos especializados por carrera
- **`HorarioGrid`** - Visualización horarios tipo calendario
- **`AsistenciaTracker`** - Marcado y seguimiento asistencia tiempo real
- **`LibretaNotas`** - Visualización calificaciones con promedios
- **`SimulacroManager`** - Gestión simulacros tipo exámenes universitarios
- **`ProgressTracker`** - Seguimiento progreso individual estudiantes

### **🎓 Proceso Admisiones**
- **`PostulanteForm`** - Formulario inscripción con upload documentos
- **`ExamenInterface`** - Interface aplicación exámenes ingreso
- **`MatriculaWizard`** - Wizard paso a paso proceso matrícula
- **`DocumentChecker`** - Verificación documentos requeridos
- **`AdmissionsFlow`** - Flujo completo postulante → estudiante

### **💰 Gestión Financiera**
- **`PaymentProcessor`** - Procesamiento pagos con múltiples métodos
- **`BecaManager`** - Gestión asignación y seguimiento becas
- **`InvoiceGenerator`** - Generación facturas y comprobantes
- **`MorosidadTracker`** - Seguimiento morosidad con alertas
- **`FinancialReports`** - Dashboards y reportes financieros

### **📢 Sistema Comunicaciones**
- **`NotificationCenter`** - Centro notificaciones tiempo real
- **`EmailComposer`** - Composer emails individuales/masivos
- **`SMSManager`** - Interface envío SMS recordatorios
- **`ChatTutoria`** - Chat directo tutor-estudiante
- **`ParentCommunication`** - Hub comunicación con apoderados

### **🎨 UI Components Base**
- **`DataTable`** - Tabla avanzada con filtros, sort, export
- **`FormWizard`** - Wizard multi-step con progreso visual
- **`Calendar`** - Calendario eventos académicos
- **`Chart`** - Gráficos para dashboards y reportes
- **`FileUpload`** - Upload archivos con drag & drop
- **`SearchFilter`** - Filtros avanzados con autocomplete

## 📊 **Arquitectura Redux Store SGA-P**

### **🏗️ Estructura Store**
```javascript
store/
├── index.js                    # Configuración store principal
└── slices/                     # Redux Toolkit slices por dominio
    ├── authSlice.js            # Estado autenticación y permisos
    ├── userSlice.js            # Gestión usuarios sistema
    ├── academicSlice.js        # Estado módulo académico completo
    ├── admissionsSlice.js      # Proceso admisiones y postulantes  
    ├── financialSlice.js       # Gestión financiera y pagos
    ├── communicationsSlice.js  # Sistema comunicaciones y notificaciones
    ├── uiSlice.js             # Estado UI (modals, loading, theme)
    └── notificationsSlice.js   # Notificaciones tiempo real
```

### **🔄 Estado por Slice**
```javascript
// authSlice - Autenticación y permisos
{
  user: null,                    // Usuario autenticado actual
  token: null,                   // JWT token
  refreshToken: null,            // Refresh token
  permissions: [],               // Permisos específicos rol
  isAuthenticated: false,        // Estado autenticación
  loading: false,                // Loading auth operations
  sessionTimeout: null           // Timestamp timeout sesión
}

// academicSlice - Módulo académico
{
  cursos: [],                    // Lista cursos disponibles
  ciclos: [],                    // Ciclos académicos activos
  horarios: [],                  // Horarios por curso/docente
  asistencias: [],               // Registros asistencia
  calificaciones: [],            // Calificaciones estudiantes
  simulacros: [],                // Simulacros programados
  estudiantes: [],               // Lista estudiantes por curso
  docentes: [],                  // Docentes asignados
  loading: { cursos: false, horarios: false, ... }
}

// financialSlice - Gestión financiera
{
  pagos: [],                     // Historial pagos
  becas: [],                     // Becas asignadas
  morosidad: [],                 // Estudiantes morosos
  facturas: [],                  // Facturas generadas
  estadoCuenta: null,            // Estado cuenta estudiante
  reportes: {},                  // Reportes financieros cached
  loading: { pagos: false, becas: false, ... }
}
```

### **⚡ RTK Query APIs**
```javascript
// API endpoints con cache automático
academicApi.js:
- getCursos()                    // Lista cursos con filtros
- createCurso()                  // Crear nuevo curso
- updateAsistencia()             // Actualizar asistencia
- getCalificaciones(estudianteId) // Calificaciones estudiante

admissionsApi.js:
- getPostulantes()               // Lista postulantes
- processInscripcion()           // Procesar inscripción
- evaluateExamen()               // Evaluar examen ingreso

financialApi.js:
- processPago()                  // Procesar pago
- generateFactura()              // Generar factura
- assignBeca()                   // Asignar beca
```

## 🔌 **Integración API y Manejo Errores**

### **🌐 Estructura Servicios API**
```javascript
services/
├── api.js                  # Axios instance + interceptors
├── authService.js          # Endpoints autenticación
├── userService.js          # CRUD usuarios académicos
├── academicService.js      # Servicios módulo académico
├── admissionsService.js    # Servicios proceso admisiones
├── financialService.js     # Servicios gestión financiera
├── communicationsService.js # Servicios comunicaciones
└── uploadService.js        # Upload archivos (documentos, fotos)
```

### **⚙️ Configuración Axios Personalizada**
```javascript
// api.js - Configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Type': 'SGA-P-Frontend',
    'X-Client-Version': import.meta.env.VITE_APP_VERSION
  }
});

// Interceptors automáticos
api.interceptors.request.use(addAuthToken);
api.interceptors.response.use(handleSuccess, handleError);
```

### **🚨 Manejo de Errores Centralizado**
- **Interceptors Globales:** Captura automática errores HTTP
- **Toast Notifications:** Feedback inmediato usuario
- **Error Boundaries:** Captura errores componentes React
- **Retry Automático:** Reintentos inteligentes requests fallidos
- **Offline Detection:** Manejo estados sin conexión
- **Error Logging:** Logging errores para debugging

### **⏳ Estados Loading Optimizados**
```javascript
// Loading states granulares por operación
const academicSlice = createSlice({
  initialState: {
    loading: {
      cursos: false,       // Loading específico cursos
      asistencia: false,   // Loading marcado asistencia  
      calificaciones: false, // Loading ingreso notas
      simulacros: false    // Loading simulacros
    }
  }
});
```

### **📡 WebSocket para Tiempo Real**
```javascript
// Notificaciones tiempo real
const notificationSocket = {
  connect: () => io(VITE_WS_BASE_URL),
  subscribeToRole: (role) => socket.join(`role:${role}`),
  onNotification: (callback) => socket.on('notification', callback),
  onAsistenciaUpdate: (callback) => socket.on('asistencia:update', callback)
};
```

## 🎣 **Custom Hooks Especializados SGA-P**

### **🔐 Hooks de Autenticación**
```javascript
hooks/
├── useAuth.js              # Autenticación y permisos
├── useRolePermissions.js   # Validación permisos por rol
├── useSessionManager.js    # Gestión sesiones y timeout
└── usePermissionGuard.js   # Guard componentes por permisos
```

### **📚 Hooks Dominio Académico**
```javascript
├── useAcademicCalendar.js  # Calendario académico con eventos
├── useAttendanceTracker.js # Seguimiento asistencia tiempo real
├── useGradeCalculator.js   # Cálculos promedios y rankings
├── useSimulacroManager.js  # Gestión simulacros universitarios
└── useProgressTracker.js   # Seguimiento progreso estudiantes
```

### **💰 Hooks Financieros**
```javascript
├── usePaymentProcessor.js  # Procesamiento pagos
├── useBecaManager.js      # Gestión becas académicas
├── useMorosidadTracker.js # Seguimiento morosidad
└── useFinancialReports.js # Reportes financieros
```

### **🛠️ Hooks Utilidad**
```javascript
├── useApi.js              # API calls con loading states
├── useDebounce.js         # Debounced search optimizado
├── useLocalStorage.js     # Persistencia local datos
├── useNotifications.js    # Sistema notificaciones
├── useFormValidation.js   # Validación formularios académicos
├── useExportData.js       # Export datos CSV/PDF
└── useWebSocket.js        # Conexiones tiempo real
```

### **📊 Ejemplo Hook Académico**
```javascript
// useAttendanceTracker.js
export const useAttendanceTracker = (cursoId) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const markAttendance = useCallback(async (estudianteId, status) => {
    setLoading(true);
    try {
      const result = await academicService.markAttendance({
        cursoId, estudianteId, status, timestamp: new Date()
      });
      setAttendance(prev => [...prev, result]);
      toast.success('Asistencia registrada correctamente');
    } catch (error) {
      toast.error('Error al registrar asistencia');
    } finally {
      setLoading(false);
    }
  }, [cursoId]);

  return { attendance, markAttendance, loading };
};
```

## 🛠️ **Utilidades y Helpers Académicos**

### **🏫 Utilidades Específicas Academia**
```javascript
utils/
├── constants.js           # Constantes sistema SGA-P
├── academicHelpers.js     # Helpers cálculos académicos
├── dateUtils.js          # Utilidades fechas académicas
├── formatters.js         # Formateadores específicos Perú
├── validators.js         # Validadores formularios académicos
├── permissions.js        # Matriz permisos por rol
├── reportHelpers.js      # Helpers generación reportes
└── pdfGenerator.js       # Generación PDFs académicos
```

### **🔧 Helpers Académicos Principales**
```javascript
// academicHelpers.js - Ejemplo funciones
export const calculateGPA = (grades) => {
  // Cálculo promedio ponderado sistema peruano
  const weightedSum = grades.reduce((sum, grade) => 
    sum + (grade.value * grade.credits), 0
  );
  const totalCredits = grades.reduce((sum, grade) => 
    sum + grade.credits, 0
  );
  return totalCredits > 0 ? weightedSum / totalCredits : 0;
};

export const determineAcademicStatus = (gpa, attendance) => {
  // Lógica específica academias preuniversitarias
  if (gpa >= 16 && attendance >= 90) return 'EXCELENTE';
  if (gpa >= 14 && attendance >= 85) return 'BUENO'; 
  if (gpa >= 11 && attendance >= 75) return 'REGULAR';
  return 'DEFICIENTE';
};

export const calculateUniversityChances = (simulacroScores, targetUniversity) => {
  // Algoritmo probabilidad ingreso por universidad
  const universityMinimums = {
    'UNMSM': 14.5, 'UNI': 15.0, 'PUCP': 13.8, 'UNFV': 13.2
  };
  const average = simulacroScores.reduce((a, b) => a + b, 0) / simulacroScores.length;
  const minimum = universityMinimums[targetUniversity] || 12.0;
  return Math.min(100, Math.max(0, ((average - minimum + 2) / 4) * 100));
};
```

### **📅 Utilidades Fechas Académicas**
```javascript
// dateUtils.js - Funciones específicas calendario académico
export const getAcademicYear = (date = new Date()) => {
  // Año académico Perú: Marzo - Diciembre
  const month = date.getMonth();
  return month < 2 ? date.getFullYear() - 1 : date.getFullYear();
};

export const getAcademicSemester = (date = new Date()) => {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 7) return 'PRIMER_SEMESTRE';
  if (month >= 8 && month <= 12) return 'SEGUNDO_SEMESTRE';
  return 'VACACIONES';
};
```

### **✅ Validadores Específicos**
```javascript
// validators.js - Validaciones contexto peruano
export const validateDNI = (dni) => {
  // Validación DNI peruano (8 dígitos)
  const dniRegex = /^\d{8}$/;
  return dniRegex.test(dni);
};

export const validatePhonePeru = (phone) => {
  // Validación celular peruano (+51 9########)
  const phoneRegex = /^(\+51|51|0)?9\d{8}$/;
  return phoneRegex.test(phone);
};

export const validateGradeScale = (grade) => {
  // Validación escala notas peruana (0-20)
  const numGrade = parseFloat(grade);
  return numGrade >= 0 && numGrade <= 20;
};
```

## 📊 **Estado del Proyecto SGA-P Frontend**

### **✅ Completado**
- ✅ **Arquitectura Base:** React 19 + Vite 6 + Redux Toolkit 2.0
- ✅ **Configuración Build:** Tailwind CSS 4 + PostCSS + ESLint 9
- ✅ **PWA Setup:** Manifest.json + Service Workers + Icons
- ✅ **Estructura Directorios:** Clean Architecture frontend completa
- ✅ **Sistema Design:** Paleta colores académica + breakpoints responsive
- ✅ **Documentación:** README completo con arquitectura detallada

### **🔄 En Desarrollo Activo**
- 🔄 **Componentes Autenticación:** LoginForm, RegisterForm, ProtectedRoute
- 🔄 **Dashboard Administrador:** KPIs, gestión usuarios, reportes ejecutivos
- 🔄 **Dashboard Estudiante:** Progreso académico, simulacros, calificaciones
- 🔄 **Sistema Notificaciones:** WebSocket integration + toast notifications
- 🔄 **API Integration:** Servicios REST + manejo errores + loading states

### **📋 Próximas Entregas (Sprint Planning)**

#### **🏃‍♂️ Sprint 1 - Autenticación y Dashboards Base**
- 📋 Implementar `LoginForm` con validación multi-rol
- 📋 Completar `AdminDashboard` con KPIs básicos
- 📋 Desarrollar `EstudianteDashboard` con datos mock
- 📋 Setup sistema routing con `React Router v7`
- 📋 Integrar autenticación JWT con backend

#### **🏃‍♂️ Sprint 2 - Módulo Académico Core**
- 📋 Desarrollar `CursoManager` con CRUD completo
- 📋 Implementar `AsistenciaTracker` con marcado tiempo real
- 📋 Crear `LibretaNotas` con cálculos promedios
- 📋 Integrar `Calendar` para horarios académicos
- 📋 Testing unitario componentes académicos

#### **🏃‍♂️ Sprint 3 - Proceso Admisiones**
- 📋 Implementar `PostulanteForm` con upload documentos
- 📋 Desarrollar `ExamenInterface` para exámenes ingreso
- 📋 Crear `MatriculaWizard` proceso paso a paso
- 📋 Dashboard `OficialAdmisiones` completo
- 📋 Integración PDF generation para documentos

#### **🏃‍♂️ Sprint 4 - Gestión Financiera**
- 📋 `PaymentProcessor` con gateway pagos Perú
- 📋 `BecaManager` gestión becas académicas
- 📋 `FinancialReports` dashboards y gráficos
- 📋 Dashboard `OficialFinanciero` completo
- 📋 Integración facturación electrónica SUNAT

#### **🏃‍♂️ Sprint 5 - Comunicaciones y Móvil**
- 📋 `NotificationCenter` con WebSocket real-time
- 📋 `EmailComposer` para comunicaciones masivas
- 📋 `ParentCommunication` hub padres/apoderados
- 📋 Optimización PWA para móviles
- 📋 Tests E2E con Playwright

#### **🏃‍♂️ Sprint 6 - Optimización y Deploy**
- 📋 Performance optimization y code splitting
- 📋 Bundle size optimization
- 📋 Setup CI/CD pipeline
- 📋 Docker containerization
- 📋 Deployment producción con monitoreo

### **🎯 Métricas Objetivo**
- **Performance Score:** >90 (Lighthouse)
- **Bundle Size:** <500KB gzipped main bundle
- **Test Coverage:** >85% componentes críticos
- **Accessibility:** WCAG 2.1 AA compliance
- **Browser Support:** Chrome, Firefox, Safari, Edge (últimas 2 versiones)

## 🌐 **Rutas y Navegación SGA-P**

### **🔓 Rutas Públicas**
```javascript
// Acceso sin autenticación
/                           # Landing page academia
/login                      # Página autenticación multi-rol
/register                   # Registro postulantes
/about                      # Información academia
/contact                    # Contacto y ubicación
/simulacro-demo            # Demo simulacro gratuito
```

### **🔐 Rutas Protegidas por Rol**

#### **👑 Administrador (`/admin`)**
```javascript
/admin                      # Dashboard ejecutivo general
/admin/usuarios            # Gestión completa usuarios
/admin/cursos              # Administración cursos/ciclos
/admin/reportes            # Reportes ejecutivos y KPIs
/admin/configuracion       # Configuración sistema
/admin/auditoria          # Logs auditoria sistema
```

#### **📚 Coordinador Académico (`/coordinador`)**
```javascript
/coordinador               # Dashboard coordinación académica
/coordinador/planificacion # Planificación ciclos y horarios
/coordinador/docentes      # Gestión y evaluación docentes  
/coordinador/estudiantes   # Seguimiento rendimiento estudiantes
/coordinador/simulacros    # Administración simulacros masivos
/coordinador/reportes      # Reportes académicos detallados
```

#### **🎓 Oficial Admisiones (`/admisiones`)**
```javascript
/admisiones                # Dashboard proceso admisiones
/admisiones/postulantes    # Gestión postulantes e inscripciones
/admisiones/examenes       # Programación y evaluación exámenes
/admisiones/matriculas     # Proceso matrícula y documentación
/admisiones/comunicacion   # Comunicación masiva postulantes
/admisiones/reportes       # Análisis conversión y métricas
```

#### **👨‍🏫 Docente (`/docente`)**
```javascript
/docente                   # Dashboard docente personal
/docente/horarios          # Calendario clases y disponibilidad
/docente/cursos           # Mis cursos asignados
/docente/asistencia       # Registro asistencia por curso
/docente/calificaciones   # Ingreso y gestión calificaciones
/docente/materiales       # Subida material didáctico
/docente/comunicacion     # Mensajes estudiantes y padres
```

#### **👨‍🎓 Tutor (`/tutor`)**
```javascript
/tutor                     # Dashboard tutorías personalizadas
/tutor/estudiantes        # Estudiantes asignados seguimiento
/tutor/sesiones           # Calendario sesiones tutorías
/tutor/progreso           # Tracking progreso individual
/tutor/alertas            # Alertas rendimiento académico
/tutor/padres             # Comunicación directa padres
/tutor/recursos           # Material apoyo personalizado
```

#### **🎒 Estudiante (`/estudiante`)**
```javascript
/estudiante               # Dashboard académico personal
/estudiante/horarios      # Mis horarios de clases
/estudiante/asistencia    # Mi registro asistencia
/estudiante/calificaciones # Mis notas y promedios
/estudiante/simulacros    # Simulacros disponibles/resultados
/estudiante/recursos      # Material estudio descargable
/estudiante/tutoria       # Chat y sesiones con tutor
/estudiante/progreso      # Mi avance académico
```

#### **👨‍👩‍👧‍👦 Padre/Apoderado (`/padre`)**
```javascript
/padre                    # Dashboard seguimiento hijos
/padre/hijos              # Selector/dashboard por hijo
/padre/asistencia         # Asistencia diaria hijos
/padre/calificaciones     # Notas y progreso académico
/padre/pagos              # Estado pagos y financiero
/padre/comunicacion       # Mensajes docentes/tutores
/padre/calendario         # Eventos importantes hijo
/padre/reportes           # Reportes académicos descargables
```

#### **💰 Oficial Financiero (`/financiero`)**
```javascript
/financiero               # Dashboard gestión financiera
/financiero/pagos         # Procesamiento y confirmación pagos
/financiero/becas         # Gestión programa becas
/financiero/morosidad     # Control y seguimiento morosidad
/financiero/facturacion   # Generación facturas masivas
/financiero/reportes      # Dashboards e informes financieros
/financiero/conciliacion  # Conciliación bancaria
```

### **🔀 Rutas Compartidas (Múltiples Roles)**
```javascript
/perfil                   # Edición perfil personal
/notificaciones          # Centro notificaciones
/ayuda                   # Sistema ayuda/FAQ
/soporte                 # Chat soporte técnico
/configuracion           # Configuración cuenta personal
```

## 👥 **Equipo de Desarrollo SGA-P**

### **🏆 Core Team**
- **🎯 Product Owner / Lead Developer** - Definición producto y arquitectura
- **📋 Scrum Master / Full Stack Developer** - Metodología y desarrollo integral  
- **⚛️ React Specialist** - Especialista frontend y componentes
- **🎨 UI/UX Designer** - Diseño interfaz específica contexto académico

### **🎓 Contexto Académico**
**Desarrollado específicamente para academias preuniversitarias peruanas** con deep understanding del sistema educativo nacional y preparación universitaria local.

---

## 📞 **Soporte y Contacto**

### **� Contacto Técnico**
- **Email Desarrollo:** frontend@sga-p.pe
- **Soporte Técnico:** soporte@sga-p.pe  
- **WhatsApp:** +51 999 888 777

### **📚 Recursos y Documentación**
- **🌐 Documentación Completa:** https://docs.sga-p.pe/frontend
- **🎨 Storybook Componentes:** https://components.sga-p.pe
- **🐛 Issues y Bugs:** https://github.com/sga-p/sgf-frontend/issues
- **📊 Performance Dashboard:** https://perf.sga-p.pe

### **🚀 Deployment y Releases**
- **🔄 CI/CD Pipeline:** GitHub Actions + Vercel/Netlify
- **🌍 Staging Environment:** https://staging.sga-p.pe
- **📦 Production Release:** https://app.sga-p.pe
- **📋 Release Notes:** https://github.com/sga-p/sgf-frontend/releases

---

## 📄 **Información del Proyecto**

**🏷️ Versión Actual:** 1.0.0-beta  
**📅 Última Actualización:** Septiembre 2025  
**⚖️ Licencia:** MIT License  
**🔄 Estado:** En Desarrollo Activo  
**🎯 Target Release:** Diciembre 2025  

---

**Frontend SGA-P desarrollado siguiendo metodología SCRUM con arquitectura React moderna, Clean Architecture principles y optimizado específicamente para el contexto educativo preuniversitario peruano.**
