import { create } from 'zustand';
import axios from 'axios';
import { products as mockProducts } from '../mockdata/products';

export const useProductStore = create((set, get) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
  selectedCategory: 'all',
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 8,
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      // Aseguramos que los productos de la API tengan stock para la lógica del carrito
      const apiProducts = response.data.map(p => ({
        ...p,
        stock: Math.floor(Math.random() * 100) + 1 // Simulamos stock ya que FakeStore API no lo trae
      }));
      set({ products: apiProducts, filteredProducts: apiProducts, isLoading: false });
      get().applyFilters();
    } catch (err) {
      console.error('Error fetching products, using mockdata fallback', err);
      set({ products: mockProducts, filteredProducts: mockProducts, isLoading: false, error: 'Usando datos locales' });
    }
  },
  
  setCategory: (category) => {
    set({ selectedCategory: category, currentPage: 1 });
    get().applyFilters();
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { products, selectedCategory, searchQuery } = get();
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    set({ filteredProducts: filtered });
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  getPaginatedProducts: () => {
    const { filteredProducts, currentPage, itemsPerPage } = get();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  },
  
  getTotalPages: () => {
    const { filteredProducts, itemsPerPage } = get();
    return Math.ceil(filteredProducts.length / itemsPerPage);
  },
  
  getProductById: (id) => {
    return get().products.find(p => p.id === parseInt(id));
  },
}));
