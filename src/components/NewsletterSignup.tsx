import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, email:', email);
    if (!email.trim()) {
      console.log('Email is empty');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
      
      // Show success toast
      toast.success('GAMING BÜLTENİNE BAŞARIYLA KAYDOLDUNUZ!', {
        duration: 3000,
        style: {
          fontSize: '12px',
          padding: '8px 12px',
          maxWidth: '300px'
        }
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

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
            <Bell className="h-4 w-4 text-purple-300" />
          </div>
          <h3 className="text-xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent">
              Bültene Kaydol
            </span>
          </h3>
        </div>
        <p className="text-gray-400 text-xs ml-9">En yeni oyun haberleri ve özel indirimler</p>
      </motion.div>

      {/* Newsletter Form */}
      <div>
        <div 
          className="relative rounded-xl border p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-purple-300/80" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-xs font-medium"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '1px solid rgba(168, 85, 247, 0.5)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(168, 85, 247, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid rgba(168, 85, 247, 0.3)';
                    e.target.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)';
                  }}
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  if (!email.trim()) {
                    e.preventDefault();
                    toast.error('Lütfen email adresinizi girin!', {
                      duration: 2000,
                      style: {
                        fontSize: '12px',
                        padding: '8px 12px',
                        maxWidth: '300px'
                      }
                    });
                    return;
                  }
                }}
                className="group relative w-full font-bold text-white py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 1), rgba(192, 132, 252, 1))',
                  boxShadow: '0 2px 12px rgba(139, 92, 246, 0.4)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(139, 92, 246, 0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-xs font-bold">GÖNDERİLİYOR...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span className="text-xs font-bold">KAYDOL</span>
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Check className="h-6 w-6 text-purple-300" />
              </motion.div>
              <h3 className="text-base font-black text-white mb-2">
                BAŞARILI!
              </h3>
              <p className="text-purple-300/90 text-xs">
                <span className="text-white font-bold">Bültenimize</span> başarıyla kaydoldunuz.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center mt-4">
        <p className="text-gray-400 text-[10px]">
          <span className="text-gray-300 font-medium">Spam göndermiyoruz.</span> İstediğiniz zaman{' '}
          <span className="text-gray-300 font-medium">abonelikten çıkabilirsiniz.</span>
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
