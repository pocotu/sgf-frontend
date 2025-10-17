# SGF Frontend - Sistema de Gestión Integral para Academias Preuniversitarias

## Stack Tecnológico

- **React 19.1.1** - Biblioteca UI
- **Vite 7.1.x** - Build tool y dev server
- **Tailwind CSS 4.1.x** - Framework CSS
- **React Router DOM 7.x** - Enrutamiento
- **React Query 5.x** - Gestión de estado del servidor
- **Jotai 2.x** - Gestión de estado global
- **Axios 1.x** - Cliente HTTP
- **Heroicons** - Iconos

## Estructura del Proyecto

```
sgf-frontend/
├── src/
│   ├── components/          # Componentes React reutilizables
│   │   ├── ui/              # Componentes UI base (Button, Input, Card)
│   │   ├── layout/          # Componentes de estructura (Header, Sidebar, Footer)
│   │   ├── auth/            # Componentes de autenticación
│   │   ├── dashboards/      # Dashboards por rol
│   │   ├── forms/           # Formularios específicos
│   │   ├── academic/        # Componentes módulo académico
│   │   ├── admissions/      # Componentes proceso admisiones
│   │   ├── financial/       # Componentes gestión financiera
│   │   └── communications/  # Componentes comunicaciones
│   │
│   ├── pages/               # Páginas principales (React Router)
│   │   ├── auth/            # Páginas de autenticación
│   │   ├── dashboard/       # Páginas de dashboards
│   │   ├── academic/        # Páginas módulo académico
│   │   ├── admissions/      # Páginas admisiones
│   │   ├── financial/       # Páginas financiero
│   │   └── communications/  # Páginas comunicaciones
│   │
│   ├── hooks/               # Custom Hooks específicos SGA-P
│   ├── services/            # Servicios API y comunicación backend
│   ├── store/               # Jotai Atoms (estado global)
│   │   └── atoms/           # Definición de atoms
│   ├── utils/               # Utilidades y helpers
│   ├── assets/              # Recursos estáticos
│   │   ├── images/
│   │   └── styles/
│   │
│   ├── App.jsx              # Componente raíz con routing
│   ├── App.css              # Estilos específicos App
│   ├── main.jsx             # Punto entrada React + Query Provider + Jotai
│   └── index.css            # Estilos globales Tailwind base
│
├── public/                  # Recursos públicos estáticos
├── .env.example             # Variables de entorno ejemplo
├── package.json
├── vite.config.js           # Configuración Vite 6
├── tailwind.config.js       # Configuración Tailwind CSS 4
├── postcss.config.js
└── eslint.config.js
```

## Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Configurar la URL del backend en .env
VITE_API_URL=http://localhost:3000/api/v1
```

## Comandos Disponibles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para produccion
npm run build

# Preview del build de produccion
npm run preview

# Linting y formato
npm run lint              # Verificar codigo
npm run lint:fix          # Arreglar errores automaticamente
npm run format            # Formatear codigo
npm run format:check      # Verificar formato
```

## Configuración

### Variables de Entorno

Crear un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_API_TIMEOUT=10000
VITE_ENV=development
```

## Arquitectura

El proyecto sigue una arquitectura por features con separación clara de responsabilidades:

- **Components**: Componentes reutilizables organizados por módulo
- **Pages**: Páginas completas que usan los componentes
- **Hooks**: Custom hooks para lógica reutilizable
- **Services**: Comunicación con el backend (API calls)
- **Store**: Estado global con Jotai
- **Utils**: Funciones utilitarias y helpers

## Roles del Sistema

- **Admin**: Acceso completo al sistema
- **Docente**: Gestión de grupos, asistencia y notas
- **Estudiante**: Consulta de información personal

## CI/CD

El proyecto incluye workflows de GitHub Actions para garantizar la calidad del codigo:

### Workflows Automaticos

1. **Lint Workflow** - Verifica estilo de codigo y formato
   - Ejecuta ESLint
   - Verifica formato con Prettier
   - Se ejecuta en cada PR y push a main/develop

2. **Build Workflow** - Verifica que el proyecto compile
   - Ejecuta build de produccion
   - Calcula tamano del build
   - Sube artefactos de build
   - Se ejecuta en cada PR y push a main/develop

### Branch Protection

- Requiere aprobacion de PR antes de merge
- Requiere que pasen todos los checks (lint + build)
- No permite push directo a main/develop
- Aplica a todos los usuarios (incluidos admins)

### Documentacion

- [Quick Start CI/CD](docs/QUICK_START_CI_CD.md) - Guia rapida de configuracion
- [Arquitectura](docs/ARCHITECTURE.md) - Documentacion tecnica completa

## Enlaces

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`
- API Docs: Ver `docs/detalles/API_Endpoints.md`

