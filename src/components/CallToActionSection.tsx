import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Clock, ShieldCheck, Sparkles, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

interface CallToActionSectionProps {
  variant?: 'compact' | 'full';
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ variant = 'full' }) => {
  const content = (
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
            <Headphones className="h-4 w-4 text-purple-300" />
          </div>
          <h3 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">
              Hâlâ Sorularınız mı Var?
            </span>
          </h3>
        </div>
        <p className="text-gray-400 text-xs ml-9">7/24 uzman ekibimiz yanınızda</p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <motion.div 
          className="flex flex-col items-center gap-1.5 rounded-lg border p-2.5"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{ 
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
          }}
          transition={{ duration: 0.2 }}
        >
          <ShieldCheck className="h-4 w-4 text-purple-300" />
          <p className="text-[10px] font-semibold text-white text-center">Güvenli</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-1.5 rounded-lg border p-2.5"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{ 
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
          }}
          transition={{ duration: 0.2 }}
        >
          <Sparkles className="h-4 w-4 text-purple-300" />
          <p className="text-[10px] font-semibold text-white text-center">Hızlı</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center gap-1.5 rounded-lg border p-2.5"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
          whileHover={{ 
            border: '1px solid rgba(168, 85, 247, 0.4)',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
          }}
          transition={{ duration: 0.2 }}
        >
          <Clock className="h-4 w-4 text-purple-300" />
          <p className="text-[10px] font-semibold text-white text-center">7/24</p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Link to="/canli-destek" aria-label="Canlı Destek sayfasına git" className="group">
          <motion.button
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-white text-xs transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(192, 132, 252, 1))',
              boxShadow: '0 2px 12px rgba(139, 92, 246, 0.4)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(139, 92, 246, 0.6)' }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Canlı Destek</span>
          </motion.button>
        </Link>

        <Link to="/iletisim" aria-label="İletişim sayfasına git" className="group">
          <motion.button
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-white text-xs border transition-all"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              backdropFilter: 'blur(12px)',
            }}
            whileHover={{ 
              scale: 1.02,
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(168, 85, 247, 0.6)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Clock className="h-4 w-4" />
            <span>İletişim</span>
          </motion.button>
        </Link>
      </div>
    </div>
  );

  // Ana sayfada compact variant kullanılıyorsa, sadece içeriği döndür
  if (variant === 'compact') {
    return content;
  }

  // Diğer sayfalarda full variant için container ve max-width ekle
  return (
    <section className="relative py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl"
          >
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
