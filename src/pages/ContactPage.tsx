import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const { getInfoValue } = useWebsite();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const contactPhone = getInfoValue('CONTACT_PHONE');
  const contactEmail = getInfoValue('CONTACT_EMAIL');
  const contactAddress = getInfoValue('CONTACT_ADDRESS');

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
            <span className="text-white">İletişim</span>
          </div>
          <h1 className="text-3xl font-bold text-white">İletişim & Destek</h1>
          <p className="text-gray-500 mt-2">7/24 size yardımcı olmaktan mutluluk duyarız</p>
        </div>

        {/* Contact Cards */}
        {(!contactPhone && !contactEmail && !contactAddress) ? (
          <div className="text-center py-20 bg-[#202020] rounded-lg">
            <Headphones className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">İletişim bilgileri bulunamadı</h3>
            <p className="text-gray-500">Yakında iletişim bilgileri eklenecektir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactPhone && (
              <div className="bg-[#202020] rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-[#0078F2]/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-[#00D4FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Telefon</h3>
                <p className="text-gray-500 text-sm mb-4">7/24 müşteri hizmetleri</p>
                <a
                  href={`tel:${contactPhone}`}
                  className="text-[#00D4FF] font-semibold hover:text-white transition-colors"
                >
                  {contactPhone}
                </a>
              </div>
            )}

            {contactEmail && (
              <div className="bg-[#202020] rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-[#0078F2]/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-[#00D4FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">E-posta</h3>
                <p className="text-gray-500 text-sm mb-4">24 saat içinde yanıt</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[#00D4FF] font-semibold hover:text-white transition-colors break-all"
                >
                  {contactEmail}
                </a>
              </div>
            )}

            {contactAddress && (
              <div className="bg-[#202020] rounded-lg p-6">
                <div className="w-12 h-12 rounded-lg bg-[#0078F2]/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#00D4FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Adres</h3>
                <p className="text-gray-500 text-sm mb-4">Merkez ofis</p>
                <p className="text-gray-300 text-sm">{contactAddress}</p>
              </div>
            )}
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Sık Sorulan Sorular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'Siparişim ne zaman teslim edilir?', a: 'Ödemeni onayladığımız anda ürün kodların anında e-posta adresine ve hesabına gönderilir.' },
              { q: 'Ödeme yöntemleri nelerdir?', a: 'Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsin.' },
              { q: 'İade yapabilir miyim?', a: 'Kullanılmamış ürün kodları için 14 gün içinde iade talebinde bulunabilirsin.' },
              { q: 'Güvenli alışveriş yapabilir miyim?', a: '256-bit SSL sertifikası ile tüm ödemeler güvenli şekilde gerçekleştirilir.' },
            ].map((faq, i) => (
              <div key={i} className="bg-[#202020] rounded-lg p-5">
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
