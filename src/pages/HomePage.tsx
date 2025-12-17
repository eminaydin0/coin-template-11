import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getHomepageItems, getCategories } from '../services/api';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gift, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  detail?: string | null;
  isPopular?: boolean;
  rating?: number;
  people?: number;
  categoryName?: string;
  category?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

interface HeroItem {
  slogan: string;
  short1: string;
  short2: string;
  short3: string;
  url: string;
}

const HomePage = () => {
  const [homepageItems, setHomepageItems] = useState<HomepageItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const { getHeroList } = useWebsite();
  const heroList = getHeroList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, categoriesResponse] = await Promise.all([
          getHomepageItems(20),
          getCategories()
        ]);
        setHomepageItems(itemsResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        // Silent error handling
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-play hero slider
  useEffect(() => {
    if (heroList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroList.length]);

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <LoadingSpinner size="xl" text="Yükleniyor..." variant="gaming" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-[#121212]">
      <SEOHead />
      
      <div className="max-w-[1920px] mx-auto">
        {/* Hero Section - Epic Style */}
        {heroList.length > 0 && (
          <HeroCarousel
                    heroList={heroList}
            currentIndex={currentHeroIndex}
            setCurrentIndex={setCurrentHeroIndex}
            homepageItems={homepageItems.slice(0, 5)}
          />
        )}

        {/* Promotional Banners */}
        <div className="px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PromoBanner
              title="YENİ ÜRÜNLER"
              subtitle="En son çıkan oyunlar"
              bgColor="from-[#0078F2] to-[#0055AA]"
              icon={<Sparkles className="h-6 w-6" />}
            />
            <PromoBanner
              title="POPÜLER"
              subtitle="En çok satanlar"
              bgColor="from-[#00D4FF] to-[#0078F2]"
              icon={<TrendingUp className="h-6 w-6" />}
            />
            <PromoBanner
              title="FIRSATLAR"
              subtitle="Özel indirimler"
              bgColor="from-[#0066CC] to-[#003366]"
              icon={<Gift className="h-6 w-6" />}
            />
          </div>
        </div>

        {/* New Items Section - Featured Carousel */}
        <NewItemsCarousel items={homepageItems.slice(0, 10)} />

        {/* Free Games Section - Epic Style */}
        <FreeGamesSection items={homepageItems.slice(0, 2)} />

        {/* Popular Items */}
        <PopularSection items={homepageItems.slice(5, 15)} />

        {/* Categories Section */}
        <CategoriesSection categories={categories} />

        {/* More Games */}
        <GameGridSection
          title="Tüm Ürünler"
          items={homepageItems}
        />

        <ScrollToTopButton />
      </div>
    </div>
  );
};

// Hero Carousel Component
const HeroCarousel = ({
  heroList,
  currentIndex,
  setCurrentIndex,
  homepageItems
}: {
  heroList: HeroItem[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  homepageItems: HomepageItem[];
}) => {
  const current = heroList[currentIndex];

  return (
    <div className="px-4 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Hero */}
        <div className="lg:col-span-3 relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={current.url}
                alt={current.slogan}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                {current.slogan}
              </h2>
              <p className="text-gray-300 text-sm lg:text-base mb-4 max-w-xl">
                {[current.short1, current.short2, current.short3].filter(Boolean).join(' • ')}
              </p>
              <Link
                to="/oyunlar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
              >
                Keşfet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {heroList.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(currentIndex === 0 ? heroList.length - 1 : currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentIndex((currentIndex + 1) % heroList.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Dots */}
          {heroList.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {heroList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
      </div>

        {/* Side Items */}
        <div className="hidden lg:flex flex-col gap-3">
          {homepageItems.map((item, i) => (
            <Link
              key={item.id}
              to={`/epin/${item.slug}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                i === 0 ? 'bg-[#202020] border border-[#0078F2]' : 'bg-[#202020] hover:bg-[#2a2a2a]'
              }`}
            >
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                {item.url ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#303030] flex items-center justify-center">
                    <span className="text-gray-500 text-xs">N/A</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {typeof item.price === 'number' ? `₺${item.price}` : item.price}
                </p>
            </div>
            </Link>
            ))}
          </div>
        </div>
    </div>
  );
};

// Promo Banner Component
const PromoBanner = ({
  title,
  subtitle,
  bgColor,
  icon
}: {
  title: string;
  subtitle: string;
  bgColor: string;
  icon: React.ReactNode;
}) => (
  <Link
    to="/oyunlar"
    className={`relative h-32 rounded-lg overflow-hidden bg-gradient-to-r ${bgColor} group`}
  >
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
    <div className="relative h-full flex items-center justify-between p-6">
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-white/80 text-sm">{subtitle}</p>
      </div>
      <div className="text-white/80 group-hover:text-white transition-colors">
        {icon}
      </div>
    </div>
  </Link>
);

// New Items Carousel - Main Featured Style
const NewItemsCarousel = ({ items }: { items: HomepageItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[currentIndex];

  return (
    <div className="px-4 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link to="/oyunlar" className="flex items-center gap-2 group">
          <h2 className="text-xl font-bold text-white">Yeni Şeyler Keşfet</h2>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Featured Item */}
        <div className="lg:col-span-3 relative h-[350px] lg:h-[400px] rounded-lg overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {current.url ? (
                <img
                  src={current.url}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#202020] to-[#303030] flex items-center justify-center">
                  <span className="text-gray-600 text-6xl font-bold">{current.name.charAt(0)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-[#00D4FF] mb-2">{current.categoryName || current.category?.name}</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{current.name}</h3>
              <p className="text-xl font-bold text-white mb-4">
                {typeof current.price === 'number' ? `₺${current.price.toLocaleString('tr-TR')}` : current.price}
              </p>
              <Link
                to={`/epin/${current.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors"
              >
                İncele
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentIndex((currentIndex + 1) % items.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Dots */}
          {items.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {items.slice(0, 6).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Side Items */}
        <div className="hidden lg:flex flex-col gap-2">
          {items.slice(0, 5).map((item, i) => (
            <button
              key={item.slug}
              onClick={() => setCurrentIndex(i)}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all text-left ${
                i === currentIndex ? 'bg-[#202020] border border-[#0078F2]' : 'bg-[#1a1a1a] hover:bg-[#202020]'
              }`}
            >
              <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0">
                {item.url ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#303030] flex items-center justify-center">
                    <span className="text-gray-500 text-sm font-bold">{item.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-medium text-white truncate">{item.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {typeof item.price === 'number' ? `₺${item.price.toLocaleString('tr-TR')}` : item.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Game Carousel Section
const GameCarouselSection = ({
  title,
  items,
  showArrow
}: {
  title: string;
  items: HomepageItem[];
  showArrow?: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="px-4 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link to="/oyunlar" className="flex items-center gap-2 group">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {showArrow && (
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          )}
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-[#202020] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-[#202020] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {items.map((item) => (
          <GameCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Game Card Component
const GameCard = ({ item }: { item: HomepageItem }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/epin/${item.slug}`}
      className="flex-shrink-0 w-[200px] group"
    >
      <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-[#202020]">
        {item.url && !imageError ? (
          <img
            src={item.url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-600 text-4xl font-bold">
              {item.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">{item.categoryName || item.category?.name || 'Oyun'}</p>
        <h4 className="text-sm font-medium text-white truncate group-hover:text-[#00D4FF] transition-colors">
          {item.name}
        </h4>
        <p className="text-sm text-gray-400 mt-1">
          {typeof item.price === 'number' ? `₺${item.price.toLocaleString('tr-TR')}` : item.price}
        </p>
        {item.people && item.people > 0 && (
          <p className="text-xs text-gray-500 mt-1">{item.people} kişi inceledi</p>
        )}
      </div>
    </Link>
  );
};

// Featured Games Section - Epic Style
const FreeGamesSection = ({ items }: { items: HomepageItem[] }) => (
  <div className="px-4 lg:px-8 py-8">
    <div className="flex items-center gap-3 mb-6">
      <TrendingUp className="h-6 w-6 text-[#00D4FF]" />
      <h2 className="text-xl font-bold text-white">Öne Çıkan Ürünler</h2>
      <Link
        to="/oyunlar"
        className="ml-auto px-4 py-2 text-sm font-medium text-white border border-[#404040] rounded hover:bg-[#202020] transition-colors"
      >
        Daha Fazla Görüntüle
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.slice(0, 2).map((item, i) => (
        <Link
          key={item.id}
          to={`/epin/${item.slug}`}
          className="relative rounded-lg overflow-hidden group"
        >
          <div className="aspect-video bg-[#202020]">
            {item.url ? (
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-600 text-6xl font-bold">{item.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              {i === 0 ? (
                <span className="px-3 py-1 bg-[#0078F2] text-white text-xs font-bold rounded">
                  ÖNE ÇIKAN
                </span>
              ) : (
                <span className="flex items-center gap-1 px-3 py-1 bg-[#0066CC] text-white text-xs font-bold rounded">
                  <Sparkles className="h-3 w-3" />
                  POPÜLER
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-1">{item.categoryName || item.category?.name}</p>
            <h3 className="text-lg font-bold text-white">{item.name}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-white font-bold">
                {typeof item.price === 'number' ? `₺${item.price.toLocaleString('tr-TR')}` : item.price}
              </span>
{item.people && item.people > 0 && (
                  <span className="text-xs text-gray-400">{item.people} kişi inceledi</span>
                )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// Popular Section - Horizontal List Design
const PopularSection = ({ items }: { items: HomepageItem[] }) => {
  return (
    <div className="px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Popüler Ürünler</h2>
        <Link
          to="/oyunlar"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Tümünü Gör
        </Link>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg divide-y divide-white/5">
        {items.slice(0, 5).map((item, index) => (
          <Link
            key={item.id}
            to={`/epin/${item.slug}`}
            className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors group"
          >
            <span className="w-6 text-center text-sm font-medium text-gray-500">
              {index + 1}
            </span>
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#202020] flex-shrink-0">
              {item.url ? (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold">{item.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">{item.categoryName || item.category?.name}</p>
              <h4 className="text-sm font-medium text-white truncate group-hover:text-[#00D4FF] transition-colors">
                {item.name}
              </h4>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">
                {typeof item.price === 'number' ? `₺${item.price.toLocaleString('tr-TR')}` : item.price}
              </p>
              {item.people && item.people > 0 && (
                <p className="text-xs text-gray-500">{item.people} kişi inceledi</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Categories Section
const CategoriesSection = ({ categories }: { categories: Category[] }) => (
  <div className="px-4 lg:px-8 py-8">
    <h2 className="text-xl font-bold text-white mb-6">Kategoriler</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.slice(0, 12).map((category) => (
      <Link
          key={category.id}
        to={`/oyunlar/${category.slug}`}
          className="group"
        >
          <div className="aspect-square rounded-lg overflow-hidden bg-[#202020] mb-2">
            {category.url ? (
                <img
                  src={category.url}
                  alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#202020] to-[#303030]">
                <span className="text-3xl font-bold text-gray-600">
                  {category.name.charAt(0)}
                  </span>
                </div>
              )}
          </div>
          <h4 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center truncate">
            {category.name}
          </h4>
        </Link>
      ))}
    </div>
  </div>
);

// Game Grid Section
const GameGridSection = ({
  title,
  items
}: {
  title: string;
  items: HomepageItem[];
}) => (
  <div className="px-4 lg:px-8 py-8">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <Link
        to="/oyunlar"
        className="px-4 py-2 text-sm font-medium text-white border border-[#404040] rounded hover:bg-[#202020] transition-colors"
      >
        Tümünü Gör
      </Link>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <GameCard key={item.id} item={item} />
      ))}
    </div>
  </div>
);

export default HomePage;
