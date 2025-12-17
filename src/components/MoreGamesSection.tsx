import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Users, Sparkles } from 'lucide-react';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  people?: number;
  categoryName?: string;
}

interface MoreGamesSectionProps {
  homepageItems: HomepageItem[];
}

const MoreGamesSection = ({ homepageItems }: MoreGamesSectionProps) => {
  const moreGames = homepageItems.slice(10, Math.min(homepageItems.length, 30));

  if (moreGames.length === 0) {
    return null;
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
            <Sparkles className="h-4 w-4 text-purple-300" />
          </div>
          <h3 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">
              Daha Fazla Oyun
            </span>
          </h3>
        </div>
        <p className="text-gray-400 text-xs ml-9">Geniş oyun koleksiyonumuz</p>
      </motion.div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {moreGames.map((item, index) => (
          <MoreGameCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const MoreGameCard = ({ item, index }: { item: HomepageItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
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
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))'
              : 'rgba(0, 0, 0, 0.6)',
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-3 flex-1 flex flex-col">
            {/* Category & People */}
            {item.categoryName && (
              <div className="flex items-center justify-between mb-1.5">
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
                {item.people !== undefined && item.people > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Users className="h-3 w-3" />
                    <span>{item.people}</span>
                  </div>
                )}
              </div>
            )}
            {!item.categoryName && item.people !== undefined && item.people > 0 && (
              <div className="flex items-center justify-end mb-1.5">
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                  <Users className="h-3 w-3" />
                  <span>{item.people}</span>
                </div>
              </div>
            )}

            {/* Title */}
            <h3 className="text-white font-bold text-xs mb-2 line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors">
              {item.name}
            </h3>

            {/* Price */}
            <div className="mt-auto pt-2 border-t" style={{ borderColor: 'rgba(75,85,99,0.2)' }}>
              <div className="flex flex-col">
                {item.originalPrice && item.originalPrice !== item.price && (
                  <span className="text-[10px] text-gray-500 line-through">
                    {typeof item.originalPrice === 'string' ? item.originalPrice : `${item.originalPrice}₺`}
                  </span>
                )}
                <span className="text-purple-300 font-black text-sm">
                  {typeof item.price === 'string' ? item.price : `${item.price}₺`}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default MoreGamesSection;
