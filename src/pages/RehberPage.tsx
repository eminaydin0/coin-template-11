import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ShoppingCart, Download, CheckCircle, Gamepad2, BookOpen, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';

const RehberPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Hesap Oluştur',
      description: 'İlk olarak sitemize üye olun veya mevcut hesabınızla giriş yapın.',
      icon: CheckCircle,
      details: [
        "Sağ üst köşedeki 'Kayıt Ol' butonuna tıklayın",
        'Gerekli bilgileri doldurun',
        'E-posta doğrulaması yapın',
        'Hesabınız aktif hale gelir'
      ]
    },
    {
      id: 2,
      title: 'Oyun Kategorisini Seç',
      description: 'Aradığınız oyunu kategoriler arasından bulun.',
      icon: Gamepad2,
      details: [
        "Ana menüden 'Oyunlar' sekmesine tıklayın",
        'İstediğiniz oyun kategorisini seçin',
        'Oyun listesini inceleyin',
        'Fiyat ve özelliklerini karşılaştırın'
      ]
    },
    {
      id: 3,
      title: 'Ürünü Sepete Ekle',
      description: 'Beğendiğiniz ürünü sepetinize ekleyin.',
      icon: ShoppingCart,
      details: [
        'Ürün detay sayfasında özellikleri inceleyin',
        "'Sepete Ekle' butonuna tıklayın",
        'Miktar seçimi yapın',
        'Sepetinizi kontrol edin'
      ]
    },
    {
      id: 4,
      title: 'Ödeme Yap',
      description: 'Güvenli ödeme yöntemleriyle siparişinizi tamamlayın.',
      icon: CreditCard,
      details: [
        "Sepet sayfasından 'Ödemeye Geç' butonuna tıklayın",
        'Ödeme bilgilerinizi girin',
        'Banka transferi veya EFT ile ödeme yapın',
        'Ödeme onayını bekleyin'
      ]
    },
    {
      id: 5,
      title: 'Kodunuzu Alın',
      description: 'Ödeme onaylandıktan sonra oyun kodunuz teslim edilir.',
      icon: Download,
      details: [
        'Ödeme onaylandıktan sonra',
        'E-posta adresinize kod gönderilir',
        'Hesabınızdan siparişlerinizi takip edin',
        'Anında teslimat garantisi'
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <LoadingSpinner size="xl" text="Yükleniyor..." />
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
            <span className="text-white">Rehber</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-[#00D4FF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Nasıl Çalışır?</h1>
              <p className="text-gray-500">5 kolay adımda alışveriş</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-[#202020] rounded-lg p-6 hover:bg-[#2a2a2a] transition-colors group"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#0078F2] flex items-center justify-center text-white font-bold text-sm">
                    {step.id}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#00D4FF]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{step.description}</p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <ArrowRight className="h-4 w-4 text-[#00D4FF] flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#0078F2] to-[#00D4FF] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Hemen Başlayın!</h2>
          <p className="text-white/80 mb-6">Hesap oluşturun ve anında alışverişe başlayın.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/kayit-ol"
              className="px-6 py-3 bg-white text-[#0078F2] font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              Kayıt Ol
            </Link>
            <Link
              to="/oyunlar"
              className="px-6 py-3 bg-white/10 text-white font-medium rounded hover:bg-white/20 transition-colors"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RehberPage;
