import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Banknote,
  Shield,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { checkout } from '../services/api';
import toast from 'react-hot-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: string;
}

const CheckoutModal = ({ isOpen, onClose, totalAmount }: CheckoutModalProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const { setIsCheckoutModalOpen } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    iban: string;
    name: string;
    amount: string;
    description: string;
    orderId: string;
  } | null>(null);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  useEffect(() => {
    if (isOpen && !checkoutData && !isLoadingCheckout) {
      const fetchCheckoutData = async () => {
        setIsLoadingCheckout(true);
        try {
          const response = await checkout();
          
          if (response.data) {
            if (response.data.specialText) {
              toast.error(response.data.specialText);
              return;
            }
            
            setCheckoutData({
              iban: response.data.iban || '',
              name: response.data.name || '',
              amount: response.data.totalPrice || response.data.amount || response.data.total || response.data.price || totalAmount,
              description: response.data.description || '',
              orderId: response.data.orderId || response.data.id || ''
            });
          } else {
            toast.error('API\'den veri gelmedi');
          }
        } catch (error: any) {
          console.error('Checkout data fetch error:', error);
          const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error || 
                              error.message || 
                              'Ödeme bilgileri yüklenemedi. Lütfen tekrar deneyin.';
          toast.error(errorMessage);
        } finally {
          setIsLoadingCheckout(false);
        }
      };
      
      fetchCheckoutData();
    }
  }, [isOpen, checkoutData, isLoadingCheckout, totalAmount]);

  useEffect(() => {
    if (!isOpen) {
      setCheckoutData(null);
      setIsLoadingCheckout(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsCheckoutModalOpen(isOpen);
  }, [isOpen, setIsCheckoutModalOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyIBAN = async () => {
    const ibanToCopy = checkoutData?.iban;
    if (ibanToCopy) {
      try {
        await navigator.clipboard.writeText(ibanToCopy);
        toast.success('IBAN kopyalandı!');
      } catch (err) {
        toast.error('IBAN kopyalanamadı');
      }
    }
  };

  const handleCopyBankName = async () => {
    const bankNameToCopy = checkoutData?.name;
    if (bankNameToCopy) {
      try {
        await navigator.clipboard.writeText(bankNameToCopy);
        toast.success('Hesap adı kopyalandı!');
      } catch (err) {
        toast.error('Hesap adı kopyalanamadı');
      }
    }
  };

  const handleConfirmPayment = async () => {
    if (!checkoutData) {
      toast.error('Ödeme bilgileri henüz yüklenmedi. Lütfen bekleyin...');
      return;
    }

    setIsProcessing(true);
    try {
      await clearCart();
      toast.success('Ödeme başarıyla tamamlandı!');
      onClose();
      navigate('/siparislerim');
    } catch (error: any) {
      console.error('Checkout error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Ödeme işlemi sırasında hata oluştu';
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#202020] rounded-xl border border-[#2a2a2a] pointer-events-auto shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-[#2a2a2a] bg-[#181818]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">Ödeme Bilgileri</h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a2a2a] mt-1">
                  <span className="text-gray-400 text-xs font-semibold">Toplam:</span>
                  <span className="text-white font-bold text-sm">
                    {checkoutData?.amount || totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Payment Instructions */}
            <div className="rounded-lg p-3 bg-[#181818] border border-[#2a2a2a]">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-white font-bold text-xs mb-1.5">Ödeme Talimatları</h4>
                  <div className="space-y-1">
                    <div className="flex items-start gap-1.5">
                      <div className="w-1 h-1 bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-gray-400 text-xs leading-tight">Banka hesabına ödeme yapın</p>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <div className="w-1 h-1 bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-gray-400 text-xs leading-tight">Ödeme sonrası butona basın</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Account */}
            {isLoadingCheckout ? (
              <div className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-400 text-xs">Yükleniyor...</span>
                </div>
              </div>
            ) : !checkoutData ? (
              <div className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <span className="text-red-400 text-xs font-semibold">Veri yüklenemedi</span>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-[#2a2a2a] p-3 bg-[#181818]">
                <div className="flex items-center gap-2 mb-3">
                  <Banknote className="h-4 w-4 text-gray-400" />
                  <h4 className="text-white font-bold text-sm">Banka Hesabı</h4>
                  <CheckCircle className="h-3 w-3 text-green-400 ml-auto" />
                </div>
                
                <div className="space-y-2.5">
                  {/* Bank Name */}
                  <div>
                    <label className="text-gray-500 text-xs font-semibold mb-1.5 block">Banka Adı</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-2 rounded-lg bg-[#2a2a2a]">
                        <p className="text-white font-bold text-xs">{checkoutData.name}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyBankName}
                        className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-colors"
                        title="Kopyala"
                      >
                        <Copy className="h-3.5 w-3.5 text-gray-400" />
                      </motion.button>
                    </div>
                  </div>

                  {/* IBAN */}
                  <div>
                    <label className="text-gray-500 text-xs font-semibold mb-1.5 block">IBAN</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-2 rounded-lg bg-[#2a2a2a] font-mono text-xs">
                        <p className="text-white font-semibold break-all leading-tight">{checkoutData.iban}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCopyIBAN}
                        className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-colors"
                        title="Kopyala"
                      >
                        <Copy className="h-3.5 w-3.5 text-gray-400" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="p-2.5 rounded-lg bg-[#2a2a2a]">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs font-semibold">Ödeme Tutarı</span>
                      <span className="text-white text-lg font-bold">{checkoutData.amount}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {checkoutData.description && (
                    <div className="p-2 rounded-lg bg-[#2a2a2a]">
                      <p className="text-gray-400 text-xs leading-tight">{checkoutData.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmPayment}
              disabled={isProcessing || !checkoutData || isLoadingCheckout}
              className="w-full font-bold text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 bg-[#0078F2] hover:bg-[#0066CC] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>İşleniyor...</span>
                </>
              ) : isLoadingCheckout ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Yükleniyor...</span>
                </>
              ) : !checkoutData ? (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Veri Yükleniyor</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Ödemeyi Yaptım</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>

            {/* Security Info */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              <Shield className="h-3 w-3 text-gray-500" />
              <span className="text-gray-500 text-xs">Güvenli ödeme garantisi</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
