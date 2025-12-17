import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Search, ChevronDown, Settings, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWebsite } from '../context/WebsiteContext';
import { getCategories } from '../services/api';

interface HeaderProps {
  onOpenSearch: () => void;
  hideHeader?: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Header = ({ onOpenSearch, hideHeader = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { getInfoValue } = useWebsite();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const gamesDropdownRef = useRef<HTMLDivElement>(null);

  const siteName = getInfoValue('TITLE') || 'STORE';
  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch {
        // Silent error
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (isGamesDropdownOpen && gamesDropdownRef.current && !gamesDropdownRef.current.contains(e.target as Node)) {
        setIsGamesDropdownOpen(false);
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [isUserMenuOpen, isGamesDropdownOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenSearch]);

  if (hideHeader) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Nav */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <span className="text-white font-black text-xl tracking-wide uppercase">
                {siteName}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/rehber"
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                Destek
              </Link>

              {/* Games Dropdown */}
              <div className="relative" ref={gamesDropdownRef}>
                <button
                  onClick={() => setIsGamesDropdownOpen(!isGamesDropdownOpen)}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  Kategoriler
                  <ChevronDown className={`h-4 w-4 transition-transform ${isGamesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isGamesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#202020] rounded-lg shadow-2xl py-2">
                    <Link
                      to="/oyunlar"
                      onClick={() => setIsGamesDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      Tüm Kategoriler
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
                    {categories.slice(0, 8).map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/oyunlar/${cat.slug}`}
                        onClick={() => setIsGamesDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Search, Cart, User */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link
              to="/sepet"
              className="relative p-2 text-white/70 hover:text-white transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#26bbff] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <User className="h-5 w-5" />
                  <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-[#202020] rounded-lg shadow-2xl py-2">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-white/50 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profil"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Profil Ayarları
                    </Link>
                    <Link
                      to="/siparislerim"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <History className="h-4 w-4" />
                      Siparişlerim
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/10 w-full transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/giris-yap"
                  className="px-5 py-2 text-sm font-medium text-white border border-white/30 rounded hover:bg-white/10 transition-colors"
                >
                  Giriş yap
                </Link>
                <Link
                  to="/kayit-ol"
                  className="px-5 py-2 text-sm font-medium bg-[#26bbff] text-black rounded hover:bg-[#3dc2ff] transition-colors"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#121212] border-t border-white/10">
          <nav className="px-6 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-sm rounded transition-colors ${
                isActive('/') ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/oyunlar"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-sm rounded transition-colors ${
                isActive('/oyunlar') ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'
              }`}
            >
              Kategoriler
            </Link>
            <Link
              to="/rehber"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-sm rounded transition-colors ${
                isActive('/rehber') ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'
              }`}
            >
              Destek
            </Link>
            <Link
              to="/iletisim"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-sm rounded transition-colors ${
                isActive('/iletisim') ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'
              }`}
            >
              İletişim
            </Link>
            {!isAuthenticated && (
              <div className="pt-4 flex gap-3">
                <Link
                  to="/giris-yap"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 border border-white/30 text-white rounded font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/kayit-ol"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 bg-[#26bbff] text-black rounded font-medium"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
