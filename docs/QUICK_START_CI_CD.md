# Quick Start - Proteccion del Repositorio Frontend

Guia rapida para configurar la proteccion del repositorio frontend en 5 minutos.

## Que obtienes?

- Lint automatico en cada PR (ESLint + Prettier)
- Build automatico en cada PR (Vite)
- Branch protection (requiere aprobacion para merge)
- No se puede mergear codigo con errores
- Code review obligatorio
- Verificacion de tamano de build

## Configuracion (5 minutos)

### Paso 1: Configurar Branch Protection en GitHub

```bash
1. Ir a tu repositorio en GitHub
2. Settings -> Branches -> Add rule
3. Branch name pattern: main
4. Marcar:
   [x] Require a pull request before merging
   [x] Require approvals: 1
   [x] Require status checks to pass before merging
   [x] Status checks that are required:
      - lint
      - test
      - build
   [x] Include administrators
5. Save changes
6. Repetir para branch: develop
```

### Paso 2: Verificar que funciona

```bash
# Crear una rama de prueba
git checkout -b test/ci-cd
echo "# Test CI/CD" >> README.md
git add README.md
git commit -m "test: verificar CI/CD"
git push origin test/ci-cd

# Ir a GitHub y crear un Pull Request hacia develop
# Verificar que se ejecuten automaticamente:
# 1. Frontend Lint [PASS]
# 2. Frontend Test [PASS]
# 3. Frontend Build [PASS]
```

**Listo!** Ahora tienes proteccion del repositorio funcionando.

## Flujo de Trabajo

### 1. Desarrollador crea feature branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/FE-XXX-descripcion
```

### 2. Desarrolla codigo

```bash
# Hacer cambios
npm run lint        # Verificar estilo
npm run build       # Verificar que compila

git add .
git commit -m "feat: descripcion del cambio"
git push origin feature/FE-XXX-descripcion
```

### 3. Crear Pull Request

```bash
# En GitHub:
1. Ir a Pull Requests -> New Pull Request
2. Base: develop <- Compare: feature/FE-XXX-descripcion
3. Crear PR

# GitHub Actions ejecutara automaticamente:
[RUNNING] Lint Workflow (1-2 min)
[RUNNING] Test Workflow (1-2 min)
[RUNNING] Build Workflow (2-3 min)
```

### 4. Code Review

```bash
# Otro desarrollador revisa el codigo
# Si hay cambios solicitados:
- Hacer los cambios
- git push (los workflows se ejecutan de nuevo)

# Si todo esta bien:
- Reviewer aprueba el PR
```

### 5. Merge

```bash
# Una vez aprobado y con checks pasando:
- Click en "Merge pull request"
- El codigo se integra a develop
```

## Que NO se puede hacer

Con la proteccion activada:

- [x] Push directo a `main` o `develop`
- [x] Merge sin aprobacion de reviewer
- [x] Merge con build fallando
- [x] Merge con errores de linting
- [x] Bypass de proteccion (ni siquiera admins)

## Verificacion

Para verificar que la proteccion esta activa:

```bash
# Intentar push directo a develop (deberia fallar)
git checkout develop
echo "test" >> README.md
git add README.md
git commit -m "test"
git push origin develop

# Resultado esperado:
# [FAIL] Error: protected branch hook declined
```

## Workflows Disponibles

### 1. Lint Workflow

**Archivo:** `.github/workflows/lint.yml`

**Se ejecuta en:**

- Pull Request a `main` o `develop`
- Push a `main` o `develop`

**Acciones:**

1. Checkout codigo
2. Setup Node.js 22
3. Instalar dependencias (`npm ci`)
4. Ejecutar ESLint (`npm run lint`)
5. Verificar formato Prettier (`npm run format:check`)
6. Comentar en PR si falla (texto ASCII puro)

**Tiempo:** 1-2 minutos

**Mensaje de error en PR:**
```
Linting failed. Please fix the issues and push again.
```

### 2. Test Workflow

**Archivo:** `.github/workflows/test.yml`

**Se ejecuta en:**

- Pull Request a `main` o `develop`
- Push a `main` o `develop`

**Acciones:**

1. Checkout codigo
2. Setup Node.js 22
3. Instalar dependencias (`npm ci`)
4. Ejecutar tests con coverage (`npm run test:coverage`)
5. Subir coverage a Codecov (opcional)
6. Comentar coverage en PR (formato tabla ASCII)

**Tiempo:** 1-2 minutos

**Configuracion de Vitest:**
```javascript
// vitest.config.js
coverage: {
  thresholds: {
    branches: 50,    // Cobertura de ramas (50% como backend inicial)
    functions: 60,   // Cobertura de funciones
    lines: 60,       // Cobertura de lineas
    statements: 60,  // Cobertura de sentencias
  }
}

// Archivos excluidos del coverage (similar al backend):
- src/main.jsx (entry point - bootstrapping)
- src/App.jsx (root component - routing setup)
- src/App.css (estilos)
- src/index.css (estilos globales)
- *.config.js (configuracion)
- tests/ (archivos de tests)
- dist/ (build output)
- node_modules/ (dependencias)
```

**Mensaje de coverage en PR:**
```
## Test Coverage Report

| Metric | Coverage | Status |
|--------|----------|--------|
| Statements | XX.XX% | [PASS/WARN] |
| Branches | XX.XX% | [PASS/WARN] |
| Functions | XX.XX% | [PASS/WARN] |
| Lines | XX.XX% | [PASS/WARN] |

Overall Status: [PASS/WARN]

Thresholds:
- Statements: 60%
- Branches: 50%
- Functions: 60%
- Lines: 60%
```

**Configuracion de ESLint:**
```javascript
// eslint.config.js
rules: {
  // React Hooks
  'react-hooks/exhaustive-deps': 'warn',
  'react-refresh/only-export-components': 'warn',
  
  // Code Quality
  'max-lines-per-function': ['warn', { max: 80 }],
  'max-lines': ['warn', { max: 400 }],
  'complexity': ['warn', 12],
  
  // Best Practices
  'eqeqeq': ['error', 'always'],
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prefer-const': 'error',
  'no-var': 'error',
}
```

### 3. Build Workflow

**Archivo:** `.github/workflows/build.yml`

**Se ejecuta en:**

- Pull Request a `main` o `develop`
- Push a `main` o `develop`

**Acciones:**

1. Checkout codigo
2. Setup Node.js 22
3. Instalar dependencias (`npm ci`)
4. Ejecutar build de produccion (`npm run build`)
5. Calcular tamano del build
6. Subir artefactos de build (disponibles por 7 dias)
7. Comentar en PR con informacion del build

**Tiempo:** 2-3 minutos

**Configuracion de Vite:**
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

**Mensaje de build en PR:**
```
## Build Report

| Metric | Value |
|--------|-------|
| Build Size | XXX KB |
| Status | [PASS] Build completed successfully |
| Node Version | 22 |
| Build Tool | Vite |

Build artifacts are available for download in the Actions tab.
```

## Troubleshooting

### "Workflow not found"

- Verificar que los archivos esten en `.github/workflows/`
- Verificar que tengan extension `.yml`
- Hacer push de los archivos al repositorio

### "Status check not found"

- Esperar a que los workflows se ejecuten al menos una vez
- Luego apareceran en la lista de status checks

### "Build failed"

- Ejecutar build localmente: `npm run build`
- Verificar que todas las dependencias esten instaladas
- Revisar los logs en GitHub Actions
- Verificar variables de entorno necesarias

### "Linting failed"

- Ejecutar linting localmente: `npm run lint`
- Arreglar errores: `npm run lint:fix`
- Verificar formato: `npm run format:check`
- Arreglar formato: `npm run format`

### "Build size too large"

- Revisar dependencias innecesarias
- Verificar code splitting en vite.config.js
- Usar lazy loading para rutas
- Optimizar imagenes y assets

## Comandos Utiles

```bash
# Verificar codigo localmente antes de push
npm run lint              # Verificar estilo
npm run lint:fix          # Arreglar automaticamente
npm run format            # Formatear codigo
npm run format:check      # Verificar formato
npm test                  # Ejecutar tests
npm run test:coverage     # Tests con coverage
npm run test:watch        # Tests en modo watch
npm run test:ui           # Tests con UI interactiva
npm run build             # Build de produccion
npm run preview           # Preview del build

# Git workflow
git checkout develop                    # Ir a develop
git pull origin develop                 # Actualizar
git checkout -b feature/FE-XXX          # Crear feature
# ... hacer cambios ...
git add .                               # Agregar cambios
git commit -m "feat: descripcion"       # Commit
git push origin feature/FE-XXX          # Push
# ... crear PR en GitHub ...
```

## Resumen

**Configuracion:**

- Tiempo: 5 minutos
- Pasos: 2 (Branch protection + Verificacion)
- Costo: $0 (GitHub Actions gratis para repos publicos)

**Beneficios:**

- Codigo siempre revisado
- Build siempre exitoso
- Estilo de codigo consistente
- Menos bugs en produccion
- Mejor calidad de codigo
- Control de tamano de build

**Resultado:**

- Repositorio protegido
- No se puede mergear codigo malo
- Code review obligatorio
- Build tracking automatico
- Artefactos de build disponibles

**Stack Tecnologico:**

- React 19.1.1
- Vite 7.1.7
- Node.js 22
- ESLint 9.36.0
- Prettier 3.6.2
- TailwindCSS 4.1.14

---

**Listo para empezar!**
