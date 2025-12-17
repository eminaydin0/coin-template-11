import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Gamepad2, 
  ShoppingCart, 
  CreditCard, 
  Download,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [
    { 
      id: 1, 
      title: "Hesap Oluştur", 
      icon: CheckCircle
    },
    { 
      id: 2, 
      title: "Oyun Seç", 
      icon: Gamepad2
    },
    { 
      id: 3, 
      title: "Sepete Ekle", 
      icon: ShoppingCart
    },
    { 
      id: 4, 
      title: "Ödeme Yap", 
      icon: CreditCard
    },
    { 
      id: 5, 
      title: "Kodunu Al", 
      icon: Download
    }
  ];

  return (
    <section className="relative w-full h-full">
      <div className="h-full flex flex-col justify-between">
        {/* Modern Compact Header */}
        <motion.div 
          className="mb-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              <Sparkles className="h-3 w-3 text-purple-300" />
            </div>
            <h3 className="text-lg font-bold text-white">
              <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">
                Nasıl Çalışır?
              </span>
            </h3>
          </div>
          <p className="text-gray-400 text-[10px] ml-8">5 kolay adımda oyunlarınızı alın</p>
        </motion.div>

        {/* Modern Steps List */}
        <div className="flex-1 flex flex-col justify-center space-y-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            >
              <StepCard step={step} index={index} totalSteps={steps.length} />
            </motion.div>
          ))}
        </div>

        {/* Modern CTA Button */}
        <motion.div 
          className="mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Link
            to="/rehber"
            className="group relative inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg font-semibold text-white text-xs transition-all overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(192, 132, 252, 1))',
              boxShadow: '0 2px 12px rgba(139, 92, 246, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(139, 92, 246, 0.4)';
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Detaylı Rehber</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform relative z-10" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index, totalSteps }: { step: { id: number; title: string; icon: any }; index: number; totalSteps: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative">
      {/* Minimal Connection Line */}
      {step.id < totalSteps && (
        <div className="absolute top-full left-4 w-0.5 h-1.5 z-10">
          <div 
            className="w-full h-full bg-gradient-to-b transition-all duration-300"
            style={{
              background: isHovered
                ? 'linear-gradient(to bottom, rgba(168, 85, 247, 0.4), transparent)'
                : 'linear-gradient(to bottom, rgba(168, 85, 247, 0.25), transparent)',
            }}
          />
        </div>
      )}

      <motion.div 
        className="relative rounded-lg border p-2.5 transition-all duration-300 flex items-center gap-2.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ x: 1 }}
        style={{
          background: isHovered
            ? 'rgba(0, 0, 0, 0.85)'
            : 'rgba(0, 0, 0, 0.7)',
          border: isHovered
            ? '1px solid rgba(168, 85, 247, 0.4)'
            : '1px solid rgba(75, 85, 99, 0.2)',
          boxShadow: isHovered
            ? '0 2px 8px rgba(139, 92, 246, 0.15)'
            : '0 1px 3px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Minimal Step Number */}
        <div 
          className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 transition-all duration-300"
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(192, 132, 252, 1))'
              : 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(192, 132, 252, 0.8))',
            boxShadow: isHovered
              ? '0 2px 6px rgba(139, 92, 246, 0.4)'
              : '0 1px 3px rgba(139, 92, 246, 0.3)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          }}
        >
          {step.id}
        </div>
        
        {/* Minimal Icon */}
        <div 
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: isHovered
              ? 'rgba(139, 92, 246, 0.2)'
              : 'rgba(139, 92, 246, 0.12)',
            border: isHovered
              ? '1px solid rgba(168, 85, 247, 0.35)'
              : '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          <step.icon className="h-3.5 w-3.5 text-purple-300 transition-transform duration-300 group-hover:scale-110" />
        </div>
        
        {/* Minimal Title */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-xs group-hover:text-purple-300 transition-colors duration-300">
            {step.title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorksSection;
