import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Copy, CheckCircle } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';

const BankAccountsPage = () => {
  const { websiteData, refreshData } = useWebsite();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!websiteData?.bankAccounts) {
          refreshData();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [websiteData, refreshData]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const bankAccounts = websiteData?.bankAccounts || [];

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
            <span className="text-white">Banka Hesapları</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-[#00D4FF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Banka Hesapları</h1>
              <p className="text-gray-500">Ödeme için kullanabileceğiniz hesaplar</p>
            </div>
          </div>
        </div>

        {/* Bank Accounts */}
        {bankAccounts.length === 0 ? (
          <div className="text-center py-20 bg-[#202020] rounded-lg">
            <CreditCard className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Banka hesabı bulunamadı</h3>
            <p className="text-gray-500">Yakında banka hesapları eklenecektir.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bankAccounts.map((account: any, index: number) => (
              <div key={index} className="bg-[#202020] rounded-lg p-6 hover:bg-[#2a2a2a] transition-colors">
                {/* Bank Logo/Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#303030] flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-[#00D4FF]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{account.bankName}</h3>
                    <p className="text-sm text-gray-500">{account.accountType || 'Banka Hesabı'}</p>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-3">
                  {account.accountHolder && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Hesap Sahibi</p>
                      <p className="text-white font-medium">{account.accountHolder}</p>
                    </div>
                  )}
                  
                  {account.iban && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">IBAN</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-mono text-sm flex-1">{account.iban}</p>
                        <button
                          onClick={() => copyToClipboard(account.iban, index)}
                          className="p-2 rounded bg-[#303030] hover:bg-[#404040] transition-colors"
                        >
                          {copiedIndex === index ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {account.accountNumber && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Hesap No</p>
                      <p className="text-white font-mono">{account.accountNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-[#0078F2]/10 border border-[#0078F2]/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-2">Önemli Bilgi</h3>
          <p className="text-gray-400 text-sm">
            Ödeme yaparken açıklama kısmına sipariş numaranızı yazmayı unutmayın. 
            Ödemeler 15-30 dakika içerisinde kontrol edilmektedir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankAccountsPage;
