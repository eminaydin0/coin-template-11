import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategoryDetail, getCategoryProducts } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

const CategoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const [categoryResponse, productsResponse] = await Promise.all([
          getCategoryDetail(slug),
          getCategoryProducts(slug)
        ]);
        setCategory(categoryResponse.data);
        setProducts(productsResponse.data || []);
      } catch (error) {
        console.error('Kategori verileri yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <LoadingSpinner size="xl" text="Yükleniyor..." />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <div className="text-center p-8 bg-[#202020] rounded-lg max-w-md">
          <Gamepad2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Kategori Bulunamadı</h2>
          <p className="text-gray-500 mb-6">Aradığınız kategori mevcut değil.</p>
          <Link
            to="/oyunlar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kategorilere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-[#121212]">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link to="/oyunlar" className="hover:text-white transition-colors">Kategoriler</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">{category.name}</h1>
            <span className="text-sm text-gray-500">{products.length} ürün</span>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-[#202020] rounded-lg">
            <Gamepad2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Bu kategoride ürün bulunmuyor</h3>
            <p className="text-gray-500">Yakında yeni ürünler eklenecektir.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded bg-[#202020] text-gray-400 hover:text-white hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded font-medium transition-colors ${
                        pageNum === currentPage
                          ? 'bg-[#0078F2] text-white'
                          : 'bg-[#202020] text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded bg-[#202020] text-gray-400 hover:text-white hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/epin/${product.slug}`} className="group">
      <div className="bg-[#202020] rounded-lg overflow-hidden hover:bg-[#2a2a2a] transition-all duration-200 hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-[3/4] relative overflow-hidden">
          {product.url && !imageError ? (
            <img
              src={product.url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#303030] flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">
                {product.name.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Popular Badge */}
          {product.isPopular && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-[#0078F2] text-white text-xs font-bold rounded">
              POPÜLER
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-white group-hover:text-[#00D4FF] transition-colors line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
          <div className="mt-2">
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through mr-2">
                {product.originalPrice}
              </span>
            )}
            <span className="text-sm font-bold text-white">{product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryDetailPage;
