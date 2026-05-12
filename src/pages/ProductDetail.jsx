import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getProductById = useProductStore(state => state.getProductById);
  const addItem = useCartStore(state => state.addItem);
  
  const product = getProductById(id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Button onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem(product);
    navigate('/cart');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-6">
        ← Volver
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="font-semibold">{product.rating.rate}</span>
              <span className="text-gray-600">({product.rating.count} reseñas)</span>
            </div>
            {product.stock < 20 && (
              <Badge variant="warning">Solo quedan {product.stock} unidades</Badge>
            )}
          </div>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Categoría</h3>
            <Badge>{product.category}</Badge>
          </div>
          
          <Button onClick={handleAddToCart} className="w-full py-3 text-lg">
            Agregar al carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
