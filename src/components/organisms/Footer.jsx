export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Shop</h3>
            <p className="text-gray-400">
              Tu tienda de confianza para los mejores productos de tecnología, moda y joyería.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/cart" className="hover:text-white transition-colors">Carrito</a></li>
              <li><a href="/auth" className="hover:text-white transition-colors">Cuenta</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">Email: soporte@eshop.com</p>
            <p className="text-gray-400">Tel: +1 234 567 890</p>
            <div className="flex gap-4 mt-4">
              {/* Iconos sociales simplificados */}
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition-colors">f</span>
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 cursor-pointer transition-colors">i</span>
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 cursor-pointer transition-colors">t</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2024 E-Shop - Fullstack Challenge. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
