import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Zap, Gamepad2, Shield, Check } from 'lucide-react';
import { getProductDetail } from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';

interface ProductResponse {
  product: {
    id: string;
    name: string;
    slug: string;
    url?: string;
    detail?: string;
    price: string;
  };
  category: {
    name: string;
    slug: string;
    url?: string;
  };
}

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await getProductDetail(slug);
        setProductData(response.data);
      } catch (error) {
        console.error('Ürün detayı yüklenirken hata:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (productData) {
      addItem(productData.product.id, 1);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (productData) {
      addItem(productData.product.id, 1);
      navigate('/sepet');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <SEOHead />
        <LoadingSpinner size="xl" text="Ürün Yükleniyor..." />
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <SEOHead />
        <div className="text-center p-8 bg-[#202020] rounded-lg max-w-md">
          <Gamepad2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Ürün Bulunamadı</h2>
          <p className="text-gray-500 mb-6">Aradığınız ürün mevcut değil.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const { product, category } = productData;

  return (
    <div className="min-h-screen pt-14 bg-[#121212]">
      <SEOHead />

      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link to="/oyunlar" className="hover:text-white transition-colors">Kategoriler</Link>
          <span>/</span>
          <Link to={`/oyunlar/${category.slug}`} className="hover:text-white transition-colors">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-2">
            <div className="bg-[#202020] rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                {!imgError && product.url ? (
                  <img
                    src={product.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#303030] flex items-center justify-center">
                    <Gamepad2 className="h-20 w-20 text-gray-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Product Description */}
            {product.detail && (
              <div className="bg-[#202020] rounded-lg p-6 mt-6">
                <h2 className="text-lg font-bold text-white mb-4">Ürün Açıklaması</h2>
                <div
                  className="text-gray-400 text-sm leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.detail }}
                />
              </div>
            )}
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#202020] rounded-lg p-6 sticky top-20">
              {/* Category Tag */}
              <div className="inline-block px-3 py-1 bg-[#303030] rounded text-xs text-gray-400 mb-4">
                {category.name}
              </div>

              {/* Product Name */}
              <h1 className="text-2xl font-bold text-white mb-6">{product.name}</h1>

              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Fiyat</p>
                <p className="text-3xl font-bold text-white">{product.price}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-6 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="h-5 w-5" />
                  HEMEN SATIN AL
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`w-full py-3 px-6 font-semibold rounded transition-all flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-transparent border border-[#404040] text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      SEPETE EKLENDİ
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      SEPETE EKLE
                    </>
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-[#303030] space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Shield className="h-4 w-4 text-[#00D4FF]" />
                  <span>Güvenli Ödeme</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Zap className="h-4 w-4 text-[#00D4FF]" />
                  <span>Anında Teslimat</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Check className="h-4 w-4 text-[#00D4FF]" />
                  <span>7/24 Destek</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
