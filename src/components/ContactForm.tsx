import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import { createMessage } from '../services/api';
import toast from 'react-hot-toast';

interface ContactFormProps {
  title: string;
  description: string;
  method: string;
  backLink: string;
  backText: string;
}

const ContactForm = ({ title, description, method, backLink, backText }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    text: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const messageData = {
        ...formData,
        method
      };

      await createMessage(messageData);
      toast.success('Mesajınız başarıyla gönderildi!');
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        text: ''
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Mesaj gönderilirken bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-xl bg-[#2a2a2a]"
            >
              <MessageSquare className="h-5 w-5 text-white" />
            </motion.div>
            <h1 className="text-xl font-bold mb-2 text-white">
              {title}
            </h1>
            <p className="text-gray-500 text-xs max-w-md mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden bg-[#202020] border border-[#2a2a2a] p-4"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Ad
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full text-white px-3 py-2.5 pl-10 rounded-lg outline-none transition-all text-xs bg-[#181818] border border-[#2a2a2a] focus:border-[#404040]"
                    placeholder="Adınız"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Soyad
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full text-white px-3 py-2.5 pl-10 rounded-lg outline-none transition-all text-xs bg-[#181818] border border-[#2a2a2a] focus:border-[#404040]"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-1.5">
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-white px-3 py-2.5 pl-10 rounded-lg outline-none transition-all text-xs bg-[#181818] border border-[#2a2a2a] focus:border-[#404040]"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="title" className="block text-xs font-semibold text-gray-400 mb-1.5">
                Konu
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full text-white px-3 py-2.5 pl-10 rounded-lg outline-none transition-all text-xs bg-[#181818] border border-[#2a2a2a] focus:border-[#404040]"
                  placeholder="Mesajınızın konusu"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="text" className="block text-xs font-semibold text-gray-400 mb-1.5">
                Mesaj
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                rows={4}
                className="w-full text-white px-3 py-2.5 rounded-lg outline-none transition-all text-xs resize-none bg-[#181818] border border-[#2a2a2a] focus:border-[#404040]"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-white font-bold transition-all rounded-xl bg-[#0078F2] hover:bg-[#0066CC] disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Gönderiliyor...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>Mesaj Gönder</span>
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactForm;
