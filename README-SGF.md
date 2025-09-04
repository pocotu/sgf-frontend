# 🎨 SGF Frontend - Sistema de Gestión para Espacios Formativos

Frontend del Sistema Web de Gestión para Espacios Formativos desarrollado con **React + Vite + Redux Toolkit + Tailwind CSS**.

## 🎯 **Descripción del Proyecto**

Interfaz web moderna y responsive para la gestión integral de clases, horarios, asistencia y pagos en academias, centros educativos y espacios de formación técnica.

## 🏗️ **Arquitectura Frontend**

### **Estructura de Carpetas**
```
src/
├── components/          # 🧩 Componentes React
│   ├── ui/             # Componentes de UI reutilizables
│   ├── auth/           # Componentes de autenticación
│   ├── dashboards/     # Dashboards por rol de usuario
│   ├── forms/          # Formularios CRUD
│   └── layout/         # Estructura y navegación
├── pages/              # 📄 Páginas principales (rutas)
├── services/           # 🔌 API client y comunicación backend
├── store/              # 📦 Redux Toolkit store
│   └── slices/         # Redux slices por funcionalidad
├── hooks/              # 🎣 Custom hooks
├── utils/              # 🛠️ Utilidades y helpers
└── assets/             # 📁 Recursos estáticos
```

## 🚀 **Stack Tecnológico**

- **Framework:** React 19 + Vite
- **Estado Global:** Redux Toolkit
- **Estilos:** Tailwind CSS 4
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Iconos:** Heroicons
- **Build Tool:** Vite con SWC

## 🎨 **Sistema de Diseño**

### **Colores Principales**
- **Primary:** Blue (500-700)
- **Success:** Green (500-600)
- **Warning:** Yellow (500-600)
- **Error:** Red (500-600)
- **Neutral:** Gray (100-900)

### **Componentes UI Reutilizables**
- ✅ **Button** - Botones con variantes (primary, secondary, danger)
- ✅ **Input** - Campos de entrada con validación
- ✅ **Card** - Tarjetas para contenido
- ✅ **Modal** - Ventanas modales
- ✅ **Table** - Tablas con paginación y filtros
- ✅ **Calendar** - Calendario para horarios

## 👥 **Dashboards por Rol**

### **🔧 Admin Dashboard**
- Vista general del sistema
- Métricas principales (usuarios, clases, reservas)
- Gestión completa de usuarios y clases
- Reportes y analítica

### **👨‍🏫 Instructor Dashboard**
- Calendario personal de clases
- Lista de estudiantes inscritos
- Control de asistencia
- Gestión de disponibilidad

### **👨‍🎓 Student Dashboard**
- Clases disponibles para reservar
- Mis reservas actuales
- Historial de clases
- Pagos y facturas

## 🔐 **Autenticación y Autorización**

- **Login/Logout** con JWT tokens
- **Registro** multi-step con validación
- **ProtectedRoute** por roles
- **Refresh automático** de tokens
- **Persistencia** de sesión

## 📱 **Responsive Design**

- **Mobile First** approach
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation:** Sidebar colapsible en mobile
- **Grid System:** CSS Grid + Flexbox con Tailwind

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

### **3. Variables de Entorno**
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=SGF - Sistema de Gestión
VITE_APP_VERSION=1.0.0
```

### **4. Ejecutar la aplicación**
```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview build de producción
npm run preview

# Linting
npm run lint
```

## 🧩 **Componentes Principales**

### **Autenticación**
- `LoginForm` - Formulario de inicio de sesión
- `RegistrationForm` - Registro multi-step
- `ProtectedRoute` - Rutas protegidas por rol

### **Dashboards**
- `AdminDashboard` - Panel de administración
- `InstructorDashboard` - Panel de instructor
- `StudentDashboard` - Panel de estudiante

### **Gestión**
- `UserManagement` - CRUD de usuarios
- `ClassManagement` - CRUD de clases
- `BookingManagement` - Gestión de reservas

### **UI Components**
- `Button`, `Input`, `Card`, `Modal`
- `Table`, `Pagination`, `Calendar`
- `Header`, `Sidebar`, `Footer`

## 📊 **Redux Store Structure**

```javascript
store/
├── index.js           # Store configuration
└── slices/
    ├── authSlice.js   # Authentication state
    ├── userSlice.js   # Users management
    ├── classSlice.js  # Classes management
    ├── bookingSlice.js # Bookings management
    └── uiSlice.js     # UI state (modals, loading)
```

## 🔌 **API Integration**

### **Services Structure**
```javascript
services/
├── api.js           # Axios instance configuration
├── authService.js   # Authentication endpoints
├── userService.js   # User management endpoints
├── classService.js  # Class management endpoints
└── bookingService.js # Booking endpoints
```

### **Error Handling**
- **Global interceptors** para manejo de errores
- **Toast notifications** para feedback de usuario
- **Retry automático** para requests fallidos
- **Loading states** en componentes

## 🎣 **Custom Hooks**

```javascript
hooks/
├── useAuth.js       # Authentication logic
├── useApi.js        # API calls with loading states
├── useDebounce.js   # Debounced search
└── useLocalStorage.js # Local storage management
```

## 🛠️ **Utilidades**

```javascript
utils/
├── constants.js     # App constants
├── dateUtils.js     # Date formatting and manipulation
├── formatters.js    # Data formatters
└── validators.js    # Form validation helpers
```

## 📊 **Estado del Proyecto**

- ✅ Estructura de carpetas implementada
- ✅ React + Vite configurado
- ✅ Tailwind CSS configurado
- ✅ Redux Toolkit preparado
- ⏳ Componentes de autenticación (en desarrollo)
- ⏳ Dashboards por rol (pendiente)
- ⏳ Sistema de rutas (pendiente)
- ⏳ Integración con API backend (pendiente)

## 🌐 **Rutas Principales**

```javascript
// Rutas públicas
/                    # Home page
/login              # Página de login
/register           # Página de registro

// Rutas protegidas por rol
/admin              # Dashboard administrador
/instructor         # Dashboard instructor
/student            # Dashboard estudiante

// Gestión (Admin only)
/admin/users        # Gestión de usuarios
/admin/classes      # Gestión de clases
/admin/reports      # Reportes y analítica
```

## 👥 **Equipo de Desarrollo**

- **Product Owner / Developer**
- **Scrum Master / Developer**
- **Full Stack Developer**

## 📄 **Licencia**

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

**Frontend desarrollado siguiendo metodología SCRUM con arquitectura moderna y mejores prácticas de React.**
