import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GradesRegisterPage from '@/pages/dashboard/grades/GradesRegisterPage';
import { GroupService } from '@/services/group.service';
import { EvaluationService } from '@/services/evaluation.service';
import { EnrollmentService } from '@/services/enrollment.service';

// Mock services
vi.mock('@/services/group.service');
vi.mock('@/services/evaluation.service');
vi.mock('@/services/enrollment.service');
vi.mock('@/services/grade.service');

// Mock Toast
vi.mock('@/context/ToastContext', () => ({
    useToast: () => ({ addToast: vi.fn() })
}));

describe('GradesRegisterPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('loads groups on mount', async () => {
        GroupService.getGroups.mockResolvedValue({ 
            success: true, 
            data: [{ grupo_id: 1, nombre_grupo: 'G1' }] 
        });

        render(<GradesRegisterPage />);
        
        await waitFor(() => {
            expect(GroupService.getGroups).toHaveBeenCalled();
            expect(screen.getByText('G1 - Curso')).toBeInTheDocument();
        });
    });

    it('disables evaluation select initially', async () => {
         GroupService.getGroups.mockResolvedValue({ success: true, data: [] });
         render(<GradesRegisterPage />);
         
         // Evaluation select is second select
         // We can find by label "2. Seleccionar Evaluación"
         // Actually finding by text might be tricky if label structure changes
         // Let's rely on disabled attribute behaviour
         const evalSelects = screen.getAllByRole('combobox');
         // 2nd one should be disabled
         expect(evalSelects[1]).toBeDisabled();
    });

    it('fetches evaluations and students when group selected', async () => {
        GroupService.getGroups.mockResolvedValue({ 
            success: true, 
            data: [{ grupo_id: 1, nombre_grupo: 'G1' }] 
        });
        
        EvaluationService.getEvaluations.mockResolvedValue({
            success: true,
            data: [{ evaluacion_id: 10, nombre: 'Parcial 1' }]
        });

        EnrollmentService.getEnrollments.mockResolvedValue({
            success: true,
            data: [{ estudiante_id: 100, nombre_estudiante: 'Juan' }]
        });

        render(<GradesRegisterPage />);
        
        // Wait for groups
        await waitFor(() => screen.getByText('G1 - Curso'));
        
        // Select Group
        const groupSelect = screen.getAllByRole('combobox')[0];
        fireEvent.change(groupSelect, { target: { value: '1' } });

        await waitFor(() => {
            expect(EvaluationService.getEvaluations).toHaveBeenCalledWith({ grupo_id: '1' });
            expect(EnrollmentService.getEnrollments).toHaveBeenCalledWith({ grupo_id: '1' });
        });
    });
});
