import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Archivos a ignorar
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '*.min.js',
      '.env',
      '.env.*',
    ],
  },

  // Configuración base
  js.configs.recommended,

  // Configuración para archivos JS/JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ===== REACT HOOKS =====
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ===== PRINCIPIOS SOLID PARA REACT =====
      // Single Responsibility Principle
      'max-lines-per-function': ['warn', { max: 80, skipBlankLines: true, skipComments: true }],
      'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 12],

      // ===== CODE QUALITY =====
      // Errores comunes
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^(StrictMode|App)$',
          ignoreRestSiblings: true,
        },
      ],
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // Best practices
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'curly': ['error', 'all'],
      'no-throw-literal': 'error',
      'no-return-await': 'error',
      'require-await': 'warn',

      // ES6+
      'arrow-body-style': ['warn', 'as-needed'],
      'prefer-arrow-callback': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-template': 'warn',
      'object-shorthand': 'warn',

      // Async/Await
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'warn',

      // Code style
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

      // Naming conventions (flexible para React)
      'camelcase': ['warn', { properties: 'never', ignoreDestructuring: true }],

      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // React específico
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Configuración específica para archivos de configuración
  {
    files: ['*.config.js', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
