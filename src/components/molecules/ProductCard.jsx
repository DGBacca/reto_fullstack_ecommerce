import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import { useCartStore } from '../../store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };
  
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.stock < 20 && (
            <div className="absolute top-2 right-2">
              <Badge variant="warning">Pocas unidades</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <Button onClick={handleAddToCart} className="text-sm">
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
