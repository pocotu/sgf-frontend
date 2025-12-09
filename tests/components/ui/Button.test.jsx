import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../../src/components/ui/Button';

describe('Button Component', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles onClick event', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows loading state properly', () => {
        render(<Button loading>Click me</Button>);
        expect(screen.getByText('Procesando...')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('respects disabled prop', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies variant classes', () => {
        const { container } = render(<Button variant="danger">Delete</Button>);
        expect(container.firstChild).toHaveClass('bg-red-600');
    });
});
