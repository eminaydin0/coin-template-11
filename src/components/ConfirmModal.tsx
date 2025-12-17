import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Evet',
  cancelText = 'Hayır',
}: ConfirmModalProps) => {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') {
        e.preventDefault();
        doConfirm();
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || !focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const doConfirm = () => {
    if (confirming) return;
    setConfirming(true);
    try {
      onConfirm();
    } finally {
      setConfirming(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-live="polite">
        {/* Backdrop */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Pencereyi kapat"
        />

        {/* Modal */}
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-desc"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#202020] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-gray-400 hover:text-white bg-[#2a2a2a] hover:bg-[#333] transition-colors"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </motion.button>

          {/* Header with Icon */}
          <div className="p-6 border-b border-[#2a2a2a] bg-[#181818] text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-red-500/20 border border-red-500/40"
            >
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </motion.div>
            <h3 id="confirm-title" className="text-xl font-bold text-white mb-2">
              {title}
            </h3>
            <p id="confirm-desc" className="text-sm text-gray-400 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Warning Badge */}
          <div className="p-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-red-400 text-xs font-bold">Bu işlem geri alınamaz!</span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 pt-0 flex gap-3">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg text-sm font-semibold text-white bg-[#2a2a2a] hover:bg-[#333] border border-[#404040] transition-all"
            >
              {cancelText}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              onClick={doConfirm}
              disabled={confirming}
              className="flex-1 px-4 py-3 rounded-lg text-sm font-bold text-white bg-red-500/30 hover:bg-red-500/40 border border-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {confirming ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>İşleniyor...</span>
                </div>
              ) : (
                confirmText
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
