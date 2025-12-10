import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import { userAtom } from '@/store/auth.store';
import { useAtomValue } from 'jotai';

// Mock child components
vi.mock('@/components/dashboard/home/AdminDashboard', () => ({
  default: () => <div data-testid="admin-dashboard">Admin Dashboard</div>
}));
vi.mock('@/components/dashboard/home/TeacherDashboard', () => ({
  default: () => <div data-testid="teacher-dashboard">Teacher Dashboard</div>
}));
vi.mock('@/components/dashboard/home/StudentDashboard', () => ({
  default: () => <div data-testid="student-dashboard">Student Dashboard</div>
}));

// Mock auth store
vi.mock('@/store/auth.store', () => ({
  userAtom: 'mock-atom'
}));

// Mock Jotai
vi.mock('jotai', () => ({
  useAtomValue: vi.fn(),
  atom: vi.fn() // Add atom just in case
}));

describe('DashboardPage Routing', () => {

  it('renders AdminDashboard for admin role', () => {
    useAtomValue.mockReturnValue({ nombres: 'Admin', rol: 'admin' });
    render(<DashboardPage />);
    expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('teacher-dashboard')).not.toBeInTheDocument();
  });

  it('renders TeacherDashboard for docente role', () => {
    useAtomValue.mockReturnValue({ nombres: 'Profe', rol: 'docente' });
    render(<DashboardPage />);
    expect(screen.getByTestId('teacher-dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('admin-dashboard')).not.toBeInTheDocument();
  });

  it('renders StudentDashboard for estudiante role', () => {
    useAtomValue.mockReturnValue({ nombres: 'Alumno', rol: 'estudiante' });
    render(<DashboardPage />);
    expect(screen.getByTestId('student-dashboard')).toBeInTheDocument();
  });

  it('renders nothing if no user', () => {
    useAtomValue.mockReturnValue(null);
    const { container } = render(<DashboardPage />);
    expect(container).toBeEmptyDOMElement();
  });
});
