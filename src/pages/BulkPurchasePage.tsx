import { Users, DollarSign, Package, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import SEOHead from '../components/SEOHead';

const BulkPurchasePage = () => {
  const features = [
    { icon: DollarSign, title: 'Özel Fiyatlandırma', description: 'Toplu alımlarda %20\'ye varan indirimler' },
    { icon: Package, title: 'Hızlı Teslimat', description: 'Kurumsal siparişlerde öncelikli teslimat' },
    { icon: Users, title: 'Özel Hesap Yöneticisi', description: 'Sizin için atanmış müşteri temsilcisi' },
  ];

  return (
    <div className="min-h-screen pt-14 bg-[#121212]">
      <SEOHead />

      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">Toplu Satın Alım</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-[#00D4FF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Toplu Satın Alım</h1>
              <p className="text-gray-500">Kurumsal müşteriler için özel fırsatlar</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features */}
          <div className="space-y-6">
            <div className="bg-[#202020] rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Neden Toplu Alım?</h2>
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-[#00D4FF]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-gray-500 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
          </div>

          {/* Contact Form */}
          <div className="bg-[#202020] rounded-lg p-6">
            <ContactForm 
              title="Teklif Alın" 
              description="Toplu alım için bizimle iletişime geçin" 
              method="bulk" 
              backLink="/" 
              backText="Ana Sayfa" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkPurchasePage;
