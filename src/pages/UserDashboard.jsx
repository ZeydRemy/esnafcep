import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getFavoriteMerchants, getFavoriteAds, toggleFavoriteMerchant, toggleFavoriteAd } from '../utils/favorites';
import MerchantCard from '../components/ui/MerchantCard';
import AdCard from '../components/ui/AdCard';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favorites');
  const [favSubTab, setFavSubTab] = useState('merchants'); // 'merchants' | 'ads'

  // User Profile State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userDistrict, setUserDistrict] = useState('merkez');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNewPassConfirm] = useState('');

  // Favorites & Reviews State
  const [favMerchants, setFavMerchants] = useState([]);
  const [favAds, setFavAds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_email');

    if (!role || (role !== 'user' && role !== 'admin')) {
      navigate('/uye-giris');
      return;
    }

    setUserName(name || 'Değerli Üye');
    setUserEmail(email || '');
    setUserPhone(localStorage.getItem('user_phone') || '0555 000 00 00');
    setUserDistrict(localStorage.getItem('user_district') || 'merkez');

    // Load Local Favorites
    setFavMerchants(getFavoriteMerchants());
    setFavAds(getFavoriteAds());

    // Fetch user reviews from Supabase or Fallback
    async function fetchReviews() {
      if (!isSupabaseConfigured) {
        setReviews([
          { id: 1, merchants: { name: 'Yılmaz Oto Tamir' }, rating: 5, comment: 'Hızlı ve temiz işçilik, Siirtte tek.', is_approved: true, created_at: '2026-07-28T12:00:00Z' },
          { id: 2, merchants: { name: 'Emin Çilingir' }, rating: 4, comment: 'Kapıyı 10 dakikada açtı, teşekkürler.', is_approved: true, created_at: '2026-07-25T14:30:00Z' }
        ]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('*, merchants(name)')
          .or(`user_email.eq.${email},user_name.eq.${name}`);

        if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        console.error('Yorumlar yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [navigate, userEmail]);

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.clear();
    navigate('/');
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    if (newPass && newPass !== newPassConfirm) {
      alert('Şifreler birbiriyle eşleşmiyor!');
      setSaveLoading(false);
      return;
    }

    localStorage.setItem('user_name', userName);
    localStorage.setItem('user_phone', userPhone);
    localStorage.setItem('user_district', userDistrict);

    if (isSupabaseConfigured && newPass) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPass });
        if (error) throw error;
        alert('Şifreniz ve profil bilgileriniz başarıyla güncellendi!');
      } catch (err) {
        alert('Şifre güncellenemedi: ' + err.message);
      }
    } else {
      alert('Profil bilgileriniz güncellendi.');
    }

    setSaveLoading(false);
    setNewPass('');
    setNewPassConfirm('');
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;

    if (!isSupabaseConfigured) {
      setReviews(reviews.filter(r => r.id !== id));
      return;
    }

    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      alert('Yorum silinemedi: ' + err.message);
    }
  };

  const handleRemoveFavMerchant = (merchant) => {
    toggleFavoriteMerchant(merchant);
    setFavMerchants(getFavoriteMerchants());
  };

  const handleRemoveFavAd = (ad) => {
    toggleFavoriteAd(ad);
    setFavAds(getFavoriteAds());
  };

  const handleSendSupport = (e) => {
    e.preventDefault();
    if (!supportMessage) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setSupportSubject('');
      setSupportMessage('');
      alert('Talebiniz alınmıştır. SiirtEsnafCep destek ekibi en kısa sürede size dönüş yapacaktır.');
    }, 500);
  };

  return (
    <>
      {/* Sayfa Başlık (Hero) */}
      <header className="page-header" style={{ padding: '6rem 0 3.5rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="hs-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Kullanıcı Paneli</span>
            <h1 className="ph-title">{userName}</h1>
            <p className="ph-desc" style={{ color: 'rgba(255,255,255,0.75)' }}>{userEmail || userPhone} · Siirt Üyesi</p>
          </div>
          <button className="btn-danger btn-sm" onClick={handleLogout}>
            🚪 Güvenli Çıkış
          </button>
        </div>
      </header>

      <section className="home-section">
        <div className="container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Sol Sidebar Menü */}
          <aside className="ads-sidebar-panel" style={{ width: '240px' }}>
            <h3 className="ads-sidebar-title">Hesap Menüsü</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className={`btn-primary ${activeTab === 'favorites' ? 'btn-accent' : 'btn-outline'}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }}
                onClick={() => setActiveTab('favorites')}
              >
                ❤️ Favorilerim ({favMerchants.length + favAds.length})
              </button>
              <button 
                className={`btn-primary ${activeTab === 'reviews' ? 'btn-accent' : 'btn-outline'}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }}
                onClick={() => setActiveTab('reviews')}
              >
                💬 Yorumlarım ({reviews.length})
              </button>
              <button 
                className={`btn-primary ${activeTab === 'profile' ? 'btn-accent' : 'btn-outline'}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }}
                onClick={() => setActiveTab('profile')}
              >
                👤 Profil & Bilgilerim
              </button>
              <button 
                className={`btn-primary ${activeTab === 'emergency' ? 'btn-accent' : 'btn-outline'}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.65rem 1rem' }}
                onClick={() => setActiveTab('emergency')}
              >
                🚨 Acil Hat & Destek
              </button>
            </div>
          </aside>

          {/* Sağ İçerik Alanı */}
          <main className="ads-main-panel">
            <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--r-md)', boxShadow: 'var(--sh-card)' }}>

              {/* ── 1. FAVORİLERİM ── */}
              {activeTab === 'favorites' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h2 className="hs-title" style={{ margin: 0 }}>Favorilerim</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className={`filter-chip ${favSubTab === 'merchants' ? 'active' : ''}`}
                        onClick={() => setFavSubTab('merchants')}
                      >
                        Kaydedilen Esnaflar ({favMerchants.length})
                      </button>
                      <button 
                        className={`filter-chip ${favSubTab === 'ads' ? 'active' : ''}`}
                        onClick={() => setFavSubTab('ads')}
                      >
                        Kaydedilen İlanlar ({favAds.length})
                      </button>
                    </div>
                  </div>

                  {favSubTab === 'merchants' && (
                    <>
                      {favMerchants.length > 0 ? (
                        <div className="grid grid-2">
                          {favMerchants.map((merchant, idx) => (
                            <MerchantCard key={merchant.id || idx} {...merchant} />
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                          <span className="empty-icon">🏪</span>
                          <h3>Henüz Favori Esnafınız Yok</h3>
                          <p>Esnaf kartlarının sağ üst köşesindeki kalp simgesine tıklayarak favorilerinize ekleyebilirsiniz.</p>
                          <Link to="/esnaflar" className="btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                            Esnafları Keşfet
                          </Link>
                        </div>
                      )}
                    </>
                  )}

                  {favSubTab === 'ads' && (
                    <>
                      {favAds.length > 0 ? (
                        <div className="grid grid-2">
                          {favAds.map((ad, idx) => (
                            <AdCard key={ad.id || idx} {...ad} />
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                          <span className="empty-icon">🏷️</span>
                          <h3>Henüz Favori İlanınız Yok</h3>
                          <p>Beğendiğiniz ilanların üzerindeki kalp ikonuna basarak buradan kolayca erişebilirsiniz.</p>
                          <Link to="/ilanlar" className="btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                            İlanlara Göz At
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ── 2. YORUMLARIM ── */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    Yorumlarım ve Değerlendirmelerim
                  </h2>

                  {loading ? (
                    <div className="mpage-loading">
                      <div className="mpage-spinner"></div>
                      <span>Yorumlarınız yükleniyor...</span>
                    </div>
                  ) : reviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {reviews.map(review => (
                        <div key={review.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', background: 'var(--surface-2)' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--txt)' }}>
                                {review.merchants?.name || 'Esnaf'}
                              </h3>
                              <span style={{ fontSize: '0.72rem', background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)', padding: '0.1rem 0.5rem', borderRadius: 'var(--r-full)', fontWeight: 600 }}>
                                ✓ Yayınlandı
                              </span>
                            </div>
                            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--txt-2)', lineHeight: 1.6 }}>"{review.comment}"</p>
                            <small style={{ color: 'var(--txt-3)', display: 'block', marginTop: '0.5rem' }}>
                              Tarih: {new Date(review.created_at || Date.now()).toLocaleDateString('tr-TR')}
                            </small>
                          </div>
                          <button 
                            className="btn-outline btn-sm" 
                            style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }} 
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            Sil
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                      <span className="empty-icon">💬</span>
                      <h3>Henüz Yorum Yapmadınız</h3>
                      <p>Hizmet aldığınız esnafların profil sayfalarından yorum ve puan bırakabilirsiniz.</p>
                      <Link to="/esnaflar" className="btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                        Esnafları İncele
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ── 3. PROFİL & BİLGİLERİM ── */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                    Profil ve Üyelik Bilgileri
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Ad Soyad</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Telefon Numarası</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        value={userPhone} 
                        onChange={(e) => setUserPhone(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>E-posta Adresi</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={userEmail} 
                        disabled 
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>
                    <div className="form-group">
                      <label>İlçe Seçimi</label>
                      <select 
                        className="form-control" 
                        value={userDistrict} 
                        onChange={(e) => setUserDistrict(e.target.value)}
                      >
                        <option value="merkez">Siirt Merkez</option>
                        <option value="kurtalan">Kurtalan</option>
                        <option value="baykan">Baykan</option>
                        <option value="pervari">Pervari</option>
                        <option value="eruh">Eruh</option>
                        <option value="sirvan">Şirvan</option>
                      </select>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--txt)', marginTop: '0.75rem' }}>Şifre Değiştir (İsteğe Bağlı)</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Yeni Şifre</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="••••••••" 
                        value={newPass} 
                        onChange={(e) => setNewPass(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Yeni Şifre (Tekrar)</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="••••••••" 
                        value={newPassConfirm} 
                        onChange={(e) => setNewPassConfirm(e.target.value)} 
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-accent btn-lg" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} disabled={saveLoading}>
                    {saveLoading ? 'Kaydediliyor...' : 'Bilgilerimi Güncelle'}
                  </button>
                </form>
              )}

              {/* ── 4. ACİL HAT & DESTEK ── */}
              {activeTab === 'emergency' && (
                <div>
                  <h2 className="hs-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                    🚨 Siirt Acil İletişim Hatları & Destek
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', padding: '1rem', borderRadius: 'var(--r-sm)' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>🚗</div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--danger)', display: 'block' }}>Oto Çekici & Kurtarma</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--txt-2)' }}>7/24 Kesintisiz Yol Yardım</span>
                      <a href="tel:08501234567" className="btn-danger btn-sm" style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}>📞 0850 123 45 67</a>
                    </div>

                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '1rem', borderRadius: 'var(--r-sm)' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>🚕</div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--txt)', display: 'block' }}>Taksi Durağı</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--txt-2)' }}>Şehir İçi & Otogar Ulaşım</span>
                      <a href="tel:08501234568" className="btn-primary btn-sm" style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}>📞 0850 123 45 68</a>
                    </div>

                    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '1rem', borderRadius: 'var(--r-sm)' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>🔑</div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--txt)', display: 'block' }}>Nöbetçi Çilingir</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--txt-2)' }}>Kapı ve Kilit Açma Hizmeti</span>
                      <a href="tel:08501234569" className="btn-primary btn-sm" style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}>📞 0850 123 45 69</a>
                    </div>
                  </div>

                  {/* Destek Mesaj Formu */}
                  <form onSubmit={handleSendSupport} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '1.5rem', borderRadius: 'var(--r-sm)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--txt)' }}>✉️ Platform Destek Talebi Oluştur</h3>
                    
                    <div className="form-group">
                      <label>Konu</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Örn: Esnaf profili veya ilan bildirimi" 
                        value={supportSubject} 
                        onChange={(e) => setSupportSubject(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label>Mesajınız</label>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Sorunuzu veya talebinizi detaylıca açıklayın..." 
                        value={supportMessage} 
                        onChange={(e) => setSupportMessage(e.target.value)} 
                        required 
                        style={{ resize: 'vertical' }}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-accent btn-sm" style={{ alignSelf: 'flex-start' }}>
                      Destek Talebi Gönder
                    </button>
                  </form>
                </div>
              )}

            </div>
          </main>

        </div>
      </section>
    </>
  );
};

export default UserDashboard;
