import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, CreditCard, Shield, Gamepad2, Plus, Minus, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';
import CheckoutModal from '../components/CheckoutModal';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';

const CartPage = () => {
  const { cart, loading, removeItem, clearCart, updateItemQuantity, getTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleRemoveItem = async (basketId: string) => {
    setUpdatingItem(basketId);
    await removeItem(basketId);
    setUpdatingItem(null);
  };

  const handleQuantityUpdate = async (basketId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdatingItem(basketId);
    await updateItemQuantity(basketId, newQuantity);
    setUpdatingItem(null);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/giris-yap');
      return;
    }
    setShowCheckoutModal(true);
  };

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <SEOHead />
        <LoadingSpinner size="xl" text="Sepet Yükleniyor..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-14 bg-[#121212]">
        <SEOHead />
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
          <div className="text-center py-20 bg-[#202020] rounded-lg max-w-lg mx-auto">
            <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Sepeti görüntülemek için giriş yapın</h3>
            <p className="text-gray-500 mb-6">Hesabınıza giriş yaparak sepetinizi yönetebilirsiniz.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/giris-yap"
                className="px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors"
              >
                Giriş Yap
              </Link>
              <Link
                to="/kayit-ol"
                className="px-6 py-3 border border-[#404040] text-white font-medium rounded hover:bg-[#202020] transition-colors"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-[#121212]">
      <SEOHead />

      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Sepetim</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Sepetim</h1>
            <span className="text-sm text-gray-500">{cart.length} ürün</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#202020] rounded-lg">
            <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Sepetiniz boş</h3>
            <p className="text-gray-500 mb-6">Sepetinizde henüz ürün bulunmuyor.</p>
            <Link
              to="/oyunlar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear Cart Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowClearModal(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Sepeti Temizle
                </button>
              </div>

              {/* Items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#202020] rounded-lg p-4 flex items-center gap-4"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-[#303030]">
                    {item.url ? (
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Gamepad2 className="h-8 w-8 text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.price}</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityUpdate(item.basketId, item.piece - 1)}
                      disabled={updatingItem === item.basketId || item.piece <= 1}
                      className="w-8 h-8 rounded bg-[#303030] text-gray-400 hover:text-white hover:bg-[#404040] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-white font-medium">
                      {updatingItem === item.basketId ? '...' : item.piece}
                    </span>
                    <button
                      onClick={() => handleQuantityUpdate(item.basketId, item.piece + 1)}
                      disabled={updatingItem === item.basketId}
                      className="w-8 h-8 rounded bg-[#303030] text-gray-400 hover:text-white hover:bg-[#404040] disabled:opacity-50 transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemoveItem(item.basketId)}
                    disabled={updatingItem === item.basketId}
                    className="w-10 h-10 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#202020] rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#00D4FF]" />
                  Sipariş Özeti
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ara Toplam</span>
                    <span className="text-white">{getTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">İndirim</span>
                    <span className="text-green-400">₺0,00</span>
                  </div>
                  <div className="h-px bg-[#303030]" />
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Toplam</span>
                    <span className="text-xl font-bold text-white">{getTotal()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 px-6 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Ödemeye Geç
                </button>

                <div className="mt-4 pt-4 border-t border-[#303030] space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="h-4 w-4 text-[#00D4FF]" />
                    <span>Güvenli Ödeme</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Package className="h-4 w-4 text-[#00D4FF]" />
                    <span>Anında Teslimat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={async () => {
          await clearCart();
          setShowClearModal(false);
        }}
        title="Sepeti Temizle"
        message="Sepetinizdeki tüm ürünleri silmek istediğinizden emin misiniz?"
        confirmText="Sepeti Temizle"
        cancelText="İptal"
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        totalAmount={getTotal()}
      />
    </div>
  );
};

export default CartPage;
