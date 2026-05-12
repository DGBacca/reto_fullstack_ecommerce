import Button from '../atoms/Button';
import { useCartStore } from '../../store/cartStore';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();
  
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
        <p className="text-blue-600 font-bold mb-2">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <Button variant="danger" onClick={() => removeItem(item.id)} className="text-sm">
            Eliminar
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
