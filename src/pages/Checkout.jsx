import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const user = useAuthStore(state => state.user);
  const total = getTotal();
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: ''
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Pedido realizado con éxito! Recibirás un email de confirmación.');
    clearCart();
    navigate('/');
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Información de envío</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Dirección completa"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    placeholder="Código postal"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Información de pago</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Número de tarjeta"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength={16}
                  required
                />
                <Input
                  placeholder="Nombre en la tarjeta"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/AA"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    maxLength={5}
                    required
                  />
                  <Input
                    placeholder="CVC"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={handleChange}
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full py-3">
              Confirmar pedido - ${total.toFixed(2)}
            </Button>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
            
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 pb-3 border-b">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
