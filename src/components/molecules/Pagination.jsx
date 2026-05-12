import Button from '../atoms/Button';
import { useProductStore } from '../../store/productStore';

export default function Pagination() {
  const { currentPage, setCurrentPage, getTotalPages } = useProductStore();
  const totalPages = getTotalPages();
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        variant="secondary"
      >
        Anterior
      </Button>
      
      <div className="flex gap-1">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`w-10 h-10 rounded ${
              currentPage === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="secondary"
      >
        Siguiente
      </Button>
    </div>
  );
}
