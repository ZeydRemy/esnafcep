import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import '../assets/css/auth.css';

const UserLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginInput, setLoginInput] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPassConfirm, setRegPassConfirm] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Format email from input
    let email = loginInput.trim();
    if (/^\d+$/.test(email)) {
      // If it's a phone number, convert to virtual email
      email = `${email}@siirtesnafcep.com`;
    }

    // Admin login shortcut
    if (email === 'admin@siirtesnafcep.com' && loginPass === 'admin123') {
      localStorage.setItem('user_role', 'admin');
      localStorage.setItem('user_name', 'Sistem Yöneticisi');
      localStorage.setItem('user_email', 'admin@siirtesnafcep.com');
      navigate('/admin-paneli');
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      // Offline Simulation Fallback
      if (loginPass.length >= 6) {
        localStorage.setItem('user_role', 'user');
        localStorage.setItem('user_name', loginInput.split('@')[0]);
        localStorage.setItem('user_email', email);
        navigate('/uye-paneli');
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

      // Check if this user is an admin or merchant or regular user
      if (email === 'admin@siirtesnafcep.com') {
        localStorage.setItem('user_role', 'admin');
      } else {
        // Query if they are a merchant by phone or email
        const phoneClean = loginInput.replace(/[^0-9]/g, '');
        const { data: merchantData } = await supabase
          .from('merchants')
          .select('*')
          .eq('phone', phoneClean || email)
          .single();

        if (merchantData) {
          localStorage.setItem('user_role', 'merchant');
          localStorage.setItem('merchant_id', merchantData.id);
        } else {
          localStorage.setItem('user_role', 'user');
        }
      }

      localStorage.setItem('user_name', data.user.user_metadata?.full_name || 'Üye');
      localStorage.setItem('user_email', data.user.email);
      
      // Redirect to correct dashboard
      const role = localStorage.getItem('user_role');
      if (role === 'admin') navigate('/admin-paneli');
      else if (role === 'merchant') navigate('/esnaf-paneli');
      else navigate('/uye-paneli');

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

    setLoading(true);

    const email = regEmail.trim() || `${regPhone}@siirtesnafcep.com`;

    if (!isSupabaseConfigured) {
      // Offline Simulation Fallback
      localStorage.setItem('user_role', 'user');
      localStorage.setItem('user_name', regName);
      localStorage.setItem('user_email', email);
      navigate('/uye-paneli');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: regPass,
        options: {
          data: {
            full_name: regName,
            phone: regPhone,
          }
        }
      });

      if (error) throw error;

      alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      setActiveTab('login');
      setLoginInput(regEmail || regPhone);
    } catch (err) {
      setErrorMessage(err.message || 'Kayıt sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="hs-title">Üye <span style={{ color: 'var(--primary)' }}>Girişi</span></h1>
          <p className="hs-desc">Favori esnaflarınız ve hizmet geçmişiniz burada.</p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Giriş Yap</button>
          <button className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Kayıt Ol</button>
        </div>

        {errorMessage && (
          <div style={{ padding: '0.75rem', background: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: 'var(--r-sm)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600, border: '1px solid var(--danger-border)' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-form active">
            <div className="form-group">
              <label>Telefon Numarası veya E-posta</label>
              <input type="text" className="form-control" placeholder="05XX XXX XX XX veya mail@adres.com" required value={loginInput} onChange={(e) => setLoginInput(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Şifre</label>
              <input type="password" className="form-control" placeholder="••••••••" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)} />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form active">
            <div className="form-group">
              <label>Ad Soyad</label>
              <input type="text" className="form-control" placeholder="Örn: Ayşe Demir" required value={regName} onChange={(e) => setRegName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Telefon Numarası</label>
              <input type="tel" className="form-control" placeholder="05XX XXX XX XX" required value={regPhone} onChange={(e) => setRegPhone(e.target.value.replace(/[^0-9]/g, ''))} maxLength="11" />
            </div>
            <div className="form-group">
              <label>E-posta Adresi (İsteğe Bağlı)</label>
              <input type="email" className="form-control" placeholder="mail@adresiniz.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
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
              {loading ? 'Kayıt Yapılıyor...' : 'Ücretsiz Kayıt Ol'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          Esnaf mısınız? <Link to="/esnaf-giris">Esnaf Girişi Yapın</Link>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
