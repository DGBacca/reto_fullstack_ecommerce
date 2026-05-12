import { categories } from '../../mockdata/products';
import { useProductStore } from '../../store/productStore';

export default function CategoryFilter() {
  const { selectedCategory, setCategory } = useProductStore();
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => setCategory(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
