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
      '*.min.css',
      '.env',
      '.env.*',
      'public/**',
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

      /*
       * ===== MANTENIBILIDAD (Complejidad y Legibilidad) =====
       * Limita la complejidad ciclomática
       */
      complexity: ['warn', { max: 12 }],
      'max-depth': ['warn', { max: 4 }],
      'max-nested-callbacks': ['warn', { max: 3 }],
      'max-lines-per-function': [
        'warn',
        { max: 80, skipBlankLines: true, skipComments: true },
      ],
      'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
      'max-params': ['warn', { max: 4 }],
      'max-statements': ['warn', { max: 25 }, { ignoreTopLevelFunctions: false }],

      /*
       * ===== CORRECCIÓN (Prevención de Errores) =====
       * Variables y scope
       */
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_|^(React|StrictMode|App|[A-Z][a-zA-Z]+)$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-undef': 'error',
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
      'no-shadow': ['warn', { builtinGlobals: false, hoist: 'functions' }],
      'no-shadow-restricted-names': 'error',
      'no-redeclare': 'error',

      // Errores comunes
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-constant-condition': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-ex-assign': 'error',
      'no-func-assign': 'error',
      'no-import-assign': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-obj-calls': 'error',
      'no-promise-executor-return': 'error',
      'no-prototype-builtins': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'warn',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-private-class-members': 'warn',
      'use-isnan': 'error',
      'valid-typeof': 'error',

      /*
       * ===== SEGURIDAD =====
       * Prevención de inyección de código
       */
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',

      // Prevención de vulnerabilidades
      'no-caller': 'error',
      'no-extend-native': 'error',
      'no-global-assign': 'error',
      'no-iterator': 'error',
      'no-proto': 'error',
      'no-with': 'error',

      // Validación de datos
      'no-regex-spaces': 'warn',
      'no-control-regex': 'warn',

      // ===== CONFIABILIDAD (Manejo de Errores) =====
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      'no-return-await': 'error',
      'require-await': 'warn',
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'warn',

      // ===== RENDIMIENTO =====
      'no-loop-func': 'warn',
      'no-new-object': 'warn',
      'no-new-wrappers': 'error',
      'no-array-constructor': 'warn',

      /*
       * ===== ESTÁNDARES Y PROCEDIMIENTOS =====
       * Consistencia de código
       */
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],
      'dot-notation': ['warn', { allowKeywords: true }],
      'no-else-return': ['warn', { allowElseIf: false }],
      'no-lonely-if': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-useless-return': 'warn',
      'prefer-arrow-callback': ['warn', { allowNamedFunctions: false }],
      'prefer-template': 'warn',
      'object-shorthand': ['warn', 'always'],
      'quote-props': ['warn', 'as-needed'],
      yoda: ['warn', 'never'],

      // Naming conventions (flexible para React)
      camelcase: [
        'warn',
        {
          properties: 'never',
          ignoreDestructuring: true,
          ignoreImports: false,
          ignoreGlobals: false,
        },
      ],

      // Comentarios y documentación
      'spaced-comment': ['warn', 'always', { markers: ['/'] }],
      'multiline-comment-style': ['warn', 'starred-block'],

      // ===== CAPACIDAD DE PRUEBA =====
      'no-new': 'warn',
      'no-param-reassign': ['warn', { props: false }],
      'consistent-return': 'warn',

      // ===== REACT ESPECÍFICO =====
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      /*
       * ===== ACCESIBILIDAD (A11Y) =====
       * Estas reglas ayudan a crear interfaces accesibles
       */
      'jsx-a11y/alt-text': 'off', // Requiere plugin jsx-a11y
      'jsx-a11y/anchor-is-valid': 'off', // Requiere plugin jsx-a11y
    },
  },

  // Configuración específica para tests
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', 'tests/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
      },
    },
    rules: {
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'max-statements': 'off',
      'max-nested-callbacks': 'off',
      'no-unused-expressions': 'off',
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
      'max-lines': 'off',
    },
  },
];
