import { Clock, Zap, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import SEOHead from '../components/SEOHead';

const LiveSupportPage = () => {
  const features = [
    { icon: Clock, title: '7/24 Destek', description: 'Her zaman yanınızdayız' },
    { icon: Zap, title: 'Hızlı Yanıt', description: 'Ortalama 5 dakika içinde yanıt' },
    { icon: Shield, title: 'Güvenli İletişim', description: 'Şifreli mesajlaşma' },
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
            <span className="text-white">Canlı Destek</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
              <Headphones className="h-5 w-5 text-[#00D4FF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Canlı Destek</h1>
              <p className="text-gray-500">Size yardımcı olmaktan mutluluk duyarız</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Features */}
          <div className="space-y-6">
            <div className="bg-[#202020] rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Destek Özellikleri</h2>
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

            <div className="bg-gradient-to-r from-[#0078F2] to-[#00D4FF] rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Acil Destek</h3>
              <p className="text-white/80 mb-4">Ödeme veya teslimat sorunları için öncelikli destek alın.</p>
              <div className="text-lg font-semibold text-white">Ortalama Yanıt: 5 dakika</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#202020] rounded-lg p-6">
            <ContactForm 
              title="Mesaj Gönderin" 
              description="Size en kısa sürede dönüş yapacağız" 
              method="support" 
              backLink="/" 
              backText="Ana Sayfa" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSupportPage;
