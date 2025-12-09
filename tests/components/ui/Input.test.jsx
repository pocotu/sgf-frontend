
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../../../src/components/ui/Input';

describe('Input Component', () => {
    it('renders label correctly', () => {
        render(<Input label="Username" name="username" />);
        expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('handles value changes', () => {
        const handleChange = vi.fn();
        render(<Input label="Name" onChange={handleChange} />);
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'John' } });
        
        expect(handleChange).toHaveBeenCalled();
    });

    it('shows error message', () => {
        render(<Input label="Email" error="Invalid email" />);
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
    });
});
