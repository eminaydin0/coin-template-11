import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight } from 'lucide-react';
import { getCategories } from '../services/api';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
  productCount?: number;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <LoadingSpinner size="xl" text="Kategoriler Yükleniyor..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-[#121212]">
      <SEOHead />

      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Kategoriler</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Göz At</h1>
            <span className="text-sm text-gray-500">{categories.length} kategori</span>
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-20 bg-[#202020] rounded-lg">
            <Gamepad2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Kategori bulunamadı</h3>
            <p className="text-gray-500">Yakında yeni kategoriler eklenecektir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: Category }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/oyunlar/${category.slug}`} className="group">
      <div className="bg-[#202020] rounded-lg overflow-hidden hover:bg-[#2a2a2a] transition-all duration-200 hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden">
          {category.url && !imageError ? (
            <img
              src={category.url}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#303030] flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600">
                {category.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-white group-hover:text-[#00D4FF] transition-colors truncate">
            {category.name}
          </h3>
          {category.productCount && category.productCount > 0 && (
            <p className="text-xs text-gray-500 mt-1">{category.productCount} ürün</p>
          )}
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 group-hover:text-[#00D4FF] transition-colors">
            <span>Keşfet</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoriesPage;
