import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const initials = (name?: string) =>
  (name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (!categories.length) return null;

  return (
    <section className="relative w-full">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-2">
        {categories.map((category, index) => (
          <CategoryCard key={category.id || category.slug} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;

const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/oyunlar/${category.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block group relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06, type: 'spring', stiffness: 100 }}
        whileHover={{ scale: 1.05, y: -4 }}
        className="relative"
      >
        {/* Premium Card Container */}
        <div
          className="relative rounded-2xl p-4 transition-all duration-300 overflow-hidden"
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))'
              : 'rgba(0, 0, 0, 0.4)',
            border: isHovered
              ? '2px solid rgba(168, 85, 247, 0.6)'
              : '2px solid rgba(168, 85, 247, 0.2)',
            boxShadow: isHovered
              ? '0 12px 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.15), inset 0 0 40px rgba(139, 92, 246, 0.05)'
              : '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(139, 92, 246, 0.1)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Animated Background Gradient */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              style={{
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4), transparent 70%)',
              }}
            />
          )}

          {/* Shine Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '100%', opacity: 1 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              }}
            />
          )}

          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Large Circular Image/Icon */}
            <motion.div
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300"
              animate={{
                rotate: isHovered ? 5 : 0,
              }}
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))'
                  : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15))',
                border: isHovered
                  ? '3px solid rgba(168, 85, 247, 0.8)'
                  : '3px solid rgba(168, 85, 247, 0.4)',
                boxShadow: isHovered
                  ? '0 8px 32px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2)'
                  : '0 4px 16px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.2)',
              }}
            >
              {!error && category.url ? (
                <motion.img
                  src={category.url}
                  alt={category.name}
                  className="h-full w-full object-cover"
                  onError={() => setError(true)}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <span className="text-purple-300 font-black text-lg sm:text-xl">
                  {initials(category.name)}
                </span>
              )}
              
              {/* Pulsing Glow Effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent)',
                  }}
                />
              )}

              {/* Sparkle Icon on Hover */}
              {isHovered && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Sparkles className="h-4 w-4 text-purple-300" />
                </motion.div>
              )}
            </motion.div>

            {/* Category Name with Better Typography */}
            <div className="text-center">
              <motion.h3
                className="text-sm sm:text-base font-bold mb-1 transition-colors"
                animate={{
                  color: isHovered ? 'rgba(168, 85, 247, 1)' : 'rgba(255, 255, 255, 0.9)',
                }}
                style={{
                  textShadow: isHovered 
                    ? '0 0 20px rgba(139, 92, 246, 0.8), 0 2px 10px rgba(139, 92, 246, 0.4)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.5)',
                }}
              >
                {category.name}
              </motion.h3>
              
              {/* Arrow Indicator */}
              <motion.div
                className="flex items-center justify-center gap-1"
                animate={{
                  opacity: isHovered ? 1 : 0.5,
                  x: isHovered ? 2 : 0,
                }}
              >
                <span className="text-[10px] text-gray-400 font-medium">Keşfet</span>
                <ArrowRight className="h-3 w-3 text-purple-300" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
