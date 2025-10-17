# Arquitectura Frontend - SGF

## Stack Tecnologico

- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Runtime:** Node.js 22
- **Routing:** React Router DOM 7.9.4
- **State Management:** Jotai 2.15.0
- **Data Fetching:** TanStack Query 5.90.2
- **HTTP Client:** Axios 1.12.2
- **Styling:** TailwindCSS 4.1.14
- **Icons:** Heroicons 2.2.0
- **Linting:** ESLint 9.36.0
- **Formatting:** Prettier 3.6.2

## Estructura del Proyecto

```
sgf-frontend/
├── .github/
│   └── workflows/          # CI/CD workflows
│       ├── lint.yml        # Linting workflow
│       └── build.yml       # Build workflow
├── docs/                   # Documentacion
│   ├── ARCHITECTURE.md     # Este archivo
│   └── QUICK_START_CI_CD.md
├── public/                 # Assets estaticos
├── src/
│   ├── assets/            # Imagenes, fonts, etc.
│   ├── components/        # Componentes reutilizables
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Paginas/vistas
│   ├── services/          # API services
│   ├── store/             # Estado global (Jotai)
│   ├── utils/             # Utilidades
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos del App
│   ├── main.jsx           # Entry point
│   └── index.css          # Estilos globales
├── .env.example           # Variables de entorno ejemplo
├── .prettierrc            # Configuracion Prettier
├── eslint.config.js       # Configuracion ESLint
├── vite.config.js         # Configuracion Vite
├── tailwind.config.js     # Configuracion Tailwind
└── package.json           # Dependencias

```

## Patrones de Diseno

### 1. Component-Based Architecture

Componentes organizados por responsabilidad:

```
components/
├── common/          # Componentes genericos (Button, Input, Modal)
├── layout/          # Componentes de layout (Header, Sidebar, Footer)
└── features/        # Componentes especificos de features
```

### 2. Custom Hooks Pattern

Logica reutilizable encapsulada en hooks:

```javascript
// hooks/useAuth.js
export const useAuth = () => {
  const [user] = useAtom(userAtom);
  const login = async (credentials) => { /* ... */ };
  const logout = () => { /* ... */ };
  return { user, login, logout };
};
```

### 3. Service Layer Pattern

Separacion de logica de API:

```javascript
// services/api/userService.js
export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};
```

### 4. Atomic State Management (Jotai)

Estado global granular y reactivo:

```javascript
// store/atoms/userAtoms.js
export const userAtom = atom(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
```

## Configuracion de CI/CD

### Workflows

1. **Lint Workflow** (`.github/workflows/lint.yml`)
   - Ejecuta ESLint
   - Verifica formato con Prettier
   - Comenta en PR si falla

2. **Build Workflow** (`.github/workflows/build.yml`)
   - Ejecuta build de produccion
   - Calcula tamano del build
   - Sube artefactos
   - Comenta en PR con metricas

### Branch Protection

- Requiere aprobacion de PR
- Requiere que pasen los checks (lint + build)
- No permite push directo a main/develop
- Incluye administradores

## Configuracion de ESLint

### Reglas Principales

```javascript
// eslint.config.js
rules: {
  // React Hooks
  'react-hooks/exhaustive-deps': 'warn',
  'react-refresh/only-export-components': 'warn',
  
  // SOLID Principles
  'max-lines-per-function': ['warn', { max: 80 }],
  'max-lines': ['warn', { max: 400 }],
  'complexity': ['warn', 12],
  
  // Code Quality
  'no-unused-vars': 'warn',
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'eqeqeq': ['error', 'always'],
  
  // ES6+
  'prefer-const': 'error',
  'no-var': 'error',
  'arrow-body-style': ['warn', 'as-needed'],
  
  // Code Style
  'semi': ['error', 'always'],
  'quotes': ['error', 'single'],
  'comma-dangle': ['error', 'always-multiline'],
}
```

### Archivos Ignorados

- `dist/**` - Build output
- `build/**` - Build output alternativo
- `node_modules/**` - Dependencias
- `coverage/**` - Reportes de coverage
- `*.min.js` - Archivos minificados

## Configuracion de Vite

### Build Optimization

```javascript
// vite.config.js
build: {
  outDir: 'dist',
  sourcemap: false,
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'ui-vendor': ['@heroicons/react'],
        'state-vendor': ['jotai', '@tanstack/react-query'],
      },
    },
  },
}
```

### Path Aliases

```javascript
resolve: {
  alias: {
    '@': './src',
    '@components': './src/components',
    '@pages': './src/pages',
    '@hooks': './src/hooks',
    '@services': './src/services',
    '@store': './src/store',
    '@utils': './src/utils',
    '@assets': './src/assets',
  },
}
```

## Best Practices

### 1. Componentes

- Mantener componentes pequenos (< 80 lineas)
- Un componente por archivo
- Usar PropTypes o TypeScript para validacion
- Preferir functional components sobre class components

### 2. Estado

- Usar Jotai para estado global
- Usar useState para estado local
- Usar TanStack Query para estado del servidor
- Evitar prop drilling excesivo

### 3. Performance

- Usar React.memo para componentes pesados
- Implementar code splitting con React.lazy
- Optimizar imagenes y assets
- Usar manualChunks para separar vendors

### 4. Seguridad

- Nunca exponer secrets en el codigo
- Validar inputs del usuario
- Sanitizar datos antes de renderizar
- Usar HTTPS en produccion

### 5. Accesibilidad

- Usar semantic HTML
- Agregar aria-labels cuando sea necesario
- Asegurar navegacion por teclado
- Mantener contraste de colores adecuado

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo

# Build
npm run build            # Build de produccion
npm run preview          # Preview del build

# Calidad de Codigo
npm run lint             # Ejecutar ESLint
npm run lint:fix         # Arreglar errores automaticamente
npm run format           # Formatear codigo
npm run format:check     # Verificar formato
```

## Variables de Entorno

```bash
# .env.example
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=SGF
VITE_APP_VERSION=1.0.0
```

**Nota:** Todas las variables deben empezar con `VITE_` para ser accesibles en el cliente.

## Deployment

### Build de Produccion

```bash
npm run build
```

Genera archivos optimizados en `dist/`:
- HTML minificado
- CSS minificado y con autoprefixer
- JS minificado y code-split
- Assets optimizados

### Verificacion Pre-Deploy

```bash
npm run lint              # Verificar codigo
npm run format:check      # Verificar formato
npm run build             # Verificar que compila
npm run preview           # Probar build localmente
```

## Troubleshooting

### Build Fails

1. Verificar versiones de Node.js (requiere v22)
2. Limpiar cache: `rm -rf node_modules dist && npm install`
3. Verificar variables de entorno
4. Revisar logs de error en consola

### Linting Errors

1. Ejecutar `npm run lint` para ver errores
2. Ejecutar `npm run lint:fix` para arreglar automaticamente
3. Revisar reglas en `eslint.config.js`

### Performance Issues

1. Usar React DevTools Profiler
2. Verificar re-renders innecesarios
3. Implementar code splitting
4. Optimizar imagenes y assets

---

**Documentacion actualizada:** Octubre 2025
