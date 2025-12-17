import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WebsiteProvider } from './context/WebsiteContext';
import { CheckoutProvider } from './context/CheckoutContext';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import SearchModal from './components/SearchModal';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import OrdersPage from './pages/OrdersPage';
import BankAccountsPage from './pages/BankAccountsPage';
import ContractPage from './pages/ContractPage';
import BulkPurchasePage from './pages/BulkPurchasePage';
import ReturnsPage from './pages/ReturnsPage';
import LiveSupportPage from './pages/LiveSupportPage';
import RehberPage from './pages/RehberPage';
import ProfilePage from './pages/ProfilePages';
import './App.css';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WebsiteProvider>
            <CheckoutProvider>
              <div className="App min-h-screen bg-[#121212]">
                <ScrollToTop />
                <SEOHead />
                <Header onOpenSearch={openSearch} />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/giris-yap" element={<LoginPage />} />
                  <Route path="/kayit-ol" element={<RegisterPage />} />
                  <Route path="/oyunlar" element={<CategoriesPage />} />
                  <Route path="/oyunlar/:slug" element={<CategoryDetailPage />} />
                  <Route path="/epin/:slug" element={<ProductDetailPage />} />
                  <Route path="/sepet" element={<CartPage />} />
                  <Route path="/rehber" element={<RehberPage />} />
                  <Route path="/iletisim" element={<ContactPage />} />
                  <Route path="/siparislerim" element={<OrdersPage />} />
                  <Route path="/banka-hesaplari" element={<BankAccountsPage />} />
                  <Route path="/sozlesme/:slug" element={<ContractPage />} />
                  <Route path="/toplu-satin-alim" element={<BulkPurchasePage />} />
                  <Route path="/geri-iade" element={<ReturnsPage />} />
                  <Route path="/canli-destek" element={<LiveSupportPage />} />
                  <Route path="/profil" element={<ProfilePage />} />
                </Routes>
                <Footer />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#202020',
                      color: '#ffffff',
                      border: '1px solid #303030',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      fontFamily: '"Inter", sans-serif',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    },
                    success: {
                      iconTheme: {
                        primary: '#2ECC71',
                        secondary: '#ffffff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#E74C3C',
                        secondary: '#ffffff',
                      },
                    },
                  }}
                />
                <SearchModal
                  isOpen={isSearchOpen}
                  onClose={closeSearch}
                  homepageItems={[]}
                />
              </div>
            </CheckoutProvider>
          </WebsiteProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
