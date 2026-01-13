# Users Components

Componentes relacionados con la gestión de usuarios del sistema.

## Estructura

```
users/
├── UserForm.jsx          # Formulario para crear/editar usuarios
└── README.md            # Este archivo
```

## Componentes

### UserForm

Formulario reutilizable para crear y editar usuarios.

**Props:**
- `onSubmit: (formData) => void` - Callback al enviar el formulario
- `onCancel: () => void` - Callback al cancelar
- `initialData?: Object` - Datos iniciales para edición (opcional)
- `isLoading?: boolean` - Estado de carga (opcional)

**Validaciones:**
- DNI: 8 dígitos obligatorios
- Nombres: Obligatorio
- Apellidos: Obligatorio
- Correo: Opcional, formato válido
- Teléfono: Opcional, 9 dígitos
- Rol: Obligatorio (estudiante, docente, admin)

**Ejemplo de uso:**

```jsx
import UserForm from '../../../components/dashboard/users/UserForm';

function UsersPage() {
  const handleSubmit = async (formData) => {
    await UserService.createUser(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <UserForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={isSubmitting}
      />
    </Modal>
  );
}
```

## Tests

Los tests están ubicados en: `tests/components/dashboard/users/UserForm.test.jsx`

Para ejecutar los tests:

```bash
npm test -- UserForm.test.jsx
```

## Principios Aplicados

- **Single Responsibility**: Cada componente tiene una única responsabilidad
- **Feature-based Organization**: Componentes organizados por dominio/feature
- **Separation of Concerns**: Tests separados del código fuente
- **Reusabilidad**: Componentes diseñados para ser reutilizables

## Notas

- La contraseña inicial del usuario es su DNI (generada en backend)
- El correo es opcional para cumplir con Ley N° 29733 (menores de edad)
- Todos los campos tienen validación en tiempo real
