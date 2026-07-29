import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [showPassError, setShowPassError] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert('Üye Girişi simüle edildi.');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regPass !== regPassConfirm) {
      setShowPassError(true);
      return;
    }
    setShowPassError(false);
    alert('Üye Kaydı simüle edildi.');
  };

  return (
    <section className="auth-section">
      <div className="hero-bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="auth-container" style={{ background: 'var(--clr-surface)', border: '1px solid var(--clr-border)', padding: '2rem', borderRadius: '12px', maxWidth: '450px', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Üye <span className="gradient-text">Girişi</span></h1>
            <p style={{ color: 'var(--clr-text-2)', fontSize: '1rem' }}>Favori esnaflarınız ve hizmet geçmişiniz burada.</p>
          </div>

          <div className="auth-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--clr-border)', marginBottom: '1.5rem' }}>
            <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')} style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', borderBottom: activeTab === 'login' ? '2px solid var(--clr-orange)' : 'none' }}>Giriş Yap</button>
            <button className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')} style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', borderBottom: activeTab === 'register' ? '2px solid var(--clr-orange)' : 'none' }}>Kayıt Ol</button>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="auth-form active" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>Telefon Numarası veya E-posta</label>
                <input type="text" className="form-control" placeholder="05XX XXX XX XX veya mail@adres.com" required value={loginInput} onChange={(e) => setLoginInput(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div className="form-group">
                <label>Şifre</label>
                <input type="password" className="form-control" placeholder="••••••••" required value={loginPass} onChange={(e) => setLoginPass(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ color: 'var(--clr-text-2)', fontSize: '0.9rem', textDecoration: 'none' }}>Şifremi Unuttum</a>
              </div>
              <button type="submit" className="auth-btn" style={{ padding: '0.8rem', background: 'var(--clr-orange)', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Giriş Yap</button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="auth-form active" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>Ad Soyad</label>
                <input type="text" className="form-control" placeholder="Örn: Ayşe Demir" required value={regName} onChange={(e) => setRegName(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div className="form-group">
                <label>Telefon Numarası</label>
                <input type="tel" className="form-control" placeholder="05XX XXX XX XX" required value={regPhone} onChange={(e) => setRegPhone(e.target.value.replace(/[^0-9]/g, ''))} maxLength="11" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div className="form-group">
                <label>E-posta Adresi (İsteğe Bağlı)</label>
                <input type="email" className="form-control" placeholder="mail@adresiniz.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div className="form-group">
                <label>Şifre</label>
                <input type="password" className="form-control" placeholder="En az 6 karakter" required minlength="6" value={regPass} onChange={(e) => setRegPass(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
              </div>
              <div className="form-group">
                <label>Şifre (Tekrar)</label>
                <input type="password" className="form-control" placeholder="Şifrenizi tekrar girin" required minlength="6" value={regPassConfirm} onChange={(e) => setRegPassConfirm(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--clr-border)', color: '#fff', borderRadius: '6px' }} />
                {showPassError && <small style={{ color: 'red', marginTop: '0.5rem', display: 'block' }}>Şifreler birbiriyle eşleşmiyor!</small>}
              </div>
              <button type="submit" className="auth-btn" style={{ padding: '0.8rem', background: 'var(--clr-orange)', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>Ücretsiz Kayıt Ol</button>
            </form>
          )}

          <div className="auth-footer" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--clr-text-2)' }}>
            Esnaf mısınız? <Link to="/esnaf-giris" style={{ color: 'var(--clr-orange)' }}>Esnaf Girişi Yapın</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;
