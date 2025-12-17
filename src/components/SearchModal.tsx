import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Gamepad2 } from 'lucide-react';
import { getHomepageItems } from '../services/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  homepageItems?: Array<{
    id: string;
    name: string;
    price: number | string;
    slug: string;
    url?: string;
  }>;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Array<{
    id: string;
    name: string;
    price: number | string;
    slug: string;
    url?: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      loadItems();
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await getHomepageItems(50);
      setItems(response.data || []);
    } catch (error) {
      console.error('Search items load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#202020] rounded-lg shadow-2xl border border-[#303030] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#303030]">
              <Search className="h-5 w-5 text-gray-500" />
                    <input
                ref={inputRef}
                      type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Mağazada ara..."
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-500"
              />
              <button
                onClick={onClose}
                className="p-1 text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
                  </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
              ) : query.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Aramak için bir şeyler yazın...
                    </div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  "{query}" için sonuç bulunamadı
                </div>
              ) : (
                    <div className="p-2">
                  {filteredItems.slice(0, 10).map((item) => (
                    <Link
                            key={item.id}
                              to={`/epin/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                    >
                      <div className="w-12 h-12 rounded overflow-hidden bg-[#303030] flex-shrink-0">
                                    {item.url ? (
                                      <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Gamepad2 className="h-5 w-5 text-gray-600" />
                                    </div>
                                  )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {typeof item.price === 'number' ? `₺${item.price}` : item.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                  </div>
                )}
              </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[#303030] flex items-center justify-between text-xs text-gray-500">
              <span>
                {filteredItems.length > 0 && `${filteredItems.length} sonuç bulundu`}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-[#303030] rounded text-gray-400">ESC</kbd>
                {' '}ile kapat
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
