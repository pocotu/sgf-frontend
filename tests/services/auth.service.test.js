import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../src/services/auth.service';
import api from '../../src/services/api';

// Mock the api module
vi.mock('../../src/services/api');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: vi.fn(key => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('should login successfully and store token', async () => {
        const mockResponse = {
            data: {
                success: true,
                data: {
                    token: 'fake-jwt-token',
                    user: { id: 1, name: 'Test User' }
                }
            }
        };

        api.post.mockResolvedValue(mockResponse);

        const result = await AuthService.login('12345678', 'password');

        expect(api.post).toHaveBeenCalledWith('/auth/login', { dni: '12345678', password: 'password' });
        expect(localStorage.getItem('token')).toBe('fake-jwt-token');
        expect(result).toEqual(mockResponse.data);
    });

    it('should register successfully', async () => {
        const mockResponse = {
            data: {
                success: true,
                message: 'User created'
            }
        };

        api.post.mockResolvedValue(mockResponse);

        const result = await AuthService.register({ dni: '87654321' });

        expect(api.post).toHaveBeenCalledWith('/auth/register', { dni: '87654321' });
        expect(result).toEqual(mockResponse.data);
    });

    it('should logout and remove token', () => {
        localStorage.setItem('token', 'old-token');
        AuthService.logout();
        expect(localStorage.getItem('token')).toBeNull();
    });
});
