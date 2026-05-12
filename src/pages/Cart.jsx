import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import CartItem from '../components/molecules/CartItem';
import Button from '../components/atoms/Button';

export default function Cart() {
  const navigate = useNavigate();
  const { items, getTotal } = useCartStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const total = getTotal();
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <Button onClick={() => navigate('/')}>Ir de compras</Button>
      </div>
    );
  }
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrito de Compras</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-semibold">Gratis</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button onClick={handleCheckout} className="w-full py-3">
              Proceder al pago
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full py-3 mt-3"
            >
              Seguir comprando
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
