import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { userAtom } from '../../store/auth.store';
import { AuthService } from '../../services/auth.service';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  const [formData, setFormData] = useState({ dni: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(formData.dni, formData.password);
      if (response.success) {
        setUser(response.data.user);
        navigate('/dashboard'); // Will create this route next
      } else {
        setError(response.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-slate-900">Bienvenido</h2>
        <p className="text-slate-500 mt-2">Ingresa tus credenciales para acceder</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="DNI"
          type="text"
          placeholder="Ingresa tu DNI"
          value={formData.dni}
          onChange={e => setFormData({ ...formData, dni: e.target.value })}
          disabled={loading}
          required
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          disabled={loading}
          required
        />

        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500">¿Olvidaste tu contraseña? </span>
        <button type="button" className="font-semibold text-primary-600 hover:text-primary-500">
          Contactar soporte
        </button>
      </div>
    </Card>
  );
};

export default LoginPage;
