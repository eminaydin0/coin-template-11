import { useState, useEffect } from 'react';
import { FileText, Shield, Users, ShoppingCart, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import { getContractDetail } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ContractPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { websiteData } = useWebsite();
  const [contractDetail, setContractDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const contract = websiteData?.contracts?.find((c: any) => c.slug === slug);

  useEffect(() => {
    const fetchContractDetail = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await getContractDetail(slug);
        setContractDetail(response.data);
      } catch (error) {
        console.error('Contract fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContractDetail();
  }, [slug]);

  const getContractIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('gizlilik')) return Shield;
    if (lower.includes('üyelik') || lower.includes('kullanıcı')) return Users;
    if (lower.includes('satış') || lower.includes('mesafeli')) return ShoppingCart;
    if (lower.includes('teslimat') || lower.includes('iade')) return Truck;
    return FileText;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-[#121212]">
        <LoadingSpinner size="xl" text="Yükleniyor..." />
      </div>
    );
  }

  if (!contract && !contractDetail) {
    return (
      <div className="min-h-screen pt-14 bg-[#121212]">
        <SEOHead />
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
          <div className="text-center py-20 bg-[#202020] rounded-lg">
            <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Sözleşme bulunamadı</h3>
            <p className="text-gray-500 mb-6">Aradığınız sözleşme mevcut değil.</p>
            <Link to="/" className="px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = getContractIcon(contract?.name || contractDetail?.name || '');
  const title = contract?.name || contractDetail?.name || 'Sözleşme';
  const content = contractDetail?.text || contractDetail?.content || '';

  return (
    <div className="min-h-screen pt-14 bg-[#121212]">
      <SEOHead />

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-[#00D4FF]" />
            </div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#202020] rounded-lg p-6 lg:p-8">
          {content ? (
            <div 
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-gray-500 text-center py-8">İçerik yükleniyor...</p>
          )}
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
