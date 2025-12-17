import { Clock, Package, CheckCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import SEOHead from '../components/SEOHead';

const ReturnsPage = () => {
  const steps = [
    { icon: Clock, title: '14 Gün İçinde Başvuru', description: 'Satın alma tarihinden itibaren 14 gün içinde iade talebinde bulunabilirsiniz.' },
    { icon: Package, title: 'Kullanılmamış Ürün', description: 'Ürün kodunun kullanılmamış olması gerekmektedir.' },
    { icon: CheckCircle, title: 'Hızlı İade', description: 'Onaylanan iadeler 3-5 iş günü içinde hesabınıza yatırılır.' },
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
            <span className="text-white">İade & Değişim</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-[#00D4FF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">İade & Değişim</h1>
              <p className="text-gray-500">Kolay iade politikamız</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-6">
            <div className="bg-[#202020] rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">İade Koşulları</h2>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="h-5 w-5 text-[#00D4FF]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#202020] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Önemli Bilgiler</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Kullanılmış kodlar için iade kabul edilmez</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>İade tutarı aynı ödeme yöntemiyle iade edilir</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>İade talepleri 24 saat içinde değerlendirilir</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#202020] rounded-lg p-6">
            <ContactForm 
              title="İade Talebi" 
              description="İade talebinizi detaylı açıklayın" 
              method="return" 
              backLink="/" 
              backText="Ana Sayfa" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
