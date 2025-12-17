import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';

const Footer = () => {
  const { websiteData, getInfoValue } = useWebsite();
  const siteName = getInfoValue('TITLE') || 'GameStore';

  return (
    <footer className="bg-[#181818] border-t border-[#2a2a2a]">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-300 to-purple-300 bg-clip-text text-transparent font-bold text-xl">
                {siteName}
              </span>
            </Link>
            <p className="text-gray-500 text-sm mb-4">
              Güvenilir oyun kodları ve e-pin satış platformu.
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} {siteName}. Tüm hakları saklıdır.
            </p>
          </div>

          {/* Sözleşmeler */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sözleşmeler</h4>
            <ul className="space-y-2">
              {websiteData?.contracts?.map((contract) => (
                <li key={contract.id}>
                  <Link 
                    to={`/sozlesme/${contract.slug}`} 
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {contract.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h4 className="text-white font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/iletisim" className="text-gray-500 hover:text-white text-sm transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link to="/banka-hesaplari" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Banka Hesapları
                </Link>
              </li>
              <li>
                <Link to="/rehber" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Rehber
                </Link>
              </li>
            </ul>
          </div>

          {/* Satış Hizmetleri */}
          <div>
            <h4 className="text-white font-semibold mb-4">Satış Hizmetleri</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/toplu-satin-alim" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Toplu Satın Alım
                </Link>
              </li>
              <li>
                <Link to="/geri-iade" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Geri İade
                </Link>
              </li>
              <li>
                <Link to="/canli-destek" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Canlı Destek
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#2a2a2a] flex flex-col md:flex-row items-center justify-between gap-4">
          <a 
            href="https://maxiipins.com/" 
            className="text-gray-500 text-sm hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed by Maxiipins
          </a>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">Güvenli Ödeme</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-[#2a2a2a] rounded flex items-center justify-center text-xs text-gray-500">VISA</div>
              <div className="w-10 h-6 bg-[#2a2a2a] rounded flex items-center justify-center text-xs text-gray-500">MC</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
