import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import Button from '../atoms/Button';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const getItemCount = useCartStore(state => state.getItemCount);
  const itemCount = getItemCount();
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            E-Shop
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            
            <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Hola, {user?.name}</span>
                <Button variant="secondary" onClick={logout} className="text-sm">
                  Salir
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="text-sm">Ingresar</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
