import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../../../../src/components/dashboard/users/UserForm';

describe('UserForm Component', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('should render all form fields', () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/DNI/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rol/i)).toBeInTheDocument();
  });

  it('should validate DNI with 8 digits', async () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const dniInput = screen.getByLabelText(/DNI/i);
    const submitButton = screen.getByRole('button', { name: /Crear Usuario/i });

    // DNI inválido (menos de 8 dígitos)
    fireEvent.change(dniInput, { target: { value: '1234567' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El DNI debe tener 8 dígitos/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate required fields', async () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const submitButton = screen.getByRole('button', { name: /Crear Usuario/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El DNI es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/Los nombres son obligatorios/i)).toBeInTheDocument();
      expect(screen.getByText(/Los apellidos son obligatorios/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate phone with 9 digits', async () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const submitButton = screen.getByRole('button', { name: /Crear Usuario/i });

    // Teléfono inválido
    fireEvent.change(phoneInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El teléfono debe tener 9 dígitos/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should submit form with valid data', async () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Llenar formulario con datos válidos
    fireEvent.change(screen.getByLabelText(/DNI/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Nombres/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellidos/i), { target: { value: 'Pérez' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'juan@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '987654321' } });

    const submitButton = screen.getByRole('button', { name: /Crear Usuario/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        dni: '12345678',
        nombres: 'Juan',
        apellidos: 'Pérez',
        correo: 'juan@example.com',
        telefono: '987654321',
        rol: 'estudiante',
      });
    });
  });

  it('should call onCancel when cancel button is clicked', () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should disable form when isLoading is true', () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} isLoading={true} />);

    expect(screen.getByLabelText(/DNI/i)).toBeDisabled();
    expect(screen.getByLabelText(/Nombres/i)).toBeDisabled();
    expect(screen.getByLabelText(/Apellidos/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /Guardando.../i })).toBeDisabled();
  });

  it('should populate form with initialData', () => {
    const initialData = {
      dni: '87654321',
      nombres: 'María',
      apellidos: 'García',
      correo: 'maria@example.com',
      telefono: '912345678',
      rol: 'docente',
    };

    render(
      <UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} initialData={initialData} />,
    );

    expect(screen.getByLabelText(/DNI/i)).toHaveValue('87654321');
    expect(screen.getByLabelText(/Nombres/i)).toHaveValue('María');
    expect(screen.getByLabelText(/Apellidos/i)).toHaveValue('García');
    expect(screen.getByLabelText(/Correo Electrónico/i)).toHaveValue('maria@example.com');
    expect(screen.getByLabelText(/Teléfono/i)).toHaveValue('912345678');
    expect(screen.getByLabelText(/Rol/i)).toHaveValue('docente');
  });

  it('should clear error when user starts typing', async () => {
    render(<UserForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const dniInput = screen.getByLabelText(/DNI/i);
    const submitButton = screen.getByRole('button', { name: /Crear Usuario/i });

    // Trigger validation error
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/El DNI es obligatorio/i)).toBeInTheDocument();
    });

    // Start typing
    fireEvent.change(dniInput, { target: { value: '1' } });

    await waitFor(() => {
      expect(screen.queryByText(/El DNI es obligatorio/i)).not.toBeInTheDocument();
    });
  });
});
