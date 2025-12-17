import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Save, Eye, EyeOff, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyData, updateName, updateEmail, updatePassword } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import toast from 'react-hot-toast';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfilePage = () => {
  const { isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({ firstName: '', lastName: '', email: '' });

  const [nameForm, setNameForm] = useState({ firstName: '', lastName: '' });
  const [emailForm, setEmailForm] = useState({ email: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const response = await getMyData();
        const data = response.data;
        setUserData({ firstName: data.firstName || '', lastName: data.lastName || '', email: data.email || '' });
        setNameForm({ firstName: data.firstName || '', lastName: data.lastName || '' });
        setEmailForm({ email: data.email || '' });
      } catch {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
          setUserData({ firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '' });
          setNameForm({ firstName: user.firstName || '', lastName: user.lastName || '' });
          setEmailForm({ email: user.email || '' });
        }
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [isAuthenticated, navigate]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameForm.firstName.trim() || !nameForm.lastName.trim()) {
      toast.error('Ad ve soyad alanları zorunludur');
      return;
    }
    try {
      setUpdating('name');
      await updateName(nameForm.firstName.trim(), nameForm.lastName.trim());
      setUserData(prev => ({ ...prev, firstName: nameForm.firstName.trim(), lastName: nameForm.lastName.trim() }));
      updateUser({ firstName: nameForm.firstName.trim(), lastName: nameForm.lastName.trim() });
      toast.success('Ad ve soyad güncellendi');
    } catch {
      toast.error('Güncelleme başarısız');
    } finally {
      setUpdating(null);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.email)) {
      toast.error('Geçerli bir e-posta girin');
      return;
    }
    try {
      setUpdating('email');
      await updateEmail(emailForm.email.trim());
      setUserData(prev => ({ ...prev, email: emailForm.email.trim() }));
      updateUser({ email: emailForm.email.trim() });
      toast.success('E-posta güncellendi');
    } catch {
      toast.error('Güncelleme başarısız');
    } finally {
      setUpdating(null);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('Tüm alanları doldurun');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Şifreler eşleşmiyor');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Şifre en az 6 karakter olmalı');
      return;
    }
    try {
      setUpdating('password');
      await updatePassword(passwordForm.newPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Şifre güncellendi');
    } catch {
      toast.error('Güncelleme başarısız');
    } finally {
      setUpdating(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-14 bg-[#121212]">
        <SEOHead />
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-8">
          <div className="text-center py-20 bg-[#202020] rounded-lg max-w-lg mx-auto">
            <UserCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Profil için giriş yapın</h3>
            <p className="text-gray-500 mb-6">Hesabınıza giriş yaparak profil ayarlarınızı yönetebilirsiniz.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/giris-yap" className="px-6 py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors">
                Giriş Yap
              </Link>
              <Link to="/kayit-ol" className="px-6 py-3 border border-[#404040] text-white font-medium rounded hover:bg-[#202020] transition-colors">
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
        <LoadingSpinner size="xl" text="Profil Yükleniyor..." />
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
            <span className="text-white">Profil Ayarları</span>
                </div>
          <h1 className="text-3xl font-bold text-white">Profil Ayarları</h1>
                  </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Name Update */}
          <div className="bg-[#202020] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
                <User className="h-5 w-5 text-[#00D4FF]" />
                  </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ad ve Soyad</h3>
                <p className="text-sm text-gray-500">{userData.firstName} {userData.lastName}</p>
              </div>
            </div>
            <form onSubmit={handleUpdateName} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={nameForm.firstName}
                  onChange={(e) => setNameForm(p => ({ ...p, firstName: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded text-white focus:outline-none focus:border-[#0078F2]"
                  placeholder="Ad"
                        required
                      />
                      <input
                        type="text"
                        value={nameForm.lastName}
                  onChange={(e) => setNameForm(p => ({ ...p, lastName: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded text-white focus:outline-none focus:border-[#0078F2]"
                  placeholder="Soyad"
                        required
                      />
                    </div>
              <button
                type="submit"
                disabled={updating === 'name'}
                className="w-full py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {updating === 'name' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                Güncelle
              </button>
            </form>
                  </div>

          {/* Email Update */}
          <div className="bg-[#202020] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#00D4FF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">E-posta</h3>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>
            <form onSubmit={handleUpdateEmail} className="space-y-4">
                    <input
                      type="email"
                      value={emailForm.email}
                onChange={(e) => setEmailForm({ email: e.target.value })}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded text-white focus:outline-none focus:border-[#0078F2]"
                placeholder="Yeni e-posta"
                      required
                    />
              <button
                type="submit"
                disabled={updating === 'email'}
                className="w-full py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {updating === 'email' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                Güncelle
              </button>
            </form>
                  </div>
              </div>

        {/* Password Update */}
        <div className="bg-[#202020] rounded-lg p-6 mt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#0078F2]/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-[#00D4FF]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Şifre Değiştir</h3>
              <p className="text-sm text-gray-500">Güvenliğiniz için şifrenizi güncelleyin</p>
            </div>
          </div>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <input
                  type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 bg-[#2a2a2a] border border-[#404040] rounded text-white focus:outline-none focus:border-[#0078F2]"
                  placeholder="Mevcut şifre"
                        required
                      />
                <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                  type={showNewPassword ? 'text' : 'password'}
                        value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 bg-[#2a2a2a] border border-[#404040] rounded text-white focus:outline-none focus:border-[#0078F2]"
                  placeholder="Yeni şifre"
                        required
                />
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                  type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 bg-[#2a2a2a] border border-[#404040] rounded text-white focus:outline-none focus:border-[#0078F2]"
                  placeholder="Şifre tekrar"
                        required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
              </div>
            </div>
            <button
            type="submit"
              disabled={updating === 'password'}
              className="w-full py-3 bg-[#0078F2] text-white font-semibold rounded hover:bg-[#0066CC] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {updating === 'password' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              Şifreyi Güncelle
            </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
