import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Calendar, CreditCard, ShoppingCart } from 'lucide-react';
import { getOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';

interface Order {
  id: string;
  orderId: string;
  status: {
    text: string;
    color: string;
  };
  price: string;
  date: string;
}

const getStatusInfo = (statusText: string) => {
  switch (statusText) {
    case 'Ödeme Bekleniyor':
      return { text: 'Ödeme Bekleniyor', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.1)', icon: Clock };
    case 'Tamamlandı':
      return { text: 'Tamamlandı', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle };
    case 'İptal Edildi':
      return { text: 'İptal Edildi', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)', icon: XCircle };
    default:
      return { text: statusText, color: '#9CA3AF', bgColor: 'rgba(156, 163, 175, 0.1)', icon: Clock };
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setOrders([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await getOrders();
        setOrders(response.data || []);
      } catch (error) {
        console.error('Orders fetch error:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-14 bg-[#121212]">
        <SEOHead />
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
          <div className="text-center py-20 bg-[#202020] rounded-lg max-w-lg mx-auto">
            <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Siparişlerinizi görüntülemek için giriş yapın</h3>
            <p className="text-gray-500 mb-6">Hesabınıza giriş yaparak siparişlerinizi takip edebilirsiniz.</p>
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

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <SEOHead />
        <LoadingSpinner size="xl" text="Siparişler Yükleniyor..." />
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
            <span className="text-white">Siparişlerim</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Siparişlerim</h1>
            <span className="text-sm text-gray-500">{orders.length} sipariş</span>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-[#202020] rounded-lg">
            <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Henüz siparişiniz yok</h3>
            <p className="text-gray-500 mb-6">İlk siparişinizi vermek için ürünlerimizi keşfedin.</p>
            <Link
              to="/oyunlar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors"
            >
              <Package className="h-5 w-5" />
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status.text);
              const StatusIcon = statusInfo.icon;

              return (
                <div key={order.id} className="bg-[#202020] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#303030] flex items-center justify-center">
                        <Package className="h-6 w-6 text-[#00D4FF]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Sipariş #{order.orderId}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Price */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* Status */}
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: statusInfo.bgColor }}
                      >
                        <StatusIcon className="h-4 w-4" style={{ color: statusInfo.color }} />
                        <span className="text-sm font-medium" style={{ color: statusInfo.color }}>
                          {statusInfo.text}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">{order.price}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CreditCard className="h-3 w-3" />
                          <span>Banka</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
