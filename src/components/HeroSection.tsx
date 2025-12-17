import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { Rocket, Eye, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";



interface HeroItem {

  slogan: string;

  short1: string;

  short2: string;

  short3: string;

  url: string;

}



interface Props {

  heroList: HeroItem[];

  currentHeroIndex: number;

  setCurrentHeroIndex: React.Dispatch<React.SetStateAction<number>>;

  isPlaying: boolean;

  setIsPlaying: (v: boolean) => void;

}



export default function HeroSection({

  heroList,

  currentHeroIndex,

  setCurrentHeroIndex,

  isPlaying,

  setIsPlaying,

}: Props) {

  const DURATION = 8000;

  const progressRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(performance.now());

  const clamp = (i: number, l: number) => ((i % l) + l) % l;

  const current = heroList[currentHeroIndex];

  /** autoplay */
  useEffect(() => {
    if (!isPlaying || !heroList.length || heroList.length <= 1) return;

    startTimeRef.current = performance.now();
    if (progressRef.current) {
      progressRef.current.style.setProperty("--p", "0");
    }

    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / DURATION);

      if (progressRef.current) {
        progressRef.current.style.setProperty("--p", t.toString());
      }

      if (t >= 1) {
        setCurrentHeroIndex((p) => clamp(p + 1, heroList.length));
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [isPlaying, currentHeroIndex, heroList.length, setCurrentHeroIndex]);



  const [imageLoaded, setImageLoaded] = useState(false);

  if (!current || !heroList.length) {
    return null;
  }

  const goToSlide = (index: number) => {
    setCurrentHeroIndex(clamp(index, heroList.length));
  };

  const goToPrev = () => {
    setCurrentHeroIndex((p) => clamp(p - 1, heroList.length));
  };

  const goToNext = () => {
    setCurrentHeroIndex((p) => clamp(p + 1, heroList.length));
  };

  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background Image with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.url}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={current.url}
            alt={current.slogan}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: imageLoaded ? 0.8 : 0 }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          
          {/* Animated Light Rays */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content - Modern & Compact Design */}
      <motion.div
        className="relative z-10 text-center max-w-4xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Compact Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full backdrop-blur-xl"
          style={{
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 2px 12px rgba(139, 92, 246, 0.2)',
          }}
        >
          <Rocket className="h-3 w-3 text-purple-300" />
          <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wide">
            Premium Gaming
          </span>
        </motion.div>

        {/* Compact Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight"
        >
          <span className="block bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            {current.slogan}
          </span>
        </motion.h1>

        {/* Compact Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm sm:text-base font-medium text-purple-200/80 mb-6 max-w-2xl mx-auto leading-relaxed"
          style={{
            textShadow: '0 1px 10px rgba(139, 92, 246, 0.3)',
          }}
        >
          {[current.short1, current.short2, current.short3].filter(Boolean).join(" • ")}
        </motion.p>

        {/* Compact Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center gap-3 mt-8 flex-wrap"
        >
          <Link
            to="/oyunlar"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm overflow-hidden transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(192, 132, 252, 1))',
              boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(139, 92, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.4)';
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <Rocket className="h-3.5 w-3.5 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">Keşfet</span>
            <ArrowRight className="h-3.5 w-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/rehber"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm backdrop-blur-xl transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.border = '1px solid rgba(168, 85, 247, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.border = '1px solid rgba(168, 85, 247, 0.4)';
            }}
          >
            <Eye className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
            <span>Nasıl Çalışır</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Compact Navigation Controls */}
      {heroList.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 2px 12px rgba(139, 92, 246, 0.3)',
            }}
            aria-label="Önceki slide"
          >
            <ChevronLeft className="h-4 w-4 text-purple-300" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 2px 12px rgba(139, 92, 246, 0.3)',
            }}
            aria-label="Sonraki slide"
          >
            <ChevronRight className="h-4 w-4 text-purple-300" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 z-20 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 2px 12px rgba(139, 92, 246, 0.3)',
            }}
            aria-label={isPlaying ? "Duraklat" : "Oynat"}
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 text-purple-300" />
            ) : (
              <Play className="h-3.5 w-3.5 text-purple-300 ml-0.5" />
            )}
          </button>
        </>
      )}

      {/* Compact Slide Indicators */}
      {heroList.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {heroList.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentHeroIndex ? 'w-6' : 'w-1.5'
              } h-1.5`}
              style={{
                background: index === currentHeroIndex
                  ? 'rgba(168, 85, 247, 1)'
                  : 'rgba(255, 255, 255, 0.3)',
                boxShadow: index === currentHeroIndex
                  ? '0 0 12px rgba(139, 92, 246, 0.6)'
                  : 'none',
              }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Compact Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-transparent via-purple-400 to-purple-500 transition-all duration-300"
          style={{
            width: "calc(var(--p,0)*100%)",
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.6)',
          }}
        />
      </div>
    </section>
  );

}