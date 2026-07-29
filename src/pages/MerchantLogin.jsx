import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import '../assets/css/auth.css';

const MerchantLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [regName, setRegName] = useState('');
  const [regBusiness, setRegBusiness] = useState('');
  const [regCategory, setRegCategory] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regDistrict, setRegDistrict] = useState('merkez');
  const [regPass, setRegPass] = useState('');
  const [regPassConfirm, setRegPassConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const email = `${loginPhone}@siirtesnafcep.com`;

    if (!isSupabaseConfigured) {
      // Offline Simulation Fallback
      if (loginPass.length >= 6) {
        localStorage.setItem('user_role', 'merchant');
        localStorage.setItem('user_name', loginPhone);
        localStorage.setItem('user_email', email);
        localStorage.setItem('merchant_name', 'Simüle Esnaf Mağazası');
        navigate('/esnaf-paneli');
      } else {
        setErrorMessage('Şifre en az 6 karakter olmalıdır.');
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: loginPass,
      });

      if (error) throw error;

      // Query merchant data
      const { data: merchantData, error: mError } = await supabase
        .from('merchants')
        .select('*')
        .eq('phone', loginPhone)
        .single();

      if (mError || !merchantData) {
        // If auth user exists but no merchant record, let's create one on the fly
        const { data: newMerchant } = await supabase
          .from('merchants')
          .insert({
            name: data.user.user_metadata?.full_name || 'Yeni Esnaf',
            business_name: 'Yeni Mağaza',
            category_slug: 'mobilya',
            district: 'merkez',
            phone: loginPhone,
            is_verified: false
          })
          .select()
          .single();

        localStorage.setItem('merchant_id', newMerchant?.id || '');
      } else {
        localStorage.setItem('merchant_id', merchantData.id);
        localStorage.setItem('merchant_name', merchantData.name);
      }

      localStorage.setItem('user_role', 'merchant');
      localStorage.setItem('user_name', data.user.user_metadata?.full_name || 'Esnaf');
      localStorage.setItem('user_email', data.user.email);

      navigate('/esnaf-paneli');
    } catch (err) {
      setErrorMessage(err.message || 'Giriş yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (regPass !== regPassConfirm) {
      setErrorMessage('Şifreler birbiriyle eşleşmiyor!');
      return;
    }

    if (!regCategory) {
      setErrorMessage('Lütfen bir hizmet kategorisi seçin.');
      return;
    }

    setLoading(true);

    const email = `${regPhone}@siirtesnafcep.com`;

    if (!isSupabaseConfigured) {
      // Offline Simulation Fallback
      localStorage.setItem('user_role', 'merchant');
      localStorage.setItem('user_name', regName);
      localStorage.setItem('user_email', email);
      localStorage.setItem('merchant_name', regBusiness);
      navigate('/esnaf-paneli');
      setLoading(false);
      return;
    }

    try {
      // 1. Sign up Supabase auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: regPass,
        options: {
          data: {
            full_name: regName,
            phone: regPhone,
          }
        }
      });

      if (authError) throw authError;

      // 2. Insert merchant profile record
      const { error: dbError } = await supabase
        .from('merchants')
        .insert({
          name: regName,
          business_name: regBusiness,
          category_slug: regCategory,
          district: regDistrict,
          phone: regPhone,
          is_verified: false,
          rating: 5.0,
          review_count: 0
        });

      if (dbError) throw dbError;

      alert('Esnaf kaydınız başarıyla tamamlandı! Giriş yapabilirsiniz.');
      setActiveTab('login');
      setLoginPhone(regPhone);
    } catch (err) {
      setErrorMessage(err.message || 'Kayıt olurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="hs-title">İşletme <span style={{ color: 'var(--primary)' }}>Paneli</span></h1>
          <p className="hs-desc">SiirtEsnafCep satıcı ağına hoş geldiniz.</p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Giriş Yap</button>
          <button className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Hemen Kayıt Ol</button>
        </div>

        {errorMessage && (
          <div style={{ padding: '0.75rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--r-sm)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600, border: '1px solid var(--danger-border)' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-form active">
            <div className="form-group">
              <label>Telefon Numarası</label>
              <input type="tel" className="form-control" placeholder="05XX XXX XX XX" required value={loginPhone} onChange={(e) => setLoginPhone(e.target.value.replace(/[^0-9]/g, ''))} maxLength="11" />
            </div>
            <div className="form-group">
              <label>Şifre</label>
              <input type="password" className="form-control" placeholder="••••••••" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)} />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Giriş Yapılıyor...' : 'Panele Giriş Yap'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form active">
            <div className="form-group">
              <label>Ad Soyad</label>
              <input type="text" className="form-control" placeholder="Örn: Ahmet Yılmaz" required value={regName} onChange={(e) => setRegName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>İşletme Adı</label>
              <input type="text" className="form-control" placeholder="Örn: Yılmaz Oto Tamir" required value={regBusiness} onChange={(e) => setRegBusiness(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Hizmet Kategorisi</label>
              <select className="form-control" required value={regCategory} onChange={(e) => setRegCategory(e.target.value)}>
                <option value="">Kategori Seçin...</option>
                <option value="cekici">Çekici & Oto Kurtarma</option>
                <option value="taksi">Taksi & Özel Ulaşım</option>
                <option value="cilingir">Çilingir & Anahtarcı</option>
                <option value="mobilya">Mobilya & Koltuk Takımları</option>
                <option value="telefon">Telefon Tamir & Aksesuar</option>
                <option value="emlak">Emlak & Gayrimenkul</option>
                <option value="galeri">Oto Galeri & 2. El Araç</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bulunduğu İlçe</label>
              <select className="form-control" required value={regDistrict} onChange={(e) => setRegDistrict(e.target.value)}>
                <option value="merkez">Merkez</option>
                <option value="kurtalan">Kurtalan</option>
                <option value="baykan">Baykan</option>
                <option value="pervari">Pervari</option>
                <option value="eruh">Eruh</option>
                <option value="sirvan">Şirvan</option>
              </select>
            </div>
            <div className="form-group">
              <label>Telefon Numarası</label>
              <input type="tel" className="form-control" placeholder="05XX XXX XX XX" required value={regPhone} onChange={(e) => setRegPhone(e.target.value.replace(/[^0-9]/g, ''))} maxLength="11" />
            </div>
            <div className="form-group">
              <label>Şifre</label>
              <input type="password" className="form-control" placeholder="En az 6 karakter" required minLength="6" value={regPass} onChange={(e) => setRegPass(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Şifre (Tekrar)</label>
              <input type="password" className="form-control" placeholder="Şifrenizi tekrar girin" required minLength="6" value={regPassConfirm} onChange={(e) => setRegPassConfirm(e.target.value)} />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol ve Profilini Oluştur'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          Bir sorununuz mu var? <a href="#">Destek Ekibiyle Görüşün</a>
        </div>
      </div>
    </section>
  );
};

export default MerchantLogin;
