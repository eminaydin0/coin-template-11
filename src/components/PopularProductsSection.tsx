import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Gamepad2, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { getHomepageItems } from '../services/api';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  rating?: number;
  people?: number;
  categoryName?: string;
}

const PopularProductsSection = () => {
  const [homepageItems, setHomepageItems] = useState<HomepageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start', 
      dragFree: false,
      slidesToScroll: 'auto'
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const loadPopularProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getHomepageItems(20);
      setHomepageItems(response.data || []);
    } catch (error) {
      console.error('Popüler ürünler yüklenirken hata:', error);
      setHomepageItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPopularProducts();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  if (isLoading || homepageItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full border-2 border-gray-700/50" />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/80 border-t-transparent border-l-transparent animate-spin" />
            </div>
            <span className="text-white text-sm font-medium">
              Oyunlar yükleniyor...
            </span>
          </div>
        ) : (
          <div className="text-center">
            <Gamepad2 className="w-10 h-10 text-purple-300/50 mx-auto mb-3" />
            <span className="text-gray-400 text-sm">
              Henüz popüler oyun bulunmuyor
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Compact Header */}
      <motion.div 
        className="mb-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            <Star className="h-4 w-4 text-purple-300" />
          </div>
          <h3 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">
              Popüler Oyunlar
            </span>
          </h3>
        </div>
        <p className="text-gray-400 text-xs ml-9">En çok tercih edilen oyunlar</p>
      </motion.div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3">
            {homepageItems.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="min-w-[200px] sm:min-w-[220px] flex-shrink-0"
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Compact Navigation Buttons */}
        {homepageItems.length > 0 && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                background: canScrollPrev
                  ? 'rgba(139, 92, 246, 0.2)'
                  : 'rgba(75, 85, 99, 0.2)',
                border: canScrollPrev
                  ? '1px solid rgba(168, 85, 247, 0.4)'
                  : '1px solid rgba(75, 85, 99, 0.3)',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="Önceki"
            >
              <ChevronLeft 
                className="w-4 h-4" 
                style={{ 
                  color: canScrollPrev ? 'rgba(168, 85, 247, 0.9)' : 'rgba(156, 163, 175, 0.5)' 
                }} 
              />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{
                background: canScrollNext
                  ? 'rgba(139, 92, 246, 0.2)'
                  : 'rgba(75, 85, 99, 0.2)',
                border: canScrollNext
                  ? '1px solid rgba(168, 85, 247, 0.4)'
                  : '1px solid rgba(75, 85, 99, 0.3)',
                backdropFilter: 'blur(8px)',
              }}
              aria-label="Sonraki"
            >
              <ChevronRight 
                className="w-4 h-4" 
                style={{ 
                  color: canScrollNext ? 'rgba(168, 85, 247, 0.9)' : 'rgba(156, 163, 175, 0.5)' 
                }} 
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ item }: { item: HomepageItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/epin/${item.slug}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="relative rounded-xl border overflow-hidden transition-all duration-300 h-full flex flex-col"
        style={{
          background: isHovered
            ? 'rgba(0, 0, 0, 0.85)'
            : 'rgba(0, 0, 0, 0.7)',
          border: isHovered
            ? '1.5px solid rgba(168, 85, 247, 0.5)'
            : '1px solid rgba(168, 85, 247, 0.2)',
          boxShadow: isHovered
            ? '0 8px 24px rgba(139, 92, 246, 0.25), 0 0 40px rgba(139, 92, 246, 0.1)'
            : '0 2px 8px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Shine Effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            }}
          />
        )}

        <div className="relative h-32 overflow-hidden">
          {item.url && !imageError ? (
            <motion.img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-purple-600/20 flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-purple-300" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {typeof item.rating === 'number' && (
            <div
              className="absolute top-2 left-2 rounded-lg px-2 py-1 flex items-center gap-1 z-10"
              style={{
                background: 'rgba(139, 92, 246, 0.25)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Star className="h-3 w-3 text-purple-300 fill-current" />
              <span className="text-white text-xs font-bold">{item.rating}</span>
            </div>
          )}
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            {item.categoryName && (
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  color: 'rgba(168, 85, 247, 0.9)',
                }}
              >
                {item.categoryName}
              </span>
            )}
            {item.people !== undefined && item.people > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-gray-400 ml-auto">
                <Users className="h-3 w-3" />
                <span>{item.people}</span>
              </div>
            )}
          </div>

          <h3 className="text-white font-bold text-xs mb-2 line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors">
            {item.name}
          </h3>

          <div className="mt-auto pt-2 border-t" style={{ borderColor: 'rgba(75,85,99,0.2)' }}>
            <div className="flex items-center justify-between">
              <span className="text-purple-300 font-black text-sm">
                {typeof item.price === 'string' ? item.price : `${item.price}₺`}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PopularProductsSection;
