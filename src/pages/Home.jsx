import SearchBar from '../components/molecules/SearchBar';
import CategoryFilter from '../components/molecules/CategoryFilter';
import ProductGrid from '../components/organisms/ProductGrid';
import Pagination from '../components/molecules/Pagination';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Encuentra los mejores productos
        </h1>
        <SearchBar />
      </div>
      
      <div className="mb-6">
        <CategoryFilter />
      </div>
      
      <ProductGrid />
      <Pagination />
    </div>
  );
}
