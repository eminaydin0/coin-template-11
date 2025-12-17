import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Gamepad2, Flame, Star } from 'lucide-react';

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

interface BestSellingGamesSectionProps {
  homepageItems: HomepageItem[];
}

const BestSellingGamesSection: React.FC<BestSellingGamesSectionProps> = ({ homepageItems }) => {
  const [bestSellingGames, setBestSellingGames] = useState<HomepageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (homepageItems.length > 0) {
      // Sadece API'den gelen gerçek verileri kullan
      setBestSellingGames(homepageItems.slice(0, 8));
      setIsLoading(false);
    }
  }, [homepageItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full border-2 border-gray-700/50" />
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/80 border-t-transparent border-l-transparent animate-spin" />
          </div>
          <span className="text-white text-sm font-medium">
            Oyunlar yükleniyor...
          </span>
        </div>
      </div>
    );
  }

  if (bestSellingGames.length === 0) {
    return (
      <div className="text-center py-12">
        <Gamepad2 className="w-10 h-10 text-purple-300/50 mx-auto mb-3" />
        <span className="text-gray-400 text-sm">
          Henüz en çok satan oyun bulunmuyor
        </span>
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
            <Flame className="h-4 w-4 text-purple-300" />
          </div>
          <h3 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">
              En Çok Satan Oyunlar
            </span>
          </h3>
        </div>
        <p className="text-gray-400 text-xs ml-9">Oyuncuların en çok tercih ettikleri oyunlar</p>
      </motion.div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {bestSellingGames.map((game, index) => (
          <BestSellingCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </div>
  );
};

const BestSellingCard = ({ game, index }: { game: HomepageItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/epin/${game.slug}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative rounded-xl border overflow-hidden transition-all duration-300 flex flex-col h-full"
          whileHover={{ y: -4 }}
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

          {/* Image */}
          <div className="relative h-32 overflow-hidden">
            {game.url && !imageError ? (
              <motion.img
                src={game.url}
                alt={game.name}
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Best Seller Badge */}
            <div
              className="absolute top-2 right-2 z-20 px-2 py-1 rounded-lg flex items-center gap-1"
              style={{
                background: 'rgba(139, 92, 246, 0.25)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Flame className="h-3 w-3 text-purple-300" />
            </div>

            {/* Rating Badge */}
            {game.rating && (
              <div className="absolute top-2 left-2 z-20 flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-sm">
                <Star className="h-3 w-3 text-purple-300 fill-current" />
                <span className="text-white text-xs font-bold">{game.rating}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-3 flex-1 flex flex-col">
            {/* Category & People */}
            {game.categoryName && (
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    color: 'rgba(168, 85, 247, 0.9)',
                  }}
                >
                  {game.categoryName}
                </span>
                {game.people !== undefined && game.people > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Users className="h-3 w-3" />
                    <span>{game.people}</span>
                  </div>
                )}
              </div>
            )}

            {/* Title */}
            <h3 className="text-white font-bold text-xs mb-2 line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors">
              {game.name}
            </h3>

            {/* Price */}
            <div className="mt-auto pt-2 border-t" style={{ borderColor: 'rgba(75,85,99,0.2)' }}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {game.originalPrice && game.originalPrice !== game.price && (
                    <span className="text-[10px] text-gray-400 line-through">
                      {typeof game.originalPrice === 'string' ? game.originalPrice : `${game.originalPrice}₺`}
                    </span>
                  )}
                  <span className="text-purple-300 font-black text-sm">
                    {typeof game.price === 'string' ? game.price : `${game.price}₺`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default BestSellingGamesSection;