import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const result = login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } else {
      if (!formData.name) {
        setError('Por favor ingresa tu nombre');
        return;
      }
      const result = register(formData.email, formData.password, formData.name);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              placeholder="Nombre completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full py-3">
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
        
        {isLogin && (
          <div className="mt-4 p-4 bg-blue-50 rounded text-sm">
            <p className="font-semibold mb-2">Credenciales de prueba:</p>
            <p>Email: user@test.com</p>
            <p>Contraseña: user123</p>
          </div>
        )}
      </div>
    </div>
  );
}
